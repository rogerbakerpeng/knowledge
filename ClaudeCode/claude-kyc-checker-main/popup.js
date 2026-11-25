'use strict';

const C = globalThis.ClaudeKycClassify;
const CLAUDE_HOME = 'https://claude.ai/';

const els = {
  status: document.getElementById('status-line'),
  openPanel: document.getElementById('open-panel'),
  openBtn: document.getElementById('open-btn'),
  errorPanel: document.getElementById('error-panel'),
  results: document.getElementById('results'),
  refreshBtn: document.getElementById('refresh-btn'),
  copyBtn: document.getElementById('copy-btn')
};

let lastPayload = null;

function setStatus(text) {
  els.status.textContent = text || '';
  els.status.hidden = !text;
}

function showError(message) {
  els.errorPanel.hidden = false;
  els.errorPanel.textContent = message;
}

function hidePanels() {
  els.openPanel.hidden = true;
  els.errorPanel.hidden = true;
  els.results.hidden = true;
  els.results.replaceChildren();
  els.copyBtn.hidden = true;
}

function isClaudeTab(tab) {
  if (!tab || !tab.url) return false;
  try {
    const u = new URL(tab.url);
    return u.protocol === 'https:' && (u.hostname === 'claude.ai' || u.hostname === 'www.claude.ai');
  } catch (e) {
    return false;
  }
}

function formatTime(value) {
  if (value == null || value === '') return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const text = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(d);
  return text + '（Asia/Shanghai，UTC+8）';
}

function badge(label, tone) {
  const span = document.createElement('span');
  span.className = 'badge tone-' + (tone || 'neutral');
  span.textContent = label;
  return span;
}

async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs && tabs[0] ? tabs[0] : null;
}

// Runs in the claude.ai page so fetch is same-origin and uses the page login session.
// Do not read cookies, document.cookie, or sessionKey here.
function pageQueryFunction() {
  return (async function () {
    const orgsUrl = 'https://claude.ai/api/organizations';

    async function fetchJson(url) {
      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' }
      });
      const text = await res.text();
      let data = null;
      let isJson = false;
      try {
        data = JSON.parse(text);
        isJson = true;
      } catch (e) {
        data = null;
      }
      return {
        ok: res.ok,
        status: res.status,
        url: url,
        isJson: isJson,
        data: data,
        textPreview: text.slice(0, 240)
      };
    }

    function asOrgList(data) {
      if (Array.isArray(data)) return data;
      if (data && Array.isArray(data.data)) return data.data;
      if (data && Array.isArray(data.organizations)) return data.organizations;
      if (data && data.uuid) return [data];
      return [];
    }

    try {
      const orgsRes = await fetchJson(orgsUrl);
      if (!orgsRes.ok || !orgsRes.isJson) {
        return { ok: false, stage: 'organizations', response: orgsRes };
      }
      const orgs = asOrgList(orgsRes.data);
      const items = [];
      for (let i = 0; i < orgs.length; i += 1) {
        const org = orgs[i];
        const uuid = org && (org.uuid || org.id);
        if (!uuid) {
          items.push({
            org: org,
            kycResponse: {
              ok: false,
              status: 0,
              url: null,
              isJson: false,
              data: null,
              textPreview: 'missing organization uuid'
            }
          });
          continue;
        }
        const kycUrl = orgsUrl + '/' + encodeURIComponent(uuid) + '/kyc_status';
        const kycResponse = await fetchJson(kycUrl);
        items.push({ org: org, kycResponse: kycResponse });
      }
      return {
        ok: true,
        fetchedAt: new Date().toISOString(),
        organizationsResponse: {
          ok: orgsRes.ok,
          status: orgsRes.status,
          isJson: orgsRes.isJson
        },
        items: items
      };
    } catch (err) {
      return {
        ok: false,
        stage: 'exception',
        message: err && err.message ? err.message : String(err)
      };
    }
  })();
}

async function queryViaActiveTab(tab) {
  const injection = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: pageQueryFunction,
    world: 'MAIN'
  });
  if (!injection || !injection[0]) {
    throw new Error('无法在当前标签页执行查询。');
  }
  if (injection[0].error) {
    throw new Error(injection[0].error.message || String(injection[0].error));
  }
  return injection[0].result;
}

function explainQueryError(payload) {
  if (!payload) return '查询失败，没有返回结果。';
  if (payload.ok) return null;
  if (payload.stage === 'exception' && payload.message) {
    return '页面内请求失败：' + payload.message;
  }
  const res = payload.response || {};
  return C.describeHttpError(res.status, res.isJson, res.textPreview).message;
}

function renderItems(payload) {
  const items = payload.items || [];
  if (!items.length) {
    const p = document.createElement('p');
    p.className = 'empty';
    p.textContent = '已登录，但没有查到任何组织。';
    els.results.appendChild(p);
    return;
  }

  items.forEach(function (item) {
    const org = item.org || {};
    const kycRes = item.kycResponse || {};
    const plan = C.extractPlan(org);
    const uuid = org.uuid || org.id || '';
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h2');
    title.textContent = org.name || '未命名组织';
    card.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = 'UUID：' + C.shortenUuid(uuid);
    if (plan.planLabels.length) {
      meta.textContent += '  ·  方案：' + plan.planLabels.join('、');
    }
    card.appendChild(meta);

    if (!kycRes.ok || !kycRes.isJson || !kycRes.data) {
      const err = document.createElement('p');
      err.className = 'warning-box';
      err.textContent = C.describeHttpError(kycRes.status, kycRes.isJson, kycRes.textPreview).message;
      card.appendChild(err);
      els.results.appendChild(card);
      return;
    }

    const kyc = kycRes.data;
    const statusInfo = C.classifyStatus(kyc.status);
    const urlInfo = C.classifyInquiryUrl(kyc.vendor_inquiry_url);

    appendRow(card, 'KYC 状态', function (valueEl) {
      valueEl.appendChild(badge(statusInfo.label, statusInfo.tone));
      const exp = document.createElement('div');
      exp.textContent = statusInfo.explanation;
      valueEl.appendChild(exp);
    });

    appendRow(card, '验证链接', function (valueEl) {
      valueEl.appendChild(badge(urlInfo.label, urlInfo.tone));
      const exp = document.createElement('div');
      exp.textContent = urlInfo.explanation;
      valueEl.appendChild(exp);
      if (urlInfo.url) {
        const link = document.createElement('a');
        link.className = 'inquiry-link';
        link.href = urlInfo.url;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.textContent = urlInfo.url;
        valueEl.appendChild(link);
      }
    });

    appendRow(card, 'check_kind', function (valueEl) {
      valueEl.textContent = kyc.check_kind == null || kyc.check_kind === '' ? '—' : String(kyc.check_kind);
    });

    appendRow(card, '创建时间', function (valueEl) { valueEl.textContent = formatTime(kyc.created_at); });
    appendRow(card, '更新时间', function (valueEl) { valueEl.textContent = formatTime(kyc.updated_at); });
    appendRow(card, '完成时间', function (valueEl) { valueEl.textContent = formatTime(kyc.completed_at); });

    if (urlInfo.warning && urlInfo.kind === 'portal') {
      const box = document.createElement('div');
      box.className = 'warning-box';
      box.textContent = '注意：公开教程称门户 KYC 有封号风险，建议不要打开或完成该验证。';
      card.appendChild(box);
    }

    els.results.appendChild(card);
  });
}

function appendRow(card, label, fillValue) {
  const row = document.createElement('div');
  row.className = 'row';
  const labelEl = document.createElement('div');
  labelEl.className = 'label';
  labelEl.textContent = label;
  const valueEl = document.createElement('div');
  valueEl.className = 'value';
  fillValue(valueEl);
  row.appendChild(labelEl);
  row.appendChild(valueEl);
  card.appendChild(row);
}

async function runCheck() {
  hidePanels();
  els.refreshBtn.hidden = false;
  els.refreshBtn.disabled = true;
  lastPayload = null;
  setStatus('正在检查当前标签页…');

  try {
    const tab = await getActiveTab();
    if (!isClaudeTab(tab)) {
      setStatus('当前标签页不是 claude.ai');
      els.openPanel.hidden = false;
      els.refreshBtn.disabled = false;
      return;
    }

    setStatus('正在从当前 claude.ai 页面查询…');
    const payload = await queryViaActiveTab(tab);
    if (!payload || payload.ok === false) {
      showError(explainQueryError(payload));
      setStatus('查询未成功');
      els.refreshBtn.disabled = false;
      lastPayload = payload || { ok: false };
      els.copyBtn.hidden = false;
      return;
    }

    lastPayload = payload;
    els.results.hidden = false;
    renderItems(payload);
    els.copyBtn.hidden = false;
    const count = (payload.items || []).length;
    setStatus('已查询 ' + count + ' 个组织');
  } catch (err) {
    showError(err && err.message ? err.message : String(err));
    setStatus('查询出错');
  } finally {
    els.refreshBtn.disabled = false;
  }
}

async function copyResult() {
  if (!lastPayload) return;
  const text = JSON.stringify(lastPayload, null, 2);
  try {
    await navigator.clipboard.writeText(text);
    const old = els.copyBtn.textContent;
    els.copyBtn.textContent = '已复制';
    setTimeout(function () {
      els.copyBtn.textContent = old;
    }, 1500);
  } catch (e) {
    showError('复制失败，请手动选择结果。');
  }
}

els.openBtn.addEventListener('click', function () {
  chrome.tabs.create({ url: CLAUDE_HOME });
});
els.refreshBtn.addEventListener('click', runCheck);
els.copyBtn.addEventListener('click', copyResult);

runCheck();

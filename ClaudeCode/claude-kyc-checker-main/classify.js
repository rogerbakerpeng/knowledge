'use strict';

const STATUS_MAP = {
  not_required: {
    key: 'not_required',
    label: '无需 KYC',
    tone: 'ok',
    explanation: '升级无需身份验证，可直接升级。'
  },
  pending: {
    key: 'pending',
    label: '审核中',
    tone: 'warn',
    explanation: '需要完成 KYC，或正在审核中。'
  },
  verified: {
    key: 'verified',
    label: '已通过',
    tone: 'ok',
    explanation: 'KYC 已通过。'
  },
  approved: {
    key: 'approved',
    label: '已通过',
    tone: 'ok',
    explanation: 'KYC 已通过（旧版状态 approved）。'
  },
  denied: {
    key: 'denied',
    label: '已拒绝',
    tone: 'danger',
    explanation: 'KYC 被拒绝，无法升级。'
  }
};

const PLAN_CAP_RE = /^(claude_|raven|pro|max|team|enterprise|billing)/i;
const REGION_RE = /region|unavailable in|not available|country|geographic|unsupported (region|country)|access from your|不是可用地区|当前地区/;

function classifyStatus(status) {
  if (status == null || String(status).trim() === '') {
    return {
      key: 'unknown',
      raw: status == null ? null : String(status),
      label: '未知',
      tone: 'neutral',
      explanation: '接口未返回 status 字段。'
    };
  }
  const raw = String(status);
  const mapped = STATUS_MAP[raw];
  if (mapped) {
    return Object.assign({}, mapped, { raw: raw });
  }
  return {
    key: 'other',
    raw: raw,
    label: raw,
    tone: 'neutral',
    explanation: '未知状态，请以接口返回值为准。'
  };
}

function classifyInquiryUrl(url) {
  if (url == null || String(url).trim() === '') {
    return {
      kind: 'none',
      label: '无验证链接',
      tone: 'neutral',
      warning: false,
      explanation: '当前没有 vendor_inquiry_url。',
      url: null
    };
  }

  const raw = String(url).trim();
  let host = '';
  try {
    host = new URL(raw).hostname.toLowerCase();
  } catch (e) {
    return {
      kind: 'invalid',
      label: '链接无效',
      tone: 'warn',
      warning: true,
      explanation: 'vendor_inquiry_url 不是有效的 URL。',
      url: raw
    };
  }

  const isPersona =
    host === 'withpersona.com' ||
    host.endsWith('.withpersona.com');
  const isPortal =
    host === 'portal.anthropic.com' ||
    host.endsWith('.portal.anthropic.com');

  if (isPersona) {
    return {
      kind: 'subscription',
      label: '订阅 KYC（Persona）',
      tone: 'ok',
      warning: false,
      explanation: '这是常规的订阅 KYC 验证链接（Persona），一般可以正常完成。',
      url: raw
    };
  }
  if (isPortal) {
    return {
      kind: 'portal',
      label: '门户 KYC',
      tone: 'danger',
      warning: true,
      explanation: '这是门户 KYC（portal.anthropic.com）。公开教程称此类验证有封号风险，建议不要进行。',
      url: raw
    };
  }
  return {
    kind: 'unknown',
    label: '未知类型链接',
    tone: 'warn',
    warning: true,
    explanation: '未能识别该验证链接来源，请谨慎操作。',
    url: raw
  };
}

function extractPlan(org) {
  const source = org && typeof org === 'object' ? org : {};
  const caps = Array.isArray(source.capabilities) ? source.capabilities.map(String) : [];
  const planLike = caps.filter(function (c) {
    return PLAN_CAP_RE.test(c);
  });
  const extras = [];
  ['billing_type', 'rate_limit_tier', 'plan', 'organization_type'].forEach(function (key) {
    if (source[key]) extras.push(String(source[key]));
  });
  const planLabels = planLike.length ? planLike : extras;
  return {
    capabilities: caps,
    planLabels: unique(planLabels)
  };
}

function unique(list) {
  const seen = {};
  const out = [];
  list.forEach(function (item) {
    if (!seen[item]) {
      seen[item] = true;
      out.push(item);
    }
  });
  return out;
}

function normalizeOrganizationsPayload(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.organizations)) return data.organizations;
  if (data && data.uuid) return [data];
  return [];
}

function looksLikeRegionBlock(textPreview) {
  return REGION_RE.test(String(textPreview || '').toLowerCase());
}

function describeHttpError(status, isJson, textPreview) {
  if (looksLikeRegionBlock(textPreview)) {
    return {
      code: 'region',
      message: '当前地区可能无法使用 claude.ai，请求被拒绝。'
    };
  }
  if (status === 401 || status === 403) {
    return {
      code: 'auth',
      message: '请先登录 claude.ai'
    };
  }
  if (!isJson) {
    return {
      code: 'non_json',
      message: '接口返回了非 JSON 内容（HTTP ' + status + '）。'
    };
  }
  return {
    code: 'http',
    message: '请求失败（HTTP ' + status + '）。'
  };
}

function shortenUuid(uuid) {
  const raw = String(uuid || '');
  if (raw.length <= 16) return raw || '—';
  return raw.slice(0, 8) + '…' + raw.slice(-4);
}

const api = {
  classifyStatus: classifyStatus,
  classifyInquiryUrl: classifyInquiryUrl,
  extractPlan: extractPlan,
  normalizeOrganizationsPayload: normalizeOrganizationsPayload,
  describeHttpError: describeHttpError,
  looksLikeRegionBlock: looksLikeRegionBlock,
  shortenUuid: shortenUuid
};

if (typeof module === 'object' && module.exports) {
  module.exports = api;
} else {
  globalThis.ClaudeKycClassify = api;
}

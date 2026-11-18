/* 广交易大屏 · 基础运行时 */
(function () {
  "use strict";

  const DESIGN_W = 1920;
  const DESIGN_H = 1080;
  const STATIC = /(?:\?|&)static(?:=|&|$)/.test(location.search);
  if (STATIC) document.documentElement.classList.add("static");

  function fitStage() {
    const s = Math.min(window.innerWidth / DESIGN_W, window.innerHeight / DESIGN_H);
    document.documentElement.style.setProperty("--scale", s.toFixed(4));
  }
  window.addEventListener("resize", fitStage);
  fitStage();

  /* -------- clock -------- */
  const WEEK = ["日", "一", "二", "三", "四", "五", "六"];
  function tickClock() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    document.querySelectorAll("[data-clock]").forEach((el) => {
      el.textContent = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
    });
    document.querySelectorAll("[data-date]").forEach((el) => {
      el.textContent = `${d.getFullYear()}年${p(d.getMonth() + 1)}月${p(d.getDate())}日 · 星期${WEEK[d.getDay()]}`;
    });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* -------- count up -------- */
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);
  function countUp(el) {
    const to = parseFloat(el.dataset.to || "0");
    const dec = parseInt(el.dataset.dec || "0", 10);
    const sep = el.dataset.sep === "1";
    const dur = parseInt(el.dataset.dur || "1400", 10);
    const fmt = (v) => sep
      ? v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec })
      : v.toFixed(dec);
    if (STATIC) { el.textContent = fmt(to); return; }
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = to * easeOut(t);
      el.textContent = fmt(v);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* -------- sparkline -------- */
  let uid = 0;
  function spark(el, data, opts) {
    opts = opts || {};
    const w = 100, h = 40, pad = 2;
    const min = Math.min(...data), max = Math.max(...data);
    const span = max - min || 1;
    const pts = data.map((v, i) => [
      pad + (i * (w - pad * 2)) / (data.length - 1),
      h - pad - ((v - min) / span) * (h - pad * 2),
    ]);
    let d = `M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`;
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1], p1 = pts[i];
      const cx = (p0[0] + p1[0]) / 2;
      d += ` Q${cx.toFixed(2)},${p0[1].toFixed(2)} ${cx.toFixed(2)},${((p0[1] + p1[1]) / 2).toFixed(2)}`;
      d += ` Q${cx.toFixed(2)},${p1[1].toFixed(2)} ${p1[0].toFixed(2)},${p1[1].toFixed(2)}`;
    }
    const id = "sg" + ++uid;
    const stroke = opts.stroke || "#3fe3cf";
    el.innerHTML = `<svg class="spark" viewBox="0 0 100 40" preserveAspectRatio="none">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${stroke}" stop-opacity=".26"/>
        <stop offset="100%" stop-color="${stroke}" stop-opacity="0"/>
      </linearGradient></defs>
      <path class="area" d="${d} L100,40 L0,40 Z" fill="url(#${id})"/>
      <path class="line" d="${d}" stroke="${stroke}"/>
    </svg>`;
    const path = el.querySelector(".line");
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    if (STATIC) { path.style.transition = "none"; path.style.strokeDashoffset = 0; }
    else {
      path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)";
      requestAnimationFrame(() => (path.style.strokeDashoffset = 0));
    }
  }

  /* -------- init -------- */
  function init() {
    document.querySelectorAll(".count").forEach((el) => {
      const parentPanel = el.closest(".panel");
      if (parentPanel) parentPanel.style.animationDelay = "0s";
      if (STATIC) countUp(el); else setTimeout(() => countUp(el), 260);
    });

    document.querySelectorAll("[data-w]").forEach((el) => {
      if (STATIC) el.style.width = el.dataset.w + "%";
      else setTimeout(() => (el.style.width = el.dataset.w + "%"), 500);
    });

    document.querySelectorAll(".ticker-track").forEach((tr) => {
      if (!tr.dataset.done) {
        tr.innerHTML += tr.innerHTML;
        tr.dataset.done = "1";
      }
    });

    document.querySelectorAll(".panel").forEach((p, i) => {
      p.style.animationDelay = (0.06 * i).toFixed(2) + "s";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.GZ = { spark, countUp, fitStage };

  /* keyboard: 1/2 to switch, f fullscreen */
  document.addEventListener("keydown", (e) => {
    if (e.key === "1") location.href = "regulatory-dashboard.html";
    if (e.key === "2") location.href = "witness-dashboard.html";
    if (e.key === "f" || e.key === "F") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
  });
})();

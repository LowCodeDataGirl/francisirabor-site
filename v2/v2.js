(() => {
  const url = (p) => window.ASSET_BASE + p;
  const W = window.WORKS;
  const $ = (s, r = document) => r.querySelector(s);
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clean = (s) => s.replace(/<br>/g, " ").replace(/&amp;/g, "&");

  /* Categories come from the portfolio data in works.js. */
  const BLURB = {
    "3d-product-design": "Studio-quality product renders, packaging and launch visuals made before a single unit ships.",
    "3d-product-animation": "Products that turn, open and catch the light: short 3D films for launches and ads.",
    "3d-visualization": "Event spaces and stages visualised in 3D so clients can approve the room before it's built.",
    "illustration": "Characters, banners and editorial illustration with a bold, playful line.",
    "graphics-design": "Campaign posters and social graphics for brands, causes and launches.",
    "motion-graphics": "Explainers, logo reveals and social cut-downs, from 8-second loops to 2-minute films."
  };
  const CATS = window.PORTFOLIO.map((s) => ({ id: s.id, title: clean(s.title), note: s.note, blurb: BLURB[s.id] || s.note, ids: s.frames.map((f) => f[0]) }));
  const CAT_OF = {};
  CATS.forEach((c) => c.ids.forEach((id) => { CAT_OF[id] = c.title; }));
  const ALL = CATS.flatMap((c) => c.ids);

  document.querySelectorAll("[data-asset]").forEach((el) => { el.src = url(el.dataset.asset); });
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  const head = $(".top");
  if (head) { const on = () => head.classList.toggle("scrolled", scrollY > 8); on(); addEventListener("scroll", on, { passive: true }); }

  /* ---------- Tiles ---------- */
  const fmt = (s) => s >= 60 ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}` : `${Math.round(s)}s`;
  const posterT = (w) => Math.min(w.dur * 0.4, 6).toFixed(1);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const v = e.target;
      if (!v.getAttribute("src")) v.src = v.dataset.src + "#t=" + v.dataset.t;
      io.unobserve(v);
    });
  }, { rootMargin: "600px 0px" });

  function tile(id, list, opts = {}) {
    const w = W[id];
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tile";
    b.style.setProperty("--r", w.ratio);
    b.setAttribute("aria-label", `Open ${CAT_OF[id] || "piece"} ${w.type}`);
    if (w.type === "video") {
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.dataset.src = url(w.src); v.dataset.t = posterT(w);
      io.observe(v);
      b.append(v);
      if (!opts.bare) b.insertAdjacentHTML("beforeend", `<span class="dur" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z"/></svg>${fmt(w.dur)}</span>`);
      if (canHover) {
        b.addEventListener("mouseenter", () => { if (!v.getAttribute("src")) v.src = v.dataset.src; b.classList.add("is-previewing"); v.play().catch(() => {}); });
        b.addEventListener("mouseleave", () => { b.classList.remove("is-previewing"); v.pause(); try { v.currentTime = +v.dataset.t; } catch (_) {} });
      }
    } else {
      const img = new Image();
      img.loading = opts.eager ? "eager" : "lazy"; img.decoding = "async"; img.alt = "";
      img.src = url(w.src);
      b.append(img);
    }
    b.addEventListener("click", () => Lightbox.open(list, list.indexOf(id), b));
    return b;
  }

  /* Masonry by known aspect ratios, so every piece keeps its real shape. */
  function mason(el, ids, list, cols) {
    const n = cols();
    const colEls = Array.from({ length: n }, () => { const c = document.createElement("div"); c.className = "col"; return c; });
    const h = new Array(n).fill(0);
    ids.forEach((id) => { const k = h.indexOf(Math.min(...h)); colEls[k].append(tile(id, list)); h[k] += 1 / W[id].ratio + 0.05; });
    el.replaceChildren(...colEls);
    el.dataset.cols = n;
  }
  const masons = [];
  addEventListener("resize", () => { masons.forEach((m) => { if (+m.el.dataset.cols !== m.cols()) mason(m.el, m.ids(), m.list(), m.cols); }); });

  /* ---------- Fill slots: <div data-pieces="a,b,c" data-group="name"> ---------- */
  const groups = {};
  document.querySelectorAll("[data-pieces]").forEach((el) => {
    const g = el.dataset.group || "all";
    (groups[g] = groups[g] || []).push(...el.dataset.pieces.split(","));
  });
  document.querySelectorAll("[data-pieces]").forEach((el) => {
    const g = el.dataset.group || "all";
    const list = g === "all" ? ALL : groups[g];
    el.dataset.pieces.split(",").forEach((id) => el.append(tile(id, list, { eager: el.hasAttribute("data-eager") })));
  });

  const logos = $("#logos");
  if (logos) logos.innerHTML = window.CLIENT_LOGOS.map((p) => `<li><img src="${url(p)}" alt="Client logo" loading="lazy"></li>`).join("");
  document.querySelectorAll(".tool-icons").forEach((t) => { t.innerHTML = window.TOOL_ICONS.map((p) => `<li><img src="${url(p)}" alt="" loading="lazy" width="40" height="40"></li>`).join(""); });

  /* ---------- Dark tabbed portfolio (home) ---------- */
  const tabs = $("#tabs");
  if (tabs) {
    const stage = $("#sc-stage");
    let cur = CATS[CATS.length - 1].id;
    const cols = () => (stage.clientWidth >= 640 ? 3 : 2);
    const curCat = () => CATS.find((c) => c.id === cur);
    CATS.forEach((c) => {
      const t = document.createElement("button");
      t.className = "tab"; t.type = "button"; t.setAttribute("role", "tab"); t.id = "tab-" + c.id;
      t.innerHTML = `<strong>${c.title}</strong><span>${String(c.ids.length).padStart(2, "0")}</span><small>${c.blurb}</small>`;
      t.addEventListener("click", () => { cur = c.id; render(); });
      tabs.append(t);
    });
    const grid = $("#sc-mason");
    const more = $("#sc-more");
    function render() {
      tabs.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", String(t.id === "tab-" + cur)));
      mason(grid, curCat().ids, curCat().ids, cols);
      more.href = "work.html#" + cur;
      more.querySelector("span").textContent = curCat().title;
      const sel = $("#tab-" + cur);
      if (tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = sel.offsetLeft - tabs.offsetLeft - 16;
    }
    masons.push({ el: grid, ids: () => curCat().ids, list: () => curCat().ids, cols });
    render();
  }

  /* ---------- Scrolling wall of work (home closer) ---------- */
  const wall = $("#wall");
  if (wall) {
    const imgs = ALL.filter((id) => W[id].type === "image");
    const half = Math.ceil(imgs.length / 2);
    // Built when the wall comes near the screen; images load right away so the moving lanes never show blanks.
    const build = () => {
      [imgs.slice(0, half), imgs.slice(half)].forEach((set, i) => {
        const lane = document.createElement("div");
        lane.className = "lane" + (i ? " rev" : "");
        [...set, ...set].forEach((id, k) => {
          const t = tile(id, imgs, { eager: true });
          if (k >= set.length) { t.setAttribute("aria-hidden", "true"); t.tabIndex = -1; }
          lane.append(t);
        });
        wall.append(lane);
      });
    };
    const wio = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { wio.disconnect(); build(); } }, { rootMargin: "800px 0px" });
    wio.observe(wall);
  }

  /* ---------- Work page: filters + sections ---------- */
  const workList = $("#work-list");
  if (workList) {
    const filters = $("#filters");
    let only = location.hash.slice(1);
    if (!CATS.some((c) => c.id === only)) only = "all";
    const cols = () => (innerWidth >= 1000 ? 3 : 2);
    const btn = (id, label, n) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "chip-btn"; b.dataset.id = id;
      b.innerHTML = `${label}<sup>${n}</sup>`;
      b.addEventListener("click", () => { only = id; history.replaceState(null, "", id === "all" ? location.pathname : "#" + id); render(); });
      filters.append(b);
    };
    btn("all", "All work", ALL.length);
    CATS.forEach((c) => btn(c.id, c.title, c.ids.length));
    const visible = () => (only === "all" ? ALL : CATS.find((c) => c.id === only).ids);
    function render() {
      filters.querySelectorAll(".chip-btn").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === only)));
      masons.length = 0;
      workList.replaceChildren(...CATS.filter((c) => only === "all" || c.id === only).map((c) => {
        const s = document.createElement("section");
        s.className = "work-sec"; s.id = "sec-" + c.id;
        s.innerHTML = `<div class="work-sec-head"><div><h2 class="h3">${c.title}</h2><p>${c.blurb}</p></div><span class="count">${c.ids.length} pieces</span></div><div class="mason"></div>`;
        const m = $(".mason", s);
        mason(m, c.ids, visible(), cols);
        masons.push({ el: m, ids: () => c.ids, list: visible, cols });
        return s;
      }));
    }
    render();
  }

  /* ---------- Lightbox ---------- */
  const Lightbox = (() => {
    const lb = $("#lb"), stage = $("#lb-stage"), strip = $("#lb-strip");
    let list = [], i = 0, opener = null;
    function media(id, full) {
      const w = W[id];
      if (w.type === "video") {
        const v = document.createElement("video");
        v.playsInline = true; v.setAttribute("playsinline", "");
        if (full) { v.src = url(w.src); v.controls = true; v.autoplay = true; v.loop = true; v.preload = "auto"; }
        else { v.src = url(w.src) + "#t=" + posterT(w); v.muted = true; v.preload = "metadata"; }
        return v;
      }
      const img = new Image();
      img.src = url(w.src); img.alt = ""; img.decoding = "async";
      return img;
    }
    function show(dir) {
      const id = list[i];
      stage.querySelectorAll("video").forEach((v) => v.pause());
      const slide = document.createElement("div");
      slide.className = "slide" + (dir < 0 ? " from-left" : "");
      const m = media(id, true);
      slide.append(m);
      stage.replaceChildren(slide);
      if (m.tagName === "VIDEO") m.play().catch(() => {});
      $("#lb-cat").textContent = CAT_OF[id] || "";
      $("#lb-count").textContent = `${i + 1} / ${list.length}`;
      strip.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
      strip.children[i]?.scrollIntoView({ block: "nearest", inline: "center" });
      [list[(i + 1) % list.length], list[(i - 1 + list.length) % list.length]].forEach((n) => {
        if (W[n].type === "image") { const p = new Image(); p.src = url(W[n].src); }
      });
    }
    function go(d) { i = (i + d + list.length) % list.length; show(d); }
    function open(l, idx, from) {
      list = l; i = Math.max(0, idx); opener = from;
      strip.replaceChildren(...list.map((id, k) => {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("aria-label", `Go to piece ${k + 1}`);
        const m = media(id, false);
        if (m.tagName === "IMG") m.loading = "lazy";
        b.append(m);
        b.addEventListener("click", () => { const d = k > i ? 1 : -1; i = k; show(d); });
        return b;
      }));
      lb.hidden = false;
      document.body.classList.add("lb-open");
      show(1);
      $("#lb-close").focus();
    }
    function close() {
      stage.querySelectorAll("video").forEach((v) => v.pause());
      stage.replaceChildren(); strip.replaceChildren();
      lb.hidden = true;
      document.body.classList.remove("lb-open");
      opener?.focus({ preventScroll: true });
    }
    $("#lb-close").addEventListener("click", close);
    $("#lb-prev").addEventListener("click", () => go(-1));
    $("#lb-next").addEventListener("click", () => go(1));
    stage.addEventListener("click", (e) => { if (e.target === stage || e.target.classList.contains("slide")) close(); });
    addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    });
    let sx = 0, sy = 0;
    stage.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
    }, { passive: true });
    return { open };
  })();
})();

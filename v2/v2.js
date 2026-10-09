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
  const NEW = window.NEW_WORKS || {};
  const HIDE = window.HIDDEN_WORKS || [];
  const TITLES = window.V2_TITLES || {};
  let CATS = window.PORTFOLIO.map((s) => ({ id: s.id, title: TITLES[s.id] || clean(s.title), note: s.note, blurb: BLURB[s.id] || s.note, ids: [...(NEW[s.id] || []), ...s.frames.map((f) => f[0])].filter((id) => !HIDE.includes(id)) }));
  if (window.V2_ORDER) {
    // Strongest work first: reorder categories, then pieces (anything not listed keeps its place at the end).
    const byId = Object.fromEntries(CATS.map((c) => [c.id, c]));
    CATS = window.V2_ORDER.filter(([id]) => byId[id]).map(([id, order]) => {
      const c = byId[id];
      c.ids = [...order.filter((x) => c.ids.includes(x)), ...c.ids.filter((x) => !order.includes(x))];
      return c;
    }).concat(CATS.filter((c) => !window.V2_ORDER.some(([id]) => id === c.id)));
  }
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
      if (w.poster) v.poster = url(w.poster);
      if (opts.autoplay && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Feed-style: plays silently on its own, opens with sound when clicked.
        v.autoplay = true; v.setAttribute("autoplay", ""); v.preload = "auto"; v.src = v.dataset.src;
        b.classList.add("is-previewing");
      } else io.observe(v);
      b.append(v);
      if (!opts.bare) b.insertAdjacentHTML("beforeend", `<span class="dur" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z"/></svg>${fmt(w.dur)}</span>`);
      if (canHover && !opts.autoplay) {
        b.addEventListener("mouseenter", () => { if (!v.getAttribute("src")) v.src = v.dataset.src; b.classList.add("is-previewing"); v.play().catch(() => {}); });
        b.addEventListener("mouseleave", () => { b.classList.remove("is-previewing"); v.pause(); try { v.currentTime = +v.dataset.t; } catch (_) {} });
      }
    } else {
      const img = new Image();
      img.loading = opts.eager ? "eager" : "lazy"; img.decoding = "async"; img.alt = "";
      img.src = url(w.src);
      b.append(img);
      if (!opts.bare) b.insertAdjacentHTML("beforeend", `<span class="zoom" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9"/></svg></span>`);
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
    el.dataset.pieces.split(",").forEach((id) => el.append(tile(id, list, { eager: el.hasAttribute("data-eager"), autoplay: el.hasAttribute("data-autoplay"), bare: el.hasAttribute("data-bare") })));
  });

  document.querySelectorAll(".marquee").forEach((m) => {
    const items = (window.CLIENTS || []).map((c) => c.img
      ? `<li class="${c.text ? "word" : ""}"><img src="${url(c.img)}" alt="${c.name}" loading="lazy">${c.text || ""}</li>`
      : `<li class="word"><img class="ico" src="${url(c.icon)}" alt="">${c.text}</li>`).join("");
    // Two copies side by side make the loop seamless; the copy is hidden from screen readers.
    m.innerHTML = `<ul class="mq-track">${items}</ul><ul class="mq-track" aria-hidden="true">${items}</ul>`;
  });
  const ai = $("#ai-tools");
  if (ai) ai.innerHTML = (window.AI_TOOLS || []).map((t) => `<li>${t}</li>`).join("");
  const logos = $("#logos");
  if (logos) logos.innerHTML = window.CLIENT_LOGOS.map((p) => `<li><img src="${url(p)}" alt="Client logo" loading="lazy"></li>`).join("");
  document.querySelectorAll(".tool-icons").forEach((t) => { t.innerHTML = [...window.TOOL_ICONS, ...(window.AI_TOOL_ICONS || [])].map((p) => `<li><img src="${url(p)}" alt="" loading="lazy" width="40" height="40"></li>`).join(""); });

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
      b.textContent = label;
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
        s.innerHTML = `<div class="work-sec-head"><h3 class="h3">${c.title}</h3><p>${c.blurb}</p></div><div class="mason"></div>`;
        const m = $(".mason", s);
        mason(m, c.ids, visible(), cols);
        masons.push({ el: m, ids: () => c.ids, list: visible, cols });
        return s;
      }));
    }
    render();
    // Links like work.html#motion-graphics open that discipline and jump to it.
    if (only !== "all") requestAnimationFrame(() => $("#all").scrollIntoView());
  }

  /* ---------- Featured projects (work page) ---------- */
  const cases = $("#cases");
  if (cases) {
    const list = (window.CASES || []).map((c) => c.id);
    (window.CASES || []).forEach((c, k) => {
      const a = document.createElement("article");
      a.className = "case" + (W[c.id].ratio < 1 ? " tall" : "") + (k % 2 ? " flip" : "");
      a.innerHTML = `<div class="case-media"></div>
        <div class="case-copy">
          <span class="eyebrow">${c.client}</span>
          <h3 class="h3">${c.title}</h3>
          <p>${c.summary}</p>
          <dl class="case-facts">${c.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
          <button type="button" class="tlink case-play">Watch the film ${'<span class="arr" aria-hidden="true">→</span>'}</button>
        </div>`;
      const t = tile(c.id, list);
      $(".case-media", a).append(t);
      $(".case-play", a).addEventListener("click", () => t.click());
      cases.append(a);
    });
  }

  /* ---------- Case studies page: compact cards that open into the full story ---------- */
  const csList = $("#case-list");
  if (csList && window.CASE_FILES) {
    const TOOL = {
      "After Effects": ["Ae", "#9999ff", "#00005b"], "Premiere Pro": ["Pr", "#9999ff", "#00005b"],
      "Photoshop": ["Ps", "#31a8ff", "#001e36"], "Illustrator": ["Ai", "#ff9a00", "#330000"],
      "Substance 3D Painter": ["Pt", "#fe2c55", "#1a0a10"], "Blender": ["Bl", "#ffffff", "#e87d0d"],
      "Figma": ["Fg", "#ffffff", "#a259ff"], "Midjourney": ["Mj", "#ffffff", "#111111"], "Adobe Firefly": ["Ff", "#ffffff", "#e5352b"]
    };
    const badge = (t) => { const [ab, fg, bg] = TOOL[t] || [t.slice(0, 2), "#fff", "#333"]; return `<li><span class="tb" style="color:${fg};background:${bg}" aria-hidden="true">${ab}</span>${t}</li>`; };
    const paras = (ps) => (ps || []).map((p) => `<p>${p}</p>`).join("");
    window.CASE_FILES.forEach((c, k) => {
      const group = [c.hero, ...c.details.map((d) => d.work)];
      const n = String(k + 1).padStart(2, "0");
      const a = document.createElement("article");
      a.className = "csx"; a.id = c.id;
      a.innerHTML = `
        <button class="csx-sum" aria-expanded="false" aria-controls="${c.id}-body">
          <span class="csx-cover"></span>
          <span class="csx-text">
            <span class="csx-meta"><span class="csx-n">${n}</span><span class="eyebrow">${c.category}</span><span class="csx-client">${c.client}</span></span>
            <span class="csx-title">${c.title}</span>
            <span class="csx-lede">${c.summary}</span>
            <span class="csx-tools">${c.tools.join(" · ")}</span>
            <span class="csx-open"><span class="csx-open-t">Read case study</span><span class="csx-plus" aria-hidden="true"></span></span>
          </span>
        </button>
        <div class="csx-body" id="${c.id}-body" role="region" aria-label="${c.client} case study"><div class="csx-in">
          <dl class="csx-facts"><div><dt>Client</dt><dd>${c.client}</dd></div><div><dt>Category</dt><dd>${c.category}</dd></div>${c.facts.map(([x, y]) => `<div><dt>${x}</dt><dd>${y}</dd></div>`).join("")}</dl>
          <div class="csx-cols">
            <div><h3 class="label">Overview</h3>${paras(c.overview)}</div>
            <div><h3 class="label">The challenge</h3>${paras(c.challenge)}</div>
          </div>
          <div class="csx-mid"><figure class="csx-hero"></figure>
          <div class="csx-approach"><h3 class="label">The approach</h3>${paras(c.approach)}</div></div>
          <div class="csx-details">${c.details.map((d, i) => `
            <figure class="csx-fig"><div class="csx-fig-m" data-i="${i}"></div>
              <figcaption><span class="csx-fig-n">${String(i + 1).padStart(2, "0")}</span><b>${d.title}</b><span>${d.note}</span></figcaption></figure>`).join("")}
          </div>
          <div class="csx-foot">
            <div><h3 class="label">Tools used</h3><ul class="csx-tb">${c.tools.map(badge).join("")}</ul></div>
            <button class="tlink csx-close" type="button">Close case study <span class="arr" aria-hidden="true">↑</span></button>
          </div>
        </div></div>`;
      const cover = W[c.cover];
      const img = new Image(); img.alt = ""; img.loading = "lazy"; img.decoding = "async";
      img.src = url(cover.type === "video" ? (cover.poster || "") : cover.src);
      if (c.coverPos) $(".csx-cover", a).style.setProperty("--cp", c.coverPos);
      $(".csx-cover", a).append(img);
      if (W[c.hero].ratio < 1) $(".csx-mid", a).classList.add("tall");
      if (cover.type === "video") $(".csx-cover", a).insertAdjacentHTML("beforeend", `<span class="csx-play" aria-hidden="true">▶</span>`);
      const sum = $(".csx-sum", a), body = $(".csx-body", a);
      let built = false;
      const set = (open) => {
        if (open && !built) {
          built = true;
          $(".csx-hero", a).append(tile(c.hero, group, { autoplay: true }));
          c.details.forEach((d, i) => $(`.csx-fig-m[data-i="${i}"]`, a).append(tile(d.work, group)));
        }
        a.classList.toggle("open", open); sum.setAttribute("aria-expanded", String(open));
        $(".csx-open-t", a).textContent = open ? "Close case study" : "Read case study";
        if (open) history.replaceState(null, "", "#" + c.id);
      };
      sum.addEventListener("click", () => set(!a.classList.contains("open")));
      $(".csx-close", a).addEventListener("click", () => { set(false); a.scrollIntoView({ behavior: "smooth", block: "start" }); });
      csList.append(a);
      if (location.hash === "#" + c.id) { set(true); requestAnimationFrame(() => a.scrollIntoView({ block: "start" })); }
    });
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
      $("#lb-cat").textContent = W[id].title ? `${W[id].title} · ${W[id].caption}` : (CAT_OF[id] || "");
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

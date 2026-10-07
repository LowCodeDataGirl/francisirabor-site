(() => {
  const url = (p) => window.ASSET_BASE + p;
  const W = window.WORKS;
  const $ = (s) => document.querySelector(s);
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const CAT = {};
  window.PORTFOLIO.forEach((sec) => sec.frames.forEach(([id]) => { CAT[id] = sec.title.replace(/<br>/g, " ").replace("&amp;", "&"); }));

  document.querySelectorAll("[data-asset]").forEach((el) => { el.src = url(el.dataset.asset); });

  const fmt = (s) => s >= 60 ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}` : `${s.toFixed(1)}s`;
  // A frame from ~40% in, because many animations open on a blank frame.
  const posterT = (w) => Math.min(w.dur * 0.4, 6).toFixed(1);

  /* Videos only start downloading when they come near the screen. */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const v = e.target;
      if (!v.getAttribute("src")) v.src = v.dataset.src + "#t=" + v.dataset.t;
      io.unobserve(v);
    });
  }, { rootMargin: "500px 0px" });

  function tile(id, list) {
    const w = W[id];
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tile";
    b.setAttribute("aria-label", `Open ${CAT[id] || "piece"} ${w.type}`);
    if (w.type === "video") {
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.dataset.src = url(w.src); v.dataset.t = posterT(w);
      io.observe(v);
      b.append(v);
      b.insertAdjacentHTML("beforeend", `<span class="chip" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 1l7 4-7 4z"/></svg>${fmt(w.dur)}</span>`);
      if (canHover) {
        b.addEventListener("mouseenter", () => { if (!v.getAttribute("src")) v.src = v.dataset.src; b.classList.add("is-previewing"); v.play().catch(() => {}); });
        b.addEventListener("mouseleave", () => { b.classList.remove("is-previewing"); v.pause(); try { v.currentTime = +v.dataset.t; } catch (_) {} });
      }
    } else {
      const img = new Image();
      img.loading = "lazy"; img.decoding = "async"; img.alt = "";
      img.src = url(w.src);
      b.append(img);
    }
    b.addEventListener("click", () => Lightbox.open(list, list.indexOf(id), b));
    return b;
  }

  const boxStyle = (x, y, w, h) => `--x:${x};--y:${y};--w:${w};--bh:${h}`;

  /* Home: clients, tools, featured cards */
  const logos = $("#logos");
  if (logos) logos.innerHTML = window.CLIENT_LOGOS.map((p) => `<li><img src="${url(p)}" alt="Client logo" loading="lazy"></li>`).join("");
  const tools = $("#tools");
  if (tools) tools.innerHTML = window.TOOL_ICONS.map((p) => `<li><img src="${url(p)}" alt="" loading="lazy" width="90" height="90"></li>`).join("");

  const featured = $("#featured");
  if (featured) {
    const list = window.FEATURED.map((f) => f.id);
    const btn = featured.querySelector(".btn");
    window.FEATURED.forEach((f) => {
      const [x, y, w, h] = f.box;
      const wrap = document.createElement("div");
      wrap.className = "card-wrap abs";
      wrap.style.cssText = `--x:${x};--y:${y};--w:${w}`;
      const card = document.createElement("div");
      card.className = "card";
      card.style.setProperty("--ch", h);
      card.append(tile(f.id, list));
      const label = document.createElement("a");
      label.className = "card-label";
      label.href = `portfolio.html#${f.link}`;
      label.textContent = f.label;
      label.style.cssText = "display:block;margin-top:calc(14 / 13.51 * 1cqw)";
      wrap.append(card, label);
      featured.insertBefore(wrap, btn);
    });
  }

  /* Portfolio page: one collage per category, all in one swipeable list */
  const folio = $("#folio");
  if (folio) {
    const all = window.PORTFOLIO.flatMap((s) => s.frames.map(([id]) => id));
    window.PORTFOLIO.forEach((s) => {
      const sec = document.createElement("section");
      sec.className = `folio-sec ${s.bg}`;
      sec.id = s.id;
      const c = document.createElement("div");
      c.className = "canvas";
      c.style.setProperty("--h", s.h);
      c.innerHTML = `<h2 class="abs" style="--x:${s.t[0]};--y:${s.t[1]};--w:${s.t[2]}">${s.title}</h2>` +
        `<p class="note abs" style="--x:${s.n[0]};--y:${s.n[1]};--w:${s.n[2]}">${s.note}</p>`;
      s.frames.forEach(([id, x, y, w, h]) => {
        const f = document.createElement("div");
        f.className = "frame abs boxed" + (W[id].ratio >= 1.6 ? " span2" : "");
        f.style.cssText = boxStyle(x, y, w, h) + `;--r:${W[id].ratio}`;
        f.append(tile(id, all));
        c.append(f);
      });
      sec.append(c);
      folio.append(sec);
    });
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }

  /* ---------- Lightbox: click any piece to open it full screen ---------- */
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
      $("#lb-cat").textContent = CAT[id] || "";
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

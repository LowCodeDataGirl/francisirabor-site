(() => {
  const BASE = window.ASSET_BASE;
  const url = (p) => BASE + p;
  const WORKS = window.WORKS;
  const CATS = window.CATEGORIES;
  const byId = Object.fromEntries(WORKS.map((w) => [w.id, w]));
  const catLabel = Object.fromEntries(CATS.map((c) => [c.id, c.label]));
  const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s) => document.querySelector(s);

  document.getElementById("yr").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-asset]").forEach((el) => { el.src = url(el.dataset.asset); });

  // Clients + tools
  $("#logos").innerHTML = window.CLIENT_LOGOS.map((p) => `<li><img src="${url(p)}" alt="Client logo" loading="lazy"></li>`).join("");
  $("#tools").innerHTML = window.TOOL_ICONS.map((p) => `<li><img src="${url(p)}" alt="" loading="lazy" width="48" height="48"></li>`).join("");

  // Many animations open on a blank frame, so thumbnails show a moment ~40% in.
  const posterT = (w) => (w.dur * 0.4).toFixed(1);

  const ratioName = (r) => {
    const known = [[16/9, "16:9"], [9/16, "9:16"], [1, "1:1"], [4/5, "4:5"], [3, "3:1"], [3/2, "3:2"]];
    const hit = known.find(([v]) => Math.abs(v - r) < 0.03);
    return hit ? hit[1] : r.toFixed(2) + ":1";
  };

  /* ---------- Tiles ---------- */
  // Videos load lazily: src is set when the tile nears the viewport, and the
  // "#t=" fragment makes phones paint a real frame instead of a black box.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const v = e.target;
      if (!v.src) { v.src = v.dataset.src + "#t=" + v.dataset.t; }
      io.unobserve(v);
    });
  }, { rootMargin: "400px 0px" });

  function tile(w, listGetter) {
    const b = document.createElement("button");
    b.className = "tile";
    b.type = "button";
    b.style.setProperty("--r", w.ratio);
    b.setAttribute("aria-label", `Open ${catLabel[w.cat]} ${w.type === "video" ? "video" : "image"}`);
    if (w.type === "video") {
      const v = document.createElement("video");
      v.muted = true; v.playsInline = true; v.loop = true; v.preload = "metadata";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.dataset.src = url(w.src);
      v.dataset.t = posterT(w);
      io.observe(v);
      b.append(v);
      b.insertAdjacentHTML("beforeend", `<span class="play" aria-hidden="true">▶</span><span class="tag">${w.dur.toFixed(1)}s · ${ratioName(w.ratio)}</span>`);
      if (canHover) {
        b.addEventListener("mouseenter", () => {
          if (!v.src) v.src = v.dataset.src;
          b.classList.add("is-previewing");
          v.play().catch(() => {});
        });
        b.addEventListener("mouseleave", () => {
          b.classList.remove("is-previewing");
          v.pause(); try { v.currentTime = +v.dataset.t; } catch (_) {}
        });
      }
    } else {
      const img = new Image();
      img.loading = "lazy"; img.decoding = "async"; img.alt = "";
      img.src = url(w.src);
      b.append(img);
    }
    b.addEventListener("click", () => {
      const list = listGetter();
      Lightbox.open(list, list.findIndex((x) => x.id === w.id), b);
    });
    return b;
  }

  /* ---------- Featured ---------- */
  const featured = window.FEATURED.map((id) => byId[id]);
  $("#featured").append(...featured.map((w) => { const d = document.createElement("div"); d.append(tile(w, () => featured)); return d; }));

  /* ---------- Portfolio grid ---------- */
  let filter = "all";
  try { filter = localStorage.getItem("fi-filter") || "all"; } catch (_) {}
  if (filter !== "all" && !catLabel[filter]) filter = "all";
  const current = () => (filter === "all" ? WORKS : WORKS.filter((w) => w.cat === filter));

  const filtersEl = $("#filters");
  const chips = [{ id: "all", label: "All work" }, ...CATS].map((c) => {
    const n = c.id === "all" ? WORKS.length : WORKS.filter((w) => w.cat === c.id).length;
    const btn = document.createElement("button");
    btn.className = "chip"; btn.type = "button"; btn.role = "tab"; btn.id = "f-" + c.id;
    btn.innerHTML = `${c.label}<sup>${n}</sup>`;
    btn.addEventListener("click", () => { filter = c.id; try { localStorage.setItem("fi-filter", filter); } catch (_) {} renderGrid(); });
    filtersEl.append(btn);
    return btn;
  });

  const colCount = () => (innerWidth >= 1000 ? 3 : innerWidth >= 560 ? 2 : 1);
  let lastCols = 0;

  function renderGrid() {
    const items = current();
    chips.forEach((ch) => ch.setAttribute("aria-selected", String(ch.id === "f-" + filter)));
    const cat = CATS.find((c) => c.id === filter);
    $("#cat-note").textContent = cat ? cat.note : "Motion, 3D and design work for clients in finance, publishing, fashion, music, culture and tech.";
    const vids = items.filter((w) => w.type === "video").length;
    $("#count").textContent = `${items.length} pieces · ${vids} video`;

    // Shortest-column placement using known aspect ratios: keeps every piece at
    // its true shape (no cropped edges) and keeps the reading order left-to-right.
    const n = colCount(); lastCols = n;
    const cols = Array.from({ length: n }, () => { const c = document.createElement("div"); c.className = "col"; return c; });
    const heights = new Array(n).fill(0);
    items.forEach((w, i) => {
      const k = heights.indexOf(Math.min(...heights));
      const t = tile(w, current);
      t.style.animationDelay = Math.min(i * 30, 300) + "ms";
      cols[k].append(t);
      heights[k] += 1 / w.ratio + 0.04;
    });
    const grid = $("#grid");
    grid.querySelectorAll("video").forEach((v) => io.unobserve(v));
    grid.replaceChildren(...cols);
  }
  renderGrid();
  let rT;
  addEventListener("resize", () => { clearTimeout(rT); rT = setTimeout(() => { if (colCount() !== lastCols) renderGrid(); }, 150); });

  /* ---------- Lightbox ---------- */
  const Lightbox = (() => {
    const lb = $("#lb"), stage = $("#lb-stage"), strip = $("#lb-strip");
    let list = [], i = 0, opener = null;

    function media(w, full) {
      if (w.type === "video") {
        const v = document.createElement("video");
        v.src = url(w.src) + (full ? "" : "#t=" + posterT(w));
        v.playsInline = true; v.setAttribute("playsinline", "");
        if (full) { v.controls = true; v.autoplay = true; v.loop = true; v.preload = "auto"; }
        else { v.muted = true; v.preload = "metadata"; }
        return v;
      }
      const img = new Image();
      img.src = url(w.src); img.alt = `${catLabel[w.cat]} piece`; img.decoding = "async";
      return img;
    }

    function show(dir) {
      const w = list[i];
      stage.querySelectorAll("video").forEach((v) => v.pause());
      const slide = document.createElement("div");
      slide.className = "slide" + (dir < 0 ? " from-left" : "");
      const m = media(w, true);
      slide.append(m);
      stage.replaceChildren(slide);
      if (m.tagName === "VIDEO") m.play().catch(() => {});

      $("#lb-cat").textContent = catLabel[w.cat];
      $("#lb-spec").textContent = (w.type === "video" ? w.dur.toFixed(1) + "s · " : "") + ratioName(w.ratio);
      $("#lb-count").textContent = `${String(i + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
      strip.querySelectorAll("button").forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
      strip.children[i]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });

      // Warm the neighbours so "next" feels instant.
      [list[(i + 1) % list.length], list[(i - 1 + list.length) % list.length]].forEach((n) => {
        if (n.type === "image") { const p = new Image(); p.src = url(n.src); }
      });
    }

    function go(d) { i = (i + d + list.length) % list.length; show(d); }

    function open(l, idx, from) {
      list = l; i = Math.max(0, idx); opener = from;
      strip.replaceChildren(...list.map((w, k) => {
        const b = document.createElement("button");
        b.type = "button"; b.setAttribute("aria-label", `Go to piece ${k + 1}`);
        const m = w.type === "video" ? media(w, false) : media(w, false);
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
      else if (e.key === "Tab") { // keep focus inside the viewer
        const f = [...lb.querySelectorAll("button, video[controls]")].filter((el) => el.offsetParent);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Swipe left/right on phones.
    let sx = 0, sy = 0, tracking = false;
    stage.addEventListener("touchstart", (e) => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; tracking = true; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
      if (!tracking) return; tracking = false;
      const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
    }, { passive: true });

    return { open };
  })();
})();

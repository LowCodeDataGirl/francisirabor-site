// Bakes the script-built Work grid and Case studies into the HTML, so search engines and
// AI crawlers that don't run JavaScript still see every project and all case-study text.
// Run after build.py, with a local server on :8765 at the repo root:
//   python3 -m http.server 8765 &   then   NODE_PATH=<dir with playwright> node v2/prerender.js
const { chromium } = require("playwright");
const fs = require("fs"), path = require("path");
const jobs = [
  { file: "work.html", ids: ["filters", "work-list"] },
  { file: "case-studies.html", ids: ["case-list"], openAll: true },
];
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
  for (const j of jobs) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto("http://localhost:8765/v2/" + j.file, { waitUntil: "load" });
    await p.waitForTimeout(800);
    if (j.openAll) await p.evaluate(() => document.querySelectorAll(".csx-sum").forEach((s) => { s.click(); s.click(); }));
    const parts = await p.evaluate((ids) => ids.map((id) => {
      const el = document.getElementById(id).cloneNode(true);
      el.querySelectorAll("video").forEach((v) => { v.removeAttribute("src"); v.removeAttribute("autoplay"); v.preload = "none"; });
      el.querySelectorAll(".is-previewing").forEach((x) => x.classList.remove("is-previewing"));
      return [id, el.innerHTML];
    }), j.ids);
    const f = path.join(__dirname, j.file);
    let html = fs.readFileSync(f, "utf8");
    for (const [id, inner] of parts) {
      const re = new RegExp(`(<div[^>]*id="${id}"[^>]*>)(</div>)`);
      if (!re.test(html)) throw new Error("slot not found: " + id);
      html = html.replace(re, (_, a, z) => a + inner + z);
    }
    fs.writeFileSync(f, html);
    console.log(j.file, "prerendered", parts.map(([id, h]) => `${id}:${h.length}`).join(" "));
    await p.close();
  }
  await b.close();
})();

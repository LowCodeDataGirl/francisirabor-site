/* Portfolio data — edit this file to change the work shown on the site.
   type: "image" | "video"   ratio: width / height   dur: video length in seconds
   Layout boxes (x, y, w, h) are in the original Canva design's pixels
   (1351 wide); they're scaled to the screen automatically.               */
window.ASSET_BASE = window.ASSET_BASE || "assets/";

window.WORKS = {
  // New work (added Oct 2026)
  sr1: { type: "video", src: "video/story-roll-welcome.mp4", poster: "media/story-roll-welcome.jpg", ratio: 9/16, dur: 15.0, title: "Story Roll", caption: "First-use welcome video" },
  lw1: { type: "video", src: "video/loopwise-saas-launch.mp4", poster: "media/loopwise-saas-launch.jpg", ratio: 16/9, dur: 20.0, title: "Loopwise", caption: "SaaS launch film" },
  // 3D product design
  p1: { type: "image", src: "media/09437fe339a3f55db56ba86aab9ef504.png", ratio: 16/9 },
  p2: { type: "image", src: "media/cfbd9b1e1c3305fa9b6ea3251aae517c.png", ratio: 16/9 },
  p3: { type: "image", src: "media/ed9a288d15e4bbb8635b634007a941d6.png", ratio: 16/9 },
  p4: { type: "image", src: "media/09dd58807f4f6aa71111e41c9d42ff6a.png", ratio: 9/16 },
  p5: { type: "image", src: "media/99d772e7962ee05874c4bfa1ff15fa98.png", ratio: 9/16 },
  // 3D product animation
  pa1: { type: "video", src: "video/7fa30edd5d6446a39c7f89de1c001730.mp4", ratio: 16/9, dur: 75.0 },
  pa2: { type: "video", src: "video/f1f17b117e4568a99eacdb3451539182.mp4", ratio: 16/9, dur: 41.0 },
  pa3: { type: "video", src: "video/585d3ce5d0596485886073c036506d0f.mp4", ratio: 16/9, dur: 23.3 },
  pa4: { type: "video", src: "video/dfd50b07159de7541451f6fc9f3c8b5b.mp4", ratio: 16/9, dur: 35.0 },
  // 3D visualization
  v1: { type: "image", src: "media/1e3bb55e6e7b46f37e0a7a83d4a42de3.png", ratio: 1 },
  v2: { type: "image", src: "media/9c8e3b897872f3e4bbb4ea5da65d21b5.png", ratio: 16/9 },
  v3: { type: "image", src: "media/b68aa6cc644986c4cbf8bc2a04b3456b.png", ratio: 16/9 },
  v4: { type: "image", src: "media/0f88d18fdf5fde2d5cfdf3f187148311.png", ratio: 16/9 },
  v5: { type: "image", src: "media/63d002568a0854b513b0c341d6177484.png", ratio: 16/9 },
  // Illustration
  i1: { type: "image", src: "media/360fbfd40c7cb8f304fcd57083789339.jpg", ratio: 800/533 },
  i2: { type: "image", src: "media/d3b0cda87ba5d1f70ea99d9f1c342658.png", ratio: 3 },
  i3: { type: "image", src: "media/a05d277995c0b3e1755fcb46b8fccaa4.png", ratio: 1 },
  i4: { type: "image", src: "media/a64a16e042c7b94df746c8ac81d02764.jpg", ratio: 1 },
  i5: { type: "image", src: "media/8baec2c13a94b974d02cc53286449cb5.png", ratio: 1599/533 },
  // Graphic design
  g1: { type: "image", src: "media/649fcde39979de2ebe30f4cdb6e990ea.png", ratio: 799/740 },
  g2: { type: "image", src: "media/82478ac93bde5bc2c4594977b5599de2.png", ratio: 1 },
  g3: { type: "image", src: "media/4bb7cce120ad9bbe8968f4dd5a8ad7a0.png", ratio: 4/5 },
  g4: { type: "image", src: "media/3aaf99e6fed8af542ab3c4d4f2cbf89d.png", ratio: 4/5 },
  // Motion graphics & animation
  m1: { type: "video", src: "video/b1d728a5cb78970fb9fef3514e860b6c.mp4", ratio: 9/16, dur: 14.0 },
  m2: { type: "video", src: "video/bd13c2fb820cd71023d71b2a40df5949.mp4", ratio: 9/16, dur: 43.0 },
  m3: { type: "video", src: "video/518b533e5822d5d4873fbea2cc819cbf.mp4", ratio: 9/16, dur: 33.0 },
  m4: { type: "video", src: "video/eb2c527cbcafc77a934c8045da038de4.mp4", ratio: 1, dur: 77.6 },
  m5: { type: "video", src: "video/ef172301dd445e90e5a33db30685c94d.mp4", ratio: 4/5, dur: 10.0 },
  m6: { type: "video", src: "video/a2fb0629f9e4c42c0ae762201ab54e79.mp4", ratio: 4/5, dur: 8.0 },
  m7: { type: "video", src: "video/0f1ee5330939d3390b630e6a4cb4d5e8.mp4", ratio: 16/9, dur: 127.1 },
  m8: { type: "video", src: "video/4136836128b91d252db0accff1d7032f.mp4", ratio: 16/9, dur: 19.0 }
};

/* Portfolio page: one section per category, in page order. */
window.PORTFOLIO = [
  { id: "3d-product-design", title: "3D Product<br>Design", note: "3D Product Design for clients in various industry, 2025",
    h: 760, bg: "white", t: [64, 147, 531], n: [64, 291, 300],
    frames: [["p1", 478, 140, 378, 175], ["p2", 897, 140, 378, 175], ["p3", 277, 354, 420, 329], ["p4", 741, 354, 230, 329], ["p5", 1015, 354, 260, 329]] },
  { id: "3d-product-animation", title: "3D Product Animation", note: "3D Product Animations for clients in various industry, 2025",
    h: 760, bg: "grey", t: [76, 123, 531], n: [76, 267, 300],
    frames: [["pa1", 485, 87, 383, 215], ["pa2", 908, 87, 383, 215], ["pa3", 163, 352, 518, 291], ["pa4", 730, 352, 561, 291]] },
  { id: "3d-visualization", title: "3D Visualization", note: "3D event visualization for clients in various industry, 2025",
    h: 760, bg: "white", t: [76, 109, 507], n: [76, 185, 286],
    frames: [["v1", 923, 92, 373, 373], ["v2", 582, 297, 298, 167], ["v3", 42, 381, 540, 304], ["v4", 582, 497, 332, 187], ["v5", 943, 497, 332, 187]] },
  { id: "illustration", title: "Illustration", note: "Illustration for clients in various industry, 2025",
    h: 760, bg: "grey", t: [80, 71, 425], n: [80, 139, 408],
    frames: [["i1", 806, 101, 454, 258], ["i2", 230, 200, 552, 159], ["i3", 168, 380, 320, 304], ["i4", 506, 380, 301, 304], ["i5", 824, 380, 451, 304]] },
  { id: "graphics-design", title: "Graphics<br>Design", note: "Marketing posters for clients in various industry, 2025",
    h: 760, bg: "white", t: [76, 73, 466], n: [76, 217, 263],
    frames: [["g1", 984, 67, 291, 225], ["g2", 76, 302, 466, 381], ["g3", 568, 165, 390, 519], ["g4", 984, 321, 291, 363]] },
  { id: "motion-graphics", title: "Motion Graphics &amp;<br>Animations", note: "Animations for clients in various industry, 2025",
    h: 1213, bg: "white", t: [44, 82, 600], n: [44, 286, 313],
    frames: [["m1", 480, 38, 236, 414], ["m2", 761, 38, 233, 414], ["m3", 1040, 38, 233, 414], ["m4", 222, 476, 369, 369], ["m5", 634, 472, 297, 372], ["m6", 975, 472, 297, 372], ["m7", 199, 891, 510, 287], ["m8", 762, 891, 510, 287]] }
];

/* Home page "Featured works" cards: piece, label, which portfolio section the label links to. */
window.FEATURED = [
  { id: "g1",  label: "Graphics Design",            link: "graphics-design",      box: [183, 93, 447, 251] },
  { id: "pa3", label: "3D Product Visualization",   link: "3d-product-animation", box: [721, 93, 447, 251] },
  { id: "v4",  label: "3D Design",                  link: "3d-visualization",     box: [183, 400, 447, 251] },
  { id: "i2",  label: "Illustration",               link: "illustration",         box: [721, 400, 447, 251] },
  { id: "m7",  label: "Motion Graphics & Animations", link: "motion-graphics",    box: [454, 694, 443, 249] }
];

window.CLIENT_LOGOS = [
  "media/7346805f01cd931e6cae717becf2e1b9.png", "media/ff3e706cac420628fbbd872221351aad.png",
  "media/cda8aca2d9626228318d3ccc2e7cc72b.png", "media/4cbae8ea3cc8525632dcff64f9fc8aa6.png",
  "media/fa371bc5b47ad61936281e5c776d29ca.png", "media/f0c255c817b42fe8b2a6dfabb900338e.svg",
  "media/fae87f258474cd6bee9e0c2b0d6209da.png"
];

window.TOOL_ICONS = [
  "media/5941d47cd4930b564721123d25384aff.jpg", "media/20b2843250d90c73e530a72472ae51c5.jpg",
  "media/280c25fc9549be9638b7cd2dcb1caa9a.jpg", "media/3a0cd4259a4f9bfd581b0e3b0e748c9c.jpg",
  "media/88c22b3697073a5310bd0e16de9530b4.jpg", "media/187b6b115b0e6e42e1ee4e1e6e24c6e2.jpg",
  "media/e55c6b7c86d56b245f4161fcfad5ce72.jpg", "media/92624d12ec5595452fe1fb31600f5936.jpg",
  "media/05421036332fee4d966c9d49bb7de1cc.jpg", "media/48b58a35d79a9bb2e85849d439a0a267.jpg",
  "media/52cdb30401ac4c50e5f56a4f3878f460.jpg", "media/6db4f5893aeb29343777212c5c861836.jpg",
  "media/b16bbe7de1031de38eb53d2638cfcaf7.jpg", "media/6b89d26d10673f41cb560550aee69779.jpg"
];

/* New pieces shown first in a category on the v2 site (the Canva-layout pages ignore this). */
window.NEW_WORKS = { "motion-graphics": ["lw1", "sr1"] };

/* Pieces taken off the v2 site (still listed above so the Canva-layout pages keep their shape):
   m3 Remi release clip, m4 altcoin, m5 Schedify teaser, m7 Remi landscape film. */
window.HIDDEN_WORKS = ["m3", "m4", "m5", "m7"];

/* ---------- v2 site settings ---------- */
/* Strongest work first: category order, then piece order inside each category. */
window.V2_ORDER = [
  ["motion-graphics", ["lw1", "sr1", "m2", "m6", "m1", "m8"]],
  ["3d-product-animation", ["pa3", "pa1", "pa2", "pa4"]],
  ["3d-product-design", ["p5", "p4", "p3", "p1", "p2"]],
  ["3d-visualization", ["v3", "v1", "v4", "v5", "v2"]],
  ["graphics-design", ["g3", "g1", "g2", "g4"]],
  ["illustration", ["i2", "i4", "i3", "i1", "i5"]]
];
window.V2_TITLES = { "graphics-design": "Graphic Design", "motion-graphics": "Motion Graphics" };

/* Featured projects on the Work page. Facts only: add the brief and results when available. */
window.CASES = [
  { id: "lw1", client: "Loopwise", type: "SaaS product promo · UI motion design", title: "A launch film for a SaaS tool that closes every loop",
    summary: "A 20-second launch film: a kinetic-type opening, the logo reveal, animated product UI showing the tool at work, and a clean end card.",
    facts: [["Format", "16:9 film"], ["Length", "20 seconds"], ["Deliverable", "SaaS launch video"], ["Role", "Motion design & animation"]] },
  { id: "sr1", client: "Story Roll", type: "Mobile app onboarding video · UI animation", title: "A welcome video that shows new users what the app does in 15 seconds",
    summary: "A vertical first-use video that walks through the photo roll, moments and memory-recap screens, then ends on a clear call to try it.",
    facts: [["Format", "9:16 vertical"], ["Length", "15 seconds"], ["Deliverable", "In-app welcome video"], ["Role", "Motion design & animation"]] },
  { id: "m2", client: "Remi", title: "A brand film about turning moments into stories",
    summary: "A vertical brand film that moves from photos and memories to Remi's promise, ending on the app's welcome screen.",
    facts: [["Format", "9:16 vertical"], ["Length", "43 seconds"], ["Deliverable", "Brand film"], ["Role", "Motion design & animation"]] }
];

/* Case studies page: ids from CASES above, in order. Optional per case: brief, approach, result (arrays of paragraphs). */
window.CASE_STUDIES = ["lw1", "sr1"];

/* Client strip, most recognisable first, in full colour (dark ink turned white for the black band). */
window.CLIENTS = [
  { icon: "media/client-youtube.svg", text: "YouTube" },
  { icon: "media/client-gemini.svg", text: "Google Gemini" },
  { img: "media/client-google.png", name: "Google", text: "for Startups" },
  { img: "media/client-shotstack.png", name: "Shotstack" },
  { img: "media/client-lenco.svg", name: "Lenco" },
  { img: "media/client-paywithaccount.png", name: "PaywithAccount" },
  { img: "media/client-rubix.png", name: "Rubix" },
  { img: "media/client-salg.png", name: "SALG" },
  { img: "media/client-medcob.png", name: "medcob" }
];
/* AI tools shown in the toolkit alongside the design apps. */
window.AI_TOOL_ICONS = ["media/tool-claude.svg", "media/tool-midjourney.svg", "media/tool-firefly.svg"];

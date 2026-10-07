/* Portfolio data. Edit this file to add, remove or reorder work.
   type: "image" | "video"   ratio: width / height   dur: video length in seconds
   ASSET_BASE points at the folder holding media/ and video/.            */
window.ASSET_BASE = window.ASSET_BASE || "assets/";

window.CATEGORIES = [
  { id: "motion",   label: "Motion & Animation",   note: "Animations for clients in various industries, 2025" },
  { id: "product-anim", label: "3D Product Animation", note: "3D product animations for clients in various industries, 2025" },
  { id: "product",  label: "3D Product Design",    note: "3D product design for clients in various industries, 2025" },
  { id: "viz",      label: "3D Visualization",     note: "3D event visualization for clients in various industries, 2025" },
  { id: "graphics", label: "Graphic Design",       note: "Marketing posters for clients in various industries, 2025" },
  { id: "illus",    label: "Illustration",         note: "Illustration for clients in various industries, 2025" }
];

window.WORKS = [
  // Motion graphics & animation
  { id: "m1", cat: "motion", type: "video", src: "video/4136836128b91d252db0accff1d7032f.mp4", ratio: 16/9, dur: 4.9 },
  { id: "m2", cat: "motion", type: "video", src: "video/ef172301dd445e90e5a33db30685c94d.mp4", ratio: 4/5,  dur: 4.6 },
  { id: "m3", cat: "motion", type: "video", src: "video/b1d728a5cb78970fb9fef3514e860b6c.mp4", ratio: 9/16, dur: 4.6 },
  { id: "m4", cat: "motion", type: "video", src: "video/eb2c527cbcafc77a934c8045da038de4.mp4", ratio: 1,    dur: 4.7 },
  { id: "m5", cat: "motion", type: "video", src: "video/a2fb0629f9e4c42c0ae762201ab54e79.mp4", ratio: 4/5,  dur: 4.7 },
  { id: "m6", cat: "motion", type: "video", src: "video/0f1ee5330939d3390b630e6a4cb4d5e8.mp4", ratio: 16/9, dur: 5.2 },
  { id: "m7", cat: "motion", type: "video", src: "video/bd13c2fb820cd71023d71b2a40df5949.mp4", ratio: 9/16, dur: 4.6 },
  { id: "m8", cat: "motion", type: "video", src: "video/518b533e5822d5d4873fbea2cc819cbf.mp4", ratio: 9/16, dur: 4.4 },

  // 3D product animation
  { id: "pa1", cat: "product-anim", type: "video", src: "video/585d3ce5d0596485886073c036506d0f.mp4", ratio: 16/9, dur: 2.9 },
  { id: "pa2", cat: "product-anim", type: "video", src: "video/dfd50b07159de7541451f6fc9f3c8b5b.mp4", ratio: 16/9, dur: 2.0 },
  { id: "pa3", cat: "product-anim", type: "video", src: "video/f1f17b117e4568a99eacdb3451539182.mp4", ratio: 16/9, dur: 2.3 },
  { id: "pa4", cat: "product-anim", type: "video", src: "video/7fa30edd5d6446a39c7f89de1c001730.mp4", ratio: 16/9, dur: 2.5 },

  // 3D product design
  { id: "p1", cat: "product", type: "image", src: "media/ed9a288d15e4bbb8635b634007a941d6.png", ratio: 16/9 },
  { id: "p2", cat: "product", type: "image", src: "media/09dd58807f4f6aa71111e41c9d42ff6a.png", ratio: 9/16 },
  { id: "p3", cat: "product", type: "image", src: "media/cfbd9b1e1c3305fa9b6ea3251aae517c.png", ratio: 16/9 },
  { id: "p4", cat: "product", type: "image", src: "media/99d772e7962ee05874c4bfa1ff15fa98.png", ratio: 9/16 },
  { id: "p5", cat: "product", type: "image", src: "media/09437fe339a3f55db56ba86aab9ef504.png", ratio: 16/9 },

  // 3D visualization
  { id: "v1", cat: "viz", type: "image", src: "media/b8aafae2f998f82be60ae24a6973160a.png", ratio: 16/9 },
  { id: "v2", cat: "viz", type: "image", src: "media/1e3bb55e6e7b46f37e0a7a83d4a42de3.png", ratio: 1 },
  { id: "v3", cat: "viz", type: "image", src: "media/63d002568a0854b513b0c341d6177484.png", ratio: 16/9 },
  { id: "v4", cat: "viz", type: "image", src: "media/0f88d18fdf5fde2d5cfdf3f187148311.png", ratio: 16/9 },
  { id: "v5", cat: "viz", type: "image", src: "media/9c8e3b897872f3e4bbb4ea5da65d21b5.png", ratio: 16/9 },

  // Graphic design
  { id: "g1", cat: "graphics", type: "image", src: "media/4bb7cce120ad9bbe8968f4dd5a8ad7a0.png", ratio: 4/5 },
  { id: "g2", cat: "graphics", type: "image", src: "media/82478ac93bde5bc2c4594977b5599de2.png", ratio: 1 },
  { id: "g3", cat: "graphics", type: "image", src: "media/3aaf99e6fed8af542ab3c4d4f2cbf89d.png", ratio: 4/5 },
  { id: "g4", cat: "graphics", type: "image", src: "media/649fcde39979de2ebe30f4cdb6e990ea.png", ratio: 799/740 },

  // Illustration
  { id: "i1", cat: "illus", type: "image", src: "media/a64a16e042c7b94df746c8ac81d02764.jpg", ratio: 1 },
  { id: "i2", cat: "illus", type: "image", src: "media/8baec2c13a94b974d02cc53286449cb5.png", ratio: 3 },
  { id: "i3", cat: "illus", type: "image", src: "media/a05d277995c0b3e1755fcb46b8fccaa4.png", ratio: 1 },
  { id: "i4", cat: "illus", type: "image", src: "media/360fbfd40c7cb8f304fcd57083789339.jpg", ratio: 800/533 },
  { id: "i5", cat: "illus", type: "image", src: "media/d3b0cda87ba5d1f70ea99d9f1c342658.png", ratio: 3 }
];

/* Pieces shown in "Selected work" on the home section, in order. */
window.FEATURED = ["m1", "pa1", "g1", "v1", "m4", "p1"];

window.CLIENT_LOGOS = [
  "media/fa371bc5b47ad61936281e5c776d29ca.png",
  "media/cda8aca2d9626228318d3ccc2e7cc72b.png",
  "media/7346805f01cd931e6cae717becf2e1b9.png",
  "media/4cbae8ea3cc8525632dcff64f9fc8aa6.png",
  "media/1bf495c1510238e82a459652d5d7296c.png",
  "media/fae87f258474cd6bee9e0c2b0d6209da.png",
  "media/ff3e706cac420628fbbd872221351aad.png"
];

window.TOOL_ICONS = [
  "media/5941d47cd4930b564721123d25384aff.jpg", "media/20b2843250d90c73e530a72472ae51c5.jpg",
  "media/280c25fc9549be9638b7cd2dcb1caa9a.jpg", "media/3a0cd4259a4f9bfd581b0e3b0e748c9c.jpg",
  "media/88c22b3697073a5310bd0e16de9530b4.jpg", "media/187b6b115b0e6e42e1ee4e1e6e24c6e2.jpg",
  "media/e55c6b7c86d56b245f4161fcfad5ce72.jpg", "media/92624d12ec5595452fe1fb31600f5936.jpg",
  "media/05421036332fee4d966c9d49bb7de1cc.jpg", "media/48b58a35d79a9bb2e85849d439a0a267.jpg",
  "media/52cdb30401ac4c50e5f56a4f3878f460.jpg", "media/6db4f5893aeb29343777212c5c861836.jpg",
  "media/6b89d26d10673f41cb560550aee69779.jpg", "media/b16bbe7de1031de38eb53d2638cfcaf7.jpg"
];

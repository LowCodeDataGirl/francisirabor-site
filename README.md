# francisirabor.com — rebuilt

Plain HTML/CSS/JS. No build step, no framework, no monthly fee.

## What changed from the Canva version

- **Click any piece → it opens full screen.** Videos play with sound and controls; nothing autoplays while scrolling.
- **Next / previous through the whole portfolio** with arrows, keyboard ←/→, swipe on phones, or the thumbnail strip. Esc or ✕ closes.
- **No cropped edges on phones.** Every piece keeps its real shape (16:9, 9:16, 4:5, 1:1, 3:1) in a masonry grid that goes 3 → 2 → 1 columns.
- **Filter chips** by category (Motion, 3D Product Animation, 3D Product Design, 3D Visualization, Graphic Design, Illustration).
- Desktop: hovering a video previews it silently. Videos only download when they're about to scroll into view, so the page loads fast on mobile data.
- Home, About, Portfolio and Contact are one page with anchor links.

## 1. Get the images and videos (do this first, while the Canva site is still live)

The site expects its media in an `assets/` folder. These scripts copy all 55 files from the current site:

- **Mac / Linux:** open Terminal in this folder and run `./get-assets.sh`
- **Windows:** right-click `get-assets.ps1` → *Run with PowerShell*

Then double-click `index.html` to check it locally.

## 2. Host it (Canva can't host custom code)

Easiest free option, **Netlify Drop**:
1. Go to https://app.netlify.com/drop and drag this whole folder in.
2. In *Domain management*, add `francisirabor.com` and follow the DNS instructions.
3. Point the domain's DNS at Netlify (where you change this depends on where the domain was bought — Canva, Namecheap, GoDaddy, etc.). Unpublish the Canva site after the new one is live.

Cloudflare Pages and GitHub Pages work the same way.

## Editing the portfolio

All work lives in `works.js`. To add a piece, drop the file in `assets/media` or `assets/video` and add a line:

```js
{ id: "m9", cat: "motion", type: "video", src: "video/new-piece.mp4", ratio: 9/16, dur: 6.0 },
```

`ratio` is width ÷ height (16/9, 9/16, 4/5, 1). `FEATURED` at the bottom picks the six pieces on the home section.

Tip for future videos: export H.264 MP4 at 1080px on the long side, ~4–6 Mbps. Keeps them sharp and quick on phones.

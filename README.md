# francisirabor.com — rebuilt

Plain HTML/CSS/JS. No build step, no framework, no monthly fee.

## What changed from the Canva version

- **Click any piece → it opens full screen.** Videos play with sound and controls; nothing autoplays while scrolling.
- **Next / previous through the whole portfolio** with arrows, keyboard ←/→, swipe on phones, or the thumbnail strip. Esc or ✕ closes.
- **Phones get their own layout.** On desktop the collages match the Canva design; on a phone each section stacks into a clean grid where every piece keeps its real shape.
- Desktop: hovering a video previews it silently. Videos only download when they're about to scroll into view, so the page loads fast on mobile data.
- Same three pages as the Canva site: Home (`index.html`), About (`about.html`) and Portfolio (`portfolio.html`), laid out to match it.

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

All work lives in `works.js`: `WORKS` lists each piece, `PORTFOLIO` places them in each portfolio section (x, y, width, height on the original 1351px-wide Canva canvas), and `FEATURED` sets the five home-page cards.

Tip for future videos: export H.264 MP4 at 1080px on the long side, ~4–6 Mbps. Keeps them sharp and quick on phones.

# Builds the three v2 pages from shared parts. Run: python3 build.py
CV = "https://drive.google.com/file/d/1MCZyHFvBbrgrsSab9WM0OUqfxMLtDZ3q/view?usp=drivesdk"
MAIL = "iraborfrancis321@gmail.com"
LI = "https://www.linkedin.com/in/francis-irabor/"
UP = "https://www.upwork.com/freelancers/~016a7653f43e068393"
MARK = '<svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9 C 45 3, 95 2, 135 5 S 185 10, 197 4"/></svg>'

SV = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
HEART = f'<svg {SV}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>'
COMMENT = f'<svg {SV}><path d="M20 12a8 8 0 1 1-3.1-6.3A8 8 0 0 1 20 12z"/><path d="M20 20l-2.2-2.3"/></svg>'
SEND = f'<svg {SV}><path d="M21 3 10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>'
SAVE = f'<svg {SV}><path d="M6 3h12v18l-6-4-6 4z"/></svg>'
REEL = f'<svg {SV}><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3 8h18M8 3l3 5M14 3l3 5"/><path d="M10 12v5l4-2.5z" fill="currentColor"/></svg>'

def mark(w): return f'<span class="mark">{w}{MARK}</span>'
ARR = '<span class="arr" aria-hidden="true">→</span>'

def head(title, desc):
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="../assets/media/447ab943bb53fb584e51a7de0f1eb393.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap">
<link rel="stylesheet" href="v2.css">
</head>
<body>
'''

def header(cur):
    links = [("Work", "work.html"), ("About", "about.html"), ("Process", "index.html#process")]
    nav = "".join(f'<a href="{h}"{" aria-current=\"page\"" if n == cur else ""}>{n}</a>' for n, h in links)
    return f'''<header class="top">
  <div class="wrap top-in">
    <a class="logo" href="index.html"><span class="logo-mark" aria-hidden="true">FI</span>Francis Irabor</a>
    <nav class="nav" aria-label="Main">{nav}</nav>
    <div class="top-cta">
      <a class="btn btn-line btn-sm" href="{CV}" target="_blank" rel="noopener">View CV</a>
      <a class="btn btn-dark btn-sm" href="mailto:{MAIL}">Let's talk</a>
    </div>
  </div>
</header>
'''

PROCESS = f'''  <section class="process" id="process" aria-labelledby="process-h">
    <div class="wrap pr-grid">
      <div>
        <h2 id="process-h" class="h2">How I turn ideas into impact</h2>
        <p class="lede">Four steps that keep projects moving and keep you in the loop from first call to final file.</p>
        <a class="btn btn-dark" href="mailto:{MAIL}">Start a project {ARR}</a>
      </div>
      <div class="acc">
        <details open><summary><span class="n">01</span>Discovery<span class="pm" aria-hidden="true">+</span></summary><div class="body"><p>Align on what matters and define the metrics that prove success.</p></div></details>
        <details><summary><span class="n">02</span>Direction<span class="pm" aria-hidden="true">+</span></summary><div class="body"><p>Choose a winning creative path with fast alignment and zero drift.</p></div></details>
        <details><summary><span class="n">03</span>Design<span class="pm" aria-hidden="true">+</span></summary><div class="body"><p>Build fast, refine with structure, and keep momentum high.</p></div></details>
        <details><summary><span class="n">04</span>Delivery<span class="pm" aria-hidden="true">+</span></summary><div class="body"><p>Handoff built for scale, launched without missing details.</p></div></details>
        <details><summary><span class="n">05</span>What tools do you work in?<span class="pm" aria-hidden="true">+</span></summary><div class="body"><ul class="tool-icons"></ul></div></details>
        <details><summary><span class="n">06</span>How do we get started?<span class="pm" aria-hidden="true">+</span></summary><div class="body"><p>Send a short brief to <a href="mailto:{MAIL}">{MAIL}</a>, or reach out on <a href="{LI}" target="_blank" rel="noopener">LinkedIn</a> or <a href="{UP}" target="_blank" rel="noopener">Upwork</a>.</p></div></details>
      </div>
    </div>
  </section>
'''

QUOTE = f'''  <section class="quote" aria-label="Client feedback">
    <div class="wrap">
      <blockquote>
        <q>The creative direction sharpened our identity and boosted our campaign results.</q>
        <cite><span class="cite-dot" aria-hidden="true"></span>Client feedback</cite>
      </blockquote>
    </div>
  </section>
'''

def closer(wall=True):
    return f'''  <section class="closer center" aria-labelledby="closer-h">
    <div class="wrap">
      <h2 id="closer-h" class="h2">Let's make your brand {mark("move")}</h2>
      <p class="lede">Have a launch, campaign or product that needs to be seen? I'd love to hear about it.</p>
      <a class="btn btn-dark" href="mailto:{MAIL}">Send me a message {ARR}</a>
      <span class="mail">{MAIL}</span>
    </div>
    {'<div class="wall" id="wall"></div>' if wall else ''}
  </section>
'''

FOOT = f'''<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="logo" href="index.html"><span class="logo-mark" aria-hidden="true">FI</span>Francis Irabor</a>
        <p class="blurb">Designer and animator creating 3D, motion and illustration for brands in finance, publishing, fashion, music, culture and tech.</p>
      </div>
      <div><h4>Pages</h4><ul><li><a href="index.html">Home</a></li><li><a href="work.html">Work</a></li><li><a href="about.html">About</a></li><li><a href="{CV}" target="_blank" rel="noopener">CV</a></li></ul></div>
      <div><h4>Connect</h4><ul><li><a href="{LI}" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="{UP}" target="_blank" rel="noopener">Upwork</a></li><li><a href="mailto:{MAIL}">Email</a></li></ul></div>
      <div><h4>Services</h4><ul><li><a href="work.html#3d-product-design">3D product</a></li><li><a href="work.html#motion-graphics">Motion graphics</a></li><li><a href="work.html#illustration">Illustration</a></li><li><a href="work.html#graphics-design">Graphic design</a></li></ul></div>
    </div>
    <div class="foot-base"><span>© <span id="yr"></span> Francis Irabor</span><a href="#top-anchor">Back to top ↑</a></div>
  </div>
</footer>

<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Portfolio viewer" hidden>
  <div class="lb-top">
    <p class="lb-cat" id="lb-cat"></p>
    <p class="lb-count" id="lb-count"></p>
    <button class="lb-btn" id="lb-close" aria-label="Close viewer">✕</button>
  </div>
  <div class="lb-stage" id="lb-stage"></div>
  <button class="lb-btn lb-nav lb-prev" id="lb-prev" aria-label="Previous piece">←</button>
  <button class="lb-btn lb-nav lb-next" id="lb-next" aria-label="Next piece">→</button>
  <div class="lb-strip" id="lb-strip"></div>
</div>

<script>window.ASSET_BASE = "../assets/";</script>
<script src="../works.js"></script>
<script src="v2.js"></script>
</body>
</html>
'''

ICONS = {
 "cube": '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M8 1.5 14 5v6l-6 3.5L2 11V5z"/><path d="M2 5l6 3.5L14 5M8 8.5V14.5"/></svg>',
 "play": '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M6.5 5.5v5l4-2.5z" fill="currentColor"/></svg>',
 "space": '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1.5 13.5h13M3 13.5V6l5-3.5L13 6v7.5"/><path d="M6.5 13.5v-4h3v4"/></svg>',
 "pen": '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 14l1-4L11 2l3 3-8 8z"/><path d="M9.5 3.5l3 3"/></svg>',
}

def spec(icon, pill, title, text, link, label, panel_cls, pieces, stamp):
    return f'''      <article class="spec">
        <div class="spec-copy">
          <span class="pill">{ICONS[icon]}{pill}</span>
          <h3 class="h3">{title}</h3>
          <p>{text}</p>
          <a class="btn btn-dark btn-sm" href="work.html#{link}">{label} {ARR}</a>
        </div>
        <div class="panel {panel_cls}" data-pieces="{pieces}"><span class="stamp">{stamp}</span></div>
      </article>
'''

def lb_group(): return ""

index = head("Francis Irabor — Designer & Animator", "Francis Irabor is a designer and animator creating 3D product visuals, motion graphics and illustration for brands.") + '<span id="top-anchor"></span>\n' + header("") + f'''
<main>
  <section class="hero center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <h1 class="h1">Animation and design<br class="br-d"> that drives {mark("engagement")}</h1>
      <p class="lede">I'm Francis Irabor, a designer and animator creating 3D product visuals, motion graphics and illustration for brands.</p>
      <div class="hero-cta"><a class="btn btn-dark" href="work.html">See my work {ARR}</a></div>
      <p class="hero-note">Click any piece to watch it full screen</p>
      <div class="fan ig" aria-label="Recent work, shown as social posts">
        <article class="ig-card side l">
          <header class="ig-head"><span class="ig-av" aria-hidden="true">FI</span><div><b>Francis Irabor</b><small>Story Roll · Welcome video</small></div><span class="ig-more" aria-hidden="true">•••</span></header>
          <div class="ig-media reel" data-pieces="sr1" data-group="hero" data-autoplay data-bare><span class="ig-badge" aria-hidden="true">{REEL}</span></div>
        </article>
        <article class="ig-card main">
          <header class="ig-head"><span class="ig-av" aria-hidden="true">FI</span><div><b>Francis Irabor</b><small>Loopwise · SaaS launch film</small></div><span class="ig-more" aria-hidden="true">•••</span></header>
          <div class="ig-media" data-pieces="lw1" data-group="hero" data-autoplay data-bare><span class="ig-sound" aria-hidden="true"></span></div>
          <div class="ig-actions" aria-hidden="true">{HEART}{COMMENT}{SEND}<span class="sp"></span>{SAVE}</div>
          <p class="ig-cap"><b>Francis Irabor</b> Meet Loopwise. A 20-second SaaS launch film: logo reveal, product UI and end card. <span>#motiondesign #saas #launchfilm</span></p>
        </article>
        <article class="ig-card side r">
          <header class="ig-head"><span class="ig-av" aria-hidden="true">FI</span><div><b>Francis Irabor</b><small>Post · Graphic design</small></div><span class="ig-more" aria-hidden="true">•••</span></header>
          <div class="ig-media" data-pieces="g2" data-group="hero" data-eager></div>
          <div class="ig-actions" aria-hidden="true">{HEART}{COMMENT}{SEND}<span class="sp"></span>{SAVE}</div>
        </article>
      </div>
    </div>
  </section>

  <section class="clients" aria-label="Clients">
    <div class="wrap center">
      <p>Brands I've designed and animated for, including</p>
      <ul class="logo-row" id="logos"></ul>
    </div>
  </section>

  <section class="intro center" aria-labelledby="intro-h">
    <div class="wrap">
      <h2 id="intro-h" class="h2">Built to be seen, {mark("trusted")} by the brands<br class="br-d"> that ship it</h2>
      <p class="lede">From a single product render to a full launch campaign, every piece is made to stop the scroll and say something about the brand.</p>
    </div>
  </section>

  <section aria-label="Specialties">
    <div class="wrap specs">
{spec("cube", "3D product", "Products that look real before they're made", "Studio-quality renders and short 3D films for launches, packaging and ads. Products turn, open and catch the light exactly the way the brand wants.", "3d-product-animation", "See 3D product work", "p-mix", "pa3,p1,p2", "3D product design")}
{spec("play", "Motion", "Motion that stops the scroll", "Explainers, logo reveals and social cut-downs in every format: 9:16 for stories and reels, square for feeds, 16:9 for the big screen.", "motion-graphics", "See motion work", "p-tall", "sr1,m1,m2", "Motion graphics")}
{spec("space", "3D spaces", "Rooms you can walk through before they're built", "Event stages and brand spaces visualised in 3D, so clients can approve the layout, lighting and branding before anything is set up.", "3d-visualization", "See 3D visualization", "p-mix", "v3,v4,v5", "3D visualization")}
{spec("pen", "Illustration & graphics", "Illustration and posters with personality", "Characters, banners and campaign posters with a bold, playful line, built to carry a brand across print and social.", "illustration", "See illustration", "p-mix", "i2,g3,g4", "Illustration & posters")}
    </div>
  </section>

  <section class="chips-sec center" aria-labelledby="svc-h">
    <div class="wrap">
      <h2 id="svc-h" class="h3" style="margin-bottom:26px">Everything a brand needs to move</h2>
      <ul class="chips">
        <li>3D product design</li><li>3D visualization &amp; product animation</li><li>Motion graphics animation</li><li>2D &amp; 3D animation</li>
        <li>Brand identity</li><li>Graphic design</li><li>Print &amp; poster design</li><li>Illustration</li>
      </ul>
      <a class="btn btn-dark" href="mailto:{MAIL}">Start a project {ARR}</a>
    </div>
  </section>

{QUOTE}
  <section class="showcase on-dark" id="work" aria-labelledby="sc-h">
    <div class="wrap">
      <h2 id="sc-h" class="h2">Every project, one click away</h2>
      <p class="lede">Pick a discipline, then click any piece to open it full screen. Use the arrows or swipe to move through the rest.</p>
      <div class="sc-grid">
        <div class="tabs" id="tabs" role="tablist" aria-label="Disciplines"></div>
        <div class="sc-stage" id="sc-stage">
          <div class="mason" id="sc-mason"></div>
          <a class="btn btn-line btn-sm more" id="sc-more" href="work.html">See all&nbsp;<span>work</span> {ARR}</a>
        </div>
      </div>
    </div>
  </section>

{PROCESS}
{closer(True)}</main>

''' + FOOT

work = head("Work — Francis Irabor", "The full portfolio of Francis Irabor: 3D product design and animation, 3D visualization, illustration, graphic design and motion graphics.") + '<span id="top-anchor"></span>\n' + header("Work") + f'''
<main>
  <section class="page-head center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <h1 class="h1">The {mark("work")}</h1>
      <p class="lede">3D, motion, illustration and graphic design for clients across finance, publishing, fashion, music, culture and tech. Click any piece to open it full screen.</p>
      <div class="filters" id="filters" aria-label="Filter by discipline"></div>
    </div>
  </section>
  <div class="wrap work-list" id="work-list"></div>
{closer(False)}</main>

''' + FOOT

about = head("About — Francis Irabor", "About Francis Irabor, a designer and animator working in 3D, motion and illustration.") + '<span id="top-anchor"></span>\n' + header("About") + f'''
<main>
  <section class="page-head center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <h1 class="h1">Hi, I'm {mark("Francis")}</h1>
    </div>
  </section>
  <section class="wrap about-grid" aria-label="About Francis">
    <div class="about-photo"><img data-asset="media/d3cc3a8931e93b3ef50e0372a1a22fde.jpg" alt="Portrait of Francis Irabor"></div>
    <div class="about-copy">
      <h2 class="h2">Designer &amp; animator</h2>
      <p>I specialize in design and animation. I have worked with clients in various industries such as finance, publishing, fashion, music, arts, culture, tech and marketing.</p>
      <ul class="facts">
        <li><b>Disciplines</b>3D, motion, illustration, brand</li>
        <li><b>Industries</b>Finance, tech, fashion, music, culture</li>
        <li><b>Work with me</b><a href="mailto:{MAIL}">Email</a> · <a href="{UP}" target="_blank" rel="noopener">Upwork</a></li>
        <li><b>Elsewhere</b><a href="{LI}" target="_blank" rel="noopener">LinkedIn</a></li>
      </ul>
      <div class="btns">
        <a class="btn btn-dark" href="{CV}" target="_blank" rel="noopener">View CV {ARR}</a>
        <a class="btn btn-line" href="work.html">See my work</a>
      </div>
    </div>
  </section>
  <section class="clients" aria-label="Clients" style="padding-top:0">
    <div class="wrap center">
      <p>Brands I've designed and animated for, including</p>
      <ul class="logo-row" id="logos"></ul>
    </div>
  </section>
{QUOTE}
{PROCESS}
{closer(False)}</main>

''' + FOOT

for name, html in [("index.html", index), ("work.html", work), ("about.html", about)]:
    open(name, "w").write(html)
print("built")

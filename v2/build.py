# Builds the v2 pages from shared parts. Run: python3 build.py
import json
import subprocess
_data = json.loads(subprocess.run(["node", "-e", "global.window={};require('../works.js');process.stdout.write(JSON.stringify(window.CASE_FILES))"],
                                  capture_output=True, text=True, check=True).stdout)

CV = "https://drive.google.com/file/d/1MCZyHFvBbrgrsSab9WM0OUqfxMLtDZ3q/view?usp=drivesdk"
MAIL = "iraborfrancis321@gmail.com"
LI = "https://www.linkedin.com/in/francis-irabor/"
UP = "https://www.upwork.com/freelancers/~016a7653f43e068393"
SITE = "https://francisirabor.com/"
TALK = f"mailto:{MAIL}?subject=Let%27s%20talk"

# One sentence that says who he is, for people, search engines and AI agents alike.
HOME_DESC = ("Hire Francis Irabor (Irabor Francis), a motion graphics designer and 3D artist. Product videos, "
             "SaaS launch films, app onboarding animations, 3D product animation and brand design for clients worldwide. "
             "Available for freelance projects and full-time remote roles.")

POSITION = ("Francis Irabor is a motion designer and 3D artist who helps brands explain their products "
            "through motion graphics, 3D animation and design that people stop for, understand and remember. He has worked with clients worldwide, both on contract and in remote full-time roles, and is open to new freelance projects "
            "and full-time positions.")

MARK = '<svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9 C 45 3, 95 2, 135 5 S 185 10, 197 4"/></svg>'
def mark(w): return f'<span class="mark">{w}{MARK}</span>'
ARR = '<span class="arr" aria-hidden="true">→</span>'

SV = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
HEART = f'<svg {SV}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>'
COMMENT = f'<svg {SV}><path d="M20 12a8 8 0 1 1-3.1-6.3A8 8 0 0 1 20 12z"/><path d="M20 20l-2.2-2.3"/></svg>'
SEND = f'<svg {SV}><path d="M21 3 10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>'
SAVE = f'<svg {SV}><path d="M6 3h12v18l-6-4-6 4z"/></svg>'
REEL = f'<svg {SV}><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3 8h18M8 3l3 5M14 3l3 5"/><path d="M10 12v5l4-2.5z" fill="currentColor"/></svg>'

PERSON = {
  "@context": "https://schema.org", "@type": "Person", "name": "Francis Irabor",
  "alternateName": ["Irabor Francis", "Francis I."], "givenName": "Francis", "familyName": "Irabor",
  "jobTitle": "Motion Designer & 3D Artist", "url": SITE, "email": f"mailto:{MAIL}",
  "description": POSITION,
  "knowsAbout": ["Motion graphics", "Motion graphics design", "Motion design", "Product videos", "Explainer videos", "SaaS launch videos", "App onboarding videos", "UI animation", "Brand animation", "Logo animation", "2D and 3D animation", "3D product design", "3D product animation",
                 "3D visualization", "Brand identity", "Graphic design", "Illustration", "Launch videos", "Social media content"],
  "image": SITE + "assets/media/francis-headshot.jpg",
  "worksFor": {"@type": "Organization", "name": "Ruffbox Studio"},
  "sameAs": [LI, UP],
  "seeks": {"@type": "Demand", "description": "Freelance projects and full-time design or motion roles, remote"},
}

SITEJSON = {"@context": "https://schema.org", "@type": "WebSite", "name": "Francis Irabor", "url": SITE,
            "description": POSITION, "author": {"@type": "Person", "name": "Francis Irabor"}}
OG = SITE + "assets/media/og-francis-irabor-card.jpg"

def head(title, desc, path=""):
    canon = SITE + path
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="Francis Irabor">
<meta name="theme-color" content="#fefefe">
<link rel="canonical" href="{canon}">
<link rel="icon" href="../assets/media/favicon.ico" sizes="48x48">
<link rel="icon" href="../assets/media/francis-icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="../assets/media/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="{"profile" if path in ("", "about.html") else "website"}">
<meta property="og:site_name" content="Francis Irabor">
<meta property="og:url" content="{canon}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{OG}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Francis Irabor, motion designer and 3D artist">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{OG}">
<script type="application/ld+json">{json.dumps(PERSON)}</script>
<script type="application/ld+json">{json.dumps(SITEJSON)}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap">
<link rel="stylesheet" href="v2.css">
</head>
<body>
<span id="top-anchor"></span>
'''

def header(cur):
    links = [("Work", "work.html"), ("Case studies", "case-studies.html"), ("About", "about.html")]
    nav = "".join(f'<a href="{h}"{" aria-current=\"page\"" if n == cur else ""}>{n}</a>' for n, h in links)
    return f'''<header class="top">
  <div class="wrap top-in">
    <a class="logo" href="index.html"><span class="logo-mark" aria-hidden="true"><img src="../assets/media/francis-mark.svg" alt="" width="34" height="34"></span>Francis Irabor</a>
    <nav class="nav" aria-label="Main">{nav}</nav>
    <div class="top-cta">
      <a class="btn btn-line btn-sm" href="{CV}" target="_blank" rel="noopener">View CV</a>
      <a class="btn btn-dark btn-sm" href="#contact">Let's talk</a>
    </div>
  </div>
</header>
'''

def clients():
    # Moving strip on a dark band; the logos speak for themselves, so no caption.
    return '''  <section class="band" aria-label="Clients">
    <div class="marquee" id="clients"></div>
  </section>
'''

QUOTE = '''  <section class="quote" aria-label="Client feedback">
    <div class="wrap">
      <blockquote>
        <q>The creative direction sharpened our identity and boosted our campaign results.</q>
        <cite><span class="cite-dot" aria-hidden="true"></span>Client feedback</cite>
      </blockquote>
    </div>
  </section>
'''

STEPS = f'''  <section class="process" id="process" aria-labelledby="process-h">
    <div class="wrap">
      <div class="pr-head">
        <h2 id="process-h" class="h2">What working with me looks like</h2>
        <p class="lede">Four steps from first message to final files. You choose the look before anything is animated, so there are no surprises at the end.</p>
      </div>
      <ol class="flow">
        <li class="step">
          <div class="viz viz-brief" aria-hidden="true">
            <div class="doc"><b>Brief</b><i></i><i></i><i class="s"></i><div class="tags"><span>Launch</span><span>Audience</span><span>Channels</span></div></div>
          </div>
          <span class="eyebrow">01 · Discovery</span>
          <h3>You share the brief</h3>
          <p>What you're launching, who it's for and where it will run. We agree what success looks like.</p>
        </li>
        <li class="step">
          <div class="viz viz-frames" aria-hidden="true">
            <img data-asset="media/w/loopwise-saas-launch-poster.webp" loading="lazy" alt=""><img class="pick" data-asset="media/w/story-roll-welcome-poster.webp" loading="lazy" alt=""><img data-asset="media/w/82478ac93bde5bc2c4594977b5599de2-sm.webp" loading="lazy" alt="">
          </div>
          <span class="eyebrow">02 · Direction</span>
          <h3>You pick the look</h3>
          <p>Styleframes and a moodboard show the direction up front, so you approve the look before animation starts.</p>
        </li>
        <li class="step">
          <div class="viz viz-timeline" aria-hidden="true">
            <div class="track"><span class="kf" style="left:8%"></span><span class="kf" style="left:31%"></span><span class="kf" style="left:55%"></span><span class="kf" style="left:82%"></span><span class="head" style="left:62%"></span></div>
            <div class="track t2"><span class="clip" style="left:4%;width:40%"></span><span class="clip" style="left:48%;width:30%"></span></div>
            <div class="review"><span>Review</span><span>Review</span></div>
          </div>
          <span class="eyebrow">03 · Design</span>
          <h3>I design and animate</h3>
          <p>You see progress at set review points, so feedback lands early and changes stay small.</p>
        </li>
        <li class="step">
          <div class="viz viz-formats" aria-hidden="true">
            <span class="f169">16:9</span><span class="f916">9:16</span><span class="f11">1:1</span><span class="f45">4:5</span>
          </div>
          <span class="eyebrow">04 · Delivery</span>
          <h3>You get launch-ready files</h3>
          <p>Every size your channels need, from the big screen to stories and feeds, ready to post.</p>
        </li>
      </ol>
      <div class="toolkit">
        <div class="tk-group"><span class="tk-label">Toolkit</span><ul class="tool-icons"></ul></div>
      </div>
    </div>
  </section>
'''

def closer(wall=False):
    return f'''  <section class="closer center" id="contact" aria-labelledby="closer-h">
    <div class="wrap">
      <h2 id="closer-h" class="h2">Let's make your brand {mark("move")}</h2>
      <p class="lede">Planning a launch, or hiring for a design and motion role? Either way, I'd love to hear about it.</p>
      <div class="closer-cta">
        <a class="btn btn-dark" href="{TALK}">Let's talk {ARR}</a>
        <a class="btn btn-line" href="{CV}" target="_blank" rel="noopener">View CV</a>
      </div>
      <p class="avail"><span class="dot" aria-hidden="true"></span>Open to freelance projects and full-time roles · Working with clients worldwide</p>
    </div>
    {'<div class="wall" id="wall"></div>' if wall else ''}
  </section>
'''

FOOT = f'''<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="logo" href="index.html"><span class="logo-mark" aria-hidden="true"><img src="../assets/media/francis-mark.svg" alt="" width="34" height="34"></span>Francis Irabor</a>
        <p class="blurb">{POSITION}</p>
      </div>
      <div><h4>Work</h4><ul><li><a href="work.html#motion-graphics">Motion graphics</a></li><li><a href="work.html#3d-product-animation">3D product animation</a></li><li><a href="work.html#3d-product-design">3D product design</a></li><li><a href="work.html#3d-visualization">3D visualization</a></li><li><a href="work.html#graphics-design">Graphic design</a></li><li><a href="work.html#illustration">Illustration</a></li></ul></div>
      <div><h4>Pages</h4><ul><li><a href="index.html">Home</a></li><li><a href="work.html">Work</a></li><li><a href="case-studies.html">Case studies</a></li><li><a href="about.html">About</a></li><li><a href="{CV}" target="_blank" rel="noopener">CV</a></li></ul></div>
      <div><h4>Connect</h4><ul><li><a href="{TALK}">Email</a></li><li><a href="{LI}" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="{UP}" target="_blank" rel="noopener">Upwork</a></li></ul></div>
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
 "brand": '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M5 8h6M8 5v6"/></svg>',
}

def spec(icon, pill, title, text, link, label, panel_cls, pieces, stamp):
    return f'''      <article class="spec">
        <div class="spec-copy">
          <span class="pill">{ICONS[icon]}{pill}</span>
          <h3 class="h3">{title}</h3>
          <p>{text}</p>
          <a class="tlink" href="work.html#{link}">{label} {ARR}</a>
        </div>
        <div class="panel {panel_cls}" data-pieces="{pieces}"><span class="stamp">{stamp}</span></div>
      </article>
'''

SPECS = [
  ("cube", "3D product", "Product shots without the photoshoot",
   "Photoreal 3D renders and short product films for launches, packaging and ads. No studio, no samples to ship, and every angle is ready when you need it.",
   "3d-product-animation", "See 3D product work", "p-mix", "pa3,p5,p4", "3D product"),
  ("play", "Motion", "Motion that stops the scroll",
   "Launch films, app walkthroughs, logo reveals and social cut-downs in every format: 9:16 for stories and reels, square for feeds, 16:9 for the big screen.",
   "motion-graphics", "See motion work", "p-tall", "sr1,m2,m1", "Motion graphics"),
  ("space", "3D spaces", "Rooms you can walk through before they're built",
   "Event stages and brand spaces visualised in 3D, so you can approve the layout, lighting and branding before anything is set up.",
   "3d-visualization", "See 3D visualization", "p-mix", "v3,v4,v5", "3D visualization"),
  ("pen", "Illustration & graphics", "Illustration and posters with personality",
   "Characters, banners and campaign posters with a bold, playful line, built to carry a brand across print and social.",
   "illustration", "See illustration", "p-mix", "i2,g3,g4", "Illustration & posters"),
]

# ---------------- Home ----------------
index = head("Francis Irabor — Motion Graphics Designer & 3D Artist for Hire", HOME_DESC, "") + header("") + f'''
<main>
  <section class="hero center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <p class="eyebrow hero-who">Francis Irabor · Motion designer &amp; 3D artist</p>
      <h1 class="h1">Animation and design<br class="br-d"> that drives {mark("engagement")}</h1>
      <p class="lede">Launch films, 3D product visuals and campaign design that help brands get noticed, get understood and get remembered.</p>
      <div class="hero-cta">
        <a class="btn btn-dark" href="#contact">Let's talk {ARR}</a>
        <a class="btn btn-line" href="work.html">See my work</a>
      </div>
      <p class="hero-note"><span class="dot" aria-hidden="true"></span>Open to freelance projects and full-time roles</p>
      <div class="fan ig" aria-label="Recent work, shown as social posts">
        <article class="ig-card side l">
          <header class="ig-head"><span class="ig-av" aria-hidden="true"><img src="../assets/media/francis-icon.svg" alt="" width="32" height="32"></span><div><b>Francis Irabor</b><small>Story Roll · Welcome video</small></div><span class="ig-more" aria-hidden="true">•••</span></header>
          <div class="ig-media reel" data-pieces="sr1" data-group="hero" data-autoplay data-bare><span class="ig-badge" aria-hidden="true">{REEL}</span></div>
        </article>
        <article class="ig-card main">
          <header class="ig-head"><span class="ig-av" aria-hidden="true"><img src="../assets/media/francis-icon.svg" alt="" width="32" height="32"></span><div><b>Francis Irabor</b><small>Loopwise · SaaS launch film</small></div><span class="ig-more" aria-hidden="true">•••</span></header>
          <div class="ig-media" data-pieces="lw1" data-group="hero" data-autoplay data-bare><span class="ig-sound" aria-hidden="true"></span></div>
          <div class="ig-actions" aria-hidden="true">{HEART}{COMMENT}{SEND}<span class="sp"></span>{SAVE}</div>
          <p class="ig-cap"><b>Francis Irabor</b> Meet Loopwise. A 20-second SaaS launch film: logo reveal, product UI and end card. <span>#motiondesign #saas #launchfilm</span></p>
        </article>
        <article class="ig-card side r">
          <header class="ig-head"><span class="ig-av" aria-hidden="true"><img src="../assets/media/francis-icon.svg" alt="" width="32" height="32"></span><div><b>Francis Irabor</b><small>Post · Graphic design</small></div><span class="ig-more" aria-hidden="true">•••</span></header>
          <div class="ig-media" data-pieces="g2" data-group="hero" data-eager></div>
          <div class="ig-actions" aria-hidden="true">{HEART}{COMMENT}{SEND}<span class="sp"></span>{SAVE}</div>
        </article>
      </div>
    </div>
  </section>

{clients()}
  <section class="intro center" aria-labelledby="intro-h">
    <div class="wrap">
      <h2 id="intro-h" class="h2">Built to be seen, {mark("trusted")} by the brands<br class="br-d"> that ship it</h2>
      <p class="lede">Every piece starts with the one thing your audience needs to notice, then makes it impossible to miss.</p>
    </div>
  </section>

  <section aria-label="Specialties">
    <div class="wrap specs">
{"".join(spec(*s) for s in SPECS)}    </div>
  </section>

  <section class="svc-band center" aria-labelledby="svc-h">
    <div class="wrap">
      <h2 id="svc-h" class="h3">Everything a brand needs to move</h2>
      <ul class="chips">
        <li>3D product design</li><li>3D visualization &amp; product animation</li><li>Motion graphics animation</li><li>2D &amp; 3D animation</li>
        <li>Brand identity</li><li>Graphic design</li><li>Print &amp; poster design</li><li>Illustration</li>
      </ul>
    </div>
  </section>

{QUOTE}
{STEPS}
{closer(True)}</main>

''' + FOOT

# ---------------- Work ----------------
work = head("Motion Graphics & 3D Portfolio — Francis Irabor", "The portfolio of Francis Irabor: motion graphics, 3D product animation and design, 3D visualization, graphic design and illustration.", "work.html") + header("Work") + f'''
<main>
  <section class="page-head center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <h1 class="h1">The {mark("work")}</h1>
      <p class="lede">Motion, 3D and design for brands in tech, finance, publishing, fashion, music and culture. Click any piece to open it full screen.</p>
    </div>
  </section>

  <section class="all-work" id="all" aria-label="All work">
    <div class="wrap">
            <div class="filters" id="filters" aria-label="Filter by discipline"></div>
      <div class="work-list" id="work-list"></div>
    </div>
  </section>
{closer(False)}</main>

''' + FOOT

# ---------------- Services ----------------
SERVICES = [
  ("motion-graphics", "Motion graphics & animation", "For launches, product explainers and social campaigns that need people to watch, understand and act.",
   ["Launch and brand films", "App and product walkthroughs", "Logo animations", "Social cut-downs in 9:16, 1:1, 4:5 and 16:9"], "lw1,sr1"),
  ("3d-product-animation", "3D product design & animation", "For products that need studio-quality visuals without a photoshoot, or need to be seen from every angle.",
   ["Photoreal product renders", "Product films and loops", "Packaging visuals", "Stills for ads, stores and decks"], "pa3,p5"),
  ("3d-visualization", "3D event & space visualization", "For events, stages and brand spaces that need sign-off before anything is built.",
   ["Stage and booth concepts", "Branded space renders", "Layout and lighting options"], "v3,v1"),
  ("graphics-design", "Brand identity & graphic design", "For brands that need a consistent look across launches, posters and social.",
   ["Logos and visual identity", "Campaign posters and flyers", "Social graphics", "Print-ready files"], "g3,g1"),
  ("illustration", "Illustration", "For brands and campaigns that need characters and art with a personality of their own.",
   ["Characters and mascots", "Banners and headers", "Campaign and editorial art"], "i2,i4"),
]
def service(s):
    sid, title, why, gets, pieces = s
    lis = "".join(f"<li>{g}</li>" for g in gets)
    return f'''      <article class="svc" id="svc-{sid}">
        <div class="svc-copy">
          <h2 class="h3">{title}</h2>
          <p>{why}</p>
          <h3 class="label">What you get</h3>
          <ul class="gets">{lis}</ul>
          <a class="tlink" href="work.html#{sid}">See examples {ARR}</a>
        </div>
        <div class="svc-media" data-pieces="{pieces}" data-group="svc"></div>
      </article>
'''
services = head("Services — Francis Irabor", "Services from Francis Irabor: motion graphics and animation, 3D product design and animation, 3D event visualization, brand identity and graphic design, and illustration.") + header("Services") + f'''
<main>
  <section class="page-head center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <h1 class="h1">What I can {mark("make")} for you</h1>
      <p class="lede">Five ways to get your brand seen. Most projects mix two or three, like a 3D product film cut down for social.</p>
    </div>
  </section>
  <section class="wrap svcs" aria-label="Services">
{"".join(service(s) for s in SERVICES)}  </section>
{STEPS}
{closer(False)}</main>

''' + FOOT

FAQS = [
  ("Can I hire Francis Irabor for a freelance motion graphics project?",
   "Yes. Francis takes on freelance projects worldwide, from a single product video or app onboarding animation to a full launch campaign. Email " + MAIL + " or message him on Upwork or LinkedIn to start."),
  ("Is Francis open to full-time roles?",
   "Yes. He has worked in remote full-time roles as well as on contract, and is open to full-time motion design, 3D or design positions."),
  ("What kind of motion graphics does Francis make?",
   "Product and SaaS launch videos, explainer videos, app onboarding and welcome videos, UI animation, logo animation, 3D product animation, 3D event visualisation, and social media content for brands."),
  ("Which tools does Francis use?",
   "After Effects, Premiere Pro, Blender, Illustrator, Photoshop and Figma, with AI tools such as Midjourney, Adobe Firefly and Claude to explore ideas quickly."),
]
FAQ_JSON = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
  {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQS]}
FAQ_HTML = """  <section class="faq" aria-labelledby="faq-h">
    <div class="wrap">
      <h2 id="faq-h" class="h2">Questions people ask</h2>
      <div class="faq-list">""" + "".join(f"""
        <details><summary>{q}</summary><p>{a}</p></details>""" for q, a in FAQS) + f"""
      </div>
    </div>
  </section>
<script type="application/ld+json">{json.dumps(FAQ_JSON)}</script>
"""

# ---------------- About ----------------
about = head("About Francis Irabor — Motion Designer & 3D Artist", POSITION, "about.html") + header("About") + f'''
<main>
  <section class="page-head center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <span class="eyebrow">About</span>
      <h1 class="h1">You built something great.<br class="br-d"> I make people {mark("notice")}.</h1>
    </div>
  </section>
  <section class="wrap about-grid" aria-label="About Francis">
    <figure class="about-photo"><img data-asset="media/w/francis-headshot.webp" alt="Headshot of Francis Irabor" width="800" height="1000"></figure>
    <div class="about-copy">
      <p class="big">Your product deserves more than a scroll-past. I help people understand it in seconds and remember it afterwards.</p>
      <p>You know your product inside out. Your audience gives it a few seconds. I use motion graphics, 3D and design to close that gap, showing what your product does, why it matters and why it's worth trying before they scroll away.</p>
      <p>That might be an app welcome video that gets new users to their first win, a 3D product animation that makes your features easy to see, or a campaign that looks right on every screen. You work with one person from concept to final file, so your idea stays clear and nothing gets lost in handovers.</p>
      <p>I've done this for brands in tech, finance, publishing, fashion, music, arts and culture, for clients worldwide, on contract and in remote full-time roles. Whether you need a project done or a designer on your team, I'd love to hear what you're building.</p>
      <div class="btns">
        <a class="btn btn-dark" href="#contact">Let's talk {ARR}</a>
        <a class="btn btn-line" href="{CV}" target="_blank" rel="noopener">View CV</a>
      </div>
    </div>
  </section>
{clients()}
  <section class="bring" aria-labelledby="bring-h">
    <div class="wrap">
      <h2 id="bring-h" class="h2">What you get when we work together</h2>
      <div class="bring-grid">
        <article><span class="eyebrow">01</span><h3>One person, start to finish</h3><p>You brief one person who handles the concept, styleframes and final animation, so feedback rounds stay quick and your idea isn't diluted between handovers.</p></article>
        <article><span class="eyebrow">02</span><h3>Ready for every screen</h3><p>Your project arrives sized for websites, stories, feeds, ads and print, so your brand looks consistent wherever people see it.</p></article>
        <article><span class="eyebrow">03</span><h3>See ideas sooner</h3><p>Production in After Effects, Blender and Figma, with AI tools like Midjourney and Adobe Firefly to explore directions fast, so you can pick a look before the real work starts.</p></article>
      </div>
    </div>
  </section>
{FAQ_HTML}
{QUOTE}
{closer(False)}</main>

''' + FOOT

# ---------------- Case studies ----------------
case_studies = head("Motion Design & 3D Case Studies — Francis Irabor", "Case studies from Francis Irabor: motion graphics, 3D product, 3D visualisation and graphic design projects, with the brief, the design decisions and the tools behind each.", "case-studies.html") + header("Case studies") + f'''
<main>
  <section class="page-head center">
    <div class="dots" aria-hidden="true"></div>
    <div class="wrap">
      <h1 class="h1">Case {mark("studies")}</h1>
      <p class="lede">One project from each discipline: what the brief was, the decisions behind the design, and the tools used to make it.</p>
    </div>
  </section>
  <div id="case-list"></div>
<script type="application/ld+json">{json.dumps({"@context": "https://schema.org", "@type": "ItemList", "name": "Case studies by Francis Irabor",
  "itemListElement": [{"@type": "ListItem", "position": i + 1, "item": {"@type": "CreativeWork", "name": c["title"], "description": c["summary"],
    "genre": c["category"], "url": SITE + "case-studies.html#" + c["id"], "creator": {"@type": "Person", "name": "Francis Irabor"},
    "sourceOrganization": {"@type": "Organization", "name": c["client"]}}} for i, c in enumerate(_data)]})}</script>
{closer(False)}</main>

''' + FOOT

for name, html in [("index.html", index), ("work.html", work), ("case-studies.html", case_studies), ("about.html", about)]:
    open(name, "w").write(html)

# Files that help search engines and AI agents understand the site.
_cases = "\n".join(f"""### {c['title']}
- Category: {c['category']} · Client: {c['client']}
- {c['summary']}
- {' '.join(c['overview'])}
- Approach: {' '.join(c['approach'])}
- Tools: {', '.join(c['tools'])}
- Link: {SITE}case-studies.html#{c['id']}
""" for c in _data)
_faq = "\n".join(f"**{q}**\n{a}\n" for q, a in FAQS)
open("llms.txt", "w").write(f"""# Francis Irabor (also written Irabor Francis)

> {POSITION}

Francis Irabor is a motion graphics designer and 3D artist available to hire for freelance projects and full-time remote roles. He makes product and SaaS launch videos, explainer videos, app onboarding and welcome videos, UI animation, logo animation, 3D product animation, 3D event visualisation, brand and campaign graphics, and illustration. Brands he has worked with include Google Gemini, YouTube, Google for Startups, Shotstack, Lenco, PaywithAccount, Rubix, SALG and medcob. Works remotely with clients worldwide.

## Pages
- [Home]({SITE}): who he is, featured work, specialties, process and contact
- [Work]({SITE}work.html): the full portfolio by discipline (motion graphics, 3D product animation, 3D product design, 3D visualisation, graphic design, illustration)
- [Case studies]({SITE}case-studies.html): one in-depth project per discipline, with the challenge, design decisions and tools
- [About]({SITE}about.html): how he helps clients, what working with him looks like, FAQ

## Case studies
{_cases}
## FAQ
{_faq}
## Hire or contact
- Email: {MAIL}
- Upwork: {UP}
- LinkedIn: {LI}
- CV: {CV}
""")
open("site.webmanifest", "w").write(json.dumps({"name": "Francis Irabor — Motion Designer & 3D Artist", "short_name": "Francis Irabor",
    "icons": [{"src": "/assets/media/icon-192.png", "sizes": "192x192", "type": "image/png"}, {"src": "/assets/media/icon-512.png", "sizes": "512x512", "type": "image/png"}],
    "theme_color": "#fefefe", "background_color": "#fefefe", "display": "standalone", "start_url": "/"}, indent=1))
_bots = ["Googlebot", "Bingbot", "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User",
         "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot", "Applebot-Extended", "DuckDuckBot", "CCBot", "Amazonbot", "Meta-ExternalAgent"]
open("robots.txt", "w").write("# Search engines and AI assistants are welcome to read and cite this site.\n" +
    "".join(f"User-agent: {b}\n" for b in _bots) + "Allow: /\n\nUser-agent: *\nAllow: /\n\n" + f"Sitemap: {SITE}sitemap.xml\n")
open("sitemap.xml", "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    "".join(f"  <url><loc>{SITE}{p}</loc><lastmod>{__import__('datetime').date.today().isoformat()}</lastmod></url>\n" for p in ["", "work.html", "case-studies.html", "about.html"]) + "</urlset>\n")
print("built")

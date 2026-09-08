# Elif Dikmen — Portfolio

Personal data science / ML portfolio site. Plain HTML/CSS/JS — no build step, no framework, no
dependencies to install. Open `index.html` in a browser and it works.

## Structure

```
index.html           Home page — short intro, "quick introduction" highlight cards, closing CTA.
about.html            About page — full bio, Bologna research internship write-up, skills.
projects.html         Projects page — renders js/projects-data.js into cards.
contact.html          Contact page — email / GitHub / LinkedIn links.
css/style.css         All styling (soft lavender/sage theme, Fraunces + Inter).
js/projects-data.js   Project content — this is what you'll edit most often.
js/main.js            Renders projects-data.js into projects.html + shared nav/scroll behavior.
favicon.svg            "ED" monogram tab icon.
```

Each page repeats the same `<header class="site-header">` / `<footer class="site-footer">`
markup — there's no templating layer, so a nav or footer change needs to be copied into all four
`.html` files.

## Updating your projects

Open `js/projects-data.js`. It's a plain array of project objects — copy one, paste it into the
array, edit the fields, save. No HTML editing required. The object with `featured: true` gets the
large "lead" layout at the top of the section; everything else renders as a standard card in the
order it appears in the array. This file is only loaded by `projects.html`.

## Updating your bio, skills, or contact info

- Home page intro / highlight cards: `index.html`, `<section id="hero">` and `<section id="highlights">`
- Full bio, Bologna research write-up, skills tags: `about.html` — each skill group is a `<ul class="tag-list">`, just add/remove `<li class="tag">...</li>` items
- Contact links: `contact.html`, `<section>` containing `.contact-links`

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploying

**GitHub Pages:**
1. Go to **Settings → Pages** on the repo.
2. Under "Build and deployment", set Source to **Deploy from a branch**, then pick the branch
   this code actually lives on (check the branch dropdown on the repo's code tab if unsure —
   there may not be a `main` branch yet), folder `/ (root)`.
3. Your site will be live at `https://elifdikmn.github.io/Portfolio/` within a minute or two.

**Vercel / Netlify** (recommended — auto-redeploys on every push, no settings to get wrong):
Sign in with GitHub on vercel.com or netlify.com, import this repo, and deploy. No build command
or framework needed — it's a static site. You'll get a live URL immediately.

## Notes

- Project write-ups were drafted from your existing repo READMEs (FootballMatchPrediction,
  SQL_Analyze_Job, DataPrivacy). Worth a read-through to confirm every number and claim still
  matches reality before this goes live anywhere public.
- The contact email is the one associated with this GitHub account — swap it in `contact.html` if
  you'd rather show a different one publicly.
- Dark mode / theme toggle was intentionally left out — the soft palette is a deliberate single
  look, not a default that needs a dark counterpart.

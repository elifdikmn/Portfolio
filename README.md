# Elif Dikmen — Portfolio

Personal data science / ML portfolio site. Plain HTML/CSS/JS — no build step, no framework, no
dependencies to install. Open `index.html` in a browser and it works.

## Structure

```
index.html          Page structure & copy (hero, skills, contact). Edit text directly here.
css/style.css        All styling (warm/editorial theme: cream background, Fraunces + Inter).
js/projects-data.js  Project content — this is what you'll edit most often.
js/main.js           Renders projects-data.js into the page + nav/scroll behavior.
favicon.svg           "ED" monogram tab icon.
```

## Updating your projects

Open `js/projects-data.js`. It's a plain array of project objects — copy one, paste it into the
array, edit the fields, save. No HTML editing required. The object with `featured: true` gets the
large "lead" layout at the top of the section; everything else renders as a standard card in the
order it appears in the array.

## Updating your bio, skills, or contact info

These live directly in `index.html` since they change rarely:
- Bio / headline: `<section id="hero">`
- Skills tags: `<section id="skills">` — each group is a `<ul class="tag-list">`, just add/remove `<li class="tag">...</li>` items
- Contact links: `<section id="contact">`

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploying (GitHub Pages)

1. Push this repo to GitHub (already set up if you're reading this from the repo).
2. Go to **Settings → Pages** on the repo.
3. Under "Build and deployment", set Source to **Deploy from a branch**, branch `main` (or
   whichever branch you push this to), folder `/ (root)`.
4. Your site will be live at `https://elifdikmn.github.io/Portfolio/` within a minute or two.

## Notes

- Project write-ups were drafted from your existing repo READMEs (FootballMatchPrediction,
  SQL_Analyze_Job, DataPrivacy). Worth a read-through to confirm every number and claim still
  matches reality before this goes live anywhere public.
- The contact email is the one associated with this GitHub account — swap it in `index.html` if
  you'd rather show a different one publicly.
- Dark mode / theme toggle was intentionally left out — the warm palette is a deliberate single
  look, not a default that needs a dark counterpart.

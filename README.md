# Sentry Metal Services — Website

Static HTML/CSS/JS site for sentrymetal.com. No build step, no framework, no dependencies.

## File layout

```
sentry-metal-site/
  index.html        Home
  services.html     Services
  projects.html     Projects gallery
  about.html        About / company story
  contact.html      Contact + Request-a-Quote form
  css/styles.css    All site styles (design system + components)
  js/main.js        Mobile nav toggle + form fallback handler
  images/           Drop logo + project photos here (see below)
```

## Preview locally

Just double-click `index.html` — it works straight off the filesystem. Or serve it:

```powershell
# Python
python -m http.server 8000

# Node
npx serve .
```

## Real photos to add

The site currently uses numbered placeholder tiles for projects. To swap in real photos:

1. Drop JPG/PNG files in `images/` (suggested ~1200px wide, optimized).
2. In `index.html` and `projects.html`, replace each `<div class="placeholder">NN</div>` with:
   ```html
   <img src="images/clam-structure.jpg" alt="Clam structure tension support fabrication" />
   ```
3. The `.project-card` CSS already handles cover-fit and overlay — no other changes needed.

Same goes for the hero. To add a hero photo behind the gradient, edit `.hero` in `css/styles.css` and add:
```css
background-image: url('../images/hero-shop.jpg');
background-size: cover;
background-position: center;
```
Keep the existing gradient layers above it for legibility (they're already set up via `::before` / `::after`).

## Lead form — three handler options

The Request-a-Quote form on `contact.html` ships with a **mailto fallback** (data-handler="mailto"). When a visitor hits submit, it opens their email client with the form contents pre-filled to info@sentrymetal.com. Works everywhere, no signup, but requires the visitor to have a mail client configured.

Upgrade options when ready:

### Option A — Formspree (easiest, free tier)
1. Sign up at formspree.io, create a new form, copy the endpoint URL (e.g. `https://formspree.io/f/xyzabc`).
2. In `contact.html`, change the form tag:
   ```html
   <form class="form rfq-form" action="https://formspree.io/f/xyzabc" method="POST">
   ```
   Remove `data-handler="mailto"` so the JS fallback doesn't intercept.
3. Done. Submissions land in your inbox.

### Option B — Netlify Forms (if hosting on Netlify)
1. Add `netlify` attribute to the form tag:
   ```html
   <form class="form rfq-form" name="quote-request" netlify method="POST">
   ```
   Remove `data-handler="mailto"`.
2. Add a hidden honeypot field (Netlify recommends): `<input type="hidden" name="form-name" value="quote-request" />`
3. Deploy. Submissions appear in the Netlify dashboard + email notifications.

### Option C — Zoho Creator (matches your existing stack)
If you want leads to flow into your MaterialCompass / leads-tracking system: point the form action at a public Zoho Creator form URL (Submit action enabled, embed/public access on) or proxy through your existing Railway endpoint. Map each form field name to the corresponding Zoho field link name.

## Deploy

### GitHub Pages
1. `git init && git add . && git commit -m "Initial site"`
2. Create a new GitHub repo (e.g. `sentry-metal-site` under sentrymetal1).
3. `git remote add origin git@github.com:sentrymetal1/sentry-metal-site.git && git push -u origin main`
4. In repo Settings → Pages → Source = `main` branch, root.
5. Custom domain: add `CNAME` file at repo root with `www.sentrymetal.com`, configure DNS at registrar (CNAME `www` → `sentrymetal1.github.io`, apex ALIAS/ANAME if needed).

### Netlify / Vercel / any static host
Drop the folder in. No build command needed; publish directory is the root.

## Design system

Colors and type are CSS variables in `:root` at the top of `styles.css` — change in one place to retheme.

Key tokens:
- `--color-accent` = welder-spark orange (`#e35a1c`)
- `--color-steel` / `--color-steel-deep` = dark backgrounds and footer
- `--font-display` = Space Grotesk (headlines)
- `--font-sans` = Inter (body)

Both fonts load from Google Fonts via the `<link>` in each page's `<head>`.

## SEO

- Title + meta description tuned per page
- Phone, address, email present in every footer
- Internal linking between services / projects / contact
- Suggested next: add JSON-LD `LocalBusiness` schema (drop in `<head>` of each page), submit sitemap.xml to Google Search Console.

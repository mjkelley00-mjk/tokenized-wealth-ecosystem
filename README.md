# Tokenized Wealth Ecosystem

A single-page teaser site for the Tokenized Wealth Ecosystem — a model for sharing a
revitalized neighborhood's real-estate appreciation with the people who live there.

Static site: plain HTML, CSS, and a little vanilla JavaScript. No build step, no dependencies.

## Files
- `index.html` — the whole site (in-page anchor navigation + interest form)
- `styles.css` — styling (modern, dark, gold-on-navy)
- `app.js` — mobile menu, scroll-reveal, and section highlighting
- `.nojekyll` — tells GitHub Pages to serve the files as-is

## Run locally
Just open `index.html` in any browser. (No server required.)

## Set up the interest form (Formspree)
The "Express interest" form posts to [Formspree](https://formspree.io) — a free service that
collects submissions without a backend (perfect for GitHub Pages).
1. Sign up at formspree.io (free tier ~50 submissions/month) using the inbox you want
   submissions sent to (a dedicated project email is recommended, not your personal address).
2. Create a new form; copy its form ID (looks like `xayzqwer`).
3. In `index.html`, find `YOUR_FORM_ID` and replace it with your ID.
4. Submit a test entry; approve the confirmation email Formspree sends on first use.

No domain required. Submissions arrive by email and in your Formspree dashboard.

## Publish on GitHub Pages
1. Create a new repository on GitHub (e.g. `tokenized-wealth-ecosystem`).
2. Push this folder to it, or drag-and-drop the files into the repo via the web UI.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   then branch **main**, folder **/ (root)**. Save.
4. Live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Push from your computer
```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Before publishing
- The interest form is wired to Formspree (form `meebleok`). Submissions arrive in the inbox set on your Formspree account.

---
Illustrative concept in development. Not an offer, solicitation, or investment advice.

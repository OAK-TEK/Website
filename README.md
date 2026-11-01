# oaktek.org

The website for **OAK TEK - FZCO**, an independent app studio in Dubai. It presents
the studio, its two apps (LootPick and Open Chord), a blog, a contact form and the
legal documents for both apps.

Live at <https://oaktek.org>, hosted on Netlify.

## Stack

Plain HTML, CSS and a little JavaScript. No framework, no build step, no
dependencies to install.

- `assets/css/style.css`: all site styling, driven by CSS variables
- `assets/css/legal.css`: extra styling for `/legal/` pages
- `assets/js/main.js`: mobile nav, spotlight card, contact form
- `consent.js`: cookie banner, loads Google Analytics only after Accept

## Run it locally

```bash
python3 -m http.server 8765
# open http://localhost:8765/
```

Any static server works. The contact form posts to Netlify Forms, so a real
submission only works on a Netlify deploy. Locally it shows the fallback path.

## Pages

| URL | Folder |
|---|---|
| `/` | `index.html` |
| `/products/`, `/lootpick/`, `/openchord/` | `products/`, `lootpick/`, `openchord/` |
| `/about/`, `/contact/` | `about/`, `contact/` |
| `/blog/` | `blog/` |
| `/legal/` | `legal/` (hub, then `lootpick/` and `openchord/` documents) |

`app-ads.txt` sits at the root for AdMob verification. `sitemap.xml`, `robots.txt`
and `llms.txt` are maintained by hand.

## Deploying

Netlify deploys from this repository. Work on a branch, check it in a browser at
desktop and phone width, then merge. Netlify settings (forms, domains, headers) live
in the Netlify dashboard, not in the repo.

## Content upkeep checklist

When an app's store status changes, update together: the app page, `products/`
(card, FAQ), the home page, `about/`, meta descriptions, JSON-LD, `llms.txt`.

When a legal document changes, update the source repo first, then this site, then
its "Effective Date" and `sitemap.xml` `lastmod`.

## Docs

- [CLAUDE.md](./CLAUDE.md): rules for agents and contributors
- [docs/theme.md](./docs/theme.md): colours, fonts, tokens
- [docs/design.md](./docs/design.md): layout and components
- [docs/voice.md](./docs/voice.md): how we write

## Related repositories

- `OAK-TEK/open-chord-legal`: approved Open Chord legal text
- `lootpickquest/lootpick-website`: LootPick web app, and the canonical LootPick legal Markdown
- `OAK-TEK/Open-Chord`, `GameScout-App/GameScout-Repo`: the apps

&copy; 2026 OAK TEK - FZCO. All rights reserved.

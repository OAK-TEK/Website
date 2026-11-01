# CLAUDE.md

Guidance for agents working in this repository. See [README.md](./README.md) for
what the site is and how to run it.

**What this is:** the static marketing and legal site for OAK TEK - FZCO, served at
`https://oaktek.org` from Netlify. Hand-written HTML, one shared stylesheet, one
small script. No framework, no build step, no package manager.

## Operating rules

- Read only the files the task needs. Do not reread a file already in context.
- Make the smallest correct change. No unrelated refactoring or reformatting.
- There is no build and no test suite. Verify by serving the folder and looking at
  the page in a real browser (`python3 -m http.server`, then Playwright or a
  browser), at 1280px and 390px wide.
- Ask before adding a dependency, a build step, a third-party script or anything that
  sends visitor data anywhere new.
- Never push to `main` directly. Work on a branch and open a PR only when asked.

## Non-negotiables

1. **Zero em dashes** in any copy, including `alt`, `aria-label`, meta tags and
   JSON-LD. Use a comma, colon, full stop or a rewrite. Prefer full forms over
   contractions. See [docs/voice.md](./docs/voice.md).
2. **The entity is `OAK TEK - FZCO`**, with a spaced hyphen. Never "OAK TEK FZCO",
   "OAK Technologies FZE" or "FZC". The brand on its own is `OAK TEK`.
3. **Analytics only after consent.** Pages load `/consent.js`, which loads Google
   Analytics (`G-YWYTV5YEQL`) only after Accept. Never paste a bare `gtag.js`
   snippet into a page. Every page keeps the footer `Cookie settings` button
   (`id="cookie-settings"`).
4. **Colours and fonts come from the tokens** in `assets/css/style.css` `:root`. No ad-hoc
   hex values in HTML or new CSS. See [docs/theme.md](./docs/theme.md).
5. **48px is the tap target goal, 44px the floor** on every button and link-as-button.
6. **Legal text is not authored here.** See "Legal pages" below.

## Layout

| Path | What it is |
|---|---|
| `index.html`, `about/`, `products/`, `contact/` | Main pages |
| `lootpick/`, `openchord/` | One page per app, with store badges |
| `blog/` | Blog index and posts, one folder per post |
| `legal/` | Hub, plus `lootpick/` and `openchord/` documents |
| `assets/css/style.css`, `assets/css/legal.css` | All styling. `legal.css` is for `/legal/` pages only |
| `assets/js/main.js` | Mobile nav, spotlight card, contact form |
| `consent.js` | Cookie banner and Google Analytics loader |
| `app-ads.txt` | AdMob seller line. Must stay at the root of `oaktek.org` |
| `_headers`, `_redirects` | Netlify security headers, and 404s for repo docs (`CLAUDE.md`, `README.md`, `docs/`) |
| `.well-known/security.txt` | Security contact. Renew `Expires` before 2027-10-30 |
| `sitemap.xml`, `robots.txt`, `llms.txt` | Crawler files, kept by hand |

Every page repeats the same `<head>`, nav and footer. A change to nav, footer, head
tags or the consent snippet means editing every `.html` file. Grep for the old text
to find them all.

## Adding or changing a page

1. Copy the closest existing page and keep its `<head>` block: title, description,
   canonical, `og:*`, `twitter:*`, theme colour, favicon, fonts, both stylesheets
   where relevant, and the consent snippet.
2. Canonical and `og:url` use the final `https://oaktek.org/.../` URL with a
   trailing slash.
3. One `<h1>` per page, headings in order, every `<img>` with `alt`.
4. Add the page to `sitemap.xml` (with `lastmod`) and to `llms.txt` if it is public.
5. Keep meta descriptions under about 160 characters.

## Store badges and app facts

- Badge pattern: `.store-cta` outlined card, icon at the left, a small line over a
  big line. Google Play reads `Get it on / Google Play`, the App Store reads
  `Download on the / App Store`. An app that is not live shows the same badge as a
  non-link `<span class="store-cta store-cta--soon">` reading `Coming soon on the`.
  No dates for unreleased apps.
- **Open Chord:** live on Android and iOS.
  Play `https://play.google.com/store/apps/details?id=com.oaktek.openchord`,
  App Store `https://apps.apple.com/ae/app/open-chord-learn-guitar/id6802785798`.
- **LootPick:** live on Android and the web (`https://lootpick.quest`), iOS coming soon.
  Play `https://play.google.com/store/apps/details?id=quest.lootpick.app`.
- Social: Instagram `lootpick_app`, `openchord_app`; X `LootPick_app`, `OpenChord_app`;
  TikTok `@lootpick.quest`; LinkedIn `company/oak-tek`.
- Contact: `oaktechnologiesfze@gmail.com` for the studio, `play@lootpick.quest` for
  LootPick. When store status changes, update the page copy, `meta` descriptions,
  JSON-LD (`operatingSystem`, `downloadUrl`, `sameAs`), `products/` FAQ and `llms.txt`
  together.

## Legal pages

- **Open Chord** (`legal/openchord/*`) mirrors the approved text in
  `OAK-TEK/open-chord-legal`. Change the text there first, then port it here. Keep
  the "Effective Date" and the change-history entry in step.
- **LootPick** (`legal/lootpick/privacy`, `terms`) is generated from the canonical
  Markdown in `lootpickquest/lootpick-website` (`web/content/legal/*.md`) with
  `node docs/legal/oaktek-site/build.js`. Wrap the generated body in the site template
  (hero, `legal__meta`, `legal__inner`, footer). Never hand-edit the legal wording
  here.
- `legal/oaktek/privacy/` is the privacy notice for this website itself. Update it when the site
  adds a script, form field, cookie or processor, and keep LootPick privacy section 3.6 in step.
- `legal/lootpick/delete-account/` is hand-written from section 11 of the LootPick
  privacy policy. Re-check it whenever that section changes.
- A new document must also be listed in `legal/index.html`, `sitemap.xml` and `llms.txt`.

## Forms, consent and scripts

- The contact form posts to Netlify Forms (`data-netlify`, honeypot `bot-field`) and
  falls back to a `mailto:` link if the post fails. Form detection and email
  notifications are switched on in the Netlify dashboard.
- A Global Privacy Control signal is treated as a rejection (see `consent.js`). Keep the privacy
  notice and this behaviour in step.
- Consent state lives in `localStorage` under `lp_consent`. The banner is built by
  `consent.js` and styled by the `.consent` classes in `style.css`.

## Do not

- Add a framework, bundler or package manager.
- Add tracking, ads or embeds without asking.
- Inline colours, fonts or one-off styles to get around the stylesheet.
- Hand-edit `app-ads.txt` beyond the one seller line.
- Reformat files you are not otherwise touching.

## Reference

| Doc | Read it when |
|---|---|
| [docs/theme.md](./docs/theme.md) | Colours, fonts, spacing, breakpoints, assets |
| [docs/design.md](./docs/design.md) | Layout, components, accessibility |
| [docs/voice.md](./docs/voice.md) | Writing or editing any visible copy |

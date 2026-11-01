# Design

How pages are laid out and which components exist. Colours and type are in
[theme.md](./theme.md); wording is in [voice.md](./voice.md).

## Page anatomy

Every page follows the same shell:

1. `skip-link` to `#main`
2. `nav.nav` (purple, brand left, four links, menu button under 768px)
3. `main#main`
   - home: `.hero`, then `.section` blocks
   - inner pages: `.page-hero` (eyebrow, one `h1`, optional intro), then `.section` blocks
   - legal pages: `.page-hero`, then `.legal > .legal__inner` with a `.legal__meta` block
4. `footer.footer`: brand, links, studio email, LinkedIn, copyright, `Legal & Privacy`,
   `Cookie settings`
5. `assets/js/main.js` (and `consent.js` in the head)

Sections alternate `--white` and `--offwhite`, with `--purple` for emphasis. Keep
that rhythm so adjacent sections never share a background.

## Components

| Class | What it is |
|---|---|
| `.btn`, `.btn--primary`, `.btn--outline-light`, `.btn--outline-dark` | Buttons. Primary is gold on purple. Outline variants match the background |
| `.store-cta` | Store badge. Outlined card, icon left, small label over big label |
| `.store-cta--soon` | Same badge, dimmed, not a link, for a store that is not live yet |
| `.store-row` | Row that holds badges and wraps on small screens |
| `.product-card` | App card on home and products. Icon, name, one line, status badge, link |
| `.hero-card` | Spotlight card on the home hero |
| `.screens`, `.screen` | Horizontally scrolling screenshot rail with captions |
| `.pillars`, `.pillar` | Three-up feature list |
| `.faq` | Question and answer list |
| `.inline-cta` | Closing call to action on app pages |
| `.social-icons`, `.social-icon` | Round icon buttons for Instagram, X, TikTok, website |
| `.legal`, `.legal__meta`, `.legal__back` | Legal document wrapper, metadata block, back link |
| `.consent` | Cookie banner built by `consent.js` |

### Store badges

One pattern for every store. Do not mix text-only buttons and badges in the same row.

```html
<a href="STORE_URL" target="_blank" rel="noopener" class="store-cta"
   aria-label="Get Open Chord on the App Store">
  <svg class="store-cta__icon" viewBox="..." aria-hidden="true">...</svg>
  <span class="store-cta__text">
    <span class="store-cta__small">Download on the</span>
    <span class="store-cta__big">App Store</span>
  </span>
</a>
```

- Google Play: `Get it on` / `Google Play`. App Store: `Download on the` / `App Store`.
- Coming soon: use a `<span class="store-cta store-cta--soon" role="img">`
  with `aria-label="... on the App Store, coming soon"` and the small line
  `Coming soon on the`. No release dates.
- Icons are inline SVG, `currentColor` where the glyph is single-colour.

### Social icons

Same 44px round buttons everywhere. Every icon has `aria-label="<App> on <Network>"`
and `title`. Order: Instagram, X, TikTok (LootPick only), website.

## Accessibility

- Skip link first in the body. One `h1`, headings never skip a level.
- Visible focus ring: 2px gold, 2px offset, on `:focus-visible`.
- Tap targets 44px minimum, 48px preferred. Icon-only controls carry `aria-label`.
- Decorative images use `alt=""`, informative images describe themselves.
- Text contrast: use `--gold-text` for gold-toned text on light backgrounds.
- Banner and menu state use `aria-expanded` and `role="dialog"` correctly.
- `prefers-reduced-motion: reduce` disables transitions and smooth scroll.
- No horizontal page scroll at 390px. Wide tables sit in a `.tbl` wrapper that
  scrolls inside itself.

## Forms and consent

- Contact form fields have visible labels. Status text is an `aria-live` region.
- The consent banner never blocks the page, offers Reject and Accept with equal
  weight, and can be reopened from the footer on every page.

## Legal page layout

Hero with the app as the eyebrow and the document title as `h1`, then `.legal__meta`
(app name, effective date, last updated, developer), then the text, then the back
link to `/legal/`. Tables use `.tbl` so they scroll on phones.

## Checks before merging

- Looks right at 1280px and 390px, no horizontal scroll
- Every link and button works, external links have `rel="noopener"`
- Nav, footer and consent snippet identical to other pages
- No em dashes, entity written `OAK TEK - FZCO`

# Theme

The visual tokens of oaktek.org. All of them live in `assets/css/style.css` under
`:root`. Use the variable, never the raw value. Layout and components are in
[design.md](./design.md); tone is in [voice.md](./voice.md).

## Colour

| Token | Value | Use |
|---|---|---|
| `--purple` | `#321857` | Nav, heroes, footer, purple sections. The brand colour |
| `--purple-light` | `#4a2578` | Hover and active states on purple |
| `--gold` | `#D7A96B` | Primary buttons, eyebrows, focus ring, accents on purple |
| `--gold-text` | `#8A5A12` | Gold-toned text on light backgrounds (5.6:1 contrast) |
| `--gold-soft` | `rgba(215,169,107,.15)` | Soft gold fills |
| `--off-white` | `#fafaf7` | Default page background |
| `#fff` | white | Alternate section background and cards (`.section--white`) |
| `--text-dark` | `#1a1a1a` | Body text on light |
| `--text-muted` | `#5a5a5a` | Secondary text on light |
| `--lp-green` | `#45FF00` | LootPick accent. Only for LootPick UI (live dot) |
| `--lp-green-soft` | `#6ee06e` | Softer LootPick green |
| `--border` | `rgba(0,0,0,.08)` | Hairlines and card borders on light |

Rules:

- **Gold fails contrast on white** (2.1:1). Use `--gold-text` for text on light
  backgrounds. Gold text is fine on `--purple`.
- Text on purple is `#fff`, or `rgba(255,255,255,.7)` for secondary copy.
- LootPick green and the Open Chord browns appear only inside their own product
  artwork, never as site chrome.
- No new hex values in HTML or CSS. If a colour is missing, add a token first.
- The browser chrome colour is `<meta name="theme-color" content="#321857">` on
  every page.

## Type

| Token | Family | Weights loaded | Use |
|---|---|---|---|
| `--font-heading` | Space Grotesk | 400, 600, 700 | Headings, buttons, badges, the wordmark |
| `--font-body` | Inter | 400, 500, 600 | Everything else |

Both load from Google Fonts with `display=swap` and a `preconnect`. Body line height
is 1.6. Headings use `line-height: 1.2`.

| Element | Size |
|---|---|
| Home hero `h1` | fluid, set in `.hero h1` |
| Page hero `h1` | `clamp(1.8rem, 4vw, 2.75rem)` |
| Section heading | `clamp(1.6rem, 3.5vw, 2.25rem)` |
| Eyebrow | small caps tracking in Space Grotesk, gold |
| Store badge small line | `0.58rem`, uppercase, tracked |
| Store badge big line | `1.05rem`, Space Grotesk 700 |

## Shape and spacing

- Radius: `8px` buttons, `12px` cards and badges, `14px` to `16px` large panels,
  `100px` pills.
- Section padding: `4.5rem 2rem`. Page hero: `3.5rem 2rem 3rem`.
- Content width: `1100px` max (`.section__inner`), `780px` for narrow reading,
  `760px` for legal text.
- Shadows are soft and low: hover cards use `0 8px 28px rgba(0,0,0,.07)`, the
  consent banner `0 10px 30px rgba(0,0,0,.35)`.
- Transitions are `0.15s` to `0.2s`. `prefers-reduced-motion` switches animation off.

## Breakpoints

| Rule | Purpose |
|---|---|
| `min-width: 1000px` | Screenshot rail centres |
| `max-width: 900px` | Two-column layouts collapse |
| `max-width: 768px` | Mobile nav, stacked footer |
| `max-width: 380px` | Smallest phones, tighter headings |

Test at 1280px and 390px.

## Assets (`assets/img/`)

| File | Use |
|---|---|
| `oak-tek-logo-purple.png` / `.jpg` | Logo on light and in the nav |
| `oak-tek-logo-white.png` / `.jpg` | Logo on dark |
| `favicon.jpg` | Favicon on every page |
| `og-image.jpg` | Default `og:image` and `twitter:image` |
| `lootpick-icon.png`, `openchord-logo.png` | App marks |
| `screens/` | App screenshots, with width and height set to avoid layout shift |

Give every image `width` and `height`. Use `loading="lazy"` below the fold.

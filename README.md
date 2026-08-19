# ZENOMIX

**Zenomix Services UG** — a single-page marketing and demo site for a transport and
mobility provider working exclusively with vehicles under 3.5 tonnes: courier and parcel
work (including subcontracting for B2B logistics networks), passenger transport,
non-emergency patient journeys, and in-house fleet and shift management.

Built as a React 19 + TypeScript SPA with Vite and Tailwind CSS v4, fully trilingual
(English / German / Arabic with RTL support) and light/dark themed.

> Live site: `https://zenomix.de` — deployed automatically from `main` via GitHub Actions.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [Internationalisation](#internationalisation)
- [Theming](#theming)
- [Demo data](#demo-data)
- [Contact form](#contact-form)
- [Deployment](#deployment)
- [Notes and known caveats](#notes-and-known-caveats)

---

## Features

| Area | Description |
| --- | --- |
| **Hero** | Full-screen section with a looping background video (`public/videos/hero-background.mp4`) and CTAs into the tracking/tech page. |
| **About** | Company story plus three pillars: dependability inside logistics networks, digital dispatch, trained drivers. |
| **Services** | Four service cards (Courier & Parcel, Passenger Transport, Non-Emergency Patient Transport, Fleet & Shift Management) with a detail modal that locks body scroll while open. |
| **Transport cost calculator** | Interactive quote estimator for the light-commercial segment: assignment type (direct run / standard round / overnight / groupage), weight in kg and distance in km, plus temperature-control, high-value and carbon-contribution add-ons. Produces a cost breakdown in EUR, a lead-time estimate, a CO₂ saving and a generated reference ID. |
| **Route & shift overview** | Search by route number against a mock in-memory database, with preset routes, status badges, a progress bar and a full shift log. Reflects what the in-house software actually does — organising drivers, shifts and routes, not tracking individual parcels. |
| **Fleet** | Filterable catalogue of vehicles under 3.5 t (all / large van 3.5 t / panel van / passenger+patient) with a metric spec panel for the selected vehicle. |
| **Reviews & FAQ page** | Testimonial carousel plus an animated accordion FAQ. |
| **Contact** | Validated contact form posting to Formspree, with a local session list of submissions. |
| **Legal pages** | Imprint (Impressum, § 5 TMG) and Privacy policy (Datenschutz), each translated in all three languages. |
| **Navbar / Footer** | Sticky navbar with scroll-spy highlighting, language dropdown with flag icons, dark-mode toggle, WhatsApp/Instagram links, mobile drawer. Footer adds a sitemap, ops contact details, legal links and a newsletter signup. |
| **Global UX** | Smooth scrolling with header offset, browser back/forward support via the History API, and a floating "back to top" button after 400 px of scroll. |

## Tech stack

- **React 19** + **TypeScript 5.8** (`react-jsx`, `noEmit` — type checking only)
- **Vite 6** as dev server and bundler
- **Tailwind CSS v4** via `@tailwindcss/vite` (CSS-first config in `src/index.css`)
- **lucide-react** and **react-icons** for icons
- **motion** (Framer Motion) for the FAQ accordion and navbar animations
- **Formspree** for contact form delivery
- **GitHub Actions + GitHub Pages** for deployment

## Getting started

Prerequisites: **Node.js 18+** and npm.

```bash
git clone https://github.com/m-alzhouri/ZENOMIX.git
cd ZENOMIX
npm install
npm run dev
```

The dev server runs on <http://localhost:3000> and binds to `0.0.0.0`, so it is also
reachable from other devices on the same network.

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000, host `0.0.0.0`. |
| `npm run build` | Production build into `dist/`. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run lint` | Run `tsc --noEmit` — type check only, no emit. |
| `npm run clean` | Remove `dist/` (and a legacy `server.js`, if present). |

There is no `deploy` script any more — deployment runs in CI, see [Deployment](#deployment).

## Environment variables

Copy `.env.example` to `.env` if you need them. Both are injected automatically when the
project runs inside Google AI Studio:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Reserved for Gemini API calls. |
| `APP_URL` | Public URL the applet is hosted at. |
| `DISABLE_HMR` | Set to `true` to disable HMR **and** file watching (used by AI Studio to stop flicker during agent edits). |

> The current front-end code does **not** call the Gemini API — `GEMINI_API_KEY` and the
> `@google/genai` / `express` dependencies are leftovers from the AI Studio scaffold.
> All `.env*` files are gitignored except `.env.example`.

## Project structure

```
.
├── CHANGELOG.md               # Change log — newest entries at the top
├── index.html                 # Vite entry HTML
├── vite.config.ts             # base: '/', react + tailwind plugins, HMR switch
├── metadata.json              # AI Studio applet manifest
├── public/
│   ├── favicon.png
│   └── videos/hero-background.mp4
└── src/
    ├── main.tsx               # React root, wraps <App/> in <LanguageProvider>
    ├── App.tsx                # Page router, scroll-spy, theme state, navigation
    ├── LanguageContext.tsx    # Language provider + useLanguage() hook
    ├── translations.ts        # en/ar/de string dictionaries + translated datasets
    ├── data.ts                # English source data (services, fleet, testimonials, tracking)
    ├── types.ts               # Shared TypeScript interfaces
    ├── index.css              # Tailwind v4 theme tokens, fonts, animations, scrollbars
    ├── assets/                # Logos and language flags
    └── components/
        ├── Navbar.tsx  Hero.tsx  About.tsx  Services.tsx
        ├── Calculator.tsx  Tracker.tsx  Fleet.tsx
        ├── ReviewsFaqPage.tsx  Faq.tsx  Contact.tsx
        ├── Impressum.tsx  Datenschutz.tsx
        └── Footer.tsx  Logo.tsx
```

## Architecture

### Routing

There is no router library. [`App.tsx`](src/App.tsx) holds a `currentPage` state of type
`'home' | 'tracking-tech' | 'impressum' | 'datenschutz' | 'reviews-faq'` and renders the
matching branch:

- **home** → `Hero` + `About` + `Services` + `Contact`
- **tracking-tech** → `Calculator` + `Tracker` + `Fleet`
- **impressum** / **datenschutz** → legal pages with a back button
- **reviews-faq** → testimonials + FAQ

`navigatePage()` pushes onto `window.history` and a `popstate` listener restores the page,
so browser back/forward works. `handleNavigate(sectionId)` switches page when needed, then
smooth-scrolls to the target element with a 70 px header offset.

### Scroll spy

An `IntersectionObserver` (`rootMargin: '-30% 0px -50% 0px'`) watches the `home`, `about`,
`services` and `contact` sections and feeds `activeSection` to the navbar for highlighting.

### Section IDs

`home`, `about`, `services`, `contact`, `calculator`, `tracker`, `fleet`, `faq` — used both
for anchor navigation and by the scroll-spy observer.

## Internationalisation

`LanguageProvider` ([`src/LanguageContext.tsx`](src/LanguageContext.tsx)) exposes:

```ts
const { language, changeLanguage, t, isRtl, services, fleet, testimonials, trackingDb }
  = useLanguage();
```

- **Languages:** `en` (default), `de`, `ar`.
- **Persistence:** stored in `localStorage` under `language`; also sets
  `document.documentElement.lang` and `dir`.
- **RTL:** `isRtl` is true for Arabic; components use it to mirror layout, flip icons and
  switch text alignment.
- **Strings:** `t(key)` looks the key up in the active dictionary and falls back to English.
  `enTranslations` is the source of truth — `arTranslations` and `deTranslations` are typed
  as `typeof enTranslations`, so a missing key is a compile error.
- **Datasets:** services, fleet, testimonials and the tracking database exist per language
  (`servicesData`, `servicesData_de`, `servicesData_ar`, …) and are swapped by the provider,
  so switching language re-translates content instantly. Components key their selection by
  **id** (e.g. `selectedVehicleId`) rather than by object, so the selection survives the swap.

Adding a language means: add the code to the `Language` union, add a dictionary and the four
datasets in `translations.ts`, register them in `dataMap`, and add an entry with a flag to
`languageOptions` in `Navbar.tsx`.

## Theming

Dark mode is class-based. `App.tsx` toggles `.dark` on `<html>`, persists the choice in
`localStorage` under `theme`, and falls back to `prefers-color-scheme` on first visit.
Tailwind is wired to it in `src/index.css` via `@variant dark (&:where(.dark, .dark *))`.

Design tokens (also in `index.css`):

| Token | Value |
| --- | --- |
| `--font-sans` | Cairo, Inter |
| `--font-display` | Space Grotesk |
| `--font-mono` | JetBrains Mono |
| `--color-brand-navy` | `#0f172a` |
| `--color-brand-blue` | `#2563eb` |
| `--color-brand-cyan` | `#3b82f6` |

## Demo data

All route data is mock data in [`src/data.ts`](src/data.ts) — there is no backend. Try
these route numbers in the route & shift overview:

| ID | Assignment | Status |
| --- | --- | --- |
| `ZN-772-B1` | Delivery round (subcontracted), Cologne-Ossendorf depot → Cologne North | In Transit |
| `ZN-982-A3` | Direct run (same-day courier), Düsseldorf depot → Neuss | Out for Delivery |
| `ZN-104-C8` | Passenger transport (staff shuttle), Duisburg yard → Plant II | In Transit |
| `ZN-334-D9` | Non-emergency patient transport (wheelchair), Essen → dialysis centre | Delivered |

The calculator is likewise a client-side estimate: per-tier rates on kg and km, surcharges for
temperature control (+25 %) and high-value securing (+15 %), a flat carbon contribution with a
rebate, and a €25 minimum dispatch rate. Number formatting follows the active locale.

## Contact form

[`Contact.tsx`](src/components/Contact.tsx) posts `FormData` to
`https://formspree.io/f/<FORMSPREE_FORM_ID>`. The form ID is the `FORMSPREE_FORM_ID`
constant at the top of the file — replace it with your own Formspree endpoint. Successful
submissions are also appended to an in-memory session list shown under the form; it is not
persisted.

The footer newsletter field and the Instagram link (`instagram.com/yourinstagram`) are
placeholders — update them before going live.

## Deployment

The site is served by **GitHub Pages** on the custom domain **`zenomix.de`**, and deploys
**automatically on every push to `main`** — there is no manual deploy step.

### How it works

`.github/workflows/deploy.yml` runs on every push to `main` (and can be started by hand via
*Actions → Deploy to GitHub Pages → Run workflow*):

1. `npm ci` — install from the lockfile
2. `npm run lint` — type check; **a type error fails the run and nothing is deployed**
3. `npm run build` — production build into `dist/`
4. Upload `dist/` as a Pages artifact and deploy it

The workflow uses the official Pages deployment (`actions/deploy-pages`), so there is **no
`gh-pages` branch** — the built site never lives in the repository.

### Configuration that belongs to the domain

- `vite.config.ts` sets `base: '/'` — the site lives at the domain root, not under a sub-path
- `public/CNAME` contains `zenomix.de` and is copied into every build
- `package.json` sets `homepage` to `https://zenomix.de`

Change all three together if the domain ever changes. Assets referenced at runtime (e.g. the
hero video) use `import.meta.env.BASE_URL`, so they follow `base` automatically.

### One-time repository setup

In *Settings → Pages*: set **Source** to **GitHub Actions**, and **Custom domain** to
`zenomix.de`. Once the DNS check passes, tick **Enforce HTTPS**.

### DNS records (registrar: united-domains)

| Type | Name / Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `m-alzhouri.github.io.` |

The four A records point the apex domain at GitHub's Pages servers; the `www` record lets
`www.zenomix.de` resolve and redirect to the apex. Propagation usually takes minutes but can
take up to 24 hours, and GitHub issues the TLS certificate only after it sees the records.

## Notes and known caveats

- `@google/genai`, `express`, `dotenv` and `@types/express` are declared but unused; they can
  be dropped once you're sure no server-side piece is coming back.
- `npm run lint` is a type check only — there is no ESLint/Prettier config in the repo.
- There are no tests.
- Company identity data is deliberately left as visible placeholders — `[HRB-Nummer]`,
  `[Straße und Hausnummer]`, `[Telefonnummer eintragen]` and so on — in `Impressum.tsx` and
  in the contact section. Earlier fabricated values were removed. **Fill these in with the
  real, legally accurate details of Zenomix Services UG before publishing.**
- The `package.json` `name` field is still the scaffold default (`react-example`).

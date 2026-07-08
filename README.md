# True Light International Evangelical Church — Website

A production-ready Next.js 15 (App Router) site for True Light International
Evangelical Church, Seattle.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js` needed)
- React Three Fiber + Three.js — glowing 3D cross hero
- Framer Motion — scroll-reveal animations (`components/ui/Reveal.tsx`) and
  page transitions (`app/template.tsx`), respects `prefers-reduced-motion`
  via `MotionConfig`
- Resend — real contact-form email delivery
- ESLint (flat config, `next/core-web-vitals` + `next/typescript`)
- Dynamic routing for sermons (`/sermons`, `/sermons/[slug]`)
- SEO: metadata API, `sitemap.ts`, `robots.ts`, dynamic OG image, Open Graph +
  Twitter cards, JSON-LD `Church` schema with opening hours
- Accessibility: skip-to-content link, labeled form fields, visible focus
  states, landmark `<main>`/`<nav>`/`<footer>`, AA-contrast text colors

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY + CONTACT_TO_EMAIL to enable real emails
npm run dev
```

Open http://localhost:3000.

```bash
npm run build
npm start
```

`npm run build` produces a production build with no errors and is ready to
deploy to Vercel with zero configuration changes.

## Project structure

```
app/                  Routes (App Router)
  layout.tsx           Root layout, fonts, global metadata
  page.tsx             Home page — assembles all sections
  globals.css          Tailwind import + design tokens (@theme)
  sitemap.ts           Dynamic sitemap.xml
  robots.ts            robots.txt
  opengraph-image.tsx  Generated social share image
  icon.tsx             Favicon
  api/contact/route.ts Contact form submission handler
  sermons/             Sermon list + dynamic [slug] detail pages
components/           One component per section (Hero, About, Ministries, …)
  ui/                  Small reusable primitives (Button, SectionHeading, …)
lib/                   Static content (data.ts) + site config
hooks/                 useMediaQuery (responsive nav breakpoint)
```

## Content to replace before launch

Everything below is clearly marked as a placeholder in the source
(`lib/data.ts`, `lib/site-config.ts`, and inline in components) and is safe to
search for:

- **Pastor / leadership names** — set to "Pastor Derge Gadafa" in
  `lib/site-config.ts` (`siteConfig.pastor`). Update if this changes.
- **Service times** — real: Sunday Worship 1:30–3:00 PM, Bible Study
  Thursday 6:00 PM (`lib/data.ts` → `serviceTimes`). The Midweek Prayer time
  is still a placeholder — confirm and update.
- **Address** — real: 15211 15th Ave NE, Shoreline, WA 98155
  (`lib/site-config.ts` → `siteConfig.address`, also used in the JSON-LD
  structured data in `app/layout.tsx`, the embedded Google Map, and the
  Google Calendar / directions links).
- **Ministries copy** — `lib/data.ts` → `ministries` (content is final; only
  update if ministries change).
- **Sermons** — `lib/data.ts` → `sermons`. Add a real `videoUrl` per sermon and
  swap the striped placeholder thumbnail in `components/Sermons.tsx` /
  `app/sermons/[slug]/page.tsx` for a real embed or `next/image` thumbnail.
- **Events** — `lib/data.ts` → `events`.
- **Giving link** — `siteConfig.givingUrl` in `lib/site-config.ts`.
- **Social links** — `siteConfig.social` in `lib/site-config.ts`.
- **Production domain** — `siteConfig.url` in `lib/site-config.ts` (used for
  metadata, sitemap, and OG tags).
- **Photos** — `components/ui/PlaceholderBlock.tsx` renders the striped
  "photo coming soon" blocks used in the About and Visit sections. Once real
  photos are available, replace usage with `next/image`, e.g.:

  ```tsx
  <Image src="/photos/congregation.jpg" alt="..." fill className="object-cover" />
  ```

  and add the image file to `public/photos/`.

## Contact form

`app/api/contact/route.ts` validates submissions and, when `RESEND_API_KEY`
and `CONTACT_TO_EMAIL` are set (see `.env.example`), emails them via
[Resend](https://resend.com). Without those env vars it falls back to
logging the submission to the server console instead of failing, so the form
still works end-to-end in local dev.

## Accessibility

- Skip-to-content link at the top of every page, jumping to a `<main id="main-content">` landmark.
- All form inputs have associated `<label>`s (visually hidden, screen-reader
  accessible) in addition to placeholders.
- Visible focus outlines (`focus-visible`) on every interactive element.
- Eyebrow/accent text uses `text-gold-deep` (`#8a6d2f`) on light backgrounds
  instead of the brighter brand gold, which fails WCAG AA at small sizes —
  the brighter gold is reserved for dark (navy) backgrounds where contrast is
  already strong.
- The 3D hero and scroll-reveal animations respect `prefers-reduced-motion`.

## Deploying

The project has no required environment variables and builds cleanly out of
the box — push to a Git repo and import it in Vercel, or run `vercel deploy`
from this directory.

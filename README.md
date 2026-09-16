# Illumina Health Lab

Marketing website for Illumina Health Lab — built with React, Vite, Tailwind CSS, and React Router.

## Tech stack

- React 18 (JavaScript / JSX, no TypeScript)
- Vite
- Tailwind CSS
- React Router
- Deployable to Cloudflare Pages

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build
```

Output is written to the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Deploying to Cloudflare Pages

- **Build command:** `npm run build`
- **Output directory:** `dist`

A `public/_redirects` file is included so client-side routes (e.g. `/about`, `/team`) resolve correctly on refresh and direct navigation.

## Project structure

```
src/
  assets/          Logo and static images
  components/      Reusable UI building blocks (Navbar, Footer, cards, hero, etc.)
  pages/           One file per route (Home, About, Team, Publications, GetInvolved)
  data/            Placeholder content (team roster, publications, collaborator logos)
  App.jsx          Route definitions
  main.jsx         App entry point
  index.css        Tailwind + global styles + font imports
```

## Content to update later

- `src/data/team.js` — swap placeholder Senior Researcher / Core Team cards for real names & roles, and add real headshots to `TeamCard` if desired.
- `src/data/publications.js` — replace placeholder titles/journals with real publications.
- `src/data/logos.js` — replace placeholder collaborator names with real logo images (import into `LogoCarousel.jsx`).
- `src/assets/logo.png` — the current Illumina Health Lab logo; replace this file to update the mark everywhere (Navbar + Footer both import from here).

## Design tokens

| Token | Hex |
|---|---|
| Deep navy | `#071B4D` |
| Coral / red | `#F15B61` |
| Soft blush | `#FFF3F0` |
| Light blue | `#DDEEF7` |
| Warm orange | `#F5A14A` |

Headings use **Playfair Display**; body and nav copy use **Inter** (both loaded via Google Fonts in `src/index.css`).

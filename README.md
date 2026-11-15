# aiplanets.guide

Two Planets: a detailed, source-checked AI field guide for Claude and ChatGPT users, from first questions to developer workflows.

## Pages

- `index.html`: start page and level quiz
- `level1.html` to `level4.html`: Launch Pad, Low Orbit, Deep Space, Mission Control
- `help.html`: Something Went Wrong
- `guide.css`: shared responsive styles
- `visit-sensor.js`: anonymous visit and observed-active-time events for the Page Visits dashboard
- `CNAME`, `robots.txt`, `sitemap.xml`: domain and search setup

## Vercel

This is a static HTML site with no build step. Import the repository root as an “Other” project and serve the root directory. Add `aiplanets.guide` to the project, then apply the DNS records Vercel provides at the domain's current DNS provider.

The guide compares Claude and ChatGPT side by side. Claude is made by Anthropic. Product details change; source notes are dated “Checked Nov 2026.”

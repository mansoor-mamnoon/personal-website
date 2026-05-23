# mansoor-mamnoon.github.io

Personal portfolio for **Mansoor Mamnoon** — UC Berkeley EECS Honors, Class of 2027.

**[Live site](https://mansoor-mamnoon.github.io/) · [Resume](https://mansoor-mamnoon.github.io/resume.html) · [LinkedIn](https://linkedin.com/in/mansoormamnoon)**

---

## Stack

No framework. No build step. No npm. Six HTML files, one CSS file (`style.css`, ~1900 lines), one JS file (`main.js`, ~260 lines), and static assets. The entire site deploys by pushing files to GitHub Pages.

---

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Identity, credential scan, headline metrics, highlights table, featured projects |
| `projects.html` | Deep-dives on LLMFirewall, C++20 Matching Engine, Edge Deployer, Offline RL Agent |
| `experience.html` | Full work history: Databricks, BAIR, Amazon, BLCK UNICRN, CS 61C teaching |
| `resume.html` | Inline HTML resume with print-optimized layout + PDF download |
| `about.html` | Engineering background and profile |
| `notes.html` | Engineering notebook — distributed systems, databases, compilers, networking |

---

## What makes it different

Most portfolio sites are a Next.js app with Tailwind, a shadcn card grid, and Vercel deployment. This site uses none of that. The interesting part is what the constraints forced.

### CSS Cascade Layers — no specificity wars, no `!important`

The stylesheet is organized into six named `@layer` declarations: `reset → tokens → base → layout → components → utilities`. Layers have lower specificity than unlayered rules and a defined cascade order, so a utility class always beats a component class by position in the layer list — not by selector weight. This eliminates the entire class of "my styles aren't applying" bugs that make large CSS codebases unmaintainable. The same pattern underlies Tailwind's internals, but here it's explicit and transparent.

### Registered custom properties — animated gradients without JavaScript

CSS can't interpolate an arbitrary custom property by default because it doesn't know the value type. `@property` registers `--gradient-angle` with `syntax: '<angle>'`, which tells the browser to treat it as an angle and interpolate it smoothly. This enables animating the conic gradient on hover at the compositor level — no `requestAnimationFrame`, no inline style updates, no JavaScript at all.

### Two-theme token system using `color-mix`

Every color in the site is a CSS custom property. Switching from dark to light mode is a single `data-theme` attribute toggle on `<html>` — the `[data-theme="light"]` block overrides only the color tokens, and every component that references them updates instantly. The semi-transparent tints (hover states, surface overlays, glow effects) are computed with `color-mix(in srgb, var(--accent) 12%, transparent)` — derived from their parent token at authoring time, so adding a new accent color never requires hunting down hardcoded rgba values.

### Scroll-driven progress bar — zero JavaScript

The reading progress bar at the top of each page is implemented entirely in CSS using `animation-timeline: scroll()`. This API maps scroll position directly to an animation's progress timeline without any scroll event listener or `requestAnimationFrame` loop. The browser handles it on a separate thread; main thread JS cannot interfere with it.

### View Transitions API — cross-page animation without a router

Internal navigation uses `document.startViewTransition()`. The browser captures the current state, navigates, then cross-fades between the two page screenshots at the compositor level — smooth page transitions without a single-page app, client-side router, or JavaScript navigation interception. Falls back silently to a hard navigation on browsers that don't support it.

### Command palette in ~80 lines of vanilla JS

`⌘K` opens a keyboard-driven navigation overlay. The implementation is a self-contained state machine: a `COMMANDS` array of `{ icon, label, action }` objects, a `filtered` array derived by substring match, a `selIdx` cursor, and a `render()` function that regenerates the `<ul>` on every state change. Arrow keys move the cursor; Enter fires the action; Escape closes. No library, no virtual DOM, no debounce.

### Flash-free theme persistence

The theme is read from `localStorage` and applied in a blocking inline script that runs before the first paint — before `<link rel="stylesheet">` even parses. This means there is never a flash of the wrong theme on page load, even on repeat visits. It's the same pattern Next.js uses internally; here it's four lines of code.

### Deep-link routing via URL hash

`/projects.html#orderbook` and `/projects.html#llmfirewall` navigate directly into the correct project panel. `window.location.hash` is read on `DOMContentLoaded` and the matching panel is activated. No router, no URL parsing library.

### SVG favicon + full icon set from design tokens

The favicon is a serif "M" in signal orange (`#ff8a4c`) on charcoal plum (`#15111c`) — the exact accent and background tokens from the CSS. The full set includes a crisp `favicon.svg` (scales perfectly at any DPI), a multi-size `favicon.ico` (16, 32, 48, 64px for browser tab and taskbar), and a 180px `apple-touch-icon.png` for iOS home screen pinning. Generated programmatically from the token values so any future brand color change propagates to the favicon with one script run.

### Schema.org JSON-LD structured data

The homepage embeds a `Person` schema with `alumniOf`, `worksFor`, `sameAs`, and a `knowsAbout` array. The projects page embeds `SoftwareSourceCode` schemas for LLMFirewall and the matching engine with `codeRepository` and `keywords`. This gives search engines a machine-readable entity graph associating the name with companies, skills, and specific projects — not just keyword frequency in body text.

### Print CSS for resume

`resume.html` has a dedicated `@media print` block with `@page { margin: 1.5cm; size: A4 portrait; }`. Navigation, footer, toast, and command palette are hidden. All colors are forced to black on white. The layout reflows to a single column with no box shadows or borders. Printing or saving to PDF from the browser produces a clean single-page resume without any layout artifacts.

### Responsive without a framework

The responsive system uses `clamp()` for fluid scaling between breakpoints (font sizes, padding, container widths scale proportionally to viewport width with no step-jumps), explicit `grid-template-columns` and `grid-row` placement at `≤700px` to solve layout conflicts in the route table, and horizontal-scroll tab navigation for the project sidebar on mobile. `overflow-x: clip` on `<html>` prevents horizontal scrollbar bleed from absolutely-positioned elements without breaking `position: sticky`. `@media (prefers-reduced-motion: reduce)` disables all transitions and animations for users who opt out.

---

**Contact:** mansoormmamnoon@berkeley.edu

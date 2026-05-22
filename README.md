# mansoor-mamnoon.github.io/personal-website

Personal portfolio for **Mansoor Mamnoon** — UC Berkeley EECS Honors, Class of 2027.

Incoming SWE Intern at **Databricks Traffic Platform** (Go, Rust). Previously **Amazon SDE Intern** (TypeScript, AWS). Targeting 2027 new grad roles in distributed systems, infrastructure, low-latency systems, and secure AI tooling.

**[Live site](https://mansoor-mamnoon.github.io/personal-website/) · [Resume](https://mansoor-mamnoon.github.io/personal-website/assets/Mansoor_Mamnoon_Resume.pdf) · [LinkedIn](https://linkedin.com/in/mansoormamnoon)**

---

## Who this is for

If you are a recruiter or hiring manager at a company building serious infrastructure: this site exists to answer one question quickly: *can this person ship?*

---

## Pages

| Page | Purpose |
|---|---|
| `/` | Identity, credential scan, headline metrics, highlights table, featured systems |
| `/projects.html` | Deep-dive on LLMFirewall, C++20 Matching Engine, and Edge Deployer |
| `/experience.html` | Full work history: Databricks, Amazon, CS 61C teaching |
| `/notes.html` | Engineering notebook — distributed systems, databases, compilers, networking |
| `/about.html` | Bio and target roles |
| `/resume.html` | Inline HTML resume + PDF download |

---

## Site features

### Command palette (`⌘K`)
A keyboard-driven navigation overlay. Typing filters commands in real time; arrow keys and Enter select; Escape closes. Built as a self-contained state machine: a filtered array of command objects, a selected-index cursor, and a render function that regenerates the list on every state change. No library — roughly 80 lines of vanilla JS.

### Scroll-driven progress bar
A thin progress bar at the top of every page that fills as you scroll. Implemented entirely in CSS using `animation-timeline: scroll()` — zero JavaScript. This is a relatively recent browser API that maps scroll position directly to an animation's progress timeline without a scroll event listener or `requestAnimationFrame` loop.

### Scroll reveal (Intersection Observer)
Sections below the fold fade and translate into view as they enter the viewport. Uses `IntersectionObserver` with a threshold of `0.08` and a `-32px` root margin so elements animate just before they fully enter view. Once revealed, the observer disconnects from that element — no wasted observations.

### Animated counters
Numbers like `20M+ msgs/sec` count up from zero when they scroll into view, driven by a second `IntersectionObserver`. The animation uses a cubic ease-out easing function (`1 - (1-t)³`) computed frame by frame via `requestAnimationFrame` rather than a CSS transition, so the counter works on any numeric value regardless of unit.

### View Transitions API
Internal page navigation (`.html` links) uses `document.startViewTransition()` where supported. The browser captures the current state, navigates, then cross-fades between old and new screenshots at the compositor level — smooth page transitions without a single-page app framework or client-side router.

### Dark / light theme
Theme is set from `localStorage` in a blocking inline script before the first paint, so there is never a flash of the wrong theme on page load. Switching is instant — a single `data-theme` attribute on `<html>` toggles between two sets of CSS custom property values. The choice persists across sessions.

### Projects deep-link routing
`/projects.html#orderbook` and `/projects.html#llmfirewall` deep-link directly into the correct project panel. On load, `window.location.hash` is read and the matching panel is activated. The same logic handles URL hash changes without a router.

### Hover-preview panel
The Highlights table on the homepage shows a detail panel when you hover a row. The panel content is stored as `data-preview-*` attributes on each row — no separate API call, no hidden DOM clones. The preview div uses `aria-live="polite"` so screen readers announce the update.

### Notes filter
The Engineering Notes page has a category filter (distributed systems, databases, compilers, networking) that shows/hides notes by `data-category` attribute. No external state management — just a `forEach` over `noteItems` comparing the active filter string.

### Full mobile navigation
Hamburger menu opens a slide-in drawer. A document-level click listener closes it when clicking outside. `aria-expanded` is kept in sync with the open state.

---

## Engineering concepts behind the implementation

### CSS Cascade Layers (`@layer`)
The stylesheet is organized into six named layers: `reset`, `tokens`, `base`, `layout`, `components`, `utilities`. Layers have lower specificity than unlayered rules and a defined cascade order, so a utility class always wins over a component class without needing `!important` or deeply nested selectors. This is the same pattern used in modern CSS frameworks like Open Props and Tailwind's internals.

### Design tokens via CSS custom properties
All colors, spacing values, typography, and transition durations are declared as custom properties in `:root`. A second `[data-theme="light"]` block overrides only the color tokens — the layout and typography layers see no change. This is a single-source-of-truth token system: change `--accent-warm` once and every button, badge, and border that uses it updates everywhere.

### `@property` for animatable custom properties
The conic gradient used in certain hover states requires an animatable `--gradient-angle`. CSS can't transition an arbitrary custom property by default because it doesn't know the type. `@property` declares the property's syntax (`<angle>`), inheritance, and initial value, which tells the browser it's safe to interpolate — enabling smooth gradient rotation with no JavaScript.

### `clamp()` for fluid scaling
Font sizes and layout widths use `clamp(min, preferred, max)` instead of breakpoint-driven overrides. The identity name scales between `2rem` and `3rem` proportionally to viewport width. Container padding scales between `1rem` and `2.5rem`. Fewer media queries, smoother scaling across arbitrary viewport sizes.

### Semantic HTML and ARIA
The Highlights table uses `role="table"`, `role="row"`, `role="columnheader"`, and `role="cell"` to expose a meaningful table structure to assistive technology despite being built from `<div>` and `<a>` elements. The command palette has `role="dialog"`, `aria-modal`, `aria-owns`, `aria-expanded`, and `aria-selected` on individual options. Every interactive element has a visible or screen-reader-only label. The `sr-only` utility hides H1 headings visually while keeping them in the accessibility tree and in search engine indexes.

### Schema.org JSON-LD structured data
The homepage embeds a `Person` schema with `@id`, `alumniOf`, `worksFor`, `sameAs`, and a `knowsAbout` array covering 14 domains. The projects page embeds two `SoftwareSourceCode` schemas for LLMFirewall and the matching engine, with `codeRepository` and `keywords`. This gives search engines a machine-readable entity graph to associate the name with companies, skills, and specific projects — not just keyword soup in body text.

### Performance-conscious asset loading
The headshot uses `loading="eager"` (it's above the fold and should not be lazy-loaded). All three project logo images use `loading="lazy"`. The theme script runs synchronously before the stylesheet to prevent a flash of unstyled content. Google Fonts is loaded with `display=swap` so text renders in a fallback font immediately rather than waiting for the network.

### Zero framework
No React, no Vue, no build step, no bundler, no npm. The entire site is six HTML files, one CSS file, one JS file, and static assets. This was a deliberate choice: understanding what a browser actually does — how the cascade resolves, how the event loop schedules `requestAnimationFrame`, when `IntersectionObserver` fires relative to paint — is more useful than knowing a framework's API surface. The constraint also means the site loads instantly and has no dependency update surface.

---

## Target roles

Open to 2027 new grad roles in:

- Distributed systems and infrastructure engineering
- Backend and platform engineering
- Networking and storage systems
- Low-latency and HFT-adjacent systems
- Database and query engine internals
- Compiler and runtime engineering
- Secure AI tooling and LLM agent security

**Contact:** mansoormmamnoon@berkeley.edu

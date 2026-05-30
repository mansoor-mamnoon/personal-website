You are a senior mobile web UX engineer. Optimize this personal portfolio website for mobile viewers across iPhone, Android, small phones, large phones, and mobile browsers.

Primary goal:
The website must feel intentionally designed for mobile, not like a desktop site squeezed into a narrow viewport.

Important context:
This is a recruiter-facing personal portfolio for a systems/infrastructure engineer. The site has:
- homepage with identity section, 5-second scan, Signal Routes, Featured Projects
- projects page with project index/detail panels
- experience page with ledger/timeline entries
- resume page
- profile page
- notes page
- command palette
- theme toggle
- mobile drawer navigation
- light and dark themes

Mobile priorities:
1. Recruiters must understand the candidate in 5 seconds.
2. Resume, Projects, Experience, GitHub, LinkedIn, and Email must be easy to access.
3. No horizontal scrolling anywhere.
4. All tap targets must be comfortable.
5. Route tables must become readable stacked cards on mobile.
6. Project detail pages must not require side-by-side panels on mobile.
7. Navigation must be obvious, stable, and not glitchy.
8. The command palette must not interfere with the normal mobile navigation.
9. The theme toggle must work but should not dominate.
10. Mobile typography must be readable without zooming.

Tasks:

A. Global mobile CSS
Audit all layout containers and add responsive rules for:
- 320px width
- 360px width
- 390px width
- 430px width
- 480px width
- 768px width

Use a mobile-first or clean breakpoint strategy. Recommended breakpoints:
- <= 480px: small phones
- 481px–767px: large phones
- 768px–1023px: tablets
- >= 1024px: desktop

Make sure:
- body has no horizontal overflow
- all max-widths respect viewport
- long route paths and tech strings wrap safely
- code/mono text does not overflow
- buttons wrap neatly
- images scale correctly
- tables transform into cards

Add defensive CSS:

html, body {
  max-width: 100%;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

img, svg, video {
  max-width: 100%;
  height: auto;
}

B. Mobile navigation
Improve the mobile nav drawer:
- Hamburger should be visible and easy to tap.
- Tap target should be at least 44x44px.
- Drawer should cover the full width or slide down cleanly.
- Links should be large and separated.
- Include: Projects, Experience, Resume, Profile.
- Include Notes only if there is room, otherwise put Notes in footer.
- Include GitHub, LinkedIn, Email in drawer footer.
- Theme toggle may remain in drawer or nav.
- Command palette button should be hidden on mobile unless it works perfectly.

Mobile nav requirements:
- opening hamburger sets aria-expanded=true
- closing sets aria-expanded=false
- tapping outside closes drawer
- pressing Escape closes drawer
- clicking a nav link closes drawer
- drawer must not trap scroll weirdly
- page behind drawer should not accidentally scroll if drawer is fullscreen

C. Homepage mobile layout
The homepage should appear in this order on mobile:
1. identity/name
2. short role line
3. two or three proof lines max
4. primary buttons
5. 5-second scan
6. Signal Routes as stacked cards
7. Featured Projects as stacked records
8. footer links

Hero:
- Photo should either be 56–64px or removed on very small screens.
- Name should fit without awkward wrapping.
- Do not use huge desktop typography on mobile.
- Buttons should wrap into a 2-column grid or full-width stack.
- Resume button should be first and most visually prominent.

Suggested mobile hero CSS:
.identity {
  padding-top: clamp(2rem, 8vw, 4rem);
}

.identity-name {
  font-size: clamp(2.25rem, 13vw, 4rem);
  line-height: 0.95;
}

.identity-role,
.identity-proof p {
  font-size: 0.95rem;
  line-height: 1.55;
}

.btn-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

@media (min-width: 390px) {
  .btn-group {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

D. 5-second scan mobile
The scan card should not feel like a wall of pills.
Limit visible scan items to 5 core signals:
- UC Berkeley EECS Honors · GPA 3.973
- Incoming Databricks SWE Intern
- Amazon SDE Intern
- C++ · Go · Rust · Python
- Distributed Systems · Networking · Infra

On mobile:
- use one column
- each item should wrap naturally
- do not use tiny text

E. Signal Routes mobile
Desktop route table must become mobile route cards.

Instead of columns:
route | type | signal | tech | arrow

Mobile card should show:
- route path
- badge
- signal
- tech
- arrow/link affordance

Example visual structure:

/experience/databricks       incoming
Traffic Platform SWE Intern
Go · Rust · Networking        →

Implementation:
Use CSS grid/flex media query. Do not require changing HTML if possible.

Example:
@media (max-width: 767px) {
  .routes-head {
    display: none;
  }

  .route-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.35rem 0.75rem;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
    background: var(--surface);
  }

  .route-path {
    grid-column: 1 / -1;
    overflow-wrap: anywhere;
  }

  .route-signal {
    grid-column: 1 / -1;
    font-size: 0.95rem;
  }

  .route-tech {
    grid-column: 1 / 2;
    font-size: 0.82rem;
    overflow-wrap: anywhere;
  }

  .route-arrow {
    grid-column: 2 / 3;
    align-self: end;
  }
}

Route preview panel:
- Hide on mobile, or move below the route list.
- Do not rely on hover on mobile.
- If kept, update on tap/focus only.

F. Projects page mobile
The project index/detail layout must not stay side-by-side on phones.

On mobile:
- Project index should become a horizontal scrollable tab row OR a compact select-like list at the top.
- Detail panel should appear below.
- Active project must be obvious.
- Sticky sidebar should be disabled.
- Project brief should stack vertically.
- Long metrics should wrap.

Recommended:
@media (max-width: 767px) {
  .work-layout {
    display: block;
  }

  .work-sidebar {
    position: static;
    width: 100%;
    border-right: 0;
    border-bottom: 1px solid var(--border);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }

  .work-sidebar nav {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    scroll-snap-type: x mandatory;
  }

  .proj-nav-item {
    flex: 0 0 auto;
    min-width: 180px;
    scroll-snap-align: start;
  }

  .work-detail {
    width: 100%;
  }

  .project-brief {
    grid-template-columns: 1fr;
  }

  .proj-metrics,
  .proj-stack-chips,
  .proj-links {
    display: flex;
    flex-wrap: wrap;
  }
}

G. Experience page mobile
Ledger entries should become stacked cards.

Desktop can be:
left org/date, right role/description

Mobile:
org
date
role
description
tech

Make sure long Amazon description does not become a wall. Consider reducing mobile description with CSS or adding shorter text.

H. Resume page mobile
Resume page should be readable on phone:
- No PDF iframe as the only option.
- HTML resume should be readable.
- Download PDF button at top.
- Contact links should wrap.
- Resume rows should stack.
- Dates should not float awkwardly.

I. Notes page mobile
Notes should be readable:
- Filter buttons should horizontally scroll.
- Details summary should wrap cleanly.
- Long code snippets should scroll horizontally only within code block, not page.
- Note title should not overlap tag/date.

J. Touch and accessibility
Ensure:
- minimum tap target 44px
- focus-visible states
- sufficient contrast
- no hover-only essential interactions
- drawer and command palette have proper aria
- reduced motion support

Add:
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}

K. Final mobile acceptance criteria
Test visually at:
- 320x568
- 360x740
- 375x667
- 390x844
- 414x896
- 430x932
- 768x1024

For each viewport verify:
- no horizontal scroll
- nav opens/closes correctly
- all links are tappable
- Resume is easy to find
- route cards are readable
- project page works
- experience page works
- resume page works
- profile page works
- notes page works
- light/dark toggle works
- command palette either works or is hidden
- footer is reachable and clean

Make the changes directly in the codebase. Do not just describe them.
You are a senior responsive design engineer. Optimize the website specifically for tablet and hybrid devices: iPad, iPad Pro, Android tablets, Surface tablets, and small laptop windows.

Primary goal:
The site should not look like an awkward halfway point between mobile and desktop.

Target widths:
- 768px
- 820px
- 834px
- 1024px
- 1112px
- 1180px

Rules:
1. Do not use cramped desktop tables at 768px.
2. Do not use overly simplified phone cards at 1024px if there is room.
3. Use intermediate layouts.

Specific requirements:
- Navigation can use desktop nav at >= 900px, mobile drawer below 900px.
- Signal Routes can be stacked cards below 900px and table layout above 900px.
- Route preview panel should appear only at >= 1100px.
- Projects page sidebar can become horizontal tabs below 1024px.
- Experience ledger can use two columns at >= 900px and stacked cards below.
- Resume contact links should wrap cleanly.
- Notes filters should be horizontally scrollable below 900px.

Breakpoints:
@media (max-width: 899px) {
  use mobile/tablet nav drawer
  route rows as cards
  project nav as horizontal tabs
}

@media (min-width: 900px) and (max-width: 1099px) {
  use desktop nav
  route table but no sticky preview
  project layout may be two-column only if sidebar has at least 240px
}

@media (min-width: 1100px) {
  use full desktop layout with route preview
}

Test orientations:
- iPad portrait
- iPad landscape
- Surface landscape
- Android tablet portrait

Acceptance criteria:
- no horizontal scrolling
- no cramped nav
- no route table text collisions
- no sticky sidebar covering content
- all tap targets remain at least 44px on touch devices
- hover-only features have tap/focus equivalents
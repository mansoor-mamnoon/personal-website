You are a senior desktop web UX engineer. Optimize this personal portfolio website for desktop viewers across Mac, Windows, Linux, external monitors, laptops, and browser zoom levels.

Primary goal:
The website should feel like a premium personal engineering portfolio on desktop: memorable, sharp, recruiter-friendly, and not like a generic company/SaaS website.

Important context:
The site has:
- homepage with identity, 5-second scan, Signal Routes, Featured Projects
- projects page with two-column project index/detail layout
- experience page with ledger/timeline
- resume page
- profile page
- notes page
- command palette
- theme toggle
- light and dark themes

Desktop priorities:
1. Recruiters must immediately understand the candidate.
2. Wide-screen layout should use space elegantly, not stretch text too wide.
3. Navigation should be simple and stable.
4. Route table should feel like the signature interaction.
5. Project pages should be deeply readable.
6. Resume should be easy to download.
7. Keyboard interactions should work.
8. Hover states should feel intentional but not gimmicky.
9. No section should look like a generic SaaS card grid.
10. The site should look excellent at 100%, 125%, and 150% browser zoom.

A. Desktop layout widths
Use a comfortable max width.

Recommended:
.page {
  width: min(100% - 3rem, 1120px);
  margin-inline: auto;
}

For very wide screens:
@media (min-width: 1440px) {
  .page {
    width: min(100% - 6rem, 1180px);
  }
}

Do not let text lines exceed about 70–80 characters.

For prose:
.about-lead,
.note-body,
.identity-proof {
  max-width: 760px;
}

B. Navigation desktop
Final desktop nav should be:

MM | Projects | Experience | Resume | Profile

Rules:
- Rename Work to Projects everywhere.
- Notes should be footer-only unless user explicitly wants it in top nav.
- Resume must be visible.
- Command palette can remain as subtle ⌘K.
- Theme toggle can remain small.
- Active nav state should be obvious but not loud.

Nav should:
- stay sticky only if it does not consume too much vertical space
- use backdrop only if subtle
- not look like a corporate SaaS header
- align with page width

C. Homepage desktop
The homepage should use vertical hierarchy, not a giant centered SaaS hero.

Order:
1. identity section
2. 5-second scan
3. Signal Routes
4. Featured Projects
5. footer

Hero:
- Keep name large but not absurd.
- Do not include too many metrics in the hero.
- Use buttons as clear recruiter actions.
- Primary CTA: Resume
- Secondary CTA: Projects
- Other actions: GitHub, LinkedIn, Email

Recommended desktop button order:
[Resume] [Projects] [GitHub] [Email]

D. 5-second scan desktop
This should be compact and elegant, not a huge grid.

Use 5 items:
- UC Berkeley EECS Honors · GPA 3.973
- Incoming Databricks SWE Intern
- Amazon SDE Intern
- C++ · Go · Rust · Python
- Distributed Systems · Networking · Infrastructure

Desktop layout:
- 5-column if space allows
- 2-row grid if needed
- no more than 5 or 6 items

E. Signal Routes desktop
This is the signature desktop element.
Make it look excellent.

Requirements:
- column alignment should be crisp
- route paths should be monospaced
- rows should have clear hover/focus states
- preview panel should update on hover/focus
- clicking rows should navigate
- keyboard tabbing should work
- active/hover row should not shift layout

Suggested layout:
.routes-outer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.5rem;
  align-items: start;
}

.route-preview {
  position: sticky;
  top: 6rem;
}

If viewport is below 1024px, stack preview under routes or hide it.

F. Featured Projects desktop
Avoid generic equal-height SaaS cards.
Use record-style blocks.

Each project record:
- title
- one-line summary
- 2–4 metrics max
- stack line
- links

Do not repeat the same metrics from the scan/hero too many times.

G. Projects page desktop
The current two-column project index/detail concept is strong. Polish it.

Requirements:
- sidebar should be sticky
- active project obvious
- details should have strong top summary
- Problem/System/Proof brief should be visible without scrolling too much
- do not repeat Problem section if already included in brief
- project content max-width should be readable
- metrics wrap cleanly

Suggested:
.work-layout {
  width: min(100% - 3rem, 1220px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 2rem;
}

.work-sidebar {
  position: sticky;
  top: 5.5rem;
  align-self: start;
}

.work-detail {
  min-width: 0;
}

H. Experience page desktop
Make this page feel like a clean engineering ledger.

Keep:
- Databricks
- Amazon
- CS 61C
- Data 8
- Education
- meaningful awards only

Remove or demote:
- BLCK UNICRN
- Residential Assistant
- overly long coursework list
- duplicated honors text

Ledger entries:
- left column: org/date
- right column: role/description/tech
- keep descriptions concise
- Amazon can be 2–3 sentences max
- Databricks should be accurate as incoming/summer if not completed yet

I. Resume page desktop
Make it print-friendly and recruiter-friendly.

Requirements:
- Download PDF button visible at top and bottom
- HTML resume should fit cleanly
- No overly decorative UI
- Text should be readable
- Print CSS should hide nav/buttons and format resume cleanly

Add:
@media print {
  header,
  #scroll-progress,
  .cmd-overlay,
  .resume-actions,
  footer {
    display: none !important;
  }

  body {
    background: white !important;
    color: black !important;
  }

  .resume-page {
    border: 0 !important;
    box-shadow: none !important;
    width: 100% !important;
  }
}

J. Command palette desktop
The command palette should be a power-user feature.

Requirements:
- opens with Cmd+K or Ctrl+K
- closes with Escape
- arrow keys work
- Enter selects
- clicking outside closes
- search filters commands
- focus returns cleanly or at least does not break navigation
- visible command list should include Projects, Experience, Resume, Profile, GitHub, LinkedIn, Copy Email, Toggle Theme

Do not make command palette visually louder than the actual site.

K. Browser/OS testing
Test on:
- Chrome
- Safari
- Firefox
- Edge

Desktop OS visual differences mostly come from fonts and scrollbars. Use CSS that is robust across all.

Test viewports:
- 1024x768
- 1280x720
- 1366x768
- 1440x900
- 1512x982
- 1728x1117
- 1920x1080
- 2560x1440

Test browser zoom:
- 100%
- 125%
- 150%

Acceptance criteria:
- no horizontal overflow
- nav remains usable
- route table remains aligned
- preview panel does not overlap
- project sidebar remains usable
- text line lengths are readable
- buttons do not wrap awkwardly
- resume page is readable and printable
- light/dark themes both look polished
- keyboard navigation works

Make the changes directly in the codebase. Do not just describe them.
You are a navigation and interaction QA engineer. Focus only on navigation controls across all devices.

The site contains:
- top nav
- mobile hamburger drawer
- theme toggle
- command palette
- resume link
- project index controls
- note filters
- route rows
- footer links

Your job:
Make every navigation control work perfectly on desktop, tablet, and mobile.

Audit and fix:

1. Top nav
- Correct labels: Projects, Experience, Resume, Profile.
- Notes should be footer-only unless intentionally kept in nav.
- Active page state is correct on each page.
- Resume link goes to resume.html, not only PDF.
- PDF download remains available inside resume page.

2. Mobile drawer
- Opens and closes reliably.
- Closes on outside click.
- Closes on Escape.
- Closes after clicking a link.
- Does not cause horizontal scroll.
- Does not trap page in weird scroll state.
- Has large tap targets.
- Contains key links.

3. Theme toggle
- Works on all pages.
- Persists with localStorage.
- Applies before paint to avoid flash.
- Icon and aria-label update correctly.
- Light and dark theme variables are applied correctly.

4. Command palette
- Desktop: Cmd+K/Ctrl+K opens.
- Escape closes.
- Arrow keys navigate.
- Enter selects.
- Clicking item selects.
- Search filters.
- Does not open accidentally on mobile.
- If visible on mobile, it must be usable with touch and virtual keyboard.
- If not mobile-ready, hide it on mobile.

5. Project index
- Desktop: sidebar buttons switch panels.
- URL hashes open the right panel.
- Mobile/tablet: horizontal tabs or stacked controls work.
- Active state is visible.
- Buttons are keyboard accessible.

6. Notes filters
- Buttons filter notes.
- Active filter visible.
- Horizontal scrolling works on small screens.
- No overlap between note title/date/tag.

7. Route rows
- Click navigates.
- Keyboard focus visible.
- Hover preview on desktop.
- Tap/focus behavior on touch.
- No essential information hover-only on mobile.

8. Footer
- Include GitHub, LinkedIn, Email, Notes, Resume.
- Links are tappable.
- Footer does not look cluttered on mobile.

Final acceptance:
Create a checklist and fix every failed item.
Do not just report issues. Implement fixes.
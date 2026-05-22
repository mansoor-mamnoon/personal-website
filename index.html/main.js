// main.js — Mansoor Mamnoon Portfolio
// Shared across all pages

// ── Theme (apply before first paint) ────────────────────────────────────────
(function () {
  const stored = localStorage.getItem('theme');
  if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme Toggle ────────────────────────────────────────────────────────
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const updateIcon = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      themeBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      themeBtn.textContent = isLight ? '◑' : '◐';
    };
    updateIcon();
    themeBtn.addEventListener('click', () => {
      const root = document.documentElement;
      const isLight = root.getAttribute('data-theme') === 'light';
      root.setAttribute('data-theme', isLight ? 'dark' : 'light');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      updateIcon();
      showToast(isLight ? 'Dark mode' : 'Light mode');
    });
  }

  // ── Mobile Nav ──────────────────────────────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const drawer    = document.getElementById('nav-drawer');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.textContent = isOpen ? '✕' : '☰';
    });

    window.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
        drawer.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });
  }

  // ── Scroll Reveal (Intersection Observer) ──────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── Animated Counters ───────────────────────────────────────────────────
  function animateNumber(el, target, duration, format) {
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = format(current);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const fmt    = el.dataset.fmt || 'int';

      if (fmt === 'millions')  animateNumber(el, target, 1400, v => Math.round(v / 1e6).toLocaleString() + 'M');
      else if (fmt === 'float2') animateNumber(el, target, 900,  v => v.toFixed(2));
      else if (fmt === 'gpa')   animateNumber(el, target, 1200, v => v.toFixed(3));
      else                      animateNumber(el, target, 1000, v => Math.round(v).toLocaleString());

      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  // ── Work Page: Project Panel Switching ──────────────────────────────────
  const projNavItems = document.querySelectorAll('.proj-nav-item');
  const projPanels   = document.querySelectorAll('.proj-panel');

  if (projNavItems.length && projPanels.length) {
    function selectProject(id) {
      projNavItems.forEach(btn => btn.classList.toggle('active', btn.dataset.project === id));
      projPanels.forEach(panel => panel.classList.toggle('active', panel.id === id));
    }

    projNavItems.forEach(btn => {
      btn.addEventListener('click', () => selectProject(btn.dataset.project));
    });

    // Activate first by default
    const first = projNavItems[0];
    if (first) selectProject(first.dataset.project);

    // Handle URL hash on load (e.g., /projects.html#llmfirewall)
    const hash = window.location.hash.slice(1);
    if (hash) selectProject(hash);
  }

  // ── Notes Page: Filter ──────────────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const noteItems  = document.querySelectorAll('.note-item');

  if (filterBtns.length && noteItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.filter;
        noteItems.forEach(item => {
          const matches = cat === 'all' || item.dataset.category === cat;
          item.style.display = matches ? '' : 'none';
        });
      });
    });
  }

  // ── Command Palette ─────────────────────────────────────────────────────
  const overlay  = document.getElementById('cmd-overlay');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList  = document.getElementById('cmd-list');

  const COMMANDS = [
    { icon: '⌂', label: 'Home',            action: () => nav('index.html') },
    { icon: '◈', label: 'Projects',         action: () => nav('projects.html') },
    { icon: '◆', label: 'Experience',      action: () => nav('experience.html') },
    { icon: '≡', label: 'Notes',           action: () => nav('notes.html') },
    { icon: '◇', label: 'Profile',         action: () => nav('about.html') },
    { icon: '↓', label: 'Resume',          action: () => nav('resume.html') },
    { icon: '↓', label: 'Download PDF',    action: () => window.open('assets/Mansoor_Mamnoon_Resume.pdf', '_blank') },
    { icon: '✉', label: 'Email',           action: () => { window.location.href = 'mailto:mansoormmamnoon@berkeley.edu'; close_(); } },
    { icon: '⎋', label: 'GitHub',          action: () => window.open('https://github.com/mansoor-mamnoon', '_blank') },
    { icon: '⎋', label: 'LinkedIn',        action: () => window.open('https://linkedin.com/in/mansoormamnoon', '_blank') },
    { icon: '◑', label: 'Toggle Theme',    action: () => { document.getElementById('theme-toggle')?.click(); close_(); } },
  ];

  let filtered = [...COMMANDS];
  let selIdx   = -1;

  function nav(href) {
    close_();
    if (!document.startViewTransition) { window.location.href = href; return; }
    document.startViewTransition(() => { window.location.href = href; });
  }

  function render() {
    if (!cmdList) return;
    cmdList.innerHTML = filtered.map((cmd, i) => `
      <li class="cmd-item${i === selIdx ? ' selected' : ''}" data-i="${i}" role="option" aria-selected="${i === selIdx}">
        <span class="cmd-item-icon" aria-hidden="true">${cmd.icon}</span>
        ${cmd.label}
      </li>`).join('');

    cmdList.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        filtered[parseInt(item.dataset.i)].action();
        close_();
      });
    });
  }

  function open_() {
    if (!overlay) return;
    filtered = [...COMMANDS]; selIdx = -1;
    overlay.removeAttribute('hidden');
    cmdInput.value = '';
    cmdInput.focus();
    render();
  }

  function close_() {
    overlay?.setAttribute('hidden', '');
    selIdx = -1;
  }

  if (overlay) {
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); overlay.hasAttribute('hidden') ? open_() : close_(); }
      if (e.key === 'Escape') close_();
    });

    overlay.addEventListener('click', e => { if (e.target === overlay) close_(); });

    cmdInput?.addEventListener('input', () => {
      const q = cmdInput.value.toLowerCase();
      filtered = q ? COMMANDS.filter(c => c.label.toLowerCase().includes(q)) : [...COMMANDS];
      selIdx = -1;
      render();
    });

    cmdInput?.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); selIdx = Math.min(selIdx + 1, filtered.length - 1); render(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); selIdx = Math.max(selIdx - 1, 0); render(); }
      else if (e.key === 'Enter' && selIdx >= 0) { filtered[selIdx].action(); close_(); }
    });

    // Hint in nav (Cmd+K)
    const hint = document.getElementById('cmd-hint');
    if (hint) {
      hint.addEventListener('click', open_);
      hint.setAttribute('aria-label', 'Open command palette (Cmd+K)');
    }
  }

  // ── Route Preview Panel ─────────────────────────────────────────────────
  const routePreview = document.getElementById('route-preview');
  const previewName  = document.getElementById('preview-name');
  const previewDesc  = document.getElementById('preview-desc');
  const previewTech  = document.getElementById('preview-tech');

  if (routePreview && previewName && previewDesc && previewTech) {
    document.querySelectorAll('.route-row[data-preview-title]').forEach(row => {
      row.addEventListener('mouseenter', () => {
        previewName.textContent = row.dataset.previewTitle;
        previewDesc.textContent = row.dataset.previewDesc;
        previewDesc.style.color = '';
        previewTech.textContent = row.dataset.previewTech || '';
        routePreview.classList.add('visible');
      });
      row.addEventListener('mouseleave', () => {
        routePreview.classList.remove('visible');
      });
    });
  }

  // ── View Transitions for internal links ─────────────────────────────────
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('//')) return;
      if (!document.startViewTransition) return;
      e.preventDefault();
      document.startViewTransition(() => { window.location.href = href; });
    });
  });
});

// ── Toast (global) ───────────────────────────────────────────────────────────
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2400);
}

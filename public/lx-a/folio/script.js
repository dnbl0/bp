/* =========================================================
   My Lexus — Case Study · interactions
   No dependencies. Honours prefers-reduced-motion.
   ========================================================= */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,iframe,[tabindex]:not([tabindex="-1"])';
  const focusTrap = (container) => (e) => {
    if (e.key !== 'Tab') return;
    const f = $$(FOCUSABLE, container).filter(el => el.offsetParent !== null || el === document.activeElement);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  /* ---------- theme toggle ---------- */
  const root = $('#cs-root');
  const themeBtn = $('#theme-toggle');
  const MOON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
  const SUN = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';
  const applyTheme = (t) => {
    root.dataset.theme = t;
    if (themeBtn) {
      themeBtn.innerHTML = t === 'dark' ? SUN : MOON;
      const label = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeBtn.setAttribute('aria-label', label); themeBtn.title = label;
    }
  };
  let theme = 'light';
  try { theme = localStorage.getItem('lx-folio-theme') || 'light'; } catch {}
  applyTheme(theme);
  themeBtn?.addEventListener('click', () => {
    theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('lx-folio-theme', theme); } catch {}
  });

  /* ---------- scroll progress ---------- */
  const prog = $('#cs-progress');
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    if (prog) prog.style.width = (p * 100).toFixed(2) + '%';
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal ---------- */
  const reveals = $$('.cs-reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(e => e.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(e => { if (!e.classList.contains('is-in')) io.observe(e); });
  }

  /* ---------- TOC: click + scrollspy ---------- */
  const tocBtns = $$('#cs-toc button[data-target]');
  tocBtns.forEach(btn => btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.target);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }));
  if (tocBtns.length && 'IntersectionObserver' in window) {
    const byId = Object.fromEntries(tocBtns.map(b => [b.dataset.target, b]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          tocBtns.forEach(b => b.classList.remove('is-active'));
          byId[en.target.id]?.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- counters ---------- */
  const counters = $$('[data-count]');
  const animateCount = (el) => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const dur = 1400, t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  } else counters.forEach(animateCount);

  /* ---------- toast ---------- */
  const toast = $('#toast');
  let toastT;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('show'), 1600);
  };

  /* ---------- colour system (palette tables + browse) ---------- */
  const colorRoot = $('#lx-color');
  if (colorRoot) {
    const palette = $('#lx-palette'), browseBody = $('#lx-browse-body');
    const SEMG = { foreground: 'Foreground / text', elevation: 'Elevation & surface', canvas: 'Canvas', accent: 'Accent', utility: 'Utility · status', common: 'Common' };
    const COMPG = { surface: 'Surface', input: 'Input', form: 'Form', popover: 'Popover', autocomplete: 'Autocomplete' };
    const KEY_STEPS = ['100', '300', '500', '700', '900'];
    const POSITION = { 100: 'Light tint', 300: 'Mid tint', 500: 'Base', 700: 'Dark shade', 900: 'Deep shade' };
    const PALETTE = {
      deepblue: { label: 'Deep Blue', sub: 'Surfaces, canvas & depth', roles: { 100: 'Raised surface, hover fill', 300: 'Secondary surface, dividers', 500: 'Primary canvas & surface', 700: 'Deep canvas, footers', 900: 'Near-black headers, scrims' } },
      smoke: { label: 'Smoke', sub: 'Foreground & light surfaces', roles: { 100: 'Page bg (light) · strong text (dark)', 300: 'Raised surface (light theme)', 500: 'Primary foreground / body text', 700: 'Muted foreground', 900: 'Dim text, hairlines' } },
      inari: { label: 'Inari', sub: 'Primary accent — copper', roles: { 100: 'Accent wash, soft badge', 300: 'Hover accent', 500: 'Primary accent — CTAs, focus, links', 700: 'Pressed accent', 900: 'Accent text on light' } },
      ochre: { label: 'Ochre', sub: 'Error & alert', roles: { 100: 'Error wash / background', 300: 'Error hover', 500: 'Error / alert', 700: 'Error pressed', 900: 'Error text on light' } },
      clay: { label: 'Clay', sub: 'Warning & Encore tier', roles: { 100: 'Warning wash, tier badge', 300: 'Warning hover', 500: 'Warning · Encore tier', 700: 'Pressed', 900: 'Warning text on light' } },
    };
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const copy = (t) => { navigator.clipboard?.writeText(t).catch(() => {}); showToast(`Copied ${t}`); };
    const tierOf = (n) => n.startsWith('--ld-color-lexus-') ? 'primitive' : n.startsWith('--ld-s-color-') ? 'semantic'
      : n.startsWith('--ld-c-') ? 'component' : 'app';
    const display = (n) => n.startsWith('--ld-color-lexus-') ? n.replace('--ld-color-lexus-', '')
      : n.startsWith('--ld-s-color-') ? 'colour.' + n.replace('--ld-s-color-', '')
      : n.startsWith('--ld-c-') ? n.replace('--ld-c-', '').replace(/-color$/, '').replace(/-/g, '.')
      : n.replace(/^--/, '');
    const sep = (s) => esc(s).replace(/([.\-])/g, '<span class="lx-dot">$1</span>');
    const posOf = (label) => { if (/opacity/.test(label)) return 'Alpha'; const n = +label; return n <= 200 ? 'Light tint' : n <= 400 ? 'Mid tint' : n === 500 ? 'Base' : n <= 700 ? 'Dark shade' : 'Deep shade'; };

    // ---- cell + table helpers ----
    const hexCell = (v) => `<button class="lx-hex" data-copy="${v}">${(v || '').toUpperCase()}<span class="lx-hex__copy" aria-hidden="true">⎘</span></button>`;
    const rgbaCell = (v) => { const r = toRgba(v); return `<button class="lx-hex lx-hex--rgba" data-copy="${r}">${r}<span class="lx-hex__copy" aria-hidden="true">⎘</span></button>`; };
    const mapsPill = (name, color, cls = '') => `<button class="lx-maps${cls}" data-token="${name}" title="${name}"><span class="lx-maps__dot" style="background:${color}"></span>${sep(display(name))}</button>`;
    const ctable = (title, sub, cols, rows) => `<div class="lx-ctwrap"><div class="lx-cthead"><h4>${title}</h4>${sub ? `<span>${sub}</span>` : ''}</div>
      <div class="lx-ctscroll"><table class="lx-ctable"><thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div></div>`;
    const swCell = (color, sm) => `<td class="lx-cell-sw"><span class="lx-sw${sm ? ' lx-sw--sm' : ''}" style="background:${color}"></span></td>`;

    // palette table — five key steps per hue, with position + role
    const paletteHue = (hue, prim) => {
      const cfg = PALETTE[hue], steps = prim[hue] || [];
      const rows = KEY_STEPS.map(st => {
        const s = steps.find(x => x.label === st); if (!s) return '';
        return `<tr data-token="${s.name}">${swCell(s.dark)}<td><span class="lx-scale">${hue}-${st}</span></td><td>${hexCell(s.dark)}</td><td class="lx-pos">${POSITION[st]}</td><td class="lx-role">${cfg.roles[st] || ''}</td></tr>`;
      }).join('');
      return ctable(cfg.label, cfg.sub, ['Swatch', 'Scale', 'Hex', 'Position', 'Colour role'], rows);
    };
    // full-ramp table per hue (browse)
    const rampHue = (hue, prim) => {
      const cfg = PALETTE[hue] || { label: hue }, steps = prim[hue] || [];
      const rows = steps.map(s => `<tr data-token="${s.name}">${swCell(s.dark, true)}<td><span class="lx-scale">${display(s.name)}</span></td><td>${hexCell(s.dark)}</td><td class="lx-pos">${posOf(s.label)}</td></tr>`).join('');
      return ctable(cfg.label, null, ['Swatch', 'Scale', 'Hex', 'Position'], rows);
    };
    // semantic / component table — swatch · token · hex · rgba
    const tokenTable = (title, toks) => {
      const rows = toks.map(t => `<tr data-token="${t.name}">${swCell(t.dark, true)}<td><span class="lx-scale">${sep(display(t.name))}</span></td><td>${hexCell(t.dark)}</td><td>${rgbaCell(t.dark)}</td></tr>`).join('');
      return ctable(title, null, ['Swatch', 'Token', 'Hex', 'RGBA'], rows);
    };

    // ---- detail modal ----
    const cmodal = $('#cmodal'), cmTrap = focusTrap(cmodal);
    const tokenIndex = {};
    const indexTok = (t) => { tokenIndex[t.name] = { ...t, tier: tierOf(t.name) }; };
    const TIER_NAME = { primitive: 'Primitive token', semantic: 'Semantic token', component: 'Component token', app: 'Application alias' };
    const hexRe = /^#([0-9a-f]{6})$/i;
    const rgbParts = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
    const toRgb = (v) => hexRe.test(v) ? `rgb(${rgbParts(v).join(', ')})` : null;
    const hslToRgb = (v) => {
      const m = v.match(/hsl\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/i); if (!m) return null;
      let h = +m[1] / 360, s = +m[2] / 100, l = +m[3] / 100;
      const f = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
      let r, g, b; if (s === 0) { r = g = b = l; } else { const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q; r = f(p, q, h + 1 / 3); g = f(p, q, h); b = f(p, q, h - 1 / 3); }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };
    // any source value → rgba(r, g, b, a)
    const toRgba = (v) => {
      if (hexRe.test(v)) { const [r, g, b] = rgbParts(v); return `rgba(${r}, ${g}, ${b}, 1)`; }
      if (/^rgba\(/i.test(v)) return v;
      if (/^rgb\(/i.test(v)) return v.replace(/^rgb\(/i, 'rgba(').replace(/\)\s*$/, ', 1)');
      if (/^hsl/i.test(v)) { const rgb = hslToRgb(v); if (rgb) return `rgba(${rgb.join(', ')}, 1)`; }
      return v;
    };
    const toHsl = (v) => {
      if (!hexRe.test(v)) return null;
      let [r, g, b] = rgbParts(v).map(x => x / 255);
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0, s = 0, l = (mx + mn) / 2;
      if (d) { s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) : mx === g ? ((b - r) / d + 2) : ((r - g) / d + 4); h *= 60; }
      return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };
    const lum = (v) => { if (!hexRe.test(v)) return null; const a = rgbParts(v).map(x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); }); return .2126 * a[0] + .7152 * a[1] + .0722 * a[2]; };
    const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); if (L1 == null || L2 == null) return null; return (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05); };
    const cell = (label, val) => `<div class="cmodal__cell"><b>${label}</b><span>${esc(val)}</span></div>`;
    let cmLast = null;
    const openModal = (name) => {
      const t = tokenIndex[name]; if (!t) return;
      $('#cm-swatch').style.background = t.dark;
      $('#cm-tier').textContent = TIER_NAME[t.tier] || 'Token';
      $('#cm-name').innerHTML = sep(display(t.name));
      $('#cm-var').textContent = t.name;
      const cells = [cell(hexRe.test(t.dark) ? 'HEX' : 'Value', (t.dark || '').toUpperCase())];
      const rgb = toRgb(t.dark); if (rgb) cells.push(cell('RGB', rgb));
      const hsl = toHsl(t.dark); if (hsl) cells.push(cell('HSL', hsl));
      if (t.light) cells.push(cell('Light theme', t.light.toUpperCase()));
      const rW = ratio(t.dark, '#ffffff'), rC = ratio(t.dark, '#15171d');
      if (rW) cells.push(cell('Contrast on white', `${rW.toFixed(2)}:1`));
      if (rC) cells.push(cell('Contrast on canvas', `${rC.toFixed(2)}:1`));
      $('#cm-values').innerHTML = cells.join('');
      $('#cm-lineage').innerHTML = (t.lineage && t.lineage.length)
        ? `<p class="cmodal__sub">Token alias chain</p><div class="lx-chainrow">${mapsPill(t.name, t.dark)}${t.lineage.map(r => `<span class="lx-chain-arrow" aria-hidden="true">→</span>${mapsPill(r.name, t.dark)}`).join('')}</div>`
        : '';
      $$('.lx-maps', $('#cm-lineage')).forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); openModal(b.dataset.token); }));
      $('#cm-copy-var').onclick = () => copy(t.name);
      $('#cm-copy-val').onclick = () => copy(t.dark);
      if (!cmodal.classList.contains('open')) { cmLast = document.activeElement; document.addEventListener('keydown', cmTrap); }
      cmodal.classList.add('open'); cmodal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; $('#cmodal-close').focus();
    };
    const closeModal = () => {
      cmodal.classList.remove('open'); cmodal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = ''; cmLast?.focus(); document.removeEventListener('keydown', cmTrap);
    };
    $('#cmodal-close')?.addEventListener('click', closeModal);
    $$('[data-close]', cmodal).forEach(el => el.addEventListener('click', closeModal));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && cmodal.classList.contains('open')) closeModal(); });

    fetch('assets/tokens-color.json').then(r => r.json()).then((data) => {
      Object.values(data.primitive).flat().forEach(indexTok);
      Object.values(data.semanticDS).flat().forEach(indexTok);
      data.appAliases.forEach(indexTok);
      Object.values(data.component).flat().forEach(indexTok);
      const total = data.counts.primitive + data.counts.semanticDS + data.counts.app + data.counts.component;
      const cnt = $('#lx-color-count'); if (cnt) cnt.textContent = `${total} colour tokens in all.`;

      // Block 2 — palette
      palette.innerHTML = Object.keys(PALETTE).map(h => paletteHue(h, data.primitive)).join('');
      // Block 3 — browse
      browseBody.innerHTML =
        '<p class="lx-browse__h">Base tints — full ramps</p>' + Object.keys(PALETTE).map(h => rampHue(h, data.primitive)).join('') +
        '<p class="lx-browse__h">Semantic roles</p>' + Object.entries(data.semanticDS).map(([g, toks]) => tokenTable(SEMG[g] || g, toks)).join('') + tokenTable('Application aliases', data.appAliases) +
        '<p class="lx-browse__h">Component tokens</p>' + Object.entries(data.component).map(([g, toks]) => tokenTable(COMPG[g] || g, toks)).join('');

      // bind interactions across both blocks
      $$('.lx-ctable tbody tr', colorRoot).forEach(tr => tr.addEventListener('click', () => openModal(tr.dataset.token)));
      $$('.lx-hex', colorRoot).forEach(h => h.addEventListener('click', (e) => { e.stopPropagation(); copy(h.dataset.copy); }));
    }).catch(() => { palette.innerHTML = '<p class="cs-body cs-body--muted">Colour tokens unavailable.</p>'; });
  }

  /* ---------- type scale table ---------- */
  const typeWrap = $('#lx-type');
  if (typeWrap) {
    fetch('assets/tokens-type.json').then(r => r.json()).then((list) => {
      const cnt = $('#lx-type-count'); if (cnt) cnt.textContent = `${list.length} styles in all.`;
      const rows = list.map((t) => {
        const st = `font-family:Nobel,ui-sans-serif,system-ui,sans-serif;font-size:${t.size};font-weight:${t.weight};line-height:1.1;letter-spacing:${t.tracking};text-transform:${t.textCase}`;
        return `<tr><td><span class="lx-scale">typography.${t.style}</span></td>
          <td class="lx-tsample"><span style="${st}">Experience</span></td>
          <td class="lx-pos">${t.size}</td><td class="lx-pos">${t.weight}</td><td class="lx-pos">${t.lineHeight}</td><td class="lx-pos">${t.tracking}</td></tr>`;
      }).join('');
      typeWrap.innerHTML = `<div class="lx-ctwrap"><div class="lx-cthead"><h4>Nobel type scale</h4><span>${list.length} styles</span></div>
        <div class="lx-ctscroll"><table class="lx-ctable lx-ttable"><thead><tr><th>Style</th><th>Sample</th><th>Size</th><th>Weight</th><th>Line&nbsp;height</th><th>Tracking</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
    }).catch(() => { typeWrap.innerHTML = '<p class="cs-body cs-body--muted">Type scale unavailable.</p>'; });
  }

  /* ---------- LIGHTBOX ---------- */
  const lb = $('#lightbox'), lbMedia = $('#lightbox-media');
  const lbTrap = focusTrap(lb);
  let lastFocus = null;
  const openLightbox = (html) => {
    lbMedia.innerHTML = html;
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; lastFocus = document.activeElement; $('#lightbox-close').focus();
    document.addEventListener('keydown', lbTrap);
  };
  const closeLightbox = () => {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; setTimeout(() => { lbMedia.innerHTML = ''; }, 320); lastFocus?.focus();
    document.removeEventListener('keydown', lbTrap);
  };
  /* ---------- UI showcase (featured viewer) ---------- */
  const lxStage = $('.lx-stage'), lxImg = $('#lx-stage-img'), lxUrl = $('#lx-stage-url'),
        lxName = $('#lx-stage-name'), lxDesc = $('#lx-stage-desc'), lxMedia = $('#lx-stage-media');
  const lxThumbs = $$('.lx-thumb');
  lxThumbs.forEach(t => t.addEventListener('click', () => {
    if (t.classList.contains('is-active')) return;
    lxThumbs.forEach(x => { x.classList.remove('is-active'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('is-active'); t.setAttribute('aria-selected', 'true');
    const apply = () => { lxImg.src = t.dataset.src; lxUrl.textContent = t.dataset.url; lxName.textContent = t.dataset.name; lxDesc.textContent = t.dataset.desc; };
    if (reduced || !lxStage) { apply(); return; }
    lxStage.classList.add('is-swapping');
    setTimeout(() => { apply(); const done = () => lxStage.classList.remove('is-swapping'); lxImg.onload = done; if (lxImg.complete) done(); }, 170);
  }));
  lxMedia?.addEventListener('click', () => openLightbox(`<img src="${lxImg.src}" alt="">`));
  $$('.video-pop').forEach(el => {
    const src = el.dataset.video || el.querySelector('source')?.getAttribute('src');
    const poster = el.dataset.poster || el.getAttribute('poster') || '';
    if (!src) return;
    el.addEventListener('click', () => openLightbox(`<video src="${src}" poster="${poster}" controls autoplay loop playsinline muted></video>`));
  });
  $('#lightbox-close')?.addEventListener('click', closeLightbox);
  lb?.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb?.classList.contains('open')) closeLightbox(); });

  /* ---------- lazy-play device videos ---------- */
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(en => { const v = en.target; if (en.isIntersecting) { if (!reduced) v.play().catch(() => {}); } else v.pause(); });
    }, { threshold: 0.3 });
    $$('video.device__screen').forEach(v => vio.observe(v));
  }

  /* ---------- COMPONENT LAB (lazy Storybook embeds) ---------- */
  const labFrame = $('#lab-frame');
  const labHint = $('#lab-hint');
  const labPanel = $('#lab-panel');
  if (labFrame) {
    const base = labFrame.dataset.base;
    const tabs = $$('#lab-tabs button');
    let currentEmbed = null;
    const setLoading = (on) => {
      labPanel?.classList.toggle('is-loading', on);
      labPanel?.setAttribute('aria-busy', String(on));
    };
    const MIN_H = 200, MAX_H = 700;
    let ro = null, activeBtn = null;
    const measure = (doc) => {
      const sf = doc.querySelector('.sb-frame');
      if (sf) return Math.ceil(sf.getBoundingClientRect().height) + 16;
      return doc.body ? doc.body.scrollHeight : 0;
    };
    const setHeight = (h) => {
      if (Math.abs((parseInt(labFrame.style.height, 10) || 0) - h) > 2) labFrame.style.height = h + 'px';
    };
    const fitFrame = () => {
      if (activeBtn && activeBtn.dataset.h) { setHeight(+activeBtn.dataset.h); return; }
      let doc; try { doc = labFrame.contentDocument; } catch { return; }
      if (!doc) return;
      const m = measure(doc);
      if (m) setHeight(Math.max(MIN_H, Math.min(MAX_H, m)));
    };
    let loadTimer;
    const reveal = () => requestAnimationFrame(() => setLoading(false));
    labFrame.addEventListener('load', () => {
      if (!currentEmbed) return;
      clearTimeout(loadTimer);
      if (ro) { ro.disconnect(); ro = null; }
      if (activeBtn && activeBtn.dataset.h) { fitFrame(); reveal(); return; }
      let tries = 0;
      const whenReady = () => {
        let doc;
        try { doc = labFrame.contentDocument; } catch { reveal(); return; }
        const target = doc && doc.querySelector('.sb-frame');
        if (target) {
          fitFrame(); reveal();
          if ('ResizeObserver' in window) { ro = new ResizeObserver(() => fitFrame()); ro.observe(target); }
          doc.querySelectorAll('img').forEach((img) => { if (!img.complete) img.addEventListener('load', fitFrame, { once: true }); });
        } else if (tries++ < 20) { setTimeout(whenReady, 80); }
        else { fitFrame(); reveal(); }
      };
      whenReady();
    });
    const load = (btn) => {
      if (btn.dataset.embed === currentEmbed) return;
      currentEmbed = btn.dataset.embed;
      activeBtn = btn;
      labFrame.title = `${btn.textContent.trim()} — interactive component`;
      setHeight(btn.dataset.h ? +btn.dataset.h : MIN_H);
      setLoading(true);
      clearTimeout(loadTimer);
      loadTimer = setTimeout(() => setLoading(false), 6000);
      labFrame.src = `${base}?id=${btn.dataset.embed}&viewMode=story`;
      if (btn.dataset.hint) { labHint.innerHTML = btn.dataset.hint; labHint.hidden = false; }
      else labHint.hidden = true;
    };
    const select = (btn, focus = false) => {
      tabs.forEach(b => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
      });
      labPanel?.setAttribute('aria-labelledby', btn.id);
      if (focus) btn.focus();
      load(btn);
    };
    tabs.forEach((btn, i) => {
      btn.addEventListener('click', () => select(btn));
      btn.addEventListener('keydown', (e) => {
        const map = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(e.key in map)) return;
        e.preventDefault();
        select(tabs[(map[e.key] + tabs.length) % tabs.length], true);
      });
    });
    let loaded = false;
    const first = $('#lab-tabs button.is-active') || $('#lab-tabs button');
    if ('IntersectionObserver' in window) {
      const lio = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting && !loaded) { loaded = true; load(first); lio.disconnect(); } });
      }, { rootMargin: '200px' });
      lio.observe($('.lab'));
    } else load(first);
  }

  /* ---------- LIVE viewport toggle ---------- */
  const stage = $('#live-stage');
  if (stage) $$('.live__toggle button').forEach(btn => btn.addEventListener('click', () => {
    $$('.live__toggle button').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true'); stage.dataset.view = btn.dataset.view;
  }));
})();

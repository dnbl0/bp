/* =========================================================
   My Lexus — Case Study · interactions
   No dependencies. Honours prefers-reduced-motion.
   ========================================================= */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer:fine)').matches;
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- scroll progress + sticky nav ---------- */
  const fill = $('#scrollbar-fill');
  const topbar = $('#topbar');
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    fill.style.transform = `scaleX(${p})`;
    topbar.classList.toggle('is-stuck', h.scrollTop > 40);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- scrollspy (active nav link) ---------- */
  const spyLinks = $$('#topnav a[data-spy]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    const byId = Object.fromEntries(spyLinks.map(a => [a.dataset.spy, a]));
    const spyIO = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          spyLinks.forEach(a => a.classList.remove('active'));
          byId[en.target.id]?.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(id => { const el = document.getElementById(id); if (el) spyIO.observe(el); });
  }

  /* ---------- mobile menu ---------- */
  const burger = $('#burger');
  const menu = $('#mobilemenu');
  if (burger && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
  }

  /* ---------- scroll reveal (staggered) ---------- */
  const revealEls = $$('[data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(e => e.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(e => io.observe(e));
  }

  /* ---------- animated counters ---------- */
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
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('show'), 1600);
  };

  /* ---------- colour swatches ---------- */
  const palette = [
    ['Deep Blue 900', '#15171d'], ['Deep Blue 700', '#1b1d25'], ['Deep Blue 500', '#232632'], ['Deep Blue 300', '#2b2f3e'],
    ['Smoke 500', '#e8e6e0'], ['Smoke 100', '#fafaf9'], ['Inari 500', '#cc4c19'], ['Clay 400', '#e9b943'],
    ['Ochre 400', '#e94345'], ['Electric', '#2468ff'], ['Foreground', '#e8e6e0'], ['Muted', '#9b9ea6'],
  ];
  const swWrap = $('#swatches');
  if (swWrap) palette.forEach(([name, hex]) => {
    const b = document.createElement('button');
    b.className = 'swatch';
    b.innerHTML = `<div class="swatch__chip" style="background:${hex}"></div>
      <div class="swatch__meta"><div class="swatch__name">${name}</div><div class="swatch__hex">${hex}</div></div>`;
    b.addEventListener('click', () => { navigator.clipboard?.writeText(hex).catch(() => {}); showToast(`Copied ${hex}`); });
    swWrap.appendChild(b);
  });

  /* ---------- easing curve cards ---------- */
  const eases = [
    ['emphasized', 'cubic-bezier(.16,1,.3,1)'], ['decelerate', 'cubic-bezier(0,0,.2,1)'],
    ['standard', 'cubic-bezier(.2,.6,.2,1)'], ['sharp', 'cubic-bezier(.4,0,.6,1)'],
  ];
  const eWrap = $('#eases');
  if (eWrap) {
    eases.forEach(([name, fn]) => {
      const card = document.createElement('div');
      card.className = 'ease'; card.style.setProperty('--ease-fn', fn);
      card.innerHTML = `<div class="ease__name">${name}</div><div class="ease__val">${fn}</div>
        <div class="ease__track"><div class="ease__dot"></div></div>`;
      card.addEventListener('mouseenter', () => { card.classList.remove('run'); void card.offsetWidth; if (!reduced) card.classList.add('run'); });
      eWrap.appendChild(card);
    });
    if ('IntersectionObserver' in window && !reduced) {
      const eio = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { $$('.ease', eWrap).forEach((c, i) => setTimeout(() => c.classList.add('run'), i * 120)); eio.disconnect(); } });
      }, { threshold: 0.5 });
      eio.observe(eWrap);
    }
  }

  /* ---------- magnetic buttons ---------- */
  if (!reduced && finePointer) $$('.magnetic').forEach(el => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.32}px,${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });

  /* ---------- 3D tilt cards ---------- */
  if (!reduced && finePointer) $$('.tilt').forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-py * 7}deg) rotateY(${px * 7}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  /* ---------- ripple ---------- */
  $$('.ripple').forEach(btn => btn.addEventListener('pointerdown', (e) => {
    const r = btn.getBoundingClientRect();
    const span = document.createElement('span');
    span.className = 'r';
    span.style.left = (e.clientX - r.left) + 'px'; span.style.top = (e.clientY - r.top) + 'px';
    span.style.width = span.style.height = Math.max(r.width, r.height) / 4 + 'px';
    btn.appendChild(span); setTimeout(() => span.remove(), 650);
  }));

  /* ---------- switch ---------- */
  $$('.switch').forEach(sw => sw.addEventListener('click', () => sw.setAttribute('aria-checked', String(sw.getAttribute('aria-checked') !== 'true'))));

  /* ---------- LIGHTBOX ---------- */
  const lb = $('#lightbox'), lbMedia = $('#lightbox-media'), lbCap = $('#lightbox-cap');
  let lastFocus = null;
  const openLightbox = (html, cap) => {
    lbMedia.innerHTML = html; lbCap.textContent = cap || '';
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; lastFocus = document.activeElement; $('#lightbox-close').focus();
  };
  const closeLightbox = () => {
    lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; setTimeout(() => { lbMedia.innerHTML = ''; }, 360); lastFocus?.focus();
  };
  $$('.shot[data-full]').forEach(fig => fig.addEventListener('click', () => openLightbox(`<img src="${fig.dataset.full}" alt="">`, fig.dataset.cap)));
  $$('.video-pop').forEach(el => {
    const src = el.dataset.video || el.querySelector('source')?.getAttribute('src');
    const poster = el.dataset.poster || el.getAttribute('poster') || '', cap = el.dataset.cap || '';
    if (!src) return;
    if (el.tagName === 'VIDEO') {
      el.addEventListener('mouseenter', () => el.play().catch(() => {}));
      el.addEventListener('mouseleave', () => { if (!el.hasAttribute('autoplay')) el.pause(); });
    }
    el.addEventListener('click', () => openLightbox(`<video src="${src}" poster="${poster}" controls autoplay loop playsinline muted></video>`, cap));
  });
  $('#lightbox-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox(); });

  /* ---------- COMPONENT LAB (lazy Storybook embeds) ---------- */
  const labFrame = $('#lab-frame');
  const labHint = $('#lab-hint');
  if (labFrame) {
    const base = labFrame.dataset.base;
    const load = (btn) => {
      labFrame.src = `${base}?id=${btn.dataset.embed}&viewMode=story`;
      if (btn.dataset.hint) { labHint.textContent = btn.dataset.hint; labHint.hidden = false; }
      else labHint.hidden = true;
    };
    $$('#lab-tabs button').forEach(btn => btn.addEventListener('click', () => {
      $$('#lab-tabs button').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true');
      load(btn);
    }));
    // lazy-load the first tab when the lab scrolls into view
    let loaded = false;
    const first = $('#lab-tabs button.is-active') || $('#lab-tabs button');
    if ('IntersectionObserver' in window) {
      const lio = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting && !loaded) { loaded = true; load(first); lio.disconnect(); } });
      }, { rootMargin: '200px' });
      lio.observe($('.lab'));
    } else load(first);
  }

  /* ---------- SWIPER ---------- */
  const swiper = $('#swiper');
  if (swiper) {
    const track = $('#swiper-track'), slides = $$('.swiper__slide', track), dotsWrap = $('#swiper-dots');
    let index = 0, startX = 0, dx = 0, dragging = false, width = 0;
    slides.forEach((_, i) => { const d = document.createElement('button'); d.setAttribute('aria-label', `Slide ${i + 1}`); d.addEventListener('click', () => go(i)); dotsWrap.appendChild(d); });
    const dots = $$('button', dotsWrap);
    const render = () => { track.style.transform = `translateX(${-index * width + (dragging ? dx : 0)}px)`; dots.forEach((d, i) => d.classList.toggle('on', i === index)); };
    const go = (i) => { index = Math.max(0, Math.min(slides.length - 1, i)); render(); };
    const measure = () => { width = swiper.clientWidth; render(); };
    const down = (e) => { dragging = true; track.classList.add('dragging'); startX = (e.touches ? e.touches[0].clientX : e.clientX); dx = 0; };
    const move = (e) => { if (!dragging) return; dx = (e.touches ? e.touches[0].clientX : e.clientX) - startX; render(); };
    const up = () => { if (!dragging) return; dragging = false; track.classList.remove('dragging'); if (Math.abs(dx) > width * 0.18) go(index + (dx < 0 ? 1 : -1)); else render(); dx = 0; };
    track.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up);
    track.addEventListener('touchstart', down, { passive: true }); track.addEventListener('touchmove', move, { passive: true }); track.addEventListener('touchend', up);
    track.addEventListener('dragstart', e => e.preventDefault());
    swiper.setAttribute('tabindex', '0');
    swiper.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { go(index + 1); e.preventDefault(); } if (e.key === 'ArrowLeft') { go(index - 1); e.preventDefault(); } });
    addEventListener('resize', measure); measure();
  }

  /* ---------- LIVE viewport toggle ---------- */
  const stage = $('#live-stage');
  if (stage) $$('.live__toggle button').forEach(btn => btn.addEventListener('click', () => {
    $$('.live__toggle button').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-selected', 'true'); stage.dataset.view = btn.dataset.view;
  }));

  /* ---------- lazy-play device videos ---------- */
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(en => { const v = en.target; if (en.isIntersecting) { if (!reduced) v.play().catch(() => {}); } else v.pause(); });
    }, { threshold: 0.3 });
    $$('video.device__screen').forEach(v => vio.observe(v));
  }
})();

/* =====================================================================
   Theme engine — load in <head> (blocking) to avoid a flash of the
   wrong theme. Exposes window.Theme.
   Persisted in localStorage under "cs.theme".
   ===================================================================== */
(function () {
  var KEY = 'cs.theme';
  var DEFAULTS = {
    mode: 'light',           // light | dark | system
    accent: 'navy',          // preset key or 'custom'
    custom: '#072E77',       // used when accent === 'custom'
    density: 'comfortable',  // comfortable | compact
    radius: 'rounded',       // sharp | rounded | soft
    sidebar: 'surface'       // surface | brand
  };

  var ACCENTS = [
    { key: 'navy',     name: 'Classic Navy', light: '#072E77', dark: '#8AA9FF', hl: '#FF4A00' },
    { key: 'emerald',  name: 'Emerald',      light: '#047857', dark: '#34D399', hl: '#D97706' },
    { key: 'violet',   name: 'Violet',       light: '#5B21B6', dark: '#B49BFF', hl: '#DB2777' },
    { key: 'teal',     name: 'Teal',         light: '#0F766E', dark: '#2DD4BF', hl: '#EA580C' },
    { key: 'crimson',  name: 'Crimson',      light: '#B42318', dark: '#FF8A80', hl: '#1D4ED8' },
    { key: 'amber',    name: 'Amber Gold',   light: '#9A5B05', dark: '#FBBF24', hl: '#0E7490' },
    { key: 'graphite', name: 'Graphite',     light: '#1F2937', dark: '#E5E7EB', hl: '#2563EB' }
  ];

  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function load() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
    var out = {};
    for (var k in DEFAULTS) out[k] = s[k] !== undefined ? s[k] : DEFAULTS[k];
    return out;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  function resolveMode(s) {
    if (s.mode === 'system') return mq && mq.matches ? 'dark' : 'light';
    return s.mode;
  }

  /* Lighten a hex colour for dark mode (custom accent only) */
  function lighten(hex, amt) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(r + (255 - r) * amt); g = Math.round(g + (255 - g) * amt); b = Math.round(b + (255 - b) * amt);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  var state = load();

  function apply(s, animate) {
    var root = document.documentElement;
    if (animate) {
      root.classList.add('theme-anim');
      clearTimeout(apply._t);
      apply._t = setTimeout(function () { root.classList.remove('theme-anim'); }, 320);
    }
    var mode = resolveMode(s);
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-accent', s.accent);
    root.setAttribute('data-density', s.density);
    root.setAttribute('data-radius', s.radius);
    root.setAttribute('data-sidebar', s.sidebar);
    if (s.accent === 'custom' && s.custom) {
      root.style.setProperty('--brand', s.custom);
      root.style.setProperty('--brand-dark', lighten(s.custom, 0.45));
    } else {
      root.style.removeProperty('--brand');
      root.style.removeProperty('--brand-dark');
    }
    var detail = {}; for (var k in s) detail[k] = s[k]; detail.resolved = mode;
    try { document.dispatchEvent(new CustomEvent('themechange', { detail: detail })); } catch (e) {}
  }

  apply(state, false);

  if (mq) {
    var onSys = function () { if (state.mode === 'system') apply(state, true); };
    if (mq.addEventListener) mq.addEventListener('change', onSys); else if (mq.addListener) mq.addListener(onSys);
  }

  /* Sync across open tabs */
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) { state = load(); apply(state, true); }
  });

  window.Theme = {
    accents: ACCENTS,
    defaults: DEFAULTS,
    get: function () { var o = {}; for (var k in state) o[k] = state[k]; o.resolved = resolveMode(state); return o; },
    set: function (patch) { for (var k in patch) state[k] = patch[k]; save(state); apply(state, true); },
    toggleMode: function () { this.set({ mode: resolveMode(state) === 'dark' ? 'light' : 'dark' }); },
    reset: function () { state = load(); for (var k in DEFAULTS) state[k] = DEFAULTS[k]; save(state); apply(state, true); }
  };
})();

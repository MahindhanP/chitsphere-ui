/* =====================================================================
   Theme engine v2 — load in <head> (blocking) to avoid a flash of the
   wrong theme. Exposes window.Theme.

   Model (persisted in localStorage under "cs.theme"):
     {
       v: 2,
       mode:   'light' | 'dark' | 'system'      (personal choice)
       preset: template key                     (see TEMPLATES)
       tier:   'template' | 'custom'
       values: { <option>: <value>, ... }       (user's changes on top of the template)
       colors: { light:{6}, dark:{6}, darkAuto:bool }   (custom tier only)
     }

   resolve(raw) = BASE  ←  template.defaults  ←  allowed user values
     · template tier: only QUICK keys are honoured
     · custom tier:   every option is honoured, plus custom colours

   Everything is written to <html> as data-* attributes + a few CSS
   variables, so components only need CSS (see theme.css / app.css).

   Preview mode: a page that sets <html data-theme-preview> never reads or
   writes storage; it is driven by postMessage({type:'cs-theme', raw, mode}).
   ===================================================================== */
(function () {
  var KEY = 'cs.theme';
  var root = document.documentElement;
  var PREVIEW = root.hasAttribute('data-theme-preview');

  /* ------------------------------------------------------------ Fonts */
  var FONTS = {
    inter:   { name: 'Inter',          stack: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', g: 'Inter:wght@300..800' },
    dmsans:  { name: 'DM Sans',        stack: '"DM Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', g: 'DM+Sans:opsz,wght@9..40,300..800' },
    manrope: { name: 'Manrope',        stack: '"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', g: 'Manrope:wght@300..800' },
    plex:    { name: 'IBM Plex Sans',  stack: '"IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', g: 'IBM+Plex+Sans:wght@300;400;500;600;700' },
    poppins: { name: 'Poppins',        stack: '"Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', g: 'Poppins:wght@300;400;500;600;700' }
  };

  /* ------------------------------------------------------------ Templates
     Each template ships a light AND a dark palette (6 colours each) and
     sensible defaults for the rest of the appearance. */
  function pal(primary, secondary, text, border, surface, bg) {
    return { primary: primary, secondary: secondary, text: text, border: border, surface: surface, bg: bg };
  }
  var TEMPLATES = [
    { key: 'navy', name: 'Classic Navy', desc: 'Calm, trusted, banking blue',
      light: pal('#072E77', '#FF4A00', '#0F172A', '#E3E8EF', '#FFFFFF', '#F4F6FA'),
      dark:  pal('#8AA9FF', '#FF7A3D', '#E7ECF4', '#233046', '#111827', '#0A0F1C'),
      defaults: { sidebar: 'neutral', radius: 'rounded', font: 'inter' } },
    { key: 'emerald', name: 'Emerald Ledger', desc: 'Fresh green with warm gold',
      light: pal('#047857', '#D97706', '#0C1A14', '#DFE8E3', '#FFFFFF', '#F2F7F4'),
      dark:  pal('#34D399', '#FBBF24', '#E4F1EA', '#1E3329', '#0E1A15', '#07120E'),
      defaults: { sidebar: 'neutral', radius: 'soft', font: 'dmsans' } },
    { key: 'violet', name: 'Royal Violet', desc: 'Premium violet, pink accents',
      light: pal('#5B21B6', '#DB2777', '#160F2A', '#E6E2F1', '#FFFFFF', '#F6F4FB'),
      dark:  pal('#B49BFF', '#F472B6', '#ECE9F6', '#2A2440', '#15121F', '#0D0B17'),
      defaults: { sidebar: 'brand', radius: 'soft', font: 'manrope' } },
    { key: 'teal', name: 'Teal Harbour', desc: 'Modern teal, orange calls-to-action',
      light: pal('#0F766E', '#EA580C', '#0B1A19', '#DCE8E7', '#FFFFFF', '#F1F7F6'),
      dark:  pal('#2DD4BF', '#FB923C', '#E2F1EF', '#1D3533', '#0D1C1B', '#061211'),
      defaults: { sidebar: 'neutral', radius: 'rounded', font: 'inter' } },
    { key: 'crimson', name: 'Crimson Trust', desc: 'Bold red with a blue counterpoint',
      light: pal('#B42318', '#1D4ED8', '#1C0F0E', '#ECE3E1', '#FFFFFF', '#FAF6F5'),
      dark:  pal('#FF8A80', '#7AA2FF', '#F3E9E8', '#3A2525', '#1D1212', '#140A0A'),
      defaults: { sidebar: 'brand', radius: 'sharp', font: 'plex' } },
    { key: 'amber', name: 'Amber Gold', desc: 'Warm gold, heritage feel',
      light: pal('#9A5B05', '#0E7490', '#1C160A', '#ECE5D6', '#FFFFFF', '#FAF7F0'),
      dark:  pal('#FBBF24', '#22D3EE', '#F2EDE2', '#3A3222', '#1C1810', '#12100A'),
      defaults: { sidebar: 'neutral', radius: 'rounded', font: 'poppins' } },
    { key: 'indigo', name: 'Indigo Sky', desc: 'Vibrant indigo with cyan',
      light: pal('#4338CA', '#0891B2', '#111129', '#E2E3F0', '#FFFFFF', '#F5F5FC'),
      dark:  pal('#A5B4FC', '#22D3EE', '#E8E9F8', '#272A48', '#12132A', '#0A0B1C'),
      defaults: { sidebar: 'brand', radius: 'rounded', font: 'manrope' } },
    { key: 'graphite', name: 'Graphite', desc: 'Minimal monochrome, blue links',
      light: pal('#1F2937', '#2563EB', '#111111', '#E7E5E4', '#FFFFFF', '#F5F5F4'),
      dark:  pal('#E5E7EB', '#60A5FA', '#EDEDED', '#2A2A2C', '#161617', '#0C0C0D'),
      defaults: { sidebar: 'neutral', radius: 'sharp', font: 'inter' } }
  ];
  var TPL = {}; TEMPLATES.forEach(function (t) { TPL[t.key] = t; });

  /* ------------------------------------------------------------ Options
     The single source of truth for every appearance choice. The studio
     builds its UI from this list. `quick: true` = available in Template mode. */
  var OPTIONS = {
    sidebar:  { label: 'Side bar',        values: ['neutral', 'brand', 'custom'], names: ['Neutral', 'Brand', 'Custom'], quick: true },
    radius:   { label: 'Borders',         values: ['sharp', 'rounded', 'soft'], names: ['Sharp', 'Round', 'Soft'], quick: true },
    font:     { label: 'Font style',      values: Object.keys(FONTS), names: Object.keys(FONTS).map(function (k) { return FONTS[k].name; }), quick: true },
    weight:   { label: 'Font weight',     values: ['light', 'regular', 'bold'], names: ['Light', 'Regular', 'Bold'] },
    motion:   { label: 'Animation & motion', values: ['simple', 'moderate', 'high'], names: ['Simple', 'Moderate', 'High'] },
    density:  { label: 'Density',         values: ['comfortable', 'compact'], names: ['Comfortable', 'Compact'] },
    nav:      { label: 'Navigation type', values: ['sidebar', 'topbar'], names: ['Sidebar', 'Top bar'] },
    tabs:     { label: 'Tabs',            values: ['top', 'side'], names: ['Top', 'Side'] },
    list:     { label: 'List screens',    values: ['cards', 'table'], names: ['Cards', 'Table list'] },
    details:  { label: 'Details screen',  values: ['drawer', 'full'], names: ['Right drawer', 'Full screen'] },
    popup:    { label: 'Popups',          values: ['center', 'bottom'], names: ['Center', 'Bottom drawer'] },
    loader:   { label: 'Page loader',     values: ['skeleton', 'logo', 'both'], names: ['Skeleton', 'Logo', 'Both'] },
    progress: { label: 'Progress bar',    values: ['line', 'thick', 'segmented', 'striped'], names: ['Line', 'Thick', 'Segmented', 'Striped'] },
    label:    { label: 'Labels',          values: ['soft', 'solid', 'outline', 'dot'], names: ['Soft', 'Solid', 'Outline', 'Dot'] },
    count:    { label: 'Count cards',     values: ['minimal', 'icon', 'accent', 'filled'], names: ['Minimal', 'Icon', 'Accent bar', 'Tinted'] },
    graph:    { label: 'Graphs',          values: ['bars', 'rounded', 'line', 'area'], names: ['Bars', 'Rounded bars', 'Line', 'Area'] }
  };
  var QUICK = Object.keys(OPTIONS).filter(function (k) { return OPTIONS[k].quick; });

  var BASE = {
    sidebar: 'neutral', sidebarColor: '#0B1B3F', radius: 'rounded', font: 'inter', weight: 'regular',
    motion: 'moderate', density: 'comfortable', nav: 'sidebar', tabs: 'top', list: 'cards',
    details: 'drawer', popup: 'center', loader: 'skeleton', progress: 'line', label: 'soft',
    count: 'icon', graph: 'bars'
  };
  var COLOR_KEYS = ['primary', 'secondary', 'text', 'border', 'surface', 'bg'];

  /* ------------------------------------------------------------ Colour utils */
  function hex6(h) {
    h = String(h || '').trim().replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    return /^[0-9a-f]{6}$/i.test(h) ? '#' + h.toUpperCase() : null;
  }
  function rgb(h) { h = hex6(h) || '#000000'; var n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; }
  function toHex(c) { return '#' + c.map(function (v) { v = Math.max(0, Math.min(255, Math.round(v))); return (v < 16 ? '0' : '') + v.toString(16); }).join('').toUpperCase(); }
  /* mix(a, b, t): t = share of b */
  function mix(a, b, t) { var x = rgb(a), y = rgb(b); return toHex([0, 1, 2].map(function (i) { return x[i] + (y[i] - x[i]) * t; })); }
  function lum(h) {
    return rgb(h).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); })
      .reduce(function (s, v, i) { return s + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function onColor(bg) { return contrast(bg, '#FFFFFF') >= contrast(bg, '#0A0F1C') ? '#FFFFFF' : '#0A0F1C'; }
  function towards(c, target, against, min) {
    var out = c, i = 0;
    while (contrast(out, against) < min && i++ < 20) out = mix(out, target, 0.12);
    return out;
  }
  /* Dark palette generated from a light one (custom tier, "auto" dark) */
  function deriveDark(l) {
    var bg = mix('#090D16', l.primary, 0.06), surface = mix('#111723', l.primary, 0.07);
    return {
      primary: towards(mix(l.primary, '#FFFFFF', 0.42), '#FFFFFF', surface, 4.5),
      secondary: towards(mix(l.secondary, '#FFFFFF', 0.22), '#FFFFFF', surface, 3),
      text: mix('#EEF2F8', l.primary, 0.04),
      border: mix('#242E42', l.primary, 0.1),
      surface: surface,
      bg: bg
    };
  }

  /* ------------------------------------------------------------ State */
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var mqMotion = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function fresh() { return { v: 2, mode: 'light', preset: 'navy', tier: 'template', values: {}, colors: null }; }

  function normalise(s) {
    var out = fresh();
    if (!s || typeof s !== 'object') return out;
    if (s.v === 2) {
      out.mode = s.mode || out.mode;
      out.preset = TPL[s.preset] ? s.preset : 'navy';
      out.tier = s.tier === 'custom' ? 'custom' : 'template';
      out.values = s.values && typeof s.values === 'object' ? s.values : {};
      out.colors = s.colors || null;
      return out;
    }
    /* migrate v1 { mode, accent, custom, density, radius, sidebar } */
    if (s.mode) out.mode = s.mode;
    if (s.accent && TPL[s.accent]) out.preset = s.accent;
    if (s.radius) out.values.radius = s.radius;
    if (s.sidebar) out.values.sidebar = s.sidebar === 'surface' ? 'neutral' : s.sidebar;
    if (s.density && s.density !== 'comfortable') { out.tier = 'custom'; out.values.density = s.density; }
    if (s.accent === 'custom' && hex6(s.custom)) {
      out.tier = 'custom';
      var l = clone(TPL.navy.light); l.primary = hex6(s.custom);
      out.colors = { light: l, dark: deriveDark(l), darkAuto: true };
    }
    return out;
  }
  function load() {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
    return normalise(s);
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  function resolveMode(mode) {
    if (mode === 'system') return mq && mq.matches ? 'dark' : 'light';
    return mode === 'dark' ? 'dark' : 'light';
  }

  function resolve(raw) {
    raw = normalise(raw);
    var tpl = TPL[raw.preset] || TPL.navy;
    var out = {}, k;
    for (k in BASE) out[k] = BASE[k];
    for (k in tpl.defaults) out[k] = tpl.defaults[k];
    var keys = raw.tier === 'custom' ? Object.keys(BASE) : QUICK;
    keys.forEach(function (key) {
      var v = raw.values[key];
      if (v === undefined) return;
      if (OPTIONS[key] && OPTIONS[key].values.indexOf(v) < 0) return;
      out[key] = v;
    });
    if (raw.tier === 'custom' && hex6(raw.values.sidebarColor)) out.sidebarColor = hex6(raw.values.sidebarColor);
    if (raw.tier !== 'custom' && out.sidebar === 'custom') out.sidebar = tpl.defaults.sidebar || 'neutral';

    var c = raw.tier === 'custom' && raw.colors && raw.colors.light ? raw.colors : null;
    var light = c ? c.light : tpl.light;
    out.palette = { light: light, dark: c ? (c.darkAuto !== false || !c.dark ? deriveDark(light) : c.dark) : tpl.dark };
    out.mode = raw.mode; out.preset = tpl.key; out.tier = raw.tier; out.template = tpl;
    return out;
  }

  /* ------------------------------------------------------------ Apply */
  function ensureFont(doc, key) {
    var f = FONTS[key]; if (!f || key === 'inter') return;
    var id = 'cs-font-' + key;
    if (doc.getElementById(id)) return;
    var l = doc.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + f.g + '&display=swap';
    (doc.head || doc.documentElement).appendChild(l);
  }

  function applyTo(doc, raw, opts) {
    opts = opts || {};
    var el = doc.documentElement;
    var r = resolve(raw);
    var mode = opts.mode ? resolveMode(opts.mode) : resolveMode(r.mode);
    if (opts.animate) {
      el.classList.add('theme-anim');
      clearTimeout(applyTo._t);
      applyTo._t = setTimeout(function () { el.classList.remove('theme-anim'); }, 320);
    }
    var p = r.palette[mode];
    var reduce = mqMotion && mqMotion.matches;

    el.setAttribute('data-theme', mode);
    el.setAttribute('data-accent', r.preset);
    el.setAttribute('data-tier', r.tier);
    el.setAttribute('data-sidebar', r.sidebar);
    el.setAttribute('data-sb-tone', r.sidebar === 'neutral' ? 'neutral' : r.sidebar === 'brand' ? 'dark' : (onColor(r.sidebarColor) === '#FFFFFF' ? 'dark' : 'light'));
    el.setAttribute('data-radius', r.radius);
    el.setAttribute('data-density', r.density);
    el.setAttribute('data-weight', r.weight);
    el.setAttribute('data-motion', reduce ? 'simple' : r.motion);
    el.setAttribute('data-nav', r.nav);
    el.setAttribute('data-tabpos', r.tabs);           /* not "data-tabs": that attribute marks tab groups */
    el.setAttribute('data-list', r.list);
    el.setAttribute('data-details', r.details);
    el.setAttribute('data-popup', r.popup);
    el.setAttribute('data-loader', r.loader);
    el.setAttribute('data-progress', r.progress);
    el.setAttribute('data-label', r.label);
    el.setAttribute('data-count', r.count);
    el.setAttribute('data-graph', r.graph);

    var st = el.style;
    st.setProperty('--brand', r.palette.light.primary);
    st.setProperty('--brand-dark', r.palette.dark.primary);
    st.setProperty('--primary', p.primary);
    st.setProperty('--on-primary', onColor(p.primary));
    st.setProperty('--highlight', p.secondary);
    st.setProperty('--on-highlight', onColor(p.secondary));
    st.setProperty('--text', p.text);
    st.setProperty('--border', p.border);
    st.setProperty('--surface', p.surface);
    st.setProperty('--bg', p.bg);
    st.setProperty('--sb-custom', r.sidebarColor);
    st.setProperty('--font', FONTS[r.font].stack);
    ensureFont(doc, r.font);

    if (!opts.silent) {
      var detail = flat(raw, r, mode);
      try { doc.dispatchEvent(new CustomEvent('themechange', { detail: detail })); } catch (e) {}
    }
    return r;
  }

  /* Flattened, backward-compatible view (v1 consumers read accent/custom/resolved) */
  function flat(raw, r, mode) {
    var o = {};
    for (var k in BASE) o[k] = r[k];
    o.mode = r.mode; o.resolved = mode; o.preset = r.preset; o.tier = r.tier; o.palette = r.palette;
    o.accent = r.tier === 'custom' ? 'custom' : r.preset;
    o.custom = r.palette.light.primary;
    return o;
  }

  var state = load();
  applyTo(document, state);

  if (mq) {
    var onSys = function () { if (state.mode === 'system') applyTo(document, state, { animate: true }); };
    if (mq.addEventListener) mq.addEventListener('change', onSys); else if (mq.addListener) mq.addListener(onSys);
  }
  if (mqMotion) {
    var onMotion = function () { applyTo(document, state, {}); };
    if (mqMotion.addEventListener) mqMotion.addEventListener('change', onMotion);
  }

  var previewMode = null;
  if (PREVIEW) {
    /* Driven by the Appearance studio through postMessage; never touches storage */
    window.addEventListener('message', function (e) {
      /* accept only the page that embeds this preview (origin may be "null" on file://) */
      if (e.source !== window.parent || !e.data || e.data.type !== 'cs-theme') return;
      state = normalise(e.data.raw);
      previewMode = e.data.mode || null;
      applyTo(document, state, { animate: !!e.data.animate, mode: previewMode || undefined });
    });
  } else {
    /* Sync across open tabs */
    window.addEventListener('storage', function (e) {
      if (e.key === KEY) { state = load(); applyTo(document, state, { animate: true }); }
    });
  }

  function commit(next) {
    state = normalise(next);
    if (!PREVIEW) save(state);
    applyTo(document, state, { animate: true, mode: previewMode || undefined });
  }

  window.Theme = {
    templates: TEMPLATES,
    template: function (k) { return TPL[k]; },
    fonts: FONTS,
    options: OPTIONS,
    quickKeys: QUICK,
    base: BASE,
    colorKeys: COLOR_KEYS,
    util: { hex6: hex6, mix: mix, contrast: contrast, onColor: onColor, deriveDark: deriveDark, lum: lum },
    /* v1-compatible list (swatches on other pages) */
    accents: TEMPLATES.map(function (t) { return { key: t.key, name: t.name, light: t.light.primary, dark: t.dark.primary, hl: t.light.secondary }; }),

    raw: function () { return clone(state); },
    resolve: resolve,
    normalise: normalise,
    applyTo: applyTo,
    save: function (raw) { commit(raw); },
    get: function () { return flat(state, resolve(state), previewMode ? resolveMode(previewMode) : resolveMode(state.mode)); },

    /* v1-compatible patch API: mode, accent, custom, and any option key */
    set: function (patch) {
      var s = clone(state);
      for (var k in patch) {
        var v = patch[k];
        if (k === 'mode') s.mode = v;
        else if (k === 'preset' || (k === 'accent' && TPL[v])) { s.preset = v; if (k === 'accent') s.tier = 'template'; }
        else if (k === 'accent' && v === 'custom') s.tier = 'custom';
        else if (k === 'custom' && hex6(v)) {
          var l = clone(resolve(s).palette.light); l.primary = hex6(v);
          s.colors = { light: l, dark: deriveDark(l), darkAuto: true }; s.tier = 'custom';
        }
        else if (k === 'tier') s.tier = v;
        else if (k === 'sidebar' && v === 'surface') s.values.sidebar = 'neutral';
        else s.values[k] = v;
      }
      commit(s);
    },
    toggleMode: function () { this.set({ mode: resolveMode(state.mode) === 'dark' ? 'light' : 'dark' }); },
    reset: function () { var m = state.mode; var s = fresh(); s.mode = m; commit(s); }
  };
})();

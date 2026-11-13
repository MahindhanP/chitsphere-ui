/* =====================================================================
   ChitSphere – shared app shell & UI helpers
   Every page: <body data-portal="platform|tenant" data-page="<nav id>">
               <main class="content"> ...page... </main>
   app.js wraps <main> with the sidebar + topbar and wires components.
   Icons:   <i data-i="name"></i>  → inline SVG
   Modals:  data-open="#id" / data-close   (works for .modal & .drawer)
   Tabs:    [data-tabs] > button[data-tab="x"]  +  [data-tab-panel="x"]
   Menus:   [data-menu="#id"] toggles .menu#id
   ===================================================================== */
(function () {
  'use strict';

  var ROOT = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/assets\/js\/app\.js.*$/, '') : '../';
  })();

  /* ------------------------------------------------------------ Icons */
  var P = {
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>',
    layers: '<path d="m12 2 10 5-10 5L2 7l10-5Z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8H8M16 12H8M13 16H8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    userCog: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="18" cy="18" r="3"/><path d="M18 13.5V15M18 21v1.5M22.5 18H21M15 18h-1.5"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    gavel: '<path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10"/><path d="m16 16 6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2Z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>',
    chevD: '<path d="m6 9 6 6 6-6"/>',
    chevUD: '<path d="m7 15 5 5 5-5M7 9l5-5 5 5"/>',
    arrowL: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    arrowR: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    plusCircle: '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54Z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    moreV: '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
    shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    trendUp: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
    trendDown: '<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
    bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7"/><path d="m12 2 8 5H4Z"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    play: '<path d="m6 3 14 9-14 9Z"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2M13 17v2M13 11v2"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    rupee: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>',
    percent: '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
    switch: '<path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',
    reset: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'
  };
  function icon(name, cls) {
    return '<svg class="i' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || P.info) + '</svg>';
  }
  function hydrateIcons(root) {
    (root || document).querySelectorAll('i[data-i]').forEach(function (el) {
      el.outerHTML = icon(el.getAttribute('data-i'), el.className);
    });
  }

  /* ------------------------------------------------------------ Format */
  var inrFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  var numFmt = new Intl.NumberFormat('en-IN');
  function inr(n) { return n == null || isNaN(n) ? '—' : inrFmt.format(n); }
  function num(n) { return n == null || isNaN(n) ? n : numFmt.format(n); }
  function inrShort(n) {
    if (n == null || isNaN(n)) return '—';
    if (n >= 1e7) return '₹' + (+(n / 1e7).toFixed(2)) + ' Cr';
    if (n >= 1e5) return '₹' + (+(n / 1e5).toFixed(2)) + ' L';
    if (n >= 1e3) return '₹' + (+(n / 1e3).toFixed(1)) + 'K';
    return '₹' + n;
  }
  function date(iso) {
    if (!iso || iso === '—') return '—';
    var d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  function initials(name) {
    return (name || '?').replace(/[^A-Za-z ]/g, '').split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }
  var STATUS = {
    'Active': 'success', 'Running': 'success', 'Paid': 'success', 'Verified': 'success', 'Prized': 'primary',
    'Trial': 'info', 'Enrolling': 'info', 'Invited': 'info', 'Pending': 'warning', 'Pending KYC': 'warning',
    'Past due': 'danger', 'Overdue': 'danger', 'Suspended': 'danger', 'Disabled': 'neutral',
    'Draft': 'neutral', 'Inactive': 'neutral', 'Closed': 'neutral', 'Void': 'neutral', 'Non-prized': 'outline',
    'FD Pending': 'warning', 'PSO Pending': 'warning', 'CC Pending': 'warning',
    'In review': 'warning', 'Building': 'info', 'Rejected': 'danger', 'Unpublished': 'neutral', 'Not started': 'neutral'
  };
  function badge(status, extra) {
    return '<span class="badge dot ' + (STATUS[status] || '') + (extra ? ' ' + extra : '') + '">' + status + '</span>';
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function param(k) { return new URLSearchParams(location.search).get(k); }
  function link(path) { return ROOT + path; }

  /* ------------------------------------------------------------ Nav config */
  var NAV = {
    platform: {
      brand: { mark: 'CS', name: 'ChitSphere', sub: 'Platform Console' },
      user: { name: 'Arjun Mehta', role: 'Super Admin' },
      items: [
        { section: 'Overview' },
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'platform/dashboard.html' },
        { section: 'Tenants' },
        { id: 'tenants', label: 'All tenants', icon: 'building', href: 'platform/tenants.html' },
        { id: 'registrations', label: 'Registration requests', icon: 'shieldCheck', href: 'platform/registrations.html', tag: '3' },
        { id: 'tenant-new', label: 'Onboard manually', icon: 'plusCircle', href: 'platform/tenant-new.html' },
        { section: 'Commercial' },
        { id: 'plans', label: 'Subscription plans', icon: 'layers', href: 'platform/plans.html' },
        { id: 'billing', label: 'Billing & invoices', icon: 'receipt', href: 'platform/billing.html' },
        { section: 'Member apps' },
        { id: 'apps', label: 'App builds & releases', icon: 'phone', href: 'platform/apps.html' },
        { section: 'System' },
        { id: 'audit', label: 'Audit logs', icon: 'activity', disabled: true, tag: 'Soon' },
        { id: 'psettings', label: 'Platform settings', icon: 'settings', disabled: true, tag: 'Soon' }
      ]
    },
    tenant: {
      brand: { mark: 'SV', name: 'Sri Venkata Chits', sub: 'Powered by ChitSphere' },
      user: { name: 'Ravi Kumar', role: 'Tenant Admin' },
      items: [
        { section: 'Overview' },
        { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'tenant/dashboard.html' },
        { section: 'Chit management' },
        { id: 'schemes', label: 'Chit schemes', icon: 'file', href: 'tenant/schemes.html' },
        { id: 'groups', label: 'Chit groups', icon: 'grid', href: 'tenant/groups.html' },
        { id: 'auctions', label: 'Auctions', icon: 'gavel', disabled: true, tag: 'Soon' },
        { id: 'subscribers', label: 'Subscribers', icon: 'users', disabled: true, tag: 'Soon' },
        { id: 'collections', label: 'Collections', icon: 'wallet', disabled: true, tag: 'Soon' },
        { section: 'Organisation' },
        { id: 'branches', label: 'Branches', icon: 'pin', href: 'tenant/branches.html' },
        { id: 'users', label: 'Users & roles', icon: 'userCog', href: 'tenant/users.html' },
        { id: 'mobile', label: 'Your member app', icon: 'phone', href: 'tenant/mobile-app.html' },
        { section: 'Account' },
        { id: 'subscription', label: 'Subscription', icon: 'card', href: 'tenant/subscription.html' },
        { id: 'branding', label: 'Branding', icon: 'palette', href: 'tenant/branding.html' },
        { id: 'appearance', label: 'Appearance', icon: 'sliders', href: 'tenant/appearance.html' }
      ]
    }
  };

  /* ------------------------------------------------------------ Shell */
  function buildShell() {
    var body = document.body;
    var portal = body.getAttribute('data-portal');
    var page = body.getAttribute('data-page');
    var main = document.querySelector('main.content');
    if (!portal || !main || !NAV[portal]) return;
    var cfg = NAV[portal];

    var shell = document.createElement('div');
    shell.className = 'shell';
    /* Desktop sidebar: an icon rail that slides out over the page on hover
       (default), or pinned open next to the content. */
    var pinned = false;
    try { pinned = localStorage.getItem('cs.sidebar.pin') === '1'; } catch (e) {}
    if (!pinned) shell.classList.add('collapsed');

    var nav = cfg.items.map(function (it) {
      if (it.section) return '<div class="sb-section">' + it.section + '</div>';
      var cls = 'sb-link' + (it.id === page ? ' active' : '') + (it.disabled ? ' disabled' : '');
      return '<a class="' + cls + '" href="' + (it.href ? link(it.href) : '#') + '" title="' + it.label + '"' + (it.id === page ? ' aria-current="page"' : '') + '>' +
        icon(it.icon) + '<span>' + it.label + '</span>' + (it.tag ? '<em class="tag">' + it.tag + '</em>' : '') + '</a>';
    }).join('');

    var foot = portal === 'tenant'
      ? '<div class="sb-plan"><div class="row between"><b>Growth plan</b><span class="xs">Renews 14 Jan</span></div>' +
        '<div class="meter"><div class="meter-row"><span>Groups</span><b>84 / 120</b></div><div class="meter-bar"><div class="meter-fill" style="width:70%"></div></div></div></div>'
      : '<div class="sb-plan"><b>v0.1 · UI prototype</b><div class="xs" style="opacity:.8">Mock data only</div></div>';

    var sidebar = '<aside class="sidebar" aria-label="Main navigation">' +
      '<div class="sb-brand"><div class="sb-logo">' + cfg.brand.mark + '</div><div class="sb-brand-text"><b>' + cfg.brand.name + '</b><span>' + cfg.brand.sub + '</span></div></div>' +
      '<nav class="sb-nav">' + nav + '</nav><div class="sb-foot">' + foot + '</div></aside><div class="sb-backdrop" data-sb-close></div>';

    var tenantBadge = portal === 'tenant'
      ? '<div class="dropdown desktop-only"><button class="tenant-switch" data-menu="#mTenant"><span class="avatar sq sm">SV</span>Sri Venkata Chits' + icon('chevD', 'sm') + '</button>' +
        '<div class="menu left" id="mTenant"><div class="menu-head"><div class="xs muted">Tenant</div><b>Sri Venkata Chits Pvt. Ltd.</b><div class="xs muted">T-1001 · svchits.chitsphere.in</div></div>' +
        '<a href="' + link('tenant/branches.html') + '">' + icon('pin') + 'All branches (7)</a><a href="' + link('tenant/subscription.html') + '">' + icon('card') + 'Subscription</a></div></div>'
      : '<span class="badge primary desktop-only">' + icon('shield', 'sm') + 'Platform</span>';

    var topbar = '<header class="topbar">' +
      '<button class="icon-btn mobile-only" data-sb-open aria-label="Open menu">' + icon('menu') + '</button>' +
      '<button class="icon-btn desktop-only" data-sb-toggle aria-label="' + (pinned ? 'Unpin sidebar' : 'Pin sidebar open') + '" title="' + (pinned ? 'Unpin sidebar (open on hover)' : 'Pin sidebar open') + '">' + icon('panel') + '</button>' +
      '<a class="tb-brand" href="' + link(portal + '/dashboard.html') + '"><span class="sb-logo">' + cfg.brand.mark + '</span><b>' + cfg.brand.name + '</b></a>' +
      tenantBadge +
      '<label class="search"><span class="sr-only">Search</span>' + icon('search', 'sm') + '<input class="input" placeholder="' + (portal === 'tenant' ? 'Search groups, schemes, subscribers…' : 'Search tenants, invoices…') + '"><kbd>/</kbd></label>' +
      '<div class="topbar-spacer"></div>' +
      '<div class="topbar-actions">' +
        '<button class="icon-btn" data-theme-toggle aria-label="Toggle dark mode" title="Toggle light / dark"></button>' +
        '<button class="icon-btn" data-open="#themePanel" aria-label="Theme settings" title="Theme settings">' + icon('palette') + '</button>' +
        '<button class="icon-btn" aria-label="Notifications" data-menu="#mNotif">' + icon('bell') + '<span class="dot"></span></button>' +
        '<div class="dropdown"><div class="menu" id="mNotif" style="width:320px">' +
          '<div class="menu-head row between"><b>Notifications</b><span class="badge hl">3 new</span></div>' +
          (portal === 'tenant'
            ? '<a href="#">' + icon('alert') + '<span>PSO for <b>SV-5L-F26</b> awaiting update</span></a><a href="#">' + icon('gavel') + '<span>Auction #24 for SV-5L-A24 on 5 Dec</span></a><a href="#">' + icon('users') + '<span>SV-25L-D26 is 68% enrolled</span></a>'
            : '<a href="#">' + icon('building') + '<span>Kaveri Chits awaiting KYC review</span></a><a href="#">' + icon('receipt') + '<span>INV-2026-1140 overdue (Shubham Chits)</span></a><a href="#">' + icon('clock') + '<span>Godavari trial ends in 14 days</span></a>') +
        '</div></div>' +
        '<div class="dropdown"><button class="user-chip" data-menu="#mUser"><span class="avatar sm">' + initials(cfg.user.name) + '</span><span class="meta"><b>' + cfg.user.name + '</b><span>' + cfg.user.role + '</span></span>' + icon('chevD', 'sm') + '</button>' +
        '<div class="menu" id="mUser"><div class="menu-head"><b>' + cfg.user.name + '</b><div class="xs muted">' + cfg.user.role + '</div></div>' +
          '<a href="#">' + icon('user') + 'My profile</a>' +
          '<button data-open="#themePanel">' + icon('palette') + 'Appearance</button>' +
          (portal === 'tenant'
            ? '<a href="' + link('platform/dashboard.html') + '">' + icon('switch') + 'Switch to Platform console</a>'
            : '<a href="' + link('tenant/dashboard.html') + '">' + icon('switch') + 'View as tenant (SV Chits)</a>') +
          '<div class="sep"></div><a class="danger" href="' + link(portal === 'tenant' ? 'login.html?org=svchits' : 'platform/login.html') + '">' + icon('logout') + 'Sign out</a>' +
        '</div></div>' +
      '</div></header>';

    var ws = document.createElement('div');
    ws.className = 'workspace';
    ws.innerHTML = topbar + buildTopnav(cfg, page);
    main.parentNode.insertBefore(shell, main);
    shell.innerHTML = sidebar;
    shell.appendChild(ws);
    ws.appendChild(main);

    shell.querySelector('[data-sb-toggle]').addEventListener('click', function () {
      var nowPinned = shell.classList.toggle('collapsed') === false;
      this.setAttribute('title', nowPinned ? 'Unpin sidebar (open on hover)' : 'Pin sidebar open');
      this.setAttribute('aria-label', nowPinned ? 'Unpin sidebar' : 'Pin sidebar open');
      this.classList.toggle('active', nowPinned);
      try { localStorage.setItem('cs.sidebar.pin', nowPinned ? '1' : '0'); } catch (e) {}
    });
    shell.querySelector('[data-sb-toggle]').classList.toggle('active', pinned);
    shell.querySelector('[data-sb-open]').addEventListener('click', function () { shell.classList.add('mobile-open'); });
    shell.querySelector('[data-sb-close]').addEventListener('click', function () { shell.classList.remove('mobile-open'); });

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        var s = document.querySelector('.topbar .search input'); if (s) { e.preventDefault(); s.focus(); }
      }
    });
  }

  /* Horizontal navigation, used when Appearance → Navigation = Top bar.
     Sections with one link become a plain link; others become a dropdown. */
  function buildTopnav(cfg, page) {
    var groups = [], cur = null;
    cfg.items.forEach(function (it) {
      if (it.section) { cur = { name: it.section, items: [] }; groups.push(cur); return; }
      if (!cur) { cur = { name: '', items: [] }; groups.push(cur); }
      cur.items.push(it);
    });
    return '<nav class="topnav" aria-label="Main navigation">' + groups.map(function (g, gi) {
      var active = g.items.some(function (it) { return it.id === page; });
      if (g.items.length === 1) {
        var it = g.items[0];
        return '<a class="tn-item' + (active ? ' active' : '') + '" href="' + (it.href ? link(it.href) : '#') + '">' + icon(it.icon) + it.label + '</a>';
      }
      return '<div class="dropdown"><button class="tn-item' + (active ? ' active' : '') + '" data-menu="#tn' + gi + '">' + icon(g.items[0].icon) + g.name + icon('chevD', 'sm') + '</button>' +
        '<div class="menu left" id="tn' + gi + '">' + g.items.map(function (it) {
          return '<a class="' + (it.id === page ? 'active' : '') + '" href="' + (it.href && !it.disabled ? link(it.href) : '#') + '"' + (it.disabled ? ' style="opacity:.5;pointer-events:none"' : '') + '>' + icon(it.icon) + it.label +
            (it.tag ? '<em class="badge outline" style="margin-left:auto;height:18px;font-size:10px">' + it.tag + '</em>' : '') + '</a>';
        }).join('') + '</div></div>';
    }).join('') + '</nav>';
  }

  /* ------------------------------------------------------------ Side tabs
     Every tab group that controls panels gets a mirrored vertical nav.
     CSS shows either the top tabs or the side nav (data-tabpos). */
  function enhanceTabs() {
    document.querySelectorAll('.tabs[data-tabs]').forEach(function (group) {
      if (group.classList.contains('has-side')) return;
      var keys = Array.prototype.map.call(group.querySelectorAll('[data-tab]'), function (b) { return b.getAttribute('data-tab'); });
      if (!keys.length) return;
      var panels = Array.prototype.filter.call(document.querySelectorAll('[data-tab-panel]'), function (p) {
        return keys.indexOf(p.getAttribute('data-tab-panel')) > -1 && !p.closest('.modal, .drawer');
      });
      if (!panels.length) return;
      var parent = panels[0].parentNode;
      panels = panels.filter(function (p) { return p.parentNode === parent; });
      var wrap = document.createElement('div'); wrap.className = 'tabs-side';
      var side = document.createElement('nav'); side.className = 'vtabs'; side.setAttribute('aria-label', 'Sections');
      var holder = document.createElement('div'); holder.className = 'ts-panels';
      parent.insertBefore(wrap, panels[0]);
      wrap.appendChild(side); wrap.appendChild(holder);
      panels.forEach(function (p) { holder.appendChild(p); });
      group.classList.add('has-side');
      function sync() {
        side.innerHTML = Array.prototype.map.call(group.querySelectorAll('[data-tab]'), function (b, i) {
          return '<button type="button" data-vi="' + i + '" class="' + (b.classList.contains('active') ? 'active' : '') + '">' + b.innerHTML + '</button>';
        }).join('');
      }
      side.addEventListener('click', function (e) {
        var b = e.target.closest('[data-vi]'); if (!b) return;
        var orig = group.querySelectorAll('[data-tab]')[+b.getAttribute('data-vi')];
        if (orig) orig.click();
      });
      sync();
      new MutationObserver(sync).observe(group, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class'] });
    });
  }

  /* ------------------------------------------------------------ Page loader */
  function pageLoader(ms) {
    var main = document.querySelector('main.content');
    if (!main || !window.Theme) return;
    var old = main.querySelector('.page-loader'); if (old) old.remove();
    var kind = Theme.get().loader;
    var cfg = NAV[document.body.getAttribute('data-portal')];
    var mark = cfg ? cfg.brand.mark : 'CS';
    var el = document.createElement('div');
    el.className = 'page-loader'; el.setAttribute('data-kind', kind); el.setAttribute('aria-busy', 'true'); el.setAttribute('aria-label', 'Loading');
    el.innerHTML = '<div class="sk-wrap">' +
      '<div class="sk" style="width:180px;height:14px"></div><div class="sk" style="width:280px;height:24px;margin-top:-12px"></div>' +
      '<div class="sk-row"><div class="sk sk-card"></div><div class="sk sk-card"></div><div class="sk sk-card"></div><div class="sk sk-card"></div></div>' +
      '<div class="sk-row"><div class="sk sk-block" style="flex:2"></div><div class="sk sk-block" style="flex:1"></div></div></div>' +
      '<div class="pl-logo"><div><div class="pl-mark">' + mark + '</div><span>Loading…</span></div></div>';
    main.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 300); }, ms || 650);
  }

  /* ------------------------------------------------------------ Theme panel (quick)
     The quick panel only offers Template-mode settings. Everything else
     lives in the Appearance studio (tenant/appearance.html). */
  function buildThemePanel() {
    if (!window.Theme) return;
    var wrap = document.createElement('div');
    var sw = Theme.templates.map(function (t) {
      return '<button class="swatch" data-preset="' + t.key + '" title="' + t.name + '"><span class="sw" style="background:' + t.light.primary + ';--_hl:' + t.light.secondary + ';--_hld:block"></span>' + t.name.split(' ')[0] + '</button>';
    }).join('');
    var fonts = Object.keys(Theme.fonts).map(function (k) { return '<option value="' + k + '">' + Theme.fonts[k].name + '</option>'; }).join('');
    var studio = link('tenant/appearance.html');

    wrap.innerHTML =
      '<div class="overlay" data-close></div>' +
      '<aside class="drawer drawer-fixed" id="themePanel" role="dialog" aria-label="Theme settings">' +
        '<div class="drawer-head"><div class="card-title-icon">' + icon('palette') + '</div><div><h3>Appearance</h3><div class="xs muted">Quick settings · applies instantly</div></div>' +
        '<button class="icon-btn ml-auto" data-close aria-label="Close">' + icon('x') + '</button></div>' +
        '<div class="drawer-body">' +
          '<div class="tp-group"><div class="label">Mode</div><div class="mode-cards">' +
            '<button class="mode-card mc-light" data-mode="light"><span class="mc-prev"><i></i><em></em></span><span class="mc-label">' + icon('sun') + 'Light</span></button>' +
            '<button class="mode-card mc-dark" data-mode="dark"><span class="mc-prev"><i></i><em></em></span><span class="mc-label">' + icon('moon') + 'Dark</span></button>' +
            '<button class="mode-card mc-system" data-mode="system"><span class="mc-prev"><i></i><em></em></span><span class="mc-label">' + icon('monitor') + 'System</span></button>' +
          '</div></div>' +
          '<div class="alert warning hidden" id="tpCustom">' + icon('sliders') + '<div><b>Custom theme active</b>Picking a template below switches back to Template mode. Your custom settings are kept in the studio.</div></div>' +
          '<div class="tp-group"><div class="label">Theme template <span id="accentName"></span></div><div class="swatches">' + sw + '</div></div>' +
          '<div class="tp-group"><div class="label">Side bar</div><div class="segmented block" data-opt="sidebar"><button data-v="neutral">Neutral</button><button data-v="brand">Brand colour</button></div></div>' +
          '<div class="tp-group"><div class="label">Borders</div><div class="segmented block" data-opt="radius"><button data-v="sharp">Sharp</button><button data-v="rounded">Round</button><button data-v="soft">Soft</button></div></div>' +
          '<div class="tp-group"><div class="label">Font style</div><select class="select" id="tpFont">' + fonts + '</select></div>' +
          '<a class="btn soft" style="width:100%" href="' + studio + '">' + icon('sliders') + 'Open Appearance studio — all options</a>' +
        '</div>' +
        '<div class="drawer-foot"><button class="btn ghost" id="themeReset">' + icon('reset') + 'Reset to default</button><button class="btn primary" data-close>Done</button></div>' +
      '</aside>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    var panel = document.getElementById('themePanel');
    panel.querySelectorAll('[data-mode]').forEach(function (b) {
      b.addEventListener('click', function () { Theme.set({ mode: b.getAttribute('data-mode') }); });
    });
    /* Choosing a template = Template mode with that template's own defaults */
    panel.querySelectorAll('.swatch[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () {
        var raw = Theme.raw();
        raw.preset = b.getAttribute('data-preset'); raw.tier = 'template';
        Theme.quickKeys.forEach(function (k) { delete raw.values[k]; });
        Theme.save(raw);
      });
    });
    panel.querySelectorAll('[data-opt]').forEach(function (seg) {
      var key = seg.getAttribute('data-opt');
      seg.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () { var p = {}; p[key] = b.getAttribute('data-v'); Theme.set(p); });
      });
    });
    document.getElementById('tpFont').addEventListener('change', function () { Theme.set({ font: this.value }); });
    document.getElementById('themeReset').addEventListener('click', function () { Theme.reset(); toast('Theme reset to default', 'success'); });

    syncThemeUI();
    document.addEventListener('themechange', syncThemeUI);
  }

  function syncThemeUI() {
    var s = Theme.get();
    document.querySelectorAll('[data-theme-toggle]').forEach(function (b) {
      b.innerHTML = icon(s.resolved === 'dark' ? 'sun' : 'moon');
    });
    var panel = document.getElementById('themePanel');
    if (!panel) return;
    var custom = s.tier === 'custom';
    panel.querySelectorAll('[data-mode]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-mode') === s.mode); });
    panel.querySelectorAll('.swatch[data-preset]').forEach(function (b) { b.classList.toggle('active', !custom && b.getAttribute('data-preset') === s.preset); });
    panel.querySelectorAll('[data-opt]').forEach(function (seg) {
      var key = seg.getAttribute('data-opt');
      seg.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-v') === s[key]); });
    });
    document.getElementById('tpFont').value = s.font;
    document.getElementById('tpCustom').classList.toggle('hidden', !custom);
    var nm = document.getElementById('accentName');
    if (nm) nm.textContent = custom ? 'Custom' : Theme.template(s.preset).name;
  }

  /* ------------------------------------------------------------ Layers (modal/drawer) */
  function openLayer(sel) {
    var el = typeof sel === 'string' ? document.querySelector(sel) : sel;
    if (!el) return;
    var ov = el.previousElementSibling && el.previousElementSibling.classList.contains('overlay') ? el.previousElementSibling : ensureOverlay(el);
    ov.classList.add('open'); el.classList.add('open');
    var f = el.querySelector('input, select, textarea, button:not([data-close])'); if (f) setTimeout(function () { f.focus(); }, 60);
  }
  function ensureOverlay(el) {
    var ov = document.createElement('div'); ov.className = 'overlay'; ov.setAttribute('data-close', '');
    el.parentNode.insertBefore(ov, el); return ov;
  }
  function closeLayers() {
    document.querySelectorAll('.modal.open, .drawer.open, .overlay.open').forEach(function (el) { el.classList.remove('open'); });
  }

  /* ------------------------------------------------------------ Toast */
  function toast(msg, type) {
    var host = document.querySelector('.toasts');
    if (!host) { host = document.createElement('div'); host.className = 'toasts'; host.setAttribute('aria-live', 'polite'); document.body.appendChild(host); }
    var t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.innerHTML = icon(type === 'success' ? 'checkCircle' : type === 'danger' || type === 'warning' ? 'alert' : 'info') + '<div>' + msg + '</div>';
    host.appendChild(t);
    setTimeout(function () { t.classList.add('out'); setTimeout(function () { t.remove(); }, 220); }, 3200);
  }

  /* ------------------------------------------------------------ Global delegation */
  function wire() {
    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-open]');
      if (o) { e.preventDefault(); closeMenus(); openLayer(o.getAttribute('data-open')); return; }
      if (e.target.closest('[data-close]')) { closeLayers(); return; }
      if (e.target.closest('[data-theme-toggle]')) { Theme.toggleMode(); return; }
      var m = e.target.closest('[data-menu]');
      if (m) {
        e.stopPropagation();
        var menu = document.querySelector(m.getAttribute('data-menu'));
        var was = menu && menu.classList.contains('open');
        closeMenus();
        if (menu && !was) {
          if (menu.closest('.table-wrap, .modal-body, .drawer-body')) {
            /* escape overflow clipping in scroll containers */
            var r = m.getBoundingClientRect();
            menu.style.position = 'fixed';
            menu.style.right = (window.innerWidth - r.right) + 'px';
            menu.style.left = 'auto';
            var below = window.innerHeight - r.bottom > 260;
            menu.style.top = below ? (r.bottom + 6) + 'px' : 'auto';
            menu.style.bottom = below ? 'auto' : (window.innerHeight - r.top + 6) + 'px';
          }
          menu.classList.add('open');
        }
        return;
      }
      if (!e.target.closest('.menu')) closeMenus();
      var tab = e.target.closest('[data-tabs] [data-tab]');
      if (tab) activateTab(tab);
      var seg = e.target.closest('.segmented[data-seg] button');
      if (seg) {
        seg.parentNode.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        seg.classList.add('active');
        seg.parentNode.dispatchEvent(new CustomEvent('change', { detail: seg.getAttribute('data-v') }));
      }
      var dz = e.target.closest('.dropzone');
      if (dz && e.target.tagName !== 'INPUT') { var inp = dz.querySelector('input[type=file]'); if (inp) inp.click(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeLayers(); closeMenus(); } });
    window.addEventListener('scroll', closeMenus, { passive: true });
    window.addEventListener('resize', closeMenus);
    document.addEventListener('change', function (e) {
      if (e.target.matches('.dropzone input[type=file]')) {
        var dz = e.target.closest('.dropzone'); var f = e.target.files[0];
        if (f) { dz.querySelector('b').textContent = f.name; dz.querySelector('span').textContent = Math.max(1, Math.round(f.size / 1024)) + ' KB · ready to upload'; }
      }
    });
    document.addEventListener('input', function (e) {
      var fld = e.target.closest('.field.invalid'); if (fld && e.target.value) fld.classList.remove('invalid');
    });
  }
  function closeMenus() { document.querySelectorAll('.menu.open').forEach(function (m) { m.classList.remove('open'); }); }
  function activateTab(btn) {
    var group = btn.closest('[data-tabs]');
    var scope = document.querySelector(group.getAttribute('data-tabs') || 'body') || document;
    var id = btn.getAttribute('data-tab');
    group.querySelectorAll('[data-tab]').forEach(function (b) { b.classList.toggle('active', b === btn); });
    scope.querySelectorAll(':scope [data-tab-panel]').forEach(function (p) {
      if (p.closest('[data-tabs-scope]') !== btn.closest('[data-tabs-scope]')) return;
      p.classList.toggle('active', p.getAttribute('data-tab-panel') === id);
    });
  }

  /* ------------------------------------------------------------ Validation */
  function validate(root) {
    var ok = true, first = null;
    root.querySelectorAll('[required]').forEach(function (inp) {
      if (inp.offsetParent === null && inp.type !== 'hidden') return; // skip hidden sections
      var fld = inp.closest('.field');
      var bad = !String(inp.value || '').trim();
      if (!bad && inp.min !== '' && inp.type === 'number' && +inp.value < +inp.min) bad = true;
      if (!bad && inp.max !== '' && inp.type === 'number' && +inp.value > +inp.max) bad = true;
      if (fld) fld.classList.toggle('invalid', bad);
      if (bad) { ok = false; if (!first) first = inp; }
    });
    if (first) { first.focus(); first.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
    return ok;
  }

  /* ------------------------------------------------------------ Data table */
  function table(opts) {
    var el = typeof opts.el === 'string' ? document.querySelector(opts.el) : opts.el;
    var st = { q: '', filters: {}, page: 1, sort: null, dir: 1 };
    var size = opts.pageSize || 8;

    el.innerHTML = '<div class="table-wrap"><table class="table"><thead><tr>' +
      opts.columns.map(function (c, i) {
        return '<th class="' + (c.num ? 'num ' : '') + (c.sort ? 'sortable' : '') + '" data-ci="' + i + '">' + c.label + (c.sort ? ' ' + icon('chevUD', 'sm') : '') + '</th>';
      }).join('') + '</tr></thead><tbody></tbody></table></div><div class="table-foot"><span class="tf-info"></span><div class="pager"></div></div>';
    var tbody = el.querySelector('tbody'), info = el.querySelector('.tf-info'), pager = el.querySelector('.pager');

    el.querySelectorAll('th.sortable').forEach(function (th) {
      th.addEventListener('click', function () {
        var c = opts.columns[+th.getAttribute('data-ci')];
        if (st.sort === c.key) st.dir = -st.dir; else { st.sort = c.key; st.dir = 1; }
        render();
      });
    });

    function rows() {
      var data = (typeof opts.rows === 'function' ? opts.rows() : opts.rows).filter(function (r) {
        if (st.q) {
          var hay = (opts.searchKeys || Object.keys(r)).map(function (k) { return r[k]; }).join(' ').toLowerCase();
          if (hay.indexOf(st.q) < 0) return false;
        }
        for (var k in st.filters) if (st.filters[k] && String(r[k]) !== st.filters[k]) return false;
        return true;
      });
      if (st.sort) data = data.slice().sort(function (a, b) { var x = a[st.sort], y = b[st.sort]; return (x > y ? 1 : x < y ? -1 : 0) * st.dir; });
      return data;
    }
    function render() {
      var data = rows(), total = data.length, pages = Math.max(1, Math.ceil(total / size));
      if (st.page > pages) st.page = pages;
      var slice = data.slice((st.page - 1) * size, st.page * size);
      tbody.innerHTML = slice.length ? slice.map(function (r) {
        return '<tr class="' + (opts.onRow ? 'clickable' : '') + '">' + opts.columns.map(function (c) {
          var v = c.render ? c.render(r) : esc(r[c.key]);
          return '<td class="' + (c.num ? 'num ' : '') + (c.cls || '') + '">' + v + '</td>';
        }).join('') + '</tr>';
      }).join('') : '<tr><td colspan="' + opts.columns.length + '"><div class="empty"><div class="e-ico">' + icon('search') + '</div><b>No matching records</b>Try a different search or clear filters.</div></td></tr>';
      if (opts.onRow) tbody.querySelectorAll('tr.clickable').forEach(function (tr, i) {
        tr.addEventListener('click', function (e) { if (!e.target.closest('button, a, input, .dropdown')) opts.onRow(slice[i], e); });
      });
      info.textContent = total ? 'Showing ' + ((st.page - 1) * size + 1) + '–' + Math.min(total, st.page * size) + ' of ' + total : '0 results';
      var h = '<button ' + (st.page === 1 ? 'disabled' : '') + ' data-p="' + (st.page - 1) + '" aria-label="Previous">' + icon('chevL') + '</button>';
      for (var p = 1; p <= pages; p++) h += '<button class="' + (p === st.page ? 'active' : '') + '" data-p="' + p + '">' + p + '</button>';
      h += '<button ' + (st.page === pages ? 'disabled' : '') + ' data-p="' + (st.page + 1) + '" aria-label="Next">' + icon('chevR') + '</button>';
      pager.innerHTML = h;
      pager.querySelectorAll('button[data-p]').forEach(function (b) { b.addEventListener('click', function () { st.page = +b.getAttribute('data-p'); render(); }); });
      if (opts.afterRender) opts.afterRender(el);
    }
    if (opts.search) {
      var si = document.querySelector(opts.search);
      si && si.addEventListener('input', function () { st.q = si.value.trim().toLowerCase(); st.page = 1; render(); });
    }
    (opts.filters || []).forEach(function (f) {
      var fe = document.querySelector(f.el);
      if (!fe) return;
      var handler = function (e) { st.filters[f.key] = (e && e.detail !== undefined && typeof e.detail === 'string') ? e.detail : fe.value; st.page = 1; render(); };
      fe.addEventListener('change', handler);
    });
    render();
    return { render: render, state: st };
  }

  /* ------------------------------------------------------------ Mini charts */
  /* Charts follow Appearance → Graphs: bars | rounded (CSS) | line | area (SVG).
     Every chart is remembered so it can be redrawn when the graph style changes. */
  var charts = [];
  function bars(el, data, opt) {
    el = typeof el === 'string' ? document.querySelector(el) : el;
    if (!el) return;
    opt = opt || {};
    var known = charts.some(function (c) { return c.el === el; });
    if (known) charts = charts.filter(function (c) { return c.el !== el; });
    charts.push({ el: el, data: data, opt: opt });
    var g = window.Theme ? Theme.get().graph : 'bars';
    el.setAttribute('data-graph-drawn', g);
    if (g === 'line' || g === 'area') return lineChart(el, data, opt, g === 'area');
    var max = Math.max.apply(null, data.map(function (d) { return (d.a || 0) + (d.b || 0); })) * 1.1 || 1;
    el.innerHTML = '<div class="bars">' + data.map(function (d) {
      var tip = opt.tip ? opt.tip(d) : d.label + ': ' + d.a;
      return '<div class="bar-col"><span class="tip">' + tip + '</span><div class="bar-stack" style="height:' + ((d.a + (d.b || 0)) / max * 100) + '%">' +
        '<div class="bar" style="height:' + (d.a / (d.a + (d.b || 0)) * 100) + '%"></div>' +
        (d.b ? '<div class="bar b2" style="height:' + (d.b / (d.a + d.b) * 100) + '%"></div>' : '') + '</div></div>';
    }).join('') + '</div><div class="bar-labels">' + data.map(function (d) { return '<span>' + d.label + '</span>'; }).join('') + '</div>';
  }
  function lineChart(el, data, opt, area) {
    var W = 600, H = 190, n = data.length;
    var hasB = data.some(function (d) { return d.b; });
    var max = Math.max.apply(null, data.map(function (d) { return Math.max(d.a || 0, hasB ? (d.a || 0) + (d.b || 0) : 0); })) * 1.12 || 1;
    function x(i) { return n < 2 ? W / 2 : (i + 0.5) / n * W; }
    function y(v) { return H - v / max * H; }
    function path(vals) { return vals.map(function (v, i) { return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1); }).join(' '); }
    var a = data.map(function (d) { return d.a || 0; });
    var t = data.map(function (d) { return (d.a || 0) + (d.b || 0); });
    var grid = [0.25, 0.5, 0.75].map(function (f) { return '<line class="grid-l" x1="0" x2="' + W + '" y1="' + (H * f) + '" y2="' + (H * f) + '" vector-effect="non-scaling-stroke"/>'; }).join('');
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" aria-hidden="true">' + grid +
      (area ? '<path class="ar" d="' + path(a) + ' L' + x(n - 1) + ' ' + H + ' L' + x(0) + ' ' + H + ' Z"/>' : '') +
      (hasB ? '<path class="ln b" d="' + path(t) + '" vector-effect="non-scaling-stroke"/>' : '') +
      '<path class="ln a" d="' + path(a) + '" vector-effect="non-scaling-stroke"/></svg>';
    var dots = data.map(function (d, i) {
      var tip = opt.tip ? opt.tip(d) : d.label + ': ' + d.a;
      var left = (x(i) / W * 100), top = (y(a[i]) / H * 100);
      return '<div class="pt-col" style="left:' + (i / n * 100) + '%;width:' + (100 / n) + '%"><span class="tip" style="top:calc(' + top + '% - 34px)">' + tip + '</span></div>' +
        '<span style="position:absolute;left:calc(' + left + '% - 5px);top:calc(' + top + '% - 5px);width:10px;height:10px;border-radius:50%;background:var(--surface);border:2px solid var(--chart-1);pointer-events:none"></span>';
    }).join('');
    el.innerHTML = '<div class="linechart">' + svg + '<div style="position:absolute;inset:10px 0 0 0">' + dots + '</div></div>' +
      '<div class="bar-labels">' + data.map(function (d) { return '<span>' + d.label + '</span>'; }).join('') + '</div>';
  }
  function redrawCharts() {
    var g = window.Theme ? Theme.get().graph : 'bars';
    charts.forEach(function (c) {
      if (!document.body.contains(c.el)) return;
      if (c.el.getAttribute('data-graph-drawn') !== g) bars(c.el, c.data, c.opt);
    });
  }
  function spark(el, values) {
    el = typeof el === 'string' ? document.querySelector(el) : el;
    var w = 200, h = 48, max = Math.max.apply(null, values), min = Math.min.apply(null, values), r = max - min || 1;
    var pts = values.map(function (v, i) { return [i / (values.length - 1) * w, h - 4 - (v - min) / r * (h - 8)]; });
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    el.innerHTML = '<svg class="spark" viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"><path class="area" d="' + d + ' L' + w + ' ' + h + ' L0 ' + h + ' Z"/><path class="line" d="' + d + '" vector-effect="non-scaling-stroke"/></svg>';
  }

  /* ------------------------------------------------------------ Boot */
  window.UI = {
    root: ROOT, link: link, icon: icon, hydrateIcons: hydrateIcons,
    inr: inr, inrShort: inrShort, num: num, date: date, initials: initials, badge: badge, esc: esc, param: param,
    toast: toast, open: openLayer, close: closeLayers, validate: validate, table: table, bars: bars, spark: spark,
    loader: pageLoader, enhanceTabs: enhanceTabs, nav: NAV,
    activateTab: activateTab
  };

  function boot() {
    buildShell();
    buildThemePanel();
    hydrateIcons();
    wire();
    document.querySelectorAll('[data-tabs] [data-tab].active').forEach(activateTab);
    if (document.body.getAttribute('data-portal')) pageLoader(document.documentElement.hasAttribute('data-theme-preview') ? 900 : 550);
    document.addEventListener('themechange', redrawCharts);
    document.dispatchEvent(new CustomEvent('app:ready'));
    enhanceTabs();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

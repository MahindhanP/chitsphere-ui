# ChitSphere — Tenant Management UI prototype

Static HTML/CSS/JS prototype for a multi-tenant chit fund SaaS. Mock data only, no backend.

## Run

```bash
python -m http.server 5173 --directory ui
```

Open http://localhost:5173. Any credentials work everywhere.

## Business model and the four front doors

Chit fund organisations **register themselves** on our site. After verification, each one gets:

1. **Its own admin web console** at `https://<slug>.chitsphere.in`, branded with its logo and colours. Staff sign in here.
2. **The member mobile app** for its subscribers. Every organisation gets **its own app** in Google Play and the App Store (its own name, icon, colours and package ID, e.g. `in.svchits.member`), built from one shared codebase. Members install their company's app and sign in with mobile + OTP, with no organisation code. ChitSphere publishes the apps under its developer accounts; Enterprise organisations can publish under their own accounts.

| Who | Entry point | Prototype file |
|---|---|---|
| Visitors / prospects | chitsphere.in | `index.html` (landing + pricing), `register.html` (self-registration) |
| Organisation staff | `<slug>.chitsphere.in` | `login.html?org=svchits`, then `tenant/*` |
| Members (subscribers) | That organisation's own Android / iOS app | `app/index.html?org=svchits` (one build per org) |
| ChitSphere staff | admin.chitsphere.in | `platform/login.html`, then `platform/*` |

Registration lifecycle: **submitted** → trial workspace available immediately → **platform verifies documents** (`platform/registrations.html`) → **approved**: group creation unlocks and ChitSphere builds and submits the organisation's app to the stores (3–7 days). A suspended or unverified organisation can't be reached from the member app.

## Structure

```
ui/
  index.html                 Public landing page (how it works, products, pricing, FAQ)
  register.html              Organisation self-registration (5 steps + OTP + address check)
  login.html                 Organisation admin sign-in; branded via ?org=<slug>, or "find your organisation"
  app/index.html             Member mobile app prototype: one org's build, chosen by `?org=` (12 screens)
  platform/                  Super-admin console (our company)
    login.html               Staff sign-in with 2FA step
    registrations.html       Review queue: checks, documents, approve / request changes / reject
    apps.html                Every org's app build: package IDs, store status, versions, rollouts
    dashboard.html           MRR, plan mix, tenants needing attention
    tenants.html             Tenant list, filters, suspend flow
    tenant-new.html          6-step onboarding wizard (company, KYC, admin, plan, branding, review)
    tenant-view.html         Tenant detail: usage vs limits, modules, invoices, KYC approval
    plans.html               Subscription plans + editor drawer + feature matrix
    billing.html             Invoices, reminders, manual invoice with GST
  tenant/                    Chit fund company workspace
    dashboard.html           KPIs, collections chart, upcoming auctions, groups in setup
    schemes.html             Scheme cards/table + detail drawer
    scheme-new.html          Create/edit scheme (?id=SCH-001) with live calculations
    groups.html              Groups by lifecycle phase
    group-new.html           8-stage group lifecycle (?id=GRP-2602 resumes, ?scheme=SCH-001 preselects)
    group-view.html          Running group: auctions, subscribers, compliance docs
    mobile-app.html          Your member app: store release status, store listing, member features, download links
    branches.html, users.html, subscription.html, branding.html
  assets/
    css/theme.css            Design tokens + all theme variants
    css/app.css              Components (only uses tokens)
    js/theme.js              Theme engine (load in <head>)
    js/app.js                Shell (sidebar/topbar), theme panel, table, modal, toast, validation helpers
    js/data.js               Mock data — swap for API calls
```

## Mapping to the reference project (`chit-admin-ui`)

| Reference | Prototype |
|---|---|
| `pages/create/scheme/new` fields: schemeName, chitValue, numberOfInstallment, subscriptionAmount, auctionType, collectionOption, minimumBid, maximumBid, companyCommission, companyTicket, enrollmentFees, minMemberForCC, penaltyNPS/PS/SF, chitIcon, createDate | `tenant/scheme-new.html`. Input ids match the reference field names. |
| `pages/create/group/new/groupInfo` stages GIS → FDA → FDU → PSOA → PSOU → ENRC → CCA → CCU (`substatus_master`) | `tenant/group-new.html` vertical stepper; codes are shown on each stage |
| GeneralInfo: schemeName, chitGroupBranches, auction start/end date/time, overDueType/overDueValue, minSubscriptionAmount, label, fixed bid | Stage 1 "General information" |

## Theming

The theme state is stored as attributes on `<html>`. `theme.js` sets them and saves them to `localStorage` (`cs.theme`):

| Attribute | Values |
|---|---|
| `data-theme` | `light`, `dark` (from mode `light`/`dark`/`system`) |
| `data-accent` | `navy` (the reference colours #072E77 / #FF4A00), `emerald`, `violet`, `teal`, `crimson`, `amber`, `graphite`, `custom` |
| `data-sidebar` | `surface`, `brand` |
| `data-density` | `comfortable`, `compact` |
| `data-radius` | `sharp`, `rounded`, `soft` |

- Change it from the palette icon in the top bar, or with the sun/moon quick toggle.
- In code: `Theme.set({ mode: 'dark', accent: 'teal' })`, `Theme.toggleMode()`, `Theme.reset()`. Listen for the `themechange` event.
- A tenant brand colour is just `Theme.set({ accent: 'custom', custom: '#hex' })`. The dark-mode variant is derived automatically.
- Components must use only the semantic tokens (`--primary`, `--surface`, `--text-2`, …), never raw hex. That rule is why every combination works.

## Conventions for the build phase

- Icons: `<i data-i="name"></i>` becomes inline SVG. The names are listed in `app.js` → `P`.
- Modals and drawers: `data-open="#id"` / `data-close`. Menus: `data-menu="#id"`. Tabs: `[data-tabs] [data-tab]` + `[data-tab-panel]`.
- `UI.table({...})`, `UI.validate(el)`, `UI.toast(msg, type)`, `UI.inr()` (formats in Indian lakh/crore style).

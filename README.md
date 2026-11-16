# ChitSphere — Tenant Management UI prototype

Static HTML/CSS/JS prototype for a multi-tenant chit fund SaaS. Mock data only, no backend.

## Run

```bash
python -m http.server 5173 --directory ui
```

Open http://localhost:5173. Any credentials work; `login.html` has a switch to try the error responses.

## What this prototype follows

Screens, fields, statuses and error codes follow the API contracts and backend in the `saas-platform` repository
(`contracts/`, `docs/`, `back-end/`). Every page names the endpoints it stands for in an HTML comment at the top,
and every dialog shows the call it would make. Mock data in `assets/js/data.js` uses the contract's field names and enum values.

There is no self-registration, member app, app-store builds, invoices or KYC review. The backend has no API for them.
Organisations are created by ChitSphere staff (`platform/tenant-new.html`), and the organisation's admin activates their account from an email link.

| Who | Prototype |
|---|---|
| Visitors | `index.html` (products from the catalog, active plans, contact) |
| Everyone who signs in | `login.html` (email + password, optional organisation code), `choose-tenant.html`, `forgot-password.html`, `reset-password.html` (`?token=`, `&mode=activate`), `account.html` |
| Organisation staff | `tenant/*` and `accounting/*`. Menu items outside the plan show "Not in plan" |
| ChitSphere staff | `platform/*` and `accounting/*?realm=platform` (ChitSphere's own books) |

**`screens.html`** is a review board of every screen: each card shows the live page with notes, its other states and its API.
Open it through the server above so the theme switch and dialog previews work.

## Structure

```
ui/
  index.html, login.html, choose-tenant.html, forgot-password.html, reset-password.html
  account.html               Profile, password, sessions (both portals; ?realm=platform for staff)
  platform/                  ChitSphere staff console
    dashboard.html           Tenants by status, subscriptions ending, provisioning problems
    tenants.html             Tenant list; suspend / reactivate / archive
    tenant-new.html          4-step create-tenant wizard + provisioning result
    tenant-view.html         Overview, subscription, entitlements, overrides, members, branches, provisioning, audit
    plans.html, plan-view.html  Plans with versions, limits and modules; drafts and publishing
    users.html               Platform staff and roles
    support.html             Time-limited support access to a tenant (elevations)
    audit.html               Platform audit log
  tenant/                    Organisation workspace
    dashboard.html, profile.html, subscription.html, audit.html, appearance.html
    members.html, roles.html, branches.html      Access: invitations, role templates, permissions, branches
    customers.html, schemes.html, scheme-new.html, groups.html, group-new.html, group-view.html   Chits
    employees.html, employee.html, attendance.html, leave.html, hrms-setup.html, hrms-reports.html, my-hr.html   HRMS
    leads.html, lead.html, follow-ups.html, pipeline.html   CRM
    payroll-runs.html, payroll-run.html, salaries.html      Payroll
  accounting/                Shared by both portals (data-portal="auto")
    vouchers.html, voucher.html   Journal entries, template postings, submit/approve/reject/return/recall/reverse
    approvals.html           Vouchers waiting at my approval level
    ledger.html              Chart of accounts, segments, parties and party accounts
    reports.html             Trial balance, P&L, balance sheet, day book, ledger, party statement, segments, cash position
    setup.html               Book settings, fiscal periods, approval policies
  assets/
    css/theme.css            Design tokens + all theme variants
    css/app.css              Components (only uses tokens)
    js/theme.js              Theme engine (load in <head>)
    js/app.js                Shell, navigation, table, dialogs, forms, toasts, validation
    js/data.js               Contract-shaped mock data: swap for API calls
```

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
- `UI.dialog({ title, fields, api, done, onOpen, onOk })` builds a modal or drawer from a field list; `UI.confirm(title, text, opts)` for yes/no actions.
- `UI.badge(ENUM_VALUE)` and `UI.human(ENUM_VALUE)` turn contract enum values into labels; `UI.options({ enum: 'LeadStatus' })` fills a select from `DB.ENUM`.
- The tenant theme maps the API's `UiTheme` to a theme template via `DB.THEME_TEMPLATE`.

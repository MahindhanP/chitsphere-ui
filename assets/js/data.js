/* =====================================================================
   Mock data for the prototype, shaped like the backend contracts in
   saas-platform/contracts/json-schemas (field names, enums, limits).
   Replace each collection with the API call named next to it.
   ===================================================================== */
window.DB = {};

/* ------------------------------------------------------------------ Enums (contracts/json-schemas/common/enums) */
DB.ENUM = {
  Role: ['PLATFORM_ADMIN', 'PLATFORM_SUPPORT', 'TENANT_OWNER', 'TENANT_ADMIN', 'TENANT_USER', 'USER'],
  TenantRole: ['TENANT_OWNER', 'TENANT_ADMIN', 'TENANT_USER'],
  PlatformRole: ['PLATFORM_ADMIN', 'PLATFORM_SUPPORT'],
  UserStatus: ['PENDING_ACTIVATION', 'ACTIVE', 'DISABLED'],
  MembershipStatus: ['ACTIVE', 'DISABLED'],
  BranchScope: ['TENANT', 'BRANCHES'],
  TenantStatus: ['PENDING', 'PROVISIONING', 'ACTIVE', 'SUSPENDED', 'ARCHIVING', 'ARCHIVED', 'RESTORING', 'CLOSING', 'CLOSED'],
  SubscriptionStatus: ['TRIALING', 'TRIAL_EXPIRED', 'ACTIVE', 'PAST_DUE', 'GRACE', 'SUSPENDED', 'CANCELED', 'ENDED'],
  UiTheme: ['CLASSIC', 'ROYAL', 'HERITAGE', 'OCEAN', 'SAFFRON'],
  PlanStatus: ['DRAFT', 'ACTIVE', 'ARCHIVED'],
  BillingCycle: ['MONTHLY', 'QUARTERLY', 'YEARLY'],
  OverrideKind: ['GRANT_MODULE', 'REVOKE_MODULE', 'SET_LIMIT'],
  CustomerStatus: ['ACTIVE', 'INACTIVE'],
  IdProofType: ['AADHAAR', 'PAN', 'VOTER_ID', 'PASSPORT', 'DRIVING_LICENCE'],
  AuctionFrequency: ['MONTHLY', 'BI_MONTHLY', 'WEEKLY', 'DAILY'],
  CollectionOption: ['BEFORE_AUCTION', 'AFTER_AUCTION'],
  ChitGroupStatus: ['FORMING', 'COMMENCED', 'CANCELLED'],
  SalesType: ['DIRECT', 'AGENT', 'REFERRAL'],
  NomineeRelationship: ['SPOUSE', 'SON', 'DAUGHTER', 'FATHER', 'MOTHER', 'BROTHER', 'SISTER', 'OTHER'],
  EmployeeStatus: ['ACTIVE', 'ON_NOTICE', 'EXITED'],
  EmploymentType: ['PERMANENT', 'CONTRACT', 'INTERN', 'CONSULTANT'],
  Gender: ['MALE', 'FEMALE', 'OTHER'],
  AttendanceStatus: ['PRESENT', 'ABSENT', 'HALF_DAY', 'ON_LEAVE', 'HOLIDAY'],
  LeaveStatus: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'],
  HalfDay: ['FIRST', 'SECOND'],
  HolidayKind: ['FIXED', 'OPTIONAL'],
  DocumentType: ['ID_PROOF', 'ADDRESS_PROOF', 'PHOTO', 'EDUCATION', 'EXPERIENCE', 'OFFER_LETTER', 'OTHER'],
  LeadSource: ['WALK_IN', 'REFERRAL', 'WEBSITE', 'CAMPAIGN', 'PHONE', 'OTHER'],
  LeadStatus: ['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST'],
  FollowUpChannel: ['CALL', 'VISIT', 'EMAIL', 'WHATSAPP', 'MEETING'],
  PayrollRunStatus: ['DRAFT', 'CALCULATED', 'APPROVED', 'DISBURSED', 'CANCELLED'],
  AccountType: ['ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE'],
  CoaTemplate: ['CHIT_FUND', 'GENERIC', 'PLATFORM'],
  CashSharePolicy: ['BLOCK', 'WARN'],
  SegmentKind: ['CHIT_GROUP', 'PROJECT', 'PRODUCT_LINE', 'WALLET'],
  PartyKind: ['INDIVIDUAL', 'ORGANISATION'],
  PartyRole: ['MEMBER', 'COMPANY', 'VENDOR', 'EMPLOYEE', 'CUSTOMER'],
  PartyAccountKind: ['TICKET', 'WALLET', 'VENDOR', 'EMPLOYEE', 'CUSTOMER'],
  TicketRole: ['FOREMAN', 'COMPANY', 'MEMBER'],
  VoucherType: ['JOURNAL', 'RECEIPT', 'PAYMENT', 'CONTRA', 'SALES', 'PURCHASE'],
  EntryStatus: ['DRAFT', 'SUBMITTED', 'POSTED', 'REJECTED', 'CANCELLED'],
  PaymentMode: ['CASH', 'BANK']
};

/* UiTheme (tenant appearance API) → prototype theme template (assets/js/theme.js) */
DB.THEME_TEMPLATE = { CLASSIC: 'teal', ROYAL: 'violet', HERITAGE: 'crimson', OCEAN: 'navy', SAFFRON: 'amber' };

/* ------------------------------------------------------------------ Capability catalog (contracts/catalog/products/*.json) */
DB.catalog = [
  { id: 'platform', label: 'Platform', always: true, modules: [
    { id: 'platform.tenant', label: 'Tenant settings', perms: ['platform.tenant.profile.read', 'platform.tenant.profile.update'] },
    { id: 'platform.membership', label: 'Members and access', perms: ['platform.membership.read', 'platform.membership.manage', 'platform.membership.branch.assign'] },
    { id: 'platform.branch', label: 'Branch management', perms: ['platform.branch.read', 'platform.branch.create', 'platform.branch.update', 'platform.branch.archive'] },
    { id: 'platform.role', label: 'Roles and permissions', perms: ['platform.role.manage'] },
    { id: 'platform.subscription', label: 'Subscription', perms: ['platform.subscription.read'] },
    { id: 'platform.audit', label: 'Audit trail', perms: ['platform.audit.read'] }],
    limits: [{ id: 'platform.user.max', label: 'Tenant users', unit: 'users' }, { id: 'platform.branch.max', label: 'Branches', unit: 'branches' }, { id: 'platform.role.max', label: 'Custom roles', unit: 'roles' }] },
  { id: 'customer', label: 'Customers', modules: [
    { id: 'customer.record', label: 'Customer records', perms: ['customer.record.read', 'customer.record.create', 'customer.record.update'] }],
    limits: [{ id: 'customer.record.max', label: 'Customers', unit: 'customers' }] },
  { id: 'chits', label: 'Chits Management', modules: [
    { id: 'chits.scheme', label: 'Chit schemes', perms: ['chits.scheme.read', 'chits.scheme.create', 'chits.scheme.update'] },
    { id: 'chits.group', label: 'Chit groups', perms: ['chits.group.read', 'chits.group.create', 'chits.group.update', 'chits.group.commence'] },
    { id: 'chits.enrolment', label: 'Enrolment', perms: ['chits.enrolment.read', 'chits.enrolment.create', 'chits.enrolment.cancel'] }],
    limits: [{ id: 'chits.scheme.max', label: 'Chit schemes', unit: 'schemes' }, { id: 'chits.group.max', label: 'Chit groups', unit: 'groups' }] },
  { id: 'hrms', label: 'HRMS', modules: [
    { id: 'hrms.employee', label: 'Employee management', perms: ['hrms.employee.read', 'hrms.employee.create', 'hrms.employee.update', 'hrms.employee.exit', 'hrms.employee.import'] },
    { id: 'hrms.org', label: 'Organisation', perms: ['hrms.org.read', 'hrms.org.manage'] },
    { id: 'hrms.calendar', label: 'Holidays and weekly offs', perms: ['hrms.calendar.manage'] },
    { id: 'hrms.attendance', label: 'Attendance and shifts', perms: ['hrms.attendance.read', 'hrms.attendance.record'] },
    { id: 'hrms.leave', label: 'Leave', perms: ['hrms.leave.read', 'hrms.leave.apply', 'hrms.leave.approve', 'hrms.leave.type.manage', 'hrms.leave.adjust'] },
    { id: 'hrms.selfservice', label: 'Employee self-service', perms: ['hrms.selfservice.use'] }],
    limits: [{ id: 'hrms.employee.max', label: 'Employees', unit: 'employees' }] },
  { id: 'crm', label: 'CRM', modules: [
    { id: 'crm.lead', label: 'Leads and assignments', perms: ['crm.lead.read', 'crm.lead.create', 'crm.lead.update', 'crm.lead.assign', 'crm.lead.export'] },
    { id: 'crm.followup', label: 'Follow-ups and tasks', perms: ['crm.followup.read', 'crm.followup.create'] },
    { id: 'crm.report', label: 'Sales reports', perms: ['crm.report.read'] }], limits: [] },
  { id: 'payroll', label: 'Payroll', modules: [
    { id: 'payroll.structure', label: 'Salary structures', perms: ['payroll.structure.read', 'payroll.structure.manage'] },
    { id: 'payroll.run', label: 'Payroll runs', perms: ['payroll.run.read', 'payroll.run.prepare', 'payroll.run.calculate', 'payroll.run.approve'] },
    { id: 'payroll.disbursement', label: 'Disbursement', perms: ['payroll.disbursement.execute'] },
    { id: 'payroll.payslip', label: 'Payslips', perms: ['payroll.payslip.read'] }], limits: [] },
  { id: 'accounting', label: 'Accounting', modules: [
    { id: 'accounting.ledger', label: 'Ledger setup', perms: ['accounting.ledger.read', 'accounting.ledger.manage', 'accounting.ledger.close'] },
    { id: 'accounting.voucher', label: 'Vouchers', perms: ['accounting.voucher.read', 'accounting.voucher.create', 'accounting.voucher.reverse'] },
    { id: 'accounting.approval', label: 'Approvals', perms: ['accounting.approval.level1', 'accounting.approval.level2', 'accounting.approval.level3', 'accounting.approval.policy'] },
    { id: 'accounting.report', label: 'Financial reports', perms: ['accounting.report.read'] }], limits: [] },
  { id: 'aichatbot', label: 'AI Chatbot', status: 'DISABLED', modules: [{ id: 'aichatbot.assistant', label: 'Assistant', perms: ['aichatbot.assistant.use'] }], limits: [] }
];
DB.sellableModules = function () { var o = []; DB.catalog.forEach(function (p) { if (p.always || p.status === 'DISABLED') return; p.modules.forEach(function (m) { o.push({ id: m.id, label: m.label, productId: p.id, productLabel: p.label }); }); }); return o; };
DB.limitDefs = function () { var o = []; DB.catalog.forEach(function (p) { (p.limits || []).forEach(function (l) { o.push(l); }); }); return o; };
DB.moduleLabel = function (id) { var r = id; DB.catalog.forEach(function (p) { p.modules.forEach(function (m) { if (m.id === id) r = p.label + ' · ' + m.label; }); }); return r; };
DB.limitLabel = function (id) { var r = id; DB.limitDefs().forEach(function (l) { if (l.id === id) r = l.label; }); return r; };

/* ------------------------------------------------------------------ PLATFORM side */

/* GET /api/platform/v1/admin/plans → plan-summary; plan-detail for one plan */
DB.plans = [
  { id: 'pl-starter', code: 'STARTER', name: 'Starter', description: 'Single-branch foremen getting started.', status: 'ACTIVE', publishedVersion: 2, hasDraft: false, price: 14999, currency: 'INR', billingCycle: 'MONTHLY', trialDays: 14, updatedAt: '2026-09-02T10:00:00Z', subscribers: 3,
    modules: ['customer.record', 'chits.scheme', 'chits.group', 'chits.enrolment'],
    limits: { 'platform.user.max': 5, 'platform.branch.max': 1, 'platform.role.max': 2, 'customer.record.max': 750, 'chits.scheme.max': 5, 'chits.group.max': 15, 'hrms.employee.max': 0 },
    versions: [{ number: 2, status: 'PUBLISHED', publishedAt: '2026-09-02T10:00:00Z' }, { number: 1, status: 'RETIRED', publishedAt: '2025-01-10T09:00:00Z' }] },
  { id: 'pl-growth', code: 'GROWTH', name: 'Growth', description: 'Multi-branch chit companies with CRM and HR.', status: 'ACTIVE', publishedVersion: 3, hasDraft: true, price: 39999, currency: 'INR', billingCycle: 'MONTHLY', trialDays: 14, updatedAt: '2026-11-10T08:30:00Z', subscribers: 4,
    modules: ['customer.record', 'chits.scheme', 'chits.group', 'chits.enrolment', 'crm.lead', 'crm.followup', 'crm.report', 'hrms.employee', 'hrms.org', 'hrms.calendar', 'hrms.attendance', 'hrms.leave', 'hrms.selfservice', 'accounting.ledger', 'accounting.voucher', 'accounting.approval', 'accounting.report'],
    limits: { 'platform.user.max': 40, 'platform.branch.max': 10, 'platform.role.max': 10, 'customer.record.max': 6000, 'chits.scheme.max': 25, 'chits.group.max': 120, 'hrms.employee.max': 150 },
    draft: { number: 4, price: 42999, note: 'Adds Payroll' },
    versions: [{ number: 4, status: 'DRAFT', publishedAt: null }, { number: 3, status: 'PUBLISHED', publishedAt: '2026-06-01T09:00:00Z' }, { number: 2, status: 'RETIRED', publishedAt: '2025-08-12T09:00:00Z' }, { number: 1, status: 'RETIRED', publishedAt: '2024-12-01T09:00:00Z' }] },
  { id: 'pl-enterprise', code: 'ENTERPRISE', name: 'Enterprise', description: 'Large networks: every product, no limits.', status: 'ACTIVE', publishedVersion: 1, hasDraft: false, price: 99999, currency: 'INR', billingCycle: 'MONTHLY', trialDays: 30, updatedAt: '2026-03-15T09:00:00Z', subscribers: 2,
    modules: 'ALL',
    limits: { 'platform.user.max': -1, 'platform.branch.max': -1, 'platform.role.max': -1, 'customer.record.max': -1, 'chits.scheme.max': -1, 'chits.group.max': -1, 'hrms.employee.max': -1 },
    versions: [{ number: 1, status: 'PUBLISHED', publishedAt: '2026-03-15T09:00:00Z' }] },
  { id: 'pl-hr', code: 'HR_SUITE', name: 'HR Suite', description: 'HRMS and Payroll for non-chit businesses.', status: 'DRAFT', publishedVersion: null, hasDraft: true, price: 9999, currency: 'INR', billingCycle: 'MONTHLY', trialDays: 30, updatedAt: '2026-11-12T12:00:00Z', subscribers: 0,
    modules: ['hrms.employee', 'hrms.org', 'hrms.calendar', 'hrms.attendance', 'hrms.leave', 'hrms.selfservice', 'payroll.structure', 'payroll.run', 'payroll.disbursement', 'payroll.payslip'],
    limits: { 'platform.user.max': 15, 'platform.branch.max': 3, 'platform.role.max': 5, 'hrms.employee.max': 100 },
    versions: [{ number: 1, status: 'DRAFT', publishedAt: null }] },
  { id: 'pl-legacy', code: 'LEGACY_BASIC', name: 'Legacy Basic', description: 'Retired 2025 plan; no new subscriptions.', status: 'ARCHIVED', publishedVersion: 1, hasDraft: false, price: 9999, currency: 'INR', billingCycle: 'YEARLY', trialDays: 0, updatedAt: '2025-12-31T09:00:00Z', subscribers: 0,
    modules: ['customer.record', 'chits.scheme', 'chits.group'], limits: { 'platform.user.max': 3, 'platform.branch.max': 1, 'chits.group.max': 10 },
    versions: [{ number: 1, status: 'PUBLISHED', publishedAt: '2024-04-01T09:00:00Z' }] }
];
DB.planModules = function (p) { return p.modules === 'ALL' ? DB.sellableModules().map(function (m) { return m.id; }) : p.modules; };

/* GET /api/platform/v1/admin/tenants → tenant-summary (+ tenant-detail, subscription for the view) */
DB.tenants = [
  { id: 't-svchits', code: 'svchits', name: 'Sri Venkata Chits', legalName: 'Sri Venkata Chits Pvt. Ltd.', contactEmail: 'ravi@svchits.in', contactPhone: '+91 40 2345 6789', taxId: '36AABCS1234F1Z5', address: { line1: '8-2-293, Road No. 12', line2: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana', postalCode: '500034', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'OCEAN', status: 'ACTIVE', planCode: 'GROWTH', planName: 'Growth', sub: { status: 'ACTIVE', planVersion: 3, startsOn: '2026-01-14', endsOn: '2027-01-13', trialEndsOn: null }, members: 31, createdAt: '2024-01-14T09:00:00Z', color: '#072E77' },
  { id: 't-annapurna', code: 'annapurna', name: 'Annapurna Chit Funds', legalName: 'Annapurna Chit Funds Ltd.', contactEmail: 'admin@annapurnachits.com', contactPhone: '+91 866 245 1100', taxId: '37AACCA5521K1Z8', address: { city: 'Vijayawada', state: 'Andhra Pradesh', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'CLASSIC', status: 'ACTIVE', planCode: 'ENTERPRISE', planName: 'Enterprise', sub: { status: 'ACTIVE', planVersion: 1, startsOn: '2026-03-02', endsOn: '2027-03-01' }, members: 118, createdAt: '2023-03-02T09:00:00Z', color: '#047857' },
  { id: 't-godavari', code: 'godavari', name: 'Godavari Savings & Chits', legalName: 'Godavari Savings & Chits', contactEmail: 'suresh@godavarichits.in', address: { city: 'Rajahmundry', state: 'Andhra Pradesh', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'CLASSIC', status: 'ACTIVE', planCode: 'STARTER', planName: 'Starter', sub: { status: 'TRIALING', planVersion: 2, startsOn: '2026-11-04', trialEndsOn: '2026-11-18' }, members: 3, createdAt: '2026-11-04T09:00:00Z', color: '#0F766E' },
  { id: 't-nandini', code: 'nandini', name: 'Nandini Chit Fund Co.', legalName: 'Nandini Chit Fund Co.', contactEmail: 'prakash@nandinichits.co.in', address: { city: 'Bengaluru', state: 'Karnataka', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'ROYAL', status: 'ACTIVE', planCode: 'GROWTH', planName: 'Growth', sub: { status: 'ACTIVE', planVersion: 3, startsOn: '2026-06-01', endsOn: '2027-05-31' }, members: 22, createdAt: '2025-06-01T09:00:00Z', color: '#5B21B6' },
  { id: 't-shubham', code: 'shubham', name: 'Shubham Chits', legalName: 'Shubham Chits Pvt. Ltd.', contactEmail: 'accounts@shubhamchits.in', address: { city: 'Chennai', state: 'Tamil Nadu', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'ta-IN', currency: 'INR', theme: 'SAFFRON', status: 'ACTIVE', planCode: 'GROWTH', planName: 'Growth', sub: { status: 'PAST_DUE', planVersion: 2, startsOn: '2025-02-02', endsOn: '2026-11-01' }, members: 15, createdAt: '2025-02-02T09:00:00Z', color: '#B42318' },
  { id: 't-kanaka', code: 'kanaka', name: 'Kanaka Chit Corporation', legalName: 'Kanaka Chit Corporation', contactEmail: 'anil@kanakachits.in', address: { city: 'Guntur', state: 'Andhra Pradesh', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'HERITAGE', status: 'ACTIVE', planCode: 'STARTER', planName: 'Starter', sub: { status: 'GRACE', planVersion: 2, startsOn: '2025-12-19', endsOn: '2026-11-10', graceEndsOn: '2026-11-17' }, members: 4, createdAt: '2025-12-19T09:00:00Z', color: '#9A5B05' },
  { id: 't-prabhat', code: 'prabhat', name: 'Prabhat Chit Funds', legalName: 'Prabhat Chit Funds Ltd.', contactEmail: 'it@prabhatchits.com', address: { city: 'Kochi', state: 'Kerala', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'CLASSIC', status: 'ACTIVE', planCode: 'ENTERPRISE', planName: 'Enterprise', sub: { status: 'ACTIVE', planVersion: 1, startsOn: '2026-05-11', endsOn: '2027-05-10' }, members: 87, createdAt: '2024-05-11T09:00:00Z', color: '#1F2937' },
  { id: 't-tirumala', code: 'tirumala', name: 'Tirumala Savings Chits', legalName: 'Tirumala Savings Chits', contactEmail: 'venu@tirumalachits.in', address: { city: 'Tirupati', state: 'Andhra Pradesh', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'CLASSIC', status: 'SUSPENDED', planCode: 'STARTER', planName: 'Starter', sub: { status: 'SUSPENDED', planVersion: 1, startsOn: '2025-09-30', endsOn: '2026-09-29' }, members: 3, createdAt: '2025-09-30T09:00:00Z', color: '#0F766E' },
  { id: 't-sahyadri', code: 'sahyadri', name: 'Sahyadri Chit Fund', legalName: 'Sahyadri Chit Fund Ltd.', contactEmail: 'neha@sahyadrichits.in', address: { city: 'Pune', state: 'Maharashtra', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'OCEAN', status: 'PROVISIONING', planCode: 'GROWTH', planName: 'Growth', sub: { status: 'TRIALING', planVersion: 3, startsOn: '2026-11-13', trialEndsOn: '2026-11-27' }, members: 1, createdAt: '2026-11-13T09:00:00Z', color: '#047857' },
  { id: 't-kaveri', code: 'kaveri', name: 'Kaveri Chits & Finance', legalName: 'Kaveri Chits & Finance', contactEmail: 'harish@kaverichits.in', address: { city: 'Mysuru', state: 'Karnataka', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'en-IN', currency: 'INR', theme: 'CLASSIC', status: 'PENDING', planCode: null, planName: null, sub: null, members: 1, createdAt: '2026-11-14T06:00:00Z', color: '#5B21B6' },
  { id: 't-madurai', code: 'maduraichits', name: 'Madurai Chits', legalName: 'Madurai Chits', contactEmail: 'office@maduraichits.in', address: { city: 'Madurai', state: 'Tamil Nadu', countryCode: 'IN' }, timezone: 'Asia/Kolkata', locale: 'ta-IN', currency: 'INR', theme: 'HERITAGE', status: 'ARCHIVED', planCode: 'LEGACY_BASIC', planName: 'Legacy Basic', sub: { status: 'ENDED', planVersion: 1, startsOn: '2024-04-01', endsOn: '2025-03-31' }, members: 0, createdAt: '2024-04-01T09:00:00Z', color: '#8B1E3F' }
];

/* GET /api/platform/v1/admin/tenants/{id}/provisioning (shown for PROVISIONING tenants) */
DB.provisioning = [
  { code: 'CREATE_SCHEMA', order: 1, mandatory: true, status: 'DONE', attempts: 1 },
  { code: 'SEED_ROLES', order: 2, mandatory: true, status: 'DONE', attempts: 1 },
  { code: 'CREATE_HEAD_OFFICE', order: 3, mandatory: true, status: 'DONE', attempts: 1 },
  { code: 'OPEN_BOOKS', order: 4, mandatory: false, status: 'FAILED', attempts: 2, lastError: 'Fiscal year start month missing in profile' },
  { code: 'SEND_OWNER_ACTIVATION', order: 5, mandatory: true, status: 'PENDING', attempts: 0 }
];

/* GET /api/platform/v1/admin/tenants/{id}/overrides */
DB.overrides = [
  { id: 'ov-1', tenantId: 't-svchits', kind: 'SET_LIMIT', moduleId: null, limitId: 'chits.group.max', limitValue: 150, reason: 'Diwali drive: 30 extra groups approved by sales (TKT-2231)', startsAt: '2026-10-01T00:00:00Z', expiresAt: '2027-01-31T00:00:00Z', revokedAt: null, inEffect: true, createdAt: '2026-09-28T10:00:00Z' },
  { id: 'ov-2', tenantId: 't-svchits', kind: 'GRANT_MODULE', moduleId: 'payroll.run', limitId: null, limitValue: null, reason: 'Payroll pilot before Growth v4', startsAt: '2026-11-01T00:00:00Z', expiresAt: '2026-12-31T00:00:00Z', revokedAt: null, inEffect: true, createdAt: '2026-10-30T10:00:00Z' },
  { id: 'ov-3', tenantId: 't-svchits', kind: 'GRANT_MODULE', moduleId: 'crm.report', limitId: null, limitValue: null, reason: 'Demo for board meeting', startsAt: '2026-05-01T00:00:00Z', expiresAt: '2026-05-15T00:00:00Z', revokedAt: null, inEffect: false, createdAt: '2026-04-30T10:00:00Z' }
];

/* GET /api/platform/v1/admin/users → user-summary (platform staff) */
DB.staff = [
  { id: 'u-arjun', email: 'arjun@chitsphere.in', fullName: 'Arjun Mehta', phone: '+91 98450 10001', role: 'PLATFORM_ADMIN', status: 'ACTIVE', failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: '2026-11-14T09:12:00Z', createdAt: '2023-01-02T09:00:00Z' },
  { id: 'u-priya', email: 'priya@chitsphere.in', fullName: 'Priya Nair', phone: '+91 98450 10002', role: 'PLATFORM_ADMIN', status: 'ACTIVE', failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: '2026-11-13T17:40:00Z', createdAt: '2023-04-10T09:00:00Z' },
  { id: 'u-kiran', email: 'kiran@chitsphere.in', fullName: 'Kiran Desai', phone: null, role: 'PLATFORM_SUPPORT', status: 'ACTIVE', failedLoginAttempts: 5, lockedUntil: '2026-11-14T10:45:00Z', lastLoginAt: '2026-11-12T11:00:00Z', createdAt: '2024-07-01T09:00:00Z' },
  { id: 'u-meera', email: 'meera@chitsphere.in', fullName: 'Meera Iyer', phone: '+91 98450 10004', role: 'PLATFORM_SUPPORT', status: 'ACTIVE', failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: '2026-11-14T08:05:00Z', createdAt: '2025-02-15T09:00:00Z' },
  { id: 'u-rahul', email: 'rahul@chitsphere.in', fullName: 'Rahul Verma', phone: null, role: 'PLATFORM_SUPPORT', status: 'PENDING_ACTIVATION', failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: null, createdAt: '2026-11-13T09:00:00Z' },
  { id: 'u-sam', email: 'sam@chitsphere.in', fullName: 'Sam Thomas', phone: null, role: 'PLATFORM_ADMIN', status: 'DISABLED', failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: '2026-05-01T09:00:00Z', createdAt: '2023-06-01T09:00:00Z' }
];

/* GET /api/platform/v1/admin/support-elevations */
DB.elevations = [
  { id: 'se-1', tenantId: 't-shubham', staffUserId: 'u-meera', reason: 'INC-5521: collections report mismatch reported by tenant', startsAt: '2026-11-14T08:30:00Z', expiresAt: '2026-11-14T10:30:00Z', endedAt: null, active: true },
  { id: 'se-2', tenantId: 't-svchits', staffUserId: 'u-kiran', reason: 'TKT-2240: owner cannot see Warangal branch', startsAt: '2026-11-12T10:00:00Z', expiresAt: '2026-11-12T11:00:00Z', endedAt: '2026-11-12T10:40:00Z', endedBy: 'u-kiran', active: false },
  { id: 'se-3', tenantId: 't-nandini', staffUserId: 'u-meera', reason: 'TKT-2198: leave balance import errors', startsAt: '2026-11-08T06:00:00Z', expiresAt: '2026-11-08T07:00:00Z', endedAt: null, active: false }
];

/* GET /api/platform/v1/admin/audit-events (platform) and /tenants/{id}/audit-events (tenant) */
DB.audit = [
  { id: 'a1', type: 'auth.login', actor: 'Ravi Kumar', tenantId: 't-svchits', subject: 'ravi@svchits.in', outcome: 'SUCCESS', clientIp: '49.37.12.8', occurredAt: '2026-11-14T09:02:00Z' },
  { id: 'a2', type: 'chits.group.commenced', actor: 'Ravi Kumar', tenantId: 't-svchits', subject: 'SV-1LW-E26', outcome: 'SUCCESS', clientIp: '49.37.12.8', occurredAt: '2026-11-14T08:50:00Z' },
  { id: 'a3', type: 'support.elevation.started', actor: 'Meera Iyer', tenantId: 't-shubham', subject: 'INC-5521', outcome: 'SUCCESS', clientIp: '10.0.4.21', occurredAt: '2026-11-14T08:30:00Z' },
  { id: 'a4', type: 'auth.login', actor: '—', tenantId: 't-svchits', subject: 'naresh@svchits.in', outcome: 'FAILURE', clientIp: '106.51.77.2', occurredAt: '2026-11-14T07:58:00Z', attributes: { reason: 'BAD_CREDENTIALS' } },
  { id: 'a5', type: 'platform.membership.role.changed', actor: 'Ravi Kumar', tenantId: 't-svchits', subject: 'sravani@svchits.in', outcome: 'SUCCESS', clientIp: '49.37.12.8', occurredAt: '2026-11-13T16:20:00Z' },
  { id: 'a6', type: 'platform.tenant.created', actor: 'Arjun Mehta', tenantId: 't-kaveri', subject: 'kaveri', outcome: 'SUCCESS', clientIp: '10.0.4.10', occurredAt: '2026-11-14T06:00:00Z' },
  { id: 'a7', type: 'platform.subscription.status.changed', actor: 'Priya Nair', tenantId: 't-kanaka', subject: 'ACTIVE → GRACE', outcome: 'SUCCESS', clientIp: '10.0.4.11', occurredAt: '2026-11-10T09:00:00Z' },
  { id: 'a8', type: 'THEME_CHANGED', actor: 'Ravi Kumar', tenantId: 't-svchits', subject: 'CLASSIC → OCEAN', outcome: 'SUCCESS', clientIp: '49.37.12.8', occurredAt: '2026-11-09T12:00:00Z' },
  { id: 'a9', type: 'accounting.voucher.posted', actor: 'Anusha R', tenantId: 't-svchits', subject: 'RV/2026-27/0418', outcome: 'SUCCESS', clientIp: '49.37.12.9', occurredAt: '2026-11-09T11:10:00Z' },
  { id: 'a10', type: 'platform.tenant.status.changed', actor: 'Arjun Mehta', tenantId: 't-tirumala', subject: 'ACTIVE → SUSPENDED', outcome: 'SUCCESS', clientIp: '10.0.4.10', occurredAt: '2026-10-04T09:00:00Z' },
  { id: 'a11', type: 'payroll.run.approved', actor: 'Ravi Kumar', tenantId: 't-svchits', subject: 'Ameerpet · 2026-10', outcome: 'SUCCESS', clientIp: '49.37.12.8', occurredAt: '2026-11-02T10:00:00Z' },
  { id: 'a12', type: 'auth.password.reset', actor: 'Divya S', tenantId: 't-svchits', subject: 'divya@svchits.in', outcome: 'SUCCESS', clientIp: '157.48.2.4', occurredAt: '2026-11-01T18:30:00Z' }
];

/* ------------------------------------------------------------------ TENANT side: Sri Venkata Chits (t-svchits) */
DB.me = { id: 'u-ravi', email: 'ravi@svchits.in', fullName: 'Ravi Kumar', role: 'TENANT_OWNER', userType: 'TENANT', tenantId: 't-svchits', membershipId: 'm-ravi', lastLoginAt: '2026-11-14T09:02:00Z' };
DB.platformMe = { id: 'u-arjun', email: 'arjun@chitsphere.in', fullName: 'Arjun Mehta', role: 'PLATFORM_ADMIN', userType: 'PLATFORM' };

/* GET /api/platform/v1/me/tenants */
DB.myTenants = [
  { tenantId: 't-svchits', code: 'svchits', name: 'Sri Venkata Chits', status: 'ACTIVE', role: 'TENANT_OWNER', current: true },
  { tenantId: 't-nandini', code: 'nandini', name: 'Nandini Chit Fund Co.', status: 'ACTIVE', role: 'TENANT_ADMIN', current: false },
  { tenantId: 't-godavari', code: 'godavari', name: 'Godavari Savings & Chits', status: 'ACTIVE', role: 'TENANT_USER', current: false },
  { tenantId: 't-tirumala', code: 'tirumala', name: 'Tirumala Savings Chits', status: 'SUSPENDED', role: 'TENANT_USER', current: false }
];

/* GET /api/platform/v1/tenants/{id}/entitlements (entitlement) */
DB.entitlement = {
  planCode: 'GROWTH', planVersion: 3, subscriptionStatus: 'ACTIVE', accessMode: 'FULL',
  limits: [
    { id: 'platform.user.max', label: 'Tenant users', limit: 40, used: 31 },
    { id: 'platform.branch.max', label: 'Branches', limit: 10, used: 7 },
    { id: 'platform.role.max', label: 'Custom roles', limit: 10, used: 6 },
    { id: 'customer.record.max', label: 'Customers', limit: 6000, used: 4210 },
    { id: 'chits.scheme.max', label: 'Chit schemes', limit: 25, used: 6 },
    { id: 'chits.group.max', label: 'Chit groups', limit: 150, used: 84, override: true },
    { id: 'hrms.employee.max', label: 'Employees', limit: 150, used: 46 }
  ]
};
DB.level = function (l) { if (l.limit === -1) return 'UNLIMITED'; if (l.used == null) return 'OK'; var r = l.used / l.limit; return r >= 1 ? 'EXHAUSTED' : r >= 0.8 ? 'NEAR_LIMIT' : 'OK'; };
/* Modules enabled for the current tenant: plan modules + GRANT_MODULE overrides in effect */
DB.enabledModules = DB.plans[1].modules.concat(['payroll.run', 'payroll.structure', 'payroll.disbursement', 'payroll.payslip']);

/* GET /api/platform/v1/tenants/{id}/branches */
DB.branches = [
  { id: 'br-amp', code: 'AMP', name: 'Ameerpet (Head Office)', city: 'Hyderabad', parentBranchId: null, status: 'ACTIVE', createdAt: '2024-01-14T09:00:00Z' },
  { id: 'br-kkp', code: 'KKP', name: 'Kukatpally', city: 'Hyderabad', parentBranchId: 'br-amp', status: 'ACTIVE', createdAt: '2024-03-01T09:00:00Z' },
  { id: 'br-dsn', code: 'DSN', name: 'Dilsukhnagar', city: 'Hyderabad', parentBranchId: 'br-amp', status: 'ACTIVE', createdAt: '2024-05-10T09:00:00Z' },
  { id: 'br-wgl', code: 'WGL', name: 'Warangal', city: 'Warangal', parentBranchId: null, status: 'ACTIVE', createdAt: '2024-09-01T09:00:00Z' },
  { id: 'br-knr', code: 'KNR', name: 'Karimnagar', city: 'Karimnagar', parentBranchId: 'br-wgl', status: 'ACTIVE', createdAt: '2025-01-20T09:00:00Z' },
  { id: 'br-nzb', code: 'NZB', name: 'Nizamabad', city: 'Nizamabad', parentBranchId: null, status: 'ACTIVE', createdAt: '2025-06-15T09:00:00Z' },
  { id: 'br-kmm', code: 'KMM', name: 'Khammam', city: 'Khammam', parentBranchId: null, status: 'ARCHIVED', createdAt: '2025-08-01T09:00:00Z' }
];

/* GET /api/platform/v1/tenants/{id}/role-templates (RoleTemplates.java) */
DB.roleTemplates = [
  { code: 'BRANCH_MANAGER', name: 'Branch Manager', description: 'Local operations in assigned branches', permissions: ['customer.record.read', 'customer.record.create', 'customer.record.update', 'chits.scheme.read', 'chits.group.read', 'chits.group.create', 'chits.group.update', 'chits.enrolment.read', 'chits.enrolment.create', 'chits.enrolment.cancel', 'crm.lead.read', 'crm.lead.create', 'crm.lead.update', 'crm.lead.assign', 'crm.followup.read', 'crm.followup.create', 'crm.report.read', 'hrms.employee.read', 'hrms.attendance.read', 'hrms.attendance.record', 'hrms.leave.read', 'hrms.leave.approve', 'platform.branch.read', 'platform.membership.read'] },
  { code: 'HR_MANAGER', name: 'HR Manager', description: 'Employees, organisation, calendars, leave types and balances, attendance', permissions: ['hrms.employee.read', 'hrms.employee.create', 'hrms.employee.update', 'hrms.employee.exit', 'hrms.employee.import', 'hrms.org.read', 'hrms.org.manage', 'hrms.calendar.manage', 'hrms.attendance.read', 'hrms.attendance.record', 'hrms.leave.read', 'hrms.leave.apply', 'hrms.leave.approve', 'hrms.leave.type.manage', 'hrms.leave.adjust'] },
  { code: 'HR_EXECUTIVE', name: 'HR Executive', description: 'Day-to-day employee records, attendance and documents; no leave set-up', permissions: ['hrms.employee.read', 'hrms.employee.create', 'hrms.employee.update', 'hrms.org.read', 'hrms.attendance.read', 'hrms.attendance.record', 'hrms.leave.read', 'hrms.leave.apply'] },
  { code: 'EMPLOYEE', name: 'Employee', description: 'Self-service: own profile, attendance, leave balances and requests, payslips', permissions: ['hrms.selfservice.use'] },
  { code: 'PAYROLL_PROCESSOR', name: 'Payroll Processor', description: 'Prepare and calculate payroll', permissions: ['payroll.structure.read', 'payroll.structure.manage', 'payroll.run.read', 'payroll.run.prepare', 'payroll.run.calculate', 'payroll.payslip.read'] },
  { code: 'PAYROLL_APPROVER', name: 'Payroll Approver', description: 'Approve and disburse payroll runs', permissions: ['payroll.run.read', 'payroll.run.approve', 'payroll.disbursement.execute', 'payroll.payslip.read'] },
  { code: 'ACCOUNTANT', name: 'Accountant', description: 'Prepares and submits vouchers; views the books and reports', permissions: ['accounting.ledger.read', 'accounting.voucher.read', 'accounting.voucher.create', 'accounting.approval.level1', 'accounting.report.read'] },
  { code: 'FINANCE_MANAGER', name: 'Finance Manager', description: 'Level 2 approver; chart of accounts, periods, reversals and policies', permissions: ['accounting.ledger.read', 'accounting.ledger.manage', 'accounting.ledger.close', 'accounting.voucher.read', 'accounting.voucher.reverse', 'accounting.approval.level2', 'accounting.approval.policy', 'accounting.report.read'] },
  { code: 'DIRECTOR', name: 'Director', description: 'Level 3 approver for the highest bands; all financial reports', permissions: ['accounting.ledger.read', 'accounting.voucher.read', 'accounting.approval.level3', 'accounting.report.read'] },
  { code: 'AGENT', name: 'Agent', description: 'Customers, enrolments and assigned leads', permissions: ['customer.record.read', 'customer.record.create', 'chits.scheme.read', 'chits.group.read', 'chits.enrolment.read', 'chits.enrolment.create', 'crm.lead.read', 'crm.lead.update', 'crm.followup.read', 'crm.followup.create'] },
  { code: 'AUDITOR', name: 'Auditor', description: 'Read-only access to every record and the audit trail', permissions: ['customer.record.read', 'chits.scheme.read', 'chits.group.read', 'chits.enrolment.read', 'crm.lead.read', 'crm.followup.read', 'crm.report.read', 'hrms.employee.read', 'hrms.org.read', 'hrms.attendance.read', 'hrms.leave.read', 'payroll.run.read', 'payroll.payslip.read', 'accounting.ledger.read', 'accounting.voucher.read', 'accounting.report.read', 'platform.audit.read', 'platform.branch.read', 'platform.membership.read'] }
];

/* GET /api/platform/v1/tenants/{id}/roles */
DB.roles = [
  { id: 'r-bm', code: 'BRANCH_MANAGER', name: 'Branch Manager', description: 'Local operations in assigned branches', template: 'BRANCH_MANAGER', status: 'ACTIVE', updatedAt: '2026-02-01T09:00:00Z' },
  { id: 'r-acc', code: 'ACCOUNTANT', name: 'Accountant', description: 'Vouchers and reports', template: 'ACCOUNTANT', status: 'ACTIVE', updatedAt: '2026-02-01T09:00:00Z' },
  { id: 'r-fm', code: 'FINANCE_MANAGER', name: 'Finance Manager', description: 'Level 2 approvals, periods', template: 'FINANCE_MANAGER', status: 'ACTIVE', updatedAt: '2026-02-01T09:00:00Z' },
  { id: 'r-agent', code: 'FIELD_AGENT', name: 'Field Agent', description: 'Agent template plus pipeline report', template: 'AGENT', status: 'ACTIVE', updatedAt: '2026-08-20T09:00:00Z', extra: ['crm.report.read'] },
  { id: 'r-hr', code: 'HR_MANAGER', name: 'HR Manager', description: 'Employees, leave and attendance', template: 'HR_MANAGER', status: 'ACTIVE', updatedAt: '2026-04-11T09:00:00Z' },
  { id: 'r-emp', code: 'EMPLOYEE', name: 'Employee', description: 'Self-service', template: 'EMPLOYEE', status: 'ACTIVE', updatedAt: '2026-04-11T09:00:00Z' },
  { id: 'r-old', code: 'AUCTION_OFFICER', name: 'Auction Officer', description: 'Old role, replaced by Branch Manager', template: null, status: 'ARCHIVED', updatedAt: '2026-01-05T09:00:00Z', permissions: ['chits.group.read', 'chits.enrolment.read'] }
];
DB.rolePerms = function (r) {
  if (r.permissions) return r.permissions;
  var t = DB.roleTemplates.find(function (x) { return x.code === r.template; });
  return (t ? t.permissions : []).concat(r.extra || []);
};

/* GET /api/platform/v1/tenants/{id}/memberships */
DB.memberships = [
  { id: 'm-ravi', userId: 'u-ravi', email: 'ravi@svchits.in', fullName: 'Ravi Kumar', phone: '+91 98480 11223', role: 'TENANT_OWNER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'TENANT', branchIds: [], roleIds: [], lockedUntil: null, lastLoginAt: '2026-11-14T09:02:00Z' },
  { id: 'm-lakshmi', userId: 'u-lakshmi', email: 'lakshmi@svchits.in', fullName: 'Lakshmi Rao', phone: '+91 98480 11000', role: 'TENANT_ADMIN', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'TENANT', branchIds: [], roleIds: [], lockedUntil: null, lastLoginAt: '2026-11-14T08:15:00Z' },
  { id: 'm-sravani', userId: 'u-sravani', email: 'sravani@svchits.in', fullName: 'Sravani P', phone: '+91 98480 22334', role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'BRANCHES', branchIds: ['br-kkp'], roleIds: ['r-bm'], lockedUntil: null, lastLoginAt: '2026-11-14T08:01:00Z' },
  { id: 'm-mahesh', userId: 'u-mahesh', email: 'mahesh@svchits.in', fullName: 'Mahesh T', phone: '+91 98480 33445', role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'BRANCHES', branchIds: ['br-dsn'], roleIds: ['r-bm'], lockedUntil: null, lastLoginAt: '2026-11-13T18:30:00Z' },
  { id: 'm-anusha', userId: 'u-anusha', email: 'anusha@svchits.in', fullName: 'Anusha R', phone: '+91 98480 44100', role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'TENANT', branchIds: [], roleIds: ['r-acc', 'r-emp'], lockedUntil: null, lastLoginAt: '2026-11-14T07:40:00Z' },
  { id: 'm-srinivas', userId: 'u-srinivas', email: 'srinivas@svchits.in', fullName: 'Srinivas Rao', phone: '+91 98480 44200', role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'TENANT', branchIds: [], roleIds: ['r-fm'], lockedUntil: null, lastLoginAt: '2026-11-13T12:00:00Z' },
  { id: 'm-vamshi', userId: 'u-vamshi', email: 'vamshi@svchits.in', fullName: 'Vamshi K', phone: '+91 98480 55667', role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'BRANCHES', branchIds: ['br-wgl', 'br-knr'], roleIds: ['r-agent'], lockedUntil: null, lastLoginAt: '2026-11-14T08:44:00Z' },
  { id: 'm-padma', userId: 'u-padma', email: 'padma@svchits.in', fullName: 'Padma L', phone: '+91 98480 66110', role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'TENANT', branchIds: [], roleIds: ['r-hr'], lockedUntil: null, lastLoginAt: '2026-11-12T10:00:00Z' },
  { id: 'm-divya', userId: 'u-divya', email: 'divya@svchits.in', fullName: 'Divya S', phone: null, role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'PENDING_ACTIVATION', branchScope: 'BRANCHES', branchIds: ['br-amp'], roleIds: ['r-emp'], lockedUntil: null, lastLoginAt: null },
  { id: 'm-naresh', userId: 'u-naresh', email: 'naresh@svchits.in', fullName: 'Naresh B', phone: '+91 98480 77001', role: 'TENANT_USER', status: 'ACTIVE', userStatus: 'ACTIVE', branchScope: 'BRANCHES', branchIds: ['br-knr'], roleIds: ['r-agent'], lockedUntil: '2026-11-14T08:13:00Z', lastLoginAt: '2026-11-10T09:00:00Z' },
  { id: 'm-kiran', userId: 'u-kiranr', email: 'kiran.rao@svchits.in', fullName: 'Kiran Rao', phone: '+91 98480 77002', role: 'TENANT_USER', status: 'DISABLED', userStatus: 'ACTIVE', branchScope: 'BRANCHES', branchIds: ['br-wgl'], roleIds: ['r-bm'], lockedUntil: null, lastLoginAt: '2026-09-02T09:00:00Z' }
];

/* GET /api/customer/v1/tenants/{id}/customers */
DB.customers = [
  { id: 'c-1', code: 'C000001', branchId: 'br-amp', fullName: 'Srinivas Reddy', phone: '+91 90000 10002', alternatePhone: null, email: 'srinivas.r@gmail.com', dateOfBirth: '1979-04-12', occupation: 'Business', addressLine: '12-4, SR Nagar', city: 'Hyderabad', state: 'Telangana', postalCode: '500038', idProofType: 'AADHAAR', idProofNumber: 'XXXX XXXX 4412', status: 'ACTIVE', createdAt: '2024-02-01T09:00:00Z' },
  { id: 'c-2', code: 'C000002', branchId: 'br-kkp', fullName: 'Kavitha M', phone: '+91 90000 10003', alternatePhone: '+91 90000 20003', email: 'kavitha.m@gmail.com', dateOfBirth: '1986-09-03', occupation: 'Teacher', addressLine: 'Plot 22, KPHB Colony', city: 'Hyderabad', state: 'Telangana', postalCode: '500072', idProofType: 'PAN', idProofNumber: 'BKPPM1234K', status: 'ACTIVE', createdAt: '2024-03-04T09:00:00Z' },
  { id: 'c-3', code: 'C000003', branchId: 'br-amp', fullName: 'Ramesh Goud', phone: '+91 90000 10004', email: null, dateOfBirth: '1975-01-20', occupation: 'Farmer', city: 'Hyderabad', state: 'Telangana', postalCode: '500016', idProofType: 'VOTER_ID', idProofNumber: 'TLG1234567', status: 'ACTIVE', createdAt: '2024-03-10T09:00:00Z' },
  { id: 'c-4', code: 'C000004', branchId: 'br-dsn', fullName: 'Sunitha K', phone: '+91 90000 10005', email: 'sunitha.k@yahoo.com', occupation: 'Nurse', city: 'Hyderabad', state: 'Telangana', postalCode: '500060', idProofType: null, idProofNumber: null, status: 'ACTIVE', createdAt: '2024-06-21T09:00:00Z' },
  { id: 'c-5', code: 'C000005', branchId: 'br-amp', fullName: 'Venkatesh P', phone: '+91 90000 10006', email: null, occupation: 'Shopkeeper', city: 'Hyderabad', state: 'Telangana', postalCode: '500018', idProofType: 'AADHAAR', idProofNumber: 'XXXX XXXX 9021', status: 'ACTIVE', createdAt: '2024-07-02T09:00:00Z' },
  { id: 'c-6', code: 'C000006', branchId: 'br-kkp', fullName: 'Madhavi L', phone: '+91 90000 10007', email: 'madhavi.l@gmail.com', occupation: 'Software engineer', city: 'Hyderabad', state: 'Telangana', postalCode: '500085', idProofType: 'PASSPORT', idProofNumber: 'T1234567', status: 'ACTIVE', createdAt: '2025-01-15T09:00:00Z' },
  { id: 'c-7', code: 'C000007', branchId: 'br-wgl', fullName: 'Prasad Ch', phone: '+91 90000 10008', email: null, occupation: 'Contractor', city: 'Warangal', state: 'Telangana', postalCode: '506002', idProofType: 'DRIVING_LICENCE', idProofNumber: 'TS0320190001234', status: 'ACTIVE', createdAt: '2025-03-08T09:00:00Z' },
  { id: 'c-8', code: 'C000008', branchId: 'br-knr', fullName: 'Lavanya S', phone: '+91 90000 10009', email: 'lavanya.s@gmail.com', occupation: 'Doctor', city: 'Karimnagar', state: 'Telangana', postalCode: '505001', idProofType: 'AADHAAR', idProofNumber: 'XXXX XXXX 7710', status: 'ACTIVE', createdAt: '2025-05-19T09:00:00Z' },
  { id: 'c-9', code: 'C000009', branchId: 'br-amp', fullName: 'Harish Chandra', phone: '+91 90000 10010', email: null, occupation: 'Retired', city: 'Hyderabad', state: 'Telangana', postalCode: '500001', idProofType: 'PAN', idProofNumber: 'AHCPC4410L', status: 'INACTIVE', createdAt: '2024-02-11T09:00:00Z' },
  { id: 'c-10', code: 'C000010', branchId: 'br-dsn', fullName: 'Anjali Varma', phone: '+91 90000 10011', email: 'anjali.v@gmail.com', occupation: 'Business', city: 'Hyderabad', state: 'Telangana', postalCode: '500036', idProofType: 'AADHAAR', idProofNumber: 'XXXX XXXX 1188', status: 'ACTIVE', createdAt: '2026-10-28T09:00:00Z' }
];

/* GET /api/chits/v1/tenants/{id}/schemes */
DB.schemes = [
  { id: 's-1', code: 'SWARNA-5L', name: 'Swarna 5L / 50M', chitValue: 500000, installments: 50, auctionFrequency: 'MONTHLY', collectionOption: 'BEFORE_AUCTION', minBidPercent: 5, maxBidPercent: 30, companyCommissionPercent: 5, companyTickets: 1, enrolmentFee: 500, penaltyNonPrizedPercent: 18, penaltyPrizedPercent: 24, minMembersForCommencement: 40, status: 'ACTIVE', createdAt: '2024-02-10T09:00:00Z', color: '#9A5B05' },
  { id: 's-2', code: 'LAKSHMI-10L', name: 'Lakshmi 10L / 40M', chitValue: 1000000, installments: 40, auctionFrequency: 'MONTHLY', collectionOption: 'BEFORE_AUCTION', minBidPercent: 5, maxBidPercent: 30, companyCommissionPercent: 5, companyTickets: 1, enrolmentFee: 1000, penaltyNonPrizedPercent: 18, penaltyPrizedPercent: 24, minMembersForCommencement: 32, status: 'ACTIVE', createdAt: '2024-03-05T09:00:00Z', color: '#072E77' },
  { id: 's-3', code: 'VASANTHA-2L', name: 'Vasantha 2L / 20M', chitValue: 200000, installments: 20, auctionFrequency: 'MONTHLY', collectionOption: 'AFTER_AUCTION', minBidPercent: 5, maxBidPercent: 35, companyCommissionPercent: 5, companyTickets: 1, enrolmentFee: 250, penaltyNonPrizedPercent: 15, penaltyPrizedPercent: 21, minMembersForCommencement: 16, status: 'ACTIVE', createdAt: '2024-04-18T09:00:00Z', color: '#047857' },
  { id: 's-4', code: 'WEEKLY-1L', name: 'Weekly Saver 1L / 25W', chitValue: 100000, installments: 25, auctionFrequency: 'WEEKLY', collectionOption: 'BEFORE_AUCTION', minBidPercent: 5, maxBidPercent: 25, companyCommissionPercent: 5, companyTickets: 1, enrolmentFee: 100, penaltyNonPrizedPercent: 12, penaltyPrizedPercent: 18, minMembersForCommencement: 20, status: 'ACTIVE', createdAt: '2025-01-11T09:00:00Z', color: '#0F766E' },
  { id: 's-5', code: 'MAHA-25L', name: 'Mahalakshmi 25L / 50M', chitValue: 2500000, installments: 50, auctionFrequency: 'MONTHLY', collectionOption: 'BEFORE_AUCTION', minBidPercent: 5, maxBidPercent: 30, companyCommissionPercent: 5, companyTickets: 2, enrolmentFee: 2500, penaltyNonPrizedPercent: 18, penaltyPrizedPercent: 24, minMembersForCommencement: 40, status: 'ACTIVE', createdAt: '2025-03-22T09:00:00Z', color: '#5B21B6' },
  { id: 's-6', code: 'DAILY-50K', name: 'Daily Deposit 50K / 100D', chitValue: 50000, installments: 100, auctionFrequency: 'DAILY', collectionOption: 'BEFORE_AUCTION', minBidPercent: 5, maxBidPercent: 20, companyCommissionPercent: 5, companyTickets: 1, enrolmentFee: 50, penaltyNonPrizedPercent: 12, penaltyPrizedPercent: 18, minMembersForCommencement: 80, status: 'ARCHIVED', createdAt: '2025-07-01T09:00:00Z', color: '#1F2937' }
];
/* Versions, compliance and icons (SchemeView): a modification ("Modify terms", POST …/schemes/{id}/versions) saves the new money
   terms as the next version and the old one becomes REPLACED. Replaced versions are history, so they live apart from the list.
   LAKSHMI-10L is on version 2; its version 1 (max bid 35%) had one group formed from it. */
DB.schemeHistory = [
  { id: 's-2v1', code: 'LAKSHMI-10L', name: 'Lakshmi 10L / 40M', chitValue: 1000000, installments: 40, auctionFrequency: 'MONTHLY', collectionOption: 'BEFORE_AUCTION', minBidPercent: 5, maxBidPercent: 35, companyCommissionPercent: 5, companyTickets: 1, enrolmentFee: 1000, penaltyNonPrizedPercent: 18, penaltyPrizedPercent: 24, minMembersForCommencement: 32, status: 'REPLACED', createdAt: '2024-03-05T09:00:00Z', color: '#072E77',
    originalSchemeId: 's-2v1', versionNumber: 1, isCompliant: true, complianceCheckedBy: 'u-lakshmi', complianceCheckedAt: '2024-03-08T09:00:00Z' }
];
DB.schemes.concat(DB.schemeHistory).forEach(function (s) {
  s.installmentAmount = Math.round(s.chitValue / s.installments);
  if (s.penaltySfPercent == null) s.penaltySfPercent = 0;
  if (s.originalSchemeId == null) { s.originalSchemeId = s.id; s.versionNumber = 1; }
  if (s.isCompliant === undefined) { s.isCompliant = null; s.complianceCheckedBy = null; s.complianceCheckedAt = null; }
  s.originalCreatedAt = s.originalCreatedAt || s.createdAt;
  s.hasIcon = !!s.hasIcon;
});
Object.assign(DB.schemes[1], { originalSchemeId: 's-2v1', versionNumber: 2, createdAt: '2025-09-01T09:00:00Z', originalCreatedAt: '2024-03-05T09:00:00Z' });
Object.assign(DB.schemes[0], { isCompliant: true, complianceCheckedBy: 'u-ravi', complianceCheckedAt: '2024-02-12T09:00:00Z', hasIcon: true, penaltySfPercent: 2 });
Object.assign(DB.schemes[2], { isCompliant: false, complianceCheckedBy: 'u-lakshmi', complianceCheckedAt: '2024-04-20T09:00:00Z' });

/* GET /api/chits/v1/tenants/{id}/groups (scheme terms are copied into each group) */
DB.groups = [
  { id: 'g-1', code: 'SV-5L-A24', name: 'Swarna A 2024', schemeId: 's-1', branchId: 'br-amp', startsOn: '2024-12-05', advanceInstallments: 0, status: 'COMMENCED', enrolled: 50, commencement: { ccNumber: 'CC/HYD/2024/1188', ccDate: '2024-11-28', commencedOn: '2024-12-05', firstAuctionOn: '2025-01-05', challanReference: 'CH-77812', documentReference: 'DMS/CC/1188' } },
  { id: 'g-2', code: 'SV-10L-B24', name: 'Lakshmi B 2024', schemeId: 's-2v1', branchId: 'br-kkp', startsOn: '2025-05-10', advanceInstallments: 1, status: 'COMMENCED', enrolled: 40, commencement: { ccNumber: 'CC/HYD/2025/0412', ccDate: '2025-05-02', commencedOn: '2025-05-10', firstAuctionOn: '2025-06-10' } },
  { id: 'g-3', code: 'SV-2L-C25', name: 'Vasantha C 2025', schemeId: 's-3', branchId: 'br-dsn', startsOn: '2026-02-15', advanceInstallments: 0, status: 'COMMENCED', enrolled: 20, commencement: { ccNumber: 'CC/HYD/2026/0090', ccDate: '2026-02-10', commencedOn: '2026-02-15', firstAuctionOn: '2026-03-15' } },
  { id: 'g-4', code: 'SV-1LW-E26', name: 'Weekly E 2026', schemeId: 's-4', branchId: 'br-wgl', startsOn: '2026-11-14', advanceInstallments: 0, status: 'COMMENCED', enrolled: 25, commencement: { ccNumber: 'CC/WGL/2026/0233', ccDate: '2026-11-10', commencedOn: '2026-11-14', firstAuctionOn: '2026-11-19' } },
  { id: 'g-5', code: 'SV-25L-D26', name: 'Mahalakshmi D 2026', schemeId: 's-5', branchId: 'br-amp', startsOn: '2026-12-20', advanceInstallments: 1, status: 'FORMING', enrolled: 34, remarks: 'Premium group for HNI customers.' },
  { id: 'g-6', code: 'SV-5L-F26', name: 'Swarna F 2026', schemeId: 's-1', branchId: 'br-knr', startsOn: '2027-01-05', advanceInstallments: 0, status: 'FORMING', enrolled: 8 },
  { id: 'g-7', code: 'SV-10L-G26', name: 'Lakshmi G 2026', schemeId: 's-2', branchId: 'br-kkp', startsOn: '2027-01-10', advanceInstallments: 0, status: 'FORMING', enrolled: 32 },
  { id: 'g-8', code: 'SV-2L-H26', name: 'Vasantha H 2026', schemeId: 's-3', branchId: 'br-nzb', startsOn: '2026-10-15', advanceInstallments: 0, status: 'CANCELLED', enrolled: 1, cancelReason: 'Not enough subscribers in Nizamabad before the planned start.' }
];
DB.groups.forEach(function (g) {
  var s = DB.schemes.concat(DB.schemeHistory).find(function (x) { return x.id === g.schemeId; });
  ['chitValue', 'installments', 'installmentAmount', 'auctionFrequency', 'collectionOption', 'companyTickets', 'enrolmentFee', 'minMembersForCommencement', 'color'].forEach(function (k) { g[k] = s[k]; });
  g.schemeCode = s.code;
  g.vacant = g.installments - g.enrolled;
  g.commencementBlockers = [];
  if (g.status === 'FORMING' && g.enrolled < g.minMembersForCommencement) g.commencementBlockers.push((g.minMembersForCommencement - g.enrolled) + ' more enrolled tickets needed (' + g.enrolled + ' of ' + g.minMembersForCommencement + ')');
});

/* GET /groups/{id}/enrolments and /tickets: generated per group */
DB.enrolmentsFor = function (g) {
  var custs = DB.customers.filter(function (c) { return c.status === 'ACTIVE'; });
  var out = [], i;
  for (i = 1; i <= g.companyTickets; i++) out.push({ id: g.id + '-e' + i, ticketNumber: i, subscriberType: 'COMPANY', customerName: 'Company ticket', customerCode: null, enrolledOn: g.startsOn, enrolmentFee: 0, salesType: 'DIRECT', nominee: null, status: 'ACTIVE' });
  var sales = ['DIRECT', 'AGENT', 'REFERRAL', 'DIRECT'];
  for (i = g.companyTickets + 1; i <= g.enrolled; i++) {
    var c = custs[(i * 7 + g.code.length) % custs.length];
    out.push({ id: g.id + '-e' + i, ticketNumber: i, subscriberType: 'CUSTOMER', customerId: c.id, customerCode: c.code, customerName: c.fullName, enrolledOn: '2026-10-' + String(1 + (i % 28)).padStart(2, '0'), enrolmentFee: g.enrolmentFee, salesType: sales[i % 4], salesExecutive: i % 4 === 1 ? 'Vamshi K' : null, referredBy: i % 4 === 2 ? 'Srinivas Reddy' : null, nominee: { name: 'Nominee ' + i, relationship: DB.ENUM.NomineeRelationship[i % 8] }, status: 'ACTIVE' });
  }
  if (g.status === 'FORMING' && g.enrolled > 3) out.push({ id: g.id + '-ex', ticketNumber: null, subscriberType: 'CUSTOMER', customerCode: 'C000009', customerName: 'Harish Chandra', enrolledOn: '2026-10-02', enrolmentFee: g.enrolmentFee, salesType: 'DIRECT', status: 'CANCELLED', cancelledOn: '2026-10-20', cancelReason: 'Customer moved abroad' });
  return out;
};
DB.ticketsFor = function (g) {
  var en = DB.enrolmentsFor(g).filter(function (e) { return e.status === 'ACTIVE'; }), out = [];
  for (var i = 1; i <= g.installments; i++) {
    var e = en.find(function (x) { return x.ticketNumber === i; });
    out.push({ ticketNumber: i, status: e ? (e.subscriberType === 'COMPANY' ? 'COMPANY' : 'ENROLLED') : 'VACANT', holderName: e ? e.customerName : null });
  }
  return out;
};

/* HRMS: GET /api/hrms/v1/tenants/{id}/departments, /designations, /employees, ... */
DB.departments = [
  { id: 'd-ops', code: 'OPS', name: 'Operations', status: 'ACTIVE', employees: 22 },
  { id: 'd-fin', code: 'FIN', name: 'Finance & Accounts', status: 'ACTIVE', employees: 8 },
  { id: 'd-sales', code: 'SALES', name: 'Sales', status: 'ACTIVE', employees: 11 },
  { id: 'd-hr', code: 'HR', name: 'Human Resources', status: 'ACTIVE', employees: 3 },
  { id: 'd-it', code: 'IT', name: 'IT', status: 'ARCHIVED', employees: 0 }
];
DB.designations = [
  { id: 'ds-bm', code: 'BM', name: 'Branch Manager', status: 'ACTIVE', employees: 6 },
  { id: 'ds-acc', code: 'ACC', name: 'Accountant', status: 'ACTIVE', employees: 5 },
  { id: 'ds-agt', code: 'AGT', name: 'Field Agent', status: 'ACTIVE', employees: 14 },
  { id: 'ds-exe', code: 'EXE', name: 'Executive', status: 'ACTIVE', employees: 16 },
  { id: 'ds-hrm', code: 'HRM', name: 'HR Manager', status: 'ACTIVE', employees: 1 }
];
DB.employees = [
  { id: 'e-1', code: 'EMP-001', fullName: 'Ravi Kumar', email: 'ravi@svchits.in', phone: '+91 98480 11223', branchId: 'br-amp', departmentId: 'd-ops', designationId: 'ds-bm', managerEmployeeId: null, employmentType: 'PERMANENT', joinedOn: '2014-06-01', dateOfBirth: '1978-05-11', gender: 'MALE', bloodGroup: 'B+', status: 'ACTIVE', membershipId: 'm-ravi' },
  { id: 'e-2', code: 'EMP-002', fullName: 'Sravani P', email: 'sravani@svchits.in', phone: '+91 98480 22334', branchId: 'br-kkp', departmentId: 'd-ops', designationId: 'ds-bm', managerEmployeeId: 'e-1', employmentType: 'PERMANENT', joinedOn: '2018-03-12', gender: 'FEMALE', bloodGroup: 'O+', status: 'ACTIVE', membershipId: 'm-sravani' },
  { id: 'e-3', code: 'EMP-003', fullName: 'Mahesh T', email: 'mahesh@svchits.in', phone: '+91 98480 33445', branchId: 'br-dsn', departmentId: 'd-ops', designationId: 'ds-bm', managerEmployeeId: 'e-1', employmentType: 'PERMANENT', joinedOn: '2019-07-01', gender: 'MALE', status: 'ACTIVE', membershipId: 'm-mahesh' },
  { id: 'e-4', code: 'EMP-004', fullName: 'Anusha R', email: 'anusha@svchits.in', phone: '+91 98480 44100', branchId: 'br-amp', departmentId: 'd-fin', designationId: 'ds-acc', managerEmployeeId: 'e-5', employmentType: 'PERMANENT', joinedOn: '2020-01-06', gender: 'FEMALE', bloodGroup: 'A+', status: 'ACTIVE', membershipId: 'm-anusha' },
  { id: 'e-5', code: 'EMP-005', fullName: 'Srinivas Rao', email: 'srinivas@svchits.in', branchId: 'br-amp', departmentId: 'd-fin', designationId: 'ds-acc', managerEmployeeId: 'e-1', employmentType: 'PERMANENT', joinedOn: '2016-09-15', gender: 'MALE', status: 'ACTIVE', membershipId: 'm-srinivas' },
  { id: 'e-6', code: 'EMP-006', fullName: 'Vamshi K', email: 'vamshi@svchits.in', branchId: 'br-wgl', departmentId: 'd-sales', designationId: 'ds-agt', managerEmployeeId: 'e-9', employmentType: 'CONTRACT', joinedOn: '2023-04-03', gender: 'MALE', status: 'ACTIVE', membershipId: 'm-vamshi' },
  { id: 'e-7', code: 'EMP-007', fullName: 'Padma L', email: 'padma@svchits.in', branchId: 'br-amp', departmentId: 'd-hr', designationId: 'ds-hrm', managerEmployeeId: 'e-1', employmentType: 'PERMANENT', joinedOn: '2021-02-01', gender: 'FEMALE', status: 'ACTIVE', membershipId: 'm-padma' },
  { id: 'e-8', code: 'EMP-008', fullName: 'Divya S', email: 'divya@svchits.in', branchId: 'br-amp', departmentId: 'd-ops', designationId: 'ds-exe', managerEmployeeId: 'e-1', employmentType: 'INTERN', joinedOn: '2026-11-03', gender: 'FEMALE', status: 'ACTIVE', membershipId: 'm-divya' },
  { id: 'e-9', code: 'EMP-009', fullName: 'Kiran Rao', email: 'kiran.rao@svchits.in', branchId: 'br-wgl', departmentId: 'd-ops', designationId: 'ds-bm', managerEmployeeId: 'e-1', employmentType: 'PERMANENT', joinedOn: '2019-11-11', gender: 'MALE', status: 'ON_NOTICE', lastWorkingDay: '2026-11-30', membershipId: 'm-kiran' },
  { id: 'e-10', code: 'EMP-010', fullName: 'Naresh B', email: 'naresh@svchits.in', branchId: 'br-knr', departmentId: 'd-sales', designationId: 'ds-agt', managerEmployeeId: 'e-9', employmentType: 'CONTRACT', joinedOn: '2024-06-17', gender: 'MALE', status: 'ACTIVE', membershipId: 'm-naresh' },
  { id: 'e-11', code: 'EMP-011', fullName: 'Rajesh V', email: null, branchId: 'br-nzb', departmentId: 'd-ops', designationId: 'ds-exe', managerEmployeeId: 'e-1', employmentType: 'PERMANENT', joinedOn: '2022-08-01', gender: 'MALE', status: 'EXITED', exitedOn: '2026-07-31', membershipId: null }
];
DB.leaveTypes = [
  { id: 'lt-cl', code: 'CL', name: 'Casual leave', paid: true, yearlyEntitlement: 12, allowHalfDay: true, allowNegative: false, tracksBalance: true, maxDaysPerRequest: 3, status: 'ACTIVE' },
  { id: 'lt-sl', code: 'SL', name: 'Sick leave', paid: true, yearlyEntitlement: 10, allowHalfDay: true, allowNegative: true, tracksBalance: true, maxDaysPerRequest: null, status: 'ACTIVE' },
  { id: 'lt-el', code: 'EL', name: 'Earned leave', paid: true, yearlyEntitlement: 15, allowHalfDay: false, allowNegative: false, tracksBalance: true, maxDaysPerRequest: 15, status: 'ACTIVE' },
  { id: 'lt-lop', code: 'LOP', name: 'Loss of pay', paid: false, yearlyEntitlement: 0, allowHalfDay: true, allowNegative: true, tracksBalance: false, maxDaysPerRequest: null, status: 'ACTIVE' }
];
DB.holidays = [
  { id: 'h-1', date: '2026-01-14', name: 'Sankranti', kind: 'FIXED', branchId: null },
  { id: 'h-2', date: '2026-01-26', name: 'Republic Day', kind: 'FIXED', branchId: null },
  { id: 'h-3', date: '2026-06-02', name: 'Telangana Formation Day', kind: 'FIXED', branchId: null },
  { id: 'h-4', date: '2026-08-15', name: 'Independence Day', kind: 'FIXED', branchId: null },
  { id: 'h-5', date: '2026-10-20', name: 'Dussehra', kind: 'FIXED', branchId: null },
  { id: 'h-6', date: '2026-11-08', name: 'Diwali', kind: 'FIXED', branchId: null },
  { id: 'h-7', date: '2026-11-24', name: 'Guru Nanak Jayanti', kind: 'OPTIONAL', branchId: null },
  { id: 'h-8', date: '2026-12-25', name: 'Christmas', kind: 'FIXED', branchId: null },
  { id: 'h-9', date: '2026-09-17', name: 'Warangal local holiday', kind: 'FIXED', branchId: 'br-wgl' }
];
DB.weeklyOffs = [{ branchId: null, days: ['SUNDAY'] }, { branchId: 'br-wgl', days: ['SUNDAY', 'SATURDAY_2', 'SATURDAY_4'] }];
DB.leaveRequests = [
  { id: 'lr-1', employeeId: 'e-6', employeeName: 'Vamshi K', branchId: 'br-wgl', leaveTypeId: 'lt-cl', leaveTypeCode: 'CL', paid: true, fromDate: '2026-11-17', toDate: '2026-11-18', days: 2, reason: 'Family function in Hanamkonda', status: 'PENDING', createdAt: '2026-11-13T09:00:00Z' },
  { id: 'lr-2', employeeId: 'e-4', employeeName: 'Anusha R', branchId: 'br-amp', leaveTypeId: 'lt-sl', leaveTypeCode: 'SL', paid: true, fromDate: '2026-11-14', toDate: '2026-11-14', fromHalf: 'SECOND', days: 0.5, reason: 'Doctor appointment', status: 'PENDING', createdAt: '2026-11-14T06:00:00Z' },
  { id: 'lr-3', employeeId: 'e-2', employeeName: 'Sravani P', branchId: 'br-kkp', leaveTypeId: 'lt-el', leaveTypeCode: 'EL', paid: true, fromDate: '2026-12-22', toDate: '2026-12-31', days: 8, reason: 'Year-end vacation', status: 'APPROVED', decidedBy: 'Ravi Kumar', decisionNote: 'Arrange cover with Mahesh', createdAt: '2026-11-02T09:00:00Z' },
  { id: 'lr-4', employeeId: 'e-10', employeeName: 'Naresh B', branchId: 'br-knr', leaveTypeId: 'lt-cl', leaveTypeCode: 'CL', paid: true, fromDate: '2026-11-03', toDate: '2026-11-06', days: 4, reason: 'Personal work', status: 'REJECTED', decidedBy: 'Kiran Rao', decisionNote: 'More than 3 days of CL; apply EL instead', createdAt: '2026-10-30T09:00:00Z' },
  { id: 'lr-5', employeeId: 'e-8', employeeName: 'Divya S', branchId: 'br-amp', leaveTypeId: 'lt-lop', leaveTypeCode: 'LOP', paid: false, fromDate: '2026-11-21', toDate: '2026-11-21', days: 1, reason: 'College exam', status: 'PENDING', createdAt: '2026-11-12T09:00:00Z' },
  { id: 'lr-6', employeeId: 'e-3', employeeName: 'Mahesh T', branchId: 'br-dsn', leaveTypeId: 'lt-cl', leaveTypeCode: 'CL', paid: true, fromDate: '2026-10-10', toDate: '2026-10-10', days: 1, reason: 'Bank work', status: 'CANCELLED', createdAt: '2026-10-08T09:00:00Z' }
];
DB.balancesFor = function (empId) {
  var used = { CL: 3, SL: 1.5, EL: 2, LOP: 0 };
  return DB.leaveTypes.filter(function (t) { return t.tracksBalance; }).map(function (t) {
    var u = used[t.code] + (empId === 'e-6' && t.code === 'CL' ? 2 : 0);
    return { leaveTypeId: t.id, leaveTypeCode: t.code, leaveTypeName: t.name, granted: t.yearlyEntitlement, adjusted: t.code === 'EL' ? 3 : 0, used: u, pending: empId === 'e-6' && t.code === 'CL' ? 2 : 0, available: t.yearlyEntitlement + (t.code === 'EL' ? 3 : 0) - u };
  });
};
DB.attendanceToday = [
  { employeeId: 'e-1', status: 'PRESENT', checkIn: '09:05', checkOut: null },
  { employeeId: 'e-2', status: 'PRESENT', checkIn: '09:22', checkOut: null },
  { employeeId: 'e-3', status: 'PRESENT', checkIn: '09:40', checkOut: null },
  { employeeId: 'e-4', status: 'HALF_DAY', checkIn: '09:15', checkOut: '13:30', note: 'SL second half' },
  { employeeId: 'e-5', status: 'PRESENT', checkIn: '10:02', checkOut: null },
  { employeeId: 'e-6', status: 'ABSENT', checkIn: null, checkOut: null },
  { employeeId: 'e-7', status: 'PRESENT', checkIn: '09:00', checkOut: null },
  { employeeId: 'e-8', status: null },
  { employeeId: 'e-9', status: 'ON_LEAVE' },
  { employeeId: 'e-10', status: 'PRESENT', checkIn: '08:55', checkOut: null }
];

/* CRM: GET /api/crm/v1/tenants/{id}/leads, /follow-ups */
DB.leads = [
  { id: 'l-1', branchId: 'br-amp', name: 'Rajeshwari T', phone: '+91 91000 22001', email: 'rajeshwari.t@gmail.com', company: null, source: 'WALK_IN', status: 'NEW', interest: 'Swarna 5L monthly group', expectedValue: 500000, assignedTo: 'm-vamshi', assigneeName: 'Vamshi K', nextFollowUpAt: '2026-11-15T05:30:00Z', createdAt: '2026-11-13T09:00:00Z' },
  { id: 'l-2', branchId: 'br-kkp', name: 'Gopal Krishna', phone: '+91 91000 22002', email: null, company: 'GK Traders', source: 'REFERRAL', status: 'CONTACTED', interest: 'Lakshmi 10L for business capital', expectedValue: 1000000, assignedTo: 'm-sravani', assigneeName: 'Sravani P', nextFollowUpAt: '2026-11-14T09:30:00Z', createdAt: '2026-11-05T09:00:00Z', notes: 'Referred by Srinivas Reddy (C000001).' },
  { id: 'l-3', branchId: 'br-wgl', name: 'Swathi Reddy', phone: '+91 91000 22003', email: 'swathi.r@outlook.com', company: null, source: 'WEBSITE', status: 'QUALIFIED', interest: 'Weekly saver', expectedValue: 100000, assignedTo: 'm-vamshi', assigneeName: 'Vamshi K', nextFollowUpAt: '2026-11-12T10:00:00Z', createdAt: '2026-10-28T09:00:00Z' },
  { id: 'l-4', branchId: 'br-amp', name: 'Mohammed Irfan', phone: '+91 91000 22004', email: null, company: 'Irfan Motors', source: 'CAMPAIGN', status: 'WON', interest: 'Mahalakshmi 25L', expectedValue: 2500000, assignedTo: 'm-lakshmi', assigneeName: 'Lakshmi Rao', nextFollowUpAt: null, createdAt: '2026-10-02T09:00:00Z' },
  { id: 'l-5', branchId: 'br-dsn', name: 'Bhavana K', phone: '+91 91000 22005', email: 'bhavana.k@gmail.com', company: null, source: 'PHONE', status: 'LOST', interest: '2L group', expectedValue: 200000, assignedTo: 'm-mahesh', assigneeName: 'Mahesh T', lostReason: 'Joined a bank RD instead', nextFollowUpAt: null, createdAt: '2026-10-11T09:00:00Z' },
  { id: 'l-6', branchId: 'br-knr', name: 'Sai Teja', phone: '+91 91000 22006', email: null, company: null, source: 'WALK_IN', status: 'NEW', interest: 'Not sure yet', expectedValue: null, assignedTo: null, assigneeName: null, nextFollowUpAt: null, createdAt: '2026-11-14T07:00:00Z' },
  { id: 'l-7', branchId: 'br-kkp', name: 'Priyanka D', phone: '+91 91000 22007', email: 'priyanka.d@gmail.com', company: null, source: 'REFERRAL', status: 'QUALIFIED', interest: 'Two tickets in Lakshmi G 2026', expectedValue: 2000000, assignedTo: 'm-sravani', assigneeName: 'Sravani P', nextFollowUpAt: '2026-11-16T06:30:00Z', createdAt: '2026-11-01T09:00:00Z' },
  { id: 'l-8', branchId: 'br-amp', name: 'Venu Gopal', phone: '+91 91000 22008', email: null, company: 'VG Constructions', source: 'OTHER', status: 'CONTACTED', interest: 'Corporate group for staff', expectedValue: 1500000, assignedTo: 'm-lakshmi', assigneeName: 'Lakshmi Rao', nextFollowUpAt: '2026-11-11T08:00:00Z', createdAt: '2026-10-20T09:00:00Z' }
];
DB.followUps = [
  { id: 'f-1', leadId: 'l-2', leadName: 'Gopal Krishna', branchId: 'br-kkp', dueAt: '2026-11-14T09:30:00Z', channel: 'VISIT', note: 'Visit shop with Lakshmi 10L brochure', status: 'PLANNED', ownerName: 'Sravani P' },
  { id: 'f-2', leadId: 'l-3', leadName: 'Swathi Reddy', branchId: 'br-wgl', dueAt: '2026-11-12T10:00:00Z', channel: 'CALL', note: 'Confirm KYC documents', status: 'PLANNED', ownerName: 'Vamshi K' },
  { id: 'f-3', leadId: 'l-8', leadName: 'Venu Gopal', branchId: 'br-amp', dueAt: '2026-11-11T08:00:00Z', channel: 'MEETING', note: 'Present corporate group proposal', status: 'PLANNED', ownerName: 'Lakshmi Rao' },
  { id: 'f-4', leadId: 'l-1', leadName: 'Rajeshwari T', branchId: 'br-amp', dueAt: '2026-11-15T05:30:00Z', channel: 'WHATSAPP', note: 'Send Swarna scheme details', status: 'PLANNED', ownerName: 'Vamshi K' },
  { id: 'f-5', leadId: 'l-7', leadName: 'Priyanka D', branchId: 'br-kkp', dueAt: '2026-11-16T06:30:00Z', channel: 'CALL', note: 'Ticket numbers available in G 2026', status: 'PLANNED', ownerName: 'Sravani P' },
  { id: 'f-6', leadId: 'l-4', leadName: 'Mohammed Irfan', branchId: 'br-amp', dueAt: '2026-10-20T08:00:00Z', channel: 'VISIT', note: 'Collect enrolment form', status: 'DONE', ownerName: 'Lakshmi Rao', outcomeNote: 'Signed; enrolled in SV-25L-D26', completedAt: '2026-10-20T09:10:00Z' },
  { id: 'f-7', leadId: 'l-5', leadName: 'Bhavana K', branchId: 'br-dsn', dueAt: '2026-10-25T08:00:00Z', channel: 'CALL', note: 'Second call', status: 'MISSED', ownerName: 'Mahesh T', outcomeNote: 'Not reachable', completedAt: '2026-10-26T08:00:00Z' }
];
DB.NOW = '2026-11-14T10:00:00Z';
DB.followUps.forEach(function (f) { f.overdue = f.status === 'PLANNED' && f.dueAt < DB.NOW; });

/* Payroll: GET /api/payroll/v1/tenants/{id}/runs, salary structures, payslips */
DB.salaryStructures = [
  { employeeId: 'e-1', effectiveFrom: '2026-04-01', basic: 60000, hra: 24000, allowances: 16000, fixedDeductions: 200, pfApplicable: true },
  { employeeId: 'e-2', effectiveFrom: '2026-04-01', basic: 32000, hra: 12800, allowances: 5200, fixedDeductions: 200, pfApplicable: true },
  { employeeId: 'e-3', effectiveFrom: '2026-04-01', basic: 30000, hra: 12000, allowances: 5000, fixedDeductions: 200, pfApplicable: true },
  { employeeId: 'e-4', effectiveFrom: '2026-04-01', basic: 25000, hra: 10000, allowances: 3000, fixedDeductions: 200, pfApplicable: true },
  { employeeId: 'e-5', effectiveFrom: '2026-04-01', basic: 40000, hra: 16000, allowances: 8000, fixedDeductions: 200, pfApplicable: true },
  { employeeId: 'e-6', effectiveFrom: '2026-07-01', basic: 14000, hra: 5600, allowances: 4400, fixedDeductions: 0, pfApplicable: false },
  { employeeId: 'e-7', effectiveFrom: '2026-04-01', basic: 28000, hra: 11200, allowances: 4800, fixedDeductions: 200, pfApplicable: true },
  { employeeId: 'e-9', effectiveFrom: '2026-04-01', basic: 30000, hra: 12000, allowances: 5000, fixedDeductions: 200, pfApplicable: true },
  { employeeId: 'e-10', effectiveFrom: '2026-04-01', basic: 13000, hra: 5200, allowances: 3800, fixedDeductions: 0, pfApplicable: false }
];
DB.salaryStructures.forEach(function (s) { s.monthlyGross = s.basic + s.hra + s.allowances; });
DB.payrollRuns = [
  { id: 'pr-1', branchId: 'br-amp', period: '2026-10', status: 'DISBURSED', employeeCount: 5, skippedEmployees: 0, totalGross: 278200, totalDeductions: 9800, totalNet: 268400, preparedBy: 'Padma L', calculatedBy: 'Padma L', approvedBy: 'Ravi Kumar', approvedAt: '2026-11-02T10:00:00Z', disbursedAt: '2026-11-03T06:00:00Z', disbursementReference: 'HDFC-BATCH-55120' },
  { id: 'pr-2', branchId: 'br-kkp', period: '2026-10', status: 'APPROVED', employeeCount: 1, skippedEmployees: 0, totalGross: 50000, totalDeductions: 2000, totalNet: 48000, preparedBy: 'Padma L', calculatedBy: 'Padma L', approvedBy: 'Ravi Kumar', approvedAt: '2026-11-04T10:00:00Z' },
  { id: 'pr-3', branchId: 'br-wgl', period: '2026-10', status: 'CALCULATED', employeeCount: 2, skippedEmployees: 0, totalGross: 71000, totalDeductions: 2000, totalNet: 69000, preparedBy: 'Padma L', calculatedBy: 'Padma L' },
  { id: 'pr-4', branchId: 'br-amp', period: '2026-11', status: 'DRAFT', employeeCount: 0, skippedEmployees: 1, totalGross: 0, totalDeductions: 0, totalNet: 0, preparedBy: 'Padma L' },
  { id: 'pr-5', branchId: 'br-dsn', period: '2026-09', status: 'CANCELLED', employeeCount: 1, skippedEmployees: 0, totalGross: 47000, totalDeductions: 2000, totalNet: 45000, preparedBy: 'Padma L' }
];
DB.payslipsFor = function (run) {
  var emps = DB.employees.filter(function (e) { return e.branchId === run.branchId && e.status !== 'EXITED'; });
  return emps.map(function (e) {
    var s = DB.salaryStructures.find(function (x) { return x.employeeId === e.id; });
    if (!s) return null;
    var unpaid = e.id === 'e-6' ? 1 : 0, days = 31, ratio = (days - unpaid) / days;
    var basic = Math.round(s.basic * ratio), hra = Math.round(s.hra * ratio), al = Math.round(s.allowances * ratio), gross = basic + hra + al;
    var pf = s.pfApplicable ? Math.round(Math.min(basic, 15000) * 0.12) : 0;
    return { id: run.id + e.id, runId: run.id, employeeId: e.id, employeeCode: e.code, employeeName: e.fullName, period: run.period, daysInPeriod: days, paidDays: days - unpaid, unpaidDays: unpaid, basic: basic, hra: hra, allowances: al, gross: gross, providentFund: pf, fixedDeductions: s.fixedDeductions, totalDeductions: pf + s.fixedDeductions, net: gross - pf - s.fixedDeductions, runStatus: run.status };
  }).filter(Boolean);
};

/* Accounting (tenant book): book, accounts, journal entries, segments, parties, periods, policies */
DB.book = { id: 'bk-1', realm: 'TENANT', code: 'SVCPL', name: 'Sri Venkata Chits Pvt. Ltd.', template: 'CHIT_FUND', baseCurrency: 'INR', fiscalYearStartMonth: 4, booksFrom: '2024-04-01', currentFiscalYear: '2026-27', gstin: '36AABCS1234F1Z5', cashSharePolicy: 'WARN', allowSelfApproval: false };
DB.platformBook = { id: 'bk-p', realm: 'PLATFORM', code: 'CHITSPHERE', name: 'ChitSphere Technologies Pvt. Ltd.', template: 'PLATFORM', baseCurrency: 'INR', fiscalYearStartMonth: 4, booksFrom: '2023-04-01', currentFiscalYear: '2026-27', gstin: '29AAFCC7788Q1Z3', cashSharePolicy: 'BLOCK', allowSelfApproval: true };
DB.accounts = [
  { id: 'ac-1000', code: '1000', name: 'Assets', type: 'ASSET', parentId: null, postable: false },
  { id: 'ac-1100', code: '1100', name: 'Cash in hand', type: 'ASSET', parentId: 'ac-1000', postable: true, cash: true, roleCode: 'CASH', balance: 182400 },
  { id: 'ac-1110', code: '1110', name: 'HDFC Bank current account', type: 'ASSET', parentId: 'ac-1000', postable: true, cash: true, roleCode: 'BANK', balance: 4812000 },
  { id: 'ac-1200', code: '1200', name: 'Subscriptions receivable', type: 'ASSET', parentId: 'ac-1000', postable: true, requiresParty: true, requiresSegment: true, roleCode: 'SUBSCRIPTION_RECEIVABLE', balance: 137000 },
  { id: 'ac-1300', code: '1300', name: 'FD with bank (security deposit)', type: 'ASSET', parentId: 'ac-1000', postable: true, requiresSegment: true, balance: 4300000 },
  { id: 'ac-2000', code: '2000', name: 'Liabilities', type: 'LIABILITY', parentId: null, postable: false },
  { id: 'ac-2100', code: '2100', name: 'Prize money payable', type: 'LIABILITY', parentId: 'ac-2000', postable: true, requiresParty: true, requiresSegment: true, roleCode: 'PRIZE_PAYABLE', balance: 545000 },
  { id: 'ac-2200', code: '2200', name: 'Dividend payable to members', type: 'LIABILITY', parentId: 'ac-2000', postable: true, requiresSegment: true, roleCode: 'DIVIDEND_PAYABLE', balance: 96000 },
  { id: 'ac-2300', code: '2300', name: 'Salaries payable', type: 'LIABILITY', parentId: 'ac-2000', postable: true, balance: 117000 },
  { id: 'ac-2400', code: '2400', name: 'GST payable', type: 'LIABILITY', parentId: 'ac-2000', postable: true, balance: 66000 },
  { id: 'ac-2500', code: '2500', name: 'Subscriptions held for members', type: 'LIABILITY', parentId: 'ac-2000', postable: true, requiresSegment: true, balance: 2735000 },
  { id: 'ac-3000', code: '3000', name: 'Share capital', type: 'EQUITY', parentId: null, postable: true, balance: 5000000 },
  { id: 'ac-4000', code: '4000', name: 'Income', type: 'INCOME', parentId: null, postable: false },
  { id: 'ac-4100', code: '4100', name: 'Foreman commission', type: 'INCOME', parentId: 'ac-4000', postable: true, requiresSegment: true, roleCode: 'COMMISSION', balance: 3620000 },
  { id: 'ac-4200', code: '4200', name: 'Enrolment fees', type: 'INCOME', parentId: 'ac-4000', postable: true, roleCode: 'ENROLMENT_FEE', balance: 48500 },
  { id: 'ac-4300', code: '4300', name: 'Late fee (penal interest)', type: 'INCOME', parentId: 'ac-4000', postable: true, roleCode: 'LATE_FEE', balance: 21400 },
  { id: 'ac-5000', code: '5000', name: 'Expenses', type: 'EXPENSE', parentId: null, postable: false },
  { id: 'ac-5100', code: '5100', name: 'Salaries', type: 'EXPENSE', parentId: 'ac-5000', postable: true, balance: 2184000 },
  { id: 'ac-5200', code: '5200', name: 'Rent', type: 'EXPENSE', parentId: 'ac-5000', postable: true, balance: 595000 },
  { id: 'ac-5300', code: '5300', name: 'Office expenses', type: 'EXPENSE', parentId: 'ac-5000', postable: true, status: 'INACTIVE', balance: 38500 }
];
DB.accounts.forEach(function (a) { a.status = a.status || 'ACTIVE'; a.requiresParty = !!a.requiresParty; a.requiresSegment = !!a.requiresSegment; a.cash = !!a.cash; a.roleCode = a.roleCode || null; a.balance = a.balance || 0; });
DB.segments = [
  { id: 'sg-w', kind: 'WALLET', code: 'WALLET', name: 'Company wallet', status: 'ACTIVE' },
  { id: 'sg-1', kind: 'CHIT_GROUP', code: 'SV-5L-A24', name: 'Swarna A 2024', externalRef: 'g-1', status: 'ACTIVE' },
  { id: 'sg-2', kind: 'CHIT_GROUP', code: 'SV-10L-B24', name: 'Lakshmi B 2024', externalRef: 'g-2', status: 'ACTIVE' },
  { id: 'sg-3', kind: 'CHIT_GROUP', code: 'SV-2L-C25', name: 'Vasantha C 2025', externalRef: 'g-3', status: 'ACTIVE' },
  { id: 'sg-4', kind: 'CHIT_GROUP', code: 'SV-1LW-E26', name: 'Weekly E 2026', externalRef: 'g-4', status: 'ACTIVE' },
  { id: 'sg-5', kind: 'PROJECT', code: 'NEW-BRANCH-NZB', name: 'Nizamabad branch fit-out', status: 'ACTIVE' },
  { id: 'sg-6', kind: 'CHIT_GROUP', code: 'SV-5L-Z21', name: 'Swarna Z 2021', status: 'CLOSED', closedAt: '2025-09-30T09:00:00Z' }
];
DB.segmentRows = [
  { segmentId: 'sg-1', income: 287500, expenses: 12000, profit: 275500, transferred: 200000, dueToCompany: 25000, receivable: 40000, prizePayable: 380000, cashShare: 318000, transferable: 75500 },
  { segmentId: 'sg-2', income: 360000, expenses: 9000, profit: 351000, transferred: 300000, dueToCompany: 50000, receivable: 75000, prizePayable: 0, cashShare: 212000, transferable: 51000 },
  { segmentId: 'sg-3', income: 90000, expenses: 3000, profit: 87000, transferred: 60000, dueToCompany: 10000, receivable: 18000, prizePayable: 165000, cashShare: 96000, transferable: 27000 },
  { segmentId: 'sg-4', income: 5000, expenses: 1500, profit: 3500, transferred: 0, dueToCompany: 5000, receivable: 4000, prizePayable: 0, cashShare: 8000, transferable: 0 }
];
DB.parties = [
  { id: 'pt-1', kind: 'INDIVIDUAL', displayName: 'Srinivas Reddy', pan: 'AKRPR1234M', phone: '+91 90000 10002', email: 'srinivas.r@gmail.com', status: 'ACTIVE', accounts: [{ code: 'SV-5L-A24-T02', kind: 'TICKET', role: 'MEMBER', segment: 'SV-5L-A24', ticketNo: 2, ticketRole: 'MEMBER' }, { code: 'SV-10L-B24-T11', kind: 'TICKET', role: 'MEMBER', segment: 'SV-10L-B24', ticketNo: 11, ticketRole: 'MEMBER' }] },
  { id: 'pt-2', kind: 'INDIVIDUAL', displayName: 'Kavitha M', phone: '+91 90000 10003', status: 'ACTIVE', accounts: [{ code: 'SV-5L-A24-T03', kind: 'TICKET', role: 'MEMBER', segment: 'SV-5L-A24', ticketNo: 3, ticketRole: 'MEMBER' }] },
  { id: 'pt-3', kind: 'ORGANISATION', displayName: 'Sri Venkata Chits (company)', status: 'ACTIVE', accounts: [{ code: 'SV-5L-A24-T01', kind: 'TICKET', role: 'COMPANY', segment: 'SV-5L-A24', ticketNo: 1, ticketRole: 'FOREMAN' }] },
  { id: 'pt-4', kind: 'ORGANISATION', displayName: 'Hyderabad Properties LLP', gstin: '36AAGFH1234K1Z2', phone: '+91 40 2222 1111', status: 'ACTIVE', accounts: [{ code: 'V-HYDPROP', kind: 'VENDOR', role: 'VENDOR' }] },
  { id: 'pt-5', kind: 'INDIVIDUAL', displayName: 'Anusha R', status: 'ACTIVE', accounts: [{ code: 'E-EMP004', kind: 'EMPLOYEE', role: 'EMPLOYEE' }] },
  { id: 'pt-6', kind: 'ORGANISATION', displayName: 'Print Hub', gstin: null, status: 'INACTIVE', accounts: [{ code: 'V-PRINTHUB', kind: 'VENDOR', role: 'VENDOR' }] }
];
DB.journal = [
  { id: 'je-1', voucherType: 'RECEIPT', voucherNo: 'RV/2026-27/0418', draftRef: 'D-1201', entryDate: '2026-11-09', narration: 'Installment 23 · SV-5L-A24 · ticket 2', status: 'POSTED', amount: 10000, branchId: 'br-amp', sourceSystem: 'CHITS', templateCode: 'CHIT_COLLECTION', requiredLevels: [], createdBy: 'Anusha R', postedBy: 'System', lines: [{ account: '1110 HDFC Bank current account', side: 'DEBIT', amount: 10000 }, { account: '1200 Subscriptions receivable', side: 'CREDIT', amount: 10000, party: 'SV-5L-A24-T02', segment: 'SV-5L-A24' }] },
  { id: 'je-2', voucherType: 'PAYMENT', voucherNo: null, draftRef: 'D-1207', entryDate: '2026-11-12', narration: 'Prize money · SV-5L-A24 auction 23 · ticket 17', status: 'SUBMITTED', amount: 380000, branchId: 'br-amp', sourceSystem: 'MANUAL', templateCode: null, policyName: 'Payments above ₹1 lakh', requiredLevels: [1, 2], nextLevel: 2, createdBy: 'Anusha R', lines: [{ account: '2100 Prize money payable', side: 'DEBIT', amount: 380000, party: 'SV-5L-A24-T17', segment: 'SV-5L-A24' }, { account: '1110 HDFC Bank current account', side: 'CREDIT', amount: 380000 }], approvals: [{ level: null, action: 'SUBMIT', actor: 'Anusha R', actedAt: '2026-11-12T09:00:00Z', comment: null }, { level: 1, action: 'APPROVE', actor: 'Mahesh T', actedAt: '2026-11-12T11:20:00Z', comment: 'Bid sheet verified' }] },
  { id: 'je-3', voucherType: 'PAYMENT', voucherNo: null, draftRef: 'D-1210', entryDate: '2026-11-13', narration: 'Office rent November · Ameerpet', status: 'SUBMITTED', amount: 85000, branchId: 'br-amp', sourceSystem: 'MANUAL', policyName: 'Payments up to ₹1 lakh', requiredLevels: [1], nextLevel: 1, createdBy: 'Anusha R', lines: [{ account: '5200 Rent', side: 'DEBIT', amount: 85000 }, { account: '1110 HDFC Bank current account', side: 'CREDIT', amount: 85000, party: 'V-HYDPROP' }], approvals: [{ action: 'SUBMIT', actor: 'Anusha R', actedAt: '2026-11-13T08:00:00Z' }] },
  { id: 'je-4', voucherType: 'JOURNAL', voucherNo: null, draftRef: 'D-1212', entryDate: '2026-11-14', narration: 'Commission accrual · SV-10L-B24 auction 18', status: 'DRAFT', amount: 50000, branchId: 'br-kkp', sourceSystem: 'MANUAL', requiredLevels: [], createdBy: 'Anusha R', lines: [{ account: '1200 Subscriptions receivable', side: 'DEBIT', amount: 50000, segment: 'SV-10L-B24' }, { account: '4100 Foreman commission', side: 'CREDIT', amount: 50000, segment: 'SV-10L-B24' }] },
  { id: 'je-5', voucherType: 'CONTRA', voucherNo: 'CV/2026-27/0091', draftRef: 'D-1190', entryDate: '2026-11-08', narration: 'Cash deposited to HDFC', status: 'POSTED', amount: 240000, branchId: 'br-amp', sourceSystem: 'MANUAL', requiredLevels: [1], createdBy: 'Anusha R', postedBy: 'Srinivas Rao', lines: [{ account: '1110 HDFC Bank current account', side: 'DEBIT', amount: 240000 }, { account: '1100 Cash in hand', side: 'CREDIT', amount: 240000 }] },
  { id: 'je-6', voucherType: 'PAYMENT', voucherNo: null, draftRef: 'D-1188', entryDate: '2026-11-07', narration: 'Printing of passbooks', status: 'REJECTED', amount: 12500, branchId: 'br-dsn', sourceSystem: 'MANUAL', requiredLevels: [1], createdBy: 'Mahesh T', lines: [{ account: '5300 Office expenses', side: 'DEBIT', amount: 12500 }, { account: '1100 Cash in hand', side: 'CREDIT', amount: 12500 }], approvals: [{ action: 'SUBMIT', actor: 'Mahesh T', actedAt: '2026-11-07T09:00:00Z' }, { level: 1, action: 'REJECT', actor: 'Srinivas Rao', actedAt: '2026-11-07T12:00:00Z', comment: 'Office expenses account is inactive; use vendor Print Hub via purchase' }] },
  { id: 'je-7', voucherType: 'RECEIPT', voucherNo: 'RV/2026-27/0402', draftRef: 'D-1170', entryDate: '2026-11-05', narration: 'Enrolment fee · SV-25L-D26 · 6 tickets', status: 'POSTED', amount: 15000, branchId: 'br-amp', sourceSystem: 'CHITS', templateCode: 'CHIT_ENROLMENT', requiredLevels: [], createdBy: 'System', postedBy: 'System', lines: [{ account: '1100 Cash in hand', side: 'DEBIT', amount: 15000 }, { account: '4200 Enrolment fees', side: 'CREDIT', amount: 15000 }] },
  { id: 'je-8', voucherType: 'PAYMENT', voucherNo: 'PV/2026-27/0210', draftRef: 'D-1160', entryDate: '2026-11-03', narration: 'Salaries October · Ameerpet (payroll run)', status: 'POSTED', amount: 268400, branchId: 'br-amp', sourceSystem: 'PAYROLL', templateCode: 'PAYROLL_DISBURSEMENT', requiredLevels: [1, 2], createdBy: 'System', postedBy: 'Srinivas Rao', lines: [{ account: '2300 Salaries payable', side: 'DEBIT', amount: 268400 }, { account: '1110 HDFC Bank current account', side: 'CREDIT', amount: 268400 }] }
];
DB.periods = (function () {
  var o = [], names = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  for (var i = 0; i < 12; i++) {
    var y = i < 9 ? 2026 : 2027, m = (i + 3) % 12 + 1;
    o.push({ id: 'fp-' + (i + 1), fiscalYear: '2026-27', periodNo: i + 1, label: names[i] + ' ' + y, startDate: y + '-' + String(m).padStart(2, '0') + '-01', status: i < 6 ? 'CLOSED' : 'OPEN', closedBy: i < 6 ? 'Srinivas Rao' : null });
  }
  return o;
})();
DB.policies = [
  { id: 'ap-1', name: 'Receipts (any amount)', voucherType: 'RECEIPT', minAmount: 0, maxAmount: null, levels: [], priority: 10, status: 'ACTIVE' },
  { id: 'ap-2', name: 'Payments up to ₹1 lakh', voucherType: 'PAYMENT', minAmount: 0, maxAmount: 100000, levels: [1], priority: 20, status: 'ACTIVE' },
  { id: 'ap-3', name: 'Payments above ₹1 lakh', voucherType: 'PAYMENT', minAmount: 100000, maxAmount: 1000000, levels: [1, 2], priority: 20, status: 'ACTIVE' },
  { id: 'ap-4', name: 'Payments above ₹10 lakh', voucherType: 'PAYMENT', minAmount: 1000000, maxAmount: null, levels: [1, 2, 3], priority: 20, status: 'ACTIVE' },
  { id: 'ap-5', name: 'Manual journals', voucherType: 'JOURNAL', minAmount: 0, maxAmount: null, levels: [2], priority: 30, status: 'ACTIVE' },
  { id: 'ap-6', name: 'Payroll postings', voucherType: null, templateCode: 'PAYROLL_DISBURSEMENT', minAmount: 0, maxAmount: null, levels: [1, 2], priority: 5, status: 'ACTIVE' }
];
DB.postingTemplates = [
  { code: 'CHIT_COLLECTION', label: 'Installment collection', amounts: ['installment', 'lateFee'] },
  { code: 'CHIT_ENROLMENT', label: 'Enrolment fee', amounts: ['enrolmentFee'] },
  { code: 'CHIT_PRIZE_PAYMENT', label: 'Prize money payment', amounts: ['prizeAmount'] },
  { code: 'CHIT_COMMISSION', label: 'Foreman commission', amounts: ['commission', 'gst'] },
  { code: 'PAYROLL_DISBURSEMENT', label: 'Payroll disbursement', amounts: ['net'] }
];

/* ------------------------------------------------------------------ Lookups */
DB.tenant = function (id) { return DB.tenants.find(function (t) { return t.id === id || t.code === id; }); };
DB.tenantByCode = function (c) { return DB.tenants.find(function (t) { return t.code === String(c || '').toLowerCase(); }); };
DB.plan = function (id) { return DB.plans.find(function (p) { return p.id === id || p.code === id; }); };
DB.branch = function (id) { return DB.branches.find(function (b) { return b.id === id; }); };
DB.branchName = function (id) { var b = DB.branch(id); return b ? b.name : '—'; };
DB.scheme = function (id) { return DB.schemes.concat(DB.schemeHistory).find(function (s) { return s.id === id; }); };
/* GET …/schemes/{id}/versions: every version, newest first */
DB.schemeVersions = function (s) { return DB.schemes.concat(DB.schemeHistory).filter(function (x) { return x.originalSchemeId === s.originalSchemeId; }).sort(function (a, b) { return b.versionNumber - a.versionNumber; }); };
/* GET …/schemes/{id}/icon, by original scheme id (every version shares the icon). The app turns the image into a data: URL
   because the back-end CSP is img-src 'self' data:. */
DB.schemeIcons = {
  's-1': 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#FDF3DC"/><circle cx="32" cy="32" r="20" fill="#E0A526" stroke="#9A5B05" stroke-width="3"/><text x="32" y="40" font-family="Arial" font-size="22" font-weight="700" text-anchor="middle" fill="#7A4504">₹</text></svg>')
};
DB.userName = function (userId) { var m = DB.memberships.find(function (x) { return x.userId === userId; }); return m ? m.fullName : userId === DB.me.id ? 'you' : 'a user'; };
DB.group = function (id) { return DB.groups.find(function (g) { return g.id === id || g.code === id; }); };
DB.customer = function (id) { return DB.customers.find(function (c) { return c.id === id; }); };
DB.employee = function (id) { return DB.employees.find(function (e) { return e.id === id; }); };
DB.empName = function (id) { var e = DB.employee(id); return e ? e.fullName : '—'; };
DB.membership = function (id) { return DB.memberships.find(function (m) { return m.id === id; }); };
DB.role = function (id) { return DB.roles.find(function (r) { return r.id === id; }); };
DB.dept = function (id) { var d = DB.departments.find(function (x) { return x.id === id; }); return d ? d.name : '—'; };
DB.desig = function (id) { var d = DB.designations.find(function (x) { return x.id === id; }); return d ? d.name : '—'; };
DB.staffName = function (id) { var s = DB.staff.find(function (x) { return x.id === id; }); return s ? s.fullName : '—'; };
DB.lead = function (id) { return DB.leads.find(function (l) { return l.id === id; }); };
DB.run = function (id) { return DB.payrollRuns.find(function (r) { return r.id === id; }); };
DB.entry = function (id) { return DB.journal.find(function (j) { return j.id === id; }); };
DB.segment = function (id) { return DB.segments.find(function (s) { return s.id === id; }); };

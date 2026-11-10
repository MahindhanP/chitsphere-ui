/* =====================================================================
   Mock data for the prototype. Replace with API calls during build.
   ===================================================================== */
window.DB = {
  plans: [
    { id: 'starter', name: 'Starter', price: 14999, cycle: 'month', tagline: 'For single-branch foremen getting started',
      limits: { branches: 1, groups: 15, subscribers: 750, users: 5, storageGb: 10 },
      features: ['Your own member app on Android & iOS', 'Scheme & group management', 'Auction management', 'Collections & receipts', 'SMS notifications'],
      missing: ['Online bidding in app', 'Custom domain', 'API access'] },
    { id: 'growth', name: 'Growth', price: 39999, cycle: 'month', featured: true, tagline: 'For multi-branch chit companies',
      limits: { branches: 10, groups: 120, subscribers: 6000, users: 40, storageGb: 100 },
      features: ['Everything in Starter', 'Up to 10 branches', 'Online bidding in your app', 'Custom branding & theme', 'Online payment gateway'],
      missing: ['API access'] },
    { id: 'enterprise', name: 'Enterprise', price: 99999, cycle: 'month', tagline: 'For large, regulated chit fund networks',
      limits: { branches: 'Unlimited', groups: 'Unlimited', subscribers: 'Unlimited', users: 'Unlimited', storageGb: 1000 },
      features: ['Everything in Growth', 'Unlimited branches & groups', 'Custom domain', 'Publish under your own store accounts', 'API & webhook access', 'Dedicated success manager', '99.9% uptime SLA'],
      missing: [] }
  ],

  tenants: [
    { id: 'T-1001', name: 'Sri Venkata Chits Pvt. Ltd.', code: 'SVCPL', city: 'Hyderabad', state: 'Telangana', plan: 'growth', status: 'Active', branches: 7, groups: 84, subscribers: 4210, users: 31, mrr: 39999, renew: '2027-01-14', since: '2024-01-14', admin: 'Ravi Kumar', email: 'ravi@svchits.in', color: '#072E77' },
    { id: 'T-1002', name: 'Annapurna Chit Funds', code: 'ACF', city: 'Vijayawada', state: 'Andhra Pradesh', plan: 'enterprise', status: 'Active', branches: 22, groups: 260, subscribers: 15870, users: 118, mrr: 99999, renew: '2027-03-02', since: '2023-03-02', admin: 'Lakshmi Devi', email: 'admin@annapurnachits.com', color: '#047857' },
    { id: 'T-1003', name: 'Godavari Savings & Chits', code: 'GSC', city: 'Rajahmundry', state: 'Andhra Pradesh', plan: 'starter', status: 'Trial', branches: 1, groups: 6, subscribers: 210, users: 3, mrr: 0, renew: '2026-11-24', since: '2026-10-24', admin: 'Suresh Babu', email: 'suresh@godavarichits.in', color: '#0F766E' },
    { id: 'T-1004', name: 'Nandini Chit Fund Co.', code: 'NCF', city: 'Bengaluru', state: 'Karnataka', plan: 'growth', status: 'Active', branches: 5, groups: 61, subscribers: 3120, users: 22, mrr: 39999, renew: '2026-12-01', since: '2025-06-01', admin: 'Prakash Rao', email: 'prakash@nandinichits.co.in', color: '#5B21B6' },
    { id: 'T-1005', name: 'Shubham Chits Pvt. Ltd.', code: 'SHCPL', city: 'Chennai', state: 'Tamil Nadu', plan: 'growth', status: 'Past due', branches: 4, groups: 38, subscribers: 1980, users: 15, mrr: 39999, renew: '2026-11-02', since: '2025-02-02', admin: 'Meena S', email: 'accounts@shubhamchits.in', color: '#B42318' },
    { id: 'T-1006', name: 'Kanaka Chit Corporation', code: 'KCC', city: 'Guntur', state: 'Andhra Pradesh', plan: 'starter', status: 'Active', branches: 1, groups: 12, subscribers: 640, users: 4, mrr: 14999, renew: '2026-12-19', since: '2025-12-19', admin: 'Anil Reddy', email: 'anil@kanakachits.in', color: '#9A5B05' },
    { id: 'T-1007', name: 'Prabhat Chit Funds', code: 'PCF', city: 'Kochi', state: 'Kerala', plan: 'enterprise', status: 'Active', branches: 18, groups: 194, subscribers: 11240, users: 87, mrr: 99999, renew: '2027-05-11', since: '2024-05-11', admin: 'Joseph Mathew', email: 'it@prabhatchits.com', color: '#1F2937' },
    { id: 'T-1008', name: 'Tirumala Savings Chits', code: 'TSC', city: 'Tirupati', state: 'Andhra Pradesh', plan: 'starter', status: 'Suspended', branches: 1, groups: 9, subscribers: 380, users: 3, mrr: 0, renew: '2026-09-30', since: '2025-09-30', admin: 'Venu G', email: 'venu@tirumalachits.in', color: '#0F766E' },
    { id: 'T-1009', name: 'Sahyadri Chit Fund Ltd.', code: 'SCFL', city: 'Pune', state: 'Maharashtra', plan: 'growth', status: 'Active', branches: 6, groups: 72, subscribers: 3890, users: 27, mrr: 39999, renew: '2027-02-08', since: '2025-08-08', admin: 'Neha Kulkarni', email: 'neha@sahyadrichits.in', color: '#047857' },
    { id: 'T-1010', name: 'Kaveri Chits & Finance', code: 'KCF', city: 'Mysuru', state: 'Karnataka', plan: 'starter', status: 'Pending KYC', branches: 1, groups: 0, subscribers: 0, users: 1, mrr: 0, renew: '—', since: '2026-11-06', admin: 'Harish M', email: 'harish@kaverichits.in', color: '#5B21B6' }
  ],

  invoices: [
    { no: 'INV-2026-1142', tenant: 'T-1002', date: '2026-11-02', due: '2026-11-12', amount: 99999, status: 'Paid' },
    { no: 'INV-2026-1141', tenant: 'T-1007', date: '2026-11-01', due: '2026-11-11', amount: 99999, status: 'Paid' },
    { no: 'INV-2026-1140', tenant: 'T-1005', date: '2026-10-25', due: '2026-11-02', amount: 39999, status: 'Overdue' },
    { no: 'INV-2026-1139', tenant: 'T-1004', date: '2026-11-01', due: '2026-11-11', amount: 39999, status: 'Pending' },
    { no: 'INV-2026-1138', tenant: 'T-1001', date: '2026-10-14', due: '2026-10-24', amount: 39999, status: 'Paid' },
    { no: 'INV-2026-1137', tenant: 'T-1009', date: '2026-10-08', due: '2026-10-18', amount: 39999, status: 'Paid' },
    { no: 'INV-2026-1136', tenant: 'T-1006', date: '2026-10-19', due: '2026-10-29', amount: 14999, status: 'Paid' },
    { no: 'INV-2026-1135', tenant: 'T-1008', date: '2026-09-30', due: '2026-10-10', amount: 14999, status: 'Void' }
  ],

  /* ---------- Tenant-side data (for "Sri Venkata Chits") ---------- */
  branches: [
    { id: 'BR-01', name: 'Ameerpet (Head Office)', code: 'AMP', city: 'Hyderabad', manager: 'Ravi Kumar', phone: '+91 98480 11223', groups: 22, subscribers: 1210, status: 'Active' },
    { id: 'BR-02', name: 'Kukatpally', code: 'KKP', city: 'Hyderabad', manager: 'Sravani P', phone: '+91 98480 22334', groups: 16, subscribers: 820, status: 'Active' },
    { id: 'BR-03', name: 'Dilsukhnagar', code: 'DSN', city: 'Hyderabad', manager: 'Mahesh T', phone: '+91 98480 33445', groups: 14, subscribers: 730, status: 'Active' },
    { id: 'BR-04', name: 'Warangal', code: 'WGL', city: 'Warangal', manager: 'Kiran Rao', phone: '+91 98480 44556', groups: 12, subscribers: 610, status: 'Active' },
    { id: 'BR-05', name: 'Karimnagar', code: 'KNR', city: 'Karimnagar', manager: 'Padma L', phone: '+91 98480 55667', groups: 9, subscribers: 450, status: 'Active' },
    { id: 'BR-06', name: 'Nizamabad', code: 'NZB', city: 'Nizamabad', manager: 'Rajesh V', phone: '+91 98480 66778', groups: 7, subscribers: 270, status: 'Active' },
    { id: 'BR-07', name: 'Khammam', code: 'KMM', city: 'Khammam', manager: '—', phone: '—', groups: 4, subscribers: 120, status: 'Inactive' }
  ],

  schemes: [
    { id: 'SCH-001', name: 'Swarna 5L / 50M', chitValue: 500000, installments: 50, auctionType: 'Monthly', collection: 'BEFORE_AUCTION', minBid: 5, maxBid: 30, commission: 5, companyTicket: 1, enrollmentFee: 500, minMembersCC: 40, penaltyNPS: 2, penaltyPS: 3, penaltySF: 1, groups: 18, status: 'Active', created: '2024-02-10', color: '#9A5B05' },
    { id: 'SCH-002', name: 'Lakshmi 10L / 40M', chitValue: 1000000, installments: 40, auctionType: 'Monthly', collection: 'BEFORE_AUCTION', minBid: 5, maxBid: 30, commission: 5, companyTicket: 1, enrollmentFee: 1000, minMembersCC: 32, penaltyNPS: 2, penaltyPS: 3, penaltySF: 1, groups: 14, status: 'Active', created: '2024-03-05', color: '#072E77' },
    { id: 'SCH-003', name: 'Vasantha 2L / 20M', chitValue: 200000, installments: 20, auctionType: 'Monthly', collection: 'AFTER_AUCTION', minBid: 5, maxBid: 35, commission: 5, companyTicket: 1, enrollmentFee: 250, minMembersCC: 16, penaltyNPS: 1.5, penaltyPS: 2.5, penaltySF: 1, groups: 21, status: 'Active', created: '2024-04-18', color: '#047857' },
    { id: 'SCH-004', name: 'Weekly Saver 1L / 25W', chitValue: 100000, installments: 25, auctionType: 'Weekly', collection: 'BEFORE_AUCTION', minBid: 5, maxBid: 25, commission: 5, companyTicket: 1, enrollmentFee: 100, minMembersCC: 20, penaltyNPS: 1, penaltyPS: 2, penaltySF: 0.5, groups: 9, status: 'Active', created: '2025-01-11', color: '#0F766E' },
    { id: 'SCH-005', name: 'Mahalakshmi 25L / 50M', chitValue: 2500000, installments: 50, auctionType: 'Monthly', collection: 'BEFORE_AUCTION', minBid: 5, maxBid: 30, commission: 5, companyTicket: 1, enrollmentFee: 2500, minMembersCC: 40, penaltyNPS: 2, penaltyPS: 3, penaltySF: 1, groups: 6, status: 'Active', created: '2025-03-22', color: '#5B21B6' },
    { id: 'SCH-006', name: 'Bi-Monthly 3L / 30', chitValue: 300000, installments: 30, auctionType: 'Bi-Monthly', collection: 'AFTER_AUCTION', minBid: 5, maxBid: 30, commission: 5, companyTicket: 1, enrollmentFee: 300, minMembersCC: 24, penaltyNPS: 2, penaltyPS: 3, penaltySF: 1, groups: 4, status: 'Draft', created: '2026-10-30', color: '#B42318' },
    { id: 'SCH-007', name: 'Daily Deposit 50K / 100D', chitValue: 50000, installments: 100, auctionType: 'Daily', collection: 'BEFORE_AUCTION', minBid: 5, maxBid: 20, commission: 5, companyTicket: 1, enrollmentFee: 50, minMembersCC: 80, penaltyNPS: 0.5, penaltyPS: 1, penaltySF: 0.5, groups: 0, status: 'Inactive', created: '2025-07-01', color: '#1F2937' }
  ],

  /* Group lifecycle stages (from reference: substatus_master) */
  stages: [
    { code: 'GIS',  name: 'General Info',     desc: 'Group details & auction schedule' },
    { code: 'FDA',  name: 'FD Applied',       desc: 'Security deposit with bank' },
    { code: 'FDU',  name: 'FD Update',        desc: 'FD receipt & certificate' },
    { code: 'PSOA', name: 'PSO Applied',      desc: 'Previous Sanction Order request' },
    { code: 'PSOU', name: 'PSO Update',       desc: 'PSO number & certificate' },
    { code: 'ENRC', name: 'Enrolment',        desc: 'Minimum subscribers enrolled' },
    { code: 'CCA',  name: 'CC Applied',       desc: 'Commencement Certificate request' },
    { code: 'CCU',  name: 'CC Update',        desc: 'CC number & certificate' }
  ],

  groups: [
    { id: 'GRP-2411', name: 'SV-5L-A24', scheme: 'SCH-001', branch: 'BR-01', chitValue: 500000, tickets: 50, enrolled: 50, stage: 8, status: 'Running', auctionNo: 23, startDate: '2024-12-05', auctionDay: '5th, 11:00 AM', mode: 'Open Bid', label: 'Popular' },
    { id: 'GRP-2412', name: 'SV-10L-B24', scheme: 'SCH-002', branch: 'BR-02', chitValue: 1000000, tickets: 40, enrolled: 40, stage: 8, status: 'Running', auctionNo: 18, startDate: '2025-05-10', auctionDay: '10th, 4:00 PM', mode: 'Open Bid', label: 'Growth' },
    { id: 'GRP-2501', name: 'SV-2L-C25', scheme: 'SCH-003', branch: 'BR-03', chitValue: 200000, tickets: 20, enrolled: 20, stage: 8, status: 'Running', auctionNo: 9, startDate: '2026-02-15', auctionDay: '15th, 11:00 AM', mode: 'Open Bid', label: 'Trending' },
    { id: 'GRP-2602', name: 'SV-25L-D26', scheme: 'SCH-005', branch: 'BR-01', chitValue: 2500000, tickets: 50, enrolled: 34, stage: 5, status: 'Enrolling', auctionNo: 0, startDate: '2026-12-20', auctionDay: '20th, 5:00 PM', mode: 'Open Bid', label: 'Dividend' },
    { id: 'GRP-2603', name: 'SV-1LW-E26', scheme: 'SCH-004', branch: 'BR-04', chitValue: 100000, tickets: 25, enrolled: 25, stage: 7, status: 'CC Pending', auctionNo: 0, startDate: '2026-11-25', auctionDay: 'Every Wed, 6:00 PM', mode: 'Fixed Bid', label: 'Popular' },
    { id: 'GRP-2604', name: 'SV-5L-F26', scheme: 'SCH-001', branch: 'BR-05', chitValue: 500000, tickets: 50, enrolled: 0, stage: 3, status: 'PSO Pending', auctionNo: 0, startDate: '2027-01-05', auctionDay: '5th, 11:00 AM', mode: 'Open Bid', label: 'Growth' },
    { id: 'GRP-2605', name: 'SV-10L-G26', scheme: 'SCH-002', branch: 'BR-02', chitValue: 1000000, tickets: 40, enrolled: 0, stage: 1, status: 'FD Pending', auctionNo: 0, startDate: '2027-01-10', auctionDay: '10th, 4:00 PM', mode: 'Open Bid', label: 'Growth' },
    { id: 'GRP-2606', name: 'SV-2L-H26', scheme: 'SCH-003', branch: 'BR-06', chitValue: 200000, tickets: 20, enrolled: 0, stage: 0, status: 'Draft', auctionNo: 0, startDate: '2027-02-15', auctionDay: '15th, 11:00 AM', mode: 'Open Bid', label: 'Trending' },
    { id: 'GRP-2301', name: 'SV-5L-Z23', scheme: 'SCH-001', branch: 'BR-01', chitValue: 500000, tickets: 50, enrolled: 50, stage: 8, status: 'Closed', auctionNo: 50, startDate: '2022-09-05', auctionDay: '5th, 11:00 AM', mode: 'Open Bid', label: 'Popular' }
  ],

  users: [
    { name: 'Ravi Kumar', email: 'ravi@svchits.in', role: 'Tenant Admin', branch: 'All branches', status: 'Active', last: '2 min ago' },
    { name: 'Sravani P', email: 'sravani@svchits.in', role: 'Branch Manager', branch: 'Kukatpally', status: 'Active', last: '1 hr ago' },
    { name: 'Mahesh T', email: 'mahesh@svchits.in', role: 'Branch Manager', branch: 'Dilsukhnagar', status: 'Active', last: 'Yesterday' },
    { name: 'Anusha R', email: 'anusha@svchits.in', role: 'Accountant', branch: 'Ameerpet (HO)', status: 'Active', last: '3 hr ago' },
    { name: 'Vamshi K', email: 'vamshi@svchits.in', role: 'Collection Agent', branch: 'Warangal', status: 'Active', last: '20 min ago' },
    { name: 'Divya S', email: 'divya@svchits.in', role: 'Auction Officer', branch: 'Ameerpet (HO)', status: 'Invited', last: '—' },
    { name: 'Naresh B', email: 'naresh@svchits.in', role: 'Collection Agent', branch: 'Karimnagar', status: 'Disabled', last: '42 days ago' }
  ],

  roles: ['Tenant Admin', 'Branch Manager', 'Accountant', 'Auction Officer', 'Collection Agent', 'Read only'],

  members: [
    { ticket: 1, name: 'Company Ticket', phone: '—', branch: 'Ameerpet (HO)', kyc: 'Verified', status: 'Non-prized' },
    { ticket: 2, name: 'Srinivas Reddy', phone: '+91 90000 10002', branch: 'Ameerpet (HO)', kyc: 'Verified', status: 'Prized' },
    { ticket: 3, name: 'Kavitha M', phone: '+91 90000 10003', branch: 'Kukatpally', kyc: 'Verified', status: 'Non-prized' },
    { ticket: 4, name: 'Ramesh Goud', phone: '+91 90000 10004', branch: 'Ameerpet (HO)', kyc: 'Verified', status: 'Prized' },
    { ticket: 5, name: 'Sunitha K', phone: '+91 90000 10005', branch: 'Dilsukhnagar', kyc: 'Pending', status: 'Non-prized' },
    { ticket: 6, name: 'Venkatesh P', phone: '+91 90000 10006', branch: 'Ameerpet (HO)', kyc: 'Verified', status: 'Non-prized' },
    { ticket: 7, name: 'Madhavi L', phone: '+91 90000 10007', branch: 'Kukatpally', kyc: 'Verified', status: 'Prized' },
    { ticket: 8, name: 'Prasad Ch', phone: '+91 90000 10008', branch: 'Ameerpet (HO)', kyc: 'Verified', status: 'Non-prized' }
  ],

  activity: [
    { who: 'Annapurna Chit Funds', what: 'upgraded to <b>Enterprise</b>', when: '2 hours ago', tone: 'ok' },
    { who: 'Kaveri Chits & Finance', what: 'signed up — awaiting KYC documents', when: '4 days ago', tone: 'warn' },
    { who: 'Shubham Chits Pvt. Ltd.', what: 'invoice INV-2026-1140 is <b>overdue</b>', when: '8 days ago', tone: 'warn' },
    { who: 'Godavari Savings & Chits', what: 'started a 30-day trial on Starter', when: '17 days ago', tone: '' },
    { who: 'Tirumala Savings Chits', what: 'was <b>suspended</b> for non-payment', when: '41 days ago', tone: 'muted' }
  ]
};

/* Workspace slug (subdomain) + short brand name per organisation */
(function () {
  var slugs = { 'T-1001': 'svchits', 'T-1002': 'annapurna', 'T-1003': 'godavari', 'T-1004': 'nandini', 'T-1005': 'shubham', 'T-1006': 'kanaka', 'T-1007': 'prabhat', 'T-1008': 'tirumala', 'T-1009': 'sahyadri', 'T-1010': 'kaveri' };
  DB.tenants.forEach(function (t) {
    t.slug = slugs[t.id];
    t.short = t.name.replace(/\s+(Pvt|Ltd|Co)\.?(?=\s|$)/g, '').trim();
  });
})();

/* Each organisation gets its OWN member app, built from one codebase and
   published to Play Store / App Store under the organisation's name. */
DB.APP_STAGES = ['Store details', 'Assets', 'Build', 'Store review', 'Live'];
DB.apps = [
  { tenant: 'T-1001', appName: 'Sri Venkata Chits', pkg: 'in.svchits.member', bundle: 'in.svchits.member', account: 'ChitSphere', version: '2.4.0', android: 'Live', ios: 'Live', stage: 4, installs: 2846, rating: 4.6, updated: '2026-11-02' },
  { tenant: 'T-1002', appName: 'Annapurna Chits', pkg: 'com.annapurnachits.app', bundle: 'com.annapurnachits.app', account: 'Own', version: '2.4.0', android: 'Live', ios: 'Live', stage: 4, installs: 10420, rating: 4.4, updated: '2026-11-03' },
  { tenant: 'T-1003', appName: 'Godavari Chits', pkg: 'in.godavarichits.member', bundle: 'in.godavarichits.member', account: 'ChitSphere', version: '2.4.0', android: 'In review', ios: 'Building', stage: 2, installs: 0, rating: null, updated: '2026-11-09' },
  { tenant: 'T-1004', appName: 'Nandini Chits', pkg: 'in.nandinichits.member', bundle: 'in.nandinichits.member', account: 'ChitSphere', version: '2.3.2', android: 'Live', ios: 'Live', stage: 4, installs: 1910, rating: 4.5, updated: '2026-10-12', updateAvailable: true },
  { tenant: 'T-1005', appName: 'Shubham Chits', pkg: 'in.shubhamchits.member', bundle: 'in.shubhamchits.member', account: 'ChitSphere', version: '2.4.0', android: 'Live', ios: 'Live', stage: 4, installs: 1204, rating: 4.2, updated: '2026-11-02' },
  { tenant: 'T-1006', appName: 'Kanaka Chits', pkg: 'in.kanakachits.member', bundle: 'in.kanakachits.member', account: 'ChitSphere', version: '2.4.0', android: 'Live', ios: 'Rejected', stage: 3, installs: 388, rating: 4.7, updated: '2026-11-05', note: 'Apple: Guideline 4.3 — add organisation-specific content to the listing' },
  { tenant: 'T-1007', appName: 'Prabhat Chits', pkg: 'com.prabhatchits.member', bundle: 'com.prabhatchits.member', account: 'Own', version: '2.4.0', android: 'Live', ios: 'Live', stage: 4, installs: 7650, rating: 4.6, updated: '2026-11-01' },
  { tenant: 'T-1008', appName: 'Tirumala Chits', pkg: 'in.tirumalachits.member', bundle: 'in.tirumalachits.member', account: 'ChitSphere', version: '2.2.0', android: 'Unpublished', ios: 'Unpublished', stage: 4, installs: 240, rating: 4.1, updated: '2026-09-30' },
  { tenant: 'T-1009', appName: 'Sahyadri Chits', pkg: 'in.sahyadrichits.member', bundle: 'in.sahyadrichits.member', account: 'ChitSphere', version: '2.4.0', android: 'Live', ios: 'In review', stage: 3, installs: 2210, rating: 4.5, updated: '2026-11-07' },
  { tenant: 'T-1010', appName: 'Kaveri Chits', pkg: 'in.kaverichits.member', bundle: 'in.kaverichits.member', account: 'ChitSphere', version: '—', android: 'Not started', ios: 'Not started', stage: 0, installs: 0, rating: null, updated: '—', note: 'Waiting for KYC approval' }
];
DB.app = function (tenantId) { return DB.apps.find(function (a) { return a.tenant === tenantId; }); };

/* Self-service registration requests awaiting platform review */
DB.registrations = [
  { id: 'REG-0421', name: 'Kaveri Chits & Finance', city: 'Mysuru', state: 'Karnataka', regNo: 'RC/MYS/2018/0331', pan: 'AAKCK4410M', gstin: '29AAKCK4410M1Z2', admin: 'Harish M', email: 'harish@kaverichits.in', mobile: '+91 98450 22110', slug: 'kaveri', plan: 'starter', submitted: '2026-11-06', docs: 4, status: 'In review', note: 'GST certificate is blurry — re-upload requested' },
  { id: 'REG-0422', name: 'Malnad Chit Funds Pvt. Ltd.', city: 'Shivamogga', state: 'Karnataka', regNo: 'RC/SMG/2015/0117', pan: 'AAFCM9902Q', gstin: '29AAFCM9902Q1Z9', admin: 'Shreyas Bhat', email: 'shreyas@malnadchits.com', mobile: '+91 94480 33219', slug: 'malnad', plan: 'growth', submitted: '2026-11-08', docs: 4, status: 'New', note: '' },
  { id: 'REG-0423', name: 'Krishna Valley Chits', city: 'Nellore', state: 'Andhra Pradesh', regNo: 'RC/NLR/2020/0088', pan: 'AAHCK1207D', gstin: '', admin: 'Bhargav R', email: 'bhargav@kvchits.in', mobile: '+91 99890 44012', slug: 'kvchits', plan: 'starter', submitted: '2026-11-09', docs: 3, status: 'New', note: '' },
  { id: 'REG-0419', name: 'Vaigai Savings Chits', city: 'Madurai', state: 'Tamil Nadu', regNo: 'RC/MDU/2017/0215', pan: 'AAJCV3381H', gstin: '33AAJCV3381H1Z0', admin: 'Karthik S', email: 'karthik@vaigaichits.in', mobile: '+91 98940 55021', slug: 'vaigai', plan: 'growth', submitted: '2026-11-01', docs: 4, status: 'Approved', note: '' },
  { id: 'REG-0417', name: 'Quick Rich Chits', city: 'Unknown', state: '—', regNo: '—', pan: 'AAAAA0000A', gstin: '', admin: 'R K', email: 'rk@mailinator.com', mobile: '+91 90000 00000', slug: 'quickrich', plan: 'starter', submitted: '2026-10-28', docs: 1, status: 'Rejected', note: 'No valid chit registration certificate' }
];

/* Member (subscriber) view used by the mobile app prototype */
DB.member = {
  name: 'Kavitha M', mobile: '+91 90000 10003', id: 'MEM-10293', kyc: 'Verified', branch: 'Kukatpally',
  chits: [
    { group: 'GRP-2411', ticket: 3, paid: 23, total: 50, due: 10000, dueDate: '2026-12-05', status: 'Non-prized', dividendLast: 1240, nextAuction: '2026-12-05T11:00' },
    { group: 'GRP-2501', ticket: 7, paid: 9, total: 20, due: 8650, dueDate: '2026-11-15', status: 'Prized', prize: 158000, dividendLast: 1350, nextAuction: '2026-11-15T11:00' }
  ],
  receipts: [
    { no: 'RC-2026-00841', date: '2026-11-04', group: 'SV-5L-A24', amount: 8760, mode: 'UPI' },
    { no: 'RC-2026-00792', date: '2026-10-14', group: 'SV-2L-C25', amount: 8650, mode: 'UPI' },
    { no: 'RC-2026-00733', date: '2026-10-04', group: 'SV-5L-A24', amount: 8810, mode: 'Cash · Kukatpally' },
    { no: 'RC-2026-00688', date: '2026-09-15', group: 'SV-2L-C25', amount: 8700, mode: 'UPI' }
  ]
};

/* Helpers to look things up */
DB.tenantBySlug = function (s) { return DB.tenants.find(function (t) { return t.slug === String(s || '').toLowerCase(); }); };
DB.plan = function (id) { return DB.plans.find(function (p) { return p.id === id; }); };
DB.tenant = function (id) { return DB.tenants.find(function (t) { return t.id === id; }); };
DB.scheme = function (id) { return DB.schemes.find(function (s) { return s.id === id; }); };
DB.branch = function (id) { return DB.branches.find(function (b) { return b.id === id; }); };
DB.group = function (id) { return DB.groups.find(function (g) { return g.id === id; }); };

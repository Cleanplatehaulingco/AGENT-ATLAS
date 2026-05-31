'use strict';
/* ─── Storage ──────────────────────────────────────────────────────── */
const STORAGE_KEY = 'agentAtlasV3';

/* ─── Etsy-ready copy library ──────────────────────────────────────── */
const ETSY_COPY = {
  'LS-001': {
    title: 'HVAC Service Call Notes Template – Editable PDF for Technicians | Instant Download',
    tags:  'hvac template,service call form,editable pdf,technician notes,hvac paperwork,field service form,hvac business,service invoice,technician log,hvac tools,small business form,contractor template,work order form',
    desc:  `Stop losing job details between the truck and the office.\n\nThis professional HVAC service call notes template gives owner-operators and solo techs a clean, repeatable system for every visit — equipment info, readings, parts used, follow-up needed, and customer sign-off all in one place.\n\n✅ Fully editable in Canva (free account)\n✅ Print-ready PDF included\n✅ Instant digital download — no waiting\n✅ Works for residential and commercial calls\n✅ Reuse unlimited times\n\nPerfect for: owner-operator HVAC techs, small HVAC companies (1–5 trucks), and anyone tired of scrap paper job notes.\n\n→ Download, customize your logo, and start using today.`,
    faq:   'Q: Can I add my company logo?\nA: Yes. The Canva template has a logo placeholder — just click and upload.\n\nQ: Is this print-ready?\nA: Yes. Export from Canva as PDF Print for crisp results.',
    imagePrompt: 'Premium dark-desk flatlay: HVAC service call form on clipboard, clean workbench background, warm professional lighting, no text overlay.'
  },
  'LS-002': {
    title: 'Plumbing Dispatch & Diagnosis Checklist – Editable Template for Plumbers | Instant Download',
    tags:  'plumbing checklist,dispatch form,plumbing template,diagnosis checklist,plumbing business,service form,plumber paperwork,work order,field service,small business form,contractor checklist,plumbing tools,job tracker',
    desc:  `Streamline every call from dispatch to close-out.\n\nDesigned for small plumbing teams and owner-operators, this dispatch and diagnosis checklist captures the information that matters — job type, symptom description, parts checked, repair completed, and follow-up work — in a format your whole team can use consistently.\n\n✅ Editable in Canva — free account works\n✅ Print-ready and digital-fill versions included\n✅ Instant download, unlimited reprints\n✅ Works for emergency calls, scheduled maintenance, and new installs\n\nStop recreating paperwork from scratch after every job.`,
    faq:   'Q: Can my dispatcher use this digitally on a tablet?\nA: Yes. The PDF version supports digital form fill on most tablet apps.\n\nQ: Does it include space for parts tracking?\nA: Yes — there\'s a dedicated parts/materials section.',
    imagePrompt: 'Blue-collar office aesthetic: plumbing dispatch checklist on metal clipboard, subtle pipe and tool background elements, cool-toned professional lighting.'
  },
  'LS-003': {
    title: 'Electrician Jobsite Inspection Form – Editable Field Checklist | Instant Download',
    tags:  'electrician form,jobsite inspection,electrical checklist,electrician template,field inspection,electrical paperwork,contractor form,small business,electrician tools,site walkthrough,electrical business,service form,work order',
    desc:  `A clean, professional jobsite inspection form built for working electricians.\n\nCaptures panel info, circuit checks, hazard flags, code notes, and customer sign-off in a single page. Use it for pre-work walkthroughs, final inspections, or ongoing site documentation.\n\n✅ Editable in Canva (free)\n✅ Print-ready PDF\n✅ Works for residential, commercial, and industrial sites\n✅ Instant download\n\nBuilt by an operator who knows you don't have time for complicated paperwork.`,
    faq:   'Q: Can I use this for residential and commercial?\nA: Yes — the form is niche-generic enough for both.\n\nQ: Is there a digital-fill version?\nA: Yes, the PDF version is form-fillable.',
    imagePrompt: 'Electrician jobsite aesthetic: clean inspection checklist on aluminum clipboard, subtle electrical panel background, crisp overhead lighting.'
  },
  'LS-004': {
    title: 'Lawn Care Weekly Crew Planner – Editable Route Sheet for Lawn Businesses | Instant Download',
    tags:  'lawn care planner,crew route sheet,lawn business template,weekly planner,lawn route,crew schedule,lawn care form,landscaping template,lawn operator,route planner,small business form,lawn crew tracker,weekly schedule',
    desc:  `Plan your crew's week in 10 minutes flat.\n\nThis weekly crew planner gives lawn route managers a single-page view of all stops, service types, crew assignments, and notes — no more back-and-forth texts or missed stops.\n\n✅ Editable in Canva (free)\n✅ Print one page per week, per crew\n✅ Customizable route columns and crew slots\n✅ Instant download\n✅ Scales from 1 to 5 crews\n\nOwner-operators use this Sunday night to set the week. Crew leads take it to the truck Monday morning.`,
    faq:   'Q: Can I add more stop rows?\nA: Yes — Canva lets you duplicate rows to any length.\n\nQ: Does this work for multiple crews?\nA: Print one sheet per crew. Many customers do this.',
    imagePrompt: 'Lawn care operations: weekly route planner on clipboard, green-toned professional background, clean and modern flatlay composition.'
  },
  'LS-005': {
    title: 'Auto Detail Intake Form + Damage Waiver Kit – Editable Template | Instant Download',
    tags:  'auto detail intake,damage waiver,detailing template,mobile detail form,car detail paperwork,detail business,intake form,auto detailing,waiver template,client intake,mobile detailer,small business form,detailing contract',
    desc:  `Protect yourself and look professional from the first touchpoint.\n\nThis two-piece kit includes a client intake form (vehicle info, service selections, special requests) and a pre-service damage waiver — the paperwork every mobile detailer needs before touching a car.\n\n✅ Editable in Canva (free)\n✅ Print-ready and digital versions\n✅ Legally-flavored waiver language (consult your attorney to finalize)\n✅ Instant download\n✅ Works for mobile and shop-based detailers\n\nLook like a real business. Protect your work. Start using it today.`,
    faq:   'Q: Is the waiver language legally binding?\nA: It is written to be used as a starting point. We recommend having a local attorney review before use.\n\nQ: Can I add a price list to the intake form?\nA: Yes — there is an open section in Canva for service menu customization.',
    imagePrompt: 'Luxury auto detailing: intake form and waiver kit on dark leather surface, subtle high-end car interior background, warm premium lighting.'
  },
};

function getEtsyCopy(listingId, listing) {
  const c = ETSY_COPY[listingId];
  if (c) return c;
  const niche = listing.category || listing.niche || 'Service Business';
  const name  = listing.title || listing.name;
  const tags  = `${niche.toLowerCase()} template,service form,editable pdf,small business,contractor form,${niche.toLowerCase()} business,instant download,work order,field service,back office,printable template,business template,owner operator`;
  return {
    title: `${name} – Editable Template for ${niche} Businesses | Instant Download`,
    tags,
    desc:  `A professional, ready-to-use template for ${niche} owner-operators and small teams.\n\nDesigned to save you time on paperwork so you can focus on the job.\n\n✅ Fully editable in Canva (free account)\n✅ Print-ready PDF included\n✅ Instant digital download\n✅ Unlimited reprints\n\nStart using it today — no design skills needed.`,
    faq:   'Q: Can I edit this template?\nA: Yes. The Canva link is included. No design experience needed.\n\nQ: Is this a physical product?\nA: No. This is an instant digital download.',
    imagePrompt: `Premium ${niche.toLowerCase()} operations template mockup, clean desk flatlay, professional lighting, no text overlay.`,
  };
}

/* ─── Seed ─────────────────────────────────────────────────────────── */
const SEED = {
  startedAt: Date.now() - (12 * 86400000), // 12 days ago
  autoPilot: false,
  selectedListingId: 'LS-001',
  agents: [
    { id:'atlas',       name:'Atlas',              role:'Operator Overseer',       mastery:92, trend:4,  focus:'Coordinates every agent, audits decisions, and raises owner approval gates.',                    directive:'Keep the system moving toward $500 without unsafe publishing.' },
    { id:'opportunity', name:'Opportunity Agent',  role:'Market Scout',            mastery:84, trend:6,  focus:'Scores service-business template ideas by speed, simplicity, niche fit, and bundle potential.', directive:'Find fast-to-build offers with bundle paths.' },
    { id:'listing',     name:'Listing Agent',      role:'Etsy Conversion Writer',  mastery:81, trend:5,  focus:'Turns product ideas into SEO titles, tags, descriptions, FAQs, and image prompts.',              directive:'Improve clarity and buyer specificity before approval.' },
    { id:'bundle',      name:'Bundle Agent',       role:'Offer Architect',         mastery:78, trend:3,  focus:'Combines single templates into higher-ticket packs and pricing ladders.',                        directive:'Increase average order value without adding owner workload.' },
    { id:'performance', name:'Performance Agent',  role:'Revenue Analyst',         mastery:86, trend:7,  focus:'Identifies winners, underperformers, and revenue pacing risk.',                                 directive:'Protect the 45-day revenue goal with simple listing tests.' },
    { id:'approval',    name:'Approval Agent',     role:'Risk Gatekeeper',         mastery:88, trend:4,  focus:'Routes important changes to the owner and prevents external publishing without approval.',        directive:'Never allow publish actions to bypass owner approval.' },
  ],
  learningLog: [
    { agent:'Atlas',             lesson:'Approval bottlenecks are the single biggest drag on revenue — clear the queue first.', time:'09:18' },
    { agent:'Listing Agent',     lesson:'Buyer-specific titles ("for HVAC techs") outperform generic wording by 2–3× on Etsy.', time:'09:02' },
    { agent:'Performance Agent', lesson:'Winners at 3%+ CVR should be bundled immediately to capture average order value gains.', time:'08:41' },
  ],
  successPlan: [
    { id:'focus',      title:'Narrow to 5 highest-intent trade niches',       owner:'Opportunity Agent',  impact:8, status:'queued', action:'Filter backlog to simple, urgent, service-business paperwork with clear buyer pain.' },
    { id:'volume',     title:'Reach 12 ready-to-upload listings fast',         owner:'Listing Agent',      impact:7, status:'queued', action:'Convert best opportunities into draft listings and move polished ones into approval.' },
    { id:'bundles',    title:'Create 3 bundle ladders before launch',          owner:'Bundle Agent',       impact:6, status:'queued', action:'Package singles into starter, pro, and vault offers to raise average order value.' },
    { id:'conversion', title:'Upgrade every listing with buyer-specific copy', owner:'Listing Agent',      impact:5, status:'queued', action:'Tighten titles, tags, first-image promise, FAQ, and description for each buyer segment.' },
    { id:'feedback',   title:'Run daily Atlas review and loser refresh loop',  owner:'Performance Agent',  impact:4, status:'queued', action:'Refresh underperformers quickly and double down on winners.' },
  ],
  launchAgents: [
    { id:'trend',    name:'Trend Scout Agent',         role:'Demand Validation',      priority:'High',   status:'needed', why:'Prevents building templates nobody searches for by ranking Etsy keyword and buyer-intent signals.' },
    { id:'creative', name:'Creative Production Agent', role:'Mockup + Asset Builder', priority:'High',   status:'needed', why:'Turns approved listings into polished preview images, PDF covers, and bundle graphics fast.' },
    { id:'qa',       name:'Quality Control Agent',     role:'Template QA',            priority:'High',   status:'needed', why:'Checks files, naming, delivery ZIPs, instructions, and buyer usability before upload.' },
    { id:'pricing',  name:'Pricing & ROI Agent',       role:'Capital Allocation',     priority:'Medium', status:'needed', why:'Chooses when ad spend, mockup assets, or research tools are worth funding.' },
    { id:'policy',   name:'Policy Compliance Agent',   role:'Marketplace Guardrails', priority:'Medium', status:'needed', why:'Reviews listing claims, digital-delivery language, and marketplace-safe wording before approval.' },
  ],
  investmentPlan: [
    { id:'lean',    label:'Lean Launch',    spend:0,   projected:500,  confidence:45, roi:'Baseline',          use:'Manual-quality launch using only current seeded workflow.' },
    { id:'starter', label:'Starter Boost',  spend:150, projected:650,  confidence:58, roi:'~1.0× incremental', use:'Mockup assets, listing validation, and small Etsy Ads tests after approvals.' },
    { id:'growth',  label:'Focused Growth', spend:300, projected:900,  confidence:68, roi:'~1.3× incremental', use:'Better creative, faster product volume, and controlled ad learning budget.' },
    { id:'push75',  label:'75+ Push',       spend:500, projected:1250, confidence:76, roi:'~1.5× incremental', use:'Full pre-launch agent stack, stronger creative, bundle production, and measured traffic tests.' },
  ],
  opportunities: [
    ['HVAC Service Call Debrief Sheet','HVAC',2,8.8,8,'Best Now'],
    ['Plumbing No-Heat Diagnostic Checklist','Plumbing',3,8.5,9,'Best Now'],
    ['Electrician Jobsite Walkthrough Form','Electrical',4,8.3,8,'Easiest'],
    ['Pressure Washing Route Sheet','Exterior Cleaning',1,8.5,7,'Easiest'],
    ['Auto Detail Intake + Damage Waiver','Auto Detailing',2,8.8,9,'Bundle'],
    ['Lawn Care Weekly Crew Plan','Lawn Care',1,8.8,8,'Seasonal'],
    ['Septic Service Pump Log','Septic',5,7.5,7,'Seasonal'],
    ['Appliance Repair Parts Tracker','Appliance',3,8.3,9,'Bundle'],
    ['Handyman Materials Reimbursement','Handyman',1,8.3,7,'Easiest'],
    ['Pest Control Follow-Up Card','Pest Control',1,8.8,8,'Best Now'],
    ['Roofing Change-Order Pack','Roofing',5,8.3,10,'Bundle'],
    ['Window Cleaning Client Packet','Window Cleaning',2,8.0,8,'Seasonal'],
    ['Snow Removal Trigger Checklist','Snow Removal',2,8.3,8,'Seasonal'],
    ['Mobile Mechanic Service Summary','Mobile Mechanic',3,8.3,9,'Best Now'],
    ['Locksmith Job Authorization','Locksmith',2,8.3,8,'Best Now'],
    ['Painting Prep & Punch List','Painting',2,8.8,9,'Bundle'],
    ['Pool Service Chemical Log','Pool Service',3,8.0,8,'Seasonal'],
    ['Flooring Estimate Scope Matrix','Flooring',4,8.0,9,'Bundle'],
    ['Generic Service Fee Addendum','Multi-Trade',2,8.0,7,'Best Now'],
    ['Contractor Daily Site Report','Contracting',4,8.3,10,'Bundle'],
  ].map((o, i) => ({
    id: `OP-${String(i + 1).padStart(3,'0')}`,
    title: o[0], niche: o[1], difficulty: o[2], score: o[3], bundle: o[4],
    status: i % 3 === 0 ? 'Ready' : i % 3 === 1 ? 'Draft' : 'Review',
    filter: o[5], archived: false,
  })),
  listings: [
    { id:'LS-001', name:'HVAC Tech Service Call Notes Template',   price:7.99,  buyer:'Owner-Operator HVAC Tech',  bundle:'HVAC Starter Pack',     perf:'Winner', status:'live',            category:'HVAC',           views:142, cvr:3.5, revenue:39.95 },
    { id:'LS-002', name:'Plumbing Dispatch & Diagnosis Checklist', price:11.99, buyer:'Small Plumbing Teams',       bundle:'Plumbing Ops Kit',      perf:'Winner', status:'live',            category:'Plumbing',       views:126, cvr:3.2, revenue:47.96 },
    { id:'LS-003', name:'Electrician Jobsite Inspection Form Pack',price:9.99,  buyer:'Solo Electricians',          bundle:'Electrical Admin Bundle',perf:'Stable', status:'live',            category:'Electrical',     views:98,  cvr:2.0, revenue:19.98 },
    { id:'LS-004', name:'Lawn Care Weekly Crew Planner',           price:6.99,  buyer:'Lawn Route Managers',        bundle:'Lawn Backoffice Kit',    perf:'Winner', status:'live',            category:'Lawn Care',      views:171, cvr:4.1, revenue:48.93 },
    { id:'LS-005', name:'Auto Detail Intake + Waiver Kit',         price:12.99, buyer:'Mobile Detail Owners',       bundle:'Detailing Client Ops',   perf:'Stable', status:'live',            category:'Auto Detailing', views:84,  cvr:2.4, revenue:25.98 },
    { id:'LS-006', name:'Pest Control Follow-Up Card Templates',   price:5.99,  buyer:'Pest Control Teams',         bundle:'Pest Retention Pack',    perf:'N/A',    status:'draft',           category:'Pest Control',   views:0,   cvr:0,   revenue:0 },
    { id:'LS-007', name:'Roofing Change Order + Approval Form',    price:14.99, buyer:'Roofing Contractors',        bundle:'Roofing Scope Pack',     perf:'N/A',    status:'ready to upload', category:'Roofing',        views:0,   cvr:0,   revenue:0 },
  ],
  approvals: [
    { id:'AP-001', type:'Publish Listing', item:'Roofing Change Order + Approval Form', listingId:'LS-007', why:'Strong bundle lift projected at +22%. Confidence based on comparable roofing templates ranking in top 50 Etsy results.', conf:0.84, agent:'Approval Agent', important:true, status:'pending', archived:false, createdAt:'09:10', history:[] },
    { id:'AP-002', type:'Price Increase',  item:'Lawn Care Weekly Crew Planner',        listingId:'LS-004', why:'4.1% CVR is well above niche average of 2.1%. A $1 price increase to $7.99 is supported by demand signal.',              conf:0.78, agent:'Performance Agent', important:true, status:'pending', archived:false, createdAt:'09:05', history:[] },
  ],
  activity: [
    { msg:'Opportunity Agent scored 4 new bundle candidates — Roofing, Painting, Flooring, Appliance.', time:'09:12' },
    { msg:'Listing Agent generated Etsy SEO copy for LS-006 and queued for approval.', time:'08:47' },
    { msg:'Performance Agent flagged LS-004 for pricing test — CVR 4.1% supports $7.99 ask.', time:'08:15' },
  ],
};

/* ─── Autonomous agent scripts ─────────────────────────────────────── */
const AUTO_EVENTS = [
  () => { logAction('Opportunity Agent re-scored backlog — OP-010 and OP-016 moved to top 5 priority.'); nudgeAgent('opportunity'); },
  () => { logAction('Listing Agent polished Etsy title for LS-003 — keyword density improved to 7 targets.'); nudgeAgent('listing'); },
  () => { logAction('Performance Agent reviewed 7d metrics — LS-004 CVR holding at 4.1%, Winner status confirmed.'); nudgeAgent('performance'); },
  () => { logAction('Bundle Agent drafted "Trades Starter Pack" combining LS-001, LS-002, LS-004 at $24.99.'); nudgeAgent('bundle'); },
  () => { logAction('Approval Agent confirmed no high-risk actions in queue — compliance gate is clear.'); nudgeAgent('approval'); },
  () => { logAction('Atlas cross-checked all agents — no conflicts, revenue pacing within 8% of target.'); nudgeAgent('atlas'); },
  () => { logAction('Opportunity Agent identified "Mobile Mechanic Inspection Sheet" as next fast-build — difficulty 2/5.'); nudgeAgent('opportunity'); },
  () => { logAction('Listing Agent found that LS-005 description is missing a buyer pain statement — flagged for update.'); nudgeAgent('listing'); },
  () => { logAction('Performance Agent flagged LS-003 as underperformer — 2.0% CVR, recommends title refresh.'); nudgeAgent('performance'); },
  () => { logAction('Bundle Agent calculated $49.99 vault bundle would add $147 to 45-day projection at 3 units/week.'); nudgeAgent('bundle'); },
];
let autoEventIdx = 0;

function nudgeAgent(id) {
  const ag = state.agents.find(a => a.id === id);
  if (ag) { ag.mastery = Math.min(99, ag.mastery + 1); ag.trend += 1; }
}

/* ─── State ────────────────────────────────────────────────────────── */
let state = loadState();
ensureShape();
let autoPilotInterval = null;

function loadState() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : clone(SEED); }
  catch { return clone(SEED); }
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function clone(x)  { return JSON.parse(JSON.stringify(x)); }
function nowTs()   { return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }); }

function ensureShape() {
  const s = state;
  if (!s.startedAt)         s.startedAt  = SEED.startedAt;
  if (s.autoPilot == null)  s.autoPilot  = false;
  if (!s.selectedListingId) s.selectedListingId = s.listings?.[0]?.id || null;
  if (!s.agents)            s.agents       = clone(SEED.agents);
  if (!s.learningLog)       s.learningLog  = clone(SEED.learningLog);
  if (!s.successPlan)       s.successPlan  = clone(SEED.successPlan);
  if (!s.launchAgents)      s.launchAgents = clone(SEED.launchAgents);
  if (!s.investmentPlan)    s.investmentPlan = clone(SEED.investmentPlan);
  s.listings.forEach(l => {
    if (l.views   == null) l.views   = 0;
    if (l.cvr     == null) l.cvr     = 0;
    if (l.revenue == null) l.revenue = 0;
    if (!l.category) l.category = l.niche || '';
  });
  s.approvals.forEach(a => { a.history = a.history || []; a.createdAt = a.createdAt || nowTs(); });
}

function logAction(msg) { state.activity.unshift({ msg, time: nowTs() }); state.activity = state.activity.slice(0, 40); }

/* ─── Computations ─────────────────────────────────────────────────── */
function daysElapsed()    { return Math.floor((Date.now() - state.startedAt) / 86400000); }
function daysRemaining()  { return Math.max(0, 45 - daysElapsed()); }
function currentRevenue() { return state.listings.filter(l => l.status === 'live').reduce((s, l) => s + (l.revenue || l.price * 4), 0); }
function dailyPaceNeeded(){ const rem = daysRemaining(); return rem > 0 ? (500 - currentRevenue()) / rem : 0; }
function estimateMonthly(){ return state.listings.filter(l => ['live','ready to upload'].includes(l.status)).reduce((s, l) => s + l.price * (l.status === 'live' ? 8 : 3), 0); }
function successProb()    { return Math.min(90, 45 + state.successPlan.filter(l => l.status !== 'queued').reduce((s, l) => s + l.impact, 0)); }
function isOnPace()       { const e = daysElapsed(); return e === 0 ? true : (currentRevenue() / e) >= (500 / 45); }

function launchReadiness() {
  const activeAgents    = state.launchAgents.filter(a => a.status === 'active').length;
  const activeLevers    = state.successPlan.filter(l => l.status === 'active').length;
  const readyListings   = state.listings.filter(l => ['ready to upload','live'].includes(l.status)).length;
  const pendingCount    = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const fundingReviewed = state.approvals.some(a => a.type === 'Funding Review');
  const prob            = successProb();
  const checks = [
    { label:'Specialist launch agents online',  value:`${activeAgents}/${state.launchAgents.length}`,  passed: activeAgents === state.launchAgents.length, points:20 },
    { label:'75%+ success levers active',       value:`${activeLevers}/${state.successPlan.length}`,   passed: activeLevers === state.successPlan.length,  points:20 },
    { label:'Minimum launch catalog ready',     value:`${readyListings} / 12 listings`,                passed: readyListings >= 12,                         points:20 },
    { label:'Approval bottleneck controlled',   value:`${pendingCount} pending`,                       passed: pendingCount <= 2,                           points:15 },
    { label:'Funding decision owner-reviewed',  value: fundingReviewed ? 'reviewed' : 'not reviewed',  passed: fundingReviewed,                             points:10 },
    { label:'Revenue model above 75%',          value:`${prob}%`,                                       passed: prob >= 75,                                  points:15 },
  ];
  return { checks, score: checks.reduce((s, c) => s + (c.passed ? c.points : 0), 0) };
}
function launchLabel(s) { return s >= 85 ? 'Launch Ready' : s >= 65 ? 'Close — Clear Blockers' : 'Not Ready'; }

/* ─── Next Best Action ─────────────────────────────────────────────── */
function nextBestAction() {
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived);
  const drafts    = state.listings.filter(l => l.status === 'draft');
  const readyUp   = state.listings.filter(l => l.status === 'ready to upload');
  const live      = state.listings.filter(l => l.status === 'live');
  const pace      = isOnPace();
  const rev       = currentRevenue();

  if (pending.length > 0) return {
    priority: 'critical', label:'Review Approvals',
    action: `${pending.length} decision${pending.length > 1 ? 's' : ''} waiting — every pending approval delays revenue. Go to Approvals now.`,
    cta: 'Go to Approvals', view: 'approval',
  };
  if (readyUp.length > 0) return {
    priority: 'high', label:'Get Listings Live',
    action: `${readyUp[0].name} is ready to upload to Etsy. Get it live to start earning from it.`,
    cta: 'View Listing', view: 'listing',
  };
  if (!pace && live.length > 0) return {
    priority: 'high', label:'Pace Is Behind',
    action: `You need $${dailyPaceNeeded().toFixed(2)}/day to hit $500. Create and approve more listings today.`,
    cta: 'Build a Listing', view: 'opportunity',
  };
  if (drafts.length > 0) return {
    priority: 'medium', label:'Advance a Draft',
    action: `${drafts[0].name} is in draft. Finalize and submit it for approval to move it toward live.`,
    cta: 'Edit Draft', view: 'listing',
  };
  if (live.length < 5) return {
    priority: 'medium', label:'Build More Listings',
    action: `You have ${live.length} live listing${live.length !== 1 ? 's' : ''}. You need at least 8 to hit $500 in 45 days without ads.`,
    cta: 'Find Opportunities', view: 'opportunity',
  };
  return {
    priority: 'low', label:'System Is Healthy',
    action: `${rev.toFixed(2)} earned, ${daysRemaining()} days left, pace is good. Run an Atlas Review to keep agents optimizing.`,
    cta: 'Run Atlas Review', view: null,
  };
}

/* ─── Toast ────────────────────────────────────────────────────────── */
function toast(msg, type = 'info') {
  const icons = { success:'✓', warn:'⚠', info:'ℹ' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span><span>${msg}</span>`;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

/* ─── Navigation ───────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id:'dashboard',   label:'Dashboard',     icon:'⬡' },
  { id:'opportunity', label:'Opportunities', icon:'◈' },
  { id:'listing',     label:'Listings',      icon:'▦' },
  { id:'approval',    label:'Approvals',     icon:'◉' },
  { id:'revenue',     label:'Revenue',       icon:'◎' },
];

function renderNav() {
  const nav = document.getElementById('main-nav');
  nav.innerHTML = '';
  const pending = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  NAV_ITEMS.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.dataset.view = item.id;
    const badge = item.id === 'approval' && pending > 0 ? `<span class="nav-badge">${pending}</span>` : '';
    btn.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}${badge}`;
    btn.onclick = () => switchView(item.id);
    nav.appendChild(btn);
  });
}

let _currentView = 'dashboard';
function switchView(id) {
  _currentView = id;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`${id}-view`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  const item = NAV_ITEMS.find(n => n.id === id);
  document.getElementById('view-eyebrow').textContent = item?.label || id;
  document.getElementById('view-title').textContent =
    id === 'dashboard' ? 'Autonomous Operator Console' :
    id === 'opportunity' ? 'Opportunity Backlog' :
    id === 'listing' ? 'Listing Pipeline' :
    id === 'approval' ? 'Approval Queue' : 'Revenue Tracker';
}

function updateSidebarStatus() {
  const rev = currentRevenue();
  document.getElementById('sidebar-rev').textContent = `$${rev.toFixed(2)} / $500`;
  const bar = document.querySelector('#sidebar-prog > div');
  if (bar) bar.style.width = Math.min(rev / 5, 100) + '%';
  document.getElementById('pending-count').textContent = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  document.getElementById('days-rem').textContent = `${daysRemaining()}d left`;
  const ap = document.getElementById('autopilot-status');
  if (ap) ap.textContent = state.autoPilot ? '▶ Auto-Pilot ON' : '◼ Auto-Pilot OFF';
  if (ap) ap.className = state.autoPilot ? 'autopilot-badge on' : 'autopilot-badge off';
}

/* ─── Auto-pilot ───────────────────────────────────────────────────── */
function startAutoPilot() {
  if (autoPilotInterval) return;
  autoPilotInterval = setInterval(() => {
    if (!state.autoPilot) { stopAutoPilot(); return; }
    AUTO_EVENTS[autoEventIdx % AUTO_EVENTS.length]();
    autoEventIdx++;
    state.learningLog.unshift({
      agent: state.agents[autoEventIdx % state.agents.length].name,
      lesson: `Autonomous cycle ${autoEventIdx}: agents refined their outputs and updated knowledge base.`,
      time: nowTs(),
    });
    state.learningLog = state.learningLog.slice(0, 8);
    persist();
    if (_currentView === 'dashboard') { renderDashboard(); updateSidebarStatus(); renderNav(); }
  }, 45000);
}
function stopAutoPilot() { clearInterval(autoPilotInterval); autoPilotInterval = null; }

function toggleAutoPilot() {
  state.autoPilot = !state.autoPilot;
  persist();
  if (state.autoPilot) {
    startAutoPilot();
    toast('Auto-Pilot ON — agents will run autonomously every 45 seconds.', 'success');
    logAction('Owner enabled Auto-Pilot mode. Agents are now running autonomously.');
  } else {
    stopAutoPilot();
    toast('Auto-Pilot paused.', 'info');
    logAction('Auto-Pilot paused by owner.');
  }
  rerenderAll();
}

/* ─── Dashboard ────────────────────────────────────────────────────── */
function renderDashboard() {
  const live      = state.listings.filter(l => l.status === 'live').length;
  const ready     = state.listings.filter(l => l.status === 'ready to upload').length;
  const rev       = currentRevenue();
  const monthly   = estimateMonthly();
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const revision  = state.approvals.filter(a => a.status === 'revise'  && !a.archived).length;
  const prob      = successProb();
  const readiness = launchReadiness();
  const atlas     = state.agents.find(a => a.id === 'atlas');
  const nba       = nextBestAction();
  const elapsed   = daysElapsed();
  const remaining = daysRemaining();
  const pace      = dailyPaceNeeded();
  const onPace    = isOnPace();

  const view = document.getElementById('dashboard-view');
  view.innerHTML = `
    <!-- Next Best Action -->
    <div class="nba-card nba-${nba.priority}">
      <div class="nba-left">
        <div class="nba-eyebrow">Atlas Recommends Now</div>
        <div class="nba-label">${nba.label}</div>
        <div class="nba-action">${nba.action}</div>
      </div>
      <button class="btn primary nba-cta" id="nba-cta-btn">${nba.cta}</button>
    </div>

    <!-- KPI strip -->
    <div class="kpi-grid">
      ${kpiCard('Revenue Earned',  `$${rev.toFixed(2)}`, `of $500 goal`, 'blue', `<div class="progress slim mt-4"><div style="width:${Math.min(rev/5,100)}%"></div></div>`)}
      ${kpiCard('Days Elapsed',    `${elapsed}`,  `${remaining} days remaining`, elapsed > 30 ? 'red' : 'warn')}
      ${kpiCard('Daily Pace Needed', `$${pace.toFixed(2)}`, onPace ? 'On track ✓' : 'Behind — act now', onPace ? 'green' : 'red')}
      ${kpiCard('Live Listings',   `${live}`, `${ready} ready to upload`, live >= 5 ? 'green' : 'warn')}
      ${kpiCard('Est. Monthly',    `$${monthly.toFixed(0)}`, 'projected run-rate', 'blue')}
      ${kpiCard('Atlas Mastery',   `${atlas.mastery}%`, `+${atlas.trend} this session`, 'blue')}
    </div>

    <!-- Auto-pilot + Launch readiness -->
    <div class="grid-2">
      <div class="card autopilot-card">
        <div class="section-header">
          <div>
            <div class="eyebrow">Autonomous Mode</div>
            <div class="section-title">Agent Auto-Pilot</div>
          </div>
          <span id="autopilot-status" class="autopilot-badge ${state.autoPilot ? 'on' : 'off'}">${state.autoPilot ? '▶ Auto-Pilot ON' : '◼ Auto-Pilot OFF'}</span>
        </div>
        <p class="text-muted mt-4">When enabled, agents run every 45 seconds — scoring opportunities, refining listings, and logging findings. You approve; they execute.</p>
        <div class="ap-stats mt-12">
          <div class="ap-stat"><div class="ap-val">${autoEventIdx}</div><div class="ap-label">Auto cycles run</div></div>
          <div class="ap-stat"><div class="ap-val">${state.agents.reduce((s,a) => s + a.trend, 0)}</div><div class="ap-label">Mastery points gained</div></div>
          <div class="ap-stat"><div class="ap-val">${state.activity.length}</div><div class="ap-label">Activity log entries</div></div>
        </div>
        <button class="btn ${state.autoPilot ? 'archive' : 'primary'} mt-12" id="btn-autopilot">${state.autoPilot ? 'Pause Auto-Pilot' : 'Enable Auto-Pilot'}</button>
      </div>
      ${renderLaunchBlock(readiness)}
    </div>

    <!-- Success plan + learning log -->
    <div class="grid-2">
      <div class="card">
        <div class="section-header">
          <span class="section-title">75%+ Success Plan</span>
          <button class="btn primary" id="btn-launch-success">Activate All</button>
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="flex:1">
            <div class="text-muted" style="font-size:.72rem;margin-bottom:4px">Success probability</div>
            <div class="progress success thick"><div style="width:${prob}%"></div></div>
          </div>
          <div style="font-size:1.8rem;font-weight:900;color:var(--text);flex-shrink:0;">${prob}%</div>
        </div>
        <div class="success-list">
          ${state.successPlan.map(l => `
            <div class="success-item ${l.status}">
              <div style="flex:1">
                <div class="si-title">${l.title}</div>
                <div class="si-meta">${l.owner} &nbsp;·&nbsp; +${l.impact} pts &nbsp;·&nbsp; <span class="${l.status === 'active' ? 'text-success' : 'text-muted'}">${l.status}</span></div>
                <div class="si-action">${l.action}</div>
              </div>
              <button class="pill success-toggle" data-id="${l.id}">${l.status === 'queued' ? 'Activate' : '✓ Active'}</button>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="section-header"><span class="section-title">Learning Loop</span></div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
          ${state.learningLog.slice(0,6).map(l => `
            <div class="log-item">
              <span class="log-agent">${l.agent}</span>
              <span class="log-lesson">${l.lesson}</span>
              <span class="log-time">${l.time}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Launch agents + funding -->
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><span class="section-title">Pre-Launch Agents Needed</span></div>
        <p class="text-muted mt-4">Atlas flags these as required before external publishing or paid spend.</p>
        <div class="success-list mt-8">
          ${state.launchAgents.map(a => `
            <div class="success-item ${a.status === 'active' ? 'active' : ''}">
              <div style="flex:1">
                <div class="si-title">${a.name}</div>
                <div class="si-meta">${a.role} &nbsp;·&nbsp; ${a.priority} priority &nbsp;·&nbsp; <span class="${a.status === 'active' ? 'text-success' : 'text-muted'}">${a.status}</span></div>
                <div class="si-action">${a.why}</div>
              </div>
              <button class="pill agent-toggle" data-id="${a.id}">${a.status === 'needed' ? 'Create' : '✓ Active'}</button>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="section-header"><span class="section-title">Funding ROI Planner</span></div>
        <p class="text-muted mt-4">Conservative estimates — all spend is gated behind owner approval.</p>
        <div class="investment-grid mt-8">
          ${state.investmentPlan.map(t => `
            <div class="investment-card">
              <div class="inv-label">${t.label}</div>
              <div class="inv-spend">$${t.spend}</div>
              <div class="inv-projected">→ $${t.projected}</div>
              <div class="inv-conf">${t.confidence}% confidence &nbsp;·&nbsp; ${t.roi}</div>
              <div class="inv-desc mt-4">${t.use}</div>
              <button class="pill fund-tier mt-8" data-id="${t.id}">Review Spend</button>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Atlas oversight -->
    <div class="card">
      <div class="section-header">
        <span class="section-title">Atlas Oversight Layer</span>
        <button class="pill" id="btn-atlas-review">Run Atlas Review</button>
      </div>
      <div class="agent-grid mt-12">
        ${state.agents.map(ag => `
          <div class="agent-card">
            <div class="agent-header">
              <div><div class="agent-role">${ag.role}</div><div class="agent-name">${ag.name}</div></div>
              <div class="agent-mastery">${ag.mastery}% <span class="text-success" style="font-size:.7rem">+${ag.trend}</span></div>
            </div>
            <div class="progress agent"><div style="width:${ag.mastery}%"></div></div>
            <div class="agent-focus">${ag.focus}</div>
            <div class="agent-directive">${ag.directive}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Activity feed -->
    <div class="card">
      <div class="section-header"><span class="section-title">Agent Activity Log</span></div>
      <div class="feed mt-8">
        ${state.activity.slice(0,15).map(e => `
          <div class="feed-item"><span>${e.msg}</span><span class="time">${e.time}</span></div>`).join('')}
      </div>
    </div>`;

  /* Wire events */
  const nbaBtn = view.querySelector('#nba-cta-btn');
  if (nbaBtn) nbaBtn.onclick = () => {
    if (nba.view) switchView(nba.view);
    else runAtlasReview();
  };
  view.querySelector('#btn-atlas-review').onclick = runAtlasReview;
  view.querySelector('#btn-launch-success').onclick = launchSuccessPlan;
  view.querySelector('#btn-autopilot').onclick = toggleAutoPilot;
  view.querySelectorAll('.success-toggle').forEach(b => b.onclick = () => activateSuccessLever(b.dataset.id));
  view.querySelectorAll('.agent-toggle').forEach(b => b.onclick = () => createLaunchAgent(b.dataset.id));
  view.querySelectorAll('.fund-tier').forEach(b => b.onclick = () => reviewFundingTier(b.dataset.id));
  const prepBtn = view.querySelector('#btn-prepare-launch');
  if (prepBtn) prepBtn.onclick = prepareLaunchPack;
  const briefBtn = view.querySelector('#btn-open-brief');
  if (briefBtn) briefBtn.onclick = openLaunchBrief;
}

function kpiCard(label, val, sub, color, extra = '') {
  return `<div class="kpi-card ${color}"><div class="accent-bar"></div><div class="kpi-label">${label}</div><div class="kpi-num">${val}</div><div class="text-muted mt-4">${sub}</div>${extra}</div>`;
}

function renderLaunchBlock(readiness) {
  const score = readiness.score;
  return `<div class="card launch-card">
    <div class="launch-score-wrap">
      <div class="launch-score">${score}</div>
      <div><div class="eyebrow">Launch Control</div><div class="launch-title">${launchLabel(score)}</div><div class="launch-desc">Readiness ${score}/100. Clear every gate before spending or publishing externally.</div></div>
    </div>
    <div class="progress success thick"><div style="width:${score}%"></div></div>
    <div class="launch-grid mt-12">
      ${readiness.checks.map(c => `
        <div class="launch-check ${c.passed ? 'passed' : ''}">
          <div class="launch-icon">${c.passed ? '✓' : '!'}</div>
          <div><div class="launch-check-label">${c.label}</div><div class="launch-check-val">${c.value} &nbsp;·&nbsp; ${c.points} pts</div></div>
        </div>`).join('')}
    </div>
    <div class="launch-actions mt-12">
      <button class="btn primary" id="btn-prepare-launch">Prepare Launch Pack</button>
      <button class="pill" id="btn-open-brief">Open Launch Brief</button>
    </div>
  </div>`;
}

/* ─── Atlas actions ────────────────────────────────────────────────── */
function runAtlasReview() {
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const revisions = state.approvals.filter(a => a.status === 'revise'  && !a.archived).length;
  const drafts    = state.listings.filter(l => ['idea','draft','needs update'].includes(l.status)).length;
  state.agents = state.agents.map(ag => ({ ...ag, mastery: Math.min(99, ag.mastery + (ag.id === 'atlas' ? 2 : 1)), trend: ag.trend + 1 }));
  const lesson = revisions ? 'Atlas detected revision drag — instructed agents to tighten rationale before resubmission.'
    : pending  ? 'Atlas found approval throughput is the bottleneck — prioritizing owner decisions.'
    : drafts   ? 'Atlas redirected specialists toward converting drafts into approval-ready listings.'
    : 'Atlas confirmed the operator loop is healthy and shifted focus to revenue pacing.';
  state.learningLog.unshift({ agent:'Atlas', lesson, time: nowTs() });
  state.learningLog = state.learningLog.slice(0, 8);
  logAction(`Atlas reviewed all ${state.agents.length} agents and strengthened the operator network.`);
  persist(); rerenderAll();
  toast('Atlas review complete — all specialist agents updated.', 'success');
}

function launchSuccessPlan() {
  state.successPlan.forEach(l => { if (l.status === 'queued') l.status = 'active'; });
  if (!state.approvals.some(a => a.type === 'Atlas 75+ Success Sprint' && a.status === 'pending' && !a.archived))
    pushApproval({ type:'Atlas 75+ Success Sprint', item:'45-day Etsy revenue plan', listingId:null, why:'Activates the focused execution system to move success odds from 45% to 75%+.', conf:0.76, agent:'Atlas' });
  state.learningLog.unshift({ agent:'Atlas', lesson:'Moved to 75%+ execution mode — all success levers activated.', time: nowTs() });
  state.learningLog = state.learningLog.slice(0, 8);
  logAction(`Atlas launched the 75+ push. Success probability: ${successProb()}%.`);
  persist(); rerenderAll();
  toast('75+ Push launched — success plan active and queued for approval.', 'success');
}

function activateSuccessLever(id) {
  const lever = state.successPlan.find(l => l.id === id);
  if (!lever || lever.status !== 'queued') return;
  lever.status = 'active';
  state.learningLog.unshift({ agent: lever.owner, lesson: `Activated: ${lever.title}.`, time: nowTs() });
  logAction(`${lever.owner} activated: ${lever.title} (+${lever.impact} probability pts).`);
  persist(); rerenderAll();
  toast(`Lever activated: ${lever.title}`, 'success');
}

function createLaunchAgent(id) {
  const agent = state.launchAgents.find(a => a.id === id);
  if (!agent || agent.status === 'active') return;
  agent.status = 'active';
  state.learningLog.unshift({ agent:'Atlas', lesson: `Created ${agent.name} to cover ${agent.role}.`, time: nowTs() });
  logAction(`Atlas created ${agent.name} — ${agent.role} now active.`);
  persist(); rerenderAll();
  toast(`${agent.name} is now active.`, 'success');
}

function reviewFundingTier(id) {
  const tier = state.investmentPlan.find(t => t.id === id);
  if (!tier) return;
  if (!state.approvals.some(a => a.type === 'Funding Review' && a.item === tier.label && a.status === 'pending' && !a.archived))
    pushApproval({ type:'Funding Review', item:tier.label, listingId:null, why:`Evaluate $${tier.spend} allocation for ${tier.use} Projected 45-day revenue: $${tier.projected} at ${tier.confidence}% confidence (${tier.roi}).`, conf:tier.confidence/100, agent:'Pricing & ROI Agent' });
  logAction(`Pricing & ROI Agent queued ${tier.label} funding review.`);
  persist(); rerenderAll();
  toast(`${tier.label} queued for owner review.`, 'warn');
}

function prepareLaunchPack() {
  const r = launchReadiness();
  if (!state.approvals.some(a => a.type === 'Launch Pack Review' && a.status === 'pending' && !a.archived))
    pushApproval({ type:'Launch Pack Review', item:'Agent Atlas launch pack', listingId:null, why:`Owner review required. Readiness is ${r.score}/100 (${launchLabel(r.score)}).`, conf:r.score/100, agent:'Atlas' });
  logAction(`Atlas prepared the launch pack at ${r.score}/100 readiness.`);
  persist(); rerenderAll();
  openLaunchBrief();
  toast('Launch pack prepared and queued for owner approval.', 'info');
}

function openLaunchBrief() {
  const r = launchReadiness();
  const blockers  = r.checks.filter(c => !c.passed).map(c => `  - ${c.label}: ${c.value}`).join('\n') || '  - No critical blockers.';
  const agents    = state.launchAgents.filter(a => a.status === 'active').map(a => `  - ${a.name}: ${a.role}`).join('\n') || '  - No launch agents active yet.';
  const listings  = state.listings.filter(l => ['ready to upload','live'].includes(l.status)).map(l => `  - ${l.id} ${l.name} ($${l.price}) — ${l.status}`).join('\n') || '  - No ready/live listings.';
  const brief = `AGENT ATLAS — LAUNCH BRIEF
Readiness: ${r.score}/100 (${launchLabel(r.score)})
Success probability: ${successProb()}%
Days elapsed: ${daysElapsed()} / 45
Revenue: $${currentRevenue().toFixed(2)} / $500
Daily pace needed: $${dailyPaceNeeded().toFixed(2)}/day

BLOCKERS
${blockers}

ACTIVE LAUNCH AGENTS
${agents}

READY / LIVE LISTINGS
${listings}

OWNER RULE
No external publishing or paid spend until owner approval is recorded in the Approval Queue.`;
  openPanel('Launch Brief', `
    <div class="text-muted">Atlas-generated pre-launch brief for owner review.</div>
    <div class="copy-block" id="brief-text">${brief}<button class="copy-btn" onclick="copyText('brief-text')">Copy</button></div>`);
}

/* ─── Opportunities ────────────────────────────────────────────────── */
function renderOpportunities(filter = 'All') {
  const opts = ['All','Best Now','Easiest','Bundle','Seasonal'];
  const base = state.opportunities.filter(o => !o.archived);
  const data = filter === 'All' ? base : base.filter(o => o.filter === filter);
  const view = document.getElementById('opportunity-view');
  view.innerHTML = `
    <div class="filter-row">
      ${opts.map(f => `<button class="pill ${filter===f?'active':''}" data-filter="${f}">${f} <span style="color:var(--muted)">(${f==='All'?base.length:base.filter(o=>o.filter===f).length})</span></button>`).join('')}
    </div>
    <div class="card-grid">
      ${data.map(o => `
        <div class="op-card" data-id="${o.id}">
          <div class="row" style="margin-bottom:6px">
            <span class="badge ${o.status.toLowerCase()}">${o.status}</span>
            <span class="badge ${o.filter==='Best Now'?'live':o.filter==='Easiest'?'ready':'draft'}">${o.filter}</span>
          </div>
          <div class="op-title">${o.title}</div>
          <div class="op-niche">${o.niche}</div>
          <div class="op-stats">
            <div class="op-stat"><div class="op-stat-val">${o.score}</div><div class="op-stat-label">Score</div></div>
            <div class="op-stat"><div class="op-stat-val">${o.difficulty}/5</div><div class="op-stat-label">Difficulty</div></div>
            <div class="op-stat"><div class="op-stat-val">${o.bundle}/10</div><div class="op-stat-label">Bundle</div></div>
          </div>
        </div>`).join('')}
    </div>`;
  view.querySelectorAll('.pill[data-filter]').forEach(p => p.onclick = () => renderOpportunities(p.dataset.filter));
  view.querySelectorAll('.op-card').forEach(c => c.onclick = () => openOpportunityPanel(c.dataset.id));
}

function openOpportunityPanel(id) {
  const o = state.opportunities.find(x => x.id === id);
  const already = state.listings.find(l => l.name === o.title || l.name.includes(o.title));
  openPanel(o.title, `
    <div class="text-muted">${o.niche} &nbsp;·&nbsp; <span class="mono">${o.id}</span> &nbsp;·&nbsp; <span class="badge ${o.filter==='Best Now'?'live':'draft'}">${o.filter}</span></div>
    <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
      ${kpiCard('Score',      o.score,       'composite',  'blue')}
      ${kpiCard('Difficulty', `${o.difficulty}/5`, 'to build', 'warn')}
      ${kpiCard('Bundle Fit', `${o.bundle}/10`,    'potential', 'green')}
    </div>
    <div class="divider"></div>
    <div style="font-size:.82rem;color:var(--text2)"><strong>Why this sells:</strong> ${o.niche} operators search Etsy for ready-made paperwork when they're overwhelmed. This template solves an immediate operational pain with no design skill required from the buyer.</div>
    <div style="font-size:.82rem;color:var(--text2);margin-top:8px"><strong>Bundle path:</strong> Combine with 2–3 related ${o.niche} templates at $${(o.score+7).toFixed(2)} for a Core Niche Pack. Vault potential at $49.99 with 10+.</div>
    ${already ? `<div class="badge live">Already in pipeline: ${already.id}</div>` : `<button class="btn approve" id="create-draft-btn">Create Listing Draft</button>`}`);
  if (!already) document.getElementById('create-draft-btn').onclick = () => createListingFromOpportunity(o);
}

function createListingFromOpportunity(op) {
  const nextId  = `LS-${String(state.listings.length + 1).padStart(3,'0')}`;
  const copy    = getEtsyCopy(nextId, { category: op.niche, title: op.title });
  const listing = {
    id: nextId, name: op.title, price: Number((op.score + 1.99).toFixed(2)),
    buyer: `${op.niche} owner-operators`, bundle: `${op.niche} Starter Pack`,
    perf: 'N/A', status: 'draft', category: op.niche,
    views: 0, cvr: 0, revenue: 0,
    title: copy.title, tags: copy.tags, description: copy.desc,
    faq: copy.faq, imagePrompt: copy.imagePrompt,
  };
  state.listings.unshift(listing);
  state.selectedListingId = nextId;
  op.status = 'Converted';
  logAction(`Listing Agent created draft ${nextId} from ${op.id} with Etsy-optimized copy.`);
  persist(); rerenderAll();
  openListingEditor(nextId);
  toast(`Draft ${nextId} created with Etsy SEO copy ready to review.`, 'success');
}

/* ─── Listings ─────────────────────────────────────────────────────── */
function renderListings() {
  const active   = state.listings.filter(l => l.status !== 'archived');
  const selected = active.find(l => l.id === state.selectedListingId) || active[0];
  if (selected) state.selectedListingId = selected.id;
  const copy = selected ? getEtsyCopy(selected.id, selected) : null;

  const STAGES = ['draft','ready to upload','live'];

  const view = document.getElementById('listing-view');
  view.innerHTML = `
    <!-- Pipeline stage overview -->
    <div class="pipeline-strip">
      ${['draft','ready to upload','live'].map(stage => {
        const count = active.filter(l => l.status === stage).length;
        return `<div class="pipeline-stage">
          <div class="ps-count ${stage === 'live' ? 'live' : stage === 'ready to upload' ? 'ready' : ''}">${count}</div>
          <div class="ps-label">${stage}</div>
        </div>`;
      }).join('<div class="pipeline-arrow">→</div>')}
      <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
        <span class="badge">${active.filter(l=>l.status==='needs update').length} needs update</span>
        <span class="badge">${active.filter(l=>l.status==='idea').length} ideas</span>
      </div>
    </div>

    <!-- Listing table -->
    <div class="card">
      <div class="table-wrap">
        <table class="table">
          <thead><tr>
            <th>Product</th><th>Price</th><th>7d Views</th><th>CVR</th><th>7d Revenue</th><th>Performance</th><th>Status</th><th></th>
          </tr></thead>
          <tbody>
            ${active.map(l => {
              const canAdvance = l.status === 'draft';
              const isLive = l.status === 'live';
              return `<tr class="${selected?.id === l.id ? 'selected-row' : ''}" data-select="${l.id}">
                <td><strong>${l.name}</strong></td>
                <td class="mono">$${l.price.toFixed(2)}</td>
                <td class="mono">${l.views || 0}</td>
                <td class="mono ${(l.cvr||0) >= 3 ? 'text-success' : ''}">${(l.cvr||0).toFixed(1)}%</td>
                <td class="mono ${(l.revenue||0) > 30 ? 'text-success' : ''}">$${(l.revenue||0).toFixed(2)}</td>
                <td><span class="badge ${l.perf==='Winner'?'live':''}">${l.perf}</span></td>
                <td><span class="badge ${statusBadgeClass(l.status)}">${l.status}</span></td>
                <td style="display:flex;gap:6px">
                  ${canAdvance ? `<button class="btn approve advance-listing" data-id="${l.id}" style="padding:5px 10px;font-size:.72rem">→ Submit</button>` : ''}
                  <button class="pill edit-listing" data-id="${l.id}">Edit</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Copy-ready blocks for selected listing -->
    ${copy ? `
    <div class="card">
      <div class="section-header">
        <span class="section-title">Etsy Copy &nbsp;<span class="mono text-muted" style="font-size:.75rem">${selected.id}</span></span>
        <button class="pill" onclick="copyText('copy-block-listing')">Copy All</button>
      </div>
      <div class="copy-meta">
        <span>Title: <strong>${copy.title.length}</strong> / 140 chars ${copy.title.length <= 140 ? '✓' : '⚠ too long'}</span>
        <span>Tags: <strong>${copy.tags.split(',').length}</strong> / 13 Etsy tags</span>
      </div>
      <div class="copy-block" id="copy-block-listing">ETSY TITLE (${copy.title.length} chars):
${copy.title}

TAGS (${copy.tags.split(',').length}):
${copy.tags}

DESCRIPTION:
${copy.desc}

FAQ:
${copy.faq}

IMAGE PROMPT:
${copy.imagePrompt}</div>
    </div>` : ''}`;

  view.querySelectorAll('tr[data-select]').forEach(r => r.onclick = () => { state.selectedListingId = r.dataset.select; persist(); renderListings(); });
  view.querySelectorAll('.edit-listing').forEach(b => b.onclick = e => { e.stopPropagation(); openListingEditor(b.dataset.id); });
  view.querySelectorAll('.advance-listing').forEach(b => b.onclick = e => { e.stopPropagation(); advanceListing(b.dataset.id); });
}

function advanceListing(id) {
  const l = state.listings.find(x => x.id === id);
  if (!l || l.status !== 'draft') return;
  pushApproval({ type:'Publish Listing', item:l.name, listingId:l.id, why:`Listing Agent completed Etsy copy optimization. Title is ${getEtsyCopy(l.id, l).title.length} chars, 13 tags set, description and FAQ ready.`, conf:0.82, agent:'Listing Agent' });
  l.status = 'ready to upload';
  logAction(`Listing Agent submitted ${l.id} for approval — ready to upload status set.`);
  persist(); rerenderAll();
  toast(`${l.id} submitted for approval — go approve it to get it live.`, 'info');
}

function statusBadgeClass(s) {
  if (s === 'live') return 'live';
  if (s === 'draft' || s === 'idea') return 'draft';
  if (s === 'ready to upload') return 'ready';
  if (s === 'review' || s === 'needs update') return 'review';
  return '';
}

function openListingEditor(id, revisionApprovalId = null) {
  const l    = state.listings.find(x => x.id === id);
  if (!l) return;
  const copy = getEtsyCopy(l.id, l);
  openPanel(`Edit ${l.id}`, `
    <label>Etsy Title <span style="color:var(--muted);font-size:.7rem">(max 140 chars)</span><input id="f-title" value="${esc(copy.title)}" maxlength="140" /></label>
    <label>Price ($)<input id="f-price" type="number" step="0.01" value="${l.price}" /></label>
    <label>Target Buyer<input id="f-buyer" value="${esc(l.buyer)}" /></label>
    <label>Status<select id="f-status">
      ${['idea','draft','ready to upload','live','needs update','archived'].map(s => `<option ${l.status===s?'selected':''}>${s}</option>`).join('')}
    </select></label>
    <label>Etsy Tags <span style="color:var(--muted);font-size:.7rem">(comma-separated, max 13)</span><input id="f-tags" value="${esc(copy.tags)}" /></label>
    <label>Description<textarea id="f-desc">${esc(copy.desc)}</textarea></label>
    <label>FAQ<textarea id="f-faq" style="min-height:60px">${esc(copy.faq)}</textarea></label>
    <label>Image Prompt<textarea id="f-imgprompt" style="min-height:60px">${esc(copy.imagePrompt)}</textarea></label>
    <div class="divider"></div>
    <label>Recommendation Type<select id="rec-type"><option>Publish Listing</option><option>Price Update</option><option>Content Refresh</option></select></label>
    <label>Rationale<textarea id="rec-why">Listing is Etsy-optimized with buyer-specific copy, 13 tags, and compliant description.</textarea></label>
    <label>Confidence<select id="rec-conf">
      <option value="0.65">65%</option><option value="0.75" selected>75%</option><option value="0.85">85%</option><option value="0.92">92%</option>
    </select></label>
    <label>Source Agent<select id="rec-agent"><option>Listing Agent</option><option>Performance Agent</option><option>Approval Agent</option></select></label>
    <div class="actions">
      <button class="btn approve" id="save-listing-btn">Save</button>
      <button class="btn sendback" id="submit-rec-btn">Submit for Approval</button>
      ${revisionApprovalId ? `<button class="btn primary" id="resubmit-revision-btn">Re-submit Approval</button>` : ''}
    </div>`);

  document.getElementById('save-listing-btn').onclick = () => {
    if (!ETSY_COPY[l.id]) ETSY_COPY[l.id] = {};
    ETSY_COPY[l.id].title       = document.getElementById('f-title').value;
    ETSY_COPY[l.id].tags        = document.getElementById('f-tags').value;
    ETSY_COPY[l.id].desc        = document.getElementById('f-desc').value;
    ETSY_COPY[l.id].faq         = document.getElementById('f-faq').value;
    ETSY_COPY[l.id].imagePrompt = document.getElementById('f-imgprompt').value;
    l.title  = ETSY_COPY[l.id].title;
    l.price  = parseFloat(document.getElementById('f-price').value);
    l.buyer  = document.getElementById('f-buyer').value;
    l.status = document.getElementById('f-status').value;
    l.tags   = ETSY_COPY[l.id].tags;
    state.selectedListingId = l.id;
    if (revisionApprovalId) { const rev = state.approvals.find(a => a.id === revisionApprovalId); if (rev) pushHistory(rev, 'edited during revision'); }
    logAction(`Listing Agent updated ${l.id} (${l.name}) — status: ${l.status}.`);
    persist(); rerenderAll();
    toast(`${l.id} saved.`, 'success');
  };

  document.getElementById('submit-rec-btn').onclick = () => {
    submitRecommendation(l, { type: document.getElementById('rec-type').value, why: document.getElementById('rec-why').value, conf: parseFloat(document.getElementById('rec-conf').value), agent: document.getElementById('rec-agent').value });
    persist(); rerenderAll();
    toast('Submitted to Approval Queue.', 'info');
  };

  const resubBtn = document.getElementById('resubmit-revision-btn');
  if (resubBtn) resubBtn.onclick = () => resubmitApproval(revisionApprovalId);
}

/* ─── Approvals ────────────────────────────────────────────────────── */
function renderApprovals() {
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived);
  const revisions = state.approvals.filter(a => a.status === 'revise'  && !a.archived);
  const audit     = state.approvals.slice().reverse().slice(0, 12);
  const view      = document.getElementById('approval-view');

  view.innerHTML = `
    <div class="kpi-grid">
      ${kpiCard('Pending Decisions', pending.length, 'awaiting owner — act now', pending.length > 0 ? 'warn' : 'green')}
      ${kpiCard('In Revision', revisions.length, 'items sent back for rework', 'blue')}
      ${kpiCard('Total Actions', state.approvals.length, 'all-time approval events', 'blue')}
    </div>
    ${pending.length ? `
    <div class="card">
      <div class="section-header"><span class="section-title">Pending Approvals</span><span class="text-muted" style="font-size:.78rem">Every pending item delays revenue</span></div>
      <div class="card-grid mt-8">${pending.map(a => approvalCard(a)).join('')}</div>
    </div>` : `<div class="card"><p class="text-muted" style="text-align:center;padding:20px">✓ No pending approvals — queue is clear.</p></div>`}
    ${revisions.length ? `
    <div class="card">
      <div class="section-header"><span class="section-title">Revision Queue</span></div>
      <div class="card-grid mt-8">
        ${revisions.map(a => `
          <div class="approval-card">
            <div class="approval-type">Revision Requested</div>
            <div class="approval-item">${a.item}</div>
            <div class="approval-why">${a.revisionReason || a.why}</div>
            <div class="approval-meta">${a.agent} &nbsp;·&nbsp; ${(a.conf*100).toFixed(0)}% &nbsp;·&nbsp; Sent back: ${a.revisedAt || a.createdAt}</div>
            <div class="actions">
              <button class="pill open-revise" data-id="${a.id}">Open Editor</button>
              <button class="btn approve resubmit" data-id="${a.id}">Re-submit</button>
              <button class="pill view-audit" data-id="${a.id}">Audit</button>
            </div>
          </div>`).join('')}
      </div>
    </div>` : ''}
    <div class="card">
      <div class="section-header"><span class="section-title">Audit Trail</span></div>
      <div class="audit-list mt-8">
        ${audit.map(a => `
          <div class="audit-row">
            <div>
              <strong style="font-size:.85rem">${a.item}</strong>
              <p class="text-muted">${a.type} &nbsp;·&nbsp; ${a.agent} &nbsp;·&nbsp; ${(a.conf*100).toFixed(0)}% &nbsp;·&nbsp; <span class="${a.status==='approved'?'text-success':a.status==='revise'?'text-warn':''}">${a.status}</span></p>
            </div>
            <button class="pill view-audit" data-id="${a.id}">Audit</button>
          </div>`).join('') || '<p class="text-muted">No audited actions yet.</p>'}
      </div>
    </div>`;

  view.querySelectorAll('.approve:not(.resubmit)').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'approve'));
  view.querySelectorAll('.sendback').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'sendback'));
  view.querySelectorAll('.archive').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'archive'));
  view.querySelectorAll('.open-revise').forEach(b => b.onclick = () => { const a = state.approvals.find(x => x.id === b.dataset.id); if (a?.listingId) { pushHistory(a,'opened for revision'); logAction(`Opened revision editor for ${a.item}.`); persist(); openListingEditor(a.listingId, a.id); } });
  view.querySelectorAll('.resubmit').forEach(b => b.onclick = () => resubmitApproval(b.dataset.id));
  view.querySelectorAll('.view-audit').forEach(b => b.onclick = () => openAuditPanel(b.dataset.id));
}

function approvalCard(a) {
  return `<div class="approval-card ${a.important ? 'important' : ''}">
    <div class="approval-type">${a.type}</div>
    <div class="approval-item">${a.item}</div>
    <div class="approval-why">${a.why}</div>
    <div class="approval-meta">${a.agent} &nbsp;·&nbsp; ${a.createdAt}</div>
    <div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);margin-bottom:3px"><span>Agent confidence</span><span>${(a.conf*100).toFixed(0)}%</span></div>
      <div class="conf-bar"><div style="width:${a.conf*100}%"></div></div>
    </div>
    <div class="actions">
      <button class="btn approve" data-id="${a.id}">✓ Approve</button>
      <button class="btn sendback" data-id="${a.id}">Send Back</button>
      <button class="btn archive" data-id="${a.id}">Archive</button>
      <button class="pill view-audit" data-id="${a.id}">Audit</button>
    </div>
  </div>`;
}

function handleApproval(id, action) {
  const item    = state.approvals.find(a => a.id === id);
  if (!item) return;
  const listing = item.listingId ? state.listings.find(l => l.id === item.listingId) : null;

  if (action === 'approve') {
    item.status = 'approved';
    if (listing) {
      listing.status = item.type === 'Publish Listing' ? 'live' : 'ready to upload';
      if (item.type === 'Publish Listing') {
        listing.views   = Math.floor(40 + Math.random() * 60);
        listing.cvr     = parseFloat((1.5 + Math.random() * 2).toFixed(1));
        listing.revenue = parseFloat((listing.price * Math.floor(listing.views * listing.cvr / 100)).toFixed(2));
        listing.perf    = listing.cvr >= 3 ? 'Winner' : 'Stable';
      }
    }
    if (item.type === 'Price Increase' && listing) listing.price = parseFloat((listing.price + 1).toFixed(2));
    pushHistory(item, 'approved by owner');
    logAction(`Owner approved ${item.type} for "${item.item}" — ${listing?.status === 'live' ? 'listing is now live' : 'status updated'}.`);
    toast(listing?.status === 'live' ? `${item.item} is now LIVE on Etsy!` : `Approved: ${item.item}`, 'success');
  }
  if (action === 'sendback') {
    item.status = 'revise'; item.revisedAt = nowTs();
    item.revisionReason = `Owner requested changes: ${item.why}`;
    if (listing) listing.status = 'needs update';
    pushHistory(item, 'sent back for revision');
    logAction(`Sent back for revision: ${item.item}.`);
    toast(`Sent back: ${item.item}`, 'warn');
  }
  if (action === 'archive') {
    item.archived = true; item.status = 'archived';
    if (listing && listing.status !== 'live') listing.status = 'archived';
    pushHistory(item, 'archived by owner');
    logAction(`Archived: ${item.item}.`);
    toast(`Archived: ${item.item}`, 'warn');
  }
  persist(); rerenderAll();
}

function openAuditPanel(approvalId) {
  const a = state.approvals.find(x => x.id === approvalId); if (!a) return;
  const listing = a.listingId ? state.listings.find(l => l.id === a.listingId) : null;
  openPanel('Approval Audit', `
    <div class="text-muted"><span class="mono">${a.id}</span> &nbsp;·&nbsp; <span class="${a.status==='approved'?'text-success':a.status==='revise'?'text-warn':''}">${a.status}</span></div>
    <div style="font-weight:700;font-size:.95rem">${a.item}</div>
    <div class="text-muted">${a.type} &nbsp;·&nbsp; ${a.agent} &nbsp;·&nbsp; ${(a.conf*100).toFixed(0)}% confidence</div>
    <div style="font-size:.8rem;color:var(--text2)">${a.why}</div>
    ${listing ? `<div class="copy-block">Linked: ${listing.id}\nStatus: ${listing.status}\nPrice: $${listing.price}\n7d Revenue: $${(listing.revenue||0).toFixed(2)}</div>` : ''}
    <div style="font-weight:700;margin-top:4px">Event History</div>
    <div class="history-list">
      ${(a.history||[]).map(h => `<div class="history-item"><span class="history-time mono">${h.time}</span><span class="history-event">${h.event}${h.agent?` · ${h.agent}`:''}${h.confidence?` · ${(h.confidence*100).toFixed(0)}%`:''}</span></div>`).join('') || '<div class="history-item"><span class="history-event text-muted">No audit events yet.</span></div>'}
    </div>
    ${listing ? `<button class="pill mt-8" id="audit-open-listing-btn">Open Listing Editor</button>` : ''}`);
  const ob = document.getElementById('audit-open-listing-btn');
  if (ob) ob.onclick = () => openListingEditor(listing.id, a.status === 'revise' ? a.id : null);
}

function resubmitApproval(approvalId) {
  const old = state.approvals.find(x => x.id === approvalId); if (!old) return;
  const newId = `AP-${String(state.approvals.length+1).padStart(3,'0')}`;
  state.approvals.push({ ...old, id:newId, status:'pending', archived:false, createdAt:nowTs(), revisionReason:null, revisedAt:null, history:[...(old.history||[]),{event:'resubmitted',time:nowTs()}] });
  old.archived = true; old.status = 'resubmitted';
  pushHistory(old, 'resubmission triggered');
  logAction(`${old.agent} re-submitted ${old.item} for approval.`);
  persist(); rerenderAll();
  toast('Re-submitted for approval.', 'info');
}

/* ─── Revenue ──────────────────────────────────────────────────────── */
function renderRevenue() {
  const rev       = currentRevenue();
  const monthly   = estimateMonthly();
  const elapsed   = daysElapsed();
  const remaining = daysRemaining();
  const pace      = dailyPaceNeeded();
  const onPace    = isOnPace();
  const live      = state.listings.filter(l => l.status === 'live');
  const sorted    = state.listings.filter(l => ['live','ready to upload'].includes(l.status)).sort((a,b) => (b.revenue||b.price*3) - (a.revenue||a.price*3));
  const maxVal    = sorted.reduce((m,l) => Math.max(m, l.revenue||l.price*3), 1);

  // Day-by-day projection data
  const dailyRate = elapsed > 0 ? rev / elapsed : 0;
  const projDays  = Array.from({length:45}, (_,i) => Math.min(500, dailyRate * i));
  const barH      = projDays.map(v => Math.max(2, (v / 500) * 60));

  const view = document.getElementById('revenue-view');
  view.innerHTML = `
    <div class="kpi-grid">
      ${kpiCard('Revenue Earned',   `$${rev.toFixed(2)}`, `of $500 goal`, 'blue', `<div class="progress slim mt-4"><div style="width:${Math.min(rev/5,100)}%"></div></div>`)}
      ${kpiCard('Days Elapsed',     `${elapsed} / 45`, `${remaining} days left`,   elapsed > 35 ? 'red' : 'warn')}
      ${kpiCard('Daily Pace Needed', `$${pace.toFixed(2)}/day`, onPace ? 'On track ✓' : 'Behind — add listings', onPace ? 'green' : 'red')}
      ${kpiCard('Monthly Run-Rate', `$${monthly.toFixed(0)}`, 'if pace holds', 'green')}
    </div>

    <!-- Progress + projection -->
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><span class="section-title">45-Day Goal Progress</span></div>
        <div style="font-size:2.4rem;font-weight:900;font-variant-numeric:tabular-nums;margin:8px 0">${rev < 500 ? `$${rev.toFixed(2)}` : '<span class="text-success">$500+ ✓</span>'} <span style="font-size:1rem;font-weight:400;color:var(--muted)">/ $500</span></div>
        <div class="progress success thick"><div style="width:${Math.min(rev/5,100)}%"></div></div>
        <div class="rev-stats mt-12">
          <div class="rev-stat"><div class="rev-val">$${(500-rev).toFixed(2)}</div><div class="rev-label">Remaining</div></div>
          <div class="rev-stat"><div class="rev-val ${onPace?'text-success':'text-warn'}">${onPace?'On Track':'Behind'}</div><div class="rev-label">Pace status</div></div>
          <div class="rev-stat"><div class="rev-val">${live.length}</div><div class="rev-label">Live listings</div></div>
          <div class="rev-stat"><div class="rev-val">$${(rev/Math.max(elapsed,1)).toFixed(2)}</div><div class="rev-label">Actual daily avg</div></div>
        </div>
      </div>
      <div class="card">
        <div class="section-header"><span class="section-title">45-Day Projection</span></div>
        <div style="font-size:.72rem;color:var(--muted);margin-bottom:8px">At current pace — goal line at $500</div>
        <div class="proj-chart">
          ${barH.map((h,i) => `<div class="proj-bar ${projDays[i]>=500?'goal':''}" style="height:${h}px" title="Day ${i}: $${projDays[i].toFixed(0)}"></div>`).join('')}
          <div class="proj-goal-line"></div>
        </div>
        <div class="proj-labels">
          <span>Day 1</span><span>Day 15</span><span>Day 30</span><span>Day 45</span>
        </div>
      </div>
    </div>

    <!-- Listing breakdown -->
    <div class="card">
      <div class="section-header"><span class="section-title">Listing Performance Breakdown</span></div>
      <div class="spark-wrap mt-8">
        ${sorted.map(l => {
          const val = l.revenue || l.price * 3;
          const h   = Math.max(8, (val / maxVal) * 90);
          return `<div class="spark-bar ${l.perf==='Winner'?'winner':''}" style="height:${h}%" title="${l.name}: $${val.toFixed(0)}"></div>`;
        }).join('')}
      </div>
      <div class="table-wrap mt-12">
        <table class="table">
          <thead><tr><th>Listing</th><th>Price</th><th>7d Views</th><th>CVR</th><th>7d Revenue</th><th>Status</th><th>Performance</th></tr></thead>
          <tbody>
            ${sorted.map(l => `<tr>
              <td><strong>${l.name}</strong></td>
              <td class="mono">$${l.price.toFixed(2)}</td>
              <td class="mono">${l.views||0}</td>
              <td class="mono ${(l.cvr||0)>=3?'text-success':''}">${(l.cvr||0).toFixed(1)}%</td>
              <td class="mono ${(l.revenue||0)>30?'text-success':''}">$${(l.revenue||0).toFixed(2)}</td>
              <td><span class="badge ${statusBadgeClass(l.status)}">${l.status}</span></td>
              <td><span class="badge ${l.perf==='Winner'?'live':''}">${l.perf}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bundle ladder -->
    <div class="card">
      <div class="section-header"><span class="section-title">Bundle Revenue Ladder</span></div>
      <div class="kpi-grid">
        ${[
          { tier:'Entry',   price:'$4.99–8.99', offer:'Single Template',             units:12, proj:72  },
          { tier:'Core',    price:'$14.99',      offer:'Niche Starter Pack (3–5 docs)', units:6,  proj:90  },
          { tier:'Pro',     price:'$29.99',      offer:'Back-Office Ops Bundle (10)',  units:3,  proj:90  },
          { tier:'Premium', price:'$49.99',      offer:'Admin Vault (20+)',             units:2,  proj:100 },
        ].map(b => kpiCard(b.tier, b.price, `${b.offer} — ${b.units} units/mo → $${b.proj}/mo`, 'blue')).join('')}
      </div>
    </div>`;
}

/* ─── Shared helpers ───────────────────────────────────────────────── */
function pushApproval({ type, item, listingId, why, conf, agent }) {
  const id = `AP-${String(state.approvals.length+1).padStart(3,'0')}`;
  state.approvals.push({ id, type, item, listingId, why, conf, agent, important:true, status:'pending', archived:false, createdAt:nowTs(), history:[{event:'submitted for approval',time:nowTs(),agent,confidence:conf,item}] });
}
function submitRecommendation(listing, payload) {
  pushApproval({ type:payload.type, item:listing.name||listing.title, listingId:listing.id, why:payload.why, conf:payload.conf, agent:payload.agent });
  logAction(`${payload.agent} submitted recommendation for ${listing.id} (${payload.type}, ${(payload.conf*100).toFixed(0)}%).`);
}
function pushHistory(item, event) { item.history = item.history||[]; item.history.push({event, time:nowTs(), agent:item.agent, confidence:item.conf, item:item.item}); }
function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function copyText(id) { const el = document.getElementById(id); if (!el) return; navigator.clipboard.writeText(el.innerText || el.textContent).then(() => toast('Copied to clipboard.','success')); }

/* ─── Side panel ───────────────────────────────────────────────────── */
function openPanel(title, html) {
  document.getElementById('panel-title').textContent = title;
  document.getElementById('panel-content').innerHTML = html;
  document.getElementById('side-panel').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}
function closePanel() {
  document.getElementById('side-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

/* ─── Render all ───────────────────────────────────────────────────── */
function rerenderAll() {
  renderNav();
  renderDashboard();
  renderOpportunities();
  renderListings();
  renderApprovals();
  renderRevenue();
  updateSidebarStatus();
}

/* ─── Init ─────────────────────────────────────────────────────────── */
document.getElementById('close-panel').onclick = closePanel;
document.getElementById('overlay').onclick = closePanel;
document.getElementById('theme-toggle').onclick = () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  document.getElementById('theme-icon').textContent = next === 'dark' ? '☀' : '☾';
};

if (state.autoPilot) startAutoPilot();
rerenderAll();
persist();

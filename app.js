'use strict';
/* ─── Storage ──────────────────────────────────────────────────────── */
const STORAGE_KEY = 'agentAtlasV2';

/* ─── Seed data ────────────────────────────────────────────────────── */
const SEED = {
  selectedListingId: 'LS-001',
  agents: [
    { id:'atlas',       name:'Atlas',              role:'Operator Overseer',       mastery:92, trend:4,  focus:'Coordinates every agent, audits decisions, and raises owner approval gates.',       directive:'Keep the system moving toward $500 without unsafe publishing.' },
    { id:'opportunity', name:'Opportunity Agent',  role:'Market Scout',            mastery:84, trend:6,  focus:'Scores service-business template ideas by speed, simplicity, niche fit, and bundle potential.', directive:'Find fast-to-build offers with bundle paths.' },
    { id:'listing',     name:'Listing Agent',      role:'Etsy Conversion Writer',  mastery:81, trend:5,  focus:'Turns product ideas into SEO titles, tags, descriptions, FAQs, and image prompts.', directive:'Improve clarity and buyer specificity before approval.' },
    { id:'bundle',      name:'Bundle Agent',       role:'Offer Architect',         mastery:78, trend:3,  focus:'Combines single templates into higher-ticket packs and pricing ladders.',           directive:'Increase average order value without adding owner workload.' },
    { id:'performance', name:'Performance Agent',  role:'Revenue Analyst',         mastery:86, trend:7,  focus:'Identifies winners, underperformers, and revenue pacing risk.',                    directive:'Protect the 45-day revenue goal with simple listing tests.' },
    { id:'approval',    name:'Approval Agent',     role:'Risk Gatekeeper',         mastery:88, trend:4,  focus:'Routes important changes to the owner and prevents external publishing without approval.', directive:'Never allow publish actions to bypass owner approval.' },
  ],
  learningLog: [
    { agent:'Atlas',             lesson:'Prioritize approval bottlenecks before adding new opportunities.', time:'09:18' },
    { agent:'Listing Agent',     lesson:'Buyer-specific titles outperform generic template wording.',       time:'09:02' },
    { agent:'Performance Agent', lesson:'Ready-to-upload listings should be valued at a lower revenue multiplier until live.', time:'08:41' },
  ],
  successPlan: [
    { id:'focus',      title:'Narrow to 5 highest-intent trade niches',       owner:'Opportunity Agent',  impact:8, status:'queued', action:'Filter backlog to simple, urgent, service-business paperwork with clear buyer pain.' },
    { id:'volume',     title:'Reach 12 ready-to-upload listings fast',         owner:'Listing Agent',      impact:7, status:'queued', action:'Convert best opportunities into draft listings and move polished ones into approval.' },
    { id:'bundles',    title:'Create 3 bundle ladders before launch',          owner:'Bundle Agent',        impact:6, status:'queued', action:'Package singles into starter, pro, and vault offers to raise average order value.' },
    { id:'conversion', title:'Upgrade every listing with buyer-specific copy', owner:'Listing Agent',      impact:5, status:'queued', action:'Tighten titles, tags, first-image promise, FAQ, and description for each buyer segment.' },
    { id:'feedback',   title:'Run daily Atlas review and loser refresh loop',  owner:'Performance Agent',  impact:4, status:'queued', action:'Refresh underperformers quickly and double down on winners.' },
  ],
  launchAgents: [
    { id:'trend',    name:'Trend Scout Agent',         role:'Demand Validation',    priority:'High',   status:'needed', why:'Prevents building templates nobody searches for by ranking Etsy keyword and buyer-intent signals.' },
    { id:'creative', name:'Creative Production Agent', role:'Mockup + Asset Builder', priority:'High', status:'needed', why:'Turns approved listings into polished preview images, PDF covers, and bundle graphics fast.' },
    { id:'qa',       name:'Quality Control Agent',     role:'Template QA',          priority:'High',   status:'needed', why:'Checks files, naming, delivery ZIPs, instructions, and buyer usability before upload.' },
    { id:'pricing',  name:'Pricing & ROI Agent',       role:'Capital Allocation',   priority:'Medium', status:'needed', why:'Chooses when ad spend, mockup assets, or research tools are worth funding.' },
    { id:'policy',   name:'Policy Compliance Agent',   role:'Marketplace Guardrails', priority:'Medium', status:'needed', why:'Reviews listing claims, digital-delivery language, and marketplace-safe wording before approval.' },
  ],
  investmentPlan: [
    { id:'lean',    label:'Lean Launch',     spend:0,   projected:500,  confidence:45, roi:'Baseline',          use:'Manual-quality launch using only current seeded workflow.' },
    { id:'starter', label:'Starter Boost',   spend:150, projected:650,  confidence:58, roi:'~1.0× incremental', use:'Mockup assets, listing validation, and small Etsy Ads tests after approvals.' },
    { id:'growth',  label:'Focused Growth',  spend:300, projected:900,  confidence:68, roi:'~1.3× incremental', use:'Better creative, faster product volume, and controlled ad learning budget.' },
    { id:'push75',  label:'75+ Push',        spend:500, projected:1250, confidence:76, roi:'~1.5× incremental', use:'Full pre-launch agent stack, stronger creative, bundle production, and measured traffic tests.' },
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
    filter: o[5],
    next: 'Generate first Etsy listing draft and queue for approval.',
    archived: false,
  })),
  listings: [
    { id:'LS-001', name:'HVAC Tech Service Call Notes Template',  price:7.99,  buyer:'Owner-Operator HVAC Tech',   bundle:'HVAC Starter Pack',      perf:'Winner', status:'live',            category:'HVAC',           tags:'hvac template, service call form',          description:'Editable notes template for HVAC technicians.',               title:'HVAC Tech Service Call Notes Template (Editable PDF)',     faq:'Can I edit in Canva? Yes, editable link is included.',              imagePrompt:'Premium HVAC paperwork mockup with modern workstation.' },
    { id:'LS-002', name:'Plumbing Dispatch & Diagnosis Checklist',price:11.99, buyer:'Small Plumbing Teams',        bundle:'Plumbing Ops Kit',       perf:'Winner', status:'live',            category:'Plumbing',       tags:'plumbing checklist, dispatch form',          description:'Diagnostic workflow checklist for plumbing teams.',            title:'Plumbing Dispatch & Diagnosis Checklist Bundle',           faq:'Is this printable? Yes, includes print-ready and editable versions.', imagePrompt:'Blue-collar office scene with dispatch checklist on tablet.' },
    { id:'LS-003', name:'Electrician Jobsite Inspection Form Pack',price:9.99, buyer:'Solo Electricians',           bundle:'Electrical Admin Bundle', perf:'Stable', status:'live',            category:'Electrical',     tags:'electrician form, site inspection',          description:'Field inspection forms for electricians.',                     title:'Electrician Jobsite Inspection Form Pack',                 faq:'Can this work for residential and commercial jobs? Yes.',            imagePrompt:'Clean clipboard form layout for electricians with premium lighting.' },
    { id:'LS-004', name:'Lawn Care Weekly Crew Planner',          price:6.99,  buyer:'Lawn Route Managers',        bundle:'Lawn Backoffice Kit',     perf:'Winner', status:'live',            category:'Lawn Care',      tags:'lawn crew planner, route sheet',            description:'Weekly crew planner for lawn operators.',                      title:'Lawn Care Weekly Crew Planner',                           faq:'Can I customize route columns? Yes.',                               imagePrompt:'Operations dashboard overlay with route planner templates.' },
    { id:'LS-005', name:'Auto Detail Intake + Waiver Kit',        price:12.99, buyer:'Mobile Detail Owners',       bundle:'Detailing Client Ops',    perf:'Stable', status:'live',            category:'Auto Detailing', tags:'auto detail waiver, intake sheet',           description:'Client intake and damage waiver set.',                         title:'Auto Detail Intake + Waiver Kit',                         faq:'Does it include waiver language? Yes.',                             imagePrompt:'Luxury detailing intake sheet on premium car interior background.' },
    { id:'LS-006', name:'Pest Control Follow-Up Card Templates',  price:5.99,  buyer:'Pest Control Teams',        bundle:'Pest Retention Pack',     perf:'N/A',    status:'draft',           category:'Pest Control',   tags:'pest follow-up, service card',              description:'Follow-up card templates for recurring service.',               title:'Pest Control Follow-Up Card Templates',                   faq:'Can I add my logo? Yes.',                                           imagePrompt:'Minimal service card set displayed on dark desk.' },
    { id:'LS-007', name:'Roofing Change Order + Approval Form',   price:14.99, buyer:'Roofing Contractors',        bundle:'Roofing Scope Pack',      perf:'N/A',    status:'ready to upload', category:'Roofing',        tags:'roofing change order, approval form',        description:'Change order and approval packet.',                            title:'Roofing Change Order + Approval Form',                    faq:'Is e-sign friendly? Yes.',                                          imagePrompt:'Contractor approval forms with premium construction office styling.' },
  ],
  approvals: [
    { id:'AP-001', type:'Publish Listing', item:'Roofing Change Order + Approval Form', listingId:'LS-007', opportunityId:null, why:'Strong bundle lift projected at +22%.', conf:0.84, agent:'Approval Agent', important:true, status:'pending', archived:false, createdAt:'09:10', history:[] },
    { id:'AP-002', type:'Price Increase',  item:'Lawn Care Weekly Crew Planner',        listingId:'LS-004', opportunityId:null, why:'High conversion supports test at $7.99.', conf:0.78, agent:'Performance Agent', important:true, status:'pending', archived:false, createdAt:'09:05', history:[] },
  ],
  activity: [
    { msg:'Opportunity Agent scored 4 new bundle candidates.', time:'09:12' },
    { msg:'Listing Agent generated SEO drafts for LS-006.',    time:'08:47' },
    { msg:'Performance Agent flagged LS-004 for pricing test.', time:'08:15' },
  ],
};

/* ─── State ────────────────────────────────────────────────────────── */
let state = loadState();
ensureShape();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : clone(SEED);
  } catch { return clone(SEED); }
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function clone(x)  { return JSON.parse(JSON.stringify(x)); }
function nowTs()   { return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }); }

function ensureShape() {
  const s = state;
  if (!s.selectedListingId)  s.selectedListingId = s.listings?.[0]?.id || null;
  if (!s.agents)             s.agents       = clone(SEED.agents);
  if (!s.learningLog)        s.learningLog  = clone(SEED.learningLog);
  if (!s.successPlan)        s.successPlan  = clone(SEED.successPlan);
  if (!s.launchAgents)       s.launchAgents = clone(SEED.launchAgents);
  if (!s.investmentPlan)     s.investmentPlan = clone(SEED.investmentPlan);
  s.approvals.forEach(a => {
    a.history  = a.history || [];
    a.createdAt = a.createdAt || nowTs();
  });
}

function logAction(msg) {
  state.activity.unshift({ msg, time: nowTs() });
  state.activity = state.activity.slice(0, 30);
}

/* ─── Computations ─────────────────────────────────────────────────── */
function currentRevenue() {
  return state.listings
    .filter(l => l.status === 'live')
    .reduce((s, l) => s + l.price * 4, 0);
}
function estimateMonthly() {
  return state.listings
    .filter(l => ['live','ready to upload'].includes(l.status))
    .reduce((s, l) => s + l.price * (l.status === 'live' ? 8 : 3), 0);
}
function successProb() {
  return Math.min(90, 45 + state.successPlan.filter(l => l.status !== 'queued').reduce((s, l) => s + l.impact, 0));
}
function launchReadiness() {
  const activeAgents   = state.launchAgents.filter(a => a.status === 'active').length;
  const activeLevers   = state.successPlan.filter(l => l.status === 'active').length;
  const readyListings  = state.listings.filter(l => ['ready to upload','live'].includes(l.status)).length;
  const pendingCount   = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const fundingReviewed = state.approvals.some(a => a.type === 'Funding Review');
  const prob = successProb();
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
function launchLabel(score) {
  return score >= 85 ? 'Launch Ready' : score >= 65 ? 'Close — Clear Blockers' : 'Not Ready';
}

/* ─── Toast ────────────────────────────────────────────────────────── */
function toast(msg, type = 'info') {
  const icons = { success:'✓', warn:'⚠', info:'ℹ' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span><span>${msg}</span>`;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(() => el.remove(), 3800);
}

/* ─── Navigation ───────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id:'dashboard',   label:'Dashboard',   icon:'⬡' },
  { id:'opportunity', label:'Opportunities', icon:'◈' },
  { id:'listing',     label:'Listings',    icon:'▦' },
  { id:'approval',    label:'Approvals',   icon:'◉' },
  { id:'revenue',     label:'Revenue',     icon:'◎' },
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

function switchView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`${id}-view`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === id);
  });
  const item = NAV_ITEMS.find(n => n.id === id);
  document.getElementById('view-eyebrow').textContent = item?.label || id;
  document.getElementById('view-title').textContent =
    id === 'dashboard'   ? 'Autonomous Operator Console' :
    id === 'opportunity' ? 'Opportunity Backlog' :
    id === 'listing'     ? 'Listing Pipeline' :
    id === 'approval'    ? 'Approval Queue' : 'Revenue Tracker';
}

/* ─── Sidebar status ───────────────────────────────────────────────── */
function updateSidebarStatus() {
  const rev = currentRevenue();
  document.getElementById('sidebar-rev').textContent = `$${rev.toFixed(2)} / $500`;
  const pct = Math.min(rev / 5, 100);
  const bar = document.querySelector('#sidebar-prog > div');
  if (bar) bar.style.width = pct + '%';
  const pending = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  document.getElementById('pending-count').textContent = pending;
}

/* ─── Dashboard ────────────────────────────────────────────────────── */
function renderDashboard() {
  const live    = state.listings.filter(l => l.status === 'live').length;
  const ready   = state.listings.filter(l => l.status === 'ready to upload').length;
  const rev     = currentRevenue();
  const monthly = estimateMonthly();
  const pending = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const revision= state.approvals.filter(a => a.status === 'revise'  && !a.archived).length;
  const prob    = successProb();
  const readiness = launchReadiness();
  const atlas   = state.agents.find(a => a.id === 'atlas');

  const view = document.getElementById('dashboard-view');
  view.innerHTML = `
    <!-- KPI strip -->
    <div class="kpi-grid">
      ${kpiCard('Goal Progress', `$${rev.toFixed(2)}`, `of $500 target`, 'blue',   `<div class="progress slim mt-4"><div style="width:${Math.min(rev/5,100)}%"></div></div>`)}
      ${kpiCard('Live Listings', live,       `${ready} ready to upload`,  'green')}
      ${kpiCard('Est. Monthly',  `$${monthly.toFixed(0)}`, 'projected run-rate', 'warn')}
      ${kpiCard('Pending Approvals', pending, `${revision} in revision`,  pending > 0 ? 'red' : 'green')}
      ${kpiCard('Atlas Mastery', `${atlas.mastery}%`, `+${atlas.trend} this session`, 'blue')}
    </div>

    <!-- Launch readiness -->
    ${renderLaunchBlock(readiness)}

    <!-- Success plan + learning log -->
    <div class="grid-2">
      <div class="card">
        <div class="section-header">
          <span class="section-title">75%+ Success Plan</span>
          <button class="btn primary" id="btn-launch-success">Launch 75+ Push</button>
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <div style="flex:1">
            <div style="font-size:.78rem;color:var(--muted);margin-bottom:4px;">Success probability</div>
            <div class="progress success thick"><div style="width:${prob}%"></div></div>
          </div>
          <div style="font-size:1.6rem;font-weight:900;color:var(--text);font-variant-numeric:tabular-nums;flex-shrink:0;">${prob}%</div>
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
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${state.learningLog.map(l => `
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
        <div class="section-header"><span class="section-title">Pre-Launch Missing Agents</span></div>
        <p class="text-muted mt-4">Atlas recommends creating these before launch to raise quality, speed, and risk control.</p>
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
        <p class="text-muted mt-4">Conservative estimates — Atlas routes spend decisions through owner approval.</p>
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
      <p class="text-muted mt-4">Atlas watches every specialist agent, turns workflow outcomes into lessons, and raises the right owner approval gates before anything important ships.</p>
      <div class="agent-grid mt-12">
        ${state.agents.map(ag => `
          <div class="agent-card">
            <div class="agent-header">
              <div>
                <div class="agent-role">${ag.role}</div>
                <div class="agent-name">${ag.name}</div>
              </div>
              <div class="agent-mastery">${ag.mastery}% <span style="color:var(--success);font-size:.7rem">+${ag.trend}</span></div>
            </div>
            <div class="progress agent"><div style="width:${ag.mastery}%"></div></div>
            <div class="agent-focus">${ag.focus}</div>
            <div class="agent-directive">${ag.directive}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Activity feed -->
    <div class="card">
      <div class="section-header"><span class="section-title">Recent Agent Activity</span></div>
      <div class="feed mt-8">
        ${state.activity.map(e => `
          <div class="feed-item">
            <span>${e.msg}</span>
            <span class="time">${e.time}</span>
          </div>`).join('')}
      </div>
    </div>`;

  /* Wire events */
  view.querySelector('#btn-atlas-review').onclick = runAtlasReview;
  view.querySelector('#btn-launch-success').onclick = launchSuccessPlan;
  view.querySelectorAll('.success-toggle').forEach(b => b.onclick = () => activateSuccessLever(b.dataset.id));
  view.querySelectorAll('.agent-toggle').forEach(b => b.onclick = () => createLaunchAgent(b.dataset.id));
  view.querySelectorAll('.fund-tier').forEach(b => b.onclick = () => reviewFundingTier(b.dataset.id));
  const prepBtn = view.querySelector('#btn-prepare-launch');
  if (prepBtn) prepBtn.onclick = prepareLaunchPack;
  const briefBtn = view.querySelector('#btn-open-brief');
  if (briefBtn) briefBtn.onclick = openLaunchBrief;
}

function kpiCard(label, val, sub, color, extra = '') {
  return `<div class="kpi-card ${color}">
    <div class="accent-bar"></div>
    <div class="kpi-label">${label}</div>
    <div class="kpi-num">${val}</div>
    <div class="text-muted mt-4">${sub}</div>
    ${extra}
  </div>`;
}

function renderLaunchBlock(readiness) {
  const score = readiness.score;
  return `<div class="card launch-card">
    <div class="launch-score-wrap">
      <div class="launch-score">${score}</div>
      <div>
        <div class="eyebrow">Launch Control</div>
        <div class="launch-title">${launchLabel(score)}</div>
        <div class="launch-desc">Atlas readiness is ${score}/100. Clear every gate before spending or publishing externally.</div>
      </div>
    </div>
    <div class="progress success thick"><div style="width:${score}%"></div></div>
    <div class="launch-grid mt-12">
      ${readiness.checks.map(c => `
        <div class="launch-check ${c.passed ? 'passed' : ''}">
          <div class="launch-icon">${c.passed ? '✓' : '!'}</div>
          <div>
            <div class="launch-check-label">${c.label}</div>
            <div class="launch-check-val">${c.value} &nbsp;·&nbsp; ${c.points} pts</div>
          </div>
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

  state.agents = state.agents.map(ag => ({
    ...ag,
    mastery: Math.min(99, ag.mastery + (ag.id === 'atlas' ? 2 : 1)),
    trend: ag.trend + 1,
  }));

  const lesson = revisions
    ? 'Atlas detected revision drag — instructed agents to tighten rationale before resubmission.'
    : pending
      ? 'Atlas found approval throughput is the current bottleneck and prioritized owner decisions.'
      : drafts
        ? 'Atlas redirected specialists toward converting drafts into approval-ready listings.'
        : 'Atlas confirmed the operator loop is healthy and shifted focus to revenue pacing.';

  state.learningLog.unshift({ agent:'Atlas', lesson, time: nowTs() });
  state.learningLog = state.learningLog.slice(0, 8);
  logAction(`Atlas reviewed the operator network and strengthened ${state.agents.length - 1} specialist agents.`);
  persist(); rerenderAll();
  toast('Atlas review complete — all specialist agents updated.', 'success');
}

function launchSuccessPlan() {
  state.successPlan.forEach(l => { if (l.status === 'queued') l.status = 'active'; });
  if (!state.approvals.some(a => a.type === 'Atlas 75+ Success Sprint' && a.status === 'pending' && !a.archived)) {
    pushApproval({ type:'Atlas 75+ Success Sprint', item:'45-day Etsy revenue plan', listingId:null, why:'Activates the focused execution system needed to move success odds from 45% to 75%+.', conf:0.76, agent:'Atlas' });
  }
  state.learningLog.unshift({ agent:'Atlas', lesson:'Moved to 75%+ execution mode by activating all five success levers.', time: nowTs() });
  state.learningLog = state.learningLog.slice(0, 8);
  logAction(`Atlas launched the 75+ push. Success probability is now ${successProb()}%.`);
  persist(); rerenderAll();
  toast('75+ Push launched — success plan activated and queued for approval.', 'success');
}

function activateSuccessLever(id) {
  const lever = state.successPlan.find(l => l.id === id);
  if (!lever || lever.status !== 'queued') return;
  lever.status = 'active';
  state.learningLog.unshift({ agent: lever.owner, lesson: `Activated: ${lever.title}.`, time: nowTs() });
  logAction(`${lever.owner} activated: ${lever.title} (+${lever.impact} pts).`);
  persist(); rerenderAll();
  toast(`Lever activated: ${lever.title}`, 'success');
}

function createLaunchAgent(id) {
  const agent = state.launchAgents.find(a => a.id === id);
  if (!agent || agent.status === 'active') return;
  agent.status = 'active';
  state.learningLog.unshift({ agent:'Atlas', lesson: `Created ${agent.name} to cover ${agent.role}.`, time: nowTs() });
  logAction(`Atlas created ${agent.name} before launch.`);
  persist(); rerenderAll();
  toast(`${agent.name} is now active.`, 'success');
}

function reviewFundingTier(id) {
  const tier = state.investmentPlan.find(t => t.id === id);
  if (!tier) return;
  if (!state.approvals.some(a => a.type === 'Funding Review' && a.item === tier.label && a.status === 'pending' && !a.archived)) {
    pushApproval({ type:'Funding Review', item:tier.label, listingId:null, why:`Review whether to allocate $${tier.spend} for ${tier.use} Expected 45-day revenue: $${tier.projected} at ${tier.confidence}% confidence (${tier.roi}).`, conf:tier.confidence / 100, agent:'Pricing & ROI Agent' });
  }
  logAction(`Pricing & ROI Agent queued ${tier.label} funding review.`);
  persist(); rerenderAll();
  toast(`${tier.label} funding review queued for approval.`, 'warn');
}

function prepareLaunchPack() {
  const readiness = launchReadiness();
  if (!state.approvals.some(a => a.type === 'Launch Pack Review' && a.status === 'pending' && !a.archived)) {
    pushApproval({ type:'Launch Pack Review', item:'Agent Atlas launch pack', listingId:null, why:`Owner review required. Readiness is ${readiness.score}/100 (${launchLabel(readiness.score)}).`, conf:readiness.score / 100, agent:'Atlas' });
  }
  logAction(`Atlas prepared the launch pack at ${readiness.score}/100 readiness.`);
  persist(); rerenderAll();
  openLaunchBrief();
  toast('Launch pack prepared and queued for owner approval.', 'info');
}

function openLaunchBrief() {
  const r = launchReadiness();
  const blockers = r.checks.filter(c => !c.passed).map(c => `  - ${c.label}: ${c.value}`).join('\n') || '  - No critical blockers.';
  const agents = state.launchAgents.filter(a => a.status === 'active').map(a => `  - ${a.name}: ${a.role}`).join('\n') || '  - No launch agents active yet.';
  const listings = state.listings.filter(l => ['ready to upload','live'].includes(l.status)).map(l => `  - ${l.id} ${l.title} ($${l.price}) — ${l.status}`).join('\n') || '  - No ready/live listings.';
  const brief = `AGENT ATLAS — LAUNCH BRIEF
Readiness: ${r.score}/100 (${launchLabel(r.score)})
Success probability: ${successProb()}%
Projected monthly revenue: $${estimateMonthly().toFixed(0)}

BLOCKERS
${blockers}

ACTIVE LAUNCH AGENTS
${agents}

READY / LIVE LISTINGS
${listings}

OWNER RULE
No external publishing or paid spend until owner approval is recorded in the Approval Queue.`;
  openPanel('Launch Brief', `
    <div style="font-size:.8rem;color:var(--muted)">Atlas-generated pre-launch brief for owner review.</div>
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
      ${opts.map(f => `<button class="pill ${filter === f ? 'active' : ''}" data-filter="${f}">${f} ${f === 'All' ? `(${base.length})` : `(${base.filter(o => o.filter === f).length})`}</button>`).join('')}
    </div>
    <div class="card-grid">
      ${data.map(o => `
        <div class="op-card" data-id="${o.id}">
          <div class="row" style="margin-bottom:4px">
            <span class="badge ${o.status.toLowerCase()}">${o.status}</span>
            <span class="text-muted mono" style="font-size:.7rem">${o.id}</span>
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
  openPanel(o.title, `
    <div class="text-muted">${o.niche} &nbsp;·&nbsp; <span class="mono">${o.id}</span></div>
    <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
      ${kpiCard('Score', o.score, 'composite', 'blue')}
      ${kpiCard('Difficulty', `${o.difficulty}/5`, 'to build', 'warn')}
      ${kpiCard('Bundle', `${o.bundle}/10`, 'potential', 'green')}
    </div>
    <div class="divider"></div>
    <div style="font-size:.82rem;color:var(--text2)"><strong>Status:</strong> ${o.status} &nbsp;&nbsp; <strong>Priority filter:</strong> ${o.filter}</div>
    <div style="font-size:.82rem;color:var(--text2)"><strong>Recommended next action:</strong> ${o.next}</div>
    <button class="btn approve" id="create-draft-btn">Create Listing Draft</button>`);
  document.getElementById('create-draft-btn').onclick = () => createListingFromOpportunity(o);
}

function createListingFromOpportunity(op) {
  const nextId = `LS-${String(state.listings.length + 1).padStart(3,'0')}`;
  const listing = {
    id: nextId, name: op.title, price: Number((op.score + 1.99).toFixed(2)),
    buyer: `${op.niche} owner-operators`, bundle: `${op.niche} Starter Pack`,
    perf: 'N/A', status: 'draft', category: op.niche,
    tags: `${op.niche.toLowerCase()} template, service form, back office`,
    description: `Editable ${op.niche} template designed to simplify daily operations and team consistency.`,
    title: `${op.title} Template for ${op.niche} Service Businesses`,
    faq: 'Can I edit this template? Yes, fully editable.',
    imagePrompt: `Premium ${op.niche} operations template mockup in modern workspace.`,
  };
  state.listings.unshift(listing);
  state.selectedListingId = nextId;
  op.status = 'Converted';
  logAction(`Listing Agent created draft ${nextId} from ${op.id} (${op.title}).`);
  persist(); rerenderAll();
  openListingEditor(nextId);
  toast(`Draft ${nextId} created from ${op.id}.`, 'success');
}

/* ─── Listings ─────────────────────────────────────────────────────── */
function renderListings() {
  const active   = state.listings.filter(l => l.status !== 'archived');
  const selected = active.find(l => l.id === state.selectedListingId) || active[0];
  if (selected) state.selectedListingId = selected.id;

  const view = document.getElementById('listing-view');
  view.innerHTML = `
    <div class="card">
      <div class="table-wrap">
        <table class="table">
          <thead><tr>
            <th>Product</th><th>Price</th><th>Target Buyer</th><th>Bundle</th><th>Performance</th><th>Status</th><th></th>
          </tr></thead>
          <tbody>
            ${active.map(l => `
              <tr class="${selected?.id === l.id ? 'selected-row' : ''}" data-select="${l.id}">
                <td><strong>${l.name}</strong></td>
                <td class="mono">$${l.price.toFixed(2)}</td>
                <td>${l.buyer}</td>
                <td>${l.bundle}</td>
                <td><span class="badge ${l.perf === 'Winner' ? 'live' : ''}">${l.perf}</span></td>
                <td><span class="badge ${statusBadgeClass(l.status)}">${l.status}</span></td>
                <td><button class="pill edit-listing" data-id="${l.id}">Edit</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <div class="section-header">
        <span class="section-title">Copy-Ready Blocks ${selected ? `&nbsp;<span class="mono text-muted" style="font-size:.75rem">${selected.id}</span>` : ''}</span>
        <button class="pill" onclick="copyText('copy-block-listing')">Copy All</button>
      </div>
      <div class="copy-block" id="copy-block-listing">Title: ${selected?.title || ''}
Tags: ${selected?.tags || ''}
Description: ${selected?.description || ''}
FAQ: ${selected?.faq || 'Can I edit this file? Yes, editable format included.'}
Image Prompt: ${selected?.imagePrompt || 'Premium AI-operator dashboard mockup with listing highlights.'}</div>
    </div>`;

  view.querySelectorAll('tr[data-select]').forEach(r => r.onclick = () => {
    state.selectedListingId = r.dataset.select; persist(); renderListings();
  });
  view.querySelectorAll('.edit-listing').forEach(b => b.onclick = e => {
    e.stopPropagation(); openListingEditor(b.dataset.id);
  });
}

function statusBadgeClass(s) {
  if (s === 'live') return 'live';
  if (s === 'draft' || s === 'idea') return 'draft';
  if (s === 'ready to upload') return 'ready';
  if (s === 'review' || s === 'needs update') return 'review';
  return '';
}

function openListingEditor(id, revisionApprovalId = null) {
  const l = state.listings.find(x => x.id === id);
  if (!l) return;
  openPanel(`Edit ${l.id}`, `
    <label>Title<input id="f-title" value="${esc(l.title)}" /></label>
    <label>Price<input id="f-price" type="number" step="0.01" value="${l.price}" /></label>
    <label>Target Buyer<input id="f-buyer" value="${esc(l.buyer)}" /></label>
    <label>Status<select id="f-status">
      ${['idea','draft','ready to upload','live','needs update','archived'].map(s => `<option ${l.status === s ? 'selected' : ''}>${s}</option>`).join('')}
    </select></label>
    <label>Tags<input id="f-tags" value="${esc(l.tags)}" /></label>
    <label>Short Description<textarea id="f-desc">${esc(l.description)}</textarea></label>
    <div class="divider"></div>
    <label>Recommendation Type<select id="rec-type">
      <option>Publish Listing</option><option>Price Update</option><option>Content Refresh</option>
    </select></label>
    <label>Rationale<textarea id="rec-why">Ready for owner review after listing optimization.</textarea></label>
    <label>Confidence<select id="rec-conf">
      <option value="0.65">65%</option><option value="0.75" selected>75%</option><option value="0.85">85%</option><option value="0.92">92%</option>
    </select></label>
    <label>Source Agent<select id="rec-agent">
      <option>Listing Agent</option><option>Performance Agent</option><option>Approval Agent</option>
    </select></label>
    <div class="actions">
      <button class="btn approve"  id="save-listing-btn">Save</button>
      <button class="btn sendback" id="submit-rec-btn">Submit Recommendation</button>
      ${revisionApprovalId ? `<button class="btn primary" id="resubmit-revision-btn">Submit for Approval</button>` : ''}
    </div>`);

  document.getElementById('save-listing-btn').onclick = () => {
    l.title       = document.getElementById('f-title').value;
    l.name        = l.title;
    l.price       = parseFloat(document.getElementById('f-price').value);
    l.buyer       = document.getElementById('f-buyer').value;
    l.status      = document.getElementById('f-status').value;
    l.tags        = document.getElementById('f-tags').value;
    l.description = document.getElementById('f-desc').value;
    state.selectedListingId = l.id;
    if (revisionApprovalId) {
      const rev = state.approvals.find(a => a.id === revisionApprovalId);
      if (rev) pushHistory(rev, 'edited during revision');
    }
    logAction(`Listing Agent edited ${l.id} → status: ${l.status}.`);
    persist(); rerenderAll();
    toast(`${l.id} saved.`, 'success');
  };

  document.getElementById('submit-rec-btn').onclick = () => {
    submitRecommendation(l, {
      type:  document.getElementById('rec-type').value,
      why:   document.getElementById('rec-why').value,
      conf:  parseFloat(document.getElementById('rec-conf').value),
      agent: document.getElementById('rec-agent').value,
    });
    persist(); rerenderAll();
    toast('Recommendation submitted to Approval Queue.', 'info');
  };

  const resubBtn = document.getElementById('resubmit-revision-btn');
  if (resubBtn) resubBtn.onclick = () => resubmitApproval(revisionApprovalId);
}

/* ─── Approvals ────────────────────────────────────────────────────── */
function renderApprovals() {
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived);
  const revisions = state.approvals.filter(a => a.status === 'revise'  && !a.archived);
  const audit     = state.approvals.slice().reverse().slice(0, 10);
  const view = document.getElementById('approval-view');

  view.innerHTML = `
    <div class="kpi-grid">
      ${kpiCard('Pending', pending.length, 'decisions awaiting owner', pending.length > 0 ? 'warn' : 'green')}
      ${kpiCard('In Revision', revisions.length, 'items sent back', 'blue')}
      ${kpiCard('Total Audited', state.approvals.filter(a => a.history?.length).length, 'all-time actions', 'blue')}
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Approval Queue</span></div>
      ${pending.length ? `<div class="card-grid mt-8">
        ${pending.map(a => approvalCard(a)).join('')}
      </div>` : `<p class="text-muted mt-8">No pending approvals.</p>`}
    </div>

    ${revisions.length ? `
    <div class="card">
      <div class="section-header"><span class="section-title">Revision Queue</span></div>
      <div class="card-grid mt-8">
        ${revisions.map(a => `
          <div class="approval-card">
            <div class="approval-type">Revision</div>
            <div class="approval-item">${a.item}</div>
            <div class="approval-why">${a.revisionReason || a.why}</div>
            <div class="approval-meta">${a.agent} &nbsp;·&nbsp; ${(a.conf * 100).toFixed(0)}% &nbsp;·&nbsp; Sent back: ${a.revisedAt || a.createdAt}</div>
            <div class="actions">
              <button class="pill open-revise" data-id="${a.id}">Open Editor</button>
              <button class="btn approve resubmit" data-id="${a.id}">Re-submit</button>
              <button class="pill view-audit" data-id="${a.id}">Audit</button>
            </div>
          </div>`).join('')}
      </div>
    </div>` : ''}

    <div class="card">
      <div class="section-header"><span class="section-title">Approval Audit Trail</span></div>
      <div class="audit-list mt-8">
        ${audit.map(a => `
          <div class="audit-row">
            <div>
              <strong style="font-size:.85rem">${a.item}</strong>
              <p class="text-muted">${a.type} &nbsp;·&nbsp; ${a.agent} &nbsp;·&nbsp; ${(a.conf * 100).toFixed(0)}% &nbsp;·&nbsp; <span class="${a.status === 'approved' ? 'text-success' : a.status === 'revise' ? 'text-warn' : ''}">${a.status}</span></p>
            </div>
            <button class="pill view-audit" data-id="${a.id}">Audit</button>
          </div>`).join('') || '<p class="text-muted">No audited actions yet.</p>'}
      </div>
    </div>`;

  view.querySelectorAll('.approve:not(.resubmit)').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'approve'));
  view.querySelectorAll('.sendback').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'sendback'));
  view.querySelectorAll('.archive').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'archive'));
  view.querySelectorAll('.open-revise').forEach(b => b.onclick = () => {
    const a = state.approvals.find(x => x.id === b.dataset.id);
    if (a?.listingId) { pushHistory(a, 'opened for revision'); logAction(`Opened revision editor for ${a.item}.`); persist(); openListingEditor(a.listingId, a.id); }
  });
  view.querySelectorAll('.resubmit').forEach(b => b.onclick = () => resubmitApproval(b.dataset.id));
  view.querySelectorAll('.view-audit').forEach(b => b.onclick = () => openAuditPanel(b.dataset.id));
}

function approvalCard(a) {
  return `<div class="approval-card ${a.important ? 'important' : ''}">
    <div class="approval-type">${a.type}</div>
    <div class="approval-item">${a.item}</div>
    <div class="approval-why">${a.why}</div>
    <div class="approval-meta">${a.agent} &nbsp;·&nbsp; Created: ${a.createdAt}</div>
    <div style="margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);margin-bottom:3px"><span>Confidence</span><span>${(a.conf * 100).toFixed(0)}%</span></div>
      <div class="conf-bar"><div style="width:${a.conf * 100}%"></div></div>
    </div>
    <div class="actions">
      <button class="btn approve" data-id="${a.id}">Approve</button>
      <button class="btn sendback" data-id="${a.id}">Send Back</button>
      <button class="btn archive" data-id="${a.id}">Archive</button>
      <button class="pill view-audit" data-id="${a.id}">Audit</button>
    </div>
  </div>`;
}

function handleApproval(id, action) {
  const item = state.approvals.find(a => a.id === id);
  if (!item) return;
  const listing = item.listingId ? state.listings.find(l => l.id === item.listingId) : null;

  if (action === 'approve') {
    item.status = 'approved';
    if (listing) listing.status = 'ready to upload';
    pushHistory(item, 'approved by owner');
    logAction(`${item.agent} approved ${item.type} for ${item.item}.`);
    toast(`Approved: ${item.item}`, 'success');
  }
  if (action === 'sendback') {
    item.status = 'revise';
    item.revisedAt = nowTs();
    item.revisionReason = `Revision requested after owner review: ${item.why}`;
    if (listing) listing.status = 'needs update';
    pushHistory(item, 'sent back for revision');
    logAction(`${item.agent} sent back ${item.item} for revision.`);
    toast(`Sent back for revision: ${item.item}`, 'warn');
  }
  if (action === 'archive') {
    item.archived = true;
    item.status = 'archived';
    if (listing) listing.status = 'archived';
    pushHistory(item, 'archived by owner');
    logAction(`${item.agent} archived ${item.item}.`);
    toast(`Archived: ${item.item}`, 'warn');
  }
  persist(); rerenderAll();
}

function openAuditPanel(approvalId) {
  const a = state.approvals.find(x => x.id === approvalId);
  if (!a) return;
  const listing = a.listingId ? state.listings.find(l => l.id === a.listingId) : null;
  openPanel('Approval Audit', `
    <div class="text-muted"><span class="mono">${a.id}</span> &nbsp;·&nbsp; ${a.status}</div>
    <div style="font-weight:700;font-size:.95rem">${a.item}</div>
    <div style="font-size:.82rem;color:var(--text2)">${a.type} recommended by <strong>${a.agent}</strong> at ${(a.conf * 100).toFixed(0)}% confidence.</div>
    <div style="font-size:.8rem;color:var(--muted)">Rationale: ${a.why}</div>
    ${listing ? `<div class="copy-block">Linked: ${listing.id}\nStatus: ${listing.status}\nPrice: $${listing.price}\nBuyer: ${listing.buyer}</div>` : ''}
    <div style="font-weight:700;margin-top:4px">Event History</div>
    <div class="history-list">
      ${(a.history || []).map(h => `<div class="history-item"><span class="history-time mono">${h.time}</span><span class="history-event">${h.event}${h.agent ? ` &nbsp;·&nbsp; ${h.agent}` : ''}${h.confidence ? ` &nbsp;·&nbsp; ${(h.confidence * 100).toFixed(0)}%` : ''}</span></div>`).join('') || '<div class="history-item"><span class="history-event">No audit events yet.</span></div>'}
    </div>
    ${listing ? `<button class="pill" id="audit-open-listing-btn">Open Listing</button>` : ''}`);
  const openBtn = document.getElementById('audit-open-listing-btn');
  if (openBtn) openBtn.onclick = () => openListingEditor(listing.id, a.status === 'revise' ? a.id : null);
}

function resubmitApproval(approvalId) {
  const old = state.approvals.find(x => x.id === approvalId);
  if (!old) return;
  const newId = `AP-${String(state.approvals.length + 1).padStart(3,'0')}`;
  state.approvals.push({ ...old, id:newId, status:'pending', archived:false, createdAt:nowTs(), revisionReason:null, revisedAt:null, history:[...(old.history||[]), { event:'resubmitted', time:nowTs() }] });
  old.archived = true; old.status = 'resubmitted';
  pushHistory(old, 'resubmission triggered');
  logAction(`${old.agent} re-submitted ${old.item} for approval.`);
  persist(); rerenderAll();
  toast('Re-submitted for approval.', 'info');
}

/* ─── Revenue ──────────────────────────────────────────────────────── */
function renderRevenue() {
  const rev     = currentRevenue();
  const monthly = estimateMonthly();
  const sorted  = state.listings.filter(l => ['live','ready to upload'].includes(l.status)).sort((a,b) => b.price - a.price);
  const maxVal  = sorted.reduce((m,l) => Math.max(m, l.price * (l.status === 'live' ? 8 : 3)), 1);

  const view = document.getElementById('revenue-view');
  view.innerHTML = `
    <div class="kpi-grid">
      ${kpiCard('Current Revenue',  `$${rev.toFixed(2)}`, 'of $500 goal',           'blue',  `<div class="progress slim mt-4"><div style="width:${Math.min(rev/5,100)}%"></div></div>`)}
      ${kpiCard('Monthly Run-Rate', `$${monthly.toFixed(0)}`, 'projected',           'green')}
      ${kpiCard('Days Remaining',   33,   'of 45-day window',                         'warn')}
      ${kpiCard('Pace',             rev >= 217 ? 'On Track' : 'Behind', 'to goal',   rev >= 217 ? 'green' : 'red')}
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="section-header"><span class="section-title">45-Day Goal Tracker</span></div>
        <div style="font-size:2rem;font-weight:900;font-variant-numeric:tabular-nums;margin:8px 0">$${rev.toFixed(2)} <span style="font-size:1rem;font-weight:400;color:var(--muted)">/ $500</span></div>
        <div class="progress success thick"><div style="width:${Math.min(rev/5,100)}%"></div></div>
        <p class="text-muted mt-8">Remaining: <strong>$${(500 - rev).toFixed(2)}</strong> &nbsp;·&nbsp; Pace: ${rev >= 217 ? 'On track' : 'Bundle conversion needs +15%'}</p>
      </div>
      <div class="card">
        <div class="section-header"><span class="section-title">Revenue by Listing</span></div>
        <div class="spark-wrap">
          ${sorted.map(l => {
            const val = l.price * (l.status === 'live' ? 8 : 3);
            const h   = Math.max(10, (val / maxVal) * 100);
            return `<div class="spark-bar ${l.perf === 'Winner' ? 'winner' : ''}" style="height:${h}%" title="${l.name}: $${val.toFixed(0)}"></div>`;
          }).join('')}
        </div>
        <div class="text-muted mt-8" style="font-size:.72rem">Each bar = 45-day projected revenue per listing</div>
      </div>
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Listing Revenue Breakdown</span></div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Listing</th><th>Price</th><th>Status</th><th>Multiplier</th><th>Projected</th><th>Performance</th></tr></thead>
          <tbody>
            ${sorted.map(l => {
              const mult = l.status === 'live' ? 8 : 3;
              const proj = l.price * mult;
              return `<tr>
                <td><strong>${l.name}</strong></td>
                <td class="mono">$${l.price.toFixed(2)}</td>
                <td><span class="badge ${statusBadgeClass(l.status)}">${l.status}</span></td>
                <td class="mono text-muted">${mult}×</td>
                <td class="mono ${proj > 50 ? 'text-success' : ''}">$${proj.toFixed(0)}</td>
                <td><span class="badge ${l.perf === 'Winner' ? 'live' : ''}">${l.perf}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Bundle Ladder</span></div>
      <div class="kpi-grid">
        ${[
          { tier:'Entry',   offer:'Single Template',           price:'$4.99–8.99',  desc:'One niche-specific document' },
          { tier:'Core',    offer:'Niche Starter Pack',        price:'$14.99',      desc:'3–5 templates + quick-start guide' },
          { tier:'Pro',     offer:'Back-Office Ops Bundle',    price:'$29.99',      desc:'10 templates + KPI tracker' },
          { tier:'Premium', offer:'Service Business Admin Vault', price:'$49.99',   desc:'20+ templates + onboarding system' },
        ].map(b => kpiCard(b.tier, b.price, `${b.offer} — ${b.desc}`, 'blue')).join('')}
      </div>
    </div>`;
}

/* ─── Shared helpers ───────────────────────────────────────────────── */
function pushApproval({ type, item, listingId, why, conf, agent }) {
  const id = `AP-${String(state.approvals.length + 1).padStart(3,'0')}`;
  state.approvals.push({ id, type, item, listingId, opportunityId:null, why, conf, agent, important:true, status:'pending', archived:false, createdAt:nowTs(), history:[{ event:'submitted for approval', time:nowTs(), agent, confidence:conf, item }] });
}

function submitRecommendation(listing, payload) {
  pushApproval({ type:payload.type, item:listing.title, listingId:listing.id, why:payload.why, conf:payload.conf, agent:payload.agent });
  logAction(`${payload.agent} submitted recommendation for ${listing.id} (${payload.type}, ${(payload.conf*100).toFixed(0)}%).`);
}

function pushHistory(item, event) {
  item.history = item.history || [];
  item.history.push({ event, time:nowTs(), agent:item.agent, confidence:item.conf, item:item.item });
}

function esc(str) {
  return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function copyText(id) {
  const el = document.getElementById(id);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText).then(() => toast('Copied to clipboard.', 'success'));
}

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

rerenderAll();
persist();

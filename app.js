const STORAGE_KEY = 'agentAtlasV1State';

const seed = {
  selectedListingId: 'LS-001',
  opportunities: [
    ['HVAC Service Call Debrief Sheet','HVAC',2,8.8,8,'Best Now'],['Plumbing No-Heat Diagnostic Checklist','Plumbing',3,8.5,9,'Best Now'],['Electrician Jobsite Walkthrough Form','Electrical',4,8.3,8,'Easiest'],['Pressure Washing Route Sheet','Exterior Cleaning',1,8.5,7,'Easiest'],['Auto Detail Intake + Damage Waiver','Auto Detailing',2,8.8,9,'Bundle'],['Lawn Care Weekly Crew Plan','Lawn Care',1,8.8,8,'Seasonal'],['Septic Service Pump Log','Septic',5,7.5,7,'Seasonal'],['Appliance Repair Parts Tracker','Appliance',3,8.3,9,'Bundle'],['Handyman Materials Reimbursement','Handyman',1,8.3,7,'Easiest'],['Pest Control Follow-Up Card','Pest Control',1,8.8,8,'Best Now'],['Roofing Change-Order Pack','Roofing',5,8.3,10,'Bundle'],['Window Cleaning Client Packet','Window Cleaning',2,8.0,8,'Seasonal'],['Snow Removal Trigger Checklist','Snow Removal',2,8.3,8,'Seasonal'],['Mobile Mechanic Service Summary','Mobile Mechanic',3,8.3,9,'Best Now'],['Locksmith Job Authorization','Locksmith',2,8.3,8,'Best Now'],['Painting Prep & Punch List','Painting',2,8.8,9,'Bundle'],['Pool Service Chemical Log','Pool Service',3,8.0,8,'Seasonal'],['Flooring Estimate Scope Matrix','Flooring',4,8.0,9,'Bundle'],['Generic Service Fee Addendum','Multi-Trade',2,8.0,7,'Best Now'],['Contractor Daily Site Report','Contracting',4,8.3,10,'Bundle']
  ].map((o, i) => ({ id:`OP-${(i+1).toString().padStart(3,'0')}`, title:o[0], niche:o[1], difficulty:o[2], score:o[3], bundle:o[4], status:i%3===0?'Ready':i%3===1?'Draft':'Review', filter:o[5], next:'Generate first Etsy listing draft and queue for approval.', archived:false })),
  listings: [
    {id:'LS-001',name:'HVAC Tech Service Call Notes Template',price:7.99,buyer:'Owner-Operator HVAC Tech',bundle:'HVAC Starter Pack',perf:'Winner',status:'live',category:'HVAC',tags:'hvac template, service call form',description:'Editable notes template for HVAC technicians.',title:'HVAC Tech Service Call Notes Template (Editable PDF)',faq:'Can I edit in Canva? Yes, editable link is included.',imagePrompt:'Premium HVAC paperwork mockup with modern workstation.'},
    {id:'LS-002',name:'Plumbing Dispatch & Diagnosis Checklist',price:11.99,buyer:'Small Plumbing Teams',bundle:'Plumbing Ops Kit',perf:'Winner',status:'live',category:'Plumbing',tags:'plumbing checklist, dispatch form',description:'Diagnostic workflow checklist for plumbing teams.',title:'Plumbing Dispatch & Diagnosis Checklist Bundle',faq:'Is this printable? Yes, includes print-ready and editable versions.',imagePrompt:'Blue-collar office scene with dispatch checklist on tablet.'},
    {id:'LS-003',name:'Electrician Jobsite Inspection Form Pack',price:9.99,buyer:'Solo Electricians',bundle:'Electrical Admin Bundle',perf:'Stable',status:'live',category:'Electrical',tags:'electrician form, site inspection',description:'Field inspection forms for electricians.',title:'Electrician Jobsite Inspection Form Pack',faq:'Can this work for residential and commercial jobs? Yes.',imagePrompt:'Clean clipboard form layout for electricians with premium lighting.'},
    {id:'LS-004',name:'Lawn Care Weekly Crew Planner',price:6.99,buyer:'Lawn Route Managers',bundle:'Lawn Backoffice Kit',perf:'Winner',status:'live',category:'Lawn Care',tags:'lawn crew planner, route sheet',description:'Weekly crew planner for lawn operators.',title:'Lawn Care Weekly Crew Planner',faq:'Can I customize route columns? Yes.',imagePrompt:'Operations dashboard overlay with route planner templates.'},
    {id:'LS-005',name:'Auto Detail Intake + Waiver Kit',price:12.99,buyer:'Mobile Detail Owners',bundle:'Detailing Client Ops',perf:'Stable',status:'live',category:'Auto Detailing',tags:'auto detail waiver, intake sheet',description:'Client intake and damage waiver set.',title:'Auto Detail Intake + Waiver Kit',faq:'Does it include waiver language? Yes.',imagePrompt:'Luxury detailing intake sheet on premium car interior background.'},
    {id:'LS-006',name:'Pest Control Follow-Up Card Templates',price:5.99,buyer:'Pest Control Teams',bundle:'Pest Retention Pack',perf:'N/A',status:'draft',category:'Pest Control',tags:'pest follow-up, service card',description:'Follow-up card templates for recurring service.',title:'Pest Control Follow-Up Card Templates',faq:'Can I add my logo? Yes.',imagePrompt:'Minimal service card set displayed on dark desk.'},
    {id:'LS-007',name:'Roofing Change Order + Approval Form',price:14.99,buyer:'Roofing Contractors',bundle:'Roofing Scope Pack',perf:'N/A',status:'ready to upload',category:'Roofing',tags:'roofing change order, approval form',description:'Change order and approval packet.',title:'Roofing Change Order + Approval Form',faq:'Is e-sign friendly? Yes.',imagePrompt:'Contractor approval forms with premium construction office styling.'}
  ],
  approvals: [
    {id:'AP-001',type:'Publish Listing',item:'Roofing Change Order + Approval Form',listingId:'LS-007',opportunityId:null,why:'Strong bundle lift projected at +22%.',conf:0.84,agent:'Approval Agent',important:true,status:'pending',archived:false,createdAt:'09:10',history:[]},
    {id:'AP-002',type:'Price Increase',item:'Lawn Care Weekly Crew Planner',listingId:'LS-004',opportunityId:null,why:'High conversion supports test at $7.99.',conf:0.78,agent:'Performance Agent',important:true,status:'pending',archived:false,createdAt:'09:05',history:[]}
  ],
  activity: [
    {msg:'Opportunity Agent scored 4 new bundle candidates.',time:'09:12'},
    {msg:'Listing Agent generated SEO drafts for LS-006.',time:'08:47'},
    {msg:'Performance Agent flagged LS-004 for pricing test.',time:'08:15'}
  ]
};

let state = loadState();
ensureStateShape();
const views = { dashboard:document.getElementById('dashboard-view'), opportunity:document.getElementById('opportunity-view'), listing:document.getElementById('listing-view'), approval:document.getElementById('approval-view'), revenue:document.getElementById('revenue-view') };

function loadState(){ const raw=localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):structuredClone(seed); }
function persist(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function nowTs(){ return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}); }
function logAction(msg){ state.activity.unshift({msg,time:nowTs()}); state.activity=state.activity.slice(0,30); }
function ensureStateShape(){ if(!state.selectedListingId) state.selectedListingId=state.listings?.[0]?.id||null; state.approvals.forEach(a=>{a.history=a.history||[]; if(!a.createdAt)a.createdAt=nowTs();}); }

function renderNav(){
  const nav=document.getElementById('main-nav'); nav.innerHTML='';
  ['dashboard','opportunity','listing','approval','revenue'].forEach(v=>{ const b=document.createElement('button'); b.className='nav-btn'; b.textContent=v[0].toUpperCase()+v.slice(1); if(v==='dashboard') b.classList.add('active'); b.onclick=()=>switchView(v,b); nav.appendChild(b); });
}
function switchView(v,b){ document.querySelectorAll('.view').forEach(x=>x.classList.remove('active')); views[v].classList.add('active'); if(b){document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); document.getElementById('view-title').textContent=b.textContent;}}

function estimateMonthlyRevenue(){ return state.listings.filter(l=>['live','ready to upload'].includes(l.status)).reduce((a,l)=>a+l.price*(l.status==='live'?8:3),0).toFixed(0); }
function currentRevenue(){ return state.listings.filter(l=>l.status==='live').reduce((a,l)=>a+l.price*4,0); }

function renderDashboard(){
  const live=state.listings.filter(l=>l.status==='live').length; const ready=state.listings.filter(l=>l.status==='ready to upload').length; const rev=currentRevenue();
  views.dashboard.innerHTML=`<div class='kpi-grid'>
    <div class='card'><div class='muted'>Goal Progress</div><div class='kpi-num'>$${rev.toFixed(2)} / $500</div><div class='progress'><div style='width:${Math.min(rev/5,100)}%'></div></div></div>
    <div class='card'><div class='muted'>Listings Live</div><div class='kpi-num'>${live}</div></div>
    <div class='card'><div class='muted'>Ready to Upload</div><div class='kpi-num'>${ready}</div></div>
    <div class='card'><div class='muted'>Est. Monthly Revenue</div><div class='kpi-num'>$${estimateMonthlyRevenue()}</div></div>
    <div class='card'><div class='muted'>Top Opportunity Score</div><div class='kpi-num'>${Math.max(...state.opportunities.filter(o=>!o.archived).map(o=>o.score))}</div></div>
  </div><div class='card'><h3>Recent Agent Activity</h3><div class='feed'>${state.activity.map(e=>`<div class='row'><span>${e.msg}</span><span class='muted'>${e.time}</span></div>`).join('')}</div></div>`;
}

function renderOpportunities(filter='All'){
  const opts=['All','Best Now','Easiest','Bundle','Seasonal']; const base=state.opportunities.filter(o=>!o.archived); const data=filter==='All'?base:base.filter(o=>o.filter===filter);
  views.opportunity.innerHTML=`<div class='filter-row'>${opts.map(f=>`<button class='pill ${filter===f?'active':''}' data-filter='${f}'>${f}</button>`).join('')}</div><div class='card-grid'>${data.map(o=>`<div class='card op-card' data-id='${o.id}'><div class='row'><strong>${o.title}</strong><span class='badge'>${o.status}</span></div><div class='muted'>${o.niche}</div><div class='row'><span>Difficulty ${o.difficulty}/5</span><span>Score ${o.score}</span></div><div>Bundle Potential: ${o.bundle}/10</div></div>`).join('')}</div>`;
  views.opportunity.querySelectorAll('.pill').forEach(p=>p.onclick=()=>renderOpportunities(p.dataset.filter));
  views.opportunity.querySelectorAll('.op-card').forEach(c=>c.onclick=()=>openOpportunityPanel(c.dataset.id));
}

function renderListings(){
  const active=state.listings.filter(l=>l.status!=='archived');
  const selected=state.listings.find(l=>l.id===state.selectedListingId) || active[0];
  if(selected) state.selectedListingId=selected.id;
  views.listing.innerHTML=`<div class='card'><table class='table'><thead><tr><th>Product</th><th>Price</th><th>Target Buyer</th><th>Bundle</th><th>Performance</th><th>Status</th><th></th></tr></thead><tbody>${active.map(l=>`<tr class='${selected?.id===l.id?'selected-row':''}' data-select='${l.id}'><td>${l.name}</td><td>$${l.price}</td><td>${l.buyer}</td><td>${l.bundle}</td><td>${l.perf}</td><td>${l.status}</td><td><button class='pill edit-listing' data-id='${l.id}'>Edit</button></td></tr>`).join('')}</tbody></table></div>
  <div class='card'><h3>Copy-Ready Blocks ${selected?`• ${selected.id}`:''}</h3><div class='copy-block'>Title: ${selected?.title||''}
Tags: ${selected?.tags||''}
Description: ${selected?.description||''}
FAQ: ${selected?.faq||'Can I edit this file? Yes, editable format included.'}
Image Prompt: ${selected?.imagePrompt||'Premium AI-operator dashboard mockup with listing highlights.'}</div></div>`;
  views.listing.querySelectorAll('tr[data-select]').forEach(r=>r.onclick=()=>{ state.selectedListingId=r.dataset.select; persist(); renderListings(); });
  views.listing.querySelectorAll('.edit-listing').forEach(b=>b.onclick=(e)=>{ e.stopPropagation(); openListingEditor(b.dataset.id); });
}

function renderApprovals(){
  const pending=state.approvals.filter(a=>a.status==='pending'&&!a.archived);
  const revisions=state.approvals.filter(a=>a.status==='revise'&&!a.archived);
  const audit=state.approvals.filter(a=>a.status!=='pending'||a.archived||a.history?.length).slice().reverse().slice(0,8);
  views.approval.innerHTML=`<div class='kpi-grid'>
    <div class='card'><div class='muted'>Pending Decisions</div><div class='kpi-num'>${pending.length}</div></div>
    <div class='card'><div class='muted'>In Revision</div><div class='kpi-num'>${revisions.length}</div></div>
    <div class='card'><div class='muted'>Audited Actions</div><div class='kpi-num'>${state.approvals.filter(a=>a.history?.length).length}</div></div>
  </div>
  <div class='card'><h3>Approval Queue</h3><div class='card-grid'>${pending.map(a=>`<div class='card'><h4>${a.type}</h4><p><strong>${a.item}</strong></p><p class='muted'>${a.why}</p><p>Agent: ${a.agent} • Confidence: ${(a.conf*100).toFixed(0)}%</p><div class='actions'><button class='btn approve' data-id='${a.id}'>Approve</button><button class='btn sendback' data-id='${a.id}'>Send Back</button><button class='btn archive' data-id='${a.id}'>Archive</button><button class='pill view-audit' data-id='${a.id}'>Audit</button></div></div>`).join('')||'<p class="muted">No pending approvals.</p>'}</div></div>
  <div class='card'><h3>Revision Queue</h3><div class='card-grid'>${revisions.map(a=>`<div class='card'><p><strong>${a.item}</strong></p><p class='muted'>Reason: ${a.revisionReason||a.why}</p><p>Recommendation: ${a.type}</p><p>Confidence: ${(a.conf*100).toFixed(0)}% • Agent: ${a.agent}</p><p class='muted'>Sent back: ${a.revisedAt||a.createdAt}</p><div class='actions'><button class='pill open-revise' data-id='${a.id}'>Open in Editor</button><button class='btn approve resubmit' data-id='${a.id}'>Re-submit for Approval</button><button class='pill view-audit' data-id='${a.id}'>Audit</button></div></div>`).join('')||'<p class="muted">No revision items.</p>'}</div></div>
  <div class='card'><h3>Approval Audit Trail</h3><div class='audit-list'>${audit.map(approvalAuditCard).join('')||'<p class="muted">No audited actions yet.</p>'}</div></div>`;
  views.approval.querySelectorAll('.approve').forEach(b=>b.onclick=()=>handleApprovalAction(b.dataset.id,'approve'));
  views.approval.querySelectorAll('.sendback').forEach(b=>b.onclick=()=>handleApprovalAction(b.dataset.id,'sendback'));
  views.approval.querySelectorAll('.archive').forEach(b=>b.onclick=()=>handleApprovalAction(b.dataset.id,'archive'));
  views.approval.querySelectorAll('.open-revise').forEach(b=>b.onclick=()=>openRevisionItem(b.dataset.id));
  views.approval.querySelectorAll('.resubmit').forEach(b=>b.onclick=()=>resubmitApproval(b.dataset.id));
  views.approval.querySelectorAll('.view-audit').forEach(b=>b.onclick=()=>openApprovalAudit(b.dataset.id));
}

function pushHistory(item, event){ item.history=item.history||[]; item.history.push({event, time:nowTs(), agent:item.agent, confidence:item.conf, item:item.item}); }
function historyList(item){ const history=item.history||[]; return history.length?history.map(h=>`<li><span>${h.time}</span> — ${h.event}${h.agent?` • ${h.agent}`:''}${h.confidence?` • ${(h.confidence*100).toFixed(0)}%`:''}</li>`).join(''):'<li>No audit events yet.</li>'; }
function approvalAuditCard(a){ return `<div class='audit-row'><div><strong>${a.item}</strong><p class='muted'>${a.type} • ${a.agent} • ${(a.conf*100).toFixed(0)}% • ${a.status}</p></div><button class='pill view-audit' data-id='${a.id}'>Audit</button></div>`; }

function handleApprovalAction(id, action){
  const item=state.approvals.find(a=>a.id===id); if(!item) return; const listing=item.listingId?state.listings.find(l=>l.id===item.listingId):null;
  if(action==='approve'){ item.status='approved'; if(listing) listing.status='ready to upload'; pushHistory(item,'approved'); logAction(`${item.agent} approved ${item.type} for ${item.item} at ${(item.conf*100).toFixed(0)}% confidence.`); }
  if(action==='sendback'){ item.status='revise'; if(listing) listing.status='needs update'; item.revisedAt=nowTs(); item.revisionReason=`Revision requested after owner review: ${item.why}`; pushHistory(item,'sent back for revision'); logAction(`${item.agent} sent back ${item.item} for revision (${(item.conf*100).toFixed(0)}%).`); }
  if(action==='archive'){ item.archived=true; item.status='archived'; if(listing) listing.status='archived'; pushHistory(item,'archived'); logAction(`${item.agent} archived recommendation for ${item.item} (${(item.conf*100).toFixed(0)}%).`); }
  persist(); rerenderAll();
}

function openRevisionItem(approvalId){
  const a=state.approvals.find(x=>x.id===approvalId); if(!a||!a.listingId) return; pushHistory(a,'opened for revision'); logAction(`${a.agent} opened revision editor for ${a.item} (${(a.conf*100).toFixed(0)}%).`); persist(); openListingEditor(a.listingId, approvalId);
}


function openApprovalAudit(approvalId){
  const a=state.approvals.find(x=>x.id===approvalId); if(!a) return;
  const listing=a.listingId?state.listings.find(l=>l.id===a.listingId):null;
  document.getElementById('panel-content').innerHTML=`<h3>Approval Audit</h3><p class='muted'>${a.id} • ${a.status}</p><h4>${a.item}</h4><p>${a.type} recommended by ${a.agent} at ${(a.conf*100).toFixed(0)}% confidence.</p><p class='muted'>Rationale: ${a.why}</p>${listing?`<div class='copy-block'>Linked Listing: ${listing.id}
Status: ${listing.status}
Price: $${listing.price}
Buyer: ${listing.buyer}</div>`:''}<h4>Event History</h4><ul class='history-list'>${historyList(a)}</ul><div class='actions'>${listing?`<button class='pill' id='audit-open-listing'>Open Listing</button>`:''}</div>`;
  document.getElementById('side-panel').classList.add('open');
  const openButton=document.getElementById('audit-open-listing');
  if(openButton) openButton.onclick=()=>openListingEditor(listing.id, a.status==='revise'?a.id:null);
}

function resubmitApproval(approvalId){
  const old=state.approvals.find(x=>x.id===approvalId); if(!old) return;
  const newId=`AP-${String(state.approvals.length+1).padStart(3,'0')}`;
  const next={...old,id:newId,status:'pending',archived:false,createdAt:nowTs(),revisionReason:null,revisedAt:null,history:[...(old.history||[]),{event:'resubmitted',time:nowTs()}]};
  old.archived=true; old.status='resubmitted'; pushHistory(old,'resubmission event');
  state.approvals.push(next);
  logAction(`${old.agent} re-submitted ${old.item} for approval (${(old.conf*100).toFixed(0)}%).`);
  persist(); rerenderAll();
}

function submitRecommendationFromListing(listing, payload){
  const id=`AP-${String(state.approvals.length+1).padStart(3,'0')}`;
  state.approvals.push({id,type:payload.type,item:listing.title,listingId:listing.id,opportunityId:null,why:payload.why,conf:payload.conf,agent:payload.agent,important:true,status:'pending',archived:false,createdAt:nowTs(),history:[{event:'submitted for approval',time:nowTs(),agent:payload.agent,confidence:payload.conf,item:listing.title}]});
  logAction(`${payload.agent} submitted recommendation for ${listing.id} (${payload.type}, ${(payload.conf*100).toFixed(0)}%).`);
}

function renderRevenue(){
  const r=currentRevenue(); const top=state.listings.filter(l=>l.status!=='archived').sort((a,b)=>b.price-a.price).slice(0,3); const bars=state.listings.filter(l=>['live','ready to upload'].includes(l.status)).map((l,i)=>Math.min(40,l.price*(i+3)));
  views.revenue.innerHTML=`<div class='card'><h3>45-Day Goal Tracker</h3><div class='kpi-num'>$${r.toFixed(2)} / $500</div><div class='progress'><div style='width:${Math.min(r/5,100)}%'></div></div><p class='muted'>Projected monthly run-rate: $${estimateMonthlyRevenue()}.</p></div><div class='grid-2'><div class='card'><h3>Projected Revenue by Listing</h3><ul>${top.map(l=>`<li>${l.id} ${l.name} — $${(l.price*(l.status==='live'?8:3)).toFixed(0)}</li>`).join('')}</ul></div><div class='card'><h3>Revenue Trend</h3><div class='spark'>${bars.map(b=>`<span style='height:${b*2}px'></span>`).join('')}</div></div></div>`;
}

function openOpportunityPanel(id){
  const o=state.opportunities.find(x=>x.id===id);
  document.getElementById('panel-content').innerHTML=`<h3>${o.title}</h3><p class='muted'>${o.niche} • ${o.id}</p><p>Score: ${o.score} | Difficulty: ${o.difficulty}/5 | Bundle: ${o.bundle}/10</p><p>Status: ${o.status}</p><h4>Recommended Next Action</h4><p>${o.next}</p><button class='btn approve' id='create-draft'>Create Listing Draft</button>`;
  document.getElementById('side-panel').classList.add('open');
  document.getElementById('create-draft').onclick=()=>createListingFromOpportunity(o);
}

function createListingFromOpportunity(op){
  const nextId=`LS-${String(state.listings.length+1).padStart(3,'0')}`;
  const listing={id:nextId,name:op.title,price:Number((op.score+1.99).toFixed(2)),buyer:`${op.niche} owner-operators`,bundle:`${op.niche} Starter Pack`,perf:'N/A',status:'draft',category:op.niche,tags:`${op.niche.toLowerCase()} template, service form, back office`,description:`Editable ${op.niche} template designed to simplify daily operations and team consistency.`,title:`${op.title} Template for ${op.niche} Service Businesses`,faq:'Can I edit this template? Yes, fully editable.',imagePrompt:`Premium ${op.niche} operations template mockup in modern workspace.`};
  state.listings.unshift(listing); state.selectedListingId=nextId; op.status='Converted'; logAction(`Listing Agent created draft ${nextId} from ${op.id} (${op.title}).`); persist(); rerenderAll(); openListingEditor(nextId);
}

function openListingEditor(id, revisionApprovalId=null){
  const l=state.listings.find(x=>x.id===id); if(!l) return;
  document.getElementById('panel-content').innerHTML=`<h3>Edit Listing</h3>
  <label>Title<input id='f-title' value="${l.title}" /></label>
  <label>Price<input id='f-price' type='number' step='0.01' value='${l.price}' /></label>
  <label>Target Buyer<input id='f-buyer' value="${l.buyer}" /></label>
  <label>Status<select id='f-status'>${['idea','draft','ready to upload','live','needs update','archived'].map(s=>`<option ${l.status===s?'selected':''}>${s}</option>`).join('')}</select></label>
  <label>Tags<input id='f-tags' value="${l.tags}" /></label>
  <label>Short Description<textarea id='f-desc'>${l.description}</textarea></label>
  <label>Recommendation Type<select id='rec-type'><option>Publish Listing</option><option>Price Update</option><option>Content Refresh</option></select></label>
  <label>Rationale<textarea id='rec-why'>Ready for owner review after listing optimization.</textarea></label>
  <label>Confidence<select id='rec-conf'><option value='0.65'>65%</option><option value='0.75' selected>75%</option><option value='0.85'>85%</option><option value='0.92'>92%</option></select></label>
  <label>Source Agent<select id='rec-agent'><option>Listing Agent</option><option>Performance Agent</option><option>Approval Agent</option></select></label>
  <div class='actions'><button class='btn approve' id='save-listing'>Save</button><button class='btn sendback' id='submit-recommendation'>Submit Recommendation</button>${revisionApprovalId?`<button class='btn approve' id='resubmit-from-revision'>Submit for Approval</button>`:''}</div>`;
  document.getElementById('side-panel').classList.add('open');
  document.getElementById('save-listing').onclick=()=>{
    l.title=document.getElementById('f-title').value; l.name=l.title; l.price=Number(document.getElementById('f-price').value); l.buyer=document.getElementById('f-buyer').value; l.status=document.getElementById('f-status').value; l.tags=document.getElementById('f-tags').value; l.description=document.getElementById('f-desc').value; state.selectedListingId=l.id;
    if(revisionApprovalId){ const rev=state.approvals.find(a=>a.id===revisionApprovalId); if(rev){ pushHistory(rev,'edited during revision'); }}
    logAction(`Listing Agent edited ${l.id} (${l.title}) and set status to ${l.status}.`); persist(); rerenderAll();
  };
  document.getElementById('submit-recommendation').onclick=()=>{
    submitRecommendationFromListing(l,{type:document.getElementById('rec-type').value,why:document.getElementById('rec-why').value,conf:Number(document.getElementById('rec-conf').value),agent:document.getElementById('rec-agent').value});
    persist(); rerenderAll();
  };
  if(revisionApprovalId){
    document.getElementById('resubmit-from-revision').onclick=()=>resubmitApproval(revisionApprovalId);
  }
}

function rerenderAll(){ renderDashboard(); renderOpportunities(); renderListings(); renderApprovals(); renderRevenue(); }

document.getElementById('close-panel').onclick=()=>document.getElementById('side-panel').classList.remove('open');
document.getElementById('theme-toggle').onclick=()=>{ document.body.dataset.theme=document.body.dataset.theme==='dark'?'light':'dark'; };
renderNav(); rerenderAll(); persist();

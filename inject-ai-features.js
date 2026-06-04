/**
 * Injects AI Analysis + Export features into all LS-002 through LS-020 templates.
 * Preserves each template's existing structure — only adds the JS block, CSS,
 * toolbar buttons, and tov-ai-btn style if not already present.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const downloadsDir = path.join(__dirname, 'downloads');

// Map each listing ID to its human-readable form type and CSV filename prefix
const LISTINGS = [
  { id: 'LS-002', file: 'LS-002-Plumbing-Dispatch-Checklist-TradeOpsVault.html',           formType: 'Plumbing Dispatch Checklist',         csvPrefix: 'Plumbing-Dispatch' },
  { id: 'LS-003', file: 'LS-003-Electrician-Jobsite-Inspection-TradeOpsVault.html',         formType: 'Electrician Jobsite Inspection',       csvPrefix: 'Electrician-Inspection' },
  { id: 'LS-004', file: 'LS-004-Lawn-Care-Weekly-Crew-Planner-TradeOpsVault.html',          formType: 'Lawn Care Weekly Crew Planner',        csvPrefix: 'Lawn-Care-Planner' },
  { id: 'LS-005', file: 'LS-005-Auto-Detail-Intake-Waiver-TradeOpsVault.html',              formType: 'Auto Detail Intake & Waiver',          csvPrefix: 'Auto-Detail-Intake' },
  { id: 'LS-006', file: 'LS-006-Pest-Control-Follow-Up-Cards-TradeOpsVault.html',           formType: 'Pest Control Follow-Up Cards',         csvPrefix: 'Pest-Control-Followup' },
  { id: 'LS-007', file: 'LS-007-Roofing-Change-Order-Approval-TradeOpsVault.html',          formType: 'Roofing Change Order Approval',        csvPrefix: 'Roofing-Change-Order' },
  { id: 'LS-008', file: 'LS-008-Pressure-Washing-Route-Sheet-TradeOpsVault.html',           formType: 'Pressure Washing Route Sheet',         csvPrefix: 'Pressure-Washing-Route' },
  { id: 'LS-009', file: 'LS-009-Appliance-Repair-Parts-Tracker-TradeOpsVault.html',         formType: 'Appliance Repair Parts Tracker',       csvPrefix: 'Appliance-Repair-Parts' },
  { id: 'LS-010', file: 'LS-010-Handyman-Materials-Reimbursement-TradeOpsVault.html',       formType: 'Handyman Materials Reimbursement',     csvPrefix: 'Handyman-Materials' },
  { id: 'LS-011', file: 'LS-011-Mobile-Mechanic-Service-Summary-TradeOpsVault.html',        formType: 'Mobile Mechanic Service Summary',      csvPrefix: 'Mobile-Mechanic-Service' },
  { id: 'LS-012', file: 'LS-012-Locksmith-Job-Authorization-TradeOpsVault.html',            formType: 'Locksmith Job Authorization',          csvPrefix: 'Locksmith-Job-Auth' },
  { id: 'LS-013', file: 'LS-013-Painting-Prep-Final-Punch-List-TradeOpsVault.html',         formType: 'Painting Prep & Final Punch List',     csvPrefix: 'Painting-Punch-List' },
  { id: 'LS-014', file: 'LS-014-Snow-Removal-Service-Checklist-TradeOpsVault.html',         formType: 'Snow Removal Service Checklist',       csvPrefix: 'Snow-Removal-Checklist' },
  { id: 'LS-015', file: 'LS-015-Window-Cleaning-Client-Packet-TradeOpsVault.html',          formType: 'Window Cleaning Client Packet',        csvPrefix: 'Window-Cleaning-Packet' },
  { id: 'LS-016', file: 'LS-016-Pool-Service-Chemical-Log-TradeOpsVault.html',              formType: 'Pool Service Chemical Log',            csvPrefix: 'Pool-Service-Log' },
  { id: 'LS-017', file: 'LS-017-Flooring-Estimate-Scope-Matrix-TradeOpsVault.html',         formType: 'Flooring Estimate Scope Matrix',       csvPrefix: 'Flooring-Estimate' },
  { id: 'LS-018', file: 'LS-018-Contractor-Daily-Site-Report-TradeOpsVault.html',           formType: 'Contractor Daily Site Report',         csvPrefix: 'Contractor-Site-Report' },
  { id: 'LS-019', file: 'LS-019-Septic-Service-Pump-Log-TradeOpsVault.html',                formType: 'Septic Service Pump Log',             csvPrefix: 'Septic-Service-Log' },
  { id: 'LS-020', file: 'LS-020-Service-Fee-Transparency-Addendum-TradeOpsVault.html',      formType: 'Service Fee Transparency Addendum',   csvPrefix: 'Service-Fee-Addendum' },
];

function buildInjection(formType, csvPrefix) {
  return `
<script>
// ── AI Analysis + Export ─────────────────────────────────────────────────────
var AI_API='https://agent-atlas.onrender.com';

function getDeviceId(){
  var k='tov_device_id';
  var id=localStorage.getItem(k);
  if(!id){id='dev_'+Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem(k,id);}
  return id;
}

function collectFormData(){
  var data={};
  document.querySelectorAll('[data-placeholder]').forEach(function(el,i){
    var label=el.closest('.field')&&el.closest('.field').querySelector('label');
    var key=label?label.textContent.trim():'field_'+i;
    var val=el.textContent.trim()||el.value||'';
    if(val&&val!==el.getAttribute('data-placeholder'))data[key]=val;
  });
  document.querySelectorAll('input[type=checkbox]:checked').forEach(function(cb){
    var label=cb.parentElement&&cb.parentElement.querySelector('label');
    if(label)data['checked_'+label.textContent.trim()]=true;
  });
  return data;
}

function collectAllFormData(){
  var data={formType:'${formType}',exportedAt:new Date().toLocaleString()};
  document.querySelectorAll('[data-placeholder]').forEach(function(el,i){
    var field=el.closest('.field');
    var label=field&&field.querySelector('label');
    var key=label?label.textContent.trim():'field_'+i;
    var val=el.textContent.trim()||el.value||'';
    if(val)data[key]=val;
  });
  document.querySelectorAll('input[type=checkbox]').forEach(function(cb){
    var lbl=cb.parentElement&&cb.parentElement.querySelector('label');
    if(lbl)data[lbl.textContent.trim()]=cb.checked?'Yes':'No';
  });
  return data;
}

function exportCSV(){
  var data=collectAllFormData();
  var keys=Object.keys(data);
  var csv=keys.map(function(k){return '"'+k.replace(/"/g,'""')+'"';}).join(',')+'\n'
    +keys.map(function(k){return '"'+String(data[k]).replace(/"/g,'""')+'"';}).join(',');
  var blob=new Blob([csv],{type:'text/csv'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='${csvPrefix}-'+new Date().toISOString().slice(0,10)+'.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

function sendToWebhook(webhookUrl,data){
  return fetch(webhookUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
}

function sendWebhookExport(){
  var input=document.getElementById('tov-webhook-input');
  var url=input&&input.value.trim();
  if(!url){alert('Paste your Zapier webhook URL first.');return;}
  localStorage.setItem('tov_webhook_url',url);
  var data=collectAllFormData();
  input.disabled=true;
  sendToWebhook(url,data)
    .then(function(){
      var btn=input.nextElementSibling;
      if(btn){btn.textContent='✓ Sent!';btn.style.background='#1a7a4a';}
      setTimeout(function(){document.getElementById('tov-export-panel').style.display='none';},1500);
    })
    .catch(function(){alert('Could not reach that webhook URL. Check it and try again.');input.disabled=false;});
}

function sendToCRM(){
  var data=collectAllFormData();
  fetch(AI_API+'/crm/jobs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deviceId:getDeviceId(),job:data})})
    .then(function(r){return r.json();}).then(function(res){
      if(res.ok){
        var panel=document.getElementById('tov-export-panel');
        if(panel)panel.innerHTML='<div style="padding:24px;text-align:center"><div style="font-size:36px;margin-bottom:12px">✓</div><div style="font-weight:800;font-size:16px;margin-bottom:8px">Saved to CRM</div><div style="font-size:13px;color:rgba(255,255,255,0.6)">View at tradeopsvault.com/crm</div><button onclick="document.getElementById(\'tov-export-panel\').style.display=\'none\'" style="margin-top:16px;background:none;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:8px 20px;border-radius:8px;cursor:pointer;font-size:12px">Close</button></div>';
      }
    }).catch(function(){window.open('https://tradeopsvault.com/crm','_blank');});
}

function startCheckout(){
  fetch(AI_API+'/subscribe/create-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({deviceId:getDeviceId()})})
    .then(function(r){return r.json();}).then(function(res){
      if(res.ok&&res.url){window.open(res.url,'_blank');}
      else{window.open('https://tradeopsvault.com','_blank');}
    }).catch(function(){window.open('https://tradeopsvault.com','_blank');});
}

function showExportPanel(){
  var savedWebhook=localStorage.getItem('tov_webhook_url')||'';
  var isPro=localStorage.getItem('tov_is_pro')==='true';
  var proLock=isPro?'':'<div style="display:inline-block;background:rgba(232,93,4,0.15);color:#e85d04;font-size:10px;font-weight:800;padding:2px 8px;border-radius:10px;margin-left:8px;vertical-align:middle">PRO</div>';
  var panel=document.getElementById('tov-export-panel');
  var html='<div style="padding:20px">'
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">'
    +'<div style="display:flex;align-items:center;gap:8px"><div style="width:26px;height:26px;border-radius:50%;background:#1a2744;border:1.5px solid #e85d04;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0">⬇</div><div style="font-weight:800;font-size:15px">Export Job Data</div></div>'
    +'<button onclick="document.getElementById(\'tov-export-panel\').style.display=\'none\'" style="background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:18px;padding:0;line-height:1">×</button></div>'
    +'<div style="margin-bottom:14px">'
    +'<button onclick="exportCSV();document.getElementById(\'tov-export-panel\').style.display=\'none\';" style="width:100%;background:#1a2744;border:1.5px solid rgba(255,255,255,0.15);color:#fff;padding:12px;border-radius:8px;cursor:pointer;font-weight:700;font-size:13px;font-family:inherit;text-align:left;display:flex;align-items:center;gap:10px">'
    +'<span style="font-size:18px">📊</span><div><div>Download as CSV</div><div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px">Opens in Excel, Google Sheets, Numbers</div></div></button></div>'
    +'<div style="margin-bottom:14px;opacity:'+(isPro?'1':'0.6')+'">'
    +'<div style="font-size:11px;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Zapier / Webhook'+proLock+'</div>'
    +(isPro
      ? '<input id="tov-webhook-input" type="url" placeholder="https://hooks.zapier.com/hooks/catch/..." value="'+savedWebhook+'" style="width:100%;background:#0d1526;border:1.5px solid rgba(255,255,255,0.15);color:#fff;padding:10px 12px;border-radius:8px;font-size:12px;font-family:inherit;box-sizing:border-box;margin-bottom:8px">'
        +'<button onclick="sendWebhookExport()" style="width:100%;background:#e85d04;color:#fff;padding:10px;border-radius:8px;border:none;cursor:pointer;font-weight:800;font-size:13px;font-family:inherit">Send to Webhook →</button>'
      : '<div style="background:#0d1526;border:1.5px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;font-size:12px;color:rgba(255,255,255,0.4)">Connect Zapier → Google Sheets, HubSpot, QuickBooks, Salesforce and 5,000+ apps automatically</div>'
        +'<button onclick="startCheckout()" style="width:100%;background:none;border:1.5px solid #e85d04;color:#e85d04;padding:10px;border-radius:8px;cursor:pointer;font-weight:800;font-size:12px;font-family:inherit;margin-top:8px">Upgrade to Pro — $14.99/mo →</button>')
    +'</div>'
    +'<div style="opacity:'+(isPro?'1':'0.6')+'">'
    +'<div style="font-size:11px;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">TradeOpsVault CRM'+proLock+'</div>'
    +(isPro
      ? '<button onclick="sendToCRM()" style="width:100%;background:#1a2744;border:1.5px solid rgba(255,255,255,0.15);color:#fff;padding:12px;border-radius:8px;cursor:pointer;font-weight:700;font-size:13px;font-family:inherit;text-align:left;display:flex;align-items:center;gap:10px"><span style="font-size:18px">🗂</span><div><div>Send to CRM Dashboard</div><div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px">View at tradeopsvault.com/crm</div></div></button>'
      : '<div style="background:#0d1526;border:1.5px solid rgba(255,255,255,0.1);border-radius:8px;padding:12px;font-size:12px;color:rgba(255,255,255,0.4)">All jobs saved automatically. Client history, revenue tracking, follow-up reminders.</div>')
    +'</div></div>';
  if(panel){panel.innerHTML=html;panel.style.display='block';return;}
  panel=document.createElement('div');
  panel.id='tov-export-panel';
  panel.style.cssText='position:fixed;bottom:24px;left:24px;width:360px;background:#0d1526;color:#fff;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:1.5px solid rgba(255,255,255,0.12);z-index:9999;font-family:Segoe UI,Arial,sans-serif;';
  panel.innerHTML=html;
  document.body.appendChild(panel);
}

function showAiPanel(html){
  var panel=document.getElementById('tov-ai-panel');
  if(panel){panel.innerHTML=html;panel.style.display='block';return;}
  panel=document.createElement('div');
  panel.id='tov-ai-panel';
  panel.style.cssText='position:fixed;bottom:24px;right:24px;width:380px;max-height:520px;overflow-y:auto;background:#0d1526;color:#fff;border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,0.5);border:1.5px solid rgba(232,93,4,0.4);z-index:9999;font-family:Segoe UI,Arial,sans-serif;';
  panel.innerHTML=html;
  document.body.appendChild(panel);
}

function analyzeForm(){
  var formData=collectFormData();
  if(Object.keys(formData).length<2){
    showAiPanel('<div style="padding:20px"><div style="color:#e85d04;font-weight:800;margin-bottom:8px;">⚠ Fill in more fields first</div><div style="font-size:13px;color:rgba(255,255,255,0.7);">Add your job details before analyzing.</div><div style="text-align:right;margin-top:12px"><button onclick="document.getElementById(\'tov-ai-panel\').style.display=\'none\'" style="background:none;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px">Close</button></div></div>');
    return;
  }
  showAiPanel('<div style="padding:20px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:16px"><div style="width:28px;height:28px;border-radius:50%;background:#e85d04;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0">✦</div><div style="font-weight:800;font-size:15px">AI Job Analysis</div></div><div style="font-size:13px;color:rgba(255,255,255,0.6);display:flex;align-items:center;gap:8px"><span style="display:inline-block;width:14px;height:14px;border:2px solid #e85d04;border-top-color:transparent;border-radius:50%;animation:tov-spin 0.8s linear infinite"></span>Analyzing your job data...</div><style>@keyframes tov-spin{to{transform:rotate(360deg)}}</style></div>');
  fetch(AI_API+'/ai/analyze',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({formType:'${formType}',formData:formData,deviceId:getDeviceId()})
  })
  .then(function(r){return r.json();})
  .then(function(res){
    if(res.limitReached){
      showAiPanel('<div style="padding:20px"><div style="color:#e85d04;font-weight:800;font-size:15px;margin-bottom:8px">Monthly limit reached</div><div style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;margin-bottom:16px">You\'ve used your 5 free AI analyses this month.<br><br>Upgrade for unlimited AI + CRM features.</div><a href="https://tradeopsvault.com" target="_blank" style="display:block;background:#e85d04;color:#fff;text-align:center;padding:12px;border-radius:8px;text-decoration:none;font-weight:800;font-size:14px;margin-bottom:8px">Upgrade at TradeOpsVault.com →</a><button onclick="document.getElementById(\'tov-ai-panel\').style.display=\'none\'" style="width:100%;background:none;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.5);padding:8px;border-radius:8px;cursor:pointer;font-size:12px">Close</button></div>');
      return;
    }
    if(!res.ok){throw new Error(res.error||'Analysis failed');}
    var bullets=res.analysis.split('\\n').filter(function(l){return l.trim();}).map(function(l){
      return '<div style="display:flex;gap:10px;margin-bottom:12px;font-size:13px;line-height:1.5"><span style="color:#e85d04;flex-shrink:0;margin-top:1px">▸</span><span style="color:rgba(255,255,255,0.88)">'+l.replace(/^[\\-\\*•▸]\\s*/,'')+'</span></div>';
    }).join('');
    var remaining=res.callsRemaining!==undefined?res.callsRemaining:0;
    var callsUsed=res.callsUsed!==undefined?res.callsUsed:0;
    var upsellBanner='';
    if(callsUsed>=3){
      upsellBanner='<div style="background:linear-gradient(135deg,rgba(232,93,4,0.15),rgba(232,93,4,0.08));border:1px solid rgba(232,93,4,0.3);border-radius:10px;padding:14px 16px;margin-top:14px">'
        +'<div style="font-size:12px;font-weight:800;color:#e85d04;margin-bottom:6px">✦ You\'re getting real value from this</div>'
        +'<div style="font-size:12px;color:rgba(255,255,255,0.7);line-height:1.5;margin-bottom:10px">Upgrade to <strong style="color:#fff">TradeOpsVault Pro</strong> for unlimited AI analyses, job history tracking, and client CRM — <strong style="color:#e85d04">$14.99/mo</strong></div>'
        +'<button onclick="startCheckout()" style="display:block;width:100%;background:#e85d04;color:#fff;text-align:center;padding:9px;border-radius:7px;border:none;cursor:pointer;font-weight:800;font-size:12px;letter-spacing:0.5px;font-family:inherit">Get Unlimited Access — $14.99/mo →</button>'
        +'</div>';
    }
    var footerText=remaining<=1
      ?'<span style="font-size:11px;color:#e85d04;font-weight:700">'+remaining+' free '+(remaining===1?'analysis':'analyses')+' left this month</span>'
      :'<span style="font-size:11px;color:rgba(255,255,255,0.3)">'+remaining+' free analyses left this month</span>';
    showAiPanel('<div style="padding:20px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px"><div style="display:flex;align-items:center;gap:8px"><div style="width:26px;height:26px;border-radius:50%;background:#e85d04;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0">✦</div><div style="font-weight:800;font-size:15px">AI Job Analysis</div></div><button onclick="document.getElementById(\'tov-ai-panel\').style.display=\'none\'" style="background:none;border:none;color:rgba(255,255,255,0.4);cursor:pointer;font-size:18px;padding:0;line-height:1">×</button></div>'+bullets+upsellBanner+'<div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:12px;padding-top:12px;display:flex;justify-content:space-between;align-items:center">'+footerText+'<a href="https://tradeopsvault.com" target="_blank" style="font-size:11px;color:#e85d04;text-decoration:none;font-weight:700">tradeopsvault.com</a></div></div>');
  })
  .catch(function(){
    showAiPanel('<div style="padding:20px"><div style="color:#e85d04;font-weight:800;margin-bottom:8px">Analysis unavailable</div><div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:12px">Could not reach the AI server. Check your internet connection.</div><button onclick="document.getElementById(\'tov-ai-panel\').style.display=\'none\'" style="background:none;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:12px">Close</button></div>');
  });
}
</script>
<style>
.tov-ai-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#0d1526,#1a2744);color:#fff;border:1.5px solid #e85d04;border-radius:8px;padding:9px 22px;font-size:9pt;font-weight:800;cursor:pointer;letter-spacing:0.5px;transition:all .15s;font-family:inherit;}
.tov-ai-btn:hover{background:#e85d04;border-color:#e85d04;}
.tov-ai-btn .ai-dot{width:8px;height:8px;border-radius:50%;background:#e85d04;animation:tov-pulse 1.5s ease-in-out infinite;}
.tov-ai-btn:hover .ai-dot{background:#fff;}
@keyframes tov-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.8)}}
</style>
</body></html>`;
}

// Buttons to inject into the toolbar
const AI_BUTTON = `<button class="tov-ai-btn" onclick="analyzeForm()"><span class="ai-dot"></span>&#10022; Analyze with AI</button>`;
const EXPORT_BUTTON = `<button class="tov-ai-btn" onclick="showExportPanel()" style="background:linear-gradient(135deg,#1a2744,#243358);border-color:rgba(255,255,255,0.2)">&#11015; Export Data</button>`;

let success = 0;
let skipped = 0;
let failed = 0;

for (const listing of LISTINGS) {
  const filePath = path.join(downloadsDir, listing.file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠ MISSING: ${listing.file}`);
    failed++;
    continue;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected
  if (html.includes('tov-ai-panel') || html.includes('analyzeForm')) {
    console.log(`⏭ Already has AI: ${listing.id}`);
    skipped++;
    continue;
  }

  // 1. Inject buttons into the toolbar — find the toolbar-tip span and insert before it
  const toolbarTipPattern = /<span class="toolbar-tip"/;
  if (!toolbarTipPattern.test(html)) {
    // Try alternate pattern — some templates may have slightly different markup
    console.log(`⚠ No toolbar-tip found in ${listing.id} — trying </button><span`);
  }

  // Find the last </button> before the toolbar-tip or end of toolbar div
  // Strategy: insert buttons right before the toolbar-tip span
  if (html.includes('class="toolbar-tip"')) {
    html = html.replace(
      '<span class="toolbar-tip"',
      `${AI_BUTTON}${EXPORT_BUTTON}<span class="toolbar-tip"`
    );
  } else if (html.includes('btn-clear')) {
    // Fallback: insert after the clear button
    html = html.replace(
      /(<button[^>]*btn-clear[^>]*>.*?<\/button>)/,
      `$1${AI_BUTTON}${EXPORT_BUTTON}`
    );
  } else {
    console.log(`⚠ Could not find toolbar injection point in ${listing.id}`);
    failed++;
    continue;
  }

  // 2. Inject the script + style block — replace </body></html> at the end
  const injection = buildInjection(listing.formType, listing.csvPrefix);
  html = html.replace('</body></html>', injection);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${listing.id} — ${listing.formType}`);
  success++;
}

console.log(`\n📊 Done — ${success} updated, ${skipped} already had AI, ${failed} failed`);

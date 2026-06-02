// Agent Atlas — Premium Printable Trade Form Templates
// Usage: openTemplate('LS-001') to open in new tab, or generateTemplate('LS-001') to get HTML string

const _CSS = `<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; color: #1a1a2e; background: #e8eaf0; padding: 24px; }
.page { background: #fff; max-width: 860px; margin: 0 auto; box-shadow: 0 8px 32px rgba(0,0,0,0.15); border-radius: 4px; overflow: hidden; }
@media print { body { background:#fff;padding:0; } .page{box-shadow:none;border-radius:0;} .no-print{display:none!important;} }
.header { background: linear-gradient(135deg, #0f1628 0%, #1a2744 100%); color:#fff; padding:22px 32px; display:flex; justify-content:space-between; align-items:center; gap:16px; }
.logo-zone { border: 2px dashed rgba(255,255,255,0.3); border-radius:8px; padding:10px 18px; cursor:pointer; color:rgba(255,255,255,0.6); font-size:9pt; text-align:center; min-width:140px; transition:all .2s; }
.logo-zone:hover { border-color:rgba(255,255,255,0.7); color:#fff; background:rgba(255,255,255,0.05); }
.company-name-field { font-size:15pt; font-weight:900; letter-spacing:-0.5px; color:#fff; text-transform:uppercase; margin-top:6px; border-bottom:1px solid rgba(255,255,255,0.2); min-width:180px; }
.company-name-field:empty::before { content:'YOUR COMPANY NAME'; color:rgba(255,255,255,0.35); font-style:italic; }
.company-name-field:focus { border-bottom:1px solid rgba(255,255,255,0.7); outline:none; }
.header-right { text-align:right; }
.form-title-text { font-size:14pt; font-weight:800; color:#fff; text-transform:uppercase; letter-spacing:0.5px; line-height:1.2; }
.form-badge { display:inline-block; background:rgba(79,124,255,0.3); color:#8eb4ff; padding:3px 10px; border-radius:12px; font-size:7.5pt; font-weight:700; letter-spacing:1px; margin-top:6px; }
.accent-bar { height:5px; background:linear-gradient(90deg, #4f7cff 0%, #2ed88a 50%, #ffbb45 100%); }
.toolbar { background:#f7f8fc; border-bottom:1px solid #e0e4f0; padding:10px 32px; display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
.toolbar-btn { display:inline-flex; align-items:center; gap:6px; padding:7px 18px; border-radius:6px; font-size:9pt; font-weight:700; cursor:pointer; border:none; transition:all .15s; }
.btn-print { background:#4f7cff; color:#fff; }
.btn-print:hover { background:#3a6ae8; }
.btn-clear { background:#f0f4ff; color:#4f7cff; border:1px solid #c8d8ff; }
.btn-clear:hover { background:#e0e8ff; }
.toolbar-tip { font-size:8pt; color:#aab; margin-left:auto; }
.info-strip { background:#f7f8fc; border-bottom:2px solid #e0e4f0; padding:14px 32px; display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.info-field label { font-size:6.5pt; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#8899cc; display:block; margin-bottom:4px; }
.body { padding:22px 32px; display:flex; flex-direction:column; gap:18px; }
.section-header { background:linear-gradient(90deg,#1a2744,#243358); color:#fff; padding:8px 14px; font-size:8pt; font-weight:800; text-transform:uppercase; letter-spacing:1.2px; border-radius:4px 4px 0 0; display:flex; align-items:center; gap:8px; }
.section-header::before { content:''; width:3px; height:14px; background:#4f7cff; border-radius:2px; display:inline-block; }
.section-body { border:1.5px solid #dde2f0; border-top:none; border-radius:0 0 4px 4px; padding:16px; background:#fff; }
.field-grid { display:grid; gap:14px; }
.field-grid.cols-2 { grid-template-columns:1fr 1fr; }
.field-grid.cols-3 { grid-template-columns:1fr 1fr 1fr; }
.field-grid.cols-4 { grid-template-columns:1fr 1fr 1fr 1fr; }
.field label { font-size:6.5pt; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#8899cc; display:block; margin-bottom:4px; }
.editable { border-bottom:1.5px solid #dde2f0; min-height:26px; padding:3px 5px; outline:none; transition:border-color .15s,background .15s; display:block; width:100%; line-height:1.5; }
.editable:focus { border-bottom:2px solid #4f7cff; background:#f0f4ff; border-radius:3px 3px 0 0; }
.editable:empty::before { content:attr(data-placeholder); color:#ccd; font-style:italic; pointer-events:none; }
.editable.multiline { min-height:72px; border:1.5px solid #dde2f0; border-radius:4px; padding:8px; }
.editable.multiline:focus { border-color:#4f7cff; background:#f0f4ff; }
@media print { .editable{border-bottom:1.5px solid #ccd0e0!important;background:transparent!important;} .editable:empty::before{display:none;} .editable.multiline{border:1.5px solid #ccd0e0!important;background:transparent!important;} }
.form-table { width:100%; border-collapse:collapse; font-size:9pt; }
.form-table th { background:linear-gradient(90deg,#1a2744,#243358); color:#fff; padding:8px 12px; text-align:left; font-size:7pt; text-transform:uppercase; letter-spacing:0.8px; font-weight:800; }
.form-table td { border-bottom:1px solid #eaecf4; padding:4px 6px; vertical-align:middle; }
.form-table tr:nth-child(even) td { background:#f9fafc; }
.form-table td:focus-within { background:#f0f4ff!important; }
.form-table .editable { min-height:22px; font-size:9pt; border-bottom:none; }
.check-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:6px; }
.check-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
.check-item { display:flex; align-items:center; gap:8px; padding:5px 8px; border:1px solid #eaecf4; border-radius:4px; cursor:pointer; }
.check-item:hover { background:#f0f4ff; border-color:#c8d8ff; }
.check-item input[type=checkbox] { width:15px; height:15px; accent-color:#4f7cff; cursor:pointer; flex-shrink:0; }
.check-item label { font-size:9pt; cursor:pointer; }
.sig-block { display:grid; grid-template-columns:1fr 1fr; gap:32px; padding-top:16px; border-top:2px solid #eaecf4; }
.sig-field label { font-size:6.5pt; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#8899cc; display:block; margin-bottom:6px; }
.sig-line { border-bottom:2px solid #1a2744; min-height:44px; }
.sig-sub { font-size:7pt; color:#aab; margin-top:4px; }
.footer { background:linear-gradient(135deg,#0f1628,#1a2744); padding:12px 32px; display:flex; justify-content:space-between; align-items:center; }
.footer-brand { font-size:8.5pt; font-weight:800; color:#8eb4ff; }
.footer-legal { font-size:6.5pt; color:rgba(255,255,255,0.35); max-width:55%; text-align:right; line-height:1.5; }
.footer-id { font-size:8pt; color:rgba(255,255,255,0.4); }
.total-row td { font-weight:700; background:#f0f4ff!important; }
.grand-total-row td { font-weight:900; background:#1a2744!important; color:#fff!important; }
</style>`;

const _JS = `<script>
document.addEventListener('DOMContentLoaded',function(){
  var df=document.getElementById('field-date');
  if(df&&!df.textContent.trim())df.textContent=new Date().toLocaleDateString('en-US',{month:'2-digit',day:'2-digit',year:'numeric'});
});
function clearForm(){
  document.querySelectorAll('.editable').forEach(function(el){el.textContent='';});
  document.querySelectorAll('input[type=checkbox]').forEach(function(cb){cb.checked=false;});
  var df=document.getElementById('field-date');
  if(df)df.textContent=new Date().toLocaleDateString('en-US',{month:'2-digit',day:'2-digit',year:'numeric'});
}
<\/script>`;

function _logoBlock(uid){
  return '<div class="logo-zone no-print" onclick="document.getElementById(\'lu-'+uid+'\').click()" title="Click to upload logo">&#128247; Click to add logo</div>'
    +'<img id="li-'+uid+'" style="display:none;max-height:56px;max-width:180px;object-fit:contain" alt="Logo">'
    +'<input type="file" id="lu-'+uid+'" accept="image/*" style="display:none" onchange="(function(i){var f=i.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){var im=document.getElementById(\'li-'+uid+'\');im.src=e.target.result;im.style.display=\'block\';i.previousElementSibling.previousElementSibling.style.display=\'none\';};r.readAsDataURL(f);})(this)">'
    +'<div contenteditable="true" class="company-name-field" data-placeholder="YOUR COMPANY NAME"></div>';
}

function _toolbar(){
  return '<div class="toolbar no-print"><button class="toolbar-btn btn-print" onclick="window.print()">&#128438; Print / Save PDF</button><button class="toolbar-btn btn-clear" onclick="clearForm()">&#10006; Clear Form</button><span class="toolbar-tip">&#9432; Click any field to type &nbsp;|&nbsp; Upload logo &nbsp;|&nbsp; Print when ready</span></div>';
}

function _footer(id,note){
  return '<div class="footer"><div class="footer-brand">TradeOpsVault &middot; tradeopsvault.etsy.com</div><div class="footer-legal">'+note+'</div><div class="footer-id">'+id+'</div></div>';
}


const TEMPLATES = {

'LS-001':{id:'LS-001',title:'HVAC Service Call Notes',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>HVAC Service Call Notes</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('001')}</div><div class="header-right"><div class="form-title-text">HVAC Service Call Notes</div><div class="form-badge">FORM LS-001 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Form #</label><div class="editable" data-placeholder="SC-0001"></div></div>
  <div class="info-field"><label>Job #</label><div class="editable" data-placeholder="J-2024-001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Customer &amp; Equipment</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Equipment Type</label><div class="editable" data-placeholder="e.g. Split AC"></div></div>
    <div class="field"><label>Make / Brand</label><div class="editable" data-placeholder="e.g. Carrier"></div></div>
    <div class="field"><label>Model #</label><div class="editable" data-placeholder="Model #"></div></div>
    <div class="field"><label>Serial #</label><div class="editable" data-placeholder="Serial #"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Install Year</label><div class="editable" data-placeholder="Year"></div></div>
    <div class="field"><label>Filter Size</label><div class="editable" data-placeholder='16"x20"x1"'></div></div>
    <div class="field"><label>Refrigerant Type</label><div class="editable" data-placeholder="R-410A"></div></div>
    <div class="field"><label>Warranty Status</label><div class="editable" data-placeholder="Active / Expired"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Complaint &amp; Diagnosis</div><div class="section-body">
  <div class="field-grid cols-2" style="margin-bottom:14px">
    <div class="field"><label>Customer-Reported Complaint</label><div class="editable multiline" data-placeholder="Describe issue as reported..."></div></div>
    <div class="field"><label>Technician Diagnosis</label><div class="editable multiline" data-placeholder="Root cause found..."></div></div>
  </div>
  <div class="check-grid">
    <div class="check-item"><input type="checkbox" id="c1a"><label for="c1a">No cooling / heating</label></div>
    <div class="check-item"><input type="checkbox" id="c1b"><label for="c1b">Refrigerant leak</label></div>
    <div class="check-item"><input type="checkbox" id="c1c"><label for="c1c">Dirty / clogged filter</label></div>
    <div class="check-item"><input type="checkbox" id="c1d"><label for="c1d">Faulty thermostat</label></div>
    <div class="check-item"><input type="checkbox" id="c1e"><label for="c1e">Blower motor issue</label></div>
    <div class="check-item"><input type="checkbox" id="c1f"><label for="c1f">Capacitor / contactor failure</label></div>
    <div class="check-item"><input type="checkbox" id="c1g"><label for="c1g">Frozen evaporator coil</label></div>
    <div class="check-item"><input type="checkbox" id="c1h"><label for="c1h">Condensate / drainage issue</label></div>
    <div class="check-item"><input type="checkbox" id="c1i"><label for="c1i">Electrical fault</label></div>
    <div class="check-item"><input type="checkbox" id="c1j"><label for="c1j">Compressor failure</label></div>
    <div class="check-item"><input type="checkbox" id="c1k"><label for="c1k">Ductwork issue</label></div>
    <div class="check-item"><input type="checkbox" id="c1l"><label for="c1l">Other — see notes</label></div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Refrigerant Record</div><div class="section-body">
  <div class="field-grid cols-4">
    <div class="field"><label>Suction Pressure (PSI)</label><div class="editable" data-placeholder="e.g. 68"></div></div>
    <div class="field"><label>Discharge Pressure (PSI)</label><div class="editable" data-placeholder="e.g. 240"></div></div>
    <div class="field"><label>Refrigerant Added (lbs)</label><div class="editable" data-placeholder="0.0 lbs"></div></div>
    <div class="field"><label>Leak Test Result</label><div class="editable" data-placeholder="Pass / Fail"></div></div>
  </div>
</div></div>
<div><div class="section-header">4 &mdash; Parts &amp; Labor Invoice</div><div class="section-body">
  <table class="form-table"><thead><tr><th>#</th><th>Part / Description</th><th>Part #</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Parts Subtotal</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Labor Total</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="grand-total-row"><td colspan="5" style="text-align:right;padding-right:14px">INVOICE TOTAL</td><td><div class="editable" data-placeholder="$0.00" style="color:#fff"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">5 &mdash; Recommendations &amp; Follow-Up</div><div class="section-body">
  <div class="field-grid cols-2" style="margin-bottom:14px">
    <div class="field"><label>Recommendations</label><div class="editable multiline" data-placeholder="Future repairs, maintenance schedule..."></div></div>
    <div class="field"><label>Next Service / Follow-Up</label><div class="editable multiline" data-placeholder="Next visit date, scheduled maintenance..."></div></div>
  </div>
  <div class="field-grid cols-3">
    <div class="field"><label>Labor Hours</label><div class="editable" data-placeholder="e.g. 2.5 hrs"></div></div>
    <div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div>
    <div class="field"><label>Payment Method</label><div class="editable" data-placeholder="Cash / Card / Invoice"></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div>
  <div class="sig-field"><label>Customer Approval</label><div class="sig-line"></div><div class="sig-sub">By signing you authorize work completed and accept charges above</div></div>
</div>
</div>
${_footer('LS-001','For business use only. Retain for your records.')}
</div>${_JS}</body></html>`},

'LS-002':{id:'LS-002',title:'Plumbing Dispatch & Diagnosis Checklist',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Plumbing Dispatch &amp; Diagnosis</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('002')}</div><div class="header-right"><div class="form-title-text">Plumbing Dispatch &amp; Diagnosis</div><div class="form-badge">FORM LS-002 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Dispatch #</label><div class="editable" data-placeholder="D-0001"></div></div>
  <div class="info-field"><label>Job #</label><div class="editable" data-placeholder="J-2024-001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Job Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Dispatch Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
    <div class="field"><label>Arrival Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
    <div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div>
    <div class="field"><label>Water Source</label><div class="editable" data-placeholder="City / Well"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Problem Description</div><div class="section-body">
  <div class="field-grid cols-2" style="margin-bottom:14px">
    <div class="field"><label>Customer-Reported Issue</label><div class="editable multiline" data-placeholder="Describe the problem as reported..."></div></div>
    <div class="field"><label>Location in Property</label><div class="editable multiline" data-placeholder="Kitchen, master bath, basement..."></div></div>
  </div>
  <div class="field-grid cols-3">
    <div class="field"><label>Duration of Problem</label><div class="editable" data-placeholder="e.g. 2 days"></div></div>
    <div class="field"><label>Water Heater Type</label><div class="editable" data-placeholder="Tank / Tankless / Electric"></div></div>
    <div class="field"><label>Water Pressure (psi)</label><div class="editable" data-placeholder="e.g. 60 psi"></div></div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Diagnosis Checklist</div><div class="section-body">
  <div class="check-grid" style="margin-bottom:14px">
    <div class="check-item"><input type="checkbox" id="c2a"><label for="c2a">Active leak</label></div>
    <div class="check-item"><input type="checkbox" id="c2b"><label for="c2b">Drain blockage / slow drain</label></div>
    <div class="check-item"><input type="checkbox" id="c2c"><label for="c2c">Low water pressure</label></div>
    <div class="check-item"><input type="checkbox" id="c2d"><label for="c2d">No hot water</label></div>
    <div class="check-item"><input type="checkbox" id="c2e"><label for="c2e">Running toilet</label></div>
    <div class="check-item"><input type="checkbox" id="c2f"><label for="c2f">Sewer odor</label></div>
    <div class="check-item"><input type="checkbox" id="c2g"><label for="c2g">Water heater failure</label></div>
    <div class="check-item"><input type="checkbox" id="c2h"><label for="c2h">Pipe corrosion / damage</label></div>
    <div class="check-item"><input type="checkbox" id="c2i"><label for="c2i">Fixture replacement needed</label></div>
    <div class="check-item"><input type="checkbox" id="c2j"><label for="c2j">Backflow / cross-connection</label></div>
    <div class="check-item"><input type="checkbox" id="c2k"><label for="c2k">Sump pump issue</label></div>
    <div class="check-item"><input type="checkbox" id="c2l"><label for="c2l">Other — see notes</label></div>
  </div>
  <div class="field"><label>Diagnosis Notes</label><div class="editable multiline" data-placeholder="Technical findings..."></div></div>
</div></div>
<div><div class="section-header">4 &mdash; Work Completed</div><div class="section-body">
  <div class="field" style="margin-bottom:14px"><label>Description of Repairs / Services Performed</label><div class="editable multiline" data-placeholder="Detail all work performed..."></div></div>
  <div class="field-grid cols-4">
    <div class="field"><label>Work Start Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
    <div class="field"><label>Work End Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
    <div class="field"><label>Total Labor Hours</label><div class="editable" data-placeholder="0.0 hrs"></div></div>
    <div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div>
  </div>
</div></div>
<div><div class="section-header">5 &mdash; Parts &amp; Invoice</div><div class="section-body">
  <table class="form-table"><thead><tr><th>#</th><th>Item / Part Description</th><th>Part #</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Parts Total</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Labor Total</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="grand-total-row"><td colspan="5" style="text-align:right;padding-right:14px">INVOICE TOTAL</td><td><div class="editable" data-placeholder="$0.00" style="color:#fff"></div></td></tr>
  </tbody></table>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Plumber / Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div>
  <div class="sig-field"><label>Customer Approval</label><div class="sig-line"></div><div class="sig-sub">By signing you authorize work and accept charges above</div></div>
</div>
</div>
${_footer('LS-002','For business use only. Retain for your records.')}
</div>${_JS}</body></html>`},

'LS-003':{id:'LS-003',title:'Electrician Jobsite Inspection Form',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Electrician Jobsite Inspection</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('003')}</div><div class="header-right"><div class="form-title-text">Jobsite Inspection Form</div><div class="form-badge">FORM LS-003 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Inspection Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Form #</label><div class="editable" data-placeholder="EI-0001"></div></div>
  <div class="info-field"><label>Permit #</label><div class="editable" data-placeholder="Permit #"></div></div>
  <div class="info-field"><label>Inspector</label><div class="editable" data-placeholder="Name / License #"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Site Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Client / Owner</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Site Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Inspector / Technician</label><div class="editable" data-placeholder="Name / License #"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div>
    <div class="field"><label>Building Age (est.)</label><div class="editable" data-placeholder="e.g. 1985"></div></div>
    <div class="field"><label>Service Voltage</label><div class="editable" data-placeholder="120/240V"></div></div>
    <div class="field"><label>Service Amperage</label><div class="editable" data-placeholder="200A"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Panel &amp; Circuit Inspection</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Panel Manufacturer</label><div class="editable" data-placeholder="e.g. Square D"></div></div>
    <div class="field"><label>Panel Rating (A)</label><div class="editable" data-placeholder="200A"></div></div>
    <div class="field"><label># of Circuits</label><div class="editable" data-placeholder="40"></div></div>
    <div class="field"><label>GFCI Protected</label><div class="editable" data-placeholder="Yes / Partial / No"></div></div>
  </div>
  <div class="check-grid" style="margin-bottom:14px">
    <div class="check-item"><input type="checkbox" id="c3a"><label for="c3a">Panel properly labeled</label></div>
    <div class="check-item"><input type="checkbox" id="c3b"><label for="c3b">No double-tapped breakers</label></div>
    <div class="check-item"><input type="checkbox" id="c3c"><label for="c3c">Grounding / bonding verified</label></div>
    <div class="check-item"><input type="checkbox" id="c3d"><label for="c3d">No arcing or burn marks</label></div>
    <div class="check-item"><input type="checkbox" id="c3e"><label for="c3e">Correct breaker sizing</label></div>
    <div class="check-item"><input type="checkbox" id="c3f"><label for="c3f">Neutral &amp; ground separated (subpanel)</label></div>
    <div class="check-item"><input type="checkbox" id="c3g"><label for="c3g">Breakers seat fully</label></div>
    <div class="check-item"><input type="checkbox" id="c3h"><label for="c3h">AFCI protection where required</label></div>
  </div>
  <div class="field"><label>Panel Notes</label><div class="editable multiline" data-placeholder="Additional panel observations..."></div></div>
</div></div>
<div><div class="section-header">3 &mdash; Hazard Assessment</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Hazard Item</th><th>Location</th><th>Severity (L/M/H)</th><th>Action Required</th><th>Resolved?</th></tr></thead>
  <tbody>
    <tr><td>Exposed wiring</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>
    <tr><td>Overloaded circuits</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>
    <tr><td>Missing knockouts / covers</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>
    <tr><td>Improper wire gauging</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>
    <tr><td>Outdated wiring (aluminum/knob-tube)</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Other hazard..."></div></td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Code Notes &amp; Sign-Off</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>NEC Edition in Effect</label><div class="editable" data-placeholder="e.g. 2023 NEC"></div></div>
    <div class="field"><label>Local Amendments / AHJ</label><div class="editable" data-placeholder="Authority having jurisdiction"></div></div>
    <div class="field"><label>Re-inspection Required?</label><div class="editable" data-placeholder="Yes / No — Date"></div></div>
  </div>
  <div class="field-grid cols-2">
    <div class="field"><label>Code Violations / Notes</label><div class="editable multiline" data-placeholder="List any code violations found..."></div></div>
    <div class="field"><label>Summary / Recommendations</label><div class="editable multiline" data-placeholder="Overall assessment and recommended actions..."></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Electrician / Inspector Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div>
  <div class="sig-field"><label>Property Owner / Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
</div>
</div>
${_footer('LS-003','For business use only. Findings do not constitute a code compliance certificate. Retain for records.')}
</div>${_JS}</body></html>`},

'LS-004':{id:'LS-004',title:'Lawn Care Weekly Crew Planner',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Lawn Care Weekly Crew Planner</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('004')}</div><div class="header-right"><div class="form-title-text">Weekly Crew Planner</div><div class="form-badge">FORM LS-004 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Week Of</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Form #</label><div class="editable" data-placeholder="WP-0001"></div></div>
  <div class="info-field"><label>Crew Lead</label><div class="editable" data-placeholder="Name"></div></div>
  <div class="info-field"><label>Vehicle / Rig</label><div class="editable" data-placeholder="Truck / Trailer #"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Week Overview</div><div class="section-body">
  <div class="field-grid cols-4">
    <div class="field"><label>Total Stops This Week</label><div class="editable" data-placeholder="e.g. 15"></div></div>
    <div class="field"><label>Estimated Hours</label><div class="editable" data-placeholder="40 hrs"></div></div>
    <div class="field"><label>Equipment Assigned</label><div class="editable" data-placeholder="Mower / trimmer"></div></div>
    <div class="field"><label>Weather Forecast</label><div class="editable" data-placeholder="Sunny / Rainy"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Daily Route (Mon–Fri)</div><div class="section-body">
  <table class="form-table"><thead><tr><th style="width:44px">Day</th><th style="width:24px">#</th><th>Client Name</th><th>Address</th><th>Services</th><th>Est. Time</th><th style="width:44px">Done</th></tr></thead>
  <tbody>
    <tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">MON</td><td>1</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">TUE</td><td>4</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>6</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">WED</td><td>7</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>8</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>9</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">THU</td><td>10</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>11</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>12</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">FRI</td><td>13</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>14</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
    <tr><td>15</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">3 &mdash; Crew Assignments</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Crew Member</th><th>Role</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Total Hrs</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Notes &amp; Issues</div><div class="section-body">
  <div class="field-grid cols-2">
    <div class="field"><label>Equipment Issues / Maintenance Needed</label><div class="editable multiline" data-placeholder="Equipment problems, service needed..."></div></div>
    <div class="field"><label>Client Notes / Special Instructions</label><div class="editable multiline" data-placeholder="Gate codes, pets, special requests..."></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Crew Lead Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
  <div class="sig-field"><label>Manager / Office Sign-Off</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
</div>
</div>
${_footer('LS-004','For business use only. Retain for your records.')}
</div>${_JS}</body></html>`},

'LS-005':{id:'LS-005',title:'Auto Detail Intake + Damage Waiver',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Auto Detail Intake + Damage Waiver</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('005')}</div><div class="header-right"><div class="form-title-text">Detail Intake &amp; Damage Waiver</div><div class="form-badge">FORM LS-005 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Order #</label><div class="editable" data-placeholder="DT-0001"></div></div>
  <div class="info-field"><label>Detailer</label><div class="editable" data-placeholder="Name"></div></div>
  <div class="info-field"><label>Drop-Off Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Vehicle &amp; Customer Info</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
    <div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div>
    <div class="field"><label>Pick-Up Time (est.)</label><div class="editable" data-placeholder="00:00 AM"></div></div>
  </div>
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Year</label><div class="editable" data-placeholder="2021"></div></div>
    <div class="field"><label>Make</label><div class="editable" data-placeholder="Toyota"></div></div>
    <div class="field"><label>Model</label><div class="editable" data-placeholder="Camry"></div></div>
    <div class="field"><label>Color</label><div class="editable" data-placeholder="Silver"></div></div>
  </div>
  <div class="field-grid cols-3">
    <div class="field"><label>License Plate</label><div class="editable" data-placeholder="Plate #"></div></div>
    <div class="field"><label>VIN (last 6)</label><div class="editable" data-placeholder="Last 6 digits"></div></div>
    <div class="field"><label>Mileage In</label><div class="editable" data-placeholder="00,000 mi"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Service Selections</div><div class="section-body">
  <div class="check-grid-3" style="margin-bottom:14px">
    <div class="check-item"><input type="checkbox" id="c5a"><label for="c5a">Exterior Hand Wash</label></div>
    <div class="check-item"><input type="checkbox" id="c5b"><label for="c5b">Interior Vacuum</label></div>
    <div class="check-item"><input type="checkbox" id="c5c"><label for="c5c">Full Interior Detail</label></div>
    <div class="check-item"><input type="checkbox" id="c5d"><label for="c5d">Clay Bar Treatment</label></div>
    <div class="check-item"><input type="checkbox" id="c5e"><label for="c5e">Paint Correction — Stage 1</label></div>
    <div class="check-item"><input type="checkbox" id="c5f"><label for="c5f">Paint Correction — Stage 2</label></div>
    <div class="check-item"><input type="checkbox" id="c5g"><label for="c5g">Ceramic Coating</label></div>
    <div class="check-item"><input type="checkbox" id="c5h"><label for="c5h">Wax / Sealant</label></div>
    <div class="check-item"><input type="checkbox" id="c5i"><label for="c5i">Engine Bay Cleaning</label></div>
    <div class="check-item"><input type="checkbox" id="c5j"><label for="c5j">Headlight Restoration</label></div>
    <div class="check-item"><input type="checkbox" id="c5k"><label for="c5k">Odor Elimination</label></div>
    <div class="check-item"><input type="checkbox" id="c5l"><label for="c5l">Tire &amp; Wheel Detail</label></div>
    <div class="check-item"><input type="checkbox" id="c5m"><label for="c5m">Glass Treatment</label></div>
    <div class="check-item"><input type="checkbox" id="c5n"><label for="c5n">Leather Conditioning</label></div>
    <div class="check-item"><input type="checkbox" id="c5o"><label for="c5o">Other — see notes</label></div>
  </div>
  <div class="field-grid cols-3">
    <div class="field"><label>Package Selected</label><div class="editable" data-placeholder="Package name"></div></div>
    <div class="field"><label>Quoted Price</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Est. Completion Time</label><div class="editable" data-placeholder="4–6 hours"></div></div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Pre-Existing Damage</div><div class="section-body">
  <p style="font-size:8pt;color:#667;margin-bottom:12px">Document all pre-existing damage before service. Both parties should review and initial.</p>
  <div class="field-grid cols-2">
    <div style="border:1.5px solid #dde2f0;border-radius:4px;padding:12px;min-height:120px">
      <div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Panel-by-Panel Notes</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:7.5pt">
        <div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Front<br><div class="editable" data-placeholder="OK"></div></div>
        <div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Roof<br><div class="editable" data-placeholder="OK"></div></div>
        <div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Rear<br><div class="editable" data-placeholder="OK"></div></div>
        <div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Driver Side<br><div class="editable" data-placeholder="OK"></div></div>
        <div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Interior<br><div class="editable" data-placeholder="OK"></div></div>
        <div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Pass. Side<br><div class="editable" data-placeholder="OK"></div></div>
      </div>
    </div>
    <div class="field"><label>Written Damage Notes</label><div class="editable multiline" data-placeholder="Describe all pre-existing damage — scratches, dents, chips, tears, stains..."></div></div>
  </div>
</div></div>
<div><div class="section-header">4 &mdash; Liability Waiver</div><div class="section-body">
  <p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px;background:#f7f8fc">I, the undersigned vehicle owner, authorize the above-listed detailing services and acknowledge that all pre-existing damage has been documented above. I understand detailing services involve chemicals and equipment that may react differently with aged or previously repaired surfaces. I release <strong>[Your Company Name]</strong> from liability for pre-existing conditions including faded paint, aftermarket wraps, cracked trim, or items left inside the vehicle. Payment is due upon completion.</p>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Customer Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date — I have read and agree to the waiver above</div></div>
  <div class="sig-field"><label>Detailer / Intake Staff</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
</div>
</div>
${_footer('LS-005','For business use only. This waiver does not override applicable consumer protection laws.')}
</div>${_JS}</body></html>`},

'LS-006':{id:'LS-006',title:'Pest Control Follow-Up Card',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pest Control Follow-Up Card</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('006')}</div><div class="header-right"><div class="form-title-text">Pest Control Follow-Up Card</div><div class="form-badge">FORM LS-006 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Service Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Account #</label><div class="editable" data-placeholder="AC-0001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name / License #"></div></div>
  <div class="info-field"><label>Next Service</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Client Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div>
    <div class="field"><label>Square Footage</label><div class="editable" data-placeholder="sq ft"></div></div>
    <div class="field"><label>Service Plan</label><div class="editable" data-placeholder="Monthly / Quarterly"></div></div>
    <div class="field"><label>Contract Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Treatment Summary</div><div class="section-body">
  <div class="field-grid cols-2" style="margin-bottom:14px">
    <div>
      <div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Pests Targeted</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div class="check-item"><input type="checkbox" id="c6a"><label for="c6a">Ants</label></div>
        <div class="check-item"><input type="checkbox" id="c6b"><label for="c6b">Cockroaches</label></div>
        <div class="check-item"><input type="checkbox" id="c6c"><label for="c6c">Rodents (mice/rats)</label></div>
        <div class="check-item"><input type="checkbox" id="c6d"><label for="c6d">Spiders</label></div>
        <div class="check-item"><input type="checkbox" id="c6e"><label for="c6e">Termites</label></div>
        <div class="check-item"><input type="checkbox" id="c6f"><label for="c6f">Bed Bugs</label></div>
        <div class="check-item"><input type="checkbox" id="c6g"><label for="c6g">Wasps / Hornets</label></div>
        <div class="check-item"><input type="checkbox" id="c6h"><label for="c6h">Other — see notes</label></div>
      </div>
    </div>
    <div>
      <div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Treatment Methods Used</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div class="check-item"><input type="checkbox" id="c6i"><label for="c6i">Liquid Spray — Interior</label></div>
        <div class="check-item"><input type="checkbox" id="c6j"><label for="c6j">Liquid Spray — Exterior</label></div>
        <div class="check-item"><input type="checkbox" id="c6k"><label for="c6k">Bait Stations Placed / Checked</label></div>
        <div class="check-item"><input type="checkbox" id="c6l"><label for="c6l">Glue Traps Set</label></div>
        <div class="check-item"><input type="checkbox" id="c6m"><label for="c6m">Dust Application</label></div>
        <div class="check-item"><input type="checkbox" id="c6n"><label for="c6n">Fumigation</label></div>
        <div class="check-item"><input type="checkbox" id="c6o"><label for="c6o">Exclusion / Sealing</label></div>
        <div class="check-item"><input type="checkbox" id="c6p"><label for="c6p">Other — see notes</label></div>
      </div>
    </div>
  </div>
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Chemical(s) Used</label><div class="editable" data-placeholder="Product name"></div></div>
    <div class="field"><label>EPA Reg. #</label><div class="editable" data-placeholder="EPA Reg. #"></div></div>
    <div class="field"><label>Application Rate</label><div class="editable" data-placeholder="oz / gal / concentration"></div></div>
  </div>
  <div class="field"><label>Treatment Notes</label><div class="editable multiline" data-placeholder="Areas treated, observations, activity level..."></div></div>
</div></div>
<div><div class="section-header">3 &mdash; Next Service &amp; Recommendations</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Next Service Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Service Frequency</label><div class="editable" data-placeholder="Monthly / Quarterly"></div></div>
    <div class="field"><label>Technician Assigned</label><div class="editable" data-placeholder="Name"></div></div>
    <div class="field"><label>Estimated Cost</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
  <div class="check-grid" style="margin-bottom:14px">
    <div class="check-item"><input type="checkbox" id="c6q"><label for="c6q">Seal entry points (cracks / gaps)</label></div>
    <div class="check-item"><input type="checkbox" id="c6r"><label for="c6r">Remove standing water</label></div>
    <div class="check-item"><input type="checkbox" id="c6s"><label for="c6s">Store food in sealed containers</label></div>
    <div class="check-item"><input type="checkbox" id="c6t"><label for="c6t">Clear debris from crawlspace</label></div>
    <div class="check-item"><input type="checkbox" id="c6u"><label for="c6u">Trim vegetation from structure</label></div>
    <div class="check-item"><input type="checkbox" id="c6v"><label for="c6v">Fix moisture / leak issues</label></div>
  </div>
  <div class="field"><label>Additional Recommendations</label><div class="editable multiline" data-placeholder="Further actions for client..."></div></div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div>
  <div class="sig-field"><label>Client Acknowledgment</label><div class="sig-line"></div><div class="sig-sub">Service received and post-treatment instructions understood</div></div>
</div>
</div>
${_footer('LS-006','For business use only. Keep copy for pesticide application records as required by state law.')}
</div>${_JS}</body></html>`},

'LS-007':{id:'LS-007',title:'Roofing Change Order + Approval Form',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Roofing Change Order</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('007')}</div><div class="header-right"><div class="form-title-text">Change Order &amp; Approval</div><div class="form-badge">FORM LS-007 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Change Order Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Change Order #</label><div class="editable" data-placeholder="CO-0001"></div></div>
  <div class="info-field"><label>Project / Job #</label><div class="editable" data-placeholder="J-2024-001"></div></div>
  <div class="info-field"><label>Roofing Foreman</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Project Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Property Owner</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Property Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Original Contract Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Project Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Projected Completion</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Original Contract Value</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Scope of Change</div><div class="section-body">
  <div class="field" style="margin-bottom:14px"><label>Reason for Change Order</label><div class="editable multiline" data-placeholder="Why is this change needed? (unforeseen damage, owner request, code requirement...)"></div></div>
  <div class="field"><label>Detailed Description of Additional / Changed Work</label><div class="editable multiline" data-placeholder="Describe all work to be added, removed, or modified..."></div></div>
</div></div>
<div><div class="section-header">3 &mdash; Materials Added / Removed</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Action</th><th>Material / Item Description</th><th>Unit</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td>ADD</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>ADD</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>ADD</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>REMOVE</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td></tr>
    <tr><td>REMOVE</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td></tr>
    <tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Materials Net Change</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Price Adjustment</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Materials Net Change</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Additional Labor Cost</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>This Change Order Total</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Revised Contract Total</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
  <div class="field-grid cols-2">
    <div class="field"><label>New Estimated Completion Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Schedule Impact (days added)</label><div class="editable" data-placeholder="0 days"></div></div>
  </div>
</div></div>
<div><div class="section-header">5 &mdash; Authorization</div><div class="section-body" style="background:#fffbf0;border-color:#e8d87a">
  <p style="font-size:8.5pt;line-height:1.7;color:#444;margin-bottom:14px;border:1px solid #e8d87a;padding:12px;border-radius:4px;background:#fff">By signing below, the property owner authorizes the above change in scope and the revised contract amount. Work will not begin on the changed scope until this form is signed. This change order is incorporated into and subject to the terms of the original contract.</p>
  <div class="sig-block" style="border-top:none;padding-top:0">
    <div class="sig-field"><label>Property Owner Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date</div></div>
    <div class="sig-field"><label>Contractor Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Title / Date</div></div>
  </div>
</div></div>
</div>
${_footer('LS-007','For business use only. Change orders must be signed before commencement of additional work. Retain all copies.')}
</div>${_JS}</body></html>`},

'LS-008':{id:'LS-008',title:'Pressure Washing Route Sheet',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pressure Washing Route Sheet</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('008')}</div><div class="header-right"><div class="form-title-text">Pressure Washing Route Sheet</div><div class="form-badge">FORM LS-008 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Route #</label><div class="editable" data-placeholder="RT-0001"></div></div>
  <div class="info-field"><label>Crew / Operator</label><div class="editable" data-placeholder="Name"></div></div>
  <div class="info-field"><label>Vehicle / Rig #</label><div class="editable" data-placeholder="Rig #"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Rig Info</div><div class="section-body">
  <div class="field-grid cols-4">
    <div class="field"><label>Machine PSI</label><div class="editable" data-placeholder="e.g. 3200 PSI"></div></div>
    <div class="field"><label>GPM Flow Rate</label><div class="editable" data-placeholder="e.g. 4.0 GPM"></div></div>
    <div class="field"><label>Start Mileage</label><div class="editable" data-placeholder="00,000"></div></div>
    <div class="field"><label>End Mileage</label><div class="editable" data-placeholder="00,000"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Daily Job List</div><div class="section-body">
  <table class="form-table"><thead><tr><th>#</th><th>Client / Address</th><th>Surface Type</th><th>PSI Used</th><th>Detergent / Mix</th><th>Start</th><th>End</th><th>Hrs</th><th>Client Sign-Off</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
    <tr><td>6</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
    <tr><td>7</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
    <tr><td>8</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">3 &mdash; End of Day Summary</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Total Jobs Completed</label><div class="editable" data-placeholder="0"></div></div>
    <div class="field"><label>Total Billable Hours</label><div class="editable" data-placeholder="0.0 hrs"></div></div>
    <div class="field"><label>Water Used (gal est.)</label><div class="editable" data-placeholder="0 gal"></div></div>
    <div class="field"><label>Chemical Used</label><div class="editable" data-placeholder="oz / gal"></div></div>
  </div>
  <div class="field-grid cols-2">
    <div class="field"><label>Equipment Issues / Damage</label><div class="editable multiline" data-placeholder="Any equipment problems today..."></div></div>
    <div class="field"><label>Notes / Follow-Up Items</label><div class="editable multiline" data-placeholder="Any follow-up needed for tomorrow..."></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Operator Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
  <div class="sig-field"><label>Supervisor / Office Review</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
</div>
</div>
${_footer('LS-008','For business use only. Retain for your records.')}
</div>${_JS}</body></html>`},

'LS-009':{id:'LS-009',title:'Appliance Repair Parts Tracker',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Appliance Repair Parts Tracker</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('009')}</div><div class="header-right"><div class="form-title-text">Parts Order Tracker</div><div class="form-badge">FORM LS-009 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Week / Period</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Form #</label><div class="editable" data-placeholder="PT-0001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name"></div></div>
  <div class="info-field"><label>Supervisor</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Technician Info</div><div class="section-body">
  <div class="field-grid cols-4">
    <div class="field"><label>Technician Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Badge / ID #</label><div class="editable" data-placeholder="ID #"></div></div>
    <div class="field"><label>Reporting Period</label><div class="editable" data-placeholder="Week / Month"></div></div>
    <div class="field"><label>Supervisor</label><div class="editable" data-placeholder="Name"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Parts Order Log</div><div class="section-body">
  <table class="form-table"><thead><tr><th>#</th><th>Customer / Job #</th><th>Appliance Make / Model</th><th>Part Description</th><th>Part #</th><th>Supplier</th><th>Ordered</th><th>ETA</th><th>Cost</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>6</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>7</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>8</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>9</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
    <tr><td>10</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>
  </tbody></table>
  <div style="font-size:7.5pt;color:#8899cc;margin-top:6px">Status: O=Ordered &middot; S=Shipped &middot; R=Received &middot; I=Installed &middot; B=Back-ordered &middot; C=Cancelled</div>
</div></div>
<div><div class="section-header">3 &mdash; Order Summary</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Total Parts Ordered</label><div class="editable" data-placeholder="0"></div></div>
    <div class="field"><label>Total Parts Received</label><div class="editable" data-placeholder="0"></div></div>
    <div class="field"><label>Total Parts Cost</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Jobs Awaiting Parts</label><div class="editable" data-placeholder="0"></div></div>
  </div>
  <div class="field"><label>Notes / Back-Order Details</label><div class="editable multiline" data-placeholder="Back-order details, ETA updates, substitutions..."></div></div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
  <div class="sig-field"><label>Parts Manager / Supervisor</label><div class="sig-line"></div><div class="sig-sub">Reviewed / Date</div></div>
</div>
</div>
${_footer('LS-009','For business use only. Retain for inventory and job cost records.')}
</div>${_JS}</body></html>`},

'LS-010':{id:'LS-010',title:'Handyman Materials Reimbursement Sheet',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Handyman Materials Reimbursement Sheet</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('010')}</div><div class="header-right"><div class="form-title-text">Materials Reimbursement Sheet</div><div class="form-badge">FORM LS-010 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Form #</label><div class="editable" data-placeholder="MR-0001"></div></div>
  <div class="info-field"><label>Job #</label><div class="editable" data-placeholder="J-2024-001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Job Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Job Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Technician / Handyman</label><div class="editable" data-placeholder="Name"></div></div>
    <div class="field"><label>Work Date(s)</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Job Description</label><div class="editable" data-placeholder="Brief description"></div></div>
    <div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Materials Purchased</div><div class="section-body">
  <table class="form-table"><thead><tr><th>#</th><th>Item Description</th><th>Store / Supplier</th><th>Receipt #</th><th>Date Purchased</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>6</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>7</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>8</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">3 &mdash; Cost Summary</div><div class="section-body">
  <div class="field-grid cols-4">
    <div class="field"><label>Materials Subtotal</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Tax / Fees</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Labor Total</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>TOTAL DUE</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
  <div class="field" style="margin-top:14px;max-width:50%"><label>Payment Method</label><div class="editable" data-placeholder="Cash / Check / Card / Zelle"></div></div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">I certify all materials above were purchased for this job / Date</div></div>
  <div class="sig-field"><label>Client Sign-Off</label><div class="sig-line"></div><div class="sig-sub">I authorize reimbursement of the above materials / Date</div></div>
</div>
</div>
${_footer('LS-010','For business use only. Attach receipts where required. Retain for your records.')}
</div>${_JS}</body></html>`},

'LS-011':{id:'LS-011',title:'Mobile Mechanic Service Summary',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Mobile Mechanic Service Summary</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('011')}</div><div class="header-right"><div class="form-title-text">Mobile Mechanic Service Summary</div><div class="form-badge">FORM LS-011 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Service Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Invoice #</label><div class="editable" data-placeholder="INV-0001"></div></div>
  <div class="info-field"><label>Job #</label><div class="editable" data-placeholder="J-2024-001"></div></div>
  <div class="info-field"><label>Mechanic</label><div class="editable" data-placeholder="Name / Cert #"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Vehicle Information</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
    <div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div>
    <div class="field"><label>Service Location</label><div class="editable" data-placeholder="Address / parking lot"></div></div>
  </div>
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Year</label><div class="editable" data-placeholder="2020"></div></div>
    <div class="field"><label>Make</label><div class="editable" data-placeholder="Make"></div></div>
    <div class="field"><label>Model</label><div class="editable" data-placeholder="Model"></div></div>
    <div class="field"><label>Engine</label><div class="editable" data-placeholder="2.5L / V6"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>License Plate</label><div class="editable" data-placeholder="Plate #"></div></div>
    <div class="field"><label>VIN</label><div class="editable" data-placeholder="VIN"></div></div>
    <div class="field"><label>Mileage</label><div class="editable" data-placeholder="00,000 mi"></div></div>
    <div class="field"><label>Color</label><div class="editable" data-placeholder="Color"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Work Performed</div><div class="section-body">
  <div class="check-grid" style="margin-bottom:14px">
    <div class="check-item"><input type="checkbox" id="c11a"><label for="c11a">Oil &amp; Filter Change</label></div>
    <div class="check-item"><input type="checkbox" id="c11b"><label for="c11b">Brake Inspection / Service</label></div>
    <div class="check-item"><input type="checkbox" id="c11c"><label for="c11c">Battery Test / Replacement</label></div>
    <div class="check-item"><input type="checkbox" id="c11d"><label for="c11d">Starter / Alternator</label></div>
    <div class="check-item"><input type="checkbox" id="c11e"><label for="c11e">Spark Plugs / Ignition</label></div>
    <div class="check-item"><input type="checkbox" id="c11f"><label for="c11f">Belts / Hoses</label></div>
    <div class="check-item"><input type="checkbox" id="c11g"><label for="c11g">Diagnostic Scan (OBD-II)</label></div>
    <div class="check-item"><input type="checkbox" id="c11h"><label for="c11h">Fluid Top-Off / Flush</label></div>
    <div class="check-item"><input type="checkbox" id="c11i"><label for="c11i">Tire Change / Rotation</label></div>
    <div class="check-item"><input type="checkbox" id="c11j"><label for="c11j">Other — see notes</label></div>
  </div>
  <div class="field"><label>Detailed Work Description</label><div class="editable multiline" data-placeholder="Describe all work performed in detail..."></div></div>
</div></div>
<div><div class="section-header">3 &mdash; Parts Replaced</div><div class="section-body">
  <table class="form-table"><thead><tr><th>#</th><th>Part Description</th><th>OEM / Aftermarket</th><th>Part Number</th><th>Qty</th><th>Unit Cost</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="total-row"><td colspan="6" style="text-align:right;padding-right:14px">Parts Subtotal</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Labor &amp; Invoice Total</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Start Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
    <div class="field"><label>End Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
    <div class="field"><label>Total Hours</label><div class="editable" data-placeholder="0.0 hrs"></div></div>
    <div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Labor Total</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Parts Total</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Travel / Service Fee</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>TOTAL DUE</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Mechanic Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Certification # / Date</div></div>
  <div class="sig-field"><label>Customer Sign-Off</label><div class="sig-line"></div><div class="sig-sub">Work completed to satisfaction / Date</div></div>
</div>
</div>
${_footer('LS-011','For business use only. Retain for vehicle service records.')}
</div>${_JS}</body></html>`},

'LS-012':{id:'LS-012',title:'Locksmith Job Authorization Form',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Locksmith Job Authorization Form</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('012')}</div><div class="header-right"><div class="form-title-text">Job Authorization Form</div><div class="form-badge">FORM LS-012 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Work Order #</label><div class="editable" data-placeholder="WO-0001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name / License #"></div></div>
  <div class="info-field"><label>Dispatch Time</label><div class="editable" data-placeholder="00:00 AM"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Client &amp; Property Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Client Full Name</label><div class="editable" data-placeholder="Full legal name"></div></div>
    <div class="field"><label>Phone Number</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
    <div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div>
  </div>
  <div class="field-grid cols-3">
    <div class="field"><label>Property / Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial / Vehicle"></div></div>
    <div class="field"><label>Unit / Apt #</label><div class="editable" data-placeholder="Unit #"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; ID Verification</div><div class="section-body" style="background:#fffaf0">
  <p style="font-size:8pt;color:#774;margin-bottom:12px;font-style:italic">Locksmith must verify identity and authorization before performing any service. All fields required.</p>
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>ID Type Presented</label><div class="editable" data-placeholder="Driver License / Passport"></div></div>
    <div class="field"><label>ID Number</label><div class="editable" data-placeholder="ID #"></div></div>
    <div class="field"><label>ID Expiration Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>ID Matches Name Above?</label><div class="editable" data-placeholder="Yes / No"></div></div>
  </div>
  <div class="field-grid cols-2">
    <div class="field"><label>Relationship to Property</label><div class="editable" data-placeholder="Owner / Tenant / Agent"></div></div>
    <div class="field"><label>Proof of Ownership / Residency</label><div class="editable" data-placeholder="Utility bill / lease / deed"></div></div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Authorization Statement</div><div class="section-body">
  <p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px;background:#f7f8fc">I, the undersigned, hereby authorize <strong>[Your Company Name]</strong> to perform the locksmith services described below on the property listed above. I certify that I am the legal owner, authorized tenant, or designated representative of this property. I understand that making a false statement to obtain locksmith services may constitute a criminal offense. I accept full liability for any unauthorized service request. I agree to pay the quoted price upon completion of service.</p>
</div></div>
<div><div class="section-header">4 &mdash; Service Description</div><div class="section-body">
  <div class="check-grid" style="margin-bottom:14px">
    <div class="check-item"><input type="checkbox" id="c12a"><label for="c12a">Lockout — Residential</label></div>
    <div class="check-item"><input type="checkbox" id="c12b"><label for="c12b">Lockout — Vehicle</label></div>
    <div class="check-item"><input type="checkbox" id="c12c"><label for="c12c">Lock Re-Key</label></div>
    <div class="check-item"><input type="checkbox" id="c12d"><label for="c12d">Lock Replacement / Upgrade</label></div>
    <div class="check-item"><input type="checkbox" id="c12e"><label for="c12e">Deadbolt Installation</label></div>
    <div class="check-item"><input type="checkbox" id="c12f"><label for="c12f">Master Key System</label></div>
    <div class="check-item"><input type="checkbox" id="c12g"><label for="c12g">Safe Opening / Combination Change</label></div>
    <div class="check-item"><input type="checkbox" id="c12h"><label for="c12h">Key Duplication</label></div>
    <div class="check-item"><input type="checkbox" id="c12i"><label for="c12i">Access Control / Smart Lock</label></div>
    <div class="check-item"><input type="checkbox" id="c12j"><label for="c12j">Other — see notes</label></div>
  </div>
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Quoted Price</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>After-Hours / Emergency Fee</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Total Amount Agreed</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
  <div class="field"><label>Service Notes</label><div class="editable multiline" data-placeholder="Additional details, lock make/model, special instructions..."></div></div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date — I authorize the above service</div></div>
  <div class="sig-field"><label>Locksmith Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div>
</div>
</div>
${_footer('LS-012','For business use only. ID verification is mandatory. Retain signed copy per state licensing requirements.')}
</div>${_JS}</body></html>`},

'LS-013':{id:'LS-013',title:'Painting Prep & Final Punch List',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Painting Prep &amp; Final Punch List</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('013')}</div><div class="header-right"><div class="form-title-text">Prep &amp; Final Punch List</div><div class="form-badge">FORM LS-013 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Form #</label><div class="editable" data-placeholder="PP-0001"></div></div>
  <div class="info-field"><label>Job #</label><div class="editable" data-placeholder="J-2024-001"></div></div>
  <div class="info-field"><label>Lead Painter</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Project Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Project Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Lead Painter</label><div class="editable" data-placeholder="Name"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Project Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div>
    <div class="field"><label>Interior / Exterior</label><div class="editable" data-placeholder="Interior / Exterior / Both"></div></div>
    <div class="field"><label>Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Completion Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Surface Prep Checklist</div><div class="section-body">
  <div class="check-grid">
    <div class="check-item"><input type="checkbox" id="c13a"><label for="c13a">Furniture / fixtures moved or covered</label></div>
    <div class="check-item"><input type="checkbox" id="c13b"><label for="c13b">Drop cloths laid on all floors</label></div>
    <div class="check-item"><input type="checkbox" id="c13c"><label for="c13c">Hardware removed (outlets, plates, hooks)</label></div>
    <div class="check-item"><input type="checkbox" id="c13d"><label for="c13d">Cracks / holes patched with spackle</label></div>
    <div class="check-item"><input type="checkbox" id="c13e"><label for="c13e">Surfaces sanded smooth</label></div>
    <div class="check-item"><input type="checkbox" id="c13f"><label for="c13f">Surfaces wiped clean (dust / grease)</label></div>
    <div class="check-item"><input type="checkbox" id="c13g"><label for="c13g">Caulk applied to trim / edges</label></div>
    <div class="check-item"><input type="checkbox" id="c13h"><label for="c13h">Tape applied to all masking areas</label></div>
    <div class="check-item"><input type="checkbox" id="c13i"><label for="c13i">Wood rot addressed / repaired</label></div>
    <div class="check-item"><input type="checkbox" id="c13j"><label for="c13j">Stains spot-primed (water / smoke)</label></div>
    <div class="check-item"><input type="checkbox" id="c13k"><label for="c13k">Exterior surfaces pressure washed</label></div>
    <div class="check-item"><input type="checkbox" id="c13l"><label for="c13l">All prep work approved by lead</label></div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Primer &amp; Top Coat Notes</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Primer Brand</label><div class="editable" data-placeholder="Brand name"></div></div>
    <div class="field"><label>Primer Color / Tint</label><div class="editable" data-placeholder="Color / tint"></div></div>
    <div class="field"><label>Applied By</label><div class="editable" data-placeholder="Name"></div></div>
    <div class="field"><label>Dry Time</label><div class="editable" data-placeholder="e.g. 2 hrs"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Top Coat Brand</label><div class="editable" data-placeholder="Brand name"></div></div>
    <div class="field"><label>Color Name / Code</label><div class="editable" data-placeholder="SW 7015 / Benjamin Moore"></div></div>
    <div class="field"><label>Sheen Level</label><div class="editable" data-placeholder="Flat / Eggshell / Semi-gloss"></div></div>
    <div class="field"><label># of Coats</label><div class="editable" data-placeholder="2"></div></div>
  </div>
</div></div>
<div><div class="section-header">4 &mdash; Final Punch List</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Area / Room</th><th>Item / Issue</th><th>Assigned To</th><th>Completed?</th><th>Initials</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">5 &mdash; Client Walkthrough Sign-Off</div><div class="section-body">
  <div class="field" style="margin-bottom:14px"><label>Client Comments / Punch Items Noted</label><div class="editable multiline" data-placeholder="Client feedback during walkthrough..."></div></div>
  <div class="field-grid cols-3">
    <div class="field"><label>Walkthrough Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Outstanding Items Resolved?</label><div class="editable" data-placeholder="Yes / No"></div></div>
    <div class="field"><label>Final Payment Amount</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Lead Painter Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
  <div class="sig-field"><label>Client Acceptance</label><div class="sig-line"></div><div class="sig-sub">Work completed to satisfaction / Date</div></div>
</div>
</div>
${_footer('LS-013','For business use only. Retain for project records.')}
</div>${_JS}</body></html>`},

'LS-014':{id:'LS-014',title:'Snow Removal Trigger Checklist',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Snow Removal Trigger Checklist</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('014')}</div><div class="header-right"><div class="form-title-text">Snow Removal Trigger Checklist</div><div class="form-badge">FORM LS-014 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Season</label><div class="editable" id="field-date" data-placeholder="2024–2025"></div></div>
  <div class="info-field"><label>Form #</label><div class="editable" data-placeholder="SR-0001"></div></div>
  <div class="info-field"><label>Operations Manager</label><div class="editable" data-placeholder="Name"></div></div>
  <div class="info-field"><label>Total Routes</label><div class="editable" data-placeholder="0"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Season Information</div><div class="section-body">
  <div class="field-grid cols-4">
    <div class="field"><label>Season Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Season End Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Total Contracted Routes</label><div class="editable" data-placeholder="0"></div></div>
    <div class="field"><label>Number of Crews</label><div class="editable" data-placeholder="0"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Service Trigger Conditions</div><div class="section-body">
  <div class="field-grid cols-2">
    <div>
      <div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Snowfall Triggers</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div class="check-item"><input type="checkbox" id="c14a"><label for="c14a">1&quot; accumulation trigger</label></div>
        <div class="check-item"><input type="checkbox" id="c14b"><label for="c14b">2&quot; accumulation trigger</label></div>
        <div class="check-item"><input type="checkbox" id="c14c"><label for="c14c">3&quot; accumulation trigger</label></div>
        <div class="check-item"><input type="checkbox" id="c14d"><label for="c14d">Per-push (any accumulation)</label></div>
        <div class="check-item"><input type="checkbox" id="c14e"><label for="c14e">Zero-tolerance (continuous)</label></div>
        <div class="check-item"><input type="checkbox" id="c14f"><label for="c14f">Client-requested call-out only</label></div>
      </div>
    </div>
    <div>
      <div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Ice &amp; Condition Triggers</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        <div class="check-item"><input type="checkbox" id="c14g"><label for="c14g">Black ice — auto deploy</label></div>
        <div class="check-item"><input type="checkbox" id="c14h"><label for="c14h">Temp below ___&deg;F — pre-treat</label></div>
        <div class="check-item"><input type="checkbox" id="c14i"><label for="c14i">Freezing rain forecast</label></div>
        <div class="check-item"><input type="checkbox" id="c14j"><label for="c14j">Post-storm re-freeze check</label></div>
        <div class="check-item"><input type="checkbox" id="c14k"><label for="c14k">Daytime melt + overnight freeze</label></div>
        <div class="check-item"><input type="checkbox" id="c14l"><label for="c14l">Client site inspection only</label></div>
      </div>
    </div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Client Route List</div><div class="section-body">
  <table class="form-table"><thead><tr><th>#</th><th>Client / Property Name</th><th>Address</th><th>Trigger (in.)</th><th>Salt / Sand?</th><th>Priority</th><th>Crew</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
    <tr><td>6</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
    <tr><td>7</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
    <tr><td>8</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder='2"'></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Service Log</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Event Date</th><th>Snowfall / Condition</th><th>Deploy Time</th><th>Routes Serviced</th><th>Salt Used (lbs)</th><th>Completed By</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="3&quot; snow"></div></td><td><div class="editable" data-placeholder="2:00 AM"></div></td><td><div class="editable" data-placeholder="All / partial"></div></td><td><div class="editable" data-placeholder="lbs"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="3&quot; snow"></div></td><td><div class="editable" data-placeholder="2:00 AM"></div></td><td><div class="editable" data-placeholder="All / partial"></div></td><td><div class="editable" data-placeholder="lbs"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="3&quot; snow"></div></td><td><div class="editable" data-placeholder="2:00 AM"></div></td><td><div class="editable" data-placeholder="All / partial"></div></td><td><div class="editable" data-placeholder="lbs"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="3&quot; snow"></div></td><td><div class="editable" data-placeholder="2:00 AM"></div></td><td><div class="editable" data-placeholder="All / partial"></div></td><td><div class="editable" data-placeholder="lbs"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">5 &mdash; Equipment Pre-Season Check</div><div class="section-body">
  <div class="check-grid">
    <div class="check-item"><input type="checkbox" id="c14m"><label for="c14m">Plow blades inspected</label></div>
    <div class="check-item"><input type="checkbox" id="c14n"><label for="c14n">Truck fluids topped off</label></div>
    <div class="check-item"><input type="checkbox" id="c14o"><label for="c14o">Salt spreaders calibrated</label></div>
    <div class="check-item"><input type="checkbox" id="c14p"><label for="c14p">Salt / sand inventory stocked</label></div>
    <div class="check-item"><input type="checkbox" id="c14q"><label for="c14q">Snow blowers serviced</label></div>
    <div class="check-item"><input type="checkbox" id="c14r"><label for="c14r">Emergency contact list updated</label></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Operations Manager Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
  <div class="sig-field"><label>Owner / Supervisor Review</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
</div>
</div>
${_footer('LS-014','For business use only. Retain for season operations records.')}
</div>${_JS}</body></html>`},

'LS-015':{id:'LS-015',title:'Window Cleaning Client Packet',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Window Cleaning Client Packet</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('015')}</div><div class="header-right"><div class="form-title-text">Window Cleaning Client Packet</div><div class="form-badge">FORM LS-015 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Client #</label><div class="editable" data-placeholder="CL-0001"></div></div>
  <div class="info-field"><label>Route</label><div class="editable" data-placeholder="Route name / #"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Client Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Billing Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-3">
    <div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div>
    <div class="field"><label>Preferred Contact Method</label><div class="editable" data-placeholder="Phone / Email / Text"></div></div>
    <div class="field"><label>Referral Source</label><div class="editable" data-placeholder="Google / Referral / Other"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Property Details</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div>
    <div class="field"><label>Stories / Height</label><div class="editable" data-placeholder="1-story / 2-story"></div></div>
    <div class="field"><label>Total Window Count</label><div class="editable" data-placeholder="0 windows"></div></div>
  </div>
  <div class="check-grid">
    <div class="check-item"><input type="checkbox" id="c15a"><label for="c15a">Interior windows included</label></div>
    <div class="check-item"><input type="checkbox" id="c15b"><label for="c15b">Screen cleaning included</label></div>
    <div class="check-item"><input type="checkbox" id="c15c"><label for="c15c">Track &amp; sill cleaning included</label></div>
    <div class="check-item"><input type="checkbox" id="c15d"><label for="c15d">Skylights included</label></div>
    <div class="check-item"><input type="checkbox" id="c15e"><label for="c15e">Hard water stain removal</label></div>
    <div class="check-item"><input type="checkbox" id="c15f"><label for="c15f">Storm windows / panels</label></div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Service Schedule</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Visit #</th><th>Scheduled Date</th><th>Time Window</th><th>Service Type</th><th>Technician</th><th>Completed</th><th>Amount</th></tr></thead>
  <tbody>
    <tr><td>1</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM–12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>2</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM–12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>3</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM–12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>4</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM–12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>5</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM–12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>6</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM–12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Scope of Work &amp; Pricing</div><div class="section-body">
  <div class="field" style="margin-bottom:14px"><label>Detailed Scope / Special Instructions</label><div class="editable multiline" data-placeholder="Access instructions, special window types, equipment needed..."></div></div>
  <div class="field-grid cols-3">
    <div class="field"><label>Service Frequency</label><div class="editable" data-placeholder="Monthly / Quarterly / Annual"></div></div>
    <div class="field"><label>Quoted Price Per Visit</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Annual Contract Value</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
</div></div>
<div><div class="section-header">5 &mdash; Terms &amp; Service Agreement</div><div class="section-body">
  <p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px;background:#f7f8fc">Services are performed during agreed-upon windows. Client is responsible for providing clear access to all windows. <strong>[Your Company Name]</strong> is not liable for pre-existing screen tears, cracked seals, window damage, or paint drips on glass. Cancellations require 24-hour notice or a cancellation fee applies. Payment is due on the day of service unless invoiced under a contract agreement. Prices may be adjusted annually.</p>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div class="sig-sub">I agree to the scope and terms above / Date</div></div>
  <div class="sig-field"><label>Company Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Title / Date</div></div>
</div>
</div>
${_footer('LS-015','For business use only. Retain signed copy for client file.')}
</div>${_JS}</body></html>`},

'LS-016':{id:'LS-016',title:'Pool Service Chemical Log',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pool Service Chemical Log</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('016')}</div><div class="header-right"><div class="form-title-text">Pool Chemical Service Log</div><div class="form-badge">FORM LS-016 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Month / Year</label><div class="editable" id="field-date" data-placeholder="MM/YYYY"></div></div>
  <div class="info-field"><label>Account #</label><div class="editable" data-placeholder="AC-0001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name / Cert #"></div></div>
  <div class="info-field"><label>Client Name</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Pool Information</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
    <div class="field"><label>Pool Type</label><div class="editable" data-placeholder="In-ground / Above-ground / Spa"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Pool Volume (gal)</label><div class="editable" data-placeholder="15,000 gal"></div></div>
    <div class="field"><label>Sanitizer Type</label><div class="editable" data-placeholder="Chlorine / Salt / Bromine"></div></div>
    <div class="field"><label>Filter Type</label><div class="editable" data-placeholder="Sand / Cartridge / DE"></div></div>
    <div class="field"><label>Pump Run Time (hr/day)</label><div class="editable" data-placeholder="8 hrs/day"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Weekly Water Chemistry Log</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Date</th><th>Tech</th><th>Free Cl (FC) ppm</th><th>pH</th><th>Total Alk (TA)</th><th>Cal Hard (CH)</th><th>CYA ppm</th><th>Temp &deg;F</th><th>Notes / Actions</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>
  </tbody></table>
  <div style="font-size:7.5pt;color:#8899cc;margin-top:6px">Target: FC 2–4 ppm &middot; pH 7.4–7.6 &middot; TA 80–120 ppm &middot; CH 200–400 ppm &middot; CYA 30–50 ppm</div>
</div></div>
<div><div class="section-header">3 &mdash; Chemical Dosage Record</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Date</th><th>Chemical Name</th><th>Purpose</th><th>Amount Added</th><th>Unit</th><th>Applied By</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Monthly Summary</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Total Service Visits</label><div class="editable" data-placeholder="0"></div></div>
    <div class="field"><label>Filter Cleaned / Backwashed</label><div class="editable" data-placeholder="Yes / No / Date"></div></div>
    <div class="field"><label>Algae Treatment Required?</label><div class="editable" data-placeholder="Yes / No"></div></div>
    <div class="field"><label>Equipment Issues Noted?</label><div class="editable" data-placeholder="Yes / No — see notes"></div></div>
  </div>
  <div class="field"><label>Monthly Observations &amp; Recommendations</label><div class="editable multiline" data-placeholder="Equipment condition, upcoming needs, client notes..."></div></div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Pool Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Certification # / Date</div></div>
  <div class="sig-field"><label>Client Review (optional)</label><div class="sig-line"></div><div class="sig-sub">Monthly sign-off / Date</div></div>
</div>
</div>
${_footer('LS-016','For business use only. Retain chemical records as required by local health department regulations.')}
</div>${_JS}</body></html>`},

'LS-017':{id:'LS-017',title:'Flooring Estimate Scope Matrix',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Flooring Estimate Scope Matrix</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('017')}</div><div class="header-right"><div class="form-title-text">Flooring Estimate Scope Matrix</div><div class="form-badge">FORM LS-017 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Estimate Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Estimate #</label><div class="editable" data-placeholder="EST-0001"></div></div>
  <div class="info-field"><label>Valid Until</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Estimator</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Client &amp; Project Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Project Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone / Email</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Project Type</label><div class="editable" data-placeholder="New install / Refinish / Replace"></div></div>
    <div class="field"><label>Est. Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Est. Duration</label><div class="editable" data-placeholder="e.g. 3 days"></div></div>
    <div class="field"><label>Estimator</label><div class="editable" data-placeholder="Name"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Room-by-Room Scope</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Room / Area</th><th>Sq Ft</th><th>Flooring Material</th><th>Material $/sqft</th><th>Material Total</th><th>Labor $/sqft</th><th>Labor Total</th><th>Room Total</th></tr></thead>
  <tbody>
    <tr><td>Living Room</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>Master Bedroom</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>Bedroom 2</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>Bedroom 3</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>Kitchen</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>Dining Room</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>Hallway / Stairs</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td>Bathroom(s)</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Other room..."></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
    <tr class="total-row"><td colspan="7" style="text-align:right;padding-right:14px">PROJECT SUBTOTAL</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">3 &mdash; Material Summary</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Primary Material</label><div class="editable" data-placeholder="LVP / Hardwood / Tile"></div></div>
    <div class="field"><label>Brand / Grade</label><div class="editable" data-placeholder="Brand / Grade"></div></div>
    <div class="field"><label>Color / SKU</label><div class="editable" data-placeholder="Color / SKU #"></div></div>
    <div class="field"><label>Waste Factor (%)</label><div class="editable" data-placeholder="10%"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Underlayment Needed?</label><div class="editable" data-placeholder="Yes / No"></div></div>
    <div class="field"><label>Subfloor Prep Required?</label><div class="editable" data-placeholder="Yes / No"></div></div>
    <div class="field"><label>Transitions / Molding</label><div class="editable" data-placeholder="Yes / No — lf"></div></div>
    <div class="field"><label>Demo / Removal</label><div class="editable" data-placeholder="Yes / No — sq ft"></div></div>
  </div>
</div></div>
<div><div class="section-header">4 &mdash; Estimate Total</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Materials Subtotal</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Labor Subtotal</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Additional Charges</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>ESTIMATE TOTAL</label><div class="editable" data-placeholder="$0.00"></div></div>
  </div>
  <div class="field-grid cols-3">
    <div class="field"><label>Deposit Required</label><div class="editable" data-placeholder="$0.00 (50%)"></div></div>
    <div class="field"><label>Balance Due</label><div class="editable" data-placeholder="$0.00"></div></div>
    <div class="field"><label>Payment Terms</label><div class="editable" data-placeholder="Net 30 / Due on completion"></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Estimator Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
  <div class="sig-field"><label>Client Approval</label><div class="sig-line"></div><div class="sig-sub">I approve this estimate and authorize the project to proceed / Date</div></div>
</div>
</div>
${_footer('LS-017','For business use only. Estimates valid for period shown. Final invoice may vary based on field conditions.')}
</div>${_JS}</body></html>`},

'LS-018':{id:'LS-018',title:'Contractor Daily Site Report',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Contractor Daily Site Report</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('018')}</div><div class="header-right"><div class="form-title-text">Contractor Daily Site Report</div><div class="form-badge">FORM LS-018 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Report Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Report #</label><div class="editable" data-placeholder="DSR-0001"></div></div>
  <div class="info-field"><label>Project #</label><div class="editable" data-placeholder="P-2024-001"></div></div>
  <div class="info-field"><label>Site Foreman</label><div class="editable" data-placeholder="Name"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Project Information</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Project Name</label><div class="editable" data-placeholder="Project name"></div></div>
    <div class="field"><label>Site Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Project Manager</label><div class="editable" data-placeholder="Name"></div></div>
    <div class="field"><label>Weather / Conditions</label><div class="editable" data-placeholder="Sunny / Cloudy / Rain"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Temperature (&deg;F)</label><div class="editable" data-placeholder="72&deg;F"></div></div>
    <div class="field"><label>Contract Phase</label><div class="editable" data-placeholder="Foundation / Framing / Finish"></div></div>
    <div class="field"><label>% Complete (overall)</label><div class="editable" data-placeholder="0%"></div></div>
    <div class="field"><label>Site Foreman</label><div class="editable" data-placeholder="Name"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Crew Roster</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Name</th><th>Trade / Role</th><th>Company / Sub</th><th>Time In</th><th>Time Out</th><th>Hours</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>
    <tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Total Man-Hours Today</td><td><div class="editable" data-placeholder="0.0"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">3 &mdash; Work Completed Today</div><div class="section-body">
  <div class="field"><label>Summary of Work Performed</label><div class="editable multiline" data-placeholder="Describe all work completed today in detail..."></div></div>
</div></div>
<div><div class="section-header">4 &mdash; Materials Used / Received</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Material / Item</th><th>Qty Used</th><th>Unit</th><th>Delivered Today?</th><th>Supplier</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">5 &mdash; Delays, Issues &amp; Safety</div><div class="section-body">
  <div class="field-grid cols-2">
    <div class="field"><label>Delays / Problems Encountered</label><div class="editable multiline" data-placeholder="Weather delays, material shortages, subcontractor issues..."></div></div>
    <div class="field"><label>Safety Incidents / Near-Misses</label><div class="editable multiline" data-placeholder="Any safety events, injuries, or near-misses..."></div></div>
  </div>
</div></div>
<div><div class="section-header">6 &mdash; Next Day Plan</div><div class="section-body">
  <div class="field" style="margin-bottom:14px"><label>Planned Work for Tomorrow</label><div class="editable multiline" data-placeholder="What will be worked on tomorrow..."></div></div>
  <div class="field-grid cols-3">
    <div class="field"><label>Materials Needed Tomorrow</label><div class="editable" data-placeholder="Materials list"></div></div>
    <div class="field"><label>Subs / Crew Expected</label><div class="editable" data-placeholder="Crew / subcontractors"></div></div>
    <div class="field"><label>Inspections Scheduled?</label><div class="editable" data-placeholder="Yes / No — type"></div></div>
  </div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Site Foreman Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
  <div class="sig-field"><label>Project Manager Review</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div>
</div>
</div>
${_footer('LS-018','For business use only. File in project documentation folder. Retain for duration of project plus 3 years.')}
</div>${_JS}</body></html>`},

'LS-019':{id:'LS-019',title:'Septic Service Pump Log',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Septic Service Pump Log</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('019')}</div><div class="header-right"><div class="form-title-text">Septic Service Pump Log</div><div class="form-badge">FORM LS-019 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Service Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Work Order #</label><div class="editable" data-placeholder="WO-0001"></div></div>
  <div class="info-field"><label>Technician</label><div class="editable" data-placeholder="Name / License #"></div></div>
  <div class="info-field"><label>Truck / Unit #</label><div class="editable" data-placeholder="Unit #"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Property Information</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Property Owner</label><div class="editable" data-placeholder="Full name"></div></div>
    <div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
    <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>County / Municipality</label><div class="editable" data-placeholder="County"></div></div>
    <div class="field"><label>Permit # (if applicable)</label><div class="editable" data-placeholder="Permit #"></div></div>
    <div class="field"><label>Years at Property</label><div class="editable" data-placeholder="0 yrs"></div></div>
    <div class="field"><label>Last Service Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Tank Details</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Tank Size (gal)</label><div class="editable" data-placeholder="1,000 gal"></div></div>
    <div class="field"><label>Tank Material</label><div class="editable" data-placeholder="Concrete / Fiberglass / Plastic"></div></div>
    <div class="field"><label>Number of Compartments</label><div class="editable" data-placeholder="1 / 2"></div></div>
    <div class="field"><label>Tank Install Year</label><div class="editable" data-placeholder="Year"></div></div>
  </div>
  <div class="field-grid cols-4">
    <div class="field"><label>Tank Location / Depth</label><div class="editable" data-placeholder="Location / depth"></div></div>
    <div class="field"><label>Access Risers Present?</label><div class="editable" data-placeholder="Yes / No"></div></div>
    <div class="field"><label>Effluent Filter Present?</label><div class="editable" data-placeholder="Yes / No"></div></div>
    <div class="field"><label>Pump Chamber Present?</label><div class="editable" data-placeholder="Yes / No"></div></div>
  </div>
</div></div>
<div><div class="section-header">3 &mdash; Service Record</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Service Date</th><th>Tech</th><th>Service Type</th><th>Gallons Pumped</th><th>Waste Disposal Site</th><th>Manifest #</th></tr></thead>
  <tbody>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">4 &mdash; Observations</div><div class="section-body">
  <div class="check-grid" style="margin-bottom:14px">
    <div class="check-item"><input type="checkbox" id="c19a"><label for="c19a">Tank in good condition</label></div>
    <div class="check-item"><input type="checkbox" id="c19b"><label for="c19b">Inlet / outlet baffle intact</label></div>
    <div class="check-item"><input type="checkbox" id="c19c"><label for="c19c">Signs of root intrusion</label></div>
    <div class="check-item"><input type="checkbox" id="c19d"><label for="c19d">Cracks / damage to tank</label></div>
    <div class="check-item"><input type="checkbox" id="c19e"><label for="c19e">High scum / sludge levels</label></div>
    <div class="check-item"><input type="checkbox" id="c19f"><label for="c19f">Effluent filter cleaned</label></div>
    <div class="check-item"><input type="checkbox" id="c19g"><label for="c19g">Pump alarm functioning</label></div>
    <div class="check-item"><input type="checkbox" id="c19h"><label for="c19h">Evidence of drainfield failure</label></div>
  </div>
  <div class="field"><label>Observation Notes</label><div class="editable multiline" data-placeholder="Detailed observations, condition notes, photos taken..."></div></div>
</div></div>
<div><div class="section-header">5 &mdash; Compliance &amp; Recommendations</div><div class="section-body">
  <div class="field-grid cols-3" style="margin-bottom:14px">
    <div class="field"><label>Next Recommended Service Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div>
    <div class="field"><label>Pumping Frequency Recommended</label><div class="editable" data-placeholder="Every 2–3 years"></div></div>
    <div class="field"><label>Regulatory Report Required?</label><div class="editable" data-placeholder="Yes / No"></div></div>
  </div>
  <div class="field"><label>Compliance Notes / Required Actions</label><div class="editable multiline" data-placeholder="Required repairs, compliance actions, follow-up items..."></div></div>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div>
  <div class="sig-field"><label>Property Owner Acknowledgment</label><div class="sig-line"></div><div class="sig-sub">Service received and conditions noted / Date</div></div>
</div>
</div>
${_footer('LS-019','For business use only. Waste hauling manifests must comply with state environmental regulations. Retain all records.')}
</div>${_JS}</body></html>`},

'LS-020':{id:'LS-020',title:'Service Fee Transparency Addendum',html:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Service Fee Transparency Addendum</title>${_CSS}</head><body>
${_toolbar()}
<div class="page">
<div class="header"><div>${_logoBlock('020')}</div><div class="header-right"><div class="form-title-text">Service Fee Transparency Addendum</div><div class="form-badge">FORM LS-020 &middot; REV 2.0</div></div></div>
<div class="accent-bar"></div>
<div class="info-strip">
  <div class="info-field"><label>Effective Date</label><div class="editable" id="field-date" data-placeholder="MM/DD/YYYY"></div></div>
  <div class="info-field"><label>Addendum #</label><div class="editable" data-placeholder="ADD-0001"></div></div>
  <div class="info-field"><label>Job / Account #</label><div class="editable" data-placeholder="J-2024-001"></div></div>
  <div class="info-field"><label>Rep / Preparer</label><div class="editable" data-placeholder="Name / Title"></div></div>
</div>
<div class="body">
<div><div class="section-header">1 &mdash; Business &amp; Client Information</div><div class="section-body">
  <div class="field-grid cols-2" style="margin-bottom:14px">
    <div>
      <div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Service Provider</div>
      <div class="field" style="margin-bottom:10px"><label>Company Name</label><div class="editable" data-placeholder="Company name"></div></div>
      <div class="field" style="margin-bottom:10px"><label>Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
      <div class="field-grid cols-2">
        <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
        <div class="field"><label>License #</label><div class="editable" data-placeholder="License #"></div></div>
      </div>
    </div>
    <div>
      <div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Client</div>
      <div class="field" style="margin-bottom:10px"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div>
      <div class="field" style="margin-bottom:10px"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div>
      <div class="field-grid cols-2">
        <div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div>
        <div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div>
      </div>
    </div>
  </div>
</div></div>
<div><div class="section-header">2 &mdash; Current Fee Schedule</div><div class="section-body">
  <table class="form-table"><thead><tr><th>Fee / Charge Type</th><th>Description</th><th>Rate / Amount</th><th>Unit</th><th>Applies When</th></tr></thead>
  <tbody>
    <tr><td>Service Call / Diagnostic</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>per visit</td><td>Every dispatch</td></tr>
    <tr><td>Standard Labor Rate</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/hr"></div></td><td>per hour</td><td>M–F standard hours</td></tr>
    <tr><td>Overtime Labor Rate</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/hr"></div></td><td>per hour</td><td><div class="editable" data-placeholder="After __ hrs / weekends"></div></td></tr>
    <tr><td>Emergency / After-Hours</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>per visit</td><td>Outside business hours</td></tr>
    <tr><td>Holiday Rate</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/hr"></div></td><td>per hour</td><td>Recognized holidays</td></tr>
    <tr><td>Travel / Mileage Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/mi"></div></td><td>per mile / flat</td><td><div class="editable" data-placeholder="Beyond __ miles"></div></td></tr>
    <tr><td>Parts Mark-Up</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="__% above cost"></div></td><td>per order</td><td>All parts sourced</td></tr>
    <tr><td>Permit / Filing Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>flat fee</td><td>When permit required</td></tr>
    <tr><td>Cancellation Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>flat fee</td><td><div class="editable" data-placeholder="Less than __ hrs notice"></div></td></tr>
    <tr><td>Returned Check Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>flat fee</td><td>NSF / returned payment</td></tr>
    <tr><td>Late Payment Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="__% / month"></div></td><td>monthly</td><td><div class="editable" data-placeholder="Past due after __ days"></div></td></tr>
    <tr><td><div class="editable" data-placeholder="Other fee..."></div></td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="Unit"></div></td><td><div class="editable" data-placeholder="When applies"></div></td></tr>
  </tbody></table>
</div></div>
<div><div class="section-header">3 &mdash; Payment Terms</div><div class="section-body">
  <div class="field-grid cols-4" style="margin-bottom:14px">
    <div class="field"><label>Invoice Due</label><div class="editable" data-placeholder="Net 30 / Due on receipt"></div></div>
    <div class="field"><label>Accepted Payment Methods</label><div class="editable" data-placeholder="Cash / Check / Card / Zelle"></div></div>
    <div class="field"><label>Deposit Required</label><div class="editable" data-placeholder="Yes / No — amount"></div></div>
    <div class="field"><label>Payment Plan Available?</label><div class="editable" data-placeholder="Yes / No"></div></div>
  </div>
  <div class="field"><label>Additional Payment Terms / Notes</label><div class="editable multiline" data-placeholder="Any additional payment terms, finance charges, or special arrangements..."></div></div>
</div></div>
<div><div class="section-header">4 &mdash; Client Acknowledgment</div><div class="section-body" style="background:#f7f8fc">
  <p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px">By signing below, I acknowledge that I have received, read, and understand the fee schedule listed above. I agree that all services rendered by <strong>[Your Company Name]</strong> will be billed in accordance with the rates shown, and that this addendum forms part of my service agreement. I understand that rates may be updated with 30 days written notice. I agree to pay all invoices in accordance with the payment terms stated above.</p>
</div></div>
<div class="sig-block">
  <div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date</div></div>
  <div class="sig-field"><label>Company Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Title / Date</div></div>
</div>
</div>
${_footer('LS-020','For business use only. Present to all new clients before service begins. Not a substitute for a full service contract.')}
</div>${_JS}</body></html>`}

};

function generateTemplate(listingId) {
  const t = TEMPLATES[listingId];
  if (!t) return '<p>Template not found.</p>';
  return t.html;
}

function openTemplate(listingId) {
  const html = generateTemplate(listingId);
  const win = window.open('', '_blank');
  if (win) { win.document.write(html); win.document.close(); }
}

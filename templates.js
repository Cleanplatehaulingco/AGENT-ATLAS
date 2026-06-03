// Agent Atlas — Premium Printable Trade Form Templates v2.0
// TradeOpsVault · Premium Series — 3-Page Template System
// Usage: openTemplate('LS-001') to open in new tab, or generateTemplate('LS-001') to get HTML string

function _cssFor(accent, accentDark) {
  accent = accent || '#4f7cff';
  accentDark = accentDark || '#3a6ae8';
  return '<style>'
  +'@import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap\');'
  +':root{--accent:'+accent+';--accent-dark:'+accentDark+';}'
  +'* { box-sizing: border-box; margin: 0; padding: 0; }'
  +'body { font-family: \'Inter\', \'Segoe UI\', Arial, sans-serif; font-size: 10pt; color: #1a1a2e; background: #dfe3ef; padding: 28px; }'
  +'.page { background: #fff; max-width: 880px; margin: 0 auto; box-shadow: 0 12px 40px rgba(0,0,0,0.18); border-radius: 6px; overflow: hidden; }'
  +'@media print { body { background:#fff;padding:0; } .page{box-shadow:none;border-radius:0;} .no-print{display:none!important;} }'
  +'.header { background: linear-gradient(135deg, #0f1628 0%, #1a2744 100%); color:#fff; padding:24px 40px; display:flex; justify-content:space-between; align-items:center; gap:16px; }'
+'.logo-zone { border: 2.5px dashed rgba(255,255,255,0.6); border-radius:10px; padding:14px 20px; cursor:pointer; color:rgba(255,255,255,0.85); font-size:9pt; text-align:center; min-width:160px; transition:all .2s; background:rgba(255,255,255,0.07); }'
  +'.logo-zone:hover { border-color:#fff; color:#fff; background:rgba(255,255,255,0.14); transform:scale(1.02); }'
  +'.company-name-field { font-size:15pt; font-weight:900; letter-spacing:-0.5px; color:#fff; text-transform:uppercase; margin-top:6px; border-bottom:1px solid rgba(255,255,255,0.2); min-width:180px; }'
  +'.company-name-field:empty::before { content:\'YOUR COMPANY NAME\'; color:rgba(255,255,255,0.35); font-style:italic; }'
  +'.company-name-field:focus { border-bottom:1px solid rgba(255,255,255,0.7); outline:none; }'
  +'.header-right { text-align:right; display:flex; flex-direction:column; align-items:flex-end; gap:4px; }'
  +'.form-title-text { font-size:14pt; font-weight:800; color:#fff; text-transform:uppercase; letter-spacing:0.5px; line-height:1.2; }'
  +'.form-badge { display:inline-block; background:rgba(255,255,255,0.15); color:rgba(255,255,255,0.85); padding:3px 10px; border-radius:12px; font-size:7.5pt; font-weight:700; letter-spacing:1px; margin-top:6px; }'
  +'.qr-placeholder { border:1.5px dashed rgba(255,255,255,0.3); border-radius:4px; width:52px; height:52px; display:flex; align-items:center; justify-content:center; font-size:5.5pt; color:rgba(255,255,255,0.4); text-align:center; line-height:1.3; padding:4px; flex-shrink:0; }'
  +'.accent-bar { height:6px; background:linear-gradient(90deg, var(--accent) 0%, var(--accent-dark) 100%); }'
  +'.toolbar { background:#f7f8fc; border-bottom:1px solid #e0e4f0; padding:12px 40px; display:flex; gap:10px; align-items:center; flex-wrap:wrap; }'
  +'.toolbar-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 20px; border-radius:6px; font-size:9pt; font-weight:700; cursor:pointer; border:none; transition:all .15s; letter-spacing:0.2px; }'
  +'.btn-print { background:var(--accent); color:#fff; }'
  +'.btn-print:hover { background:var(--accent-dark); }'
  +'.btn-clear { background:#f0f4ff; color:var(--accent); border:1px solid rgba(0,0,0,0.12); }'
  +'.btn-clear:hover { background:#e0e8ff; }'
  +'.toolbar-tip { font-size:8pt; color:#aab; margin-left:auto; }'
  +'.info-strip { background:#f7f8fc; border-bottom:2px solid #e0e4f0; padding:16px 40px; display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }'
  +'.info-field label { font-size:6.5pt; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#8899cc; display:block; margin-bottom:5px; }'
  +'.body { padding:28px 40px; display:flex; flex-direction:column; gap:22px; }'
  +'.section { }'
  +'.section-header { background:linear-gradient(90deg,#1a2744,#243358); color:#fff; padding:10px 16px; font-size:8pt; font-weight:800; text-transform:uppercase; letter-spacing:1.2px; border-radius:4px 4px 0 0; display:flex; align-items:center; gap:8px; }'
  +'.section-body { border:1.5px solid #dde2f0; border-top:none; border-radius:0 0 6px 6px; padding:20px; background:#fff; border-left:4px solid var(--accent); }'
  +'.sec-num { background:rgba(255,255,255,0.2); border-radius:50%; width:22px; height:22px; display:inline-flex; align-items:center; justify-content:center; font-size:7pt; font-weight:900; margin-right:6px; flex-shrink:0; }'
  +'.field-grid { display:grid; gap:16px; }'
  +'.field-grid.cols-2 { grid-template-columns:1fr 1fr; }'
  +'.field-grid.cols-3 { grid-template-columns:1fr 1fr 1fr; }'
  +'.field-grid.cols-4 { grid-template-columns:1fr 1fr 1fr 1fr; }'
  +'.field label { font-size:6.5pt; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#8899cc; display:block; margin-bottom:5px; }'
  +'.editable { border-bottom:1.5px solid #dde2f0; min-height:28px; padding:4px 6px; outline:none; transition:border-color .15s,background .15s; display:block; width:100%; line-height:1.6; font-family:inherit; font-size:10pt; }'
  +'.editable:focus { border-bottom:2px solid var(--accent); background:#f5f7ff; border-radius:3px 3px 0 0; }'
  +'.editable:empty::before { content:attr(data-placeholder); color:#bbc; font-style:italic; pointer-events:none; }'
  +'.editable.multiline { min-height:80px; border:1.5px solid #dde2f0; border-radius:4px; padding:10px; }'
  +'.editable.multiline:focus { border-color:var(--accent); background:#f5f7ff; }'
  +'@media print { .editable{border-bottom:1.5px solid #ccd0e0!important;background:transparent!important;} .editable:empty::before{display:none;} .editable.multiline{border:1.5px solid #ccd0e0!important;background:transparent!important;} }'
  +'.form-table { width:100%; border-collapse:collapse; font-size:9pt; }'
  +'.form-table th { background:linear-gradient(90deg,#1a2744,#243358); color:#fff; padding:9px 12px; text-align:left; font-size:7pt; text-transform:uppercase; letter-spacing:0.8px; font-weight:800; }'
  +'.form-table td { border-bottom:1px solid #eaecf4; padding:5px 7px; vertical-align:middle; }'
  +'.form-table tr:nth-child(even) td { background:#f9fafc; }'
  +'.form-table td:focus-within { background:#f0f4ff!important; }'
  +'.form-table .editable { min-height:22px; font-size:9pt; border-bottom:none; }'
  +'.sample-row td { background:#fffde7!important; font-style:italic; color:#555; font-size:8.5pt; }'
  +'.check-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }'
  +'.check-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }'
  +'.check-item { display:flex; align-items:center; gap:8px; padding:7px 10px; border:1px solid #eaecf4; border-radius:5px; cursor:pointer; }'
  +'.check-item:hover { background:#f0f4ff; border-color:rgba(0,0,0,0.15); }'
  +'.check-item input[type=checkbox] { width:15px; height:15px; accent-color:var(--accent); cursor:pointer; flex-shrink:0; }'
  +'.check-item label { font-size:9pt; cursor:pointer; }'
  +'.sig-block { display:grid; grid-template-columns:1fr 1fr; gap:40px; padding-top:20px; border-top:2px solid #eaecf4; }'
  +'.sig-field label { font-size:6.5pt; font-weight:800; text-transform:uppercase; letter-spacing:0.8px; color:#8899cc; display:block; margin-bottom:8px; }'
  +'.sig-line { border-bottom:2px solid #1a2744; min-height:48px; }'
  +'.sig-sub { font-size:7pt; color:#aab; margin-top:5px; }'
  +'.footer { background:linear-gradient(135deg,#0f1628,#1a2744); padding:14px 40px; display:flex; justify-content:space-between; align-items:center; }'
  +'.footer-brand { font-size:8.5pt; font-weight:800; color:#8eb4ff; }'
  +'.footer-legal { font-size:6.5pt; color:rgba(255,255,255,0.35); max-width:55%; text-align:center; line-height:1.5; }'
  +'.footer-id { font-size:7pt; color:rgba(255,255,255,0.4); text-align:right; }'
  +'.footer-conf { font-size:6pt; color:rgba(255,255,255,0.25); letter-spacing:0.5px; text-transform:uppercase; }'
  +'.total-row td { font-weight:700; background:#f5f7ff!important; }'
  +'.grand-total-row td { font-weight:900; background:#1a2744!important; color:#fff!important; }'
  +'.page-break { page-break-after:always; break-after:page; border-bottom:3px dashed #e0e4f0; margin:36px 0; padding-bottom:36px; }'
  +'.page-break:last-child { border-bottom:none; }'
  +'@media print { .page-break { border-bottom:none; margin:0; padding:0; } }'
  +'.page-label { background:#f0f4ff; border:1px solid rgba(0,0,0,0.1); color:var(--accent); font-size:7.5pt; font-weight:800; padding:4px 14px; border-radius:12px; display:inline-block; margin-bottom:18px; letter-spacing:1px; text-transform:uppercase; }'
  +'@media print { .page-label { display:none; } }'
  +'.cover-hero { text-align:center; padding:52px 32px 44px; background:linear-gradient(160deg,#0f1628 0%,#1a2744 40%,#0f2040 100%); position:relative; overflow:hidden; }'
  +'.cover-hero::before { content:""; position:absolute; top:-60px; right:-60px; width:260px; height:260px; border-radius:50%; background:radial-gradient(circle,'+accent+'33 0%,transparent 70%); pointer-events:none; }'
  +'.cover-hero::after { content:""; position:absolute; bottom:-40px; left:-40px; width:180px; height:180px; border-radius:50%; background:radial-gradient(circle,'+accentDark+'22 0%,transparent 70%); pointer-events:none; }'
  +'.cover-title { font-size:30pt; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:-1px; line-height:1.1; position:relative; }'
  +'.cover-sub { font-size:12pt; color:rgba(255,255,255,0.65); margin-top:10px; font-weight:400; position:relative; }'
  +'.cover-badge { display:inline-block; background:var(--accent); color:#fff; padding:7px 22px; border-radius:20px; font-size:8.5pt; font-weight:800; margin-top:20px; letter-spacing:1px; text-transform:uppercase; position:relative; box-shadow:0 4px 16px rgba(0,0,0,0.3); }'
  +'.cover-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:22px; }'
  +'.cover-box { background:#fff; border:1.5px solid #dde2f0; border-radius:8px; padding:22px; border-top:4px solid var(--accent); box-shadow:0 2px 8px rgba(0,0,0,0.06); }'
  +'.cover-box-title { font-size:9pt; font-weight:800; color:#1a2744; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:12px; }'
  +'.cover-list { padding-left:18px; color:#445; font-size:9.5pt; line-height:2.1; }'
  +'</style>';
}

const _JS = `<script>
document.addEventListener('DOMContentLoaded',function(){
  // Auto-fill today's date
  var df=document.getElementById('field-date');
  if(df&&!df.textContent.trim())df.textContent=new Date().toLocaleDateString('en-US',{month:'2-digit',day:'2-digit',year:'numeric'});

  // Inject sample rows into every invoice/parts table
  document.querySelectorAll('.form-table tbody').forEach(function(tbody){
    var cols=tbody.closest('table').querySelectorAll('thead th').length;
    if(cols<3)return; // skip tiny tables
    var sr=document.createElement('tr');
    sr.className='sample-row';
    sr.setAttribute('data-sample','1');
    var sampleCells=[];
    // Build sample cells based on column count
    if(cols===6){
      sampleCells=['★ Ex','Labor — diagnostic visit (example)','SVC-001','1','$85.00','$85.00'];
    } else if(cols===5){
      sampleCells=['★ Ex','Service call — example entry','$85.00','Completed','—'];
    } else if(cols===7){
      sampleCells=['★ Ex','Example Client','123 Main St','Mow + Edge','45 min','✓','—'];
    } else if(cols===8){
      sampleCells=['★ Ex','J. Smith','Crew Lead','8','8','8','8','40'];
    } else {
      sampleCells=['★ Ex'];
      for(var x=1;x<cols;x++)sampleCells.push(x===1?'Sample entry — clear before printing':'—');
    }
    sampleCells.forEach(function(txt,i){
      var td=document.createElement('td');
      if(i===0){
        td.innerHTML='<span style="color:var(--accent);font-weight:900;">'+txt+'</span>';
      } else {
        td.textContent=txt;
      }
      sr.appendChild(td);
    });
    tbody.insertBefore(sr,tbody.firstChild);
  });
});
function clearForm(){
  document.querySelectorAll('.editable').forEach(function(el){el.textContent='';});
  document.querySelectorAll('input[type=checkbox]').forEach(function(cb){cb.checked=false;});
  // Remove sample rows
  document.querySelectorAll('tr[data-sample]').forEach(function(r){r.remove();});
  var df=document.getElementById('field-date');
  if(df)df.textContent=new Date().toLocaleDateString('en-US',{month:'2-digit',day:'2-digit',year:'numeric'});
}
<\/script>`;

function _logoBlock(uid){
  return '<div class="logo-zone no-print" onclick="document.getElementById(\'lu-'+uid+'\').click()" title="Click to upload your logo">'
    +'<div style="font-size:18pt;margin-bottom:4px;">&#128247;</div>'
    +'<div style="font-size:8pt;font-weight:900;letter-spacing:0.5px;text-transform:uppercase;">CLICK HERE</div>'
    +'<div style="font-size:7pt;font-weight:600;opacity:0.75;margin-top:2px;">Upload Your Logo</div>'
    +'</div>'
    +'<img id="li-'+uid+'" style="display:none;max-height:64px;max-width:200px;object-fit:contain;border-radius:4px;" alt="Logo">'
    +'<input type="file" id="lu-'+uid+'" accept="image/*" style="display:none" onchange="(function(i){var f=i.files[0];if(!f)return;var r=new FileReader();r.onload=function(e){var im=document.getElementById(\'li-'+uid+'\');im.src=e.target.result;im.style.display=\'block\';i.previousElementSibling.previousElementSibling.style.display=\'none\';};r.readAsDataURL(f);})(this)">'
    +'<div contenteditable="true" class="company-name-field" data-placeholder="YOUR COMPANY NAME"></div>';
}

function _toolbar(){
  return '<div class="no-print" style="position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(0,0,0,0.12);">'
    +'<div style="background:linear-gradient(90deg,var(--accent),var(--accent-dark));color:#fff;padding:11px 40px;display:flex;align-items:center;gap:0;">'
    +'<span style="font-size:7.5pt;font-weight:900;letter-spacing:2px;text-transform:uppercase;opacity:0.75;margin-right:28px;white-space:nowrap;">HOW TO USE</span>'
    +'<span style="display:flex;gap:20px;flex-wrap:wrap;flex:1;">'
    +'<span style="display:flex;align-items:center;gap:8px;font-size:9pt;font-weight:700;">'
    +'<span style="background:rgba(255,255,255,0.25);border-radius:50%;width:21px;height:21px;display:inline-flex;align-items:center;justify-content:center;font-size:8.5pt;font-weight:900;flex-shrink:0;">1</span>'
    +'Click the logo box (top-left) to upload your company logo</span>'
    +'<span style="display:flex;align-items:center;gap:8px;font-size:9pt;font-weight:700;">'
    +'<span style="background:rgba(255,255,255,0.25);border-radius:50%;width:21px;height:21px;display:inline-flex;align-items:center;justify-content:center;font-size:8.5pt;font-weight:900;flex-shrink:0;">2</span>'
    +'Click any field to type — all yellow ★ rows are examples, clear them before printing</span>'
    +'<span style="display:flex;align-items:center;gap:8px;font-size:9pt;font-weight:700;">'
    +'<span style="background:rgba(255,255,255,0.25);border-radius:50%;width:21px;height:21px;display:inline-flex;align-items:center;justify-content:center;font-size:8.5pt;font-weight:900;flex-shrink:0;">3</span>'
    +'Click &ldquo;Print / Save PDF&rdquo; when ready &mdash; this bar disappears automatically</span>'
    +'</span>'
    +'</div>'
    +'<div style="background:#f7f8fc;border-bottom:1px solid #e0e4f0;padding:10px 40px;display:flex;gap:10px;align-items:center;">'
    +'<button class="toolbar-btn btn-print" onclick="window.print()">&#128438; Print / Save PDF</button>'
    +'<button class="toolbar-btn btn-clear" onclick="clearForm()">&#10006; Clear Form</button>'
    +'<span class="toolbar-tip">&#9432; Best on desktop (Chrome or Safari) &nbsp;&bull;&nbsp; No software needed &mdash; works fully in your browser</span>'
    +'</div>'
    +'</div>';
}

function _header(uid, title, id){
  return '<div class="header"><div>'+_logoBlock(uid)+'</div><div class="header-right"><div class="qr-placeholder no-print">Add Your<br>QR Code</div><div class="form-title-text">'+title+'</div><div class="form-badge">FORM '+id+' &middot; v2.0</div></div></div><div class="accent-bar"></div>';
}

function _footer(id,note){
  return '<div class="footer"><div class="footer-brand">TradeOpsVault &middot; tradeopsvault.etsy.com</div><div style="text-align:center"><div class="footer-legal">'+note+'</div><div class="footer-conf">CONFIDENTIAL &mdash; FOR BUSINESS USE ONLY</div></div><div class="footer-id">'+id+'<br>v2.0 &middot; TradeOpsVault</div></div>';
}

function _infoStrip(fields){
  // fields: array of {label, placeholder, id?}
  return '<div class="info-strip">'+fields.map(function(f){
    return '<div class="info-field"><label>'+f.label+'</label><div class="editable"'+(f.id?' id="'+f.id+'"':'')+' data-placeholder="'+f.placeholder+'"></div></div>';
  }).join('')+'</div>';
}

function _coverPage(uid, formId, formTitle, tradeName, mainFormName, extraIncludes){
  var includes = extraIncludes || [];
  return '<div class="page-break">'
    +'<div class="page-label no-print">Page 1 of 3 &mdash; Cover &amp; Setup</div>'
    +_header(uid+'c', formTitle, formId)
    +'<div class="body">'
    +'<div class="cover-hero">'
    +'<div class="cover-title">'+formTitle+'</div>'
    +'<div class="cover-sub">Professional '+tradeName+' Business Template</div>'
    +'<div class="cover-badge">TradeOpsVault &middot; Premium Series</div>'
    +'</div>'
    +'<div class="cover-grid">'
    +'<div class="cover-box"><div class="cover-box-title">&#10003; What\'s Included</div><ul class="cover-list"><li>Page 1 &mdash; Setup &amp; Instructions</li><li>Page 2 &mdash; '+mainFormName+'</li><li>Page 3 &mdash; Job History Log</li>'+includes.map(function(i){return '<li>'+i+'</li>';}).join('')+'<li>Unlimited reprints for your business</li><li>Fillable in browser &mdash; print as PDF</li></ul></div>'
    +'<div class="cover-box"><div class="cover-box-title">&#9889; Quick Start</div><ol class="cover-list"><li>Click logo zone &rarr; upload your company logo</li><li>Click any field &rarr; type your information</li><li>Click &ldquo;Print / Save PDF&rdquo; &rarr; done</li></ol></div>'
    +'</div>'
    +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Your Business Information</div><div class="section-body"><div class="field-grid cols-2"><div class="field"><label>Company Name</label><div class="editable" contenteditable="true" data-placeholder="Your Business Name"></div></div><div class="field"><label>License Number</label><div class="editable" contenteditable="true" data-placeholder="License #"></div></div><div class="field"><label>Phone</label><div class="editable" contenteditable="true" data-placeholder="(000) 000-0000"></div></div><div class="field"><label>Email</label><div class="editable" contenteditable="true" data-placeholder="you@yourbusiness.com"></div></div><div class="field"><label>Website</label><div class="editable" contenteditable="true" data-placeholder="www.yourbusiness.com"></div></div><div class="field"><label>Insurance Carrier</label><div class="editable" contenteditable="true" data-placeholder="Insurance Company Name"></div></div></div></div></div>'
    +'</div>'
    +_footer(formId, 'For business use only. Retain for your records.')
    +'</div>';
}

function _historyPage(uid, formId, note){
  var sampleRow = '<tr class="sample-row"><td>★ Ex</td><td>06/03/2025</td><td>Johnson Residence</td><td>Annual maintenance visit</td><td>$185.00</td><td>Done</td></tr>';
  var rows = sampleRow;
  for(var i=1;i<=10;i++){
    rows += '<tr><td>'+i+'</td><td><div class="editable" data-placeholder="MM/DD/YYYY"></div></td><td><div class="editable" data-placeholder="Client Name"></div></td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="Done / Pending"></div></td></tr>';
  }
  return '<div>'
    +'<div class="page-label no-print">Page 3 of 3 &mdash; Job History Log</div>'
    +_header(uid+'h', 'Job History Log', formId)
    +'<div class="body">'
    +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Job History Tracker</div><div class="section-body"><table class="form-table"><thead><tr><th>#</th><th>Date</th><th>Client Name</th><th>Job Description</th><th>Amount</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>'
    +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Follow-Up &amp; Notes</div><div class="section-body"><div class="field-grid cols-2"><div class="field"><label>Pending Follow-Ups</label><div class="editable multiline" data-placeholder="Clients to follow up with..."></div></div><div class="field"><label>Business Notes</label><div class="editable multiline" data-placeholder="General notes, reminders, improvements..."></div></div></div></div></div>'
    +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Monthly Summary</div><div class="section-body"><div class="field-grid cols-4"><div class="field"><label>Total Jobs</label><div class="editable" data-placeholder="0"></div></div><div class="field"><label>Total Revenue</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Avg Job Value</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Top Client</label><div class="editable" data-placeholder="Name"></div></div></div></div></div>'
    +'</div>'
    +_footer(formId, note)
    +'</div>';
}

function _priorityField(){
  return '<div class="field" style="grid-column:span 2;"><label>Priority Level</label><div style="display:flex;gap:12px;margin-top:4px;"><label class="check-item" style="border-color:#ff5c6c;"><input type="checkbox"> <span style="color:#ff5c6c;font-weight:700;">&#128308; Urgent</span></label><label class="check-item" style="border-color:#ffbb45;"><input type="checkbox"> <span style="color:#b87000;font-weight:700;">&#128993; Standard</span></label><label class="check-item" style="border-color:#2ed88a;"><input type="checkbox"> <span style="color:#0d9160;font-weight:700;">&#128994; Scheduled</span></label></div></div>';
}

function _satisfactionSection(){
  var stars = ['&#11088; Poor','&#11088;&#11088; Fair','&#11088;&#11088;&#11088; Good','&#11088;&#11088;&#11088;&#11088; Great','&#11088;&#11088;&#11088;&#11088;&#11088; Excellent'];
  return '<div class="section"><div class="section-header"><span class="sec-num">&#9733;</span> Customer Satisfaction</div><div class="section-body"><div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;"><label style="font-size:7.5pt;font-weight:800;color:#8899cc;text-transform:uppercase;letter-spacing:0.8px;">Rating:</label><div style="display:flex;gap:8px;flex-wrap:wrap;">'+stars.map(function(r){return '<label class="check-item"><input type="checkbox"> <span style="font-size:9pt;">'+r+'</span></label>';}).join('')+'</div></div><div class="field" style="margin-top:12px;"><label>Customer Comments</label><div class="editable" data-placeholder="Customer feedback or comments..."></div></div></div></div>';
}

function _jobCompleteChecklist(items){
  return '<div class="section"><div class="section-header"><span class="sec-num">&#10003;</span> Job Complete Checklist</div><div class="section-body"><div class="check-grid">'+items.map(function(item,i){return '<div class="check-item"><input type="checkbox" id="jc'+Math.random().toString(36).substr(2,6)+'"> <label>'+item+'</label></div>';}).join('')+'</div></div></div>';
}

const TEMPLATES = {};

// ── LS-001 HVAC Service Call Notes ─────────────────────────────────────────
TEMPLATES['LS-001'] = (function(){
var id='LS-001', uid='001';
var cover = _coverPage(uid, id, 'HVAC Service Call Notes', 'HVAC', 'Service Call Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; HVAC Service Call Form</div>'
  +_header(uid, 'HVAC Service Call Notes', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Form #',placeholder:'SC-0001'},{label:'Job #',placeholder:'J-2024-001'},{label:'Technician',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Customer &amp; Equipment</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div><div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div></div>'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Equipment Type</label><div class="editable" data-placeholder="e.g. Split AC"></div></div><div class="field"><label>Make / Brand</label><div class="editable" data-placeholder="e.g. Carrier"></div></div><div class="field"><label>Model #</label><div class="editable" data-placeholder="Model #"></div></div><div class="field"><label>Serial #</label><div class="editable" data-placeholder="Serial #"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Install Year</label><div class="editable" data-placeholder="Year"></div></div><div class="field"><label>Filter Size</label><div class="editable" data-placeholder="16x20x1"></div></div><div class="field"><label>Refrigerant Type</label><div class="editable" data-placeholder="R-410A"></div></div><div class="field"><label>Warranty Status</label><div class="editable" data-placeholder="Active / Expired"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Complaint &amp; Diagnosis</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px"><div class="field"><label>Customer-Reported Complaint</label><div class="editable multiline" data-placeholder="Describe issue as reported..."></div></div><div class="field"><label>Technician Diagnosis</label><div class="editable multiline" data-placeholder="Root cause found..."></div></div></div>'
  +'<div class="check-grid"><div class="check-item"><input type="checkbox"><label>No cooling / heating</label></div><div class="check-item"><input type="checkbox"><label>Refrigerant leak</label></div><div class="check-item"><input type="checkbox"><label>Dirty / clogged filter</label></div><div class="check-item"><input type="checkbox"><label>Faulty thermostat</label></div><div class="check-item"><input type="checkbox"><label>Blower motor issue</label></div><div class="check-item"><input type="checkbox"><label>Capacitor / contactor failure</label></div><div class="check-item"><input type="checkbox"><label>Frozen evaporator coil</label></div><div class="check-item"><input type="checkbox"><label>Condensate / drainage issue</label></div><div class="check-item"><input type="checkbox"><label>Electrical fault</label></div><div class="check-item"><input type="checkbox"><label>Compressor failure</label></div><div class="check-item"><input type="checkbox"><label>Ductwork issue</label></div><div class="check-item"><input type="checkbox"><label>Other &mdash; see notes</label></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Refrigerant Record</div><div class="section-body">'
  +'<div class="field-grid cols-4"><div class="field"><label>Suction Pressure (PSI)</label><div class="editable" data-placeholder="e.g. 68"></div></div><div class="field"><label>Discharge Pressure (PSI)</label><div class="editable" data-placeholder="e.g. 240"></div></div><div class="field"><label>Refrigerant Added (lbs)</label><div class="editable" data-placeholder="0.0 lbs"></div></div><div class="field"><label>Leak Test Result</label><div class="editable" data-placeholder="Pass / Fail"></div></div></div>'
  +'<div class="field-grid cols-4" style="margin-top:12px"><div class="field"><label>Superheat (&deg;F)</label><div class="editable" data-placeholder="e.g. 10&deg;F"></div></div><div class="field"><label>Subcooling (&deg;F)</label><div class="editable" data-placeholder="e.g. 10&deg;F"></div></div><div class="field"><label>Supply Air Temp</label><div class="editable" data-placeholder="&deg;F"></div></div><div class="field"><label>Return Air Temp</label><div class="editable" data-placeholder="&deg;F"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Parts &amp; Labor Invoice</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>#</th><th>Part / Description</th><th>Part #</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Part description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Parts Subtotal</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Labor Total</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="grand-total-row"><td colspan="5" style="text-align:right;padding-right:14px">INVOICE TOTAL</td><td><div class="editable" data-placeholder="$0.00" style="color:#fff"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">05</span> Recommendations &amp; Follow-Up</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px"><div class="field"><label>Recommendations</label><div class="editable multiline" data-placeholder="Future repairs, maintenance schedule..."></div></div><div class="field"><label>Next Service / Follow-Up</label><div class="editable multiline" data-placeholder="Next visit date, scheduled maintenance..."></div></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Labor Hours</label><div class="editable" data-placeholder="e.g. 2.5 hrs"></div></div><div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div><div class="field"><label>Payment Method</label><div class="editable" data-placeholder="Cash / Card / Invoice"></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All work performed as described','Area cleaned up','Filter checked / replaced','Customer walkthrough done','Invoice presented to customer'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div><div class="sig-field"><label>Customer Approval</label><div class="sig-line"></div><div class="sig-sub">By signing you authorize work completed and accept charges above</div></div></div>'
  +'</div>'
  +_footer(id,'For business use only. Retain for your records.')
  +'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>HVAC Service Call Notes</title>'+_cssFor('#e85d04','#c44b00')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'HVAC Service Call Notes',html:html};
})();


// ── LS-002 Plumbing Dispatch & Diagnosis ────────────────────────────────────
TEMPLATES['LS-002'] = (function(){
var id='LS-002', uid='002';
var cover = _coverPage(uid, id, 'Plumbing Dispatch &amp; Diagnosis', 'Plumbing', 'Dispatch &amp; Diagnosis Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Plumbing Dispatch &amp; Diagnosis Form</div>'
  +_header(uid, 'Plumbing Dispatch &amp; Diagnosis', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Dispatch #',placeholder:'D-0001'},{label:'Job #',placeholder:'J-2024-001'},{label:'Technician',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Job Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Dispatch Time</label><div class="editable" data-placeholder="00:00 AM"></div></div><div class="field"><label>Arrival Time</label><div class="editable" data-placeholder="00:00 AM"></div></div><div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div><div class="field"><label>Water Source</label><div class="editable" data-placeholder="City / Well"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Problem Description</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px"><div class="field"><label>Customer-Reported Issue</label><div class="editable multiline" data-placeholder="Describe the problem as reported..."></div></div><div class="field"><label>Location in Property</label><div class="editable multiline" data-placeholder="Kitchen, master bath, basement..."></div></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Duration of Problem</label><div class="editable" data-placeholder="e.g. 2 days"></div></div><div class="field"><label>Water Heater Type</label><div class="editable" data-placeholder="Tank / Tankless / Electric"></div></div><div class="field"><label>Water Pressure (psi)</label><div class="editable" data-placeholder="e.g. 60 psi"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Diagnosis Checklist</div><div class="section-body">'
  +'<div class="check-grid" style="margin-bottom:12px"><div class="check-item"><input type="checkbox"><label>Active leak</label></div><div class="check-item"><input type="checkbox"><label>Drain blockage / slow drain</label></div><div class="check-item"><input type="checkbox"><label>Low water pressure</label></div><div class="check-item"><input type="checkbox"><label>No hot water</label></div><div class="check-item"><input type="checkbox"><label>Running toilet</label></div><div class="check-item"><input type="checkbox"><label>Sewer odor</label></div><div class="check-item"><input type="checkbox"><label>Water heater failure</label></div><div class="check-item"><input type="checkbox"><label>Pipe corrosion / damage</label></div><div class="check-item"><input type="checkbox"><label>Fixture replacement needed</label></div><div class="check-item"><input type="checkbox"><label>Backflow / cross-connection</label></div><div class="check-item"><input type="checkbox"><label>Sump pump issue</label></div><div class="check-item"><input type="checkbox"><label>Other &mdash; see notes</label></div></div>'
  +'<div class="field"><label>Diagnosis Notes</label><div class="editable multiline" data-placeholder="Technical findings..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Work Completed</div><div class="section-body">'
  +'<div class="field" style="margin-bottom:12px"><label>Description of Repairs / Services Performed</label><div class="editable multiline" data-placeholder="Detail all work performed..."></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Work Start Time</label><div class="editable" data-placeholder="00:00 AM"></div></div><div class="field"><label>Work End Time</label><div class="editable" data-placeholder="00:00 AM"></div></div><div class="field"><label>Total Labor Hours</label><div class="editable" data-placeholder="0.0 hrs"></div></div><div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">05</span> Parts &amp; Invoice</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>#</th><th>Item / Part Description</th><th>Part #</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Parts Total</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Labor Total</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="grand-total-row"><td colspan="5" style="text-align:right;padding-right:14px">INVOICE TOTAL</td><td><div class="editable" data-placeholder="$0.00" style="color:#fff"></div></td></tr>'
  +'</tbody></table></div></div>'
  +_jobCompleteChecklist(['All pipes tested — no active leaks','Area cleaned and dried','Customer shown shutoff valve location','All fixtures tested and operational','Invoice presented'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Plumber / Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div><div class="sig-field"><label>Customer Approval</label><div class="sig-line"></div><div class="sig-sub">By signing you authorize work and accept charges above</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain for your records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Plumbing Dispatch &amp; Diagnosis</title>'+_cssFor('#1565c0','#003c8f')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Plumbing Dispatch & Diagnosis Checklist',html:html};
})();


// ── LS-003 Electrician Jobsite Inspection ───────────────────────────────────
TEMPLATES['LS-003'] = (function(){
var id='LS-003', uid='003';
var cover = _coverPage(uid, id, 'Electrician Jobsite Inspection', 'Electrical', 'Jobsite Inspection Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Jobsite Inspection Form</div>'
  +_header(uid, 'Jobsite Inspection Form', id)
  +_infoStrip([{label:'Inspection Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Form #',placeholder:'EI-0001'},{label:'Permit #',placeholder:'Permit #'},{label:'Inspector',placeholder:'Name / License #'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Site Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client / Owner</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Site Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Inspector / Technician</label><div class="editable" data-placeholder="Name / License #"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div><div class="field"><label>Building Age (est.)</label><div class="editable" data-placeholder="e.g. 1985"></div></div><div class="field"><label>Service Voltage</label><div class="editable" data-placeholder="120/240V"></div></div><div class="field"><label>Service Amperage</label><div class="editable" data-placeholder="200A"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Panel &amp; Circuit Inspection</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Panel Manufacturer</label><div class="editable" data-placeholder="e.g. Square D"></div></div><div class="field"><label>Panel Rating (A)</label><div class="editable" data-placeholder="200A"></div></div><div class="field"><label># of Circuits</label><div class="editable" data-placeholder="40"></div></div><div class="field"><label>GFCI Protected</label><div class="editable" data-placeholder="Yes / Partial / No"></div></div></div>'
  +'<div class="check-grid" style="margin-bottom:12px"><div class="check-item"><input type="checkbox"><label>Panel properly labeled</label></div><div class="check-item"><input type="checkbox"><label>No double-tapped breakers</label></div><div class="check-item"><input type="checkbox"><label>Grounding / bonding verified</label></div><div class="check-item"><input type="checkbox"><label>No arcing or burn marks</label></div><div class="check-item"><input type="checkbox"><label>Correct breaker sizing</label></div><div class="check-item"><input type="checkbox"><label>Neutral &amp; ground separated (subpanel)</label></div><div class="check-item"><input type="checkbox"><label>Breakers seat fully</label></div><div class="check-item"><input type="checkbox"><label>AFCI protection where required</label></div></div>'
  +'<div class="field"><label>Panel Notes</label><div class="editable multiline" data-placeholder="Additional panel observations..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Hazard Assessment</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Hazard Item</th><th>Location</th><th>Severity (L/M/H)</th><th>Action Required</th><th>Resolved?</th></tr></thead><tbody>'
  +'<tr><td>Exposed wiring</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>'
  +'<tr><td>Overloaded circuits</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>'
  +'<tr><td>Missing knockouts / covers</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>'
  +'<tr><td>Improper wire gauging</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>'
  +'<tr><td>Outdated wiring (aluminum/knob-tube)</td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Other hazard..."></div></td><td><div class="editable" data-placeholder="Location"></div></td><td><div class="editable" data-placeholder="L/M/H"></div></td><td><div class="editable" data-placeholder="Action"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Code Notes &amp; Sign-Off</div><div class="section-body">'
  +'<div class="field-grid cols-3" style="margin-bottom:12px"><div class="field"><label>NEC Edition in Effect</label><div class="editable" data-placeholder="e.g. 2023 NEC"></div></div><div class="field"><label>Local Amendments / AHJ</label><div class="editable" data-placeholder="Authority having jurisdiction"></div></div><div class="field"><label>Re-inspection Required?</label><div class="editable" data-placeholder="Yes / No &mdash; Date"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>Code Violations / Notes</label><div class="editable multiline" data-placeholder="List any code violations found..."></div></div><div class="field"><label>Summary / Recommendations</label><div class="editable multiline" data-placeholder="Overall assessment and recommended actions..."></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All hazards documented','Panel photo taken','Permit sticker affixed','Report copy provided to owner','Re-inspection date scheduled if needed'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Electrician / Inspector Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div><div class="sig-field"><label>Property Owner / Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div></div>'
  +'</div>'+_footer(id,'Findings do not constitute a code compliance certificate. Retain for records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Electrician Jobsite Inspection</title>'+_cssFor('#f9a825','#c17900')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Electrician Jobsite Inspection Form',html:html};
})();

// ── LS-004 Lawn Care Weekly Crew Planner ────────────────────────────────────
TEMPLATES['LS-004'] = (function(){
var id='LS-004', uid='004';
var cover = _coverPage(uid, id, 'Lawn Care Weekly Crew Planner', 'Lawn Care', 'Weekly Crew Planner', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Weekly Crew Planner</div>'
  +_header(uid, 'Weekly Crew Planner', id)
  +_infoStrip([{label:'Week Of',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Form #',placeholder:'WP-0001'},{label:'Crew Lead',placeholder:'Name'},{label:'Vehicle / Rig',placeholder:'Truck / Trailer #'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Week Overview</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Total Stops This Week</label><div class="editable" data-placeholder="e.g. 15"></div></div><div class="field"><label>Estimated Hours</label><div class="editable" data-placeholder="40 hrs"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>Equipment Assigned</label><div class="editable" data-placeholder="Mower / trimmer"></div></div><div class="field"><label>Weather Forecast</label><div class="editable" data-placeholder="Sunny / Rainy"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Daily Route (Mon&ndash;Fri)</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th style="width:44px">Day</th><th style="width:24px">#</th><th>Client Name</th><th>Address</th><th>Services</th><th>Est. Time</th><th style="width:44px">Done</th></tr></thead><tbody>'
  +'<tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">MON</td><td>1</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">TUE</td><td>4</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>6</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">WED</td><td>7</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>8</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>9</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">THU</td><td>10</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>11</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>12</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td rowspan="3" style="font-weight:800;background:#e8eaf0;color:#1a2744;text-align:center">FRI</td><td>13</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>14</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'<tr><td>15</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="Services"></div></td><td><div class="editable" data-placeholder="Est."></div></td><td style="text-align:center"><input type="checkbox" style="width:15px;height:15px;accent-color:#4f7cff"></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Crew Assignments</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Crew Member</th><th>Role</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Total Hrs</th></tr></thead><tbody>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="hrs"></div></td><td><div class="editable" data-placeholder="0.0"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Notes &amp; Issues</div><div class="section-body">'
  +'<div class="field-grid cols-2"><div class="field"><label>Equipment Issues / Maintenance Needed</label><div class="editable multiline" data-placeholder="Equipment problems, service needed..."></div></div><div class="field"><label>Client Notes / Special Instructions</label><div class="editable multiline" data-placeholder="Gate codes, pets, special requests..."></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All stops completed and checked off','Equipment cleaned and secured','Fuel / supplies restocked','Time logged for all crew members','Week summary sent to office'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Crew Lead Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div><div class="sig-field"><label>Manager / Office Sign-Off</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain for your records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Lawn Care Weekly Crew Planner</title>'+_cssFor('#2e7d32','#1b5e20')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Lawn Care Weekly Crew Planner',html:html};
})();


// ── LS-005 Auto Detail Intake + Damage Waiver ───────────────────────────────
TEMPLATES['LS-005'] = (function(){
var id='LS-005', uid='005';
var cover = _coverPage(uid, id, 'Auto Detail Intake &amp; Damage Waiver', 'Auto Detailing', 'Detail Intake Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Detail Intake &amp; Damage Waiver</div>'
  +_header(uid, 'Detail Intake &amp; Damage Waiver', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Order #',placeholder:'DT-0001'},{label:'Detailer',placeholder:'Name'},{label:'Drop-Off Time',placeholder:'00:00 AM'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Vehicle &amp; Customer Info</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div><div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div></div>'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Year</label><div class="editable" data-placeholder="2021"></div></div><div class="field"><label>Make</label><div class="editable" data-placeholder="Toyota"></div></div><div class="field"><label>Model</label><div class="editable" data-placeholder="Camry"></div></div><div class="field"><label>Color</label><div class="editable" data-placeholder="Silver"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>License Plate</label><div class="editable" data-placeholder="Plate #"></div></div><div class="field"><label>VIN (last 6)</label><div class="editable" data-placeholder="Last 6 digits"></div></div><div class="field"><label>Mileage In</label><div class="editable" data-placeholder="00,000 mi"></div></div><div class="field"><label>Pick-Up Time (est.)</label><div class="editable" data-placeholder="00:00 AM"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Service Selections</div><div class="section-body">'
  +'<div class="check-grid-3" style="margin-bottom:12px"><div class="check-item"><input type="checkbox"><label>Exterior Hand Wash</label></div><div class="check-item"><input type="checkbox"><label>Interior Vacuum</label></div><div class="check-item"><input type="checkbox"><label>Full Interior Detail</label></div><div class="check-item"><input type="checkbox"><label>Clay Bar Treatment</label></div><div class="check-item"><input type="checkbox"><label>Paint Correction &mdash; Stage 1</label></div><div class="check-item"><input type="checkbox"><label>Paint Correction &mdash; Stage 2</label></div><div class="check-item"><input type="checkbox"><label>Ceramic Coating</label></div><div class="check-item"><input type="checkbox"><label>Wax / Sealant</label></div><div class="check-item"><input type="checkbox"><label>Engine Bay Cleaning</label></div><div class="check-item"><input type="checkbox"><label>Headlight Restoration</label></div><div class="check-item"><input type="checkbox"><label>Odor Elimination</label></div><div class="check-item"><input type="checkbox"><label>Tire &amp; Wheel Detail</label></div><div class="check-item"><input type="checkbox"><label>Glass Treatment</label></div><div class="check-item"><input type="checkbox"><label>Leather Conditioning</label></div><div class="check-item"><input type="checkbox"><label>Other &mdash; see notes</label></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Package Selected</label><div class="editable" data-placeholder="Package name"></div></div><div class="field"><label>Quoted Price</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Est. Completion Time</label><div class="editable" data-placeholder="4&ndash;6 hours"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Pre-Existing Damage</div><div class="section-body">'
  +'<p style="font-size:8pt;color:#667;margin-bottom:12px">Document all pre-existing damage before service. Both parties should review and initial.</p>'
  +'<div class="field-grid cols-2"><div style="border:1.5px solid #dde2f0;border-radius:4px;padding:12px;min-height:120px"><div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Panel-by-Panel Notes</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:7.5pt"><div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Front<br><div class="editable" data-placeholder="OK"></div></div><div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Roof<br><div class="editable" data-placeholder="OK"></div></div><div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Rear<br><div class="editable" data-placeholder="OK"></div></div><div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Driver Side<br><div class="editable" data-placeholder="OK"></div></div><div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Interior<br><div class="editable" data-placeholder="OK"></div></div><div style="border:1px dashed #dde2f0;padding:6px;border-radius:3px;text-align:center">Pass. Side<br><div class="editable" data-placeholder="OK"></div></div></div></div><div class="field"><label>Written Damage Notes</label><div class="editable multiline" data-placeholder="Describe all pre-existing damage &mdash; scratches, dents, chips, tears, stains..."></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Liability Waiver</div><div class="section-body">'
  +'<p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px;background:#f7f8fc">I, the undersigned vehicle owner, authorize the above-listed detailing services and acknowledge that all pre-existing damage has been documented above. I release <strong>[Your Company Name]</strong> from liability for pre-existing conditions. Payment is due upon completion.</p>'
  +'</div></div>'
  +_jobCompleteChecklist(['All services completed per order','Vehicle inspected and wiped down','Pre-existing damage compared — no new damage','Mileage out recorded','Invoice presented to customer'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Customer Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date &mdash; I have read and agree to the waiver above</div></div><div class="sig-field"><label>Detailer / Intake Staff</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. This waiver does not override applicable consumer protection laws.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Auto Detail Intake + Damage Waiver</title>'+_cssFor('#c62828','#8e0000')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Auto Detail Intake + Damage Waiver',html:html};
})();

// ── LS-006 Pest Control Follow-Up Card ──────────────────────────────────────
TEMPLATES['LS-006'] = (function(){
var id='LS-006', uid='006';
var cover = _coverPage(uid, id, 'Pest Control Follow-Up Card', 'Pest Control', 'Pest Control Service Card', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Pest Control Service Card</div>'
  +_header(uid, 'Pest Control Follow-Up Card', id)
  +_infoStrip([{label:'Service Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Account #',placeholder:'AC-0001'},{label:'Technician',placeholder:'Name / License #'},{label:'Next Service',placeholder:'MM/DD/YYYY'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Client Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div><div class="field"><label>Square Footage</label><div class="editable" data-placeholder="sq ft"></div></div><div class="field"><label>Service Plan</label><div class="editable" data-placeholder="Monthly / Quarterly"></div></div><div class="field"><label>Contract Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Treatment Summary</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'
  +'<div><div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Pests Targeted</div><div style="display:flex;flex-direction:column;gap:5px"><div class="check-item"><input type="checkbox"><label>Ants</label></div><div class="check-item"><input type="checkbox"><label>Cockroaches</label></div><div class="check-item"><input type="checkbox"><label>Rodents (mice/rats)</label></div><div class="check-item"><input type="checkbox"><label>Spiders</label></div><div class="check-item"><input type="checkbox"><label>Termites</label></div><div class="check-item"><input type="checkbox"><label>Bed Bugs</label></div><div class="check-item"><input type="checkbox"><label>Wasps / Hornets</label></div><div class="check-item"><input type="checkbox"><label>Other &mdash; see notes</label></div></div></div>'
  +'<div><div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Treatment Methods Used</div><div style="display:flex;flex-direction:column;gap:5px"><div class="check-item"><input type="checkbox"><label>Liquid Spray &mdash; Interior</label></div><div class="check-item"><input type="checkbox"><label>Liquid Spray &mdash; Exterior</label></div><div class="check-item"><input type="checkbox"><label>Bait Stations Placed / Checked</label></div><div class="check-item"><input type="checkbox"><label>Glue Traps Set</label></div><div class="check-item"><input type="checkbox"><label>Dust Application</label></div><div class="check-item"><input type="checkbox"><label>Fumigation</label></div><div class="check-item"><input type="checkbox"><label>Exclusion / Sealing</label></div><div class="check-item"><input type="checkbox"><label>Other &mdash; see notes</label></div></div></div>'
  +'</div>'
  +'<div class="field-grid cols-3" style="margin-bottom:12px"><div class="field"><label>Chemical(s) Used</label><div class="editable" data-placeholder="Product name"></div></div><div class="field"><label>EPA Reg. #</label><div class="editable" data-placeholder="EPA Reg. #"></div></div><div class="field"><label>Application Rate</label><div class="editable" data-placeholder="oz / gal / concentration"></div></div></div>'
  +'<div class="field"><label>Treatment Notes</label><div class="editable multiline" data-placeholder="Areas treated, observations, activity level..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Next Service &amp; Recommendations</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Next Service Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Service Frequency</label><div class="editable" data-placeholder="Monthly / Quarterly"></div></div><div class="field"><label>Technician Assigned</label><div class="editable" data-placeholder="Name"></div></div><div class="field"><label>Estimated Cost</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'<div class="check-grid" style="margin-bottom:12px"><div class="check-item"><input type="checkbox"><label>Seal entry points (cracks / gaps)</label></div><div class="check-item"><input type="checkbox"><label>Remove standing water</label></div><div class="check-item"><input type="checkbox"><label>Store food in sealed containers</label></div><div class="check-item"><input type="checkbox"><label>Clear debris from crawlspace</label></div><div class="check-item"><input type="checkbox"><label>Trim vegetation from structure</label></div><div class="check-item"><input type="checkbox"><label>Fix moisture / leak issues</label></div></div>'
  +'<div class="field"><label>Additional Recommendations</label><div class="editable multiline" data-placeholder="Further actions for client..."></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All targeted areas treated','Treatment notes completed','Post-treatment instructions given to client','Next service date confirmed','Invoice / receipt provided'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div><div class="sig-field"><label>Client Acknowledgment</label><div class="sig-line"></div><div class="sig-sub">Service received and post-treatment instructions understood</div></div></div>'
  +'</div>'+_footer(id,'Keep copy for pesticide application records as required by state law.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pest Control Follow-Up Card</title>'+_cssFor('#558b2f','#255d00')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Pest Control Follow-Up Card',html:html};
})();


// ── LS-007 Roofing Change Order + Approval ──────────────────────────────────
TEMPLATES['LS-007'] = (function(){
var id='LS-007', uid='007';
var cover = _coverPage(uid, id, 'Roofing Change Order &amp; Approval', 'Roofing', 'Change Order Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Change Order &amp; Approval Form</div>'
  +_header(uid, 'Change Order &amp; Approval', id)
  +_infoStrip([{label:'Change Order Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Change Order #',placeholder:'CO-0001'},{label:'Project / Job #',placeholder:'J-2024-001'},{label:'Roofing Foreman',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Project Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Property Owner</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Property Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Original Contract Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Project Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Projected Completion</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Original Contract Value</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Scope of Change</div><div class="section-body">'
  +'<div class="field" style="margin-bottom:12px"><label>Reason for Change Order</label><div class="editable multiline" data-placeholder="Why is this change needed? (unforeseen damage, owner request, code requirement...)"></div></div>'
  +'<div class="field"><label>Detailed Description of Additional / Changed Work</label><div class="editable multiline" data-placeholder="Describe all work to be added, removed, or modified..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Materials Added / Removed</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Action</th><th>Material / Item Description</th><th>Unit</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>'
  +'<tr><td>ADD</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>ADD</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>ADD</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>REMOVE</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td></tr>'
  +'<tr><td>REMOVE</td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="sq/ea/lf"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td><td><div class="editable" data-placeholder="($0.00)"></div></td></tr>'
  +'<tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Materials Net Change</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Price Adjustment</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Materials Net Change</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Additional Labor Cost</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>This Change Order Total</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Revised Contract Total</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>New Estimated Completion Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Schedule Impact (days added)</label><div class="editable" data-placeholder="0 days"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">05</span> Authorization</div><div class="section-body" style="background:#fffbf0;border-color:#e8d87a">'
  +'<p style="font-size:8.5pt;line-height:1.7;color:#444;margin-bottom:14px;border:1px solid #e8d87a;padding:12px;border-radius:4px;background:#fff">By signing below, the property owner authorizes the above change in scope and the revised contract amount. Work will not begin on the changed scope until this form is signed.</p>'
  +'</div></div>'
  +_jobCompleteChecklist(['Change order reviewed with owner','Signed copy filed in project folder','Updated schedule communicated to crew','Revised contract total recorded','Deposit adjustment collected if required'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Property Owner Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date</div></div><div class="sig-field"><label>Contractor Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Title / Date</div></div></div>'
  +'</div>'+_footer(id,'Change orders must be signed before commencement of additional work. Retain all copies.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Roofing Change Order + Approval Form</title>'+_cssFor('#bf360c','#870000')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Roofing Change Order + Approval Form',html:html};
})();

// ── LS-008 Pressure Washing Route Sheet ─────────────────────────────────────
TEMPLATES['LS-008'] = (function(){
var id='LS-008', uid='008';
var cover = _coverPage(uid, id, 'Pressure Washing Route Sheet', 'Pressure Washing', 'Daily Route Sheet', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Pressure Washing Route Sheet</div>'
  +_header(uid, 'Pressure Washing Route Sheet', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Route #',placeholder:'RT-0001'},{label:'Crew / Operator',placeholder:'Name'},{label:'Vehicle / Rig #',placeholder:'Rig #'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Rig Info</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Machine PSI</label><div class="editable" data-placeholder="e.g. 3200 PSI"></div></div><div class="field"><label>GPM Flow Rate</label><div class="editable" data-placeholder="e.g. 4.0 GPM"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>Start Mileage</label><div class="editable" data-placeholder="00,000"></div></div><div class="field"><label>End Mileage</label><div class="editable" data-placeholder="00,000"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Daily Job List</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>#</th><th>Client / Address</th><th>Surface Type</th><th>PSI Used</th><th>Detergent / Mix</th><th>Start</th><th>End</th><th>Hrs</th><th>Client Sign-Off</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'<tr><td>6</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'<tr><td>7</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'<tr><td>8</td><td><div class="editable" data-placeholder="Client / address"></div></td><td><div class="editable" data-placeholder="Concrete/Wood"></div></td><td><div class="editable" data-placeholder="PSI"></div></td><td><div class="editable" data-placeholder="Mix"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Time"></div></td><td><div class="editable" data-placeholder="Hrs"></div></td><td><div class="editable" data-placeholder="Initials"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> End of Day Summary</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Total Jobs Completed</label><div class="editable" data-placeholder="0"></div></div><div class="field"><label>Total Billable Hours</label><div class="editable" data-placeholder="0.0 hrs"></div></div><div class="field"><label>Water Used (gal est.)</label><div class="editable" data-placeholder="0 gal"></div></div><div class="field"><label>Chemical Used</label><div class="editable" data-placeholder="oz / gal"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>Equipment Issues / Damage</label><div class="editable multiline" data-placeholder="Any equipment problems today..."></div></div><div class="field"><label>Notes / Follow-Up Items</label><div class="editable multiline" data-placeholder="Any follow-up needed for tomorrow..."></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All jobs signed off by client','Equipment rinsed and stored','Chemical supply restocked if needed','Daily mileage recorded','Invoices submitted to office'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Operator Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div><div class="sig-field"><label>Supervisor / Office Review</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain for your records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pressure Washing Route Sheet</title>'+_cssFor('#0277bd','#004c8c')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Pressure Washing Route Sheet',html:html};
})();


// ── LS-009 Appliance Repair Parts Tracker ───────────────────────────────────
TEMPLATES['LS-009'] = (function(){
var id='LS-009', uid='009';
var cover = _coverPage(uid, id, 'Appliance Repair Parts Tracker', 'Appliance Repair', 'Parts Order Tracker', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Parts Order Tracker</div>'
  +_header(uid, 'Parts Order Tracker', id)
  +_infoStrip([{label:'Week / Period',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Form #',placeholder:'PT-0001'},{label:'Technician',placeholder:'Name'},{label:'Supervisor',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Technician Info</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Technician Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Badge / ID #</label><div class="editable" data-placeholder="ID #"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>Reporting Period</label><div class="editable" data-placeholder="Week / Month"></div></div><div class="field"><label>Supervisor</label><div class="editable" data-placeholder="Name"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Parts Order Log</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>#</th><th>Customer / Job #</th><th>Appliance Make / Model</th><th>Part Description</th><th>Part #</th><th>Supplier</th><th>Ordered</th><th>ETA</th><th>Cost</th><th>Status</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>6</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>7</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>8</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>9</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'<tr><td>10</td><td><div class="editable" data-placeholder="Customer"></div></td><td><div class="editable" data-placeholder="Make/Model"></div></td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="ETA"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="O"></div></td></tr>'
  +'</tbody></table>'
  +'<div style="font-size:7.5pt;color:#8899cc;margin-top:6px">Status: O=Ordered &middot; S=Shipped &middot; R=Received &middot; I=Installed &middot; B=Back-ordered &middot; C=Cancelled</div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Order Summary</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Total Parts Ordered</label><div class="editable" data-placeholder="0"></div></div><div class="field"><label>Total Parts Received</label><div class="editable" data-placeholder="0"></div></div><div class="field"><label>Total Parts Cost</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Jobs Awaiting Parts</label><div class="editable" data-placeholder="0"></div></div></div>'
  +'<div class="field"><label>Notes / Back-Order Details</label><div class="editable multiline" data-placeholder="Back-order details, ETA updates, substitutions..."></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All orders placed and confirmed','Tracking numbers recorded','Customers notified of ETA','Back-orders escalated if needed','Parts received logged and checked'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div><div class="sig-field"><label>Parts Manager / Supervisor</label><div class="sig-line"></div><div class="sig-sub">Reviewed / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain for inventory and job cost records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Appliance Repair Parts Tracker</title>'+_cssFor('#00838f','#005662')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Appliance Repair Parts Tracker',html:html};
})();

// ── LS-010 Handyman Materials Reimbursement Sheet ───────────────────────────
TEMPLATES['LS-010'] = (function(){
var id='LS-010', uid='010';
var cover = _coverPage(uid, id, 'Handyman Materials Reimbursement Sheet', 'Handyman', 'Materials Reimbursement Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Materials Reimbursement Form</div>'
  +_header(uid, 'Materials Reimbursement Sheet', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Form #',placeholder:'MR-0001'},{label:'Job #',placeholder:'J-2024-001'},{label:'Technician',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Job Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Job Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Technician / Handyman</label><div class="editable" data-placeholder="Name"></div></div><div class="field"><label>Work Date(s)</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Job Description</label><div class="editable" data-placeholder="Brief description"></div></div><div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Materials Purchased</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>#</th><th>Item Description</th><th>Store / Supplier</th><th>Receipt #</th><th>Date Purchased</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>6</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>7</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>8</td><td><div class="editable" data-placeholder="Item"></div></td><td><div class="editable" data-placeholder="Store"></div></td><td><div class="editable" data-placeholder="Receipt #"></div></td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Cost Summary</div><div class="section-body">'
  +'<div class="field-grid cols-4"><div class="field"><label>Materials Subtotal</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Tax / Fees</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Labor Total</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>TOTAL DUE</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'<div class="field" style="margin-top:14px;max-width:50%"><label>Payment Method</label><div class="editable" data-placeholder="Cash / Check / Card / Zelle"></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All receipts attached to this form','Job completed to client satisfaction','Labor hours verified','Total agreed upon by client','Payment received / invoiced'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">I certify all materials above were purchased for this job / Date</div></div><div class="sig-field"><label>Client Sign-Off</label><div class="sig-line"></div><div class="sig-sub">I authorize reimbursement of the above materials / Date</div></div></div>'
  +'</div>'+_footer(id,'Attach receipts where required. Retain for your records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Handyman Materials Reimbursement Sheet</title>'+_cssFor('#6d4c41','#40241a')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Handyman Materials Reimbursement Sheet',html:html};
})();


// ── LS-011 Mobile Mechanic Service Summary ──────────────────────────────────
TEMPLATES['LS-011'] = (function(){
var id='LS-011', uid='011';
var cover = _coverPage(uid, id, 'Mobile Mechanic Service Summary', 'Mobile Mechanic', 'Service Summary Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Mobile Mechanic Service Summary</div>'
  +_header(uid, 'Mobile Mechanic Service Summary', id)
  +_infoStrip([{label:'Service Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Invoice #',placeholder:'INV-0001'},{label:'Job #',placeholder:'J-2024-001'},{label:'Mechanic',placeholder:'Name / Cert #'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Vehicle Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Customer Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div><div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div></div>'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Year</label><div class="editable" data-placeholder="2020"></div></div><div class="field"><label>Make</label><div class="editable" data-placeholder="Make"></div></div><div class="field"><label>Model</label><div class="editable" data-placeholder="Model"></div></div><div class="field"><label>Engine</label><div class="editable" data-placeholder="2.5L / V6"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>License Plate</label><div class="editable" data-placeholder="Plate #"></div></div><div class="field"><label>VIN</label><div class="editable" data-placeholder="VIN"></div></div><div class="field"><label>Mileage</label><div class="editable" data-placeholder="00,000 mi"></div></div><div class="field"><label>Service Location</label><div class="editable" data-placeholder="Address / parking lot"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Work Performed</div><div class="section-body">'
  +'<div class="check-grid" style="margin-bottom:12px"><div class="check-item"><input type="checkbox"><label>Oil &amp; Filter Change</label></div><div class="check-item"><input type="checkbox"><label>Brake Inspection / Service</label></div><div class="check-item"><input type="checkbox"><label>Battery Test / Replacement</label></div><div class="check-item"><input type="checkbox"><label>Starter / Alternator</label></div><div class="check-item"><input type="checkbox"><label>Spark Plugs / Ignition</label></div><div class="check-item"><input type="checkbox"><label>Belts / Hoses</label></div><div class="check-item"><input type="checkbox"><label>Diagnostic Scan (OBD-II)</label></div><div class="check-item"><input type="checkbox"><label>Fluid Top-Off / Flush</label></div><div class="check-item"><input type="checkbox"><label>Tire Change / Rotation</label></div><div class="check-item"><input type="checkbox"><label>Other &mdash; see notes</label></div></div>'
  +'<div class="field"><label>Detailed Work Description</label><div class="editable multiline" data-placeholder="Describe all work performed in detail..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Parts Replaced</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>#</th><th>Part Description</th><th>OEM / Aftermarket</th><th>Part Number</th><th>Qty</th><th>Unit Cost</th><th>Total</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Part"></div></td><td><div class="editable" data-placeholder="OEM/AM"></div></td><td><div class="editable" data-placeholder="Part #"></div></td><td><div class="editable" data-placeholder="1"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="total-row"><td colspan="6" style="text-align:right;padding-right:14px">Parts Subtotal</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Labor &amp; Invoice Total</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Start Time</label><div class="editable" data-placeholder="00:00 AM"></div></div><div class="field"><label>End Time</label><div class="editable" data-placeholder="00:00 AM"></div></div><div class="field"><label>Total Hours</label><div class="editable" data-placeholder="0.0 hrs"></div></div><div class="field"><label>Labor Rate ($/hr)</label><div class="editable" data-placeholder="$0.00/hr"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Labor Total</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Parts Total</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Travel / Service Fee</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>TOTAL DUE</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All repairs completed and verified','Test drive / start-up completed','Old parts shown to customer','Work area cleaned','Invoice presented and payment collected'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Mechanic Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Certification # / Date</div></div><div class="sig-field"><label>Customer Sign-Off</label><div class="sig-line"></div><div class="sig-sub">Work completed to satisfaction / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain for vehicle service records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Mobile Mechanic Service Summary</title>'+_cssFor('#e65100','#ac1900')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Mobile Mechanic Service Summary',html:html};
})();

// ── LS-012 Locksmith Job Authorization Form ─────────────────────────────────
TEMPLATES['LS-012'] = (function(){
var id='LS-012', uid='012';
var cover = _coverPage(uid, id, 'Locksmith Job Authorization Form', 'Locksmith', 'Job Authorization Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Locksmith Job Authorization Form</div>'
  +_header(uid, 'Job Authorization Form', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Work Order #',placeholder:'WO-0001'},{label:'Technician',placeholder:'Name / License #'},{label:'Dispatch Time',placeholder:'00:00 AM'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Client &amp; Property Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client Full Name</label><div class="editable" data-placeholder="Full legal name"></div></div><div class="field"><label>Phone Number</label><div class="editable" data-placeholder="(555) 000-0000"></div></div><div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Property / Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial / Vehicle"></div></div><div class="field"><label>Unit / Apt #</label><div class="editable" data-placeholder="Unit #"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> ID Verification</div><div class="section-body" style="background:#fffaf0">'
  +'<p style="font-size:8pt;color:#774;margin-bottom:12px;font-style:italic">Locksmith must verify identity and authorization before performing any service. All fields required.</p>'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>ID Type Presented</label><div class="editable" data-placeholder="Driver License / Passport"></div></div><div class="field"><label>ID Number</label><div class="editable" data-placeholder="ID #"></div></div><div class="field"><label>ID Expiration Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>ID Matches Name Above?</label><div class="editable" data-placeholder="Yes / No"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>Relationship to Property</label><div class="editable" data-placeholder="Owner / Tenant / Agent"></div></div><div class="field"><label>Proof of Ownership / Residency</label><div class="editable" data-placeholder="Utility bill / lease / deed"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Authorization Statement</div><div class="section-body">'
  +'<p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px;background:#f7f8fc">I, the undersigned, hereby authorize <strong>[Your Company Name]</strong> to perform locksmith services on the property listed above. I certify I am the legal owner, authorized tenant, or designated representative. I understand that making a false statement to obtain locksmith services may constitute a criminal offense. I agree to pay the quoted price upon completion of service.</p>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Service Description</div><div class="section-body">'
  +'<div class="check-grid" style="margin-bottom:12px"><div class="check-item"><input type="checkbox"><label>Lockout &mdash; Residential</label></div><div class="check-item"><input type="checkbox"><label>Lockout &mdash; Vehicle</label></div><div class="check-item"><input type="checkbox"><label>Lock Re-Key</label></div><div class="check-item"><input type="checkbox"><label>Lock Replacement / Upgrade</label></div><div class="check-item"><input type="checkbox"><label>Deadbolt Installation</label></div><div class="check-item"><input type="checkbox"><label>Master Key System</label></div><div class="check-item"><input type="checkbox"><label>Safe Opening / Combination Change</label></div><div class="check-item"><input type="checkbox"><label>Key Duplication</label></div><div class="check-item"><input type="checkbox"><label>Access Control / Smart Lock</label></div><div class="check-item"><input type="checkbox"><label>Other &mdash; see notes</label></div></div>'
  +'<div class="field-grid cols-3" style="margin-bottom:12px"><div class="field"><label>Quoted Price</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>After-Hours / Emergency Fee</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Total Amount Agreed</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'<div class="field"><label>Service Notes</label><div class="editable multiline" data-placeholder="Additional details, lock make/model, special instructions..."></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['ID verified and documented','Authorization form signed','Keys tested — all work confirmed','Invoice provided to client','Work order filed'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date &mdash; I authorize the above service</div></div><div class="sig-field"><label>Locksmith Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div></div>'
  +'</div>'+_footer(id,'ID verification is mandatory. Retain signed copy per state licensing requirements.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Locksmith Job Authorization Form</title>'+_cssFor('#f57f17','#bc5100')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Locksmith Job Authorization Form',html:html};
})();


// ── LS-013 Painting Prep & Final Punch List ─────────────────────────────────
TEMPLATES['LS-013'] = (function(){
var id='LS-013', uid='013';
var cover = _coverPage(uid, id, 'Painting Prep &amp; Final Punch List', 'Painting', 'Prep &amp; Punch List Form', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Painting Prep &amp; Final Punch List</div>'
  +_header(uid, 'Prep &amp; Final Punch List', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Form #',placeholder:'PP-0001'},{label:'Job #',placeholder:'J-2024-001'},{label:'Lead Painter',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Project Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Project Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Lead Painter</label><div class="editable" data-placeholder="Name"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Project Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div><div class="field"><label>Interior / Exterior</label><div class="editable" data-placeholder="Interior / Exterior / Both"></div></div><div class="field"><label>Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Completion Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Surface Prep Checklist</div><div class="section-body">'
  +'<div class="check-grid"><div class="check-item"><input type="checkbox"><label>Furniture / fixtures moved or covered</label></div><div class="check-item"><input type="checkbox"><label>Drop cloths laid on all floors</label></div><div class="check-item"><input type="checkbox"><label>Hardware removed (outlets, plates, hooks)</label></div><div class="check-item"><input type="checkbox"><label>Cracks / holes patched with spackle</label></div><div class="check-item"><input type="checkbox"><label>Surfaces sanded smooth</label></div><div class="check-item"><input type="checkbox"><label>Surfaces wiped clean (dust / grease)</label></div><div class="check-item"><input type="checkbox"><label>Caulk applied to trim / edges</label></div><div class="check-item"><input type="checkbox"><label>Tape applied to all masking areas</label></div><div class="check-item"><input type="checkbox"><label>Wood rot addressed / repaired</label></div><div class="check-item"><input type="checkbox"><label>Stains spot-primed (water / smoke)</label></div><div class="check-item"><input type="checkbox"><label>Exterior surfaces pressure washed</label></div><div class="check-item"><input type="checkbox"><label>All prep work approved by lead</label></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Primer &amp; Top Coat Notes</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Primer Brand</label><div class="editable" data-placeholder="Brand name"></div></div><div class="field"><label>Primer Color / Tint</label><div class="editable" data-placeholder="Color / tint"></div></div><div class="field"><label>Applied By</label><div class="editable" data-placeholder="Name"></div></div><div class="field"><label>Dry Time</label><div class="editable" data-placeholder="e.g. 2 hrs"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Top Coat Brand</label><div class="editable" data-placeholder="Brand name"></div></div><div class="field"><label>Color Name / Code</label><div class="editable" data-placeholder="SW 7015 / Benjamin Moore"></div></div><div class="field"><label>Sheen Level</label><div class="editable" data-placeholder="Flat / Eggshell / Semi-gloss"></div></div><div class="field"><label># of Coats</label><div class="editable" data-placeholder="2"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Final Punch List</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Area / Room</th><th>Item / Issue</th><th>Assigned To</th><th>Completed?</th><th>Initials</th></tr></thead><tbody>'
  +'<tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Room/Area"></div></td><td><div class="editable" data-placeholder="Issue / touch-up needed"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Yes / No"></div></td><td><div class="editable" data-placeholder="Init."></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">05</span> Client Walkthrough Sign-Off</div><div class="section-body">'
  +'<div class="field" style="margin-bottom:12px"><label>Client Comments / Punch Items Noted</label><div class="editable multiline" data-placeholder="Client feedback during walkthrough..."></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Walkthrough Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Outstanding Items Resolved?</label><div class="editable" data-placeholder="Yes / No"></div></div><div class="field"><label>Final Payment Amount</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All punch list items resolved','Paint cans labeled and left for touch-ups','All tape and drop cloths removed','Furniture returned to position','Final walkthrough signed off'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Lead Painter Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div><div class="sig-field"><label>Client Acceptance</label><div class="sig-line"></div><div class="sig-sub">Work completed to satisfaction / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain for project records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Painting Prep &amp; Final Punch List</title>'+_cssFor('#d32f2f','#9a0007')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Painting Prep & Final Punch List',html:html};
})();

// ── LS-014 Snow Removal Trigger Checklist ───────────────────────────────────
TEMPLATES['LS-014'] = (function(){
var id='LS-014', uid='014';
var cover = _coverPage(uid, id, 'Snow Removal Trigger Checklist', 'Snow Removal', 'Trigger &amp; Route Checklist', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Snow Removal Trigger Checklist</div>'
  +_header(uid, 'Snow Removal Trigger Checklist', id)
  +_infoStrip([{label:'Season',placeholder:'2024–2025',id:'field-date'},{label:'Form #',placeholder:'SR-0001'},{label:'Operations Manager',placeholder:'Name'},{label:'Total Routes',placeholder:'0'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Season Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Season Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Season End Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div></div>'
  +'<div class="field-grid cols-2"><div class="field"><label>Total Contracted Routes</label><div class="editable" data-placeholder="0"></div></div><div class="field"><label>Number of Crews</label><div class="editable" data-placeholder="0"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Service Trigger Conditions</div><div class="section-body">'
  +'<div class="field-grid cols-2"><div><div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Snowfall Triggers</div><div style="display:flex;flex-direction:column;gap:5px"><div class="check-item"><input type="checkbox"><label>1&quot; accumulation trigger</label></div><div class="check-item"><input type="checkbox"><label>2&quot; accumulation trigger</label></div><div class="check-item"><input type="checkbox"><label>3&quot; accumulation trigger</label></div><div class="check-item"><input type="checkbox"><label>Per-push (any accumulation)</label></div><div class="check-item"><input type="checkbox"><label>Zero-tolerance (continuous)</label></div><div class="check-item"><input type="checkbox"><label>Client-requested call-out only</label></div></div></div>'
  +'<div><div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Ice &amp; Condition Triggers</div><div style="display:flex;flex-direction:column;gap:5px"><div class="check-item"><input type="checkbox"><label>Black ice &mdash; auto deploy</label></div><div class="check-item"><input type="checkbox"><label>Temp below ___&deg;F &mdash; pre-treat</label></div><div class="check-item"><input type="checkbox"><label>Freezing rain forecast</label></div><div class="check-item"><input type="checkbox"><label>Post-storm re-freeze check</label></div><div class="check-item"><input type="checkbox"><label>Daytime melt + overnight freeze</label></div><div class="check-item"><input type="checkbox"><label>Client site inspection only</label></div></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Client Route List</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>#</th><th>Client / Property Name</th><th>Address</th><th>Trigger (in.)</th><th>Salt / Sand?</th><th>Priority</th><th>Crew</th><th>Notes</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'<tr><td>6</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'<tr><td>7</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'<tr><td>8</td><td><div class="editable" data-placeholder="Client"></div></td><td><div class="editable" data-placeholder="Address"></div></td><td><div class="editable" data-placeholder="2&quot;"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="1-5"></div></td><td><div class="editable" data-placeholder="Crew"></div></td><td><div class="editable" data-placeholder="Notes"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Equipment Pre-Season Check</div><div class="section-body">'
  +'<div class="check-grid"><div class="check-item"><input type="checkbox"><label>Plow blades inspected</label></div><div class="check-item"><input type="checkbox"><label>Truck fluids topped off</label></div><div class="check-item"><input type="checkbox"><label>Salt spreaders calibrated</label></div><div class="check-item"><input type="checkbox"><label>Salt / sand inventory stocked</label></div><div class="check-item"><input type="checkbox"><label>Snow blowers serviced</label></div><div class="check-item"><input type="checkbox"><label>Emergency contact list updated</label></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All routes assigned to crews','Trigger conditions reviewed with team','Clients notified of season start','Equipment readiness confirmed','Emergency contacts verified'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Operations Manager Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div><div class="sig-field"><label>Owner / Supervisor Review</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain for season operations records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Snow Removal Trigger Checklist</title>'+_cssFor('#01579b','#002f6c')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Snow Removal Trigger Checklist',html:html};
})();


// ── LS-015 Window Cleaning Client Packet ────────────────────────────────────
TEMPLATES['LS-015'] = (function(){
var id='LS-015', uid='015';
var cover = _coverPage(uid, id, 'Window Cleaning Client Packet', 'Window Cleaning', 'Client Service Packet', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Window Cleaning Client Packet</div>'
  +_header(uid, 'Window Cleaning Client Packet', id)
  +_infoStrip([{label:'Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Client #',placeholder:'CL-0001'},{label:'Route',placeholder:'Route name / #'},{label:'Technician',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Client Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Billing Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div><div class="field"><label>Preferred Contact Method</label><div class="editable" data-placeholder="Phone / Email / Text"></div></div><div class="field"><label>Referral Source</label><div class="editable" data-placeholder="Google / Referral / Other"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Property Details</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Property Type</label><div class="editable" data-placeholder="Residential / Commercial"></div></div><div class="field"><label>Stories / Height</label><div class="editable" data-placeholder="1-story / 2-story"></div></div><div class="field"><label>Total Window Count</label><div class="editable" data-placeholder="0 windows"></div></div></div>'
  +'<div class="check-grid"><div class="check-item"><input type="checkbox"><label>Interior windows included</label></div><div class="check-item"><input type="checkbox"><label>Screen cleaning included</label></div><div class="check-item"><input type="checkbox"><label>Track &amp; sill cleaning included</label></div><div class="check-item"><input type="checkbox"><label>Skylights included</label></div><div class="check-item"><input type="checkbox"><label>Hard water stain removal</label></div><div class="check-item"><input type="checkbox"><label>Storm windows / panels</label></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Service Schedule</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Visit #</th><th>Scheduled Date</th><th>Time Window</th><th>Service Type</th><th>Technician</th><th>Completed</th><th>Amount</th></tr></thead><tbody>'
  +'<tr><td>1</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM&ndash;12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>2</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM&ndash;12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>3</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM&ndash;12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>4</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM&ndash;12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>5</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM&ndash;12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>6</td><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="8AM&ndash;12PM"></div></td><td><div class="editable" data-placeholder="Full / Exterior"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Y/N"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Scope of Work &amp; Pricing</div><div class="section-body">'
  +'<div class="field" style="margin-bottom:12px"><label>Detailed Scope / Special Instructions</label><div class="editable multiline" data-placeholder="Access instructions, special window types, equipment needed..."></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Service Frequency</label><div class="editable" data-placeholder="Monthly / Quarterly / Annual"></div></div><div class="field"><label>Quoted Price Per Visit</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Annual Contract Value</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">05</span> Terms &amp; Service Agreement</div><div class="section-body">'
  +'<p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px;background:#f7f8fc">Services are performed during agreed-upon windows. <strong>[Your Company Name]</strong> is not liable for pre-existing screen tears, cracked seals, or window damage. Cancellations require 24-hour notice or a cancellation fee applies. Payment is due on the day of service unless invoiced under a contract agreement.</p>'
  +'</div></div>'
  +_jobCompleteChecklist(['All windows completed per scope','Screens replaced / reinstalled','Tracks and sills wiped','Equipment removed from property','Invoice provided'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div class="sig-sub">I agree to the scope and terms above / Date</div></div><div class="sig-field"><label>Company Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Title / Date</div></div></div>'
  +'</div>'+_footer(id,'For business use only. Retain signed copy for client file.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Window Cleaning Client Packet</title>'+_cssFor('#0097a7','#006978')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Window Cleaning Client Packet',html:html};
})();

// ── LS-016 Pool Service Chemical Log ────────────────────────────────────────
TEMPLATES['LS-016'] = (function(){
var id='LS-016', uid='016';
var cover = _coverPage(uid, id, 'Pool Service Chemical Log', 'Pool Service', 'Monthly Chemical Log', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Pool Chemical Service Log</div>'
  +_header(uid, 'Pool Chemical Service Log', id)
  +_infoStrip([{label:'Month / Year',placeholder:'MM/YYYY',id:'field-date'},{label:'Account #',placeholder:'AC-0001'},{label:'Technician',placeholder:'Name / Cert #'},{label:'Client Name',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Pool Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Pool Volume (gal)</label><div class="editable" data-placeholder="15,000 gal"></div></div><div class="field"><label>Sanitizer Type</label><div class="editable" data-placeholder="Chlorine / Salt / Bromine"></div></div><div class="field"><label>Filter Type</label><div class="editable" data-placeholder="Sand / Cartridge / DE"></div></div><div class="field"><label>Pump Run Time (hr/day)</label><div class="editable" data-placeholder="8 hrs/day"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Weekly Water Chemistry Log</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Date</th><th>Tech</th><th>Free Cl (FC) ppm</th><th>pH</th><th>Total Alk (TA)</th><th>Cal Hard (CH)</th><th>CYA ppm</th><th>Temp &deg;F</th><th>Notes / Actions</th></tr></thead><tbody>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Init."></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="7.4"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="ppm"></div></td><td><div class="editable" data-placeholder="&deg;F"></div></td><td><div class="editable" data-placeholder="Actions taken"></div></td></tr>'
  +'</tbody></table>'
  +'<div style="font-size:7.5pt;color:#8899cc;margin-top:6px">Target: FC 2&ndash;4 ppm &middot; pH 7.4&ndash;7.6 &middot; TA 80&ndash;120 ppm &middot; CH 200&ndash;400 ppm &middot; CYA 30&ndash;50 ppm</div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Chemical Dosage Record</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Date</th><th>Chemical Name</th><th>Purpose</th><th>Amount Added</th><th>Unit</th><th>Applied By</th></tr></thead><tbody>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Chemical name"></div></td><td><div class="editable" data-placeholder="Purpose"></div></td><td><div class="editable" data-placeholder="Amount"></div></td><td><div class="editable" data-placeholder="oz/lbs/gal"></div></td><td><div class="editable" data-placeholder="Name"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Monthly Summary</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Total Service Visits</label><div class="editable" data-placeholder="0"></div></div><div class="field"><label>Filter Cleaned / Backwashed</label><div class="editable" data-placeholder="Yes / No / Date"></div></div><div class="field"><label>Algae Treatment Required?</label><div class="editable" data-placeholder="Yes / No"></div></div><div class="field"><label>Equipment Issues Noted?</label><div class="editable" data-placeholder="Yes / No &mdash; see notes"></div></div></div>'
  +'<div class="field"><label>Monthly Observations &amp; Recommendations</label><div class="editable multiline" data-placeholder="Equipment condition, upcoming needs, client notes..."></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['Water chemistry within target range','Chemical dosage logged completely','Filter backwashed / cleaned','Equipment visual inspection done','Monthly report ready for client'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Pool Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Certification # / Date</div></div><div class="sig-field"><label>Client Review (optional)</label><div class="sig-line"></div><div class="sig-sub">Monthly sign-off / Date</div></div></div>'
  +'</div>'+_footer(id,'Retain chemical records as required by local health department regulations.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pool Service Chemical Log</title>'+_cssFor('#00897b','#00574b')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Pool Service Chemical Log',html:html};
})();


// ── LS-017 Flooring Estimate Scope Matrix ───────────────────────────────────
TEMPLATES['LS-017'] = (function(){
var id='LS-017', uid='017';
var cover = _coverPage(uid, id, 'Flooring Estimate Scope Matrix', 'Flooring', 'Estimate Scope Matrix', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Flooring Estimate Scope Matrix</div>'
  +_header(uid, 'Flooring Estimate Scope Matrix', id)
  +_infoStrip([{label:'Estimate Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Estimate #',placeholder:'EST-0001'},{label:'Valid Until',placeholder:'MM/DD/YYYY'},{label:'Estimator',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Client &amp; Project Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Project Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone / Email</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Project Type</label><div class="editable" data-placeholder="New install / Refinish / Replace"></div></div><div class="field"><label>Est. Start Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Est. Duration</label><div class="editable" data-placeholder="e.g. 3 days"></div></div><div class="field"><label>Estimator</label><div class="editable" data-placeholder="Name"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Room-by-Room Scope</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Room / Area</th><th>Sq Ft</th><th>Flooring Material</th><th>Material $/sqft</th><th>Material Total</th><th>Labor $/sqft</th><th>Labor Total</th><th>Room Total</th></tr></thead><tbody>'
  +'<tr><td>Living Room</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>Master Bedroom</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>Bedroom 2</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>Bedroom 3</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>Kitchen</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>Dining Room</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>Hallway / Stairs</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td>Bathroom(s)</td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Other room..."></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'<tr class="total-row"><td colspan="7" style="text-align:right;padding-right:14px">PROJECT SUBTOTAL</td><td><div class="editable" data-placeholder="$0.00"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Material Summary</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Primary Material</label><div class="editable" data-placeholder="LVP / Hardwood / Tile"></div></div><div class="field"><label>Brand / Grade</label><div class="editable" data-placeholder="Brand / Grade"></div></div><div class="field"><label>Color / SKU</label><div class="editable" data-placeholder="Color / SKU #"></div></div><div class="field"><label>Waste Factor (%)</label><div class="editable" data-placeholder="10%"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Underlayment Needed?</label><div class="editable" data-placeholder="Yes / No"></div></div><div class="field"><label>Subfloor Prep Required?</label><div class="editable" data-placeholder="Yes / No"></div></div><div class="field"><label>Transitions / Molding</label><div class="editable" data-placeholder="Yes / No &mdash; lf"></div></div><div class="field"><label>Demo / Removal</label><div class="editable" data-placeholder="Yes / No &mdash; sq ft"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Estimate Total</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Materials Subtotal</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Labor Subtotal</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Additional Charges</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>ESTIMATE TOTAL</label><div class="editable" data-placeholder="$0.00"></div></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Deposit Required</label><div class="editable" data-placeholder="$0.00 (50%)"></div></div><div class="field"><label>Balance Due</label><div class="editable" data-placeholder="$0.00"></div></div><div class="field"><label>Payment Terms</label><div class="editable" data-placeholder="Net 30 / Due on completion"></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['All room measurements verified','Material SKUs and costs confirmed','Deposit collected','Start date confirmed with client','Estimate copy provided'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Estimator Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div><div class="sig-field"><label>Client Approval</label><div class="sig-line"></div><div class="sig-sub">I approve this estimate and authorize the project to proceed / Date</div></div></div>'
  +'</div>'+_footer(id,'Estimates valid for period shown. Final invoice may vary based on field conditions.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Flooring Estimate Scope Matrix</title>'+_cssFor('#f57c00','#bb4d00')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Flooring Estimate Scope Matrix',html:html};
})();

// ── LS-018 Contractor Daily Site Report ─────────────────────────────────────
TEMPLATES['LS-018'] = (function(){
var id='LS-018', uid='018';
var cover = _coverPage(uid, id, 'Contractor Daily Site Report', 'General Contracting', 'Daily Site Report', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Contractor Daily Site Report</div>'
  +_header(uid, 'Contractor Daily Site Report', id)
  +_infoStrip([{label:'Report Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Report #',placeholder:'DSR-0001'},{label:'Project #',placeholder:'P-2024-001'},{label:'Site Foreman',placeholder:'Name'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Project Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Project Name</label><div class="editable" data-placeholder="Project name"></div></div><div class="field"><label>Site Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Project Manager</label><div class="editable" data-placeholder="Name"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Weather / Conditions</label><div class="editable" data-placeholder="Sunny / Cloudy / Rain"></div></div><div class="field"><label>Temperature (&deg;F)</label><div class="editable" data-placeholder="72&deg;F"></div></div><div class="field"><label>% Complete (overall)</label><div class="editable" data-placeholder="0%"></div></div><div class="field"><label>Contract Phase</label><div class="editable" data-placeholder="Foundation / Framing / Finish"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Crew Roster</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Name</th><th>Trade / Role</th><th>Company / Sub</th><th>Time In</th><th>Time Out</th><th>Hours</th></tr></thead><tbody>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Role"></div></td><td><div class="editable" data-placeholder="Company"></div></td><td><div class="editable" data-placeholder="7:00 AM"></div></td><td><div class="editable" data-placeholder="3:30 PM"></div></td><td><div class="editable" data-placeholder="8.0"></div></td></tr>'
  +'<tr class="total-row"><td colspan="5" style="text-align:right;padding-right:14px">Total Man-Hours Today</td><td><div class="editable" data-placeholder="0.0"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Work Completed Today</div><div class="section-body">'
  +'<div class="field"><label>Summary of Work Performed</label><div class="editable multiline" data-placeholder="Describe all work completed today in detail..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Materials Used / Received</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Material / Item</th><th>Qty Used</th><th>Unit</th><th>Delivered Today?</th><th>Supplier</th></tr></thead><tbody>'
  +'<tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Material"></div></td><td><div class="editable" data-placeholder="0"></div></td><td><div class="editable" data-placeholder="ea/lf/sqft"></div></td><td><div class="editable" data-placeholder="Yes/No"></div></td><td><div class="editable" data-placeholder="Supplier"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">05</span> Delays, Issues &amp; Safety</div><div class="section-body">'
  +'<div class="field-grid cols-2"><div class="field"><label>Delays / Problems Encountered</label><div class="editable multiline" data-placeholder="Weather delays, material shortages, subcontractor issues..."></div></div><div class="field"><label>Safety Incidents / Near-Misses</label><div class="editable multiline" data-placeholder="Any safety events, injuries, or near-misses..."></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">06</span> Next Day Plan</div><div class="section-body">'
  +'<div class="field" style="margin-bottom:12px"><label>Planned Work for Tomorrow</label><div class="editable multiline" data-placeholder="What will be worked on tomorrow..."></div></div>'
  +'<div class="field-grid cols-3"><div class="field"><label>Materials Needed Tomorrow</label><div class="editable" data-placeholder="Materials list"></div></div><div class="field"><label>Subs / Crew Expected</label><div class="editable" data-placeholder="Crew / subcontractors"></div></div><div class="field"><label>Inspections Scheduled?</label><div class="editable" data-placeholder="Yes / No &mdash; type"></div></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['Daily report completed and accurate','All man-hours verified','Safety incidents reported if any','Tomorrow\'s plan confirmed','Report submitted to PM'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Site Foreman Signature</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div><div class="sig-field"><label>Project Manager Review</label><div class="sig-line"></div><div class="sig-sub">Name / Date</div></div></div>'
  +'</div>'+_footer(id,'File in project documentation folder. Retain for duration of project plus 3 years.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Contractor Daily Site Report</title>'+_cssFor('#283593','#001064')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Contractor Daily Site Report',html:html};
})();


// ── LS-019 Septic Service Pump Log ──────────────────────────────────────────
TEMPLATES['LS-019'] = (function(){
var id='LS-019', uid='019';
var cover = _coverPage(uid, id, 'Septic Service Pump Log', 'Septic Service', 'Service Pump Log', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Septic Service Pump Log</div>'
  +_header(uid, 'Septic Service Pump Log', id)
  +_infoStrip([{label:'Service Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Work Order #',placeholder:'WO-0001'},{label:'Technician',placeholder:'Name / License #'},{label:'Truck / Unit #',placeholder:'Unit #'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Property Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()+'<div class="field"><label>Property Owner</label><div class="editable" data-placeholder="Full name"></div></div><div class="field"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>County / Municipality</label><div class="editable" data-placeholder="County"></div></div><div class="field"><label>Permit # (if applicable)</label><div class="editable" data-placeholder="Permit #"></div></div><div class="field"><label>Years at Property</label><div class="editable" data-placeholder="0 yrs"></div></div><div class="field"><label>Last Service Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Tank Details</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Tank Size (gal)</label><div class="editable" data-placeholder="1,000 gal"></div></div><div class="field"><label>Tank Material</label><div class="editable" data-placeholder="Concrete / Fiberglass / Plastic"></div></div><div class="field"><label>Number of Compartments</label><div class="editable" data-placeholder="1 / 2"></div></div><div class="field"><label>Tank Install Year</label><div class="editable" data-placeholder="Year"></div></div></div>'
  +'<div class="field-grid cols-4"><div class="field"><label>Tank Location / Depth</label><div class="editable" data-placeholder="Location / depth"></div></div><div class="field"><label>Access Risers Present?</label><div class="editable" data-placeholder="Yes / No"></div></div><div class="field"><label>Effluent Filter Present?</label><div class="editable" data-placeholder="Yes / No"></div></div><div class="field"><label>Pump Chamber Present?</label><div class="editable" data-placeholder="Yes / No"></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Service Record</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Service Date</th><th>Tech</th><th>Service Type</th><th>Gallons Pumped</th><th>Waste Disposal Site</th><th>Manifest #</th></tr></thead><tbody>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Date"></div></td><td><div class="editable" data-placeholder="Name"></div></td><td><div class="editable" data-placeholder="Pump / Inspect"></div></td><td><div class="editable" data-placeholder="0 gal"></div></td><td><div class="editable" data-placeholder="Disposal site"></div></td><td><div class="editable" data-placeholder="Manifest #"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Observations</div><div class="section-body">'
  +'<div class="check-grid" style="margin-bottom:12px"><div class="check-item"><input type="checkbox"><label>Tank in good condition</label></div><div class="check-item"><input type="checkbox"><label>Inlet / outlet baffle intact</label></div><div class="check-item"><input type="checkbox"><label>Signs of root intrusion</label></div><div class="check-item"><input type="checkbox"><label>Cracks / damage to tank</label></div><div class="check-item"><input type="checkbox"><label>High scum / sludge levels</label></div><div class="check-item"><input type="checkbox"><label>Effluent filter cleaned</label></div><div class="check-item"><input type="checkbox"><label>Pump alarm functioning</label></div><div class="check-item"><input type="checkbox"><label>Evidence of drainfield failure</label></div></div>'
  +'<div class="field"><label>Observation Notes</label><div class="editable multiline" data-placeholder="Detailed observations, condition notes, photos taken..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">05</span> Compliance &amp; Recommendations</div><div class="section-body">'
  +'<div class="field-grid cols-3" style="margin-bottom:12px"><div class="field"><label>Next Recommended Service Date</label><div class="editable" data-placeholder="MM/DD/YYYY"></div></div><div class="field"><label>Pumping Frequency Recommended</label><div class="editable" data-placeholder="Every 2&ndash;3 years"></div></div><div class="field"><label>Regulatory Report Required?</label><div class="editable" data-placeholder="Yes / No"></div></div></div>'
  +'<div class="field"><label>Compliance Notes / Required Actions</label><div class="editable multiline" data-placeholder="Required repairs, compliance actions, follow-up items..."></div></div>'
  +'</div></div>'
  +_jobCompleteChecklist(['Tank fully pumped and documented','Manifest completed and filed','Observations logged accurately','Next service date communicated to owner','Regulatory report filed if required'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div class="sig-sub">Name / License # / Date</div></div><div class="sig-field"><label>Property Owner Acknowledgment</label><div class="sig-line"></div><div class="sig-sub">Service received and conditions noted / Date</div></div></div>'
  +'</div>'+_footer(id,'Waste hauling manifests must comply with state environmental regulations. Retain all records.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Septic Service Pump Log</title>'+_cssFor('#00695c','#003d33')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Septic Service Pump Log',html:html};
})();

// ── LS-020 Service Fee Transparency Addendum ────────────────────────────────
TEMPLATES['LS-020'] = (function(){
var id='LS-020', uid='020';
var cover = _coverPage(uid, id, 'Service Fee Transparency Addendum', 'Service Business', 'Fee Schedule Addendum', []);
var mainForm = '<div class="page-break">'
  +'<div class="page-label no-print">Page 2 of 3 &mdash; Service Fee Transparency Addendum</div>'
  +_header(uid, 'Service Fee Transparency Addendum', id)
  +_infoStrip([{label:'Effective Date',placeholder:'MM/DD/YYYY',id:'field-date'},{label:'Addendum #',placeholder:'ADD-0001'},{label:'Job / Account #',placeholder:'J-2024-001'},{label:'Rep / Preparer',placeholder:'Name / Title'}])
  +'<div class="body">'
  +'<div class="section"><div class="section-header"><span class="sec-num">01</span> Business &amp; Client Information</div><div class="section-body">'
  +'<div class="field-grid cols-2" style="margin-bottom:12px">'+_priorityField()
  +'<div><div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Service Provider</div><div class="field" style="margin-bottom:10px"><label>Company Name</label><div class="editable" data-placeholder="Company name"></div></div><div class="field" style="margin-bottom:10px"><label>Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field-grid cols-2"><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div><div class="field"><label>License #</label><div class="editable" data-placeholder="License #"></div></div></div></div>'
  +'<div><div style="font-size:6.5pt;font-weight:800;text-transform:uppercase;color:#8899cc;margin-bottom:8px">Client</div><div class="field" style="margin-bottom:10px"><label>Client Name</label><div class="editable" data-placeholder="Full name"></div></div><div class="field" style="margin-bottom:10px"><label>Service Address</label><div class="editable" data-placeholder="Street, City, State"></div></div><div class="field-grid cols-2"><div class="field"><label>Phone</label><div class="editable" data-placeholder="(555) 000-0000"></div></div><div class="field"><label>Email</label><div class="editable" data-placeholder="email@example.com"></div></div></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">02</span> Current Fee Schedule</div><div class="section-body">'
  +'<table class="form-table"><thead><tr><th>Fee / Charge Type</th><th>Description</th><th>Rate / Amount</th><th>Unit</th><th>Applies When</th></tr></thead><tbody>'
  +'<tr><td>Service Call / Diagnostic</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>per visit</td><td>Every dispatch</td></tr>'
  +'<tr><td>Standard Labor Rate</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/hr"></div></td><td>per hour</td><td>M&ndash;F standard hours</td></tr>'
  +'<tr><td>Overtime Labor Rate</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/hr"></div></td><td>per hour</td><td><div class="editable" data-placeholder="After __ hrs / weekends"></div></td></tr>'
  +'<tr><td>Emergency / After-Hours</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>per visit</td><td>Outside business hours</td></tr>'
  +'<tr><td>Holiday Rate</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/hr"></div></td><td>per hour</td><td>Recognized holidays</td></tr>'
  +'<tr><td>Travel / Mileage Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00/mi"></div></td><td>per mile / flat</td><td><div class="editable" data-placeholder="Beyond __ miles"></div></td></tr>'
  +'<tr><td>Parts Mark-Up</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="__% above cost"></div></td><td>per order</td><td>All parts sourced</td></tr>'
  +'<tr><td>Permit / Filing Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>flat fee</td><td>When permit required</td></tr>'
  +'<tr><td>Cancellation Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>flat fee</td><td><div class="editable" data-placeholder="Less than __ hrs notice"></div></td></tr>'
  +'<tr><td>Returned Check Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td>flat fee</td><td>NSF / returned payment</td></tr>'
  +'<tr><td>Late Payment Fee</td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="__% / month"></div></td><td>monthly</td><td><div class="editable" data-placeholder="Past due after __ days"></div></td></tr>'
  +'<tr><td><div class="editable" data-placeholder="Other fee..."></div></td><td><div class="editable" data-placeholder="Description"></div></td><td><div class="editable" data-placeholder="$0.00"></div></td><td><div class="editable" data-placeholder="Unit"></div></td><td><div class="editable" data-placeholder="When applies"></div></td></tr>'
  +'</tbody></table></div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">03</span> Payment Terms</div><div class="section-body">'
  +'<div class="field-grid cols-4" style="margin-bottom:12px"><div class="field"><label>Invoice Due</label><div class="editable" data-placeholder="Net 30 / Due on receipt"></div></div><div class="field"><label>Accepted Payment Methods</label><div class="editable" data-placeholder="Cash / Check / Card / Zelle"></div></div><div class="field"><label>Deposit Required</label><div class="editable" data-placeholder="Yes / No &mdash; amount"></div></div><div class="field"><label>Payment Plan Available?</label><div class="editable" data-placeholder="Yes / No"></div></div></div>'
  +'<div class="field"><label>Additional Payment Terms / Notes</label><div class="editable multiline" data-placeholder="Any additional payment terms, finance charges, or special arrangements..."></div></div>'
  +'</div></div>'
  +'<div class="section"><div class="section-header"><span class="sec-num">04</span> Client Acknowledgment</div><div class="section-body" style="background:#f7f8fc">'
  +'<p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #dde2f0;padding:14px;border-radius:4px">By signing below, I acknowledge that I have received, read, and understand the fee schedule listed above. I agree that all services rendered by <strong>[Your Company Name]</strong> will be billed in accordance with the rates shown. I understand that rates may be updated with 30 days written notice.</p>'
  +'</div></div>'
  +_jobCompleteChecklist(['Fee schedule reviewed with client','Signed copy provided to client','Copy filed in client account','Payment terms confirmed','Client onboarding complete'])
  +_satisfactionSection()
  +'<div class="sig-block"><div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div class="sig-sub">Printed Name / Date</div></div><div class="sig-field"><label>Company Representative</label><div class="sig-line"></div><div class="sig-sub">Name / Title / Date</div></div></div>'
  +'</div>'+_footer(id,'Present to all new clients before service begins. Not a substitute for a full service contract.')+'</div>';
var history = _historyPage(uid, id, 'For business use only. Retain for your records.');
var html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Service Fee Transparency Addendum</title>'+_cssFor('#455a64','#1c313a')+'</head><body>'+_toolbar()+'<div class="page">'+cover+mainForm+history+'</div>'+_JS+'</body></html>';
return {id:id,title:'Service Fee Transparency Addendum',html:html};
})();

// ── Exports ──────────────────────────────────────────────────────────────────
function generateTemplate(listingId) {
  var t = TEMPLATES[listingId];
  if (!t) return '<p>Template not found.</p>';
  return t.html;
}

function openTemplate(listingId, autoPrint) {
  var html = generateTemplate(listingId);
  if (autoPrint) {
    // Inject auto-print trigger before </body>
    html = html.replace('</body>', '<script>window.addEventListener("load",function(){setTimeout(function(){window.print();},600);});<\/script></body>');
  }
  var win = window.open('', '_blank');
  if (win) { win.document.write(html); win.document.close(); }
}


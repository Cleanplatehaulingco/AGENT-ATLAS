/**
 * TradeOpsVault — Smart Template Engine
 *
 * Injected into all 20 templates. Auto-detects structure, never hardcodes
 * column positions — works generically across every form type.
 *
 * Features:
 *  1. Smart Memory     — persists company name, tech name, license across sessions
 *  2. Invoice Calc     — Qty × Price → Line Total → Parts Subtotal → Grand Total
 *  3. Sqft Calc        — Sq Ft × $/sqft → subtotals (LS-017 Flooring)
 *  4. Labor Auto-Calc  — Labor Hours × Rate → Labor Total → Grand Total
 *  5. Currency Format  — auto-formats $-placeholder fields on blur
 *  6. Smart Indicator  — "Smart Mode Active" badge in toolbar
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const downloadsDir = path.join(__dirname, 'downloads');

// ─── The actual client-side smart engine (injected verbatim) ─────────────────

const SMART_ENGINE = `
<script>
(function(){
'use strict';

// ── Utilities ─────────────────────────────────────────────────────────────────
function $$(sel,root){return Array.from((root||document).querySelectorAll(sel));}
function parseMoney(str){return parseFloat(String(str||'').replace(/[^0-9.]/g,''))||0;}
function formatMoney(n){return '$'+n.toFixed(2);}
function getEditable(cell){return cell&&cell.querySelector('.editable');}
function thText(th){return th.textContent.trim().toLowerCase();}

// ── 1. Smart Memory ───────────────────────────────────────────────────────────
var MEMORY_LABELS=[
  'company name','license number','license #','phone','email','website',
  'insurance carrier','technician','tech name','operator','service tech',
  'estimator','inspector','applicator','crew lead'
];
function memKey(label){return 'tov_mem_'+label.toLowerCase().replace(/[^a-z0-9]/g,'_');}

function initMemory(){
  // Company name banners (appear on every page header)
  $$('.company-name-field').forEach(function(el){
    var key='tov_mem_company_name';
    var saved=localStorage.getItem(key);
    if(saved&&!el.textContent.trim())el.textContent=saved;
    el.addEventListener('blur',function(){
      var v=el.textContent.trim();
      if(v)localStorage.setItem(key,v);
      // Sync all company-name-fields on the page
      $$('.company-name-field').forEach(function(other){if(!other.textContent.trim())other.textContent=v;});
    });
  });

  // Standard labeled fields
  $$('.field, .info-field').forEach(function(field){
    var lbl=field.querySelector('label');
    var el=field.querySelector('.editable');
    if(!lbl||!el)return;
    var txt=lbl.textContent.trim().toLowerCase();
    if(txt==='date')return; // never restore date
    var match=MEMORY_LABELS.find(function(ml){return txt.includes(ml);});
    if(!match)return;
    var key=memKey(txt);
    var saved=localStorage.getItem(key);
    if(saved&&!el.textContent.trim())el.textContent=saved;
    el.addEventListener('blur',function(){
      var v=el.textContent.trim();
      if(v)localStorage.setItem(key,v);
    });
  });
}

// ── 2. Invoice Auto-Calculator ────────────────────────────────────────────────
function initInvoiceCalc(){
  $$('.form-table').forEach(function(table){
    var ths=$$('thead th',table);
    if(!ths.length)return;
    var headers=ths.map(thText);

    // ── Standard Qty × Unit Price → Total ──────────────────────────────────
    var qtyIdx=headers.findIndex(function(h){return h==='qty'||h==='quantity';});
    var priceIdx=headers.findIndex(function(h){
      return h==='unit price'||h==='unit cost'||h==='cost'||h==='price';
    });
    var totalIdx=headers.findIndex(function(h){return h==='total';});

    if(qtyIdx>-1&&priceIdx>-1&&totalIdx>-1){
      wireQtyPriceTotal(table,qtyIdx,priceIdx,totalIdx);
      return;
    }

    // ── Flooring: Sq Ft × $/sqft → subtotals ───────────────────────────────
    var sqftIdx=headers.findIndex(function(h){return h==='sq ft'||h.includes('sqft');});
    var matRateIdx=headers.findIndex(function(h){return h.includes('material')&&h.includes('sqft');});
    var matTotalIdx=headers.findIndex(function(h){return h==='material total';});
    var labRateIdx=headers.findIndex(function(h){return h.includes('labor')&&h.includes('sqft');});
    var labTotalIdx=headers.findIndex(function(h){return h==='labor total';});
    var roomTotalIdx=headers.findIndex(function(h){return h==='room total';});

    if(sqftIdx>-1&&matRateIdx>-1){
      wireFlooring(table,sqftIdx,matRateIdx,matTotalIdx,labRateIdx,labTotalIdx,roomTotalIdx);
    }
  });
}

function dataRows(table){
  return $$('tbody tr',table).filter(function(r){
    return !r.classList.contains('sample-row')&&
           !r.classList.contains('total-row')&&
           !r.classList.contains('grand-total-row');
  });
}

function wireQtyPriceTotal(table,qi,pi,ti){
  var rows=dataRows(table);

  // Locate subtotal / labor / grand rows
  var totalRowEls=$$('.total-row',table);
  var subtotalEl=totalRowEls[0]&&getEditable(totalRowEls[0].cells[totalRowEls[0].cells.length-1]);
  var laborEl   =totalRowEls[1]&&getEditable(totalRowEls[1].cells[totalRowEls[1].cells.length-1]);
  var grandRow  =table.querySelector('.grand-total-row');
  var grandEl   =grandRow&&getEditable(grandRow.cells[grandRow.cells.length-1]);

  function calcPartsSum(){
    var sum=0;
    rows.forEach(function(row){
      var el=getEditable(row.cells[ti]);
      if(el)sum+=parseMoney(el.textContent);
    });
    return sum;
  }

  function updateTotals(){
    var parts=calcPartsSum();
    if(subtotalEl){subtotalEl.textContent=formatMoney(parts);markAuto(subtotalEl);}
    var labor=laborEl?parseMoney(laborEl.textContent):0;
    if(grandEl){grandEl.textContent=formatMoney(parts+labor);markAuto(grandEl);}
  }

  rows.forEach(function(row){
    var qtyEl  =getEditable(row.cells[qi]);
    var priceEl=getEditable(row.cells[pi]);
    var lineEl =getEditable(row.cells[ti]);
    if(!qtyEl||!priceEl||!lineEl)return;

    function calcLine(){
      var qty=parseMoney(qtyEl.textContent);
      var price=parseMoney(priceEl.textContent);
      if(qty>0&&price>0){lineEl.textContent=formatMoney(qty*price);markAuto(lineEl);}
      updateTotals();
    }

    qtyEl.addEventListener('blur',calcLine);
    priceEl.addEventListener('blur',function(){
      var v=parseMoney(priceEl.textContent);
      if(v>0){priceEl.textContent=formatMoney(v);markAuto(priceEl);}
      calcLine();
    });
  });

  // Labor field changes → grand total
  if(laborEl){
    laborEl.addEventListener('blur',function(){
      var v=parseMoney(laborEl.textContent);
      if(v>0){laborEl.textContent=formatMoney(v);markAuto(laborEl);}
      updateTotals();
    });
  }

  // Labor Hours × Rate → Labor Total → Grand Total
  wireAutoLabor(laborEl,updateTotals);
}

function wireFlooring(table,sqftIdx,matRateIdx,matTotalIdx,labRateIdx,labTotalIdx,roomTotalIdx){
  var rows=dataRows(table);

  function calcRow(row){
    var sqft =parseMoney(getEditable(row.cells[sqftIdx])&&getEditable(row.cells[sqftIdx]).textContent);
    var matR =parseMoney(getEditable(row.cells[matRateIdx])&&getEditable(row.cells[matRateIdx]).textContent);
    var labR =labRateIdx>-1?parseMoney(getEditable(row.cells[labRateIdx])&&getEditable(row.cells[labRateIdx]).textContent):0;
    var matT =sqft*matR;
    var labT =sqft*labR;
    var roomT=matT+labT;
    if(matTotalIdx>-1&&getEditable(row.cells[matTotalIdx])&&(sqft>0||matR>0)){
      getEditable(row.cells[matTotalIdx]).textContent=formatMoney(matT);markAuto(getEditable(row.cells[matTotalIdx]));
    }
    if(labTotalIdx>-1&&getEditable(row.cells[labTotalIdx])&&(sqft>0||labR>0)){
      getEditable(row.cells[labTotalIdx]).textContent=formatMoney(labT);markAuto(getEditable(row.cells[labTotalIdx]));
    }
    if(roomTotalIdx>-1&&getEditable(row.cells[roomTotalIdx])&&(sqft>0)){
      getEditable(row.cells[roomTotalIdx]).textContent=formatMoney(roomT);markAuto(getEditable(row.cells[roomTotalIdx]));
    }
    calcFlooringGrand(table,roomTotalIdx);
  }

  rows.forEach(function(row){
    [sqftIdx,matRateIdx,labRateIdx].forEach(function(idx){
      if(idx<0)return;
      var el=getEditable(row.cells[idx]);
      if(el)el.addEventListener('blur',function(){calcRow(row);});
    });
  });
}

function calcFlooringGrand(table,roomTotalIdx){
  if(roomTotalIdx<0)return;
  var sum=0;
  dataRows(table).forEach(function(row){
    var el=getEditable(row.cells[roomTotalIdx]);
    if(el)sum+=parseMoney(el.textContent);
  });
  var totalRowEls=$$('.total-row',table);
  if(totalRowEls[0]){
    var el=getEditable(totalRowEls[0].cells[totalRowEls[0].cells.length-1]);
    if(el){el.textContent=formatMoney(sum);markAuto(el);}
  }
  var grandRow=table.querySelector('.grand-total-row');
  if(grandRow){
    var el=getEditable(grandRow.cells[grandRow.cells.length-1]);
    if(el){el.textContent=formatMoney(sum);markAuto(el);}
  }
}

// ── Auto Labor: Labor Hours × Rate → Labor Total ──────────────────────────────
function wireAutoLabor(laborTotalEl,onUpdate){
  var laborHoursEl=null,laborRateEl=null;
  $$('.field').forEach(function(field){
    var lbl=field.querySelector('label');
    if(!lbl)return;
    var txt=lbl.textContent.trim().toLowerCase();
    if(!laborHoursEl&&(txt==='labor hours'||txt==='hours'||txt==='labor hrs'))
      laborHoursEl=field.querySelector('.editable');
    if(!laborRateEl&&(txt==='labor rate ($/hr)'||txt==='labor rate'||txt==='hourly rate'||txt==='rate ($/hr)'))
      laborRateEl=field.querySelector('.editable');
  });
  if(!laborHoursEl||!laborRateEl||!laborTotalEl)return;

  function calcLabor(){
    var hrs=parseMoney(laborHoursEl.textContent);
    var rate=parseMoney(laborRateEl.textContent);
    if(hrs>0&&rate>0){
      laborTotalEl.textContent=formatMoney(hrs*rate);
      markAuto(laborTotalEl);
      if(onUpdate)onUpdate();
    }
  }
  laborHoursEl.addEventListener('blur',calcLabor);
  laborRateEl.addEventListener('blur',function(){
    var v=parseMoney(laborRateEl.textContent);
    if(v>0)laborRateEl.textContent=formatMoney(v)+'/hr';
    calcLabor();
  });
}

// ── 3. Generic Currency Formatting ───────────────────────────────────────────
function initCurrencyFormat(){
  $$('[data-placeholder]').forEach(function(el){
    if(el.closest('.form-table'))return; // handled by invoice calc
    var ph=el.getAttribute('data-placeholder')||'';
    if(!ph.startsWith('$')&&!ph.endsWith('0.00'))return;
    el.addEventListener('blur',function(){
      var v=parseMoney(el.textContent);
      if(v>0){el.textContent=formatMoney(v);markAuto(el);}
    });
  });
}

// ── Auto-calculated field styling ─────────────────────────────────────────────
function markAuto(el){
  if(!el)return;
  el.style.color='#1a7a4a';
  el.style.fontWeight='700';
}

// ── 4. Smart Indicator ────────────────────────────────────────────────────────
function initIndicator(){
  var tip=document.querySelector('.toolbar-tip');
  if(!tip)return;
  var badge=document.createElement('span');
  badge.style.cssText='display:inline-flex;align-items:center;gap:5px;'
    +'background:rgba(232,93,4,0.08);border:1px solid rgba(232,93,4,0.22);'
    +'color:#e85d04;font-size:7.5pt;font-weight:800;padding:3px 10px;'
    +'border-radius:10px;letter-spacing:0.3px;margin-right:6px;white-space:nowrap;';
  badge.innerHTML='<span style="width:6px;height:6px;border-radius:50%;'
    +'background:#e85d04;display:inline-block;flex-shrink:0;"></span>Smart Mode';
  tip.parentNode.insertBefore(badge,tip);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  initMemory();
  initInvoiceCalc();
  initCurrencyFormat();
  initIndicator();
});

})();
</script>`;

// ─── Injection script ─────────────────────────────────────────────────────────

const files = fs.readdirSync(downloadsDir)
  .filter(f => f.match(/^LS-\d+.*\.html$/))
  .sort();

let updated = 0, skipped = 0;

for (const file of files) {
  const filePath = path.join(downloadsDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('initSmartCalc') || html.includes('initInvoiceCalc')) {
    console.log(`⏭ Already smart: ${file.slice(0, 35)}`);
    skipped++;
    continue;
  }

  // Inject right before the AI script block (which starts with \n<script>\n// ── AI Analysis)
  // For LS-001 the marker is slightly different — both cases end with </style>\n</body></html>
  // Strategy: inject our script block just before </body></html>
  const marker = '</body></html>';
  if (!html.includes(marker)) {
    console.log(`⚠ No </body></html> in ${file}`);
    continue;
  }

  // Place smart engine just before the closing tags
  html = html.replace(marker, SMART_ENGINE + '\n' + marker);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ ${file.slice(0, 50)}`);
  updated++;
}

console.log(`\n📊 Done — ${updated} updated, ${skipped} already smart`);

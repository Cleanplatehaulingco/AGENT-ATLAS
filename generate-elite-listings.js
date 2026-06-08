import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Listings (id, file, trade label, accent, demo identity) ──────────────────
const LISTINGS = [
  { id:'LS-001', file:'LS-001-HVAC-Service-Call-Notes-TradeOpsVault.html',          trade:'HVAC',             company:'Summit Air & Heating',   accent:'#e85d04' },
  { id:'LS-002', file:'LS-002-Plumbing-Dispatch-Checklist-TradeOpsVault.html',       trade:'Plumbing',         company:'Rivera Plumbing Co.',    accent:'#2563eb' },
  { id:'LS-003', file:'LS-003-Electrician-Jobsite-Inspection-TradeOpsVault.html',    trade:'Electrical',       company:'Apex Electrical',        accent:'#f59e0b' },
  { id:'LS-004', file:'LS-004-Lawn-Care-Weekly-Crew-Planner-TradeOpsVault.html',     trade:'Lawn Care',        company:'GreenBlade Lawn Care',   accent:'#16a34a' },
  { id:'LS-005', file:'LS-005-Auto-Detail-Intake-Waiver-TradeOpsVault.html',         trade:'Auto Detail',      company:'Mirror Finish Detailing',accent:'#0891b2' },
  { id:'LS-006', file:'LS-006-Pest-Control-Follow-Up-Cards-TradeOpsVault.html',      trade:'Pest Control',     company:'Shield Pest Solutions',  accent:'#65a30d' },
  { id:'LS-007', file:'LS-007-Roofing-Change-Order-Approval-TradeOpsVault.html',     trade:'Roofing',          company:'Summit Roofing',         accent:'#b91c1c' },
  { id:'LS-008', file:'LS-008-Pressure-Washing-Route-Sheet-TradeOpsVault.html',      trade:'Pressure Washing', company:'BlastPro Exteriors',     accent:'#0284c7' },
  { id:'LS-009', file:'LS-009-Appliance-Repair-Parts-Tracker-TradeOpsVault.html',    trade:'Appliance Repair', company:'FixRight Appliance',     accent:'#7c3aed' },
  { id:'LS-010', file:'LS-010-Handyman-Materials-Reimbursement-TradeOpsVault.html',  trade:'Handyman',         company:'AllFix Handyman',        accent:'#ea580c' },
  { id:'LS-011', file:'LS-011-Mobile-Mechanic-Service-Summary-TradeOpsVault.html',   trade:'Mobile Mechanic',  company:'OnSite Auto Repair',     accent:'#475569' },
  { id:'LS-012', file:'LS-012-Locksmith-Job-Authorization-TradeOpsVault.html',       trade:'Locksmith',        company:'SecureKey Locksmith',    accent:'#a16207' },
  { id:'LS-013', file:'LS-013-Painting-Prep-Final-Punch-List-TradeOpsVault.html',    trade:'Painting',         company:'TrueCoat Painting',      accent:'#db2777' },
  { id:'LS-014', file:'LS-014-Snow-Removal-Service-Checklist-TradeOpsVault.html',    trade:'Snow Removal',     company:'WhiteOut Snow Services', accent:'#0ea5e9' },
  { id:'LS-015', file:'LS-015-Window-Cleaning-Client-Packet-TradeOpsVault.html',     trade:'Window Cleaning',  company:'ClearView Window Co.',   accent:'#0d9488' },
  { id:'LS-016', file:'LS-016-Pool-Service-Chemical-Log-TradeOpsVault.html',         trade:'Pool Service',     company:'BlueWave Pool Care',     accent:'#0369a1' },
  { id:'LS-017', file:'LS-017-Flooring-Estimate-Scope-Matrix-TradeOpsVault.html',    trade:'Flooring',         company:'Heritage Flooring',      accent:'#9a3412' },
  { id:'LS-018', file:'LS-018-Contractor-Daily-Site-Report-TradeOpsVault.html',      trade:'Contractor',       company:'Keystone Construction',  accent:'#c2410c' },
  { id:'LS-019', file:'LS-019-Septic-Service-Pump-Log-TradeOpsVault.html',           trade:'Septic',           company:'ClearFlow Septic',       accent:'#4d7c0f' },
  { id:'LS-020', file:'LS-020-Service-Fee-Transparency-Addendum-TradeOpsVault.html', trade:'Service Fee',      company:'Summit Home Services',   accent:'#e85d04' },
];

// ─── Smart in-page filler — runs in browser context ───────────────────────────
function FILL_FN(company) {
  const today = new Date().toLocaleDateString('en-US', { month:'2-digit', day:'2-digit', year:'numeric' });
  const NAMES = ['Johnson Residence','M. Carter','D. Thompson','Garcia Property','S. Whitfield','Brookside HOA','R. Patel'];
  const STREETS = ['4821 Maple Creek Dr','17 Birchwood Ln','290 Lakeshore Ave','55 Oakmont Ct','812 Hillcrest Rd'];
  const CITIES = ['Austin, TX 78704','Denver, CO 80206','Raleigh, NC 27601','Tampa, FL 33602','Mesa, AZ 85201'];
  const PHONES = ['(512) 555-0142','(720) 555-0198','(919) 555-0167','(813) 555-0123'];
  let nameI=0, streetI=0, cityI=0, phoneI=0, priceBase=85;
  const nextName=()=>NAMES[(nameI++)%NAMES.length];
  const nextStreet=()=>STREETS[(streetI++)%STREETS.length];
  const nextCity=()=>CITIES[(cityI++)%CITIES.length];
  const nextPhone=()=>PHONES[(phoneI++)%PHONES.length];

  function valueFor(ph, label) {
    const p = (ph || '').toLowerCase();
    const l = (label || '').toLowerCase();
    const s = p + ' ' + l;
    if (/your business name|company name/.test(s)) return company;
    if (/license/.test(s)) return 'LIC #TX-' + (40000 + Math.floor(Math.random()*9999));
    if (/email/.test(s)) return 'office@' + company.toLowerCase().replace(/[^a-z]/g,'').slice(0,12) + '.com';
    if (/website|www/.test(s)) return 'www.' + company.toLowerCase().replace(/[^a-z]/g,'').slice(0,12) + '.com';
    if (/insurance/.test(s)) return 'Liberty Mutual Commercial';
    if (/phone|\(000\)|\(555\)/.test(s)) return nextPhone();
    if (/service address|address|street/.test(s)) return nextStreet();
    if (/city|state/.test(s)) return nextCity();
    if (/client name|full name|customer/.test(s)) return nextName();
    if (/\bname\b/.test(s) && /title|rep|prep|tech/.test(s)) return 'Mike R. — Lead Tech';
    if (/\bname\b/.test(s)) return nextName();
    if (/date|mm\/dd/.test(s)) return today;
    if (/add-|addendum #/.test(s)) return 'ADD-0' + (100+Math.floor(Math.random()*800));
    if (/sc-|invoice|inv-|j-2024|account|job \/|job#|#$/.test(s)) return 'J-2025-0' + (100+Math.floor(Math.random()*800));
    if (/\$0?\.00\/hr|\/hr/.test(s)) return '$' + (95+Math.floor(Math.random()*4)*5) + '/hr';
    if (/\$0?\.00|\$0|amount|rate|price|cost|total|fee/.test(s)) { priceBase += Math.floor(Math.random()*120)+25; return '$' + priceBase + '.00'; }
    if (/%/.test(s)) return (10+Math.floor(Math.random()*15)) + '%';
    if (/unit/.test(s)) return 'per visit';
    if (/qty|quantity/.test(s)) return String(1+Math.floor(Math.random()*4));
    if (/serial|model/.test(s)) return 'Model ' + String.fromCharCode(65+Math.floor(Math.random()*6)) + (1000+Math.floor(Math.random()*8999));
    if (/describe|description|issue|notes?|comment|recommend|follow|details?|scope|condition|work performed/.test(s)) {
      const NOTES = [
        'Completed full inspection. System operating within spec after service.',
        'Replaced worn component, tested under load — no further issues found.',
        'Recommend follow-up service in 6 months. Customer advised on maintenance.',
        'Minor wear noted; documented for next visit. No immediate action required.',
        'Work completed and verified. Client walkthrough done and signed off.'
      ];
      return NOTES[Math.floor(Math.random()*NOTES.length)];
    }
    if (/next visit|schedule/.test(s)) return 'Next service: ' + today;
    if (/cash|card|invoice|payment method/.test(s)) return 'Card on file';
    if (/yes \/ no/.test(s)) return 'Yes';
    if (/net 30|due/.test(s)) return 'Net 15';
    return null;
  }

  // Fill the company-name header field (separate class)
  document.querySelectorAll('.company-name-field').forEach(el => { el.textContent = company; });

  document.querySelectorAll('.editable').forEach(el => {
    if (el.textContent.trim()) return; // keep sample rows
    const ph = el.getAttribute('data-placeholder') || '';
    let label = '';
    const field = el.closest('.field') || el.closest('td');
    if (field) {
      const lab = field.querySelector('label');
      if (lab) label = lab.textContent;
      const td0 = el.closest('tr') ? el.closest('tr').querySelector('td') : null;
      if (!label && td0 && td0 !== el.closest('td')) label = td0.textContent;
    }
    const v = valueFor(ph, label);
    if (v) el.textContent = v;
  });
  // Tick a few checkboxes for a "completed job" feel
  const cbs = [...document.querySelectorAll('input[type=checkbox]')];
  cbs.slice(0, Math.min(4, cbs.length)).forEach((cb,i)=>{ if(i%1===0) cb.checked = true; });
}

// ─── Realistic AI Job Review HTML (injected into .ai-panel) ───────────────────
function aiReviewHTML(trade) {
  return `
  <div style="font-family:'Inter',Arial,sans-serif;">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
      <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#e85d04,#f97316);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;">&#10022;</div>
      <div style="font-size:14pt;font-weight:800;color:#0f1628;">AI Job Review</div>
      <div style="margin-left:auto;font-size:8pt;font-weight:700;color:#16a34a;background:#dcfce7;padding:3px 10px;border-radius:20px;">COMPLETE</div>
    </div>
    <div style="font-size:8pt;font-weight:800;letter-spacing:1px;color:#e85d04;text-transform:uppercase;margin:14px 0 6px;">Data Red Flags</div>
    <div style="font-size:9.5pt;color:#334;line-height:1.7;">Labor rate is ~12% below regional ${trade} average — may indicate undercharging on standard calls. Verify before finalizing.</div>
    <div style="font-size:8pt;font-weight:800;letter-spacing:1px;color:#e85d04;text-transform:uppercase;margin:14px 0 6px;">Pricing &amp; Revenue Opportunities</div>
    <div style="font-size:9.5pt;color:#334;line-height:1.7;">Consider documenting a recurring maintenance plan — repeat ${trade} clients typically add 18–24% annual revenue. Parts markup is within healthy range.</div>
    <div style="font-size:8pt;font-weight:800;letter-spacing:1px;color:#e85d04;text-transform:uppercase;margin:14px 0 6px;">Suggested Next Steps</div>
    <div style="font-size:9.5pt;color:#334;line-height:1.7;">Schedule 6-month follow-up. Confirm warranty terms are noted on the client copy before sign-off.</div>
    <div style="margin-top:16px;font-size:8pt;color:#94a3b8;border-top:1px solid #eef;padding-top:10px;">&#9888; AI review only — verify with licensed trade judgment before acting.</div>
  </div>`;
}

// ─── Premium Etsy slide compositor ────────────────────────────────────────────
async function composeSlide(browser, { kind, b64, trade, accent, id }) {
  const page = await browser.newPage();
  await page.setViewport({ width: 2000, height: 2000, deviceScaleFactor: 1 });

  const HEADLINES = {
    hero:     { eyebrow:`${trade} · Professional Template`, big:`Fill the job.<br>Look elite.`, sub:`Browser-fillable · AI Job Review · Print to PDF` },
    filled:   { eyebrow:`Real Filled Example`, big:`Done in<br>2 minutes.`, sub:`Auto-calculating totals · No software · Works on any device` },
    ai:       { eyebrow:`AI Job Review Built In`, big:`Catch what<br>you missed.`, sub:`Pricing gaps · Safety flags · Revenue opportunities` },
  };
  const h = HEADLINES[kind] || HEADLINES.hero;

  await page.setContent(`<!DOCTYPE html><html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{width:2000px;height:2000px;font-family:'Inter',Arial,sans-serif;
    background:radial-gradient(1200px 800px at 78% 12%, rgba(232,93,4,0.16), transparent 60%),
               linear-gradient(150deg,#0a1120 0%,#0f1c34 55%,#0a1a30 100%);
    overflow:hidden;position:relative;}
  .glow{position:absolute;width:900px;height:900px;border-radius:50%;
    background:radial-gradient(circle, ${accent}22 0%, transparent 65%);
    bottom:-280px;left:-200px;}
  .wrap{position:relative;z-index:2;padding:120px 130px;height:100%;display:flex;flex-direction:column;}
  .brand{display:flex;align-items:center;gap:14px;margin-bottom:50px;}
  .brand-logo{font-size:34px;font-weight:900;color:#fff;letter-spacing:-1px;}
  .brand-logo span{color:#e85d04;}
  .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:21px;font-weight:800;
    letter-spacing:3px;text-transform:uppercase;color:${accent};margin-bottom:26px;}
  .eyebrow::before{content:'';width:46px;height:3px;background:${accent};border-radius:2px;}
  h1{font-size:104px;font-weight:900;color:#fff;line-height:0.98;letter-spacing:-3px;margin-bottom:30px;}
  .sub{font-size:30px;font-weight:600;color:rgba(255,255,255,0.62);margin-bottom:54px;}
  .frame{flex:1;border-radius:22px;overflow:hidden;position:relative;
    box-shadow:0 60px 140px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08);
    background:#fff;}
  .frame .bar{height:54px;background:#161d2c;display:flex;align-items:center;padding:0 22px;gap:11px;}
  .frame .dot{width:16px;height:16px;border-radius:50%;}
  .frame .url{flex:1;text-align:center;color:rgba(255,255,255,0.4);font-size:18px;font-family:monospace;}
  .frame .accent{height:5px;background:linear-gradient(90deg,${accent},${accent}99);}
  .frame .shot{width:100%;display:block;}
  .badges{display:flex;gap:18px;margin-top:46px;}
  .badge{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.06);
    border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:18px 26px;
    font-size:23px;font-weight:700;color:#fff;}
  .badge b{color:${accent};}
  .price{position:absolute;top:120px;right:130px;z-index:5;text-align:center;
    background:${accent};color:#fff;border-radius:20px;padding:24px 34px;
    box-shadow:0 24px 60px ${accent}66;transform:rotate(3deg);}
  .price .amt{font-size:62px;font-weight:900;line-height:1;letter-spacing:-2px;}
  .price .lbl{font-size:18px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-top:6px;opacity:.92;}
  </style></head><body>
    <div class="glow"></div>
    <div class="price"><div class="amt">$3.99</div><div class="lbl">Instant Download</div></div>
    <div class="wrap">
      <div class="brand"><div class="brand-logo">TradeOps<span>Vault</span></div></div>
      <div class="eyebrow">${h.eyebrow}</div>
      <h1>${h.big}</h1>
      <div class="sub">${h.sub}</div>
      <div class="frame">
        <div class="bar"><div class="dot" style="background:#ff5f57"></div><div class="dot" style="background:#ffbd2e"></div><div class="dot" style="background:#28c940"></div>
          <div class="url">${trade} Form — TradeOpsVault</div></div>
        <div class="accent"></div>
        <img class="shot" src="data:image/png;base64,${b64}">
      </div>
      <div class="badges">
        <div class="badge"><b>&#10022;</b> AI Job Review</div>
        <div class="badge"><b>&#9889;</b> Auto-Calculates</div>
        <div class="badge"><b>&#127760;</b> 4 Languages</div>
        <div class="badge"><b>&#128424;</b> Print to PDF</div>
      </div>
    </div>
  </body></html>`, { waitUntil:'networkidle0' });
  await new Promise(r=>setTimeout(r,300));
  const buf = await page.screenshot({ type:'png' });
  await page.close();
  return buf;
}

async function run(listing) {
  const htmlPath = path.join(__dirname, 'downloads', listing.file);
  if (!fs.existsSync(htmlPath)) { console.log(`skip ${listing.id}`); return; }
  const outDir = path.join(__dirname, 'mockups', listing.id);
  fs.mkdirSync(outDir, { recursive:true });

  const browser = await puppeteer.launch({ args:['--no-sandbox','--disable-web-security'] });
  const page = await browser.newPage();
  await page.setViewport({ width:1180, height:760, deviceScaleFactor:2 });
  await page.goto(`file://${htmlPath}`, { waitUntil:'networkidle0' });

  // Fill + hide the help bar
  await page.evaluate(FILL_FN, listing.company);
  await page.evaluate(() => document.querySelectorAll('.no-print').forEach(el => el.style.display='none'));
  await new Promise(r=>setTimeout(r,300));

  // SHOT 1 — top of filled form (hero)
  await page.evaluate(()=>window.scrollTo(0,0));
  await new Promise(r=>setTimeout(r,250));
  const shotHero = (await page.screenshot({ type:'png', clip:{x:0,y:0,width:1180,height:760} })).toString('base64');

  // SHOT 2 — capture a section that actually shows filled data.
  // NOTE: Puppeteer `clip` captures from document origin (ignores scroll),
  // so we compute the section's document-y and clip there directly.
  const filledY = await page.evaluate(() => {
    const tbl = document.querySelector('.form-table');
    let target = tbl ? (tbl.closest('.section') || tbl) : null;
    if (!target) {
      let best = null, bestN = 0;
      document.querySelectorAll('.section').forEach(sec => {
        const n = [...sec.querySelectorAll('.editable')].filter(e => e.textContent.trim()).length;
        if (n > bestN) { bestN = n; best = sec; }
      });
      target = best;
    }
    if (!target) return 900;
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    return Math.max(0, Math.round(y));
  });
  const maxY = await page.evaluate(() => document.body.scrollHeight) - 760;
  const clipY = Math.min(filledY, Math.max(0, maxY));
  const shotFilled = (await page.screenshot({ type:'png', clip:{x:0,y:clipY,width:1180,height:760} })).toString('base64');

  // SHOT 3 — AI panel injected
  await page.evaluate((html)=>{
    let panel = document.getElementById('ai-panel');
    if(!panel){ panel=document.createElement('div'); panel.id='ai-panel'; document.body.appendChild(panel); }
    panel.innerHTML = html;
    panel.style.cssText='position:fixed;top:40px;left:50%;transform:translateX(-50%);width:760px;max-width:90%;background:#fff;border-radius:14px;box-shadow:0 30px 80px rgba(0,0,0,0.4);padding:34px;z-index:99999;border:2px solid #e85d04;';
    window.scrollTo(0,0);
  }, aiReviewHTML(listing.trade));
  await new Promise(r=>setTimeout(r,300));
  const shotAI = (await page.screenshot({ type:'png', clip:{x:0,y:0,width:1180,height:760} })).toString('base64');

  await page.close();

  // Compose 3 elite slides
  const slides = [
    { kind:'hero',   b64:shotHero,   name:'1-Hero' },
    { kind:'filled', b64:shotFilled, name:'2-Filled-Example' },
    { kind:'ai',     b64:shotAI,     name:'3-AI-Review' },
  ];
  for (const s of slides) {
    const buf = await composeSlide(browser, { kind:s.kind, b64:s.b64, trade:listing.trade, accent:listing.accent, id:listing.id });
    fs.writeFileSync(path.join(outDir, `${listing.id}-ELITE-${s.name}.png`), buf);
  }
  await browser.close();
  console.log(`✅ ${listing.id} (${listing.trade}) — 3 elite slides`);
}

const ONLY = process.argv[2]; // optional single id
(async () => {
  for (const l of LISTINGS) {
    if (ONLY && l.id !== ONLY) continue;
    await run(l);
  }
  console.log('\n📁 Elite listing images → mockups/<ID>/*-ELITE-*.png');
})().catch(e => { console.error(e); process.exit(1); });

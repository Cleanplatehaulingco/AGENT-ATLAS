import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LISTINGS = [
  'LS-001-HVAC-Service-Call-Notes',
  'LS-002-Plumbing-Dispatch-Checklist',
  'LS-003-Electrician-Jobsite-Inspection',
  'LS-004-Lawn-Care-Weekly-Crew-Planner',
  'LS-005-Auto-Detail-Intake-Waiver',
  'LS-006-Pest-Control-Follow-Up-Cards',
  'LS-007-Roofing-Change-Order-Approval',
  'LS-008-Pressure-Washing-Route-Sheet',
  'LS-009-Appliance-Repair-Parts-Tracker',
  'LS-010-Handyman-Materials-Reimbursement',
  'LS-011-Mobile-Mechanic-Service-Summary',
  'LS-012-Locksmith-Job-Authorization',
  'LS-013-Painting-Prep-Final-Punch-List',
  'LS-014-Snow-Removal-Service-Checklist',
  'LS-015-Window-Cleaning-Client-Packet',
  'LS-016-Pool-Service-Chemical-Log',
  'LS-017-Flooring-Estimate-Scope-Matrix',
  'LS-018-Contractor-Daily-Site-Report',
  'LS-019-Septic-Service-Pump-Log',
  'LS-020-Service-Fee-Transparency-Addendum',
];

async function generate() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] });
  const outDir = path.join(__dirname, 'mockups', 'LS-BUNDLE');
  fs.mkdirSync(outDir, { recursive: true });

  // Capture thumbnail of each form's cover
  const thumbs = [];
  for (const name of LISTINGS) {
    const htmlPath = path.join(__dirname, 'downloads', `${name}-TradeOpsVault.html`);
    if (!fs.existsSync(htmlPath)) continue;
    const page = await browser.newPage();
    await page.setViewport({ width: 880, height: 480, deviceScaleFactor: 1.5 });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none'));
    const raw = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 880, height: 480 } });
    thumbs.push(raw.toString('base64'));
    await page.close();
    console.log(`  📄 ${name.split('-').slice(0, 3).join('-')}`);
  }

  // Build the fan mockup HTML
  const thumbImgs = thumbs.map((b64, i) => {
    const angle = (i - 9.5) * 4.5;
    const tx = (i - 9.5) * 18;
    const ty = Math.abs(i - 9.5) * 2;
    return `<img src="data:image/png;base64,${b64}" style="
      position:absolute; width:220px; height:120px;
      border-radius:6px; border:2px solid rgba(255,255,255,0.15);
      box-shadow:0 8px 24px rgba(0,0,0,0.5);
      transform:rotate(${angle}deg) translate(${tx}px,${ty}px);
      transform-origin:center bottom;
      object-fit:cover; object-position:top;
    ">`;
  }).join('');

  const shots = [
    // Shot 1: Hero — fan of all 20 forms
    {
      name: '1-Bundle-Hero',
      html: `<!DOCTYPE html><html><head><style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:linear-gradient(145deg,#0d1526 0%,#1a2744 60%,#0f2040 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif; position:relative; overflow:hidden;
}
body::before { content:""; position:absolute; top:-200px; right:-200px; width:700px; height:700px; border-radius:50%; background:radial-gradient(circle,rgba(232,93,4,0.15) 0%,transparent 70%); }
.fan { position:relative; width:1200px; height:420px; margin-bottom:40px; display:flex; align-items:flex-end; justify-content:center; }
h1 { color:#fff; font-size:58px; font-weight:900; text-transform:uppercase; letter-spacing:-1px; text-align:center; line-height:1.1; position:relative; }
h1 span { color:#e85d04; }
.sub { color:rgba(255,255,255,0.55); font-size:22px; text-align:center; margin-top:12px; position:relative; }
.price-row { display:flex; align-items:center; gap:28px; margin-top:28px; position:relative; }
.price { color:#e85d04; font-size:72px; font-weight:900; line-height:1; }
.was { color:rgba(255,255,255,0.3); font-size:28px; text-decoration:line-through; }
.save { background:#e85d04; color:#fff; padding:8px 20px; border-radius:20px; font-size:16px; font-weight:800; letter-spacing:1px; }
.pills { display:flex; gap:20px; margin-top:24px; position:relative; }
.pill { background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.15); border-radius:30px; padding:10px 22px; color:rgba(255,255,255,0.75); font-size:15px; font-weight:700; }
</style></head><body>
<div class="fan">${thumbImgs}</div>
<h1>Complete Trades<br><span>Forms Bundle</span></h1>
<div class="sub">All 20 professional templates — every trade covered</div>
<div class="price-row">
  <div class="price">$9.99</div>
  <div class="was">$79.80</div>
  <div class="save">SAVE 87%</div>
</div>
<div class="pills">
  <div class="pill">20 Templates</div>
  <div class="pill">No Software Needed</div>
  <div class="pill">Instant Download</div>
  <div class="pill">Unlimited Reprints</div>
</div>
</body></html>`,
    },
    // Shot 2: What's in the bundle grid
    {
      name: '2-Whats-Inside',
      html: `<!DOCTYPE html><html><head><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { width:1500px; height:1500px; background:#f5f7ff; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'Segoe UI',Arial,sans-serif; padding:50px; }
.badge { background:linear-gradient(135deg,#0f1628,#1a2744); color:#fff; padding:10px 28px; border-radius:30px; font-size:14px; font-weight:800; letter-spacing:2px; text-transform:uppercase; margin-bottom:24px; }
h1 { color:#1a1a2e; font-size:50px; font-weight:900; text-align:center; text-transform:uppercase; margin-bottom:8px; }
h1 span { color:#e85d04; }
.sub { color:#667; font-size:18px; text-align:center; margin-bottom:36px; }
.grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; width:100%; margin-bottom:32px; }
.item { background:#fff; border-radius:10px; padding:16px 18px; border-left:4px solid #e85d04; box-shadow:0 2px 12px rgba(0,0,0,0.06); }
.item-id { font-size:9px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#e85d04; margin-bottom:4px; }
.item-name { font-size:13px; font-weight:700; color:#1a1a2e; line-height:1.3; }
.bottom { background:linear-gradient(135deg,#0f1628,#1a2744); border-radius:16px; padding:28px 48px; display:flex; align-items:center; justify-content:space-between; width:100%; }
.b-text { color:#fff; font-size:20px; font-weight:700; }
.b-text span { color:#e85d04; }
.b-price { color:#e85d04; font-size:48px; font-weight:900; }
</style></head><body>
<div class="badge">TradeOpsVault · Complete Bundle</div>
<h1>20 Forms. <span>Every Trade.</span></h1>
<div class="sub">One download covers your entire operation</div>
<div class="grid">
  ${['HVAC Service Call Notes','Plumbing Dispatch Checklist','Electrician Jobsite Inspection','Lawn Care Crew Planner','Auto Detail Intake + Waiver','Pest Control Follow-Up Cards','Roofing Change Order Approval','Pressure Washing Route Sheet','Appliance Repair Parts Tracker','Handyman Materials Log','Mobile Mechanic Service Summary','Locksmith Job Authorization','Painting Prep Punch List','Snow Removal Checklist','Window Cleaning Client Packet','Pool Service Chemical Log','Flooring Estimate Matrix','Contractor Daily Site Report','Septic Service Pump Log','Fee Transparency Addendum'].map((n,i) => `<div class="item"><div class="item-id">LS-${String(i+1).padStart(3,'0')}</div><div class="item-name">${n}</div></div>`).join('')}
</div>
<div class="bottom">
  <div class="b-text">All 20 templates · No software needed · <span>Browser fillable</span> · Unlimited reprints</div>
  <div class="b-price">$9.99</div>
</div>
</body></html>`,
    },
  ];

  for (const s of shots) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    await page.setContent(s.html, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    const outFile = path.join(outDir, `LS-BUNDLE-${s.name}.png`);
    await page.screenshot({ path: outFile, type: 'png' });
    await page.close();
    console.log(`✅ ${path.basename(outFile)}`);
  }

  await browser.close();
  console.log('\n📁 Bundle mockups → mockups/LS-BUNDLE/');
}

generate().catch(console.error);

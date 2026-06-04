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
];

async function generate() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] });
  const outDir = path.join(__dirname, 'mockups', 'LS-BUNDLE');
  fs.mkdirSync(outDir, { recursive: true });

  // Capture top section of first 10 forms (portrait crop)
  const thumbs = [];
  for (const name of LISTINGS) {
    const htmlPath = path.join(__dirname, 'downloads', `${name}-TradeOpsVault.html`);
    if (!fs.existsSync(htmlPath)) continue;
    const page = await browser.newPage();
    await page.setViewport({ width: 880, height: 1140, deviceScaleFactor: 1.5 });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none'));
    const raw = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 880, height: 1140 } });
    thumbs.push(raw.toString('base64'));
    await page.close();
    process.stdout.write(`  ✓ ${name.split('-')[1]}\n`);
  }

  // ── SHOT 1: Hero — white bg, forms fanned, bold title ─────────────────────
  const fanImgs = thumbs.map((b64, i) => {
    const total = thumbs.length;
    const center = (total - 1) / 2;
    const angle = (i - center) * 5;
    const tx = (i - center) * 42;
    const ty = Math.abs(i - center) * 3;
    const zIndex = i === Math.floor(center) ? 20 : 10 - Math.abs(i - center);
    return `<img src="data:image/png;base64,${b64}" style="
      position:absolute;
      width:200px; height:260px;
      border-radius:6px;
      border:1.5px solid #dde2f0;
      box-shadow:0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.1);
      transform:rotate(${angle}deg) translateX(${tx}px) translateY(${ty}px);
      transform-origin:center bottom;
      object-fit:cover; object-position:top;
      z-index:${zIndex};
      overflow:hidden;
    ">`;
  }).join('');

  const shot1 = `<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:#fff;
  display:flex; flex-direction:column; align-items:center; justify-content:flex-start;
  font-family:'Segoe UI',Arial,sans-serif;
  padding-top:80px;
}
.top-tag {
  font-size:13px; font-weight:800; letter-spacing:4px;
  text-transform:uppercase; color:#8899cc; margin-bottom:20px;
}
.fan {
  position:relative; width:900px; height:380px;
  display:flex; align-items:flex-end; justify-content:center;
  margin-bottom:44px;
}
h1 {
  font-size:72px; font-weight:900; color:#0d1526;
  text-transform:uppercase; letter-spacing:-2px;
  text-align:center; line-height:1; margin-bottom:10px;
}
h1 span { color:#e85d04; }
.sub {
  font-size:20px; color:#667; text-align:center;
  margin-bottom:32px; font-weight:500;
}
.price-row {
  display:flex; align-items:center; gap:20px; margin-bottom:32px;
}
.price {
  font-size:80px; font-weight:900; color:#0d1526; line-height:1;
}
.was {
  font-size:28px; color:#ccc; text-decoration:line-through; font-weight:600;
}
.save-badge {
  background:#e85d04; color:#fff; padding:10px 22px;
  border-radius:30px; font-size:16px; font-weight:900;
  letter-spacing:1px; text-transform:uppercase;
  box-shadow:0 6px 20px rgba(232,93,4,0.35);
}
.features {
  display:flex; gap:0; border:2px solid #eaecf4; border-radius:12px; overflow:hidden;
}
.feat {
  padding:18px 32px; text-align:center; border-right:2px solid #eaecf4;
  flex:1;
}
.feat:last-child { border-right:none; }
.feat-num { font-size:30px; font-weight:900; color:#0d1526; }
.feat-label { font-size:12px; color:#8899cc; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-top:4px; }
.bottom-tag {
  margin-top:28px; font-size:13px; font-weight:800;
  letter-spacing:2px; text-transform:uppercase; color:#0d1526;
}
.bottom-tag span { color:#e85d04; }
</style></head><body>
<div class="top-tag">TradeOpsVault · Complete Bundle · Instant Digital Download</div>
<div class="fan">${fanImgs}</div>
<h1>20 Trade Forms.<br><span>One Download.</span></h1>
<div class="sub">Every template your contracting business needs — no software required</div>
<div class="price-row">
  <div class="price">$9.99</div>
  <div class="was">$79.80</div>
  <div class="save-badge">Save 87%</div>
</div>
<div class="features">
  <div class="feat"><div class="feat-num">20</div><div class="feat-label">Templates</div></div>
  <div class="feat"><div class="feat-num">0</div><div class="feat-label">Apps Needed</div></div>
  <div class="feat"><div class="feat-num">∞</div><div class="feat-label">Reprints</div></div>
  <div class="feat"><div class="feat-num">⚡</div><div class="feat-label">Instant DL</div></div>
</div>
<div class="bottom-tag">Open in browser · Fill in · <span>Print to PDF</span></div>
</body></html>`;

  // ── SHOT 2: What's inside — clean grid on white ────────────────────────────
  const formList = [
    ['LS-001','HVAC Service Call Notes'],
    ['LS-002','Plumbing Dispatch Checklist'],
    ['LS-003','Electrician Jobsite Inspection'],
    ['LS-004','Lawn Care Weekly Crew Planner'],
    ['LS-005','Auto Detail Intake + Waiver'],
    ['LS-006','Pest Control Follow-Up Cards'],
    ['LS-007','Roofing Change Order Approval'],
    ['LS-008','Pressure Washing Route Sheet'],
    ['LS-009','Appliance Repair Parts Tracker'],
    ['LS-010','Handyman Materials Log'],
    ['LS-011','Mobile Mechanic Service Summary'],
    ['LS-012','Locksmith Job Authorization'],
    ['LS-013','Painting Prep Punch List'],
    ['LS-014','Snow Removal Service Checklist'],
    ['LS-015','Window Cleaning Client Packet'],
    ['LS-016','Pool Service Chemical Log'],
    ['LS-017','Flooring Estimate Scope Matrix'],
    ['LS-018','Contractor Daily Site Report'],
    ['LS-019','Septic Service Pump Log'],
    ['LS-020','Fee Transparency Addendum'],
  ];

  const shot2 = `<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:#fff;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif; padding:60px 70px;
}
.header { text-align:center; margin-bottom:40px; }
.tag { font-size:12px; font-weight:800; letter-spacing:4px; text-transform:uppercase; color:#8899cc; margin-bottom:14px; }
h1 { font-size:58px; font-weight:900; color:#0d1526; text-transform:uppercase; letter-spacing:-1px; line-height:1.05; }
h1 span { color:#e85d04; }
.sub { font-size:18px; color:#667; margin-top:8px; }
.grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; width:100%; margin-bottom:36px; }
.item {
  display:flex; align-items:center; gap:14px;
  background:#f9fafc; border-radius:10px; padding:16px 20px;
  border:1.5px solid #eaecf4; border-left:5px solid #e85d04;
}
.item-id {
  background:#0d1526; color:#fff; border-radius:6px;
  padding:4px 10px; font-size:10px; font-weight:900;
  letter-spacing:0.5px; white-space:nowrap; flex-shrink:0;
}
.item-name { font-size:15px; font-weight:700; color:#1a1a2e; }
.bottom {
  background:linear-gradient(135deg,#0d1526,#1a2744);
  border-radius:14px; padding:24px 48px;
  display:flex; align-items:center; justify-content:space-between; width:100%;
}
.b-left { color:rgba(255,255,255,0.7); font-size:16px; font-weight:600; line-height:1.6; }
.b-left strong { color:#fff; }
.b-price { text-align:right; }
.b-price .amt { color:#e85d04; font-size:52px; font-weight:900; line-height:1; }
.b-price .was { color:rgba(255,255,255,0.3); font-size:18px; text-decoration:line-through; }
</style></head><body>
<div class="header">
  <div class="tag">TradeOpsVault · Complete Trades Bundle</div>
  <h1>Everything Inside<br><span>All 20 Templates</span></h1>
  <div class="sub">Open in any browser — no Canva, no Word, no apps needed</div>
</div>
<div class="grid">
  ${formList.map(([id, name]) => `<div class="item"><div class="item-id">${id}</div><div class="item-name">${name}</div></div>`).join('')}
</div>
<div class="bottom">
  <div class="b-left"><strong>20 browser-fillable templates.</strong><br>Click any field · Upload your logo · Print to PDF · Unlimited reprints</div>
  <div class="b-price">
    <div class="was">$79.80 value</div>
    <div class="amt">$9.99</div>
  </div>
</div>
</body></html>`;

  for (const [idx, html] of [[1, shot1], [2, shot2]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));
    const outFile = path.join(outDir, `LS-BUNDLE-${idx === 1 ? '1-Hero' : '2-Whats-Inside'}.png`);
    await page.screenshot({ path: outFile, type: 'png' });
    await page.close();
    console.log(`✅ ${path.basename(outFile)}`);
  }

  await browser.close();
  console.log('\n📁 Done → mockups/LS-BUNDLE/');
}

generate().catch(console.error);

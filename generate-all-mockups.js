import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LISTINGS = [
  { id: 'LS-002', file: 'LS-002-Plumbing-Dispatch-Checklist-TradeOpsVault.html' },
  { id: 'LS-003', file: 'LS-003-Electrician-Jobsite-Inspection-TradeOpsVault.html' },
  { id: 'LS-004', file: 'LS-004-Lawn-Care-Weekly-Crew-Planner-TradeOpsVault.html' },
  { id: 'LS-005', file: 'LS-005-Auto-Detail-Intake-Waiver-TradeOpsVault.html' },
  { id: 'LS-006', file: 'LS-006-Pest-Control-Follow-Up-Cards-TradeOpsVault.html' },
  { id: 'LS-007', file: 'LS-007-Roofing-Change-Order-Approval-TradeOpsVault.html' },
  { id: 'LS-008', file: 'LS-008-Pressure-Washing-Route-Sheet-TradeOpsVault.html' },
  { id: 'LS-009', file: 'LS-009-Appliance-Repair-Parts-Tracker-TradeOpsVault.html' },
  { id: 'LS-010', file: 'LS-010-Handyman-Materials-Reimbursement-TradeOpsVault.html' },
  { id: 'LS-011', file: 'LS-011-Mobile-Mechanic-Service-Summary-TradeOpsVault.html' },
  { id: 'LS-012', file: 'LS-012-Locksmith-Job-Authorization-TradeOpsVault.html' },
  { id: 'LS-013', file: 'LS-013-Painting-Prep-Final-Punch-List-TradeOpsVault.html' },
  { id: 'LS-014', file: 'LS-014-Snow-Removal-Service-Checklist-TradeOpsVault.html' },
  { id: 'LS-015', file: 'LS-015-Window-Cleaning-Client-Packet-TradeOpsVault.html' },
  { id: 'LS-016', file: 'LS-016-Pool-Service-Chemical-Log-TradeOpsVault.html' },
  { id: 'LS-017', file: 'LS-017-Flooring-Estimate-Scope-Matrix-TradeOpsVault.html' },
  { id: 'LS-018', file: 'LS-018-Contractor-Daily-Site-Report-TradeOpsVault.html' },
  { id: 'LS-019', file: 'LS-019-Septic-Service-Pump-Log-TradeOpsVault.html' },
  { id: 'LS-020', file: 'LS-020-Service-Fee-Transparency-Addendum-TradeOpsVault.html' },
];

const SHOT_OFFSETS = [0, 1100, 2000, 2900, 3900];
const SHOT_LABELS = [
  'Cover & Setup',
  'Customer Fields',
  'Main Form',
  'Invoice / Log',
  'Page 3',
];

async function makeFrame(browser, rawPng, label, listingId) {
  const b64 = rawPng.toString('base64');
  const framePage = await browser.newPage();
  await framePage.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
  await framePage.setContent(`<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:linear-gradient(145deg,#0d1526 0%,#1a2744 60%,#0f2040 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif;
}
.top { color:rgba(255,255,255,0.5); font-size:15px; font-weight:800;
  letter-spacing:3px; text-transform:uppercase; margin-bottom:20px; }
.frame { width:1300px; border-radius:14px;
  box-shadow:0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08);
  overflow:hidden; }
.bar { background:#1e2230; height:38px; display:flex; align-items:center;
  padding:0 16px; gap:8px; }
.dot { width:12px; height:12px; border-radius:50%; }
.dot.r{background:#ff5f57;} .dot.y{background:#ffbd2e;} .dot.g{background:#28c940;}
.url { flex:1; text-align:center; color:rgba(255,255,255,0.35); font-size:12px; font-family:monospace; }
.accent { height:4px; background:linear-gradient(90deg,#e85d04,#c44b00); }
img { width:100%; display:block; }
.bottom { color:rgba(255,255,255,0.4); font-size:14px; font-weight:700;
  letter-spacing:2px; text-transform:uppercase; margin-top:18px; }
.bottom span { color:#e85d04; }
</style></head><body>
<div class="top">TradeOpsVault · ${listingId} · ${label}</div>
<div class="frame">
  <div class="bar">
    <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
    <div class="url">${listingId} — ${label} &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
  </div>
  <div class="accent"></div>
  <img src="data:image/png;base64,${b64}">
</div>
<div class="bottom"><span>Browser fillable</span> · Print to PDF · No software · Instant download</div>
</body></html>`);
  await new Promise(r => setTimeout(r, 200));
  const buf = await framePage.screenshot({ type: 'png' });
  await framePage.close();
  return buf;
}

async function generateForListing(browser, listing) {
  const htmlPath = path.join(__dirname, 'downloads', listing.file);
  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  Skipping ${listing.id} — file not found`);
    return;
  }

  const outDir = path.join(__dirname, 'mockups', listing.id);
  fs.mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none'));

  // Get actual scroll height
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewH = 900;

  for (let i = 0; i < 5; i++) {
    // Scale offsets to this template's actual height
    const y = Math.min(Math.round((SHOT_OFFSETS[i] / 3900) * (scrollHeight - viewH)), scrollHeight - viewH);
    await page.evaluate(y => window.scrollTo(0, y), y);
    await new Promise(r => setTimeout(r, 400));

    const raw = await page.screenshot({
      type: 'png',
      clip: { x: 0, y, width: 1200, height: viewH },
    });

    const framed = await makeFrame(browser, raw, SHOT_LABELS[i], listing.id);
    const outFile = path.join(outDir, `${listing.id}-${i + 1}-${SHOT_LABELS[i].replace(/[^a-z0-9]/gi, '-')}.png`);
    fs.writeFileSync(outFile, framed);
  }

  await page.close();
  console.log(`✅ ${listing.id} — 5 mockups done`);
}

async function main() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] });
  for (const listing of LISTINGS) {
    await generateForListing(browser, listing);
  }
  await browser.close();
  console.log('\n📁 All mockups generated → mockups/');
}

main().catch(console.error);

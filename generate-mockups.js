import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function shot(page, outPath) {
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: outPath, type: 'png' });
  console.log(`✅ ${path.basename(outPath)}`);
}

async function generate() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const outDir = path.join(__dirname, 'mockups', 'LS-001');
  fs.mkdirSync(outDir, { recursive: true });

  // ── SHOT 1: Hero overview — dark branded background, form preview ──────────
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background: linear-gradient(145deg, #0d1526 0%, #1a2744 60%, #0f2040 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family: 'Segoe UI', Arial, sans-serif;
  position:relative; overflow:hidden;
}
body::before {
  content:""; position:absolute; top:-200px; right:-200px;
  width:700px; height:700px; border-radius:50%;
  background: radial-gradient(circle, rgba(232,93,4,0.18) 0%, transparent 70%);
}
body::after {
  content:""; position:absolute; bottom:-150px; left:-150px;
  width:500px; height:500px; border-radius:50%;
  background: radial-gradient(circle, rgba(26,39,68,0.6) 0%, transparent 70%);
}
.badge-top {
  color: rgba(255,255,255,0.5);
  font-size: 15px; font-weight:800; letter-spacing:4px;
  text-transform:uppercase; margin-bottom:28px;
}
.headline {
  color:#fff; font-size:64px; font-weight:900;
  text-transform:uppercase; letter-spacing:-1px;
  text-align:center; line-height:1.1;
}
.headline span { color:#e85d04; }
.sub {
  color:rgba(255,255,255,0.6); font-size:22px;
  text-align:center; margin-top:14px; font-weight:400;
}
.card {
  background:#fff; border-radius:16px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.6);
  overflow:hidden; margin:48px 0 36px;
  width:900px;
}
.card-header {
  background: linear-gradient(135deg, #0f1628 0%, #1a2744 100%);
  padding:24px 36px;
  display:flex; justify-content:space-between; align-items:center;
}
.card-title { color:#fff; font-size:22px; font-weight:800; text-transform:uppercase; }
.card-badge {
  background:rgba(255,255,255,0.12); color:rgba(255,255,255,0.8);
  padding:5px 14px; border-radius:20px; font-size:11px;
  font-weight:700; letter-spacing:1px; text-transform:uppercase;
}
.accent-bar { height:5px; background:linear-gradient(90deg,#e85d04,#c44b00); }
.card-body { padding:28px 36px; }
.field-row { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:16px; margin-bottom:20px; }
.field label {
  font-size:8px; font-weight:800; text-transform:uppercase;
  letter-spacing:1px; color:#8899cc; display:block; margin-bottom:5px;
}
.field .val {
  border-bottom:1.5px solid #dde2f0; min-height:28px;
  padding:4px 0; font-size:13px; color:#1a1a2e;
}
.section-hdr {
  background:linear-gradient(90deg,#1a2744,#243358);
  color:#fff; padding:9px 14px; font-size:9px; font-weight:800;
  text-transform:uppercase; letter-spacing:1.2px; border-radius:4px 4px 0 0;
  margin-bottom:0;
}
.section-body {
  border:1.5px solid #dde2f0; border-top:none;
  border-radius:0 0 6px 6px; padding:18px;
  border-left:4px solid #e85d04; margin-bottom:20px;
}
.pills { display:flex; gap:10px; margin-top:10px; flex-wrap:wrap; }
.pill {
  background:#f0f4ff; border:1.5px solid #dde2f0;
  border-radius:5px; padding:8px 14px;
  font-size:12px; color:#1a2744; font-weight:500;
}
.pill.checked { background:#fff8f5; border-color:#e85d04; color:#e85d04; font-weight:700; }
.footer-pills { display:flex; gap:24px; margin-top:4px; }
.fpill {
  display:flex; align-items:center; gap:8px;
  color:rgba(255,255,255,0.75); font-size:16px; font-weight:600;
}
.fpill .dot {
  width:28px; height:28px; border-radius:50%;
  background:#e85d04; display:flex; align-items:center;
  justify-content:center; color:#fff; font-size:14px; font-weight:900;
  flex-shrink:0;
}
</style></head><body>
<div class="badge-top">TradeOpsVault · Premium Series</div>
<div class="headline">HVAC Service<br><span>Call Notes</span></div>
<div class="sub">Professional 3-Page Business Template · Browser Fillable · Print to PDF</div>
<div class="card">
  <div class="card-header">
    <div class="card-title">HVAC Service Call Notes</div>
    <div class="card-badge">FORM LS-001 · v2.0</div>
  </div>
  <div class="accent-bar"></div>
  <div class="card-body">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;margin-bottom:20px;padding-bottom:18px;border-bottom:1.5px solid #eaecf4;">
      <div class="field"><label>Date</label><div class="val" style="color:#e85d04;font-weight:700;">06/04/2026</div></div>
      <div class="field"><label>Work Order #</label><div class="val">WO-20240604</div></div>
      <div class="field"><label>Technician</label><div class="val">Mike R.</div></div>
      <div class="field"><label>Priority</label><div class="val" style="color:#ff5c6c;font-weight:700;">🔴 Urgent</div></div>
    </div>
    <div class="section-hdr">01 · Customer &amp; Equipment</div>
    <div class="section-body">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px;">
        <div class="field"><label>Customer Name</label><div class="val">John Martinez</div></div>
        <div class="field"><label>Service Address</label><div class="val">4821 Westbrook Ln, Austin TX</div></div>
        <div class="field"><label>Equipment</label><div class="val">Carrier 3-Ton Split</div></div>
        <div class="field"><label>Refrigerant</label><div class="val">R-410A</div></div>
      </div>
    </div>
    <div class="section-hdr">02 · Diagnosis</div>
    <div class="section-body">
      <div class="pills">
        <div class="pill checked">✓ Refrigerant leak</div>
        <div class="pill checked">✓ Capacitor failure</div>
        <div class="pill">Blower motor issue</div>
        <div class="pill">Frozen evaporator coil</div>
        <div class="pill">Faulty thermostat</div>
        <div class="pill">Ductwork issue</div>
      </div>
    </div>
  </div>
</div>
<div class="footer-pills">
  <div class="fpill"><div class="dot">3</div> Pages Included</div>
  <div class="fpill"><div class="dot">✓</div> No Software Needed</div>
  <div class="fpill"><div class="dot">∞</div> Unlimited Reprints</div>
  <div class="fpill"><div class="dot">⬇</div> Instant Download</div>
</div>
</body></html>`);
    await shot(page, path.join(outDir, 'LS-001-1-Hero.png'));
    await page.close();
  }

  // ── SHOT 2: Close-up of the form fields in action ─────────────────────────
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:#f0f2f8;
  display:flex; align-items:center; justify-content:center;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.wrap {
  background:#fff; border-radius:20px;
  box-shadow:0 20px 80px rgba(0,0,0,0.15);
  overflow:hidden; width:1260px;
}
.top-bar {
  background:linear-gradient(135deg,#0f1628,#1a2744);
  padding:26px 48px; display:flex; justify-content:space-between; align-items:center;
}
.top-title { color:#fff; font-size:26px; font-weight:900; text-transform:uppercase; }
.top-badge {
  background:#e85d04; color:#fff; padding:7px 18px;
  border-radius:20px; font-size:13px; font-weight:800; letter-spacing:1px;
}
.accent-bar { height:6px; background:linear-gradient(90deg,#e85d04,#c44b00); }
.body { padding:40px 48px; }
.row-label {
  font-size:10px; font-weight:800; text-transform:uppercase;
  letter-spacing:1px; color:#8899cc; margin-bottom:6px;
}
.field-row { display:grid; gap:20px; margin-bottom:28px; }
.field-row.c2 { grid-template-columns:1fr 1fr; }
.field-row.c3 { grid-template-columns:1fr 1fr 1fr; }
.field-row.c4 { grid-template-columns:1fr 1fr 1fr 1fr; }
.field { }
.field label {
  font-size:10px; font-weight:800; text-transform:uppercase;
  letter-spacing:1px; color:#8899cc; display:block; margin-bottom:7px;
}
.field .val {
  border-bottom:2px solid #e85d04; padding:6px 0;
  font-size:15px; color:#1a1a2e; font-weight:500;
}
.field .empty {
  border-bottom:1.5px solid #dde2f0; padding:6px 0;
  font-size:15px; color:#c8cedf; font-style:italic;
}
.section-hdr {
  background:linear-gradient(90deg,#1a2744,#243358);
  color:#fff; padding:12px 18px; font-size:11px; font-weight:800;
  text-transform:uppercase; letter-spacing:1.5px;
  border-radius:6px 6px 0 0; margin-top:10px;
}
.section-body {
  border:1.5px solid #dde2f0; border-top:none;
  border-radius:0 0 8px 8px; padding:22px;
  border-left:5px solid #e85d04; margin-bottom:24px;
}
.tag { display:inline-block; background:#fff8f5; border:1.5px solid #e85d04;
  color:#e85d04; padding:7px 16px; border-radius:6px;
  font-size:13px; font-weight:700; margin:4px; }
.tag.off { background:#f0f4ff; border-color:#dde2f0; color:#8899cc; }
.callout {
  background:linear-gradient(135deg,#0f1628,#1a2744);
  color:#fff; border-radius:12px; padding:22px 32px;
  display:flex; align-items:center; gap:20px; margin-top:12px;
}
.callout-icon { font-size:36px; }
.callout-text { font-size:16px; font-weight:600; line-height:1.5; }
.callout-text strong { color:#e85d04; }
</style></head><body>
<div class="wrap">
  <div class="top-bar">
    <div class="top-title">Parts &amp; Labor Invoice</div>
    <div class="top-badge">Page 2 of 3</div>
  </div>
  <div class="accent-bar"></div>
  <div class="body">
    <div class="section-hdr">03 · Refrigerant Record</div>
    <div class="section-body">
      <div class="field-row c4">
        <div class="field"><label>Suction Pressure</label><div class="val">68 PSI</div></div>
        <div class="field"><label>Discharge Pressure</label><div class="val">240 PSI</div></div>
        <div class="field"><label>Refrigerant Added</label><div class="val" style="color:#e85d04">1.5 lbs</div></div>
        <div class="field"><label>Leak Test</label><div class="val" style="color:#e85d04">FAIL ⚠</div></div>
      </div>
      <div class="field-row c4" style="margin-top:16px;margin-bottom:0">
        <div class="field"><label>Superheat</label><div class="val">12°F</div></div>
        <div class="field"><label>Subcooling</label><div class="val">8°F</div></div>
        <div class="field"><label>Supply Air Temp</label><div class="val">54°F</div></div>
        <div class="field"><label>Return Air Temp</label><div class="val">76°F</div></div>
      </div>
    </div>
    <div class="section-hdr">04 · Parts &amp; Labor Invoice</div>
    <div class="section-body">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:linear-gradient(90deg,#1a2744,#243358)">
            <th style="color:#fff;padding:10px 14px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;">#</th>
            <th style="color:#fff;padding:10px 14px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;">Part / Description</th>
            <th style="color:#fff;padding:10px 14px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;">Qty</th>
            <th style="color:#fff;padding:10px 14px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;">Unit Price</th>
            <th style="color:#fff;padding:10px 14px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.8px;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#fffde7;font-style:italic;color:#777;font-size:13px;">
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">★</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">Labor — diagnostic visit (example)</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">1</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">$85.00</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">$85.00</td>
          </tr>
          <tr>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">1</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">Capacitor 45+5 MFD</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">1</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">$28.00</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">$28.00</td>
          </tr>
          <tr style="background:#f9fafc;">
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">2</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">R-410A Refrigerant (1.5 lbs)</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">1</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">$45.00</td>
            <td style="padding:8px 14px;border-bottom:1px solid #eee;">$45.00</td>
          </tr>
          <tr style="font-weight:700;background:#f5f7ff;">
            <td colspan="4" style="padding:10px 14px;text-align:right;border-bottom:1px solid #eee;">Labor Total</td>
            <td style="padding:10px 14px;border-bottom:1px solid #eee;">$120.00</td>
          </tr>
          <tr style="font-weight:900;background:#1a2744;color:#fff;">
            <td colspan="4" style="padding:12px 14px;text-align:right;">INVOICE TOTAL</td>
            <td style="padding:12px 14px;color:#e85d04;font-size:16px;">$193.00</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="callout">
      <div class="callout-icon">💡</div>
      <div class="callout-text">Click any field to type. <strong>Print or save as PDF</strong> when done — no apps, no subscriptions. Works in any browser on any device.</div>
    </div>
  </div>
</div>
</body></html>`);
    await shot(page, path.join(outDir, 'LS-001-2-Invoice.png'));
    await page.close();
  }

  // ── SHOT 3: What's included — 3-page layout overview ─────────────────────
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:linear-gradient(145deg,#0d1526 0%,#1a2744 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif;
  padding:60px;
}
h1 { color:#fff; font-size:52px; font-weight:900; text-transform:uppercase;
  text-align:center; margin-bottom:8px; }
h1 span { color:#e85d04; }
.sub { color:rgba(255,255,255,0.55); font-size:20px; text-align:center; margin-bottom:52px; }
.grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:28px; width:100%; margin-bottom:48px; }
.card {
  background:#fff; border-radius:16px; overflow:hidden;
  box-shadow:0 20px 60px rgba(0,0,0,0.4);
}
.card-top {
  background:linear-gradient(135deg,#0f1628,#1a2744);
  padding:18px 24px; display:flex; justify-content:space-between; align-items:center;
}
.page-num {
  background:rgba(255,255,255,0.12); color:#fff;
  width:36px; height:36px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:16px; font-weight:900;
}
.page-name { color:rgba(255,255,255,0.85); font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; }
.acc { height:4px; background:linear-gradient(90deg,#e85d04,#c44b00); }
.card-body { padding:20px 24px; }
.item {
  display:flex; align-items:flex-start; gap:12px;
  padding:10px 0; border-bottom:1px solid #eaecf4;
  font-size:15px; color:#1a1a2e;
}
.item:last-child { border-bottom:none; }
.item-dot {
  width:22px; height:22px; border-radius:50%;
  background:#e85d04; color:#fff; font-size:11px; font-weight:900;
  display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;
}
.bottom-row { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:20px; width:100%; }
.stat {
  background:rgba(255,255,255,0.07); border:1.5px solid rgba(255,255,255,0.12);
  border-radius:14px; padding:22px; text-align:center;
}
.stat-num { color:#e85d04; font-size:42px; font-weight:900; line-height:1; }
.stat-label { color:rgba(255,255,255,0.6); font-size:14px; margin-top:6px; font-weight:600; }
</style></head><body>
<h1>What's <span>Included</span></h1>
<div class="sub">3 professional pages — everything an HVAC tech needs on every job</div>
<div class="grid">
  <div class="card">
    <div class="card-top">
      <div class="page-num">1</div>
      <div class="page-name">Cover &amp; Setup</div>
    </div>
    <div class="acc"></div>
    <div class="card-body">
      <div class="item"><div class="item-dot">✓</div>Your company logo upload zone</div>
      <div class="item"><div class="item-dot">✓</div>Company info (name, phone, license, website)</div>
      <div class="item"><div class="item-dot">✓</div>Quick-start instructions for your team</div>
      <div class="item"><div class="item-dot">✓</div>Insurance &amp; warranty fields</div>
    </div>
  </div>
  <div class="card">
    <div class="card-top">
      <div class="page-num">2</div>
      <div class="page-name">Service Call Form</div>
    </div>
    <div class="acc"></div>
    <div class="card-body">
      <div class="item"><div class="item-dot">✓</div>Customer &amp; equipment info</div>
      <div class="item"><div class="item-dot">✓</div>Diagnosis checklist (12 common faults)</div>
      <div class="item"><div class="item-dot">✓</div>Refrigerant record (pressures, temps)</div>
      <div class="item"><div class="item-dot">✓</div>Parts &amp; labor invoice with totals</div>
      <div class="item"><div class="item-dot">✓</div>Customer signature &amp; approval</div>
    </div>
  </div>
  <div class="card">
    <div class="card-top">
      <div class="page-num">3</div>
      <div class="page-name">Job History Log</div>
    </div>
    <div class="acc"></div>
    <div class="card-body">
      <div class="item"><div class="item-dot">✓</div>10-row job tracker (date, client, amount)</div>
      <div class="item"><div class="item-dot">✓</div>Follow-up &amp; pending notes</div>
      <div class="item"><div class="item-dot">✓</div>Monthly revenue summary</div>
      <div class="item"><div class="item-dot">✓</div>Top client tracking</div>
    </div>
  </div>
</div>
<div class="bottom-row">
  <div class="stat"><div class="stat-num">3</div><div class="stat-label">Pages Included</div></div>
  <div class="stat"><div class="stat-num">∞</div><div class="stat-label">Unlimited Reprints</div></div>
  <div class="stat"><div class="stat-num">0</div><div class="stat-label">Software Needed</div></div>
  <div class="stat"><div class="stat-num">⚡</div><div class="stat-label">Instant Download</div></div>
</div>
</body></html>`);
    await shot(page, path.join(outDir, 'LS-001-3-Whats-Included.png'));
    await page.close();
  }

  // ── SHOT 4: How it works — 3 steps ────────────────────────────────────────
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:#f5f7ff;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif; padding:60px;
}
.top-badge {
  background:linear-gradient(135deg,#0f1628,#1a2744);
  color:#fff; padding:10px 28px; border-radius:30px;
  font-size:14px; font-weight:800; letter-spacing:2px; text-transform:uppercase;
  margin-bottom:28px;
}
h1 { color:#1a1a2e; font-size:58px; font-weight:900; text-align:center;
  text-transform:uppercase; letter-spacing:-1px; margin-bottom:10px; }
h1 span { color:#e85d04; }
.sub { color:#667; font-size:22px; text-align:center; margin-bottom:56px; }
.steps { display:grid; grid-template-columns:1fr 1fr 1fr; gap:32px; width:100%; margin-bottom:56px; }
.step { background:#fff; border-radius:20px; padding:44px 36px;
  box-shadow:0 8px 40px rgba(0,0,0,0.08); text-align:center; position:relative; }
.step-num {
  width:72px; height:72px; border-radius:50%;
  background:linear-gradient(135deg,#e85d04,#c44b00);
  color:#fff; font-size:30px; font-weight:900;
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 24px; box-shadow:0 8px 24px rgba(232,93,4,0.35);
}
.step-title { font-size:22px; font-weight:800; color:#1a1a2e;
  text-transform:uppercase; margin-bottom:12px; }
.step-desc { font-size:16px; color:#667; line-height:1.6; }
.arrow {
  position:absolute; right:-28px; top:50%; transform:translateY(-50%);
  font-size:36px; color:#e85d04; z-index:10;
}
.bottom {
  background:linear-gradient(135deg,#0f1628,#1a2744);
  border-radius:20px; padding:36px 56px;
  display:flex; align-items:center; justify-content:space-between; width:100%;
}
.bottom-text { color:#fff; font-size:22px; font-weight:700; }
.bottom-text span { color:#e85d04; }
.cta {
  background:#e85d04; color:#fff; padding:16px 40px;
  border-radius:40px; font-size:18px; font-weight:800;
  text-transform:uppercase; letter-spacing:1px;
  box-shadow:0 8px 24px rgba(232,93,4,0.4);
}
</style></head><body>
<div class="top-badge">TradeOpsVault · Premium Series</div>
<h1>How It <span>Works</span></h1>
<div class="sub">Open in your browser — fill in — print. That's it.</div>
<div class="steps">
  <div class="step">
    <div class="step-num">1</div>
    <div class="step-title">Download &amp; Open</div>
    <div class="step-desc">Purchase and download the HTML file. Open it in Chrome, Safari, or any browser. No apps, no sign-ups required.</div>
    <div class="arrow">→</div>
  </div>
  <div class="step">
    <div class="step-num">2</div>
    <div class="step-title">Fill It In</div>
    <div class="step-desc">Click any field and type. Upload your company logo. Check off diagnostic items. Fill in the invoice.</div>
    <div class="arrow">→</div>
  </div>
  <div class="step">
    <div class="step-num">3</div>
    <div class="step-title">Print or Save PDF</div>
    <div class="step-desc">Click "Print / Save PDF" — the toolbar disappears automatically. Looks professional every time. Reprint as many times as you need.</div>
  </div>
</div>
<div class="bottom">
  <div class="bottom-text">Works on <span>any device</span> — phone, tablet, laptop. <span>No subscription.</span> Yours forever.</div>
  <div class="cta">Instant Download</div>
</div>
</body></html>`);
    await shot(page, path.join(outDir, 'LS-001-4-How-It-Works.png'));
    await page.close();
  }

  // ── SHOT 5: Social proof / value prop ─────────────────────────────────────
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    await page.setContent(`<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:linear-gradient(145deg,#0d1526 0%,#1a2744 60%,#0f2040 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif; padding:60px;
  position:relative; overflow:hidden;
}
body::before {
  content:""; position:absolute; top:-100px; right:-100px;
  width:600px; height:600px; border-radius:50%;
  background:radial-gradient(circle,rgba(232,93,4,0.15) 0%,transparent 70%);
}
h1 { color:#fff; font-size:52px; font-weight:900; text-align:center;
  text-transform:uppercase; margin-bottom:10px; position:relative; }
h1 span { color:#e85d04; }
.sub { color:rgba(255,255,255,0.55); font-size:20px; text-align:center;
  margin-bottom:48px; position:relative; }
.grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; width:100%; margin-bottom:40px; position:relative; }
.card {
  background:rgba(255,255,255,0.06); border:1.5px solid rgba(255,255,255,0.1);
  border-radius:18px; padding:36px; display:flex; gap:20px; align-items:flex-start;
}
.card-icon {
  font-size:44px; flex-shrink:0; margin-top:2px;
}
.card-text h3 { color:#fff; font-size:20px; font-weight:800; margin-bottom:8px; }
.card-text p { color:rgba(255,255,255,0.6); font-size:16px; line-height:1.6; }
.divider { width:80px; height:4px; background:#e85d04; border-radius:2px; margin:0 auto 36px; position:relative; }
.bottom {
  background:rgba(255,255,255,0.07); border:1.5px solid rgba(255,255,255,0.12);
  border-radius:18px; padding:32px 48px; width:100%; position:relative;
  display:flex; align-items:center; justify-content:center; gap:60px;
}
.stat { text-align:center; }
.stat-n { color:#e85d04; font-size:48px; font-weight:900; line-height:1; }
.stat-l { color:rgba(255,255,255,0.6); font-size:14px; font-weight:600; margin-top:6px; text-transform:uppercase; letter-spacing:1px; }
.sep { width:1px; height:60px; background:rgba(255,255,255,0.12); }
</style></head><body>
<h1>Built for <span>Working Trades</span></h1>
<div class="sub">Every field an HVAC tech needs — nothing they don't</div>
<div class="divider"></div>
<div class="grid">
  <div class="card">
    <div class="card-icon">🔧</div>
    <div class="card-text">
      <h3>Made for the Field</h3>
      <p>Every field, every checklist, every section is built around how HVAC techs actually work — not how office managers think they work.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-icon">📄</div>
    <div class="card-text">
      <h3>Looks Professional</h3>
      <p>Dark header, your logo, branded footer. Customers see a polished, professional document — not a scribbled notepad.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-icon">⚡</div>
    <div class="card-text">
      <h3>Works Everywhere</h3>
      <p>Open the HTML file in any browser on your phone, tablet, or laptop. No apps, no subscriptions, no internet needed after download.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-icon">♾️</div>
    <div class="card-text">
      <h3>Unlimited Use</h3>
      <p>One purchase — unlimited reprints for your business. Use it on every job, for every customer, forever. Share with your whole crew.</p>
    </div>
  </div>
</div>
<div class="bottom">
  <div class="stat"><div class="stat-n">3</div><div class="stat-l">Pages</div></div>
  <div class="sep"></div>
  <div class="stat"><div class="stat-n">$3.99</div><div class="stat-l">One-Time</div></div>
  <div class="sep"></div>
  <div class="stat"><div class="stat-n">∞</div><div class="stat-l">Reprints</div></div>
  <div class="sep"></div>
  <div class="stat"><div class="stat-n">0</div><div class="stat-l">Apps Needed</div></div>
  <div class="sep"></div>
  <div class="stat"><div class="stat-n">⚡</div><div class="stat-l">Instant DL</div></div>
</div>
</body></html>`);
    await shot(page, path.join(outDir, 'LS-001-5-Value-Props.png'));
    await page.close();
  }

  await browser.close();
  console.log(`\n📁 Done → mockups/LS-001/`);
}

generate().catch(console.error);

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htmlPath = path.join(__dirname, 'downloads', 'LS-001-HVAC-Service-Call-Notes-TradeOpsVault.html');
const outDir = path.join(__dirname, 'mockups', 'LS-001');

async function generate() {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-web-security'] });
  const page = await browser.newPage();

  // Load the real template at 1200px wide
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Hide the sticky how-to bar so it doesn't cover content
  await page.evaluate(() => {
    document.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');
  });

  const shots = [
    { name: '1-Cover-Page',   y: 0,    h: 900,  label: 'Page 1 of 3 — Cover & Setup' },
    { name: '2-Service-Form', y: 1100, h: 900,  label: 'Page 2 of 3 — Customer & Equipment' },
    { name: '3-Diagnosis',    y: 2000, h: 900,  label: 'Diagnosis Checklist & Refrigerant Record' },
    { name: '4-Invoice',      y: 2900, h: 900,  label: 'Parts & Labor Invoice' },
    { name: '5-Job-History',  y: 3900, h: 900,  label: 'Page 3 of 3 — Job History Log' },
  ];

  for (const s of shots) {
    await page.evaluate(y => window.scrollTo(0, y), s.y);
    await new Promise(r => setTimeout(r, 500));
    // Verify scroll actually happened
    const actualY = await page.evaluate(() => window.scrollY);
    console.log(`  scrolled to ${actualY}`);

    // Capture the correct section of the full page
    const raw = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: s.y, width: 1200, height: s.h },
    });

    // Wrap it in a branded frame using a second page
    const framePage = await browser.newPage();
    await framePage.setViewport({ width: 1500, height: 1500, deviceScaleFactor: 2 });
    const b64 = raw.toString('base64');

    await framePage.setContent(`<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1500px; height:1500px;
  background:linear-gradient(145deg,#0d1526 0%,#1a2744 60%,#0f2040 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif; gap:0;
}
.top {
  color:rgba(255,255,255,0.5); font-size:15px; font-weight:800;
  letter-spacing:3px; text-transform:uppercase; margin-bottom:20px;
}
.frame {
  width:1300px;
  border-radius:14px;
  box-shadow:0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08);
  overflow:hidden;
}
.bar {
  background:#1e2230; height:38px; display:flex; align-items:center;
  padding:0 16px; gap:8px;
}
.dot { width:12px; height:12px; border-radius:50%; }
.dot.r{background:#ff5f57;} .dot.y{background:#ffbd2e;} .dot.g{background:#28c940;}
.url {
  flex:1; text-align:center; color:rgba(255,255,255,0.35);
  font-size:12px; font-family:monospace;
}
.accent { height:4px; background:linear-gradient(90deg,#e85d04,#c44b00); }
img { width:100%; display:block; }
.bottom {
  color:rgba(255,255,255,0.4); font-size:14px; font-weight:700;
  letter-spacing:2px; text-transform:uppercase; margin-top:18px;
}
.bottom span { color:#e85d04; }
</style></head><body>
<div class="top">TradeOpsVault · HVAC Service Call Notes · LS-001</div>
<div class="frame">
  <div class="bar">
    <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
    <div class="url">LS-001-HVAC-Service-Call-Notes-TradeOpsVault.html &nbsp;·&nbsp; ${s.label}</div>
  </div>
  <div class="accent"></div>
  <img src="data:image/png;base64,${b64}">
</div>
<div class="bottom"><span>Browser fillable</span> · Print to PDF · No software · Instant download</div>
</body></html>`);

    await new Promise(r => setTimeout(r, 200));
    const outFile = path.join(outDir, `LS-001-${s.name}.png`);
    await framePage.screenshot({ path: outFile, type: 'png' });
    await framePage.close();
    console.log(`✅ ${path.basename(outFile)}`);
  }

  await browser.close();
  console.log('\n📁 Done → mockups/LS-001/');
}

generate().catch(console.error);

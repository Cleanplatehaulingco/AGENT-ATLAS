import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generate() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const outDir = path.join(__dirname, 'mockups', 'LS-001');
  fs.mkdirSync(outDir, { recursive: true });

  const htmlPath = path.join(__dirname, 'downloads', 'LS-001-HVAC-Service-Call-Notes-TradeOpsVault.html');

  // Helper: render the real form at a scroll offset, wrapped in a styled frame
  async function frameShot(scrollY, outFile, label, sampleFill) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1800, height: 1800, deviceScaleFactor: 2 });

    // Load the real template in an iframe
    const frameHTML = `<!DOCTYPE html><html><head>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body {
  width:1800px; height:1800px;
  background: linear-gradient(145deg, #0d1526 0%, #1a2744 70%, #0f2040 100%);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  font-family:'Segoe UI',Arial,sans-serif;
  gap:0; position:relative; overflow:hidden;
}
body::before {
  content:""; position:absolute; top:-200px; right:-200px;
  width:700px; height:700px; border-radius:50%;
  background:radial-gradient(circle,rgba(232,93,4,0.15) 0%,transparent 70%);
  pointer-events:none;
}
.top-label {
  color:rgba(255,255,255,0.5); font-size:16px; font-weight:800;
  letter-spacing:4px; text-transform:uppercase; margin-bottom:24px;
  position:relative;
}
.browser-frame {
  width:1400px; background:#fff;
  border-radius:16px 16px 12px 12px;
  box-shadow: 0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08);
  overflow:hidden; position:relative;
}
.browser-bar {
  background:#2a2d35; height:44px; display:flex; align-items:center;
  padding:0 18px; gap:10px;
}
.dot { width:13px; height:13px; border-radius:50%; }
.dot.r { background:#ff5f57; }
.dot.y { background:#ffbd2e; }
.dot.g { background:#28c940; }
.url-bar {
  flex:1; background:#1a1d24; border-radius:6px; height:26px;
  display:flex; align-items:center; padding:0 12px;
  color:rgba(255,255,255,0.5); font-size:12px; font-family:monospace;
  max-width:500px; margin:0 auto;
}
iframe {
  width:100%; height:1320px; border:none; display:block;
  pointer-events:none;
}
.bottom-label {
  color:rgba(255,255,255,0.45); font-size:15px; font-weight:700;
  margin-top:22px; letter-spacing:2px; text-transform:uppercase;
  position:relative;
}
.bottom-label span { color:#e85d04; }
</style></head><body>
<div class="top-label">TradeOpsVault · Premium Series · HVAC Service Call Notes</div>
<div class="browser-frame">
  <div class="browser-bar">
    <div class="dot r"></div><div class="dot y"></div><div class="dot g"></div>
    <div class="url-bar">tradeopsvault.etsy.com · LS-001-HVAC-Service-Call-Notes.html</div>
  </div>
  <iframe id="f" src="file://${htmlPath}" scrolling="no"></iframe>
</div>
<div class="bottom-label"><span>Browser fillable</span> · Print to PDF · No software needed · Instant download</div>
<script>
  document.getElementById('f').onload = function() {
    try {
      var doc = this.contentDocument;
      // Hide the how-to bar (sticky toolbar)
      var noprint = doc.querySelectorAll('.no-print');
      noprint.forEach(function(el){ el.style.display='none'; });
      // Scroll to position
      doc.documentElement.scrollTop = ${scrollY};
      doc.body.scrollTop = ${scrollY};
      ${sampleFill || ''}
    } catch(e) {}
  };
</script>
</body></html>`;

    await page.setContent(frameHTML, { waitUntil: 'networkidle0' });
    // Extra wait for iframe
    await new Promise(r => setTimeout(r, 1500));
    // Also scroll iframe via evaluate
    await page.evaluate((y) => {
      const iframe = document.querySelector('iframe');
      if (iframe && iframe.contentDocument) {
        iframe.contentDocument.documentElement.scrollTop = y;
        iframe.contentDocument.body.scrollTop = y;
        // Hide toolbars
        iframe.contentDocument.querySelectorAll('.no-print').forEach(el => el.style.display = 'none');
      }
    }, scrollY);
    await new Promise(r => setTimeout(r, 600));

    await page.screenshot({ path: outFile, type: 'png' });
    console.log(`✅ ${path.basename(outFile)}`);
    await page.close();
  }

  // Shot 1: Page 1 top — cover/hero section of the form
  await frameShot(0, path.join(outDir, 'LS-001-1-Cover-Page.png'), 'Cover Page');

  // Shot 2: Page 2 — customer & diagnosis section
  await frameShot(1400, path.join(outDir, 'LS-001-2-Service-Form.png'), 'Service Form');

  // Shot 3: Invoice section
  await frameShot(2600, path.join(outDir, 'LS-001-3-Invoice.png'), 'Invoice');

  // Shot 4: Page 3 — job history log
  await frameShot(4200, path.join(outDir, 'LS-001-4-Job-History.png'), 'Job History');

  // Shot 5: filled-in demo — customer info pre-filled
  const fillScript = `
    var fields = doc.querySelectorAll('[data-placeholder]');
    var data = ['John Martinez','4821 Westbrook Ln, Austin TX','(512) 555-0183','mike.r@hvacpro.com','Split AC','Carrier','48XC','SN-2019-0041','2019','16x20x1','R-410A','Active'];
    fields.forEach(function(f,i){ if(data[i]) f.textContent = data[i]; });
    var cbs = doc.querySelectorAll('input[type=checkbox]');
    if(cbs[0]) cbs[0].checked=true;
    if(cbs[3]) cbs[3].checked=true;
  `;
  await frameShot(1400, path.join(outDir, 'LS-001-5-Filled-Demo.png'), 'Filled Demo', fillScript);

  await browser.close();
  console.log('\n📁 Done → mockups/LS-001/');
}

generate().catch(console.error);

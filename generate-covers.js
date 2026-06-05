const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const downloadsDir = '/home/user/AGENT-ATLAS/downloads';
const mockupsDir = '/home/user/AGENT-ATLAS/mockups';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  for (let i = 2; i <= 20; i++) {
    const num = String(i).padStart(3, '0');
    const prefix = `LS-${num}`;

    // Find the matching HTML file
    const files = fs.readdirSync(downloadsDir);
    const htmlFile = files.find(f => f.startsWith(prefix) && f.endsWith('.html'));
    if (!htmlFile) {
      console.error(`No HTML file found for ${prefix}`);
      continue;
    }

    const htmlPath = path.join(downloadsDir, htmlFile);
    const outDir = path.join(mockupsDir, prefix);
    const outFile = path.join(outDir, `${prefix}-1-Cover-Page.png`);

    fs.mkdirSync(outDir, { recursive: true });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));

    await page.screenshot({
      path: outFile,
      clip: { x: 0, y: 0, width: 1280, height: 900 }
    });

    await page.close();
    console.log(`Saved: ${outFile}`);
  }

  await browser.close();
  console.log('Done.');
})();

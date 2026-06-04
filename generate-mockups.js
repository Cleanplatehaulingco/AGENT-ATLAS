import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LISTINGS = [
  { id: 'LS-001', file: 'LS-001-HVAC-Service-Call-Notes-TradeOpsVault.html' },
];

const SHOTS = [
  { name: 'overview',    scrollY: 0,    clip: null,           label: '1-Overview' },
  { name: 'header',      scrollY: 0,    clip: { y: 0,   h: 500 }, label: '2-Header' },
  { name: 'mid-fields',  scrollY: 600,  clip: { y: 0,   h: 700 }, label: '3-Fields' },
  { name: 'bottom',      scrollY: 1400, clip: { y: 0,   h: 700 }, label: '4-Invoice' },
];

// Sample data to pre-fill for the "in use" shot
const SAMPLE_DATA = {
  customer_name: 'John Martinez',
  address: '4821 Westbrook Ln, Austin TX 78701',
  phone: '(512) 555-0183',
  equipment: 'Carrier 3-Ton Split System',
  tech_name: 'Mike R.',
  work_order: 'WO-20240604',
};

async function generateMockups(listingId) {
  const listing = LISTINGS.find(l => l.id === listingId) || LISTINGS[0];
  const htmlPath = path.join(__dirname, 'downloads', listing.file);
  const outDir = path.join(__dirname, 'mockups', listing.id);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 2 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  const files = [];

  for (const shot of SHOTS) {
    await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
    await new Promise(r => setTimeout(r, 300));

    const outFile = path.join(outDir, `${listing.id}-${shot.label}.png`);
    const clipOpts = shot.clip
      ? { x: 0, y: shot.clip.y, width: 1200, height: shot.clip.h }
      : undefined;

    await page.screenshot({ path: outFile, fullPage: !shot.clip, clip: clipOpts });
    files.push(outFile);
    console.log(`✅ Saved: ${path.basename(outFile)}`);
  }

  // Shot 5: filled-in demo
  await page.evaluate((data) => {
    const inputs = document.querySelectorAll('input[type="text"], input:not([type]), textarea');
    const keys = Object.values(data);
    inputs.forEach((el, i) => {
      if (keys[i]) el.value = keys[i];
    });
  }, SAMPLE_DATA);
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  const filledFile = path.join(outDir, `${listing.id}-5-FilledDemo.png`);
  await page.screenshot({ path: filledFile, fullPage: false, clip: { x: 0, y: 0, width: 1200, height: 900 } });
  files.push(filledFile);
  console.log(`✅ Saved: ${path.basename(filledFile)}`);

  await browser.close();
  console.log(`\n📁 All mockups saved to: mockups/${listing.id}/`);
  return files;
}

generateMockups('LS-001').catch(console.error);

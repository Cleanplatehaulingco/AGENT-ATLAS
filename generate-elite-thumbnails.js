const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const mockupsDir = '/home/user/AGENT-ATLAS/mockups';

const listings = [
  {
    id: 'LS-001',
    trade: 'HVAC',
    title: 'HVAC Service\nCall Notes',
    subtitle: 'Diagnosis · Refrigerant · Invoice',
    accentColor: '#e85d04',
    form: {
      customer: 'Martinez HVAC — AC Not Cooling',
      fields: [
        { label: 'Equipment', value: 'Carrier 3-Ton Split AC' },
        { label: 'Refrigerant', value: 'R-410A · Low pressure' },
        { label: 'Labor (3 hrs)', value: '$195.00' },
        { label: 'Capacitor', value: '$89.00' },
        { label: 'Refrigerant Top-Up', value: '$75.00' },
      ],
      total: '$359.00',
      aiText: 'Capacitor failure + low refrigerant is a common combo on 8-10yr units. Recommend quoting full tune-up next visit. Profit margin: 64%.',
    },
  },
  {
    id: 'LS-002',
    trade: 'Plumbing',
    title: 'Plumbing Dispatch\nChecklist',
    subtitle: 'Dispatch · Parts · Invoice',
    accentColor: '#e85d04',
    form: {
      customer: 'Johnson Residence — Burst Pipe',
      fields: [
        { label: 'Issue', value: 'Burst copper pipe, basement' },
        { label: 'Parts', value: '½" copper fittings x4' },
        { label: 'Labor (2 hrs)', value: '$160.00' },
        { label: 'Materials', value: '$48.00' },
        { label: 'Emergency fee', value: '$75.00' },
      ],
      total: '$283.00',
      aiText: 'Burst pipe in below-grade location — check for water damage and recommend pipe insulation wrap quote. Upsell opportunity: ~$180.',
    },
  },
  {
    id: 'LS-003',
    trade: 'Electrical',
    title: 'Electrician Jobsite\nInspection Form',
    subtitle: 'Hazard Check · Panel · Sign-Off',
    accentColor: '#e85d04',
    form: {
      customer: 'Retail Build-Out — Panel Upgrade',
      fields: [
        { label: 'Panel', value: '200A upgrade, 3-phase' },
        { label: 'Code violations', value: '2 found, corrected' },
        { label: 'Labor (6 hrs)', value: '$480.00' },
        { label: 'Materials', value: '$320.00' },
        { label: 'Permit fee', value: '$95.00' },
      ],
      total: '$895.00',
      aiText: 'Commercial panel upgrades carry high liability — document all violations found and corrected. Customer sign-off on inspection is essential. Great margin job at 58%.',
    },
  },
  {
    id: 'LS-004',
    trade: 'Lawn Care',
    title: 'Lawn Care Weekly\nCrew Planner',
    subtitle: 'Routes · Crew Hours · Invoice',
    accentColor: '#e85d04',
    form: {
      customer: 'Weekly Route — 12 Stops',
      fields: [
        { label: 'Crew size', value: '3 techs · 8hr day' },
        { label: 'Mow & edge', value: '$840.00' },
        { label: 'Fertilize x4', value: '$160.00' },
        { label: 'Cleanup', value: '$60.00' },
        { label: 'Fuel', value: '-$45.00' },
      ],
      total: '$1,015.00',
      aiText: 'Strong weekly route. Consider dropping the 2 lowest-revenue stops and replacing with higher-margin fertilization accounts. Net gain: ~$120/wk.',
    },
  },
  {
    id: 'LS-005',
    trade: 'Auto Detail',
    title: 'Auto Detail Intake\n& Waiver Form',
    subtitle: 'Intake · Waiver · Service Invoice',
    accentColor: '#e85d04',
    form: {
      customer: '2022 BMW X5 — Full Detail',
      fields: [
        { label: 'Pre-existing damage', value: '3 scratches logged' },
        { label: 'Interior detail', value: '$120.00' },
        { label: 'Exterior + ceramic', value: '$280.00' },
        { label: 'Engine bay', value: '$75.00' },
        { label: 'Customer sign-off', value: '✓ Signed' },
      ],
      total: '$475.00',
      aiText: 'High-value vehicle — ceramic coat upsell was the right call. Pre-damage log protects you from disputes. Margin on this job: 71%. Strong.',
    },
  },
  {
    id: 'LS-006',
    trade: 'Pest Control',
    title: 'Pest Control\nFollow-Up Cards',
    subtitle: 'Treatment · Chemical Log · Invoice',
    accentColor: '#e85d04',
    form: {
      customer: 'Thompson Home — Ant Treatment',
      fields: [
        { label: 'Pest type', value: 'Carpenter ants, exterior' },
        { label: 'Chemical', value: 'Termidor SC · 0.06% mix' },
        { label: 'Treatment', value: 'Perimeter + entry points' },
        { label: 'Follow-up', value: '30-day scheduled' },
        { label: 'Service fee', value: '$185.00' },
      ],
      total: '$185.00',
      aiText: 'Carpenter ant activity near wood siding — recommend moisture inspection and quote for preventive treatment plan. Recurring service potential: $65/mo.',
    },
  },
  {
    id: 'LS-007',
    trade: 'Roofing',
    title: 'Roofing Change\nOrder Approval',
    subtitle: 'Scope Change · Pricing · Sign-Off',
    accentColor: '#e85d04',
    form: {
      customer: 'Davis Residence — Roof Replacement',
      fields: [
        { label: 'Change', value: 'Added 2 skylights mid-job' },
        { label: 'Original contract', value: '$8,400.00' },
        { label: 'Change order add', value: '+$1,850.00' },
        { label: 'New total', value: '$10,250.00' },
        { label: 'Authorization', value: '✓ Signed 06/04/2026' },
      ],
      total: '$10,250.00',
      aiText: 'Well-documented change order — skylight add at this price point is solid margin. Always get signed approval before starting additions. Protects from disputes.',
    },
  },
];

function buildHTML(listing) {
  const lines = listing.title.split('\n');
  const fieldRows = listing.form.fields.map(f => `
    <div class="field-row">
      <span class="field-label">${f.label}</span>
      <span class="field-value ${f.value.startsWith('$') || f.value.startsWith('+') ? 'money' : ''}">${f.value}</span>
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width: 1200px; height: 1200px; overflow: hidden;
    background: #0d1526;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: #fff;
    display: flex;
    flex-direction: column;
  }

  /* TOP BADGE BAR */
  .topbar {
    background: #e85d04;
    padding: 14px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .topbar-brand {
    font-size: 1.05rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
  }
  .topbar-pills {
    display: flex;
    gap: 10px;
  }
  .pill {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.35);
    border-radius: 20px;
    padding: 5px 14px;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #fff;
  }

  /* HERO SECTION */
  .hero {
    padding: 32px 48px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .trade-tag {
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e85d04;
  }
  .hero-title {
    font-size: 3.2rem;
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #fff;
  }
  .hero-sub {
    font-size: 1.05rem;
    color: rgba(255,255,255,0.5);
    font-weight: 500;
    margin-top: 4px;
  }

  /* MAIN CONTENT — two columns */
  .cols {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 0 48px 24px;
    align-items: stretch;
  }

  /* LEFT — Form preview */
  .form-panel {
    background: #1a2744;
    border: 1.5px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .form-panel-header {
    background: #243356;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .form-panel-header .label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
  .form-panel-header .customer {
    font-size: 0.82rem;
    font-weight: 600;
    color: #fff;
  }
  /* form-fields defined above */
  .field-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 12px;
    background: rgba(255,255,255,0.04);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .field-label {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.5);
    font-weight: 500;
  }
  .field-value {
    font-size: 0.88rem;
    color: #fff;
    font-weight: 600;
  }
  .field-value.money {
    color: #4ade80;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .total-row {
    margin: 8px 20px 16px;
    background: rgba(232,93,4,0.12);
    border: 1.5px solid rgba(232,93,4,0.35);
    border-radius: 10px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .total-label {
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }
  .total-value {
    font-size: 1.35rem;
    font-weight: 900;
    color: #e85d04;
    letter-spacing: -0.02em;
  }
  .auto-calc-badge {
    margin: 0 20px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(74,222,128,0.08);
    border: 1px solid rgba(74,222,128,0.25);
    border-radius: 8px;
  }
  .auto-calc-badge .dot {
    width: 7px; height: 7px;
    background: #4ade80;
    border-radius: 50%;
    flex-shrink: 0;
    box-shadow: 0 0 6px #4ade80;
  }
  .auto-calc-badge span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #4ade80;
    letter-spacing: 0.04em;
  }

  /* RIGHT — AI panel */
  .ai-panel {
    background: #1a2744;
    border: 1.5px solid rgba(232,93,4,0.3);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .ai-panel-header {
    background: linear-gradient(135deg, #e85d04 0%, #f97316 100%);
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .ai-icon {
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.2);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem;
  }
  .ai-panel-header-text .label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.75);
  }
  .ai-panel-header-text .title {
    font-size: 1.0rem;
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
  }
  .ai-body {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: space-between;
  }
  .includes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 4px;
  }
  .include-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.65);
    font-weight: 500;
  }
  .include-check {
    color: #4ade80;
    font-weight: 900;
    font-size: 0.82rem;
    flex-shrink: 0;
  }
  .form-fields {
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ai-text {
    font-size: 0.9rem;
    line-height: 1.65;
    color: rgba(255,255,255,0.85);
    font-weight: 400;
  }
  .ai-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 4px;
  }
  .metric-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 12px 14px;
  }
  .metric-card .m-label {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 4px;
  }
  .metric-card .m-value {
    font-size: 1.4rem;
    font-weight: 900;
    color: #e85d04;
    letter-spacing: -0.02em;
  }
  .metric-card .m-value.green { color: #4ade80; }
  .ai-divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
  .ai-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .ai-tag {
    background: rgba(232,93,4,0.12);
    border: 1px solid rgba(232,93,4,0.25);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 0.72rem;
    font-weight: 700;
    color: #e85d04;
    letter-spacing: 0.03em;
  }

  /* BOTTOM BAR */
  .bottom-bar {
    background: #131f38;
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 16px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .bottom-features {
    display: flex;
    gap: 32px;
  }
  .feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .feature-icon {
    font-size: 1rem;
  }
  .feature-text {
    font-size: 0.78rem;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
  }
  .price-badge {
    background: #e85d04;
    color: #fff;
    font-size: 1.15rem;
    font-weight: 900;
    padding: 10px 24px;
    border-radius: 10px;
    letter-spacing: -0.01em;
  }
</style>
</head>
<body>

  <div class="topbar">
    <div class="topbar-brand">TradeOpsVault</div>
    <div class="topbar-pills">
      <div class="pill">⚡ Auto-Calculating</div>
      <div class="pill">🤖 AI-Powered</div>
      <div class="pill">Instant Download</div>
    </div>
  </div>

  <div class="hero">
    <div class="trade-tag">${listing.trade} · Business Form Template</div>
    <div class="hero-title">${lines[0]}<br>${lines[1] || ''}</div>
    <div class="hero-sub">${listing.subtitle}</div>
  </div>

  <div class="cols">

    <!-- LEFT: Form -->
    <div class="form-panel">
      <div class="form-panel-header">
        <span class="label">Live Form Preview</span>
        <span class="customer">${listing.form.customer}</span>
      </div>
      <div class="form-fields">
        ${fieldRows}
      </div>
      <div class="total-row">
        <span class="total-label">⚡ Auto-Calculated Total</span>
        <span class="total-value">${listing.form.total}</span>
      </div>
      <div class="auto-calc-badge">
        <div class="dot"></div>
        <span>Smart fields — totals update as you type</span>
      </div>
      <div style="padding: 0 20px 20px; display:flex; flex-direction:column; gap:10px; flex:1; justify-content:flex-end;">
        <div style="font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:2px;">How It Works</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:22px;height:22px;background:rgba(232,93,4,0.2);border:1px solid rgba(232,93,4,0.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:900;color:#e85d04;flex-shrink:0;">1</div>
            <span style="font-size:0.78rem;color:rgba(255,255,255,0.6);">Open in Chrome — works offline, no software</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:22px;height:22px;background:rgba(232,93,4,0.2);border:1px solid rgba(232,93,4,0.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:900;color:#e85d04;flex-shrink:0;">2</div>
            <span style="font-size:0.78rem;color:rgba(255,255,255,0.6);">Click any field and type — totals auto-calculate</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:22px;height:22px;background:rgba(232,93,4,0.2);border:1px solid rgba(232,93,4,0.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:900;color:#e85d04;flex-shrink:0;">3</div>
            <span style="font-size:0.78rem;color:rgba(255,255,255,0.6);">Hit "AI Job Review" → get instant pro feedback</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:22px;height:22px;background:rgba(232,93,4,0.2);border:1px solid rgba(232,93,4,0.4);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.65rem;font-weight:900;color:#e85d04;flex-shrink:0;">4</div>
            <span style="font-size:0.78rem;color:rgba(255,255,255,0.6);">Print / Save as PDF — done in minutes</span>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT: AI Analysis -->
    <div class="ai-panel">
      <div class="ai-panel-header">
        <div class="ai-icon">🤖</div>
        <div class="ai-panel-header-text">
          <div class="label">AI Job Review — Powered by Claude</div>
          <div class="title">Instant Professional Analysis</div>
        </div>
      </div>
      <div class="ai-body">
        <div class="ai-text">${listing.form.aiText}</div>
        <div class="ai-divider"></div>
        <div class="ai-metrics">
          <div class="metric-card">
            <div class="m-label">Job Total</div>
            <div class="m-value">${listing.form.total}</div>
          </div>
          <div class="metric-card">
            <div class="m-label">AI Score</div>
            <div class="m-value green">A+</div>
          </div>
        </div>
        <div class="ai-tag-row">
          <div class="ai-tag">Margin Analysis</div>
          <div class="ai-tag">Upsell Tips</div>
          <div class="ai-tag">Risk Flags</div>
          <div class="ai-tag">Next Steps</div>
        </div>
        <div class="ai-divider"></div>
        <div style="font-size:0.68rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:6px;">What's Included</div>
        <div class="includes-grid">
          <div class="include-item"><span class="include-check">✓</span> Auto-calc invoice</div>
          <div class="include-item"><span class="include-check">✓</span> AI Job Review</div>
          <div class="include-item"><span class="include-check">✓</span> Trade Calculator</div>
          <div class="include-item"><span class="include-check">✓</span> CSV Export</div>
          <div class="include-item"><span class="include-check">✓</span> 4 Languages</div>
          <div class="include-item"><span class="include-check">✓</span> Print to PDF</div>
          <div class="include-item"><span class="include-check">✓</span> Job History Log</div>
          <div class="include-item"><span class="include-check">✓</span> Instant Download</div>
        </div>
      </div>
    </div>

  </div>

  <div class="bottom-bar">
    <div class="bottom-features">
      <div class="feature-item"><span class="feature-icon">🌐</span><span class="feature-text">4 Languages</span></div>
      <div class="feature-item"><span class="feature-icon">📄</span><span class="feature-text">Print to PDF</span></div>
      <div class="feature-item"><span class="feature-icon">📊</span><span class="feature-text">CSV Export</span></div>
      <div class="feature-item"><span class="feature-icon">🧮</span><span class="feature-text">Trade Calculators</span></div>
    </div>
    <div class="price-badge">$6.99 · Instant Download</div>
  </div>

</body>
</html>`;
}

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  for (const listing of listings) {
    const html = buildHTML(listing);
    const outDir = path.join(mockupsDir, listing.id);
    fs.mkdirSync(outDir, { recursive: true });

    const outFile = path.join(outDir, `${listing.id}-1-Cover-ELITE.png`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 1200, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: outFile, fullPage: false });
    await page.close();
    console.log(`Done: ${outFile}`);
  }

  await browser.close();
  console.log('All 7 elite thumbnails generated.');
})();

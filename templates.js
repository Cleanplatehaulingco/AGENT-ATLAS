// Agent Atlas — Printable Trade Form Templates
// No ES modules — plain browser script tag compatible
// Usage: openTemplate('LS-001') to open in new tab, or generateTemplate('LS-001') to get HTML string

const _CSS = `
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Arial', sans-serif; font-size: 10pt; color: #1a1a1a; background: #f0f0f0; padding: 20px; }
.page { background: #fff; max-width: 850px; margin: 0 auto; box-shadow: 0 4px 24px rgba(0,0,0,0.18); }
@media print { body { background: #fff; padding: 0; } .page { box-shadow: none; } .no-print { display: none !important; } }
.header { background: #1a1a2e; color: #fff; padding: 20px 28px; display: flex; justify-content: space-between; align-items: center; }
.header .logo-area { display: flex; flex-direction: column; gap: 2px; }
.header .company-name { font-size: 18pt; font-weight: 900; letter-spacing: -0.5px; color: #fff; text-transform: uppercase; }
.header .company-tagline { font-size: 8pt; color: #8899cc; letter-spacing: 1px; text-transform: uppercase; }
.header .form-info { text-align: right; }
.header .form-title { font-size: 14pt; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.5px; }
.header .form-id { font-size: 7.5pt; color: #8899cc; margin-top: 3px; letter-spacing: 1px; }
.accent-bar { height: 4px; background: linear-gradient(90deg, #4f7cff, #2ed88a); }
.info-strip { background: #f7f8fc; border-bottom: 1px solid #e0e4f0; padding: 12px 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.info-field { display: flex; flex-direction: column; gap: 3px; }
.info-field label { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #8899cc; }
.info-field .field-line { border-bottom: 1.5px solid #ccd0e0; min-height: 20px; padding-bottom: 2px; font-size: 10pt; }
.body { padding: 20px 28px; }
.section { margin-bottom: 18px; }
.section-header { background: #1a1a2e; color: #fff; padding: 6px 12px; font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0; border-radius: 3px 3px 0 0; }
.section-body { border: 1.5px solid #ccd0e0; border-top: none; border-radius: 0 0 3px 3px; padding: 14px; }
.field-grid { display: grid; gap: 12px; }
.field-grid.cols-2 { grid-template-columns: 1fr 1fr; }
.field-grid.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
.field-grid.cols-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
.field { display: flex; flex-direction: column; gap: 4px; }
.field label { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #556; }
.field .line { border-bottom: 1.5px solid #ccd0e0; min-height: 22px; }
.field .box { border: 1.5px solid #ccd0e0; min-height: 64px; border-radius: 3px; }
.form-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
.form-table th { background: #1a1a2e; color: #fff; padding: 7px 10px; text-align: left; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; }
.form-table td { border-bottom: 1px solid #e8eaf0; padding: 8px 10px; min-height: 28px; }
.form-table tr:nth-child(even) td { background: #f7f8fc; }
.sig-block { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 16px; padding-top: 16px; border-top: 1.5px solid #ccd0e0; }
.sig-field { display: flex; flex-direction: column; gap: 4px; }
.sig-field label { font-size: 7pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #8899cc; }
.sig-field .sig-line { border-bottom: 2px solid #1a1a2e; min-height: 36px; }
.footer { background: #f7f8fc; border-top: 1px solid #e0e4f0; padding: 10px 28px; display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; color: #aab; }
.footer .disclaimer { font-size: 6.5pt; color: #bbc; max-width: 60%; line-height: 1.4; }
.checkbox-row { display: flex; align-items: center; gap: 8px; margin: 6px 0; font-size: 9.5pt; }
.checkbox-row .cb { width: 14px; height: 14px; border: 1.5px solid #aab; display: inline-block; flex-shrink: 0; }
.print-btn { display: inline-flex; align-items: center; gap: 8px; margin: 16px 28px; padding: 10px 24px; background: #4f7cff; color: #fff; border: none; border-radius: 6px; font-size: 10pt; font-weight: 700; cursor: pointer; }
.print-btn:hover { background: #3a6ae8; }
</style>`;

const TEMPLATES = {

  'LS-001': {
    id: 'LS-001',
    title: 'HVAC Service Call Notes',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>HVAC Service Call Notes — LS-001</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Heating · Cooling · Ventilation</div>
    </div>
    <div class="form-info">
      <div class="form-title">HVAC Service Call Notes</div>
      <div class="form-id">FORM LS-001 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Form #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Job #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Equipment Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Customer Name</label><div class="line"></div></div>
          <div class="field"><label>Service Address</label><div class="line"></div></div>
          <div class="field"><label>Phone / Contact</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Equipment Type</label><div class="line"></div></div>
          <div class="field"><label>Make / Brand</label><div class="line"></div></div>
          <div class="field"><label>Model #</label><div class="line"></div></div>
          <div class="field"><label>Serial #</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Install Year</label><div class="line"></div></div>
          <div class="field"><label>Filter Size</label><div class="line"></div></div>
          <div class="field"><label>Refrigerant Type</label><div class="line"></div></div>
          <div class="field"><label>Warranty Status</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Readings &amp; Diagnostics</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Supply Temp (°F)</label><div class="line"></div></div>
          <div class="field"><label>Return Temp (°F)</label><div class="line"></div></div>
          <div class="field"><label>Delta T</label><div class="line"></div></div>
          <div class="field"><label>Static Pressure (in. WC)</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Suction Pressure (psig)</label><div class="line"></div></div>
          <div class="field"><label>Discharge Pressure (psig)</label><div class="line"></div></div>
          <div class="field"><label>Superheat</label><div class="line"></div></div>
          <div class="field"><label>Subcooling</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Amp Draw (Comp)</label><div class="line"></div></div>
          <div class="field"><label>Amp Draw (Fan)</label><div class="line"></div></div>
          <div class="field"><label>Voltage L1-L2</label><div class="line"></div></div>
          <div class="field"><label>Outdoor Temp (°F)</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Work Performed</div>
      <div class="section-body">
        <div style="margin-bottom:10px">
          <div class="checkbox-row"><span class="cb"></span> Diagnostic / Inspection Only</div>
          <div class="checkbox-row"><span class="cb"></span> Filter Replacement</div>
          <div class="checkbox-row"><span class="cb"></span> Refrigerant Added — Amount: __________ lbs</div>
          <div class="checkbox-row"><span class="cb"></span> Capacitor Replaced</div>
          <div class="checkbox-row"><span class="cb"></span> Contactor Replaced</div>
          <div class="checkbox-row"><span class="cb"></span> Coil Cleaned (Evap / Cond)</div>
          <div class="checkbox-row"><span class="cb"></span> Drain Line Cleared / Treated</div>
          <div class="checkbox-row"><span class="cb"></span> Thermostat Calibrated / Replaced</div>
          <div class="checkbox-row"><span class="cb"></span> Blower Motor / Belt Serviced</div>
          <div class="checkbox-row"><span class="cb"></span> Other — see notes below</div>
        </div>
        <div class="field"><label>Work Notes</label><div class="box" style="min-height:70px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Parts Used</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>#</th><th>Part Description</th><th>Part Number</th><th>Qty</th><th>Unit Cost</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td colspan="5" style="text-align:right;font-weight:700;padding-right:14px">Parts Subtotal</td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Follow-Up &amp; Recommendations</div>
      <div class="section-body">
        <div class="field-grid cols-2" style="margin-bottom:12px">
          <div class="field"><label>Recommended Follow-Up Date</label><div class="line"></div></div>
          <div class="field"><label>Urgency Level</label><div class="line"></div></div>
        </div>
        <div class="field"><label>Technician Recommendations</label><div class="box"></div></div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / License # / Date</div></div>
      <div class="sig-field"><label>Customer Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">By signing you confirm work was performed satisfactorily</div></div>
    </div>

  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. This document is a working field form. Retain copy for your records. Not legal advice.</div>
    <div>LS-001</div>
  </div>
</div>
</body></html>`
  },

  'LS-002': {
    id: 'LS-002',
    title: 'Plumbing Dispatch & Diagnosis Checklist',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Plumbing Dispatch & Diagnosis — LS-002</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Licensed Plumbing Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Plumbing Dispatch &amp; Diagnosis</div>
      <div class="form-id">FORM LS-002 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Dispatch #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Job #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Job Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Customer Name</label><div class="line"></div></div>
          <div class="field"><label>Service Address</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Technician</label><div class="line"></div></div>
          <div class="field"><label>Dispatch Time</label><div class="line"></div></div>
          <div class="field"><label>Arrival Time</label><div class="line"></div></div>
          <div class="field"><label>Property Type</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Problem Description</div>
      <div class="section-body">
        <div class="field-grid cols-2" style="margin-bottom:10px">
          <div class="field"><label>Customer-Reported Issue</label><div class="box" style="min-height:52px"></div></div>
          <div class="field"><label>Location of Problem in Property</label><div class="box" style="min-height:52px"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Duration of Problem</label><div class="line"></div></div>
          <div class="field"><label>Water Source (city/well)</label><div class="line"></div></div>
          <div class="field"><label>Water Heater Type</label><div class="line"></div></div>
          <div class="field"><label>Water Pressure (psi)</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Diagnosis Checklist</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px">
          <div class="checkbox-row"><span class="cb"></span> Active leak — location: _______________</div>
          <div class="checkbox-row"><span class="cb"></span> Drain blockage / slow drain</div>
          <div class="checkbox-row"><span class="cb"></span> Low water pressure</div>
          <div class="checkbox-row"><span class="cb"></span> No hot water</div>
          <div class="checkbox-row"><span class="cb"></span> Running toilet</div>
          <div class="checkbox-row"><span class="cb"></span> Sewer odor</div>
          <div class="checkbox-row"><span class="cb"></span> Water heater failure</div>
          <div class="checkbox-row"><span class="cb"></span> Pipe corrosion / damage</div>
          <div class="checkbox-row"><span class="cb"></span> Fixture replacement needed</div>
          <div class="checkbox-row"><span class="cb"></span> Backflow / cross-connection</div>
          <div class="checkbox-row"><span class="cb"></span> Sump pump issue</div>
          <div class="checkbox-row"><span class="cb"></span> Other — see notes</div>
        </div>
        <div class="field" style="margin-top:12px"><label>Diagnosis Notes</label><div class="box"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Work Completed</div>
      <div class="section-body">
        <div class="field"><label>Description of Repairs / Services Performed</label><div class="box" style="min-height:72px"></div></div>
        <div class="field-grid cols-4" style="margin-top:12px">
          <div class="field"><label>Work Start Time</label><div class="line"></div></div>
          <div class="field"><label>Work End Time</label><div class="line"></div></div>
          <div class="field"><label>Total Labor Hours</label><div class="line"></div></div>
          <div class="field"><label>Labor Rate ($/hr)</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Parts &amp; Materials</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>#</th><th>Item / Part Description</th><th>Part #</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td colspan="5" style="text-align:right;font-weight:700;padding-right:14px">Parts Total</td><td></td></tr>
            <tr><td colspan="5" style="text-align:right;font-weight:700;padding-right:14px">Labor Total</td><td></td></tr>
            <tr><td colspan="5" style="text-align:right;font-weight:700;padding-right:14px;color:#1a1a2e">INVOICE TOTAL</td><td style="font-weight:700"></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Plumber / Technician Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / License # / Date</div></div>
      <div class="sig-field"><label>Customer Approval Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">By signing you authorize work and accept charges above</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain for your records. Not legal advice.</div>
    <div>LS-002</div>
  </div>
</div>
</body></html>`
  },

  'LS-003': {
    id: 'LS-003',
    title: 'Electrician Jobsite Inspection Form',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Electrician Jobsite Inspection — LS-003</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Licensed Electrical Contractor</div>
    </div>
    <div class="form-info">
      <div class="form-title">Jobsite Inspection Form</div>
      <div class="form-id">FORM LS-003 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Inspection Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Form #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Permit #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Site Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Client / Owner</label><div class="line"></div></div>
          <div class="field"><label>Site Address</label><div class="line"></div></div>
          <div class="field"><label>Inspector / Technician</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Property Type</label><div class="line"></div></div>
          <div class="field"><label>Building Age (est.)</label><div class="line"></div></div>
          <div class="field"><label>Service Voltage</label><div class="line"></div></div>
          <div class="field"><label>Service Amperage</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Panel &amp; Circuit Inspection</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:10px">
          <div class="field"><label>Panel Manufacturer</label><div class="line"></div></div>
          <div class="field"><label>Panel Rating (A)</label><div class="line"></div></div>
          <div class="field"><label># of Circuits</label><div class="line"></div></div>
          <div class="field"><label>GFCI Protected</label><div class="line"></div></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;margin-bottom:10px">
          <div class="checkbox-row"><span class="cb"></span> Panel properly labeled</div>
          <div class="checkbox-row"><span class="cb"></span> No double-tapped breakers</div>
          <div class="checkbox-row"><span class="cb"></span> Grounding / bonding verified</div>
          <div class="checkbox-row"><span class="cb"></span> No signs of arcing or burn marks</div>
          <div class="checkbox-row"><span class="cb"></span> Correct breaker sizing throughout</div>
          <div class="checkbox-row"><span class="cb"></span> Neutral and ground separated (subpanel)</div>
          <div class="checkbox-row"><span class="cb"></span> Breakers seat fully (no loose breakers)</div>
          <div class="checkbox-row"><span class="cb"></span> AFCI protection where required</div>
        </div>
        <div class="field"><label>Panel Notes</label><div class="box" style="min-height:50px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Hazard Assessment</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Hazard Item</th><th>Location</th><th>Severity (L/M/H)</th><th>Action Required</th><th>Resolved?</th></tr></thead>
          <tbody>
            <tr><td>Exposed wiring</td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Overloaded circuits</td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Missing knockouts / covers</td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Improper wire gauging</td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Outdated wiring (aluminum/knob-tube)</td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Other:</td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Code Notes</div>
      <div class="section-body">
        <div class="field-grid cols-2" style="margin-bottom:10px">
          <div class="field"><label>NEC Edition in Effect</label><div class="line"></div></div>
          <div class="field"><label>Local Amendments / AHJ</label><div class="line"></div></div>
        </div>
        <div class="field"><label>Code Violations / Notes</label><div class="box"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Sign-Off</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Overall Rating</label><div class="line"></div></div>
          <div class="field"><label>Re-inspection Required?</label><div class="line"></div></div>
          <div class="field"><label>Re-inspection Date</label><div class="line"></div></div>
        </div>
        <div class="field"><label>Summary / Recommendations</label><div class="box" style="min-height:52px"></div></div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Electrician / Inspector Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / License # / Date</div></div>
      <div class="sig-field"><label>Property Owner / Representative</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Inspection findings do not constitute a code compliance certificate. Retain for your records.</div>
    <div>LS-003</div>
  </div>
</div>
</body></html>`
  },

  'LS-004': {
    id: 'LS-004',
    title: 'Lawn Care Weekly Crew Planner',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Lawn Care Weekly Crew Planner — LS-004</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Lawn &amp; Landscape Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Weekly Crew Planner</div>
      <div class="form-id">FORM LS-004 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Week Of</label><div class="field-line"></div></div>
    <div class="info-field"><label>Form #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Crew Lead</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Week Overview</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Total Stops This Week</label><div class="line"></div></div>
          <div class="field"><label>Estimated Hours</label><div class="line"></div></div>
          <div class="field"><label>Vehicle / Equipment</label><div class="line"></div></div>
          <div class="field"><label>Weather Forecast</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Daily Route (Mon–Fri)</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th style="width:60px">Day</th><th>#</th><th>Client Name</th><th>Address</th><th>Services</th><th>Est. Time</th><th>Done ✓</th></tr></thead>
          <tbody>
            <tr><td rowspan="3" style="font-weight:700;background:#e8eaf0">MON</td><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td rowspan="3" style="font-weight:700;background:#e8eaf0">TUE</td><td>4</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>6</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td rowspan="3" style="font-weight:700;background:#e8eaf0">WED</td><td>7</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>8</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>9</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td rowspan="3" style="font-weight:700;background:#e8eaf0">THU</td><td>10</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>11</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>12</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td rowspan="3" style="font-weight:700;background:#e8eaf0">FRI</td><td>13</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>14</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>15</td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Crew Assignments</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Crew Member</th><th>Role</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Total Hrs</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Notes &amp; Issues</div>
      <div class="section-body">
        <div class="field-grid cols-2">
          <div class="field"><label>Equipment Issues / Maintenance Needed</label><div class="box" style="min-height:60px"></div></div>
          <div class="field"><label>Client Notes / Special Instructions</label><div class="box" style="min-height:60px"></div></div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Crew Lead Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
      <div class="sig-field"><label>Manager / Office Sign-Off</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain for your records.</div>
    <div>LS-004</div>
  </div>
</div>
</body></html>`
  },

  'LS-005': {
    id: 'LS-005',
    title: 'Auto Detail Intake + Damage Waiver',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Auto Detail Intake + Damage Waiver — LS-005</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Professional Auto Detailing</div>
    </div>
    <div class="form-info">
      <div class="form-title">Detail Intake &amp; Damage Waiver</div>
      <div class="form-id">FORM LS-005 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Order #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Detailer</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Vehicle Information</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Customer Name</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
          <div class="field"><label>Email</label><div class="line"></div></div>
          <div class="field"><label>Drop-Off Time</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Year</label><div class="line"></div></div>
          <div class="field"><label>Make</label><div class="line"></div></div>
          <div class="field"><label>Model</label><div class="line"></div></div>
          <div class="field"><label>Color</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-3" style="margin-top:12px">
          <div class="field"><label>License Plate</label><div class="line"></div></div>
          <div class="field"><label>VIN (last 6)</label><div class="line"></div></div>
          <div class="field"><label>Mileage In</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Service Selections</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px 20px">
          <div class="checkbox-row"><span class="cb"></span> Exterior Hand Wash</div>
          <div class="checkbox-row"><span class="cb"></span> Interior Vacuum</div>
          <div class="checkbox-row"><span class="cb"></span> Full Interior Detail</div>
          <div class="checkbox-row"><span class="cb"></span> Clay Bar Treatment</div>
          <div class="checkbox-row"><span class="cb"></span> Paint Correction (Stage 1)</div>
          <div class="checkbox-row"><span class="cb"></span> Paint Correction (Stage 2)</div>
          <div class="checkbox-row"><span class="cb"></span> Ceramic Coating</div>
          <div class="checkbox-row"><span class="cb"></span> Wax / Sealant Application</div>
          <div class="checkbox-row"><span class="cb"></span> Engine Bay Cleaning</div>
          <div class="checkbox-row"><span class="cb"></span> Headlight Restoration</div>
          <div class="checkbox-row"><span class="cb"></span> Odor Elimination</div>
          <div class="checkbox-row"><span class="cb"></span> Tire &amp; Wheel Detail</div>
          <div class="checkbox-row"><span class="cb"></span> Glass Treatment</div>
          <div class="checkbox-row"><span class="cb"></span> Leather Conditioning</div>
          <div class="checkbox-row"><span class="cb"></span> Other: __________________</div>
        </div>
        <div class="field-grid cols-3" style="margin-top:12px">
          <div class="field"><label>Package / Bundle Selected</label><div class="line"></div></div>
          <div class="field"><label>Quoted Price</label><div class="line"></div></div>
          <div class="field"><label>Estimated Completion Time</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Pre-Existing Damage Documentation</div>
      <div class="section-body">
        <p style="font-size:8pt;color:#667;margin-bottom:10px">Note all pre-existing damage before service begins. Sketch or describe damage on the vehicle outline below.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
          <div>
            <div style="border:1.5px solid #ccd0e0;border-radius:4px;padding:10px;min-height:110px;position:relative;">
              <div style="font-size:7pt;font-weight:700;text-transform:uppercase;color:#8899cc;margin-bottom:6px">Vehicle Diagram (Top View) — Mark damage with X</div>
              <div style="font-size:8pt;color:#ccc;text-align:center;padding-top:20px">[ Sketch area — mark scratches, dents, chips ]</div>
            </div>
          </div>
          <div class="field"><label>Written Damage Notes</label><div class="box" style="min-height:110px"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Liability Waiver</div>
      <div class="section-body">
        <p style="font-size:8.5pt;line-height:1.6;color:#334;border:1px solid #e0e4f0;padding:12px;border-radius:3px;background:#f7f8fc">
          I, the undersigned vehicle owner, authorize the above-listed detailing services and acknowledge that all pre-existing damage has been documented above. I understand that detailing services involve the use of water, chemicals, and equipment that may react differently with aged, modified, or previously repaired surfaces. I release <strong>[Your Company Name]</strong> from liability for damage to pre-existing conditions including but not limited to: faded or peeling paint, aftermarket wraps, cracked trim, loose emblems, existing water damage, or items left inside the vehicle. I agree that the company is not responsible for loss of personal items left in the vehicle. Payment is due upon completion of services.
        </p>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Customer Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Printed Name / Date — I have read and agree to the waiver above</div></div>
      <div class="sig-field"><label>Detailer / Intake Staff</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. This waiver does not override applicable consumer protection laws. Consult an attorney for jurisdiction-specific requirements.</div>
    <div>LS-005</div>
  </div>
</div>
</body></html>`
  },

  'LS-006': {
    id: 'LS-006',
    title: 'Pest Control Follow-Up Card',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pest Control Follow-Up Card — LS-006</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Pest Management Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Pest Control Follow-Up Card</div>
      <div class="form-id">FORM LS-006 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Service Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Account #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Technician</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Client Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:10px">
          <div class="field"><label>Client Name</label><div class="line"></div></div>
          <div class="field"><label>Service Address</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Property Type</label><div class="line"></div></div>
          <div class="field"><label>Square Footage</label><div class="line"></div></div>
          <div class="field"><label>Service Plan</label><div class="line"></div></div>
          <div class="field"><label>Contract Start Date</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Treatment Summary</div>
      <div class="section-body">
        <div class="field-grid cols-2" style="margin-bottom:10px">
          <div>
            <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#556;margin-bottom:6px">Pests Targeted</div>
            <div class="checkbox-row"><span class="cb"></span> Ants</div>
            <div class="checkbox-row"><span class="cb"></span> Cockroaches</div>
            <div class="checkbox-row"><span class="cb"></span> Rodents (mice/rats)</div>
            <div class="checkbox-row"><span class="cb"></span> Spiders</div>
            <div class="checkbox-row"><span class="cb"></span> Termites</div>
            <div class="checkbox-row"><span class="cb"></span> Bed Bugs</div>
            <div class="checkbox-row"><span class="cb"></span> Wasps / Hornets</div>
            <div class="checkbox-row"><span class="cb"></span> Other: ______________</div>
          </div>
          <div>
            <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#556;margin-bottom:6px">Treatment Methods Used</div>
            <div class="checkbox-row"><span class="cb"></span> Liquid Spray — Interior</div>
            <div class="checkbox-row"><span class="cb"></span> Liquid Spray — Exterior</div>
            <div class="checkbox-row"><span class="cb"></span> Bait Stations Placed / Checked</div>
            <div class="checkbox-row"><span class="cb"></span> Glue Traps Set</div>
            <div class="checkbox-row"><span class="cb"></span> Dust Application</div>
            <div class="checkbox-row"><span class="cb"></span> Fumigation</div>
            <div class="checkbox-row"><span class="cb"></span> Exclusion / Sealing</div>
            <div class="checkbox-row"><span class="cb"></span> Other: ______________</div>
          </div>
        </div>
        <div class="field-grid cols-3">
          <div class="field"><label>Chemical(s) Used</label><div class="line"></div></div>
          <div class="field"><label>EPA Reg. #</label><div class="line"></div></div>
          <div class="field"><label>Application Rate</label><div class="line"></div></div>
        </div>
        <div class="field" style="margin-top:10px"><label>Treatment Notes</label><div class="box" style="min-height:52px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Next Service</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Next Service Date</label><div class="line"></div></div>
          <div class="field"><label>Service Frequency</label><div class="line"></div></div>
          <div class="field"><label>Technician Assigned</label><div class="line"></div></div>
          <div class="field"><label>Estimated Cost</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Recommendations</div>
      <div class="section-body">
        <div class="field-grid cols-2">
          <div>
            <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#556;margin-bottom:6px">Client Action Items</div>
            <div class="checkbox-row"><span class="cb"></span> Seal entry points (cracks / gaps)</div>
            <div class="checkbox-row"><span class="cb"></span> Remove standing water</div>
            <div class="checkbox-row"><span class="cb"></span> Store food in sealed containers</div>
            <div class="checkbox-row"><span class="cb"></span> Clear debris / clutter from crawlspace</div>
            <div class="checkbox-row"><span class="cb"></span> Trim vegetation away from structure</div>
            <div class="checkbox-row"><span class="cb"></span> Fix moisture/leak issues</div>
          </div>
          <div class="field"><label>Additional Recommendations</label><div class="box" style="min-height:100px"></div></div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / License # / Date</div></div>
      <div class="sig-field"><label>Client Acknowledgment</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Service received and understood</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Keep copy for pesticide application records as required by state law.</div>
    <div>LS-006</div>
  </div>
</div>
</body></html>`
  },

  'LS-007': {
    id: 'LS-007',
    title: 'Roofing Change Order + Approval Form',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Roofing Change Order — LS-007</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Roofing &amp; Exterior Solutions</div>
    </div>
    <div class="form-info">
      <div class="form-title">Change Order &amp; Approval</div>
      <div class="form-id">FORM LS-007 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Change Order Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Change Order #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Project / Job #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Project Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Property Owner</label><div class="line"></div></div>
          <div class="field"><label>Property Address</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Roofing Foreman</label><div class="line"></div></div>
          <div class="field"><label>Original Contract Date</label><div class="line"></div></div>
          <div class="field"><label>Project Start Date</label><div class="line"></div></div>
          <div class="field"><label>Projected Completion</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Original Contract Summary</div>
      <div class="section-body">
        <div class="field-grid cols-3">
          <div class="field"><label>Original Scope Summary</label><div class="line"></div></div>
          <div class="field"><label>Original Contract Value</label><div class="line"></div></div>
          <div class="field"><label>Amount Paid to Date</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Scope of Change</div>
      <div class="section-body">
        <div class="field"><label>Reason for Change Order</label><div class="box" style="min-height:60px"></div></div>
        <div class="field" style="margin-top:12px"><label>Detailed Description of Additional / Changed Work</label><div class="box" style="min-height:60px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Materials Added / Removed</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Action</th><th>Material / Item Description</th><th>Unit</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>ADD</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>ADD</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>ADD</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>REMOVE</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>REMOVE</td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td colspan="5" style="text-align:right;font-weight:700;padding-right:14px">Materials Net Change</td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Price Adjustment</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Materials Net Change</label><div class="line"></div></div>
          <div class="field"><label>Additional Labor Cost</label><div class="line"></div></div>
          <div class="field"><label>This Change Order Total</label><div class="line" style="font-weight:700"></div></div>
          <div class="field"><label>Revised Contract Total</label><div class="line" style="font-weight:700"></div></div>
        </div>
        <div class="field-grid cols-2" style="margin-top:12px">
          <div class="field"><label>New Estimated Completion Date</label><div class="line"></div></div>
          <div class="field"><label>Schedule Impact (days added)</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">6 — Authorization</div>
      <div class="section-body" style="background:#fffbf0;border-color:#e8d87a">
        <p style="font-size:8.5pt;line-height:1.6;color:#444;margin-bottom:14px">By signing below, the property owner authorizes the above change in scope and the revised contract amount. Work will not begin on the changed scope until this form is signed. This change order is incorporated into and subject to the terms of the original contract.</p>
        <div class="sig-block" style="margin-top:0;padding-top:0;border-top:none">
          <div class="sig-field"><label>Property Owner Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Printed Name / Date</div></div>
          <div class="sig-field"><label>Contractor Representative</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Title / Date</div></div>
        </div>
      </div>
    </div>

  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Change orders must be signed before commencement of additional work. Retain all copies.</div>
    <div>LS-007</div>
  </div>
</div>
</body></html>`
  },


  'LS-008': {
    id: 'LS-008',
    title: 'Pressure Washing Route Sheet',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pressure Washing Route Sheet — LS-008</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Pressure Washing &amp; Surface Cleaning</div>
    </div>
    <div class="form-info">
      <div class="form-title">Daily Route Sheet</div>
      <div class="form-id">FORM LS-008 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Route #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Crew / Operator</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Date &amp; Crew Info</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Vehicle / Rig #</label><div class="line"></div></div>
          <div class="field"><label>Machine PSI</label><div class="line"></div></div>
          <div class="field"><label>Start Mileage</label><div class="line"></div></div>
          <div class="field"><label>End Mileage</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Daily Job List</div>
      <div class="section-body">
        <table class="form-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Client / Address</th>
              <th>Surface Type</th>
              <th>PSI Used</th>
              <th>Detergent / Mix</th>
              <th>Start</th>
              <th>End</th>
              <th>Hrs</th>
              <th>Client Sign-Off</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>7</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>8</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — End of Day Summary</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Total Jobs Completed</label><div class="line"></div></div>
          <div class="field"><label>Total Billable Hours</label><div class="line"></div></div>
          <div class="field"><label>Water Used (gal est.)</label><div class="line"></div></div>
          <div class="field"><label>Chemical Used (oz/gal)</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-2">
          <div class="field"><label>Equipment Issues / Damage</label><div class="box" style="min-height:52px"></div></div>
          <div class="field"><label>Notes / Follow-Up Items</label><div class="box" style="min-height:52px"></div></div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Operator Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
      <div class="sig-field"><label>Supervisor / Office Review</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain for your records.</div>
    <div>LS-008</div>
  </div>
</div>
</body></html>`
  },

  'LS-009': {
    id: 'LS-009',
    title: 'Appliance Repair Parts Tracker',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Appliance Repair Parts Tracker — LS-009</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Appliance Repair Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Parts Order Tracker</div>
      <div class="form-id">FORM LS-009 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Week / Period</label><div class="field-line"></div></div>
    <div class="info-field"><label>Form #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Technician</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Technician Info</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Technician Name</label><div class="line"></div></div>
          <div class="field"><label>Badge / ID #</label><div class="line"></div></div>
          <div class="field"><label>Reporting Period</label><div class="line"></div></div>
          <div class="field"><label>Supervisor</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Parts Order Log</div>
      <div class="section-body">
        <table class="form-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer / Job #</th>
              <th>Appliance Make / Model</th>
              <th>Part Description</th>
              <th>Part #</th>
              <th>Supplier</th>
              <th>Ordered</th>
              <th>ETA</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>7</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>8</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>9</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>10</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
        <div style="font-size:7.5pt;color:#8899cc;margin-top:6px">Status codes: O = Ordered · S = Shipped · R = Received · I = Installed · B = Back-ordered · C = Cancelled</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Order Summary</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Total Parts Ordered</label><div class="line"></div></div>
          <div class="field"><label>Total Parts Received</label><div class="line"></div></div>
          <div class="field"><label>Total Parts Cost</label><div class="line"></div></div>
          <div class="field"><label>Jobs Awaiting Parts</label><div class="line"></div></div>
        </div>
        <div class="field" style="margin-top:12px"><label>Notes / Back-Order Details</label><div class="box" style="min-height:52px"></div></div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
      <div class="sig-field"><label>Parts Manager / Supervisor</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Reviewed / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain for inventory and job cost records.</div>
    <div>LS-009</div>
  </div>
</div>
</body></html>`
  },

  'LS-010': {
    id: 'LS-010',
    title: 'Handyman Materials Reimbursement Sheet',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Handyman Materials Reimbursement — LS-010</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Handyman &amp; Home Repair Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Materials Reimbursement Sheet</div>
      <div class="form-id">FORM LS-010 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Form #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Job #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Job Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Client Name</label><div class="line"></div></div>
          <div class="field"><label>Job Address</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Technician / Handyman</label><div class="line"></div></div>
          <div class="field"><label>Work Date(s)</label><div class="line"></div></div>
          <div class="field"><label>Job Description</label><div class="line"></div></div>
          <div class="field"><label>Labor Rate ($/hr)</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Materials Purchased</div>
      <div class="section-body">
        <table class="form-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Item Description</th>
              <th>Store / Supplier</th>
              <th>Receipt #</th>
              <th>Date Purchased</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>7</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>8</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Cost Summary</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Materials Subtotal</label><div class="line"></div></div>
          <div class="field"><label>Tax / Fees</label><div class="line"></div></div>
          <div class="field"><label>Labor Total</label><div class="line"></div></div>
          <div class="field"><label style="color:#1a1a2e;font-weight:900">TOTAL DUE</label><div class="line" style="border-color:#1a1a2e;font-weight:700"></div></div>
        </div>
        <div class="field" style="margin-top:12px"><label>Payment Method</label><div class="line" style="max-width:50%"></div></div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">I certify all materials above were purchased for this job / Date</div></div>
      <div class="sig-field"><label>Client Sign-Off</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">I authorize reimbursement of the above materials / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Attach receipts where required. Retain for your records.</div>
    <div>LS-010</div>
  </div>
</div>
</body></html>`
  },

  'LS-011': {
    id: 'LS-011',
    title: 'Mobile Mechanic Service Summary',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Mobile Mechanic Service Summary — LS-011</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Mobile Auto Repair &amp; Service</div>
    </div>
    <div class="form-info">
      <div class="form-title">Service Summary</div>
      <div class="form-id">FORM LS-011 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Service Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Invoice #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Job #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Vehicle Information</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Customer Name</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
          <div class="field"><label>Email</label><div class="line"></div></div>
          <div class="field"><label>Service Location</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Year</label><div class="line"></div></div>
          <div class="field"><label>Make</label><div class="line"></div></div>
          <div class="field"><label>Model</label><div class="line"></div></div>
          <div class="field"><label>Engine</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4" style="margin-top:12px">
          <div class="field"><label>License Plate</label><div class="line"></div></div>
          <div class="field"><label>VIN</label><div class="line"></div></div>
          <div class="field"><label>Mileage</label><div class="line"></div></div>
          <div class="field"><label>Color</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Work Performed</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;margin-bottom:10px">
          <div class="checkbox-row"><span class="cb"></span> Oil &amp; Filter Change</div>
          <div class="checkbox-row"><span class="cb"></span> Brake Inspection / Service</div>
          <div class="checkbox-row"><span class="cb"></span> Battery Test / Replacement</div>
          <div class="checkbox-row"><span class="cb"></span> Starter / Alternator</div>
          <div class="checkbox-row"><span class="cb"></span> Spark Plugs / Ignition</div>
          <div class="checkbox-row"><span class="cb"></span> Belts / Hoses</div>
          <div class="checkbox-row"><span class="cb"></span> Diagnostic Scan (OBD-II)</div>
          <div class="checkbox-row"><span class="cb"></span> Fluid Top-Off / Flush</div>
          <div class="checkbox-row"><span class="cb"></span> Tire Change / Rotation</div>
          <div class="checkbox-row"><span class="cb"></span> Other: __________________</div>
        </div>
        <div class="field"><label>Detailed Work Description</label><div class="box" style="min-height:60px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Parts Replaced</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>#</th><th>Part Description</th><th>OEM / Aftermarket</th><th>Part Number</th><th>Qty</th><th>Unit Cost</th><th>Total</th></tr></thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td colspan="6" style="text-align:right;font-weight:700;padding-right:14px">Parts Subtotal</td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Labor &amp; Time</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Start Time</label><div class="line"></div></div>
          <div class="field"><label>End Time</label><div class="line"></div></div>
          <div class="field"><label>Total Hours</label><div class="line"></div></div>
          <div class="field"><label>Labor Rate ($/hr)</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4" style="margin-top:12px">
          <div class="field"><label>Labor Total</label><div class="line"></div></div>
          <div class="field"><label>Parts Total</label><div class="line"></div></div>
          <div class="field"><label>Travel / Service Fee</label><div class="line"></div></div>
          <div class="field"><label style="color:#1a1a2e;font-weight:900">TOTAL DUE</label><div class="line" style="border-color:#1a1a2e;font-weight:700"></div></div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Mechanic Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Certification # / Date</div></div>
      <div class="sig-field"><label>Customer Sign-Off</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Work completed to satisfaction / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain for vehicle service records.</div>
    <div>LS-011</div>
  </div>
</div>
</body></html>`
  },

  'LS-012': {
    id: 'LS-012',
    title: 'Locksmith Job Authorization Form',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Locksmith Job Authorization — LS-012</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Licensed Locksmith Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Job Authorization Form</div>
      <div class="form-id">FORM LS-012 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Work Order #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Technician</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Client &amp; Property Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Client Full Name</label><div class="line"></div></div>
          <div class="field"><label>Phone Number</label><div class="line"></div></div>
          <div class="field"><label>Email</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-3">
          <div class="field"><label>Property / Service Address</label><div class="line"></div></div>
          <div class="field"><label>Property Type</label><div class="line"></div></div>
          <div class="field"><label>Unit / Apt #</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — ID Verification</div>
      <div class="section-body" style="background:#fffaf0">
        <p style="font-size:8pt;color:#774;margin-bottom:10px;font-style:italic">Locksmith is required by law to verify the identity and authorization of the requesting party before performing any service. Complete all fields.</p>
        <div class="field-grid cols-4" style="margin-bottom:10px">
          <div class="field"><label>ID Type Presented</label><div class="line"></div></div>
          <div class="field"><label>ID Number</label><div class="line"></div></div>
          <div class="field"><label>ID Expiration Date</label><div class="line"></div></div>
          <div class="field"><label>ID Matches Name Above?</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-2">
          <div class="field"><label>Relationship to Property (owner/tenant/agent)</label><div class="line"></div></div>
          <div class="field"><label>Proof of Ownership / Residency</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Authorization Statement</div>
      <div class="section-body">
        <p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #e0e4f0;padding:12px;border-radius:3px;background:#f7f8fc">
          I, the undersigned, hereby authorize <strong>[Your Company Name]</strong> to perform the locksmith services described below on the property listed above. I certify that I am the legal owner, authorized tenant, or designated representative of this property. I understand that making a false statement to obtain locksmith services may constitute a criminal offense. I accept full liability for any unauthorized service request. I agree to pay the quoted price upon completion of service.
        </p>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Service Description</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;margin-bottom:12px">
          <div class="checkbox-row"><span class="cb"></span> Lockout — Residential</div>
          <div class="checkbox-row"><span class="cb"></span> Lockout — Vehicle</div>
          <div class="checkbox-row"><span class="cb"></span> Lock Re-Key</div>
          <div class="checkbox-row"><span class="cb"></span> Lock Replacement / Upgrade</div>
          <div class="checkbox-row"><span class="cb"></span> Deadbolt Installation</div>
          <div class="checkbox-row"><span class="cb"></span> Master Key System</div>
          <div class="checkbox-row"><span class="cb"></span> Safe Opening / Combination Change</div>
          <div class="checkbox-row"><span class="cb"></span> Key Duplication</div>
          <div class="checkbox-row"><span class="cb"></span> Access Control / Smart Lock</div>
          <div class="checkbox-row"><span class="cb"></span> Other: __________________</div>
        </div>
        <div class="field-grid cols-3">
          <div class="field"><label>Quoted Price</label><div class="line"></div></div>
          <div class="field"><label>After-Hours / Emergency Fee</label><div class="line"></div></div>
          <div class="field"><label>Total Amount Agreed</label><div class="line"></div></div>
        </div>
        <div class="field" style="margin-top:12px"><label>Service Notes</label><div class="box" style="min-height:50px"></div></div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Printed Name / Date — I authorize the above service</div></div>
      <div class="sig-field"><label>Locksmith Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / License # / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. ID verification is mandatory. Retain signed copy for all locksmith work orders per state licensing requirements.</div>
    <div>LS-012</div>
  </div>
</div>
</body></html>`
  },

  'LS-013': {
    id: 'LS-013',
    title: 'Painting Prep & Final Punch List',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Painting Prep & Final Punch List — LS-013</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Professional Painting &amp; Finishing</div>
    </div>
    <div class="form-info">
      <div class="form-title">Prep &amp; Final Punch List</div>
      <div class="form-id">FORM LS-013 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Form #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Job #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Project Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Client Name</label><div class="line"></div></div>
          <div class="field"><label>Project Address</label><div class="line"></div></div>
          <div class="field"><label>Lead Painter</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Project Type</label><div class="line"></div></div>
          <div class="field"><label>Interior / Exterior</label><div class="line"></div></div>
          <div class="field"><label>Start Date</label><div class="line"></div></div>
          <div class="field"><label>Completion Date</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Surface Prep Checklist</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px">
          <div class="checkbox-row"><span class="cb"></span> Furniture / fixtures moved or covered</div>
          <div class="checkbox-row"><span class="cb"></span> Drop cloths laid on all floors</div>
          <div class="checkbox-row"><span class="cb"></span> Hardware removed (outlets, plates, hooks)</div>
          <div class="checkbox-row"><span class="cb"></span> Cracks / holes patched with spackle</div>
          <div class="checkbox-row"><span class="cb"></span> Surfaces sanded smooth</div>
          <div class="checkbox-row"><span class="cb"></span> Surfaces wiped clean (dust / grease)</div>
          <div class="checkbox-row"><span class="cb"></span> Caulk applied to trim / edges</div>
          <div class="checkbox-row"><span class="cb"></span> Tape applied to all masking areas</div>
          <div class="checkbox-row"><span class="cb"></span> Wood rot addressed / repaired</div>
          <div class="checkbox-row"><span class="cb"></span> Stains spot-primed (water / smoke)</div>
          <div class="checkbox-row"><span class="cb"></span> Exterior surfaces pressure washed</div>
          <div class="checkbox-row"><span class="cb"></span> All prep work approved by lead</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Primer &amp; Base Coat Notes</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:10px">
          <div class="field"><label>Primer Brand</label><div class="line"></div></div>
          <div class="field"><label>Primer Color / Tint</label><div class="line"></div></div>
          <div class="field"><label>Applied By</label><div class="line"></div></div>
          <div class="field"><label>Dry Time</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Top Coat Brand</label><div class="line"></div></div>
          <div class="field"><label>Color Name / Code</label><div class="line"></div></div>
          <div class="field"><label>Sheen Level</label><div class="line"></div></div>
          <div class="field"><label># of Coats</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Final Punch List</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Area / Room</th><th>Item / Issue</th><th>Assigned To</th><th>Completed?</th><th>Initials</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Client Walkthrough Sign-Off</div>
      <div class="section-body">
        <div class="field"><label>Client Comments / Punch Items Noted</label><div class="box" style="min-height:50px"></div></div>
        <div class="field-grid cols-3" style="margin-top:10px">
          <div class="field"><label>Walkthrough Date</label><div class="line"></div></div>
          <div class="field"><label>Outstanding Items Resolved?</label><div class="line"></div></div>
          <div class="field"><label>Final Payment Amount</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Lead Painter Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
      <div class="sig-field"><label>Client Acceptance</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Work completed to satisfaction / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain for project records.</div>
    <div>LS-013</div>
  </div>
</div>
</body></html>`
  },


  'LS-014': {
    id: 'LS-014',
    title: 'Snow Removal Trigger Checklist',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Snow Removal Trigger Checklist — LS-014</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Snow &amp; Ice Management Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Snow Removal Trigger Checklist</div>
      <div class="form-id">FORM LS-014 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Season</label><div class="field-line"></div></div>
    <div class="info-field"><label>Form #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Operations Manager</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Season Information</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Season Start Date</label><div class="line"></div></div>
          <div class="field"><label>Season End Date</label><div class="line"></div></div>
          <div class="field"><label>Total Contracted Routes</label><div class="line"></div></div>
          <div class="field"><label>Number of Crews</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Service Trigger Conditions</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div>
            <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#556;margin-bottom:8px">Snowfall Triggers (check applicable)</div>
            <div class="checkbox-row"><span class="cb"></span> 1" accumulation trigger</div>
            <div class="checkbox-row"><span class="cb"></span> 2" accumulation trigger</div>
            <div class="checkbox-row"><span class="cb"></span> 3" accumulation trigger</div>
            <div class="checkbox-row"><span class="cb"></span> Per-push (any accumulation)</div>
            <div class="checkbox-row"><span class="cb"></span> Zero-tolerance (continuous)</div>
            <div class="checkbox-row"><span class="cb"></span> Client-requested call-out only</div>
          </div>
          <div>
            <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#556;margin-bottom:8px">Ice &amp; Conditions Triggers</div>
            <div class="checkbox-row"><span class="cb"></span> Black ice — auto deploy</div>
            <div class="checkbox-row"><span class="cb"></span> Temp below ___°F — pre-treat</div>
            <div class="checkbox-row"><span class="cb"></span> Freezing rain forecast</div>
            <div class="checkbox-row"><span class="cb"></span> Post-storm re-freeze check</div>
            <div class="checkbox-row"><span class="cb"></span> Daytime melt + overnight freeze</div>
            <div class="checkbox-row"><span class="cb"></span> Client site inspection only</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Client Route List</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>#</th><th>Client / Property Name</th><th>Address</th><th>Trigger (in.)</th><th>Salt / Sand?</th><th>Priority</th><th>Crew</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>7</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>8</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Service Log</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Event Date</th><th>Snowfall / Condition</th><th>Deployment Time</th><th>Routes Serviced</th><th>Salt Used (lbs)</th><th>Completed By</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Equipment Check</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px 20px">
          <div class="checkbox-row"><span class="cb"></span> Plow blades inspected</div>
          <div class="checkbox-row"><span class="cb"></span> Truck fluids topped off</div>
          <div class="checkbox-row"><span class="cb"></span> Salt spreaders calibrated</div>
          <div class="checkbox-row"><span class="cb"></span> Salt / sand inventory stocked</div>
          <div class="checkbox-row"><span class="cb"></span> Snow blowers serviced</div>
          <div class="checkbox-row"><span class="cb"></span> Emergency contact list updated</div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Operations Manager Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
      <div class="sig-field"><label>Owner / Supervisor Review</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain for season operations records.</div>
    <div>LS-014</div>
  </div>
</div>
</body></html>`
  },

  'LS-015': {
    id: 'LS-015',
    title: 'Window Cleaning Client Packet',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Window Cleaning Client Packet — LS-015</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Professional Window Cleaning</div>
    </div>
    <div class="form-info">
      <div class="form-title">Client Service Packet</div>
      <div class="form-id">FORM LS-015 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Client #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Route</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Client Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Client Name</label><div class="line"></div></div>
          <div class="field"><label>Billing Address</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-3">
          <div class="field"><label>Email</label><div class="line"></div></div>
          <div class="field"><label>Preferred Contact Method</label><div class="line"></div></div>
          <div class="field"><label>Referral Source</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Property Details</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Service Address</label><div class="line"></div></div>
          <div class="field"><label>Property Type</label><div class="line"></div></div>
          <div class="field"><label>Stories / Height</label><div class="line"></div></div>
          <div class="field"><label>Total Window Count</label><div class="line"></div></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px">
          <div class="checkbox-row"><span class="cb"></span> Interior windows included</div>
          <div class="checkbox-row"><span class="cb"></span> Screen cleaning included</div>
          <div class="checkbox-row"><span class="cb"></span> Track &amp; sill cleaning included</div>
          <div class="checkbox-row"><span class="cb"></span> Skylights included</div>
          <div class="checkbox-row"><span class="cb"></span> Hard water stain removal</div>
          <div class="checkbox-row"><span class="cb"></span> Storm windows / panels</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Service Schedule</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Visit #</th><th>Scheduled Date</th><th>Time Window</th><th>Service Type</th><th>Technician</th><th>Completed</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Scope of Work</div>
      <div class="section-body">
        <div class="field"><label>Detailed Scope / Special Instructions</label><div class="box" style="min-height:60px"></div></div>
        <div class="field-grid cols-3" style="margin-top:12px">
          <div class="field"><label>Service Frequency</label><div class="line"></div></div>
          <div class="field"><label>Quoted Price Per Visit</label><div class="line"></div></div>
          <div class="field"><label>Annual Contract Value</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Terms &amp; Service Agreement</div>
      <div class="section-body">
        <p style="font-size:8.5pt;line-height:1.6;color:#334;border:1px solid #e0e4f0;padding:12px;border-radius:3px;background:#f7f8fc">
          Services are performed during agreed-upon windows. Client is responsible for providing clear access to all windows. <strong>[Your Company Name]</strong> is not liable for pre-existing screen tears, cracked seals, window damage, or paint drips on glass. Cancellations require 24-hour notice or a $_______ cancellation fee applies. Payment is due on the day of service unless invoiced monthly under a contract agreement. Prices may be adjusted annually.
        </p>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">I agree to the scope and terms above / Date</div></div>
      <div class="sig-field"><label>Company Representative</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Title / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain signed copy for client file.</div>
    <div>LS-015</div>
  </div>
</div>
</body></html>`
  },

  'LS-016': {
    id: 'LS-016',
    title: 'Pool Service Chemical Log',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pool Service Chemical Log — LS-016</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Pool &amp; Spa Service</div>
    </div>
    <div class="form-info">
      <div class="form-title">Chemical Service Log</div>
      <div class="form-id">FORM LS-016 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Month / Year</label><div class="field-line"></div></div>
    <div class="info-field"><label>Account #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Technician</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Pool Information</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Client Name</label><div class="line"></div></div>
          <div class="field"><label>Service Address</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
          <div class="field"><label>Pool Type</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Pool Volume (gal)</label><div class="line"></div></div>
          <div class="field"><label>Sanitizer Type</label><div class="line"></div></div>
          <div class="field"><label>Filter Type</label><div class="line"></div></div>
          <div class="field"><label>Pump Run Time (hr/day)</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Weekly Water Chemistry Log</div>
      <div class="section-body">
        <table class="form-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Tech</th>
              <th>Free Cl (FC) ppm</th>
              <th>pH</th>
              <th>Total Alk (TA)</th>
              <th>Cal Hard (CH)</th>
              <th>CYA ppm</th>
              <th>Temp °F</th>
              <th>Notes / Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
        <div style="font-size:7.5pt;color:#8899cc;margin-top:6px">Target ranges: FC 2–4 ppm · pH 7.4–7.6 · TA 80–120 ppm · CH 200–400 ppm · CYA 30–50 ppm</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Chemical Dosage Record</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Date</th><th>Chemical Name</th><th>Purpose</th><th>Amount Added</th><th>Unit</th><th>Applied By</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Monthly Summary</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:10px">
          <div class="field"><label>Total Service Visits</label><div class="line"></div></div>
          <div class="field"><label>Filter Cleaned / Backwashed</label><div class="line"></div></div>
          <div class="field"><label>Algae Treatment Required?</label><div class="line"></div></div>
          <div class="field"><label>Equipment Issues Noted?</label><div class="line"></div></div>
        </div>
        <div class="field"><label>Monthly Observations &amp; Recommendations</label><div class="box" style="min-height:52px"></div></div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Pool Technician Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Certification # / Date</div></div>
      <div class="sig-field"><label>Client Review</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Optional monthly sign-off / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Retain chemical records as required by local health department regulations.</div>
    <div>LS-016</div>
  </div>
</div>
</body></html>`
  },

  'LS-017': {
    id: 'LS-017',
    title: 'Flooring Estimate Scope Matrix',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Flooring Estimate Scope Matrix — LS-017</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Flooring Installation &amp; Refinishing</div>
    </div>
    <div class="form-info">
      <div class="form-title">Estimate Scope Matrix</div>
      <div class="form-id">FORM LS-017 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Estimate Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Estimate #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Valid Until</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Client &amp; Project Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Client Name</label><div class="line"></div></div>
          <div class="field"><label>Project Address</label><div class="line"></div></div>
          <div class="field"><label>Phone / Email</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Project Type</label><div class="line"></div></div>
          <div class="field"><label>Estimated Start Date</label><div class="line"></div></div>
          <div class="field"><label>Estimated Duration</label><div class="line"></div></div>
          <div class="field"><label>Estimator</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Room-by-Room Scope</div>
      <div class="section-body">
        <table class="form-table">
          <thead>
            <tr>
              <th>Room / Area</th>
              <th>Sq Ft</th>
              <th>Flooring Material</th>
              <th>Material $/sqft</th>
              <th>Material Total</th>
              <th>Labor $/sqft</th>
              <th>Labor Total</th>
              <th>Room Total</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Living Room</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Master Bedroom</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Bedroom 2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Bedroom 3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Kitchen</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Dining Room</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Hallway</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Bathroom(s)</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Stairs</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td>Other:</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td colspan="7" style="text-align:right;font-weight:700;padding-right:14px">PROJECT TOTAL SQ FT &amp; SUBTOTAL</td><td style="font-weight:700"></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Material Summary</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Primary Material</label><div class="line"></div></div>
          <div class="field"><label>Brand / Grade</label><div class="line"></div></div>
          <div class="field"><label>Color / SKU</label><div class="line"></div></div>
          <div class="field"><label>Waste Factor (%)</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4" style="margin-top:10px">
          <div class="field"><label>Underlayment Needed?</label><div class="line"></div></div>
          <div class="field"><label>Subfloor Prep Required?</label><div class="line"></div></div>
          <div class="field"><label>Transitions / Molding</label><div class="line"></div></div>
          <div class="field"><label>Demo / Removal</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Estimate Total</div>
      <div class="section-body">
        <div class="field-grid cols-4">
          <div class="field"><label>Materials Subtotal</label><div class="line"></div></div>
          <div class="field"><label>Labor Subtotal</label><div class="line"></div></div>
          <div class="field"><label>Additional Charges</label><div class="line"></div></div>
          <div class="field"><label style="color:#1a1a2e;font-weight:900">ESTIMATE TOTAL</label><div class="line" style="border-color:#1a1a2e;font-weight:700"></div></div>
        </div>
        <div class="field-grid cols-3" style="margin-top:12px">
          <div class="field"><label>Deposit Required</label><div class="line"></div></div>
          <div class="field"><label>Balance Due</label><div class="line"></div></div>
          <div class="field"><label>Payment Terms</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Estimator Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
      <div class="sig-field"><label>Client Approval</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">I approve this estimate and authorize the project to proceed / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Estimates are valid for the period shown. Final invoice may vary based on field conditions.</div>
    <div>LS-017</div>
  </div>
</div>
</body></html>`
  },


  'LS-018': {
    id: 'LS-018',
    title: 'Contractor Daily Site Report',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Contractor Daily Site Report — LS-018</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">General Contracting &amp; Construction</div>
    </div>
    <div class="form-info">
      <div class="form-title">Daily Site Report</div>
      <div class="form-id">FORM LS-018 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Report Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Report #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Project #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Project Information</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Project Name</label><div class="line"></div></div>
          <div class="field"><label>Site Address</label><div class="line"></div></div>
          <div class="field"><label>Project Manager</label><div class="line"></div></div>
          <div class="field"><label>Weather / Conditions</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Temperature (°F)</label><div class="line"></div></div>
          <div class="field"><label>Contract Phase</label><div class="line"></div></div>
          <div class="field"><label>% Complete (overall)</label><div class="line"></div></div>
          <div class="field"><label>Site Foreman</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Crew Roster</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Name</th><th>Trade / Role</th><th>Company / Sub</th><th>Time In</th><th>Time Out</th><th>Hours</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td colspan="5" style="text-align:right;font-weight:700;padding-right:14px">Total Man-Hours Today</td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Work Completed Today</div>
      <div class="section-body">
        <div class="field"><label>Summary of Work Performed</label><div class="box" style="min-height:72px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Materials Used / Received</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Material / Item</th><th>Qty Used</th><th>Unit</th><th>Delivered Today?</th><th>Supplier</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Delays, Issues &amp; Safety Notes</div>
      <div class="section-body">
        <div class="field-grid cols-2">
          <div class="field"><label>Delays / Problems Encountered</label><div class="box" style="min-height:56px"></div></div>
          <div class="field"><label>Safety Incidents / Near-Misses</label><div class="box" style="min-height:56px"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">6 — Next Day Plan</div>
      <div class="section-body">
        <div class="field"><label>Planned Work for Tomorrow</label><div class="box" style="min-height:52px"></div></div>
        <div class="field-grid cols-3" style="margin-top:12px">
          <div class="field"><label>Materials Needed Tomorrow</label><div class="line"></div></div>
          <div class="field"><label>Subs / Crew Expected</label><div class="line"></div></div>
          <div class="field"><label>Inspections Scheduled?</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Site Foreman Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
      <div class="sig-field"><label>Project Manager Review</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. File in project documentation folder. Retain for duration of project plus 3 years.</div>
    <div>LS-018</div>
  </div>
</div>
</body></html>`
  },

  'LS-019': {
    id: 'LS-019',
    title: 'Septic Service Pump Log',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Septic Service Pump Log — LS-019</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Septic &amp; Waste Management Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Septic Service Pump Log</div>
      <div class="form-id">FORM LS-019 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Service Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Work Order #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Technician</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Property Information</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:12px">
          <div class="field"><label>Property Owner</label><div class="line"></div></div>
          <div class="field"><label>Service Address</label><div class="line"></div></div>
          <div class="field"><label>Phone</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>County / Municipality</label><div class="line"></div></div>
          <div class="field"><label>Permit # (if applicable)</label><div class="line"></div></div>
          <div class="field"><label>Years at Property</label><div class="line"></div></div>
          <div class="field"><label>Last Service Date</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Tank Details</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:12px">
          <div class="field"><label>Tank Size (gal)</label><div class="line"></div></div>
          <div class="field"><label>Tank Material</label><div class="line"></div></div>
          <div class="field"><label>Number of Compartments</label><div class="line"></div></div>
          <div class="field"><label>Tank Install Year</label><div class="line"></div></div>
        </div>
        <div class="field-grid cols-4">
          <div class="field"><label>Tank Location / Depth</label><div class="line"></div></div>
          <div class="field"><label>Access Risers Present?</label><div class="line"></div></div>
          <div class="field"><label>Effluent Filter Present?</label><div class="line"></div></div>
          <div class="field"><label>Pump Chamber Present?</label><div class="line"></div></div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Service Record</div>
      <div class="section-body">
        <table class="form-table">
          <thead><tr><th>Service Date</th><th>Tech</th><th>Service Type</th><th>Gallons Pumped</th><th>Waste Disposal Site</th><th>Manifest #</th></tr></thead>
          <tbody>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Observations</div>
      <div class="section-body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;margin-bottom:12px">
          <div class="checkbox-row"><span class="cb"></span> Tank in good condition</div>
          <div class="checkbox-row"><span class="cb"></span> Inlet / outlet baffle intact</div>
          <div class="checkbox-row"><span class="cb"></span> Signs of root intrusion</div>
          <div class="checkbox-row"><span class="cb"></span> Cracks / damage to tank</div>
          <div class="checkbox-row"><span class="cb"></span> High scum / sludge levels</div>
          <div class="checkbox-row"><span class="cb"></span> Effluent filter cleaned</div>
          <div class="checkbox-row"><span class="cb"></span> Pump alarm functioning</div>
          <div class="checkbox-row"><span class="cb"></span> Evidence of drainfield failure</div>
        </div>
        <div class="field"><label>Observation Notes</label><div class="box" style="min-height:52px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">5 — Compliance Notes &amp; Recommendations</div>
      <div class="section-body">
        <div class="field-grid cols-3" style="margin-bottom:10px">
          <div class="field"><label>Next Recommended Service Date</label><div class="line"></div></div>
          <div class="field"><label>Pumping Frequency Recommended</label><div class="line"></div></div>
          <div class="field"><label>Regulatory Report Required?</label><div class="line"></div></div>
        </div>
        <div class="field"><label>Compliance Notes / Required Actions</label><div class="box" style="min-height:52px"></div></div>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Technician Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / License # / Date</div></div>
      <div class="sig-field"><label>Property Owner Acknowledgment</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Service received and conditions noted / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. Waste hauling manifests must comply with state environmental regulations. Retain all records.</div>
    <div>LS-019</div>
  </div>
</div>
</body></html>`
  },

  'LS-020': {
    id: 'LS-020',
    title: 'Service Fee Transparency Addendum',
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Service Fee Transparency Addendum — LS-020</title>${_CSS}</head><body>
<button class="print-btn no-print" onclick="window.print()">&#128438; Print / Save as PDF</button>
<div class="page">
  <div class="header">
    <div class="logo-area">
      <div class="company-name">Your Company Name</div>
      <div class="company-tagline">Professional Trade Services</div>
    </div>
    <div class="form-info">
      <div class="form-title">Service Fee Transparency Addendum</div>
      <div class="form-id">FORM LS-020 · REV 1.0</div>
    </div>
  </div>
  <div class="accent-bar"></div>
  <div class="info-strip">
    <div class="info-field"><label>Effective Date</label><div class="field-line"></div></div>
    <div class="info-field"><label>Addendum #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Job / Account #</label><div class="field-line"></div></div>
    <div class="info-field"><label>Page</label><div class="field-line">1 of 1</div></div>
  </div>
  <div class="body">

    <div class="section">
      <div class="section-header">1 — Business &amp; Client Information</div>
      <div class="section-body">
        <div class="field-grid cols-2" style="margin-bottom:12px">
          <div>
            <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#8899cc;margin-bottom:6px">Service Provider</div>
            <div class="field" style="margin-bottom:8px"><label>Company Name</label><div class="line"></div></div>
            <div class="field" style="margin-bottom:8px"><label>Address</label><div class="line"></div></div>
            <div class="field-grid cols-2">
              <div class="field"><label>Phone</label><div class="line"></div></div>
              <div class="field"><label>License #</label><div class="line"></div></div>
            </div>
          </div>
          <div>
            <div style="font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#8899cc;margin-bottom:6px">Client</div>
            <div class="field" style="margin-bottom:8px"><label>Client Name</label><div class="line"></div></div>
            <div class="field" style="margin-bottom:8px"><label>Service Address</label><div class="line"></div></div>
            <div class="field-grid cols-2">
              <div class="field"><label>Phone</label><div class="line"></div></div>
              <div class="field"><label>Email</label><div class="line"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">2 — Current Fee Schedule</div>
      <div class="section-body">
        <table class="form-table">
          <thead>
            <tr>
              <th>Fee / Charge Type</th>
              <th>Description</th>
              <th>Rate / Amount</th>
              <th>Unit</th>
              <th>Applies When</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Service Call / Diagnostic</td><td></td><td></td><td>per visit</td><td>Every dispatch</td></tr>
            <tr><td>Standard Labor Rate</td><td></td><td></td><td>per hour</td><td>Standard hours M–F</td></tr>
            <tr><td>Overtime Labor Rate</td><td></td><td></td><td>per hour</td><td>After __ hrs / weekends</td></tr>
            <tr><td>Emergency / After-Hours</td><td></td><td></td><td>per visit</td><td>Outside business hours</td></tr>
            <tr><td>Holiday Rate</td><td></td><td></td><td>per hour</td><td>Recognized holidays</td></tr>
            <tr><td>Travel / Mileage Fee</td><td></td><td></td><td>per mile / flat</td><td>Beyond __ miles</td></tr>
            <tr><td>Parts Mark-Up</td><td></td><td>___% above cost</td><td>per order</td><td>All parts sourced</td></tr>
            <tr><td>Permit / Filing Fee</td><td></td><td></td><td>flat fee</td><td>When permit required</td></tr>
            <tr><td>Cancellation Fee</td><td></td><td></td><td>flat fee</td><td>Less than __ hrs notice</td></tr>
            <tr><td>Returned Check Fee</td><td></td><td></td><td>flat fee</td><td>NSF / returned payment</td></tr>
            <tr><td>Late Payment Fee</td><td></td><td>___% / month</td><td>monthly</td><td>Past due after __ days</td></tr>
            <tr><td>Other:</td><td></td><td></td><td></td><td></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <div class="section-header">3 — Payment Terms</div>
      <div class="section-body">
        <div class="field-grid cols-4" style="margin-bottom:10px">
          <div class="field"><label>Invoice Due Date</label><div class="line"></div></div>
          <div class="field"><label>Accepted Payment Methods</label><div class="line"></div></div>
          <div class="field"><label>Deposit Required</label><div class="line"></div></div>
          <div class="field"><label>Finance / Payment Plan?</label><div class="line"></div></div>
        </div>
        <div class="field"><label>Additional Payment Terms / Notes</label><div class="box" style="min-height:50px"></div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">4 — Client Acknowledgment</div>
      <div class="section-body" style="background:#f7f8fc">
        <p style="font-size:8.5pt;line-height:1.7;color:#334;border:1px solid #e0e4f0;padding:12px;border-radius:3px">
          By signing below, I acknowledge that I have received, read, and understand the fee schedule listed above. I agree that all services rendered by <strong>[Your Company Name]</strong> will be billed in accordance with the rates shown, and that this addendum forms part of my service agreement. I understand that rates may be updated with 30 days written notice. I agree to pay all invoices in accordance with the payment terms stated above.
        </p>
      </div>
    </div>

    <div class="sig-block">
      <div class="sig-field"><label>Client Signature</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Printed Name / Date</div></div>
      <div class="sig-field"><label>Company Representative</label><div class="sig-line"></div><div style="font-size:7.5pt;color:#aab;margin-top:3px">Name / Title / Date</div></div>
    </div>
  </div>
  <div class="footer">
    <div>TradeOpsVault &nbsp;·&nbsp; tradeopsvault.etsy.com</div>
    <div class="disclaimer">For business use only. This addendum should be presented to all new clients before service begins. Not a substitute for a full service contract.</div>
    <div>LS-020</div>
  </div>
</div>
</body></html>`
  }

};

function generateTemplate(listingId) {
  const t = TEMPLATES[listingId];
  if (!t) return '<p>Template not found.</p>';
  return t.html;
}

function openTemplate(listingId) {
  const html = generateTemplate(listingId);
  const win = window.open('', '_blank');
  if (win) { win.document.write(html); win.document.close(); }
}

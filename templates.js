// Agent Atlas — Printable Trade Form Templates
// No ES modules — plain browser script tag compatible
// Usage: openTemplate('LS-001') to open in new tab, or generateTemplate('LS-001') to get HTML string

const TEMPLATES = {

  // ─────────────────────────────────────────────────────────────────────────
  // LS-001 — HVAC Service Call Notes
  // ─────────────────────────────────────────────────────────────────────────
  'LS-001': {
    id: 'LS-001',
    title: 'HVAC Service Call Notes',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HVAC Service Call Notes — LS-001</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 11pt;
    color: #111;
    background: #fff;
    padding: 24px;
    max-width: 800px;
    margin: 0 auto;
  }
  .print-btn {
    display: inline-block;
    margin-bottom: 18px;
    padding: 8px 22px;
    background: #1a56db;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 11pt;
    cursor: pointer;
  }
  .print-btn:hover { background: #1345b7; }
  @media print { .print-btn { display: none !important; } }

  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2.5px solid #111;
    padding-bottom: 10px;
    margin-bottom: 18px;
  }
  .company-block .company-name {
    font-size: 20pt;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: #111;
    border: 2px dashed #bbb;
    padding: 4px 12px;
    display: inline-block;
    min-width: 220px;
    min-height: 34px;
  }
  .company-block .company-sub {
    font-size: 8.5pt;
    color: #555;
    margin-top: 3px;
  }
  .form-title {
    text-align: right;
  }
  .form-title h1 {
    font-size: 15pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .form-title .form-id {
    font-size: 8.5pt;
    color: #666;
    margin-top: 2px;
  }

  .row {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
  }
  .field {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .field label {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #444;
  }
  .field .line {
    border-bottom: 1.5px solid #333;
    min-height: 22px;
    width: 100%;
  }
  .field .line-tall {
    border: 1.5px solid #333;
    min-height: 54px;
    width: 100%;
    padding: 3px;
  }

  .section-title {
    font-size: 9pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    background: #f0f0f0;
    border-left: 3px solid #333;
    padding: 4px 8px;
    margin: 16px 0 10px 0;
  }

  .readings-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 12px;
  }

  table.parts-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
    font-size: 10pt;
  }
  table.parts-table th {
    background: #f0f0f0;
    border: 1px solid #bbb;
    padding: 5px 8px;
    text-align: left;
    font-size: 8pt;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
  table.parts-table td {
    border: 1px solid #bbb;
    padding: 4px 8px;
    height: 24px;
  }

  .sig-row {
    display: flex;
    gap: 24px;
    margin-top: 20px;
  }
  .sig-block {
    flex: 1;
    border-top: 1.5px solid #333;
    padding-top: 5px;
  }
  .sig-block .sig-label {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #444;
  }
  .sig-block .sig-name-line {
    border-bottom: 1px solid #aaa;
    margin-top: 28px;
    min-height: 18px;
  }
  .sig-block .sig-sub {
    font-size: 7.5pt;
    color: #666;
    margin-top: 2px;
  }

  .followup-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  .followup-row label { font-size: 9pt; font-weight: 600; }
  .check-option {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9.5pt;
  }
  .check-box {
    width: 14px;
    height: 14px;
    border: 1.5px solid #333;
    display: inline-block;
    flex-shrink: 0;
  }

  footer {
    margin-top: 28px;
    padding-top: 8px;
    border-top: 1px solid #ccc;
    text-align: center;
    font-size: 7.5pt;
    color: #999;
  }
  @media print {
    body { padding: 16px; }
    @page { margin: 0.6in; size: letter; }
  }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">&#128438; Print / Save as PDF</button>

<header>
  <div class="company-block">
    <div class="company-name">&nbsp;</div>
    <div class="company-sub">Phone: _________________ &nbsp;&nbsp; License #: _________________</div>
  </div>
  <div class="form-title">
    <h1>HVAC Service Call Notes</h1>
    <div class="form-id">Form LS-001 &nbsp;|&nbsp; Work Order #: _______________</div>
  </div>
</header>

<div class="row">
  <div class="field">
    <label>Date</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Time of Arrival</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Technician Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Tech ID / Badge</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Customer Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Phone</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field" style="flex:3">
    <label>Service Address</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Unit / Suite</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Equipment Information</div>

<div class="row">
  <div class="field">
    <label>Equipment Type</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Make / Manufacturer</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Model Number</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Serial Number</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Age of Unit (approx.)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Last Service Date</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Filter Size</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Warranty Status</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Issue Reported by Customer</div>

<div class="row">
  <div class="field">
    <label>Customer Complaint / Issue Description</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="section-title">System Readings &amp; Diagnostics</div>

<div class="readings-grid">
  <div class="field">
    <label>Supply Air Temp (°F)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Return Air Temp (°F)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Delta T (Supply–Return)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Suction Pressure (PSI)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Discharge Pressure (PSI)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Refrigerant Type</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Refrigerant Added (lbs)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Outdoor Temp (°F)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Static Pressure (in. w.c.)</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Parts Used</div>

<table class="parts-table">
  <thead>
    <tr>
      <th style="width:15%">Part Number</th>
      <th style="width:40%">Description</th>
      <th style="width:15%">Qty</th>
      <th style="width:15%">Unit Cost</th>
      <th style="width:15%">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Work Performed</div>

<div class="row">
  <div class="field">
    <label>Description of Work Performed</label>
    <div class="line-tall" style="min-height:70px"></div>
  </div>
</div>

<div class="section-title">Follow-Up</div>

<div class="followup-row">
  <label>Follow-Up Needed?</label>
  <div class="check-option"><div class="check-box"></div> Yes</div>
  <div class="check-option"><div class="check-box"></div> No</div>
  &nbsp;&nbsp;
  <label>If yes, reason:</label>
  <div style="flex:1; border-bottom:1.5px solid #333; min-height:22px;"></div>
</div>

<div class="row">
  <div class="field">
    <label>Scheduled Follow-Up Date</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Parts on Order</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Total Labor Hours</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Total Invoice Amount</label>
    <div class="line"></div>
  </div>
</div>

<div class="sig-row">
  <div class="sig-block">
    <div class="sig-label">Customer Signature</div>
    <div class="sig-name-line"></div>
    <div class="sig-sub">By signing, customer acknowledges work has been completed as described above.</div>
  </div>
  <div class="sig-block" style="max-width:160px">
    <div class="sig-label">Date</div>
    <div class="sig-name-line"></div>
  </div>
  <div class="sig-block">
    <div class="sig-label">Technician Signature</div>
    <div class="sig-name-line"></div>
    <div class="sig-sub">Technician certifies all information above is accurate and complete.</div>
  </div>
  <div class="sig-block" style="max-width:160px">
    <div class="sig-label">Date</div>
    <div class="sig-name-line"></div>
  </div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-001 HVAC Service Call Notes &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>

</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-002 — Plumbing Dispatch & Diagnosis Checklist
  // ─────────────────────────────────────────────────────────────────────────
  'LS-002': {
    id: 'LS-002',
    title: 'Plumbing Dispatch & Diagnosis Checklist',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Plumbing Dispatch & Diagnosis — LS-002</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 11pt;
    color: #111;
    background: #fff;
    padding: 24px;
    max-width: 800px;
    margin: 0 auto;
  }
  .print-btn {
    display: inline-block; margin-bottom: 18px; padding: 8px 22px;
    background: #1a56db; color: #fff; border: none; border-radius: 5px;
    font-size: 11pt; cursor: pointer;
  }
  .print-btn:hover { background: #1345b7; }
  @media print { .print-btn { display: none !important; } }

  header {
    display: flex; justify-content: space-between; align-items: flex-end;
    border-bottom: 2.5px solid #111; padding-bottom: 10px; margin-bottom: 18px;
  }
  .company-name {
    font-size: 20pt; font-weight: 700; border: 2px dashed #bbb;
    padding: 4px 12px; display: inline-block; min-width: 220px; min-height: 34px;
  }
  .company-sub { font-size: 8.5pt; color: #555; margin-top: 3px; }
  .form-title { text-align: right; }
  .form-title h1 { font-size: 15pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-title .form-id { font-size: 8.5pt; color: #666; margin-top: 2px; }

  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 60px; padding: 3px; }

  .section-title {
    font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px;
    background: #f0f0f0; border-left: 3px solid #333; padding: 4px 8px; margin: 16px 0 10px 0;
  }

  .checkbox-grid {
    display: flex; flex-wrap: wrap; gap: 10px 24px; margin-bottom: 12px;
  }
  .check-item {
    display: flex; align-items: center; gap: 7px; font-size: 10pt;
  }
  .cb {
    width: 15px; height: 15px; border: 1.5px solid #333;
    display: inline-block; flex-shrink: 0; border-radius: 2px;
  }

  table.mat-table {
    width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10pt;
  }
  table.mat-table th {
    background: #f0f0f0; border: 1px solid #bbb; padding: 5px 8px;
    text-align: left; font-size: 8pt; text-transform: uppercase;
  }
  table.mat-table td { border: 1px solid #bbb; padding: 4px 8px; height: 24px; }

  .sig-row { display: flex; gap: 24px; margin-top: 20px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 5px; }
  .sig-label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .sig-line { border-bottom: 1px solid #aaa; margin-top: 28px; }
  .sig-sub { font-size: 7.5pt; color: #666; margin-top: 2px; }

  footer {
    margin-top: 28px; padding-top: 8px; border-top: 1px solid #ccc;
    text-align: center; font-size: 7.5pt; color: #999;
  }
  @media print { body { padding: 16px; } @page { margin: 0.6in; size: letter; } }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">&#128438; Print / Save as PDF</button>

<header>
  <div>
    <div class="company-name">&nbsp;</div>
    <div class="company-sub">Phone: _________________ &nbsp;&nbsp; License #: _________________</div>
  </div>
  <div class="form-title">
    <h1>Plumbing Dispatch &amp; Diagnosis</h1>
    <div class="form-id">Form LS-002 &nbsp;|&nbsp; Dispatch #: _______________</div>
  </div>
</header>

<div class="row">
  <div class="field">
    <label>Date</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Call Time</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Dispatcher Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Priority</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Technician Assigned</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Tech Phone / Radio</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Estimated Arrival</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Customer Information</div>

<div class="row">
  <div class="field">
    <label>Customer Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Phone</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Alt. Phone</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field" style="flex:3">
    <label>Service Address</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Apt / Unit</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>City</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>State</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Zip</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Issue Type (check all that apply)</div>

<div class="checkbox-grid">
  <div class="check-item"><div class="cb"></div> Leak / Burst Pipe</div>
  <div class="check-item"><div class="cb"></div> No Hot Water</div>
  <div class="check-item"><div class="cb"></div> Slow / Clogged Drain</div>
  <div class="check-item"><div class="cb"></div> Sewer Backup</div>
  <div class="check-item"><div class="cb"></div> Running Toilet</div>
  <div class="check-item"><div class="cb"></div> Low Water Pressure</div>
  <div class="check-item"><div class="cb"></div> Water Heater Issue</div>
  <div class="check-item"><div class="cb"></div> Gas Line Issue</div>
  <div class="check-item"><div class="cb"></div> Fixture Replacement</div>
  <div class="check-item"><div class="cb"></div> Other (describe below)</div>
</div>

<div class="row">
  <div class="field">
    <label>Additional Issue Details</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="section-title">Diagnosis &amp; Findings</div>

<div class="row">
  <div class="field">
    <label>Technician Diagnosis Notes</label>
    <div class="line-tall" style="min-height:70px"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Parts / Materials Needed</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="section-title">Materials Used</div>

<table class="mat-table">
  <thead>
    <tr>
      <th style="width:15%">Item #</th>
      <th style="width:40%">Material / Part Description</th>
      <th style="width:15%">Qty</th>
      <th style="width:15%">Unit Cost</th>
      <th style="width:15%">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Time Log &amp; Job Status</div>

<div class="row">
  <div class="field">
    <label>Time In</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Time Out</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Total Hours</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Labor Rate</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Total Invoice</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Job Status</div>

<div class="checkbox-grid" style="margin-bottom:14px">
  <div class="check-item"><div class="cb"></div> Job Complete</div>
  <div class="check-item"><div class="cb"></div> Parts on Order — Return Scheduled</div>
  <div class="check-item"><div class="cb"></div> Referred to Specialist</div>
  <div class="check-item"><div class="cb"></div> Awaiting Customer Approval</div>
  <div class="check-item"><div class="cb"></div> Emergency Shut-Off Engaged</div>
  <div class="check-item"><div class="cb"></div> Follow-Up Required</div>
</div>

<div class="row">
  <div class="field">
    <label>Follow-Up Notes / Return Date</label>
    <div class="line"></div>
  </div>
</div>

<div class="sig-row">
  <div class="sig-block">
    <div class="sig-label">Customer Sign-Off</div>
    <div class="sig-line"></div>
    <div class="sig-sub">I authorize the work described and confirm it was completed satisfactorily.</div>
  </div>
  <div class="sig-block" style="max-width:150px">
    <div class="sig-label">Date</div>
    <div class="sig-line"></div>
  </div>
  <div class="sig-block">
    <div class="sig-label">Technician Signature</div>
    <div class="sig-line"></div>
    <div class="sig-sub">Tech certifies accuracy of all information above.</div>
  </div>
  <div class="sig-block" style="max-width:150px">
    <div class="sig-label">Date</div>
    <div class="sig-line"></div>
  </div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-002 Plumbing Dispatch &amp; Diagnosis &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>

</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-003 — Electrician Jobsite Inspection Form
  // ─────────────────────────────────────────────────────────────────────────
  'LS-003': {
    id: 'LS-003',
    title: 'Electrician Jobsite Inspection Form',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Electrician Jobsite Inspection — LS-003</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 11pt; color: #111; background: #fff;
    padding: 24px; max-width: 800px; margin: 0 auto;
  }
  .print-btn {
    display: inline-block; margin-bottom: 18px; padding: 8px 22px;
    background: #1a56db; color: #fff; border: none; border-radius: 5px;
    font-size: 11pt; cursor: pointer;
  }
  .print-btn:hover { background: #1345b7; }
  @media print { .print-btn { display: none !important; } }

  header {
    display: flex; justify-content: space-between; align-items: flex-end;
    border-bottom: 2.5px solid #111; padding-bottom: 10px; margin-bottom: 18px;
  }
  .company-name {
    font-size: 20pt; font-weight: 700; border: 2px dashed #bbb;
    padding: 4px 12px; display: inline-block; min-width: 220px; min-height: 34px;
  }
  .company-sub { font-size: 8.5pt; color: #555; margin-top: 3px; }
  .form-title { text-align: right; }
  .form-title h1 { font-size: 15pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-id { font-size: 8.5pt; color: #666; margin-top: 2px; }

  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 60px; padding: 3px; }

  .section-title {
    font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px;
    background: #f0f0f0; border-left: 3px solid #333; padding: 4px 8px; margin: 16px 0 10px 0;
  }

  .checkbox-grid { display: flex; flex-wrap: wrap; gap: 10px 24px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 7px; font-size: 10pt; }
  .cb { width: 15px; height: 15px; border: 1.5px solid #333; display: inline-block; flex-shrink: 0; border-radius: 2px; }

  table.circuit-table {
    width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10pt;
  }
  table.circuit-table th {
    background: #f0f0f0; border: 1px solid #bbb; padding: 5px 8px;
    text-align: left; font-size: 8pt; text-transform: uppercase;
  }
  table.circuit-table td { border: 1px solid #bbb; padding: 4px 8px; height: 24px; }
  table.circuit-table td.center { text-align: center; }

  .yn-row { display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
  .yn-row .yn-label { font-size: 9.5pt; font-weight: 600; min-width: 220px; }
  .yn-opt { display: flex; align-items: center; gap: 5px; font-size: 9.5pt; }

  .sig-row { display: flex; gap: 24px; margin-top: 20px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 5px; }
  .sig-label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .sig-line { border-bottom: 1px solid #aaa; margin-top: 28px; }
  .sig-sub { font-size: 7.5pt; color: #666; margin-top: 2px; }

  footer {
    margin-top: 28px; padding-top: 8px; border-top: 1px solid #ccc;
    text-align: center; font-size: 7.5pt; color: #999;
  }
  @media print { body { padding: 16px; } @page { margin: 0.6in; size: letter; } }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">&#128438; Print / Save as PDF</button>

<header>
  <div>
    <div class="company-name">&nbsp;</div>
    <div class="company-sub">Phone: _________________ &nbsp;&nbsp; Electrical License #: _________________</div>
  </div>
  <div class="form-title">
    <h1>Electrician Jobsite Inspection</h1>
    <div class="form-id">Form LS-003 &nbsp;|&nbsp; Inspection #: _______________</div>
  </div>
</header>

<div class="row">
  <div class="field">
    <label>Inspection Date</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Inspector Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Inspector License #</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Permit #</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field" style="flex:3">
    <label>Site / Job Address</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Unit / Suite</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Customer / Owner Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Phone</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Contractor / Company</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Job Type</div>

<div class="checkbox-grid">
  <div class="check-item"><div class="cb"></div> Residential</div>
  <div class="check-item"><div class="cb"></div> Commercial</div>
  <div class="check-item"><div class="cb"></div> Industrial</div>
  <div class="check-item"><div class="cb"></div> New Construction</div>
  <div class="check-item"><div class="cb"></div> Renovation / Upgrade</div>
  <div class="check-item"><div class="cb"></div> Service Call / Repair</div>
  <div class="check-item"><div class="cb"></div> Panel Upgrade</div>
  <div class="check-item"><div class="cb"></div> EV Charger Install</div>
  <div class="check-item"><div class="cb"></div> Solar / Inverter</div>
  <div class="check-item"><div class="cb"></div> Other: _______________</div>
</div>

<div class="section-title">Panel Information</div>

<div class="row">
  <div class="field">
    <label>Panel Make / Brand</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Panel Amperage</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Voltage (120V / 240V)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Panel Location</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Main Breaker Size</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Number of Slots</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Slots Used</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Slots Available</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Circuits Checked</div>

<table class="circuit-table">
  <thead>
    <tr>
      <th style="width:8%">Circuit #</th>
      <th style="width:28%">Description / Location</th>
      <th style="width:10%">Breaker (A)</th>
      <th style="width:10%">Wire Gauge</th>
      <th style="width:10%">Voltage</th>
      <th style="width:14%">GFCI / AFCI</th>
      <th style="width:10%">Pass</th>
      <th style="width:10%">Fail</th>
    </tr>
  </thead>
  <tbody>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
    <tr><td></td><td></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td><td class="center"></td></tr>
  </tbody>
</table>

<div class="section-title">Hazards Identified</div>

<div class="row">
  <div class="field">
    <label>Hazard Description (location, nature, severity)</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="section-title">Code &amp; Compliance Notes</div>

<div class="row">
  <div class="field">
    <label>NEC Code References / Violations</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="section-title">Work Completed</div>

<div class="row">
  <div class="field">
    <label>Summary of Work Performed</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="section-title">Reinspection</div>

<div class="yn-row">
  <div class="yn-label">Reinspection Required?</div>
  <div class="yn-opt"><div class="cb"></div> Yes</div>
  <div class="yn-opt"><div class="cb"></div> No</div>
  &nbsp;&nbsp;&nbsp;
  <div class="yn-label" style="min-width:180px">If yes, scheduled date:</div>
  <div style="flex:1; border-bottom:1.5px solid #333; min-height:22px;"></div>
</div>

<div class="yn-row">
  <div class="yn-label">Approved to Energize?</div>
  <div class="yn-opt"><div class="cb"></div> Yes</div>
  <div class="yn-opt"><div class="cb"></div> No — Do Not Energize</div>
</div>

<div class="sig-row">
  <div class="sig-block">
    <div class="sig-label">Customer / Owner Signature</div>
    <div class="sig-line"></div>
    <div class="sig-sub">Owner acknowledges receipt of inspection findings.</div>
  </div>
  <div class="sig-block" style="max-width:150px">
    <div class="sig-label">Date</div>
    <div class="sig-line"></div>
  </div>
  <div class="sig-block">
    <div class="sig-label">Inspector Signature</div>
    <div class="sig-line"></div>
    <div class="sig-sub">Inspector certifies accuracy of this report.</div>
  </div>
  <div class="sig-block" style="max-width:150px">
    <div class="sig-label">Date</div>
    <div class="sig-line"></div>
  </div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-003 Electrician Jobsite Inspection &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>

</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-004 — Lawn Care Weekly Crew Planner
  // ─────────────────────────────────────────────────────────────────────────
  'LS-004': {
    id: 'LS-004',
    title: 'Lawn Care Weekly Crew Planner',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Lawn Care Weekly Crew Planner — LS-004</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 10.5pt; color: #111; background: #fff;
    padding: 24px; max-width: 800px; margin: 0 auto;
  }
  .print-btn {
    display: inline-block; margin-bottom: 18px; padding: 8px 22px;
    background: #1a56db; color: #fff; border: none; border-radius: 5px;
    font-size: 11pt; cursor: pointer;
  }
  .print-btn:hover { background: #1345b7; }
  @media print { .print-btn { display: none !important; } }

  header {
    display: flex; justify-content: space-between; align-items: flex-end;
    border-bottom: 2.5px solid #111; padding-bottom: 10px; margin-bottom: 18px;
  }
  .company-name {
    font-size: 20pt; font-weight: 700; border: 2px dashed #bbb;
    padding: 4px 12px; display: inline-block; min-width: 220px; min-height: 34px;
  }
  .company-sub { font-size: 8.5pt; color: #555; margin-top: 3px; }
  .form-title { text-align: right; }
  .form-title h1 { font-size: 15pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-id { font-size: 8.5pt; color: #666; margin-top: 2px; }

  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }

  .section-title {
    font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px;
    background: #f0f0f0; border-left: 3px solid #333; padding: 4px 8px; margin: 16px 0 10px 0;
  }

  table.route-table {
    width: 100%; border-collapse: collapse; font-size: 9pt;
  }
  table.route-table th {
    background: #222; color: #fff; border: 1px solid #444;
    padding: 5px 6px; text-align: center; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.3px;
  }
  table.route-table td {
    border: 1px solid #bbb; padding: 3px 5px; height: 22px; vertical-align: middle;
  }
  table.route-table tbody tr:nth-child(even) { background: #fafafa; }
  table.route-table td.center { text-align: center; }
  .mini-cb {
    width: 12px; height: 12px; border: 1.5px solid #555;
    display: inline-block; border-radius: 2px; vertical-align: middle;
  }

  .crew-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px;
  }
  .crew-slot { display: flex; gap: 8px; align-items: center; }
  .crew-slot .crew-label { font-size: 8pt; font-weight: 700; text-transform: uppercase; color: #555; min-width: 90px; }
  .crew-slot .line { flex: 1; border-bottom: 1.5px solid #333; min-height: 22px; }

  footer {
    margin-top: 20px; padding-top: 8px; border-top: 1px solid #ccc;
    text-align: center; font-size: 7.5pt; color: #999;
  }
  @media print { body { padding: 16px; } @page { margin: 0.5in; size: letter landscape; } }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">&#128438; Print / Save as PDF</button>

<header>
  <div>
    <div class="company-name">&nbsp;</div>
    <div class="company-sub">Phone: _________________ &nbsp;&nbsp; Route Area: _________________</div>
  </div>
  <div class="form-title">
    <h1>Lawn Care Weekly Crew Planner</h1>
    <div class="form-id">Form LS-004 &nbsp;|&nbsp; Sheet #: _______________</div>
  </div>
</header>

<div class="row">
  <div class="field">
    <label>Week Of</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Crew Lead</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Vehicle / Truck #</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Equipment Trailer #</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Crew Members</div>

<div class="crew-grid">
  <div class="crew-slot">
    <div class="crew-label">Member 1:</div>
    <div class="line"></div>
  </div>
  <div class="crew-slot">
    <div class="crew-label">Member 2:</div>
    <div class="line"></div>
  </div>
  <div class="crew-slot">
    <div class="crew-label">Member 3:</div>
    <div class="line"></div>
  </div>
  <div class="crew-slot">
    <div class="crew-label">Member 4:</div>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Daily Route &amp; Stop Log</div>

<table class="route-table">
  <thead>
    <tr>
      <th style="width:4%">#</th>
      <th style="width:24%">Customer / Address</th>
      <th style="width:14%">Service Type</th>
      <th style="width:5%">Mow</th>
      <th style="width:5%">Edge</th>
      <th style="width:5%">Trim</th>
      <th style="width:5%">Blow</th>
      <th style="width:5%">Fert.</th>
      <th style="width:18%">Special Notes</th>
      <th style="width:9%">Time In/Out</th>
      <th style="width:6%">Done</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="center">1</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">2</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">3</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">4</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">5</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">6</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">7</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">8</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">9</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">10</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">11</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">12</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">13</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">14</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
    <tr><td class="center">15</td><td></td><td></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td class="center"><div class="mini-cb"></div></td><td></td><td></td><td class="center"><div class="mini-cb"></div></td></tr>
  </tbody>
</table>

<div class="row" style="margin-top:14px">
  <div class="field">
    <label>Total Stops Completed</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Total Hours on Route</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Fuel Used (gal)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Crew Lead Initials</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>End-of-Day Notes / Issues</label>
    <div style="border: 1.5px solid #333; min-height: 50px; padding: 3px;"></div>
  </div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-004 Lawn Care Weekly Crew Planner &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>

</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-005 — Auto Detail Intake + Damage Waiver
  // ─────────────────────────────────────────────────────────────────────────
  'LS-005': {
    id: 'LS-005',
    title: 'Auto Detail Intake + Damage Waiver',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Auto Detail Intake + Damage Waiver — LS-005</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 11pt; color: #111; background: #fff;
    padding: 24px; max-width: 800px; margin: 0 auto;
  }
  .print-btn {
    display: inline-block; margin-bottom: 18px; padding: 8px 22px;
    background: #1a56db; color: #fff; border: none; border-radius: 5px;
    font-size: 11pt; cursor: pointer;
  }
  .print-btn:hover { background: #1345b7; }
  @media print { .print-btn { display: none !important; } }

  header {
    display: flex; justify-content: space-between; align-items: flex-end;
    border-bottom: 2.5px solid #111; padding-bottom: 10px; margin-bottom: 18px;
  }
  .company-name {
    font-size: 20pt; font-weight: 700; border: 2px dashed #bbb;
    padding: 4px 12px; display: inline-block; min-width: 220px; min-height: 34px;
  }
  .company-sub { font-size: 8.5pt; color: #555; margin-top: 3px; }
  .form-title { text-align: right; }
  .form-title h1 { font-size: 15pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-id { font-size: 8.5pt; color: #666; margin-top: 2px; }

  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 60px; padding: 3px; }

  .section-title {
    font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px;
    background: #f0f0f0; border-left: 3px solid #333; padding: 4px 8px; margin: 16px 0 10px 0;
  }
  .section-divider {
    border: none; border-top: 2.5px solid #111; margin: 22px 0;
  }
  .part-label {
    font-size: 12pt; font-weight: 700; text-align: center;
    text-transform: uppercase; letter-spacing: 1px;
    background: #111; color: #fff; padding: 6px 0; margin-bottom: 16px;
  }

  .services-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px 20px; margin-bottom: 14px;
  }
  .check-item { display: flex; align-items: center; gap: 7px; font-size: 10pt; }
  .cb { width: 15px; height: 15px; border: 1.5px solid #333; display: inline-block; flex-shrink: 0; border-radius: 2px; }

  /* Car diagram */
  .car-diagram-wrapper {
    border: 1.5px solid #bbb; padding: 12px 16px; margin-bottom: 14px;
    background: #fafafa;
  }
  .car-diagram-title {
    font-size: 8pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.5px; color: #444; margin-bottom: 8px;
  }
  .car-ascii {
    font-family: 'Courier New', Courier, monospace;
    font-size: 8.5pt; line-height: 1.4; color: #222;
    white-space: pre;
  }
  .diagram-note {
    font-size: 7.5pt; color: #666; margin-top: 6px;
    font-style: italic;
  }

  .waiver-text {
    font-size: 9pt; line-height: 1.55; color: #222;
    border: 1.5px solid #bbb; padding: 10px 12px; background: #fafafa;
    margin-bottom: 14px;
  }

  .sig-row { display: flex; gap: 24px; margin-top: 20px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 5px; }
  .sig-label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .sig-line { border-bottom: 1px solid #aaa; margin-top: 28px; }
  .sig-sub { font-size: 7.5pt; color: #666; margin-top: 2px; }

  footer {
    margin-top: 28px; padding-top: 8px; border-top: 1px solid #ccc;
    text-align: center; font-size: 7.5pt; color: #999;
  }
  @media print { body { padding: 16px; } @page { margin: 0.6in; size: letter; } }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">&#128438; Print / Save as PDF</button>

<header>
  <div>
    <div class="company-name">&nbsp;</div>
    <div class="company-sub">Phone: _________________ &nbsp;&nbsp; Address: _________________________</div>
  </div>
  <div class="form-title">
    <h1>Auto Detail Intake &amp; Waiver</h1>
    <div class="form-id">Form LS-005 &nbsp;|&nbsp; Order #: _______________</div>
  </div>
</header>

<!-- PART 1: INTAKE -->
<div class="part-label">Part 1 — Customer &amp; Vehicle Intake</div>

<div class="row">
  <div class="field">
    <label>Date</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Drop-Off Time</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Est. Pick-Up Time</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Detailer Assigned</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Customer Information</div>

<div class="row">
  <div class="field">
    <label>Customer Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Phone</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Email</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Vehicle Information</div>

<div class="row">
  <div class="field">
    <label>Year</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Make</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Model</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Color</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>License Plate</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>VIN (last 6 digits)</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Odometer</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Fuel Level</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Condition (1-10)</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Services Requested</div>

<div class="services-grid">
  <div class="check-item"><div class="cb"></div> Full Interior Detail</div>
  <div class="check-item"><div class="cb"></div> Full Exterior Detail</div>
  <div class="check-item"><div class="cb"></div> Full Detail (In + Out)</div>
  <div class="check-item"><div class="cb"></div> Hand Wash &amp; Dry</div>
  <div class="check-item"><div class="cb"></div> Wax / Sealant</div>
  <div class="check-item"><div class="cb"></div> Paint Correction</div>
  <div class="check-item"><div class="cb"></div> Ceramic Coating</div>
  <div class="check-item"><div class="cb"></div> Headlight Restore</div>
  <div class="check-item"><div class="cb"></div> Engine Bay Detail</div>
  <div class="check-item"><div class="cb"></div> Carpet Shampoo</div>
  <div class="check-item"><div class="cb"></div> Leather Clean &amp; Condition</div>
  <div class="check-item"><div class="cb"></div> Odor Elimination</div>
  <div class="check-item"><div class="cb"></div> Tire Dressing</div>
  <div class="check-item"><div class="cb"></div> Window Tint (refer)</div>
  <div class="check-item"><div class="cb"></div> Other: ____________</div>
</div>

<div class="row">
  <div class="field">
    <label>Special Instructions / Customer Requests</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Package / Service Tier</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Quoted Price</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Deposit Paid</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Balance Due</label>
    <div class="line"></div>
  </div>
</div>

<hr class="section-divider">

<!-- PART 2: DAMAGE WAIVER -->
<div class="part-label">Part 2 — Pre-Existing Damage &amp; Liability Waiver</div>

<div class="section-title">Pre-Existing Damage Diagram</div>

<div class="car-diagram-wrapper">
  <div class="car-diagram-title">Mark any pre-existing damage with an X or note below each area</div>
  <div class="car-ascii">
              FRONT
         _______________
        /               \\
       | [  ]       [  ] |   Hood: _______________________
       |_________________|
       |                 |   Windshield: __________________
       | DR FL   DR FR   |
       |  [  ]   [  ]   |   Driver Front Door: ___________
       |_________________|   Passenger Front Door: ________
       | DR RL   DR RR   |
       |  [  ]   [  ]   |   Driver Rear Door: ____________
       |_________________|   Passenger Rear Door: _________
       |                 |
       |  [  ]   [  ]   |   Rear Bumper: _________________
        \\_______________/
              REAR             Roof: ______________________

  LEFT SIDE (Driver)                    RIGHT SIDE (Passenger)
  ___________________________           ___________________________
  |                         |           |                         |
  | Front Quarter: ________ |           | Front Quarter: ________ |
  | Rocker Panel:  ________ |           | Rocker Panel:  ________ |
  | Rear Quarter:  ________ |           | Rear Quarter:  ________ |
  |_________________________|           |_________________________|
  </div>
  <div class="diagram-note">Use a pen to circle or mark actual damage locations. Note scratches (S), dents (D), chips (C), cracks (CR).</div>
</div>

<div class="row">
  <div class="field">
    <label>Additional Pre-Existing Damage Notes</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="section-title">Liability Waiver</div>

<div class="waiver-text">
  <strong>PLEASE READ CAREFULLY BEFORE SIGNING.</strong> By signing below, the customer ("Owner") acknowledges and agrees to the following:<br><br>
  1. <strong>Pre-Existing Damage:</strong> The Owner confirms that all pre-existing damage to the vehicle has been noted on this form. The detailing company shall not be liable for any pre-existing scratches, dents, chips, cracks, or other damage documented above.<br><br>
  2. <strong>Personal Items:</strong> The Owner is responsible for removing all personal valuables from the vehicle prior to service. The detailing company is not responsible for lost, stolen, or damaged personal items left in the vehicle.<br><br>
  3. <strong>Sensitive Surfaces:</strong> Some vehicles contain surfaces (custom wraps, specialty paint, modified bodywork, aftermarket parts) that may react differently to detailing products. The Owner assumes all risk associated with pre-existing modifications or sensitive surfaces not disclosed at intake.<br><br>
  4. <strong>Limitation of Liability:</strong> In the unlikely event of damage caused during the detailing process, liability is limited to the cost of the service rendered. The company reserves the right to inspect and assess any damage claims before agreeing to repair or compensation.<br><br>
  5. <strong>Authorization:</strong> The Owner authorizes the detailing company to perform the requested services and to move the vehicle as necessary within the service facility.
</div>

<div class="sig-row">
  <div class="sig-block">
    <div class="sig-label">Customer / Owner Signature</div>
    <div class="sig-line"></div>
    <div class="sig-sub">I have read and agree to the terms of this waiver.</div>
  </div>
  <div class="sig-block" style="max-width:150px">
    <div class="sig-label">Date</div>
    <div class="sig-line"></div>
  </div>
  <div class="sig-block">
    <div class="sig-label">Technician / Intake Staff</div>
    <div class="sig-line"></div>
    <div class="sig-sub">Staff confirms vehicle inspection completed at intake.</div>
  </div>
  <div class="sig-block" style="max-width:150px">
    <div class="sig-label">Date</div>
    <div class="sig-line"></div>
  </div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-005 Auto Detail Intake + Damage Waiver &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>

</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-006 — Pest Control Follow-Up Card
  // ─────────────────────────────────────────────────────────────────────────
  'LS-006': {
    id: 'LS-006',
    title: 'Pest Control Follow-Up Card',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pest Control Follow-Up Card — LS-006</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 10.5pt; color: #111; background: #fff;
    padding: 24px; max-width: 800px; margin: 0 auto;
  }
  .print-btn {
    display: inline-block; margin-bottom: 18px; padding: 8px 22px;
    background: #1a56db; color: #fff; border: none; border-radius: 5px;
    font-size: 11pt; cursor: pointer;
  }
  .print-btn:hover { background: #1345b7; }
  @media print { .print-btn { display: none !important; } }

  /* Two cards per page using a grid */
  .cards-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .card {
    border: 2px solid #333;
    padding: 16px;
    page-break-inside: avoid;
  }
  .card-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    border-bottom: 2px solid #111; padding-bottom: 8px; margin-bottom: 12px;
  }
  .company-block .company-name {
    font-size: 13pt; font-weight: 700; border: 1.5px dashed #bbb;
    padding: 2px 8px; display: inline-block; min-width: 130px; min-height: 24px;
  }
  .company-block .company-contact {
    font-size: 7pt; color: #555; margin-top: 3px;
  }
  .card-title {
    text-align: right;
    font-size: 10pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;
  }
  .card-id { font-size: 7pt; color: #666; }

  .c-row { display: flex; gap: 10px; margin-bottom: 9px; }
  .c-field { flex: 1; }
  .c-field label {
    display: block; font-size: 7pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.4px; color: #444; margin-bottom: 2px;
  }
  .c-field .line { border-bottom: 1.5px solid #333; min-height: 19px; }
  .c-field .line-tall { border: 1.5px solid #333; min-height: 46px; padding: 2px 4px; font-size: 9pt; }

  .section-title {
    font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
    background: #f0f0f0; border-left: 2px solid #333; padding: 3px 6px; margin: 10px 0 7px 0;
  }

  .callback-box {
    border: 1.5px solid #bbb; background: #fffbf0; padding: 8px 10px;
    font-size: 8.5pt; line-height: 1.5; margin-top: 10px;
  }
  .callback-box strong { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.3px; }

  .card-footer {
    margin-top: 10px; padding-top: 5px; border-top: 1px solid #ccc;
    font-size: 7pt; color: #999; text-align: center;
  }

  @media print {
    body { padding: 16px; }
    @page { margin: 0.5in; size: letter; }
    .cards-wrapper { grid-template-columns: 1fr 1fr; }
  }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">&#128438; Print / Save as PDF (2 cards per page)</button>

<!-- Renders 4 cards — 2 per row, 2 rows = 1 full sheet, front + back cutting -->
<div class="cards-wrapper">

  <!-- CARD 1 -->
  <div class="card">
    <div class="card-header">
      <div class="company-block">
        <div class="company-name">&nbsp;</div>
        <div class="company-contact">
          Phone: _____________________<br>
          License #: __________________
        </div>
      </div>
      <div class="card-title">
        Pest Control<br>Follow-Up Card
        <div class="card-id">Form LS-006</div>
      </div>
    </div>

    <div class="c-row">
      <div class="c-field">
        <label>Customer Name</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field" style="flex:2">
        <label>Service Address</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Service Date</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Technician</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Treatment Applied</div>
    <div class="c-row">
      <div class="c-field">
        <label>Pest / Target</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Treatment Method</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Products Used</div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 1 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 2 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Re-Entry Interval</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Next Service Due</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Technician Notes</div>
    <div class="c-row">
      <div class="c-field">
        <div class="line-tall"></div>
      </div>
    </div>

    <div class="callback-box">
      <strong>Callback Instructions:</strong><br>
      If pest activity continues after _______ days, please call us immediately. Do not re-treat with other products. Keep pets and children away from treated areas for the time listed above.
    </div>

    <div class="card-footer">INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; agentatlasshop.etsy.com</div>
  </div>

  <!-- CARD 2 (duplicate blank for printing) -->
  <div class="card">
    <div class="card-header">
      <div class="company-block">
        <div class="company-name">&nbsp;</div>
        <div class="company-contact">
          Phone: _____________________<br>
          License #: __________________
        </div>
      </div>
      <div class="card-title">
        Pest Control<br>Follow-Up Card
        <div class="card-id">Form LS-006</div>
      </div>
    </div>

    <div class="c-row">
      <div class="c-field">
        <label>Customer Name</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field" style="flex:2">
        <label>Service Address</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Service Date</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Technician</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Treatment Applied</div>
    <div class="c-row">
      <div class="c-field">
        <label>Pest / Target</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Treatment Method</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Products Used</div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 1 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 2 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Re-Entry Interval</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Next Service Due</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Technician Notes</div>
    <div class="c-row">
      <div class="c-field">
        <div class="line-tall"></div>
      </div>
    </div>

    <div class="callback-box">
      <strong>Callback Instructions:</strong><br>
      If pest activity continues after _______ days, please call us immediately. Do not re-treat with other products. Keep pets and children away from treated areas for the time listed above.
    </div>

    <div class="card-footer">INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; agentatlasshop.etsy.com</div>
  </div>

  <!-- CARD 3 -->
  <div class="card">
    <div class="card-header">
      <div class="company-block">
        <div class="company-name">&nbsp;</div>
        <div class="company-contact">
          Phone: _____________________<br>
          License #: __________________
        </div>
      </div>
      <div class="card-title">
        Pest Control<br>Follow-Up Card
        <div class="card-id">Form LS-006</div>
      </div>
    </div>

    <div class="c-row">
      <div class="c-field">
        <label>Customer Name</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field" style="flex:2">
        <label>Service Address</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Service Date</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Technician</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Treatment Applied</div>
    <div class="c-row">
      <div class="c-field">
        <label>Pest / Target</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Treatment Method</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Products Used</div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 1 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 2 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Re-Entry Interval</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Next Service Due</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Technician Notes</div>
    <div class="c-row">
      <div class="c-field">
        <div class="line-tall"></div>
      </div>
    </div>

    <div class="callback-box">
      <strong>Callback Instructions:</strong><br>
      If pest activity continues after _______ days, please call us immediately. Do not re-treat with other products. Keep pets and children away from treated areas for the time listed above.
    </div>

    <div class="card-footer">INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; agentatlasshop.etsy.com</div>
  </div>

  <!-- CARD 4 -->
  <div class="card">
    <div class="card-header">
      <div class="company-block">
        <div class="company-name">&nbsp;</div>
        <div class="company-contact">
          Phone: _____________________<br>
          License #: __________________
        </div>
      </div>
      <div class="card-title">
        Pest Control<br>Follow-Up Card
        <div class="card-id">Form LS-006</div>
      </div>
    </div>

    <div class="c-row">
      <div class="c-field">
        <label>Customer Name</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field" style="flex:2">
        <label>Service Address</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Service Date</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Technician</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Treatment Applied</div>
    <div class="c-row">
      <div class="c-field">
        <label>Pest / Target</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Treatment Method</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Products Used</div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 1 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Product 2 (EPA Reg. #)</label>
        <div class="line"></div>
      </div>
    </div>
    <div class="c-row">
      <div class="c-field">
        <label>Re-Entry Interval</label>
        <div class="line"></div>
      </div>
      <div class="c-field">
        <label>Next Service Due</label>
        <div class="line"></div>
      </div>
    </div>

    <div class="section-title">Technician Notes</div>
    <div class="c-row">
      <div class="c-field">
        <div class="line-tall"></div>
      </div>
    </div>

    <div class="callback-box">
      <strong>Callback Instructions:</strong><br>
      If pest activity continues after _______ days, please call us immediately. Do not re-treat with other products. Keep pets and children away from treated areas for the time listed above.
    </div>

    <div class="card-footer">INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; agentatlasshop.etsy.com</div>
  </div>

</div><!-- end cards-wrapper -->

</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-007 — Roofing Change Order + Approval Form
  // ─────────────────────────────────────────────────────────────────────────
  'LS-007': {
    id: 'LS-007',
    title: 'Roofing Change Order + Approval Form',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Roofing Change Order — LS-007</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 11pt; color: #111; background: #fff;
    padding: 24px; max-width: 800px; margin: 0 auto;
  }
  .print-btn {
    display: inline-block; margin-bottom: 18px; padding: 8px 22px;
    background: #1a56db; color: #fff; border: none; border-radius: 5px;
    font-size: 11pt; cursor: pointer;
  }
  .print-btn:hover { background: #1345b7; }
  @media print { .print-btn { display: none !important; } }

  header {
    display: flex; justify-content: space-between; align-items: flex-end;
    border-bottom: 2.5px solid #111; padding-bottom: 10px; margin-bottom: 18px;
  }
  .company-name {
    font-size: 20pt; font-weight: 700; border: 2px dashed #bbb;
    padding: 4px 12px; display: inline-block; min-width: 220px; min-height: 34px;
  }
  .company-sub { font-size: 8.5pt; color: #555; margin-top: 3px; }
  .form-title { text-align: right; }
  .form-title h1 { font-size: 15pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-id { font-size: 8.5pt; color: #666; margin-top: 2px; }

  /* Change order banner */
  .co-banner {
    background: #111; color: #fff; text-align: center;
    font-size: 13pt; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 8px 0; margin-bottom: 18px;
  }

  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 70px; padding: 3px; }
  .line-xl { border: 1.5px solid #333; min-height: 90px; padding: 4px; }

  .section-title {
    font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px;
    background: #f0f0f0; border-left: 3px solid #333; padding: 4px 8px; margin: 16px 0 10px 0;
  }

  table.change-table {
    width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10pt;
  }
  table.change-table th {
    background: #f0f0f0; border: 1px solid #bbb; padding: 5px 8px;
    text-align: left; font-size: 8pt; text-transform: uppercase;
  }
  table.change-table td { border: 1px solid #bbb; padding: 4px 8px; height: 24px; }

  .price-summary {
    border: 2px solid #333; padding: 14px 18px; margin: 16px 0;
    background: #fcfcfc;
  }
  .price-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 6px 0; border-bottom: 1px solid #eee;
  }
  .price-row:last-child { border-bottom: none; }
  .price-label { font-size: 10pt; font-weight: 500; }
  .price-value { font-size: 10pt; min-width: 160px; border-bottom: 1.5px solid #333; text-align: right; padding-right: 4px; }
  .price-total .price-label { font-size: 11.5pt; font-weight: 700; }
  .price-total .price-value {
    font-size: 11.5pt; font-weight: 700;
    border-bottom: 3px double #333;
  }

  .reason-box {
    border: 1.5px solid #bbb; padding: 10px 12px; background: #fafafa;
    margin-bottom: 12px;
  }
  .reason-box label {
    display: block; font-size: 8pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.4px; color: #444; margin-bottom: 6px;
  }
  .reason-checkboxes { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-bottom: 8px; }
  .check-item { display: flex; align-items: center; gap: 7px; font-size: 10pt; }
  .cb { width: 15px; height: 15px; border: 1.5px solid #333; display: inline-block; flex-shrink: 0; border-radius: 2px; }

  .sig-block-2col {
    display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 18px;
  }
  .sig-unit { border-top: 1.5px solid #333; padding-top: 6px; }
  .sig-label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .sig-line { border-bottom: 1px solid #aaa; margin-top: 32px; }
  .sig-sub { font-size: 7.5pt; color: #666; margin-top: 3px; }
  .sig-date { margin-top: 12px; }
  .sig-date label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .sig-date .line { border-bottom: 1.5px solid #333; min-height: 20px; }

  .witness-row {
    margin-top: 16px; padding-top: 14px; border-top: 1px dashed #bbb;
  }

  footer {
    margin-top: 28px; padding-top: 8px; border-top: 1px solid #ccc;
    text-align: center; font-size: 7.5pt; color: #999;
  }
  @media print { body { padding: 16px; } @page { margin: 0.6in; size: letter; } }
</style>
</head>
<body>

<button class="print-btn" onclick="window.print()">&#128438; Print / Save as PDF</button>

<header>
  <div>
    <div class="company-name">&nbsp;</div>
    <div class="company-sub">Phone: _________________ &nbsp;&nbsp; License #: _________________ &nbsp;&nbsp; Insurance #: _________________</div>
  </div>
  <div class="form-title">
    <h1>Roofing Change Order</h1>
    <div class="form-id">Form LS-007</div>
  </div>
</header>

<div class="co-banner">Change Order &amp; Approval Form</div>

<div class="row">
  <div class="field">
    <label>Change Order #</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Date</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Original Contract #</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Contract Date</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Project &amp; Party Information</div>

<div class="row">
  <div class="field" style="flex:3">
    <label>Project / Property Address</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>City, State, Zip</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Property Owner Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Owner Phone</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Owner Email</label>
    <div class="line"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Contractor / Company Name</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Project Manager</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Contractor Phone</label>
    <div class="line"></div>
  </div>
</div>

<div class="section-title">Description of Change</div>

<div class="row">
  <div class="field">
    <label>Detailed Description of Work Being Added, Removed, or Modified</label>
    <div class="line-xl"></div>
  </div>
</div>

<div class="section-title">Materials Added / Removed</div>

<table class="change-table">
  <thead>
    <tr>
      <th style="width:8%">+/−</th>
      <th style="width:38%">Material / Item Description</th>
      <th style="width:12%">Unit</th>
      <th style="width:12%">Qty</th>
      <th style="width:15%">Unit Cost</th>
      <th style="width:15%">Line Total</th>
    </tr>
  </thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Labor Change</div>

<div class="row">
  <div class="field">
    <label>Additional Labor Description</label>
    <div class="line-tall"></div>
  </div>
</div>

<div class="row">
  <div class="field">
    <label>Additional Hours</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Rate per Hour</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Total Labor Cost</label>
    <div class="line"></div>
  </div>
  <div class="field">
    <label>Additional Days on Site</label>
    <div class="line"></div>
  </div>
</div>

<div class="price-summary">
  <div class="price-row">
    <div class="price-label">Original Contract Amount</div>
    <div class="price-value">$</div>
  </div>
  <div class="price-row">
    <div class="price-label">This Change Order — Materials</div>
    <div class="price-value">$</div>
  </div>
  <div class="price-row">
    <div class="price-label">This Change Order — Labor</div>
    <div class="price-value">$</div>
  </div>
  <div class="price-row">
    <div class="price-label">Total Price Adjustment (+ / −)</div>
    <div class="price-value">$</div>
  </div>
  <div class="price-row price-total">
    <div class="price-label">NEW REVISED CONTRACT TOTAL</div>
    <div class="price-value">$</div>
  </div>
</div>

<div class="reason-box">
  <label>Reason for Change Order</label>
  <div class="reason-checkboxes">
    <div class="check-item"><div class="cb"></div> Hidden / Unforeseen Damage</div>
    <div class="check-item"><div class="cb"></div> Owner-Requested Upgrade</div>
    <div class="check-item"><div class="cb"></div> Code / Permit Requirement</div>
    <div class="check-item"><div class="cb"></div> Scope Adjustment</div>
    <div class="check-item"><div class="cb"></div> Material Substitution</div>
    <div class="check-item"><div class="cb"></div> Insurance Supplement</div>
    <div class="check-item"><div class="cb"></div> Weather / Site Condition</div>
    <div class="check-item"><div class="cb"></div> Other (explain below)</div>
  </div>
  <div style="border-bottom: 1.5px solid #333; min-height: 22px;"></div>
</div>

<div class="section-title">Approval Signatures</div>

<p style="font-size:9pt; color:#444; margin-bottom:12px;">
  This Change Order becomes part of and is subject to all terms and conditions of the original contract. No work described herein shall begin until this document is signed by both parties. Unsigned change orders are not authorized.
</p>

<div class="sig-block-2col">
  <div>
    <div class="sig-unit">
      <div class="sig-label">Owner / Authorized Representative Signature</div>
      <div class="sig-line"></div>
      <div class="sig-sub">Owner approves the work, price adjustment, and revised contract total above.</div>
    </div>
    <div class="sig-date" style="margin-top:10px">
      <label>Printed Name</label>
      <div class="line"></div>
    </div>
    <div class="sig-date">
      <label>Date Signed</label>
      <div class="line"></div>
    </div>
  </div>
  <div>
    <div class="sig-unit">
      <div class="sig-label">Contractor / Project Manager Signature</div>
      <div class="sig-line"></div>
      <div class="sig-sub">Contractor confirms scope, pricing, and authorization to proceed.</div>
    </div>
    <div class="sig-date" style="margin-top:10px">
      <label>Printed Name</label>
      <div class="line"></div>
    </div>
    <div class="sig-date">
      <label>Date Signed</label>
      <div class="line"></div>
    </div>
  </div>
</div>

<div class="witness-row">
  <div class="row">
    <div class="field">
      <label>Witness Signature (optional)</label>
      <div class="line"></div>
    </div>
    <div class="field">
      <label>Witness Printed Name</label>
      <div class="line"></div>
    </div>
    <div class="field">
      <label>Date</label>
      <div class="line"></div>
    </div>
  </div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-007 Roofing Change Order + Approval &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>

</body>
</html>`
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LS-008 — Pressure Washing Route Sheet
  // ─────────────────────────────────────────────────────────────────────────
  'LS-008': {
    id: 'LS-008',
    title: 'Pressure Washing Route Sheet',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pressure Washing Route Sheet — LS-008</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; padding: 0; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; letter-spacing: 0.5px; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .cover-meta { display: flex; gap: 16px; margin-top: 14px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; cursor: default; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { body { padding: 0; } @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Pressure Washing Route Sheet</div>
    <div class="form-label">Form LS-008 &nbsp;|&nbsp; Exterior Cleaning Business</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Pressure Washing<br>Route Sheet</h1>
      <div class="form-id">Form LS-008 &nbsp;|&nbsp; Route #: ___________</div>
    </div>
  </div>
  <div class="cover-meta">
    <div class="row" style="flex:1;margin-bottom:0;">
      <div class="field"><label>Route Date</label><div class="line"></div></div>
      <div class="field"><label>Crew Lead</label><div class="line"></div></div>
      <div class="field"><label>Truck / Unit #</label><div class="line"></div></div>
      <div class="field"><label>Start Time</label><div class="line"></div></div>
    </div>
  </div>
</div>

<div class="section-title">Equipment &amp; Chemical Pre-Check</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> Pressure washer — start tested</div>
  <div class="check-item"><div class="check-box"></div> Surface cleaner attached &amp; clear</div>
  <div class="check-item"><div class="check-box"></div> Water tank filled (gallons: _____)</div>
  <div class="check-item"><div class="check-box"></div> Downstream injector primed</div>
  <div class="check-item"><div class="check-box"></div> Soap / chemical mix ratio confirmed</div>
  <div class="check-item"><div class="check-box"></div> Safety glasses, gloves on truck</div>
  <div class="check-item"><div class="check-box"></div> Hose reel — no kinks or leaks</div>
  <div class="check-item"><div class="check-box"></div> Wand tips (0°, 15°, 25°, 40°) present</div>
</div>

<div class="section-title">Stop Log — Today's Jobs</div>
<table>
  <thead><tr>
    <th>#</th><th>Customer Name</th><th>Address</th><th>Service Type</th><th>PSI Setting</th><th>Chem Used</th><th>Arrived</th><th>Departed</th><th>Done?</th>
  </tr></thead>
  <tbody>
    <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Job Notes / Issues</div>
<div class="row"><div class="field"><label>Stop #</label><div class="line"></div></div><div class="field" style="flex:4"><label>Note / Issue</label><div class="line"></div></div></div>
<div class="row"><div class="field"><label>Stop #</label><div class="line"></div></div><div class="field" style="flex:4"><label>Note / Issue</label><div class="line"></div></div></div>
<div class="row"><div class="field"><label>Stop #</label><div class="line"></div></div><div class="field" style="flex:4"><label>Note / Issue</label><div class="line"></div></div></div>

<div class="section-title">Chemical &amp; Supply Usage</div>
<div class="row">
  <div class="field"><label>Chemical / Product</label><div class="line"></div></div>
  <div class="field"><label>Gallons Used</label><div class="line"></div></div>
  <div class="field"><label>Chemical / Product</label><div class="line"></div></div>
  <div class="field"><label>Gallons Used</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Total Water Used (gal)</label><div class="line"></div></div>
  <div class="field"><label>Total Drive Miles</label><div class="line"></div></div>
  <div class="field"><label>End Time</label><div class="line"></div></div>
  <div class="field"><label>Total Hours</label><div class="line"></div></div>
</div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
    <tbody>
      <tr><td>Pressure Wash — Driveway</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Pressure Wash — House Exterior</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Deck / Patio Cleaning</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Roof Soft Wash</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Additional Service</td><td></td><td>$</td><td>$</td></tr>
      <tr class="total-row"><td colspan="3" style="text-align:right;">Subtotal</td><td>$</td></tr>
      <tr class="total-row"><td colspan="3" style="text-align:right;">Tax</td><td>$</td></tr>
      <tr class="total-row"><td colspan="3" style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">End-of-Day Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> All jobs confirmed complete</div>
  <div class="check-item"><div class="check-box"></div> Equipment rinsed and stored</div>
  <div class="check-item"><div class="check-box"></div> Chemicals secured</div>
  <div class="check-item"><div class="check-box"></div> Invoices collected / sent</div>
  <div class="check-item"><div class="check-box"></div> Hoses drained and rolled</div>
  <div class="check-item"><div class="check-box"></div> Route sheet submitted to office</div>
</div>

<div class="section-title">Satisfaction Rating &amp; Sign-Off</div>
<div style="margin-bottom:10px;font-size:9pt;color:#555;">Customer satisfaction for final stop (circle or fill):</div>
<div class="rating-row">
  <div class="rating-star">&#9733;</div>
  <div class="rating-star">&#9733;</div>
  <div class="rating-star">&#9733;</div>
  <div class="rating-star">&#9733;</div>
  <div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Crew Lead Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Customer Signature (last stop) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-008 Pressure Washing Route Sheet &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-009 — Appliance Repair Parts Tracker
  // ─────────────────────────────────────────────────────────────────────────
  'LS-009': {
    id: 'LS-009',
    title: 'Appliance Repair Parts Tracker',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Appliance Repair Parts Tracker — LS-009</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Appliance Repair Parts Tracker</div>
    <div class="form-label">Form LS-009 &nbsp;|&nbsp; Appliance Repair Tech</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Appliance Repair<br>Parts Tracker</h1>
      <div class="form-id">Form LS-009 &nbsp;|&nbsp; Work Order #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Customer Name</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>Service Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Service Address</label><div class="line"></div></div>
    <div class="field"><label>Technician</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Appliance Information</div>
<div class="row">
  <div class="field"><label>Appliance Type</label><div class="line"></div></div>
  <div class="field"><label>Brand / Make</label><div class="line"></div></div>
  <div class="field"><label>Model Number</label><div class="line"></div></div>
  <div class="field"><label>Serial Number</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Age of Unit (years)</label><div class="line"></div></div>
  <div class="field"><label>Warranty Status</label><div class="line"></div></div>
  <div class="field"><label>Priority</label><div class="line"></div></div>
</div>

<div class="section-title">Diagnosis &amp; Fault Codes</div>
<div class="row">
  <div class="field"><label>Customer Reported Issue</label><div class="line-tall"></div></div>
  <div class="field"><label>Tech Diagnosis</label><div class="line-tall"></div></div>
</div>
<div class="row">
  <div class="field"><label>Error / Fault Code(s)</label><div class="line"></div></div>
  <div class="field"><label>Test Performed</label><div class="line"></div></div>
  <div class="field"><label>Meter Reading</label><div class="line"></div></div>
</div>

<div class="section-title">Parts Log</div>
<table>
  <thead><tr>
    <th>Part Name / Description</th><th>Part Number</th><th>Supplier</th><th>Ordered?</th><th>Arrived?</th><th>Installed?</th><th>Unit Cost</th><th>Qty</th><th>Total</th>
  </tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td colspan="8" style="text-align:right;font-weight:700;">Parts Subtotal</td><td>$</td></tr>
  </tbody>
</table>

<div class="section-title">Labor</div>
<div class="row">
  <div class="field"><label>Labor Hours</label><div class="line"></div></div>
  <div class="field"><label>Rate ($/hr)</label><div class="line"></div></div>
  <div class="field"><label>Labor Total</label><div class="line"></div></div>
  <div class="field"><label>Trip / Diagnostic Fee</label><div class="line"></div></div>
</div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Parts Total</td><td>$</td></tr>
      <tr><td>Labor Total</td><td>$</td></tr>
      <tr><td>Trip / Diagnostic Fee</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Complete Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> Repair tested — appliance operational</div>
  <div class="check-item"><div class="check-box"></div> Old parts removed from site</div>
  <div class="check-item"><div class="check-box"></div> Work area cleaned</div>
  <div class="check-item"><div class="check-box"></div> Customer demonstrated repair</div>
  <div class="check-item"><div class="check-box"></div> Warranty info provided</div>
  <div class="check-item"><div class="check-box"></div> Invoice collected / sent</div>
</div>

<div class="section-title">Satisfaction &amp; Sign-Off</div>
<div class="rating-row">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Technician Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Customer Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-009 Appliance Repair Parts Tracker &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-010 — Handyman Materials Reimbursement Sheet
  // ─────────────────────────────────────────────────────────────────────────
  'LS-010': {
    id: 'LS-010',
    title: 'Handyman Materials Reimbursement Sheet',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Handyman Materials Reimbursement Sheet — LS-010</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Handyman Materials Reimbursement Sheet</div>
    <div class="form-label">Form LS-010 &nbsp;|&nbsp; Solo Handyman</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Materials<br>Reimbursement Sheet</h1>
      <div class="form-id">Form LS-010 &nbsp;|&nbsp; Job #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Client Name</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>Job Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Job Address</label><div class="line"></div></div>
    <div class="field"><label>Handyman Name</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Description</div>
<div class="row">
  <div class="field"><label>Scope of Work</label><div class="line-tall"></div></div>
</div>
<div class="row">
  <div class="field"><label>Priority</label><div class="line"></div></div>
  <div class="field"><label>Start Time</label><div class="line"></div></div>
  <div class="field"><label>End Time</label><div class="line"></div></div>
  <div class="field"><label>Total Hours</label><div class="line"></div></div>
</div>

<div class="section-title">Materials Purchased — Itemized</div>
<table>
  <thead><tr>
    <th>#</th><th>Item / Description</th><th>Where Purchased</th><th>Date Purchased</th><th>Receipt #</th><th>Qty</th><th>Unit Cost</th><th>Total</th>
  </tr></thead>
  <tbody>
    <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td>7</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td colspan="7" style="text-align:right;font-weight:700;">Materials Subtotal</td><td>$</td></tr>
    <tr><td colspan="7" style="text-align:right;font-weight:700;">Tax Paid</td><td>$</td></tr>
    <tr><td colspan="7" style="text-align:right;font-weight:700;">Total Materials w/ Tax</td><td>$</td></tr>
  </tbody>
</table>

<div class="section-title">Markup &amp; Reimbursement Policy</div>
<div class="row">
  <div class="field"><label>Markup % Applied</label><div class="line"></div></div>
  <div class="field"><label>Markup Amount ($)</label><div class="line"></div></div>
  <div class="field"><label>Total Reimbursement Due</label><div class="line"></div></div>
</div>
<div style="background:#fffbf0;border:1.5px solid #e0d080;padding:8px 12px;font-size:9pt;margin-bottom:14px;">
  <strong>Policy Note:</strong> All materials are purchased on behalf of the client. Receipts attached. A ___% handling markup applies per our service agreement.
</div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Labor — ___ hrs @ $___/hr</td><td>$</td></tr>
      <tr><td>Materials (with markup)</td><td>$</td></tr>
      <tr><td>Trip / Haul Fee</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Complete Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> All tasks completed as scoped</div>
  <div class="check-item"><div class="check-box"></div> Receipts attached to this sheet</div>
  <div class="check-item"><div class="check-box"></div> Work area cleaned up</div>
  <div class="check-item"><div class="check-box"></div> Client walked through completed work</div>
  <div class="check-item"><div class="check-box"></div> Leftover materials returned or noted</div>
  <div class="check-item"><div class="check-box"></div> Invoice collected / sent</div>
</div>

<div class="section-title">Satisfaction &amp; Sign-Off</div>
<div class="rating-row">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Handyman Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Client Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-010 Handyman Materials Reimbursement Sheet &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-011 — Mobile Mechanic Service Summary Form
  // ─────────────────────────────────────────────────────────────────────────
  'LS-011': {
    id: 'LS-011',
    title: 'Mobile Mechanic Service Summary Form',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mobile Mechanic Service Summary — LS-011</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Mobile Mechanic Service Summary Form</div>
    <div class="form-label">Form LS-011 &nbsp;|&nbsp; Mobile Auto Repair</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Mobile Mechanic<br>Service Summary</h1>
      <div class="form-id">Form LS-011 &nbsp;|&nbsp; RO #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Customer Name</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>Service Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Service Location / Address</label><div class="line"></div></div>
    <div class="field"><label>Technician</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Vehicle Information</div>
<div class="row">
  <div class="field"><label>Year</label><div class="line"></div></div>
  <div class="field"><label>Make</label><div class="line"></div></div>
  <div class="field"><label>Model</label><div class="line"></div></div>
  <div class="field"><label>Trim / Engine</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>VIN</label><div class="line"></div></div>
  <div class="field"><label>License Plate</label><div class="line"></div></div>
  <div class="field"><label>Odometer (mi)</label><div class="line"></div></div>
  <div class="field"><label>Priority</label><div class="line"></div></div>
</div>

<div class="section-title">Complaint &amp; Diagnosis</div>
<div class="row">
  <div class="field"><label>Customer Complaint</label><div class="line-tall"></div></div>
  <div class="field"><label>Tech Diagnosis</label><div class="line-tall"></div></div>
</div>
<div class="row">
  <div class="field"><label>OBD Codes / Scan Results</label><div class="line"></div></div>
  <div class="field"><label>Additional Findings</label><div class="line"></div></div>
</div>

<div class="section-title">Parts &amp; Labor</div>
<table>
  <thead><tr>
    <th>Part / Service Description</th><th>Part #</th><th>Qty</th><th>Unit Cost</th><th>Labor Hrs</th><th>Total</th>
  </tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td>$</td><td></td><td>$</td></tr>
    <tr><td colspan="5" style="text-align:right;font-weight:700;">Parts Subtotal</td><td>$</td></tr>
    <tr><td colspan="5" style="text-align:right;font-weight:700;">Labor Subtotal (___ hrs @ $___)</td><td>$</td></tr>
  </tbody>
</table>

<div class="section-title">Recommended Future Services</div>
<div class="row">
  <div class="field"><label>Service Needed</label><div class="line"></div></div>
  <div class="field"><label>Urgency</label><div class="line"></div></div>
  <div class="field"><label>Est. Cost</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Service Needed</label><div class="line"></div></div>
  <div class="field"><label>Urgency</label><div class="line"></div></div>
  <div class="field"><label>Est. Cost</label><div class="line"></div></div>
</div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Parts Total</td><td>$</td></tr>
      <tr><td>Labor Total</td><td>$</td></tr>
      <tr><td>Diagnostic / Trip Fee</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Complete Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> Repair verified — vehicle started / tested</div>
  <div class="check-item"><div class="check-box"></div> Test drive completed (if applicable)</div>
  <div class="check-item"><div class="check-box"></div> Old parts shown to customer</div>
  <div class="check-item"><div class="check-box"></div> Work area cleaned</div>
  <div class="check-item"><div class="check-box"></div> Customer advised on recommendations</div>
  <div class="check-item"><div class="check-box"></div> Invoice collected / sent</div>
</div>

<div class="section-title">Satisfaction &amp; Sign-Off</div>
<div class="rating-row">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Technician Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Customer Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-011 Mobile Mechanic Service Summary &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-012 — Locksmith Job Authorization Form
  // ─────────────────────────────────────────────────────────────────────────
  'LS-012': {
    id: 'LS-012',
    title: 'Locksmith Job Authorization Form',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Locksmith Job Authorization Form — LS-012</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .auth-box { border: 2px solid #c00; background: #fff8f8; padding: 12px 16px; margin-bottom: 14px; font-size: 9.5pt; line-height: 1.6; }
  .auth-box strong { color: #c00; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Locksmith Job Authorization Form</div>
    <div class="form-label">Form LS-012 &nbsp;|&nbsp; Locksmith Operator</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Locksmith Job<br>Authorization Form</h1>
      <div class="form-id">Form LS-012 &nbsp;|&nbsp; Job #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Customer Name</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>ID Type &amp; Number</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Service Address</label><div class="line"></div></div>
    <div class="field"><label>Date / Time</label><div class="line"></div></div>
    <div class="field"><label>Technician</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Property &amp; Lock Information</div>
<div class="row">
  <div class="field"><label>Property Type</label><div class="line"></div></div>
  <div class="field"><label>Lock Brand / Type</label><div class="line"></div></div>
  <div class="field"><label>Lock Location</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Service Type Requested</label><div class="line"></div></div>
  <div class="field"><label>Priority / Emergency?</label><div class="line"></div></div>
</div>

<div class="section-title">Ownership Verification</div>
<div class="row">
  <div class="field"><label>Proof of Ownership / Tenancy Provided</label><div class="line"></div></div>
  <div class="field"><label>ID Verified By</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Relationship to Property</label><div class="line"></div></div>
  <div class="field"><label>Authorization Code (if dispatched)</label><div class="line"></div></div>
</div>

<div class="auth-box">
  <strong>AUTHORIZATION STATEMENT:</strong> I, the undersigned, hereby authorize the above-named locksmith company to perform the requested locksmith services on the premises listed. I confirm I am the owner, tenant, or authorized agent of this property. I accept full responsibility for this request and agree to pay the quoted service fee upon completion.
</div>

<div class="section-title">Services Performed</div>
<table>
  <thead><tr><th>Service Description</th><th>Lock / Door</th><th>Keys Cut</th><th>Unit Price</th><th>Total</th></tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td>$</td><td>$</td></tr>
    <tr><td></td><td></td><td></td><td>$</td><td>$</td></tr>
  </tbody>
</table>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Service / Labor</td><td>$</td></tr>
      <tr><td>Parts / Hardware</td><td>$</td></tr>
      <tr><td>Emergency / After-Hours Fee</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Complete Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> Lock/service tested and working</div>
  <div class="check-item"><div class="check-box"></div> Keys provided to customer</div>
  <div class="check-item"><div class="check-box"></div> ID and authorization verified</div>
  <div class="check-item"><div class="check-box"></div> No forced entry damage left</div>
  <div class="check-item"><div class="check-box"></div> Invoice collected / sent</div>
  <div class="check-item"><div class="check-box"></div> Job record filed</div>
</div>

<div class="section-title">Satisfaction &amp; Sign-Off</div>
<div class="rating-row">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Technician Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Customer Signature &amp; Printed Name &nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-012 Locksmith Job Authorization Form &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-014 — Snow Removal Service Trigger Checklist
  // ─────────────────────────────────────────────────────────────────────────
  'LS-014': {
    id: 'LS-014',
    title: 'Snow Removal Service Trigger Checklist',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Snow Removal Service Trigger Checklist — LS-014</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .trigger-box { border: 2px solid #0f1f3d; background: #f0f4fb; padding: 12px 16px; margin-bottom: 14px; }
  .trigger-box h3 { font-size: 10pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 8px; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Snow Removal Service Trigger Checklist</div>
    <div class="form-label">Form LS-014 &nbsp;|&nbsp; Snow Removal Contractor</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Snow Removal<br>Service Trigger Checklist</h1>
      <div class="form-id">Form LS-014 &nbsp;|&nbsp; Event #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Service Date</label><div class="line"></div></div>
    <div class="field"><label>Storm / Event Description</label><div class="line"></div></div>
    <div class="field"><label>Operator / Driver</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Snowfall Amount (in)</label><div class="line"></div></div>
    <div class="field"><label>Temp at Service Time</label><div class="line"></div></div>
    <div class="field"><label>Ice Present?</label><div class="line"></div></div>
    <div class="field"><label>Priority Level</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Service Trigger Thresholds</div>
<div class="trigger-box">
  <h3>Dispatch Triggers (circle what applies)</h3>
  <div class="check-grid">
    <div class="check-item"><div class="check-box"></div> Snowfall &ge; 1 inch (standard)</div>
    <div class="check-item"><div class="check-box"></div> Snowfall &ge; 2 inches (contract)</div>
    <div class="check-item"><div class="check-box"></div> Ice / freezing rain present</div>
    <div class="check-item"><div class="check-box"></div> Client requested early service</div>
    <div class="check-item"><div class="check-box"></div> HOA / commercial contract triggered</div>
    <div class="check-item"><div class="check-box"></div> Emergency call-in dispatch</div>
  </div>
</div>

<div class="section-title">Site Stop Log</div>
<table>
  <thead><tr>
    <th>#</th><th>Client / Property Name</th><th>Address</th><th>Service Type</th><th>Salt Applied (lbs)</th><th>Arrival</th><th>Departure</th><th>Done?</th>
  </tr></thead>
  <tbody>
    <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>4</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Equipment &amp; Supply Usage</div>
<div class="row">
  <div class="field"><label>Truck / Unit #</label><div class="line"></div></div>
  <div class="field"><label>Plow Blade Condition</label><div class="line"></div></div>
  <div class="field"><label>Salt / De-Icer Used (lbs)</label><div class="line"></div></div>
  <div class="field"><label>Sand Used (lbs)</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Total Miles Driven</label><div class="line"></div></div>
  <div class="field"><label>Total Hours on Route</label><div class="line"></div></div>
  <div class="field"><label>Fuel Used (gal)</label><div class="line"></div></div>
</div>

<div class="section-title">Issues / Damage Notes</div>
<div class="row"><div class="field"><div class="line-tall"></div></div></div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Qty / Hrs</th><th>Unit Price</th><th>Total</th></tr></thead>
    <tbody>
      <tr><td>Plowing — Driveway / Lot</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Salting / De-Icing</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Shoveling — Walkways</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Emergency / After-Hours Fee</td><td></td><td>$</td><td>$</td></tr>
      <tr class="total-row"><td colspan="3" style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">End-of-Event Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> All sites confirmed clear</div>
  <div class="check-item"><div class="check-box"></div> Salt bins restocked</div>
  <div class="check-item"><div class="check-box"></div> Plow blade inspected</div>
  <div class="check-item"><div class="check-box"></div> Damage documented (if any)</div>
  <div class="check-item"><div class="check-box"></div> Photos taken at problem sites</div>
  <div class="check-item"><div class="check-box"></div> Route sheet submitted</div>
</div>

<div class="rating-row" style="margin-top:14px;">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Client Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Operator Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Client Signature (if on-site) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-014 Snow Removal Service Trigger Checklist &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-015 — Window Cleaning Client Packet
  // ─────────────────────────────────────────────────────────────────────────
  'LS-015': {
    id: 'LS-015',
    title: 'Window Cleaning Client Packet',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Window Cleaning Client Packet — LS-015</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Window Cleaning Client Packet</div>
    <div class="form-label">Form LS-015 &nbsp;|&nbsp; Window Cleaning Operator</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Window Cleaning<br>Client Packet</h1>
      <div class="form-id">Form LS-015 &nbsp;|&nbsp; Job #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Client Name</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>Service Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Service Address</label><div class="line"></div></div>
    <div class="field"><label>Technician</label><div class="line"></div></div>
    <div class="field"><label>Priority</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Property &amp; Scope</div>
<div class="row">
  <div class="field"><label>Property Type</label><div class="line"></div></div>
  <div class="field"><label>Floors / Stories</label><div class="line"></div></div>
  <div class="field"><label>Total Windows</label><div class="line"></div></div>
  <div class="field"><label>Interior &amp; Exterior?</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Special Conditions (hard water, screens, etc.)</label><div class="line"></div></div>
</div>

<div class="section-title">Window Count by Area</div>
<table>
  <thead><tr>
    <th>Area / Zone</th><th>Window Count</th><th>Interior?</th><th>Exterior?</th><th>Screens Cleaned?</th><th>Condition Notes</th>
  </tr></thead>
  <tbody>
    <tr><td>Front Facade</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Rear / Back</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Left Side</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Right Side</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Skylights</td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>Other</td><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Products &amp; Equipment Used</div>
<div class="row">
  <div class="field"><label>Squeegee Size(s)</label><div class="line"></div></div>
  <div class="field"><label>Cleaning Solution</label><div class="line"></div></div>
  <div class="field"><label>Water Fed Pole?</label><div class="line"></div></div>
  <div class="field"><label>Ladder Type Used</label><div class="line"></div></div>
</div>

<div class="section-title">Pre-Existing Damage Notes</div>
<div class="row"><div class="field"><div class="line-tall"></div></div></div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
    <tbody>
      <tr><td>Exterior Windows</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Interior Windows</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Screen Cleaning</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Hard Water Treatment</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Additional Services</td><td></td><td>$</td><td>$</td></tr>
      <tr class="total-row"><td colspan="3" style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Complete Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> All windows cleaned per scope</div>
  <div class="check-item"><div class="check-box"></div> Screens cleaned and re-installed</div>
  <div class="check-item"><div class="check-box"></div> Sills wiped down</div>
  <div class="check-item"><div class="check-box"></div> No streaks — final inspection done</div>
  <div class="check-item"><div class="check-box"></div> Interior surfaces protected</div>
  <div class="check-item"><div class="check-box"></div> Invoice collected / sent</div>
</div>

<div class="rating-row" style="margin-top:14px;">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Technician Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Client Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-015 Window Cleaning Client Packet &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-016 — Pool Service Chemical Log
  // ─────────────────────────────────────────────────────────────────────────
  'LS-016': {
    id: 'LS-016',
    title: 'Pool Service Chemical Log',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pool Service Chemical Log — LS-016</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Pool Service Chemical Log</div>
    <div class="form-label">Form LS-016 &nbsp;|&nbsp; Pool Service Technician</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Pool Service<br>Chemical Log</h1>
      <div class="form-id">Form LS-016 &nbsp;|&nbsp; Service #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Client Name</label><div class="line"></div></div>
    <div class="field"><label>Service Address</label><div class="line"></div></div>
    <div class="field"><label>Service Date</label><div class="line"></div></div>
    <div class="field"><label>Technician</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Pool Info</div>
<div class="row">
  <div class="field"><label>Pool Type (In-Ground / Above)</label><div class="line"></div></div>
  <div class="field"><label>Gallons (approx)</label><div class="line"></div></div>
  <div class="field"><label>Filter Type</label><div class="line"></div></div>
  <div class="field"><label>Sanitizer System</label><div class="line"></div></div>
</div>

<div class="section-title">Water Test Results</div>
<table>
  <thead><tr>
    <th>Parameter</th><th>Ideal Range</th><th>Reading</th><th>Action Taken</th>
  </tr></thead>
  <tbody>
    <tr><td>Free Chlorine (ppm)</td><td>1.0 – 3.0</td><td></td><td></td></tr>
    <tr><td>Combined Chlorine (ppm)</td><td>&lt; 0.2</td><td></td><td></td></tr>
    <tr><td>pH</td><td>7.4 – 7.6</td><td></td><td></td></tr>
    <tr><td>Total Alkalinity (ppm)</td><td>80 – 120</td><td></td><td></td></tr>
    <tr><td>Calcium Hardness (ppm)</td><td>200 – 400</td><td></td><td></td></tr>
    <tr><td>Cyanuric Acid (ppm)</td><td>30 – 50</td><td></td><td></td></tr>
    <tr><td>Salt (ppm) — if SWG</td><td>2700 – 3400</td><td></td><td></td></tr>
    <tr><td>Phosphates (ppb)</td><td>&lt; 100</td><td></td><td></td></tr>
    <tr><td>Total Dissolved Solids</td><td>&lt; 1500</td><td></td><td></td></tr>
    <tr><td>Water Temp (°F)</td><td>—</td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Chemicals Added</div>
<table>
  <thead><tr>
    <th>Chemical / Product</th><th>Brand</th><th>Amount Added</th><th>Unit</th><th>Purpose</th>
  </tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Physical Maintenance</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> Skimmer baskets emptied</div>
  <div class="check-item"><div class="check-box"></div> Pump basket emptied</div>
  <div class="check-item"><div class="check-box"></div> Surface skimmed</div>
  <div class="check-item"><div class="check-box"></div> Pool brushed</div>
  <div class="check-item"><div class="check-box"></div> Vacuumed</div>
  <div class="check-item"><div class="check-box"></div> Filter backwashed / cleaned</div>
  <div class="check-item"><div class="check-box"></div> Equipment inspected</div>
  <div class="check-item"><div class="check-box"></div> Waterline tiles cleaned</div>
</div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Weekly / Monthly Service Fee</td><td>$</td></tr>
      <tr><td>Chemicals Used</td><td>$</td></tr>
      <tr><td>Additional Repair / Parts</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Technician Notes &amp; Next Visit</div>
<div class="row"><div class="field"><label>Notes / Issues</label><div class="line-tall"></div></div></div>
<div class="row">
  <div class="field"><label>Next Scheduled Service</label><div class="line"></div></div>
  <div class="field"><label>Priority Items for Next Visit</label><div class="line"></div></div>
</div>

<div class="rating-row" style="margin-top:14px;">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Client Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Technician Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Client Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-016 Pool Service Chemical Log &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-017 — Flooring Estimate Scope Matrix
  // ─────────────────────────────────────────────────────────────────────────
  'LS-017': {
    id: 'LS-017',
    title: 'Flooring Estimate Scope Matrix',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Flooring Estimate Scope Matrix — LS-017</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Flooring Estimate Scope Matrix</div>
    <div class="form-label">Form LS-017 &nbsp;|&nbsp; Flooring Contractor</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Flooring Estimate<br>Scope Matrix</h1>
      <div class="form-id">Form LS-017 &nbsp;|&nbsp; Estimate #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Client Name</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>Estimate Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Property Address</label><div class="line"></div></div>
    <div class="field"><label>Sales Rep / Estimator</label><div class="line"></div></div>
    <div class="field"><label>Priority</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Room-by-Room Scope Matrix</div>
<table>
  <thead><tr>
    <th>Room / Area</th><th>Sq Ft</th><th>Flooring Type</th><th>Product / SKU</th><th>Removal?</th><th>Subfloor Work?</th><th>Mat'l Cost</th><th>Install Cost</th><th>Total</th>
  </tr></thead>
  <tbody>
    <tr><td>Living Room</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td><td>$</td></tr>
    <tr><td>Master Bedroom</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td><td>$</td></tr>
    <tr><td>Bedroom 2</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td><td>$</td></tr>
    <tr><td>Kitchen</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td><td>$</td></tr>
    <tr><td>Bathroom</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td><td>$</td></tr>
    <tr><td>Hallway</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td><td>$</td></tr>
    <tr><td>Other</td><td></td><td></td><td></td><td></td><td></td><td>$</td><td>$</td><td>$</td></tr>
    <tr><td colspan="6" style="text-align:right;font-weight:700;">Totals</td><td>$</td><td>$</td><td>$</td></tr>
  </tbody>
</table>

<div class="section-title">Materials &amp; Add-Ons</div>
<div class="row">
  <div class="field"><label>Underlayment Type</label><div class="line"></div></div>
  <div class="field"><label>Transition Strips</label><div class="line"></div></div>
  <div class="field"><label>Baseboard / Quarter Round</label><div class="line"></div></div>
  <div class="field"><label>Adhesive / Fasteners</label><div class="line"></div></div>
</div>

<div class="section-title">Subfloor &amp; Demo Notes</div>
<div class="row"><div class="field"><div class="line-tall"></div></div></div>

<div class="section-title">Installation Notes &amp; Conditions</div>
<div class="row">
  <div class="field"><label>Acclimation Required?</label><div class="line"></div></div>
  <div class="field"><label>Moisture Test Result</label><div class="line"></div></div>
  <div class="field"><label>Install Pattern / Direction</label><div class="line"></div></div>
</div>

<div class="invoice-box">
  <h2>Estimate / Invoice Summary</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Total Materials</td><td>$</td></tr>
      <tr><td>Total Labor / Installation</td><td>$</td></tr>
      <tr><td>Demo / Removal</td><td>$</td></tr>
      <tr><td>Subfloor Repair</td><td>$</td></tr>
      <tr><td>Miscellaneous / Disposal</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">ESTIMATE / INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Deposit Required</label><div class="line"></div></div>
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Complete Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> All rooms installed per scope</div>
  <div class="check-item"><div class="check-box"></div> Transitions installed</div>
  <div class="check-item"><div class="check-box"></div> Baseboards reinstalled / installed</div>
  <div class="check-item"><div class="check-box"></div> Debris removed from site</div>
  <div class="check-item"><div class="check-box"></div> Client walk-through completed</div>
  <div class="check-item"><div class="check-box"></div> Final invoice collected</div>
</div>

<div class="rating-row" style="margin-top:14px;">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Contractor Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Client Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-017 Flooring Estimate Scope Matrix &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-018 — Contractor Daily Site Report
  // ─────────────────────────────────────────────────────────────────────────
  'LS-018': {
    id: 'LS-018',
    title: 'Contractor Daily Site Report',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Contractor Daily Site Report — LS-018</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Contractor Daily Site Report</div>
    <div class="form-label">Form LS-018 &nbsp;|&nbsp; General Contractor</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Contractor Daily<br>Site Report</h1>
      <div class="form-id">Form LS-018 &nbsp;|&nbsp; Report #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Project Name</label><div class="line"></div></div>
    <div class="field"><label>Site Address</label><div class="line"></div></div>
    <div class="field"><label>Report Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Superintendent / GC</label><div class="line"></div></div>
    <div class="field"><label>Project #</label><div class="line"></div></div>
    <div class="field"><label>Weather Conditions</label><div class="line"></div></div>
    <div class="field"><label>Temp (°F)</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Crew on Site</div>
<table>
  <thead><tr>
    <th>Trade / Sub</th><th>Foreman / Lead</th><th>Crew Count</th><th>Hours on Site</th><th>Work Performed</th>
  </tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Work Completed Today</div>
<div class="row"><div class="field"><div class="line-tall"></div></div></div>

<div class="section-title">Materials Delivered</div>
<table>
  <thead><tr><th>Material / Item</th><th>Supplier</th><th>Qty Delivered</th><th>PO / Ticket #</th><th>Condition</th></tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Issues, Delays &amp; Safety</div>
<div class="row">
  <div class="field"><label>Delays / Issues</label><div class="line-tall"></div></div>
  <div class="field"><label>Safety Incidents / Near Misses</label><div class="line-tall"></div></div>
</div>
<div class="row">
  <div class="field"><label>Visitors / Inspectors on Site</label><div class="line"></div></div>
  <div class="field"><label>Inspection Result</label><div class="line"></div></div>
</div>

<div class="section-title">Tomorrow's Plan</div>
<div class="row"><div class="field"><div class="line-tall"></div></div></div>

<div class="invoice-box">
  <h2>Daily Cost Summary (T&amp;M)</h2>
  <table>
    <thead><tr><th>Description</th><th>Hours / Qty</th><th>Rate</th><th>Total</th></tr></thead>
    <tbody>
      <tr><td>Labor — Crew 1</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Labor — Crew 2 / Sub</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Materials Used Today</td><td></td><td>$</td><td>$</td></tr>
      <tr><td>Equipment / Rental</td><td></td><td>$</td><td>$</td></tr>
      <tr class="total-row"><td colspan="3" style="text-align:right;">DAY TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Cumulative Project Cost to Date</label><div class="line"></div></div>
    <div class="field"><label>Budget Remaining</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">End-of-Day Site Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> Site secured / locked</div>
  <div class="check-item"><div class="check-box"></div> Tools stored</div>
  <div class="check-item"><div class="check-box"></div> Debris removed or staged</div>
  <div class="check-item"><div class="check-box"></div> Utilities shut off if needed</div>
  <div class="check-item"><div class="check-box"></div> Safety hazards mitigated</div>
  <div class="check-item"><div class="check-box"></div> Report submitted to owner</div>
</div>

<div class="sig-row" style="margin-top:14px;">
  <div class="sig-block">Superintendent Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Owner / PM Acknowledgment &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-018 Contractor Daily Site Report &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-019 — Septic Service Pump Log
  // ─────────────────────────────────────────────────────────────────────────
  'LS-019': {
    id: 'LS-019',
    title: 'Septic Service Pump Log',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Septic Service Pump Log — LS-019</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Septic Service Pump Log</div>
    <div class="form-label">Form LS-019 &nbsp;|&nbsp; Septic Service Tech</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Septic Service<br>Pump Log</h1>
      <div class="form-id">Form LS-019 &nbsp;|&nbsp; Work Order #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Property Owner</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>Service Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Property Address</label><div class="line"></div></div>
    <div class="field"><label>Technician</label><div class="line"></div></div>
    <div class="field"><label>Priority</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">System Information</div>
<div class="row">
  <div class="field"><label>Tank Size (gallons)</label><div class="line"></div></div>
  <div class="field"><label>Tank Material</label><div class="line"></div></div>
  <div class="field"><label>Number of Tanks</label><div class="line"></div></div>
  <div class="field"><label>System Type</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Last Pumped Date</label><div class="line"></div></div>
  <div class="field"><label>Years Since Last Service</label><div class="line"></div></div>
  <div class="field"><label>Permit / System ID #</label><div class="line"></div></div>
</div>

<div class="section-title">Tank Inspection &amp; Pump Log</div>
<table>
  <thead><tr>
    <th>Tank #</th><th>Gallons Pumped</th><th>Scum Layer (in)</th><th>Sludge Layer (in)</th><th>Inlet Baffle OK?</th><th>Outlet Baffle OK?</th><th>Lid Condition</th><th>Notes</th>
  </tr></thead>
  <tbody>
    <tr><td>1</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>2</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td>3</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Distribution Box &amp; Drain Field</div>
<div class="row">
  <div class="field"><label>D-Box Condition</label><div class="line"></div></div>
  <div class="field"><label>Drain Field Signs of Saturation?</label><div class="line"></div></div>
  <div class="field"><label>Effluent Filter — Cleaned?</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Pump Tank / Float Test (if applicable)</label><div class="line"></div></div>
  <div class="field"><label>Alarm Functional?</label><div class="line"></div></div>
</div>

<div class="section-title">Findings &amp; Recommendations</div>
<div class="row"><div class="field"><div class="line-tall"></div></div></div>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Pumping Service (___ gallons)</td><td>$</td></tr>
      <tr><td>Inspection Fee</td><td>$</td></tr>
      <tr><td>Filter Cleaning</td><td>$</td></tr>
      <tr><td>Parts / Repairs</td><td>$</td></tr>
      <tr><td>Disposal Fee</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Job Complete Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> All tanks pumped</div>
  <div class="check-item"><div class="check-box"></div> Lids replaced and secured</div>
  <div class="check-item"><div class="check-box"></div> Site cleaned — no spills</div>
  <div class="check-item"><div class="check-box"></div> Service report provided to owner</div>
  <div class="check-item"><div class="check-box"></div> Next recommended service noted</div>
  <div class="check-item"><div class="check-box"></div> Invoice collected / sent</div>
</div>

<div class="rating-row" style="margin-top:14px;">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Technician Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Property Owner Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-019 Septic Service Pump Log &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-020 — Service Business Fee Transparency Addendum
  // ─────────────────────────────────────────────────────────────────────────
  'LS-020': {
    id: 'LS-020',
    title: 'Service Business Fee Transparency Addendum',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Service Business Fee Transparency Addendum — LS-020</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .fee-row td { background: #fff !important; }
  .fee-row.highlighted td { background: #fffbf0 !important; border-left: 3px solid #f0b800; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .policy-box { border: 1.5px solid #0f1f3d; background: #f0f4fb; padding: 14px 16px; margin-bottom: 14px; font-size: 9.5pt; line-height: 1.7; }
  .policy-box h3 { font-size: 10pt; font-weight: 700; color: #0f1f3d; margin-bottom: 6px; text-transform: uppercase; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Service Business Fee Transparency Addendum</div>
    <div class="form-label">Form LS-020 &nbsp;|&nbsp; Any Service Trade</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Fee Transparency<br>Addendum</h1>
      <div class="form-id">Form LS-020 &nbsp;|&nbsp; Addendum to Invoice #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Client Name</label><div class="line"></div></div>
    <div class="field"><label>Service Address</label><div class="line"></div></div>
    <div class="field"><label>Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Service Provider</label><div class="line"></div></div>
    <div class="field"><label>Trade / Service Type</label><div class="line"></div></div>
    <div class="field"><label>Technician</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Purpose of This Addendum</div>
<div class="policy-box">
  <h3>About This Document</h3>
  This Fee Transparency Addendum is provided alongside your service invoice to help you understand all charges, fees, and pricing policies that apply to this job. Our goal is clear communication — no surprises. Please review each section and sign at the bottom to confirm you have received and understood this information.
</div>

<div class="section-title">Standard Fee Schedule</div>
<table>
  <thead><tr><th>Fee Type</th><th>Description</th><th>Amount / Rate</th><th>Applied This Job?</th></tr></thead>
  <tbody>
    <tr class="fee-row"><td>Diagnostic / Trip Fee</td><td>Initial dispatch to assess job</td><td>$</td><td></td></tr>
    <tr class="fee-row"><td>Hourly Labor Rate</td><td>Standard service labor</td><td>$___/hr</td><td></td></tr>
    <tr class="fee-row highlighted"><td>After-Hours / Emergency Rate</td><td>Outside normal business hours</td><td>$___/hr</td><td></td></tr>
    <tr class="fee-row"><td>Materials Markup</td><td>Handling fee on parts / materials</td><td>____%</td><td></td></tr>
    <tr class="fee-row highlighted"><td>Minimum Service Charge</td><td>Minimum fee per visit</td><td>$</td><td></td></tr>
    <tr class="fee-row"><td>Cancellation / No-Show Fee</td><td>Client cancels within ___ hrs</td><td>$</td><td></td></tr>
    <tr class="fee-row"><td>Travel / Mileage (beyond zone)</td><td>Per mile beyond service zone</td><td>$___/mi</td><td></td></tr>
    <tr class="fee-row"><td>Permit / Filing Fee</td><td>If applicable</td><td>$</td><td></td></tr>
    <tr class="fee-row"><td>Warranty Labor Rate</td><td>Labor for warranty callbacks</td><td>$</td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Payment &amp; Billing Policy</div>
<div class="policy-box">
  <h3>Payment Terms</h3>
  Payment is due upon completion of service unless a prior credit arrangement has been established. Accepted payment methods: ______________________________. Invoices unpaid after ___ days are subject to a late fee of ___% per month. Returned checks are subject to a $_____ returned check fee.
</div>

<div class="section-title">Warranty &amp; Callback Policy</div>
<div class="policy-box">
  <h3>Warranty Coverage</h3>
  Labor performed by our technicians is warranted for _______ days from the date of service. Parts and materials carry manufacturer warranty only, unless otherwise noted in writing. Warranty is voided by tampering, misuse, or failure to follow provided instructions. Emergency/callback service outside warranty is billed at standard rates.
</div>

<div class="section-title">Additional Disclosures</div>
<div class="row">
  <div class="field"><label>State / Trade License #</label><div class="line"></div></div>
  <div class="field"><label>Insurance Carrier</label><div class="line"></div></div>
  <div class="field"><label>Policy #</label><div class="line"></div></div>
</div>
<div class="row">
  <div class="field"><label>Any Additional Notes</label><div class="line-tall"></div></div>
</div>

<div class="invoice-box">
  <h2>Invoice Summary (from attached invoice)</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Labor</td><td>$</td></tr>
      <tr><td>Parts / Materials</td><td>$</td></tr>
      <tr><td>Fees Applied (see above)</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Client Acknowledgment &amp; Sign-Off</div>
<p style="font-size:9pt;margin-bottom:12px;">By signing below, I confirm that I have reviewed and understand the fee schedule, payment terms, and warranty policy described in this addendum. I authorize the charges on the attached invoice.</p>
<div class="sig-row">
  <div class="sig-block">Technician / Owner Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Client Signature &amp; Printed Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-020 Service Business Fee Transparency Addendum &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

  // ─────────────────────────────────────────────────────────────────────────
  // LS-013 — Painting Prep & Final Punch List
  // ─────────────────────────────────────────────────────────────────────────
  'LS-013': {
    id: 'LS-013',
    title: 'Painting Prep & Final Punch List',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Painting Prep &amp; Final Punch List — LS-013</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt; color: #111; background: #fff; max-width: 800px; margin: 0 auto; }
  .toolbar { background: #0f1f3d; color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; }
  .toolbar .brand { font-size: 13pt; font-weight: 700; }
  .toolbar .form-label { font-size: 9pt; opacity: 0.75; }
  .toolbar-actions { display: flex; gap: 10px; }
  .btn { padding: 7px 18px; border: none; border-radius: 4px; font-size: 10pt; cursor: pointer; }
  .btn-print { background: #fff; color: #0f1f3d; font-weight: 700; }
  .btn-save { background: #2563eb; color: #fff; font-weight: 700; }
  @media print { .toolbar { display: none !important; } }
  .page { padding: 24px; }
  .cover { border: 2.5px solid #0f1f3d; padding: 18px 20px; margin-bottom: 20px; }
  .cover-top { display: flex; justify-content: space-between; align-items: flex-start; }
  .company-name { font-size: 18pt; font-weight: 700; border: 2px dashed #bbb; padding: 4px 12px; min-width: 200px; min-height: 32px; display: inline-block; }
  .form-title-block { text-align: right; }
  .form-title-block h1 { font-size: 14pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0f1f3d; }
  .form-id { font-size: 8pt; color: #666; margin-top: 2px; }
  .row { display: flex; gap: 16px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .field label { font-size: 8pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #444; }
  .line { border-bottom: 1.5px solid #333; min-height: 22px; }
  .line-tall { border: 1.5px solid #333; min-height: 64px; padding: 3px; }
  .section-title { font-size: 9pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; background: #e8edf5; border-left: 3px solid #0f1f3d; padding: 4px 8px; margin: 16px 0 10px 0; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 10pt; }
  th { background: #0f1f3d; color: #fff; padding: 6px 8px; text-align: left; font-size: 8.5pt; }
  td { border: 1px solid #ccc; padding: 5px 8px; }
  tr:nth-child(even) td { background: #f7f9fc; }
  .check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; margin-bottom: 12px; }
  .check-item { display: flex; align-items: center; gap: 8px; font-size: 10pt; }
  .check-box { width: 16px; height: 16px; border: 1.5px solid #333; flex-shrink: 0; }
  .invoice-box { border: 2px solid #0f1f3d; padding: 16px; margin-top: 18px; }
  .invoice-box h2 { font-size: 11pt; font-weight: 700; text-transform: uppercase; color: #0f1f3d; margin-bottom: 12px; border-bottom: 1.5px solid #0f1f3d; padding-bottom: 6px; }
  .total-row td { font-weight: 700; background: #e8edf5 !important; }
  .sig-row { display: flex; gap: 24px; margin-top: 18px; }
  .sig-block { flex: 1; border-top: 1.5px solid #333; padding-top: 6px; font-size: 8.5pt; color: #555; }
  .rating-row { display: flex; gap: 10px; margin-bottom: 10px; }
  .rating-star { width: 28px; height: 28px; border: 1.5px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 14pt; }
  footer { margin-top: 24px; font-size: 7.5pt; color: #999; text-align: center; border-top: 1px solid #ddd; padding-top: 8px; }
  @media print { @page { margin: 0.5in; size: letter; } }
</style>
</head>
<body>
<div class="toolbar">
  <div>
    <div class="brand">Painting Prep &amp; Final Punch List</div>
    <div class="form-label">Form LS-013 &nbsp;|&nbsp; Painting Contractor</div>
  </div>
  <div class="toolbar-actions">
    <button class="btn btn-print" onclick="window.print()">Print</button>
    <button class="btn btn-save" onclick="window.print()">Save PDF</button>
  </div>
</div>
<div class="page">

<div class="cover">
  <div class="cover-top">
    <div>
      <div class="company-name">&nbsp;</div>
      <div style="font-size:8.5pt;color:#555;margin-top:4px;">Phone: _________________________ &nbsp; License #: _____________</div>
    </div>
    <div class="form-title-block">
      <h1>Painting Prep &amp;<br>Final Punch List</h1>
      <div class="form-id">Form LS-013 &nbsp;|&nbsp; Job #: ___________</div>
    </div>
  </div>
  <div class="row" style="margin-top:14px;">
    <div class="field"><label>Client Name</label><div class="line"></div></div>
    <div class="field"><label>Phone</label><div class="line"></div></div>
    <div class="field"><label>Job Start Date</label><div class="line"></div></div>
  </div>
  <div class="row">
    <div class="field"><label>Job Address</label><div class="line"></div></div>
    <div class="field"><label>Lead Painter</label><div class="line"></div></div>
    <div class="field"><label>Priority</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Scope of Work</div>
<div class="row">
  <div class="field"><label>Areas to be Painted</label><div class="line-tall"></div></div>
  <div class="field"><label>Special Instructions</label><div class="line-tall"></div></div>
</div>

<div class="section-title">Paint &amp; Materials Spec</div>
<table>
  <thead><tr>
    <th>Area / Surface</th><th>Paint Brand</th><th>Color / Code</th><th>Finish</th><th>Coats</th><th>Gallons</th>
  </tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="section-title">Prep Checklist</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> Furniture moved / covered</div>
  <div class="check-item"><div class="check-box"></div> Drop cloths placed</div>
  <div class="check-item"><div class="check-box"></div> Walls washed / cleaned</div>
  <div class="check-item"><div class="check-box"></div> Cracks &amp; holes patched</div>
  <div class="check-item"><div class="check-box"></div> Sanding complete</div>
  <div class="check-item"><div class="check-box"></div> Primer applied where needed</div>
  <div class="check-item"><div class="check-box"></div> Tape and masking applied</div>
  <div class="check-item"><div class="check-box"></div> Trim / fixtures protected</div>
</div>

<div class="section-title">Final Punch List</div>
<table>
  <thead><tr><th>Area</th><th>Item / Touch-Up Needed</th><th>Painter</th><th>Done?</th></tr></thead>
  <tbody>
    <tr><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td><td></td></tr>
  </tbody>
</table>

<div class="invoice-box">
  <h2>Service Invoice</h2>
  <table>
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td>Labor — ___ hrs @ $___/hr</td><td>$</td></tr>
      <tr><td>Paint &amp; Materials</td><td>$</td></tr>
      <tr><td>Primer / Supplies</td><td>$</td></tr>
      <tr><td>Tax</td><td>$</td></tr>
      <tr class="total-row"><td style="text-align:right;">INVOICE TOTAL</td><td>$</td></tr>
    </tbody>
  </table>
  <div class="row">
    <div class="field"><label>Payment Method</label><div class="line"></div></div>
    <div class="field"><label>Payment Status</label><div class="line"></div></div>
    <div class="field"><label>Invoice #</label><div class="line"></div></div>
  </div>
</div>

<div class="section-title">Final Walk-Through &amp; Sign-Off</div>
<div class="check-grid">
  <div class="check-item"><div class="check-box"></div> All areas painted per spec</div>
  <div class="check-item"><div class="check-box"></div> Punch list items resolved</div>
  <div class="check-item"><div class="check-box"></div> Tape removed — no bleed</div>
  <div class="check-item"><div class="check-box"></div> Drop cloths removed, floors clean</div>
  <div class="check-item"><div class="check-box"></div> Client walk-through completed</div>
  <div class="check-item"><div class="check-box"></div> Leftover paint labeled and given to client</div>
</div>
<div class="rating-row" style="margin-top:14px;">
  <div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div><div class="rating-star">&#9733;</div>
  <span style="margin-left:10px;font-size:9pt;align-self:center;">Comments: ___________________________________</span>
</div>
<div class="sig-row">
  <div class="sig-block">Lead Painter Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
  <div class="sig-block">Client Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Date</div>
</div>

<footer>INSTANT DOWNLOAD — Agent Atlas &nbsp;|&nbsp; Form LS-013 Painting Prep &amp; Final Punch List &nbsp;|&nbsp; agentatlasshop.etsy.com</footer>
</div>
</body>
</html>`
  },

}; // end TEMPLATES


// ─────────────────────────────────────────────────────────────────────────────
// generateTemplate — returns the full standalone HTML string for a listing ID
// ─────────────────────────────────────────────────────────────────────────────
function generateTemplate(listingId) {
  const t = TEMPLATES[listingId];
  if (!t) return null;
  return t.html; // the full standalone HTML string
}


// ─────────────────────────────────────────────────────────────────────────────
// openTemplate — opens the form in a new browser tab ready to print
// ─────────────────────────────────────────────────────────────────────────────
function openTemplate(listingId) {
  const html = generateTemplate(listingId);
  if (!html) return;
  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}

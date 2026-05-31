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

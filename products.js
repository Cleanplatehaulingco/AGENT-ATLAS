// Agent Atlas — Product Delivery Layer
// Plain browser JS, no ES modules, no bundler
// Depends on: TEMPLATES global from templates.js
// Exposes: global Products object

var Products = (function () {

  // ─── Config ───────────────────────────────────────────────────────────────

  var config = {
    defaultCompany: localStorage.getItem('atlas_company') || '',
    includeWatermark: false,
    licenseType: 'personal-commercial',
  };

  function setCompany(name) {
    config.defaultCompany = name || '';
    try { localStorage.setItem('atlas_company', config.defaultCompany); } catch (e) {}
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  function getTemplate(listingId) {
    return (typeof TEMPLATES !== 'undefined' && TEMPLATES[listingId]) || null;
  }

  function stripOuterTags(html) {
    // Remove <!DOCTYPE ...>, <html ...>, <head>...</head>, <body ...> / </body>, </html>
    return html
      .replace(/<!DOCTYPE[^>]*>/gi, '')
      .replace(/<html[^>]*>/gi, '')
      .replace(/<\/html>/gi, '')
      .replace(/<head[\s\S]*?<\/head>/gi, '')
      .replace(/<body[^>]*>/gi, '')
      .replace(/<\/body>/gi, '')
      .trim();
  }

  function niche5Bullets(tpl) {
    // Return 5 usage tips based on the template niche (title keyword matching)
    var title = tpl ? tpl.title.toLowerCase() : '';
    if (title.includes('hvac') || title.includes('service call')) {
      return [
        'Fill in your company name, phone, and license number before printing.',
        'Keep a pad of printed copies in every service van for quick job documentation.',
        'Scan or photograph the completed form and attach it to your job management software.',
        'Use the notes section to record part numbers and warranty info on-site.',
        'Give the customer their copy — it builds professionalism and trust.',
      ];
    }
    if (title.includes('invoice') || title.includes('receipt')) {
      return [
        'Add your logo to the header area before printing for a branded look.',
        'Number each invoice sequentially to simplify bookkeeping.',
        'Keep a carbon-copy pad or print duplicates — one for the customer, one for your records.',
        'Include payment terms (Net 15, due on receipt) to set clear expectations.',
        'Pair with a signed estimate on file to protect yourself in disputes.',
      ];
    }
    if (title.includes('inspection') || title.includes('checklist')) {
      return [
        'Laminate one copy as a reusable field reference and keep blank copies for documentation.',
        'Walk through the checklist in order — it prevents skipped steps on busy days.',
        'Have the customer co-sign the completed checklist as proof of condition.',
        'Photograph items you check off for a digital backup trail.',
        'Review failed items with the customer immediately so repairs can be quoted on-site.',
      ];
    }
    // Generic fallback
    return [
      'Customize the header with your business name, address, and phone number.',
      'Print a batch and keep them accessible so paperwork never slows you down.',
      'Scan completed forms and store them digitally for easy retrieval.',
      'Use consistent, professional paperwork to build customer confidence.',
      'You have unlimited reprints — print as many copies as your business needs.',
    ];
  }

  // ─── Page builders ────────────────────────────────────────────────────────

  function buildCoverPage(tpl, companyName) {
    var company = companyName || config.defaultCompany || '[Your Company Name]';
    var title   = tpl ? tpl.title : 'Business Form Template';
    return [
      '<div class="bundle-page cover-page" style="display:flex;flex-direction:column;justify-content:center;',
      'align-items:center;min-height:100vh;text-align:center;padding:60px 40px;page-break-after:always;">',
      '<div style="font-size:13pt;color:#555;margin-bottom:8px;letter-spacing:.08em;text-transform:uppercase;">',
      company, '</div>',
      '<h1 style="font-size:28pt;font-weight:700;margin:16px 0 8px;">', title, '</h1>',
      '<p style="color:#1a56db;font-size:13pt;margin-bottom:40px;">Thank you for your purchase!</p>',
      '<div style="max-width:480px;text-align:left;background:#f8f9fb;border-radius:10px;padding:28px 32px;',
      'border:1px solid #e2e8f0;">',
      '<p style="font-weight:700;margin-bottom:14px;">Quick Start</p>',
      '<p style="margin-bottom:10px;"><strong>Step 1:</strong> Print this document <em>or</em> open in Chrome and save as PDF.</p>',
      '<p style="margin-bottom:10px;"><strong>Step 2:</strong> Fill in your company info at the top of each form.</p>',
      '<p><strong>Step 3:</strong> Print as many copies as you need — you own unlimited use.</p>',
      '</div>',
      '<p style="margin-top:40px;font-size:9pt;color:#aaa;">Delivered by Agent Atlas &bull; agent-atlas.com</p>',
      '</div>',
    ].join('');
  }

  function buildFormPage(tpl) {
    var inner = tpl ? stripOuterTags(tpl.html) : [
      '<div style="padding:60px;text-align:center;color:#888;">',
      '<h2>Form content will appear here.</h2>',
      '<p>Template not found — please contact the seller.</p>',
      '</div>',
    ].join('');
    return '<div class="bundle-page form-page" style="page-break-after:always;">' + inner + '</div>';
  }

  function buildUsagePage(tpl) {
    var bullets = niche5Bullets(tpl);
    var items = bullets.map(function (b) {
      return '<li style="margin-bottom:10px;">' + b + '</li>';
    }).join('');
    return [
      '<div class="bundle-page usage-page" style="padding:60px 48px;page-break-after:always;">',
      '<h2 style="font-size:18pt;font-weight:700;margin-bottom:6px;">How to get the most from this template</h2>',
      '<div style="width:48px;height:3px;background:#1a56db;margin-bottom:28px;"></div>',
      '<ul style="line-height:1.7;font-size:11pt;padding-left:20px;">', items, '</ul>',
      '</div>',
    ].join('');
  }

  function buildLicensePage() {
    return [
      '<div class="bundle-page license-page" style="padding:60px 48px;">',
      '<h2 style="font-size:18pt;font-weight:700;margin-bottom:6px;">Personal &amp; Commercial Use License</h2>',
      '<div style="width:48px;height:3px;background:#1a56db;margin-bottom:28px;"></div>',
      '<p style="margin-bottom:14px;line-height:1.7;">',
      'You may use this template for your own business indefinitely, including for commercial purposes.</p>',
      '<p style="margin-bottom:14px;line-height:1.7;">',
      'You <strong>may not</strong> resell, redistribute, sublicense, or share this file with third parties.',
      ' Each purchase covers a single business.</p>',
      '<p style="margin-bottom:14px;line-height:1.7;">',
      'Unlimited reprints are included — print as many physical copies as your operation requires.</p>',
      '<p style="margin-top:40px;font-size:9pt;color:#aaa;">Powered by Agent Atlas &bull; agent-atlas.com</p>',
      '</div>',
    ].join('');
  }

  // ─── Core: generateBundle ─────────────────────────────────────────────────

  function generateBundle(listingId, companyName) {
    var tpl = getTemplate(listingId);
    var title = tpl ? tpl.title : listingId;

    var body = [
      buildCoverPage(tpl, companyName),
      buildFormPage(tpl),
      buildUsagePage(tpl),
      buildLicensePage(),
    ].join('\n');

    var html = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '<title>' + title + ' — Agent Atlas</title>',
      '<style>',
      '  * { box-sizing: border-box; margin: 0; padding: 0; }',
      '  body { font-family: system-ui, -apple-system, sans-serif; font-size: 11pt;',
      '         color: #111; background: #fff; }',
      '  @media print {',
      '    .bundle-page { page-break-after: always; }',
      '    .no-print { display: none !important; }',
      '  }',
      '  .print-btn { display:inline-block; margin:18px; padding:8px 22px; background:#1a56db;',
      '               color:#fff; border:none; border-radius:5px; font-size:11pt; cursor:pointer; }',
      '</style>',
      '</head>',
      '<body>',
      '<div class="no-print" style="background:#1a56db;color:#fff;padding:10px 18px;font-size:10pt;">',
      '  <strong>Agent Atlas Download</strong> &mdash; ' + title,
      '  <button class="print-btn" style="margin-left:20px;background:#fff;color:#1a56db;"',
      '          onclick="window.print()">Print / Save as PDF</button>',
      '</div>',
      body,
      '</body>',
      '</html>',
    ].join('\n');

    return new Blob([html], { type: 'text/html;charset=utf-8' });
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  function download(listingId, companyName) {
    var tpl  = getTemplate(listingId);
    var slug = tpl ? tpl.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : listingId;
    var blob = generateBundle(listingId, companyName);
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href     = url;
    a.download = slug + '-template.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  }

  function previewBundle(listingId) {
    var blob = generateBundle(listingId, config.defaultCompany);
    var url  = URL.createObjectURL(blob);
    var win  = window.open(url, '_blank');
    if (win) {
      win.addEventListener('load', function () {
        setTimeout(function () { URL.revokeObjectURL(url); }, 30000);
      });
    }
  }

  function deliveryInstructions(listingId) {
    var tpl  = getTemplate(listingId);
    var name = tpl ? tpl.title : 'Business Form Template';
    return [
      '<pre style="font-family:inherit;white-space:pre-wrap;">',
      '📦 WHAT\'S INCLUDED:\n',
      '✅ ' + name + ' — print-ready PDF format\n',
      '✅ Unlimited reprints for your business\n',
      '✅ Instant download — no waiting\n',
      '✅ Works in any PDF viewer or browser\n',
      '\nHOW TO USE:\n',
      '1. Download the file\n',
      '2. Open in Chrome or any browser\n',
      '3. File → Print → Save as PDF\n',
      '4. Add your company name and logo\n',
      '5. Print or use digitally',
      '</pre>',
    ].join('');
  }

  function statusHTML(listingId) {
    var tpl = getTemplate(listingId);
    if (tpl) {
      return '<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;' +
             'background:#ecfdf5;color:#065f46;border:1px solid #6ee7b7;border-radius:20px;font-size:10pt;">' +
             '&#10003; Product File Ready</span>';
    }
    return '<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;' +
           'background:#fffbeb;color:#92400e;border:1px solid #fcd34d;border-radius:20px;font-size:10pt;">' +
           '&#9888; No File</span>';
  }

  // ─── Expose ───────────────────────────────────────────────────────────────

  return {
    config: config,
    setCompany: setCompany,
    generateBundle: generateBundle,
    download: download,
    previewBundle: previewBundle,
    deliveryInstructions: deliveryInstructions,
    statusHTML: statusHTML,
  };

}());

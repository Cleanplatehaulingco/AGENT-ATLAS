/**
 * monitor.js — TradeOpsVault Shop Monitor
 *
 * Three data sources (no Etsy API approval required):
 *  1. Bookmarklet  — user clicks while on Etsy Shop Manager Stats → scrapes DOM → saves here
 *  2. CSV Import   — drag Etsy order-history CSV onto drop zone → auto-parsed
 *  3. Site Uptime  — pings GitHub Pages every 20 min via Image beacon (CORS-safe)
 *
 * Stores everything in localStorage under:
 *   atlas_monitor_stats   — latest bookmarklet snapshot
 *   atlas_monitor_orders  — parsed CSV order rows
 *   atlas_monitor_uptime  — uptime ping log
 */

var ShopMonitor = (function () {
  'use strict';

  var STORE_STATS   = 'atlas_monitor_stats';
  var STORE_ORDERS  = 'atlas_monitor_orders';
  var STORE_UPTIME  = 'atlas_monitor_uptime';
  var SITE_URL      = 'https://cleanplatehaulingco.github.io/AGENT-ATLAS/';
  var GOAL          = 500;
  var PING_INTERVAL = 20 * 60 * 1000; // 20 minutes

  // ── Storage helpers ──────────────────────────────────────────────────────
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch(e) { return null; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  function getStats()  { return load(STORE_STATS)  || {}; }
  function getOrders() { return load(STORE_ORDERS) || []; }
  function getUptime() { return load(STORE_UPTIME) || []; }

  // ── Revenue from CSV orders ──────────────────────────────────────────────
  function totalRevenueFromOrders() {
    var orders = getOrders();
    return orders.reduce(function(sum, o) {
      var val = parseFloat(String(o.total || o.Total || o.subtotal || o.Subtotal || '0').replace(/[^0-9.]/g,''));
      return sum + (isNaN(val) ? 0 : val);
    }, 0);
  }

  function revenueFromStats() {
    var s = getStats();
    return parseFloat(String(s.revenue || '0').replace(/[^0-9.]/g,'')) || 0;
  }

  // Best revenue estimate: CSV orders win if present, else bookmarklet snapshot
  function bestRevenue() {
    var csv = totalRevenueFromOrders();
    var bm  = revenueFromStats();
    return csv > 0 ? csv : bm;
  }

  // ── Bookmarklet code (generated as a string for copy/install) ────────────
  function bookmarkletCode() {
    // This runs on the Etsy Seller Dashboard / Stats page
    // It reads whatever numbers are visible and saves them to atlas_monitor_stats
    var inner = '(function(){'
      + 'function txt(sel){var el=document.querySelector(sel);return el?el.textContent.trim():null;}'
      + 'function all(sel){return Array.from(document.querySelectorAll(sel)).map(function(e){return e.textContent.trim();});}'
      // Etsy Shop Manager Stats page structure (best-effort selectors)
      + 'var revenue=null,orders=null,views=null,visits=null;'
      // Try data from the stats summary numbers — Etsy uses various class names
      + 'var nums=all(\'[data-stats-value], .stats-overview__value, .shop-stats__value, h3.currency, .shop-stats-metric__value\');'
      + 'var labels=all(\'[data-stats-label], .stats-overview__label, .shop-stats__label, .shop-stats-metric__label\');'
      + 'for(var i=0;i<labels.length;i++){'
      +   'var l=(labels[i]||"").toLowerCase();'
      +   'var v=nums[i]||"0";'
      +   'if(l.includes("revenue")||l.includes("sales"))revenue=v;'
      +   'else if(l.includes("order"))orders=v;'
      +   'else if(l.includes("view"))views=v;'
      +   'else if(l.includes("visit"))visits=v;'
      + '}'
      // Fallback: grab all dollar amounts on page
      + 'if(!revenue){'
      +   'var matches=document.body.innerText.match(/\\$[\\d,]+\\.\\d{2}/g);'
      +   'if(matches&&matches.length)revenue=matches[0];'
      + '}'
      + 'var snap={'
      +   'revenue:revenue,'
      +   'orders:orders,'
      +   'views:views,'
      +   'visits:visits,'
      +   'url:location.href,'
      +   'savedAt:new Date().toISOString()'
      + '};'
      + 'localStorage.setItem("atlas_monitor_stats",JSON.stringify(snap));'
      + 'alert("✓ Atlas synced!\\nRevenue: "+(revenue||"not found")+"\\nOrders: "+(orders||"not found")+"\\nViews: "+(views||"not found")+"\\n\\nSwitch back to Agent Atlas to see the update.");'
      + '})();';
    return 'javascript:' + encodeURIComponent(inner);
  }

  // ── CSV Parser ────────────────────────────────────────────────────────────
  // Etsy order CSV columns (varies slightly by export version):
  // "Sale Date","Item Name","Buyer","Order ID","SKU","Quantity","Price","Coupon Code","Coupon Amount","Discount","Shipping","Order Total","VAT Paid by Buyer","Transaction ID","Listing ID","Date Paid","Date Shipped","Ship Name","Ship Address1","Ship City","Ship State","Ship Zipcode","Ship Country"
  function parseCSV(text) {
    var lines = text.split(/\r?\n/);
    if (lines.length < 2) return [];
    var headers = splitCSVRow(lines[0]).map(function(h){ return h.replace(/^"|"$/g,'').trim(); });
    var rows = [];
    for (var i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      var cells = splitCSVRow(lines[i]).map(function(c){ return c.replace(/^"|"$/g,'').trim(); });
      var obj = {};
      headers.forEach(function(h, idx){ obj[h] = cells[idx] || ''; });
      // Normalise key fields
      obj._date    = obj['Sale Date'] || obj['Date Paid'] || obj['Order Date'] || '';
      obj._item    = obj['Item Name'] || obj['Title'] || obj['Listing Title'] || '';
      obj._total   = obj['Order Total'] || obj['Total'] || obj['Price'] || '0';
      obj._orderId = obj['Order ID'] || obj['Transaction ID'] || '';
      if (obj._item || obj._total) rows.push(obj);
    }
    return rows;
  }

  function splitCSVRow(row) {
    // Handle quoted fields containing commas
    var result = [], cur = '', inQ = false;
    for (var i = 0; i < row.length; i++) {
      var c = row[i];
      if (c === '"') { inQ = !inQ; }
      else if (c === ',' && !inQ) { result.push(cur); cur = ''; }
      else { cur += c; }
    }
    result.push(cur);
    return result;
  }

  function importCSV(text) {
    var rows = parseCSV(text);
    if (!rows.length) return { imported: 0, error: 'No rows found — check file format' };
    save(STORE_ORDERS, rows);
    return { imported: rows.length };
  }

  // ── Uptime pinger (Image beacon — no CORS issues) ────────────────────────
  var _pingTimer = null;

  function ping() {
    var log = getUptime();
    var entry = { ts: Date.now(), ok: null };
    var img = new Image();
    var done = false;
    function finish(ok) {
      if (done) return;
      done = true;
      entry.ok = ok;
      log.push(entry);
      // Keep last 500 pings (~7 days at 20 min)
      if (log.length > 500) log = log.slice(-500);
      save(STORE_UPTIME, log);
    }
    img.onload  = function(){ finish(true);  };
    img.onerror = function(){ finish(false); };
    // Cache-bust so browser doesn't cache the result
    img.src = SITE_URL + '?_ping=' + Date.now();
    // Timeout after 10s
    setTimeout(function(){ finish(false); }, 10000);
  }

  function startPinging() {
    if (_pingTimer) return;
    ping(); // immediate first ping
    _pingTimer = setInterval(ping, PING_INTERVAL);
  }

  function uptimeSummary() {
    var log = getUptime();
    if (!log.length) return { pings: 0, upPct: null, lastOk: null, lastCheck: null };
    var up = log.filter(function(e){ return e.ok; }).length;
    var last = log[log.length - 1];
    var lastOk = null;
    for (var i = log.length - 1; i >= 0; i--) {
      if (log[i].ok) { lastOk = log[i].ts; break; }
    }
    return {
      pings:    log.length,
      upPct:    Math.round((up / log.length) * 100),
      lastOk:   lastOk,
      lastCheck: last.ts,
      currentlyUp: last.ok,
    };
  }

  // ── Human-readable time ───────────────────────────────────────────────────
  function timeAgo(ts) {
    if (!ts) return 'never';
    var diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60)  return diff + 's ago';
    if (diff < 3600) return Math.floor(diff/60) + 'm ago';
    if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
    return Math.floor(diff/86400) + 'd ago';
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function renderView() {
    var stats   = getStats();
    var orders  = getOrders();
    var uptime  = uptimeSummary();
    var rev     = bestRevenue();
    var goalPct = Math.min(100, Math.round((rev / GOAL) * 100));
    var hasStats  = !!stats.savedAt;
    var hasOrders = orders.length > 0;

    // Recent orders table (last 10)
    var recentOrders = orders.slice(-10).reverse();

    // Order count
    var orderCount = orders.length || (parseInt(String(stats.orders||'0').replace(/[^0-9]/g,'')) || 0);

    // Views from bookmarklet
    var views  = parseInt(String(stats.views||'0').replace(/[^0-9]/g,''))  || 0;
    var visits = parseInt(String(stats.visits||'0').replace(/[^0-9]/g,'')) || 0;

    var bm = bookmarkletCode();

    return `
<div style="max-width:960px;display:flex;flex-direction:column;gap:20px;">

  <!-- KPI row -->
  <div class="kpi-grid">
    <div class="kpi-card blue">
      <div class="kpi-label">Revenue</div>
      <div class="kpi-val">$${rev.toFixed(2)}</div>
      <div class="kpi-sub">of $${GOAL} goal · ${hasOrders ? 'from CSV' : hasStats ? 'from bookmarklet' : 'no data yet'}</div>
      <div class="progress slim mt-4"><div style="width:${goalPct}%"></div></div>
    </div>
    <div class="kpi-card ${orderCount > 0 ? 'green' : ''}">
      <div class="kpi-label">Orders</div>
      <div class="kpi-val">${orderCount}</div>
      <div class="kpi-sub">${hasOrders ? orders.length + ' rows imported' : hasStats ? 'from bookmarklet' : 'no data yet'}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Shop Views</div>
      <div class="kpi-val">${views.toLocaleString()}</div>
      <div class="kpi-sub">${hasStats ? 'synced ' + timeAgo(new Date(stats.savedAt).getTime()) : 'run bookmarklet to sync'}</div>
    </div>
    <div class="kpi-card ${uptime.currentlyUp === true ? 'green' : uptime.currentlyUp === false ? 'red' : ''}">
      <div class="kpi-label">Site Uptime</div>
      <div class="kpi-val">${uptime.upPct !== null ? uptime.upPct + '%' : '—'}</div>
      <div class="kpi-sub">${uptime.lastCheck ? 'checked ' + timeAgo(uptime.lastCheck) : 'monitoring starting…'} · ${uptime.pings} pings</div>
    </div>
  </div>

  <!-- Goal progress bar -->
  <div class="card" style="padding:20px 24px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
      <span style="font-weight:800;font-size:.95rem;">$500 / 45-Day Goal</span>
      <span style="font-size:.82rem;color:var(--muted);">$${rev.toFixed(2)} earned · $${Math.max(0,GOAL-rev).toFixed(2)} to go</span>
    </div>
    <div style="background:var(--panel2);border-radius:8px;padding:3px;">
      <div style="height:14px;border-radius:6px;background:linear-gradient(90deg,var(--accent),#00c853);width:${goalPct}%;transition:width .5s;min-width:${goalPct>0?'16px':'0'};"></div>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);margin-top:6px;">
      <span>${goalPct}% complete</span>
      <span style="color:${goalPct>=100?'var(--success)':'var(--muted)'};">${goalPct>=100?'🎉 Goal reached!':'Keep going'}</span>
    </div>
  </div>

  <!-- Two-column: bookmarklet install + CSV import -->
  <div class="grid-2">

    <!-- Bookmarklet -->
    <div class="card">
      <div class="section-header"><span class="section-title">📊 Sync Etsy Stats</span></div>
      <p style="font-size:.82rem;color:var(--muted);margin:0 0 14px;">Drag the button below to your browser bookmarks bar. Then go to your <strong>Etsy Shop Manager → Stats</strong> page and click it — it reads your revenue, orders, and views and syncs them here instantly.</p>

      <div style="background:var(--panel2);border:1.5px dashed var(--border);border-radius:10px;padding:16px;text-align:center;margin-bottom:14px;">
        <a id="atlas-bookmarklet-link" href="${bm}"
          style="display:inline-block;background:linear-gradient(135deg,#f06a00,#e85d04);color:#fff;font-weight:800;font-size:.9rem;padding:10px 22px;border-radius:8px;text-decoration:none;box-shadow:0 4px 14px rgba(232,93,4,0.4);cursor:grab;"
          ondragstart="event.dataTransfer.setData('text/plain',this.href)"
          onclick="event.preventDefault();alert('Drag this button to your bookmarks bar — don\\'t click it here.')">
          ★ Atlas Sync — TradeOpsVault
        </a>
        <div style="font-size:.72rem;color:var(--muted);margin-top:10px;">← Drag me to your bookmarks bar</div>
      </div>

      <div style="font-size:.76rem;color:var(--muted);line-height:1.6;">
        <strong style="color:var(--text);">How to use:</strong><br>
        1. Drag the orange button above to your bookmarks bar<br>
        2. Go to <code style="background:var(--panel2);padding:1px 4px;border-radius:3px;">etsy.com/your/shops/TradeOpsVault/stats</code><br>
        3. Click <em>Atlas Sync</em> in your bookmarks bar<br>
        4. Come back here — stats update automatically
      </div>

      ${hasStats ? `
      <div style="margin-top:14px;background:rgba(0,200,83,0.08);border:1px solid rgba(0,200,83,0.2);border-radius:8px;padding:10px 14px;font-size:.78rem;">
        <strong style="color:var(--success);">Last sync: ${timeAgo(new Date(stats.savedAt).getTime())}</strong><br>
        Revenue: ${stats.revenue || '—'} · Orders: ${stats.orders || '—'} · Views: ${stats.views || '—'}
        ${stats.url ? `<br><span style="color:var(--muted);font-size:.7rem;">from ${stats.url.split('/').slice(0,5).join('/')}</span>` : ''}
      </div>` : ''}
    </div>

    <!-- CSV Import -->
    <div class="card">
      <div class="section-header"><span class="section-title">📥 Import Order History (CSV)</span></div>
      <p style="font-size:.82rem;color:var(--muted);margin:0 0 14px;">In Etsy: <strong>Shop Manager → Orders → ⋯ → Download CSV</strong>. Then drag the file below. Full order history imports in seconds — revenue updates automatically.</p>

      <div id="csv-drop-zone"
        style="border:2px dashed var(--border);border-radius:10px;padding:28px 16px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;margin-bottom:12px;"
        ondragover="event.preventDefault();this.style.borderColor='var(--accent)';this.style.background='rgba(79,124,255,0.06)';"
        ondragleave="this.style.borderColor='var(--border)';this.style.background='';"
        ondrop="ShopMonitor._onCSVDrop(event)"
        onclick="document.getElementById('csv-file-input').click()">
        <div style="font-size:1.6rem;margin-bottom:8px;">📂</div>
        <div style="font-weight:700;font-size:.85rem;color:var(--text);">Drop Etsy CSV here</div>
        <div style="font-size:.74rem;color:var(--muted);margin-top:4px;">or click to browse</div>
      </div>
      <input id="csv-file-input" type="file" accept=".csv,text/csv" style="display:none" onchange="ShopMonitor._onCSVFile(this)">

      ${hasOrders ? `
      <div style="background:rgba(0,200,83,0.08);border:1px solid rgba(0,200,83,0.2);border-radius:8px;padding:10px 14px;font-size:.78rem;margin-bottom:10px;">
        <strong style="color:var(--success);">✓ ${orders.length} orders imported</strong> · $${totalRevenueFromOrders().toFixed(2)} total revenue
        <button onclick="ShopMonitor._clearOrders()" style="float:right;background:none;border:none;color:var(--muted);cursor:pointer;font-size:.75rem;">Clear</button>
      </div>` : ''}

      <div style="font-size:.74rem;color:var(--muted);line-height:1.6;">
        <strong style="color:var(--text);">Etsy CSV export path:</strong><br>
        Shop Manager → Orders &amp; Deliveries → ··· menu → Download CSV<br>
        <span style="color:var(--muted);">Works with any date range Etsy gives you.</span>
      </div>
    </div>
  </div>

  <!-- Recent orders -->
  ${hasOrders && recentOrders.length ? `
  <div class="card">
    <div class="section-header">
      <span class="section-title">Recent Orders</span>
      <span style="font-size:.76rem;color:var(--muted);">showing last ${recentOrders.length} of ${orders.length}</span>
    </div>
    <div class="table-wrap mt-8">
      <table class="table">
        <thead><tr><th>Date</th><th>Item</th><th>Order ID</th><th>Total</th></tr></thead>
        <tbody>
          ${recentOrders.map(function(o) {
            return `<tr>
              <td class="mono" style="white-space:nowrap">${o._date.split(' ')[0] || '—'}</td>
              <td style="max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${esc(o._item)}">${esc(o._item) || '—'}</td>
              <td class="mono">${esc(o._orderId) || '—'}</td>
              <td class="mono text-success">${o._total ? '$' + parseFloat(String(o._total).replace(/[^0-9.]/g,'')).toFixed(2) : '—'}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>` : ''}

  <!-- Uptime log -->
  <div class="card">
    <div class="section-header">
      <span class="section-title">Site Uptime — ${SITE_URL}</span>
      <span style="font-size:.76rem;color:${uptime.currentlyUp === true ? 'var(--success)' : uptime.currentlyUp === false ? 'var(--danger)' : 'var(--muted)'};">
        ${uptime.currentlyUp === true ? '● Online' : uptime.currentlyUp === false ? '● Down' : '● Checking…'}
      </span>
    </div>
    <div style="font-size:.78rem;color:var(--muted);margin:6px 0 12px;">
      Automatically pings your shop site every 20 minutes. ${uptime.pings} checks recorded.
      ${uptime.upPct !== null ? `<strong style="color:var(--text);">${uptime.upPct}% uptime</strong>.` : ''}
      ${uptime.lastOk ? 'Last confirmed up: ' + timeAgo(uptime.lastOk) + '.' : ''}
    </div>
    ${getUptime().length > 0 ? `
    <div style="display:flex;gap:2px;flex-wrap:wrap;">
      ${getUptime().slice(-120).map(function(e){
        return '<div title="' + new Date(e.ts).toLocaleString() + '" style="width:8px;height:20px;border-radius:2px;background:' + (e.ok ? '#00c853' : '#e53935') + ';flex-shrink:0;"></div>';
      }).join('')}
    </div>
    <div style="font-size:.68rem;color:var(--muted);margin-top:6px;">← oldest · newest → (last ${Math.min(getUptime().length,120)} pings · green = up · red = down)</div>` : ''}
    <button onclick="ShopMonitor._pingNow()" style="margin-top:12px;background:var(--panel2);border:1px solid var(--border);border-radius:7px;padding:6px 14px;cursor:pointer;font-size:.78rem;color:var(--text);">Ping Now</button>
  </div>

</div>`;
  }

  // ── Event handlers wired from HTML ────────────────────────────────────────
  function _onCSVDrop(event) {
    event.preventDefault();
    var zone = document.getElementById('csv-drop-zone');
    if (zone) { zone.style.borderColor = 'var(--border)'; zone.style.background = ''; }
    var file = event.dataTransfer && event.dataTransfer.files[0];
    if (!file) return;
    _readCSVFile(file);
  }

  function _onCSVFile(input) {
    var file = input && input.files && input.files[0];
    if (!file) return;
    _readCSVFile(file);
  }

  function _readCSVFile(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var result = importCSV(e.target.result);
      if (result.error) {
        if (typeof toast === 'function') toast('CSV error: ' + result.error, 'warn');
      } else {
        if (typeof toast === 'function') toast('✓ ' + result.imported + ' orders imported — $' + totalRevenueFromOrders().toFixed(2) + ' revenue', 'success');
        if (typeof renderMonitorView === 'function') renderMonitorView();
      }
    };
    reader.readAsText(file);
  }

  function _clearOrders() {
    save(STORE_ORDERS, []);
    if (typeof toast === 'function') toast('Order history cleared', 'info');
    if (typeof renderMonitorView === 'function') renderMonitorView();
  }

  function _pingNow() {
    ping();
    if (typeof toast === 'function') toast('Pinging site…', 'info');
    setTimeout(function() {
      if (typeof renderMonitorView === 'function') renderMonitorView();
    }, 3000);
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    startPinging();
  }

  return {
    init:               init,
    renderView:         renderView,
    getStats:           getStats,
    getOrders:          getOrders,
    bestRevenue:        bestRevenue,
    totalRevenueFromOrders: totalRevenueFromOrders,
    uptimeSummary:      uptimeSummary,
    importCSV:          importCSV,
    bookmarkletCode:    bookmarkletCode,
    // Internal handlers called from inline HTML
    _onCSVDrop:  _onCSVDrop,
    _onCSVFile:  _onCSVFile,
    _clearOrders: _clearOrders,
    _pingNow:    _pingNow,
  };
})();

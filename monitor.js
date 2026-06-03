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

var RENDER_API = 'https://agent-atlas-api.onrender.com';

var ShopMonitor = (function () {
  'use strict';

  var STORE_STATS   = 'atlas_monitor_stats';
  var STORE_ORDERS  = 'atlas_monitor_orders';
  var GOAL          = 500;

  // ── Storage helpers ──────────────────────────────────────────────────────
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch(e) { return null; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  function getStats()  { return load(STORE_STATS)  || {}; }
  function getOrders() { return load(STORE_ORDERS) || []; }

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

  // ── Listing Launcher Bookmarklet ─────────────────────────────────────────
  // Fetches listing data from the relay API (POST by prepareLaunch, GET by bookmarklet).
  // Fixed key "atlas_launch_latest" so the bookmarklet never needs re-installing.
  function listingLauncherCode() {
    var RELAY_URL = RENDER_API + '/relay/load/atlas_launch_latest';
    var inner = '(function(){'
      // Fetch from relay API — works cross-origin from etsy.com
      + 'fetch(' + JSON.stringify(RELAY_URL) + ')'
      + '.then(function(r){return r.json();})'
      + '.then(function(res){'
      +   'if(!res.ok||!res.data){alert("No listing data. Go back to Atlas, pick a listing, click Prepare Launch, then try again.");return;}'
      +   'var d=res.data;'

      // Helper: find input/textarea by label text, aria-label, placeholder, or name
      + 'function setField(sel,val){'
      +   'var el=document.querySelector(sel);'
      +   'if(!el)return false;'
      +   'var nativeSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value")||'
      +     'Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,"value");'
      +   'if(nativeSetter&&nativeSetter.set)nativeSetter.set.call(el,val);'
      +   'else el.value=val;'
      +   'el.dispatchEvent(new Event("input",{bubbles:true}));'
      +   'el.dispatchEvent(new Event("change",{bubbles:true}));'
      +   'return true;'
      + '}'
      + 'function setByLabel(labelText,val){'
      +   'var labels=Array.from(document.querySelectorAll("label"));'
      +   'var lbl=labels.find(function(l){return l.textContent.toLowerCase().includes(labelText.toLowerCase());});'
      +   'if(!lbl)return false;'
      +   'var id=lbl.htmlFor||lbl.getAttribute("for");'
      +   'var el=id?document.getElementById(id):lbl.querySelector("input,textarea");'
      +   'if(!el)return false;'
      +   'var nativeSetter=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el),"value");'
      +   'if(nativeSetter&&nativeSetter.set)nativeSetter.set.call(el,val);'
      +   'else el.value=val;'
      +   'el.dispatchEvent(new Event("input",{bubbles:true}));'
      +   'el.dispatchEvent(new Event("change",{bubbles:true}));'
      +   'return true;'
      + '}'
      // Fill title
      + 'var filled=0;'
      + 'if(setByLabel("listing title",d.title)||setField("[name=title],[placeholder*=title i],[aria-label*=title i]",d.title))filled++;'
      // Fill description
      + 'if(setByLabel("description",d.desc)||setField("[name=description],textarea[placeholder*=descri i]",d.desc))filled++;'
      // Fill price
      + 'if(d.price&&(setByLabel("price",d.price)||setField("[name=price],[aria-label*=price i]",d.price)))filled++;'
      // Fill tags — Etsy uses a tag input where you type and press Enter/comma
      + 'var tagInput=document.querySelector("[placeholder*=tag i],[aria-label*=tag i],[name*=tag i]");'
      + 'if(tagInput&&d.tags){'
      +   'var tags=d.tags.split(",").map(function(t){return t.trim();}).filter(Boolean).slice(0,13);'
      +   'tags.forEach(function(tag){'
      +     'var nativeSetter=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(tagInput),"value");'
      +     'if(nativeSetter&&nativeSetter.set)nativeSetter.set.call(tagInput,tag);'
      +     'tagInput.dispatchEvent(new Event("input",{bubbles:true}));'
      +     'tagInput.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:true}));'
      +     'tagInput.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:true}));'
      +   '});'
      +   'filled++;'
      + '}'
      + 'alert("✓ Atlas filled "+filled+" fields for:\\n"+d.title.substring(0,60)+"...\\n\\nReview everything, set your digital download file, then click Publish!");'
      + '})'
      + '.catch(function(){alert("Could not reach Atlas API server. Check your connection.");});'
      + '})();';
    return 'javascript:' + encodeURIComponent(inner);
  }

  // POST payload to relay API, then open Etsy in a new tab.
  // Fixed relay key "atlas_launch_latest" — bookmarklet never needs re-installing.
  function prepareLaunch(listingId) {
    var copy = (typeof ETSY_COPY !== 'undefined' && ETSY_COPY[listingId]) || {};
    var atlasData = (function(){ try{ return JSON.parse(localStorage.getItem('agentAtlasV3')||'{}'); }catch(e){return {};} })();
    var listing = (atlasData.listings||[]).find(function(l){ return l.id === listingId; }) || {};
    var payload = {
      listingId: listingId,
      title:     copy.title || listing.name || listing.title || '',
      desc:      copy.desc  || '',
      tags:      copy.tags  || '',
      price:     String(listing.price || ''),
      preparedAt: new Date().toISOString(),
    };

    var RELAY_STORE_URL = RENDER_API + '/relay/store';
    var ETSY_NEW_LISTING = 'https://www.etsy.com/sell/add-listing';

    // POST to relay, then open Etsy once we know the data is stored
    fetch(RELAY_STORE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'atlas_launch_latest', data: payload }),
    })
    .then(function(r) {
      if (!r.ok) throw new Error('relay store failed: ' + r.status);
      // Open Etsy in a new tab after relay confirms storage
      window.open(ETSY_NEW_LISTING, '_blank');
    })
    .catch(function(err) {
      // Fallback: relay unavailable — use window.name approach
      if (typeof toast === 'function') toast('Relay API unreachable — using fallback window method', 'warn');
      var w = window.open('about:blank', '_blank');
      if (w) {
        w.name = JSON.stringify(payload);
        w.location.href = ETSY_NEW_LISTING;
      } else {
        if (typeof toast === 'function') toast('Allow popups for this site, then try again', 'warn');
      }
    });

    return payload;
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
    var rev     = bestRevenue();
    var goalPct = Math.min(100, Math.round((rev / GOAL) * 100));
    var hasStats  = !!stats.savedAt;
    var hasOrders = orders.length > 0;

    var recentOrders = orders.slice(-10).reverse();
    var orderCount = orders.length || (parseInt(String(stats.orders||'0').replace(/[^0-9]/g,'')) || 0);
    var views = parseInt(String(stats.views||'0').replace(/[^0-9]/g,'')) || 0;

    var bm = bookmarkletCode();

    return `
<div style="width:100%;display:flex;flex-direction:column;gap:20px;">

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
    <div class="kpi-card">
      <div class="kpi-label">Last Sync</div>
      <div class="kpi-val" style="font-size:1.1rem;">${hasStats ? timeAgo(new Date(stats.savedAt).getTime()) : '—'}</div>
      <div class="kpi-sub">${hasStats ? 'bookmarklet sync' : 'run bookmarklet to sync'}</div>
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

  <!-- Listing Launcher -->
  <div class="card">
    <div class="section-header"><span class="section-title">🚀 Listing Launcher — Semi-Auto Publisher</span></div>
    <p style="font-size:.82rem;color:var(--muted);margin:0 0 14px;">
      No API needed. Pick a listing below → click <strong>Prepare Launch</strong> → go to
      <code style="background:var(--panel2);padding:1px 5px;border-radius:3px;">etsy.com/sell/add-listing</code>
      → click the bookmark. Every field fills automatically. You just review and hit Publish.
    </p>

    <!-- Step 1: drag bookmarklet -->
    <div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:14px;">
      <div style="font-size:.78rem;font-weight:800;color:var(--text);margin-bottom:8px;">Step 1 — Install once (drag to bookmarks bar)</div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <a id="launcher-bookmarklet-link" href="${listingLauncherCode()}"
          style="display:inline-block;background:linear-gradient(135deg,#1565c0,#0d47a1);color:#fff;font-weight:800;font-size:.88rem;padding:9px 20px;border-radius:8px;text-decoration:none;box-shadow:0 4px 14px rgba(21,101,192,0.4);cursor:grab;white-space:nowrap;"
          ondragstart="event.dataTransfer.setData('text/plain',this.href)"
          onclick="event.preventDefault();alert('Drag this button to your bookmarks bar — don\\'t click it here.')">
          ⚡ Atlas Launch Listing
        </a>
        <span style="font-size:.74rem;color:var(--muted);">← Drag to bookmarks bar · only do this once</span>
      </div>
    </div>

    <!-- Step 2: pick listing + prepare -->
    <div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:14px;">
      <div style="font-size:.78rem;font-weight:800;color:var(--text);margin-bottom:10px;">Step 2 — Pick a listing → opens Etsy automatically</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <select id="launcher-listing-select" style="background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:7px;padding:7px 12px;font-size:.82rem;min-width:220px;">
          ${(function() {
            if (typeof ETSY_COPY === 'undefined') return '<option>Loading…</option>';
            return Object.keys(ETSY_COPY).map(function(id) {
              var title = ETSY_COPY[id].title || id;
              return '<option value="' + id + '">' + id + ' — ' + title.substring(0, 55) + (title.length > 55 ? '…' : '') + '</option>';
            }).join('');
          })()}
        </select>
        <button onclick="ShopMonitor._prepareLaunch()" style="background:var(--accent);color:#000;border:none;border-radius:8px;padding:8px 18px;cursor:pointer;font-size:.82rem;font-weight:800;">Prepare Launch →</button>
      </div>
      <div id="launcher-status" style="margin-top:10px;font-size:.76rem;color:var(--muted);"></div>
    </div>

    <!-- Step 3: go fill -->
    <div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:14px;">
      <div style="font-size:.78rem;font-weight:800;color:var(--text);margin-bottom:6px;">Step 3 — Fill &amp; publish</div>
      <div style="font-size:.76rem;color:var(--muted);line-height:1.7;">
        1. Click <strong>Prepare Launch</strong> above — Etsy opens automatically in a new tab with data preloaded<br>
        2. Once Etsy loads, click <strong>⚡ Atlas Launch Listing</strong> in your bookmarks bar<br>
        3. All fields fill instantly — review, upload your PDF file, hit <strong>Publish</strong><br>
        4. Done. ~30 seconds per listing
      </div>
    </div>
  </div>

  <!-- Etsy API Reapplication -->
  <div class="card">
    <div class="section-header">
      <span class="section-title">📋 Etsy API Reapplication — Copy & Paste Ready</span>
      <span style="background:rgba(0,200,83,0.15);color:var(--success);font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:4px;">High approval chance</span>
    </div>
    <p style="font-size:.82rem;color:var(--muted);margin:0 0 16px;">
      Your original application was likely denied for vague framing. You now have a live shop, a live tool, and a specific use case.
      Use the exact copy below — these fields match what Etsy's review team looks for.
    </p>

    <div style="display:flex;flex-direction:column;gap:12px;">

      <div style="background:var(--panel2);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:14px 16px;">
        <div style="font-size:.72rem;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">App Name</div>
        <div style="font-size:.88rem;color:var(--text);font-weight:600;" id="reapp-name">TradeOpsVault Listing Manager</div>
        <button onclick="copyText('reapp-name')" style="margin-top:6px;background:none;border:1px solid var(--border);border-radius:5px;padding:3px 10px;cursor:pointer;font-size:.7rem;color:var(--muted);">Copy</button>
      </div>

      <div style="background:var(--panel2);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:14px 16px;">
        <div style="font-size:.72rem;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">App Description / Purpose</div>
        <div style="font-size:.84rem;color:var(--text);line-height:1.7;white-space:pre-wrap;" id="reapp-desc">I am the owner of TradeOpsVault (etsy.com/shop/TradeOpsVault), a digital download shop selling printable business form templates to trade contractors (HVAC, plumbing, electrical, lawn care, etc.).

I have built a private internal tool — Agent Atlas — to help me manage my own shop. The tool is deployed at https://cleanplatehaulingco.github.io/AGENT-ATLAS/ and is used exclusively by me to:

1. Draft and manage listing copy (titles, descriptions, tags) for my own 20 listings
2. Create and publish listings to my own shop via the Etsy API
3. Track my own shop revenue and order metrics
4. Upload listing images generated by my internal design tool

This is a single-shop, single-owner tool. I am not building a multi-seller platform, reselling API access, or scraping competitor data. All API calls will target only my own shop ID. I estimate fewer than 200 API calls per day total.

The app is live, functional, and already managing my listing pipeline without API access — I am applying for API access to replace the current manual publishing step with an automated one.</div>
        <button onclick="copyText('reapp-desc')" style="margin-top:8px;background:none;border:1px solid var(--border);border-radius:5px;padding:3px 10px;cursor:pointer;font-size:.7rem;color:var(--muted);">Copy</button>
      </div>

      <div style="background:var(--panel2);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:14px 16px;">
        <div style="font-size:.72rem;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Requested Scopes (check only these)</div>
        <div style="font-size:.84rem;color:var(--text);line-height:1.8;" id="reapp-scopes">listings_r — read my own listings
listings_w — create and update my own listings
listings_d — delete draft listings
transactions_r — read my own order/transaction data
shops_r — read my own shop info</div>
        <button onclick="copyText('reapp-scopes')" style="margin-top:8px;background:none;border:1px solid var(--border);border-radius:5px;padding:3px 10px;cursor:pointer;font-size:.7rem;color:var(--muted);">Copy</button>
      </div>

      <div style="background:var(--panel2);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:14px 16px;">
        <div style="font-size:.72rem;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">Website / App URL</div>
        <div style="font-size:.88rem;color:var(--text);font-weight:600;" id="reapp-url">https://cleanplatehaulingco.github.io/AGENT-ATLAS/</div>
        <button onclick="copyText('reapp-url')" style="margin-top:6px;background:none;border:1px solid var(--border);border-radius:5px;padding:3px 10px;cursor:pointer;font-size:.7rem;color:var(--muted);">Copy</button>
      </div>

      <div style="background:rgba(0,200,83,0.06);border:1px solid rgba(0,200,83,0.2);border-radius:8px;padding:14px 16px;">
        <div style="font-size:.78rem;font-weight:800;color:var(--success);margin-bottom:8px;">Why this application should get approved</div>
        <div style="font-size:.78rem;color:var(--muted);line-height:1.7;">
          ✓ Real live shop — TradeOpsVault exists and has listings<br>
          ✓ Real live tool — the app URL is deployed and functional<br>
          ✓ Single-shop use only — not a multi-seller aggregator<br>
          ✓ Minimal scopes — only what's needed, no profile/billing/payment access requested<br>
          ✓ Low volume — internal tool, &lt;200 calls/day<br>
          ✓ Legitimate use case — Etsy explicitly supports "shop management tools for your own shop"
        </div>
      </div>
    </div>
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

  function _prepareLaunch() {
    var sel = document.getElementById('launcher-listing-select');
    var listingId = sel && sel.value;
    if (!listingId) { if (typeof toast === 'function') toast('Pick a listing first', 'warn'); return; }
    var payload = prepareLaunch(listingId);
    var status = document.getElementById('launcher-status');
    if (status) {
      status.innerHTML = '<span style="color:var(--success);font-weight:700;">✓ Ready — ' + listingId + ' loaded</span>'
        + ' · <span style="color:var(--muted);">' + (payload.title||'').substring(0,60) + '…</span>'
        + '<br><span style="color:var(--muted);">Now go to etsy.com/sell/add-listing and click ⚡ Atlas Launch Listing</span>';
    }
    if (typeof toast === 'function') toast('✓ Etsy opening with ' + listingId + ' loaded — click ⚡ Atlas Launch Listing on that page', 'success');
  }

  // ── Init ──────────────────────────────────────────────────────────────────
  function init() {
    // Clean up any old uptime data from previous builds
    try { localStorage.removeItem('atlas_monitor_uptime'); } catch(e) {}
  }

  return {
    init:               init,
    renderView:         renderView,
    getStats:           getStats,
    getOrders:          getOrders,
    bestRevenue:        bestRevenue,
    importCSV:          importCSV,
    bookmarkletCode:    bookmarkletCode,
    // Internal handlers called from inline HTML
    _onCSVDrop:     _onCSVDrop,
    _onCSVFile:     _onCSVFile,
    _clearOrders:   _clearOrders,
    _prepareLaunch: _prepareLaunch,
  };
})();

// images.js — AI Design Team + Mockup Studio for Agent Atlas
// Strategy: Real screenshots for hero/detail/bundle (free, shows actual product)
//           DALL-E 3 HD for lifestyle + before/after only (~$1.60 total vs $8)
// Exposes global: DesignTeam (ImageGen alias preserved for backwards compat)

var DesignTeam = (function() {

  // ── Listing names (used for text overlays on canvas) ────────────────
  var LISTING_NAMES = {
    'LS-001':'HVAC Service Call Notes',     'LS-002':'Plumbing Dispatch Form',
    'LS-003':'Electrician Inspection Form', 'LS-004':'Lawn Care Crew Planner',
    'LS-005':'Auto Detail Intake + Waiver', 'LS-006':'Pest Control Follow-Up',
    'LS-007':'Roofing Change Order',        'LS-008':'Pressure Washing Route Sheet',
    'LS-009':'Appliance Repair Tracker',    'LS-010':'Handyman Reimbursement Sheet',
    'LS-011':'Mobile Mechanic Summary',     'LS-012':'Locksmith Authorization Form',
    'LS-013':'Painting Prep Punch List',    'LS-014':'Snow Removal Checklist',
    'LS-015':'Window Cleaning Client Pack', 'LS-016':'Pool Service Chemical Log',
    'LS-017':'Flooring Estimate Matrix',    'LS-018':'Contractor Daily Site Report',
    'LS-019':'Septic Service Pump Log',     'LS-020':'Service Fee Addendum',
  };

  // ── 10 shot types: research shows full 10-slot listings rank higher ──
  var SHOT_TYPES = [
    // Slots 1–3: Mockup Studio (screenshot → canvas) — FREE
    { id:'hero',          label:'Hero Mockup',          agent:'Mockup Studio', icon:'★', method:'mockup',
      description:'Product name + form on bright desk + 2 badge pills. Top CTR driver.' },
    { id:'flat_preview',  label:'Flat Preview',         agent:'Mockup Studio', icon:'◧', method:'canvas',
      description:'Straight-on bright view of the actual form. Buyers see the real design.' },
    { id:'detail',        label:'Detail + Arrows',      agent:'Mockup Studio', icon:'◉', method:'mockup',
      description:'Zoomed header section with callout arrows to logo zone + fillable fields.' },
    // Slots 4–6: Pure-canvas infographics — FREE, no screenshot needed
    { id:'feature_callout',label:'Feature Callout',     agent:'Canvas Studio', icon:'✦', method:'canvas',
      description:'5 checkmark bullets: Fillable, 3 Pages, Add Logo, Print Ready, No Software.' },
    { id:'whats_included', label:"What's Included",     agent:'Canvas Studio', icon:'◈', method:'canvas',
      description:'All files, format badges (PDF, Browser, Print), page count circle badge.' },
    { id:'bundle',        label:'Bundle / Value Stack', agent:'Mockup Studio', icon:'▦', method:'mockup',
      description:'3 pages fanned + "3-Page System" badge. Justifies the $15 price.' },
    // Slots 7–8: DALL-E HD — ~$0.16 total for these 2 × 20 listings
    { id:'lifestyle',     label:'Lifestyle Shot',       agent:'DALL-E 3 HD',  icon:'◈', method:'dalle',
      description:'Contractor in context using the form. Emotional connection = clicks.' },
    { id:'before_after',  label:'Before / After',       agent:'DALL-E 3 HD',  icon:'⬡', method:'dalle',
      description:'Chaos vs organized. #1 converting shot type on Etsy.' },
    // Slots 9–10: Pure-canvas info slides — FREE
    { id:'how_to_use',    label:'How to Use',           agent:'Canvas Studio', icon:'①', method:'canvas',
      description:'3-step numbered download + edit + print graphic. Kills "how does this work?" objection.' },
    { id:'before_you_buy',label:'Before You Buy',       agent:'Canvas Studio', icon:'⚑', method:'canvas',
      description:'Digital-only notice + compatibility + refund info. Prevents bad reviews.' },
  ];

  // ── Mockup scene definitions ─────────────────────────────────────────
  // Each scene = CSS background for the 1024×1024 canvas compositor
  var MOCKUP_SCENES = [
    { id: 'desk_dark',    label: 'Dark Desk',       bg: 'linear-gradient(145deg,#1a1f2e 0%,#0f1420 100%)',   surface: '#1e2535' },
    { id: 'desk_light',   label: 'Clean Desk',      bg: 'linear-gradient(145deg,#f5f0eb 0%,#e8e0d5 100%)',   surface: '#fff' },
    { id: 'concrete',     label: 'Concrete',         bg: 'linear-gradient(145deg,#3a3a3a 0%,#2a2a2a 100%)',   surface: '#444' },
    { id: 'workshop',     label: 'Workshop',         bg: 'linear-gradient(145deg,#2c2010 0%,#1a1208 100%)',   surface: '#3a2c18' },
    { id: 'outdoor',      label: 'Outdoor / Truck',  bg: 'linear-gradient(145deg,#2d4a1e 0%,#1a2e10 100%)',   surface: '#3a5a28' },
    { id: 'premium',      label: 'Premium Black',    bg: 'radial-gradient(ellipse at 30% 30%,#1a1040 0%,#080810 100%)', surface: '#120c2e' },
  ];

  // ── Top-converter overlay badges (applied on canvas) ─────────────────
  var OVERLAY_BADGES = [
    { id: 'instant',    text: '⚡ Instant Download',     color: '#fbbf24', bg: 'rgba(0,0,0,0.7)' },
    { id: 'fillable',   text: '✏ Fillable in Browser',  color: '#34d399', bg: 'rgba(0,0,0,0.7)' },
    { id: 'pages3',     text: '📄 3-Page System',        color: '#60a5fa', bg: 'rgba(0,0,0,0.7)' },
    { id: 'noapp',      text: '✓ No Software Needed',   color: '#a78bfa', bg: 'rgba(0,0,0,0.7)' },
    { id: 'print',      text: '🖨 Print-Ready PDF',       color: '#f472b6', bg: 'rgba(0,0,0,0.7)' },
    { id: 'logo',       text: '🏷 Add Your Logo',         color: '#fb923c', bg: 'rgba(0,0,0,0.7)' },
  ];

  // ── DALL-E prompts (lifestyle + before/after only) ────────────────────
  // Updated: describe dark navy header + colored accent bar to match real templates
  // "form section headers and field lines visible" — shows structure, no copyright issue
  var SHOT_PROMPTS = {
    'LS-001': {
      lifestyle:   'HVAC technician in navy uniform kneeling beside outdoor AC unit, writing on clipboard with a dark-headered professional service form, golden hour natural light, suburban neighborhood background, photorealistic commercial photography, form section headers and field lines visible but no handwritten content',
      before_after: 'Split image: LEFT half shows messy handwritten sticky notes and crumpled paper on dirty truck dashboard, stressed contractor, dim chaotic lighting, gritty texture. RIGHT half shows same contractor calm and confident, holding a clean professional dark-navy-header HVAC service form on clipboard, warm professional light. Dramatic cinematic split, no readable text in forms',
    },
    'LS-002': {
      lifestyle:   'Plumber in work uniform at kitchen sink reviewing a professional dark-header checklist on clipboard before starting job, natural home interior, candid professional photography, form structure visible but no filled text',
      before_after: 'Split image: LEFT shows crumpled sticky notes and phone texts near a leaky pipe, frustrated plumber. RIGHT shows clean professional plumbing dispatch form on clipboard, organized and calm contractor. Cinematic split lighting, dramatic contrast between chaos and order',
    },
    'LS-003': {
      lifestyle:   'Licensed electrician in safety gear reviewing a dark-header inspection form on clipboard at commercial panel board, industrial professional photography, form section headers visible but no filled content',
      before_after: 'Split image: LEFT shows messy hand-sketched notes at circuit breaker, dangerous informal documentation. RIGHT shows clean professional electrician inspection form on clipboard, safe organized professional. No readable text in forms',
    },
    'LS-004': {
      lifestyle:   'Lawn business owner in polo shirt reviewing weekly crew planner on clipboard beside branded mowing truck at dawn, warm golden light, outdoor professional photography, form route columns visible',
      before_after: 'Split image: LEFT shows chaotic group texts and handwritten route lists on phone and napkins, confused crew standing around. RIGHT shows organized dark-header weekly crew planner on clipboard, confident crew lead, efficient morning. Cinematic split',
    },
    'LS-005': {
      lifestyle:   'Professional mobile detailer in branded polo presenting dark-header intake form on clipboard to luxury car owner in upscale driveway, afternoon natural light, form fields visible',
      before_after: 'Split: LEFT shows customer on phone disputing scratch damage, no paperwork, stress. RIGHT shows signed professional damage waiver on clipboard next to luxury vehicle, protected confident detailer. Cinematic lighting',
    },
    'LS-006': {
      lifestyle:   'Pest control technician in uniform handing professional dark-header follow-up card to homeowner at front door, suburban daylight, form structure visible',
      before_after: 'Split: LEFT shows lost customer, no follow-up, empty appointment book. RIGHT shows professional pest control service card with next visit scheduled, happy retained customer. Clean cinematic split',
    },
    'LS-007': {
      lifestyle:   'Roofing contractor in hard hat showing dark-header change order form on clipboard to homeowner, residential rooftop background, natural daylight, form approval section visible',
      before_after: 'Split: LEFT shows heated verbal argument about scope change on job site, no documentation. RIGHT shows signed change order on clipboard, professional contractor protected and paid. Dramatic cinematic contrast',
    },
    'LS-008': {
      lifestyle:   'Pressure washing operator reviewing route sheet on clipboard beside commercial pressure washer on driveway, bright midday sun, form stop columns visible',
      before_after: 'Split: LEFT shows confused crew members on phones, missed stops, lost revenue. RIGHT shows organized route sheet on clipboard, crew efficiently completing stops. Clean cinematic split',
    },
    'LS-009': {
      lifestyle:   'Appliance repair technician checking dark-header parts tracker on clipboard beside open washing machine, home setting, warm indoor light, form part columns visible',
      before_after: 'Split: LEFT shows lost receipts, wrong parts ordered, money wasted. RIGHT shows organized parts tracker with every item logged, professional controlled workflow. No readable text',
    },
    'LS-010': {
      lifestyle:   'Handyman in work vest presenting materials reimbursement form on clipboard to homeowner at front door, professional photography, form line items visible',
      before_after: 'Split: LEFT shows argument over material costs with no receipts, unpaid contractor. RIGHT shows clean signed reimbursement form, fully documented and paid. Cinematic lighting',
    },
    'LS-011': {
      lifestyle:   'Mobile mechanic in coveralls reviewing dark-header service summary on clipboard at roadside repair, natural outdoor light, form work performed section visible',
      before_after: 'Split: LEFT shows customer disputing repair work, no documentation, stress. RIGHT shows signed service summary with every repair listed, trust and repeat business. Cinematic split',
    },
    'LS-012': {
      lifestyle:   'Locksmith in uniform reviewing dark-header authorization form on clipboard with homeowner at front door, residential natural lighting, form ID section visible',
      before_after: 'Split: LEFT shows police interaction due to no authorization paperwork, stress. RIGHT shows signed authorization form protecting locksmith, professional and legal. Dramatic lighting',
    },
    'LS-013': {
      lifestyle:   'Painting contractor reviewing dark-header punch list on clipboard with homeowner during final walkthrough, freshly painted room, natural window light, checklist sections visible',
      before_after: 'Split: LEFT shows callback dispute for missed touch-ups, angry client, lost money. RIGHT shows completed signed punch list, full payment received, happy client. No readable text',
    },
    'LS-014': {
      lifestyle:   'Snow removal operator reviewing trigger checklist on clipboard beside plow truck, winter morning blue light, professional outdoor photography, form conditions columns visible',
      before_after: 'Split: LEFT shows frantic calls from clients asking if service is happening, confusion. RIGHT shows organized trigger checklist, automatic professional response, calm operator. Cinematic winter contrast',
    },
    'LS-015': {
      lifestyle:   'Window cleaning professional reviewing dark-header client packet on clipboard at commercial building, outdoor professional photography, form schedule section visible',
      before_after: 'Split: LEFT shows missed appointments, confused clients, lost contracts. RIGHT shows organized window cleaning client packet, retained clients and scheduled routes. Clean split',
    },
    'LS-016': {
      lifestyle:   'Pool technician reviewing chemical log on clipboard beside sparkling blue pool, warm summer sunlight, outdoor photography, form chemical columns visible',
      before_after: 'Split: LEFT shows green algae pool from inconsistent chemical tracking, angry homeowner. RIGHT shows crystal clear pool with organized chemical log, happy client, professional service. Vivid colors',
    },
    'LS-017': {
      lifestyle:   'Flooring contractor reviewing dark-header estimate matrix on clipboard with homeowner in kitchen, natural home lighting, candid professional, form room section columns visible',
      before_after: 'Split: LEFT shows estimate dispute, unclear scope, unhappy homeowner. RIGHT shows clean signed scope matrix, deposit paid, confident contractor. Cinematic contrast',
    },
    'LS-018': {
      lifestyle:   'General contractor in hard hat reviewing daily site report on clipboard at construction site, dramatic natural daylight, professional outdoor photography, form crew section visible',
      before_after: 'Split: LEFT shows insurance claim dispute, no site documentation, major loss. RIGHT shows complete daily site report protecting contractor, legal protection and professionalism. Dramatic contrast',
    },
    'LS-019': {
      lifestyle:   'Septic service technician reviewing dark-header pump log on clipboard at residential property, outdoor natural lighting, form date columns visible',
      before_after: 'Split: LEFT shows regulatory violation from poor record keeping, compliance failure. RIGHT shows complete pump log with every service documented, compliant professional. Clean cinematic split',
    },
    'LS-020': {
      lifestyle:   'Service business owner reviewing fee transparency addendum with client across clean desk, modern office, natural window light, form fee schedule sections visible',
      before_after: 'Split: LEFT shows payment dispute, unexpected fees, angry client refusing to pay. RIGHT shows signed fee transparency addendum, no surprises, full payment received. Professional contrast',
    },
  };

  // ── Config ────────────────────────────────────────────────────────────
  var config = {
    apiKey:       '',
    model:        'dall-e-3',
    size:         '1024x1024',
    quality:      'hd',       // upgraded from standard — sharper, worth the $0.04 extra per image
    style:        'natural',
    activeScene:  'desk_light',
    activeBadges: ['instant', 'fillable', 'pages3'],
  };

  // cache: { 'LS-001': { hero:{url,method}, lifestyle:{url}, ... }, ... }
  var cache = {};

  function saveCache() {
    try { localStorage.setItem('atlas_design_cache', JSON.stringify(cache)); } catch(e) {}
  }

  function totalGenerated() {
    var n = 0;
    Object.keys(cache).forEach(function(lid) {
      SHOT_TYPES.forEach(function(st) {
        if (cache[lid] && cache[lid][st.id] && cache[lid][st.id].url) n++;
      });
    });
    return n;
  }

  function totalPossible() {
    return Object.keys(SHOT_PROMPTS).length * SHOT_TYPES.length;
  }

  function getImage(listingId, shotType) {
    shotType = shotType || 'hero';
    if (cache[listingId] && cache[listingId][shotType] && cache[listingId][shotType].url) {
      return cache[listingId][shotType].url;
    }
    return placeholder(listingId, shotType);
  }

  function placeholder(listingId, shotType) {
    var st = SHOT_TYPES.find(function(s){return s.id===shotType;}) || {};
    var isMockup = st.method === 'mockup';
    var label = (st.label || shotType).toUpperCase();
    var svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">',
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a1f2e"/><stop offset="100%" stop-color="#0f1420"/></linearGradient></defs>',
      '<rect width="400" height="400" fill="url(#g)"/>',
      isMockup
        ? '<rect x="100" y="80" width="200" height="240" rx="4" fill="none" stroke="#4f7cff" stroke-width="1.5" opacity="0.4"/><rect x="100" y="80" width="200" height="28" rx="4" fill="#4f7cff" opacity="0.2"/><text x="200" y="100" font-family="monospace" font-size="9" fill="#7a90b5" text-anchor="middle">UPLOAD SCREENSHOT</text><text x="200" y="260" font-family="monospace" font-size="10" fill="#4f7cff" text-anchor="middle">↑ click to add</text>'
        : '<polygon points="200,150 230,165 230,195 200,210 170,195 170,165" fill="none" stroke="#4f7cff" stroke-width="1.5" opacity="0.4"/>',
      '<text x="200" y="300" font-family="monospace" font-size="11" fill="#7a90b5" text-anchor="middle">' + (listingId||'') + '</text>',
      '<text x="200" y="318" font-family="monospace" font-size="10" fill="#4a5568" text-anchor="middle">' + label + '</text>',
      '</svg>',
    ].join('');
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  // ── Pure-canvas infographic generator (no screenshot needed) ─────────
  // Generates feature_callout / whats_included / how_to_use / before_you_buy / flat_preview
  function generateInfoSlide(listingId, shotType, accentColor) {
    return new Promise(function(resolve) {
      var SIZE = 1024;
      var accent = accentColor || '#4f7cff';
      var name = LISTING_NAMES[listingId] || listingId;
      var canvas = document.createElement('canvas');
      canvas.width = SIZE; canvas.height = SIZE;
      var ctx = canvas.getContext('2d');

      function roundRect(x,y,w,h,r,fill,stroke){
        ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
        ctx.quadraticCurveTo(x+w,y,x+w,y+r); ctx.lineTo(x+w,y+h-r);
        ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
        ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r);
        ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
        if(fill){ctx.fillStyle=fill;ctx.fill();}
        if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}
      }

      function drawBase(bgLight){
        if(bgLight){
          // Bright clean background (research: bright wins in Etsy grid)
          var bg = ctx.createLinearGradient(0,0,0,SIZE);
          bg.addColorStop(0,'#f8f9ff'); bg.addColorStop(1,'#eef0f8');
          ctx.fillStyle=bg; ctx.fillRect(0,0,SIZE,SIZE);
          // Subtle dot grid
          ctx.fillStyle='rgba(0,0,60,0.04)';
          for(var gx=20;gx<SIZE;gx+=36) for(var gy=20;gy<SIZE;gy+=36){
            ctx.beginPath(); ctx.arc(gx,gy,1.5,0,Math.PI*2); ctx.fill();
          }
        } else {
          var dbg = ctx.createLinearGradient(0,0,SIZE,SIZE);
          dbg.addColorStop(0,'#0f1628'); dbg.addColorStop(1,'#1a2744');
          ctx.fillStyle=dbg; ctx.fillRect(0,0,SIZE,SIZE);
        }
        // Accent strip at top
        ctx.fillStyle=accent; ctx.fillRect(0,0,SIZE,6);
      }

      function pill(text, x, y, color, bg){
        ctx.font='bold 14px Inter,Arial,sans-serif';
        var tw = ctx.measureText(text).width;
        roundRect(x,y,tw+24,30,15,bg||'rgba(0,0,0,0.08)');
        ctx.fillStyle=color; ctx.fillText(text, x+12, y+21);
      }

      function badge(text, cx, cy, color){
        ctx.font='bold 20px Inter,Arial,sans-serif';
        var tw=ctx.measureText(text).width;
        var bw=Math.max(tw+32,90), bh=44;
        roundRect(cx-bw/2,cy-bh/2,bw,bh,22,color);
        ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.fillText(text,cx,cy+7); ctx.textAlign='left';
      }

      function headerBar(title){
        roundRect(0,0,SIZE,80,0,'#0f1628');
        ctx.fillStyle=accent; ctx.fillRect(0,76,SIZE,4);
        ctx.font='bold 22px Inter,Arial,sans-serif';
        ctx.fillStyle='#fff'; ctx.fillText('TradeOpsVault', 28, 50);
        ctx.font='15px Inter,Arial,sans-serif'; ctx.fillStyle='rgba(255,255,255,0.55)';
        ctx.fillText(title, SIZE-ctx.measureText(title).width-28, 50);
      }

      if(shotType==='feature_callout'){
        drawBase(true);
        headerBar('Feature Overview');
        // Large headline
        ctx.font='bold 38px Inter,Arial,sans-serif'; ctx.fillStyle='#0f1628';
        var hlines = name.length>22 ? [name.substring(0,name.lastIndexOf(' ',22)), name.substring(name.lastIndexOf(' ',22)+1)] : [name];
        hlines.forEach(function(l,i){ ctx.fillText(l, 60, 148+i*46); });
        ctx.font='18px Inter,Arial,sans-serif'; ctx.fillStyle='#667';
        ctx.fillText('Professional Trade Business Template', 60, 148+hlines.length*46+10);

        // 5 feature bullets with icons — research-backed callouts
        var bullets = [
          {icon:'✏', text:'Fillable directly in your browser — no software needed'},
          {icon:'📄', text:'3-page system: Cover + Main Form + Job History Log'},
          {icon:'🏷', text:'Add your company logo with one click'},
          {icon:'🖨', text:'Print-ready PDF quality — crisp on any printer'},
          {icon:'✓', text:'Clear Form button — reuse endlessly for every job'},
        ];
        var by = 310;
        bullets.forEach(function(b){
          roundRect(52, by-4, SIZE-104, 54, 10, 'rgba(255,255,255,0.9)', accent+'33');
          ctx.font='bold 26px Inter,Arial,sans-serif'; ctx.fillStyle=accent;
          ctx.fillText(b.icon, 78, by+34);
          ctx.font='500 17px Inter,Arial,sans-serif'; ctx.fillStyle='#1a1a2e';
          ctx.fillText(b.text, 120, by+34);
          by += 70;
        });
        // Bottom badge row
        pill('⚡ Instant Download', 52, SIZE-72, accent, accent+'22');
        pill('✓ Editable', 280, SIZE-72, '#16a34a', '#16a34a22');
        pill('📄 3 Pages', 390, SIZE-72, '#2563eb', '#2563eb22');
        pill('🖨 Print Ready', 490, SIZE-72, '#7c3aed', '#7c3aed22');

      } else if(shotType==='whats_included'){
        drawBase(true);
        headerBar("What's Included");
        ctx.font='bold 36px Inter,Arial,sans-serif'; ctx.fillStyle='#0f1628';
        ctx.fillText("Everything You Get:", 60, 148);
        // Page list
        var pages = ['Page 1 — Cover Page + Quick-Start Instructions','Page 2 — Main ' + name + ' Form','Page 3 — Job History Log (10-row tracker)'];
        pages.forEach(function(p,i){
          roundRect(52, 178+i*72, SIZE-104, 60, 8, i===1?accent+'18':'#fff', accent+'44');
          ctx.font='bold 18px Inter,Arial,sans-serif'; ctx.fillStyle=accent;
          ctx.fillText('0'+(i+1), 76, 178+i*72+38);
          ctx.font='500 16px Inter,Arial,sans-serif'; ctx.fillStyle='#1a1a2e';
          ctx.fillText(p, 112, 178+i*72+38);
        });
        // Format compatibility row (research: "works with" removes #1 objection)
        ctx.font='bold 16px Inter,Arial,sans-serif'; ctx.fillStyle='#667';
        ctx.fillText('WORKS IN YOUR BROWSER — COMPATIBLE WITH:', 52, 420);
        var formats = ['Chrome','Safari','Firefox','Edge','Any Printer'];
        formats.forEach(function(f,i){
          roundRect(52+i*186, 436, 176, 50, 8, '#fff', accent+'55');
          ctx.font='bold 15px Inter,Arial,sans-serif'; ctx.fillStyle=accent;
          ctx.textAlign='center'; ctx.fillText(f, 52+i*186+88, 467); ctx.textAlign='left';
        });
        // Big value badge
        badge('3-Page System', SIZE/2, 560, accent);
        badge('$14.99', SIZE/2, 618, '#0f1628');
        // Digital notice
        roundRect(52, 670, SIZE-104, 68, 10, '#fff8e7','#f59e0b');
        ctx.font='bold 14px Inter,Arial,sans-serif'; ctx.fillStyle='#92400e';
        ctx.fillText('⬇ DIGITAL DOWNLOAD — Nothing will be shipped', 76, 698);
        ctx.font='13px Inter,Arial,sans-serif'; ctx.fillStyle='#78350f';
        ctx.fillText('Instant access via Etsy downloads after purchase. Download on desktop for best results.', 76, 720);
        // Bottom brand
        ctx.font='bold 15px Inter,Arial,sans-serif'; ctx.fillStyle='#0f1628';
        ctx.fillText('TradeOpsVault  ·  tradeopsvault.etsy.com', 52, SIZE-28);
        ctx.font='13px Inter,Arial,sans-serif'; ctx.fillStyle='#999';
        ctx.fillText('Professional templates for trade contractors', SIZE-340, SIZE-28);

      } else if(shotType==='how_to_use'){
        drawBase(false);
        ctx.font='bold 34px Inter,Arial,sans-serif'; ctx.fillStyle='#fff';
        ctx.fillText('How to Use Your Template', 60, 120);
        ctx.font='16px Inter,Arial,sans-serif'; ctx.fillStyle='rgba(255,255,255,0.6)';
        ctx.fillText('3 steps — takes about 60 seconds', 60, 152);
        // 3 steps
        var steps = [
          {n:'1', title:'Purchase & Download', desc:'Click "Add to cart" → Complete checkout → Etsy sends download link instantly. Open on desktop (Chrome or Safari) for best results.', icon:'⬇'},
          {n:'2', title:'Open & Fill In',      desc:'Click the HTML file → it opens in your browser. Click the logo zone to upload your logo. Click any field to type your info.', icon:'✏'},
          {n:'3', title:'Print or Save PDF',   desc:'Click the "Print / Save PDF" button at the top. Choose your printer OR select "Save as PDF" to get a digital copy.', icon:'🖨'},
        ];
        steps.forEach(function(s,i){
          var sy = 200+i*242;
          roundRect(52, sy, SIZE-104, 216, 12, 'rgba(255,255,255,0.07)', accent+'66');
          // Number circle
          ctx.beginPath(); ctx.arc(110, sy+62, 38, 0, Math.PI*2);
          ctx.fillStyle=accent; ctx.fill();
          ctx.font='bold 32px Inter,Arial,sans-serif'; ctx.fillStyle='#fff';
          ctx.textAlign='center'; ctx.fillText(s.n, 110, sy+74); ctx.textAlign='left';
          // Icon + title
          ctx.font='bold 22px Inter,Arial,sans-serif'; ctx.fillStyle='#fff';
          ctx.fillText(s.icon+'  '+s.title, 165, sy+56);
          // Description — word wrap
          ctx.font='15px Inter,Arial,sans-serif'; ctx.fillStyle='rgba(255,255,255,0.7)';
          var words=s.desc.split(' '), line='', ly=sy+90, maxW=SIZE-230;
          words.forEach(function(w){
            var test=line+w+' ';
            if(ctx.measureText(test).width>maxW&&line){ctx.fillText(line,165,ly);ly+=22;line=w+' ';}
            else line=test;
          });
          if(line)ctx.fillText(line,165,ly);
        });
        // Tip
        roundRect(52, SIZE-90, SIZE-104, 60, 8, accent+'33');
        ctx.font='bold 14px Inter,Arial,sans-serif'; ctx.fillStyle=accent;
        ctx.fillText('💡 Tip: Use "Clear Form" to reset all fields and reuse for every new job — unlimited reprints included!', 72, SIZE-55);

      } else if(shotType==='before_you_buy'){
        drawBase(true);
        headerBar('Before You Buy');
        ctx.font='bold 34px Inter,Arial,sans-serif'; ctx.fillStyle='#0f1628';
        ctx.fillText('Good to Know', 60, 148);
        var faqs = [
          {q:'What do I actually receive?', a:'An HTML file that opens in any browser. Fill it in, then print or save as PDF.'},
          {q:'Do I need Canva, Word, or Adobe?', a:'No. Everything works in Chrome, Safari, Firefox, or Edge — completely free.'},
          {q:'Can I use this for my real business?', a:'Yes. Personal + commercial use license included. Use it for every job.'},
          {q:'What if I need help?', a:'Message us on Etsy — we respond within 24 hours and will help you get it working.'},
          {q:'Is anything shipped?', a:'No — this is a digital download. Etsy delivers the file instantly after purchase.'},
        ];
        var fy=184;
        faqs.forEach(function(f){
          roundRect(52, fy, SIZE-104, 88, 8, '#fff', '#e2e8f0');
          ctx.font='bold 15px Inter,Arial,sans-serif'; ctx.fillStyle=accent;
          ctx.fillText('Q: '+f.q, 72, fy+28);
          ctx.font='14px Inter,Arial,sans-serif'; ctx.fillStyle='#334155';
          ctx.fillText('A: '+f.a, 72, fy+54);
          fy+=100;
        });
        // Stars + shop name
        ctx.font='bold 22px Inter,Arial,sans-serif'; ctx.fillStyle='#f59e0b';
        ctx.fillText('★★★★★', 60, SIZE-52);
        ctx.font='bold 16px Inter,Arial,sans-serif'; ctx.fillStyle='#0f1628';
        ctx.fillText('TradeOpsVault  ·  Professional Templates for Trade Contractors', 180, SIZE-52);

      } else if(shotType==='flat_preview'){
        // Bright straight-on preview — high brightness wins in Etsy grid per research
        var fbg = ctx.createLinearGradient(0,0,0,SIZE);
        fbg.addColorStop(0,'#f0f4ff'); fbg.addColorStop(1,'#e8edf8');
        ctx.fillStyle=fbg; ctx.fillRect(0,0,SIZE,SIZE);
        // Shadow behind page
        ctx.shadowColor='rgba(0,0,80,0.18)'; ctx.shadowBlur=48; ctx.shadowOffsetX=0; ctx.shadowOffsetY=16;
        roundRect(80, 48, SIZE-160, SIZE-96, 6, '#fff');
        ctx.shadowColor='transparent';
        // Dark header
        roundRect(80, 48, SIZE-160, 68, 6, '#0f1628');
        // Accent bar
        ctx.fillStyle=accent; ctx.fillRect(80, 116, SIZE-160, 7);
        // Product name in header
        ctx.font='bold 18px Inter,Arial,sans-serif'; ctx.fillStyle='#fff';
        ctx.fillText(name.toUpperCase(), 108, 90);
        ctx.font='12px Inter,Arial,sans-serif'; ctx.fillStyle='rgba(255,255,255,0.5)';
        ctx.fillText('TradeOpsVault Premium Series  ·  3-Page System', 108, 110);
        // Mock form content lines
        ctx.fillStyle='#f7f8fc';
        ctx.fillRect(80, 123, SIZE-160, 36); // info strip bg
        ctx.fillStyle='#e2e8f0';
        [[108,145,180,10],[320,145,180,10],[532,145,180,10],[744,145,140,10]].forEach(function(r){ ctx.fillRect(r[0],r[1],r[2],r[3]); });
        // Section blocks
        var sects=[['01  CUSTOMER & JOB INFORMATION',168],['02  WORK PERFORMED',340],['03  PARTS & INVOICE',512],['04  SIGN-OFF & CHECKLIST',680]];
        sects.forEach(function(s){
          ctx.fillStyle='#1a2744'; ctx.fillRect(80, s[1], SIZE-160, 32);
          ctx.font='bold 11px Inter,Arial,sans-serif'; ctx.fillStyle='#fff';
          ctx.fillText(s[0], 108, s[1]+21);
          // Field lines
          ctx.fillStyle='#f0f4ff';
          ctx.fillRect(80, s[1]+32, SIZE-160, s===sects[sects.length-1]?104:136);
          ctx.fillStyle='#e2e8f0';
          for(var fl=0;fl<3;fl++){
            ctx.fillRect(104, s[1]+52+fl*32, (SIZE-220)/2-8, 12);
            ctx.fillRect(104+(SIZE-220)/2+8, s[1]+52+fl*32, (SIZE-220)/2-8, 12);
          }
        });
        // Top-left badge: "Actual Template Preview"
        roundRect(90, 58, 220, 26, 13, accent);
        ctx.font='bold 11px Inter,Arial,sans-serif'; ctx.fillStyle='#fff'; ctx.textAlign='center';
        ctx.fillText('ACTUAL TEMPLATE PREVIEW', 200, 76); ctx.textAlign='left';
      }

      resolve(canvas.toDataURL('image/png'));
    });
  }

  // ── Mockup Studio — Canvas Compositor ────────────────────────────────
  // Takes a screenshot (data URL) + scene + badges → composites to 1024×1024 canvas → returns data URL

  function compositeImage(screenshotDataUrl, listingId, shotType, sceneId, badgeIds, accentColor) {
    return new Promise(function(resolve) {
      var SIZE = 1024;
      var scene = MOCKUP_SCENES.find(function(s){return s.id===sceneId;}) || MOCKUP_SCENES[0];
      var badges = (badgeIds||[]).map(function(bid){return OVERLAY_BADGES.find(function(b){return b.id===bid;});}).filter(Boolean);
      accentColor = accentColor || '#4f7cff';

      var canvas = document.createElement('canvas');
      canvas.width = SIZE;
      canvas.height = SIZE;
      var ctx = canvas.getContext('2d');

      // 1. Background
      var bgGrad;
      if (scene.bg.indexOf('radial') === 0) {
        bgGrad = ctx.createRadialGradient(SIZE*0.3, SIZE*0.3, 0, SIZE*0.5, SIZE*0.5, SIZE*0.8);
        bgGrad.addColorStop(0, '#1a1040');
        bgGrad.addColorStop(1, '#080810');
      } else {
        bgGrad = ctx.createLinearGradient(0, 0, SIZE, SIZE);
        if (scene.id === 'desk_light') { bgGrad.addColorStop(0,'#f5f0eb'); bgGrad.addColorStop(1,'#e8e0d5'); }
        else if (scene.id === 'concrete') { bgGrad.addColorStop(0,'#3a3a3a'); bgGrad.addColorStop(1,'#2a2a2a'); }
        else if (scene.id === 'workshop') { bgGrad.addColorStop(0,'#2c2010'); bgGrad.addColorStop(1,'#1a1208'); }
        else if (scene.id === 'outdoor') { bgGrad.addColorStop(0,'#2d4a1e'); bgGrad.addColorStop(1,'#1a2e10'); }
        else { bgGrad.addColorStop(0,'#1a1f2e'); bgGrad.addColorStop(1,'#0f1420'); }
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, SIZE, SIZE);

      // 2. Subtle grid texture
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      for (var x = 0; x < SIZE; x += 40) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,SIZE); ctx.stroke(); }
      for (var y = 0; y < SIZE; y += 40) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(SIZE,y); ctx.stroke(); }

      // 3. Accent glow
      var glow = ctx.createRadialGradient(SIZE*0.5, SIZE*0.4, 0, SIZE*0.5, SIZE*0.4, SIZE*0.45);
      glow.addColorStop(0, accentColor + '18');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, SIZE, SIZE);

      function drawPage(imgEl, x, y, w, h, angle, shadowAlpha) {
        ctx.save();
        ctx.translate(x + w/2, y + h/2);
        ctx.rotate(angle);
        // Drop shadow
        ctx.shadowColor = 'rgba(0,0,0,' + (shadowAlpha||0.5) + ')';
        ctx.shadowBlur = 32;
        ctx.shadowOffsetX = 8;
        ctx.shadowOffsetY = 12;
        // White page background
        ctx.fillStyle = '#fff';
        ctx.fillRect(-w/2, -h/2, w, h);
        ctx.shadowColor = 'transparent';
        // Dark navy header strip
        ctx.fillStyle = '#0f1628';
        ctx.fillRect(-w/2, -h/2, w, h * 0.09);
        // Accent bar
        ctx.fillStyle = accentColor;
        ctx.fillRect(-w/2, -h/2 + h*0.09, w, h * 0.008);
        // Template screenshot content
        if (imgEl) {
          ctx.drawImage(imgEl, -w/2 + 2, -h/2 + h*0.098, w - 4, h * 0.902 - 2);
        } else {
          // Placeholder lines
          ctx.fillStyle = '#f0f4ff';
          for (var li = 0; li < 8; li++) {
            ctx.fillRect(-w/2 + w*0.06, -h/2 + h*(0.14 + li*0.1), w*0.88, h*0.05);
          }
        }
        ctx.restore();
      }

      function drawContent(screenshotImg) {
        if (shotType === 'bundle') {
          // Fan of 3 pages
          var pw = SIZE * 0.52, ph = pw * 1.294;
          drawPage(screenshotImg, SIZE*0.08, SIZE*0.12, pw, ph, -0.08, 0.3);
          drawPage(screenshotImg, SIZE*0.22, SIZE*0.08, pw, ph,  0.04, 0.35);
          drawPage(screenshotImg, SIZE*0.30, SIZE*0.06, pw, ph,  0.0,  0.5);
        } else if (shotType === 'detail') {
          // Zoomed crop of form — show top 40% only (header + first section)
          var dw = SIZE * 0.88, dh = dw * 0.55;
          var dx = (SIZE - dw) / 2, dy = SIZE * 0.18;
          ctx.save();
          ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 40; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 16;
          ctx.fillStyle = '#fff';
          ctx.fillRect(dx, dy, dw, dh);
          ctx.shadowColor = 'transparent';
          ctx.fillStyle = '#0f1628';
          ctx.fillRect(dx, dy, dw, dh * 0.15);
          ctx.fillStyle = accentColor;
          ctx.fillRect(dx, dy + dh*0.15, dw, dh * 0.013);
          if (screenshotImg) {
            // Draw top portion of screenshot
            var srcH = screenshotImg.naturalHeight * 0.40;
            ctx.drawImage(screenshotImg, 0, 0, screenshotImg.naturalWidth, srcH, dx+2, dy+dh*0.163, dw-4, dh*0.837-2);
          } else {
            ctx.fillStyle = '#f0f4ff';
            for (var i=0;i<4;i++) ctx.fillRect(dx+dw*0.05, dy+dh*(0.2+i*0.17), dw*0.9, dh*0.09);
          }
          ctx.restore();
        } else {
          // Hero: single centered page, slight tilt
          var hw = SIZE * 0.68, hh = hw * 1.294;
          var hx = (SIZE - hw) / 2, hy = (SIZE - hh) / 2 - SIZE * 0.02;
          drawPage(screenshotImg, hx, hy, hw, hh, 0.015, 0.55);
        }

        // 4. Overlay badges (top converter tactic)
        if (badges.length > 0 && shotType !== 'detail') {
          var badgeX = 28, badgeY = 28;
          var badgeH = 32, badgePad = 10;
          ctx.font = 'bold 13px Inter, Arial, sans-serif';
          badges.forEach(function(b, i) {
            var tw = ctx.measureText(b.text).width;
            var bw = tw + badgePad * 2;
            // Pill background
            ctx.fillStyle = 'rgba(0,0,0,0.72)';
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY + i*(badgeH+6), bw, badgeH, badgeH/2);
            ctx.fill();
            // Accent line on left
            ctx.fillStyle = b.color;
            ctx.fillRect(badgeX, badgeY + i*(badgeH+6) + 8, 3, badgeH-16);
            // Text
            ctx.fillStyle = b.color;
            ctx.fillText(b.text, badgeX + badgePad, badgeY + i*(badgeH+6) + badgeH/2 + 5);
          });
        }

        // 5. Bottom brand strip (top converter: shows shop name + value prop)
        if (shotType === 'hero' || shotType === 'bundle') {
          var stripH = 56;
          var stripGrad = ctx.createLinearGradient(0, SIZE-stripH, SIZE, SIZE);
          stripGrad.addColorStop(0, 'rgba(0,0,0,0.85)');
          stripGrad.addColorStop(1, 'rgba(0,0,0,0.6)');
          ctx.fillStyle = stripGrad;
          ctx.fillRect(0, SIZE-stripH, SIZE, stripH);
          // Accent line at top of strip
          ctx.fillStyle = accentColor;
          ctx.fillRect(0, SIZE-stripH, SIZE, 2);
          var productName = LISTING_NAMES[listingId] || listingId;
          ctx.font = 'bold 15px Inter, Arial, sans-serif';
          ctx.fillStyle = '#fff';
          ctx.fillText(productName, 24, SIZE-stripH+22);
          ctx.font = '12px Inter, Arial, sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.fillText('TradeOpsVault  ·  Instant Download  ·  Fillable in Browser', 24, SIZE-stripH+40);
        }

        resolve(canvas.toDataURL('image/png'));
      }

      if (screenshotDataUrl && screenshotDataUrl.length > 100) {
        var img = new Image();
        img.onload = function() { drawContent(img); };
        img.onerror = function() { drawContent(null); };
        img.src = screenshotDataUrl;
      } else {
        drawContent(null);
      }
    });
  }

  // Save a mockup into cache
  function saveMockup(listingId, shotType, dataUrl) {
    if (!cache[listingId]) cache[listingId] = {};
    cache[listingId][shotType] = { url: dataUrl, method: 'mockup', generatedAt: Date.now() };
    saveCache();
  }

  // Save an uploaded screenshot (raw, before compositing)
  function saveScreenshot(listingId, dataUrl) {
    if (!cache[listingId]) cache[listingId] = {};
    cache[listingId]._screenshot = dataUrl;
    saveCache();
  }

  function getScreenshot(listingId) {
    return cache[listingId] && cache[listingId]._screenshot;
  }

  // ── DALL-E generation (lifestyle + before/after only) ──────────────────
  function generateShot(listingId, shotType) {
    if (!config.apiKey) return Promise.resolve({ error: 'no_key' });
    var prompts = SHOT_PROMPTS[listingId];
    if (!prompts) return Promise.resolve({ error: 'no_prompts_for_listing' });
    var prompt = prompts[shotType];
    if (!prompt) return Promise.resolve({ error: 'no_prompt_for_shot_type' });

    return fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config.apiKey },
      body: JSON.stringify({
        model:   config.model,
        prompt:  prompt,
        n:       1,
        size:    config.size,
        quality: config.quality,  // 'hd' — sharper detail worth the $0.04 premium
        style:   config.style,
      }),
    })
    .then(function(res) {
      return res.json().then(function(data) {
        if (!res.ok) return { error: (data.error && data.error.message) || ('HTTP ' + res.status) };
        var url = data.data && data.data[0] && data.data[0].url;
        if (!url) return { error: 'no_url' };
        if (!cache[listingId]) cache[listingId] = {};
        cache[listingId][shotType] = { url: url, method: 'dalle', generatedAt: Date.now() };
        saveCache();
        return { url: url, listingId: listingId, shotType: shotType };
      });
    })
    .catch(function(err) { return { error: err.message || 'fetch_failed' }; });
  }

  function generateFullSet(listingId, onProgress) {
    var dalleShots = SHOT_TYPES.filter(function(s){return s.method==='dalle';});
    var results = [];
    function next(i) {
      if (i >= dalleShots.length) return Promise.resolve(results);
      var st = dalleShots[i];
      if (cache[listingId] && cache[listingId][st.id] && cache[listingId][st.id].url) {
        results.push({ cached: true, shotType: st.id });
        if (typeof onProgress === 'function') onProgress(listingId, st.id, i, dalleShots.length);
        return next(i + 1);
      }
      return generateShot(listingId, st.id).then(function(r) {
        results.push(r);
        if (typeof onProgress === 'function') onProgress(listingId, st.id, i, dalleShots.length);
        return new Promise(function(resolve) { setTimeout(function() { resolve(next(i+1)); }, 600); });
      });
    }
    return next(0);
  }

  function generateAll(onProgress) {
    var listingIds = Object.keys(SHOT_PROMPTS);
    function nextListing(li) {
      if (li >= listingIds.length) return Promise.resolve();
      return generateFullSet(listingIds[li], function(lid, shotType, si, st) {
        if (typeof onProgress === 'function') onProgress(lid, shotType, li, listingIds.length, si, st);
      }).then(function() {
        return new Promise(function(resolve) { setTimeout(function() { resolve(nextListing(li+1)); }, 800); });
      });
    }
    return nextListing(0);
  }

  // ── Mockup Studio UI HTML ─────────────────────────────────────────────
  function mockupStudioHTML(listingId) {
    var screenshot = getScreenshot(listingId);
    var accentColors = {
      'LS-001':'#e85d04','LS-002':'#1565c0','LS-003':'#f9a825','LS-004':'#2e7d32',
      'LS-005':'#c62828','LS-006':'#558b2f','LS-007':'#bf360c','LS-008':'#0277bd',
      'LS-009':'#00838f','LS-010':'#6d4c41','LS-011':'#e65100','LS-012':'#f57f17',
      'LS-013':'#d32f2f','LS-014':'#01579b','LS-015':'#0097a7','LS-016':'#00897b',
      'LS-017':'#f57c00','LS-018':'#283593','LS-019':'#00695c','LS-020':'#455a64',
    };
    var accent = accentColors[listingId] || '#4f7cff';

    var sceneButtons = MOCKUP_SCENES.map(function(s) {
      return '<button onclick="DesignTeam._setScene(\'' + s.id + '\',\'' + listingId + '\')" '
        + 'id="scene-btn-' + s.id + '" '
        + 'style="padding:5px 10px;border-radius:5px;font-size:.75rem;font-weight:600;cursor:pointer;border:1px solid var(--border);background:' + (config.activeScene===s.id?'var(--accent)':'var(--panel2)') + ';color:' + (config.activeScene===s.id?'#000':'var(--text)') + ';">'
        + s.label + '</button>';
    }).join('');

    var badgeButtons = OVERLAY_BADGES.map(function(b) {
      var active = config.activeBadges.indexOf(b.id) !== -1;
      return '<button onclick="DesignTeam._toggleBadge(\'' + b.id + '\',\'' + listingId + '\')" '
        + 'id="badge-btn-' + b.id + '" '
        + 'style="padding:4px 10px;border-radius:5px;font-size:.72rem;font-weight:600;cursor:pointer;border:1px solid var(--border);background:' + (active?b.bg:'var(--panel2)') + ';color:' + (active?b.color:'var(--muted)') + ';">'
        + b.text + '</button>';
    }).join('');

    return '<div style="display:flex;flex-direction:column;gap:16px;">'

      // Step 1 — Screenshot instructions
      + '<div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:16px;">'
      + '<div style="font-size:.82rem;font-weight:800;color:var(--text);margin-bottom:8px;display:flex;align-items:center;gap:8px;">'
      + '<span style="background:var(--accent);color:#000;border-radius:50%;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:900;">1</span>'
      + ' Open Template &amp; Take Screenshot</div>'
      + '<div style="font-size:.78rem;color:var(--muted);margin-bottom:10px;">Open the template in a new tab → screenshot the page → upload below. This becomes your hero/detail/bundle image — shows buyers the <em>real product</em>.</div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap;">'
      + '<button onclick="openTemplate(\'' + listingId + '\')" style="background:var(--accent);color:#000;border:none;border-radius:7px;padding:8px 14px;cursor:pointer;font-size:.8rem;font-weight:700;">Open Template →</button>'
      + '<label style="background:var(--surface-raised);color:var(--text);border:1px solid var(--border);border-radius:7px;padding:8px 14px;cursor:pointer;font-size:.8rem;font-weight:600;">'
      + (screenshot ? '✓ Screenshot uploaded — replace?' : '↑ Upload Screenshot')
      + '<input type="file" accept="image/*" style="display:none" onchange="DesignTeam._uploadScreenshot(\'' + listingId + '\',this)">'
      + '</label>'
      + (screenshot ? '<span style="font-size:.75rem;color:var(--success);align-self:center;">✓ Ready</span>' : '')
      + '</div>'
      + '</div>'

      // Step 2 — Scene + badge picker + preview
      + '<div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:16px;">'
      + '<div style="font-size:.82rem;font-weight:800;color:var(--text);margin-bottom:10px;display:flex;align-items:center;gap:8px;">'
      + '<span style="background:var(--accent);color:#000;border-radius:50%;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:900;">2</span>'
      + ' Choose Scene &amp; Badges</div>'
      + '<div style="font-size:.74rem;font-weight:700;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em;">Background Scene</div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">' + sceneButtons + '</div>'
      + '<div style="font-size:.74rem;font-weight:700;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em;">Callout Badges (top converters use these)</div>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap;">' + badgeButtons + '</div>'
      + '</div>'

      // Step 3 — Generate all shots
      + '<div style="background:linear-gradient(135deg,#0d1f12 0%,#0a1a0d 100%);border:1.5px solid #1a4d24;border-radius:12px;padding:20px;position:relative;overflow:hidden;">'
      + '<div style="position:absolute;top:0;right:0;width:180px;height:180px;background:radial-gradient(circle,' + accent + '22 0%,transparent 70%);pointer-events:none;"></div>'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">'
      + '<span style="background:' + accent + ';color:#000;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:900;flex-shrink:0;">3</span>'
      + '<span style="font-size:.85rem;font-weight:800;color:#e8f5e9;">Generate Your Etsy Image Set</span>'
      + '</div>'
      + '<div style="display:flex;gap:16px;margin-bottom:14px;flex-wrap:wrap;">'
      + '<div style="font-size:.72rem;color:#81c784;display:flex;align-items:center;gap:4px;"><span style="background:#1b5e20;border-radius:4px;padding:1px 6px;font-weight:700;">8 FREE</span> Mockup + Infographic slides</div>'
      + '<div style="font-size:.72rem;color:#ffb74d;display:flex;align-items:center;gap:4px;"><span style="background:#4e2000;border-radius:4px;padding:1px 6px;font-weight:700;">2 DALL-E</span> Lifestyle + Before/After</div>'
      + '<div style="font-size:.72rem;color:#90caf9;display:flex;align-items:center;gap:4px;font-weight:600;">= Etsy max 10 images ✓</div>'
      + '</div>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">'
      + '<button id="gen-btn-' + listingId + '" onclick="(function(btn,lid,acc){'
      +   'btn.disabled=true;'
      +   'btn.innerHTML=\'<span style=\\\"display:inline-block;animation:spin 0.9s linear infinite;\\\">⟳</span> Generating…\';'
      +   'if(!document.getElementById(\\\"spin-style\\\")){'
      +     'var s=document.createElement(\\\"style\\\");s.id=\\\"spin-style\\\";'
      +     's.textContent=\\\"@keyframes spin{to{transform:rotate(360deg)}}\\\";'
      +     'document.head.appendChild(s);}'
      +   'DesignTeam._generateMockups(lid,acc);'
      +   'setTimeout(function(){'
      +     'btn.disabled=false;'
      +     'btn.innerHTML=\'✓ Regenerate Free Images\';'
      +     'btn.style.background=\\\"#1b5e20\\\";'
      +   '},9000);'
      + '})(document.getElementById(\'gen-btn-' + listingId + '\'),\'' + listingId + '\',\'' + accent + '\')" '
      + 'style="background:' + accent + ';color:#000;border:none;border-radius:9px;padding:11px 24px;cursor:pointer;font-size:.88rem;font-weight:800;letter-spacing:.01em;box-shadow:0 4px 18px ' + accent + '55;transition:transform .12s,box-shadow .12s;" '
      + 'onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 6px 24px ' + accent + '88\';" '
      + 'onmouseout="this.style.transform=\'\';this.style.boxShadow=\'0 4px 18px ' + accent + '55\';">'
      + '🚀 Generate All 8 Free Images'
      + '</button>'
      + (config.apiKey
          ? '<button onclick="DesignTeam.generateFullSet(\'' + listingId + '\',function(l,s){toast(s+\' generated\',\'success\');}).then(function(){if(typeof renderDesignView===\'function\')renderDesignView();toast(\'DALL-E shots done!\',\'success\');})" '
            + 'style="background:rgba(255,183,77,0.12);color:#ffb74d;border:1.5px solid #ffb74d55;border-radius:9px;padding:11px 20px;cursor:pointer;font-size:.82rem;font-weight:700;">'
            + '+ DALL-E Lifestyle &amp; Before/After — $0.16</button>'
          : '<div style="font-size:.74rem;color:#546e7a;align-self:center;padding:6px 0;">Add OpenAI key in Settings to unlock lifestyle + before/after shots</div>')
      + '<button onclick="DesignTeam._pushToEtsy(\'' + listingId + '\')" '
      + 'style="background:rgba(241,90,34,0.12);color:#f15a22;border:1.5px solid rgba(241,90,34,0.4);border-radius:9px;padding:11px 20px;cursor:pointer;font-size:.82rem;font-weight:700;margin-left:auto;" '
      + 'title="Upload all generated images to this Etsy listing">'
      + '🛍 Push to Etsy</button>'
      + '</div>'
      + '</div>'

      + '</div>';
  }

  // ── Internal UI helpers ────────────────────────────────────────────────
  function _uploadScreenshot(listingId, inputEl) {
    var file = inputEl.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      saveScreenshot(listingId, e.target.result);
      if (typeof toast === 'function') toast('Screenshot saved for ' + listingId, 'success');
      if (typeof openPanel === 'function') {
        // Refresh panel
        openPanel('Mockup Studio — ' + listingId, mockupStudioHTML(listingId));
      }
    };
    reader.readAsDataURL(file);
  }

  function _setScene(sceneId, listingId) {
    config.activeScene = sceneId;
    // Update button styles
    MOCKUP_SCENES.forEach(function(s) {
      var btn = document.getElementById('scene-btn-' + s.id);
      if (btn) {
        btn.style.background = s.id === sceneId ? 'var(--accent)' : 'var(--panel2)';
        btn.style.color = s.id === sceneId ? '#000' : 'var(--text)';
      }
    });
  }

  function _toggleBadge(badgeId, listingId) {
    var idx = config.activeBadges.indexOf(badgeId);
    if (idx === -1) { config.activeBadges.push(badgeId); }
    else { config.activeBadges.splice(idx, 1); }
    var btn = document.getElementById('badge-btn-' + badgeId);
    var b = OVERLAY_BADGES.find(function(b){return b.id===badgeId;});
    if (btn && b) {
      var active = config.activeBadges.indexOf(badgeId) !== -1;
      btn.style.background = active ? b.bg : 'var(--panel2)';
      btn.style.color = active ? b.color : 'var(--muted)';
    }
  }

  function _generateMockups(listingId, accentColor) {
    var screenshot = getScreenshot(listingId);
    var toastFn = typeof toast === 'function' ? toast : function(){};
    toastFn('Compositing ' + listingId + ' images…', 'info');

    var chain = Promise.resolve();

    // Mockup-method shots (need canvas compositor)
    ['hero', 'detail', 'bundle', 'flat_preview'].forEach(function(shotType) {
      chain = chain.then(function() {
        return compositeImage(screenshot, listingId, shotType, config.activeScene, config.activeBadges, accentColor)
          .then(function(dataUrl) {
            saveMockup(listingId, shotType, dataUrl);
            toastFn(listingId + ' · ' + shotType + ' ✓', 'success');
            if (typeof renderDesignView === 'function') renderDesignView();
          });
      });
    });

    // Canvas-method infoslides (pure canvas, no screenshot needed)
    ['feature_callout', 'whats_included', 'how_to_use', 'before_you_buy'].forEach(function(shotType) {
      chain = chain.then(function() {
        return Promise.resolve(generateInfoSlide(listingId, shotType, accentColor))
          .then(function(dataUrl) {
            saveMockup(listingId, shotType, dataUrl);
            toastFn(listingId + ' · ' + shotType + ' ✓', 'success');
            if (typeof renderDesignView === 'function') renderDesignView();
          });
      });
    });

    chain.then(function() {
      toastFn('All 8 free images for ' + listingId + ' done! — Ready to push to Etsy', 'success');
    });
  }

  function _pushToEtsy(listingId) {
    var toastFn = typeof toast === 'function' ? toast : function(){};
    if (typeof EtsyAPI === 'undefined' || !EtsyAPI.isConnected()) {
      toastFn('Connect Etsy first — go to Settings', 'warn');
      return;
    }
    var listingCache = cache[listingId];
    if (!listingCache) { toastFn('No images generated yet — generate first', 'warn'); return; }

    // Look up Etsy listing_id stored on the Atlas listing
    var atlasData = (function(){ try{ return JSON.parse(localStorage.getItem('agentAtlasV3')||'{}'); }catch(e){return {};} })();
    var listing = atlasData.listings && atlasData.listings.find(function(l){ return l.id === listingId; });
    var etsyId = listing && listing.etsyListingId;
    if (!etsyId) { toastFn('No Etsy listing ID saved for ' + listingId + ' — publish it first or set listing ID in Edit', 'warn'); return; }

    toastFn('Uploading images to Etsy for ' + listingId + '…', 'info');
    EtsyAPI.pushImagesToEtsy(listingId, etsyId, listingCache).then(function(res) {
      toastFn('Etsy upload done: ' + res.uploaded + ' images sent, ' + res.skipped + ' skipped', 'success');
    }).catch(function(e) {
      toastFn('Etsy upload error: ' + e.message, 'warn');
    });
  }

  // ── Gallery HTML ───────────────────────────────────────────────────────
  function galleryHTML(listingId) {
    var hasKey = !!config.apiKey;
    var accentColors = {
      'LS-001':'#e85d04','LS-002':'#1565c0','LS-003':'#f9a825','LS-004':'#2e7d32',
      'LS-005':'#c62828','LS-006':'#558b2f','LS-007':'#bf360c','LS-008':'#0277bd',
      'LS-009':'#00838f','LS-010':'#6d4c41','LS-011':'#e65100','LS-012':'#f57f17',
      'LS-013':'#d32f2f','LS-014':'#01579b','LS-015':'#0097a7','LS-016':'#00897b',
      'LS-017':'#f57c00','LS-018':'#283593','LS-019':'#00695c','LS-020':'#455a64',
    };
    var accent = accentColors[listingId] || '#4f7cff';

    var cards = SHOT_TYPES.map(function(st) {
      var cached = cache[listingId] && cache[listingId][st.id] && cache[listingId][st.id].url;
      var imgSrc = cached ? cache[listingId][st.id].url : placeholder(listingId, st.id);
      var method = st.method;
      var methodLabel = method === 'mockup' ? '🖼 Mockup Studio (free)' : method === 'canvas' ? '🎨 Canvas Infographic (free)' : '🤖 DALL-E 3 HD ($0.08)';
      var methodColor = method === 'dalle' ? 'var(--accent2)' : 'var(--success)';
      var statusColor = cached ? 'var(--success)' : 'var(--muted)';
      var statusLabel = cached ? '✓ Ready' : 'Not generated';

      var actionBtn = '';
      if (method === 'mockup' || method === 'canvas') {
        actionBtn = '<button onclick="DesignTeam._generateMockups(\'' + listingId + '\',\'' + accent + '\')" '
          + 'style="width:100%;background:' + (cached?'var(--surface-raised)':'var(--success)') + ';color:' + (cached?'var(--muted)':'#000') + ';border:none;border-radius:6px;padding:6px;cursor:pointer;font-size:.76rem;font-weight:600;">'
          + (cached?'Regenerate':'Generate Free') + '</button>';
      } else {
        actionBtn = hasKey
          ? '<button onclick="DesignTeam.generateShot(\'' + listingId + '\',\'' + st.id + '\').then(function(r){if(r.url){if(typeof renderDesignView===\'function\')renderDesignView();toast(\'' + st.label + ' done!\',\'success\');}else{toast(\'Error: \'+r.error,\'warn\');}})" '
            + 'style="width:100%;background:' + (cached?'var(--surface-raised)':'var(--accent)') + ';color:' + (cached?'var(--muted)':'#000') + ';border:none;border-radius:6px;padding:6px;cursor:pointer;font-size:.76rem;font-weight:600;">'
            + (cached?'Regenerate':'Generate — $0.08') + '</button>'
          : '<div style="font-size:.7rem;color:var(--muted);text-align:center;padding:6px;">Add OpenAI key in Settings</div>';
      }

      return '<div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;overflow:hidden;">'
        + '<img src="' + imgSrc + '" style="width:100%;aspect-ratio:1;object-fit:cover;display:block;" loading="lazy">'
        + '<div style="padding:10px 12px;">'
        + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">'
        + '<span style="font-size:.78rem;font-weight:700;color:var(--text);">' + st.icon + ' ' + st.label + '</span>'
        + '<span style="font-size:.68rem;color:' + statusColor + ';font-weight:600;">' + statusLabel + '</span>'
        + '</div>'
        + '<div style="font-size:.68rem;color:' + methodColor + ';margin-bottom:4px;font-weight:600;">' + methodLabel + '</div>'
        + '<div style="font-size:.7rem;color:var(--muted);margin-bottom:8px;">' + st.description + '</div>'
        + actionBtn
        + '</div>'
        + '</div>';
    }).join('');

    return '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;">' + cards + '</div>';
  }

  // ── Full Design View HTML ──────────────────────────────────────────────
  function designViewHTML() {
    var hasKey = !!config.apiKey;
    var gen = totalGenerated();
    var total = totalPossible();
    var pct = total > 0 ? Math.round((gen/total)*100) : 0;
    var listingIds = Object.keys(SHOT_PROMPTS);

    // Cost breakdown: only dalle shots cost money
    var dalleShotsRemaining = listingIds.reduce(function(n, lid) {
      return n + SHOT_TYPES.filter(function(st) {
        return st.method === 'dalle' && !(cache[lid] && cache[lid][st.id] && cache[lid][st.id].url);
      }).length;
    }, 0);
    var costRemaining = (dalleShotsRemaining * 0.08).toFixed(2);

    var listingCards = listingIds.map(function(lid) {
      var shotsDone = SHOT_TYPES.filter(function(st) {
        return cache[lid] && cache[lid][st.id] && cache[lid][st.id].url;
      }).length;
      var allDone = shotsDone === SHOT_TYPES.length;
      var hasScreenshot = !!getScreenshot(lid);
      var heroImg = cache[lid] && cache[lid].hero && cache[lid].hero.url ? cache[lid].hero.url : placeholder(lid, 'hero');

      return '<div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;overflow:hidden;cursor:pointer;" onclick="DesignTeam.openGallery(\'' + lid + '\')">'
        + '<div style="position:relative;">'
        + '<img src="' + heroImg + '" style="width:100%;aspect-ratio:1;object-fit:cover;display:block;" loading="lazy">'
        + (hasScreenshot ? '<div style="position:absolute;top:6px;right:6px;background:var(--success);color:#000;font-size:.62rem;font-weight:800;padding:2px 6px;border-radius:4px;">📷</div>' : '')
        + '</div>'
        + '<div style="padding:8px 10px;">'
        + '<div style="font-size:.72rem;font-weight:700;color:var(--text);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + lid + '</div>'
        + '<div style="display:flex;justify-content:space-between;align-items:center;">'
        + '<div style="display:flex;gap:2px;">'
        + SHOT_TYPES.map(function(st) {
            var done = cache[lid] && cache[lid][st.id] && cache[lid][st.id].url;
            var col = done ? (st.method==='mockup'?'var(--success)':'var(--accent)') : 'var(--border)';
            return '<div style="width:8px;height:8px;border-radius:50%;background:' + col + ';"></div>';
          }).join('')
        + '</div>'
        + '<span style="font-size:.7rem;color:' + (allDone?'var(--success)':'var(--muted)') + ';font-weight:700;">' + shotsDone + '/' + SHOT_TYPES.length + '</span>'
        + '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    return '<div style="width:100%;display:flex;flex-direction:column;gap:24px;">'

      + '<div class="card">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">'
      + '<div>'
      + '<div class="card-title">AI Design Team + Mockup Studio</div>'
      + '<p style="color:var(--muted);font-size:.84rem;margin:4px 0 0;">Real screenshots for hero/detail/bundle (free). DALL-E 3 HD for lifestyle + before/after only. More images = higher Etsy ranking + 2–4× clicks.</p>'
      + '</div>'
      + '<div style="display:flex;gap:10px;flex-wrap:wrap;">'
      + (hasKey
          ? '<button onclick="DesignTeam.batchGenerate()" style="background:var(--accent);color:#000;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:.86rem;font-weight:700;">Generate All DALL-E ($' + costRemaining + ')</button>'
          : '<button onclick="typeof switchView===\'function\'&&switchView(\'settings\')" style="background:var(--warn);color:#000;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:.86rem;font-weight:700;">Add OpenAI Key for DALL-E shots</button>')
      + '</div>'
      + '</div>'

      // Agent breakdown
      + '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:20px 0 10px;">'
      + SHOT_TYPES.map(function(st) {
          var done = Object.keys(SHOT_PROMPTS).filter(function(lid) {
            return cache[lid] && cache[lid][st.id] && cache[lid][st.id].url;
          }).length;
          var isFree = st.method === 'mockup' || st.method === 'canvas';
          return '<div style="background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;">'
            + '<div style="font-size:1.2rem;margin-bottom:4px;">' + st.icon + '</div>'
            + '<div style="font-size:.75rem;font-weight:700;color:var(--text);">' + st.agent + '</div>'
            + '<div style="font-size:.68rem;color:' + (isFree?'var(--success)':'var(--accent2)') + ';margin:2px 0 2px;font-weight:600;">' + (isFree?'FREE':'$0.08/image') + '</div>'
            + '<div style="font-size:.7rem;color:var(--muted);margin-bottom:6px;">' + st.label + '</div>'
            + '<div style="font-size:1rem;font-weight:800;color:' + (done===20?'var(--success)':'var(--accent2)') + ';">' + done + '/20</div>'
            + '</div>';
        }).join('')
      + '</div>'

      + '<div style="background:var(--panel2);border-radius:8px;padding:3px;margin-bottom:6px;">'
      + '<div style="height:10px;border-radius:6px;background:var(--accent);width:' + pct + '%;transition:width .4s;min-width:' + (pct>0?'4px':'0') + ';"></div>'
      + '</div>'
      + '<div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);">'
      + '<span>' + gen + ' / ' + total + ' shots ready (' + pct + '%)</span>'
      + '<span>' + dalleShotsRemaining + ' DALL-E shots remaining · ~$' + costRemaining + ' · Mockup shots are free</span>'
      + '</div>'
      + '</div>'

      + '<div>'
      + '<div style="font-size:.82rem;font-weight:700;color:var(--muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em;">All Listings — Click to Open Studio</div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px;">' + listingCards + '</div>'
      + '</div>'

      + '</div>';
  }

  // ── Open Studio panel ─────────────────────────────────────────────────
  function openGallery(listingId) {
    if (typeof openPanel === 'function') {
      openPanel('Design Studio — ' + listingId,
        '<p style="font-size:.8rem;color:var(--muted);margin:0 0 14px;">Upload a screenshot of the template to generate free mockup images. DALL-E handles lifestyle + before/after.</p>'
        + mockupStudioHTML(listingId)
        + '<hr style="border:none;border-top:1px solid var(--border);margin:16px 0;">'
        + '<div style="font-size:.8rem;font-weight:700;color:var(--muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;">Generated Images</div>'
        + galleryHTML(listingId)
      );
    }
  }

  function batchGenerate() {
    if (!config.apiKey) { if(typeof toast==='function') toast('Add OpenAI key in Settings first', 'warn'); return; }
    if(typeof toast==='function') toast('DALL-E generating lifestyle + before/after shots…', 'info');
    generateAll(function(lid, shotType, li, lt, si, st) {
      if(typeof toast==='function') toast(lid + ' · ' + shotType + ' (' + (li+1) + '/' + lt + ')', 'success');
      if(typeof renderDesignView==='function') renderDesignView();
    }).then(function() {
      if(typeof toast==='function') toast('All DALL-E shots done! Use Mockup Studio for hero/detail/bundle.', 'success');
      if(typeof renderDesignView==='function') renderDesignView();
    });
  }

  function setApiKey(key) {
    config.apiKey = key;
    try { localStorage.setItem('atlas_openai_key', key); } catch(e) {}
  }

  function settingsHTML() {
    var gen = totalGenerated();
    var total = totalPossible();
    var dalleShotsRemaining = Object.keys(SHOT_PROMPTS).reduce(function(n, lid) {
      return n + SHOT_TYPES.filter(function(st) {
        return st.method === 'dalle' && !(cache[lid] && cache[lid][st.id] && cache[lid][st.id].url);
      }).length;
    }, 0);
    return '<div style="display:flex;flex-direction:column;gap:12px;">'
      + '<div>'
      + '<label style="font-size:.82rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">OpenAI API Key (for lifestyle + before/after shots only)</label>'
      + '<div style="display:flex;gap:8px;">'
      + '<input id="atlas-openai-key-input" type="password" placeholder="sk-..." value="' + (config.apiKey||'') + '" '
      + 'style="flex:1;background:var(--panel2);border:1px solid var(--border);border-radius:7px;color:var(--text);font-size:.86rem;padding:8px 10px;outline:none;font-family:monospace;">'
      + '<button onclick="DesignTeam.setApiKey(document.getElementById(\'atlas-openai-key-input\').value);this.textContent=\'✓ Saved\';this.style.background=\'var(--success)\';this.style.color=\'#000\';" '
      + 'style="background:var(--accent);color:#000;border:none;border-radius:7px;padding:8px 14px;cursor:pointer;font-size:.84rem;font-weight:700;">Save Key</button>'
      + '</div>'
      + '</div>'
      + '<div style="background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:.8rem;color:var(--muted);">'
      + '<div style="font-weight:700;color:var(--text);margin-bottom:4px;">Cost Breakdown</div>'
      + '<div>Hero + Detail + Bundle: <strong style="color:var(--success);">FREE</strong> — generated from your template screenshots</div>'
      + '<div>Lifestyle + Before/After: <strong style="color:var(--accent2);">$0.08/image (DALL-E 3 HD)</strong> — ' + dalleShotsRemaining + ' remaining = $' + (dalleShotsRemaining*0.08).toFixed(2) + '</div>'
      + '<div style="margin-top:6px;">' + gen + '/' + total + ' shots generated total</div>'
      + '</div>'
      + '</div>';
  }

  // ── Init ──────────────────────────────────────────────────────────────
  (function init() {
    try { var k = localStorage.getItem('atlas_openai_key'); if (k) config.apiKey = k; } catch(e) {}
    try { var c = localStorage.getItem('atlas_design_cache'); if (c) cache = JSON.parse(c); } catch(e) {}
    try {
      var old = localStorage.getItem('atlas_image_cache');
      if (old) {
        var oldCache = JSON.parse(old);
        Object.keys(oldCache).forEach(function(lid) {
          if (oldCache[lid] && oldCache[lid].url) {
            if (!cache[lid]) cache[lid] = {};
            if (!cache[lid].hero) cache[lid].hero = { url: oldCache[lid].url, method: 'migrated' };
          }
        });
        saveCache();
      }
    } catch(e) {}
  })();

  return {
    config:             config,
    cache:              cache,
    SHOT_TYPES:         SHOT_TYPES,
    MOCKUP_SCENES:      MOCKUP_SCENES,
    OVERLAY_BADGES:     OVERLAY_BADGES,
    generateShot:       generateShot,
    generateFullSet:    generateFullSet,
    generateAll:        generateAll,
    batchGenerate:      batchGenerate,
    compositeImage:     compositeImage,
    saveMockup:         saveMockup,
    getImage:           getImage,
    placeholder:        placeholder,
    galleryHTML:        galleryHTML,
    designViewHTML:     designViewHTML,
    openGallery:        openGallery,
    mockupStudioHTML:   mockupStudioHTML,
    setApiKey:          setApiKey,
    settingsHTML:       settingsHTML,
    totalGenerated:     totalGenerated,
    totalPossible:      totalPossible,
    _uploadScreenshot:  _uploadScreenshot,
    _setScene:          _setScene,
    _toggleBadge:       _toggleBadge,
    _generateMockups:   _generateMockups,
    _pushToEtsy:        _pushToEtsy,
    // Backwards compat
    generate:           function(lid) { return generateShot(lid, 'lifestyle'); },
    getHeroImage:       function(lid) { return getImage(lid, 'hero'); },
    clearCache:         function() { cache = {}; try { localStorage.removeItem('atlas_design_cache'); } catch(e) {} },
  };

})();

var ImageGen = DesignTeam;

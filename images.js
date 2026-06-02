// images.js — AI Design Team for Agent Atlas
// 5 specialized design agents generate a 10-photo Etsy gallery per listing.
// Exposes global: DesignTeam (ImageGen alias preserved for backwards compat)

var DesignTeam = (function() {

  // ── Shot type definitions ───────────────────────────────────────────
  var SHOT_TYPES = [
    {
      id: 'hero',
      label: 'Hero Shot',
      agent: 'Hero Agent',
      description: 'Clean flatlay — the form at its best. This is the thumbnail.',
      icon: '★',
    },
    {
      id: 'lifestyle',
      label: 'Lifestyle Shot',
      agent: 'Lifestyle Agent',
      description: 'Real human in context using it. Emotional connection = clicks.',
      icon: '◈',
    },
    {
      id: 'detail',
      label: 'Detail Shot',
      agent: 'Detail Agent',
      description: 'Close-up of the form fields. Proves professional quality.',
      icon: '◉',
    },
    {
      id: 'bundle',
      label: 'Bundle Shot',
      agent: 'Bundle Agent',
      description: 'Multiple forms fanned out. Makes the value obvious.',
      icon: '▦',
    },
    {
      id: 'before_after',
      label: 'Before/After',
      agent: 'Pain Agent',
      description: 'Chaos vs organized. Best-converting shot type on Etsy.',
      icon: '⬡',
    },
  ];

  // ── Per-listing, per-shot prompts ────────────────────────────────────
  var SHOT_PROMPTS = {
    'LS-001': {
      hero:         'Premium product flatlay: HVAC service call form on a polished stainless steel clipboard, dark workshop bench background, single warm overhead spotlight, dramatic shadows, ultra-sharp focus on form, no text readable, commercial product photography, 4K quality',
      lifestyle:    'HVAC technician in uniform kneeling beside outdoor AC unit, writing on a clipboard with a service form, golden hour natural light, focused professional expression, blurred suburban neighborhood background, photorealistic, no text readable',
      detail:       'Extreme close-up macro shot of blank HVAC service form on clipboard, crisp fine-line form fields and section headers visible but no text filled in, shallow depth of field, neutral grey background, studio lighting, ultra-sharp',
      bundle:       'Five HVAC service call forms fanned out on a dark textured metal surface, slight overlap, perspective view, soft studio lighting creating subtle shadows, clean and professional, no readable text, commercial photography',
      before_after:  'Split image: LEFT side shows messy handwritten scraps of paper, greasy notes, and disorganized invoices on a dirty truck dashboard (chaos, stress); RIGHT side shows the same information neatly organized on a clean professional HVAC service form on a clipboard (order, relief). Cinematic lighting, no readable text',
    },
    'LS-002': {
      hero:         'Premium flatlay: plumbing dispatch checklist on a heavy-duty aluminum clipboard, blue-grey concrete background, crisp directional studio light, deep shadows, ultra-sharp form visible, no text readable, commercial photography',
      lifestyle:    'Plumber in work uniform at kitchen sink, reviewing checklist on clipboard before starting job, natural home interior background slightly blurred, professional candid photography, no text readable',
      detail:       'Close-up macro of plumbing diagnosis checklist, clean section dividers and checkbox fields visible, shallow depth of field, white studio background, no text filled in',
      bundle:       'Four plumbing dispatch forms fanned out on slate grey surface, slight angle, professional studio lighting, crisp and clean, no readable text',
      before_after:  'Split image: LEFT shows crumpled sticky notes and scribbled napkins near a drain (disorganized, stressful); RIGHT shows clean plumbing checklist on clipboard (professional, organized). Cinematic lighting, no text readable',
    },
    'LS-003': {
      hero:         'Electrician inspection form on brushed aluminum clipboard, dark concrete background, cool blue-grey studio lighting, ultra-sharp, dramatic product shot, no text readable',
      lifestyle:    'Licensed electrician in safety gear and hard hat reviewing inspection form on clipboard at commercial panel board, professional industrial photography, no text readable',
      detail:       'Close-up of electrician jobsite inspection form showing organized checkboxes and section areas, crisp studio macro photography, no text filled in',
      bundle:       'Set of three electrician forms fanned out on dark industrial surface, cool professional lighting, clean composition, no readable text',
      before_after:  'Split: LEFT shows hand-sketched messy notes on paper at a circuit breaker (dangerous, informal); RIGHT shows clean professional inspection form on clipboard (safe, organized). No readable text',
    },
    'LS-004': {
      hero:         'Lawn care weekly crew planner on green clipboard against fresh-cut grass background, bright morning sunlight, commercial product photography, ultra-sharp, no text readable',
      lifestyle:    'Lawn business owner in polo shirt reviewing weekly crew planner on clipboard beside mowing truck at dawn, warm golden light, professional outdoor photography, no text readable',
      detail:       'Close-up of weekly crew planner form showing route columns and crew assignment areas, crisp outdoor natural light, shallow depth of field, no text filled in',
      bundle:       'Four weekly planner sheets fanned out on a wooden picnic table with grass background, morning light, clean professional photography, no readable text',
      before_after:  'Split: LEFT shows chaotic group texts and handwritten route lists on a phone and napkins; RIGHT shows organized weekly crew planner on clipboard (calm, efficient). No readable text',
    },
    'LS-005': {
      hero:         'Auto detail intake form and damage waiver on dark leather clipboard, luxury car interior background blur, warm amber premium lighting, high-end product photography, no text readable',
      lifestyle:    'Professional mobile detailer in branded polo presenting clipboard with intake form to car owner in upscale driveway, luxury vehicle background, natural afternoon light, no text readable',
      detail:       'Macro shot of auto detail intake form showing service selection areas and waiver section, shallow depth of field, dark premium background, studio lighting, no text filled in',
      bundle:       'Intake form and damage waiver side by side on dark polished surface, premium presentation, warm product lighting, no readable text',
      before_after:  'Split: LEFT shows phone photos of scratch dispute with angry customer (no documentation); RIGHT shows clean signed damage waiver on clipboard next to car (protected, professional). No readable text',
    },
    'LS-006': {
      hero:         'Pest control follow-up cards fanned out on clean white surface, professional product flatlay, neutral studio lighting, crisp and sharp, no text readable',
      lifestyle:    'Pest control technician in uniform handing follow-up card to homeowner at front door, suburban neighborhood background, natural daylight, professional photography, no text readable',
      detail:       'Close-up of pest control service card showing service sections and follow-up areas, macro studio photography, no text filled in',
      bundle:       'Set of pest control cards in a neat stack with top card visible, clean surface, studio light, commercial product shot, no readable text',
      before_after:  'Split: LEFT shows no follow-up and lost customer; RIGHT shows professional pest control card left at door with next service schedule (retention, professionalism). No readable text',
    },
    'LS-007': {
      hero:         'Roofing change order form on heavy-duty contractor clipboard, roofing shingles and blue sky background blur, strong natural sunlight, dramatic shadows, ultra-sharp, no text readable',
      lifestyle:    'Roofing contractor in hard hat and safety vest showing change order form on clipboard to homeowner, residential rooftop background, natural daylight, professional photography, no text readable',
      detail:       'Close-up of roofing change order showing scope sections and approval signature area, crisp macro photography, shallow depth of field, no text filled in',
      bundle:       'Three roofing documents fanned out on rough wood surface, construction site aesthetic, outdoor natural lighting, no readable text',
      before_after:  'Split: LEFT shows verbal argument about scope change with no documentation (dispute, stress); RIGHT shows signed change order on clipboard (protected, professional). No readable text',
    },
    'LS-008': {
      hero:         'Pressure washing route sheet on waterproof clipboard, clean wet concrete driveway background, bright midday sun, commercial product photography, no text readable',
      lifestyle:    'Pressure washing operator reviewing route sheet on clipboard beside commercial pressure washer on residential driveway, professional outdoor photography, no text readable',
      detail:       'Close-up of pressure washing route sheet showing job columns and site detail areas, outdoor natural light, sharp macro, no text filled in',
      bundle:       'Stack of route sheets on clipboard with equipment in background, bright outdoor lighting, professional product shot, no readable text',
      before_after:  'Split: LEFT shows missed stops and confused crew on phones; RIGHT shows clean route sheet on clipboard with organized daily stops (efficiency, profit). No readable text',
    },
    'LS-009': {
      hero:         'Appliance repair parts tracker form on clipboard, organized workshop bench background, warm shop lighting, premium product photography, no text readable',
      lifestyle:    'Appliance repair technician checking parts tracker on clipboard beside open washing machine, home setting background, natural indoor light, professional photography, no text readable',
      detail:       'Close-up macro of parts tracker form showing part number columns and supplier fields, warm bench lighting, shallow depth of field, no text filled in',
      bundle:       'Parts tracker sheets stacked with tools nearby, workshop background, warm lighting, commercial product shot, no readable text',
      before_after:  'Split: LEFT shows lost parts receipts and forgotten orders costing money; RIGHT shows organized parts tracker with every item logged (control, savings). No readable text',
    },
    'LS-010': {
      hero:         'Handyman reimbursement sheet on clipboard, home improvement background with tools softly blurred, natural window light, clean product photography, no text readable',
      lifestyle:    'Handyman in work vest presenting reimbursement sheet on clipboard to homeowner at front door, professional photography, no text readable',
      detail:       'Close-up of reimbursement form showing expense line items and client signature area, crisp natural light, shallow depth of field, no text filled in',
      bundle:       'Reimbursement forms with receipts beside clipboard, organized home office surface, clean lighting, no readable text',
      before_after:  'Split: LEFT shows arguing over material costs with no receipts documented; RIGHT shows clean reimbursement form signed by client (paid, protected). No readable text',
    },
    'LS-011': {
      hero:         'Mobile mechanic service summary form on clipboard beside open engine bay, warm garage lighting, dramatic side light, ultra-sharp product photography, no text readable',
      lifestyle:    'Mobile mechanic in coveralls reviewing service summary on clipboard at roadside repair scene, natural outdoor light, professional candid photography, no text readable',
      detail:       'Close-up of service summary showing work performed section and parts replaced area, shallow depth of field, warm garage lighting, no text filled in',
      bundle:       'Set of mobile mechanic forms on clipboard with tool bag visible, professional automotive photography, no readable text',
      before_after:  'Split: LEFT shows customer disputing repair with no documentation; RIGHT shows clean signed service summary documenting every repair (trust, repeat business). No readable text',
    },
    'LS-012': {
      hero:         'Locksmith authorization form on dark clipboard, professional moody low-key lighting, keys and lock background blur, premium product photography, no text readable',
      lifestyle:    'Locksmith in uniform reviewing authorization form with homeowner at front door, natural residential lighting, professional photography, no text readable',
      detail:       'Close-up of locksmith authorization form showing ID verification section and authorization signature area, dramatic lighting, macro, no text filled in',
      bundle:       'Authorization forms stacked on dark surface with locksmith tools softly blurred, moody professional lighting, no readable text',
      before_after:  'Split: LEFT shows police interaction due to no authorization documentation; RIGHT shows signed authorization form on clipboard protecting the locksmith (legal protection, professionalism). No readable text',
    },
    'LS-013': {
      hero:         'Painting prep checklist and punch list on clipboard, paint swatches and roller background, bright studio lighting, clean commercial product photography, no text readable',
      lifestyle:    'Painting contractor reviewing punch list on clipboard with homeowner during final walkthrough, freshly painted room background, natural window light, professional photography, no text readable',
      detail:       'Close-up of painting punch list showing surface condition checkboxes and touch-up areas, crisp macro, shallow depth of field, no text filled in',
      bundle:       'Prep checklist and punch list side by side on drop cloth, painting tools nearby, bright natural light, no readable text',
      before_after:  'Split: LEFT shows callback dispute for missed touch-ups costing time and money; RIGHT shows completed signed punch list (no callbacks, full payment). No readable text',
    },
    'LS-014': {
      hero:         'Snow removal trigger checklist on clipboard in snowy winter setting, crisp white and grey tones, clean product photography, no text readable',
      lifestyle:    'Snow removal operator reviewing trigger checklist on clipboard beside plow truck, winter morning, natural light, professional photography, no text readable',
      detail:       'Close-up of snow removal checklist showing trigger conditions and client list, winter natural light, macro, no text filled in',
      bundle:       'Snow removal checklists stacked on truck dashboard, winter setting, clean product shot, no readable text',
      before_after:  'Split: LEFT shows frantic calls from clients asking if snow service is happening (confusion); RIGHT shows organized trigger checklist with clear conditions (automatic, professional). No readable text',
    },
    'LS-015': {
      hero:         'Window cleaning client packet on clipboard, bright glass building background, clean natural daylight, premium product photography, no text readable',
      lifestyle:    'Window cleaning professional reviewing client packet on clipboard at commercial building, outdoor professional photography, no text readable',
      detail:       'Close-up of window cleaning packet showing service schedule and client information areas, bright natural light, macro, no text filled in',
      bundle:       'Client packet forms fanned out on clean white surface, bright studio lighting, professional product shot, no readable text',
      before_after:  'Split: LEFT shows confusion over service schedule and missed appointments; RIGHT shows organized client packet with clear schedule (professional, retained clients). No readable text',
    },
    'LS-016': {
      hero:         'Pool service chemical log on clipboard beside sparkling blue pool, warm summer sunlight, premium outdoor product photography, no text readable',
      lifestyle:    'Pool technician reviewing chemical log on clipboard beside pool, outdoor summer setting, natural warm light, professional photography, no text readable',
      detail:       'Close-up of pool chemical log showing reading columns and chemical dosage areas, bright outdoor light, shallow depth of field, no text filled in',
      bundle:       'Pool service logs stacked on pool deck with equipment background, summer natural lighting, no readable text',
      before_after:  'Split: LEFT shows green algae pool from inconsistent chemical tracking; RIGHT shows clear blue pool with organized chemical log (healthy pool, happy client). No readable text',
    },
    'LS-017': {
      hero:         'Flooring estimate scope matrix on clipboard beside wood and tile samples, warm interior design studio lighting, premium product photography, no text readable',
      lifestyle:    'Flooring contractor reviewing estimate matrix with homeowner in kitchen, natural home lighting, professional candid photography, no text readable',
      detail:       'Close-up of flooring estimate matrix showing room sections and material columns, warm interior light, macro, no text filled in',
      bundle:       'Estimate matrix and measurement sheets side by side on flooring samples, professional presentation, no readable text',
      before_after:  'Split: LEFT shows estimate dispute with angry homeowner over unclear scope; RIGHT shows clean signed scope matrix with every room documented (trust, deposit paid). No readable text',
    },
    'LS-018': {
      hero:         'Construction daily site report on aluminum contractor clipboard, active construction site background blur, dramatic natural daylight, ultra-sharp product photography, no text readable',
      lifestyle:    'General contractor reviewing daily site report on clipboard at construction site, hard hat and safety vest, professional outdoor photography, no text readable',
      detail:       'Close-up of site report showing crew roster and daily progress sections, outdoor construction lighting, macro, no text filled in',
      bundle:       'Site report stack on clipboard with construction background, professional outdoor photography, no readable text',
      before_after:  'Split: LEFT shows insurance claim dispute with no site documentation; RIGHT shows complete daily site report protecting contractor (legal protection, professionalism). No readable text',
    },
    'LS-019': {
      hero:         'Septic pump log on clipboard in rural outdoor setting, green grass background, clean natural daylight, commercial product photography, no text readable',
      lifestyle:    'Septic service technician reviewing pump log on clipboard at residential property, outdoor natural lighting, professional photography, no text readable',
      detail:       'Close-up of septic pump log showing service date columns and tank condition areas, outdoor light, macro, no text filled in',
      bundle:       'Pump log forms on clipboard with service truck in background, rural outdoor setting, clean product shot, no readable text',
      before_after:  'Split: LEFT shows regulatory violation from poor record keeping; RIGHT shows complete pump log with every service documented (compliant, professional). No readable text',
    },
    'LS-020': {
      hero:         'Professional fee transparency addendum on clean white clipboard, modern office surface, crisp overhead lighting, premium product photography, no text readable',
      lifestyle:    'Service business owner reviewing fee addendum with client across clean desk, modern office setting, natural window light, professional photography, no text readable',
      detail:       'Close-up of fee addendum showing fee schedule sections and client acknowledgment area, clean studio macro, no text filled in',
      bundle:       'Fee addendum with service agreement on clean desk, professional office lighting, commercial product shot, no readable text',
      before_after:  'Split: LEFT shows payment dispute over unexpected fees, angry client; RIGHT shows signed fee transparency addendum with no surprises (trust, full payment). No readable text',
    },
  };

  var config = {
    apiKey:  '',
    model:   'dall-e-3',
    size:    '1024x1024',
    quality: 'standard',
    style:   'natural',
  };

  // cache: { 'LS-001': { hero: {url}, lifestyle: {url}, ... }, ... }
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
    var labels = { hero:'HERO', lifestyle:'LIFE', detail:'DETAIL', bundle:'BUNDLE', before_after:'B/A' };
    var lbl = labels[shotType] || shotType || '';
    var svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">',
      '<rect width="400" height="400" fill="#111827"/>',
      '<polygon points="200,140 240,160 240,200 200,220 160,200 160,160" fill="none" stroke="#4f7cff" stroke-width="2" opacity="0.5"/>',
      '<text x="200" y="240" font-family="monospace" font-size="13" fill="#7a90b5" text-anchor="middle">' + (listingId||'') + ' ' + lbl + '</text>',
      '</svg>',
    ].join('');
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function generateShot(listingId, shotType) {
    if (!config.apiKey) return Promise.resolve({ error: 'no_key' });
    var prompts = SHOT_PROMPTS[listingId];
    if (!prompts) return Promise.resolve({ error: 'no_prompts_for_listing' });
    var prompt = prompts[shotType];
    if (!prompt) return Promise.resolve({ error: 'no_prompt_for_shot_type' });

    return fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config.apiKey },
      body: JSON.stringify({ model: config.model, prompt: prompt, n: 1, size: config.size, quality: config.quality, style: config.style }),
    })
    .then(function(res) {
      return res.json().then(function(data) {
        if (!res.ok) return { error: (data.error && data.error.message) || ('HTTP ' + res.status) };
        var url = data.data && data.data[0] && data.data[0].url;
        if (!url) return { error: 'no_url' };
        if (!cache[listingId]) cache[listingId] = {};
        cache[listingId][shotType] = { url: url, listingId: listingId, shotType: shotType, generatedAt: Date.now() };
        saveCache();
        return { url: url, listingId: listingId, shotType: shotType };
      });
    })
    .catch(function(err) { return { error: err.message || 'fetch_failed' }; });
  }

  // Generate all 5 shots for a single listing in sequence
  function generateFullSet(listingId, onProgress) {
    var results = [];
    function next(i) {
      if (i >= SHOT_TYPES.length) return Promise.resolve(results);
      var st = SHOT_TYPES[i];
      // Skip if already cached
      if (cache[listingId] && cache[listingId][st.id] && cache[listingId][st.id].url) {
        results.push({ cached: true, shotType: st.id });
        if (typeof onProgress === 'function') onProgress(listingId, st.id, i, SHOT_TYPES.length);
        return next(i + 1);
      }
      return generateShot(listingId, st.id).then(function(r) {
        results.push(r);
        if (typeof onProgress === 'function') onProgress(listingId, st.id, i, SHOT_TYPES.length);
        return new Promise(function(resolve) { setTimeout(function() { resolve(next(i+1)); }, 600); });
      });
    }
    return next(0);
  }

  // Generate all shots for all listings in sequence
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

  function setApiKey(key) {
    config.apiKey = key;
    try { localStorage.setItem('atlas_openai_key', key); } catch(e) {}
  }

  // Gallery HTML for a single listing — 5 shot cards
  function galleryHTML(listingId) {
    var hasKey = !!config.apiKey;
    var cards = SHOT_TYPES.map(function(st) {
      var cached = cache[listingId] && cache[listingId][st.id] && cache[listingId][st.id].url;
      var imgSrc = cached ? cache[listingId][st.id].url : placeholder(listingId, st.id);
      var statusColor = cached ? 'var(--success)' : 'var(--muted)';
      var statusLabel = cached ? '✓ Ready' : 'Not generated';
      return `
        <div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;overflow:hidden;">
          <img src="${imgSrc}" style="width:100%;aspect-ratio:1;object-fit:cover;display:block;" loading="lazy">
          <div style="padding:10px 12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
              <span style="font-size:.78rem;font-weight:700;color:var(--text);">${st.icon} ${st.label}</span>
              <span style="font-size:.7rem;color:${statusColor};font-weight:600;">${statusLabel}</span>
            </div>
            <div style="font-size:.7rem;color:var(--muted);margin-bottom:8px;">${st.description}</div>
            ${hasKey
              ? `<button onclick="DesignTeam.generateShot('${listingId}','${st.id}').then(function(r){if(r.url){renderDesignView&&renderDesignView();toast('${st.label} generated!','success');}else{toast('Error: '+r.error,'warn');}})" style="width:100%;background:${cached?'var(--surface-raised)':'var(--accent)'};color:${cached?'var(--muted)':'#000'};border:none;border-radius:6px;padding:6px;cursor:pointer;font-size:.76rem;font-weight:600;">${cached?'Regenerate':'Generate — $0.04'}</button>`
              : `<div style="font-size:.72rem;color:var(--muted);text-align:center;">Add OpenAI key in Settings</div>`
            }
          </div>
        </div>`;
    }).join('');

    return `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;">${cards}</div>`;
  }

  // Full Design view HTML (called from app.js renderDesignView)
  function designViewHTML() {
    var hasKey = !!config.apiKey;
    var gen = totalGenerated();
    var total = totalPossible();
    var pct = total > 0 ? Math.round((gen/total)*100) : 0;
    var listingIds = Object.keys(SHOT_PROMPTS);
    var costRemaining = ((total - gen) * 0.04).toFixed(2);

    var listingCards = listingIds.map(function(lid) {
      var shotsDone = SHOT_TYPES.filter(function(st) {
        return cache[lid] && cache[lid][st.id] && cache[lid][st.id].url;
      }).length;
      var allDone = shotsDone === SHOT_TYPES.length;
      var heroImg = cache[lid] && cache[lid].hero && cache[lid].hero.url
        ? cache[lid].hero.url : placeholder(lid, 'hero');
      return `
        <div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;overflow:hidden;cursor:pointer;" onclick="DesignTeam.openGallery('${lid}')">
          <img src="${heroImg}" style="width:100%;aspect-ratio:1;object-fit:cover;display:block;" loading="lazy">
          <div style="padding:10px 12px;">
            <div style="font-size:.75rem;font-weight:700;color:var(--text);margin-bottom:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${lid}</div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div style="display:flex;gap:2px;">
                ${SHOT_TYPES.map(function(st) {
                  var done = cache[lid] && cache[lid][st.id] && cache[lid][st.id].url;
                  return '<div style="width:8px;height:8px;border-radius:50%;background:' + (done ? 'var(--success)' : 'var(--border)') + ';"></div>';
                }).join('')}
              </div>
              <span style="font-size:.7rem;color:${allDone?'var(--success)':'var(--muted)'};">${shotsDone}/5</span>
            </div>
          </div>
        </div>`;
    }).join('');

    return `
      <div style="max-width:960px;display:flex;flex-direction:column;gap:24px;">

        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
            <div>
              <div class="card-title">AI Design Team</div>
              <p style="color:var(--muted);font-size:.84rem;margin:4px 0 0;">5 specialized agents generate a full 10-photo Etsy gallery per listing. More photos = higher ranking + 2–4× CVR.</p>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              ${hasKey
                ? `<button onclick="DesignTeam.batchGenerate()" style="background:var(--accent);color:#000;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:.86rem;font-weight:700;">Generate All Missing ($${costRemaining})</button>`
                : `<button onclick="switchView('settings')" style="background:var(--warn);color:#000;border:none;border-radius:8px;padding:10px 20px;cursor:pointer;font-size:.86rem;font-weight:700;">Add OpenAI Key to Start</button>`
              }
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:20px 0 10px;">
            ${SHOT_TYPES.map(function(st) {
              var done = Object.keys(SHOT_PROMPTS).filter(function(lid) {
                return cache[lid] && cache[lid][st.id] && cache[lid][st.id].url;
              }).length;
              return `
                <div style="background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center;">
                  <div style="font-size:1.2rem;margin-bottom:4px;">${st.icon}</div>
                  <div style="font-size:.75rem;font-weight:700;color:var(--text);">${st.agent}</div>
                  <div style="font-size:.7rem;color:var(--muted);margin:2px 0 6px;">${st.label}</div>
                  <div style="font-size:1rem;font-weight:800;color:${done===20?'var(--success)':'var(--accent2)'};">${done}/20</div>
                </div>`;
            }).join('')}
          </div>

          <div style="background:var(--panel2);border-radius:8px;padding:3px;margin-bottom:6px;">
            <div style="height:10px;border-radius:6px;background:var(--accent);width:${pct}%;transition:width .4s;min-width:${pct>0?'4px':'0'};"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);">
            <span>${gen} / ${total} shots generated (${pct}%)</span>
            <span>${total-gen} remaining · ~$${costRemaining} total cost</span>
          </div>
        </div>

        <div>
          <div style="font-size:.82rem;font-weight:700;color:var(--muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:.05em;">All Listings — Click to Open Gallery</div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px;">
            ${listingCards}
          </div>
        </div>

      </div>
    `;
  }

  // Open gallery side panel for a listing
  function openGallery(listingId) {
    if (typeof openPanel === 'function') {
      openPanel('Design Gallery — ' + listingId, `
        <p style="font-size:.8rem;color:var(--muted);margin:0 0 14px;">5-shot set. Each image optimized for a different conversion purpose. Click any Generate button to create that shot.</p>
        ${galleryHTML(listingId)}
        <div style="margin-top:14px;display:flex;gap:8px;">
          ${config.apiKey
            ? `<button onclick="DesignTeam.generateFullSet('${listingId}',function(lid,st,i,t){toast(st+' generated ('+( i+1)+'/'+t+')','success');}).then(function(){renderDesignView&&renderDesignView();toast('Full set complete for ${listingId}!','success');})" style="background:var(--accent);color:#000;border:none;border-radius:7px;padding:9px 18px;cursor:pointer;font-size:.84rem;font-weight:700;">Generate Full Set — $0.20</button>`
            : ''
          }
        </div>
      `);
    }
  }

  // Batch generate all missing with live progress toasts
  function batchGenerate() {
    if (!config.apiKey) { if(typeof toast==='function') toast('Add OpenAI key in Settings first', 'warn'); return; }
    if(typeof toast==='function') toast('Design Team starting — generating all missing shots…', 'info');
    generateAll(function(lid, shotType, li, lt, si, st) {
      if(typeof toast==='function') toast(lid + ' · ' + shotType + ' (' + (li+1) + '/' + lt + ')', 'success');
      if(typeof renderDesignView==='function') renderDesignView();
    }).then(function() {
      if(typeof toast==='function') toast('All shots generated! Full gallery ready.', 'success');
      if(typeof renderDesignView==='function') renderDesignView();
    });
  }

  function settingsHTML() {
    var gen = totalGenerated();
    var total = totalPossible();
    return `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <label style="font-size:.82rem;font-weight:600;color:var(--muted);display:block;margin-bottom:5px;">OpenAI API Key</label>
          <div style="display:flex;gap:8px;">
            <input id="atlas-openai-key-input" type="password" placeholder="sk-..." value="${config.apiKey||''}"
              style="flex:1;background:var(--panel2);border:1px solid var(--border);border-radius:7px;color:var(--text);font-size:.86rem;padding:8px 10px;outline:none;font-family:monospace;">
            <button onclick="DesignTeam.setApiKey(document.getElementById('atlas-openai-key-input').value);this.textContent='✓ Saved';this.style.background='var(--success)';this.style.color='#000';" style="background:var(--accent);color:#000;border:none;border-radius:7px;padding:8px 14px;cursor:pointer;font-size:.84rem;font-weight:700;">Save Key</button>
          </div>
        </div>
        <div style="font-size:.8rem;color:var(--muted);">${gen}/${total} shots generated · ${total-gen} remaining · ~$${((total-gen)*0.04).toFixed(2)} to complete</div>
      </div>`;
  }

  // Init
  (function init() {
    try { var k = localStorage.getItem('atlas_openai_key'); if (k) config.apiKey = k; } catch(e) {}
    try { var c = localStorage.getItem('atlas_design_cache'); if (c) cache = JSON.parse(c); } catch(e) {}
    // Migrate old single-image cache
    try {
      var old = localStorage.getItem('atlas_image_cache');
      if (old) {
        var oldCache = JSON.parse(old);
        Object.keys(oldCache).forEach(function(lid) {
          if (oldCache[lid] && oldCache[lid].url) {
            if (!cache[lid]) cache[lid] = {};
            if (!cache[lid].hero) cache[lid].hero = { url: oldCache[lid].url, migrated: true };
          }
        });
        saveCache();
      }
    } catch(e) {}
  })();

  return {
    config:           config,
    cache:            cache,
    SHOT_TYPES:       SHOT_TYPES,
    generateShot:     generateShot,
    generateFullSet:  generateFullSet,
    generateAll:      generateAll,
    batchGenerate:    batchGenerate,
    getImage:         getImage,
    placeholder:      placeholder,
    galleryHTML:      galleryHTML,
    designViewHTML:   designViewHTML,
    openGallery:      openGallery,
    setApiKey:        setApiKey,
    settingsHTML:     settingsHTML,
    totalGenerated:   totalGenerated,
    totalPossible:    totalPossible,
    // Backwards compat
    generate:         function(lid) { return generateShot(lid, 'hero'); },
    getHeroImage:     function(lid) { return getImage(lid, 'hero'); },
    clearCache:       function() { cache = {}; try { localStorage.removeItem('atlas_design_cache'); } catch(e) {} },
  };

})();

// Backwards compatibility alias
var ImageGen = DesignTeam;

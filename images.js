// images.js — Mockup image generation for Etsy listings via OpenAI DALL-E 3
// Exposes global ImageGen object. No ES modules, no dependencies.

var ImageGen = {

  config: {
    apiKey: '',
    model: 'dall-e-3',
    size: '1024x1024',
    quality: 'standard',
    style: 'natural',
  },

  cache: {},

  prompts: {
    'LS-001': 'Professional HVAC service clipboard with clean white form sheets, stainless steel clipboard, warm workshop background, soft natural lighting, product photography style, no text visible, commercial photography',
    'LS-002': 'Plumbing dispatch clipboard with organized checklist forms, blue-collar work truck interior background, professional natural lighting, no text visible, clean product shot',
    'LS-003': 'Electrician inspection clipboard with neat form stack, commercial building background blur, crisp overhead lighting, professional product photography, no text',
    'LS-004': 'Lawn care weekly planner clipboard on green grass background, morning light, organized route sheet visible but no readable text, professional flatlay style',
    'LS-005': 'Auto detailing intake forms on luxury car hood, premium detailing shop background, warm professional lighting, no text visible, high-end product photography',
    'LS-006': 'Pest control service cards fanned out on clean surface, professional office background, neutral lighting, no readable text, clean product photography',
    'LS-007': 'Roofing change order documents on construction clipboard, rooftop background blur, natural daylight, professional documentation photography, no readable text',
    'LS-008': 'Pressure washing route sheet on clipboard, clean driveway background, bright outdoor lighting, no text visible, professional product photography',
    'LS-009': 'Appliance repair parts tracker form on workshop workbench, tools background blur, warm shop lighting, no readable text, professional product shot',
    'LS-010': 'Handyman materials list on clipboard, home improvement background, natural lighting, clean professional product photography, no text',
    'LS-011': 'Mobile mechanic service form on clipboard beside vehicle engine bay, professional automotive photography, no readable text, natural light',
    'LS-012': 'Locksmith authorization form on dark clipboard, professional locksmith shop background, moody professional lighting, no readable text',
    'LS-013': 'Painting prep checklist on clipboard beside paint roller and sample cards, clean studio background, bright natural lighting, no readable text',
    'LS-014': 'Snow removal trigger checklist on clipboard in snowy setting, winter professional photography, no readable text, clean product shot',
    'LS-015': 'Window cleaning client packet on clipboard, bright clean glass building background, natural daylight, professional product photography, no readable text',
    'LS-016': 'Pool service chemical log on clipboard beside sparkling pool, outdoor summer photography, warm lighting, no readable text, professional product shot',
    'LS-017': 'Flooring estimate matrix on clipboard beside tile and wood flooring samples, professional interior photography, no readable text',
    'LS-018': 'Construction daily site report on aluminum clipboard, active construction site background blur, natural outdoor lighting, no readable text',
    'LS-019': 'Septic service pump log on clipboard, rural professional setting, clean daylight, no readable text, professional documentation photography',
    'LS-020': 'Professional service fee addendum on clean desk, modern office background, neutral lighting, no readable text, clean corporate product photography',
  },

  generate: function(listingId) {
    var self = ImageGen;

    if (!self.config.apiKey) {
      return Promise.resolve({ error: 'no_key', placeholder: self.placeholder(listingId) });
    }

    var prompt = self.prompts[listingId];
    if (!prompt) {
      return Promise.resolve({ error: 'no_prompt', placeholder: self.placeholder(listingId) });
    }

    return fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + self.config.apiKey,
      },
      body: JSON.stringify({
        model: self.config.model,
        prompt: prompt,
        n: 1,
        size: self.config.size,
        quality: self.config.quality,
        style: self.config.style,
      }),
    })
    .then(function(res) {
      return res.json().then(function(data) {
        if (!res.ok) {
          var errMsg = (data.error && data.error.message) || ('HTTP ' + res.status);
          var result = { error: errMsg, placeholder: self.placeholder(listingId) };
          return result;
        }
        var url = data.data && data.data[0] && data.data[0].url;
        if (!url) {
          return { error: 'no_url_in_response', placeholder: self.placeholder(listingId) };
        }
        var result = { url: url, listingId: listingId, prompt: prompt };
        self.cache[listingId] = result;
        try {
          localStorage.setItem('atlas_image_cache', JSON.stringify(self.cache));
        } catch(e) {}
        return result;
      });
    })
    .catch(function(err) {
      return { error: err.message || 'fetch_failed', placeholder: self.placeholder(listingId) };
    });
  },

  generateAll: function(listingIds, onProgress) {
    var self = ImageGen;
    var results = [];
    var total = listingIds.length;

    function next(index) {
      if (index >= total) {
        return Promise.resolve(results);
      }
      var id = listingIds[index];
      return self.generate(id).then(function(result) {
        results.push(result);
        if (typeof onProgress === 'function') {
          onProgress(id, index, total);
        }
        if (index < total - 1) {
          return new Promise(function(resolve) {
            setTimeout(function() { resolve(next(index + 1)); }, 500);
          });
        }
        return next(index + 1);
      });
    }

    return next(0);
  },

  getImage: function(listingId) {
    var cached = ImageGen.cache[listingId];
    if (cached && cached.url) {
      return cached.url;
    }
    return ImageGen.placeholder(listingId);
  },

  placeholder: function(listingId) {
    var svg = [
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">',
      '<defs>',
      '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
      '<stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />',
      '<stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />',
      '</linearGradient>',
      '</defs>',
      '<rect width="400" height="400" fill="url(#bg)" />',
      '<text x="200" y="190" font-family="serif" font-size="72" fill="#ffffff" opacity="0.6" text-anchor="middle" dominant-baseline="middle">&#x2B21;</text>',
      '<text x="200" y="370" font-family="monospace" font-size="13" fill="#8888aa" text-anchor="middle">' + (listingId || '') + '</text>',
      '</svg>',
    ].join('');
    return 'data:image/svg+xml;base64,' + btoa(svg);
  },

  clearCache: function() {
    ImageGen.cache = {};
    try { localStorage.removeItem('atlas_image_cache'); } catch(e) {}
  },

  statusBadgeHTML: function(listingId) {
    var cached = ImageGen.cache[listingId];
    if (cached && cached.url) {
      return '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;background:#d1fae5;color:#065f46;font-size:12px;font-weight:600;">&#10003; Image Ready</span>';
    }
    return '<button onclick="ImageGen.generate(\'' + listingId + '\').then(function(r){ if(r.url){ location.reload(); } else { alert(\'Error: \' + r.error); } })" style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:12px;background:#fff3cd;color:#92400e;font-size:12px;font-weight:600;border:1px solid #f59e0b;cursor:pointer;">Generate Image</button>';
  },

  settingsHTML: function() {
    var totalIds = Object.keys(ImageGen.prompts).length;
    var cachedCount = Object.keys(ImageGen.cache).filter(function(id) {
      return ImageGen.cache[id] && ImageGen.cache[id].url;
    }).length;
    var missingCount = totalIds - cachedCount;

    return [
      '<div style="display:flex;flex-direction:column;gap:12px;padding:16px;background:#f8f9fa;border-radius:8px;max-width:480px;">',
      '  <h3 style="margin:0;font-size:15px;font-weight:700;color:#1a1a2e;">Image Generation Settings</h3>',
      '  <div style="display:flex;flex-direction:column;gap:6px;">',
      '    <label style="font-size:13px;font-weight:600;color:#374151;">OpenAI API Key</label>',
      '    <div style="display:flex;gap:8px;">',
      '      <input id="atlas-openai-key-input" type="password" placeholder="sk-..." value="' + (ImageGen.config.apiKey || '') + '" style="flex:1;padding:8px 10px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;font-family:monospace;" />',
      '      <button onclick="ImageGen.setApiKey(document.getElementById(\'atlas-openai-key-input\').value);this.textContent=\'Saved!\';" style="padding:8px 14px;background:#4f46e5;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">Save Key</button>',
      '    </div>',
      '  </div>',
      '  <div style="font-size:13px;color:#6b7280;">',
      '    Queue status: <strong>' + cachedCount + ' / ' + totalIds + '</strong> images generated',
      '    ' + (missingCount > 0 ? '(<span style="color:#d97706;">' + missingCount + ' missing</span>)' : '(<span style="color:#059669;">all done</span>)'),
      '  </div>',
      '  <button onclick="(function(){ var ids=Object.keys(ImageGen.prompts).filter(function(id){ return !(ImageGen.cache[id]&&ImageGen.cache[id].url); }); if(!ids.length){ alert(\'All images already generated.\'); return; } if(!ImageGen.config.apiKey){ alert(\'Please save your API key first.\'); return; } ImageGen.generateAll(ids, function(id,i,t){ console.log(\'Generated \'+id+\' (\'+( i+1)+\'/\'+t+\')\'); }); })();" style="padding:9px 16px;background:#059669;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">Generate All Missing (' + missingCount + ')</button>',
      '</div>',
    ].join('\n');
  },

  setApiKey: function(key) {
    ImageGen.config.apiKey = key;
    try { localStorage.setItem('atlas_openai_key', key); } catch(e) {}
  },

};

// Init: restore persisted key and cache
(function() {
  try {
    var k = localStorage.getItem('atlas_openai_key');
    if (k) ImageGen.config.apiKey = k;
  } catch(e) {}
  try {
    var c = localStorage.getItem('atlas_image_cache');
    if (c) ImageGen.cache = JSON.parse(c);
  } catch(e) {}
})();

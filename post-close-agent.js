/**
 * post-close-agent.js
 * Agent Atlas — Post-Close Conversion Agent
 * Maximizes reviews, repeat purchases, and bundle upsells after every Etsy sale.
 * No ES modules. Exposes global PostCloseAgent.
 */

(function (global) {
  'use strict';

  // ─── Utilities ────────────────────────────────────────────────────────────

  var _idCounter = 1000;
  function uid() { return 'pca-' + (++_idCounter) + '-' + Date.now(); }

  function daysFromNow(n) {
    var d = new Date();
    d.setDate(d.getDate() + n);
    return d;
  }

  function daysUntil(date) {
    var now = new Date();
    var diff = new Date(date) - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  function fmt(date) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  // ─── Category detection ────────────────────────────────────────────────────

  var CATEGORIES = {
    hvac:          ['hvac', 'heating', 'cooling', 'air condition', 'furnace', 'service call'],
    lawn:          ['lawn', 'landscap', 'mow', 'crew planner', 'yard', 'turf'],
    plumbing:      ['plumb', 'pipe', 'drain', 'water heater', 'leak'],
    electrical:    ['electric', 'wiring', 'panel', 'circuit', 'outlet'],
    autodetail:    ['detail', 'auto detail', 'car wash', 'ceramic', 'polish'],
    pestcontrol:   ['pest', 'exterminator', 'termite', 'rodent', 'bug'],
    roofing:       ['roof', 'shingle', 'gutter', 'flashing', 'leak'],
  };

  function detectCategory(listing) {
    var title = (listing || '').toLowerCase();
    for (var cat in CATEGORIES) {
      var keywords = CATEGORIES[cat];
      for (var i = 0; i < keywords.length; i++) {
        if (title.indexOf(keywords[i]) !== -1) return cat;
      }
    }
    return 'generic';
  }

  // ─── Message library ───────────────────────────────────────────────────────

  var MESSAGES = {

    // ── Touch 1: Day 2 — Delivery confirmation + usage tip ──────────────────

    touch1: {
      hvac: function (name) {
        return (
          'Hi ' + name + ' — just wanted to make sure your HVAC service call template downloaded without any issues. ' +
          'If you open it in Chrome and hit Print, you can save it as a PDF for your team — most technicians find it easier to pull up on a tablet than digging for paper forms.\n\n' +
          'A quick tip from other HVAC operators: pre-fill your company name and license number before printing so every copy goes out branded. Saves a step every single time.\n\n' +
          'Hope it makes dispatch a little smoother. — Shane at Agent Atlas'
        );
      },
      lawn: function (name) {
        return (
          'Hi ' + name + ' — hope the crew planner is already on someone\'s clipboard. A lot of lawn operators print a fresh one each Sunday night so Monday morning starts clean — routes mapped, assignments clear, no back-and-forth.\n\n' +
          'Quick tip: if your crew uses different equipment on different properties, there\'s a notes column you can use to flag mower height or any property-specific instructions before they head out.\n\n' +
          'Let me know if you have any questions about the layout. — Shane at Agent Atlas'
        );
      },
      plumbing: function (name) {
        return (
          'Hi ' + name + ' — just checking in to make sure the plumbing service form downloaded cleanly. ' +
          'These work great printed as a two-sided sheet — job details on the front, materials and sign-off on the back. Keeps the truck neat and customers impressed.\n\n' +
          'A lot of plumbers tell me they fill in their flat-rate pricing before printing so technicians aren\'t doing math on the job. Worth trying if you haven\'t already.\n\n' +
          'Hope it saves you some paperwork. — Shane at Agent Atlas'
        );
      },
      electrical: function (name) {
        return (
          'Hi ' + name + ' — just making sure the electrical inspection or work order template came through fine. ' +
          'These print cleanly at 8.5×11 — if you\'re laminating a blank for the truck, keep one on the clipboard and fill in with a dry-erase marker.\n\n' +
          'Tip: a lot of electricians add their license number and insurance cert number to the header before printing — it covers the compliance box right away on any job.\n\n' +
          'Let me know if anything looks off. — Shane at Agent Atlas'
        );
      },
      autodetail: function (name) {
        return (
          'Hi ' + name + ' — hope the detailing form is already saving you time at check-in. ' +
          'The vehicle condition section up front is the part clients notice most — it protects you and sets a professional tone before a single towel touches the paint.\n\n' +
          'Quick tip: print a small stack and keep them at the front desk or in the bay — some detailers have clients sign right there while the car is being pulled in. Makes the whole process look polished.\n\n' +
          'Good luck with the bookings. — Shane at Agent Atlas'
        );
      },
      pestcontrol: function (name) {
        return (
          'Hi ' + name + ' — just wanted to confirm the pest control service report downloaded okay. ' +
          'These are designed to work as leave-behinds — a copy for the customer, one for your records. Most inspectors find it builds a lot of trust when the client can see exactly what was treated and where.\n\n' +
          'Tip: filling in your chemical application details before the appointment so the client copy looks thorough without extra writing on-site.\n\n' +
          'Hope it makes the job cleaner. — Shane at Agent Atlas'
        );
      },
      roofing: function (name) {
        return (
          'Hi ' + name + ' — just checking that the roofing inspection or estimate form came through without issues. ' +
          'These are built to hold up on a tablet or printed — a lot of roofers take photos and attach them digitally, then print the summary for the homeowner meeting.\n\n' +
          'Quick tip: the materials section has room for brand/model notes — helps with warranty documentation down the road and gives clients confidence you\'re tracking the details.\n\n' +
          'Good luck with the season ahead. — Shane at Agent Atlas'
        );
      },
      generic: function (name) {
        return (
          'Hi ' + name + ' — just wanted to make sure your template downloaded without any hiccups. ' +
          'These are built to print cleanly at 8.5×11, or you can fill them in digitally if that\'s easier for your workflow.\n\n' +
          'A quick tip: most business owners customize the header with their logo and contact info before printing a stack — makes everything look professional from day one.\n\n' +
          'Let me know if you need anything. — Shane at Agent Atlas'
        );
      },
    },

    // ── Touch 2: Day 5 — "How is it working?" + soft review nudge ───────────

    touch2: {
      hvac: function (name) {
        return (
          'Hi ' + name + ' — checking in after a few days. How\'s the HVAC service call form working out in the field?\n\n' +
          'If it\'s been useful — and this is totally optional — a quick review on Etsy helps other HVAC business owners find it when they\'re searching for the same thing you were. Takes about 30 seconds and genuinely makes a difference for a small shop like mine.\n\n' +
          'Either way, I hope dispatch is running smoother. — Shane at Agent Atlas'
        );
      },
      lawn: function (name) {
        return (
          'Hi ' + name + ' — has the crew planner been getting used? Would love to hear if it\'s making Monday mornings any easier.\n\n' +
          'If it\'s earning its keep, a short review on Etsy goes a long way — it helps other lawn and landscaping operators find it when they\'re looking for the same solution. Completely optional, and 30 seconds is all it takes.\n\n' +
          'Hope the routes are running clean. — Shane at Agent Atlas'
        );
      },
      plumbing: function (name) {
        return (
          'Hi ' + name + ' — just following up. Has the plumbing form been getting used on jobs?\n\n' +
          'If it\'s been a good fit, I\'d really appreciate a quick review on Etsy — it helps other plumbers find it when they\'re looking for exactly this kind of form. Takes about 30 seconds.\n\n' +
          'Thanks for supporting the shop. — Shane at Agent Atlas'
        );
      },
      electrical: function (name) {
        return (
          'Hi ' + name + ' — hope the electrical template has been pulling its weight on jobs. Any feedback is welcome.\n\n' +
          'If it\'s been useful, a short Etsy review really helps other electricians discover it — it\'s the best way for a small shop to get found. No pressure at all, but it means a lot if you have 30 seconds.\n\n' +
          '— Shane at Agent Atlas'
        );
      },
      autodetail: function (name) {
        return (
          'Hi ' + name + ' — how\'s the detailing intake form working out? Curious if the pre-inspection section is doing its job.\n\n' +
          'If it\'s been a good addition to your workflow, an Etsy review helps other detailers find it when they\'re searching. Takes 30 seconds and honestly makes the biggest difference for listings like mine.\n\n' +
          'Hope the bookings are rolling in. — Shane at Agent Atlas'
        );
      },
      pestcontrol: function (name) {
        return (
          'Hi ' + name + ' — just checking in. Is the pest control service form working well as a leave-behind for customers?\n\n' +
          'If it\'s been useful, a quick review on Etsy helps other pest control operators find it — that\'s how small Etsy shops like mine grow. Only takes about 30 seconds if you have a moment.\n\n' +
          'Appreciate your support. — Shane at Agent Atlas'
        );
      },
      roofing: function (name) {
        return (
          'Hi ' + name + ' — hope the roofing inspection template has been handy out in the field. Any feedback on the layout is always welcome.\n\n' +
          'If it\'s been earning its spot in your process, a short review on Etsy helps other roofing contractors find it. Completely up to you — just 30 seconds if you\'re willing.\n\n' +
          '— Shane at Agent Atlas'
        );
      },
      generic: function (name) {
        return (
          'Hi ' + name + ' — just following up after a few days. How\'s the template working in your business?\n\n' +
          'If it\'s been saving you time, a quick Etsy review helps other business owners find it when they need the same thing. It takes about 30 seconds and is honestly the biggest way you can support a small shop like mine.\n\n' +
          'Either way, thanks for the purchase. — Shane at Agent Atlas'
        );
      },
    },

    // ── Touch 3: Day 10 — Final review request with direct link ─────────────

    touch3: {
      hvac: function (name) {
        return (
          'Hi ' + name + ' — last check-in, I promise. If the HVAC service call template has saved you time on dispatch or paperwork, I have one small ask:\n\n' +
          'Could you leave a quick review on Etsy? Just navigate to your Etsy account → Purchases → find the order → "Leave a Review." Takes about 30 seconds.\n\n' +
          'A review from an actual HVAC operator helps other shop owners trust the template before they buy. It\'s the single most useful thing a buyer can do for a small Etsy seller — and it costs nothing.\n\n' +
          'If it didn\'t work well for some reason, just reply here and I\'ll make it right. — Shane at Agent Atlas'
        );
      },
      lawn: function (name) {
        return (
          'Hi ' + name + ' — one last message. If the crew planner has been putting structure into your week, would you be willing to leave a review on Etsy?\n\n' +
          'Etsy → Your Account → Purchases → find the order → Leave a Review. About 30 seconds.\n\n' +
          'Reviews from real lawn and landscaping operators are what help other business owners find this listing when they\'re searching. It makes a genuine difference for a small shop.\n\n' +
          'If anything wasn\'t right, just let me know — I\'d rather fix it than leave you unhappy. — Shane at Agent Atlas'
        );
      },
      plumbing: function (name) {
        return (
          'Hi ' + name + ' — final message from me. If the plumbing form has been useful on jobs, I\'d really appreciate a review on Etsy:\n\n' +
          'Etsy → Purchases → find this order → Leave a Review. Takes 30 seconds.\n\n' +
          'It helps other plumbers find the template when they need it — that\'s genuinely how Etsy search works for small sellers like me.\n\n' +
          'And if there was anything you didn\'t love about it, just reply — I can fix it for you. — Shane at Agent Atlas'
        );
      },
      electrical: function (name) {
        return (
          'Hi ' + name + ' — this is my last follow-up. If the electrical template has been pulling its weight, a 30-second Etsy review means the world:\n\n' +
          'Etsy → Your Account → Purchases → Leave a Review.\n\n' +
          'Other electricians search Etsy for exactly this kind of form — a review from someone who\'s actually used it on jobs is what gives them confidence to buy.\n\n' +
          'Thanks either way. — Shane at Agent Atlas'
        );
      },
      autodetail: function (name) {
        return (
          'Hi ' + name + ' — last one from me. If the detailing form has been making your check-in process cleaner, would you mind leaving a quick Etsy review?\n\n' +
          'Etsy → Purchases → find the order → Leave a Review. About 30 seconds.\n\n' +
          'Detailers who leave reviews help other shop owners find this listing when they\'re searching. That\'s the whole engine for a small Etsy business.\n\n' +
          'If anything wasn\'t perfect, just reply and I\'ll sort it out. — Shane at Agent Atlas'
        );
      },
      pestcontrol: function (name) {
        return (
          'Hi ' + name + ' — last message, I promise. If the pest control service report has been a useful part of your process, a quick Etsy review would help me a lot:\n\n' +
          'Etsy → Your Account → Purchases → Leave a Review. 30 seconds.\n\n' +
          'It\'s how other pest control operators find the listing when they\'re looking for the same thing. Real reviews from real users are everything on Etsy.\n\n' +
          'If something wasn\'t right, I\'d rather know so I can fix it. — Shane at Agent Atlas'
        );
      },
      roofing: function (name) {
        return (
          'Hi ' + name + ' — this is my last follow-up. If the roofing template has been useful in the field, I\'d be grateful for a quick Etsy review:\n\n' +
          'Etsy → Purchases → find the order → Leave a Review. Takes about 30 seconds.\n\n' +
          'Roofing contractors who review help other contractors find it when they\'re searching Etsy. Small shops live and die by those reviews.\n\n' +
          'If anything wasn\'t what you expected, just reply — I\'ll make it right. — Shane at Agent Atlas'
        );
      },
      generic: function (name) {
        return (
          'Hi ' + name + ' — last message from me. If the template has been saving you time, would you be willing to leave a quick review on Etsy?\n\n' +
          'Etsy → Your Account → Purchases → find the order → Leave a Review. About 30 seconds.\n\n' +
          'Reviews from real buyers are how other business owners find listings like mine — it\'s genuinely the most impactful thing a buyer can do for a small Etsy seller.\n\n' +
          'If it wasn\'t the right fit, just reply and I\'ll make it right. — Shane at Agent Atlas'
        );
      },
    },

    // ── Upsell: Day 7 ─────────────────────────────────────────────────────

    upsell: {
      hvac: function (name, bundleUrl) {
        return (
          'Hi ' + name + ' — one quick heads-up. We put together a full HVAC Business Bundle that includes the service call template you picked up, plus an estimate form, a maintenance agreement, a customer info sheet, and a seasonal tune-up checklist.\n\n' +
          'Buying them together saves you compared to picking them up one at a time, and most HVAC operators end up needing all of them within the first few months anyway.\n\n' +
          'If you\'re interested: ' + (bundleUrl || '[BUNDLE_LISTING_URL]') + '\n\n' +
          'No pressure — just wanted to make sure you knew it existed. — Shane at Agent Atlas'
        );
      },
      lawn: function (name, bundleUrl) {
        return (
          'Hi ' + name + ' — wanted to let you know about a full Lawn & Landscaping Business Bundle we put together. It includes the crew planner you have, plus a client estimate sheet, a seasonal schedule template, a route log, and a job completion form.\n\n' +
          'Everything a lawn operation needs for paperwork — bundled together at a better price than buying each one separately.\n\n' +
          (bundleUrl || '[BUNDLE_LISTING_URL]') + '\n\n' +
          'Thought it might be worth a look. — Shane at Agent Atlas'
        );
      },
      generic: function (name, bundleUrl) {
        return (
          'Hi ' + name + ' — just wanted to mention that we have a full trade business bundle that includes the template you purchased plus several others that pair well with it.\n\n' +
          'It\'s a better value than buying each form individually, and most business owners find they need the others within a few weeks anyway.\n\n' +
          'Take a look if you\'re curious: ' + (bundleUrl || '[BUNDLE_LISTING_URL]') + '\n\n' +
          '— Shane at Agent Atlas'
        );
      },
    },
  };

  function getMsg(group, cat, name, extra) {
    var fn = (MESSAGES[group] && MESSAGES[group][cat]) || MESSAGES[group].generic;
    return fn(name, extra);
  }

  // ─── Core Agent ────────────────────────────────────────────────────────────

  var PostCloseAgent = {

    queue: [],

    reviewStats: {
      requested: 0,
      received: 0,
      rate: 0,
      target: 0.25,
    },

    _orders: {},   // orderId → order record
    _reviews: [],  // { orderId, stars, receivedAt }

    // ── Build review sequence ────────────────────────────────────────────────

    buildReviewSequence: function (order) {
      var name = order.buyerName || 'there';
      var cat  = detectCategory(order.listingTitle || order.listingId || '');
      return [
        { day: 2,  type: 'review_touch_1', message: getMsg('touch1', cat, name) },
        { day: 5,  type: 'review_touch_2', message: getMsg('touch2', cat, name) },
        { day: 10, type: 'review_touch_3', message: getMsg('touch3', cat, name) },
      ];
    },

    // ── Build upsell sequence ────────────────────────────────────────────────

    buildUpsellSequence: function (order) {
      var name = order.buyerName || 'there';
      var cat  = detectCategory(order.listingTitle || order.listingId || '');
      var upsellFn = (MESSAGES.upsell[cat] || MESSAGES.upsell.generic);
      return [
        { day: 7, type: 'upsell_touch_1', message: upsellFn(name, order.bundleListingUrl || null) },
      ];
    },

    // ── Google review message (for product file cover page) ─────────────────

    buildGoogleReviewMessage: function (businessName, googleReviewUrl) {
      var trade = businessName || 'your business';
      return (
        '───────────────────────────────────────────\n' +
        'Running a trade business? If this template saved you time,\n' +
        'we\'d love a Google review for ' + trade + '.\n\n' +
        'It only takes 30 seconds and helps other local tradespeople\n' +
        'find tools like this when they need them.\n\n' +
        'Leave a review here:\n' + (googleReviewUrl || '[GOOGLE_REVIEW_URL]') + '\n' +
        '───────────────────────────────────────────\n' +
        'Thank you for supporting Agent Atlas.'
      );
    },

    // ── Immediate delivery message ───────────────────────────────────────────

    deliveryMessage: function (listingId, buyerName) {
      var name = buyerName || 'there';
      var cat  = detectCategory(listingId || '');
      var tips = {
        hvac:       'open it in Chrome → Print → Save as PDF for a clean digital copy your team can pull up on any device',
        lawn:       'print a fresh copy each Sunday night — most crew leads keep it on a clipboard to start Monday right',
        plumbing:   'print it two-sided: job details on the front, parts and sign-off on the back — keeps your trucks organized',
        electrical: 'add your license number to the header before printing — covers compliance documentation in one step',
        autodetail: 'have clients sign the vehicle condition section at drop-off — it protects you and looks polished',
        pestcontrol:'fill in your chemical and application details before the appointment so the customer copy looks thorough without extra writing on-site',
        roofing:    'attach site photos digitally and print the summary sheet for the homeowner meeting — two-step close in one document',
        generic:    'customize the header with your business name and contact info before printing a stack',
      };
      return (
        'Hi ' + name + ' — your download is ready. Thank you for the purchase.\n\n' +
        'Quick usage tip: ' + (tips[cat] || tips.generic) + '.\n\n' +
        'If you run into any download issues or the file doesn\'t open correctly, just reply here and I\'ll sort it out right away.\n\n' +
        'Hope it earns its keep. — Shane at Agent Atlas'
      );
    },

    // ── Add order to queue ───────────────────────────────────────────────────

    addOrder: function (order) {
      if (!order || !order.orderId) {
        console.warn('PostCloseAgent.addOrder: order must have an orderId');
        return;
      }

      this._orders[order.orderId] = order;

      var reviewSeq = this.buildReviewSequence(order);
      var upsellSeq = this.buildUpsellSequence(order);
      var allTouches = reviewSeq.concat(upsellSeq);

      for (var i = 0; i < allTouches.length; i++) {
        var touch = allTouches[i];
        var action = {
          id:           uid(),
          type:         touch.type,
          buyerName:    order.buyerName || 'there',
          listingId:    order.listingId || '',
          listingTitle: order.listingTitle || '',
          orderId:      order.orderId,
          status:       'pending',
          scheduledAt:  daysFromNow(touch.day),
          completedAt:  null,
          message:      touch.message,
          result:       null,
        };
        this.queue.push(action);
      }

      // Count review touches toward requested stat
      this.reviewStats.requested += reviewSeq.length;
      this._recalcRate();

      return this._orders[order.orderId];
    },

    // ── Process queue — returns all due actions ──────────────────────────────

    processQueue: function () {
      var now = new Date();
      var due = [];
      for (var i = 0; i < this.queue.length; i++) {
        var a = this.queue[i];
        if (a.status === 'pending' && new Date(a.scheduledAt) <= now) {
          due.push(a);
        }
      }
      return due;
    },

    // ── Mark action complete ─────────────────────────────────────────────────

    markComplete: function (actionId, result) {
      for (var i = 0; i < this.queue.length; i++) {
        if (this.queue[i].id === actionId) {
          this.queue[i].status      = 'complete';
          this.queue[i].completedAt = new Date();
          this.queue[i].result      = result || 'sent';
          return this.queue[i];
        }
      }
      console.warn('PostCloseAgent.markComplete: action not found —', actionId);
      return null;
    },

    // ── Record a received review ─────────────────────────────────────────────

    recordReview: function (orderId, stars) {
      this._reviews.push({ orderId: orderId, stars: stars || 5, receivedAt: new Date() });
      this.reviewStats.received++;
      this._recalcRate();
    },

    _recalcRate: function () {
      var req = this.reviewStats.requested;
      this.reviewStats.rate = req > 0 ? Math.round((this.reviewStats.received / req) * 100) / 100 : 0;
    },

    // ── Stats ────────────────────────────────────────────────────────────────

    getStats: function () {
      var totalOrders      = Object.keys(this._orders).length;
      var reviewsRequested = this.queue.filter(function (a) { return a.type.indexOf('review') === 0; }).length;
      var reviewsSent      = this.queue.filter(function (a) { return a.type.indexOf('review') === 0 && a.status === 'complete'; }).length;
      var upsellsSent      = this.queue.filter(function (a) { return a.type === 'upsell_touch_1' && a.status === 'complete'; }).length;
      var upsellsPending   = this.queue.filter(function (a) { return a.type === 'upsell_touch_1' && a.status === 'pending'; }).length;
      return {
        totalOrders:         totalOrders,
        reviewsRequested:    reviewsRequested,
        reviewsSent:         reviewsSent,
        reviewsReceived:     this.reviewStats.received,
        upsellsSent:         upsellsSent,
        upsellsPending:      upsellsPending,
        upsellsConverted:    0, // update manually via markComplete result tagging
        estimatedReviewRate: this.reviewStats.rate,
        targetReviewRate:    this.reviewStats.target,
      };
    },

    // ── Get message copy for an action ──────────────────────────────────────

    getMessageCopy: function (actionId) {
      for (var i = 0; i < this.queue.length; i++) {
        if (this.queue[i].id === actionId) {
          return this.queue[i].message;
        }
      }
      return null;
    },

    // ── Seed demo orders ─────────────────────────────────────────────────────

    seedDemoOrders: function () {
      var demos = [
        {
          orderId:      'DEMO-001',
          buyerName:    'Marcus',
          listingId:    'hvac-service-call-template',
          listingTitle: 'HVAC Service Call Form — Printable PDF Template',
          purchasedAt:  new Date(),
        },
        {
          orderId:      'DEMO-002',
          buyerName:    'Priya',
          listingId:    'lawn-crew-planner-weekly',
          listingTitle: 'Lawn Care Crew Planner — Weekly Schedule Template',
          purchasedAt:  new Date(),
        },
        {
          orderId:      'DEMO-003',
          buyerName:    'Derek',
          listingId:    'roofing-inspection-form',
          listingTitle: 'Roofing Inspection Report — Printable Contractor Form',
          purchasedAt:  new Date(),
        },
      ];
      for (var i = 0; i < demos.length; i++) {
        this.addOrder(demos[i]);
      }
      // Simulate Marcus already got touch 1 sent
      var marcusTouch1 = this.queue.find(function (a) {
        return a.orderId === 'DEMO-001' && a.type === 'review_touch_1';
      });
      if (marcusTouch1) this.markComplete(marcusTouch1.id, 'sent');

      console.log('PostCloseAgent: 3 demo orders seeded.');
    },

    // ── Dashboard HTML ───────────────────────────────────────────────────────

    dashboardHTML: function () {
      var stats     = this.getStats();
      var rateColor = this.reviewStats.rate >= this.reviewStats.target ? '#22c55e' : '#f59e0b';
      var ratePct   = Math.round(this.reviewStats.rate * 100);
      var targetPct = Math.round(this.reviewStats.target * 100);
      var barWidth  = Math.min(100, Math.round((ratePct / targetPct) * 100));

      // Build queue rows
      var rows = '';
      var pending = this.queue.filter(function (a) { return a.status === 'pending'; });
      pending.sort(function (a, b) { return new Date(a.scheduledAt) - new Date(b.scheduledAt); });

      for (var i = 0; i < pending.length; i++) {
        var a = pending[i];
        var days = daysUntil(a.scheduledAt);
        var badge = a.type.indexOf('upsell') === 0
          ? '<span style="background:#7c3aed;color:#fff;padding:2px 8px;border-radius:9px;font-size:11px;font-weight:600;">UPSELL</span>'
          : '<span style="background:#2563eb;color:#fff;padding:2px 8px;border-radius:9px;font-size:11px;font-weight:600;">REVIEW</span>';
        var countdown = days <= 0
          ? '<span style="color:#ef4444;font-weight:700;">DUE NOW</span>'
          : '<span style="color:#6b7280;">in ' + days + ' day' + (days === 1 ? '' : 's') + '</span>';
        var msgEscaped = a.message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
        rows += (
          '<div style="border:1px solid #e5e7eb;border-radius:10px;padding:16px;margin-bottom:12px;background:#fff;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
              '<div>' + badge + '&nbsp;&nbsp;<strong>' + a.buyerName + '</strong> &mdash; <span style="color:#6b7280;font-size:13px;">' + (a.listingTitle || a.listingId) + '</span></div>' +
              '<div style="font-size:13px;">' + countdown + ' &bull; <span style="color:#9ca3af;">' + fmt(a.scheduledAt) + '</span></div>' +
            '</div>' +
            '<div style="background:#f9fafb;border-radius:6px;padding:12px;font-size:13px;line-height:1.7;white-space:pre-wrap;font-family:Georgia,serif;color:#374151;">' + msgEscaped + '</div>' +
            '<div style="margin-top:10px;display:flex;gap:8px;">' +
              '<button onclick="PostCloseAgent.markComplete(\'' + a.id + '\',\'sent\');this.closest(\'div[style]\').remove();" style="background:#16a34a;color:#fff;border:none;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:13px;">Mark Sent</button>' +
              '<button onclick="navigator.clipboard&&navigator.clipboard.writeText(PostCloseAgent.getMessageCopy(\'' + a.id + '\'));" style="background:#f3f4f6;color:#374151;border:1px solid #d1d5db;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:13px;">Copy Message</button>' +
            '</div>' +
          '</div>'
        );
      }

      if (!rows) {
        rows = '<p style="color:#9ca3af;text-align:center;padding:24px 0;">No pending actions. Add an order or seed demo data to get started.</p>';
      }

      return (
        '<!DOCTYPE html><html><head><meta charset="UTF-8">' +
        '<title>Agent Atlas — Post-Close Agent</title>' +
        '<style>*{box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f3f4f6;margin:0;padding:24px;}</style>' +
        '</head><body>' +
        '<div style="max-width:860px;margin:0 auto;">' +

          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">' +
            '<div>' +
              '<h1 style="font-size:22px;font-weight:700;margin:0;color:#111827;">Agent Atlas — Post-Close Agent</h1>' +
              '<p style="color:#6b7280;margin:4px 0 0;font-size:14px;">Review sequences · Upsell pipeline · Conversion tracking</p>' +
            '</div>' +
            '<button onclick="PostCloseAgent.seedDemoOrders();document.body.innerHTML=PostCloseAgent.dashboardHTML();" style="background:#111827;color:#fff;border:none;border-radius:8px;padding:10px 18px;cursor:pointer;font-size:14px;font-weight:600;">+ Add Demo Orders</button>' +
          '</div>' +

          // Stats row
          '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">' +
            statCard('Total Orders',       stats.totalOrders,       '#2563eb') +
            statCard('Reviews Received',   stats.reviewsReceived,   '#16a34a') +
            statCard('Upsells Sent',       stats.upsellsSent,       '#7c3aed') +
            statCard('Pending Actions',    pending.length,          '#f59e0b') +
          '</div>' +

          // Review rate
          '<div style="background:#fff;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #e5e7eb;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
              '<span style="font-weight:600;font-size:15px;color:#111827;">Review Rate</span>' +
              '<span style="font-size:14px;color:' + rateColor + ';font-weight:700;">' + ratePct + '% &nbsp;/&nbsp; target ' + targetPct + '%</span>' +
            '</div>' +
            '<div style="background:#e5e7eb;border-radius:99px;height:10px;overflow:hidden;">' +
              '<div style="height:10px;border-radius:99px;background:' + rateColor + ';width:' + barWidth + '%;transition:width 0.4s;"></div>' +
            '</div>' +
            '<p style="font-size:12px;color:#9ca3af;margin:8px 0 0;">A 25%+ review rate is excellent for Etsy. Reviews received: ' + stats.reviewsReceived + ' from ' + stats.totalOrders + ' orders.</p>' +
          '</div>' +

          // Queue
          '<div style="background:#fff;border-radius:12px;padding:20px;border:1px solid #e5e7eb;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">' +
              '<h2 style="font-size:16px;font-weight:700;margin:0;color:#111827;">Pending Actions (' + pending.length + ')</h2>' +
              '<button onclick="var due=PostCloseAgent.processQueue();alert(due.length+\' action(s) are due now.\');" style="background:#2563eb;color:#fff;border:none;border-radius:6px;padding:8px 14px;cursor:pointer;font-size:13px;font-weight:600;">Process Queue</button>' +
            '</div>' +
            rows +
          '</div>' +

        '</div>' +
        '</body></html>'
      );

      function statCard(label, value, color) {
        return (
          '<div style="background:#fff;border-radius:10px;padding:16px;border:1px solid #e5e7eb;">' +
            '<div style="font-size:26px;font-weight:800;color:' + color + ';">' + value + '</div>' +
            '<div style="font-size:13px;color:#6b7280;margin-top:2px;">' + label + '</div>' +
          '</div>'
        );
      }
    },

  }; // end PostCloseAgent

  // Expose global
  global.PostCloseAgent = PostCloseAgent;

}(typeof window !== 'undefined' ? window : this));

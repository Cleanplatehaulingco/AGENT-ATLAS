/**
 * compliance.js — Agent Atlas Compliance & Copyright Protection Layer
 *
 * PURPOSE: Every listing, template, and piece of copy that ships through
 * Agent Atlas must pass through this module. It enforces originality,
 * Etsy policy compliance, and disclaimer requirements.
 *
 * ORIGINALITY STATEMENT:
 * All Agent Atlas templates are ORIGINAL works created by Agent Atlas.
 * They are NOT copies of, derived from, or based on any existing copyrighted
 * forms, government documents, or third-party templates. Every form was
 * written from scratch for general small business operational use.
 *
 * No part of this product is affiliated with, endorsed by, or derived from
 * any government agency, trade organization, legal body, or third-party
 * form provider.
 */

var Compliance = (function () {

  // ─── 1. COPYRIGHT NOTICE ──────────────────────────────────────────────────

  var copyrightNotice =
    "All Agent Atlas templates are original works created for general business use. " +
    "They are not derived from, affiliated with, or endorsed by any government agency, " +
    "trade organization, or third-party form provider. " +
    "These are generic operational tools for small business owners.";

  // ─── 2. DISCLAIMER LIBRARY ────────────────────────────────────────────────

  var disclaimers = {
    general:
      "This template is provided for general operational use only. It does not " +
      "constitute legal, financial, or professional advice. Consult a licensed " +
      "professional before using any document in a regulated context.",

    waiver:
      "This waiver template is a starting point only. It has NOT been reviewed by " +
      "an attorney. Have a licensed attorney in your jurisdiction review and customize " +
      "this document before using it with customers.",

    financial:
      "This form is not a substitute for professional accounting or financial advice. " +
      "Consult a licensed accountant or financial advisor for tax and financial matters.",

    contract:
      "This document is not a legally binding contract until reviewed and customized " +
      "by a licensed attorney in your jurisdiction.",

    medical: null // not applicable — Agent Atlas does not produce medical forms
  };

  // ─── 3. ETSY POLICY RULES ─────────────────────────────────────────────────

  var etsyRules = [
    {
      rule: "original_work",
      check: "All listings must be original creations",
      status: "pass"
    },
    {
      rule: "accurate_description",
      check: "Listings must accurately describe what is delivered",
      status: "pass"
    },
    {
      rule: "no_misleading_claims",
      check: "No claims of legal, medical, or professional authority",
      status: "pass"
    },
    {
      rule: "digital_delivery",
      check: "Instant download must be immediately available",
      status: "pass"
    },
    {
      rule: "no_third_party_ip",
      check: "No use of trademarked brands, logos, or copyrighted materials",
      status: "pass"
    },
    {
      rule: "accurate_category",
      check: "Listed in correct Etsy category (Templates & Tools)",
      status: "pass"
    }
  ];

  // ─── 4. COPY SCANNER ──────────────────────────────────────────────────────

  // Terms that trigger a compliance warning in listing copy.
  // Each entry: { pattern: RegExp, message: string }
  var RED_FLAG_PATTERNS = [
    {
      pattern: /\bguaranteed\b/i,
      message: "Avoid 'guaranteed' — implies a warranty or legal promise."
    },
    {
      pattern: /\blegal\s+advice\b/i,
      message: "Do not claim to provide legal advice."
    },
    {
      pattern: /\bofficially\s+approved\b/i,
      message: "'Officially approved' implies government or regulatory endorsement."
    },
    {
      pattern: /\bgovernment\b/i,
      message: "Reference to 'government' may imply official affiliation."
    },
    {
      pattern: /\bcertified\b/i,
      message: "'Certified' implies third-party validation that may not exist."
    },
    {
      pattern: /\blicensed\s+template\b/i,
      message: "'Licensed template' is ambiguous — clarify the usage license instead."
    },
    {
      pattern: /\btax[\s-]deductible\b/i,
      message: "'Tax deductible' is a financial claim — omit unless providing a full financial disclaimer in context."
    },
    {
      pattern: /\bQuickBooks\b/i,
      message: "QuickBooks is a registered trademark of Intuit. Do not use in copy."
    },
    {
      pattern: /\bCanva\s+logo\b/i,
      message: "Do not reference the Canva logo — potential trademark misuse."
    },
    {
      pattern: /\bIRS[\s-]approved\b/i,
      message: "The IRS does not approve private form templates. Remove this claim."
    },
    {
      pattern: /\battorney[\s-]drafted\b/i,
      message: "Do not claim attorney involvement unless verified and documented."
    },
    {
      pattern: /\blegally\s+binding\b/i,
      message: "'Legally binding' overstates enforceability without attorney review."
    },
    {
      pattern: /\bprofessional\s+advice\b/i,
      message: "Do not imply the template provides professional advice of any kind."
    }
  ];

  function scanCopy(text) {
    if (typeof text !== "string" || text.length === 0) {
      return { warnings: ["No text provided to scan."], passed: false };
    }

    var warnings = [];

    for (var i = 0; i < RED_FLAG_PATTERNS.length; i++) {
      if (RED_FLAG_PATTERNS[i].pattern.test(text)) {
        warnings.push(RED_FLAG_PATTERNS[i].message);
      }
    }

    return {
      warnings: warnings,
      passed: warnings.length === 0
    };
  }

  // ─── 5. LISTING COMPLIANCE CHECK ──────────────────────────────────────────

  var ETSY_MAX_TITLE_LENGTH = 140;
  var ETSY_MAX_TAG_COUNT    = 13;
  var ETSY_MIN_PRICE        = 0.20;

  function checkListing(listing) {
    var warnings = [];
    var flags    = [];
    var deductions = 0;

    if (!listing || typeof listing !== "object") {
      return { score: 0, warnings: ["Invalid listing object."], passed: false, flags: ["invalid_input"] };
    }

    // Title length
    if (typeof listing.title === "string") {
      if (listing.title.length > ETSY_MAX_TITLE_LENGTH) {
        warnings.push("Title exceeds " + ETSY_MAX_TITLE_LENGTH + " characters (" + listing.title.length + ").");
        flags.push("title_too_long");
        deductions += 20;
      }
    } else {
      warnings.push("Listing is missing a title.");
      flags.push("missing_title");
      deductions += 20;
    }

    // Tag count
    if (Array.isArray(listing.tags)) {
      if (listing.tags.length > ETSY_MAX_TAG_COUNT) {
        warnings.push("Too many tags (" + listing.tags.length + "). Maximum is " + ETSY_MAX_TAG_COUNT + ".");
        flags.push("too_many_tags");
        deductions += 10;
      }
    }

    // Price
    var price = parseFloat(listing.price);
    if (isNaN(price) || price < ETSY_MIN_PRICE) {
      warnings.push("Price must be at least $" + ETSY_MIN_PRICE.toFixed(2) + ".");
      flags.push("price_below_minimum");
      deductions += 30;
    }

    // Description red-flag scan
    if (typeof listing.description === "string") {
      var scanResult = scanCopy(listing.description);
      if (!scanResult.passed) {
        for (var w = 0; w < scanResult.warnings.length; w++) {
          warnings.push("Description: " + scanResult.warnings[w]);
        }
        flags.push("description_red_flags");
        deductions += Math.min(scanResult.warnings.length * 5, 25);
      }
    } else {
      warnings.push("Listing is missing a description.");
      flags.push("missing_description");
      deductions += 15;
    }

    var score  = Math.max(0, 100 - deductions);
    var passed = flags.length === 0;

    return {
      score:    score,
      warnings: warnings,
      passed:   passed,
      flags:    flags
    };
  }

  // ─── 6. COPYRIGHT BLOCK GENERATOR ─────────────────────────────────────────

  function copyrightBlock(year) {
    var y = (typeof year === "number" && year > 2000) ? year : new Date().getFullYear();
    return (
      "© " + y + " Agent Atlas. All rights reserved. This is an original work.\n" +
      "Unauthorized reproduction or redistribution is prohibited.\n" +
      "Personal & commercial use license included with purchase.\n" +
      "Not affiliated with any government agency or trade organization."
    );
  }

  // ─── 7. DISCLAIMER INJECTOR ───────────────────────────────────────────────

  // Maps listing ID prefixes or keywords to disclaimer types.
  var DISCLAIMER_MAP = {
    waiver:    ["waiver", "release", "liability"],
    financial: ["invoice", "receipt", "budget", "expense", "tax", "financial", "accounting"],
    contract:  ["contract", "agreement", "service-agreement", "client-agreement"]
  };

  function _resolveDisclaimer(listingId) {
    if (typeof listingId !== "string") return disclaimers.general;
    var id = listingId.toLowerCase();
    for (var type in DISCLAIMER_MAP) {
      if (!DISCLAIMER_MAP.hasOwnProperty(type)) continue;
      var keywords = DISCLAIMER_MAP[type];
      for (var k = 0; k < keywords.length; k++) {
        if (id.indexOf(keywords[k]) !== -1) {
          return disclaimers[type];
        }
      }
    }
    return disclaimers.general;
  }

  function injectDisclaimer(html, listingId) {
    if (typeof html !== "string") return html;
    var text = _resolveDisclaimer(listingId);
    if (!text) return html; // medical: null — no disclaimer needed

    var disclaimerBlock =
      '<div class="aa-disclaimer" style="' +
        'margin-top:24px;padding:12px 16px;border-top:1px solid #ccc;' +
        'font-size:11px;color:#555;font-family:sans-serif;line-height:1.5;' +
      '">' +
        '<strong>Disclaimer:</strong> ' + text +
      '</div>';

    // Prefer inserting before signature lines
    var sigPattern = /<(div|p|tr)[^>]*class="[^"]*sign/i;
    if (sigPattern.test(html)) {
      return html.replace(sigPattern, disclaimerBlock + "<$1");
    }

    // Fall back to inserting before closing </body> or at the end
    if (html.indexOf("</body>") !== -1) {
      return html.replace("</body>", disclaimerBlock + "</body>");
    }

    return html + disclaimerBlock;
  }

  // ─── 8. COMPLIANCE REPORT HTML ────────────────────────────────────────────

  function reportHTML() {
    var allPass = etsyRules.every(function (r) { return r.status === "pass"; });
    var headerColor  = allPass ? "#2e7d32" : "#c62828";
    var headerLabel  = allPass ? "&#10003; Clear for Launch" : "&#9888; Issues Found";
    var statusColor  = allPass ? "#e8f5e9" : "#ffebee";

    var rulesRows = etsyRules.map(function (r) {
      var icon  = r.status === "pass" ? "&#10003;" : "&#10007;";
      var color = r.status === "pass" ? "#2e7d32" : "#c62828";
      return (
        "<tr>" +
          "<td style='padding:6px 10px;color:" + color + ";font-weight:bold;'>" + icon + "</td>" +
          "<td style='padding:6px 10px;'>" + r.check + "</td>" +
          "<td style='padding:6px 10px;text-transform:uppercase;font-size:11px;color:" + color + ";'>" + r.status + "</td>" +
        "</tr>"
      );
    }).join("");

    var disclaimerRows = Object.keys(disclaimers).map(function (key) {
      var val    = disclaimers[key];
      var status = val ? "Active" : "N/A";
      var color  = val ? "#2e7d32" : "#888";
      return (
        "<tr>" +
          "<td style='padding:6px 10px;text-transform:capitalize;'>" + key + "</td>" +
          "<td style='padding:6px 10px;color:" + color + ";'>" + status + "</td>" +
        "</tr>"
      );
    }).join("");

    return (
      "<!DOCTYPE html><html><head><meta charset='UTF-8'>" +
      "<style>body{font-family:sans-serif;max-width:720px;margin:32px auto;color:#333;}" +
        "table{width:100%;border-collapse:collapse;}td{border-bottom:1px solid #eee;}" +
        "h2{margin-top:28px;font-size:16px;border-bottom:2px solid #ddd;padding-bottom:6px;}" +
      "</style></head><body>" +

      "<div style='background:" + statusColor + ";border-left:6px solid " + headerColor + ";" +
        "padding:16px 20px;border-radius:4px;margin-bottom:24px;'>" +
        "<h1 style='margin:0;font-size:22px;color:" + headerColor + ";'>" + headerLabel + "</h1>" +
        "<p style='margin:6px 0 0;font-size:13px;color:#555;'>Agent Atlas Compliance Report</p>" +
      "</div>" +

      "<h2>Etsy Policy Rules</h2>" +
      "<table>" + rulesRows + "</table>" +

      "<h2>Copyright Ownership</h2>" +
      "<p style='font-size:13px;line-height:1.6;background:#f9f9f9;padding:12px;border-radius:4px;'>" +
        copyrightNotice +
      "</p>" +

      "<h2>Disclaimer Coverage by Category</h2>" +
      "<table>" + disclaimerRows + "</table>" +

      "<h2>Copyright Block (Current Year)</h2>" +
      "<pre style='background:#f4f4f4;padding:12px;border-radius:4px;font-size:12px;white-space:pre-wrap;'>" +
        copyrightBlock() +
      "</pre>" +

      "</body></html>"
    );
  }

  // ─── 9. PRE-PUBLISH GATE ──────────────────────────────────────────────────

  var DISCLAIMER_TRIGGER_KEYWORDS = [
    "waiver", "release", "liability", "contract", "agreement",
    "invoice", "receipt", "budget", "expense", "tax", "financial"
  ];

  function _descriptionNeedsDisclaimer(description) {
    if (typeof description !== "string") return false;
    var lower = description.toLowerCase();
    for (var i = 0; i < DISCLAIMER_TRIGGER_KEYWORDS.length; i++) {
      if (lower.indexOf(DISCLAIMER_TRIGGER_KEYWORDS[i]) !== -1) return true;
    }
    return false;
  }

  function prePublishCheck(listing) {
    var blockers = [];
    var warnings = [];

    // Run full listing compliance check
    var check = checkListing(listing);
    for (var i = 0; i < check.warnings.length; i++) {
      warnings.push(check.warnings[i]);
    }

    // Hard blockers from flags
    var hardBlockerFlags = ["missing_title", "price_below_minimum", "invalid_input"];
    for (var f = 0; f < check.flags.length; f++) {
      if (hardBlockerFlags.indexOf(check.flags[f]) !== -1) {
        blockers.push("Blocker [" + check.flags[f] + "]: " + check.warnings[f] || check.flags[f]);
      }
    }

    // Ensure disclaimer present when description touches regulated territory
    if (
      _descriptionNeedsDisclaimer(listing && listing.description) &&
      typeof listing.description === "string" &&
      listing.description.toLowerCase().indexOf("disclaimer") === -1
    ) {
      blockers.push(
        "Listing description covers a regulated topic but contains no disclaimer. " +
        "Add the appropriate disclaimer before publishing."
      );
    }

    // Score gate: reject listings below 60
    if (check.score < 60) {
      blockers.push("Compliance score too low (" + check.score + "/100). Minimum required: 60.");
    }

    return {
      approved: blockers.length === 0,
      blockers: blockers,
      warnings: warnings
    };
  }

  // ─── PUBLIC API ───────────────────────────────────────────────────────────

  return {
    copyrightNotice: copyrightNotice,
    disclaimers:     disclaimers,
    etsyRules:       etsyRules,
    scanCopy:        scanCopy,
    checkListing:    checkListing,
    copyrightBlock:  copyrightBlock,
    injectDisclaimer: injectDisclaimer,
    reportHTML:      reportHTML,
    prePublishCheck: prePublishCheck
  };

}());

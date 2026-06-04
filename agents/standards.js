// Quality standards the audit orchestrator enforces across all departments

export const STANDARDS = {
  templates: {
    minSections: 5,
    requiredSections: ['invoice', 'signature', 'customer info', 'service details'],
    minFields: 20,
    invoiceRequired: true,
    signatureRequired: true,
    priorityFieldRequired: true,
    satisfactionSectionRequired: true,
    jobCompleteChecklistRequired: true,
  },
  copy: {
    minTitleLength: 40,
    maxTitleLength: 140,
    minDescriptionLength: 300,
    minTags: 10,
    maxTags: 13,
    requiredKeywords: ['fillable', 'pdf', 'form', 'template', 'printable'],
    noBannedPhrases: ['Canva', 'Adobe', 'download and open in'],
    requiredPhrases: ['Opens in any browser', 'no software needed'],
  },
  images: {
    requiredShotTypes: ['hero', 'detail', 'bundle', 'flat_preview', 'feature_callout',
      'whats_included', 'how_to_use', 'before_you_buy'],
    minShotsPerListing: 8,
    canvasWidth: 1024,
    canvasHeight: 1024,
  },
  server: {
    requiredEndpoints: ['/health', '/relay/store', '/relay/load'],
    maxResponseMs: 2000,
    requiredMiddleware: ['cors', 'helmet', 'rate-limit'],
  },
  listings: {
    totalListings: 20,
    priceRanges: { min: 1.99, max: 4.99 },
    requiredFields: ['title', 'description', 'tags', 'price', 'quantity'],
  },
};

export const LISTING_IDS = [
  'LS-001','LS-002','LS-003','LS-004','LS-005',
  'LS-006','LS-007','LS-008','LS-009','LS-010',
  'LS-011','LS-012','LS-013','LS-014','LS-015',
  'LS-016','LS-017','LS-018','LS-019','LS-020',
];

export const DEPARTMENTS = ['templates', 'copy', 'design', 'server', 'listings'];

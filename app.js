'use strict';
/* ─── Storage ──────────────────────────────────────────────────────── */
const STORAGE_KEY = 'agentAtlasV3';

/* ─── Etsy-ready copy library ──────────────────────────────────────── */
const ETSY_COPY = {
  'LS-001': {
    title: 'HVAC Service Call Notes Template – Editable PDF for Technicians | Instant Download',
    tags:  'hvac template,service call form,editable pdf,technician notes,hvac paperwork,field service form,hvac business,service invoice,technician log,hvac tools,small business form,contractor template,work order form',
    desc:  `Stop losing job details between the truck and the office.\n\nThis professional HVAC service call notes template gives owner-operators and solo techs a clean, repeatable system for every visit — equipment info, readings, parts used, follow-up needed, and customer sign-off all in one place.\n\n✅ Opens in any browser — no software needed\n✅ Print-ready PDF included\n✅ Instant digital download — no waiting\n✅ Works for residential and commercial calls\n✅ Reuse unlimited times\n\nPerfect for: owner-operator HVAC techs, small HVAC companies (1–5 trucks), and anyone tired of scrap paper job notes.\n\n→ Download, customize your logo, and start using today.`,
    faq:   'Q: Can I add my company logo?\nA: Yes. Open the file in your browser, type your company name in the header, and print.\n\nQ: Is this print-ready?\nA: Yes. Open in Chrome, use File → Print → Save as PDF for crisp results.',
    imagePrompt: 'Premium dark-desk flatlay: HVAC service call form on clipboard, clean workbench background, warm professional lighting, no text overlay.'
  },
  'LS-002': {
    title: 'Plumbing Dispatch & Diagnosis Checklist – Editable Template for Plumbers | Instant Download',
    tags:  'plumbing checklist,dispatch form,plumbing template,diagnosis checklist,plumbing business,service form,plumber paperwork,work order,field service,small business form,contractor checklist,plumbing tools,job tracker',
    desc:  `Streamline every call from dispatch to close-out.\n\nDesigned for small plumbing teams and owner-operators, this dispatch and diagnosis checklist captures the information that matters — job type, symptom description, parts checked, repair completed, and follow-up work — in a format your whole team can use consistently.\n\n✅ Opens in any browser — no software needed\n✅ Print-ready and digital-fill versions included\n✅ Instant download, unlimited reprints\n✅ Works for emergency calls, scheduled maintenance, and new installs\n\nStop recreating paperwork from scratch after every job.`,
    faq:   'Q: Can my dispatcher use this digitally on a tablet?\nA: Yes. The PDF version supports digital form fill on most tablet apps.\n\nQ: Does it include space for parts tracking?\nA: Yes — there\'s a dedicated parts/materials section.',
    imagePrompt: 'Blue-collar office aesthetic: plumbing dispatch checklist on metal clipboard, subtle pipe and tool background elements, cool-toned professional lighting.'
  },
  'LS-003': {
    title: 'Electrician Jobsite Inspection Form – Editable Field Checklist | Instant Download',
    tags:  'electrician form,jobsite inspection,electrical checklist,electrician template,field inspection,electrical paperwork,contractor form,small business,electrician tools,site walkthrough,electrical business,service form,work order',
    desc:  `A clean, professional jobsite inspection form built for working electricians.\n\nCaptures panel info, circuit checks, hazard flags, code notes, and customer sign-off in a single page. Use it for pre-work walkthroughs, final inspections, or ongoing site documentation.\n\n✅ Opens in any browser — no software needed\n✅ Print-ready PDF\n✅ Works for residential, commercial, and industrial sites\n✅ Instant download\n\nBuilt by an operator who knows you don't have time for complicated paperwork.`,
    faq:   'Q: Can I use this for residential and commercial?\nA: Yes — the form is niche-generic enough for both.\n\nQ: Is there a digital-fill version?\nA: Yes, the PDF version is form-fillable.',
    imagePrompt: 'Electrician jobsite aesthetic: clean inspection checklist on aluminum clipboard, subtle electrical panel background, crisp overhead lighting.'
  },
  'LS-004': {
    title: 'Lawn Care Weekly Crew Planner – Editable Route Sheet for Lawn Businesses | Instant Download',
    tags:  'lawn care planner,crew route sheet,lawn business template,weekly planner,lawn route,crew schedule,lawn care form,landscaping template,lawn operator,route planner,small business form,lawn crew tracker,weekly schedule',
    desc:  `Plan your crew's week in 10 minutes flat.\n\nThis weekly crew planner gives lawn route managers a single-page view of all stops, service types, crew assignments, and notes — no more back-and-forth texts or missed stops.\n\n✅ Opens in any browser — no software needed\n✅ Print one page per week, per crew\n✅ Customizable route columns and crew slots\n✅ Instant download\n✅ Scales from 1 to 5 crews\n\nOwner-operators use this Sunday night to set the week. Crew leads take it to the truck Monday morning.`,
    faq:   'Q: Can I add more stop rows?\nA: Yes — Print multiple sheets or request a custom row count.\n\nQ: Does this work for multiple crews?\nA: Print one sheet per crew. Many customers do this.',
    imagePrompt: 'Lawn care operations: weekly route planner on clipboard, green-toned professional background, clean and modern flatlay composition.'
  },
  'LS-005': {
    title: 'Auto Detail Intake Form + Damage Waiver Kit – Editable Template | Instant Download',
    tags:  'auto detail intake,damage waiver,detailing template,mobile detail form,car detail paperwork,detail business,intake form,auto detailing,waiver template,client intake,mobile detailer,small business form,detailing contract',
    desc:  `Protect yourself and look professional from the first touchpoint.\n\nThis two-piece kit includes a client intake form (vehicle info, service selections, special requests) and a pre-service damage waiver — the paperwork every mobile detailer needs before touching a car.\n\n✅ Opens in any browser — no software needed\n✅ Print-ready and digital versions\n✅ Legally-flavored waiver language (consult your attorney to finalize)\n✅ Instant download\n✅ Works for mobile and shop-based detailers\n\nLook like a real business. Protect your work. Start using it today.`,
    faq:   'Q: Is the waiver language legally binding?\nA: It is written to be used as a starting point. We recommend having a local attorney review before use.\n\nQ: Can I add a price list to the intake form?\nA: Yes — open in browser and edit the services section before printing.',
    imagePrompt: 'Luxury auto detailing: intake form and waiver kit on dark leather surface, subtle high-end car interior background, warm premium lighting.'
  },
  'LS-006': {
    title: 'Pest Control Follow-Up Service Card – Printable Template for Pest Technicians | Instant Download',
    tags:  'pest control template,follow-up card,pest control business,service record,pest technician form,pest control paperwork,service card,small business form,exterminator template,pest log,field service form,contractor template,treatment record',
    desc:  `Leave every customer with a professional record of what was done — and when to expect you back.\n\nThis follow-up service card documents the treatment date, pest type targeted, chemicals applied, re-entry wait time, next recommended service, and technician sign-off. Hand one to every customer at the end of the visit.\n\n✅ Opens in any browser — fill in and print immediately\n✅ Builds customer trust and reduces callback calls\n✅ Documents chemical usage for liability protection\n✅ Works for one-time and recurring accounts\n✅ Instant download, unlimited reprints\n\nThe card that makes customers feel taken care of — and keeps them on your schedule.`,
    faq:   'Q: Can I add my company name and logo?\nA: Yes — open in browser, type your company info in the header, and print.\n\nQ: Does it cover both residential and commercial treatments?\nA: Yes — the fields work for any pest control service type.',
    imagePrompt: 'Pest control professional aesthetic: service follow-up card on clipboard, clean neutral background, professional outdoor lighting, trustworthy composition.'
  },
  'LS-007': {
    title: 'Roofing Change Order & Approval Form – Printable Template for Roofing Contractors | Instant Download',
    tags:  'roofing template,change order,roofing contractor,roofing form,change order form,roofing business,contractor change order,scope change,roofing paperwork,small business form,approval form,roofing invoice,contractor template',
    desc:  `Get paid for every scope change — in writing, every time.\n\nThis change order and approval form documents additional work requested after the original contract: description of change, materials added, labor adjustment, revised total, and customer signature. No more verbal agreements that cost you money.\n\n✅ Opens in any browser — fill in on-site and print or save as PDF\n✅ Protects you from dispute over what was agreed\n✅ Works for insurance, residential, and commercial roofing\n✅ Customer signature line locks in approval before work starts\n✅ Instant download, unlimited reprints\n\nOne signed change order pays for this template a hundred times over.`,
    faq:   'Q: Can I use this for insurance claim supplements?\nA: Yes — the line-item format works well for supplement documentation.\n\nQ: Does it include a materials breakdown section?\nA: Yes — there are separate lines for materials, labor, and total adjustment.',
    imagePrompt: 'Roofing contractor aesthetic: change order form on aluminum clipboard, subtle shingle and roof background, professional outdoor lighting, clean composition.'
  },
  'LS-008': {
    title: 'Pressure Washing Route Sheet – Daily Job Tracker for Wash Crews | Instant Download',
    tags:  'pressure washing template,route sheet,wash crew tracker,pressure washing business,job log,daily planner,exterior cleaning form,power washing,service route,small business,contractor form,job tracker,field service form',
    desc:  `Run tighter routes and never miss a stop.\n\nBuilt for solo pressure washers and small crews, this route sheet tracks every job in one place — address, surface type, PSI settings, chemicals used, time on site, and customer sign-off.\n\n✅ Print one sheet per day or per truck\n✅ Opens in any browser — no software needed\n✅ Works for residential, commercial, and fleet washing\n✅ Instant download\n\nStop running jobs from memory. One sheet handles the whole day.`,
    faq:   'Q: Can I add my logo?\nA: Yes — open in browser, add your company name to the top, and print.\n\nQ: Does this work for both surface and fleet washing?\nA: Yes — the fields are broad enough for any exterior cleaning job.',
    imagePrompt: 'Exterior cleaning operations: route sheet on clipboard, subtle pressure washer background, clean blue-toned professional flatlay.'
  },
  'LS-009': {
    title: 'Appliance Repair Parts Tracker – Editable Log for Repair Technicians | Instant Download',
    tags:  'appliance repair template,parts tracker,repair log,appliance technician,parts inventory,service form,repair business,appliance service,small business form,contractor template,technician log,job tracker,parts order',
    desc:  `Stop losing track of parts between the shop and the job.\n\nThis parts tracker gives appliance repair techs a clean record of every component ordered, installed, or returned — model numbers, part numbers, costs, and supplier info all in one place.\n\n✅ Opens in any browser — no software needed\n✅ Works for in-shop and in-home repair\n✅ Track parts across multiple jobs simultaneously\n✅ Instant download, unlimited use\n\nRun a tighter operation and stop eating parts costs from poor tracking.`,
    faq:   'Q: Can I track multiple jobs on one sheet?\nA: Yes — there are rows for up to 10 jobs per page.\n\nQ: Is there a supplier contact section?\nA: Yes — each parts row includes supplier and order number fields.',
    imagePrompt: 'Appliance repair shop aesthetic: parts log on workbench clipboard, subtle tool and parts background, warm professional lighting.'
  },
  'LS-010': {
    title: 'Handyman Materials Reimbursement Sheet – Editable Expense Form | Instant Download',
    tags:  'handyman template,materials reimbursement,expense form,handyman business,job materials log,reimbursement sheet,contractor expense,small business form,handyman paperwork,job cost tracker,materials invoice,field service form,home repair',
    desc:  `Get reimbursed for every nail, screw, and supply run.\n\nThis simple reimbursement sheet lets handymen document every material purchased for a job — item, quantity, store, receipt amount — so clients pay for what was used, not what you guess at.\n\n✅ Easy to fill out on a phone or printed\n✅ Opens in any browser — no software needed\n✅ Works for any handyman or home repair job\n✅ Instant download\n\nStop leaving material costs on the table. One page pays for itself on the first job.`,
    faq:   'Q: Does this work for jobs with multiple supply runs?\nA: Yes — there are rows for up to 20 individual items.\n\nQ: Can clients sign to approve the expenses?\nA: Yes — there is a client sign-off field at the bottom.',
    imagePrompt: 'Handyman workspace: reimbursement form on clipboard with receipts, warm natural light, clean professional composition, no clutter.'
  },
  'LS-011': {
    title: 'Mobile Mechanic Service Summary Form – Editable Template for Mobile Auto Repair | Instant Download',
    tags:  'mobile mechanic template,service summary,auto repair form,mobile mechanic paperwork,mechanic invoice,vehicle service form,auto service,small business,mechanic template,field service,car repair form,service record,job summary',
    desc:  `Leave every customer with a professional record of what was done.\n\nThis service summary form captures vehicle info, work performed, parts replaced, mileage, labor time, and customer signature — everything you need for a clean job close-out and a repeat-customer relationship.\n\n✅ Opens in any browser — no software needed\n✅ Print-ready PDF\n✅ Works for any mobile or roadside repair\n✅ Instant download\n\nLook like the most professional mechanic at the jobsite. Every. Single. Time.`,
    faq:   'Q: Is there a parts cost section?\nA: Yes — includes parts, labor, and total fields.\n\nQ: Can I use this for roadside assistance calls too?\nA: Yes — the form is general enough for any mobile auto service.',
    imagePrompt: 'Mobile mechanic aesthetic: service summary form on clipboard, tool bag background, warm garage lighting, professional composition.'
  },
  'LS-012': {
    title: 'Locksmith Job Authorization Form – Editable Service Template | Instant Download',
    tags:  'locksmith template,job authorization,locksmith form,locksmith business,service authorization,client authorization,locksmith paperwork,small business form,service form,locksmith invoice,lock service,field service template,contractor form',
    desc:  `Document authorization before you touch the lock.\n\nEvery locksmith job requires proof the client authorized the work — this form captures ID verification, property address, proof of authorization, service description, and customer signature before any work begins.\n\n✅ Covers residential, commercial, and vehicle lockouts\n✅ Opens in any browser — no software needed\n✅ CYA language built in (not legal advice — have an attorney review)\n✅ Instant download\n\nProtect your license and your business on every call.`,
    faq:   'Q: Does this include ID verification fields?\nA: Yes — there is a section for ID type and number documentation.\n\nQ: Can I use this for auto lockouts?\nA: Yes — the vehicle section covers VIN, plate, and owner documentation.',
    imagePrompt: 'Locksmith professional aesthetic: authorization form on dark clipboard, subtle lock and key background elements, clean low-light composition.'
  },
  'LS-013': {
    title: 'Painting Prep & Final Punch List – Editable Template for Painters | Instant Download',
    tags:  'painting template,prep checklist,punch list,painting business,painter form,painting contractor,surface prep,final walkthrough,painting checklist,small business,contractor template,job checklist,painting paperwork',
    desc:  `Don't leave money on the table because of a missed punch-list item.\n\nThis two-part template gives painting contractors a structured prep checklist (surface condition, repairs, masking, primer) and a final punch list (missed spots, touch-ups, client walkthrough) so every job closes clean.\n\n✅ Works for interior, exterior, and commercial painting\n✅ Opens in any browser — no software needed\n✅ Instant download\n✅ Reduces callbacks by catching issues before the customer does\n\nClose every job with confidence. Stop re-driving for $20 touch-ups.`,
    faq:   'Q: Does it cover both interior and exterior jobs?\nA: Yes — the checklist fields work for both.\n\nQ: Is there a customer sign-off section?\nA: Yes — both the prep and punch list have signature fields.',
    imagePrompt: 'Painting contractor aesthetic: prep checklist on clipboard, subtle paint swatches and roller background, clean professional flatlay, warm tones.'
  },
  'LS-014': {
    title: 'Snow Removal Service Trigger Checklist – Editable Template for Snow Contractors | Instant Download',
    tags:  'snow removal template,service trigger,snow contractor,snow plowing form,snow removal business,trigger checklist,winter service,snowplowing template,snow plow form,contractor checklist,small business form,seasonal service,snow contract',
    desc:  `Know exactly when to roll the trucks — every time.\n\nThis trigger checklist documents the service activation criteria for each property: snowfall threshold, ice trigger, client preferences, route order, and materials used. Perfect for multi-property snow accounts.\n\n✅ Set up once per property, use all season\n✅ Opens in any browser — no software needed\n✅ Keeps your crew consistent when conditions change fast\n✅ Instant download\n\nStop making trigger calls by feel. This is what real snow operators use.`,
    faq:   'Q: Does this work for multiple properties?\nA: Yes — print one sheet per property and keep them in a binder or folder.\n\nQ: Is there space for special client instructions?\nA: Yes — there is an open notes section for per-property customization.',
    imagePrompt: 'Snow removal operations: service trigger checklist on clipboard, subtle snow and equipment background, cold blue-white professional tones, clean flatlay.'
  },
  'LS-015': {
    title: 'Window Cleaning Client Packet – Service Checklist & Job Record | Instant Download',
    tags:  'window cleaning template,client packet,window cleaning business,job checklist,window washing form,cleaning contractor,service record,small business form,window cleaning paperwork,job log,cleaning business template,field service,client form',
    desc:  `Look professional from the first quote to the final wipe.\n\nThis client packet includes a job checklist (access points, glass type, special instructions), a service record (windows cleaned, condition notes, time on site), and a client sign-off — everything to close a window cleaning job professionally.\n\n✅ Works for residential and commercial window cleaning\n✅ Opens in any browser — no software needed\n✅ Instant download\n✅ Helps with recurring client accounts and route scheduling\n\nStop showing up with nothing to hand the customer.`,
    faq:   'Q: Does this work for high-rise or commercial jobs?\nA: Yes — the access and safety notes sections cover elevated work too.\n\nQ: Is there a recurring service section?\nA: Yes — includes a next service date and frequency field.',
    imagePrompt: 'Window cleaning professional aesthetic: client packet on clipboard, clean glass background, bright natural light, modern professional flatlay.'
  },
  'LS-016': {
    title: 'Pool Service Chemical Log – Weekly Treatment Tracker for Pool Operators | Instant Download',
    tags:  'pool service template,chemical log,pool treatment tracker,pool operator form,pool maintenance,pool service business,chemical tracker,pool log,swimming pool form,small business,service record,pool tech,water treatment log',
    desc:  `Track every chemical, every reading, every visit — automatically.\n\nThis weekly chemical log gives pool service technicians a clean record of pH, chlorine, alkalinity, and chemical additions for every pool on their route. Protect yourself and your clients with documented water chemistry.\n\n✅ One page per pool per month\n✅ Opens in any browser — no software needed\n✅ Works for residential and commercial pools\n✅ Instant download\n\nWhen something goes wrong, you have the paper trail. When it goes right, you have the proof.`,
    faq:   'Q: How many readings fit on one sheet?\nA: Each sheet covers 4 weekly visits with full chemical readings.\n\nQ: Is there space for notes about equipment issues?\nA: Yes — each visit row includes an equipment/notes field.',
    imagePrompt: 'Pool service aesthetic: chemical log on clipboard near pool edge, clear water background, clean outdoor professional lighting, summer tones.'
  },
  'LS-017': {
    title: 'Flooring Estimate Scope Matrix – Editable Quote Template for Flooring Contractors | Instant Download',
    tags:  'flooring estimate template,scope matrix,flooring contractor,flooring quote,flooring business,estimate form,contractor estimate,flooring paperwork,flooring template,scope of work,small business,quote template,contractor form',
    desc:  `Stop underquoting flooring jobs because of unclear scope.\n\nThis estimate scope matrix breaks every flooring job into clear line items — rooms, square footage, material type, labor rate, subfloor prep, transitions, and totals — so clients understand what they\'re paying for and you protect your margin.\n\n✅ Works for LVP, hardwood, tile, carpet, and mixed jobs\n✅ Opens in any browser — no software needed\n✅ Instant download\n✅ Professional enough to send as a PDF quote\n\nClose bigger jobs with a quote that looks like a contractor, not a handyman.`,
    faq:   'Q: Can I add my company logo to the quote?\nA: Yes — there is a logo and company info section at the top.\n\nQ: Does it calculate totals automatically?\nA: Fill in your numbers manually — the layout makes entry fast and clear.',
    imagePrompt: 'Flooring contractor aesthetic: estimate matrix on clipboard, subtle flooring samples background, warm professional indoor lighting, clean composition.'
  },
  'LS-018': {
    title: 'Contractor Daily Site Report – Editable Field Log for General Contractors | Instant Download',
    tags:  'contractor daily report,site report,general contractor form,daily log,construction template,site documentation,contractor template,field report,job site log,small business,construction form,daily site log,project documentation',
    desc:  `Document every day on the job — protect yourself and your client.\n\nThis daily site report captures weather, crew on site, work completed, materials delivered, subcontractors present, inspections, delays, and photos reference — everything needed to track job progress and defend against disputes.\n\n✅ One page per day keeps the project record clean\n✅ Opens in any browser — no software needed\n✅ Works for residential remodel, new construction, and commercial\n✅ Instant download\n\nThe job that has documentation wins every dispute. The one that doesn\'t, loses.`,
    faq:   'Q: Is there a photo log section?\nA: Yes — there is a section to reference photo file names or timestamps.\n\nQ: Can I use this for subcontractor coordination?\nA: Yes — there is a subcontractor attendance section on the form.',
    imagePrompt: 'General contractor aesthetic: daily site report on aluminum clipboard, construction site background, professional outdoor lighting, clean composition.'
  },
  'LS-019': {
    title: 'Septic Service Pump Log – Maintenance Record for Septic Technicians | Instant Download',
    tags:  'septic service template,pump log,septic maintenance,septic technician form,septic business,service record,pump log template,septic pumping,small business form,field service,maintenance log,contractor template,septic paperwork',
    desc:  `A clean service record every septic tech should have on their truck.\n\nThis pump log documents tank size, pump date, gallons removed, system condition, access location, recommended next service, and customer sign-off — the complete record for recurring septic accounts.\n\n✅ Opens in any browser — no software needed\n✅ Works for residential and commercial septic systems\n✅ Instant download, unlimited reprints\n✅ Keeps clients on a service schedule automatically\n\nGive every customer a copy. They\'ll call you back every time.`,
    faq:   'Q: Does this cover inspection notes?\nA: Yes — there is a system condition and notes section.\n\nQ: Is there a next service reminder section?\nA: Yes — recommended next service date is a prominent field.',
    imagePrompt: 'Septic service professional aesthetic: pump log on clipboard, clean outdoor setting, earth tones, straightforward professional composition.'
  },
  'LS-020': {
    title: 'Service Business Fee Transparency Addendum – Editable Client Disclosure | Instant Download',
    tags:  'service fee addendum,fee disclosure,contractor addendum,service business template,fee transparency,client disclosure,small business form,contractor form,service agreement,fee schedule,business template,client agreement,service contract',
    desc:  `Stop getting pushback on your invoices — be transparent upfront.\n\nThis fee transparency addendum works as an add-on to any service agreement — it documents fuel charges, material markups, after-hours rates, cancellation fees, and payment terms so clients know what to expect before the job starts.\n\n✅ Works for any service trade or contractor\n✅ Opens in any browser — no software needed\n✅ Instant download\n✅ Reduces invoice disputes before they start\n\nGet paid what you quoted. Every time.`,
    faq:   'Q: Can I customize the fee categories?\nA: Yes — open in browser and edit the fee line items to match your business.\n\nQ: Does this work as a standalone document or add-on?\nA: Either — it can be a standalone disclosure or attached to an existing service agreement.',
    imagePrompt: 'Professional service business aesthetic: fee addendum on clean desk, neutral professional tones, modern flatlay, no clutter, slight warm lighting.'
  },
};

function getEtsyCopy(listingId, listing) {
  const c = ETSY_COPY[listingId];
  if (c) return c;
  const niche = listing.category || listing.niche || 'Service Business';
  const name  = listing.title || listing.name;
  const tags  = `${niche.toLowerCase()} template,service form,editable pdf,small business,contractor form,${niche.toLowerCase()} business,instant download,work order,field service,back office,printable template,business template,owner operator`;
  return {
    title: `${name} – Editable Template for ${niche} Businesses | Instant Download`,
    tags,
    desc:  `A professional, ready-to-use template for ${niche} owner-operators and small teams.\n\nDesigned to save you time on paperwork so you can focus on the job.\n\n✅ Opens in any browser — no software needed\n✅ Print-ready PDF included\n✅ Instant digital download\n✅ Unlimited reprints\n\nStart using it today — no design skills needed.`,
    faq:   'Q: Can I edit this template?\nA: Yes. Opens in any browser — no software needed.\n\nQ: Is this a physical product?\nA: No. This is an instant digital download.',
    imagePrompt: `Premium ${niche.toLowerCase()} operations template mockup, clean desk flatlay, professional lighting, no text overlay.`,
  };
}

/* ─── Seed ─────────────────────────────────────────────────────────── */
const SEED = {
  startedAt: Date.now() - (12 * 86400000), // 12 days ago
  autoPilot: false,
  selectedListingId: 'LS-001',
  agents: [
    { id:'atlas',       name:'Atlas',              role:'Operator Overseer',       mastery:92, trend:4,  focus:'Coordinates every agent, audits decisions, and raises owner approval gates.',                    directive:'Keep the system moving toward $500 without unsafe publishing.' },
    { id:'opportunity', name:'Opportunity Agent',  role:'Market Scout',            mastery:84, trend:6,  focus:'Scores service-business template ideas by speed, simplicity, niche fit, and bundle potential.', directive:'Find fast-to-build offers with bundle paths.' },
    { id:'listing',     name:'Listing Agent',      role:'Etsy Conversion Writer',  mastery:81, trend:5,  focus:'Turns product ideas into SEO titles, tags, descriptions, FAQs, and image prompts.',              directive:'Improve clarity and buyer specificity before approval.' },
    { id:'bundle',      name:'Bundle Agent',       role:'Offer Architect',         mastery:78, trend:3,  focus:'Combines single templates into higher-ticket packs and pricing ladders.',                        directive:'Increase average order value without adding owner workload.' },
    { id:'performance', name:'Performance Agent',  role:'Revenue Analyst',         mastery:86, trend:7,  focus:'Identifies winners, underperformers, and revenue pacing risk.',                                 directive:'Protect the 45-day revenue goal with simple listing tests.' },
    { id:'approval',    name:'Approval Agent',     role:'Risk Gatekeeper',         mastery:88, trend:4,  focus:'Routes important changes to the owner and prevents external publishing without approval.',        directive:'Never allow publish actions to bypass owner approval.' },
  ],
  learningLog: [
    { agent:'Atlas',             lesson:'Approval bottlenecks are the single biggest drag on revenue — clear the queue first.', time:'09:18' },
    { agent:'Listing Agent',     lesson:'Buyer-specific titles ("for HVAC techs") outperform generic wording by 2–3× on Etsy.', time:'09:02' },
    { agent:'Performance Agent', lesson:'Winners at 3%+ CVR should be bundled immediately to capture average order value gains.', time:'08:41' },
  ],
  successPlan: [
    { id:'focus',      title:'Narrow to 5 highest-intent trade niches',       owner:'Opportunity Agent',  impact:8, status:'queued', action:'Filter backlog to simple, urgent, service-business paperwork with clear buyer pain.' },
    { id:'volume',     title:'Reach 12 ready-to-upload listings fast',         owner:'Listing Agent',      impact:7, status:'queued', action:'Convert best opportunities into draft listings and move polished ones into approval.' },
    { id:'bundles',    title:'Create 3 bundle ladders before launch',          owner:'Bundle Agent',       impact:6, status:'queued', action:'Package singles into starter, pro, and vault offers to raise average order value.' },
    { id:'conversion', title:'Upgrade every listing with buyer-specific copy', owner:'Listing Agent',      impact:5, status:'queued', action:'Tighten titles, tags, first-image promise, FAQ, and description for each buyer segment.' },
    { id:'feedback',   title:'Run daily Atlas review and loser refresh loop',  owner:'Performance Agent',  impact:4, status:'queued', action:'Refresh underperformers quickly and double down on winners.' },
  ],
  launchAgents: [
    { id:'trend',    name:'Trend Scout Agent',         role:'Demand Validation',      priority:'High',   status:'needed', why:'Prevents building templates nobody searches for by ranking Etsy keyword and buyer-intent signals.' },
    { id:'creative', name:'Creative Production Agent', role:'Mockup + Asset Builder', priority:'High',   status:'needed', why:'Turns approved listings into polished preview images, PDF covers, and bundle graphics fast.' },
    { id:'qa',       name:'Quality Control Agent',     role:'Template QA',            priority:'High',   status:'needed', why:'Checks files, naming, delivery ZIPs, instructions, and buyer usability before upload.' },
    { id:'pricing',  name:'Pricing & ROI Agent',       role:'Capital Allocation',     priority:'Medium', status:'needed', why:'Chooses when ad spend, mockup assets, or research tools are worth funding.' },
    { id:'policy',   name:'Policy Compliance Agent',   role:'Marketplace Guardrails', priority:'Medium', status:'needed', why:'Reviews listing claims, digital-delivery language, and marketplace-safe wording before approval.' },
  ],
  investmentPlan: [
    { id:'lean',    label:'Lean Launch',    spend:0,   projected:500,  confidence:45, roi:'Baseline',          use:'Manual-quality launch using only current seeded workflow.' },
    { id:'starter', label:'Starter Boost',  spend:150, projected:650,  confidence:58, roi:'~1.0× incremental', use:'Mockup assets, listing validation, and small Etsy Ads tests after approvals.' },
    { id:'growth',  label:'Focused Growth', spend:300, projected:900,  confidence:68, roi:'~1.3× incremental', use:'Better creative, faster product volume, and controlled ad learning budget.' },
    { id:'push75',  label:'75+ Push',       spend:500, projected:1250, confidence:76, roi:'~1.5× incremental', use:'Full pre-launch agent stack, stronger creative, bundle production, and measured traffic tests.' },
  ],
  opportunities: [
    ['HVAC Service Call Debrief Sheet','HVAC',2,8.8,8,'Best Now'],
    ['Plumbing No-Heat Diagnostic Checklist','Plumbing',3,8.5,9,'Best Now'],
    ['Electrician Jobsite Walkthrough Form','Electrical',4,8.3,8,'Easiest'],
    ['Pressure Washing Route Sheet','Exterior Cleaning',1,8.5,7,'Easiest'],
    ['Auto Detail Intake + Damage Waiver','Auto Detailing',2,8.8,9,'Bundle'],
    ['Lawn Care Weekly Crew Plan','Lawn Care',1,8.8,8,'Seasonal'],
    ['Septic Service Pump Log','Septic',5,7.5,7,'Seasonal'],
    ['Appliance Repair Parts Tracker','Appliance',3,8.3,9,'Bundle'],
    ['Handyman Materials Reimbursement','Handyman',1,8.3,7,'Easiest'],
    ['Pest Control Follow-Up Card','Pest Control',1,8.8,8,'Best Now'],
    ['Roofing Change-Order Pack','Roofing',5,8.3,10,'Bundle'],
    ['Window Cleaning Client Packet','Window Cleaning',2,8.0,8,'Seasonal'],
    ['Snow Removal Trigger Checklist','Snow Removal',2,8.3,8,'Seasonal'],
    ['Mobile Mechanic Service Summary','Mobile Mechanic',3,8.3,9,'Best Now'],
    ['Locksmith Job Authorization','Locksmith',2,8.3,8,'Best Now'],
    ['Painting Prep & Punch List','Painting',2,8.8,9,'Bundle'],
    ['Pool Service Chemical Log','Pool Service',3,8.0,8,'Seasonal'],
    ['Flooring Estimate Scope Matrix','Flooring',4,8.0,9,'Bundle'],
    ['Generic Service Fee Addendum','Multi-Trade',2,8.0,7,'Best Now'],
    ['Contractor Daily Site Report','Contracting',4,8.3,10,'Bundle'],
  ].map((o, i) => ({
    id: `OP-${String(i + 1).padStart(3,'0')}`,
    title: o[0], niche: o[1], difficulty: o[2], score: o[3], bundle: o[4],
    status: i % 3 === 0 ? 'Ready' : i % 3 === 1 ? 'Draft' : 'Review',
    filter: o[5], archived: false,
  })),
  listings: [
    { id:'LS-001', name:'HVAC Tech Service Call Notes Template',   price:3.99,  buyer:'Owner-Operator HVAC Tech',  bundle:'HVAC Starter Pack',     perf:'Winner', status:'live',            category:'HVAC',           views:142, cvr:3.5, revenue:39.95 },
    { id:'LS-002', name:'Plumbing Dispatch & Diagnosis Checklist', price:3.99, buyer:'Small Plumbing Teams',       bundle:'Plumbing Ops Kit',      perf:'Winner', status:'live',            category:'Plumbing',       views:126, cvr:3.2, revenue:47.96 },
    { id:'LS-003', name:'Electrician Jobsite Inspection Form Pack',price:3.99,  buyer:'Solo Electricians',          bundle:'Electrical Admin Bundle',perf:'Stable', status:'live',            category:'Electrical',     views:98,  cvr:2.0, revenue:19.98 },
    { id:'LS-004', name:'Lawn Care Weekly Crew Planner',           price:3.99,  buyer:'Lawn Route Managers',        bundle:'Lawn Backoffice Kit',    perf:'Winner', status:'live',            category:'Lawn Care',      views:171, cvr:4.1, revenue:48.93 },
    { id:'LS-005', name:'Auto Detail Intake + Waiver Kit',         price:4.99, buyer:'Mobile Detail Owners',       bundle:'Detailing Client Ops',   perf:'Stable', status:'live',            category:'Auto Detailing', views:84,  cvr:2.4, revenue:25.98 },
    { id:'LS-006', name:'Pest Control Follow-Up Card Templates',    price:3.99,  buyer:'Pest Control Teams',         bundle:'Pest Retention Pack',       perf:'N/A', status:'draft',           category:'Pest Control',    views:0, cvr:0, revenue:0 },
    { id:'LS-007', name:'Roofing Change Order + Approval Form',    price:4.99, buyer:'Roofing Contractors',        bundle:'Roofing Scope Pack',         perf:'N/A', status:'ready to upload', category:'Roofing',         views:0, cvr:0, revenue:0 },
    { id:'LS-008', name:'Pressure Washing Route Sheet',            price:3.99,  buyer:'Pressure Washing Operators', bundle:'Exterior Cleaning Pack',     perf:'N/A', status:'draft',           category:'Exterior Cleaning',views:0, cvr:0, revenue:0 },
    { id:'LS-009', name:'Appliance Repair Parts Tracker',          price:3.99,  buyer:'Appliance Repair Techs',     bundle:'Appliance Service Kit',      perf:'N/A', status:'draft',           category:'Appliance',       views:0, cvr:0, revenue:0 },
    { id:'LS-010', name:'Handyman Materials Reimbursement Sheet',  price:1.99,  buyer:'Solo Handymen',              bundle:'Handyman Back-Office Pack',  perf:'N/A', status:'draft',           category:'Handyman',        views:0, cvr:0, revenue:0 },
    { id:'LS-011', name:'Mobile Mechanic Service Summary Form',    price:3.99,  buyer:'Mobile Auto Repair Techs',   bundle:'Mobile Mechanic Ops Kit',    perf:'N/A', status:'draft',           category:'Mobile Mechanic', views:0, cvr:0, revenue:0 },
    { id:'LS-012', name:'Locksmith Job Authorization Form',        price:3.99,  buyer:'Locksmith Operators',        bundle:'Locksmith Field Pack',       perf:'N/A', status:'draft',           category:'Locksmith',       views:0, cvr:0, revenue:0 },
    { id:'LS-013', name:'Painting Prep & Final Punch List',        price:4.99,  buyer:'Painting Contractors',       bundle:'Painter Admin Bundle',       perf:'N/A', status:'draft',           category:'Painting',        views:0, cvr:0, revenue:0 },
    { id:'LS-014', name:'Snow Removal Service Trigger Checklist',  price:3.99,  buyer:'Snow Removal Contractors',   bundle:'Snow Ops Starter Pack',      perf:'N/A', status:'draft',           category:'Snow Removal',    views:0, cvr:0, revenue:0 },
    { id:'LS-015', name:'Window Cleaning Client Packet',           price:4.99,  buyer:'Window Cleaning Operators',  bundle:'Window Cleaning Pro Pack',   perf:'N/A', status:'draft',           category:'Window Cleaning', views:0, cvr:0, revenue:0 },
    { id:'LS-016', name:'Pool Service Chemical Log',               price:7.99,  buyer:'Pool Service Technicians',   bundle:'Pool Tech Operations Kit',   perf:'N/A', status:'draft',           category:'Pool Service',    views:0, cvr:0, revenue:0 },
    { id:'LS-017', name:'Flooring Estimate Scope Matrix',          price:9.99,  buyer:'Flooring Contractors',       bundle:'Flooring Contractor Bundle', perf:'N/A', status:'draft',           category:'Flooring',        views:0, cvr:0, revenue:0 },
    { id:'LS-018', name:'Contractor Daily Site Report',            price:11.99, buyer:'General Contractors',        bundle:'GC Field Documentation Pack',perf:'N/A', status:'draft',           category:'Contracting',     views:0, cvr:0, revenue:0 },
    { id:'LS-019', name:'Septic Service Pump Log',                 price:6.99,  buyer:'Septic Service Techs',       bundle:'Septic Ops Kit',             perf:'N/A', status:'draft',           category:'Septic',          views:0, cvr:0, revenue:0 },
    { id:'LS-020', name:'Service Business Fee Transparency Addendum', price:5.99, buyer:'Any Service Trade Owner',  bundle:'Multi-Trade Admin Vault',    perf:'N/A', status:'draft',           category:'Multi-Trade',     views:0, cvr:0, revenue:0 },
  ],
  approvals: [
    { id:'AP-001', type:'Publish Listing', item:'Roofing Change Order + Approval Form', listingId:'LS-007', why:'Strong bundle lift projected at +22%. Confidence based on comparable roofing templates ranking in top 50 Etsy results.', conf:0.84, agent:'Approval Agent', important:true, status:'pending', archived:false, createdAt:'09:10', history:[] },
    { id:'AP-002', type:'Price Increase',  item:'Lawn Care Weekly Crew Planner',        listingId:'LS-004', why:'4.1% CVR is well above niche average of 2.1%. A $1 price increase to $7.99 is supported by demand signal.',              conf:0.78, agent:'Performance Agent', important:true, status:'pending', archived:false, createdAt:'09:05', history:[] },
  ],
  activity: [
    { msg:'Opportunity Agent scored 4 new bundle candidates — Roofing, Painting, Flooring, Appliance.', time:'09:12' },
    { msg:'Listing Agent generated Etsy SEO copy for LS-006 and queued for approval.', time:'08:47' },
    { msg:'Performance Agent flagged LS-004 for pricing test — CVR 4.1% supports $7.99 ask.', time:'08:15' },
  ],
};

/* ─── Autonomous agent scripts ─────────────────────────────────────── */
const AUTO_EVENTS = [
  () => { logAction('Opportunity Agent re-scored backlog — OP-010 and OP-016 moved to top 5 priority.'); nudgeAgent('opportunity'); },
  () => { logAction('Listing Agent polished Etsy title for LS-003 — keyword density improved to 7 targets.'); nudgeAgent('listing'); },
  () => { logAction('Performance Agent reviewed 7d metrics — LS-004 CVR holding at 4.1%, Winner status confirmed.'); nudgeAgent('performance'); },
  () => { logAction('Bundle Agent drafted "Trades Starter Pack" combining LS-001, LS-002, LS-004 at $24.99.'); nudgeAgent('bundle'); },
  () => { logAction('Approval Agent confirmed no high-risk actions in queue — compliance gate is clear.'); nudgeAgent('approval'); },
  () => { logAction('Atlas cross-checked all agents — no conflicts, revenue pacing within 8% of target.'); nudgeAgent('atlas'); },
  () => { logAction('Opportunity Agent identified "Mobile Mechanic Inspection Sheet" as next fast-build — difficulty 2/5.'); nudgeAgent('opportunity'); },
  () => { logAction('Listing Agent found that LS-005 description is missing a buyer pain statement — flagged for update.'); nudgeAgent('listing'); },
  () => { logAction('Performance Agent flagged LS-003 as underperformer — 2.0% CVR, recommends title refresh.'); nudgeAgent('performance'); },
  () => { logAction('Bundle Agent calculated $49.99 vault bundle would add $147 to 45-day projection at 3 units/week.'); nudgeAgent('bundle'); },
];
let autoEventIdx = 0;

function nudgeAgent(id) {
  const ag = state.agents.find(a => a.id === id);
  if (ag) { ag.mastery = Math.min(99, ag.mastery + 1); ag.trend += 1; }
}

/* ─── State ────────────────────────────────────────────────────────── */
let state = loadState();
ensureShape();
let autoPilotInterval = null;

function loadState() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : clone(SEED); }
  catch { return clone(SEED); }
}
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function clone(x)  { return JSON.parse(JSON.stringify(x)); }
function nowTs()   { return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }); }

function ensureShape() {
  const s = state;
  if (!s.startedAt)         s.startedAt  = SEED.startedAt;
  if (s.autoPilot == null)  s.autoPilot  = false;
  if (!s.selectedListingId) s.selectedListingId = s.listings?.[0]?.id || null;
  if (!s.agents)            s.agents       = clone(SEED.agents);
  if (!s.learningLog)       s.learningLog  = clone(SEED.learningLog);
  if (!s.successPlan)       s.successPlan  = clone(SEED.successPlan);
  if (!s.launchAgents)      s.launchAgents = clone(SEED.launchAgents);
  if (!s.investmentPlan)    s.investmentPlan = clone(SEED.investmentPlan);
  s.listings.forEach(l => {
    if (l.views   == null) l.views   = 0;
    if (l.cvr     == null) l.cvr     = 0;
    if (l.revenue == null) l.revenue = 0;
    if (!l.category) l.category = l.niche || '';
  });
  s.approvals.forEach(a => { a.history = a.history || []; a.createdAt = a.createdAt || nowTs(); });
}

function logAction(msg) { state.activity.unshift({ msg, time: nowTs() }); state.activity = state.activity.slice(0, 40); }

/* ─── Computations ─────────────────────────────────────────────────── */
function daysElapsed()    { return Math.floor((Date.now() - state.startedAt) / 86400000); }
function daysRemaining()  { return Math.max(0, 45 - daysElapsed()); }
function currentRevenue() { return state.listings.filter(l => l.status === 'live').reduce((s, l) => s + (l.revenue || l.price * 4), 0); }
function dailyPaceNeeded(){ const rem = daysRemaining(); return rem > 0 ? (500 - currentRevenue()) / rem : 0; }
function estimateMonthly(){ return state.listings.filter(l => ['live','ready to upload'].includes(l.status)).reduce((s, l) => s + l.price * (l.status === 'live' ? 8 : 3), 0); }
function successProb()    { return Math.min(90, 45 + state.successPlan.filter(l => l.status !== 'queued').reduce((s, l) => s + l.impact, 0)); }
function isOnPace()       { const e = daysElapsed(); return e === 0 ? true : (currentRevenue() / e) >= (500 / 45); }

function launchReadiness() {
  const activeAgents    = state.launchAgents.filter(a => a.status === 'active').length;
  const activeLevers    = state.successPlan.filter(l => l.status === 'active').length;
  const readyListings   = state.listings.filter(l => ['ready to upload','live'].includes(l.status)).length;
  const pendingCount    = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const fundingReviewed = state.approvals.some(a => a.type === 'Funding Review');
  const prob            = successProb();
  const checks = [
    { label:'Specialist launch agents online',  value:`${activeAgents}/${state.launchAgents.length}`,  passed: activeAgents === state.launchAgents.length, points:20 },
    { label:'75%+ success levers active',       value:`${activeLevers}/${state.successPlan.length}`,   passed: activeLevers === state.successPlan.length,  points:20 },
    { label:'Minimum launch catalog ready',     value:`${readyListings} / 12 listings`,                passed: readyListings >= 12,                         points:20 },
    { label:'Approval bottleneck controlled',   value:`${pendingCount} pending`,                       passed: pendingCount <= 2,                           points:15 },
    { label:'Funding decision owner-reviewed',  value: fundingReviewed ? 'reviewed' : 'not reviewed',  passed: fundingReviewed,                             points:10 },
    { label:'Revenue model above 75%',          value:`${prob}%`,                                       passed: prob >= 75,                                  points:15 },
  ];
  return { checks, score: checks.reduce((s, c) => s + (c.passed ? c.points : 0), 0) };
}
function launchLabel(s) { return s >= 85 ? 'Launch Ready' : s >= 65 ? 'Close — Clear Blockers' : 'Not Ready'; }

/* ─── Next Best Action ─────────────────────────────────────────────── */
function nextBestAction() {
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived);
  const drafts    = state.listings.filter(l => l.status === 'draft');
  const readyUp   = state.listings.filter(l => l.status === 'ready to upload');
  const live      = state.listings.filter(l => l.status === 'live');
  const pace      = isOnPace();
  const rev       = currentRevenue();

  if (pending.length > 0) return {
    priority: 'critical', label:'Review Approvals',
    action: `${pending.length} decision${pending.length > 1 ? 's' : ''} waiting — every pending approval delays revenue. Go to Approvals now.`,
    cta: 'Go to Approvals', view: 'approval',
  };
  if (readyUp.length > 0) return {
    priority: 'high', label:'Get Listings Live',
    action: `${readyUp[0].name} is ready to upload to Etsy. Get it live to start earning from it.`,
    cta: 'View Listing', view: 'listing',
  };
  if (!pace && live.length > 0) return {
    priority: 'high', label:'Pace Is Behind',
    action: `You need $${dailyPaceNeeded().toFixed(2)}/day to hit $500. Create and approve more listings today.`,
    cta: 'Build a Listing', view: 'opportunity',
  };
  if (drafts.length > 0) return {
    priority: 'medium', label:'Advance a Draft',
    action: `${drafts[0].name} is in draft. Finalize and submit it for approval to move it toward live.`,
    cta: 'Edit Draft', view: 'listing',
  };
  if (live.length < 5) return {
    priority: 'medium', label:'Build More Listings',
    action: `You have ${live.length} live listing${live.length !== 1 ? 's' : ''}. You need at least 8 to hit $500 in 45 days without ads.`,
    cta: 'Find Opportunities', view: 'opportunity',
  };
  return {
    priority: 'low', label:'System Is Healthy',
    action: `${rev.toFixed(2)} earned, ${daysRemaining()} days left, pace is good. Run an Atlas Review to keep agents optimizing.`,
    cta: 'Run Atlas Review', view: null,
  };
}

/* ─── Toast ────────────────────────────────────────────────────────── */
function toast(msg, type = 'info') {
  const icons = { success:'✓', warn:'⚠', info:'ℹ' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span><span>${msg}</span>`;
  document.getElementById('toast-root').appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

/* ─── Navigation ───────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id:'dashboard',   label:'Dashboard',     icon:'⬡' },
  { id:'opportunity', label:'Opportunities', icon:'◈' },
  { id:'listing',     label:'Listings',      icon:'▦' },
  { id:'approval',    label:'Approvals',     icon:'◉' },
  { id:'revenue',     label:'Revenue',       icon:'◎' },
  { id:'ads',         label:'Ads Strategy',  icon:'◐' },
  { id:'design',      label:'Design Team',   icon:'✦' },
  { id:'postclose',   label:'Post-Close',    icon:'◆' },
  { id:'compliance',  label:'Compliance',    icon:'◇' },
  { id:'monitor',     label:'Monitor',       icon:'◑' },
  { id:'settings',    label:'Settings',      icon:'⚙' },
];

function renderNav() {
  const nav = document.getElementById('main-nav');
  nav.innerHTML = '';
  const pending = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  NAV_ITEMS.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.dataset.view = item.id;
    const badge = item.id === 'approval' && pending > 0 ? `<span class="nav-badge">${pending}</span>` : '';
    btn.innerHTML = `<span class="nav-icon">${item.icon}</span>${item.label}${badge}`;
    btn.onclick = () => switchView(item.id);
    nav.appendChild(btn);
  });
}

let _currentView = 'dashboard';
function switchView(id) {
  _currentView = id;
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(`${id}-view`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  const item = NAV_ITEMS.find(n => n.id === id);
  document.getElementById('view-eyebrow').textContent = item?.label || id;
  document.getElementById('view-title').textContent =
    id === 'dashboard'   ? 'Autonomous Operator Console' :
    id === 'opportunity' ? 'Opportunity Backlog' :
    id === 'listing'     ? 'Listing Pipeline' :
    id === 'approval'    ? 'Approval Queue' :
    id === 'ads'         ? 'Etsy Ads Strategy Engine' :
    id === 'design'      ? 'AI Design Team' :
    id === 'postclose'   ? 'Post-Close Conversion Agent' :
    id === 'compliance'  ? 'Compliance & Copyright Center' :
    id === 'monitor'     ? 'Shop Monitor' :
    id === 'settings'    ? 'System Settings' : 'Revenue Tracker';
  if (id === 'postclose')  renderPostClose();
  if (id === 'compliance') renderComplianceView();
  if (id === 'settings')   renderSettingsView();
  if (id === 'ads')        renderAdsView();
  if (id === 'design')     renderDesignView();
  if (id === 'monitor')    renderMonitorView();
}

function updateSidebarStatus() {
  const monitorRev = typeof ShopMonitor !== 'undefined' ? ShopMonitor.bestRevenue() : 0;
  const rev = monitorRev > 0 ? monitorRev : currentRevenue();
  document.getElementById('sidebar-rev').textContent = `$${rev.toFixed(2)} / $500`;
  const bar = document.querySelector('#sidebar-prog > div');
  if (bar) bar.style.width = Math.min(rev / 5, 100) + '%';
  document.getElementById('pending-count').textContent = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  document.getElementById('days-rem').textContent = `${daysRemaining()}d left`;
  const ap = document.getElementById('autopilot-status');
  if (ap) ap.textContent = state.autoPilot ? '▶ Auto-Pilot ON' : '◼ Auto-Pilot OFF';
  if (ap) ap.className = state.autoPilot ? 'autopilot-badge on' : 'autopilot-badge off';
}

/* ─── Auto-pilot ───────────────────────────────────────────────────── */
function startAutoPilot() {
  if (autoPilotInterval) return;
  autoPilotInterval = setInterval(() => {
    if (!state.autoPilot) { stopAutoPilot(); return; }
    AUTO_EVENTS[autoEventIdx % AUTO_EVENTS.length]();
    autoEventIdx++;
    state.learningLog.unshift({
      agent: state.agents[autoEventIdx % state.agents.length].name,
      lesson: `Autonomous cycle ${autoEventIdx}: agents refined their outputs and updated knowledge base.`,
      time: nowTs(),
    });
    state.learningLog = state.learningLog.slice(0, 8);
    persist();
    if (_currentView === 'dashboard') { renderDashboard(); updateSidebarStatus(); renderNav(); }
  }, 45000);
}
function stopAutoPilot() { clearInterval(autoPilotInterval); autoPilotInterval = null; }

function toggleAutoPilot() {
  state.autoPilot = !state.autoPilot;
  persist();
  if (state.autoPilot) {
    startAutoPilot();
    toast('Auto-Pilot ON — agents will run autonomously every 45 seconds.', 'success');
    logAction('Owner enabled Auto-Pilot mode. Agents are now running autonomously.');
  } else {
    stopAutoPilot();
    toast('Auto-Pilot paused.', 'info');
    logAction('Auto-Pilot paused by owner.');
  }
  rerenderAll();
}

/* ─── Dashboard ────────────────────────────────────────────────────── */
function renderDashboard() {
  const live      = state.listings.filter(l => l.status === 'live').length;
  const ready     = state.listings.filter(l => l.status === 'ready to upload').length;
  const rev       = currentRevenue();
  const monthly   = estimateMonthly();
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const revision  = state.approvals.filter(a => a.status === 'revise'  && !a.archived).length;
  const prob      = successProb();
  const readiness = launchReadiness();
  const atlas     = state.agents.find(a => a.id === 'atlas');
  const nba       = nextBestAction();
  const elapsed   = daysElapsed();
  const remaining = daysRemaining();
  const pace      = dailyPaceNeeded();
  const onPace    = isOnPace();

  const adSpent = totalAdSpend();
  const adCap   = loadAds().budgetCap || 100;
  const adPct   = adSpent / adCap;
  const budgetBanner = adPct >= 1.0
    ? `<div style="background:var(--danger-soft);border:1px solid var(--danger);border-radius:10px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="color:var(--danger);font-weight:700;">⛔ Ad budget cap hit — $${adSpent.toFixed(2)} of $${adCap} spent. Turn off Etsy Ads now.</span>
        <button onclick="switchView('ads')" style="background:var(--danger);color:#fff;border:none;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:.8rem;font-weight:700;">View Ads</button>
       </div>`
    : adPct >= 0.75
    ? `<div style="background:var(--warn-soft);border:1px solid var(--warn);border-radius:10px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <span style="color:var(--warn);font-weight:700;">⚠ Ad budget ${(adPct*100).toFixed(0)}% used — $${adSpent.toFixed(2)} of $${adCap}. $${(adCap-adSpent).toFixed(2)} remaining.</span>
        <button onclick="switchView('ads')" style="background:var(--warn);color:#000;border:none;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:.8rem;font-weight:700;">View Ads</button>
       </div>`
    : '';

  const view = document.getElementById('dashboard-view');
  view.innerHTML = `
    ${budgetBanner}
    <!-- Next Best Action -->
    <div class="nba-card nba-${nba.priority}">
      <div class="nba-left">
        <div class="nba-eyebrow">Atlas Recommends Now</div>
        <div class="nba-label">${nba.label}</div>
        <div class="nba-action">${nba.action}</div>
      </div>
      <button class="btn primary nba-cta" id="nba-cta-btn">${nba.cta}</button>
    </div>

    <!-- KPI strip -->
    <div class="kpi-grid">
      ${kpiCard('Revenue Earned',  `$${rev.toFixed(2)}`, `of $500 goal`, 'blue', `<div class="progress slim mt-4"><div style="width:${Math.min(rev/5,100)}%"></div></div>`)}
      ${kpiCard('Days Elapsed',    `${elapsed}`,  `${remaining} days remaining`, elapsed > 30 ? 'red' : 'warn')}
      ${kpiCard('Daily Pace Needed', `$${pace.toFixed(2)}`, onPace ? 'On track ✓' : 'Behind — act now', onPace ? 'green' : 'red')}
      ${kpiCard('Live Listings',   `${live}`, `${ready} ready to upload`, live >= 5 ? 'green' : 'warn')}
      ${kpiCard('Est. Monthly',    `$${monthly.toFixed(0)}`, 'projected run-rate', 'blue')}
      ${kpiCard('Atlas Mastery',   `${atlas.mastery}%`, `+${atlas.trend} this session`, 'blue')}
    </div>

    <!-- Auto-pilot + Launch readiness -->
    <div class="grid-2">
      <div class="card autopilot-card">
        <div class="section-header">
          <div>
            <div class="eyebrow">Autonomous Mode</div>
            <div class="section-title">Agent Auto-Pilot</div>
          </div>
          <span id="autopilot-status" class="autopilot-badge ${state.autoPilot ? 'on' : 'off'}">${state.autoPilot ? '▶ Auto-Pilot ON' : '◼ Auto-Pilot OFF'}</span>
        </div>
        <p class="text-muted mt-4">When enabled, agents run every 45 seconds — scoring opportunities, refining listings, and logging findings. You approve; they execute.</p>
        <div class="ap-stats mt-12">
          <div class="ap-stat"><div class="ap-val">${autoEventIdx}</div><div class="ap-label">Auto cycles run</div></div>
          <div class="ap-stat"><div class="ap-val">${state.agents.reduce((s,a) => s + a.trend, 0)}</div><div class="ap-label">Mastery points gained</div></div>
          <div class="ap-stat"><div class="ap-val">${state.activity.length}</div><div class="ap-label">Activity log entries</div></div>
        </div>
        <button class="btn ${state.autoPilot ? 'archive' : 'primary'} mt-12" id="btn-autopilot">${state.autoPilot ? 'Pause Auto-Pilot' : 'Enable Auto-Pilot'}</button>
      </div>
      ${renderLaunchBlock(readiness)}
    </div>

    <!-- Success plan + learning log -->
    <div class="grid-2">
      <div class="card">
        <div class="section-header">
          <span class="section-title">75%+ Success Plan</span>
          <button class="btn primary" id="btn-launch-success">Activate All</button>
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <div style="flex:1">
            <div class="text-muted" style="font-size:.72rem;margin-bottom:4px">Success probability</div>
            <div class="progress success thick"><div style="width:${prob}%"></div></div>
          </div>
          <div style="font-size:1.8rem;font-weight:900;color:var(--text);flex-shrink:0;">${prob}%</div>
        </div>
        <div class="success-list">
          ${state.successPlan.map(l => `
            <div class="success-item ${l.status}">
              <div style="flex:1">
                <div class="si-title">${l.title}</div>
                <div class="si-meta">${l.owner} &nbsp;·&nbsp; +${l.impact} pts &nbsp;·&nbsp; <span class="${l.status === 'active' ? 'text-success' : 'text-muted'}">${l.status}</span></div>
                <div class="si-action">${l.action}</div>
              </div>
              <button class="pill success-toggle" data-id="${l.id}">${l.status === 'queued' ? 'Activate' : '✓ Active'}</button>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="section-header"><span class="section-title">Learning Loop</span></div>
        <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px;">
          ${state.learningLog.slice(0,6).map(l => `
            <div class="log-item">
              <span class="log-agent">${l.agent}</span>
              <span class="log-lesson">${l.lesson}</span>
              <span class="log-time">${l.time}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Launch agents + funding -->
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><span class="section-title">Pre-Launch Agents Needed</span></div>
        <p class="text-muted mt-4">Atlas flags these as required before external publishing or paid spend.</p>
        <div class="success-list mt-8">
          ${state.launchAgents.map(a => `
            <div class="success-item ${a.status === 'active' ? 'active' : ''}">
              <div style="flex:1">
                <div class="si-title">${a.name}</div>
                <div class="si-meta">${a.role} &nbsp;·&nbsp; ${a.priority} priority &nbsp;·&nbsp; <span class="${a.status === 'active' ? 'text-success' : 'text-muted'}">${a.status}</span></div>
                <div class="si-action">${a.why}</div>
              </div>
              <button class="pill agent-toggle" data-id="${a.id}">${a.status === 'needed' ? 'Create' : '✓ Active'}</button>
            </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="section-header"><span class="section-title">Funding ROI Planner</span></div>
        <p class="text-muted mt-4">Conservative estimates — all spend is gated behind owner approval.</p>
        <div class="investment-grid mt-8">
          ${state.investmentPlan.map(t => `
            <div class="investment-card">
              <div class="inv-label">${t.label}</div>
              <div class="inv-spend">$${t.spend}</div>
              <div class="inv-projected">→ $${t.projected}</div>
              <div class="inv-conf">${t.confidence}% confidence &nbsp;·&nbsp; ${t.roi}</div>
              <div class="inv-desc mt-4">${t.use}</div>
              <button class="pill fund-tier mt-8" data-id="${t.id}">Review Spend</button>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Atlas oversight -->
    <div class="card">
      <div class="section-header">
        <span class="section-title">Atlas Oversight Layer</span>
        <button class="pill" id="btn-atlas-review">Run Atlas Review</button>
      </div>
      <div class="agent-grid mt-12">
        ${state.agents.map(ag => `
          <div class="agent-card">
            <div class="agent-header">
              <div><div class="agent-role">${ag.role}</div><div class="agent-name">${ag.name}</div></div>
              <div class="agent-mastery">${ag.mastery}% <span class="text-success" style="font-size:.7rem">+${ag.trend}</span></div>
            </div>
            <div class="progress agent"><div style="width:${ag.mastery}%"></div></div>
            <div class="agent-focus">${ag.focus}</div>
            <div class="agent-directive">${ag.directive}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Etsy connection -->
    <div class="card etsy-card">
      <div class="section-header">
        <div><div class="eyebrow">Marketplace</div><span class="section-title">Etsy Integration</span></div>
        <div id="etsy-status-badge">${typeof EtsyAPI !== 'undefined' ? EtsyAPI.statusBadgeHTML() : '<span class="autopilot-badge off">Loading…</span>'}</div>
      </div>
      <p class="text-muted mt-4">Connect your Etsy shop to pull live listing stats, sync transactions, and let Performance Agent compare projected vs actual revenue automatically.</p>
      <div class="etsy-features mt-8">
        <div class="etsy-feat"><span class="text-success">↓</span> Pull live view & CVR data</div>
        <div class="etsy-feat"><span class="text-success">↓</span> Sync real transaction revenue</div>
        <div class="etsy-feat"><span class="text-success">↑</span> Push approved listings directly</div>
        <div class="etsy-feat"><span class="text-accent">⬡</span> Auto-detect winner/loser status</div>
      </div>
      ${typeof EtsyAPI !== 'undefined' && EtsyAPI.isConnected() ? `<button class="btn primary mt-12" id="btn-etsy-sync">Sync Now</button>` : ''}
    </div>

    <!-- Activity feed -->
    <div class="card">
      <div class="section-header"><span class="section-title">Agent Activity Log</span></div>
      <div class="feed mt-8">
        ${state.activity.slice(0,15).map(e => `
          <div class="feed-item"><span>${e.msg}</span><span class="time">${e.time}</span></div>`).join('')}
      </div>
    </div>`;

  /* Wire events */
  const nbaBtn = view.querySelector('#nba-cta-btn');
  if (nbaBtn) nbaBtn.onclick = () => {
    if (nba.view) switchView(nba.view);
    else runAtlasReview();
  };
  view.querySelector('#btn-atlas-review').onclick = runAtlasReview;
  view.querySelector('#btn-launch-success').onclick = launchSuccessPlan;
  view.querySelector('#btn-autopilot').onclick = toggleAutoPilot;
  view.querySelectorAll('.success-toggle').forEach(b => b.onclick = () => activateSuccessLever(b.dataset.id));
  view.querySelectorAll('.agent-toggle').forEach(b => b.onclick = () => createLaunchAgent(b.dataset.id));
  view.querySelectorAll('.fund-tier').forEach(b => b.onclick = () => reviewFundingTier(b.dataset.id));
  const prepBtn = view.querySelector('#btn-prepare-launch');
  if (prepBtn) prepBtn.onclick = prepareLaunchPack;
  const briefBtn = view.querySelector('#btn-open-brief');
  if (briefBtn) briefBtn.onclick = openLaunchBrief;
  const syncBtn = view.querySelector('#btn-etsy-sync');
  if (syncBtn) syncBtn.onclick = runEtsySync;
}

async function runEtsySync() {
  if (typeof EtsyAPI === 'undefined' || !EtsyAPI.isConnected()) {
    toast('Connect your Etsy shop first.', 'warn'); return;
  }
  toast('Syncing with Etsy…', 'info');
  try {
    const patch = await EtsyAPI.syncToAtlas(state);
    if (patch.listings?.length) {
      patch.listings.forEach(el => {
        const local = state.listings.find(l => l.id === el.id || l.name === el.title);
        if (local) { local.views = el.views || local.views; local.cvr = el.cvr || local.cvr; local.revenue = el.revenue || local.revenue; }
      });
    }
    if (patch.activity?.length) logAction(patch.activity[0].msg);
    persist(); rerenderAll();
    toast('Etsy sync complete — metrics updated.', 'success');
  } catch(e) { toast('Etsy sync failed: ' + e.message, 'warn'); }
}

function kpiCard(label, val, sub, color, extra = '') {
  return `<div class="kpi-card ${color}"><div class="accent-bar"></div><div class="kpi-label">${label}</div><div class="kpi-num">${val}</div><div class="text-muted mt-4">${sub}</div>${extra}</div>`;
}

function renderLaunchBlock(readiness) {
  const score = readiness.score;
  return `<div class="card launch-card">
    <div class="launch-score-wrap">
      <div class="launch-score">${score}</div>
      <div><div class="eyebrow">Launch Control</div><div class="launch-title">${launchLabel(score)}</div><div class="launch-desc">Readiness ${score}/100. Clear every gate before spending or publishing externally.</div></div>
    </div>
    <div class="progress success thick"><div style="width:${score}%"></div></div>
    <div class="launch-grid mt-12">
      ${readiness.checks.map(c => `
        <div class="launch-check ${c.passed ? 'passed' : ''}">
          <div class="launch-icon">${c.passed ? '✓' : '!'}</div>
          <div><div class="launch-check-label">${c.label}</div><div class="launch-check-val">${c.value} &nbsp;·&nbsp; ${c.points} pts</div></div>
        </div>`).join('')}
    </div>
    <div class="launch-actions mt-12">
      <button class="btn primary" id="btn-prepare-launch">Prepare Launch Pack</button>
      <button class="pill" id="btn-open-brief">Open Launch Brief</button>
    </div>
  </div>`;
}

/* ─── Atlas actions ────────────────────────────────────────────────── */
function runAtlasReview() {
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived).length;
  const revisions = state.approvals.filter(a => a.status === 'revise'  && !a.archived).length;
  const drafts    = state.listings.filter(l => ['idea','draft','needs update'].includes(l.status)).length;
  state.agents = state.agents.map(ag => ({ ...ag, mastery: Math.min(99, ag.mastery + (ag.id === 'atlas' ? 2 : 1)), trend: ag.trend + 1 }));
  const lesson = revisions ? 'Atlas detected revision drag — instructed agents to tighten rationale before resubmission.'
    : pending  ? 'Atlas found approval throughput is the bottleneck — prioritizing owner decisions.'
    : drafts   ? 'Atlas redirected specialists toward converting drafts into approval-ready listings.'
    : 'Atlas confirmed the operator loop is healthy and shifted focus to revenue pacing.';
  state.learningLog.unshift({ agent:'Atlas', lesson, time: nowTs() });
  state.learningLog = state.learningLog.slice(0, 8);
  logAction(`Atlas reviewed all ${state.agents.length} agents and strengthened the operator network.`);
  persist(); rerenderAll();
  toast('Atlas review complete — all specialist agents updated.', 'success');
}

function launchSuccessPlan() {
  state.successPlan.forEach(l => { if (l.status === 'queued') l.status = 'active'; });
  if (!state.approvals.some(a => a.type === 'Atlas 75+ Success Sprint' && a.status === 'pending' && !a.archived))
    pushApproval({ type:'Atlas 75+ Success Sprint', item:'45-day Etsy revenue plan', listingId:null, why:'Activates the focused execution system to move success odds from 45% to 75%+.', conf:0.76, agent:'Atlas' });
  state.learningLog.unshift({ agent:'Atlas', lesson:'Moved to 75%+ execution mode — all success levers activated.', time: nowTs() });
  state.learningLog = state.learningLog.slice(0, 8);
  logAction(`Atlas launched the 75+ push. Success probability: ${successProb()}%.`);
  persist(); rerenderAll();
  toast('75+ Push launched — success plan active and queued for approval.', 'success');
}

function activateSuccessLever(id) {
  const lever = state.successPlan.find(l => l.id === id);
  if (!lever || lever.status !== 'queued') return;
  lever.status = 'active';
  state.learningLog.unshift({ agent: lever.owner, lesson: `Activated: ${lever.title}.`, time: nowTs() });
  logAction(`${lever.owner} activated: ${lever.title} (+${lever.impact} probability pts).`);
  persist(); rerenderAll();
  toast(`Lever activated: ${lever.title}`, 'success');
}

function createLaunchAgent(id) {
  const agent = state.launchAgents.find(a => a.id === id);
  if (!agent || agent.status === 'active') return;
  agent.status = 'active';
  state.learningLog.unshift({ agent:'Atlas', lesson: `Created ${agent.name} to cover ${agent.role}.`, time: nowTs() });
  logAction(`Atlas created ${agent.name} — ${agent.role} now active.`);
  persist(); rerenderAll();
  toast(`${agent.name} is now active.`, 'success');
}

function reviewFundingTier(id) {
  const tier = state.investmentPlan.find(t => t.id === id);
  if (!tier) return;
  if (!state.approvals.some(a => a.type === 'Funding Review' && a.item === tier.label && a.status === 'pending' && !a.archived))
    pushApproval({ type:'Funding Review', item:tier.label, listingId:null, why:`Evaluate $${tier.spend} allocation for ${tier.use} Projected 45-day revenue: $${tier.projected} at ${tier.confidence}% confidence (${tier.roi}).`, conf:tier.confidence/100, agent:'Pricing & ROI Agent' });
  logAction(`Pricing & ROI Agent queued ${tier.label} funding review.`);
  persist(); rerenderAll();
  toast(`${tier.label} queued for owner review.`, 'warn');
}

function prepareLaunchPack() {
  const r = launchReadiness();
  if (!state.approvals.some(a => a.type === 'Launch Pack Review' && a.status === 'pending' && !a.archived))
    pushApproval({ type:'Launch Pack Review', item:'Agent Atlas launch pack', listingId:null, why:`Owner review required. Readiness is ${r.score}/100 (${launchLabel(r.score)}).`, conf:r.score/100, agent:'Atlas' });
  logAction(`Atlas prepared the launch pack at ${r.score}/100 readiness.`);
  persist(); rerenderAll();
  openLaunchBrief();
  toast('Launch pack prepared and queued for owner approval.', 'info');
}

function openLaunchBrief() {
  const r = launchReadiness();
  const blockers  = r.checks.filter(c => !c.passed).map(c => `  - ${c.label}: ${c.value}`).join('\n') || '  - No critical blockers.';
  const agents    = state.launchAgents.filter(a => a.status === 'active').map(a => `  - ${a.name}: ${a.role}`).join('\n') || '  - No launch agents active yet.';
  const listings  = state.listings.filter(l => ['ready to upload','live'].includes(l.status)).map(l => `  - ${l.id} ${l.name} ($${l.price}) — ${l.status}`).join('\n') || '  - No ready/live listings.';
  const brief = `AGENT ATLAS — LAUNCH BRIEF
Readiness: ${r.score}/100 (${launchLabel(r.score)})
Success probability: ${successProb()}%
Days elapsed: ${daysElapsed()} / 45
Revenue: $${currentRevenue().toFixed(2)} / $500
Daily pace needed: $${dailyPaceNeeded().toFixed(2)}/day

BLOCKERS
${blockers}

ACTIVE LAUNCH AGENTS
${agents}

READY / LIVE LISTINGS
${listings}

OWNER RULE
No external publishing or paid spend until owner approval is recorded in the Approval Queue.`;
  openPanel('Launch Brief', `
    <div class="text-muted">Atlas-generated pre-launch brief for owner review.</div>
    <div class="copy-block" id="brief-text">${brief}<button class="copy-btn" onclick="copyText('brief-text')">Copy</button></div>`);
}

/* ─── Opportunities ────────────────────────────────────────────────── */
function renderOpportunities(filter = 'All') {
  const opts = ['All','Best Now','Easiest','Bundle','Seasonal'];
  const base = state.opportunities.filter(o => !o.archived);
  const data = filter === 'All' ? base : base.filter(o => o.filter === filter);
  const view = document.getElementById('opportunity-view');
  view.innerHTML = `
    <div class="filter-row">
      ${opts.map(f => `<button class="pill ${filter===f?'active':''}" data-filter="${f}">${f} <span style="color:var(--muted)">(${f==='All'?base.length:base.filter(o=>o.filter===f).length})</span></button>`).join('')}
    </div>
    <div class="card-grid">
      ${data.map(o => `
        <div class="op-card" data-id="${o.id}">
          <div class="row" style="margin-bottom:6px">
            <span class="badge ${o.status.toLowerCase()}">${o.status}</span>
            <span class="badge ${o.filter==='Best Now'?'live':o.filter==='Easiest'?'ready':'draft'}">${o.filter}</span>
          </div>
          <div class="op-title">${o.title}</div>
          <div class="op-niche">${o.niche}</div>
          <div class="op-stats">
            <div class="op-stat"><div class="op-stat-val">${o.score}</div><div class="op-stat-label">Score</div></div>
            <div class="op-stat"><div class="op-stat-val">${o.difficulty}/5</div><div class="op-stat-label">Difficulty</div></div>
            <div class="op-stat"><div class="op-stat-val">${o.bundle}/10</div><div class="op-stat-label">Bundle</div></div>
          </div>
        </div>`).join('')}
    </div>`;
  view.querySelectorAll('.pill[data-filter]').forEach(p => p.onclick = () => renderOpportunities(p.dataset.filter));
  view.querySelectorAll('.op-card').forEach(c => c.onclick = () => openOpportunityPanel(c.dataset.id));
}

function openOpportunityPanel(id) {
  const o = state.opportunities.find(x => x.id === id);
  const already = state.listings.find(l => l.name === o.title || l.name.includes(o.title));
  openPanel(o.title, `
    <div class="text-muted">${o.niche} &nbsp;·&nbsp; <span class="mono">${o.id}</span> &nbsp;·&nbsp; <span class="badge ${o.filter==='Best Now'?'live':'draft'}">${o.filter}</span></div>
    <div class="kpi-grid" style="grid-template-columns:repeat(3,1fr)">
      ${kpiCard('Score',      o.score,       'composite',  'blue')}
      ${kpiCard('Difficulty', `${o.difficulty}/5`, 'to build', 'warn')}
      ${kpiCard('Bundle Fit', `${o.bundle}/10`,    'potential', 'green')}
    </div>
    <div class="divider"></div>
    <div style="font-size:.82rem;color:var(--text2)"><strong>Why this sells:</strong> ${o.niche} operators search Etsy for ready-made paperwork when they're overwhelmed. This template solves an immediate operational pain with no design skill required from the buyer.</div>
    <div style="font-size:.82rem;color:var(--text2);margin-top:8px"><strong>Bundle path:</strong> Combine with 2–3 related ${o.niche} templates at $${(o.score+7).toFixed(2)} for a Core Niche Pack. Vault potential at $49.99 with 10+.</div>
    ${already ? `<div class="badge live">Already in pipeline: ${already.id}</div>` : `<button class="btn approve" id="create-draft-btn">Create Listing Draft</button>`}`);
  if (!already) document.getElementById('create-draft-btn').onclick = () => createListingFromOpportunity(o);
}

function createListingFromOpportunity(op) {
  const nextId  = `LS-${String(state.listings.length + 1).padStart(3,'0')}`;
  const copy    = getEtsyCopy(nextId, { category: op.niche, title: op.title });
  const listing = {
    id: nextId, name: op.title, price: Number((op.score + 1.99).toFixed(2)),
    buyer: `${op.niche} owner-operators`, bundle: `${op.niche} Starter Pack`,
    perf: 'N/A', status: 'draft', category: op.niche,
    views: 0, cvr: 0, revenue: 0,
    title: copy.title, tags: copy.tags, description: copy.desc,
    faq: copy.faq, imagePrompt: copy.imagePrompt,
  };
  state.listings.unshift(listing);
  state.selectedListingId = nextId;
  op.status = 'Converted';
  logAction(`Listing Agent created draft ${nextId} from ${op.id} with Etsy-optimized copy.`);
  persist(); rerenderAll();
  openListingEditor(nextId);
  toast(`Draft ${nextId} created with Etsy SEO copy ready to review.`, 'success');
}

/* ─── Listings ─────────────────────────────────────────────────────── */
function renderListings() {
  const active   = state.listings.filter(l => l.status !== 'archived');
  const selected = active.find(l => l.id === state.selectedListingId) || active[0];
  if (selected) state.selectedListingId = selected.id;
  const copy = selected ? getEtsyCopy(selected.id, selected) : null;

  const STAGES = ['draft','ready to upload','live'];

  const view = document.getElementById('listing-view');
  view.innerHTML = `
    <!-- Pipeline stage overview -->
    <div class="pipeline-strip">
      ${['draft','ready to upload','live'].map(stage => {
        const count = active.filter(l => l.status === stage).length;
        return `<div class="pipeline-stage">
          <div class="ps-count ${stage === 'live' ? 'live' : stage === 'ready to upload' ? 'ready' : ''}">${count}</div>
          <div class="ps-label">${stage}</div>
        </div>`;
      }).join('<div class="pipeline-arrow">→</div>')}
      <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
        <span class="badge">${active.filter(l=>l.status==='needs update').length} needs update</span>
        <span class="badge">${active.filter(l=>l.status==='idea').length} ideas</span>
      </div>
    </div>

    <!-- Listing table -->
    <div class="card">
      <div class="table-wrap">
        <table class="table">
          <thead><tr>
            <th>Product</th><th>Price</th><th>7d Views</th><th>CVR</th><th>7d Revenue</th><th>Perf</th><th>Status</th><th>Files</th><th></th>
          </tr></thead>
          <tbody>
            ${active.map(l => {
              const canAdvance = l.status === 'draft';
              const isLive = l.status === 'live';
              return `<tr class="${selected?.id === l.id ? 'selected-row' : ''}" data-select="${l.id}">
                <td><strong>${l.name}</strong></td>
                <td class="mono">$${l.price.toFixed(2)}</td>
                <td class="mono">${l.views || 0}</td>
                <td class="mono ${(l.cvr||0) >= 3 ? 'text-success' : ''}">${(l.cvr||0).toFixed(1)}%</td>
                <td class="mono ${(l.revenue||0) > 30 ? 'text-success' : ''}">$${(l.revenue||0).toFixed(2)}</td>
                <td><span class="badge ${l.perf==='Winner'?'live':''}">${l.perf}</span></td>
                <td><span class="badge ${statusBadgeClass(l.status)}">${l.status}</span></td>
                <td style="display:flex;gap:5px;flex-wrap:wrap">
                  <button class="pill preview-template" data-id="${l.id}" title="View form in browser" style="font-size:.68rem;padding:4px 8px">👁 View</button>
                  <button class="pill pdf-download" data-id="${l.id}" title="Download as PDF" style="font-size:.68rem;padding:4px 8px">⬇ PDF</button>
                  <button class="pill dl-product" data-id="${l.id}" title="Download product bundle" style="font-size:.68rem;padding:4px 8px">↓ Bundle</button>
                  <button class="pill gen-image" data-id="${l.id}" title="Generate mockup image" style="font-size:.68rem;padding:4px 8px">${typeof ImageGen !== 'undefined' && ImageGen.cache[l.id] ? '✓ Img' : '⬡ Image'}</button>
                </td>
                <td style="display:flex;gap:6px">
                  ${canAdvance ? `<button class="btn approve advance-listing" data-id="${l.id}" style="padding:5px 10px;font-size:.72rem">→ Submit</button>` : ''}
                  <button class="pill edit-listing" data-id="${l.id}">Edit</button>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Copy-ready blocks for selected listing -->
    ${copy ? `
    <div class="card">
      <div class="section-header">
        <span class="section-title">Etsy Copy &nbsp;<span class="mono text-muted" style="font-size:.75rem">${selected.id}</span></span>
        <button class="pill" onclick="copyText('copy-block-listing')">Copy All</button>
      </div>
      <div class="copy-meta">
        <span>Title: <strong>${copy.title.length}</strong> / 140 chars ${copy.title.length <= 140 ? '✓' : '⚠ too long'}</span>
        <span>Tags: <strong>${copy.tags.split(',').length}</strong> / 13 Etsy tags</span>
      </div>
      <div class="copy-block" id="copy-block-listing">ETSY TITLE (${copy.title.length} chars):
${copy.title}

TAGS (${copy.tags.split(',').length}):
${copy.tags}

DESCRIPTION:
${copy.desc}

FAQ:
${copy.faq}

IMAGE PROMPT:
${copy.imagePrompt}</div>
    </div>` : ''}`;

  view.querySelectorAll('tr[data-select]').forEach(r => r.onclick = () => { state.selectedListingId = r.dataset.select; persist(); renderListings(); });
  view.querySelectorAll('.edit-listing').forEach(b => b.onclick = e => { e.stopPropagation(); openListingEditor(b.dataset.id); });
  view.querySelectorAll('.advance-listing').forEach(b => b.onclick = e => { e.stopPropagation(); advanceListing(b.dataset.id); });
  view.querySelectorAll('.preview-template').forEach(b => b.onclick = e => { e.stopPropagation(); if (typeof openTemplate === 'function') openTemplate(b.dataset.id); else toast('Template engine loading…', 'info'); });
  view.querySelectorAll('.pdf-download').forEach(b => b.onclick = e => { e.stopPropagation(); if (typeof openTemplate === 'function') openTemplate(b.dataset.id, true); else toast('Template engine loading…', 'info'); });
  view.querySelectorAll('.dl-product').forEach(b => b.onclick = e => { e.stopPropagation(); if (typeof Products !== 'undefined') Products.download(b.dataset.id); else toast('Product engine loading…', 'info'); });
  view.querySelectorAll('.gen-image').forEach(b => b.onclick = async e => {
    e.stopPropagation();
    if (typeof ImageGen === 'undefined') { toast('Image engine loading…', 'info'); return; }
    if (!ImageGen.config.apiKey) { openImageSettings(); return; }
    toast(`Generating mockup for ${b.dataset.id}…`, 'info');
    const result = await ImageGen.generate(b.dataset.id);
    if (result.url) { toast('Mockup image generated!', 'success'); renderListings(); }
    else toast('Image generation failed — check API key in settings.', 'warn');
  });
}

function advanceListing(id) {
  const l = state.listings.find(x => x.id === id);
  if (!l || l.status !== 'draft') return;
  pushApproval({ type:'Publish Listing', item:l.name, listingId:l.id, why:`Listing Agent completed Etsy copy optimization. Title is ${getEtsyCopy(l.id, l).title.length} chars, 13 tags set, description and FAQ ready.`, conf:0.82, agent:'Listing Agent' });
  l.status = 'ready to upload';
  logAction(`Listing Agent submitted ${l.id} for approval — ready to upload status set.`);
  persist(); rerenderAll();
  toast(`${l.id} submitted for approval — go approve it to get it live.`, 'info');
}

function statusBadgeClass(s) {
  if (s === 'live') return 'live';
  if (s === 'draft' || s === 'idea') return 'draft';
  if (s === 'ready to upload') return 'ready';
  if (s === 'review' || s === 'needs update') return 'review';
  return '';
}

function openListingEditor(id, revisionApprovalId = null) {
  const l    = state.listings.find(x => x.id === id);
  if (!l) return;
  const copy = getEtsyCopy(l.id, l);
  openPanel(`Edit ${l.id}`, `
    <label>Etsy Title <span style="color:var(--muted);font-size:.7rem">(max 140 chars)</span><input id="f-title" value="${esc(copy.title)}" maxlength="140" /></label>
    <label>Price ($)<input id="f-price" type="number" step="0.01" value="${l.price}" /></label>
    <label>Target Buyer<input id="f-buyer" value="${esc(l.buyer)}" /></label>
    <label>Status<select id="f-status">
      ${['idea','draft','ready to upload','live','needs update','archived'].map(s => `<option ${l.status===s?'selected':''}>${s}</option>`).join('')}
    </select></label>
    <label>Etsy Tags <span style="color:var(--muted);font-size:.7rem">(comma-separated, max 13)</span><input id="f-tags" value="${esc(copy.tags)}" /></label>
    <label>Description<textarea id="f-desc">${esc(copy.desc)}</textarea></label>
    <label>FAQ<textarea id="f-faq" style="min-height:60px">${esc(copy.faq)}</textarea></label>
    <label>Image Prompt<textarea id="f-imgprompt" style="min-height:60px">${esc(copy.imagePrompt)}</textarea></label>
    <div class="divider"></div>
    <label>Recommendation Type<select id="rec-type"><option>Publish Listing</option><option>Price Update</option><option>Content Refresh</option></select></label>
    <label>Rationale<textarea id="rec-why">Listing is Etsy-optimized with buyer-specific copy, 13 tags, and compliant description.</textarea></label>
    <label>Confidence<select id="rec-conf">
      <option value="0.65">65%</option><option value="0.75" selected>75%</option><option value="0.85">85%</option><option value="0.92">92%</option>
    </select></label>
    <label>Source Agent<select id="rec-agent"><option>Listing Agent</option><option>Performance Agent</option><option>Approval Agent</option></select></label>
    <div class="actions">
      <button class="btn approve" id="save-listing-btn">Save</button>
      <button class="btn sendback" id="submit-rec-btn">Submit for Approval</button>
      ${revisionApprovalId ? `<button class="btn primary" id="resubmit-revision-btn">Re-submit Approval</button>` : ''}
    </div>`);

  document.getElementById('save-listing-btn').onclick = () => {
    if (!ETSY_COPY[l.id]) ETSY_COPY[l.id] = {};
    ETSY_COPY[l.id].title       = document.getElementById('f-title').value;
    ETSY_COPY[l.id].tags        = document.getElementById('f-tags').value;
    ETSY_COPY[l.id].desc        = document.getElementById('f-desc').value;
    ETSY_COPY[l.id].faq         = document.getElementById('f-faq').value;
    ETSY_COPY[l.id].imagePrompt = document.getElementById('f-imgprompt').value;
    l.title  = ETSY_COPY[l.id].title;
    l.price  = parseFloat(document.getElementById('f-price').value);
    l.buyer  = document.getElementById('f-buyer').value;
    l.status = document.getElementById('f-status').value;
    l.tags   = ETSY_COPY[l.id].tags;
    state.selectedListingId = l.id;
    if (revisionApprovalId) { const rev = state.approvals.find(a => a.id === revisionApprovalId); if (rev) pushHistory(rev, 'edited during revision'); }
    logAction(`Listing Agent updated ${l.id} (${l.name}) — status: ${l.status}.`);
    persist(); rerenderAll();
    toast(`${l.id} saved.`, 'success');
  };

  document.getElementById('submit-rec-btn').onclick = () => {
    submitRecommendation(l, { type: document.getElementById('rec-type').value, why: document.getElementById('rec-why').value, conf: parseFloat(document.getElementById('rec-conf').value), agent: document.getElementById('rec-agent').value });
    persist(); rerenderAll();
    toast('Submitted to Approval Queue.', 'info');
  };

  const resubBtn = document.getElementById('resubmit-revision-btn');
  if (resubBtn) resubBtn.onclick = () => resubmitApproval(revisionApprovalId);
}

/* ─── Approvals ────────────────────────────────────────────────────── */
function renderApprovals() {
  const pending   = state.approvals.filter(a => a.status === 'pending' && !a.archived);
  const revisions = state.approvals.filter(a => a.status === 'revise'  && !a.archived);
  const audit     = state.approvals.slice().reverse().slice(0, 12);
  const view      = document.getElementById('approval-view');

  view.innerHTML = `
    <div class="kpi-grid">
      ${kpiCard('Pending Decisions', pending.length, 'awaiting owner — act now', pending.length > 0 ? 'warn' : 'green')}
      ${kpiCard('In Revision', revisions.length, 'items sent back for rework', 'blue')}
      ${kpiCard('Total Actions', state.approvals.length, 'all-time approval events', 'blue')}
    </div>
    ${pending.length ? `
    <div class="card">
      <div class="section-header"><span class="section-title">Pending Approvals</span><span class="text-muted" style="font-size:.78rem">Every pending item delays revenue</span></div>
      <div class="card-grid mt-8">${pending.map(a => approvalCard(a)).join('')}</div>
    </div>` : `<div class="card"><p class="text-muted" style="text-align:center;padding:20px">✓ No pending approvals — queue is clear.</p></div>`}
    ${revisions.length ? `
    <div class="card">
      <div class="section-header"><span class="section-title">Revision Queue</span></div>
      <div class="card-grid mt-8">
        ${revisions.map(a => `
          <div class="approval-card">
            <div class="approval-type">Revision Requested</div>
            <div class="approval-item">${a.item}</div>
            <div class="approval-why">${a.revisionReason || a.why}</div>
            <div class="approval-meta">${a.agent} &nbsp;·&nbsp; ${(a.conf*100).toFixed(0)}% &nbsp;·&nbsp; Sent back: ${a.revisedAt || a.createdAt}</div>
            <div class="actions">
              <button class="pill open-revise" data-id="${a.id}">Open Editor</button>
              <button class="btn approve resubmit" data-id="${a.id}">Re-submit</button>
              <button class="pill view-audit" data-id="${a.id}">Audit</button>
            </div>
          </div>`).join('')}
      </div>
    </div>` : ''}
    <div class="card">
      <div class="section-header"><span class="section-title">Audit Trail</span></div>
      <div class="audit-list mt-8">
        ${audit.map(a => `
          <div class="audit-row">
            <div>
              <strong style="font-size:.85rem">${a.item}</strong>
              <p class="text-muted">${a.type} &nbsp;·&nbsp; ${a.agent} &nbsp;·&nbsp; ${(a.conf*100).toFixed(0)}% &nbsp;·&nbsp; <span class="${a.status==='approved'?'text-success':a.status==='revise'?'text-warn':''}">${a.status}</span></p>
            </div>
            <button class="pill view-audit" data-id="${a.id}">Audit</button>
          </div>`).join('') || '<p class="text-muted">No audited actions yet.</p>'}
      </div>
    </div>`;

  view.querySelectorAll('.approve:not(.resubmit)').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'approve'));
  view.querySelectorAll('.sendback').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'sendback'));
  view.querySelectorAll('.archive').forEach(b => b.onclick = () => handleApproval(b.dataset.id, 'archive'));
  view.querySelectorAll('.open-revise').forEach(b => b.onclick = () => { const a = state.approvals.find(x => x.id === b.dataset.id); if (a?.listingId) { pushHistory(a,'opened for revision'); logAction(`Opened revision editor for ${a.item}.`); persist(); openListingEditor(a.listingId, a.id); } });
  view.querySelectorAll('.resubmit').forEach(b => b.onclick = () => resubmitApproval(b.dataset.id));
  view.querySelectorAll('.view-audit').forEach(b => b.onclick = () => openAuditPanel(b.dataset.id));
}

function approvalCard(a) {
  return `<div class="approval-card ${a.important ? 'important' : ''}">
    <div class="approval-type">${a.type}</div>
    <div class="approval-item">${a.item}</div>
    <div class="approval-why">${a.why}</div>
    <div class="approval-meta">${a.agent} &nbsp;·&nbsp; ${a.createdAt}</div>
    <div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);margin-bottom:3px"><span>Agent confidence</span><span>${(a.conf*100).toFixed(0)}%</span></div>
      <div class="conf-bar"><div style="width:${a.conf*100}%"></div></div>
    </div>
    <div class="actions">
      <button class="btn approve" data-id="${a.id}">✓ Approve</button>
      <button class="btn sendback" data-id="${a.id}">Send Back</button>
      <button class="btn archive" data-id="${a.id}">Archive</button>
      <button class="pill view-audit" data-id="${a.id}">Audit</button>
    </div>
  </div>`;
}

function handleApproval(id, action) {
  const item    = state.approvals.find(a => a.id === id);
  if (!item) return;
  const listing = item.listingId ? state.listings.find(l => l.id === item.listingId) : null;

  if (action === 'approve') {
    // Run compliance gate before approving publish actions
    if (item.type === 'Publish Listing' && listing && typeof Compliance !== 'undefined') {
      const gate = Compliance.prePublishCheck(listing);
      if (!gate.approved) {
        toast(`Compliance blocked: ${gate.blockers[0]}`, 'warn');
        logAction(`Compliance Agent blocked publish for ${listing.name}: ${gate.blockers[0]}`);
        return;
      }
    }
    item.status = 'approved';
    if (listing) {
      listing.status = item.type === 'Publish Listing' ? 'live' : 'ready to upload';
      if (item.type === 'Publish Listing') {
        listing.views   = Math.floor(40 + Math.random() * 60);
        listing.cvr     = parseFloat((1.5 + Math.random() * 2).toFixed(1));
        listing.revenue = parseFloat((listing.price * Math.floor(listing.views * listing.cvr / 100)).toFixed(2));
        listing.perf    = listing.cvr >= 3 ? 'Winner' : 'Stable';
      }
    }
    if (item.type === 'Price Increase' && listing) listing.price = parseFloat((listing.price + 1).toFixed(2));
    pushHistory(item, 'approved by owner');
    logAction(`Owner approved ${item.type} for "${item.item}" — ${listing?.status === 'live' ? 'listing is now live' : 'status updated'}.`);
    toast(listing?.status === 'live' ? `${item.item} is now LIVE on Etsy!` : `Approved: ${item.item}`, 'success');
    // Seed post-close agent with demo order when listing goes live
    if (listing?.status === 'live' && typeof PostCloseAgent !== 'undefined') {
      PostCloseAgent.addOrder({ id:`ORD-${Date.now()}`, listingId:listing.id, listingName:listing.name, buyerName:'New Buyer', category:listing.category, orderedAt:Date.now() });
    }
  }
  if (action === 'sendback') {
    item.status = 'revise'; item.revisedAt = nowTs();
    item.revisionReason = `Owner requested changes: ${item.why}`;
    if (listing) listing.status = 'needs update';
    pushHistory(item, 'sent back for revision');
    logAction(`Sent back for revision: ${item.item}.`);
    toast(`Sent back: ${item.item}`, 'warn');
  }
  if (action === 'archive') {
    item.archived = true; item.status = 'archived';
    if (listing && listing.status !== 'live') listing.status = 'archived';
    pushHistory(item, 'archived by owner');
    logAction(`Archived: ${item.item}.`);
    toast(`Archived: ${item.item}`, 'warn');
  }
  persist(); rerenderAll();
}

function openAuditPanel(approvalId) {
  const a = state.approvals.find(x => x.id === approvalId); if (!a) return;
  const listing = a.listingId ? state.listings.find(l => l.id === a.listingId) : null;
  openPanel('Approval Audit', `
    <div class="text-muted"><span class="mono">${a.id}</span> &nbsp;·&nbsp; <span class="${a.status==='approved'?'text-success':a.status==='revise'?'text-warn':''}">${a.status}</span></div>
    <div style="font-weight:700;font-size:.95rem">${a.item}</div>
    <div class="text-muted">${a.type} &nbsp;·&nbsp; ${a.agent} &nbsp;·&nbsp; ${(a.conf*100).toFixed(0)}% confidence</div>
    <div style="font-size:.8rem;color:var(--text2)">${a.why}</div>
    ${listing ? `<div class="copy-block">Linked: ${listing.id}\nStatus: ${listing.status}\nPrice: $${listing.price}\n7d Revenue: $${(listing.revenue||0).toFixed(2)}</div>` : ''}
    <div style="font-weight:700;margin-top:4px">Event History</div>
    <div class="history-list">
      ${(a.history||[]).map(h => `<div class="history-item"><span class="history-time mono">${h.time}</span><span class="history-event">${h.event}${h.agent?` · ${h.agent}`:''}${h.confidence?` · ${(h.confidence*100).toFixed(0)}%`:''}</span></div>`).join('') || '<div class="history-item"><span class="history-event text-muted">No audit events yet.</span></div>'}
    </div>
    ${listing ? `<button class="pill mt-8" id="audit-open-listing-btn">Open Listing Editor</button>` : ''}`);
  const ob = document.getElementById('audit-open-listing-btn');
  if (ob) ob.onclick = () => openListingEditor(listing.id, a.status === 'revise' ? a.id : null);
}

function resubmitApproval(approvalId) {
  const old = state.approvals.find(x => x.id === approvalId); if (!old) return;
  const newId = `AP-${String(state.approvals.length+1).padStart(3,'0')}`;
  state.approvals.push({ ...old, id:newId, status:'pending', archived:false, createdAt:nowTs(), revisionReason:null, revisedAt:null, history:[...(old.history||[]),{event:'resubmitted',time:nowTs()}] });
  old.archived = true; old.status = 'resubmitted';
  pushHistory(old, 'resubmission triggered');
  logAction(`${old.agent} re-submitted ${old.item} for approval.`);
  persist(); rerenderAll();
  toast('Re-submitted for approval.', 'info');
}

/* ─── Revenue ──────────────────────────────────────────────────────── */
function renderRevenue() {
  const rev       = currentRevenue();
  const monthly   = estimateMonthly();
  const elapsed   = daysElapsed();
  const remaining = daysRemaining();
  const pace      = dailyPaceNeeded();
  const onPace    = isOnPace();
  const live      = state.listings.filter(l => l.status === 'live');
  const sorted    = state.listings.filter(l => ['live','ready to upload'].includes(l.status)).sort((a,b) => (b.revenue||b.price*3) - (a.revenue||a.price*3));
  const maxVal    = sorted.reduce((m,l) => Math.max(m, l.revenue||l.price*3), 1);

  // Day-by-day projection data
  const dailyRate = elapsed > 0 ? rev / elapsed : 0;
  const projDays  = Array.from({length:45}, (_,i) => Math.min(500, dailyRate * i));
  const barH      = projDays.map(v => Math.max(2, (v / 500) * 60));

  const view = document.getElementById('revenue-view');
  view.innerHTML = `
    <div class="kpi-grid">
      ${kpiCard('Revenue Earned',   `$${rev.toFixed(2)}`, `of $500 goal`, 'blue', `<div class="progress slim mt-4"><div style="width:${Math.min(rev/5,100)}%"></div></div>`)}
      ${kpiCard('Days Elapsed',     `${elapsed} / 45`, `${remaining} days left`,   elapsed > 35 ? 'red' : 'warn')}
      ${kpiCard('Daily Pace Needed', `$${pace.toFixed(2)}/day`, onPace ? 'On track ✓' : 'Behind — add listings', onPace ? 'green' : 'red')}
      ${kpiCard('Monthly Run-Rate', `$${monthly.toFixed(0)}`, 'if pace holds', 'green')}
    </div>

    <!-- Progress + projection -->
    <div class="grid-2">
      <div class="card">
        <div class="section-header"><span class="section-title">45-Day Goal Progress</span></div>
        <div style="font-size:2.4rem;font-weight:900;font-variant-numeric:tabular-nums;margin:8px 0">${rev < 500 ? `$${rev.toFixed(2)}` : '<span class="text-success">$500+ ✓</span>'} <span style="font-size:1rem;font-weight:400;color:var(--muted)">/ $500</span></div>
        <div class="progress success thick"><div style="width:${Math.min(rev/5,100)}%"></div></div>
        <div class="rev-stats mt-12">
          <div class="rev-stat"><div class="rev-val">$${(500-rev).toFixed(2)}</div><div class="rev-label">Remaining</div></div>
          <div class="rev-stat"><div class="rev-val ${onPace?'text-success':'text-warn'}">${onPace?'On Track':'Behind'}</div><div class="rev-label">Pace status</div></div>
          <div class="rev-stat"><div class="rev-val">${live.length}</div><div class="rev-label">Live listings</div></div>
          <div class="rev-stat"><div class="rev-val">$${(rev/Math.max(elapsed,1)).toFixed(2)}</div><div class="rev-label">Actual daily avg</div></div>
        </div>
      </div>
      <div class="card">
        <div class="section-header"><span class="section-title">45-Day Projection</span></div>
        <div style="font-size:.72rem;color:var(--muted);margin-bottom:8px">At current pace — goal line at $500</div>
        <div class="proj-chart">
          ${barH.map((h,i) => `<div class="proj-bar ${projDays[i]>=500?'goal':''}" style="height:${h}px" title="Day ${i}: $${projDays[i].toFixed(0)}"></div>`).join('')}
          <div class="proj-goal-line"></div>
        </div>
        <div class="proj-labels">
          <span>Day 1</span><span>Day 15</span><span>Day 30</span><span>Day 45</span>
        </div>
      </div>
    </div>

    <!-- Listing breakdown -->
    <div class="card">
      <div class="section-header"><span class="section-title">Listing Performance Breakdown</span></div>
      <div class="spark-wrap mt-8">
        ${sorted.map(l => {
          const val = l.revenue || l.price * 3;
          const h   = Math.max(8, (val / maxVal) * 90);
          return `<div class="spark-bar ${l.perf==='Winner'?'winner':''}" style="height:${h}%" title="${l.name}: $${val.toFixed(0)}"></div>`;
        }).join('')}
      </div>
      <div class="table-wrap mt-12">
        <table class="table">
          <thead><tr><th>Listing</th><th>Price</th><th>7d Views</th><th>CVR</th><th>7d Revenue</th><th>Status</th><th>Performance</th></tr></thead>
          <tbody>
            ${sorted.map(l => `<tr>
              <td><strong>${l.name}</strong></td>
              <td class="mono">$${l.price.toFixed(2)}</td>
              <td class="mono">${l.views||0}</td>
              <td class="mono ${(l.cvr||0)>=3?'text-success':''}">${(l.cvr||0).toFixed(1)}%</td>
              <td class="mono ${(l.revenue||0)>30?'text-success':''}">$${(l.revenue||0).toFixed(2)}</td>
              <td><span class="badge ${statusBadgeClass(l.status)}">${l.status}</span></td>
              <td><span class="badge ${l.perf==='Winner'?'live':''}">${l.perf}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bundle ladder -->
    <div class="card">
      <div class="section-header"><span class="section-title">Bundle Revenue Ladder</span></div>
      <div class="kpi-grid">
        ${[
          { tier:'Entry',   price:'$4.99–8.99', offer:'Single Template',             units:12, proj:72  },
          { tier:'Core',    price:'$14.99',      offer:'Niche Starter Pack (3–5 docs)', units:6,  proj:90  },
          { tier:'Pro',     price:'$29.99',      offer:'Back-Office Ops Bundle (10)',  units:3,  proj:90  },
          { tier:'Premium', price:'$49.99',      offer:'Admin Vault (20+)',             units:2,  proj:100 },
        ].map(b => kpiCard(b.tier, b.price, `${b.offer} — ${b.units} units/mo → $${b.proj}/mo`, 'blue')).join('')}
      </div>
    </div>`;
}

/* ─── Shared helpers ───────────────────────────────────────────────── */
function pushApproval({ type, item, listingId, why, conf, agent }) {
  const id = `AP-${String(state.approvals.length+1).padStart(3,'0')}`;
  state.approvals.push({ id, type, item, listingId, why, conf, agent, important:true, status:'pending', archived:false, createdAt:nowTs(), history:[{event:'submitted for approval',time:nowTs(),agent,confidence:conf,item}] });
}
function submitRecommendation(listing, payload) {
  pushApproval({ type:payload.type, item:listing.name||listing.title, listingId:listing.id, why:payload.why, conf:payload.conf, agent:payload.agent });
  logAction(`${payload.agent} submitted recommendation for ${listing.id} (${payload.type}, ${(payload.conf*100).toFixed(0)}%).`);
}
function pushHistory(item, event) { item.history = item.history||[]; item.history.push({event, time:nowTs(), agent:item.agent, confidence:item.conf, item:item.item}); }
function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function copyText(id) { const el = document.getElementById(id); if (!el) return; navigator.clipboard.writeText(el.innerText || el.textContent).then(() => toast('Copied to clipboard.','success')); }

/* ─── Side panel ───────────────────────────────────────────────────── */
function openPanel(title, html) {
  document.getElementById('panel-title').textContent = title;
  document.getElementById('panel-content').innerHTML = html;
  document.getElementById('side-panel').classList.add('open');
  document.getElementById('overlay').classList.add('active');
}
function closePanel() {
  document.getElementById('side-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
}

/* ─── Post-Close view ──────────────────────────────────────────────── */
function renderPostClose() {
  const view = document.getElementById('postclose-view');
  if (typeof PostCloseAgent === 'undefined') {
    view.innerHTML = `<div class="card"><p class="text-muted">Post-Close Agent loading…</p></div>`; return;
  }
  const stats  = PostCloseAgent.getStats();
  const queue  = PostCloseAgent.processQueue();
  const allQ   = PostCloseAgent.queue || [];
  view.innerHTML = `
    <div class="kpi-grid">
      ${kpiCard('Total Orders',      stats.totalOrders,        'processed by agent',     'blue')}
      ${kpiCard('Review Requests',   stats.reviewsRequested,   'touches sent',           'green')}
      ${kpiCard('Reviews Received',  stats.reviewsReceived,    `${(stats.estimatedReviewRate*100).toFixed(0)}% rate`, stats.estimatedReviewRate >= 0.2 ? 'green' : 'warn')}
      ${kpiCard('Upsells Sent',      stats.upsellsSent,        `${stats.upsellsConverted} converted`, 'blue')}
    </div>

    <div class="card">
      <div class="section-header">
        <span class="section-title">Review Rate Progress</span>
        <span class="text-muted" style="font-size:.78rem">Target: 25%+ (Etsy top sellers)</span>
      </div>
      <div class="progress success thick mt-8"><div style="width:${Math.min(stats.estimatedReviewRate*400,100)}%"></div></div>
      <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);margin-top:4px">
        <span>0%</span><span style="color:var(--success)">25% target</span><span>100%</span>
      </div>
    </div>

    <div class="card">
      <div class="section-header">
        <span class="section-title">Actions Due Now</span>
        <button class="btn primary" id="btn-seed-orders">Add Demo Orders</button>
      </div>
      ${queue.length ? `<div class="success-list mt-8">${queue.map(a => `
        <div class="success-item">
          <div style="flex:1">
            <div class="si-title">${a.type} — ${a.buyerName || 'Buyer'}</div>
            <div class="si-meta">${a.listingId || ''} &nbsp;·&nbsp; Due: ${new Date(a.scheduledAt).toLocaleDateString()}</div>
            <div class="copy-block" style="font-size:.76rem;margin-top:6px;white-space:pre-wrap">${esc(a.message || PostCloseAgent.getMessageCopy?.(a.id) || 'Message ready')}</div>
          </div>
          <button class="pill" onclick="if(typeof PostCloseAgent!=='undefined')PostCloseAgent.markComplete('${a.id}','sent');renderPostClose();toast('Marked sent','success')">Mark Sent</button>
        </div>`).join('')}</div>` : `<p class="text-muted mt-8">No actions due right now. ${allQ.length} scheduled for future delivery.</p>`}
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Full Queue</span></div>
      <div class="table-wrap mt-8">
        <table class="table">
          <thead><tr><th>Type</th><th>Buyer</th><th>Listing</th><th>Scheduled</th><th>Status</th><th>Message</th></tr></thead>
          <tbody>${allQ.slice(0,20).map(a => `<tr>
            <td>${a.type}</td>
            <td>${a.buyerName || '—'}</td>
            <td class="mono">${a.listingId || '—'}</td>
            <td class="mono">${new Date(a.scheduledAt).toLocaleDateString()}</td>
            <td><span class="badge ${a.status==='complete'?'live':a.status==='due'?'review':'draft'}">${a.status}</span></td>
            <td><button class="pill" onclick="openPostCloseMessage('${a.id}')">View</button></td>
          </tr>`).join('') || '<tr><td colspan="6" class="text-muted" style="text-align:center">No orders yet — click Add Demo Orders</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Delivery Message Template</span></div>
      <p class="text-muted mt-4">Sent immediately after every purchase. Warm, confirms delivery, sets up future review ask.</p>
      <div class="copy-block mt-8" id="delivery-msg">${esc(PostCloseAgent.deliveryMessage?.('LS-001','[Buyer Name]') || 'Post-Close Agent initializing…')}<button class="copy-btn" onclick="copyText('delivery-msg')">Copy</button></div>
    </div>`;

  view.querySelector('#btn-seed-orders').onclick = () => {
    if (typeof PostCloseAgent !== 'undefined') { PostCloseAgent.seedDemoOrders?.(); renderPostClose(); toast('Demo orders added.', 'success'); }
  };
}

function openPostCloseMessage(actionId) {
  if (typeof PostCloseAgent === 'undefined') return;
  const a = PostCloseAgent.queue?.find(x => x.id === actionId); if (!a) return;
  const msg = PostCloseAgent.getMessageCopy?.(actionId) || a.message || 'No message generated.';
  openPanel('Post-Close Message', `
    <div class="text-muted">${a.type} &nbsp;·&nbsp; ${a.buyerName} &nbsp;·&nbsp; <span class="badge">${a.status}</span></div>
    <div style="font-size:.8rem;color:var(--text2)">Scheduled: ${new Date(a.scheduledAt).toLocaleDateString()}</div>
    <div class="copy-block" id="pc-msg-${a.id}">${esc(msg)}<button class="copy-btn" onclick="copyText('pc-msg-${a.id}')">Copy</button></div>
    <div class="actions mt-8">
      <button class="btn approve" onclick="if(typeof PostCloseAgent!=='undefined')PostCloseAgent.markComplete('${a.id}','sent');renderPostClose();closePanel();toast('Marked sent','success')">Mark Sent</button>
    </div>`);
}

/* ─── Compliance view ──────────────────────────────────────────────── */
function renderComplianceView() {
  const view = document.getElementById('compliance-view');
  if (typeof Compliance === 'undefined') {
    view.innerHTML = `<div class="card"><p class="text-muted">Compliance engine loading…</p></div>`; return;
  }
  const results = state.listings.filter(l => l.status !== 'archived').map(l => {
    const check = Compliance.checkListing({ ...l, description: getEtsyCopy(l.id, l).desc, tags: getEtsyCopy(l.id, l).tags });
    return { ...l, compliance: check };
  });
  const allPass = results.every(r => r.compliance.passed);

  view.innerHTML = `
    <div class="card ${allPass ? '' : 'launch-card'}">
      <div class="section-header">
        <div>
          <div class="eyebrow">IP & Marketplace Compliance</div>
          <div class="section-title" style="font-size:1.1rem">${allPass ? '✓ All Listings Compliant' : '⚠ Issues Found — Review Below'}</div>
        </div>
        <span class="badge ${allPass ? 'live' : 'review'}">${allPass ? 'Clear for Launch' : `${results.filter(r=>!r.compliance.passed).length} flagged`}</span>
      </div>
      <p class="text-muted mt-4">${Compliance.copyrightNotice}</p>
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Etsy Policy Gates</span></div>
      <div class="launch-grid mt-8">
        ${Compliance.etsyRules.map(r => `
          <div class="launch-check passed">
            <div class="launch-icon">✓</div>
            <div><div class="launch-check-label">${r.rule.replace(/_/g,' ')}</div><div class="launch-check-val">${r.check}</div></div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Listing Compliance Scores</span></div>
      <div class="table-wrap mt-8">
        <table class="table">
          <thead><tr><th>Listing</th><th>Score</th><th>Status</th><th>Flags</th></tr></thead>
          <tbody>${results.map(r => `<tr>
            <td><strong>${r.name}</strong></td>
            <td class="mono ${r.compliance.score >= 80 ? 'text-success' : r.compliance.score >= 60 ? 'text-warn' : 'text-danger'}">${r.compliance.score}/100</td>
            <td><span class="badge ${r.compliance.passed ? 'live' : 'review'}">${r.compliance.passed ? 'Pass' : 'Review'}</span></td>
            <td style="font-size:.76rem;color:var(--muted)">${r.compliance.warnings?.join(', ') || '—'}</td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>

    <div class="card">
      <div class="section-header"><span class="section-title">Required Disclaimers</span></div>
      <div class="success-list mt-8">
        ${Object.entries(Compliance.disclaimers).filter(([,v])=>v).map(([k,v]) => `
          <div class="success-item active">
            <div style="flex:1">
              <div class="si-title">${k.charAt(0).toUpperCase()+k.slice(1)} Disclaimer</div>
              <div class="si-action">${v}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="section-header">
        <span class="section-title">Copyright Block</span>
        <button class="pill" onclick="copyText('copyright-block')">Copy</button>
      </div>
      <div class="copy-block" id="copyright-block">${Compliance.copyrightBlock()}</div>
    </div>`;
}

/* ─── Image settings panel ─────────────────────────────────────────── */
function openImageSettings() {
  openPanel('Design Team Settings', `
    ${typeof DesignTeam !== 'undefined' ? DesignTeam.settingsHTML() : '<p class="text-muted">Design Team loading…</p>'}
    <div class="divider mt-8"></div>
    <p class="text-muted" style="font-size:.76rem">5 shot types × 20 listings = 100 images at $0.04 each ($4 total). Keys stored locally in your browser only.</p>
    <button onclick="switchView('design');closePanel();" style="margin-top:12px;background:var(--accent);color:#000;border:none;border-radius:7px;padding:9px 16px;cursor:pointer;font-size:.84rem;font-weight:700;width:100%;">Open Design Team →</button>`);
}

/* ─── Setup config helpers ─────────────────────────────────────────── */
const CFG_KEY = 'atlasConfig';
function loadConfig() {
  try { return JSON.parse(localStorage.getItem(CFG_KEY) || '{}'); } catch { return {}; }
}
function saveConfig(patch) {
  const cfg = { ...loadConfig(), ...patch };
  localStorage.setItem(CFG_KEY, JSON.stringify(cfg));
  applyConfig(cfg);
  return cfg;
}
function applyConfig(cfg) {
  if (!cfg) cfg = loadConfig();
  // Wire Etsy credentials at runtime
  if (typeof ETSY_CONFIG !== 'undefined') {
    if (cfg.etsyClientId) ETSY_CONFIG.clientId = cfg.etsyClientId;
    if (cfg.etsyShopId)   ETSY_CONFIG.shopId   = cfg.etsyShopId;
  }
  // Wire OpenAI key for image gen
  if (typeof ImageGen !== 'undefined' && cfg.openaiKey) {
    ImageGen.setApiKey(cfg.openaiKey);
  }
  // Wire company name for product bundles
  if (typeof Products !== 'undefined' && cfg.shopName) {
    Products.setCompany(cfg.shopName);
  }
}

/* ─── Setup wizard ─────────────────────────────────────────────────── */
function needsSetup() {
  const cfg = loadConfig();
  return !cfg.setupDone;
}

function openSetupWizard() {
  const cfg = loadConfig();
  const overlay = document.getElementById('overlay');
  const existing = document.getElementById('setup-wizard');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'setup-wizard';
  modal.style.cssText = `
    position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;
    background:rgba(8,12,20,0.92);backdrop-filter:blur(6px);padding:16px;
  `;
  modal.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:40px 36px;max-width:540px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.6);">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <div style="background:var(--accent);color:#000;border-radius:8px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1rem;">AA</div>
        <div>
          <div style="font-size:1.25rem;font-weight:800;color:var(--text);">Welcome to Agent Atlas</div>
          <div style="font-size:.8rem;color:var(--muted);">Let's connect your accounts — takes 2 minutes</div>
        </div>
      </div>

      <div style="margin:28px 0 0;display:flex;flex-direction:column;gap:20px;">

        <div class="setup-section">
          <div class="setup-section-label">Your Shop</div>
          <label class="setup-label">Shop / Business Name
            <input id="sw-shop-name" class="setup-input" type="text" placeholder="e.g. Clean Plate Hauling Templates" value="${cfg.shopName || ''}">
          </label>
          <label class="setup-label" style="margin-top:10px;">Etsy Shop URL (optional)
            <input id="sw-etsy-url" class="setup-input" type="text" placeholder="https://www.etsy.com/shop/yourshopname" value="${cfg.etsyShopUrl || ''}">
          </label>
        </div>

        <div class="setup-section">
          <div class="setup-section-label">Etsy API <span style="color:var(--muted);font-weight:400;font-size:.75rem;">— needed to auto-publish listings</span></div>
          <p style="font-size:.76rem;color:var(--muted);margin:0 0 10px;">
            Get your keys free at <strong style="color:var(--accent);">etsy.com/developers</strong> → Create App → copy the Keystring and your numeric Shop ID.
          </p>
          <label class="setup-label">Etsy App Keystring (Client ID)
            <input id="sw-etsy-client" class="setup-input" type="text" placeholder="Paste your Etsy app keystring here" value="${cfg.etsyClientId || ''}">
          </label>
          <label class="setup-label" style="margin-top:10px;">Etsy Shop ID (numeric)
            <input id="sw-etsy-shop" class="setup-input" type="text" placeholder="e.g. 12345678" value="${cfg.etsyShopId || ''}">
          </label>
        </div>

        <div class="setup-section">
          <div class="setup-section-label">OpenAI API Key <span style="color:var(--muted);font-weight:400;font-size:.75rem;">— needed for mockup image generation (~$0.04/image)</span></div>
          <p style="font-size:.76rem;color:var(--muted);margin:0 0 10px;">
            Get your key at <strong style="color:var(--accent);">platform.openai.com/api-keys</strong>. You need DALL-E 3 access (any paid plan).
          </p>
          <label class="setup-label">OpenAI Secret Key
            <input id="sw-openai" class="setup-input" type="password" placeholder="sk-..." value="${cfg.openaiKey || ''}">
          </label>
        </div>

      </div>

      <div style="display:flex;gap:10px;margin-top:28px;justify-content:flex-end;">
        ${cfg.setupDone ? `<button onclick="document.getElementById('setup-wizard').remove()" style="background:transparent;border:1px solid var(--border);color:var(--muted);padding:10px 20px;border-radius:8px;cursor:pointer;font-size:.85rem;">Cancel</button>` : ''}
        <button onclick="saveSetupWizard()" style="background:var(--accent);color:#000;border:none;padding:10px 28px;border-radius:8px;cursor:pointer;font-size:.9rem;font-weight:700;">Save & Launch →</button>
      </div>
      <p style="font-size:.72rem;color:var(--muted);margin:14px 0 0;text-align:center;">All credentials are stored only in your browser's localStorage — never sent to any server.</p>
    </div>
  `;
  document.body.appendChild(modal);
}

function saveSetupWizard() {
  const shopName    = document.getElementById('sw-shop-name')?.value.trim() || '';
  const etsyUrl     = document.getElementById('sw-etsy-url')?.value.trim()  || '';
  const etsyClientId= document.getElementById('sw-etsy-client')?.value.trim() || '';
  const etsyShopId  = document.getElementById('sw-etsy-shop')?.value.trim()   || '';
  const openaiKey   = document.getElementById('sw-openai')?.value.trim()      || '';

  const cfg = saveConfig({ shopName, etsyUrl, etsyClientId, etsyShopId, openaiKey, setupDone: true });
  document.getElementById('setup-wizard')?.remove();

  const parts = [];
  if (shopName)     parts.push('shop name');
  if (etsyClientId) parts.push('Etsy API');
  if (openaiKey)    parts.push('OpenAI');
  toast(`Saved: ${parts.length ? parts.join(', ') : 'settings'} configured.`, 'success');
  logAction(`Owner completed setup — ${parts.join(', ')||'config'} saved.`);
  rerenderAll();
  if (_currentView === 'settings') renderSettingsView();
}

/* ─── Settings view ────────────────────────────────────────────────── */
function renderSettingsView() {
  const view = document.getElementById('settings-view');
  if (!view) return;
  const cfg = loadConfig();

  const statusBadge = (val, label) => val
    ? `<span style="color:var(--success);font-weight:600;">✓ ${label}</span>`
    : `<span style="color:var(--warn);font-weight:600;">⚠ Not set</span>`;

  view.innerHTML = `
    <div style="width:100%;display:flex;flex-direction:column;gap:24px;">

      <div class="card">
        <div class="card-title">Account Setup</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0;">
          <div class="settings-stat">
            <div class="settings-stat-label">Shop Name</div>
            <div>${cfg.shopName ? `<strong>${cfg.shopName}</strong>` : '<span style="color:var(--muted)">Not set</span>'}</div>
          </div>
          <div class="settings-stat">
            <div class="settings-stat-label">Etsy Shop URL</div>
            <div>${cfg.etsyUrl ? `<a href="${cfg.etsyUrl}" target="_blank" style="color:var(--accent);font-size:.8rem;">View Shop ↗</a>` : '<span style="color:var(--muted);font-size:.85rem">Not set</span>'}</div>
          </div>
          <div class="settings-stat">
            <div class="settings-stat-label">Etsy API</div>
            <div>${statusBadge(cfg.etsyClientId, `ClientID: ${cfg.etsyClientId ? '••••'+cfg.etsyClientId.slice(-4) : ''}`)}</div>
          </div>
          <div class="settings-stat">
            <div class="settings-stat-label">Etsy Shop ID</div>
            <div>${statusBadge(cfg.etsyShopId, cfg.etsyShopId || '')}</div>
          </div>
          <div class="settings-stat">
            <div class="settings-stat-label">OpenAI Key</div>
            <div>${statusBadge(cfg.openaiKey, `sk-••••${cfg.openaiKey ? cfg.openaiKey.slice(-4) : ''}`)}</div>
          </div>
          <div class="settings-stat">
            <div class="settings-stat-label">Setup Status</div>
            <div>${cfg.setupDone ? '<span style="color:var(--success);font-weight:600;">✓ Complete</span>' : '<span style="color:var(--warn);">Incomplete</span>'}</div>
          </div>
        </div>
        <button class="btn approve" onclick="openSetupWizard()" style="width:100%;">Edit Credentials & Settings</button>
      </div>

      <div class="card">
        <div class="card-title">Etsy Connection</div>
        <p style="color:var(--muted);font-size:.85rem;margin:0 0 12px;">
          Connect your Etsy account via OAuth to enable auto-publishing. Requires your App Keystring above.
        </p>
        ${cfg.etsyClientId ? `
          <button class="btn approve" onclick="startEtsyAuth()">Connect Etsy Account (OAuth)</button>
          <p style="font-size:.75rem;color:var(--muted);margin:8px 0 0;">You'll be redirected to Etsy to approve access, then returned here.</p>
        ` : `
          <div style="background:var(--surface-raised);border-radius:8px;padding:12px;color:var(--muted);font-size:.85rem;">
            Enter your Etsy App Keystring in setup first, then connect here.
          </div>
        `}
      </div>

      <div class="card">
        <div class="card-title">How to Get Your Etsy API Keys</div>
        <ol style="color:var(--muted);font-size:.84rem;line-height:1.9;padding-left:18px;margin:12px 0;">
          <li>Go to <strong style="color:var(--text);">etsy.com/developers</strong> and sign in with your Etsy account</li>
          <li>Click <strong style="color:var(--text);">Create a New App</strong></li>
          <li>Name it anything (e.g. "Agent Atlas"), accept terms</li>
          <li>Copy the <strong style="color:var(--text);">Keystring</strong> — that's your Client ID</li>
          <li>Add <code style="background:var(--surface-raised);padding:1px 5px;border-radius:4px;">${window.location.origin}/etsy-callback</code> to your app's Callback URLs</li>
          <li>Find your Shop ID: go to your Etsy shop page — the number in the URL is your Shop ID</li>
        </ol>
      </div>

      <div class="card">
        <div class="card-title">How to Get Your OpenAI API Key</div>
        <ol style="color:var(--muted);font-size:.84rem;line-height:1.9;padding-left:18px;margin:12px 0;">
          <li>Go to <strong style="color:var(--text);">platform.openai.com</strong> and sign in</li>
          <li>Click your name → <strong style="color:var(--text);">API Keys</strong> → Create new secret key</li>
          <li>Copy the key (starts with <code style="background:var(--surface-raised);padding:1px 5px;border-radius:4px;">sk-</code>) and paste it above</li>
          <li>Make sure you have a paid plan — DALL-E 3 costs ~$0.04 per mockup image generated</li>
        </ol>
      </div>

      <div class="card">
        <div class="card-title">Data & Reset</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button class="btn" onclick="exportConfig()" style="background:var(--surface-raised);color:var(--text);border:1px solid var(--border);">Export Config Backup</button>
          <button class="btn" onclick="confirmReset()" style="background:var(--danger-soft);color:var(--danger);border:1px solid var(--danger);">Reset All State</button>
        </div>
        <p style="color:var(--muted);font-size:.76rem;margin:10px 0 0;">Reset clears all listings, approvals, and revenue data. Credentials are preserved. Use export first.</p>
      </div>

    </div>
  `;
}

function startEtsyAuth() {
  if (typeof EtsyAPI === 'undefined') { toast('Etsy module not loaded', 'warn'); return; }
  EtsyAPI.startAuth();
  toast('Redirecting to Etsy for authorization…', 'info');
}

function exportConfig() {
  const data = {
    config:  loadConfig(),
    state:   JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
    exported: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `agent-atlas-backup-${Date.now()}.json`;
  a.click();
  toast('Config exported.', 'success');
}

/* ─── Design Team view ─────────────────────────────────────────────── */
function renderDesignView() {
  const view = document.getElementById('design-view');
  if (!view) return;
  if (typeof DesignTeam === 'undefined') {
    view.innerHTML = '<p class="text-muted">Design Team loading…</p>';
    return;
  }
  view.innerHTML = DesignTeam.designViewHTML();
}

/* ─── Ads Strategy Engine ──────────────────────────────────────────── */
const ADS_KEY = 'atlasAds';
function loadAds() {
  try { return JSON.parse(localStorage.getItem(ADS_KEY) || '{}'); } catch { return {}; }
}
function saveAds(patch) {
  const d = { ...loadAds(), ...patch };
  localStorage.setItem(ADS_KEY, JSON.stringify(d));
  return d;
}

// Per-listing ad recommendation based on price, category, CVR
function adsRecommendation(listing) {
  const price = listing.price || 0;
  const cvr   = listing.cvr   || 0;
  const live  = listing.status === 'live';
  if (!live) return { run: false, reason: 'Not live yet — publish first' };
  if (cvr >= 3.0) return { run: true,  priority: 'high',   bid: 0.35, reason: `CVR ${cvr}% is above average — strong candidate for ads` };
  if (cvr >= 1.5) return { run: true,  priority: 'medium', bid: 0.25, reason: `CVR ${cvr}% is acceptable — test at low bid` };
  if (cvr === 0)  return { run: true,  priority: 'test',   bid: 0.20, reason: 'No data yet — run at minimum bid to gather impressions' };
  return         { run: false, priority: 'pause', bid: 0,    reason: `CVR ${cvr}% is below break-even — pause and fix title/images first` };
}

function adsROAS(dailyBudget, avgPrice, cvr) {
  // Etsy avg CPC ~$0.25-0.40; estimate clicks per dollar
  const cpc        = 0.30;
  const clicks     = dailyBudget / cpc;
  const sales      = clicks * (cvr / 100);
  const revenue    = sales * avgPrice;
  const roas       = dailyBudget > 0 ? revenue / dailyBudget : 0;
  return { clicks: Math.round(clicks), sales: +sales.toFixed(2), revenue: +revenue.toFixed(2), roas: +roas.toFixed(2) };
}

/* ─── Budget Guard ─────────────────────────────────────────────────── */
function logAdSpend(amount) {
  const ads = loadAds();
  const today = new Date().toISOString().slice(0,10);
  const log = ads.spendLog || [];
  const existing = log.find(e => e.date === today);
  if (existing) existing.amount = +(existing.amount + amount).toFixed(2);
  else log.push({ date: today, amount: +amount.toFixed(2) });
  const totalSpent = log.reduce((s,e) => s + e.amount, 0);
  saveAds({ spendLog: log, totalSpent: +totalSpent.toFixed(2) });
  checkBudgetCap();
  if (_currentView === 'ads') renderAdsView();
  renderDashboard();
}

function totalAdSpend() {
  return +(loadAds().totalSpent || 0).toFixed(2);
}

function checkBudgetCap() {
  const ads   = loadAds();
  const cap   = ads.budgetCap || 100;
  const spent = totalAdSpend();
  const pct   = spent / cap;
  if (pct >= 1.0) {
    toast(`BUDGET CAP HIT — $${spent.toFixed(2)} spent of $${cap} limit. STOP all ads now.`, 'warn');
    logAction(`Budget Guard: $${cap} cap reached. Ad spend halted.`);
  } else if (pct >= 0.90) {
    toast(`Budget warning: $${spent.toFixed(2)} of $${cap} — 90% used. Slow down.`, 'warn');
    logAction(`Budget Guard: 90% of $${cap} cap used ($${spent.toFixed(2)} spent).`);
  } else if (pct >= 0.75) {
    toast(`Budget alert: $${spent.toFixed(2)} of $${cap} spent (75%).`, 'info');
  }
}

function budgetGuardHTML() {
  const ads    = loadAds();
  const cap    = ads.budgetCap || 100;
  const spent  = totalAdSpend();
  const left   = Math.max(0, cap - spent);
  const pct    = Math.min(100, (spent / cap) * 100);
  const barColor = pct >= 90 ? 'var(--danger)' : pct >= 75 ? 'var(--warn)' : 'var(--success)';
  const log    = (ads.spendLog || []).slice().sort((a,b) => b.date.localeCompare(a.date)).slice(0,7);
  const daysLeft = Math.max(0, 30 - (ads.spendLog||[]).length);

  return `
    <div class="card" style="${pct >= 90 ? 'border-color:var(--danger);' : pct >= 75 ? 'border-color:var(--warn);' : ''}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div class="card-title" style="margin:0;">Budget Guard — 30-Day Cap</div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-size:.78rem;color:var(--muted);">Cap: $</span>
          <input id="budget-cap-input" type="number" min="10" max="500" value="${cap}"
            style="background:var(--panel2);border:1px solid var(--border);border-radius:6px;color:var(--text);font-size:.88rem;padding:5px 8px;width:70px;outline:none;"
            onchange="saveAds({budgetCap:+this.value});renderAdsView();toast('Budget cap updated to $'+this.value,'success');">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px;">
        <div style="background:var(--panel2);border-radius:8px;padding:12px 14px;">
          <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;">Spent</div>
          <div style="font-size:1.5rem;font-weight:800;color:${barColor};">$${spent.toFixed(2)}</div>
        </div>
        <div style="background:var(--panel2);border-radius:8px;padding:12px 14px;">
          <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;">Remaining</div>
          <div style="font-size:1.5rem;font-weight:800;color:var(--text);">$${left.toFixed(2)}</div>
        </div>
        <div style="background:var(--panel2);border-radius:8px;padding:12px 14px;">
          <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;">Safe Daily Budget</div>
          <div style="font-size:1.5rem;font-weight:800;color:var(--accent2);">$${daysLeft > 0 ? (left/daysLeft).toFixed(2) : '0.00'}</div>
        </div>
      </div>

      <div style="background:var(--panel2);border-radius:8px;padding:3px;margin-bottom:16px;">
        <div style="height:14px;border-radius:6px;background:${barColor};width:${pct.toFixed(1)}%;transition:width .4s;min-width:${pct>0?'4px':'0'};"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--muted);margin-bottom:16px;">
        <span>$0</span>
        <span style="color:${barColor};font-weight:700;">${pct.toFixed(0)}% used</span>
        <span>$${cap} cap</span>
      </div>

      ${pct >= 100 ? `<div style="background:var(--danger-soft);border:1px solid var(--danger);border-radius:8px;padding:12px 14px;color:var(--danger);font-weight:700;font-size:.88rem;margin-bottom:16px;">⛔ CAP REACHED — Turn off Etsy Ads now in your Etsy account to avoid overspend.</div>` :
        pct >= 90  ? `<div style="background:var(--warn-soft);border:1px solid var(--warn);border-radius:8px;padding:12px 14px;color:var(--warn);font-weight:700;font-size:.88rem;margin-bottom:16px;">⚠ 90% of budget used — consider pausing lower-performing listings.</div>` : ''}

      <div style="margin-bottom:10px;">
        <div style="font-size:.78rem;font-weight:700;color:var(--muted);margin-bottom:8px;">Log Today's Spend</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
          ${[1,2,3,5].map(a => `<button onclick="logAdSpend(${a})" style="background:var(--panel2);border:1px solid var(--border);color:var(--text);border-radius:6px;padding:6px 14px;cursor:pointer;font-size:.82rem;">+$${a}</button>`).join('')}
          <span style="color:var(--muted);font-size:.8rem;">or</span>
          <input id="custom-spend" type="number" min="0.01" step="0.01" placeholder="custom $"
            style="background:var(--panel2);border:1px solid var(--border);border-radius:6px;color:var(--text);padding:6px 10px;width:90px;font-size:.82rem;outline:none;">
          <button onclick="const v=parseFloat(document.getElementById('custom-spend').value);if(v>0){logAdSpend(v);document.getElementById('custom-spend').value='';}" style="background:var(--accent);color:#000;border:none;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:.82rem;font-weight:700;">Log</button>
        </div>
      </div>

      ${log.length > 0 ? `
        <div style="margin-top:12px;">
          <div style="font-size:.75rem;font-weight:700;color:var(--muted);margin-bottom:6px;">Recent Spend Log</div>
          ${log.map(e => `
            <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:.8rem;">
              <span style="color:var(--muted);">${e.date}</span>
              <span style="color:var(--text);font-weight:600;">$${e.amount.toFixed(2)}</span>
            </div>`).join('')}
        </div>` : `<p style="font-size:.8rem;color:var(--muted);margin:8px 0 0;">No spend logged yet. Log your first day's Etsy ad spend above.</p>`}
    </div>
  `;
}

function renderMonitorView() {
  const view = document.getElementById('monitor-view');
  if (!view) return;
  if (typeof ShopMonitor === 'undefined') {
    view.innerHTML = '<div class="card"><p class="text-muted">Monitor loading…</p></div>'; return;
  }
  view.innerHTML = ShopMonitor.renderView();
}

function renderAdsView() {
  const view = document.getElementById('ads-view');
  if (!view) return;
  const ads  = loadAds();
  const daily = ads.dailyBudget || 5;
  const live  = state.listings.filter(l => l.status === 'live');
  const avgPrice = live.length ? live.reduce((s,l) => s + l.price, 0) / live.length : 8;
  const avgCVR   = live.length ? live.reduce((s,l) => s + (l.cvr||0), 0) / live.length : 2.5;
  const proj     = adsROAS(daily, avgPrice, avgCVR);
  const proj10   = adsROAS(10,    avgPrice, avgCVR);
  const proj20   = adsROAS(20,    avgPrice, avgCVR);

  const phaseRows = [
    { phase:'Week 1–2', budget:'$3–5/day', goal:'Gather impression & click data', action:'Run all live listings at $0.20 min bid. DO NOT optimize yet — just collect data.' },
    { phase:'Week 3',   budget:'$5–8/day', goal:'Double down on winners',          action:'Raise bids to $0.30–0.35 on listings with CVR ≥ 2%. Pause listings with 0 clicks after 200 impressions.' },
    { phase:'Week 4+',  budget:'$8–15/day',goal:'Scale what converts',             action:'Increase budget 20% per week on listings with ROAS > 2×. Kill anything below 1× after 2 weeks.' },
  ];

  const listingRows = state.listings.map(l => {
    const rec = adsRecommendation(l);
    const priorityColor = rec.priority === 'high' ? 'var(--success)' : rec.priority === 'medium' ? 'var(--accent2)' : rec.priority === 'test' ? 'var(--warn)' : 'var(--muted)';
    return `
      <tr>
        <td><span style="font-size:.8rem;font-weight:600;">${l.name}</span></td>
        <td style="text-align:center;">$${l.price}</td>
        <td style="text-align:center;">${l.cvr || 0}%</td>
        <td style="text-align:center;"><span style="color:${priorityColor};font-weight:700;font-size:.78rem;">${rec.run ? (rec.priority||'run').toUpperCase() : 'PAUSE'}</span></td>
        <td style="text-align:center;">${rec.bid ? '$'+rec.bid.toFixed(2) : '—'}</td>
        <td style="font-size:.76rem;color:var(--muted);">${rec.reason}</td>
      </tr>`;
  }).join('');

  view.innerHTML = `
    <div style="width:100%;display:flex;flex-direction:column;gap:24px;">

      <!-- Budget Guard -->
      ${budgetGuardHTML()}

      <!-- Budget calculator -->
      <div class="card">
        <div class="card-title">Daily Budget Calculator</div>
        <div style="display:flex;align-items:center;gap:16px;margin:16px 0 8px;flex-wrap:wrap;">
          <label style="display:flex;flex-direction:column;gap:5px;font-size:.82rem;color:var(--muted);font-weight:500;">
            Daily Ad Spend
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="color:var(--text);">$</span>
              <input id="ads-budget-input" type="number" min="1" max="100" value="${daily}"
                style="background:var(--panel2);border:1px solid var(--border);border-radius:7px;color:var(--text);font-size:1rem;padding:8px 10px;width:80px;outline:none;"
                oninput="saveAds({dailyBudget:+this.value});renderAdsView();">
              <span style="color:var(--muted);font-size:.8rem;">/ day</span>
            </div>
          </label>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${[3,5,10,20].map(b => `<button onclick="saveAds({dailyBudget:${b}});renderAdsView()" style="background:${daily===b?'var(--accent)':'var(--panel2)'};color:${daily===b?'#000':'var(--text)'};border:1px solid var(--border);border-radius:6px;padding:6px 14px;cursor:pointer;font-size:.82rem;font-weight:600;">$${b}</button>`).join('')}
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px;">
          ${[
            { label:'Est. Daily Clicks',   val: proj.clicks,             unit:'' },
            { label:'Est. Daily Sales',    val: proj.sales.toFixed(1),   unit:'' },
            { label:'Est. Daily Revenue',  val: '$'+proj.revenue.toFixed(2), unit:'' },
            { label:'ROAS',                val: proj.roas.toFixed(1)+'×', unit:'', color: proj.roas >= 2 ? 'var(--success)' : proj.roas >= 1 ? 'var(--warn)' : 'var(--danger)' },
          ].map(s => `
            <div style="background:var(--panel2);border:1px solid var(--border);border-radius:8px;padding:14px;">
              <div style="font-size:.7rem;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px;">${s.label}</div>
              <div style="font-size:1.4rem;font-weight:800;color:${s.color||'var(--text)'};">${s.val}</div>
            </div>`).join('')}
        </div>
        <p style="font-size:.74rem;color:var(--muted);margin:10px 0 0;">Based on avg Etsy CPC $0.30, avg listing price $${avgPrice.toFixed(2)}, avg CVR ${avgCVR.toFixed(1)}%. Estimates only — actual results vary.</p>
      </div>

      <!-- Budget comparison -->
      <div class="card">
        <div class="card-title">Budget Comparison — Monthly Projection</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;">
          ${[
            { label:'Starter',  spend:3,  p:adsROAS(3, avgPrice,avgCVR)  },
            { label:'Growth',   spend:5,  p:adsROAS(5, avgPrice,avgCVR)  },
            { label:'Aggressive',spend:10, p:adsROAS(10,avgPrice,avgCVR) },
          ].map(t => {
            const mo30rev  = t.p.revenue * 30;
            const mo30cost = t.spend * 30;
            const profit   = mo30rev - mo30cost;
            return `
              <div style="background:var(--panel2);border:1px solid var(--border);border-radius:10px;padding:18px;">
                <div style="font-weight:800;font-size:.95rem;color:var(--accent2);margin-bottom:10px;">${t.label}</div>
                <div style="font-size:.78rem;color:var(--muted);margin-bottom:2px;">$${t.spend}/day spend</div>
                <div style="font-size:1.1rem;font-weight:700;color:var(--text);">~$${mo30rev.toFixed(0)}/mo revenue</div>
                <div style="font-size:.82rem;color:${profit>0?'var(--success)':'var(--danger)'};margin-top:4px;">$${profit.toFixed(0)} profit after ad spend</div>
                <div style="font-size:.76rem;color:var(--muted);margin-top:4px;">${t.p.roas.toFixed(1)}× ROAS</div>
              </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Phase plan -->
      <div class="card">
        <div class="card-title">4-Week Launch Playbook</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px;">
          ${phaseRows.map((p,i) => `
            <div style="display:grid;grid-template-columns:90px 90px 1fr;gap:12px;align-items:start;background:var(--panel2);border-radius:8px;padding:14px 16px;">
              <div>
                <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;">Phase</div>
                <div style="font-weight:700;font-size:.85rem;color:var(--accent2);">${p.phase}</div>
              </div>
              <div>
                <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;">Budget</div>
                <div style="font-weight:700;font-size:.85rem;color:var(--text);">${p.budget}</div>
              </div>
              <div>
                <div style="font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;">Action</div>
                <div style="font-size:.83rem;color:var(--text);line-height:1.5;">${p.action}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <!-- Per-listing recommendations -->
      <div class="card">
        <div class="card-title">Per-Listing Ad Recommendations</div>
        <div style="overflow-x:auto;margin-top:12px;">
          <table class="data-table" style="width:100%;">
            <thead><tr>
              <th>Listing</th><th>Price</th><th>CVR</th><th>Status</th><th>Bid</th><th>Reason</th>
            </tr></thead>
            <tbody>${listingRows}</tbody>
          </table>
        </div>
      </div>

      <!-- Rules -->
      <div class="card">
        <div class="card-title">The 5 Rules of Etsy Ads</div>
        <ol style="color:var(--muted);font-size:.85rem;line-height:2;padding-left:18px;margin:12px 0;">
          <li><strong style="color:var(--text);">Never optimize in week 1.</strong> You need at least 500 impressions per listing before any bid changes mean anything.</li>
          <li><strong style="color:var(--text);">CVR below 1% = fix the listing, not the bid.</strong> Bad photos and weak titles kill CVR — ads amplify the problem, they don't fix it.</li>
          <li><strong style="color:var(--text);">ROAS below 1.5× = pause and diagnose.</strong> You're burning cash. Fix the listing or kill the ad.</li>
          <li><strong style="color:var(--text);">Reviews are the real multiplier.</strong> A listing with 10+ reviews converts 2–3× better with the same ad spend. Getting reviews is worth more than doubling your budget.</li>
          <li><strong style="color:var(--text);">Scale winners only.</strong> When you find a listing with ROAS > 3×, increase budget by 20% every 7 days until it plateaus.</li>
        </ol>
      </div>

    </div>
  `;
}

function confirmReset() {
  if (!confirm('Reset all listing and revenue data? Credentials will be kept. This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = loadState();
  ensureShape();
  applyConfig();
  toast('State reset. Reload the page to start fresh.', 'warn');
  setTimeout(() => location.reload(), 1500);
}

/* ─── Render all ───────────────────────────────────────────────────── */
function rerenderAll() {
  renderNav();
  renderDashboard();
  renderOpportunities();
  renderListings();
  renderApprovals();
  renderRevenue();
  updateSidebarStatus();
}

/* ─── Init ─────────────────────────────────────────────────────────── */
document.getElementById('close-panel').onclick = closePanel;
document.getElementById('overlay').onclick = closePanel;
document.getElementById('theme-toggle').onclick = () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  document.getElementById('theme-icon').textContent = next === 'dark' ? '☀' : '☾';
};

applyConfig();
if (state.autoPilot) startAutoPilot();
rerenderAll();
persist();
if (needsSetup()) setTimeout(openSetupWizard, 600);
if (typeof ShopMonitor !== 'undefined') ShopMonitor.init();

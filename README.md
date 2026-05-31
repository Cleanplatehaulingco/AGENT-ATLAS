# Agent Atlas

Agent Atlas is a **standalone** autonomous-operator product for launching and scaling a low-effort Etsy digital-download side business.

> This project is explicitly separate from any junk removal, trucking, CRM, dispatch, quote, Gmail, or finance-center workflows.

## Mission (v1)

Build an AI-led command center that can help an owner reach **$500 in revenue within 45 days** through Etsy digital downloads in service-business and blue-collar back-office niches.

- Owner involvement target: **5–10%**
- No manual outbound selling
- No physical products
- Etsy drives traffic
- Delivery is automatic after purchase

## Core Product Pillars

The v1 keeps the existing product DNA while repurposing the business domain:

- Agent architecture
- Orchestration concepts
- Task workflows
- Approval queue
- Dashboards
- Alerts
- Workflow logs
- Premium design language

## Autonomous Agent Modules

### 1) Opportunity Agent
Finds and scores product ideas, then ranks them by:

- Speed to build
- Simplicity
- Niche fit
- Bundle potential

### 2) Listing Agent
Generates Etsy-ready listing assets:

- SEO title options
- Tag sets
- Description drafts
- FAQ copy
- Image copy prompts

### 3) Bundle Agent
Packages winning offers into higher-ticket bundles:

- Bundle composition suggestions
- Pricing ladders
- Upsell logic

### 4) Performance Agent
Monitors market outcomes:

- Listing metrics
- Revenue progress toward goal
- Winner/loser classification

### 5) Approval Agent
Human-in-the-loop control point:

- Routes high-impact actions for approval
- Prevents external publishing without owner sign-off

### 6) Command Dashboard
AI control center view of the business:

- $500 / 45-day goal progress
- Listing pipeline
- Product library
- Top opportunities
- Alerts + review queue

## Data Model (Seeded for Demo)

### Opportunity Backlog (20 ideas)

| ID | Product Idea | Niche | Speed | Simplicity | Niche Fit | Bundle | Composite | Status |
|---|---|---|---:|---:|---:|---:|---:|---|
| OP-001 | HVAC Service Call Debrief Sheet | HVAC | 9 | 9 | 9 | 8 | 8.8 | Ready |
| OP-002 | Plumbing No-Heat Diagnostic Checklist | Plumbing | 8 | 9 | 8 | 9 | 8.5 | Ready |
| OP-003 | Electrician Jobsite Walkthrough Form | Electrical | 8 | 8 | 9 | 8 | 8.3 | Ready |
| OP-004 | Pressure Washing Route Sheet | Exterior Cleaning | 10 | 9 | 8 | 7 | 8.5 | Ready |
| OP-005 | Auto Detail Intake + Damage Waiver | Auto Detailing | 9 | 8 | 9 | 9 | 8.8 | Ready |
| OP-006 | Lawn Care Weekly Crew Plan | Lawn Care | 9 | 10 | 8 | 8 | 8.8 | Draft |
| OP-007 | Septic Service Pump Log Template | Septic | 7 | 8 | 8 | 7 | 7.5 | Draft |
| OP-008 | Appliance Repair Parts Tracker | Appliance Repair | 8 | 8 | 8 | 9 | 8.3 | Ready |
| OP-009 | Handyman Materials Reimbursement Sheet | Handyman | 10 | 9 | 7 | 7 | 8.3 | Ready |
| OP-010 | Pest Control Follow-Up Card | Pest Control | 9 | 10 | 8 | 8 | 8.8 | Ready |
| OP-011 | Roofing Change-Order Form Pack | Roofing | 7 | 7 | 9 | 10 | 8.3 | Review |
| OP-012 | Window Cleaning Client Packet | Window Cleaning | 8 | 9 | 7 | 8 | 8.0 | Draft |
| OP-013 | Snow Removal Trigger Checklist | Snow Removal | 9 | 8 | 8 | 8 | 8.3 | Ready |
| OP-014 | Mobile Mechanic Service Summary | Mobile Mechanic | 8 | 8 | 8 | 9 | 8.3 | Ready |
| OP-015 | Locksmith Job Authorization Template | Locksmith | 8 | 9 | 8 | 8 | 8.3 | Review |
| OP-016 | Painting Prep & Punch List | Painting | 9 | 9 | 8 | 9 | 8.8 | Ready |
| OP-017 | Pool Service Chemical Log | Pool Service | 8 | 8 | 8 | 8 | 8.0 | Draft |
| OP-018 | Flooring Estimate Scope Matrix | Flooring | 7 | 8 | 8 | 9 | 8.0 | Review |
| OP-019 | Junk Fee Transparency Addendum (generic) | Multiple Trades | 9 | 9 | 7 | 7 | 8.0 | Ready |
| OP-020 | General Contractor Daily Site Report | Contracting | 7 | 7 | 9 | 10 | 8.3 | Review |

### Starter Listings (10)

| Listing ID | Etsy Title (Draft) | Price | Stage | 7d Views | 7d CVR | 7d Revenue | Agent Owner |
|---|---|---:|---|---:|---:|---:|---|
| LS-001 | HVAC Tech Service Call Notes Template (Editable PDF) | 7.99 | Live | 142 | 3.5% | 39.95 | Performance Agent |
| LS-002 | Plumbing Dispatch & Diagnosis Checklist Bundle | 11.99 | Live | 126 | 3.2% | 47.96 | Performance Agent |
| LS-003 | Electrician Jobsite Inspection Form Pack | 9.99 | Live | 98 | 2.0% | 19.98 | Performance Agent |
| LS-004 | Lawn Care Weekly Crew Planner | 6.99 | Live | 171 | 4.1% | 48.93 | Performance Agent |
| LS-005 | Auto Detail Intake + Waiver Kit | 12.99 | Live | 84 | 2.4% | 25.98 | Performance Agent |
| LS-006 | Pest Control Follow-Up Card Templates | 5.99 | Draft | 0 | 0.0% | 0.00 | Listing Agent |
| LS-007 | Roofing Change Order + Approval Form | 14.99 | Review Queue | 0 | 0.0% | 0.00 | Approval Agent |
| LS-008 | Handyman Materials Reimbursement Sheet | 4.99 | Live | 153 | 2.6% | 34.93 | Performance Agent |
| LS-009 | Painting Prep and Final Punch List | 8.99 | Draft | 0 | 0.0% | 0.00 | Listing Agent |
| LS-010 | Contractor Daily Site Report Template | 13.99 | Review Queue | 0 | 0.0% | 0.00 | Approval Agent |

### Bundle Ladder (Sample)

| Tier | Offer | Price | Includes |
|---|---|---:|---|
| Entry | Single Template | 4.99–8.99 | One niche-specific document |
| Core | Niche Starter Pack | 14.99 | 3-5 templates + quick-start guide |
| Pro | Back-Office Ops Bundle | 29.99 | 10 templates + KPI tracker |
| Premium | Service Business Admin Vault | 49.99 | 20+ templates + onboarding system |

## Dashboard KPI Snapshot (Example)

- Goal window: **45 days**
- Revenue target: **$500**
- Current seeded revenue: **$217.73**
- Remaining to goal: **$282.27**
- Days elapsed (sample): **12**
- Pace status: **On track if bundle conversion improves by 15%**

## Product Experience Direction

Agent Atlas should look and feel like an elite autonomous operations cockpit:

- Premium, modern, AI-first interface
- Dark / light mode support
- Live operational telemetry style layout
- Command-center UX (not a generic Etsy helper)

## Explicit Non-Goals

The following are out of scope and removed from direction:

- Junk removal operations
- Clean Plate CRM integration
- Dispatch/truck routing workflows
- Quote pipelines tied to hauling operations
- Gmail-automation dependency
- Finance center / bookkeeping features

## Next Build Milestones

1. Wire these seed tables into persistent storage.
2. Implement orchestrated agent jobs (Opportunity → Listing → Bundle → Approval).
3. Add performance ingestion loop for listing metrics.
4. Build command dashboard with alerting + workflow logs.
5. Gate all publish actions behind Approval Agent.

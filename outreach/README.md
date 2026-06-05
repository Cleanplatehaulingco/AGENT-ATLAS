# TradeOpsVault — B2B Email Outreach System

Automated cold outreach to trade contractors (HVAC, plumbing, electrical, flooring, roofing).

---

## Architecture

```
lead-finder.js      → Google Places API  → raw leads (name, address, website)
email-enricher.js   → Hunter.io API      → contact email + first name
email-writer.js     → Claude Haiku API   → personalized email copy
sender.js           → SendGrid API       → delivery + compliance
campaign-manager.js → orchestrates all   → logs to campaign-log.json
server-routes.js    → Express API routes → campaign management endpoints
```

---

## Required Environment Variables

| Variable | Description |
|---|---|
| `GOOGLE_PLACES_API_KEY` | Google Places API key for lead discovery |
| `HUNTER_API_KEY` | Hunter.io API key for email enrichment |
| `ANTHROPIC_API_KEY` | Anthropic API key for email writing (Claude Haiku) |
| `SENDGRID_API_KEY` | SendGrid API key for email delivery |
| `OUTREACH_FROM_EMAIL` | Sender email address (must match verified SendGrid domain) |
| `OUTREACH_FROM_NAME` | Sender display name (e.g. "Jordan from TradeOpsVault") |
| `CAMPAIGN_START_DATE` | ISO date of first send (e.g. `2024-03-01`) — used for warmup schedule |

---

## Step-by-Step Setup

### 1. Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Places API** under APIs & Services
4. Create an API key under Credentials
5. Restrict the key to Places API only (recommended)
6. Set: `GOOGLE_PLACES_API_KEY=your_key_here`

**Cost:** $17/1000 text search requests. A campaign across 5 trades × 10 cities = ~150 API calls ($2.55).

### 2. Hunter.io API Key

**Free tier:** 25 domain searches/month — good for testing.
**Paid:** $49/month for 500 searches, $99/month for 1,000.

1. Sign up at [hunter.io](https://hunter.io/)
2. Go to API → copy your API key
3. Set: `HUNTER_API_KEY=your_key_here`

Note: The enricher is rate-limited to 1 request/second to stay within API limits.

### 3. Anthropic API Key (Claude)

1. Sign up at [console.anthropic.com](https://console.anthropic.com/)
2. Create an API key
3. Set: `ANTHROPIC_API_KEY=your_key_here`

**Cost:** ~$0.001 per email (claude-haiku-4-5 pricing).

### 4. SendGrid API Key

**Free tier:** 100 emails/day forever.
**Paid:** $19.95/month for 50,000 emails/month.

1. Sign up at [sendgrid.com](https://sendgrid.com/)
2. Settings → API Keys → Create API key with "Mail Send" permission
3. Set: `SENDGRID_API_KEY=your_key_here`

### 5. Verify Your Sending Domain

In SendGrid → Settings → Sender Authentication:
- Authenticate your sending domain (e.g. `outreach.tradeopsvault.com`)
- Set `OUTREACH_FROM_EMAIL` to an address at that domain (e.g. `jordan@outreach.tradeopsvault.com`)

---

## DNS Records Required

Add these to your DNS for `outreach.tradeopsvault.com`:

### SPF Record
```
Type: TXT
Name: outreach.tradeopsvault.com
Value: v=spf1 include:sendgrid.net ~all
```

### DKIM Record
SendGrid generates DKIM keys during domain verification. Add the two CNAME records they provide:
```
Type: CNAME
Name: s1._domainkey.outreach.tradeopsvault.com
Value: s1.domainkey.u12345678.wl123.sendgrid.net
```

### DMARC Record
```
Type: TXT
Name: _dmarc.outreach.tradeopsvault.com
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@tradeopsvault.com; pct=100
```

Start with `p=none` during warmup, then escalate to `p=quarantine` → `p=reject`.

---

## Warmup Schedule

IP/domain warmup builds sender reputation with email providers. Never skip this.

| Days | Daily Limit | Notes |
|------|------------|-------|
| 1-7 | 20/day | Focus on highest-quality leads (4.5+ star businesses) |
| 8-14 | 40/day | Expand to all qualified leads |
| 15-21 | 75/day | Full campaign velocity |
| 22-30 | 150/day | High volume |
| 31+ | 300/day | Steady state |

**Auto-pause triggers:**
- Bounce rate > 5% → campaign pauses automatically
- Spam complaint rate > 0.1% → campaign pauses automatically

---

## Usage

### Express API Routes

Mount in your `server.js`:

```js
const outreachRoutes = require('./outreach/server-routes');
app.use(express.json());
app.use(outreachRoutes);
```

### Start a Campaign

```bash
curl -X POST http://localhost:3000/outreach/campaign/start \
  -H "Content-Type: application/json" \
  -d '{
    "trades": ["HVAC", "plumbing", "electrical"],
    "cities": [
      { "city": "Austin", "state": "TX" },
      { "city": "Denver", "state": "CO" }
    ],
    "dailyTarget": 20
  }'
```

### Preview Leads (no emails sent)

```bash
curl "http://localhost:3000/outreach/leads/preview?trade=HVAC&city=Austin&state=TX"
```

### Check Stats

```bash
curl http://localhost:3000/outreach/campaign/stats
```

### Check Warmup Status

```bash
curl http://localhost:3000/outreach/warmup-status
```

### Programmatic Usage

```js
import { CampaignManager } from './outreach/campaign-manager.js';

const manager = new CampaignManager({
  googleApiKey: process.env.GOOGLE_PLACES_API_KEY,
  hunterApiKey: process.env.HUNTER_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  fromEmail: process.env.OUTREACH_FROM_EMAIL,
  fromName: process.env.OUTREACH_FROM_NAME,
  campaignStartDate: '2024-03-01',
});

await manager.runCampaign(
  ['HVAC', 'plumbing'],
  [{ city: 'Austin', state: 'TX' }],
  20 // dailyTarget
);
```

---

## CAN-SPAM Compliance Checklist

Every outbound email from this system automatically includes:

- [x] Physical address footer (`TradeOpsVault | 123 Business Ave, Suite 100`)
- [x] `List-Unsubscribe` header (RFC 2369)
- [x] `List-Unsubscribe-Post` header for one-click unsubscribe (RFC 8058)
- [x] Unsubscribe link in footer
- [x] Unsubscribe processing via `/outreach/unsubscribe/:token` endpoint
- [x] Domain suppression after unsubscribe (whole company removed)
- [x] Bounce suppression (domains that bounce are not retried)
- [x] No deceptive subject lines (Claude is instructed to avoid spam triggers)

**Your responsibilities:**
- [ ] Honor unsubscribe requests within 10 business days (the system does this automatically)
- [ ] Ensure `fromEmail` is a real, monitored inbox
- [ ] Update the physical address in `sender.js` if it changes
- [ ] Do not re-add unsubscribed contacts
- [ ] Keep `campaign-log.json` and `suppressions.json` backed up

---

## File Reference

| File | Purpose |
|------|---------|
| `lead-finder.js` | Google Places lead discovery |
| `email-enricher.js` | Hunter.io email enrichment |
| `email-writer.js` | Claude AI email personalization |
| `sender.js` | SendGrid delivery + warmup schedule |
| `campaign-manager.js` | Main orchestrator |
| `server-routes.js` | Express API routes (CommonJS) |
| `campaign-log.json` | Auto-created — append-only send log |
| `suppressions.json` | Auto-created — unsubscribe/bounce suppression list |

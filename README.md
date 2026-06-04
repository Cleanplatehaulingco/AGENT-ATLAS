# CarePing

**Care. Connect. Peace of mind.**

CarePing is a voice-first safety, connection, and reminder companion for elderly adults and their family caregivers. It combines daily check-ins via SMS or voice call, medication reminders, missed check-in alerts, and a shared family dashboard — giving families real-time peace of mind without being intrusive to their loved ones.

---

## Who it's for

- **Adult children** caring for aging parents who live independently
- **Distributed families** coordinating care across cities and time zones
- **Professional caregivers** managing multiple care recipients
- **Elderly adults** who want simple, non-intrusive safety check-ins

---

## Features

### Elder Experience
- **Daily check-ins** via SMS: "Reply 1 if you're okay, 2 if you'd like a call"
- **Medication reminders** via text message with simple reply logging
- **No smartphone required** — works with any basic phone via SMS

### Caregiver Dashboard
- **Real-time check-in status** — green checkmark or amber alert at a glance
- **Medication tracking** — log doses, view adherence history
- **Shared care log** — notes, moods, vitals, meals, activities
- **Appointments** — upcoming and past appointments for the whole team
- **Alerts center** — missed check-ins, medication misses, elder call requests
- **Care Circle** — invite family members, assign roles, share access

### AI-Powered
- **AI Caregiver Assistant** — answers questions about medications, symptoms, when to call 911, caregiver burnout, family coordination, and more
- **Weekly summary reports** — check-in rate, medication adherence, upcoming appointments

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/cleanplatehaulingco/agent-atlas.git
cd agent-atlas
git checkout carepingapp

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Default credentials:**
- Username: `admin`
- Password: `CarePing2024!`

Change these in `.env.local` before deploying.

---

## Twilio Setup (SMS & Voice Check-ins)

SMS and voice check-ins are optional for MVP but recommended for full functionality.

1. Create a [Twilio account](https://www.twilio.com)
2. Get a phone number from Twilio console
3. Add credentials to `.env.local`:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
TWILIO_WEBHOOK_URL=https://yourdomain.com/api/twilio/webhook
```

4. In Twilio console, set your phone number's **inbound webhook** to:
   `https://yourdomain.com/api/twilio/webhook`

Incoming SMS replies are handled at `/api/twilio/webhook`:
- Reply `1` or `yes` → logs check-in as completed
- Reply `2` or `call` → creates a high-priority "call requested" alert
- Reply `done` → logs medication as taken
- Reply `skip` → logs medication as skipped

---

## AI Assistant Setup

Choose one AI provider and add the key to `.env.local`:

```env
# Option 1: Anthropic Claude (recommended)
ANTHROPIC_API_KEY=your_key

# Option 2: Google Gemini (free tier available)
GEMINI_API_KEY=your_key
```

Get a free Gemini key at [aistudio.google.com](https://aistudio.google.com/app/apikey).

---

## Deployment

### Railway (recommended)

1. Fork this repo or push to your own GitHub
2. Connect to [Railway](https://railway.app)
3. Set environment variables in Railway dashboard
4. Deploy — Railway detects Next.js automatically

### Environment Variables for Production

```env
AUTH_USERNAME=admin
AUTH_PASSWORD=your_secure_password
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://yourdomain.com
ANTHROPIC_API_KEY=your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
```

---

## Business Model

CarePing operates on a freemium SaaS model:

| Plan | Price | Target |
|------|-------|--------|
| Free | $0/mo | Individuals evaluating CarePing |
| Family | $19/mo | Families coordinating care |
| Care Pro | $49/mo | Professional caregivers, agencies |

Revenue drivers: monthly subscriptions, SMS volume (pass-through Twilio costs), and optional white-label licensing for home health agencies.

---

## Built With

- **[Next.js 14](https://nextjs.org)** — React framework with App Router
- **[TypeScript](https://typescriptlang.org)** — type-safe throughout
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first styling
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** — embedded database (no external DB needed)
- **[NextAuth.js](https://next-auth.js.org)** — authentication
- **[Twilio](https://twilio.com)** — SMS and voice check-ins
- **[Anthropic Claude](https://anthropic.com) / [Google Gemini](https://ai.google.dev)** — AI assistant
- **[Lucide React](https://lucide.dev)** — icons

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

*CarePing — Care. Connect. Peace of mind.*

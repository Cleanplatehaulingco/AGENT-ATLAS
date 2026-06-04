# Raven's Business Hub

A private CRM and business dashboard for Raven's Baubles & Gifts — a handmade jewelry and gifts shop selling on Etsy, at the South Lyon Saturday Farmers Market, and on Facebook Marketplace.

## Features

- **Dashboard** — Revenue stats (today/week/month/year), platform breakdown, top products, upcoming follow-ups, holiday campaign planner, and AI business tips
- **Clients / CRM** — Customer contact book with tags, follow-up reminders, notes, and email list export
- **Sales Log** — Log sales by platform with itemized products, payment method tracking, and search/filter
- **Revenue Tracker** — Monthly revenue charts by platform, expense logging, profit/loss summary, and CSV export
- **Product Analyzer** — Product catalog with cost/margin tracking, inventory counts, and AI-powered pricing analysis
- **Intelligence Report** — Deep analytics: product leaderboard, color/material/style performance, day-of-week trends, repeat customer tracking
- **AI Assistant** — Full-page chat assistant with quick prompts for pricing, Etsy descriptions, holiday campaigns, and more
- **Floating AI Chat** — Quick-access AI chat bubble available on every page

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- SQLite via better-sqlite3 (local file database)
- NextAuth.js (credential-based authentication)
- Recharts (charts)
- Anthropic Claude or Google Gemini (AI features)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in values:
   ```bash
   cp .env.example .env.local
   ```

3. Generate a `NEXTAUTH_SECRET`:
   ```bash
   openssl rand -base64 32
   ```

4. Add either `ANTHROPIC_API_KEY` or `GEMINI_API_KEY` (Gemini has a free tier).

5. Run the dev server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) and sign in with your configured `AUTH_USERNAME` / `AUTH_PASSWORD`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `AUTH_USERNAME` | Login username (default: `raven`) |
| `AUTH_PASSWORD` | Plain text password |
| `AUTH_PASSWORD_HASH` | Bcrypt hash of password (more secure, takes priority over `AUTH_PASSWORD`) |
| `NEXTAUTH_SECRET` | Random secret for session signing |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key |
| `GEMINI_API_KEY` | Google Gemini API key (free tier available) |

## Data

The SQLite database is stored at `data/ravens.db` and is excluded from git. Back it up manually if needed.

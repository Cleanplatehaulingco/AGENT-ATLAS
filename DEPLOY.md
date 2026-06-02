# Deploying Raven's Business Hub to Railway

Railway gives you a live, secure URL with persistent storage for the database.
Free tier covers a small business app. ~$5/month after free credits run out.

---

## Step 1 — Create a Railway account

Go to **railway.app** and sign up with GitHub.

---

## Step 2 — Create a new project

1. Click **New Project**
2. Select **Deploy from GitHub repo**
3. Connect your GitHub account and select **AGENT-ATLAS**
4. Railway auto-detects the Dockerfile and starts building

---

## Step 3 — Add a Persistent Volume (for the database)

The SQLite database lives in `/app/data`. You must attach a volume so it
survives redeploys.

1. In your Railway project, click your service
2. Go to **Settings → Volumes**
3. Click **Add Volume**
4. Mount path: `/app/data`
5. Click **Add**

---

## Step 4 — Set Environment Variables

In Railway → your service → **Variables**, add these:

| Variable | Value |
|---|---|
| `AUTH_USERNAME` | `raven` |
| `AUTH_PASSWORD` | `Lovelyn#1452!` |
| `NEXTAUTH_SECRET` | (generate: `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your Railway URL (e.g. `https://ravens-hub.up.railway.app`) |
| `GEMINI_API_KEY` | Your free Gemini key from aistudio.google.com |
| `NODE_ENV` | `production` |

> **Get your NEXTAUTH_URL:** After first deploy, Railway gives you a URL like
> `https://agent-atlas-production.up.railway.app` — copy it and set it here,
> then redeploy.

---

## Step 5 — Deploy

Railway deploys automatically on every push to the `main` branch.
To trigger a manual deploy: **Railway dashboard → Deploy → Redeploy**.

---

## Step 6 — Access your site

Visit your Railway URL. You'll see the Raven's Business Hub login screen.

- **Username:** `raven`
- **Password:** `Lovelyn#1452!`

---

## Updating the password later

To change your password, update the `AUTH_PASSWORD` variable in Railway and
redeploy. The session expires after 30 days, requiring a new login.

---

## Custom domain (optional)

In Railway → Settings → Domains → Add Custom Domain.
Point your domain's DNS CNAME to the Railway URL.
SSL is automatic.

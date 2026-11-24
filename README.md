# 🌿 Fern Forest — Fresh Microgreens

A production-ready Next.js 14 e-commerce web app for Fern Forest microgreens.

## ✨ Features

- **Full product catalog** — 7 varieties, 5 performance mixes, 6 goal-oriented plans
- **Shopping cart** — persistent via Zustand + localStorage
- **Checkout** → order saved to Neon Postgres, then sent via WhatsApp (WhatsApp still works if the save fails)
- **Admin dashboard** → `/admin` lists orders and leads (password protected)
- **Responsive** — mobile-first design
- **Vercel-ready** — the site and its API deploy together

---

## 🚀 Local Development

This is an Nx monorepo using npm workspaces. One install at the root installs every app.

```bash
npm install

cp apps/fernforest-portal/.env.example apps/fernforest-portal/.env.local   # fill in the Neon URLs + admin login
npm run migrate      # creates the leads / orders / order_items tables (safe to re-run)

npm run dev          # site + API → http://localhost:3000
```

The API lives inside the Next.js app (`app/api/*`), so there is no separate backend to run.

| Command                    | What it does                              |
|----------------------------|-------------------------------------------|
| `npm run dev`              | Site + API on http://localhost:3000       |
| `npm run migrate`          | Create/update the database tables         |
| `npm run build`            | Production build of the portal (cached)   |
| `npm run lint`             | Lint the portal (cached)                  |
| `npm run graph`            | Open the Nx project graph                 |

The admin dashboard at `/admin` (and `/api/admin/*`) asks for the `ADMIN_USER` / `ADMIN_PASSWORD` set in the portal env. If they are not set, admin stays locked.

---

## 🌐 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** and import the GitHub repo
2. Set **Root Directory** to `apps/fernforest-portal` (Framework: **Next.js**, auto-detected)
3. Under **Environment Variables**, add `DATABASE_URL` (Neon pooled URL), `ADMIN_USER` and `ADMIN_PASSWORD`
4. Click **Deploy**. After changing any environment variable, redeploy so it takes effect.

Pushing to `main` deploys automatically.

### Connect `fernforest.in` (GoDaddy → Vercel)

1. In Vercel → your project → **Settings → Domains**
2. Add `fernforest.in` and `www.fernforest.in`
3. Log into [GoDaddy](https://dcc.godaddy.com) → **DNS → Manage** and add:

| Type  | Name | Value                        |
|-------|------|------------------------------|
| A     | @    | `76.76.21.21`                |
| CNAME | www  | `cname.vercel-dns.com`       |

4. Wait ~10-30 min for DNS propagation. Vercel provisions SSL automatically.

---

## 📁 Project Structure

```
fernforest/
├── apps/
│   └── fernforest-portal/      # Next.js site + API (deployed to Vercel)
│       ├── app/                # Pages, /admin dashboard, /api routes
│       ├── components/         # Layout, cart, product and UI components
│       ├── lib/                # Product data, Zustand cart store, API client
│       ├── lib/server/         # Database access (Neon Postgres) used by /api routes
│       ├── scripts/migrate.mjs # Creates the database tables
│       ├── types/              # Frontend-only TypeScript types
│       ├── middleware.ts       # Password protection for /admin
│       └── vercel.json
├── libs/
│   └── shared-types/           # Lead/Order types shared by pages and API routes
├── neon.ts                     # Neon services config (used by `neon deploy`)
├── nx.json
└── package.json                # npm workspaces root
```

---

## 🛒 Order Flow

1. User browses products → adds to cart
2. Cart drawer opens (persistent across sessions)
3. User goes to `/checkout`, fills name + phone + address
4. Clicks "Place Order via WhatsApp" → the order is saved to the database (`POST /api/orders`)
5. WhatsApp opens with a **pre-formatted order message** to **+91 81139 98511**
6. User hits Send — you receive the order, and it also shows up in `/admin` ✅

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Site + API routes |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Cart state management |
| Neon Postgres (`pg`) | Orders and leads database |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| Nx | Monorepo tooling |
| Vercel | Hosting |

---

## 🎨 Customisation

- **Products/Prices** → Edit `apps/fernforest-portal/lib/data.ts`
- **WhatsApp number** → Change `WHATSAPP_NUMBER` in `apps/fernforest-portal/lib/data.ts`
- **Colors** → Edit `apps/fernforest-portal/tailwind.config.ts` color tokens
- **Fonts** → Edit `apps/fernforest-portal/app/globals.css` Google Fonts import

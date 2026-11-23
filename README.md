# 🌿 Fern Forest — Fresh Microgreens

A production-ready Next.js 14 e-commerce web app for Fern Forest microgreens.

## ✨ Features

- **Full product catalog** — 7 varieties, 5 performance mixes, 6 goal-oriented plans
- **Shopping cart** — persistent via Zustand + localStorage
- **Checkout** → WhatsApp order delivery (no backend needed)
- **Responsive** — mobile-first design
- **Vercel-ready** — zero config deployment

---

## 🚀 Local Development

This is an Nx monorepo using npm workspaces. One install at the root installs every app.

```bash
npm install

# Backend needs Postgres + env vars
cp apps/BackEnd/.env.example apps/BackEnd/.env              # fill in DATABASE_URL etc.
cp apps/fernforest-portal/.env.example apps/fernforest-portal/.env.local
npm run migrate:backend

npm run dev:all      # portal → http://localhost:3000, API → http://localhost:4000
```

| Command                    | What it does                              |
|----------------------------|-------------------------------------------|
| `npm run dev`              | Portal only                               |
| `npm run dev:backend`      | Backend API only                          |
| `npm run dev:all`          | Both, in parallel                         |
| `npm run build`            | Production build of the portal (cached)   |
| `npm run lint` / `npm test`| Lint the portal / run all tests (cached)  |
| `npm run graph`            | Open the Nx project graph                 |

The admin dashboard at `/admin` asks for the `ADMIN_USER` / `ADMIN_PASSWORD` set in the portal env, and the backend's `/api/admin/*` routes require `ADMIN_API_TOKEN`.

Backend in Docker: `cd apps/BackEnd && docker compose up --build` (runs migrations, then starts the API).

---

## 🌐 Deploy to Vercel (Step-by-step)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial commit — Fern Forest microgreens app"
git remote add origin https://github.com/YOUR_USERNAME/fernforest.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo `fernforest`
3. Set **Root Directory** to `apps/fernforest-portal` (Framework: **Next.js**, auto-detected)
4. Under **Environment Variables**, add `NEXT_PUBLIC_API_URL`, `ADMIN_API_TOKEN`, `ADMIN_USER` and `ADMIN_PASSWORD`
5. Click **Deploy**

### Step 3 — Connect `fernforest.in` (GoDaddy → Vercel)

1. In Vercel → your project → **Settings → Domains**
2. Add `fernforest.in` and `www.fernforest.in`
3. Vercel shows you DNS records to add. Copy them.
4. Log into [GoDaddy](https://dcc.godaddy.com) → **DNS → Manage**
5. Add/update these records:

| Type  | Name | Value                        |
|-------|------|------------------------------|
| A     | @    | `76.76.21.21`                |
| CNAME | www  | `cname.vercel-dns.com`       |

6. Wait ~10-30 min for DNS propagation
7. Vercel auto-provisions SSL ✅

---

## 📁 Project Structure

```
fernforest/
├── apps/
│   ├── fernforest-portal/      # Next.js storefront (deployed to Vercel)
│   │   ├── app/                # Pages, /admin dashboard, /api routes
│   │   ├── components/         # Layout, cart, product and UI components
│   │   ├── lib/                # Product data, Zustand cart store, API client
│   │   ├── types/              # Frontend-only TypeScript types
│   │   ├── middleware.ts       # Basic auth for /admin
│   │   └── vercel.json
│   └── BackEnd/                # Express + PostgreSQL API (leads, orders)
│       ├── src/                # routes → controllers → services → db
│       ├── tests/
│       └── Dockerfile
├── libs/
│   └── shared-types/           # Lead/Order types shared by portal and backend
├── nx.json
└── package.json                # npm workspaces root
```

---

## 🛒 Order Flow

1. User browses products → adds to cart
2. Cart drawer opens (persistent across sessions)
3. User goes to `/checkout`, fills name + phone + address
4. Clicks "Place Order via WhatsApp"
5. WhatsApp opens on their device with a **pre-formatted order message** sent to **+91 81139 98511**
6. User hits Send — you receive the order instantly ✅

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | Cart state management |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| Vercel | Hosting |

---

## 🎨 Customisation

- **Products/Prices** → Edit `lib/data.ts`
- **WhatsApp number** → Change `WHATSAPP_NUMBER` in `lib/data.ts`
- **Colors** → Edit `tailwind.config.ts` color tokens
- **Fonts** → Edit `app/globals.css` Google Fonts import

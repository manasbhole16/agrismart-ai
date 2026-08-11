# AgriSmart AI

An AI-powered irrigation advisory platform for smart sugarcane farming — real-time plot telemetry, weather insights, AI-generated irrigation/fertigation recommendations, and a farmer-facing dashboard.

## 1. Features

- Email/password authentication (JWT, httpOnly session cookie)
- Farm & plot management with map view (Leaflet)
- Real-time telemetry dashboard (soil moisture, ambient temperature, humidity, water stress index)
- AI irrigation & fertigation advisory with override workflow
- Weather insights (7-day forecast view)
- Analytics, notifications, and an advisory chat interface
- Graceful **mock-data fallback**: the app runs and is fully click-through-able even with no database configured, so it can be evaluated without provisioning MongoDB first

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn-style UI primitives
- **Database:** MongoDB (via Mongoose)
- **Auth:** Custom JWT (HMAC-SHA256, Web Crypto API) + httpOnly cookies
- **Maps:** Leaflet / react-leaflet
- **Charts:** Recharts
- **Fonts:** Geist (self-hosted via the `geist` package — no build-time network fetch)

## 3. Project Structure

```
agrismart-ai/
├── app/
│   ├── api/
│   │   ├── auth/           # login, register, logout, me
│   │   └── plots/          # plots, telemetry, recommendations
│   ├── dashboard/          # protected dashboard routes
│   ├── login/               # combined login/register page
│   ├── layout.tsx
│   └── page.tsx             # marketing landing page
├── components/
│   ├── dashboard/           # Sidebar, TopNav, MapComponent
│   ├── landing/              # Navbar and marketing sections
│   └── ui/                    # shadcn-style primitives
├── lib/
│   ├── mongodb.ts            # cached Mongoose connection
│   ├── jwt.ts                # sign/verify session JWTs
│   └── utils.ts
├── models/                    # Mongoose schemas (User, Farm, Telemetry, ...)
├── public/
├── proxy.ts                    # route protection (Next.js 16's replacement for middleware.ts)
├── next.config.ts
├── netlify.toml
└── .env.example
```

## 4. Prerequisites

- Node.js **>= 20.9** (required by Next.js 16)
- npm
- A MongoDB connection string (e.g. MongoDB Atlas) — optional for local evaluation, required for real data persistence

## 5. Environment Variables

Copy `.env.example` to `.env.local` and fill in real values:

| Variable       | Required | Description                                                                 |
|----------------|----------|-------------------------------------------------------------------------------|
| `MONGODB_URI`  | No*      | MongoDB connection string. If unset, API routes fall back to built-in mock data so the app still runs. |
| `JWT_SECRET`   | **Yes**  | Secret used to sign/verify session JWTs. Generate with `openssl rand -hex 32`. The app throws a clear startup error if this is missing. |

\* Required for real data persistence and multi-user accounts; the app is fully functional in mock mode without it.

## 6. Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## 7. Database Setup

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) (or use any MongoDB instance).
2. Add your current IP (or `0.0.0.0/0` for serverless platforms with dynamic IPs) to the Atlas Network Access list.
3. Copy the connection string into `MONGODB_URI` in `.env.local` (development) or your deployment platform's environment variables (production).

Without a configured `MONGODB_URI`, login/register/telemetry/plot endpoints transparently serve mock data — useful for demos, but **not for real user accounts**.

## 8. Production Build

```bash
npm run build
npm start
```

## 9. Vercel Deployment

Vercel auto-detects Next.js — no `vercel.json` needed.

1. Import the repository in the Vercel dashboard.
2. Framework preset: **Next.js** (auto-detected).
3. Build command: `npm run build` (default).
4. Output: managed automatically by Next.js's Vercel integration.
5. Add environment variables in **Project Settings → Environment Variables**:
   - `MONGODB_URI`
   - `JWT_SECRET`
6. Deploy.

## 10. Netlify Deployment

This repo includes `netlify.toml` configured with the official `@netlify/plugin-nextjs` runtime, which handles SSR/API routes automatically (no manual publish directory needed).

1. Import the repository in the Netlify dashboard, or run `netlify deploy`.
2. Build command: `npm run build` (from `netlify.toml`).
3. Add environment variables in **Site configuration → Environment variables**:
   - `MONGODB_URI`
   - `JWT_SECRET`
4. Deploy.

## 11. Troubleshooting

- **"Missing environment variable: JWT_SECRET"** — set `JWT_SECRET` in your environment; the app intentionally refuses to sign/verify sessions without it (no insecure fallback).
- **Login/register works but `/dashboard` redirects back to `/login`** — the session cookie is `Secure`, so it's only stored over HTTPS in production. Confirm your deployment is served over HTTPS (Vercel/Netlify both provide this by default).
- **MongoDB "IP not whitelisted" errors** — add your deployment platform's IP range (or `0.0.0.0/0`) to Atlas Network Access, since Vercel/Netlify use dynamic serverless IPs.
- **Build fails fetching fonts** — shouldn't happen; fonts are self-hosted via the `geist` package specifically to avoid build-time network dependencies.

## 12. Security Notes

- `JWT_SECRET` has no fallback value — required in every environment.
- Session cookies are `httpOnly` and `Secure` in production, mitigating XSS-based token theft.
- Passwords are hashed before storage (never stored or logged in plaintext).
- `.env`, `.env.local`, and `.env.*.local` are gitignored — never commit real secrets.
- `MONGODB_URI` and `JWT_SECRET` are server-only and are never exposed to client-side code.

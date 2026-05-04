# 🛠️ LocalFix — Service Finder & Real‑Time Communication Platform

LocalFix is a full‑stack platform that connects **service needers** with **service providers** (plumbers, electricians, carpenters, AC technicians, etc.). It includes **JWT authentication**, **location‑based provider discovery**, **bookings**, **real‑time messaging** (Socket.io), and an optional **offline AI assistant** (Flask + Ollama).

---

## 📌 Tech stack

- **Frontend**: Next.js (App Router), TailwindCSS  
- **Backend**: Next.js API routes + MongoDB (Mongoose) + JWT  
- **Realtime**: Socket.io server (`server.js`, port `4000`)  
- **AI (optional)**: Flask (`flaskChatbot/`) + Ollama (local)

---

## ✅ Key routes

### Public pages
- `/` — Home
- `/services` — Services landing
- `/services/[category]` — Providers nearby
- `/services/[category]/[id]` — Provider detail + booking CTA
- `/about` — About LocalFix
- `/blog` — Blog landing

### Auth
- `/auth/login`
- `/auth/signup`

### Service Needer
- `/serviceNeeder/[id]/booking` — Create a booking (for a provider)
- `/serviceNeeder/[id]/bookings` — **My Bookings**
- `/serviceNeeder/[id]/profile` — **My Profile**

### Service Provider
- `/serviceProvider/[id]/profile`
- `/serviceProvider/[id]/request`
- `/serviceProvider/[id]/messages`
- `/serviceProvider/[id]/earning`
- `/serviceProvider/[id]/review`

---

## 🔌 API endpoints (App Router)

### Auth/session
- `POST /api/auth/signup`
- `POST /api/auth/login` — sets **HttpOnly** cookie `auth-token`
- `POST /api/auth/logout` — clears `auth-token`
- `GET /api/me` — reads `auth-token` and returns `{ user, role }`

### Bookings
- `POST /api/bookings/create` — creates booking (uses cookie session)
- `GET /api/bookings/seeker/[id]` — list bookings for a service needer (owner-only)

### Profiles
- `GET/PUT /api/ServiceNeeder/[id]/profile` — service needer profile (owner-only)
- `GET/PUT /api/ServiceProviders/[id]/profile` — service provider profile (owner-only)
- `GET /api/ServiceProviders/[id]/public` — public provider profile

---

## 📁 Project structure (high level)

```
localfix/
  app/                      # Next.js pages + API routes (App Router)
  components/               # UI components
  context/                  # AppContext (session + socket)
  lib/                      # DB config, models, auth helpers
  flaskChatbot/             # Optional Flask AI assistant (Ollama client)
  server.js                 # Socket.io realtime server (port 4000)
  README.md
```

---

## ⚙️ Installation

```bash
npm install
```

---

## 🔑 Environment variables

Create `.env.local` in the project root:

```ini
# MongoDB used by Next.js API routes
MONGO_URI=your_mongodb_connection_string

# JWT secret used by Next.js API routes (/api/auth/*, /api/me, middleware, etc.)
JWT_SECRET=your_secret

# Used by signup geocoding
OPENCAGE_API_KEY=your_opencage_key
```

---

## 🚀 Running the project (local)

### 1) Start Next.js

```bash
npm run dev
```

App runs at `http://localhost:3000`.

### 2) Start realtime server (Socket.io)

In a new terminal:

```bash
node server.js
```

Socket server runs on `http://localhost:4000`.

### 3) (Optional) Start AI assistant (Flask + Ollama)

Install Python deps:

```bash
pip install -r flaskChatbot/requirements.txt
```

Run Flask:

```bash
python flaskChatbot/app.py
```

Start Ollama locally and pull a model (example):

```bash
ollama pull gemma3:1b
```

---

## 🧪 Quality checks

```bash
npm run lint
npm run build
```

---

## ☁️ Deploying to Vercel (notes)

- Ensure Vercel environment variables include `MONGO_URI`, `JWT_SECRET`, and `OPENCAGE_API_KEY`.
- `server.js` (Socket.io on port `4000`) is a **separate server**; it will not run on Vercel automatically. Deploy it separately (or replace with a managed realtime option).
- Next.js build may show a warning about middleware convention being deprecated; it does not block build.

---

## 🙌 Author

Niteshwar Kumar (CodeCrusader31)

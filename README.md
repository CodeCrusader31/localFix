# 🛠️ LocalFix — Service Finder & Real‑Time Communication Platform

<div align="center">

![LocalFix Banner](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.18-green?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-red?style=for-the-badge&logo=socket.io)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Connect service needers with service providers instantly.**  
Real-time messaging • Location-based discovery • Secure bookings • AI-powered assistance

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Setup Guide](#-complete-setup-guide) • [API Reference](#-api-endpoints)

</div>

---

## 📋 Overview

**LocalFix** is a full-stack service marketplace that enables users to find and book local service providers (plumbers, electricians, carpenters, AC technicians, etc.). Built with modern web technologies, it features:

- ✅ **JWT-based authentication** with secure HttpOnly cookies
- ✅ **Real-time messaging** powered by Socket.io
- ✅ **Location-based provider discovery** with geocoding
- ✅ **Booking management system** with status tracking
- ✅ **Responsive design** with TailwindCSS
- ✅ **Optional AI assistant** with Groq LLM + RAG
- ✅ **Redis caching** for performance optimization

---

## ✨ Features

### For Service Needers
- 🔍 Browse services by category (Cleaning, Repairs, Outdoor, etc.)
- 📍 Find providers nearby with location-based search
- 💼 Create and track bookings
- ⭐ Rate and review service providers
- 💬 Real-time messaging with providers
- 📊 View booking history and status

### For Service Providers
- 📝 Complete profile management
- 📥 Accept/reject service requests
- 💰 View earnings and transaction history
- ⭐ Manage reviews and ratings
- 💬 Real-time communication with clients
- 📍 Location-based service availability
- 📈 Dashboard with analytics

### General Features
- 🤖 **AI Chatbot Assistant** (Optional) — powered by Groq + RAG knowledge base
- 🔐 Secure authentication and authorization
- 📱 Fully responsive design
- ⚡ Fast, optimized performance with Redis caching
- 🎨 Modern UI with smooth animations

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
- **UI Components**: [Lucide React](https://lucide.dev/), React Hot Toast
- **State Management**: React Context API + AppContext
- **Real-time**: [Socket.io Client](https://socket.io/)
- **Utilities**: Axios, react-scroll

### Backend
- **API**: Next.js API Routes
- **Database**: [MongoDB 8.18](https://www.mongodb.com/) + [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: JWT ([jose](https://github.com/panva/jose) + [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken))
- **Password**: [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Caching**: [Redis 5](https://redis.io/)
- **Real-time**: [Socket.io 4.8](https://socket.io/)

### Optional AI Services
- **AI Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **LLM**: [Groq](https://groq.com/) API
- **RAG**: [ChromaDB](https://www.trychroma.com/) + [Sentence Transformers](https://www.sbert.net/)
- **Legacy**: [Flask](https://flask.palletsprojects.com/) chatbot with Ollama support

### DevOps & Build
- **Task Runner**: npm scripts
- **Linting**: ESLint + ESLint Config Next
- **Build**: Next.js with Turbopack

---

## 📁 Project Structure

```
localfix/
├── app/                              # Next.js App Router
│   ├── api/                          # Backend API routes
│   │   ├── auth/                     # Authentication endpoints
│   │   ├── bookings/                 # Booking management
│   │   ├── messages/                 # Messaging system
│   │   ├── ServiceNeeder/            # Needer endpoints
│   │   └── ServiceProviders/         # Provider endpoints
│   ├── auth/                         # Auth pages (login, signup)
│   ├── serviceNeeder/                # Needer user pages
│   ├── serviceProvider/              # Provider user pages
│   ├── services/                     # Service browsing pages
│   ├── blog/                         # Blog pages
│   ├── about/                        # About page
│   └── layout.js                     # Root layout
├── components/                       # Reusable React components
│   ├── Navbar.jsx
│   ├── ChatBot.jsx                   # AI Assistant UI
│   ├── ServiceCard.jsx
│   └── [other components]
├── context/                          # React Context (State management)
│   ├── AppContext.js                 # Global app state + socket
│   └── AuthContext.js                # Auth state
├── lib/                              # Utilities & config
│   ├── config/
│   │   └── db.js                     # MongoDB connection
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Message.js
│   │   ├── Review.js
│   │   └── Earning.js
│   └── utils/
│       └── auth.js                   # JWT & auth helpers
├── ai-services/                      # FastAPI AI backend (Optional)
│   ├── app/
│   │   ├── main.py                   # FastAPI app
│   │   ├── agent/                    # AI agent logic
│   │   ├── llm/
│   │   │   └── groq_client.py        # Groq integration
│   │   ├── rag/                      # RAG pipeline
│   │   └── schemas/                  # Pydantic models
│   ├── data/
│   │   └── localfix_rag_knowledge_base.txt
│   └── chroma_db/                    # Vector store
├── flaskChatbot/                     # Legacy Flask AI (Alternative)
│   ├── app.py
│   └── requirements.txt
├── public/                           # Static assets
├── server.js                         # Socket.io realtime server
├── middleware.js                     # Next.js middleware
├── package.json
├── next.config.mjs
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 🔌 Architecture Overview

```
┌─────────────────────────────────────┐
│        React Frontend (Next.js)      │
│   (Pages, Components, Context)      │
└────────────────┬────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼────────┐  ┌────▼──────────┐
│  Next.js API   │  │  Socket.io    │
│  Routes        │  │  Server       │
│                │  │  (port 4000)  │
└───────┬────────┘  └────┬──────────┘
        │                │
        │       ┌────────┴────────┐
        │       │                 │
    ┌───▼───────▼──┐    ┌────────▼────────┐
    │  MongoDB     │    │  Redis Cache    │
    │  Database    │    │                 │
    └──────────────┘    └─────────────────┘

Optional AI Services:
┌──────────────────────────────┐
│    FastAPI (port 8000)       │
├──────────────────────────────┤
│ • Groq LLM Integration       │
│ • RAG with ChromaDB          │
│ • Sentence Transformers      │
└──────────────────────────────┘
```

---

## 📋 Prerequisites

Before setting up LocalFix, ensure you have the following installed:

| Requirement | Version | Link |
|-------------|---------|------|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Comes with Node.js |
| MongoDB | Latest | https://www.mongodb.com/try/download/community |
| Redis | Latest | https://redis.io/download |
| Python | 3.9+ | https://www.python.org (optional, for AI) |

**Optional (for AI features):**
- Groq API key: https://console.groq.com
- Ollama: https://ollama.ai (for local LLM)

---

## 🚀 Quick Start (5 minutes)

### 1️⃣ Clone & Install
```bash
git clone <your-repo-url>
cd localfix
npm install
```

### 2️⃣ Configure Environment
Create `.env.local` in the project root:
```ini
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENCAGE_API_KEY=your_opencage_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:4000
NEXT_PUBLIC_AI_URL=http://localhost:5000
```

### 3️⃣ Start Services (use 3 terminals)

**Terminal 1 — Next.js Frontend:**
```bash
npm run dev
```
🌐 App available at `http://localhost:3000`

**Terminal 2 — Socket.io Server:**
```bash
node server.js
```
🔌 WebSocket at `ws://localhost:4000`

**Terminal 3 — Optional AI Service:**
```bash
cd ai-services
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
🤖 API at `http://localhost:8000`

✅ All systems running!

---

## 🔧 Complete Setup Guide (End-to-End)

### Step 1: Environment Setup

#### 1.1 Install Dependencies

```bash
# Install Node.js dependencies
npm install

# Verify Node.js and npm
node --version  # Should be v18+
npm --version   # Should be v9+
```

#### 1.2 MongoDB Setup

**Option A: Local MongoDB**
```bash
# macOS (with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows (Community Edition)
# Download: https://www.mongodb.com/try/download/community
# Run installer and follow prompts
# Start MongoDB service from Services

# Linux (Ubuntu/Debian)
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (shared tier is free)
4. Create database user with credentials
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

#### 1.3 Redis Setup

```bash
# macOS
brew install redis
brew services start redis

# Windows (WSL or native binary)
# Download: https://redis.io/download
# Or use WSL: wsl && apt-get install redis-server

# Linux
sudo apt-get install redis-server
sudo systemctl start redis-server

# Verify Redis is running
redis-cli ping  # Should return "PONG"
```

#### 1.4 Get API Keys

**OpenCage Geocoding API:**
1. Visit https://opencagedata.com/
2. Sign up for free account
3. Get API key from dashboard

**Groq API (Optional - for AI):**
1. Visit https://console.groq.com
2. Create account
3. Generate API key

### Step 2: Configure Environment Variables

Create `.env.local` in project root:

```ini
# ===== Database =====
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/localFix?retryWrites=true&w=majority

# ===== Authentication =====
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars_long_12345678

# ===== Location Services =====
OPENCAGE_API_KEY=your_opencage_api_key_from_dashboard

# ===== Frontend URLs =====
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=ws://localhost:4000

# ===== AI Services (Optional) =====
NEXT_PUBLIC_AI_URL=http://localhost:8000
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=mixtral-8x7b-32768
```

### Step 3: Start Backend Services (3 Terminal Windows)

#### Terminal 1: Start MongoDB
```bash
# If using local MongoDB
mongod

# Or if running as service, verify it's running:
mongo --version  # Check version
```

#### Terminal 2: Start Redis
```bash
redis-server

# Verify connection
redis-cli ping  # Should return "PONG"
```

#### Terminal 3: Start Next.js Dev Server
```bash
npm run dev
```

Expected output:
```
- Local:        http://localhost:3000
- Environments: .env.local

ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 4: Start Socket.io Server (Terminal 4)

```bash
node server.js
```

Expected output:
```
Socket.io server running on port 4000
```

### Step 5: (Optional) Start AI Service (Terminal 5)

```bash
cd ai-services

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

### Step 6: Access the Application

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:3000 |
| Socket.io | ws://localhost:4000 |
| AI Service | http://localhost:8000/docs |

---

## 📖 Usage Guide

### 1. User Registration

**Sign Up as Service Needer:**
1. Click "Sign Up" on homepage
2. Enter email, password, phone
3. Select "I need services"
4. Complete profile with address
5. Email verified ✅

**Sign Up as Service Provider:**
1. Click "Sign Up"
2. Enter email, password, phone
3. Select "I offer services"
4. Choose service category
5. Set hourly rate and availability
6. Provide documentation
7. Account reviewed ✅

### 2. Browse Services

1. Go to `/services`
2. Click on category (Cleaning, Repair, etc.)
3. View providers nearby with ratings
4. Click on provider for details
5. View profile, reviews, availability

### 3. Create Booking

1. Select provider from service page
2. Click "Book Now"
3. Choose date and time
4. Add special instructions
5. Confirm payment method
6. Booking created ✅

### 4. Real-Time Messaging

1. Go to Messages
2. Select conversation or start new
3. Type message and send
4. Receive real-time notifications via Socket.io
5. Share photos/documents

### 5. Track Earnings (Provider)

1. Dashboard → Earnings
2. View transaction history
3. Download invoices
4. Withdraw funds

---

## 🔌 API Endpoints Reference

### Authentication Routes

```
POST   /api/auth/signup
POST   /api/auth/login       → Sets HttpOnly cookie: auth-token
POST   /api/auth/logout      → Clears auth-token
GET    /api/me               → Returns { user, role } from auth-token
```

### Bookings

```
POST   /api/bookings/create                    → Create new booking
GET    /api/bookings/seeker/[id]               → List bookings (needer)
GET    /api/bookings/provider/[id]             → List bookings (provider)
GET    /api/bookings/[id]/status               → Get booking status
PUT    /api/bookings/[id]/status               → Update booking status
```

### Profiles

```
GET    /api/ServiceNeeder/[id]/profile         → Get needer profile (owner)
PUT    /api/ServiceNeeder/[id]/profile         → Update needer profile (owner)
GET    /api/ServiceProviders/[id]/profile      → Get provider profile (owner)
PUT    /api/ServiceProviders/[id]/profile      → Update provider profile (owner)
GET    /api/ServiceProviders/[id]/public       → Public provider profile
```

### Messages & Conversations

```
GET    /api/messages                           → List conversations
GET    /api/messages/[roomId]                  → Get conversation messages
POST   /api/messages                           → Send message
GET    /api/conversations/provider/[providerId] → Provider conversations
```

### Services

```
GET    /api/services                           → List all services
GET    /api/services/[category]                → Get service by category
POST   /api/services/aiServices                → AI service recommendations
```

**Headers for protected routes:**
```
Authorization: Bearer <jwt_token>
Cookie: auth-token=<jwt_token>
```

---

## 🔑 Key Routes (Pages)

### Public Routes
| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/about` | About page |
| `/blog` | Blog articles |
| `/services` | Service categories |
| `/services/[category]` | Providers in category |
| `/services/[category]/[id]` | Provider detail |
| `/auth/login` | Login page |
| `/auth/signup` | Sign up page |

### Service Needer Routes (Protected)
| Route | Purpose |
|-------|---------|
| `/serviceNeeder/[id]/profile` | View/edit profile |
| `/serviceNeeder/[id]/booking` | Create new booking |
| `/serviceNeeder/[id]/bookings` | View all bookings |
| `/serviceNeeder/[id]/bookings/[bookingId]` | Booking details |

### Service Provider Routes (Protected)
| Route | Purpose |
|-------|---------|
| `/serviceProvider/[id]/profile` | View/edit profile |
| `/serviceProvider/[id]/request` | View service requests |
| `/serviceProvider/[id]/messages` | Messaging dashboard |
| `/serviceProvider/[id]/earning` | Earnings & analytics |
| `/serviceProvider/[id]/review` | Reviews & ratings |
| `/serviceProvider/[id]/dashboard` | Provider dashboard |

---

## 🏗️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: "needer" | "provider",
  firstName: String,
  lastName: String,
  avatar: String (URL),
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    coordinates: { type: "Point", coordinates: [lat, lng] }
  },
  // Provider-specific
  serviceCategory: String,
  hourlyRate: Number,
  bio: String,
  rating: Number,
  reviewCount: Number,
  availability: [{ day: String, start: String, end: String }],
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  _id: ObjectId,
  seekerId: ObjectId (ref: User),
  providerId: ObjectId (ref: User),
  serviceCategory: String,
  date: Date,
  duration: Number,
  description: String,
  status: "pending" | "accepted" | "completed" | "cancelled",
  totalAmount: Number,
  paymentStatus: "pending" | "paid",
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model
```javascript
{
  _id: ObjectId,
  roomId: String,
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  content: String,
  attachments: [String],
  read: Boolean,
  createdAt: Date
}
```

---

## 🚢 Building for Production

### Build & Test Locally

```bash
# Lint code
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```

### Environment Variables for Production

```ini
MONGO_URI=mongodb+srv://user:pass@prod-cluster.mongodb.net/localFix
JWT_SECRET=generate_a_strong_random_key_min_32_chars
OPENCAGE_API_KEY=production_api_key
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_WS_URL=wss://socket.yourdomain.com
NEXT_PUBLIC_AI_URL=https://api.yourdomain.com/ai
NODE_ENV=production
```

### Deployment Options

**Option 1: Vercel (Frontend)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Option 2: Self-hosted (VPS)**
```bash
# Build locally
npm run build

# Upload to server
scp -r .next public package.json package-lock.json user@server:/app

# On server
cd /app
npm ci --production
npm start
```

**Note:** Socket.io server must be deployed separately on a different port/subdomain.

---

## 🔮 Future Improvements & Roadmap

### 🤖 AI-Powered Booking Agent (Priority)

One of the most exciting upcoming features is an **intelligent booking agent** that will revolutionize how users interact with LocalFix:

#### Capabilities:
- **Natural Language Understanding**: Users can describe their service needs in plain English instead of navigating menus
  ```
  User: "I need a plumber to fix a leaky faucet tomorrow afternoon"
  Agent: Automatically searches nearby plumbers, checks availability, and suggests slots
  ```

- **Smart Provider Matching**: AI analyzes service requirements, provider ratings, reviews, and availability to recommend the best match
  - Consider service complexity and provider expertise
  - Factor in distance, pricing, and user preferences
  - Rank suggestions by relevance score

- **Automated Booking Flow**: Complete bookings with minimal user input
  - Confirm time slots
  - Handle special requests
  - Process payment
  - Send confirmations to both parties

- **Real-Time Availability Check**: Instantly verify provider availability without manual calendar review
  - Check provider schedules via API
  - Avoid double-bookings
  - Suggest alternative time slots if preferred time is unavailable

- **Conversational Refinement**: If initial suggestions don't match perfectly, agent asks clarifying questions
  ```
  Agent: "I found 3 plumbers. Would you prefer someone rated 4.8+ or the closest one?"
  ```

#### Implementation Stack:
- **LLM**: Groq API (or OpenAI GPT-4) for natural language understanding
- **RAG**: Vector DB (ChromaDB) with provider profiles and service data
- **Backend**: FastAPI + Socket.io for real-time agent responses
- **Frontend**: Chat interface component with booking suggestions card UI

#### Development Phases:
1. **Phase 1 (v1.0)**: Basic intent recognition + provider search
2. **Phase 2 (v1.1)**: Availability checking + calendar integration
3. **Phase 3 (v1.2)**: Multi-turn conversations + booking confirmation
4. **Phase 4 (v1.3)**: Payment processing + post-booking follow-ups

---

### Other Planned Features

#### Short-term (Next 2-3 months)
- 📱 **Mobile App**: React Native version for iOS & Android
- 💳 **Payment Gateway**: Stripe integration for secure payments
- ⭐ **Enhanced Reviews**: Photo reviews, verified purchase badges
- 📧 **Email Notifications**: Order status, reminders, follow-ups
- 🗺️ **Interactive Maps**: Integrate Google Maps for provider location

#### Medium-term (3-6 months)
- 💬 **In-app Communication**: Rich media support (images, videos, files)
- 📊 **Analytics Dashboard**: Insights for providers on earnings, trends
- 🔔 **Push Notifications**: Real-time alerts for bookings and messages
- 🎯 **Subscription Plans**: Monthly packages for frequent service users
- 🏆 **Loyalty Program**: Points system and rewards

#### Long-term (6-12 months)
- 🌍 **Multi-city Support**: Expand beyond current regions
- 🔐 **Blockchain Payments**: Decentralized payment options
- 🤝 **Provider Network**: B2B features for agencies and teams
- 📈 **Insurance Integration**: Service guarantees and protection plans
- 🌐 **Multi-language Support**: i18n for international expansion

---

### Performance Optimizations (In Progress)
- [ ] Service worker for offline functionality
- [ ] Image optimization and lazy loading
- [ ] Database indexing for faster queries
- [ ] GraphQL implementation to reduce data fetching
- [ ] Server-side caching strategies

### Security Enhancements (Planned)
- [ ] Two-factor authentication (2FA)
- [ ] Advanced fraud detection
- [ ] SSL certificate pinning
- [ ] Rate limiting and DDoS protection
- [ ] PCI-DSS compliance for payments

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check connection string
# Ensure MongoDB is running: mongod (local) or check Atlas status

# Test connection
mongo "mongodb+srv://user:pass@cluster.mongodb.net/db" --eval "db.adminCommand('ping')"
```

### Socket.io Connection Fails
```bash
# Ensure server.js is running
# Check firewall allows port 4000
# Verify NEXT_PUBLIC_WS_URL in .env.local

# Test WebSocket
# In browser console: new WebSocket('ws://localhost:4000')
```

### JWT Token Expired
```bash
# Clear cookies manually
# Or logout and login again

# Check JWT_SECRET matches between auth and verification
```

### Redis Connection Issues
```bash
# Verify Redis running
redis-cli ping  # Should return PONG

# Check Redis port (default 6379)
redis-cli -p 6379
```

### AI Service Not Responding
```bash
# Ensure FastAPI server running
# Check Python dependencies: pip list

# Verify Groq API key in .env
# Check port 8000 is accessible
```

---

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Socket.io Docs](https://socket.io/docs/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Groq API Docs](https://console.groq.com/docs)

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

**Code Style:**
- Use ESLint: `npm run lint`
- Follow Next.js best practices
- Add comments for complex logic
- Update README for new features

---

## 📝 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Niteshwar Kumar** (CodeCrusader31)

- GitHub: [@CodeCrusader31](https://github.com/CodeCrusader31)
- Email: contact@example.com

---

## 🙏 Acknowledgments

- Next.js and Vercel teams for amazing framework
- MongoDB for database solutions
- Socket.io for real-time capabilities
- Groq for LLM API access
- All contributors and users

---

## 📞 Support

Need help? Reach out:
- 📧 Email: support@localfix.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/localfix/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/localfix/discussions)

---

<div align="center">

**[⬆ back to top](#-localfix--service-finder--realtime-communication-platform)**

Made with ❤️ by the LocalFix team

</div>

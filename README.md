# 🛠️ LocalFix — Service Finder & Real-Time Communication Platform

![LocalFix Banner](./screenshots/banner.png)

LocalFix is a full-stack platform that connects **service needers** with **service providers** (plumbers, electricians, carpenters, AC technicians, etc.) within a **0–5 km radius**.  
It includes **real-time chat**, **AI-powered assistance using Ollama 3**, **JWT authentication**, and a scalable backend built using **Next.js App Router**, **Node.js WebSocket server**, **Flask AI service**, and **MongoDB**.

---

## 📌 Badges

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-3C873A?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404040?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=for-the-badge&logo=websocket)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-0ea5e9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask)
![Ollama](https://img.shields.io/badge/Ollama-AI-000000?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![OpenCage](https://img.shields.io/badge/OpenCage%20API-48A1AF?style=for-the-badge&logo=opencagedata&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)



---

# 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
  - [Start Next.js Frontend](#1%E2%83%A3-start-nextjs-frontend)
  - [Start WebSocket Server](#2%E2%83%A3-start-websocket-server)
  - [Start Flask AI Chatbot](#3%E2%83%A3-start-flask-ai-chatbot)
  - [Start Ollama](#4%E2%83%A3-start-ollama)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

# 🔍 Overview

LocalFix helps users find **verified local service providers** within a 0–5 km range.  
It includes:

- Real-time messaging  
- Location-based provider search  
- AI chatbot to answer queries  
- Secure login & JWT authentication  
- MongoDB database  
- Full-stack user & provider workflows  

---

# ✨ Features

### 🔐 Authentication
- JWT-based secure login & registration  
- Role-based logic (user / provider)

### 📍 Location-Based Service Search
- Get providers within **5 km radius**  
- Search by categories: plumber, electrician, AC repair, etc.  

### 💬 Real-Time Messaging
- WebSocket server on port **4000**  
- Instant messaging between user ↔ provider  

### 🤖 AI Chatbot (Ollama 3)
- Works offline using locally installed LLM  
- Flask backend handles:
  - General repair queries (tap fix, AC issue, etc.)
  - Database-aware responses  
  - Webpage-aware responses  

### 🎨 Beautiful UI
- Next.js with TailwindCSS  
- Clean dashboard & service listing UI  

---

# 🧩 Tech Stack

### **Frontend**
- Next.js 14 (App Router)
- TailwindCSS

### **Backend**
- Next.js App Router API routes  
- Node.js WebSocket Server (Express)  
- MongoDB + Mongoose  
- JWT Authentication  

### **AI & LLM**
- Ollama 3  
- Flask (Python)  
- Vector search & knowledge-based responses  

---

# 📁 Project Structure

localFix/
│
├── app/ # Next.js frontend & API routes
├── components/ # UI components
├── lib/ # JWT, DB, middleware
│
├── websocket-server/ # WebSocket backend (Node + Express)
│ └── server.js
│
├── AIchatbot/ # Flask AI chatbot backend
│ ├── app.py
│ ├── vectorstore/
│ ├── services/
│ └── requirements.txt
│
├── public/
├── screenshots/ # Your screenshots will go here
└── README.md

yaml
Copy code

---

# ⚙ Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/CodeCrusader31/localFix.git
cd localFix
🔧 Install Dependencies
Install Next.js packages:
bash
Copy code
npm install
Install WebSocket server dependencies:
bash
Copy code
cd websocket-server
npm install
cd ..
Install Flask AI dependencies:
bash
Copy code
cd AIchatbot
pip install -r requirements.txt
cd ..
🔑 Environment Variables
Create a .env.local file in the root folder:

ini
Copy code
MONGODB_URI=your_mongo_url
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_WS_URL=ws://localhost:4000
AI_SERVER_URL=http://localhost:5000/chat
🚀 Running the Project
1️⃣ Start Next.js Frontend
bash
Copy code
npm run dev
Runs on:

arduino
Copy code
http://localhost:3000
2️⃣ Start WebSocket Server
bash
Copy code
cd websocket-server
node server.js
WebSocket on:

arduino
Copy code
ws://localhost:4000
3️⃣ Start Flask AI Chatbot
bash
Copy code
cd AIchatbot
python app.py
AI Server on:

arduino
Copy code
http://localhost:5000
4️⃣ Start Ollama
Install Ollama:
https://ollama.com/download

Pull llama3 model:
bash
Copy code
ollama pull llama3
Run Ollama:

🚀 Future Enhancements
Admin dashboard

Provider verification system

Payment integration

Booking calendar

Push notifications

🤝 Contributing
Feel free to open issues or pull requests.
Contributions are always welcome!

📝 License
This project is licensed under the MIT License.

🙌 Author
Niteshwar Kumar (CodeCrusader31)
Full-Stack Developer • AI Developer • Builder of real-world systems

yaml
Copy code

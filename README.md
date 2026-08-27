# NovaStack - Fullstack React + Node/Express Landing Page

Modern, production-grade landing page built with **React (Vite)** frontend and **Express (Node.js)** backend following clean MVC architecture.

---

## 🏗️ Architecture & Structure

```
landing-page/
├── server/                       # Backend (Express API)
│   ├── src/
│   │   ├── controllers/          # Business logic handlers
│   │   │   └── apiController.js
│   │   ├── middleware/           # Validation & Security middleware
│   │   │   └── validators.js
│   │   ├── models/               # Mock data models / DB Schemas
│   │   │   └── mockData.js
│   │   ├── routes/               # Express API Routes
│   │   │   └── apiRoutes.js
│   │   └── server.js             # Express entry point (:5000)
│   ├── .env
│   └── package.json
│
├── client/                       # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/           # Modular UI Components (Hero, Navbar, Features, Pricing, etc.)
│   │   ├── services/             # API Service layer (Fetch wrapper)
│   │   ├── styles/               # Design tokens, glassmorphism & responsive CSS
│   │   ├── App.jsx               # Main layout
│   │   └── main.jsx
│   └── package.json
│
└── package.json                  # Root Concurrent Runner
```

---

## 🚀 Quick Start

### 1. Install All Dependencies
From the root folder run:
```bash
npm run install-all
```

### 2. Start Client & Server Simultaneously
```bash
npm run dev
```
- **React Frontend**: `http://localhost:5173`
- **Express Backend API**: `http://localhost:5000`

---

## 📡 Available Backend API Endpoints

- `GET  /api/health` — API health check
- `GET  /api/stats` — Dynamic platform metrics
- `GET  /api/testimonials` — Dynamic customer reviews
- `POST /api/leads` — Early access / newsletter signup (with email validation)
- `POST /api/contact` — Contact us message submission (with full field validation)

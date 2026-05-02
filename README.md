# 🚀 Mitesh Savaliya — Portfolio Website

A modern, highly interactive, and visually immersive portfolio website featuring a 3D experience, specialized AI & Web services, and deep-dive project case studies.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react)
![Tech Stack](https://img.shields.io/badge/Three.js-3D-black?logo=threedotjs)
![Tech Stack](https://img.shields.io/badge/FastAPI-Backend-green?logo=fastapi)
![Tech Stack](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)
![Tech Stack](https://img.shields.io/badge/Framer_Motion-Animations-f01f7a?logo=framer)

## ✨ Features

- **3D Interactive Hero** — Particle field and floating geometries powered by React Three Fiber.
- **Specialized Services** — Dedicated section for AI & Machine Learning, Full Stack Development, and Cloud Solutions.
- **Deep-Dive Case Studies** — Modular project detail pages with technical architecture, business impact, and results.
- **Immersive Gallery** — Full-screen screenshot lightbox with keyboard navigation and custom cursor integration.
- **Smooth Animations** — Scroll-triggered reveals and page transitions via Framer Motion.
- **Custom Cursor** — Intelligent glowing cursor that reacts to interactive elements.
- **Glassmorphism UI** — Premium frosted glass aesthetics with neon cyan and purple accents.
- **FastAPI Backend** — Lightweight backend for handling contact form submissions and logging.
- **Responsive & Optimized** — Mobile-first design with lazy-loaded components for performance.

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Vite | Modern Build Tool |
| React Three Fiber | 3D Rendering (Three.js) |
| Framer Motion | Advanced Animations |
| Vanilla CSS | Design System & Custom Properties |

### Backend
| Technology | Purpose |
|-----------|---------|
| FastAPI | High-performance Python API |
| Uvicorn | ASGI Server |
| Pydantic | Type Safety & Validation |

## 📁 Folder Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero/            — 3D hero experience
│   │   │   ├── About/           — Experience timeline
│   │   │   ├── Services/        — AI & Web service offerings
│   │   │   ├── Skills/          — Interactive skill grid
│   │   │   ├── Projects/        — Project showcase cards
│   │   │   ├── ProjectDetail/   — Modular case study components
│   │   │   ├── Contact/         — Premium contact form
│   │   │   ├── Navbar/          — Dynamic navigation
│   │   │   └── CustomCursor/    — Reactive cursor logic
│   │   ├── data/
│   │   │   └── projects.json    — Single source of truth for projects
│   │   ├── hooks/               — Custom React hooks
│   │   ├── App.jsx              — Router & section layout
│   │   └── main.jsx             — Entry point
│   └── public/                  — Project assets & screenshots
│
├── backend/
│   ├── app/
│   │   ├── main.py              — FastAPI app & middleware
│   │   ├── routes/contact.py    — Contact form endpoint
│   │   ├── services/contact.py  — Message logging logic
│   │   └── core/config.py       — App configuration
│   └── contact_messages.log     — Received messages storage
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173`.

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`.

## 📝 How to Update Projects

All project content is managed through a single JSON file: `frontend/src/data/projects.json`.

To add a new project:
1. Update the JSON file with the project details.
2. Add screenshots to `frontend/public/projects/[slug]/`.
3. The portfolio will automatically generate the list card and the deep-dive detail page.

## 📩 Contact Form
Messages sent via the contact form are saved directly to `backend/contact_messages.log` on the server. Each entry includes:
- Timestamp
- Name & Email
- Message content

## 📄 License
MIT License — feel free to use this as a template for your own portfolio!

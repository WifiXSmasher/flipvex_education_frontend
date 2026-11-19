# Flipvex Education Portal — Frontend

The modern React frontend application for the **Flipvex Education Portal**, built with Vite, React 19, Tailwind CSS, and React Router v7.

---

## 📌 Architecture & Backend Developer Guide

This repository contains the client-side interface consuming the **Django REST Framework (DRF)** backend API.

### 🔗 Backend Endpoint Integration Summary

Base URL: `http://localhost:8000/api/v1`

| Feature | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Login** | `POST` | `/auth/login/` | Returns `{ access, refresh, user: { email, role } }` |
| **Register** | `POST` | `/auth/register/` | Registers student & triggers 6-digit verification OTP |
| **Verify OTP** | `POST` | `/auth/verify-otp/` | Verifies registration OTP (`{ email, otp }`) |
| **Resend OTP** | `POST` | `/auth/resend-otp/` | Resends registration OTP |
| **Forgot Password** | `POST` | `/auth/forgot-password/` | Sends password reset OTP (`{ email }`) |
| **Reset Password** | `POST` | `/auth/reset-password/` | Resets password (`{ email, otp, new_password }`) |
| **Token Refresh** | `POST` | `/auth/token/refresh/` | Silent token renewal interceptor (`{ refresh }`) |
| **Current User** | `GET` | `/auth/me/` | Retrieves authenticated user profile (`Bearer <access>`) |
| **Logout** | `POST` | `/auth/logout/` | Blacklists refresh token (`{ refresh }`) |
| **Categories** | `GET/POST` | `/course-categories/` | Course category listing and admin management |
| **Courses** | `GET/POST` | `/courses/` | Course listing, filters, and admin management |
| **User Management** | `GET/PATCH` | `/users/` | Admin user listing and role management |

---

## 🛠️ Tech Stack

- **Runtime & Build**: [Vite](https://vitejs.dev/) + React 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [lucide-react](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/) (configured with auto JWT interceptor & refresh token rotation)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm / yarn
- Running backend service (`flipvex_education_backend`)

### 2. Environment Setup
Copy the example environment file and configure your API URL:
```bash
cp .env.example .env
```

Ensure `.env` points to your backend instance:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_USE_MOCK_API=false
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### 5. Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Directory Structure

```
frontend/
├── public/                 # Static assets & favicons
├── src/
│   ├── api/                # Axios instance & backend API clients (auth, courses)
│   ├── auth/               # AuthContext, TokenStorage, Protected/Guest Routes, Roles
│   ├── components/         # Shared UI components & form widgets
│   ├── config/             # Site metadata & branding config
│   ├── hooks/              # Custom React hooks (useSignup, useLogin, useCourses, etc.)
│   ├── layouts/            # Layout wrappers (Navbar, Footer, PublicLayout)
│   ├── pages/
│   │   ├── admin/          # Admin portal pages (AdminDashboard)
│   │   ├── auth/           # Authentication pages (Login, Signup, Forgot/Reset Password)
│   │   └── public/         # Public marketing & course catalog pages (Home, Courses)
│   ├── routes/             # App router configuration & route guards
│   ├── utils/              # Client-side validation helpers
│   ├── App.jsx
│   └── main.jsx
├── .env.example            # Template for environment configuration
├── .gitignore              # Cleaned gitignore (ignoring dist, node_modules, .env)
├── package.json
└── vite.config.js
```

---

## 🔒 CORS Configuration Note for Backend Developers

Ensure your Django `settings.py` allows the frontend dev server:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

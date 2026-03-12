# FieldOps – Construction Field Management App

A responsive React.js web application for construction field management. Built as part of a Frontend Developer Intern selection task.

## 🚀 Tech Stack

| Tool | Version |
|------|---------|
| React | 18.2.0 |
| React Router DOM | 6.22.0 |
| Vite | 5.1.0 |
| CSS Modules | (built-in) |
| Axios | 1.6.7 (available, mock data used) |

No external UI library. Styling done entirely with CSS Modules.

---

## 📦 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Clone & Run

```bash
# 1. Clone the repository
[git clone https://github.com/VAIBHAV1516N/FieldOps-Construction-Management-System.git]
cd fieldops

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Demo Credentials

| Field | Value |
|-------|-------|
| Email | `test@test.com` |
| Password | `123456` |

---

## ✅ Features Implemented

### Login Screen
- Email + password fields with full validation
- Mock authentication (test@test.com / 123456)
- Show/hide password toggle
- Clear error message on failed login
- Redirect to Project List on success
- Loading state on submit

### Project List Screen
- 5 hard-coded projects displayed as cards
- Shows: Project Name, Status badge (colour-coded), Start Date, Location, Team size, Progress bar
- **Bonus:** Search by project name or location
- **Bonus:** Filter by status (All / Active / On Hold / Completed)
- Click any card to open the DPR Form pre-selected for that project

### DPR Form Screen
- Pre-selects the project clicked from Project List
- Date picker (capped to today, no future dates)
- Weather dropdown (Sunny / Partly Cloudy / Cloudy / Rainy / Stormy)
- Work Description textarea with live character counter (min 20 chars)
- Worker Count number input (1–500)
- Photo upload: select up to 3 images, preview thumbnails, remove individual photos, shows file size
- Full client-side validation on all required fields
- Success toast notification on submit → auto-navigates back to Project List

### General
- React Router v6 with protected routes (unauthenticated users redirected to /login)
- AuthContext via useContext (no prop drilling)
- CSS Modules for scoped, maintainable styles
- Responsive layout: mobile-first (375px base), tablet (768px), desktop (1280px+)
- No horizontal scroll at any screen width
- Keyboard accessible (Enter to submit login, focus-visible styles)

---

## ⚠️ Known Issues / Limitations

- Authentication is mock-only (no real backend/JWT)
- DPR submissions are not persisted — data is lost on page refresh
- Photo uploads are object URLs only; files are not sent to a server
- No dark/light mode toggle (dark mode only)

---

## 📁 Project Structure

```
src/
├── pages/
│   ├── LoginPage.jsx + .module.css
│   ├── ProjectListPage.jsx + .module.css
│   └── DPRFormPage.jsx + .module.css
├── components/
│   ├── Navbar.jsx + .module.css
│   ├── Toast.jsx + .module.css
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── constants/
│   └── projects.js
├── utils/
│   └── validation.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width |
|-----------|-------|
| Mobile | 375px (base) |
| Tablet | ≥ 768px |
| Desktop | ≥ 1280px |

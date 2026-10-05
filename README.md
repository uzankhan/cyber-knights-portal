<div align="center">

# 🛡️ Cyber Knights Portal

### Elite Cybersecurity Education Platform — Learn. Practice. Defend.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://cyber-knights-portal.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-uzankhan-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/uzankhan/cyber-knights-portal)
[![License: MIT](https://img.shields.io/badge/License-MIT-D4AF37?style=for-the-badge)](LICENSE)
[![Made with](https://img.shields.io/badge/Made_with-HTML_%7C_CSS_%7C_JS-B23A48?style=for-the-badge)]()

A full-featured, beautifully designed cybersecurity learning portal featuring an interactive **63-chapter handbook**, role-based access control for **Students, Teachers, and Administrators**, and a stunning **3D animated background** rendered with Three.js.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Default Roles & Permissions](#-default-roles--permissions)
- [Curriculum Structure](#-curriculum-structure)
- [Deployment](#-deployment)
- [Development Guide](#-development-guide)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Cyber Knights Portal** is a comprehensive, production-ready educational platform built for cybersecurity training academies. It combines a modern luxury UI/UX with a structured curriculum — from networking fundamentals to advanced ethical hacking — all in one cohesive, engaging experience.

Built with **vanilla JavaScript** (no framework bloat), powered by **Supabase** for authentication and data, and rendered with **Three.js** for the immersive 3D experience. Deployed on **Netlify** for global CDN delivery.

### Why Cyber Knights?

- **Zero framework overhead** — Pure HTML/CSS/JS, loads in milliseconds
- **Luxury design** — Burgundy, cream, and gold color palette with rich animations
- **Real curriculum** — 63 chapters covering everything from OSI model to zero-day exploitation
- **Production security** — Role-based access, session management, audit logging
- **Admin control** — Full CRUD over users, curriculum, assignments, quizzes, and exams

---

## ✨ Key Features

### 📚 Interactive Learning Library

- **63 chapters** across **8 structured modules** (Front Matter → Capstone)
- Beautiful **3D animated book** on the landing hero with real page-flip mechanics
- **Reading progress tracking** with per-chapter completion state
- Rich content rendering: figures, tables, code blocks, CIA cards, step flows, career paths
- **Bookmark system** for quick return to important chapters
- Fully responsive reader with collapsible sidebar outline
- **Live search** across all chapter titles and content

### 👥 Role-Based Access Control

| Role | Access Level |
|------|--------------|
| 🎓 **Student** | Dashboard, assignments, quizzes, exams, results, progress tracking, book reader |
| 👨‍🏫 **Teacher** | Everything students see + create/manage assignments, quizzes, exams, view student records |
| 🔐 **Admin** | Full system control: user management, active sessions, security logs, book manager |

### 🛠️ Administrator Panel

- **User Management** — Create, edit, delete users; assign roles; reset passwords
- **Active Session Monitoring** — Real-time session tracking with IP, duration, and force-logout
- **Authentication Logs** — Security events with filtering and JSON export
- **Identity Security Test Matrix** — Compliance tracking
- **Book Manager** — Full CRUD on modules, chapters, and content directly from the UI

### 🔐 Security Features

- Session-based authentication with lockout after failed attempts
- **Two-factor authentication** capability
- Comprehensive audit logging
- Session timeout and revocation
- IP tracking per session
- Password hashing with Argon2id + salt + pepper
- HTTPS everywhere with secure cookie flags
- XSS/CSRF protection

### 🎨 Design System

- **Burgundy · Cream · Gold** luxury color palette
- **3D animated WebGL background** with particle fields, wireframe shield, data streams, and perspective grid
- Custom cursor with trail effect
- Smooth page transitions and micro-animations
- Fully responsive (desktop / tablet / mobile)
- Respects `prefers-reduced-motion` for accessibility
- Dark mode optimized

---

## 📸 Screenshots

> Screenshots coming soon. To add your own, place them in `docs/screenshots/` folder.

| Login Screen | Dashboard | Book Reader |
|:---:|:---:|:---:|
| ![Login](docs/screenshots/login.png) | ![Dashboard](docs/screenshots/dashboard.png) | ![Book](docs/screenshots/book.png) |

| Admin Panel | Book Manager | Learning Library |
|:---:|:---:|:---:|
| ![Admin](docs/screenshots/admin.png) | ![Book Manager](docs/screenshots/book-manager.png) | ![Library](docs/screenshots/library.png) |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Markup** | HTML5 | Semantic, accessible structure |
| **Styling** | CSS3 (Custom Design System) | Luxury burgundy-gold theme |
| **Logic** | Vanilla JavaScript (ES6+) | Zero-dependency core |
| **3D Background** | Three.js r155 + GLSL Shaders | WebGL particle field & wireframe shield |
| **Backend / Auth** | Supabase | Authentication, database, real-time |
| **Animation** | GSAP + CSS keyframes | Smooth transitions |
| **Fonts** | Fraunces, Manrope, JetBrains Mono | Luxury typography |
| **Deployment** | Netlify | Global CDN + CI/CD |

### Why These Choices?

- **No framework** — React/Vue adds 40KB+ to every page. Vanilla JS keeps it lean.
- **Supabase over Firebase** — SQL-based, open-source, self-hostable if needed.
- **Three.js over plain CSS** — Real WebGL animations for that premium feel.
- **Netlify over Vercel** — Better free tier for static hosting + form handling.

---

## 📁 Project Structure

```
cyber-knights-portal/
├── index.html                    # Main application entry point
├── netlify.toml                  # Netlify deployment config
├── .gitignore                    # Git exclusions
├── README.md                     # This file
│
├── css/
│   └── style.css                # Complete design system (2000+ lines)
│
├── js/
│   ├── supabase-client.js       # Supabase initialization
│   ├── auth.js                  # Authentication helpers
│   ├── books.js                 # Full curriculum data (63 chapters)
│   ├── book-admin.js            # Admin book editor logic
│   ├── data-sync.js             # Central data synchronization
│   ├── user-management.js       # User CRUD operations
│   ├── app.js                   # Main application controller
│   └── scene.js                 # (Deprecated — replaced by inline Three.js)
│
├── img/
│   ├── logo.png                 # Portal logo
│   ├── cia-triad-deep.png       # Chapter 2.1 illustration
│   ├── symmetric-asymmetric.png # Chapter 2.2 illustration
│   ├── hashing-salting.png      # Chapter 2.3 illustration
│   ├── 2fa-iam-zero-trust.png   # Chapter 2.4 illustration
│   ├── pki-signatures.png       # Chapter 2.5 illustration
│   ├── virus-worm-trojan.png    # Chapter 3.1 illustration
│   ├── ransomware-spyware-adware.png
│   ├── rootkit-keylogger-botnet.png
│   ├── session-hijacking.png
│   ├── malware-analysis-lab.png
│   ├── sql-injection.png
│   ├── xss.png
│   ├── ddos.png
│   ├── mitm-arp-dns.png
│   ├── port-scanning-nmap.png
│   ├── iot-cctv-security.png
│   ├── dark-web.png
│   ├── phishing.png
│   ├── social-engineering.png
│   ├── brute-force.png
│   ├── threat-detection-hunting.png
│   ├── securing-systems-data.png
│   ├── monitoring-soc-siem.png
│   ├── incident-response.png
│   ├── nmap.png
│   ├── wireshark.png
│   ├── security-tools.png
│   ├── home-lab.png
│   └── career-paths.png
│
└── docs/
    └── screenshots/             # README screenshots (add your own)
```

---

## 🚀 Getting Started

### Prerequisites

- A modern browser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- A local web server (Python, Node, or VS Code Live Server)
- A Supabase account (free tier works great)

### 1. Clone the Repository

```bash
git clone https://github.com/uzankhan/cyber-knights-portal.git
cd cyber-knights-portal
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Copy your **Project URL** and **anon public key** from Settings → API
4. Create the required tables (see [Environment Configuration](#-environment-configuration))

### 3. Configure Environment

Create **`js/supabase-client.js`** with your credentials:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.supabaseClient = supabaseClient;
```

### 4. Run Locally

**Option A — Python:**
```bash
python -m http.server 8000
```

**Option B — Node.js:**
```bash
npx serve .
```

**Option C — VS Code Live Server:**
Right-click `index.html` → **Open with Live Server**

Open `http://localhost:8000` in your browser.

### 5. First Login

Default credentials are set in `js/auth.js`. **Change them immediately** after first login.

---

## 🔧 Environment Configuration

### Required Supabase Tables

```sql
-- Users table (mirrors auth.users with metadata)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  email TEXT,
  mobile TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'admin')) DEFAULT 'student',
  course TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- Sessions table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  ip_address TEXT,
  mode TEXT,
  login_time TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- Auth logs
CREATE TABLE auth_logs (
  id BIGSERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  username TEXT,
  role TEXT,
  action TEXT,
  factor TEXT,
  ip_address TEXT,
  result TEXT,
  details TEXT
);

-- Assignments
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  total_marks INTEGER DEFAULT 10,
  deadline TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  assigned_to UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quizzes
CREATE TABLE quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER DEFAULT 15,
  questions JSONB,
  created_by UUID REFERENCES users(id),
  assigned_to UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exams
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT,
  total_marks INTEGER DEFAULT 100,
  exam_date DATE,
  duration INTEGER DEFAULT 60,
  created_by UUID REFERENCES users(id),
  assigned_to UUID[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

Enable RLS on all tables and add policies:

```sql
-- Example: Users can read their own record
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Admins can do everything
CREATE POLICY "Admins full access" ON users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
```

---

## 👤 Default Roles & Permissions

### Student

- ✅ View dashboard, book, assignments, quizzes, exams, results, progress
- ✅ Submit assignments
- ✅ Attempt quizzes
- ❌ Cannot create or manage content

### Teacher

- ✅ Everything a student can do
- ✅ Create and manage assignments, quizzes, exams
- ✅ View student records
- ✅ View authentication logs
- ❌ Cannot manage other users

### Administrator

- ✅ Everything teachers can do
- ✅ Create, edit, delete users
- ✅ Manage active sessions
- ✅ Manage curriculum via Book Manager
- ✅ Full system control

---

## 📚 Curriculum Structure

| Module | Title | Chapters |
|--------|-------|----------|
| **FM** | Front Matter (Preface, Ethics, Safety) | 3 |
| **00** | Orientation & Foundations | 3 |
| **01** | Networking Deep Foundations | 14 |
| **02** | Security & Cryptography | 5 |
| **03** | Malware & Threat Types | 5 |
| **04** | Attack Techniques (Safe Lab Only) | 10 |
| **05** | Defense, Detection & Response | 4 |
| **06** | Tools of the Trade | 3 |
| **07** | Capstone Projects & Career | 2 |
| **Total** | | **49 chapters** |

See `js/books.js` for complete content.

---

## 🌐 Deployment

### Netlify Deployment (Recommended)

This project is deployed on **Netlify** with automatic CI/CD from GitHub.

**Steps:**

1. Go to [netlify.com](https://netlify.com) and sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub and select the **`cyber-knights-portal`** repository
4. Configure:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.` (root)
5. Click **Deploy site**

Every push to `main` triggers an automatic redeploy. 🎉

### Alternative: Vercel

```bash
npm i -g vercel
vercel --prod
```

### Alternative: GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **root**
4. Save → Site live at `https://uzankhan.github.io/cyber-knights-portal/`

---

## 🛠️ Development Guide

### Adding a New Chapter

1. Open `js/books.js`
2. Find the appropriate module section
3. Add a new chapter object:

```javascript
{
  id: "1.15",
  title: "Your Chapter Title",
  pages: "197-210",
  read: 15,
  build: "Short action description",
  content: `
    <section class="content-block">
      <h3 class="content-h">1. Introduction</h3>
      <p>Your content here...</p>
    </section>
  `
}
```

4. Save → Refresh browser → Chapter appears automatically

### Adding a New Image

1. Place image in `img/` folder
2. Reference in chapter content:

```html
<figure class="content-figure">
  <img src="./img/your-image.png" alt="Description" />
  <figcaption>Figure X.Y — Caption here.</figcaption>
</figure>
```

### Modifying the Design System

All design tokens live in `css/style.css` under the `:root` selector:

```css
:root {
  --primary: #D4AF37;          /* Rich gold */
  --bg-deep: #1A0810;          /* Deep burgundy */
  --text-hi: #FAF3E3;          /* Cream white */
  /* ... */
}
```

Change these values to rebrand the entire portal instantly.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style

- 2-space indentation
- ES6+ syntax
- Semantic HTML
- Comment complex logic
- Test in Chrome + Firefox before submitting

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use

Just include the original copyright notice.

---

## 👤 Author

**Uzan Khan**

- 🐙 GitHub: [@uzankhan](https://github.com/uzankhan)
- 📧 Email: *(your email)*
- 🌐 Portfolio: *(your website)*
- 💼 LinkedIn: *(your LinkedIn)*

**Project Link:** [https://github.com/uzankhan/cyber-knights-portal](https://github.com/uzankhan/cyber-knights-portal)

---

## 🙏 Acknowledgments

- **[Three.js](https://threejs.org/)** — Amazing 3D rendering engine
- **[Supabase](https://supabase.com/)** — Open-source Firebase alternative
- **[Netlify](https://netlify.com/)** — Blazing fast static hosting
- **[Google Fonts](https://fonts.google.com/)** — Fraunces, Manrope, JetBrains Mono
- **[Claude](https://claude.ai/)** — AI assistance for content creation
- The **cybersecurity community** for inspiration and open-source tooling

---

## ⚠️ Disclaimer

This portal is built **for educational purposes only**. The attack techniques documented in Module 04 are intended for **isolated lab environments only**.

**Never** use these techniques on systems you do not own or lack written permission to test. Doing so is a criminal offense under PECA 2016 (Pakistan) and similar laws worldwide.

The authors and contributors of this project are **not responsible** for any misuse.

---

<div align="center">

### ⭐ If this project helped you, please give it a star!

**Stay safe. Stay ethical. Keep hacking — the right way.** 🛡️

Made with ❤️ by [Uzan Khan](https://github.com/uzankhan)

</div>
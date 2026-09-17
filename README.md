<div align="center">

# 🎨 ImageGallery — Modern Visual Discovery & Media Hub

[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.4-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://image-gallery-zeta-amber.vercel.app)

**A high-performance, responsive visual library for curated high-resolution photography and vector graphics.**

[🌐 **Live Demo**](https://image-gallery-zeta-amber.vercel.app) • [🐞 **Report Bug**](https://github.com/Khalid-Sifullah-Siam/image-gallery/issues) • [✨ **Request Feature**](https://github.com/Khalid-Sifullah-Siam/image-gallery/issues)

</div>

---

## 🌟 Highlights & Features

- **🔍 Smart Search & Categorization**
  - Instant client-side search across titles and categories.
  - Quick filter buttons for **Photos** and **Vectors** with dynamic count badges.
  - Active filter tags with single-click reset capability.

- **⚡ Fast Direct Image Downloads**
  - Built-in Next.js server-side API proxy (`/api/download`) to bypass third-party CORS limitations.
  - Clean filename preservation and immediate forced browser downloads.

- **📤 Community Upload System**
  - Drag-and-drop local file uploader with automatic image conversion (data URL).
  - External image URL support with real-time preview before submission.
  - Client-side persistence using `localStorage` so user uploads stay available on refresh.

- **🖼️ Interactive Lightbox Modal**
  - Fullscreen image preview with high-res rendering.
  - View likes, shares, download counts, and category tags.
  - Dedicated download, bookmark, and delete actions directly from the modal.

- **🌗 Dark / Light Mode Support**
  - Seamless theme toggle powered by React Context.
  - Respects OS system color scheme by default with persistent user preference storage.
  - Zero-flash theme hydration on initial page load.

- **📱 Fully Responsive & Fluid Animations**
  - Smooth physics-based micro-interactions and transitions with **Framer Motion**.
  - Tailored grid adapting seamlessly across mobile, tablet (`sm` / `md`), and wide desktop (`lg`).
  - Edge-to-edge interactive social bar and symmetric, responsive footer columns.

- **📄 Dynamic Pagination**
  - Optimized 6 items per page layout for fast rendering and clean browsing.
  - Intuitive pagination controls with previous/next buttons and active page indicators.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router + Turbopack)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome, Feather) |
| **Type Safety** | [TypeScript](https://www.typescriptlang.org/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
image-gallery/
├── src/
│   ├── app/
│   │   ├── about/            # About Us page
│   │   ├── contact/          # Contact & Feedback page
│   │   ├── api/
│   │   │   └── download/     # Serverless proxy route for reliable image downloads
│   │   ├── globals.css       # Tailwind CSS v4 directives & custom utilities
│   │   ├── layout.tsx        # Root HTML layout with ThemeProvider integration
│   │   └── page.tsx          # Main gallery homepage
│   ├── Components/
│   │   ├── Footer/           # Responsive footer with Navigation, Resources & Newsletter
│   │   ├── HeroSection/      # Hero header, search input, category filters & upload button
│   │   ├── Navbar/           # Main navigation bar with theme switch & mobile drawer
│   │   ├── PhotoCard.tsx/    # Interactive image card with quick actions & hover effects
│   │   ├── PhotoModal/       # High-resolution lightbox dialog
│   │   ├── PhotosSection/    # Grid layout, active filter bar, delete handling & pagination
│   │   └── ThemeToggle/      # Dark/Light theme toggler
│   ├── context/
│   │   └── ThemeContext.tsx  # Global dark/light theme context & localStorage sync
│   ├── lib/
│   │   └── db.tsx            # Curated image & vector initial dataset
│   └── types/
│       └── index.d.ts        # TypeScript interfaces for image items
├── public/                   # Static assets & icons
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

- **Node.js**: `v20.x` or higher recommended
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Khalid-Sifullah-Siam/image-gallery.git
   cd image-gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View in browser:**
   Open [http://localhost:3000](http://localhost:3000) to explore the application.

---

## 📜 Available Scripts

- `npm run dev` — Starts the Next.js development server with Turbopack.
- `npm run build` — Compiles and builds the application for production.
- `npm run start` — Runs the compiled production server.
- `npm run lint` — Runs ESLint to check for code quality and syntax issues.

---

## 🌐 API Reference

### Proxy Download Endpoint

```http
GET /api/download?url={IMAGE_URL}&filename={OPTIONAL_FILENAME}
```

- **Query Parameters**:
  - `url` *(required)*: The absolute URL of the external image.
  - `filename` *(optional)*: The target filename for the downloaded file (defaults to `gallery-image.jpg`).
- **Response**:
  - Binary image stream with `Content-Disposition: attachment` header to force clean browser file downloads.

---

## 👨‍💻 Author

**Khalid Sifullah Siam**
- GitHub: [@Khalid-Sifullah-Siam](https://github.com/Khalid-Sifullah-Siam)
- Portfolio / Live App: [image-gallery-zeta-amber.vercel.app](https://image-gallery-zeta-amber.vercel.app)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

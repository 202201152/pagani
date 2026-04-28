# Pagani Utopia — Interactive Showcase Website

**Live Demo:** [https://pagani-3kaj.vercel.app/](https://pagani-3kaj.vercel.app/)

An immersive, performance-focused showcase website for the Pagani Utopia hypercar. Built with React, TypeScript, and Vite — featuring cinematic scroll animations, a real-time engine simulation dashboard, and a full technical specification sheet.

---

## ✨ Features

### 🎬 Sections
| Section | Description |
|---|---|
| **Hero** | Full-screen cinematic hero with the Pagani Utopia |
| **Manifesto** | Scroll-reveal animated text with blur & rotation effects |
| **Gallery** | Auto-playing highlight carousel with SVG icon controls |
| **Performance Dashboard** | Real-time V12 engine simulation — speed, RPM, gear meters animated at 60fps over 15s |
| **Specification Sheet** | Full two-column technical spec sheet (Pagani Utopia data) in IBM Plex Mono |
| **Partners** | Smooth infinite logo loop of technical partners (AMG, Brembo, Bosch, Pirelli, etc.) |
| **Outro** | Large typographic footer |

### ⚡ Performance
- **Route-level code splitting** — each route is a separate JS chunk via `React.lazy()`
- **Section-level lazy mounting** — every below-the-fold section uses `IntersectionObserver` to defer mount until scrolled near
- **60fps DOM animations** — engine dashboard bypasses React renders entirely, writing directly to DOM nodes via `requestAnimationFrame`
- **Image lazy loading** — all non-hero images use `loading="lazy"` and `decoding="async"`

### 🎨 Design
- Pitch-black `#000000` background throughout
- Gold (`#D4AF37`) accent colour system
- IBM Plex Mono for technical/spec typography
- Glassmorphism dashboard UI with `backdrop-blur`
- Smooth GSAP scroll triggers and reveal animations

---

## 🗂️ Project Structure

```
src/
├── App.tsx                          # Router + route-level lazy loading
├── pages/
│   └── HomePage.tsx                 # Page assembly with LazySection wrappers
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx               # Scroll-aware navbar with scramble effect
│   │   ├── LazySection.tsx          # IntersectionObserver lazy mount wrapper
│   │   └── LogoLoop.jsx / .css      # Infinite logo marquee (React Bits)
│   └── sections/
│       ├── design/
│       │   ├── DesignHero.tsx       # Hero section
│       │   └── UtopiaTextSection.tsx# Scroll-reveal manifesto
│       ├── performance/
│       │   └── GallerySection.tsx   # Auto-playing carousel
│       ├── specs/
│       │   ├── SpecSheet.tsx        # Technical specification sheet
│       │   └── SpecSheet.css
│       ├── partners/
│       │   └── PartnersSection.tsx  # Logo loop strip
│       └── interior/
│           └── Outro.tsx            # Footer section
└── sections/
    └── PerformanceCluster/
        └── dashboard/
            ├── Dashboard.jsx        # Engine dashboard layout
            ├── Meter.jsx            # Animated gauge meter
            ├── useEngineSimulation.js # 15s V12 physics simulation
            └── useEngineAudio.js    # Synced engine audio
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🏎️ Engine Simulation

The Performance section features a physics-inspired V12 engine simulation:

- Runs for exactly **15 seconds** then stops cleanly — all meters reset to zero
- **Speed model**: exponential approach curve calibrated to 0–100 km/h in ~2.9s, top speed 355 km/h
- **RPM model**: tracks gear position with clutch-drop dips on gear changes (~180ms shift events)
- **7-speed gearbox**: auto-shifts at gear range boundaries
- Entire animation runs in a `requestAnimationFrame` loop writing directly to DOM — **zero React re-renders** during animation

---

## 🔧 Technical Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| GSAP + ScrollTrigger | Scroll animations |
| Tailwind CSS | Utility styling |
| IBM Plex Mono | Spec sheet typography |
| IntersectionObserver | Lazy section mounting |
| React.lazy + Suspense | Code splitting |

---


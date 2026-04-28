# Testing Log — Pagani Utopia

> Last updated: 2026-04-28

---

## ✅ Audit Summary

All critical bugs found during review have been fixed. The project is clean and functional.

---

## 🐛 Bugs Found & Fixed

### 1. RPM Meter Infinite Loop After Animation Ends
**Severity:** High  
**File:** `src/sections/PerformanceCluster/dashboard/useEngineSimulation.js`  
**Symptom:** After the 15-second engine animation completed, the RPM meter kept oscillating between ~8,100–8,500 rpm in an endless shimmer loop. Speed and gear meters were frozen at max values.  
**Root Cause:** `holdAfterTop: true` in `configRef` caused the tick loop to call `requestAnimationFrame(tick)` indefinitely after `runTime >= runDuration`, applying a `Math.sin()` shimmer to RPM.  
**Fix:** When `runTime >= runDuration` the tick now cancels the rAF, zeros all three meters (speed → `0`, rpm → `0`, gear → `–`), and calls `setIsRunning(false)`. No more infinite loop.

---

### 2. Duplicate React Key Warning in SpecSheet
**Severity:** Low (console warning, no visual bug)  
**File:** `src/components/sections/specs/SpecSheet.tsx`  
**Symptom:** React `key` prop set to `row.label` which could produce duplicates (e.g. `"0 – 100 km/h"` appears in both Acceleration and Performance groups).  
**Fix:** Changed to index-based `key={i}` within each group — unique per list, no collision.

---

### 3. Unused Variable Linter Warning
**Severity:** Low (lint warning only)  
**File:** `src/sections/PerformanceCluster/dashboard/useEngineSimulation.js`  
**Symptom:** `holdAfterTop` was still destructured from `configRef.current` after the shimmer loop was removed.  
**Fix:** Removed `holdAfterTop` from the destructure.

---

## ✅ Components Verified

| Component | Status | Notes |
|---|---|---|
| `App.tsx` | ✅ Clean | Route-level lazy loading correct, Suspense placed correctly |
| `HomePage.tsx` | ✅ Clean | All sections wrapped in `LazySection` + `Suspense`, Hero eager |
| `LazySection.tsx` | ✅ Clean | IntersectionObserver setup and cleanup correct |
| `useEngineSimulation.js` | ✅ Fixed | RPM loop bug resolved, unused var removed |
| `Dashboard.jsx` | ✅ Clean | Header removed, meter bindings correct |
| `Meter.jsx` | ✅ Clean | Spacing updated, lineHeight set |
| `GallerySection.tsx` | ✅ Clean | SVG icons correct, HIGHLIGHTS label removed |
| `SpecSheet.tsx` | ✅ Fixed | Key collision fixed |
| `SpecSheet.css` | ✅ Clean | Correct padding, bold text, thick dividers |
| `PartnersSection.tsx` | ✅ Clean | Logo paths correct, LogoLoop props valid |
| `LogoLoop.jsx` | ✅ Clean | Full React Bits component, rAF cleanup correct |
| `Navbar.tsx` | ✅ Clean | CONFIGURE button removed, links work |
| `Outro.tsx` | ✅ Clean | Logo removed, bg set to pitch black |
| `index.css` | ✅ Clean | `--bg: #000000` in both light and dark mode |

---

## 🔍 Manual Test Checklist

### Navigation
- [ ] Logo click scrolls to top
- [ ] DESIGN nav link scrolls to design section
- [ ] PERFORMANCE nav link scrolls to performance section
- [ ] Navbar hides on fast scroll-down, reappears on scroll-up

### Hero
- [ ] Hero image loads correctly
- [ ] No layout shift on load

### Performance Dashboard
- [ ] Clicking play starts the engine animation
- [ ] Speed climbs from 0 → ~355 km/h over ~15 seconds
- [ ] RPM oscillates with gear shifts
- [ ] Gear increments 1 → 7 through the run
- [ ] At exactly 15s: speed → 0, rpm → 0, gear → –
- [ ] No oscillation/loop after animation ends
- [ ] Audio syncs with animation

### Gallery Carousel
- [ ] Auto-plays through all slides
- [ ] Play/Pause SVG icon toggles correctly
- [ ] Replay icon appears after last slide
- [ ] Progress bar indicators advance with slides

### Specification Sheet
- [ ] Two-column layout renders correctly
- [ ] All 8 groups visible (4 left, 4 right)
- [ ] SPECIFICATIONS heading visible
- [ ] SPECIFICATION SHEET footer label visible
- [ ] No React key warnings in console

### Partners Strip
- [ ] All 7 logos visible and scrolling
- [ ] Logos pause/slow on hover
- [ ] Fade edges visible on left and right
- [ ] Scale-on-hover works

### Lazy Loading
- [ ] Network tab shows sections loading as you scroll (deferred chunks)
- [ ] No FOUC (flash of unstyled content)
- [ ] Placeholder min-heights prevent layout jump

### Outro
- [ ] Background is pitch black
- [ ] PAGANI text renders correctly
- [ ] No logo visible (removed)

---

## 🚫 Known Non-Issues

- `Suspense fallback={null}` — intentional, avoids flash of loading spinner. Sections have `minHeight` placeholders instead.
- `LogoLoop.jsx` is `.jsx` not `.tsx` — intentional, copied from React Bits source as-is.

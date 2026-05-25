# VITE — COMPLETE NOTES (FROM START TO END)

---

## 🧠 1. Core Idea

- Vite avoids bundling during development
- Uses browser’s native ES Modules (import/export)
- Focus: fast development + optimized production

---

## 🚀 2. Dev Server (npm run dev)

- Starts instantly (no waiting)
- No full app bundling
- Serves files on demand

---

## 📂 3. How Files Load in Dev

- Browser requests main file (e.g., main.js)
- Browser sees import statements
- Loads each file separately

Example flow:
main.js → App.js → Button.js

---

## ⚡ 4. Dependency Handling (node_modules)

- Browser cannot directly use packages like "react"
- Vite pre-bundles dependencies using esbuild
- Done once and cached → improves speed

---

## 🔄 5. Hot Module Replacement (HMR)

- When you edit a file:
  - Only that file updates
  - No full page reload

- Very fast feedback loop

---

## 🧪 6. Code Transformation

- Uses esbuild (very fast)
- Converts:
  - Modern JavaScript → browser-compatible JS
  - JSX → JavaScript

---

## 📦 7. Production Build (npm run build)

- Bundling happens only in production
- Uses Rollup for bundling

---

## 🏗️ 8. Build Output

- Generates files in /dist folder
- Includes:
  - Minified JavaScript
  - Optimized assets
  - Split chunks

---

## ⚡ 9. Code Splitting

- Automatically splits code into smaller chunks
- Lazy-loaded parts are loaded only when needed

---

## 🧹 10. Tree Shaking

- Removes unused code from final bundle
- Reduces bundle size

---

## 🔁 11. Full Lifecycle

DEV:
Code → Vite → serves files directly → Browser loads modules

BUILD:
Code → Vite → Rollup bundles → Optimized files → Browser

---

## 🧠 FINAL MEMORY

- Dev → No bundling (fast)
- Build → Bundling (optimized)
- esbuild → Speed
- Rollup → Production bundling

---

## 🔥 ONE LINE SUMMARY

Vite serves files instantly during development and bundles efficiently for production.

---

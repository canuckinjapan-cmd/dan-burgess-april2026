# Coding Agent Instructions (AGENTS.md)

This document provides technical guidelines and implementation patterns for AI agents working on this codebase.

## 🏗️ 3-Layer Architecture
This project follows a 3-layer architecture to maximize reliability and consistency:
1.  **Directive (Layer 1)**: SOPs and instructions (like this file and `DESIGN.md`).
2.  **Orchestration (Layer 2)**: The AI Agent's decision-making and routing.
3.  **Execution (Layer 3)**: Deterministic scripts (if applicable) for data processing or API calls.

## 🚦 Session Start Protocol
When starting a task, follow this protocol before modifying code:
1.  Read the relevant directive (this file and `DESIGN.md`).
2.  Clarify scope with the user before creating or modifying any files.
3.  Check if structural or UI text changes need to be applied to both `index.html` (EN) and `index-j.html` (JP).

## 🖱️ Interactive Patterns

### Custom Hero Cursor
- **Implementation**: The cursor and trail are managed in `styles.css` (`.hero-cursor-trail`) and `script.js` (mousemove listener).
- **Font**: Always use `Zen Maru Gothic`.
- **Constraint**: The cursor must be disabled on screens $\leq$ 1024px. Ensure both CSS `display: none !important;` and JS event filtering are active to prevent artifacts.

### Stacking Cards (Scroll Logic)
- **Class**: `.service-card`
- **Logic**: Cards slide from `-100%` width and scale/opacity transition based on scroll position. 
- **Sticky Behavior**: Cards are `position: sticky` with a `top: 120px` offset. Do not modify these values without recalculating the scroll threshold in the JS/CSS.

### Ripple Animation
- **Trigger**: Subtitle and CTA text.
- **Structure**: Each letter must be wrapped in a `<span class="ripple-letter">` with incremental `animation-delay` (e.g., `0.1s`, `0.2s`, etc.).
- **Pause cycle**: The ripple should be fast, followed by a ~1.6s pause.

## 🎨 Asset & Brand Management
- **Image Referrer**: Always use `referrerPolicy="no-referrer"` for all `<img>` tags.
- **External Assets**: Prefer absolute URLs for hosted assets (e.g., `https://danburgess.com/2026-assets/`).
- **Color Discipline**: Never substitute brand colors. Use exact hex codes (e.g., `#f27d26`). For "background" text effects, use CSS opacity (e.g., `0.4`), do not change the base hex code.
- **Gapless Marquees**: Ensure absolute ZERO whitespace between span tags in marquee HTML. Use `display: inline-flex` and `align-items: center`.

## 🛠️ Build & Environment
- **Port**: The application MUST run on **Port 3000**.
- **HMR**: HMR is often disabled. When making large layout changes, recommend a full browser refresh.
- **Linting**: Run `npm run lint` before committing major changes.

## ⚠️ Anti-Patterns to Avoid
- Don't improvise what a script or component should do; refer to directives.
- Don't skip testing after fixing a script or CSS rule.
- Don't mix CSS `@keyframes` with heavy JS libraries for identical background effects.
- Don't forget to sync changes across `index.html` and `index-j.html`.

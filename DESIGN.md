# Design System Specification (DESIGN.md)

## 🎯 Brand Identity
"Bridging Western minimalism and Japanese trust-based design."
The aesthetic is clean, authoritative, and tactile. It uses bold grids and massive typography reminiscent of Swiss Modernism, softened by organic textures (rice paper) and friendly Japanese letterforms.

## 🎨 Color Tokens
| Token | Hex/Value | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#eff0f2` | Core background color. |
| `--color-text` | `#111111` | Primary typography and lines. |
| `--color-orange` | `#f27d26` | CTA highlights and bullet points. |
| `--color-white` | `#ffffff` | High-contrast backgrounds (footer, process section). |
| `--color-border` | `#646464` | Primary border color for cards. |
| **Texture** | `rice-paper-2.png` | Global overlay at 5-10% opacity for tactile depth. |

## Typography
| Role | Family | Weights | Details |
| :--- | :--- | :--- | :--- |
| **Display** | `Archivo` | 900 | High-impact headers, section titles. Use negative letter-spacing (e.g., `-0.07em`) for a modern, tight feel. |
| **Body** | `Source Sans 3` | 400, 600 | General reading and interface text. Use `clamp()` for fluid responsive scaling. |
| **Serif** | `Archivo`| 400 | Artistic subtitles and highlight quotes. |
| **Custom/JA** | `Zen Maru Gothic` | 500 | Favicon and Japanese branding. |
| **Standard JA** | `Noto Sans JP` | 400, 500 | General Japanese body text. |

## 📐 Spacing & Rhythm
- **Base Section Padding**: `100px 40px` (Desktop).
- **Radius**: `0px` for all primary cards (Sharp corners).
- **Borders**: `1.583333px solid var(--color-border)` (precision-aligned with About Me section).
- **Transitions**: Right-aligned "Scroll Down" indicators for section breaks.
- **Glassmorphism**: `backdrop-filter: blur(10px)` with `rgba(255, 255, 255, 0.8)` for headers.

## 🎞️ Component Patterns

### 1. Service Cards (Stacking)
- **Visuals**: Full-bleed image on one side, rice-paper textured content on the other.
- **Motion**: Sticky on scroll. They should appear to "climb" over each other.
- **Typography**: Bullet points increased to `25px` for readability.

### 2. Portfolio Items
- **Motion**: Scroll-linked items that slide into view, pause, and then slide out.
- **Image Behavior**: Dual-image layout where the second image slides in from the right *during* the pause phase (triggered at ~10% into the pause duration).
- **Hierarchy**: Staggered opacity and Y-translation to create depth during section transitions.

### 3. Marquee (Footer)
- **Scale**: `clamp(36px, 10vw, 70px)`.
- **Velocity**: `40s` linear cycle for a slow, steady drift.
- **HTML Rule**: Ensure absolute ZERO whitespace between span tags in HTML to avoid gaps. Use `display: inline-flex` for layout.

## 🏗️ Motion & Physics
- **Entrance**: Blur-reveal (`filter: blur(10px) -> 0`) for titles.
- **Ripple**: Vertical movement of `-8px` with a staggered `0.1s` delay.


## 📱 Responsive Strategy
- **Breakpoints**: 
  - Desktop: 1025px+
  - Tablet/Mobile: $\leq$ 1024px.
- **Adaptation**: Hover-heavy animations are disabled on touch-enabled breakpoints to preserve performance and standard UX.

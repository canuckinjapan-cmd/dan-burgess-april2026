# Design System Specification (DESIGN.md)

## 🎯 Brand Identity
"Bridging Western minimalism and Japanese trust-based design."
The aesthetic is clean, authoritative, and tactile. It uses bold grids and massive typography reminiscent of Swiss Modernism, softened by organic textures (rice paper) and friendly Japanese letterforms.

## 🎨 Color Tokens
| Token | Hex/Value | Usage |
| :--- | :--- | :--- |
| `--color-bg` | `#eff0f2` | Core background color. |
| `--color-text` | `#111111` | Primary typography and lines. |
| `--color-orange` | `#f27d26` | CTA highlights, bullet points, and the custom cursor character. |
| `--color-white` | `#ffffff` | High-contrast backgrounds (footer, process section). |
| **Texture** | `rice-paper-2.png` | Global overlay at 5-10% opacity for tactile depth. |

## Typography
| Role | Family | Weights | Details |
| :--- | :--- | :--- | :--- |
| **Display** | `Archivo` | 900 | High-impact headers, section titles. Use negative letter-spacing (e.g., `-0.07em`) for a modern, tight feel. |
| **Body** | `Source Sans 3` | 400, 600 | General reading and interface text. Use `clamp()` for fluid responsive scaling. |
| **Serif** | `Playfair Display`| 400 | Artistic subtitles and highlight quotes. |
| **Custom/JA** | `Zen Maru Gothic` | 500 | Hero cursor, Favicon, and Japanese branding. |
| **Standard JA** | `Noto Sans JP` | 400, 500 | General Japanese body text. |

## 📐 Spacing & Rhythm
- **Base Section Padding**: `100px 40px` (Desktop).
- **Radius**: `20px` for large cards; `4px` for small UI elements.
- **Glassmorphism**: `backdrop-filter: blur(10px)` with `rgba(255, 255, 255, 0.8)` for headers.

## 🎞️ Component Patterns

### 1. Service Cards (Stacking)
- **Visuals**: Full-bleed image on one side, rice-paper textured content on the other.
- **Motion**: Sticky on scroll. They should appear to "climb" over each other.
- **Typography**: Bullet points increased to `25px` for readability.

### 2. Portfolio Items
- **Slideshows**: Must loop seamlessly. Images enter from LEFT and exit to RIGHT.
- **Captions**: Floating dark overlays with semi-transparent backgrounds.

### 3. Marquee (Footer)
- **Scale**: `clamp(36px, 10vw, 70px)`.
- **Velocity**: `40s` linear cycle for a slow, steady drift.
- **HTML Rule**: Ensure absolute ZERO whitespace between span tags in HTML to avoid gaps. Use `display: inline-flex` for layout.

## 🏗️ Motion & Physics
- **Entrance**: Blur-reveal (`filter: blur(10px) -> 0`) for titles.
- **Ripple**: Vertical movement of `-8px` with a staggered `0.1s` delay.
- **Cursor Trail**: Large `46px` text with `filter: blur(5px)` and `0.7` opacity to suggest light and shadow movement.

## 📱 Responsive Strategy
- **Breakpoints**: 
  - Desktop: 1025px+
  - Tablet/Mobile: $\leq$ 1024px.
- **Adaptation**: Custom cursors and hover-heavy animations are disabled on touch-enabled breakpoints to preserve performance and standard UX.

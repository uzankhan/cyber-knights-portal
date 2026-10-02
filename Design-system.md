# Cyber Knights — Design System v2.0

## 🎨 Design Direction: "Cyber-Sleek Minimalism"

A dark, premium, high-tech aesthetic inspired by:
- Linear.app (precision)
- Vercel (minimalism)
- Palantir (data density)
- Cyberpunk 2077 UI (vibe)

## 🎨 Color Palette — "Obsidian & Toxic Green"

### Base (Backgrounds)
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-deep` | `#08090A` | App background |
| `--bg-base` | `#0D0E10` | Secondary background |
| `--bg-surface` | `#141518` | Cards, panels |
| `--bg-elevated` | `#1A1C20` | Hover states, modals |

### Accents
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#00FF41` | Primary action, success |
| `--primary-glow` | `#5FFFAA` | Hover, highlights |
| `--primary-dim` | `#008F2A` | Pressed states |
| `--cyan` | `#00E5FF` | Secondary accent, links |
| `--amber` | `#FFB000` | Warnings, pending |
| `--red` | `#FF3B3B` | Errors, delete |
| `--purple` | `#B44DFF` | Special highlights |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-hi` | `#F5F5F5` | Headings, primary |
| `--text-md` | `#A8AEB8` | Body text |
| `--text-lo` | `#6B7280` | Muted, meta |

### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--border-subtle` | `rgba(0, 255, 65, 0.08)` | Card borders |
| `--border-medium` | `rgba(0, 255, 65, 0.2)` | Focus, active |
| `--border-strong` | `rgba(0, 255, 65, 0.4)` | Emphasis |

## ✍️ Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display (H1) | Fraunces | 500 | 2.5–4rem |
| Heading (H2-H3) | Fraunces | 500 | 1.5–2rem |
| Body | Manrope | 400–600 | 13–15px |
| Mono (Code, IDs) | JetBrains Mono | 400–600 | 10–13px |

## 🎬 Motion Language

- **Enter:** 400ms `cubic-bezier(0.16, 1, 0.3, 1)` — Fade + slide-up
- **Hover:** 200ms `ease-out` — Lift + glow
- **Press:** 100ms `ease-out` — Scale 0.98
- **Exit:** 250ms `ease-in` — Fade + scale-down
- **Ambient:** Continuous 3-20s loops for background elements

## 🧩 Components

### Cards
- Background: `--bg-surface`
- Border: 1px `--border-subtle`
- Radius: 12px
- Hover: lift -4px, border → primary, glow shadow
- Padding: 28px

### Buttons
- **Primary:** Toxic green gradient, black text
- **Secondary:** Transparent, primary border
- **Ghost:** No border, subtle hover bg
- Radius: 8px
- Padding: 12px 22px

### Inputs
- Background: `--bg-base`
- Border: 1px subtle
- Focus: primary border + glow ring

### Tables
- Alt row bg for readability
- Hover: primary tint row
- Status badges: pill-shaped, colored

## 🎯 UX Guidelines

1. **Always show feedback** — loading, success, error
2. **Never rely on color alone** — icons + text + color
3. **Consistent spacing** — 4px grid system
4. **Motion with purpose** — animate to guide attention, not to decorate
5. **Empty states matter** — every list has a meaningful empty state
6. **Accessibility first** — keyboard nav, ARIA labels, focus rings
7. **Performance** — animations use GPU (`transform`, `opacity`)
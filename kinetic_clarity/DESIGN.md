---
name: Kinetic Clarity
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#003ca3'
  on-tertiary: '#ffffff'
  tertiary-container: '#0051d6'
  on-tertiary-container: '#c9d4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '800'
    lineHeight: 52px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
  numeric-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
  numeric-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '800'
    lineHeight: 44px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system establishes a high-performance, precision-engineered aesthetic tailored for health, fitness, and metabolic awareness. The visual character balances athletic intensity with clean clinical precision. 

The emotional tone targets focus, invigoration, clarity, and control—avoiding the clinical coldness of medical software while steering clear of chaotic gamification. By pairing immaculate white canvases with deep electric cobalt and crisp cyan accents, the UI acts as a high-contrast analytical cockpit for nutrition, daily caloric burn, and performance metrics. 

The design style is **Modern Corporate / Athletic Tech**: crisp structural division, refined micro-borders, airy layouts, and high-readability typographic hierarchies.

## Colors

The palette leverages a crisp, pure white foundation with tiered cool-slate neutrals to ground dense metric layouts. 

- **Primary (`#1D4ED8`)**: Used for key interactive triggers, primary calls-to-action, core active states, and dominant metric rings.
- **Tertiary (`#2563EB`)**: A vibrant cobalt bridge used for secondary highlights, active icon fills, and gradient ramps alongside the primary.
- **Secondary (`#06B6D4`)**: Electric cyan serves as an energetic accent for macro-nutrient badges, goal completions, hydration tracking, and subtle glow accents.
- **Neutral (`#0F172A`)**: Deep slate ensures surgical contrast for numeric readouts and headings, supported by `#1E293B` for subheadings and `#64748B` for secondary labels.
- **Surfaces & Borders**: Pure base canvas (`#FFFFFF`), surface tiers (`#F8FAFC`, `#F1F5F9`), and razor-sharp separation lines (`#E2E8F0`).

## Typography

The typography relies on **Plus Jakarta Sans** across all levels to deliver a modern, performance-driven aesthetic that merges geometric clarity with friendly humanist curves. 

- **Numeric Display**: Calorie numbers, target rings, and macro readouts utilize `numeric-hero` and bold weights with tabular figures (`tnum`) enabled to prevent layout jump during animated updates.
- **Hierarchy Rules**: Primary numeric values take precedence over their metric units (e.g., "2,450" is `headline-lg` in `#0F172A`, while "kcal" is `label-sm` in `#64748B`).
- **Letter Spacing**: Display and large headlines carry a slight negative tracking (`-0.02em`) for an athletic, punchy lockup. Uppercase labels feature positive tracking (`+0.05em`) for maximum scan-speed in dense nutrition grids.

## Layout & Spacing

The layout is built on a responsive 4-column fluid mobile grid scaling to an 8-column layout on compact tablets.

- **Mobile Viewports (< 600px)**: The baseline canvas margin is `1rem` (16px) with an internal component gutter of `0.75rem` (12px). This preserves valuable horizontal real estate for tracking graphs and meal logs while avoiding edge clutter.
- **Component Padding Scale**: 
  - Standard card interior: `space-lg` (16px).
  - Dense log item: `space-md` (12px) horizontal, `space-sm` (8px) vertical.
  - Section gaps: `space-xl` (24px) to allow natural pauses between nutrition modules.
- **Rhythm**: Strict 4px/8px modular vertical scale. All macro gauges and entry bars adhere strictly to height multiples of 8px (32px, 40px, 48px, 56px) for effortless visual rhythm.

## Elevation & Depth

This system avoids heavy drop shadows, maintaining an airy, modern, and hygienic feel. Depth is established through **tonal layering** and **subtle ambient shadows**:

- **Layer 0 (Canvas)**: `#FFFFFF`.
- **Layer 1 (Cards & Modules)**: `#F8FAFC` or `#FFFFFF` sitting on crisp 1px borders of `#E2E8F0`.
- **Layer 2 (Floating Modals & Tooltips)**: `#FFFFFF` paired with an ultra-soft blue-tinted shadow: `0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(29, 78, 216, 0.04)`.
- **Active Metric Highlights**: Key rings and progress tracks use micro-glows tinted to the indicator color (e.g., `0 0 12px rgba(6, 182, 212, 0.25)`) to signal current activity and completed goals without visual noise.

## Shapes

The design uses a rounded geometry (`roundedness: 2`) that conveys contemporary athletic precision:

- **Base Cards & Modules**: `rounded-lg` (1rem / 16px) creates a balanced, contained module for meal logs, charts, and daily streaks.
- **Controls & Small Components**: Inputs, action buttons, and individual food rows utilize `0.75rem` (12px) to maintain a compact, ergonomic touch area.
- **Data Pills & Badges**: Fully rounded/pill radii (`9999px`) are reserved specifically for status indicators, macro breakdown tags (Carbs, Protein, Fats), and quick-add nutrient filters.

## Components

### Buttons
- **Primary Action**: Solid `#1D4ED8` background, `#FFFFFF` text, `0.75rem` radius, 48px standard touch height. Active states shift to `#1E40AF`.
- **Secondary Action**: `#F1F5F9` background, `#0F172A` text, 1px border in `#E2E8F0`. Hover/press moves to `#E2E8F0`.
- **Icon Buttons**: Circular or `0.75rem` rounded containers (40x40px minimum) with centered 20px icons in `#1D4ED8` or `#1E293B`.

### Cards & Modules
- Structured on `#FFFFFF` or `#F8FAFC` with a consistent `1px solid #E2E8F0` border.
- Interior padding set to `1rem` (16px).
- Internal content separation uses hairline dividers (`1px solid #F1F5F9`) or spatial grouping with `space-sm`.

### Macro Chips & Status Badges
- Encapsulated pills (`9999px` radius) with 6px vertical and 12px horizontal padding.
- Protein: Subdued cyan tint (`rgba(6, 182, 212, 0.12)`) with `#0891B2` label.
- Carbs: Subdued cobalt tint (`rgba(29, 78, 216, 0.10)`) with `#1D4ED8` label.
- Fats: Subdued slate tint (`rgba(100, 116, 139, 0.12)`) with `#475569` label.

### Form Inputs & Search Fields
- 48px height, `0.75rem` radius, background in `#FFFFFF` with `1px solid #E2E8F0`.
- Focus state activates a distinct `1.5px solid #1D4ED8` ring with a 3px soft outer ring (`rgba(29, 78, 216, 0.12)`).
- Search fields for food logging integrate inline scan/barcode icons in `#2563EB`.

### Metric Rings & Progress Bars
- Background track: `#E2E8F0` with rounded cap ends.
- Active fill: Solid `#1D4ED8` or linear gradient transitioning from `#1D4ED8` to `#06B6D4`.
- Track height for linear bars: 8px default, 12px for hero metrics.

### Lists & Meal Logs
- Minimalist stacked rows with zero drop shadow, relying on `1px solid #F1F5F9` bottom borders.
- Left-aligned food icon/thumbnail, primary bold food name in `#0F172A`, serving size in `#64748B`, and right-aligned caloric value in bold `#0F172A`.
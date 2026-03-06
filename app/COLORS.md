# Color System

This project uses a **strict brand color system** to ensure consistent theming and proper dark mode support.

## Important Rules

1. **ONLY use brand colors** defined in `src/app/globals.css`
2. **NEVER use Tailwind's default colors** (gray-*, white, black, etc.) directly
3. All colors automatically switch between light and dark mode via `data-theme` attribute

## Available Brand Colors

### Light Mode (default)
- `brand-0`: #FFFFFF (white)
- `brand-1`: #000000 (black)
- `brand-25`: #fefeff (Background)
- `brand-50`: #FFFFFF (NavBar and boxes)
- `brand-100`: #E1EBF5 (aktuelle Auswahl Menüs)
- `brand-200`: #E6E6E6 (Shadow color)
- `brand-300`: #fba762 (orange)
- `brand-400`: #8BAECF (blue background)
- `brand-500`: #fde9d3 (orange background)
- `brand-550`: #f3f4f6 (gray on hover)
- `brand-600`: #5483A3 (blue: icons)
- `brand-700`: #426A86 (blue text - Links, Icons)
- `brand-800`: #d1d5db (gray for button border)
- `brand-850`: #335269 (blue text)
- `brand-900`: #273E4F (blue button, headings, checks)
- `brand-950`: #3f3f46 (Text Zinc)

### Dark Mode (Klasse `.dark` auf `<html>`)
Wenn `<html>` die Klasse `dark` hat, gelten die Dark-Varianten (siehe `src/app/theme-dark.css`):
- `brand-0`: #1b1b1b
- `brand-1`: #eae9e9
- `brand-25`: #131415
- `brand-50`: #101010
- etc.

### Group Colors
- `group-park-club-500`: Purple
- `group-marin-quarter-500`: Green
- `group-rochefort-500`: Pink

## Usage in Tailwind

```tsx
// ✅ CORRECT - Use brand colors
<div className="bg-brand-25 text-brand-900">
  <button className="bg-brand-900 text-brand-0 hover:bg-brand-850">
    Click me
  </button>
</div>

// ❌ WRONG - Never use default Tailwind colors
<div className="bg-white dark:bg-black text-gray-900 dark:text-white">
  <button className="bg-gray-900 hover:bg-gray-800">
    Click me
  </button>
</div>
```

## Dark Mode Toggle

Dark Mode wird über die Klasse `dark` auf `<html>` gesteuert:

```typescript
// Dark Mode an
document.documentElement.classList.add("dark");

// Dark Mode aus
document.documentElement.classList.remove("dark");
```

Implementierung: `src/components/DarkModeToggle.tsx`.  
Farbwerte für Dark: `src/app/theme-dark.css`.

## Common Patterns

### Backgrounds
- Main background: `bg-brand-25`
- Card/box background: `bg-brand-50`
- Section background: `bg-brand-100`

### Text
- Headings: `text-brand-900`
- Body text / Links: `text-brand-700`
- Muted text: `text-brand-950`

### Buttons
- Primary: `bg-brand-900 text-brand-0 hover:bg-brand-850`
- Secondary: `bg-brand-0 text-brand-900 border-2 border-brand-900 hover:bg-brand-550`

### Borders
- Default: `border-brand-200`
- Hover: `border-brand-800`

### Icons
- Default: `text-brand-700`
- In colored backgrounds: `text-brand-0`

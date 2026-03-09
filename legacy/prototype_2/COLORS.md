# Color System Documentation

This project uses a **strict brand color system** to ensure consistent theming and proper dark mode support.

## Important Rules

1. **ONLY use brand colors** defined in `src/app/globals.css`
2. **NEVER use Tailwind's default colors** (gray-*, white, black, etc.) directly
3. All colors automatically switch between light and dark mode via `html.dark` class

---

## Color Usage Guide

### 🎨 **Backgrounds**

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `brand-25` | `#fefeff` (very subtle off-white) | `#131415` (very dark gray) | **Main page background** |
| `brand-50` | `#ffffff` (pure white) | `#101010` (dark gray) | **Cards, modals, navigation bars** |
| `brand-100` | `#e1ebf5` (subtle blue-tint) | `#2a2a2a` (medium gray) | **Hover states, active menu items** |
| `brand-550` | `#f3f4f6` (very light gray) | `#202020` (subtle dark) | **Button hover backgrounds** |

### 📝 **Text Colors**

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `brand-900` | `#273e4f` (dark blue-gray) | `#e69451` (ORANGE) | **Headings - ORANGE in dark mode!** |
| `brand-901` | `#273e4f` (dark blue-gray) | `#fba762` (orange) | **MOOD icon color** |
| `brand-902` | `#fba762` (ORANGE) | `#5483a3` (blue) | **"/" slash icon - ORANGE in light!** |
| `brand-700` | `#426a86` (medium blue) | `#e69451` (ORANGE) | **Links - ORANGE in dark mode!** |
| `brand-950` | `#3f3f46` (very dark gray) | `#d8d8dc` (light gray) | **Muted text, descriptions** |
| `brand-600` | `#5483a3` (blue) | `#3d5c7a` (muted blue) | **Icon colors** |

### 🔘 **Interactive Elements**

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `brand-300` | `#fba762` (orange) | `#3d5c7a` (muted blue) | **PRIMARY ACCENT - orange in light, muted blue in dark** |
| `brand-400` | `#8baecf` (light blue) | `#3d5c7a` (muted blue) | **Secondary accent colors** |
| `brand-800` | `#d1d5db` (light gray) | `#353535` (medium gray) | **Button borders, dividers** |
| `brand-850` | `#335269` (dark blue) | `#c4c4c8` (light gray) | **Button hover states** |

### 🖼️ **Borders & Dividers**

| Color | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `brand-200` | `#e6e6e6` (light gray) | `#0e0e0e` (very dark) | **Default borders, card outlines** |
| `brand-800` | `#d1d5db` (light gray) | `#353535` (medium gray) | **Hover borders, stronger dividers** |

---

## 🎯 **Specific Component Usage**

### Navigation
```tsx
// Navigation bar
<nav className="bg-brand-50/90 border-b border-brand-200">
  <Link className="text-brand-900">Logo</Link>
  <Link className="text-brand-600 hover:text-brand-900">Links</Link>
</nav>
```

### Buttons
```tsx
// Primary button
<button className="bg-brand-900 text-brand-0 hover:bg-brand-850">
  Primary Action
</button>

// Secondary button  
<button className="bg-brand-0 text-brand-900 border border-brand-800 hover:bg-brand-550">
  Secondary Action
</button>

// Accent button (blue in light, orange in dark)
<button className="bg-brand-300 text-brand-0 hover:bg-brand-400">
  Primary Action
</button>
```

### Cards & Containers
```tsx
// Standard card
<div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
  <h3 className="text-brand-900">Card Title</h3>
  <p className="text-brand-700">Card content</p>
  <span className="text-brand-950">Muted text</span>
</div>
```

### OpenOS Desktop
```tsx
// Desktop background
<div className="bg-brand-900"> {/* Dark desktop */}
  
// Menu bar
<div className="bg-brand-800/90 border-b border-brand-700/50">
  <span className="text-brand-50">OpenOS</span>
  <span className="text-brand-400">Status</span>
</div>

// App dock
<div className="bg-brand-800/80 border-t border-brand-700/50">
  {/* App icons with individual accent colors */}
</div>
```

---

## 🌈 **Group/Community Colors**

These are used for MOOD communities and group identification:

| Group | Color | Hex |
|-------|-------|-----|
| **Park Club** | `group-park-club-500` | Light: `#704c93` / Dark: `#8026d6` |
| **Marin Quarter** | `group-marin-quarter-500` | Light: `#337835` / Dark: `#239124` |
| **Rochefort** | `group-rochefort-500` | Light: `#d63f3f` / Dark: `#ec2222` |

---

## ⚡ **Quick Reference**

### Most Common Patterns
- **Page background:** `bg-brand-25`
- **Card background:** `bg-brand-50`
- **Primary text:** `text-brand-900`
- **Secondary text:** `text-brand-700`
- **Muted text:** `text-brand-950`
- **Borders:** `border-brand-200`
- **Primary accent:** `bg-brand-300 text-brand-0` (blue→orange)

### Dark Mode Toggle
Dark Mode is controlled by the `dark` class on `<html>`:
```typescript
// Enable dark mode
document.documentElement.classList.add("dark");

// Disable dark mode  
document.documentElement.classList.remove("dark");
```

---

## 🚫 **Never Use These**

❌ `text-white` `text-black` `bg-white` `bg-black`  
❌ `text-gray-*` `bg-gray-*` `border-gray-*`  
❌ `text-blue-*` `text-red-*` etc.  

✅ Always use `brand-*` colors instead!

---

## 💡 **Legacy Style Notes**

The current color system recreates the beautiful, clean aesthetic of the legacy project with **"be one cell of the brain"** philosophy:

### **Light Mode (Orange Accents):**
- **Near-white backgrounds** (`#fefeff`) for maximum readability
- **Pure white cards** (`#ffffff`) with subtle gray borders
- **ORANGE accent** (`#fba762`) for interactive elements and "/" slash
- **Dark blue-gray headings** (`#273e4f`) - professional, not pure black
- **Dark gray body text** (`#3f3f46`) - easy to read
- **Professional, clean feel** with warm orange touches

### **Dark Mode (Orange Headings & Links):**
- **Very dark backgrounds** (`#131415`) without being pure black
- **Subtle gray cards** (`#101010`) for depth
- **ORANGE headings** (`#e69451`) - warm and prominent
- **ORANGE links** (`#e69451`) - consistent with headings
- **Muted blue accents** (`#3d5c7a`) for secondary elements
- **Light gray body text** (`#d8d8dc`) - readable on dark
- **Cozy, warm feel** with orange as the dominant color

### **Key Design Principles:**
- **Orange is always prominent** - accent in light, headings/links in dark
- **High contrast text** for excellent readability
- **Subtle backgrounds** that don't compete with content
- **Consistent warmth** - orange brings energy to both modes
- **Professional typography** with near-black/near-white text
- **Clean, undistracting interface** focusing on content
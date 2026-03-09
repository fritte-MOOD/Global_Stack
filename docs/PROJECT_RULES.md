# Project Rules & Guidelines

Diese Dokumentation enthält wichtige Regeln für die Entwicklung des Global Stack Projekts.

---

## 📁 Arbeitsverzeichnisse

**WICHTIG:** Es wird NUR in folgenden Verzeichnissen gearbeitet:

- `/app` - Die aktive Next.js Anwendung
- `/docs` - Projektdokumentation

**NIEMALS ändern:**
- `/legacy/prototype_1` - Original MOOD Referenz-Design
- `/legacy/prototype_2` - Vorherige App-Version (archiviert)

---

## 📝 Dokumentations-Pflicht

Diese Dokumentation muss **kontinuierlich aktualisiert** werden, wenn:
- Neue Projektregeln gelernt werden
- Design-Entscheidungen getroffen werden
- Technische Konventionen festgelegt werden
- Feedback vom Nutzer kommt

---

## 🎨 Design-Referenz: Legacy

Das Legacy-Projekt (`/legacy/prototype_1`) dient als **visuelle Referenz**:

### Farben (aus `/legacy/prototype_1/src/styles/colors.css`)

**Light Mode:**
- Überschriften: `brand-900` (#273E4F) - Dunkles Blaugrau
- Akzent-Farbe: `brand-300` (#fba762) - **ORANGE** 
- Slash "/" im Logo: `brand-902` (#fba762) - **ORANGE**
- Body Text: `brand-950` (#3f3f46) - Dunkles Grau
- Hintergrund: `brand-25` (#fefeff) - Fast Weiß

**Dark Mode:**
- Überschriften: `brand-900` (#e69451) - **ORANGE** (nicht grau!)
- Akzent-Farbe: `brand-300` (#3d5c7a) - Gedämpftes Blau
- Slash "/" im Logo: `brand-902` (#5483A3) - Blau
- Links/Icons: `brand-700` (#e69451) - **ORANGE**
- Body Text: `brand-950` (#d8d8dc) - Helles Grau
- Hintergrund: `brand-25` (#131415) - Fast Schwarz

**WICHTIG:** 
- Light Mode: Orange ist der Akzent (brand-300, brand-902)
- Dark Mode: Orange für Überschriften (brand-900) und Links/Icons (brand-700)
- Body-Text ist NICHT orange! → brand-950 (grau)
- Subheading-Text: brand-1 (schwarz/weiß)

### Schriftarten (aus Legacy)
- **Inter** (`--font-sans`) - Body-Text, normale Texte
- **EB Garamond** (`--font-heading`) - Überschriften

### DarkModeToggle Styling
- Hintergrund: `bg-brand-100` (subtiler Hover-Hintergrund)
- Hover: `hover:bg-brand-200`
- Icon-Farbe: `text-brand-900`

---

## 🔧 Technische Konventionen

### Komponenten-Struktur (NEU - aufgeräumt)
```
/app/src/components/
├── index.ts          # Zentrale Exports
├── Button.tsx        # Primärer CTA-Button
├── Container.tsx     # Max-width Wrapper
├── DarkModeToggle.tsx
├── Heading.tsx       # Serif-Überschriften
└── Navbar.tsx        # Navigation mit Logo
```

### Styling
- Nur `brand-*` Farben verwenden (keine Tailwind-Defaults wie `gray-*`)
- Dark Mode über `html.dark` Klasse
- Farben in `/src/styles/colors.css` (Light + Dark in einer Datei)

---

## 📋 Gelernte Präferenzen

*(Diese Liste wird kontinuierlich erweitert)*

1. **Legacy ist nur Referenz** - Niemals direkt ändern
2. **Subtiles Design** - Weniger ist mehr, professionell und clean
3. **Authentische Farben** - Exakt wie im Legacy-Projekt
4. **Überschriften im Dark Mode sind ORANGE** - Nicht grau!
5. **Body-Text ist NICHT orange** - Immer brand-950 (grau)
6. **Inter für Body-Text** - Wie im Legacy
7. **EB Garamond für Überschriften** - Elegante Serif-Schrift

---

*Letzte Aktualisierung: Bei jeder neuen Erkenntnis*

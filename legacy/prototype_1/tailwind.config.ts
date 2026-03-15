import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      colors: {
        brand: {
          0: 'var(--color-brand-0)', //white
          1: 'var(--color-brand-1)', //black
          25: 'var(--color-brand-25)', //Background
          50: 'var(--color-brand-50)', //NavBar
          100: 'var(--color-brand-100)', //aktuelle Auswahl Menüs
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)', // orange
          400: 'var(--color-brand-400)', // blue background
          500: 'var(--color-brand-500)', // orange background
          550: 'var(--color-brand-550)', // gray on hover (gray-100)
          600: 'var(--color-brand-600)', // blue: icons
          700: 'var(--color-brand-700)', // blue text (Links, Icons)
          800: 'var(--color-brand-800)', //
          900: 'var(--color-brand-900)', // blue button, headings, checks
          901: 'var(--color-brand-901)', // Icon: MOOD
          902: 'var(--color-brand-902)', // Icon: /
          950: 'var(--color-brand-950)', //Text Zinc
        },
        group: {
          'park-club': {
            500: 'var(--color-group-park-club-500)',  // Medium purple
          },
          'marin-quarter': {
            500: 'var(--color-group-marin-quarter-500)',  // Medium green
          },
          'rochefort': {
            500: 'var(--color-group-rochefort-500)',  // Medium pink
          },
        },
      },
      screens: {
        'xs': '475px',  // Neuer Breakpoint für extra-small Geräte
        'sm': '640px',  // sm (Standard)
        'md': '768px',  // md (Standard)
        'lg': '1024px', // lg (Standard)
        'xl': '1280px', // xl (Standard)
        '2xl': '1536px', // 2xl (Standard)
        '3xl': '1800px', // Beispiel für einen weiteren benutzerdefinierten Breakpoint
      },
    },
  },
  plugins: [],
}

export default config
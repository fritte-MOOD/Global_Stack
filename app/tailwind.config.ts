import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        brand: {
          0: "var(--color-brand-0)",
          1: "var(--color-brand-1)",
          25: "var(--color-brand-25)",
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          550: "var(--color-brand-550)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          850: "var(--color-brand-850)",
          900: "var(--color-brand-900)",
          950: "var(--color-brand-950)",
        },
        group: {
          "park-club": {
            500: "var(--color-group-park-club-500)",
          },
          "marin-quarter": {
            500: "var(--color-group-marin-quarter-500)",
          },
          rochefort: {
            500: "var(--color-group-rochefort-500)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

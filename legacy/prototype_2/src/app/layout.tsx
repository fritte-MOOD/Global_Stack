import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import ThemeSync from "@/components/ThemeSync";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Stack",
  description: "Decentralizing the digital world through open infrastructure",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>",
  },
};

/** Vor React: Klasse "dark" auf <html> aus localStorage, kein Flackern. */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning className={`${inter.variable} ${ebGaramond.variable}`}>
      <body className="font-sans bg-brand-25 text-brand-950 antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}

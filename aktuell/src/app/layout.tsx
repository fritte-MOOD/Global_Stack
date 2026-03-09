import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import ThemeSync from "@/components/ThemeSync";
import { Providers } from "./providers";

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
  description: "Be one Cell of the Brain!",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌐</text></svg>",
  },
};

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
      <body className="bg-brand-25 text-brand-950">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeSync />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

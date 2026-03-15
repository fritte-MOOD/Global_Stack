import type { Metadata } from "next"
import { EB_Garamond, Inter } from "next/font/google"
import { cn } from "@/components/functions/utils"
import { ContextProvider } from "@/context/ContextProvider"
import '../styles/colors.css'
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "jStack App",
  description: "Created using jStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
    <body className="font-sans bg-brand-25 text-brand-950 antialiased min-h-[800px]">
    <ContextProvider>
      {children}
    </ContextProvider>
    </body>
    </html>
  )
}

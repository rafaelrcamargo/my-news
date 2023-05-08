import { type FC, type PropsWithChildren } from "react"
import { type Metadata } from "next"
import { Open_Sans, Ubuntu } from "next/font/google"
import { Toggle } from "@/components/toggle"
import { ThemeProvider } from "@/providers/theme"
import { cn } from "@/utils"
import { Analytics } from "@vercel/analytics/react"
import "@/styles/globals.css"

const fontSerif = Ubuntu({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "700"
})
const fontSans = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "400"
})

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={cn(fontSerif.variable, fontSans.variable)}>
    <Analytics />
    <body
      className={
        "bg-pattern antialiased text-neutral-900 dark:text-neutral-100"
      }>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        themes={["light", "dark"]}>
        <Toggle />
        {children}
      </ThemeProvider>
    </body>
  </html>
)

export default Layout

const base = {
  title: "My News - Read what matters.",
  description:
    "Keep up-to-date on what matters to you most with our must-read recommendations.",
  url: "https://news.cmrg.me/"
}

export const metadata: Metadata = {
  metadataBase: new URL(base.url),
  viewport:
    "height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0",
  title: {
    default: base.title,
    template: "%s | My News"
  },
  description: base.description,
  keywords: ["News", "Read", "Articles", "Recommendations"],
  authors: [
    { name: "Rafael R. Camargo", url: "https://github.com/rafaelrcamargo" }
  ],
  openGraph: {
    url: base.url,
    type: "website",
    locale: "en-US",
    title: base.title,
    description: base.description,
    images: [{ url: "/og.webp" }]
  },
  twitter: {
    site: base.url,
    title: base.title,
    description: base.description,
    card: "summary_large_image",
    creator: "@rafaelrcamargo",
    images: [{ url: "/og.webp", alt: base.title }]
  },
  robots: {
    index: true,
    follow: true
  }
}

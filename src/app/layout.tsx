import { type FC, type PropsWithChildren } from "react"

import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { cookies } from "next/headers"

import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/react"

import "@/styles/globals.css"

const font = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className={cn(font.variable)}>
    <Analytics />
    <body className={cookies().get("theme")?.value ?? "light"}>
      <main
        className={
          "bg-neutral-100 text-neutral-900 antialiased dark:bg-neutral-900 dark:text-neutral-100"
        }
      >
        {children}
      </main>
    </body>
  </html>
)

export default Layout

const base = {
  title: "My News - Read what matters.",
  description:
    "Keep up-to-date on what matters to you most with our must-read recommendations.",
  url: "https://news.cmrg.me/",
}

export const metadata: Metadata = {
  metadataBase: new URL(base.url),
  viewport:
    "height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0",
  title: {
    default: base.title,
    template: "%s | My News",
  },
  description: base.description,
  keywords: ["News", "Read", "Articles", "Recommendations"],
  authors: [
    { name: "Rafael R. Camargo", url: "https://github.com/rafaelrcamargo" },
  ],
  openGraph: {
    url: base.url,
    type: "website",
    locale: "en-US",
    title: base.title,
    description: base.description,
    images: [{ url: "/og.webp" }],
  },
  twitter: {
    site: base.url,
    title: base.title,
    description: base.description,
    card: "summary_large_image",
    creator: "@rafaelrcamargo",
    images: [{ url: "/og.webp", alt: base.title }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

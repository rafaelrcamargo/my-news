import { FC, PropsWithChildren } from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import { cn } from "@/lib/utils"

import "@/styles/globals.css"

const inter = Open_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
})

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html
      lang="en"
      className={cn(
        "overflow-x-hidden bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
        inter.variable
      )}
    >
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default Layout

const base = {
  title: "My News - Read what matters.",
  description:
    "Keep up-to-date on what matters to you most with our must-read recommendations.",
}

export const metadata: Metadata = {
  viewport:
    "height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0",
  title: {
    default: base.title,
    template: "%s | My News",
  },
  description: base.description,
  keywords: ["Next.js", "Rust", "News"],
  authors: [
    { name: "Rafael R. Camargo", url: "https://github.com/rafaelrcamargo" },
  ],
  openGraph: {
    title: base.title,
    description: base.description,
    url: "https://news.cmrg.dev",
    siteName: base.title,
    images: [
      {
        url: "/og.webp",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: base.title,
    description: base.description,
    card: "summary_large_image",
    creator: "@rafaelrcamargo",
    site: "https://news.cmrg.dev",
    images: [
      {
        url: "/og.webp",
        alt: base.title,
        width: 1920,
        height: 1080,
      },
    ],
  },
  icons: {
    shortcut: "/favicon.ico",
  },
}

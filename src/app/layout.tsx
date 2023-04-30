import { FC, PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import type { Metadata } from "next"
import { cn } from '@/lib/utils'
import "@/styles/globals.css"

const inter = Inter({ subsets: ['latin'], variable: "--font-sans" })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={cn(
      "overflow-x-hidden bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
      inter.variable
    )}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default Layout

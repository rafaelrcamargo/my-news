"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { NAV_CLASSNAME } from "@/components/nav"
import { cn } from "@/utils"

export const Toggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted)
    return (
      <section
        className={cn(
          NAV_CLASSNAME,
          "right-0 top-0 m-4 h-12 w-12 bg-neutral-100/30 p-2 duration-300 hover:scale-105 dark:bg-neutral-900/30 md:bottom-0"
        )}>
        <div className="center m-auto"></div>
      </section>
    )

  return (
    <section
      className={cn(
        NAV_CLASSNAME,
        "right-0 top-0 m-4 h-12 w-12 overflow-hidden bg-neutral-100/30 p-2 duration-300 hover:scale-105 dark:bg-neutral-900/30 md:bottom-0"
      )}>
      <div className="center m-auto">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={toggle}
          type="button"
          aria-label="Toggle theme">
          {theme === "dark" ? (
            <Sun className="h-6 w-6 stroke-neutral-500 stroke-[1.6]" />
          ) : (
            <Moon className="h-6 w-6 stroke-neutral-500 stroke-[1.6]" />
          )}
        </motion.button>
      </div>
    </section>
  )
}

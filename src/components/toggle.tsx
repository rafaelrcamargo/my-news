"use client"

import { NAV_CLASSNAME } from "@/components/nav"
import { cn } from "@/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export const Toggle = () => {
  const { theme, setTheme } = useTheme()

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <section
      className={cn(
        NAV_CLASSNAME,
        "right-0 top-0 m-4 h-12 w-12 bg-neutral-100/30 p-2 duration-300 hover:scale-105 dark:bg-neutral-900/30 md:bottom-0"
      )}>
      <div className="center m-auto">
        <button onClick={toggle} type="button">
          {theme === "light" ? (
            <Moon className="h-6 w-6 stroke-neutral-500" />
          ) : (
            <Sun className="h-6 w-6 stroke-neutral-500" />
          )}
        </button>
      </div>
    </section>
  )
}

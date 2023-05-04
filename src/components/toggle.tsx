"use client"

import type { FC } from "react"

import { NAV_CLASSNAME } from "@/components/nav"
import { cn } from "@/lib/utils"
import type { Theme } from "@/types/global"
import { Moon, Sun } from "lucide-react"

export const Toggle: FC<{ theme: Theme }> = ({ theme }) => {
  const toggle = () => {
    document.cookie = `theme=${theme === "light" ? "dark" : "light"};`
    return window.location.reload()
  }

  return (
    <section
      className={cn(
        NAV_CLASSNAME,
        "right-0 top-0 md:bottom-0",
        "m-4 h-12 w-12 p-2"
      )}
    >
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

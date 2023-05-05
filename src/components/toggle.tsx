"use client"

import { NAV_CLASSNAME } from "@/components/nav"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

export const Toggle = async () => {
  const toggle = async () => {
    document.cookie = `theme=${
      (await getTheme()) === "light" ? "dark" : "light"
    };`

    return window.location.reload()
  }

  return (
    <section
      className={cn(
        NAV_CLASSNAME,
        "right-0 top-0 m-4 h-12 w-12 p-2 md:bottom-0"
      )}>
      <div className="center m-auto">
        <button onClick={toggle} type="button">
          {"light" ? (
            <Moon className="h-6 w-6 stroke-neutral-500" />
          ) : (
            <Sun className="h-6 w-6 stroke-neutral-500" />
          )}
        </button>
      </div>
    </section>
  )
}

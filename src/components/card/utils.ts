import { cn } from "@/utils"

export const clamp = (_: unknown, num: number) =>
  Math.min(Math.max(num * 0.1, -30), 30)

export const isMobile =
  typeof window !== "undefined" ? window.innerWidth <= 768 : false

export const CLASSNAME = cn(
  "absolute m-8 flex h-[60vh] min-h-[28rem] max-w-[84vw] cursor-grab flex-col gap-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-900/30 dark:bg-neutral-800 md:h-[80vh] md:w-[32rem] md:p-8 md:backdrop-blur-md md:backdrop-saturate-150"
)

export const CONSTRAINTS = { left: 0, right: 0, top: 0, bottom: 0 }
export const ELASTIC = { left: 0.25, right: 0.25, top: 0.15, bottom: 0.05 }

export const getStates = (theme = "dark") =>
  isMobile
    ? theme === "dark"
      ? ["#ef4444", "#262626", "#262626", "#262626", "#22c55e"]
      : ["#fca5a5", "#f5f5f5", "#f5f5f5", "#f5f5f5", "#86efac"]
    : theme === "dark"
    ? [
        "linear-gradient(225deg, #ef4444a3 0%, #f43f5ea3 100%)",
        "linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
        "linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
        "linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
        "linear-gradient(225deg, #22c55ea3 0%, #a3e635a3 100%)"
      ]
    : [
        "linear-gradient(225deg, #fca5a5a3 0%, #f43f5ea3 100%)",
        "linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
        "linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
        "linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
        "linear-gradient(225deg, #86efaca3 0%, #bef264a3 100%)"
      ]

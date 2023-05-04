"use client"

import { Dispatch, FC, memo } from "react"

import { cn } from "@/lib/utils"
import type { Theme } from "@/types/global"
import { motion } from "framer-motion"
import { Heart, ThumbsDown, ThumbsUp } from "lucide-react"

export const NAV_CLASSNAME =
  "fixed z-999 h-16 shadow-xl dark:shadow-neutral-950/30 border rounded-full flex center border-neutral-200 bg-neutral-100/10 px-4 dark:border-neutral-500/10 dark:bg-neutral-800/10 backdrop-blur-sm backdrop-saturate-150"

const Nav: FC<{ dispatch: Dispatch<"LIKE" | "DISLIKE">; theme: Theme }> = ({
  dispatch,
  theme,
}) => {
  const MHeart = motion(Heart)
  const MThumbsUp = motion(ThumbsUp)
  const MThumbsDown = motion(ThumbsDown)

  return (
    <nav
      className={cn(
        NAV_CLASSNAME,
        "bottom-0 left-1/2 mb-4 -translate-x-1/2 px-6"
      )}
    >
      <div className="relative m-auto flex w-full max-w-2xl items-center justify-between gap-2">
        <div className="h-min w-min p-2">
          <MThumbsUp
            initial={{ opacity: 0, y: 50, fill: "#737373" }}
            animate={{ opacity: 1, y: 0, fill: "#73737300" }}
            whileHover={{ fill: "#737373" }}
            whileTap={{ rotate: -30, scale: 1.1, y: -5, fill: "#73737300" }}
            onClick={() => dispatch("LIKE")}
            className="h-10 w-10 stroke-neutral-500 stroke-1 outline-none"
          />
        </div>
        <div className="h-10 w-20 p-2" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ scale: 0, backgroundColor: "#ef4444" }}
            animate={{
              scale: 1,
              backgroundColor: theme === "dark" ? "#171717" : "#f2f2f2",
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={() => dispatch("LIKE")}
            className="overflow-hidden rounded-full border border-neutral-200 bg-neutral-100/30 shadow-xl dark:border-neutral-500/10 dark:bg-neutral-900 dark:shadow-neutral-950/30"
          >
            <MHeart
              initial={{ scale: 0, fill: "#ef4444" }}
              animate={{ scale: 1, fill: "#ef444400" }}
              whileHover={{ scale: 1, fill: "#ef4444" }}
              whileTap={{ scale: 10, fill: "#ef4444" }}
              transition={{ duration: 0.3, type: "spring", damping: 10 }}
              className="h-16 w-16 stroke-red-500 stroke-1 p-4 outline-none"
            />
          </motion.div>
        </div>
        <div className="h-min w-min p-2">
          <MThumbsDown
            initial={{ opacity: 0, y: 50, fill: "#737373" }}
            animate={{ opacity: 1, y: 0, fill: "#73737300" }}
            whileHover={{ fill: "#737373" }}
            onClick={() => dispatch("DISLIKE")}
            whileTap={{ rotate: -30, scale: 1.1, y: 5, fill: "#73737300" }}
            className="h-10 w-10 stroke-neutral-500 stroke-1 outline-none"
          />
        </div>
      </div>
    </nav>
  )
}

export default memo(Nav, (_, __) => true)

"use client"

import { memo, useMemo } from "react"
import { CLASSNAME } from "@/components/card/utils"
import { cn, toInt } from "@/utils"
import { motion } from "framer-motion"

type Props = { title: string }
const change = (old: Props, current: Props) =>
  typeof window !== "undefined"
    ? old.title.length === current.title.length
    : false

export const Placeholder = memo(function Placeholder({ title }: Props) {
  const int = useMemo(() => {
    return toInt(title)
  }, [title])

  return (
    <motion.div
      style={{ rotate: int }}
      className={cn(CLASSNAME, "z-1 w-[32rem]")}
      transition={{ delay: int * 0.15 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0, scale: 0.9 }}
    />
  )
}, change)

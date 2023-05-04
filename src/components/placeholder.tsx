"use client"

import { memo, useMemo } from "react"

import { CLASSNAME } from "@/components/card"
import { cn, toInt } from "@/lib/utils"
import type { CardProps } from "@/types/card"
import { motion } from "framer-motion"

const change = (old: PlaceholderProps, current: PlaceholderProps) =>
  typeof window !== "undefined"
    ? old.title.length === current.title.length
    : false

type PlaceholderProps = Pick<CardProps, "title">
export const Placeholder = memo(function Placeholder({
  title,
}: PlaceholderProps) {
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
    />
  )
},
change)

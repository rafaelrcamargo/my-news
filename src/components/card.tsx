"use client"

import { memo, useEffect, useMemo, useReducer, type FC } from "react"
import Image from "next/image"
import { cn, toInt, useColorScheme } from "@/lib/utils"
import type { CardProps } from "@/types/card"
import { motion, useMotionValue, useTransform } from "framer-motion"

const clamp = (_: unknown, num: number) =>
  Math.min(Math.max(num * 0.1, -30), 30)

const CLASSNAME = cn(
  "absolute m-8 flex h-[60vh] min-h-[28rem] max-w-[84vw] cursor-grab flex-col gap-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-900/30 dark:bg-neutral-800 md:h-[80vh] md:w-[32rem] md:p-8 md:backdrop-blur-md md:backdrop-saturate-150"
)

const CONSTRAINTS = { left: 0, right: 0, top: 0, bottom: 0 }
const ELASTIC = {
  left: 0.25,
  right: 0.25,
  top: 0.15,
  bottom: 0.05,
}

export const Card: FC<CardProps> = ({
  title,
  description,
  urlToImage,
  url,
  author,
  source,
  actions,
  z,
}) => {
  const value = useMotionValue(0)
  const [rotate, setRotate] = useReducer(clamp, 0)

  const [leaveBy, setLeaveBy] = useReducer(
    (_: unknown, exit: "left" | "right") =>
      exit === "left" ? { x: -800 } : { x: 800 },
    { x: 0 }
  )

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : true

  const scheme = useColorScheme()
  const states = ((s: typeof scheme) =>
    isMobile
      ? s === "dark"
        ? ["#ef4444", "#171717", "#171717", "#171717", "#22c55e"]
        : ["#fca5a5", "#f5f5f5", "#f5f5f5", "#f5f5f5", "#86efac"]
      : s === "dark"
      ? [
          "linear-gradient(225deg, #ef4444a3 0%, #f43f5ea3 100%)",
          "linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
          "linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
          "linear-gradient(225deg, #262626a3 0%, #171717a3 100%)",
          "linear-gradient(225deg, #22c55ea3 0%, #a3e635a3 100%)",
        ]
      : [
          "linear-gradient(225deg, #fca5a5a3 0%, #f43f5ea3 100%)",
          "linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
          "linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
          "linear-gradient(225deg, #fafafaa3 0%, #f5f5f5a3 100%)",
          "linear-gradient(225deg, #86efaca3 0%, #bef264a3 100%)",
        ])(scheme)

  const input = [-100, -30, 0, 30, 100]
  const background = useTransform(value, input, states)

  useEffect(() => {
    const update = () => setRotate(value.get())
    const unsubscribe = value.on("change", update)

    return () => unsubscribe()
  }, [value])

  const className = cn(
    CLASSNAME,
    "shadow-xl dark:shadow-neutral-950/50",
    "will-change-transform",
    `z-${z}`
  )

  return (
    <motion.div
      draggable
      drag={true}
      style={{ rotate, background }}
      className={className}
      dragElastic={ELASTIC}
      dragTransition={{
        bounceDamping: 10,
        bounceStiffness: 10,
        power: 10,
      }}
      dragSnapToOrigin={true}
      dragConstraints={CONSTRAINTS}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 100, ...leaveBy }}
      onDragEnd={(_, { point }) => {
        if (point.y < -20) window.open(url, "_blank")

        if (point.x < 400) {
          setLeaveBy("left")
          actions("DISLIKE")
        }

        if (point.x > 600) {
          setLeaveBy("right")
          actions("LIKE")
        }
      }}
      onUpdate={latest => value.updateAndNotify(Number(latest.x ?? 0))}
    >
      <section className="prose prose-sm prose-neutral flex h-[-webkit-fill-available] flex-col dark:prose-invert">
        <h1 className="text-base md:text-2xl">{title}</h1>
        <div className="-mt-2 flex gap-2 text-xs text-neutral-400 md:-mt-4 md:text-sm">
          {author && (
            <>
              <span>{author}</span>
              <span>·</span>
            </>
          )}
          <span className="text-violet-500">{source.name}</span>
        </div>
        <p>{description}</p>
        {urlToImage && (
          <motion.div className="relative block h-full w-full">
            <Image
              className="pointer-events-none m-0 rounded-md border border-neutral-200 object-cover shadow-md dark:border-neutral-900/30 dark:shadow-neutral-950/30"
              sizes="(max-width: 768px) 50vw, 40vw" // TODO: Test this
              priority={z === 10}
              src={urlToImage}
              loading="eager"
              alt={title}
              fill
            />
          </motion.div>
        )}
      </section>
    </motion.div>
  )
}

const change = (old: { title: string }, current?: { title: string }) =>
  typeof window !== "undefined"
    ? old?.title.length === current?.title.length
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
      className={`${CLASSNAME} z-1 min-w-[84vw] border border-neutral-200 shadow-md shadow-neutral-500/5 dark:border-neutral-900/30 dark:shadow-neutral-900/30 md:w-[32rem] md:min-w-0`}
      style={{ rotate: int }}
      transition={{ delay: int * 0.15 }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
    />
  )
},
change)

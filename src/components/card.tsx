"use client"

import { useCallback, useLayoutEffect, useReducer, type FC } from "react"
import Image from "next/image"
import {
  PanInfo,
  ResolvedValues,
  motion,
  useMotionValue,
  useTransform,
  useWillChange
} from "framer-motion"
import { cn } from "@/lib/utils"
import { type News, type Theme } from "@/types/global"

const clamp = (_: unknown, num: number) =>
  Math.min(Math.max(num * 0.1, -30), 30)

export const CLASSNAME = cn(
  "absolute m-8 flex h-[60vh] min-h-[28rem] max-w-[84vw] cursor-grab flex-col gap-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-6 dark:border-neutral-900/30 dark:bg-neutral-800 md:h-[80vh] md:w-[32rem] md:p-8 md:backdrop-blur-md md:backdrop-saturate-150"
)

const CONSTRAINTS = { left: 0, right: 0, top: 0, bottom: 0 }
const ELASTIC = {
  left: 0.25,
  right: 0.25,
  top: 0.15,
  bottom: 0.05
}

type Props = News["articles"][number] & {
  actions: Function
  theme: Theme
  z: number
}

export const Card: FC<Props> = ({
  theme,
  title,
  description,
  urlToImage,
  url,
  author,
  source,
  actions,
  z
}) => {
  const value = useMotionValue(0)
  const [rotate, setRotate] = useReducer(clamp, 0)

  const [leaveBy, setLeaveBy] = useReducer(
    (_: unknown, exit: "left" | "right") =>
      exit === "left" ? { x: -600 } : { x: 600 },
    { x: 0 }
  )

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false

  const states = ((t: Theme) =>
    isMobile
      ? t === "dark"
        ? ["#ef4444", "#262626", "#262626", "#262626", "#22c55e"]
        : ["#fca5a5", "#f5f5f5", "#f5f5f5", "#f5f5f5", "#86efac"]
      : t === "dark"
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
        ])(theme)

  const input = [-100, -30, 0, 30, 100]
  const background = useTransform(value, input, states)

  useLayoutEffect(() => {
    const update = () => setRotate(value.get())
    const unsubscribe = value.on("change", update)

    return () => unsubscribe()
  }, [value])

  const className = cn(
    CLASSNAME,
    "shadow-xl dark:shadow-neutral-950/50",
    `z-${z}`
  )

  const willChange = useWillChange()

  const action = (type: "LIKE" | "DISLIKE") => {
    if (type === "LIKE") {
      setLeaveBy("right")
      return actions("LIKE")
    } else {
      setLeaveBy("left")
      return actions("DISLIKE")
    }
  }

  const checkBounds = (_: unknown, { point }: PanInfo) => {
    const { LIKE, DISLIKE } = {
      LIKE: isMobile ? 300 : 600,
      DISLIKE: isMobile ? 150 : 300
    }

    if (point.x > LIKE) action("LIKE")
    if (point.x < DISLIKE) action("DISLIKE")
    if (point.y < -20) window.open(url, "_blank")
  }

  const updateRotation = useCallback(
    (latest: ResolvedValues) => value.updateAndNotify(Number(latest.x ?? 0)),
    [value]
  )

  return (
    <motion.section
      className={className}
      drag
      dragSnapToOrigin
      dragElastic={ELASTIC}
      dragConstraints={CONSTRAINTS}
      onDragEnd={checkBounds}
      onUpdate={updateRotation}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50, ...leaveBy }}
      style={{ willChange, rotate, background }}>
      <article className="prose prose-sm prose-neutral flex h-[-webkit-fill-available] flex-col dark:prose-invert">
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
          <div className="relative block h-full w-full">
            <Image
              className="pointer-events-none m-0 rounded-md border border-neutral-200 object-cover shadow-md dark:border-neutral-900/30 dark:shadow-neutral-950/30"
              sizes="50vw" // TODO: Test this
              priority={z === 10}
              src={urlToImage}
              loading="eager"
              alt={title}
              fill
            />
          </div>
        )}
      </article>
    </motion.section>
  )
}

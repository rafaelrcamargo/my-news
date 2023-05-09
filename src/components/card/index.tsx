"use client"

import { useCallback, useLayoutEffect, useReducer, type FC } from "react"
import Image from "next/image"
import {
  CLASSNAME,
  CONSTRAINTS,
  ELASTIC,
  clamp,
  getStates,
  isMobile
} from "@/components/card/utils"
import { type News } from "@/types/global"
import { cn } from "@/utils"
import {
  PanInfo,
  ResolvedValues,
  motion,
  useMotionValue,
  useTransform,
  useWillChange
} from "framer-motion"
import { useTheme } from "next-themes"

type Props = News["articles"][number] & {
  actions: Function
  z: number
}

export const Card: FC<Props> = ({ url, actions, z, ...props }) => {
  const { theme } = useTheme()
  const value = useMotionValue(0)
  const willChange = useWillChange()

  const [rotate, setRotate] = useReducer(clamp, 0)

  const [leaveBy, setLeaveBy] = useReducer(
    (_: unknown, exit: "left" | "right") =>
      exit === "left" ? { x: -600 } : { x: 600 },
    { x: 0 }
  )

  const states = getStates(theme)
  const input = [-100, -30, 0, 30, 100]
  const background = useTransform(value, input, states)

  useLayoutEffect(() => {
    const update = () => setRotate(value.get())
    const unsubscribe = value.on("change", update)

    return () => unsubscribe()
  }, [value])

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

  const config = {
    drag: true,
    dragSnapToOrigin: true,
    dragElastic: ELASTIC,
    dragConstraints: CONSTRAINTS,

    onDragEnd: checkBounds,
    onUpdate: updateRotation,

    style: { willChange, rotate, background }
  }

  return (
    <motion.section
      {...config}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50, ...leaveBy, pointerEvents: "none" }}
      className={cn(CLASSNAME, `z-${z} shadow-xl dark:shadow-neutral-950/50`)}>
      <Article {...props} z={z} />
    </motion.section>
  )
}

const Article = ({ z, ...props }: Omit<Props, "url" | "actions">) => (
  <article className="prose prose-sm prose-neutral flex h-[-webkit-fill-available] flex-col dark:prose-invert">
    <h1 className="text-base md:text-2xl">{props.title}</h1>
    <div className="-mt-2 flex gap-2 text-xs text-neutral-400 md:-mt-4 md:text-sm">
      {props.author && (
        <>
          <span>{props.author}</span>
          <span>·</span>
        </>
      )}
      <span className="text-violet-700 dark:text-violet-300">
        {props.source.name}
      </span>
    </div>
    <p>{props.description}</p>
    {props.urlToImage && (
      <div className="relative block h-full w-full">
        <Image
          className="pointer-events-none m-0 rounded-md border border-neutral-200 object-cover shadow-md dark:border-neutral-900/30 dark:shadow-neutral-950/30"
          sizes="50vw" // TODO: Test this
          src={props.urlToImage}
          alt={props.title}
          fetchPriority={z === 10 ? "high" : "low"}
          loading={z === 10 ? "eager" : "lazy"}
          priority={z === 10}
          fill
        />
      </div>
    )}
  </article>
)

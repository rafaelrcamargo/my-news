"use client"

import Image from "next/image"
import {
  ReactElement,
  useCallback,
  useLayoutEffect,
  useReducer,
  type FC
} from "react"
import {
  motion,
  PanInfo,
  ResolvedValues,
  useMotionValue,
  useTransform,
  useWillChange
} from "framer-motion"
import { useTheme } from "next-themes"
import removeMd from "remove-markdown"

import {
  clamp,
  CLASSNAME,
  CONSTRAINTS,
  ELASTIC,
  getStates
} from "@/components/card/utils"
import { type Article } from "@/types"
import { cn } from "@/utils"

type Props = Partial<Article> & {
  children?: ReactElement
  actions: Function
  z: number
}

export const Card: FC<Props> = ({ children, actions, url, z, ...props }) => {
  const { theme } = useTheme()
  const value = useMotionValue(0)
  const willChange = useWillChange()
  const [rotate, setRotate] = useReducer(clamp, 0)

  const distance = typeof window !== "undefined" ? window.innerWidth : 600
  const [leaveBy, setLeaveBy] = useReducer(
    (_: unknown, exit: "left" | "right") =>
      exit === "left" ? { x: -distance } : { x: distance },
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

  const checkBounds = (
    _: unknown,
    { point, delta, offset, velocity }: PanInfo
  ) => {
    console.log({ point, delta, offset, velocity })

    if (offset.x > 50) action("LIKE")
    if (offset.x < -50) action("DISLIKE")
    if (offset.y < -100) window.open(url, "_blank")
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
      {children ? children : <Article {...props} />}
    </motion.section>
  )
}

const Article = ({
  title,
  author,
  source,
  image,
  content
}: Omit<Props, "url" | "actions" | "z">) => (
  <article className="prose prose-sm prose-neutral flex h-[-webkit-fill-available] flex-col dark:prose-invert">
    <h1 className="text-base [text-wrap:balance] md:text-2xl">{title}</h1>
    <div className="-mt-2 flex gap-2 text-xs text-neutral-400 md:-mt-4 md:text-sm">
      {author && (
        <>
          <span>{author}</span>
          <span>·</span>
        </>
      )}
      <span className="max-w-xs truncate text-violet-700 dark:text-violet-500">
        {source}
      </span>
    </div>

    {content && <p>{removeMd(content).slice(0, 160) + "..."}</p>}

    {image && (
      <div className="relative block h-full w-full">
        <Image
          className="pointer-events-none m-0 rounded-md border border-neutral-200 object-cover shadow-md dark:border-neutral-900/30 dark:shadow-neutral-950/30"
          alt={title + " image"}
          sizes="50vw"
          src={image}
          fill
        />
      </div>
    )}
  </article>
)

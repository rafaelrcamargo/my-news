import type { Dispatch } from "react"
import type NEWS from "@/data/news"

type CardProps = (typeof NEWS.articles)[number] & {
  actions: Function // I mean, it's a function, and otherwise TS complains
  z: number
}

"use client"

import { useReducer } from "react"

import Deck from "@/components/deck"
import Nav from "@/components/nav"
import { type News } from "@/types/global"

const actions = (state: News["articles"], action: "LIKE" | "DISLIKE") => {
  switch (action) {
    case "LIKE":
      console.log("Liked: ", state[0]?.title)
      return state.slice(1)
    case "DISLIKE":
      console.log("Disliked: ", state[0]?.title)
      return state.slice(1)
    default:
      return state
  }
}

type Props = { getTheme: () => Promise<string>; news: News }
const Wrapper = async ({ getTheme, news }: Props) => {
  const [articles, dispatch] = useReducer(actions, news.articles)
  const theme = await getTheme()

  return (
    <>
      <Nav dispatch={dispatch} theme={theme} />
      <Deck theme={theme} dispatch={dispatch} articles={articles} />
    </>
  )
}

export default Wrapper

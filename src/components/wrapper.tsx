"use client"

import { useReducer, type FC } from "react"
import Deck from "@/components/deck"
import Nav from "@/components/nav"
import { type News, type Theme } from "@/types/global"

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

const Wrapper: FC<{ theme: Theme; news: News }> = ({ theme, news }) => {
  const [articles, dispatch] = useReducer(actions, news.articles)

  return (
    <>
      <Nav dispatch={dispatch} theme={theme} />
      <Deck theme={theme} dispatch={dispatch} articles={articles} />
    </>
  )
}

export default Wrapper

"use client"

import { FC, useReducer } from "react"
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

export const Wrapper: FC<{ news: News }> = ({ news }) => {
  const [articles, dispatch] = useReducer(actions, news.articles)

  return (
    <>
      <Nav dispatch={dispatch} />
      <Deck dispatch={dispatch} articles={articles} />
    </>
  )
}

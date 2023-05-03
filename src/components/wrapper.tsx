"use client"

import { useReducer, type FC } from "react"

import Deck from "@/components/deck"
import Nav from "@/components/nav"
import NEWS from "@/data/news"
import { Theme } from "@/types/global"

const actions = (state: typeof NEWS.articles, action: "LIKE" | "DISLIKE") => {
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

export const Wrapper: FC<{ theme: Theme }> = ({ theme }) => {
  const [articles, dispatch] = useReducer(actions, NEWS.articles)

  return (
    <>
      <Nav dispatch={dispatch} theme={theme} />
      <Deck theme={theme} dispatch={dispatch} articles={articles} />
    </>
  )
}

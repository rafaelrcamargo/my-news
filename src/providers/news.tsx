"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type FC,
  type PropsWithChildren
} from "react"
import { News } from "@/types/global"

export type Action = "LIKE" | "DISLIKE"
const actions = (state: News["articles"], action: Action) => {
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

type Context = { articles: News["articles"]; dispatch: Dispatch<Action> }
export const NewsContext = createContext<Context>({
  articles: [],
  dispatch: () => null
})

type Props = FC<PropsWithChildren<{ news: News }>>
export const NewsProvider: Props = ({ children, news }) => {
  const [articles, dispatch] = useReducer(actions, news.articles ?? [])

  return (
    <NewsContext.Provider value={{ articles, dispatch }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)

"use client"

import React, {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type FC,
  type PropsWithChildren
} from "react"

import { type Article } from "@/types"

export type Action = "LIKE" | "DISLIKE"
const actions = (state: Article[], action: Action) => {
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

type Context = { articles: Article[]; dispatch: Dispatch<Action> }
export const NewsContext = createContext<Context>({
  articles: [],
  dispatch: () => null
})

type Props = FC<PropsWithChildren<{ news: Article[] }>>
export const NewsProvider: Props = ({ children, news }) => {
  const [articles, dispatch] = useReducer(actions, news ?? [])

  return (
    <NewsContext.Provider value={{ articles, dispatch }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)

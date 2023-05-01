"use client"

import { useReducer } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card, Placeholder } from "@/components/card"
import NEWS from "@/data/news"

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

export const Deck = () => {
  const [articles, dispatch] = useReducer(actions, NEWS.articles)

  return (
    <motion.div className="center relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        {articles.map((article, i) =>
          i < 2 ? (
            <Card
              key={article.title}
              actions={dispatch}
              {...article}
              z={10 - i}
            />
          ) : (
            <Placeholder key={article.title} i={i} {...article} />
          )
        )}
      </AnimatePresence>
    </motion.div>
  )
}

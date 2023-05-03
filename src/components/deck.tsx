"use client"

import type { Dispatch, FC } from "react"

import { Card } from "@/components/card"
import { Placeholder } from "@/components/placeholder"
import type NEWS from "@/data/news"
import { type Theme } from "@/types/global"
import { AnimatePresence } from "framer-motion"

const Deck: FC<{
  theme: Theme
  dispatch: Dispatch<"LIKE" | "DISLIKE">
  articles: typeof NEWS.articles
}> = ({ theme, articles, dispatch }) => {
  return (
    <div className="center relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        {articles.map((article, i) =>
          i < 2 ? (
            <Card
              theme={theme}
              key={article.title}
              actions={dispatch}
              {...article}
              z={10 - i}
            />
          ) : (
            <Placeholder key={article.title} {...article} />
          )
        )}
      </AnimatePresence>
    </div>
  )
}

export default Deck

"use client"

import { Card } from "@/components/card"
import { Placeholder } from "@/components/card/placeholder"
import { useNews } from "@/providers/news"
import { AnimatePresence } from "framer-motion"

export const Deck = () => {
  const { articles, dispatch } = useNews()

  return (
    <div className="center relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        {articles
          .filter((_, i) => i < 2)
          .map((article, i) => (
            <Card
              key={`Card ${article.title}`}
              actions={dispatch}
              {...article}
              z={10 - i}
            />
          ))}
      </AnimatePresence>

      <AnimatePresence>
        {articles.map(
          (article, i) =>
            i > 2 && (
              <Placeholder
                key={`Placeholder ${article.title}`}
                title={article.title}
              />
            )
        )}
      </AnimatePresence>
    </div>
  )
}

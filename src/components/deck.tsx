"use client"

import { FC, useState } from "react"
import { AnimatePresence } from "framer-motion"

import { Card } from "@/components/card"
import { Placeholder } from "@/components/card/placeholder"
import { useNews } from "@/providers/news"

export const Deck: FC<{ firstVisit: boolean }> = ({ firstVisit }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(firstVisit)
  const { articles, dispatch } = useNews()

  const understood = (_: string) => {
    if (!document) return

    document.cookie = "isFirstVisit=false;max-age=31536000"
    return setIsFirstVisit(false)
  }

  return (
    <div className="center relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        {isFirstVisit && (
          <Card actions={understood} z={999}>
            <>
              <h1>Welcome to My News!</h1>
              <p>
                Think in a better way to read news.Tune your news feed to your
                interests.
              </p>
              <p>
                Slide to the left if you like the news, slide to the right if
                you don&apos;t.
              </p>
              <p>
                I mean, you&apos;ve already familiar with this, isn&apos;t you?
              </p>
              <p>
                <strong>Enjoy!</strong>
              </p>
            </>
          </Card>
        )}
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

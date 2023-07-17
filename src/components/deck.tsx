"use client"

import { FC, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { RoughNotation } from "react-rough-notation"

import { Card } from "@/components/card"
import { Placeholder } from "@/components/card/placeholder"
import { useNews } from "@/providers/news"

export const Deck: FC<{ firstVisit: boolean }> = ({ firstVisit }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(firstVisit)
  const { articles, dispatch } = useNews()

  const understood = (_: string) => {
    if (!document) throw Error("document is not defined")
    else document.cookie = "isFirstVisit=false;max-age=31536000"

    return setIsFirstVisit(false)
  }

  return (
    <div className="center relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        {isFirstVisit && (
          <Card actions={understood} z={999}>
            <article className="prose prose-sm prose-neutral flex h-[-webkit-fill-available] flex-col dark:prose-invert">
              <h1 className="text-base [text-wrap:balance] md:text-2xl">
                Welcome to My News!
              </h1>
              <div className="-mt-2 flex gap-2 text-xs text-neutral-400 md:-mt-4 md:text-sm">
                <span>Onboarding</span>
                <span>·</span>
                <span className="max-w-xs truncate text-violet-700 dark:text-violet-500">
                  My News
                </span>
              </div>

              <p className="my-4 text-base">
                Welcome to{" "}
                <RoughNotation
                  type="underline"
                  color="#8b5cf6"
                  animationDelay={1000}
                  show>
                  a unique news experience tailored just for you.
                </RoughNotation>{" "}
                Say goodbye to generic headlines and embrace a world where{" "}
                <b>your interests take the lead.</b>
              </p>

              <p className="m-0 mb-4 text-base">
                <RoughNotation
                  type="underline"
                  color="#8b5cf6"
                  animationDelay={2000}
                  show>
                  With a simple swipe,
                </RoughNotation>{" "}
                curate your news feed to match your passions. Sound familiar?
                It&apos;s the intuitive gesture you&apos;ve mastered from the
                dating world, now applied to your news consumption.
              </p>

              <p className="m-0 mb-4 text-base">
                Prepare for an immersive journey of discovery, where captivating
                articles await.{" "}
                <RoughNotation
                  type="underline"
                  color="#8b5cf6"
                  animationDelay={3000}
                  show>
                  Stay informed, explore new horizons, and ignite your
                  curiosity.
                </RoughNotation>{" "}
                Are you ready to dive in?
              </p>

              <p className="my-4 text-base">
                <RoughNotation
                  type="circle"
                  color="#22c55e"
                  animationDelay={4000}
                  padding={14}
                  iterations={5}
                  animationDuration={2000}
                  show>
                  Enjoy the ride!
                </RoughNotation>
              </p>
            </article>
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

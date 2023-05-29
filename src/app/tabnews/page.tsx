import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { type Metadata } from "next/types"

import { getArticles } from "@/app/tabnews/queries"
import { Deck } from "@/components/deck"
import { Nav } from "@/components/nav"
import { NewsProvider } from "@/providers/news"

export default async function Home() {
  const cookie = cookies().get("isFirstVisit")
  const isFirstVisit = cookie === undefined || cookie.value === "true"

  const news = await getArticles()
  if (news.status >= 400) return notFound()

  return (
    <NewsProvider news={news.articles}>
      <Deck firstVisit={isFirstVisit} />
      <Nav />
    </NewsProvider>
  )
}

export const metadata: Metadata = {
  title: "TabNews: Conteúdos para quem trabalha com Programação e Tecnologia.",
  description: "Conteúdos com valor concreto para quem trabalha com tecnologia."
}

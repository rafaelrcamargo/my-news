import { cookies } from "next/headers"
import { type Metadata } from "next/types"

import { getArticles } from "@/app/tabnews/queries"
import { Deck } from "@/components/deck"
import { Nav } from "@/components/nav"
import { NewsProvider } from "@/providers/news"

export default async function Home() {
  // First visit cookie
  const cookie = cookies().get("isFirstVisit")
  let isFirstVisit = !cookie || cookie.value === "true"

  // News from TabNews API
  const news = await getArticles()

  // Avoid showing the first visit message if the API is down
  if (news.status !== 200) isFirstVisit = false

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

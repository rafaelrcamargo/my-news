import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { Deck } from "@/components/deck"
import { Nav } from "@/components/nav"
import { NewsProvider } from "@/providers/news"
import { type NewsAPIResponse } from "@/types"

const getNews = async () => {
  const res = await fetch("https://newsapi.org/v2/top-headlines?country=us", {
    headers: { "X-Api-Key": process.env.NEWS_API_KEY ?? "" },
    next: { revalidate: 60 * 60 }
  })

  if (!res.ok) throw Error("Failed to fetch NEWS from NEWS API")
  else return res.json() as Promise<NewsAPIResponse>
}

export default async function Home() {
  const cookie = cookies().get("isFirstVisit")
  const isFirstVisit = cookie === undefined || cookie.value === "true"

  const news_raw = await getNews()
  if (news_raw.status !== "ok") return notFound()

  const news = news_raw.articles.map(article => ({
    source: article.source.name,
    author: article.author,
    title: article.title,
    url: article.url,
    image: article.urlToImage,
    publishedAt: article.publishedAt,
    content: article.content
  }))

  return (
    <NewsProvider news={news}>
      <Deck firstVisit={isFirstVisit} />
      <Nav />
    </NewsProvider>
  )
}

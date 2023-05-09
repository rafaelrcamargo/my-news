import { notFound } from "next/navigation"
import { Deck } from "@/components/deck"
import { Nav } from "@/components/nav"
import { Outro } from "@/components/outro"
import { NewsProvider } from "@/providers/news"
import { News } from "@/types/global"

const getNews = async () => {
  const res = await fetch("https://newsapi.org/v2/top-headlines?country=us", {
    headers: { "X-Api-Key": process.env.NEWS_API_KEY ?? "" },
    next: { revalidate: 60 * 60 }
  })

  if (!res.ok) throw Error("Failed to fetch NEWS from NEWS API")
  else return res.json() as Promise<News>
}

export default async function Home() {
  const news = await getNews()

  if (news.status !== "ok") return notFound()

  return (
    <>
      <NewsProvider news={news}>
        <Deck />
        <Nav />
      </NewsProvider>

      <Outro />
    </>
  )
}

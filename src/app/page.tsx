import { cookies } from "next/headers"

import { getNews } from "@/app/queries"
import { Deck } from "@/components/deck"
import { Nav } from "@/components/nav"
import { NewsProvider } from "@/providers/news"

export default async function Home() {
  // First visit cookie
  const cookie = cookies().get("isFirstVisit")
  const isFirstVisit = !cookie || cookie.value === "true"

  // News from NEWS API
  const news = await getNews()

  return (
    <NewsProvider news={news}>
      <Deck firstVisit={isFirstVisit} />
      <Nav />
    </NewsProvider>
  )
}

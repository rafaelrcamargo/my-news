import { cookies } from "next/headers"

import { Outro } from "@/components/outro"
import { Toggle } from "@/components/toggle"
import Wrapper from "@/components/wrapper"
import { Theme } from "@/types/global"

const getNews = async () => {
  const res = await fetch("https://newsapi.org/v2/top-headlines?country=us", {
    headers: { "X-Api-Key": process.env.NEWS_API_KEY ?? "" },
    next: { revalidate: 60 * 60 }
  })

  if (!res.ok) throw Error("Failed to fetch NEWS from NEWS API")
  else return res.json()
}

export default async function Home() {
  const news = await getNews()

  const getTheme = async () => {
    "use server"

    return (cookies().get("theme")?.value ?? "light") as Theme
  }

  return (
    <div className="bg-pattern">
      <Wrapper getTheme={getTheme} news={news} />

      {/* @ts-expect-error Async Server Component */}
      <Toggle getTheme={getTheme} />

      <Outro />
    </div>
  )
}

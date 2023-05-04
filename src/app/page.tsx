import { cookies } from "next/headers"

import { Outro } from "@/components/outro"
import { Toggle } from "@/components/toggle"
import { Wrapper } from "@/components/wrapper"
import { Theme } from "@/types/global"

async function getNews() {
  const res = await fetch("https://newsapi.org/v2/top-headlines?country=us", {
    headers: {
      "X-Api-Key": process.env.NEWS_API_KEY ?? "",
    },
  })

  if (!res.ok) throw new Error("Failed to fetch data")
  return res.json()
}

const Home = async () => {
  const theme = (cookies().get("theme")?.value ?? "light") as Theme

  const news = await getNews()

  return (
    <div className="bg-pattern">
      <Toggle theme={theme} />
      <Wrapper theme={theme} news={news} />
      <Outro />
    </div>
  )
}

export default Home

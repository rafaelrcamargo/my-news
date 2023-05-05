import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { Spinner } from "@/components/icons"
import { Outro } from "@/components/outro"
import { Toggle } from "@/components/toggle"
import { type Theme } from "@/types/global"

const Wrapper = dynamic(() => import("../components/wrapper"), {
  loading: () => <Spinner />
})

async function getNews() {
  const res = await fetch("https://newsapi.org/v2/top-headlines?country=us", {
    headers: {
      "X-Api-Key": process.env.NEWS_API_KEY ?? ""
    }
  })

  if (!res.ok) throw new Error("Failed to fetch data")
  return res.json()
}

export default async function Home() {
  const theme = (cookies().get("theme")?.value ?? "light") as Theme

  return (
    <>
      <Wrapper theme={theme} news={await getNews()} />
      <Toggle theme={theme} />
      <Outro />
    </>
  )
}

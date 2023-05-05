import { Outro } from "@/components/outro"
import { Toggle } from "@/components/toggle"
import { Wrapper } from "@/components/wrapper"

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

  return (
    <>
      <Toggle />
      <Wrapper news={news} />
      <Outro />
    </>
  )
}

import { type NewsAPIResponse } from "@/types"

// ? News API query for USA articles list
export const getNews = async () => {
  const res = await fetch("https://newsapi.org/v2/top-headlines?country=us", {
    headers: { "X-Api-Key": process.env.NEWS_API_KEY ?? "" },
    next: { revalidate: 60 * 60 }
  })

  if (!res.ok) throw Error("Failed to fetch NEWS from NEWS API")
  const body = await (res.json() as Promise<NewsAPIResponse>)

  return body.articles.map(article => ({
    source: article.source.name,
    author: article.author,
    title: article.title,
    url: article.url,
    image: article.urlToImage,
    publishedAt: article.publishedAt,
    content: article.content
  }))
}

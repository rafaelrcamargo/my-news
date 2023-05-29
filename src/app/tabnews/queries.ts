import lda from "lda"

import { PexelsAPIResponse, type TabNewsAPI } from "@/types"
import stopWords from "@/utils/stop-words"

const BASE_URL = "https://www.tabnews.com.br/api/v1/contents"

// ? TabNews API for (relevant) article list
export const getArticles = async () => {
  const { data, status } = await fetcher<TabNewsAPI["article"][]>(
    `${BASE_URL}?strategy=relevant`
  )

  const articles = await Promise.all(
    data.map(async article => {
      const { body, title, owner_username, slug } = await getDetails(
        article.owner_username,
        article.slug
      )

      const probablyAbout = lda([title], 1, title.length)[0][0].term
      const isRelevant = !stopWords.includes(probablyAbout)

      const image = await getImage(isRelevant ? probablyAbout : "abstract")
      const url = `https://www.tabnews.com.br/${owner_username}/${slug}`

      return {
        url,
        image,
        source: "TabNews",
        title: article.title,
        content: String(body),
        author: article.owner_username,
        publishedAt: article.published_at
      }
    })
  )

  return { status, articles }
}

// ? TabNews API for article content
const getDetails = async (owner_username: string, slug: string) =>
  (
    await fetcher<TabNewsAPI["article"]>(
      `${BASE_URL}/${owner_username}/${slug}`
    )
  ).data

// ? Pexels API for image representation
const getImage = async (topic: string) =>
  (
    await fetcher<PexelsAPIResponse>(
      `https://api.pexels.com/v1/search?query=${topic}&per_page=1`,
      { Authorization: process.env.PEXELS_API_KEY || "" }
    )
  ).data.photos[0]?.src.medium || null

// ? Local fetcher (Do not export)
const fetcher = async <T>(url: string, headers?: RequestInit["headers"]) => {
  const resp = await fetch(url, { next: { revalidate: 60 * 60 * 24 }, headers })

  return {
    status: resp.status,
    data: ((await resp.json()) || {}) as T
  }
}

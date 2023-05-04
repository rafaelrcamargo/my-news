export type Theme = "dark" | "light"

export interface News {
  status: string
  totalResults: number
  articles: Article[]
}

interface Article {
  source: Source
  author: string | null
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}

interface Source {
  id: string | null
  name: string
}

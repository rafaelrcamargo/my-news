type Maybe<T> = T | null

export interface News {
  status: string
  totalResults: number
  articles: Article[]
}

interface Article {
  source: Source
  author: Maybe<string>
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: Date
  content: string
}

interface Source {
  id: Maybe<string>
  name: string
}

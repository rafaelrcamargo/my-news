export interface Article {
  source: string
  author: string | null
  title: string
  url: string
  image: string | null
  publishedAt: Date
  content: string
}

export interface PexelsAPIResponse {
  photos: {
    src: {
      medium: string
    }
  }[]
}

export interface NewsAPIResponse {
  status: string
  totalResults: number
  articles: {
    source: { id: string | null; name: string }
    author: string | null
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: Date
    content: string
  }[]
}

export interface TabNewsAPI {
  article: TabNewsArticleAPIResponse
  relevant: TabNewsRelevantAPIResponse
}

interface TabNewsRelevantAPIResponse {
  status: number
  totalResults: number
  articles: TabNewsArticleAPIResponse[]
}

interface TabNewsArticleAPIResponse {
  id: string
  owner_id: string
  parent_id: null
  slug: string
  title: string
  body?: string
  status: "published" | "deleted"
  source_url: string | null
  created_at: Date
  updated_at: Date
  published_at: Date
  deleted_at: null
  tabcoins: number
  owner_username: string
  children_deep_count: number
}

export interface TabNewsRelevantAPIResponse {
  status: number
  totalResults: number
  articles: TabNewsArticleAPIResponse[]
}

export interface TabNewsArticleAPIResponse {
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

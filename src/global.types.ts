export type NewsSource = "newsapi" | "guardian" | "nyt";

export interface IArticle {
  id: string;
  source: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
  author?: string;
}

export interface IFetchArticlesResponse {
  articles: IArticle[];
  hasMore: boolean;
  nextPage?: number | string;
}

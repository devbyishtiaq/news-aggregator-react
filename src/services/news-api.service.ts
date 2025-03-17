import { IArticle, IFetchArticlesResponse } from "@/global.types";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
const BASE_URL = "https://newsapi.org/v2";

export const fetchNewsApiArticles = async (
  page = 1,
  pageSize = 10,
  category = "general",
  search = ""
): Promise<IFetchArticlesResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/top-headlines?country=us&search=${search}category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();

    const articles: IArticle[] = data?.articles?.map((article: any) => ({
      id: `newsapi-${article?.source.id || article?.source?.name}-${Date.parse(
        article?.publishedAt
      )}`,
      source: "NewsAPI",
      title: article?.title,
      description: article?.description || "",
      url: article?.url,
      urlToImage: article?.urlToImage || "",
      publishedAt: article?.publishedAt,
      content: article?.content,
      author: article?.author || "Unknown",
    }));

    return {
      articles,
      hasMore: page * pageSize < data.totalResults,
      nextPage: page + 1,
    };
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return { articles: [], hasMore: false };
  }
};

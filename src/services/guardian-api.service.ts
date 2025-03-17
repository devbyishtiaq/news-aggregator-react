import { IArticle, IFetchArticlesResponse } from "@/global.types";

const API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY || "";
const BASE_URL = " https://content.guardianapis.com/";

export const fetchGuardianArticles = async (
  page = 1,
  pageSize = 10,
  search = ""
): Promise<IFetchArticlesResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}search?section=news&search${search}&page=${page}&page-size=${pageSize}&show-elements=image&show-fields=all&api-key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Guardian API error: ${response.status}`);
    }

    const data = await response.json();
    const results = data.response.results;

    const articles: IArticle[] = results?.map((article: any) => ({
      id: `guardian-${article?.id}`,
      source: "The Guardian",
      title: article?.webTitle,
      description: article?.fields?.bodyText || "",
      url: article?.webUrl,
      urlToImage: article?.fields?.thumbnail || "",
      publishedAt: article?.webPublicationDate,
      content: article?.fields?.bodyText,
      author: article?.fields?.byline || "Unknown",
    }));

    return {
      articles,
      hasMore: page < data?.response?.pages,
      nextPage: page + 1,
    };
  } catch (error) {
    console.error("Error fetching from Guardian API:", error);
    return { articles: [], hasMore: false };
  }
};

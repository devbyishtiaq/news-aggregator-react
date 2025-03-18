import { IArticle, IFetchArticlesResponse } from "@/global.types";
import axiosInstance from "../utils/axios";
import { API_CONFIG } from "../utils/constants";

export interface IGuardianAPIResponse {
  response: {
    results: IGuardianArticle[];
    pages: number;
  };
}

export interface IGuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: {
    bodyText?: string;
    thumbnail?: string;
    byline?: string;
  };
}

export const fetchGuardianArticles = async (
  page = 1,
  pageSize = 10,
  search = ""
): Promise<IFetchArticlesResponse> => {
  const { BASE_URL, API_KEY } = API_CONFIG.GUARDIAN;
  const url = `${BASE_URL}search?section=news&q=${search}&page=${page}&page-size=${pageSize}&show-elements=image&show-fields=all&api-key=${API_KEY}`;

  try {
    const { data } = await axiosInstance.get<IGuardianAPIResponse>(url);

    const articles: IArticle[] = data.response.results.map((article) => ({
      id: `guardian-${article.id}`,
      source: "The Guardian",
      title: article.webTitle,
      description: article.fields?.bodyText || "",
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail || "",
      publishedAt: article.webPublicationDate,
      content: article.fields?.bodyText || "",
      author: article.fields?.byline || "Unknown",
    }));

    return {
      articles,
      hasMore: page < data.response.pages,
      nextPage: page + 1,
    };
  } catch (error) {
    console.error("Error fetching from Guardian API:", error);
    return { articles: [], hasMore: false };
  }
};

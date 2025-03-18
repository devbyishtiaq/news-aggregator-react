import { IArticle, IFetchArticlesResponse } from "@/global.types";
import axiosInstance from "../utils/axios";
import { API_CONFIG } from "../utils/constants";

export interface INYTAPIResponse {
  response: { docs: INYTArticle[] };
}

export interface INYTArticle {
  uri: string;
  snippet: string;
  abstract: string;
  web_url: string;
  pub_date: string;
  byline: { original: string };
  multimedia: { url: string }[];
}

export const fetchNYTArticles = async (
  page = 1,
  pageSize = 10,
  search = ""
): Promise<IFetchArticlesResponse> => {
  const { BASE_URL, API_KEY } = API_CONFIG.NYT;
  const url = `${BASE_URL}/search/v2/articlesearch.json?q=${search}&page=${page}&pageSize=${pageSize}&sort=oldest&api-key=${API_KEY}`;

  try {
    const { data } = await axiosInstance.get<INYTAPIResponse>(url);

    const startIndex = page * 10;
    const results: INYTArticle[] = data.response.docs.slice(
      startIndex,
      startIndex + 10
    );

    const articles: IArticle[] = results.map((article) => ({
      id: `nyt-${article.uri.split("/").pop()}`,
      source: "New York Times",
      title: article.snippet,
      description: article.abstract,
      url: article.web_url,
      urlToImage:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : "",
      publishedAt: article.pub_date,
      content: article.snippet,
      author: article.byline?.original.replace("By ", "") || "Unknown",
    }));

    return {
      articles,
      hasMore: startIndex + 10 < data.response.docs.length,
      nextPage: page + 1,
    };
  } catch (error) {
    console.error("Error fetching from NYT API:", error);
    return { articles: [], hasMore: false };
  }
};

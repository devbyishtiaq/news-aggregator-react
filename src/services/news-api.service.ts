import { EDateFormat, formatDate } from "../helpers/date-formatter";
import { IArticle, IFetchArticlesResponse } from "../global.types";
import axiosInstance from "../utils/axios";
import { API_CONFIG } from "../utils/constants";

export interface INewsAPIResponse {
  articles: INewsAPIArticle[];
  totalResults: number;
}

export interface INewsAPIArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

/**
 * fetchNewsApiArticles function fetches articles from the NewsAPI.
 *
 * It supports pagination, category filtering, search, and date filtering.
 *
 * @param page - The page number for pagination.
 * @param pageSize - The number of articles to fetch per page.
 * @param category - The category of articles to filter by.
 * @param search - The search term to filter articles by.
 * @param date - The date to filter articles by.
 * @returns A Promise that resolves to an IFetchArticlesResponse object.
 */

export const fetchNewsApiArticles = async (
  page = 1,
  pageSize = 10,
  category = "general",
  search = "",
  date = "" // Add date parameter
): Promise<IFetchArticlesResponse> => {
  const { BASE_URL, API_KEY } = API_CONFIG.NEWS_API;
  let url = `${BASE_URL}/top-headlines?country=us&q=${search}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

  if (date) {
    const formattedDate = formatDate(date, EDateFormat.ISO);
    url += `&from=${formattedDate}`;
  }

  try {
    const { data } = await axiosInstance.get<INewsAPIResponse>(url);

    const articles: IArticle[] = data.articles.map((article) => ({
      id: `newsapi-${article.source.id || article.source.name}-${Date.parse(
        article.publishedAt
      )}`,
      source: "News Api",
      title: article.title,
      description: article.description || "",
      url: article.url,
      urlToImage: article.urlToImage || "",
      publishedAt: article.publishedAt,
      content: article.content || "",
      author: article.author || "Unknown",
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

/**
 * Usage example:
 *
 * import { fetchNewsApiArticles } from './news-api.service';
 *
 * async function getArticles() {
 * const response = await fetchNewsApiArticles(1, 10, 'technology', 'example', '2023-10-26');
 * console.log(response.articles);
 * }
 */

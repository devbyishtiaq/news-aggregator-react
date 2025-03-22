import { EDateFormat, formatDate } from "../helpers/date-formatter";
import { IArticle, IFetchArticlesResponse } from "../global.types";
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

/**
 * fetchGuardianArticles function fetches articles from the Guardian API.
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

export const fetchGuardianArticles = async (
  page = 1,
  pageSize = 10,
  category = "",
  search = "",
  date = ""
): Promise<IFetchArticlesResponse> => {
  const { BASE_URL, API_KEY } = API_CONFIG.GUARDIAN;
  let url = `${BASE_URL}search?section=news&q=${search}&tag=${category}&page=${page}&page-size=${pageSize}&show-elements=image&show-fields=all&api-key=${API_KEY}`;

  if (date) {
    const formattedDate = formatDate(date, EDateFormat.ISO);
    url += `&from-date=${formattedDate}`;
  }

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

/**
 * Usage example:
 *
 * import { fetchGuardianArticles } from './guardian-api.service';
 *
 * async function getArticles() {
 * const response = await fetchGuardianArticles(1, 10, 'world', 'example', '2023-10-26');
 * console.log(response.articles);
 * }
 */

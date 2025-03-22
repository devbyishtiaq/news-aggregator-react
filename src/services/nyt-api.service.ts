import { IArticle, IFetchArticlesResponse } from "../global.types";
import { API_CONFIG } from "../utils/constants";
import axiosInstance from "../utils/axios";
import { EDateFormat, formatDate } from "../helpers/date-formatter";

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
  headline: { main: string };
}

/**
 * fetchNYTArticles function fetches articles from the New York Times API.
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

export const fetchNYTArticles = async (
  page = 1,
  pageSize = 10,
  category = "",
  search = "",
  date = ""
): Promise<IFetchArticlesResponse> => {
  const { BASE_URL, API_KEY } = API_CONFIG.NYT;

  const fq = category ? `&fq=news_desk:("${category}")` : "";

  let url = `${BASE_URL}/search/v2/articlesearch.json?q=${search}${fq}&page=${
    page - 1
  }&sort=oldest&fl=web_url,snippet,abstract,pub_date,byline,headline,multimedia,uri&api-key=${API_KEY}`;

  if (date) {
    const formattedDate = formatDate(date, EDateFormat.YYYYMMDD);
    url += `&begin_date=${formattedDate}`;
  }

  try {
    const { data } = await axiosInstance.get<INYTAPIResponse>(url);

    const articles: IArticle[] = data.response.docs.map((article) => ({
      id: `nyt-${article.uri?.split("/")?.pop()}`,
      source: "New York Times",
      title: article?.headline?.main || "No Title",
      description: article.abstract || article.snippet || "No Description",
      url: article.web_url,
      urlToImage:
        article.multimedia.length > 0
          ? `https://www.nytimes.com/${article.multimedia[0].url}`
          : "",
      publishedAt: article.pub_date,
      content: article.snippet || "",
      author: article.byline?.original?.replace("By ", "") || "Unknown",
    }));

    return {
      articles,
      hasMore: data.response.docs.length === pageSize,
      nextPage: page + 1,
    };
  } catch (error) {
    console.error("Error fetching from NYT API:", error);
    return { articles: [], hasMore: false };
  }
};

/**
 * Usage example:
 *
 * import { fetchNYTArticles } from './nyt-api.service';
 *
 * async function getArticles() {
 * const response = await fetchNYTArticles(1, 10, 'politics', 'example', '2023-10-26');
 * console.log(response.articles);
 * }
 */

import { IArticle, IFetchArticlesResponse } from "@/global.types";

const API_KEY = import.meta.env.VITE_NYT_API_KEY || "";
const BASE_URL = "https://api.nytimes.com/svc";

export const fetchNYTArticles = async (
  page = 1,
  pageSize = 10,
  search = ""
): Promise<IFetchArticlesResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/v2/articlesearch.json?q=${search}&page=${page}&pageSize=${pageSize}&sort=oldest&api-key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`NYT API error: ${response.status}`);
    }

    const data = await response.json();
    const startIndex = page * 10;
    const results = data?.response?.docs?.slice(startIndex, startIndex + 10);

    const articles: IArticle[] = results?.map((article: any) => ({
      id: `nyt-${article?.uri?.split("/")?.pop()}`,
      source: "New York Times",
      title: article?.snippet,
      description: article?.abstract,
      url: article?.url,
      urlToImage:
        `https://www.nytimes.com/${article?.multimedia?.[0]?.url}` || "",
      publishedAt: article?.pub_date,
      content: article?.snippet,
      author: article?.byline?.original?.replace("By ", "") || "Unknown",
    }));

    return {
      articles,
      hasMore: startIndex + 10 < data?.response?.docs.length,
      nextPage: page + 1,
    };
  } catch (error) {
    console.error("Error fetching from NYT API:", error);
    return { articles: [], hasMore: false };
  }
};

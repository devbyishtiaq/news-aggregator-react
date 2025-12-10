import axios, { AxiosError } from "axios";
import { IArticle } from "../global.types";
import { fetchGuardianArticles } from "../services/guardian-api.service";
import { fetchNewsApiArticles } from "../services/news-api.service";
import { fetchNYTArticles } from "../services/nyt-api.service";
import { useState, useEffect, useCallback } from "react";

interface UseArticlesProps {
  initialSources?: string[];
  initialPage?: number;
  pageSize?: number;
  category?: string;
  searchTerm?: string;
  date?: string;
}

const API_FETCHERS = {
  newsapi: fetchNewsApiArticles,
  guardian: fetchGuardianArticles,
  nyt: fetchNYTArticles,
};

/**
 * Custom hook to fetch and manage articles.
 *
 * This hook allows fetching articles from multiple sources like News API, Guardian, and New York Times.
 * It manages pagination, loading state, error state, and the fetched articles.
 *
 * @param initialSources - Array of sources from which to fetch the articles (default: all available sources).
 * @param initialPage - The page number to start fetching articles from (default: 1).
 * @param pageSize - The number of articles to fetch per page (default: 10).
 * @param category - The category of the articles (default: "general").
 * @param searchTerm - The search term to filter articles (default: empty string).
 * @param date - The date to filter articles (default: undefined).
 * @returns The hook returns articles, loading, error, hasMore (pagination), functions to fetch more articles, and refresh articles.
 */

export const useArticles = ({
  initialSources = ["newsapi", "guardian", "nyt"],
  initialPage = 1,
  pageSize = 10,
  category = "general",
  searchTerm = "",
  date,
}: UseArticlesProps = {}) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  /**
   * Fetch articles from the selected sources based on pagination and filter.
   *
   * @param reset - Boolean to indicate whether it's a fresh fetch or an append.
   */

  const fetchArticles = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);
      setError(null);

      try {
        const currentPage = reset ? 1 : page;
        let newArticles: IArticle[] = [];
        let moreArticles = false;

        const results = await Promise.allSettled(
          initialSources.map((source) => {
            const fetcher = API_FETCHERS[source as keyof typeof API_FETCHERS];
            return fetcher
              ? fetcher(currentPage, pageSize, category, searchTerm, date)
              : null;
          })
        );

        const validResults = results
          .map((result) => {
            if (result.status === "fulfilled" && result.value !== null) {
              return result.value;
            }
            return null;
          })
          .filter((res) => res !== null);

        newArticles = validResults.flatMap((res) => res!.articles);
        moreArticles = validResults.some((res) => res!.hasMore);

        setArticles((prev) =>
          reset ? newArticles : [...prev, ...newArticles]
        );
        setHasMore(moreArticles);
        if (moreArticles) {
          setPage(reset ? 2 : currentPage + 1);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const axiosError = err as AxiosError;
          if (axiosError.response) {
            setError(
              `API Error: ${axiosError.response.status} - ${axiosError.response.data}`
            );
          } else if (axiosError.message === "Network Error") {
            setError("Network Error: Please check your internet connection.");
          } else {
            setError(axiosError.message);
          }
        } else {
          setError(err instanceof Error ? err.message : "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
    [
      loading,
      hasMore,
      page,
      initialSources,
      category,
      pageSize,
      searchTerm,
      date,
    ]
  );

  // Function to refresh articles (reset articles and fetch again)
  const refreshArticles = useCallback(() => {
    setArticles([]);
    setHasMore(true);
    fetchArticles(true);
  }, [fetchArticles]);

  // Fetch articles initially when the source, category, or date changes
  useEffect(() => {
    fetchArticles(true);
  }, [initialSources, category, date]);

  return {
    articles,
    loading,
    error,
    hasMore,
    fetchMoreArticles: fetchArticles,
    refreshArticles,
  };
};

/**
 * Usage example:
 *
 * import { useArticles } from "@/api/useArticles";
 *
 * function NewsFeed() {
 *   // Use the hook to fetch articles with dynamic filters such as sources, category, search term, and date
 *   const {
 *     articles,
 *     loading,
 *     error,
 *     hasMore,
 *     fetchMoreArticles,
 *     refreshArticles
 *   } = useArticles({
 *     initialSources: ["newsapi", "nyt", "guardian"], // Array of selected sources
 *     category: "technology", // Selected category
 *     searchTerm: "react", // Search term
 *     date: "2025-03-01" // Optional filter for date (e.g., articles from March 1st, 2025)
 *   });
 *
 *   // Handle loading, error, and render articles
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error}</div>;
 *
 *   return (
 *     <div>
 *       <h2>Latest News</h2>
 *       <div>
 *         {articles.map((article) => (
 *           <div key={article.id}>
 *             <h3>{article.title}</h3>
 *             <p>{article.description}</p>
 *           </div>
 *         ))}
 *       </div>
 *       {hasMore && (
 *         <button onClick={() => fetchMoreArticles()}>Load More</button>
 *       )}
 *       <button onClick={refreshArticles}>Refresh</button>
 *     </div>
 *   );
 * }
 *

 */

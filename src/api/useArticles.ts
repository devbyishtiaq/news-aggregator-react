import { IArticle } from "@/global.types";
import { fetchGuardianArticles } from "../services/guardian-api.service";
import { fetchNewsApiArticles } from "../services/news-api.service";
import { fetchNYTArticles } from "../services/nyt-api.service";
import { useState, useEffect, useCallback } from "react";

type NewsSource = "newsapi" | "guardian" | "nyt" | "all";

interface UseArticlesProps {
  initialSource?: NewsSource;
  initialPage?: number;
  pageSize?: number;
  category?: string;
}

export const useArticles = ({
  initialSource = "all",
  initialPage = 1,
  pageSize = 10,
  category = "general",
}: UseArticlesProps = {}) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [source, setSource] = useState<NewsSource>(initialSource);

  const fetchArticles = useCallback(
    async (reset = false) => {
      if (loading || (!hasMore && !reset)) return;

      setLoading(true);
      setError(null);

      try {
        const currentPage = reset ? 1 : page;
        let newArticles: IArticle[] = [];
        let moreArticles = false;

        if (source === "newsapi" || source === "all") {
          const result = await fetchNewsApiArticles(
            currentPage,
            pageSize,
            category
          );
          newArticles = [...newArticles, ...result.articles];
          moreArticles = result.hasMore || moreArticles;
        }

        if (source === "guardian" || source === "all") {
          const result = await fetchGuardianArticles(
            currentPage,
            pageSize,
            category
          );
          newArticles = [...newArticles, ...result.articles];
          moreArticles = result.hasMore || moreArticles;
        }

        if (source === "nyt" || source === "all") {
          const result = await fetchNYTArticles(
            currentPage,
            pageSize,
            category
          );
          newArticles = [...newArticles, ...result.articles];
          moreArticles = result.hasMore || moreArticles;
        }

        // Sort articles by published date (newest first)
        newArticles.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        );

        setArticles((prev) =>
          reset ? newArticles : [...prev, ...newArticles]
        );
        setHasMore(moreArticles);

        if (!reset) {
          setPage(currentPage + 1);
        } else {
          setPage(2);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, page, source, category, pageSize]
  );

  const refreshArticles = useCallback(() => {
    setArticles([]);
    setHasMore(true);
    fetchArticles(true);
  }, [fetchArticles]);

  const changeSource = useCallback((newSource: NewsSource) => {
    setSource(newSource);
    setArticles([]);
    setHasMore(true);
    setPage(1);
  }, []);

  useEffect(() => {
    fetchArticles(true);
  }, [source, category]);

  return {
    articles,
    loading,
    error,
    hasMore,
    fetchMoreArticles: fetchArticles,
    refreshArticles,
    changeSource,
    currentSource: source,
  };
};

import React, { useRef, useCallback } from "react";
import { ErrorMessage, Spinner } from "../common";
import ArticleCard from "./article-card";
import { useArticles } from "../../api/useArticles";

interface NewsFeedProps {
  source?: "newsapi" | "guardian" | "nyt" | "all";
  category?: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({
  source = "all",
  category = "general",
}) => {
  const {
    articles,
    loading,
    error,
    hasMore,
    fetchMoreArticles,
    refreshArticles,
  } = useArticles({
    initialSource: source,
    category,
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastArticleRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchMoreArticles();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchMoreArticles]
  );

  const handleRefresh = () => {
    refreshArticles();
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center"
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      {articles.length === 0 && loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => {
            if (articles.length === index + 1) {
              return (
                <div ref={lastArticleRef} key={article.id + index}>
                  <ArticleCard article={article} />
                </div>
              );
            } else {
              return <ArticleCard key={article.id + index} article={article} />;
            }
          })}
        </div>
      )}

      {loading && articles.length > 0 && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {!loading && !hasMore && articles.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          No more articles to load
        </p>
      )}
    </div>
  );
};

export default NewsFeed;

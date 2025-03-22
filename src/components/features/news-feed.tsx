import React from "react";
import { useArticles } from "../../api/useArticles";
import { useUserPreferences } from "../../context/user-preferences-context";
import useInfiniteScroll from "../../hooks/use-infinite-scroll";
import { ErrorMessage, Spinner } from "../common";
import MainLayout from "../layouts/main-layout";
import ArticleList from "./article-list";

/**
 * NewsFeed component displays a list of articles based on user preferences.
 *
 * It fetches articles using the `useArticles` hook, handles infinite scrolling
 * with `useInfiniteScroll`, and displays loading indicators and error messages.
 *
 * @returns JSX.Element
 */

const NewsFeed: React.FC = () => {
  const { sources, category } = useUserPreferences();

  const {
    articles,
    loading,
    error,
    hasMore,
    fetchMoreArticles,
    refreshArticles,
  } = useArticles({ initialSources: sources, category: category });

  const lastArticleRef = useInfiniteScroll({
    onIntersect: fetchMoreArticles,
    hasMore,
    loading,
  });

  const handleRefresh = () => {
    refreshArticles();
  };

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRefresh} />;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
        </div>

        {articles.length === 0 && loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : articles?.length === 0 ? (
          <span className="text-red-500">No articles found!</span>
        ) : (
          <ArticleList articles={articles} lastElementRef={lastArticleRef} />
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
    </MainLayout>
  );
};

export default NewsFeed;

/**
 * Usage example:
 *
 * import NewsFeed from './NewsFeed';
 *
 * function App() {
 * return <NewsFeed />;
 * }
 */

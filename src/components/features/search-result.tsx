import React, { useState } from "react";
import { useArticles } from "../../api/useArticles";
import { useUserPreferences } from "../../context/user-preferences-context";
import type { NewsSource } from "../../global.types";
import useInfiniteScroll from "../../hooks/use-infinite-scroll";
import {
  CustomCheckbox,
  CustomDropdown,
  ErrorMessage,
  Spinner,
} from "../common";
import MainLayout from "../layouts/main-layout";
import ArticleList from "./article-list";
import { availableCategories, availableSources } from "../../utils/constants";
import { RefreshIcon } from "../../assets/icons";

interface Props {
  query: string;
}

/**
 * SearchResult component displays search results for articles based on a query and filters.
 *
 * It fetches articles using the `useArticles` hook, handles infinite scrolling,
 * and allows users to filter results by category, source, and date.
 *
 * @param query - The search query string.
 * @returns JSX.Element
 */

const SearchResult: React.FC<Props> = ({ query }) => {
  const { setCategory, sources: preferenceSources } = useUserPreferences();
  const [date, setDate] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("general");
  const [sourcesFilter, setSourcesFilter] =
    useState<NewsSource[]>(preferenceSources);

  const {
    articles,
    loading,
    error,
    hasMore,
    fetchMoreArticles,
    refreshArticles,
  } = useArticles({
    searchTerm: query,
    category: categoryFilter,
    initialSources: sourcesFilter,
    date: date,
  });

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
        <div className="flex justify-between items-center flex-wrap gap-1 mb-6">
          <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center"
            disabled={loading}
          >
            <RefreshIcon className="mr-1 w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {/* Category Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Category:</label>
            <CustomDropdown
              options={availableCategories}
              selectedValue={categoryFilter}
              onChange={(value) => {
                setCategoryFilter(value);
                setCategory(value);
              }}
            />
          </div>

          {/* Source Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Sources:</label>
            <div className="flex flex-wrap space-x-2">
              {availableSources.map((source) => (
                <CustomCheckbox<NewsSource>
                  key={source.value}
                  label={source.label}
                  value={source.value}
                  isChecked={sourcesFilter.includes(source.value)}
                  onChange={() => {
                    if (!sourcesFilter?.includes(source?.value)) {
                      setSourcesFilter([...sourcesFilter, source?.value]);
                    } else {
                      setSourcesFilter(
                        sourcesFilter?.filter((s) => s !== source.value)
                      );
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Date Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white border border-gray-300 px-3 py-1 cursor-pointer rounded shadow w-full text-left flex justify-between items-center"
            />
          </div>
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

export default SearchResult;

/**
 * Usage example:
 *
 * import SearchResult from './SearchResult';
 *
 * function App() {
 * return <SearchResult query="example" />;
 * }
 */

import { IArticle } from "../../global.types";
import React, { RefObject } from "react";
import ArticleCard from "./article-card";

interface Props {
  articles: IArticle[];
  lastElementRef: RefObject<HTMLDivElement | null>;
}

/**
 * ArticleList component renders a grid of ArticleCard components, displaying a list of articles.
 *
 * It handles the rendering of the last article in the list differently to attach a ref for infinite scroll.
 *
 * @param articles - An array of IArticle objects to display.
 * @param lastElementRef - A React ref object to attach to the last article's container for infinite scroll.
 * @returns JSX.Element
 */

const ArticleList: React.FC<Props> = ({ articles, lastElementRef }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => {
        if (articles.length === index + 1) {
          return (
            <div ref={lastElementRef} key={article.id + index}>
              <ArticleCard article={article} />
            </div>
          );
        } else {
          return <ArticleCard key={article.id + index} article={article} />;
        }
      })}
    </div>
  );
};

export default ArticleList;

/**
 * Usage example:
 *
 * import ArticleList from './ArticleList';
 * import { useRef } from 'react';
 *
 * function MyArticleListComponent({ articles, loadMore }) {
 * const lastArticleRef = useRef(null);
 *
 * useEffect(() => {
 * if (lastArticleRef.current) {
 * const observer = new IntersectionObserver((entries) => {
 * if (entries[0].isIntersecting) {
 * loadMore();
 * }
 * });
 * observer.observe(lastArticleRef.current);
 * return () => observer.disconnect();
 * }
 * }, [loadMore]);
 *
 * return <ArticleList articles={articles} lastElementRef={lastArticleRef} />;
 * }
 */

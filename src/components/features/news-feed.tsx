import React from "react";
import ArticleCard from "./article-card";
import type { IArticle } from "../../../global.types";

const NewsFeed: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Latest News</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => {
          if (articles.length === index + 1) {
            return (
              <div key={article.id + index}>
                <ArticleCard article={article} />
              </div>
            );
          } else {
            return <ArticleCard key={article.id + index} article={article} />;
          }
        })}
      </div>
    </div>
  );
};

export default NewsFeed;

const articles: IArticle[] = [
  {
    id: "1",
    title: "Breaking News: Market Hits Record Highs",
    description:
      "Stock markets reach new all-time highs amid economic optimism.",
    author: "John Doe",
    publishedAt: "2025-03-17T10:00:00Z",
    source: "Reuters",
    url: "https://example.com/article1",
    urlToImage: "https://placehold.co/600x400?text=Market+Highs",
  },
  {
    id: "2",
    title: "Tech Giants Announce Major Innovations",
    description: "New AI advancements promise to reshape the industry.",
    author: "Jane Smith",
    publishedAt: "2025-03-17T12:30:00Z",
    source: "TechCrunch",
    url: "https://example.com/article2",
    urlToImage: "https://placehold.co/600x400?text=Tech+Innovations",
  },
  {
    id: "3",
    title: "Sports Championship Ends in Dramatic Fashion",
    description: "An unforgettable final match concludes the season.",
    author: "Mike Johnson",
    publishedAt: "2025-03-16T18:45:00Z",
    source: "ESPN",
    url: "https://example.com/article3",
    urlToImage: "https://placehold.co/600x400?text=Sports+Finale",
  },
  {
    id: "4",
    title: "New Climate Policies Take Effect Worldwide",
    description:
      "Governments implement new regulations to combat climate change.",
    author: "Emily Davis",
    publishedAt: "2025-03-15T09:20:00Z",
    source: "BBC News",
    url: "https://example.com/article4",
    urlToImage: "https://placehold.co/600x400?text=Climate+Policies",
  },
  {
    id: "5",
    title: "Health Experts Advise on Seasonal Allergies",
    description: "Tips to manage allergies as pollen levels rise.",
    author: "Dr. Sarah Wilson",
    publishedAt: "2025-03-14T14:10:00Z",
    source: "HealthLine",
    url: "https://example.com/article5",
    urlToImage: "https://placehold.co/600x400?text=Allergy+Season",
  },
];

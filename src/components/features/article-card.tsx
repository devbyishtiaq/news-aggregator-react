import type { IArticle } from "../../../global.types";

interface ArticleCardProps {
  article: IArticle;
}

const DEFAULT_IMAGE = "https://placehold.co/600x400?text=No+Image";

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={article.urlToImage || DEFAULT_IMAGE}
          alt={article.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {article.source}
          </span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        {article.author && (
          <p className="text-gray-500 text-xs mb-3">By {article.author}</p>
        )}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
        >
          Read full article →
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;

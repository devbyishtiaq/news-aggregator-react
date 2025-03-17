import React, { useState } from "react";
import { Footer, Header } from "./components/common";
import { NewsFeed } from "./components/features";

const App: React.FC = () => {
  const [source, setSource] = useState<"newsapi" | "guardian" | "nyt" | "all">(
    "all"
  );
  const [category, setCategory] = useState("general");

  const handleSourceChange = (
    newSource: "newsapi" | "guardian" | "nyt" | "all"
  ) => {
    setSource(newSource);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        onSourceChange={handleSourceChange}
        onCategoryChange={handleCategoryChange}
        currentSource={source}
        currentCategory={category}
      />

      <main className="flex-grow">
        <NewsFeed source={source} category={category} />
      </main>
      <Footer />
    </div>
  );
};

export default App;

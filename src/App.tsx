import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsFeedPage from "./pages/news-feed-page";
import SearchResultPage from "./pages/search-result-page";
import { ErrorBoundary } from "./components/common";
import NotFoundPage from "./pages/not-found-page";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/search/:query" element={<SearchResultPage />} />
          <Route path="/newsfeed" element={<NewsFeedPage />} />
          <Route path="/" element={<NewsFeedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

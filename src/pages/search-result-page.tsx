import { SearchResult } from "../components/features";
import React from "react";
import { useParams } from "react-router-dom";

const SearchResultPage: React.FC = () => {
  const { query = "" } = useParams();
  return <SearchResult query={query} />;
};

export default SearchResultPage;

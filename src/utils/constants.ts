import type { NewsSource } from "../global.types";

export const API_CONFIG = {
  GUARDIAN: {
    BASE_URL: "https://content.guardianapis.com/",
    API_KEY: import.meta.env.VITE_GUARDIAN_API_KEY || "",
  },
  NEWS_API: {
    BASE_URL: "https://newsapi.org/v2",
    API_KEY: import.meta.env.VITE_NEWS_API_KEY || "",
  },
  NYT: {
    BASE_URL: "https://api.nytimes.com/svc",
    API_KEY: import.meta.env.VITE_NYT_API_KEY || "",
  },
};

export const availableSources = [
  { value: "newsapi", label: "News API" },
  { value: "guardian", label: "The Guardian" },
  { value: "nyt", label: "New York Times" },
] as { value: NewsSource; label: string }[];

export const availableCategories = [
  { value: "general", label: "General" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
];

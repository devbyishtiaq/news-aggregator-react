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

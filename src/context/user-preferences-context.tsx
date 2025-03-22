import type { NewsSource } from "@/global.types";
import useStorage from "../utils/useStorage.util";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserPreferencesContextProps {
  sources: NewsSource[];
  category: string;
  authors: string[];
  setSources: (sources: NewsSource[]) => void;
  setCategory: (category: string) => void;
  setAuthors: (authors: string[]) => void;
}

const UserPreferencesContext = createContext<
  UserPreferencesContextProps | undefined
>(undefined);

interface UserPreferencesProviderProps {
  children: ReactNode;
}

export const UserPreferencesProvider: React.FC<
  UserPreferencesProviderProps
> = ({ children }) => {
  const [sources, setSources] = useState<NewsSource[]>(
    useStorage.getItem<NewsSource[]>("userSources") || [
      "newsapi",
      "guardian",
      "nyt",
    ]
  );
  const [authors, setAuthors] = useState<string[]>(
    useStorage.getItem<string[]>("userAuthors") || []
  );
  const [category, setCategory] = useState<string>(
    useStorage.getItem<string>("userCategory") || "general"
  );

  useEffect(() => {
    useStorage.setItem("userSources", sources);
  }, [sources]);

  useEffect(() => {
    useStorage.setItem("userAuthors", authors);
  }, [authors]);

  useEffect(() => {
    useStorage.setItem("userCategory", category);
  }, [category]);

  console.log({ sources });

  return (
    <UserPreferencesContext.Provider
      value={{
        sources,
        category,
        authors,
        setSources,
        setCategory,
        setAuthors,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = (): UserPreferencesContextProps => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider"
    );
  }
  return context;
};

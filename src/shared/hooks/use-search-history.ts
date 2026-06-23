import { useCallback, useState } from "react";

import {
  addSearchQuery,
  clearSearchHistory,
  getSearchHistory,
  removeSearchQuery,
} from "../lib";

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>(() => getSearchHistory());

  const addQuery = useCallback((query: string) => {
    if (!query.trim()) return;

    addSearchQuery(query);
    setHistory(getSearchHistory());
  }, []);

  const clearHistory = useCallback(() => {
    clearSearchHistory();
    setHistory([]);
  }, []);

  const removeQuery = useCallback((query: string) => {
    removeSearchQuery(query);
    setHistory(getSearchHistory());
  }, []);

  return { history, addQuery, clearHistory, removeQuery };
};

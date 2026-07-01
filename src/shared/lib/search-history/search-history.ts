import { MAX_ITEMS_HISTORY, SEARCH_SUGGESTION_HISTORY } from "../../config";

export const getSearchHistory = (): string[] => {
  try {
    const stored = localStorage.getItem(SEARCH_SUGGESTION_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addSearchQuery = (query: string) => {
  if (!query.trim()) return;

  const history = getSearchHistory();
  const filtered = history.filter((item) => item !== query);
  const updated = [query, ...filtered].slice(0, MAX_ITEMS_HISTORY);
  localStorage.setItem(SEARCH_SUGGESTION_HISTORY, JSON.stringify(updated));
};

export const clearSearchHistory = () => {
  localStorage.removeItem(SEARCH_SUGGESTION_HISTORY);
};

export const removeSearchQuery = (query: string) => {
  const history = getSearchHistory();
  const updated = history.filter((item) => item !== query);
  localStorage.setItem(SEARCH_SUGGESTION_HISTORY, JSON.stringify(updated));
};

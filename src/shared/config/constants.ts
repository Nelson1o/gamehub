import type { Option } from "../types";

export const PAGE_SIZE = 20;

export const SORT_OPTIONS: Option[] = [
  { value: "-rating", label: "По рейтингу (высший)" },
  { value: "rating", label: "По рейтингу (низший)" },
  { value: "-released", label: "По дате (новые)" },
  { value: "released", label: "По дате (старые)" },
  { value: "-added", label: "По популярности" },
  { value: "name", label: "По названию (А-Я)" },
  { value: "-name", label: "По названию (Я-А)" },
] as const;

export const SEARCH_SUGGESTION_HISTORY = "searchSuggestionHistory";
export const MAX_ITEMS_HISTORY = 5;

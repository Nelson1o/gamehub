import { useInfiniteQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";
import type {
  Game,
  GamesResponse,
  SearchFilters,
  SelectData,
} from "@/shared/types";

export const useInfiniteSearchGames = (
  query: string,
  filters: SearchFilters
) => {
  const platforms = filters.platforms?.length
    ? filters.platforms.join(",")
    : undefined;
  const genres = filters.genres?.length ? filters.genres.join(",") : undefined;
  const metacritic = filters.metacritic
    ? `${filters.metacritic},100`
    : undefined;

  return useInfiniteQuery<
    GamesResponse<Game>,
    Error,
    SelectData,
    [string, string, string, SearchFilters],
    number
  >({
    queryKey: ["games", "search", query, filters],
    queryFn: ({ pageParam = 1 }) =>
      gamesApi.searchGames(query, pageParam, {
        genres,
        platforms,
        metacritic,
      }),
    select: (data) => ({
      totalCount: data.pages[0]?.count ?? 0,
      allGames: data.pages.flatMap((page) => page.results) ?? [],
    }),
    enabled: query.length >= 2,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");

      return page ? parseInt(page) : undefined;
    },
  });
};

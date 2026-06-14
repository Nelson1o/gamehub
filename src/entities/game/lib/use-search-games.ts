import { useInfiniteQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";
import type { Game, GamesResponse, SelectData } from "@/shared/types";

export const useInfiniteSearchGames = (query: string) => {
  return useInfiniteQuery<
    GamesResponse<Game>,
    Error,
    SelectData,
    [string, string, string],
    number
  >({
    queryKey: ["games", "search", query],
    queryFn: ({ pageParam = 1 }) => gamesApi.searchGames(query, pageParam),
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

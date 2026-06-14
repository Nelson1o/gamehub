import { useInfiniteQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";
import type { Game, GamesResponse } from "@/shared/types";

export const useInfiniteGameSeries = (id: number) => {
  return useInfiniteQuery<
    GamesResponse<Game>,
    Error,
    Game[],
    [string, number, string],
    number
  >({
    queryKey: ["game", id, "series"],
    queryFn: ({ pageParam = 1 }) => gamesApi.getGameSeriesById(id, pageParam),
    enabled: !!id,
    select: (data) => data.pages.flatMap((page) => page.results ?? []),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      const url = new URL(lastPage.next);
      const page = url.searchParams.get("page");

      return page ? parseInt(page) : undefined;
    },
  });
};

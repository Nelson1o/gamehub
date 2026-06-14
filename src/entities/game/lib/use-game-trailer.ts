import { useQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";

export const useGameTrailer = (id: number) => {
  return useQuery({
    queryKey: ["game", id, "trailer"],
    queryFn: () => gamesApi.getGameTrailersById(id),
    enabled: !!id,
  });
};

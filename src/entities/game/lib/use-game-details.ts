import { useQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";

export const useGameDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["game", id],
    queryFn: () => gamesApi.getGameById(Number(id)),
    enabled: !!id && !isNaN(Number(id)),
  });
};

import { useQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";

export const useGameScreenshots = (id: number) => {
  return useQuery({
    queryKey: ["game", id, "screenshots"],
    queryFn: () => gamesApi.getGameScreenshotsById(id),
    enabled: !!id,
  });
};

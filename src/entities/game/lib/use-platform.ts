import { useQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";

export const usePlatform = () => {
  return useQuery({
    queryKey: ["platform"],
    queryFn: gamesApi.getPlatforms,
    select: (data) => data.results,
  });
};

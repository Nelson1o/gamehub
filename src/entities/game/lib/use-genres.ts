import { useQuery } from "@tanstack/react-query";

import { gamesApi } from "@/shared/api/games-api";

export const useGenres = () => {
  return useQuery({
    queryKey: ["genres"],
    queryFn: gamesApi.getGenres,
    select: (data) => data.results,
  });
};

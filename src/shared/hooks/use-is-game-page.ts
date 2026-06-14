import { useLocation } from "react-router";

export const useIsGamePage = () => {
  const location = useLocation();

  return (
    location.pathname.startsWith("/games/") && location.pathname !== "/games"
  );
};

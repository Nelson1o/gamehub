import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { GamePage } from "@/pages/game";
import { GamesPage } from "@/pages/games-page";
import { SearchPage } from "@/pages/search-page";
import { ROUTES } from "@/shared/config";

import { Layout } from "../layout";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate replace to={ROUTES.GAMES} />,
      },
      {
        path: ROUTES.GAMES,
        element: <GamesPage />,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
      },
      {
        path: ROUTES.GAMES_DETAILS,
        element: <GamePage />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <div>FAVORITES</div>,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

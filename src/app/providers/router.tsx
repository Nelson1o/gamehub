import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import { FavoritesPage } from "@/pages/favorites";
import { GamePage } from "@/pages/game";
import { GamesPage } from "@/pages/games";
import { RandomPage } from "@/pages/random";
import { SearchPage } from "@/pages/search";
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
        element: <FavoritesPage />,
      },
      {
        path: ROUTES.RANDOM,
        element: <RandomPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

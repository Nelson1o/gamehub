import { createBrowserRouter, RouterProvider } from "react-router";

import { GamePage } from "@/pages/game";
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
        element: <div>HOME PAGE</div>,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
      },
      {
        path: ROUTES.GAMES,
        element: <div>GAMES</div>,
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

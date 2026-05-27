import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

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
        element: <div>321321</div>,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

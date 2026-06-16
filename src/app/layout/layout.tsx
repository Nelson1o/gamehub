import { Outlet, ScrollRestoration } from "react-router";

import { ScrollToTop } from "@/shared/ui";
import { Header } from "@/widgets/header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <main>
          <Outlet />
          <ScrollToTop />
        </main>
      </div>
      <ScrollRestoration />
    </div>
  );
};

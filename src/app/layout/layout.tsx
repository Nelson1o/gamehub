import { Outlet } from "react-router";

import { Header } from "@/widgets/header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

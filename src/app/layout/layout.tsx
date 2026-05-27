import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <div className="container">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

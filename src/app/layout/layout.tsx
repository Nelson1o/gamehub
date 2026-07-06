import { Outlet, ScrollRestoration } from "react-router";

import { ScrollToTop } from "@/shared/ui";
import { Header } from "@/widgets/header";

import styles from "./styles.module.scss";

export const Layout = () => {
  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        Перейти к основному контенту
      </a>
      <Header />

      <div className="container">
        <main id="main-content">
          <Outlet />
        </main>
      </div>

      <ScrollToTop />
      <ScrollRestoration />
    </>
  );
};

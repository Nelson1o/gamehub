import { Link } from "react-router";

import { NavLinks } from "@/features/navigation";
import { SearchInput } from "@/features/search";
import { ROUTES } from "@/shared/config";
import { useIsGamePage } from "@/shared/hooks";

import styles from "./styles.module.scss";

export const Header = () => {
  const isGamePage = useIsGamePage();

  return (
    <header className={`${styles.header} ${isGamePage && styles.transparent}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h1 className={styles.logo}>
              <Link to={ROUTES.HOME}>GameHub</Link>
            </h1>

            <NavLinks />
          </div>

          <SearchInput />
        </div>
      </div>
    </header>
  );
};

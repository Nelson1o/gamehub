import { Link } from "react-router";

import { NavLinks } from "@/features/navigation";
import { SearchInput } from "@/features/search";
import { ROUTES } from "@/shared/config";

import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
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

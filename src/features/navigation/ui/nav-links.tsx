import { NavLink } from "react-router";

import { LINKS } from "@/shared/config/routes";

import styles from "./styles.module.scss";

export const NavLinks = () => (
  <nav>
    <ul className={styles.list}>
      {LINKS.map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

import { useLocation } from "react-router";

import { useTheme } from "@/shared/hooks";

import styles from "./styles.module.scss";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isGamePage =
    location.pathname.startsWith("/games/") && location.pathname !== "/games";

  if (isGamePage) return null;

  return (
    <button
      className={styles.button}
      onClick={toggleTheme}
      aria-label="Переключить тему"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

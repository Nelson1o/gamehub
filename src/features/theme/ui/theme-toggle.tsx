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
      aria-label="Переключить тему"
      aria-pressed={theme === "dark"}
      className={styles.button}
      onClick={toggleTheme}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { FilterButton } from "@/features/filter";
import { NavLinks } from "@/features/navigation";
import { SearchFilters, SearchInput } from "@/features/search";
import { ThemeToggle } from "@/features/theme";
import { ROUTES } from "@/shared/config";
import { useIsGamePage } from "@/shared/hooks";
import type { SearchFilters as SearchFiltersType } from "@/shared/types";

import styles from "./styles.module.scss";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isGamePage = useIsGamePage();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleApplyFilters = (filters: SearchFiltersType) => {
    const params = new URLSearchParams(location.search);

    if (filters.platforms.length) {
      params.set("platforms", filters.platforms.join(","));
    } else {
      params.delete("platforms");
    }

    if (filters.genres.length) {
      params.set("genres", filters.genres.join(","));
    } else {
      params.delete("genres");
    }

    if (filters.metacritic) {
      params.set("metacritic", String(filters.metacritic));
    } else {
      params.delete("metacritic");
    }

    navigate(`${ROUTES.SEARCH}?${params.toString()}`);
    setIsFiltersOpen(false);
  };

  const getCurrentFilters = () => {
    const params = new URLSearchParams(location.search);
    const platforms =
      params.get("platforms")?.split(",").map(Number).filter(Boolean) || [];
    const genres =
      params.get("genres")?.split(",").map(Number).filter(Boolean) || [];
    const metacritic = params.get("metacritic")
      ? Number(params.get("metacritic"))
      : undefined;
    return { platforms, genres, metacritic };
  };

  return (
    <header className={`${styles.header} ${isGamePage && styles.transparent}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <Link
                to={ROUTES.HOME}
                className={styles.logo}
                aria-label="GameHub — на главную"
              >
                <span aria-hidden="true">GameHub</span>
              </Link>
            </div>

            <NavLinks />
          </div>

          <div className={styles.right}>
            <FilterButton
              aria-expanded={isFiltersOpen}
              aria-controls="search-filters-panel"
              toggleOpenFilter={() => setIsFiltersOpen((prev) => !prev)}
            />

            <form role="search">
              <SearchInput />
            </form>

            <ThemeToggle />
          </div>
        </div>

        {isFiltersOpen && (
          <SearchFilters
            onApply={handleApplyFilters}
            isOpen={isFiltersOpen}
            onClose={() => setIsFiltersOpen(false)}
            initialPlatforms={getCurrentFilters().platforms}
            initialGenres={getCurrentFilters().genres}
            initialMetacritic={getCurrentFilters().metacritic}
          />
        )}
      </div>
    </header>
  );
};

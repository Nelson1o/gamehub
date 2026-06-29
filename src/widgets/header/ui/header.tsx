import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { NavLinks } from "@/features/navigation";
import { SearchFilters, SearchInput } from "@/features/search";
import FilterIcon from "@/shared/assets/icons/filter.svg";
import { ROUTES } from "@/shared/config";
import { useIsGamePage } from "@/shared/hooks";
import type { SearchFilters as SearchFiltersType } from "@/shared/types";

import styles from "./styles.module.scss";

export const Header = () => {
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
            <h1 className={styles.logo}>
              <Link to={ROUTES.HOME}>GameHub</Link>
            </h1>

            <NavLinks />
          </div>

          <div className={styles.right}>
            <button
              className={styles.filterButton}
              onClick={() => setIsFiltersOpen((prev) => !prev)}
            >
              <img
                src={FilterIcon}
                alt="filter icon"
                className={styles.filter}
                width={25}
                height={25}
              />
            </button>
            <SearchInput />
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

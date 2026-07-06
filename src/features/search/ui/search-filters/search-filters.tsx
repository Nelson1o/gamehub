import { useEffect, useState } from "react";

import { useGenres, usePlatform } from "@/entities/game";
import type { SearchFilters as SearchFiltersType } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: SearchFiltersType) => void;
  initialPlatforms?: number[];
  initialGenres?: number[];
  initialMetacritic?: number;
};

export const SearchFilters = ({
  isOpen,
  onClose,
  onApply,
  initialGenres = [],
  initialPlatforms = [],
  initialMetacritic,
}: Props) => {
  const { data: platforms, isPending: platformsLoading } = usePlatform();
  const { data: genres, isPending: genresLoading } = useGenres();

  const [selectedPlatforms, setSelectedPlatforms] =
    useState<number[]>(initialPlatforms);
  const [selectedGenres, setSelectedGenres] = useState<number[]>(initialGenres);
  const [metacriticMin, setMetacriticMin] = useState<number | undefined>(
    initialMetacritic
  );

  const handleClose = () => {
    onClose();
  };

  const handlePlatformToggle = (id: number) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleGenreToggle = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApply({
      platforms: selectedPlatforms,
      genres: selectedGenres,
      metacritic: metacriticMin,
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedPlatforms([]);
    setSelectedGenres([]);
    setMetacriticMin(undefined);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="filters-heading"
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 id="filters-heading">Фильтры</h3>
          <button
            aria-label="Закрыть фильтры"
            className={styles.close}
            onClick={handleClose}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.group}>
            <label className={styles.groupLabel}>Платформы</label>
            {platformsLoading ? (
              <div className={styles.loader}>
                <div
                  aria-label="Загрузка доступных платформ"
                  className={styles.spinner}
                ></div>
              </div>
            ) : (
              <div className={styles.chips}>
                {platforms?.map((p) => (
                  <button
                    key={p.id}
                    aria-pressed={selectedPlatforms.includes(p.id)}
                    className={`${styles.chip} ${selectedPlatforms.includes(p.id) ? styles.active : ""}`}
                    onClick={() => handlePlatformToggle(p.id)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.group}>
            <label className={styles.groupLabel}>Жанры</label>
            {genresLoading ? (
              <div className={styles.loader}>
                <div
                  aria-label="Загрузка доступных жанров"
                  className={styles.spinner}
                ></div>
              </div>
            ) : (
              <div className={styles.chips}>
                {genres?.map((g) => (
                  <button
                    key={g.id}
                    aria-pressed={selectedPlatforms.includes(g.id)}
                    className={`${styles.chip} ${selectedGenres.includes(g.id) ? styles.active : ""}`}
                    onClick={() => handleGenreToggle(g.id)}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.group}>
            <label htmlFor="metacritic-input" className={styles.groupLabel}>
              Metacritic (от)
            </label>
            <input
              onChange={(e) =>
                setMetacriticMin(Number(e.target.value) || undefined)
              }
              id="metacritic-input"
              aria-label="Минимальный рейтинг Metacritic"
              type="text"
              className={styles.rangeInput}
              value={metacriticMin || ""}
              placeholder="Например: 80"
              min={0}
              max={100}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={handleReset} className={styles.reset}>
            Сбросить
          </button>
          <button className={styles.apply} onClick={handleApply}>
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

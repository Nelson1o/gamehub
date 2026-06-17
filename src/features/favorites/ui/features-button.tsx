import type { MouseEvent } from "react";

import { useFavorites } from "@/shared/store";
import type { Game } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = {
  game: Game;
  className?: string;
};

export const FavoriteButton = ({ game, className }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(game.id);

  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(game);
  };

  return (
    <button
      className={`${styles.button} ${isFav ? styles.active : ""} ${className || ""}`}
      onClick={handleFavoriteClick}
    >
      <svg viewBox="0 0 24 24" className={styles.icon}>
        <path d="M12 21s-6.716-4.534-9.192-7.01C.63 11.813.63 8.687 2.808 6.51 4.985 4.333 8.11 4.333 10.288 6.51L12 8.222l1.712-1.712c2.178-2.177 5.303-2.177 7.48 0 2.178 2.177 2.178 5.303 0 7.48C18.716 16.466 12 21 12 21z" />
      </svg>
    </button>
  );
};

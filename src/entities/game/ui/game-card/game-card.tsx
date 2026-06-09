import { memo } from "react";

import { GameImageSlider } from "@/features/game-slider";
import { formatDate } from "@/shared/lib";
import type { Game } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = {
  game: Game;
};

export const GameCard = memo(({ game }: Props) => {
  const { name, background_image, rating, released, short_screenshots } = game;

  return (
    <div className={styles.card}>
      <GameImageSlider
        alt={name}
        image={background_image}
        screenshots={short_screenshots || []}
      />
      <div className={styles.content}>
        <h3>{name}</h3>
        <div className={styles.footer}>
          <span className={styles.rating}>⭐ {rating.toFixed(1)}</span>
          <span className={styles.date}>{formatDate(released)}</span>
        </div>
      </div>
    </div>
  );
});

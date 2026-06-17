import { memo } from "react";
import { Link } from "react-router";

import { FavoriteButton } from "@/features/favorites";
import { GameImageSlider } from "@/features/game-slider";
import { ROUTES } from "@/shared/config";
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
      <FavoriteButton game={game} />
      <Link
        to={ROUTES.GAMES_DETAILS.replace(":id", String(game.id))}
        className={styles.link}
      >
        <div className={styles.content}>
          <h3>{name}</h3>
          <div className={styles.footer}>
            <span className={styles.rating}>⭐ {rating.toFixed(1)}</span>
            <span className={styles.date}>{formatDate(released)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
});

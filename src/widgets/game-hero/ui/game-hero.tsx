import { formatDate } from "@/shared/lib";
import type { GameDetails } from "@/shared/types";
import { PlatformIcons } from "@/shared/ui/platform-icons";

import styles from "./styles.module.scss";

type Props = {
  game: GameDetails;
};

export const GameHero = ({ game }: Props) => (
  <div className={styles.hero}>
    <h1 className={styles.title}>{game.name}</h1>
    <div className={styles.meta}>
      {game.metacritic > 0 && (
        <span className={styles.metacritic}>
          {game.metacritic_url ? (
            <a
              href={game.metacritic_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.metacriticLink}
            >
              Metacritic: {game.metacritic}
            </a>
          ) : (
            <>Metacritic: {game.metacritic}</>
          )}
        </span>
      )}
      <span className={styles.rating}>⭐ {game.rating.toFixed(1)}</span>
      <span className={styles.released}>{formatDate(game.released)}</span>
      <PlatformIcons parent_platforms={game.parent_platforms} />
    </div>
  </div>
);

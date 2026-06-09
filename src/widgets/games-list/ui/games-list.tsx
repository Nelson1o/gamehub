import { GameCard } from "@/entities/game";
import type { Game } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = {
  games: Game[];
};

export const GamesList = ({ games }: Props) => {
  return (
    <div className={styles.grid}>
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

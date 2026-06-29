import { GameCard, useRandomGame } from "@/entities/game";
import { usePageTitle } from "@/shared/hooks";

import styles from "./styles.module.scss";

export const RandomPage = () => {
  usePageTitle("Случайная игра");
  const { data, isFetching, error, refetch } = useRandomGame();

  const handleRandomGame = () => {
    refetch();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Случайная игра</h1>
      </div>

      <button
        className={styles.button}
        onClick={handleRandomGame}
        disabled={isFetching}
      >
        {isFetching ? "Поиск" : "Случайная игра"}
      </button>

      {error && (
        <p className={styles.error}>
          Не удалось загрузить игру. Попробуйте снова.
        </p>
      )}

      {data && (
        <div className={styles.card}>
          <GameCard game={data} />
        </div>
      )}
    </div>
  );
};

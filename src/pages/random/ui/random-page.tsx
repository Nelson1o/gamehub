import { GameCard, useRandomGame } from "@/entities/game";
import { usePageTitle } from "@/shared/hooks";

import styles from "./styles.module.scss";

export const RandomPage = () => {
  usePageTitle("Случайная игра");
  const { data, isFetching, error, refetch } = useRandomGame();

  const handleRandomGame = () => {
    refetch();
  };

  if (error) {
    return (
      <p className={styles.error} role="alert">
        Не удалось загрузить игру. Попробуйте снова.
      </p>
    );
  }

  return (
    <section className={styles.wrapper} aria-labelledby="random-heading">
      <div className={styles.header}>
        <h1 id="random-heading" className={styles.title}>
          Случайная игра
        </h1>
      </div>

      <button
        className={styles.button}
        onClick={handleRandomGame}
        disabled={isFetching}
        aria-busy={isFetching}
      >
        {isFetching ? "Ищем..." : "Случайная игра"}
      </button>

      {data && (
        <div className={styles.card}>
          <GameCard game={data} />
        </div>
      )}
    </section>
  );
};

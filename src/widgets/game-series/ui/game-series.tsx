import { useInfiniteGameSeries } from "@/entities/game";
import { GamesList } from "@/widgets/games-list";

import styles from "./styles.module.scss";

type Props = {
  gameId: number;
};

export const GameSeries = ({ gameId }: Props) => {
  const {
    data: seriesGames,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGameSeries(gameId);

  if (isPending || !seriesGames || seriesGames?.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Игры серии</h2>
      <GamesList games={seriesGames} />

      {hasNextPage && (
        <footer className={styles.loadMore}>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.loadMoreButton}
            aria-busy={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Загрузка..." : "Загрузить ещё"}
          </button>
        </footer>
      )}
    </section>
  );
};

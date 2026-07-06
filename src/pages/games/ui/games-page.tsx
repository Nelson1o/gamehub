import { useInfinitePopularGames } from "@/entities/game";
import { SORT_OPTIONS } from "@/shared/config";
import { useInfiniteScroll, useSortParams } from "@/shared/hooks";
import {
  DropDown,
  EmptyState,
  ErrorFallback,
  SearchHeader,
  SkeletonGrid,
} from "@/shared/ui";
import { GamesList } from "@/widgets/games-list";

import styles from "./styles.module.scss";

export const GamesPage = () => {
  const { sortType, setSortType } = useSortParams("-rating");

  const {
    data: games,
    isPending,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePopularGames(sortType);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isPending) {
    return <SkeletonGrid count={20} columns={4} />;
  }

  if (error) {
    return <ErrorFallback center error={error} onRetry={refetch} />;
  }

  if (!games || games.allGames.length === 0) {
    return <EmptyState hint />;
  }

  return (
    <section className={styles.wrapper} aria-labelledby="games-heading">
      <SearchHeader count={games.totalCount} />
      <div className={styles.sortContainer}>
        <DropDown
          options={SORT_OPTIONS}
          value={sortType}
          onChange={setSortType}
        />
      </div>

      <GamesList games={games.allGames} />

      {hasNextPage && (
        <div ref={loadMoreRef} className={styles.loadMore}>
          {isFetchingNextPage && (
            <div
              className={styles.spinner}
              role="status"
              aria-label="Загрузка дополнительных игр"
            />
          )}
        </div>
      )}
    </section>
  );
};

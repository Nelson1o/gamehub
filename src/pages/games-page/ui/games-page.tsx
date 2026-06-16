import { useInfinitePopularGames } from "@/entities/game";
import { useInfiniteScroll } from "@/shared/hooks";
import {
  EmptyState,
  ErrorFallback,
  SearchHeader,
  SkeletonGrid,
} from "@/shared/ui";
import { GamesList } from "@/widgets/games-list";

import styles from "./styles.module.scss";

export const GamesPage = () => {
  const {
    data: games,
    isPending,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePopularGames();

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
    <section className={styles.wrapper}>
      <SearchHeader count={games.totalCount} />
      <GamesList games={games.allGames} />

      {hasNextPage && (
        <div ref={loadMoreRef} className={styles.loadMore}>
          {isFetchingNextPage && <div className={styles.spinner} />}
        </div>
      )}
    </section>
  );
};

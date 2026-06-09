import { useSearchParams } from "react-router";

import { useInfiniteSearchGames } from "@/features/search";
import { useInfiniteScroll } from "@/shared/hooks";
import {
  EmptyState,
  ErrorFallback,
  SearchHeader,
  SkeletonGrid,
} from "@/shared/ui";
import { GamesList } from "@/widgets/games-list";

import styles from "./styles.module.scss";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const {
    data: games,
    isPending,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearchGames(query);

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
    return <EmptyState hint query={query} />;
  }

  return (
    <section className={styles.wrapper}>
      <SearchHeader query={query} count={games.totalCount} />
      <GamesList games={games.allGames} />

      {hasNextPage && (
        <div ref={loadMoreRef} className={styles.loadMore}>
          {isFetchingNextPage && <div className={styles.spinner} />}
        </div>
      )}
    </section>
  );
};

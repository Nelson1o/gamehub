import { useParams } from "react-router";

import { useGameDetails } from "@/entities/game";
import { usePageTitle } from "@/shared/hooks";
import { EmptyState, ErrorFallback, GamePageSkeleton } from "@/shared/ui";
import { GameHero } from "@/widgets/game-hero";
import { GameInfo } from "@/widgets/game-info";
import { GameScreenshots } from "@/widgets/game-screenshots";
import { GameSeries } from "@/widgets/game-series";
import { GameTrailer } from "@/widgets/game-trailer";

import styles from "./styles.module.scss";

export const GamePage = () => {
  const params = useParams<{ id: string }>();
  const { data: game, isPending, error, refetch } = useGameDetails(params.id);
  usePageTitle(game?.name || null);

  if (isPending) {
    return <GamePageSkeleton />;
  }

  if (error) {
    return <ErrorFallback center error={error} onRetry={refetch} />;
  }

  if (!game) {
    return <EmptyState hint />;
  }

  return (
    <div className={styles.page}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${game.background_image})` }}
      />
      <div className={styles.wrapper}>
        <GameHero game={game} />
        <div className={styles.content}>
          <GameInfo game={game} />
          <GameTrailer gameId={game.id} />
          <GameScreenshots gameId={game.id} />
          <GameSeries gameId={game.id} />
        </div>
      </div>
    </div>
  );
};

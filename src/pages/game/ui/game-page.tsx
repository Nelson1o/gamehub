import { useEffect } from "react";
import { useParams } from "react-router";

import { useGameDetails } from "@/entities/game";
import { usePageTitle } from "@/shared/hooks";
import { useTheme } from "@/shared/hooks";
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
  const { theme } = useTheme();

  useEffect(() => {
    const originalTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");

    return () => {
      document.documentElement.setAttribute(
        "data-theme",
        originalTheme || theme
      );
    };
  }, [theme]);

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
    <article className={styles.page}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${game.background_image})` }}
        aria-hidden="true"
      />
      <div className={styles.wrapper}>
        <GameHero game={game} />
        <div className={styles.content} aria-live="polite">
          <GameInfo game={game} />
          <GameTrailer gameId={game.id} />
          <GameScreenshots gameId={game.id} />
          <GameSeries gameId={game.id} />
        </div>
      </div>
    </article>
  );
};

import { ExportFavorites } from "@/features/export-favorites";
import { usePageTitle } from "@/shared/hooks";
import { useFavorites } from "@/shared/store";
import { EmptyState } from "@/shared/ui";
import { GamesList } from "@/widgets/games-list";

import styles from "./styles.module.scss";

export const FavoritesPage = () => {
  const { favorites } = useFavorites();
  usePageTitle("Избранные игры");

  if (favorites.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Избранное</h1>
        {favorites.length > 0 && <ExportFavorites />}
      </div>
      <GamesList games={favorites} />
    </div>
  );
};

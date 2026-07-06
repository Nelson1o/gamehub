import DownloadIcon from "@/shared/assets/icons/download-icon.svg";
import { useFavorites } from "@/shared/store";

import styles from "./styles.module.scss";

export const ExportFavorites = () => {
  const { favorites } = useFavorites();

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      total: favorites.length,
      games: favorites,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `favorites-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      aria-label="Экспортировать избранные игры в JSON"
      className={styles.button}
      onClick={handleExport}
    >
      <img
        aria-hidden="true"
        src={DownloadIcon}
        alt="download icon"
        className={styles.icon}
        width={25}
        height={25}
      />
    </button>
  );
};

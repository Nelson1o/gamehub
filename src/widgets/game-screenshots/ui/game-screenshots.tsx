import { useCallback, useState } from "react";

import { useGameScreenshots } from "@/entities/game";
import { LightBox } from "@/shared/ui";

import styles from "./styles.module.scss";

type Props = {
  gameId: number;
};

export const GameScreenshots = ({ gameId }: Props) => {
  const { data: screenshots, isPending, error } = useGameScreenshots(gameId);
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

  const handleClose = useCallback(() => setSelectedIndex(null), []);

  const handleNavigate = useCallback(
    (newIndex: number) => setSelectedIndex(newIndex),
    []
  );

  if (isPending || !screenshots?.length || error) {
    return null;
  }

  const total = screenshots.length;
  const showMore = total > 6;
  const visibleCount = showMore ? 5 : total;
  const remainingCount = total - 5;

  const handleMoreClick = () => {
    setSelectedIndex(5);
  };

  return (
    <section className={styles.screenshots}>
      <h2 className={styles.title}>Скриншоты</h2>
      <div className={styles.grid}>
        {screenshots.slice(0, visibleCount).map((screen, index) => (
          <div
            key={screen.id}
            className={styles.thumbnail}
            onClick={() => setSelectedIndex(index)}
          >
            <img
              src={screen.image}
              alt={`Screenshot ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
        {showMore && (
          <div className={styles.moreButton} onClick={handleMoreClick}>
            <div className={styles.moreContent}>
              <span className={styles.moreIcon}>🎮</span>
              <span className={styles.moreText}>+{remainingCount}</span>
            </div>
          </div>
        )}
      </div>
      <LightBox
        images={screenshots}
        selectedIndex={selectedIndex}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </section>
  );
};

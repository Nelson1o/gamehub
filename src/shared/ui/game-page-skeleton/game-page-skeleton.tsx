import { SkeletonGrid } from "../skeleton-grid";

import styles from "./styles.module.scss";

export const GamePageSkeleton = () => (
  <div
    className={styles.page}
    role="status"
    aria-label="Загрузка страницы игры"
    aria-busy="true"
  >
    <div className={styles.backgroundSkeleton} aria-hidden="true" />
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.heroSkeleton}>
        <div className={styles.titleSkeleton} />
        <div className={styles.metaSkeleton}>
          <div className={styles.badgeSkeleton} />
          <div className={styles.badgeSkeleton} />
          <div className={styles.badgeSkeleton} />
          <div className={styles.badgeSkeleton} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.infoSkeleton}>
          <div className={styles.descriptionSkeleton}>
            <div className={styles.sectionTitle} />
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.lineShort} />
          </div>
          <div className={styles.detailsSkeleton}>
            <div className={styles.sectionTitle} />
            <div className={styles.line} />
            <div className={styles.line} />
            <div className={styles.lineShort} />
          </div>
        </div>

        <div className={styles.trailerSkeleton}>
          <div className={styles.sectionTitle} />
          <div className={styles.videoPlaceholder} />
        </div>

        <div className={styles.screenshotsSkeleton}>
          <div className={styles.sectionTitle} />
          <SkeletonGrid columns={4} count={4} aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
);

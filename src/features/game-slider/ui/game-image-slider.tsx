import { BarPagination } from "@/shared/ui";

import { useMouseSlider } from "../lib";

import styles from "./styles.module.scss";

type Props = {
  alt: string;
  image: string;
  screenshots: { image: string }[];
};

export const GameImageSlider = ({ alt, image, screenshots }: Props) => {
  const hasScreenshots = screenshots.length > 0;

  const {
    containerRef,
    activeIndex,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  } = useMouseSlider(screenshots.length);

  const imageUrl =
    hasScreenshots && activeIndex !== null
      ? (screenshots[activeIndex]?.image ?? image)
      : image;

  return (
    <div
      aria-label="Слайдер скриншотов"
      className={styles.slider}
      ref={containerRef}
      onMouseEnter={hasScreenshots ? handleMouseEnter : undefined}
      onMouseMove={hasScreenshots ? handleMouseMove : undefined}
      onMouseLeave={hasScreenshots ? handleMouseLeave : undefined}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={alt} loading="lazy" />
      ) : (
        <div className={styles.placeholder} aria-label={alt}>
          <span className={styles.placeholderText}>{alt}</span>
        </div>
      )}
      {screenshots.length > 1 && activeIndex !== null && (
        <BarPagination
          total={screenshots.length}
          activeIndex={activeIndex}
          className={styles.barPagination}
        />
      )}
    </div>
  );
};

import { createPortal } from "react-dom";

import { useLightBox } from "@/shared/hooks";
import type { Short_Screenshots } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = {
  images: Short_Screenshots[];
  selectedIndex: null | number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
};

export const LightBox = ({
  images,
  selectedIndex,
  onClose,
  onNavigate,
}: Props) => {
  const {
    currentImage,
    thumbnailListRef,
    showPrev,
    showNext,
    goPrev,
    goNext,
    isOpen,
  } = useLightBox({ images, selectedIndex, onClose, onNavigate });

  if (!isOpen || !currentImage) return null;

  return createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalHeader}>
        <button
          aria-label="Закрыть"
          className={styles.closeButton}
          onClick={onClose}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {showPrev && (
          <button
            aria-label="Предыдущий"
            className={styles.prevButton}
            onClick={goPrev}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <img
          src={currentImage.image}
          alt={`Full size ${selectedIndex ? selectedIndex + 1 : images.length}`}
          className={styles.fullImage}
        />

        {showNext && (
          <button
            aria-label="Следующий"
            className={styles.nextButton}
            onClick={goNext}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      <div className={styles.thumbnails}>
        <div className={styles.thumbnailList} ref={thumbnailListRef}>
          {images.map((image, index) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(index);
              }}
              key={image.id}
              className={`${styles.thumbnailItem} ${index === selectedIndex ? styles.activeThumbnail : ""}`}
            >
              <img
                src={image.image}
                alt={`Thumbnail ${index + 1}`}
                className={styles.thumbnailImg}
              />
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

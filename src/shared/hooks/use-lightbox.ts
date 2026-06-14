import { useCallback, useEffect, useRef } from "react";

import type { Short_Screenshots } from "../types";

type Props = {
  images: Short_Screenshots[];
  selectedIndex: null | number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
};

export const useLightBox = ({
  images,
  selectedIndex,
  onClose,
  onNavigate,
}: Props) => {
  const thumbnailListRef = useRef<HTMLDivElement>(null);
  const isOpen = selectedIndex !== null;
  const currentImage = isOpen ? images[selectedIndex] : null;

  const goPrev = useCallback(() => {
    if (isOpen && selectedIndex > 0) {
      onNavigate(selectedIndex - 1);
    }
  }, [isOpen, selectedIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (isOpen && selectedIndex < images.length - 1) {
      onNavigate(selectedIndex + 1);
    }
  }, [isOpen, selectedIndex, images.length, onNavigate]);

  const goFirst = useCallback(() => {
    if (isOpen && images.length > 0) {
      onNavigate(0);
    }
  }, [isOpen, images.length, onNavigate]);

  const goLast = useCallback(() => {
    if (isOpen && images.length > 0) {
      onNavigate(images.length - 1);
    }
  }, [isOpen, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goPrev();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "Home":
          goFirst();
          break;
        case "End":
          goLast();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext, goFirst, goLast]);

  useEffect(() => {
    if (isOpen && thumbnailListRef.current && isOpen) {
      const activeThumb = thumbnailListRef.current.children[
        selectedIndex
      ] as HTMLElement;

      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [isOpen, selectedIndex]);

  const showPrev = isOpen && selectedIndex > 0;
  const showNext = isOpen && selectedIndex < images.length - 1;

  return {
    currentImage,
    thumbnailListRef,
    selectedIndex,
    showPrev,
    showNext,
    goPrev,
    goNext,
    isOpen,
  };
};

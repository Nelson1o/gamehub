import { type MouseEvent, useCallback, useRef, useState } from "react";

export const useMouseSlider = (itemCount: number) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCurrentIndex = useCallback(
    (clientX: number) => {
      if (!containerRef.current || itemCount === 0) return null;

      const { left, width } = containerRef.current.getBoundingClientRect();
      const relativeX = (clientX - left) / width;
      const clamped = Math.min(Math.max(relativeX, 0), 1);
      const index = Math.min(Math.floor(clamped * itemCount), itemCount - 1);

      return index;
    },
    [itemCount]
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const index = getCurrentIndex(event.clientX);
      if (index !== null) setActiveIndex(index);
    },
    [getCurrentIndex]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const index = getCurrentIndex(event.clientX);
      if (index !== null) setActiveIndex(index);
    },
    [getCurrentIndex]
  );

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return {
    containerRef,
    activeIndex,
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
  };
};

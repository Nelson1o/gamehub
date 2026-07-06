import styles from "./styles.module.scss";

type Props = {
  total: number;
  activeIndex: number;
  className?: string;
};

export const BarPagination = ({ activeIndex, total, className }: Props) => (
  <div
    className={`${styles.barPagination} ${className || ""}`}
    role="progressbar"
    aria-valuenow={activeIndex + 1}
    aria-valuemax={total}
    aria-label="Текущий скриншот"
  >
    {Array.from({ length: total }).map((_, idx) => (
      <div
        key={idx}
        aria-hidden="true"
        className={`${styles.bar} ${idx === activeIndex ? styles.activeBar : ""}`}
      />
    ))}
  </div>
);

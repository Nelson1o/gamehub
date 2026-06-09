import styles from "./styles.module.scss";

type Props = {
  total: number;
  activeIndex: number;
  className?: string;
};

export const BarPagination = ({ activeIndex, total, className }: Props) => (
  <div className={`${styles.barPagination} ${className || ""}`}>
    {Array.from({ length: total }).map((_, idx) => (
      <div
        key={idx}
        className={`${styles.bar} ${idx === activeIndex ? styles.activeBar : ""}`}
      />
    ))}
  </div>
);

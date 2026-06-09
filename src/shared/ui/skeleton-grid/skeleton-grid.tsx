import styles from "./styles.module.scss";

type Props = {
  count?: number;
  columns?: number;
};

export const SkeletonGrid = ({ count = 20, columns = 4 }: Props) => {
  const gridStyle = {
    "--skeleton-columns": columns,
  } as React.CSSProperties;

  return (
    <div className={styles.grid} style={gridStyle}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.image}></div>
          <div className={styles.title}></div>
          <div className={styles.rating}></div>
        </div>
      ))}
    </div>
  );
};

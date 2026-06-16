import styles from "./styles.module.scss";

type Props = {
  query?: string;
  count: number;
};

export const SearchHeader = ({ count, query }: Props) => (
  <div className={styles.header}>
    <h2 className={styles.title}>
      {query ? `Результаты поиска: ${query}` : "Популярные игры"}
    </h2>
    <p className={styles.count}>Найдено: {count.toLocaleString()} игр</p>
  </div>
);

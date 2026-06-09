import styles from "./styles.module.scss";

type Props = {
  query: string;
  count: number;
};

export const SearchHeader = ({ count, query }: Props) => (
  <div className={styles.header}>
    <h2 className={styles.title}>Результаты поиска: {query}</h2>
    <p className={styles.count}>Найдено: {count.toLocaleString()} игр</p>
  </div>
);

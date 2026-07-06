import styles from "./styles.module.scss";

type Props = {
  history: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};

export const SearchHistory = ({
  history,
  onClear,
  onRemove,
  onSelect,
}: Props) => {
  if (history.length === 0) return null;

  return (
    <ul className={styles.list} aria-label="История поиска">
      {history.map((item) => (
        <li key={item} className={styles.item}>
          <span onClick={() => onSelect(item)}>{item}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item);
            }}
            aria-label="Удалить запрос"
            className={styles.remove}
          >
            <span aria-hidden="true">✕</span>
          </button>
        </li>
      ))}
      <li className={styles.clear}>
        <button className={styles.clearButton} onClick={onClear}>
          Очистить историю
        </button>
      </li>
    </ul>
  );
};

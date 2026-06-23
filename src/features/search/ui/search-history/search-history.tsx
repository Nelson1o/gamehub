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
    <ul className={styles.list}>
      {history.map((item) => (
        <li key={item} className={styles.item}>
          <span onClick={() => onSelect(item)}>{item}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item);
            }}
            className={styles.remove}
          >
            ✕
          </button>
        </li>
      ))}
      <li className={styles.clear} onClick={onClear}>
        Очистить историю
      </li>
    </ul>
  );
};

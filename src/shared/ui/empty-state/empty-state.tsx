import styles from "./styles.module.scss";

type Props = {
  query?: string;
  hint?: boolean;
};

export const EmptyState = ({ query, hint }: Props) => {
  const message = query ? (
    <>
      Ничего не найдено по запросу <strong>«{query}»</strong>
    </>
  ) : (
    "Ничего не найдено"
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.icon}>🔍</div>
        <p>{message}</p>
        {hint && (
          <p className={styles.hint}>Попробуйте изменить запрос или фильтр</p>
        )}
      </div>
    </div>
  );
};

import styles from "./styles.module.scss";

type Props = {
  error?: Error | null;
  center?: boolean;
  onRetry?: () => void;
};

export const ErrorFallback = ({ error, center, onRetry }: Props) => {
  return (
    <div
      className={`${styles.wrapper} ${center && styles.center}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.container}>
        <div className={styles.icon} aria-hidden="true">
          😵‍💫
        </div>
        <h2 className={styles.title}>Не удалось загрузить игры</h2>
        <p className={styles.message}>
          {error?.message === "Network Error"
            ? "Проверьте подключение к интернету"
            : `Произошла ошибка при загрузке данных.\nПопробуйте позже.`}
        </p>
        {onRetry && (
          <button className={styles.retryButton} onClick={onRetry}>
            Повторить
          </button>
        )}
      </div>
    </div>
  );
};

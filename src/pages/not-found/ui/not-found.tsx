import { Link } from "react-router";

import { ROUTES } from "@/shared/config";

import styles from "./styles.module.scss";

export const NotFoundPage = () => (
  <div className={styles.page}>
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.title}>Страница не найдена</h2>
      <p className={styles.description}>
        К сожалению, такой страницы не существует. Возможно, вы перешли по
        неверной ссылке или страница была удалена.
      </p>
      <Link to={ROUTES.HOME} className={styles.button}>
        Вернуться на главную
      </Link>
    </div>
  </div>
);

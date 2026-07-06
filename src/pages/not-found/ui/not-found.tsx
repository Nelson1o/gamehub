import { Link } from "react-router";

import { ROUTES } from "@/shared/config";

import styles from "./styles.module.scss";

export const NotFoundPage = () => (
  <section className={styles.page} aria-labelledby="not-found-heading">
    <div className={styles.container}>
      <h1 className={styles.code} aria-label="Ошибка 404: страница не найдена">
        404
      </h1>
      <h2 id="not-found-heading" className={styles.title}>
        Страница не найдена
      </h2>
      <p className={styles.description}>
        К сожалению, такой страницы не существует. Возможно, вы перешли по
        неверной ссылке или страница была удалена.
      </p>
      <Link
        to={ROUTES.HOME}
        className={styles.button}
        aria-label="Перейти на главную страницу GameHub"
      >
        Вернуться на главную
      </Link>
    </div>
  </section>
);

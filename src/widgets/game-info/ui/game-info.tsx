import { getAgeRatingInfo } from "@/shared/lib";
import type { GameDetails } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = {
  game: GameDetails;
};

export const GameInfo = ({ game }: Props) => {
  const gameSiteUrl = game.website ? new URL(game.website) : null;
  const { age, label } = getAgeRatingInfo(game.esrb_rating?.name);

  return (
    <div className={styles.info}>
      <div className={styles.description}>
        <h2>Описание</h2>
        <div dangerouslySetInnerHTML={{ __html: game.description_raw }} />
      </div>

      <div className={styles.details}>
        <h2>Детали</h2>
        <ul>
          <li>
            <strong>Издатели: </strong>
            {game.publishers.map((p) => p.name).join(", ")}
          </li>
          <li>
            <strong>Разработчики: </strong>
            {game.developers.map((d) => d.name).join(", ")}
          </li>
          <li>
            <strong>Жанры: </strong> {game.genres.map((g) => g.name).join(", ")}
          </li>
          <li>
            <strong>Платформы: </strong>
            {game.platforms.map((p) => p.platform.name).join(", ")}
          </li>
          {game.playtime > 0 && (
            <li>
              <strong>Время прохождения: </strong> {game.playtime} ч.
            </li>
          )}
          {game.esrb_rating && (
            <li>
              <strong>Возрастной рейтинг: </strong>
              {label}
              {age && `${age}+ `}
              {game.esrb_rating.name}
            </li>
          )}
          {game.website && (
            <li>
              <strong>Сайт: </strong>
              <a href={game.website} target="_blank" rel="noopener noreferrer">
                {gameSiteUrl !== null && gameSiteUrl.hostname}
                <span className={styles.externalIcon}>↗</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

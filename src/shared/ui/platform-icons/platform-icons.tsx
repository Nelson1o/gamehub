import { getPlatformIcon } from "@/shared/lib";
import type { GameDetails } from "@/shared/types";

import styles from "./styles.module.scss";

type Props = Pick<GameDetails, "parent_platforms">;

export const PlatformIcons = ({ parent_platforms }: Props) => {
  if (!parent_platforms?.length) {
    return null;
  }

  return (
    <div className={styles.platforms} aria-label="Платформы">
      {parent_platforms.map(({ platform: { id, name, slug } }) => (
        <span key={id} className={styles.platformIcon} title={name}>
          <img
            src={getPlatformIcon(slug)}
            alt={`${slug} icon`}
            className={styles.icon}
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );
};

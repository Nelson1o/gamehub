import { useGameTrailer } from "@/entities/game";

import { getVideoEmbed } from "../lib";

import styles from "./styles.module.scss";

type Props = {
  gameId: number;
};

export const GameTrailer = ({ gameId }: Props) => {
  const { data: trailers, isPending, error } = useGameTrailer(gameId);
  const trailer = trailers?.[0];

  if (isPending || error || !trailer) return null;

  const videoUrl = trailer.data.max;
  const embedUrl = getVideoEmbed(videoUrl);

  if (!embedUrl) return null;

  const isMp4 = embedUrl === videoUrl && videoUrl.endsWith(".mp4");

  return (
    <div className={styles.trailer}>
      <h2 className={styles.title}>Трейлер</h2>
      <div className={styles.videoWrapper}>
        {isMp4 ? (
          <video
            controls
            className={styles.video}
            src={embedUrl}
            poster={trailer.preview || undefined}
          >
            Ваш браузер не поддерживает видео.
          </video>
        ) : (
          <iframe
            allowFullScreen
            src={embedUrl}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={styles.video}
          />
        )}
      </div>
    </div>
  );
};

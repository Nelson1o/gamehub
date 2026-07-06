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
    <section className={styles.trailer}>
      <h2 className={styles.title}>Трейлер</h2>
      <div
        className={styles.videoWrapper}
        aria-label={`Трейлер: ${trailer.name}`}
      >
        {isMp4 ? (
          <video
            controls
            className={styles.video}
            src={embedUrl}
            poster={trailer.preview || undefined}
            aria-label={`Трейлер: ${trailer.name}`}
          >
            Ваш браузер не поддерживает видео.
          </video>
        ) : (
          <iframe
            allowFullScreen
            loading="lazy"
            src={embedUrl}
            title={trailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className={styles.video}
          />
        )}
      </div>
    </section>
  );
};

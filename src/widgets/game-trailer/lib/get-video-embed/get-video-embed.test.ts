import { describe, expect, it } from "vitest";

import { getVideoEmbed } from "./get-video-embed";

describe("Проверка функции getVideoEmbed", () => {
  describe("YouTube", () => {
    it("Возвращаем embed-ссылку из обычной YouTube ссылки", () => {
      expect(getVideoEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      );
    });

    it("Возвращаем embed-ссылку из короткой YouTube ссылки (youtu.be)", () => {
      expect(getVideoEmbed("https://youtu.be/dQw4w9WgXcQ")).toBe(
        "https://www.youtube.com/embed/dQw4w9WgXcQ"
      );
    });

    it("Возвращаем embed-ссылку из YouTube ссылки с параметрами", () => {
      expect(
        getVideoEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s")
      ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });

    it("Возвращаем embed-ссылку из YouTube ссылки с каналом в пути", () => {
      expect(
        getVideoEmbed(
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=Channel"
        )
      ).toBe("https://www.youtube.com/embed/dQw4w9WgXcQ");
    });
  });

  describe("Vimeo", () => {
    it("Возвращаем embed-ссылку из Vimeo ссылки", () => {
      expect(getVideoEmbed("https://vimeo.com/123456789")).toBe(
        "https://player.vimeo.com/video/123456789"
      );
    });

    it("Возвращаем embed-ссылку из Vimeo ссылки с параметрами", () => {
      expect(getVideoEmbed("https://vimeo.com/123456789?autoplay=1")).toBe(
        "https://player.vimeo.com/video/123456789"
      );
    });
  });

  describe("MP4 прямые ссылки", () => {
    it("Возвращаем ту же ссылку для MP4-файла", () => {
      const url = "https://example.com/video.mp4";
      expect(getVideoEmbed(url)).toBe(url);
    });

    it("Возвращаем ту же ссылку из MP4-файла с параметрами", () => {
      const url =
        "https://steamcdn-a.akamaihd.net/steam/apps/256692017/movie_max.mp4";
      expect(getVideoEmbed(url)).toBe(url);
    });

    it("Возвращаем ту же ссылку из ссылки, содержащей .mp4 в пути", () => {
      const url = "https://example.com/videos/movie.mp4?quality=high";
      expect(getVideoEmbed(url)).toBe(url);
    });
  });

  describe("Неизвестные форматы и ошибки", () => {
    it("Проверяем вывод null для неподдерживаемой ссылки", () => {
      expect(getVideoEmbed("https://example.com/video.avi")).toBeNull();
      expect(getVideoEmbed("https://twitch.tv/video")).toBeNull();
    });

    it("Проверяем вывод null для пустой строки", () => {
      expect(getVideoEmbed("")).toBeNull();
    });

    it("Проверяем вывод null для ссылки без идентификатора", () => {
      expect(getVideoEmbed("https://www.youtube.com/watch?v=")).toBeNull();
      expect(getVideoEmbed("https://vimeo.com/")).toBeNull();
    });

    it("Проверяем вывод null для некорректного URL", () => {
      expect(getVideoEmbed("невалидная ссылка")).toBeNull();
      expect(getVideoEmbed("")).toBeNull();
    });
  });
});

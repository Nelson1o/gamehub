import { describe, expect, it } from "vitest";

import { getAgeRatingInfo } from "./age-rating";

describe("Проверка функции getAgeRatingInfo", () => {
  it("Проверяем вывод из функции с валидными параматрами", () => {
    expect(getAgeRatingInfo("Everyone")).toEqual({ label: null, age: 6 });
    expect(getAgeRatingInfo("Everyone 10+")).toEqual({ label: null, age: 10 });
    expect(getAgeRatingInfo("Teen")).toEqual({ label: null, age: 13 });
    expect(getAgeRatingInfo("Mature")).toEqual({ label: null, age: 17 });
    expect(getAgeRatingInfo("Adults Only")).toEqual({ label: null, age: 18 });
  });

  it("Проверяем вывод из функции с невалидными параматрами", () => {
    expect(getAgeRatingInfo()).toEqual({
      label: "Нет данных",
      age: null,
    });
    expect(getAgeRatingInfo("")).toEqual({
      label: "Нет данных",
      age: null,
    });
    expect(getAgeRatingInfo(undefined)).toEqual({
      label: "Нет данных",
      age: null,
    });
    // @ts-expect-error – передаём undefined намеренно
    expect(getAgeRatingInfo(null)).toEqual({
      label: "Нет данных",
      age: null,
    });
  });
});

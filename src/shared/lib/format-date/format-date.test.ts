import { describe, expect, it } from "vitest";

import { formatDate } from "./format-date";

describe("Проверка функции formatDate", () => {
  it("Проверяем вывод из функции с валидными параматрами", () => {
    expect(formatDate("2020-04-14")).toBe("Апр 14, 2020");
    expect(formatDate("2023-01-01")).toBe("Янв 1, 2023");
  });

  it("Проверяем вывод из функции для пустой строки", () => {
    expect(formatDate("")).toBe("—");
  });

  it("Проверяем вывод из функции с невалидными параматрами", () => {
    expect(formatDate("april")).toBe("—");
    expect(formatDate("2014-14-14")).toBe("—");
    expect(formatDate("abc")).toBe("—");
    // @ts-expect-error – передаём undefined намеренно
    expect(formatDate(undefined)).toBe("—");
  });
});

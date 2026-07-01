import { beforeEach, describe, expect, it } from "vitest";

import { MAX_ITEMS_HISTORY, SEARCH_SUGGESTION_HISTORY } from "../../config";
import {
  addSearchQuery,
  clearSearchHistory,
  getSearchHistory,
  removeSearchQuery,
} from "../search-history";

describe("Проверка файла search-history", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Проверка функции getSearchHistory", () => {
    it("Проверяем вывод пустого массива, если ключа нет в localStorage", () => {
      expect(getSearchHistory()).toEqual([]);
    });

    it("Проверяем вывод массива, если ключ есть в localStorage", () => {
      const items = ["witcher", "cyberpunk"];
      localStorage.setItem(SEARCH_SUGGESTION_HISTORY, JSON.stringify(items));
      expect(getSearchHistory()).toEqual(items);
    });

    it("Проверяем вывод пустого массива при ошибке парсинга JSON", () => {
      localStorage.setItem(SEARCH_SUGGESTION_HISTORY, "Невалидный JSON");
      expect(getSearchHistory()).toEqual([]);
    });
  });

  describe("Проверка функции addSearchQuery", () => {
    it("Добавляет новый запрос в начало списка", () => {
      addSearchQuery("witcher");
      expect(getSearchHistory()).toEqual(["witcher"]);
    });

    it("Перемещает существующий запрос в начало и удалять дубликат", () => {
      addSearchQuery("witcher");
      addSearchQuery("cyberpunk");
      addSearchQuery("witcher");
      expect(getSearchHistory()).toEqual(["witcher", "cyberpunk"]);
    });

    it("Обрезает историю до MAX_ITEMS_HISTORY", () => {
      for (let i = 0; i < MAX_ITEMS_HISTORY + 3; i++) {
        addSearchQuery(`game${i}`);
      }
      const history = getSearchHistory();
      expect(history.length).toBe(MAX_ITEMS_HISTORY);
      expect(history[0]).toBe(`game${MAX_ITEMS_HISTORY + 2}`);
    });

    it("Должен игнорировать пустую строку (только пробелы)", () => {
      addSearchQuery("  ");
      expect(getSearchHistory()).toEqual([]);
    });

    it("Должен игнорировать пустую строку", () => {
      addSearchQuery("");
      expect(getSearchHistory()).toEqual([]);
    });
  });

  describe("Проверка функции clearSearchHistory", () => {
    it("Удаление ключа из localStorage", () => {
      localStorage.setItem(
        SEARCH_SUGGESTION_HISTORY,
        JSON.stringify(["witcher"])
      );
      clearSearchHistory();
      expect(localStorage.getItem(SEARCH_SUGGESTION_HISTORY)).toBeNull();
    });
  });

  describe("Проверка функции removeSearchQuery", () => {
    it("Удаление существующего запроса из истории", () => {
      addSearchQuery("witcher");
      addSearchQuery("cyberpunk");
      removeSearchQuery("witcher");
      expect(getSearchHistory()).toEqual(["cyberpunk"]);
    });

    it("Ничего не делать, если запроса нет в истории", () => {
      addSearchQuery("witcher");
      removeSearchQuery("cyberpunk");
      expect(getSearchHistory()).toEqual(["witcher"]);
    });

    it("Корректная обработка дубликатов (удаляем все вхождения)", () => {
      addSearchQuery("witcher");
      addSearchQuery("witcher");
      removeSearchQuery("witcher");
      expect(getSearchHistory()).toEqual([]);
    });
  });
});

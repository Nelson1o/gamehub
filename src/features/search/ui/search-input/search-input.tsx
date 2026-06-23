import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router";

import SearchIcon from "@/shared/assets/icons/search.svg";
import { ROUTES } from "@/shared/config";
import { useSearchHistory } from "@/shared/hooks";

import { useDebounce, useGlobalSearchFocus } from "../../lib";
import { SearchHistory } from "../search-history";

import styles from "./styles.module.scss";

export const SearchInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useGlobalSearchFocus();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { history, addQuery, clearHistory, removeQuery } = useSearchHistory();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [searchValue, setSearchValue] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  });
  const debouncedValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    const trimmed = debouncedValue.trim();
    if (trimmed.length < 2) return;

    const params = new URLSearchParams();
    params.set("query", trimmed);
    navigate(`${ROUTES.SEARCH}?${params.toString()}`);
    addQuery(trimmed);
  }, [addQuery, debouncedValue, navigate]);

  const handleSearch = useCallback(
    (value?: string) => {
      const query = value ?? searchValue;
      const trimmed = query.trim();
      if (trimmed.length < 2) return;

      const params = new URLSearchParams();
      params.set("query", trimmed);
      navigate(`${ROUTES.SEARCH}?${params.toString()}`);
      addQuery(trimmed);
      setIsHistoryOpen(false);
    },
    [addQuery, navigate, searchValue]
  );

  const handleClear = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      handleClear();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOpenHistory = () => {
    if (history.length > 0 && searchValue.length === 0) {
      setIsHistoryOpen(true);
    }
  };

  const handleSelectHistory = useCallback(
    (query: string) => {
      setSearchValue(query);
      handleSearch(query);
    },
    [handleSearch]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsHistoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <img
        src={SearchIcon}
        alt="search icon"
        className={styles.search}
        onClick={() => handleSearch()}
      />
      <input
        ref={inputRef}
        type="text"
        name="search"
        value={searchValue}
        placeholder="Поиск игр"
        autoComplete="off"
        className={styles.input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleOpenHistory}
        onClick={handleOpenHistory}
      />
      {searchValue.length > 0 && (
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleClear();
          }}
          className={styles.clear}
        >
          ✕
        </button>
      )}
      <div className={styles.wrap}>
        <div className={styles.hotkey}>ctrl</div>
        <span>+</span>
        <div className={styles.hotkey}>k</div>
      </div>

      {isHistoryOpen && (
        <SearchHistory
          history={history}
          onClear={clearHistory}
          onRemove={removeQuery}
          onSelect={handleSelectHistory}
        />
      )}
    </div>
  );
};

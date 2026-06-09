import { type ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import SearchIcon from "@/shared/assets/icons/search.svg";
import { ROUTES } from "@/shared/config";

import { useDebounce, useGlobalSearchFocus } from "../lib";

import styles from "./styles.module.scss";

export const SearchInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useGlobalSearchFocus();

  const [searchValue, setSearchValue] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  });
  const debouncedValue = useDebounce(searchValue, 800);

  useEffect(() => {
    if (debouncedValue.length >= 2) {
      const params = new URLSearchParams();
      params.set("query", debouncedValue);
      navigate(`${ROUTES.SEARCH}?${params.toString()}`);
    }
  }, [debouncedValue, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <img src={SearchIcon} alt="search icon" className={styles.icon} />
      <input
        ref={inputRef}
        type="text"
        name="search"
        value={searchValue}
        placeholder="Поиск игр"
        autoComplete="off"
        className={styles.input}
        onChange={handleChange}
      />
      <div className={styles.wrap}>
        <div className={styles.hotkey}>ctrl</div>
        <span>+</span>
        <div className={styles.hotkey}>k</div>
      </div>
    </div>
  );
};

import { type ChangeEvent, useState } from "react";

import SearchIcon from "@/shared/assets/icons/search.svg";

import { useGlobalSearchFocus } from "../lib/use-global-search-focus";

import styles from "./styles.module.scss";

export const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useGlobalSearchFocus();

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

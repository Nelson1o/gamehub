import { useEffect, useRef, useState } from "react";

import type { Option } from "../../types";

import styles from "./styles.module.scss";

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export const DropDown = ({
  options,
  value,
  onChange,
  className,
  placeholder,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`${styles.dropdown} ${className || ""}`}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span>{selected?.label || placeholder}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
          {options.map((opt) => (
            <li
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              key={opt.value}
              className={`${styles.item} ${opt.value === value ? styles.active : ""}`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

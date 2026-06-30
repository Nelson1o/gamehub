import FilterIcon from "@/shared/assets/icons/filter.svg";

import styles from "./styles.module.scss";

type Props = {
  toggleOpenFilter: () => void;
};

export const FilterButton = ({ toggleOpenFilter }: Props) => {
  return (
    <button className={styles.button} onClick={toggleOpenFilter}>
      <img src={FilterIcon} alt="filter icon" width={25} height={25} />
    </button>
  );
};

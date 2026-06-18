import { useSearchParams } from "react-router";

export const useSortParams = (defaultSort = "-rating") => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get("ordering") || defaultSort;

  const setSortType = (newSortType: string) => {
    setSearchParams((prev) => {
      prev.set("ordering", newSortType);

      return prev;
    });
  };

  return { sortType, setSortType };
};

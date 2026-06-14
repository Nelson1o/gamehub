import { useEffect } from "react";

export const usePageTitle = (
  title: null | string,
  defaultTitle = "GameHub"
) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} — ${defaultTitle}`;
    } else {
      document.title = defaultTitle;
    }

    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

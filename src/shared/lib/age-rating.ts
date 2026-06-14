type AgeRatingInfo = {
  label: null | string;
  age: null | number;
};

export const getAgeRatingInfo = (ratingName?: string): AgeRatingInfo => {
  switch (ratingName) {
    case "Everyone":
      return { label: null, age: 6 };
    case "Everyone 10+":
      return { label: null, age: 10 };
    case "Teen":
      return { label: null, age: 13 };
    case "Mature":
      return { label: null, age: 17 };
    case "Adults Only":
      return { label: null, age: 18 };
    default:
      return { label: ratingName || "Нет данных", age: null };
  }
};

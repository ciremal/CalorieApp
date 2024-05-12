import roundNumbers from "./roundNumbers";

export const extractNutrientsFromApi = (nutrients) => {
  const nutrientsList = Object.values(nutrients);
  const result = nutrientsList.map((item) => {
    return {
      label: getLabel(item.label),
      quantity: roundNumbers(item.quantity),
      unit: item.unit === "kcal" ? "g" : item.unit,
    };
  });
  return result.filter((item) => item.label.length > 0);
};

export const getLabel = (label) => {
  switch (label) {
    case "Energy":
      return "Calories";
    case "Total lipid (fat)":
      return "Fats";
    case "Carbohydrate, by difference":
      return "Carbs";
    case "Protein":
      return "Proteins";
    case "Cholesterol":
      return "Cholesterol";
    case "Sodium, Na":
      return "Sodium";
    case "Fiber, total dietary":
      return "Fiber";
    case "Sugars, total including NLEA":
      return "Sugars";
    default:
      return "";
  }
};

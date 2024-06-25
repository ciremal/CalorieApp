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
    case "Fatty acids, total saturated":
      return "Saturated Fats";
    case "Fatty acids, total trans":
      return "Trans Fats";
    case "Fatty acids, total monounsaturated":
      return "Monounsaturated Fats";
    case "Fatty acids, total polyunsaturated":
      return "Polyunsaturated Fats";
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
    case "Calcium, Ca":
      return "Calcium";
    case "Magnesium, Mg":
      return "Magnesium";
    case "Potassium, K":
      return "Potassium";
    case "Iron, Fe":
      return "Iron";
    case "Zinc, Zn":
      return "Zinc";
    case "Phosphorus, P":
      return "Phosphorus";
    case "Vitamin A, RAE":
      return "Vitamin A";
    case "Vitamin C, total ascorbic acid":
      return "Vitamin C";
    case "Thiamin":
      return "Thiamin";
    case "Riboflavin":
      return "Riboflavin";
    case "Niacin":
      return "Niacin";
    case "Vitamin B-6":
      return "Vitamin B-6";
    case "Folate, food":
      return "Folate";
    case "Folic acid":
      return "Folic acid";
    case "Vitamin B-12":
      return "Vitamin B-12";
    case "Vitamin D (D2 + D3)":
      return "Vitamin D";
    case "Vitamin E (alpha-tocopherol)":
      return "Vitamin E";
    case "Vitamin K (phylloquinone)":
      return "Vitamin K";
    case "Water":
      return "Water";
    default:
      return "";
  }
};

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

export const allNutrients = [
  { label: "Calories", unit: "g", quantity: 0 },
  { label: "Fats", unit: "g", quantity: 0 },
  { label: "Saturated Fats", unit: "g", quantity: 0 },
  { label: "Trans Fats", unit: "g", quantity: 0 },
  { label: "Monounsaturated Fats", unit: "g", quantity: 0 },
  { label: "Polyunsaturated Fats", unit: "g", quantity: 0 },
  { label: "Carbs", unit: "g", quantity: 0 },
  { label: "Proteins", unit: "g", quantity: 0 },
  { label: "Cholesterol", unit: "mg", quantity: 0 },
  { label: "Sodium", unit: "mg", quantity: 0 },
  { label: "Fiber", unit: "g", quantity: 0 },
  { label: "Sugars", unit: "g", quantity: 0 },
  // { label: "Vitamin A", unit: "µg", quantity: 0 },
  // { label: "Vitamin C", unit: "mg", quantity: 0 },
  // { label: "Vitamin B-6", unit: "mg", quantity: 0 },
  // { label: "Vitamin B-12", unit: "µg", quantity: 0 },
  // { label: "Vitamin D", unit: "µg", quantity: 0 },
  // { label: "Vitamin E", unit: "mg", quantity: 0 },
  // { label: "Vitamin K", unit: "µg", quantity: 0 },
  // { label: "Calcium", unit: "mg", quantity: 0 },
  // { label: "Magnesium", unit: "mg", quantity: 0 },
  // { label: "Potassium", unit: "mg", quantity: 0 },
  // { label: "Iron", unit: "mg", quantity: 0 },
  // { label: "Zinc", unit: "mg", quantity: 0 },
  // { label: "Phosphorus", unit: "mg", quantity: 0 },
  // { label: "Thiamin", unit: "mg", quantity: 0 },
  // { label: "Riboflavin", unit: "mg", quantity: 0 },
  // { label: "Niacin", unit: "mg", quantity: 0 },
  // { label: "Folate", unit: "µg", quantity: 0 },
  // { label: "Folic acid", unit: "µg", quantity: 0 },
  // { label: "Water", unit: "mg", quantity: 0 },
];

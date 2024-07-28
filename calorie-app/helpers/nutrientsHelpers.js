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

const getPAValues = (PA, age, gender) => {
  if (gender === "Male") {
    if (age < 19) {
      switch (PA) {
        case "Sedentary":
          return 1.0;
        case "Low Active":
          return 1.13;
        case "Active":
          return 1.26;
        case "Very Active":
          return 1.42;
      }
    } else {
      switch (PA) {
        case "Sedentary":
          return 1.0;
        case "Low Active":
          return 1.11;
        case "Active":
          return 1.25;
        case "Very Active":
          return 1.48;
      }
    }
  } else {
    if (age < 19) {
      switch (PA) {
        case "Sedentary":
          return 1.0;
        case "Low Active":
          return 1.16;
        case "Active":
          return 1.31;
        case "Very Active":
          return 1.56;
        default:
          return 1.0;
      }
    } else {
      switch (PA) {
        case "Sedentary":
          return 1.0;
        case "Low Active":
          return 1.12;
        case "Active":
          return 1.27;
        case "Very Active":
          return 1.45;
        default:
          return 1.0;
      }
    }
  }
};

export const getEER = (age, gender, PA, weight, height) => {
  const PAValue = getPAValues(PA, age, gender);

  if (gender === "Male") {
    if (age < 19) {
      return roundNumbers(
        88.5 -
          61.9 * age +
          PAValue * (26.7 * weight + (903 * height) / 100) +
          (age < 9 ? 20 : 25)
      );
    } else {
      return roundNumbers(
        662 - 9.53 * age + PAValue * (15.91 * weight + (539.6 * height) / 100)
      );
    }
  } else {
    if (age < 19) {
      return roundNumbers(
        135.3 -
          30.8 * age +
          PAValue * (10 * weight + (934 * height) / 100) +
          (age < 9 ? 20 : 25)
      );
    } else {
      return roundNumbers(
        354 - 6.91 * age + PAValue * (9.36 * weight + (726 * height) / 100)
      );
    }
  }
};

export const getRDAProtein = (weight, age) => {
  if (age >= 1 && age <= 3) {
    return weight * 1.05;
  } else if (age >= 4 && age <= 8) {
    return weight * 0.95;
  } else if (age >= 9 && age <= 13) {
    return roundNumbers(weight * 0.95);
  } else if (age >= 14 && age <= 18) {
    return roundNumbers(weight * 0.85);
  } else {
    return roundNumbers(weight * 0.8);
  }
};

export const getAMDRCarbs = (age, gender, PA, weight, height) => {
  const EER = getEER(age, gender, PA, weight, height);
  return {
    lower: roundNumbers((EER * 0.45) / 4),
    upper: roundNumbers((EER * 0.65) / 4),
  };
};

export const getAMDRFat = (age, gender, PA, weight, height) => {
  const EER = getEER(age, gender, PA, weight, height);

  if (age <= 3) {
    return {
      lower: roundNumbers((EER * 0.3) / 9),
      upper: roundNumbers((EER * 0.4) / 9),
    };
  } else if (age >= 4 && age <= 18) {
    return {
      lower: roundNumbers((EER * 0.25) / 9),
      upper: roundNumbers((EER * 0.35) / 9),
    };
  } else {
    return {
      lower: roundNumbers((EER * 0.2) / 9),
      upper: roundNumbers((EER * 0.35) / 9),
    };
  }
};

export const formatAMDR = (amdr) => {
  return `${amdr.lower} - ${amdr.upper}`;
};

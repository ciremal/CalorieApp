import roundNumbers from "./roundNumbers";

export const getTotalNutrient = (nutrient, meals) => {
  if (!meals) {
    return 0;
  }
  const result = meals.reduce((sum, curr) => sum + curr[nutrient], 0);
  return roundNumbers(result);
};

// Return the amount of Calories each main nutrient equats to
export const getNutrientBreakdownByCalorieCount = (meals) => {
  const totalCals = getTotalNutrient("cals", meals);
  const fats = getTotalNutrient("fats", meals) * 9;
  const carbs = getTotalNutrient("carbs", meals) * 4;
  const proteins = getTotalNutrient("proteins", meals) * 4;
  return {
    fats: {
      count: fats,
      perc: roundNumbers((fats / totalCals) * 100),
    },
    carbs: {
      count: carbs,
      perc: roundNumbers((carbs / totalCals) * 100),
    },
    proteins: {
      count: proteins,
      perc: roundNumbers((proteins / totalCals) * 100),
    },
  };
};

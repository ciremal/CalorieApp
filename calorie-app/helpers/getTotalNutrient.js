export const getTotalNutrient = (nutrient, meals) => {
  const result = meals.reduce((sum, curr) => sum + curr[nutrient], 0);
  return result;
};

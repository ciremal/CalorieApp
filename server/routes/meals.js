import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import { FoodItemModel } from "../models/FoodItem.js";
import roundNumbers from "../helpers/roundNumbers.js";

const router = Router();

/**
 * GET /meals
 * Fetches all meals from the database.
 */
router.get("/meals", async (req, res) => {
  try {
    const meals = await MealModel.find({});
    res
      .status(200)
      .json({ success: true, message: "Meals retrieved", data: meals });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch meals",
        error: error.message,
      });
  }
});

/**
 * POST /meals/by-date-user
 * Returns meals that match a specific date and user ID.
 */
router.post("/meals/by-date-user", async (req, res) => {
  const { date, user } = req.body;
  try {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const meals = await MealModel.find({
      createdAt: { $gte: start, $lte: end },
      user,
    });
    res
      .status(200)
      .json({ success: true, message: "Meals retrieved", data: meals });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch meals",
        error: error.message,
      });
  }
});

/**
 * GET /meals/:id
 * Fetches a meal by its ID and populates food items.
 */
router.get("/meals/:id", async (req, res) => {
  try {
    const meal = await MealModel.findById(req.params.id).populate("foodItems");
    res
      .status(200)
      .json({ success: true, message: "Meal retrieved", data: meal });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch meal",
        error: error.message,
      });
  }
});

/**
 * POST /meals
 * Creates a new meal.
 */
router.post("/meals", async (req, res) => {
  try {
    const newMeal = new MealModel(req.body);
    await newMeal.save();
    res
      .status(201)
      .json({ success: true, message: "Meal created", data: newMeal });
  } catch (error) {
    const message = error?.errors?.title?.message || "Unexpected error";
    res.status(500).json({ success: false, message, error: error.message });
  }
});

/**
 * DELETE /meals/:id
 * Deletes a meal and its associated food items.
 */
router.delete("/meals/:id", async (req, res) => {
  try {
    const meal = await MealModel.findById(req.params.id);
    await FoodItemModel.deleteMany({ _id: { $in: meal.foodItems } });
    await MealModel.deleteOne({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Meal deleted", data: meal });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete meal",
        error: error.message,
      });
  }
});

/**
 * PATCH /meals/:mealId/food-items/:foodId
 * Removes a food item from a meal and updates meal totals.
 */
router.patch("/meals/:mealId/food-items/:foodId", async (req, res) => {
  try {
    const { mealId, foodId } = req.params;
    const foodItem = await FoodItemModel.findByIdAndDelete(foodId);
    const meal = await MealModel.findById(mealId);

    meal.foodItems = meal.foodItems.filter(
      (item) => item.toString() !== foodId
    );

    const { cals, carbs, fats, proteins } = foodItem.mainNutrients;
    meal.cals = roundNumbers(meal.cals - cals);
    meal.carbs = roundNumbers(meal.carbs - carbs);
    meal.fats = roundNumbers(meal.fats - fats);
    meal.proteins = roundNumbers(meal.proteins - proteins);

    await meal.save();

    res
      .status(200)
      .json({ success: true, message: "Food item removed", data: meal });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to remove food item",
        error: error.message,
      });
  }
});

/**
 * PATCH /meals/:id/add-food-item
 * Adds a food item to a meal and updates nutritional values.
 */
router.patch("/meals/:id/add-food-item", async (req, res) => {
  try {
    const { foodItem, mainNutrients } = req.body;
    const { cals, carbs, fats, proteins } = mainNutrients;

    const newFoodItem = new FoodItemModel(foodItem);
    await newFoodItem.save();

    const meal = await MealModel.findById(req.params.id);
    meal.foodItems.push(newFoodItem);
    meal.cals = roundNumbers(meal.cals + cals);
    meal.carbs = roundNumbers(meal.carbs + carbs);
    meal.fats = roundNumbers(meal.fats + fats);
    meal.proteins = roundNumbers(meal.proteins + proteins);

    await meal.save();

    res
      .status(200)
      .json({ success: true, message: "Food item added", data: meal });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to add food item",
        error: error.message,
      });
  }
});

/**
 * PATCH /meals/:id/update-food-item/:foodItemId
 * Updates a food item and adjusts the meal's nutritional totals.
 */
router.patch("/meals/:id/update-food-item/:foodItemId", async (req, res) => {
  try {
    const { foodItem, mainNutrients, oldMainNutrients } = req.body;
    const { cals, carbs, fats, proteins } = mainNutrients;

    const updatedFoodItem = await FoodItemModel.updateOne(
      { _id: req.params.foodItemId },
      {
        name: foodItem.name,
        quantity: foodItem.quantity,
        unitOfMeasurement: foodItem.unitOfMeasurement,
        notes: foodItem.notes,
        nutrients: foodItem.nutrients,
        mainNutrients,
      }
    );

    const meal = await MealModel.findById(req.params.id);
    meal.cals = roundNumbers(meal.cals + cals - oldMainNutrients.cals);
    meal.carbs = roundNumbers(meal.carbs + carbs - oldMainNutrients.carbs);
    meal.fats = roundNumbers(meal.fats + fats - oldMainNutrients.fats);
    meal.proteins = roundNumbers(
      meal.proteins + proteins - oldMainNutrients.proteins
    );

    await meal.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Food item updated",
        data: updatedFoodItem,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update food item",
        error: error.message,
      });
  }
});

export default router;

import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import { FoodItemModel } from "../models/FoodItem.js";
import roundNumbers from "../helpers/roundNumbers.js";

const router = Router();

/**
 * GET /getMeals
 * Fetches all meals from the database.
 */
router.get("/getMeals", async (req, res) => {
  MealModel.find({})
    .then(function (meal) {
      res.status(201).json({
        success: true,
        message: "Meal successfully found",
        data: meal,
      });
    })
    .catch(function (error) {
      res.status(500).json({
        success: false,
        message: "Error finding Meal",
        error: error,
      });
    });
});

/**
 * POST /getMealsByDateAndUser
 * Returns meals that match a specific date and user ID.
 */
router.post("/getMealsByDateAndUser", async (req, res) => {
  const { date, user } = req.body;
  await MealModel.find({ createdAt: date, user: user })
    .then(function (meal) {
      res.status(201).json({
        success: true,
        message: "Meal successfully found",
        data: meal,
      });
    })
    .catch(function (error) {
      res.status(500).json({
        success: false,
        message: "Error finding Meal",
        error: error,
      });
    });
});

/**
 * POST /getMealById
 * Fetches a meal by its MongoDB ObjectId and populates food items.
 */
router.post("/getMealById", async (req, res) => {
  const { id } = req.body;
  await MealModel.findById(id)
    .populate("foodItems")
    .then(function (meal) {
      res.status(201).json({
        success: true,
        message: "Meal successfully found",
        data: meal,
      });
    })
    .catch(function (error) {
      res.status(500).json({
        success: false,
        message: "Error finding Meal",
        error: error,
      });
    });
});

/**
 * POST /createMeal
 * Creates a new meal from the request body.
 */
router.post("/createMeal", async (req, res) => {
  try {
    const meal = req.body;
    const newMeal = new MealModel(meal);
    await newMeal.save();

    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: newMeal,
    });
  } catch (error) {
    let errorMessage;
    if (error.name === "ValidationError") {
      if (error.errors["title"]) {
        errorMessage = error.errors["title"].message;
      }
    } else {
      errorMessage = "Unexpected error";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: error,
    });
  }
});

/**
 * POST /deleteMeal
 * Deletes a meal and all its associated food items.
 */
router.post("/deleteMeal", async (req, res) => {
  try {
    const { id } = req.body;

    const meal = await MealModel.findById(id);
    await FoodItemModel.deleteMany({ _id: { $in: meal.foodItems } }); // Delete all related food items
    await MealModel.deleteOne({ _id: id }); // Delete the meal

    res.status(201).json({
      success: true,
      message: "Meal deleted successfully",
      data: meal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting Meal",
      error: error,
    });
  }
});

/**
 * POST /deleteMealFoodItem
 * Removes a specific food item from a meal and updates meal's totals.
 */
router.post("/deleteMealFoodItem", async (req, res) => {
  try {
    const { mealId, foodId } = req.body;

    const foodItem = await FoodItemModel.findByIdAndDelete(foodId);
    let meal = await MealModel.findById(mealId);

    // Remove food item from meal
    meal.foodItems = meal.foodItems.filter((item) => item.toString() != foodId);

    // Subtract nutrients from meal totals
    const { cals, carbs, fats, proteins } = foodItem.mainNutrients;
    meal.cals = roundNumbers(meal.cals - cals);
    meal.carbs = roundNumbers(meal.carbs - carbs);
    meal.fats = roundNumbers(meal.fats - fats);
    meal.proteins = roundNumbers(meal.proteins - proteins);

    await meal.save();

    res.status(201).json({
      success: true,
      message: "FoodItem deleted successfully",
      data: meal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting FoodItem",
      error: error,
    });
  }
});

/**
 * POST /updateMealAddFoodItem
 * Adds a new food item to an existing meal and updates nutritional values.
 */
router.post("/updateMealAddFoodItem", async (req, res) => {
  try {
    const { id, foodItem, mainNutrients } = req.body;
    const { cals, carbs, fats, proteins } = mainNutrients;

    const newFoodItem = new FoodItemModel(foodItem);
    await newFoodItem.save();

    const meal = await MealModel.findById(id);
    meal.foodItems.push(newFoodItem); // Add food item reference
    meal.cals = roundNumbers(meal.cals + cals);
    meal.carbs = roundNumbers(meal.carbs + carbs);
    meal.fats = roundNumbers(meal.fats + fats);
    meal.proteins = roundNumbers(meal.proteins + proteins);

    await meal.save();

    res.status(201).json({
      success: true,
      message: "FoodItem added successfully",
      data: meal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding FoodItem",
      error: error,
    });
  }
});

/**
 * POST /updateFoodItem
 * Updates a food item and recalculates the meal's nutritional values accordingly.
 */
router.post("/updateFoodItem", async (req, res) => {
  try {
    const { id, foodItemId, foodItem, mainNutrients, oldMainNutrients } =
      req.body;
    const { cals, carbs, fats, proteins } = mainNutrients;
    const updatedFoodItem = await FoodItemModel.updateOne(
      { _id: foodItemId },
      {
        name: foodItem.name,
        quantity: foodItem.quantity,
        unitOfMeasurement: foodItem.unitOfMeasurement,
        notes: foodItem.notes,
        nutrients: foodItem.nutrients,
        mainNutrients: mainNutrients,
      }
    );

    // Adjust meal nutrition
    const meal = await MealModel.findById(id);
    meal.cals = roundNumbers(meal.cals + cals - oldMainNutrients.cals);
    meal.carbs = roundNumbers(meal.carbs + carbs - oldMainNutrients.carbs);
    meal.fats = roundNumbers(meal.fats + fats - oldMainNutrients.fats);
    meal.proteins = roundNumbers(
      meal.proteins + proteins - oldMainNutrients.proteins
    );

    await meal.save();

    res.status(201).json({
      success: true,
      message: "FoodItem updated successfully",
      data: updatedFoodItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating FoodItem",
      error: error,
    });
  }
});

/**
 * Example boilerplate route (commented out).
 * Structure for future endpoints.
 */
// router.post("/name", async (req, res) => {
//   try {
//     const { } = req.body
//     //  Implement logic here

//     res.status(201).json({
//       success: true,
//       message: "Successful message",
//       data: meal,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error message",
//       error: error,
//     });
//   }
// });

export default router;

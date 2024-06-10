import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import { FoodItemModel } from "../models/FoodItem.js";
import roundNumbers from "../helpers/roundNumbers.js";

const router = Router();

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

router.post("/getMealsByDate", async (req, res) => {
  const { date } = req.body;
  await MealModel.find({ createdAt: date })
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

// router.post("/createFoodItem", async (req, res) => {
//   try {
//     const foodItem = req.body;
//     const newFoodItem = new FoodItemModel(foodItem);
//     await newFoodItem.save();

//     res.status(201).json({
//       success: true,
//       message: "FoodItem created successfully",
//       data: newFoodItem,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Please enter a name for the meal",
//       error: e.message,
//     });
//   }
// });

router.post("/deleteMeal", async (req, res) => {
  const { id } = req.body;

  MealModel.findByIdAndDelete(id)
    .then(function (meal) {
      res.status(201).json({
        success: true,
        message: "Meal deleted successfully",
        data: meal,
      });
    })
    .catch(function (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting Meal",
        error: error,
      });
    });
});

router.post("/deleteMealFoodItem", async (req, res) => {
  try {
    const { mealId, foodId } = req.body;

    const foodItem = await FoodItemModel.findByIdAndDelete(foodId);
    let meal = await MealModel.findById(mealId);
    meal.foodItems = meal.foodItems.filter((item) => item.toString() != foodId);

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

router.post("/updateMealAddFoodItem", async (req, res) => {
  try {
    const { id, foodItem, mainNutrients } = req.body;
    const { cals, carbs, fats, proteins } = mainNutrients;

    // Create new FoodItem
    const newFoodItem = new FoodItemModel(foodItem);
    await newFoodItem.save();

    const meal = await MealModel.findById(id);
    meal.foodItems.push(newFoodItem);
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

//BOILERPLATE ROUTE
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

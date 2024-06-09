import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import { FoodItemModel } from "../models/FoodItem.js";
import roundNumbers from "../helpers/roundNumbers.js";
import { ObjectId } from "mongodb";

const router = Router();

router.get("/getMeals", async (req, res) => {
  MealModel.find({})
    .then(function (meals) {
      res.json(meals);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/getMealsByDate", async (req, res) => {
  const { date } = req.body;
  await MealModel.find({ createdAt: date })
    .then(function (meals) {
      res.json(meals);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/getMealById", async (req, res) => {
  const { id } = req.body;
  await MealModel.findById(id)
    .populate("foodItems")
    .then((meal) => {
      res.json(meal);
    })
    .catch((err) => {
      res.json(err);
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
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Please enter a name for the meal",
      error: e.message,
    });
  }
});

router.post("/createFoodItem", async (req, res) => {
  const foodItem = req.body;
  const newFoodItem = new FoodItemModel(foodItem);
  await newFoodItem.save();
  res.json(foodItem);
});

router.post("/deleteMeal", async (req, res) => {
  const { id } = req.body;

  MealModel.findByIdAndDelete(id)
    .then(function (meal) {
      res.json(meal);
    })
    .catch(function (err) {
      res.json(err);
    });
});

router.post("/deleteMealFoodItem", async (req, res) => {
  const { mealId, foodId } = req.body;

  const foodItem = await FoodItemModel.findByIdAndDelete(foodId);
  let meal = await MealModel.findById(mealId);
  meal.foodItems = meal.foodItems.filter((item) => item.toString() != foodId);

  const { cals, carbs, fats, proteins } = foodItem.mainNutrients;
  meal.cals = roundNumbers(meal.cals - cals);
  meal.carbs = roundNumbers(meal.carbs - carbs);
  meal.fats = roundNumbers(meal.fats - fats);
  meal.proteins = roundNumbers(meal.proteins - proteins);

  await meal
    .save()
    .then((res) => res.json(meal))
    .catch((err) => res.json(err));
});

router.post("/updateMealAddFoodItem", async (req, res) => {
  const { id, foodItem, mainNutrients } = req.body;
  const { cals, carbs, fats, proteins } = mainNutrients;

  // Create new FoodItem
  const newFoodItem = new FoodItemModel(foodItem);
  await newFoodItem.save();

  const doc = await MealModel.findById(id);
  doc.foodItems.push(newFoodItem);
  doc.cals = roundNumbers(doc.cals + cals);
  doc.carbs = roundNumbers(doc.carbs + carbs);
  doc.fats = roundNumbers(doc.fats + fats);
  doc.proteins = roundNumbers(doc.proteins + proteins);

  await doc
    .save()
    .then((meal) => {
      res.json(meal);
    })
    .catch((err) => {
      res.json(err);
    });
});

export default router;

import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import roundNumbers from "../helpers/roundNumbers.js";

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

router.post("/getMealById", async (req, res) => {
  const { id } = req.body;
  await MealModel.findById(id)
    .then((meal) => {
      res.json(meal);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/createMeal", async (req, res) => {
  const meal = req.body;
  const newMeal = new MealModel(meal);
  await newMeal.save();

  res.json(meal);
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

router.post("/updateMealAddFoodItem", async (req, res) => {
  const { id, foodItem, mainNutrients } = req.body;
  const { cals, carbs, fats, proteins } = mainNutrients;

  const doc = await MealModel.findById(id);
  doc.foodItems.push(foodItem);
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

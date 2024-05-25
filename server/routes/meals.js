import { Router } from "express";
import { MealModel } from "../models/Meals.js";
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

export default router;

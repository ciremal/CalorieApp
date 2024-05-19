import { Router } from "express";
import { MealModel } from "../models/Meals.js";

const router = Router();

router.get("/getMeals", async (req, res) => {
  MealModel.find({})
    .then(function (users) {
      res.json(users);
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

export default router;

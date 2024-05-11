import { Router } from "express";
import { Meal } from "../models/mealModels.js";

const router = Router();

router.post("/meals", async (req, res) => {
  try {
    const newMeal = {
      title: req.body.title,
      foodItems: req.body.foodItems,
    };
    const meal = await Meal.create(newMeal);
    console.log("Successful");
    return res.status(201).send(meal);
  } catch (err) {
    console.log(err.message);
  }
});

export default router;

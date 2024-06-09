import mongoose from "mongoose";
import getDate from "../helpers/getDate.js";

const mealSchema = mongoose.Schema({
  title: {
    type: String,
    required: { value: true, message: "Please enter a name for the meal" },
  },
  foodItems: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", default: [] },
  ],
  cals: {
    type: Number,
    required: false,
    default: 0,
  },
  fats: {
    type: Number,
    required: false,
    default: 0,
  },
  proteins: {
    type: Number,
    required: false,
    default: 0,
  },
  carbs: {
    type: Number,
    required: false,
    default: 0,
  },
  createdAt: {
    type: String,
    default: getDate(),
  },
});

export const MealModel = mongoose.model("Meal", mealSchema, "Meals");

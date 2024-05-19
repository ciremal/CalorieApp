import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  foodItems: {
    type: [Object],
    required: false,
    default: [],
  },
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
});

export const MealModel = mongoose.model("Meal", mealSchema, "Meals");

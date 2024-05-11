import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  foodItems: {
    type: [String],
    required: false,
  },
});

export const MealModel = mongoose.model("Meal", mealSchema, "Meals");

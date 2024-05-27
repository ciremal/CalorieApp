import mongoose from "mongoose";

const mealSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
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
    type: Date,
    default: new Date(),
  },
});

export const MealModel = mongoose.model("Meal", mealSchema, "Meals");

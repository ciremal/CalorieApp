import mongoose from "mongoose";

const foodItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitOfMeasurement: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  nutrients: {
    type: [Object],
    required: false,
  },
  mainNutrients: {
    type: Object,
    required: false,
  },
});

export const FoodItemModel = mongoose.model(
  "FoodItem",
  foodItemSchema,
  "FoodItems"
);

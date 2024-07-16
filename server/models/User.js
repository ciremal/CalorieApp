import mongoose from "mongoose";
import getDate from "../helpers/getDate.js";

const userSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      default: null,
    },
    createdAt: {
      type: String,
      default: getDate(),
    },
    height: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    weightGoal: {
      type: Number,
      default: 0,
    },
    calorieGoal: {
      type: Number,
      default: 0,
    },
    PA: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

export const UserModel = mongoose.model("User", userSchema, "Users");

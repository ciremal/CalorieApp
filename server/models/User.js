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
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    startWeight: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    currentWeight: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    weightGoal: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    weightHistory: {
      type: [Object],
      default: [],
    },
    calorieGoal: {
      type: mongoose.Types.Decimal128,
      default: 0,
    },
    PA: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    DOB: {
      type: String,
      default: "",
    },
    profileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

export const UserModel = mongoose.model("User", userSchema, "Users");

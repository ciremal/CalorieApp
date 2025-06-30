import { Router } from "express";
import { UserModel } from "../models/User.js";

const router = Router();

/**
 * GET /users/:id
 * Fetch a user by ID, converting Decimal128 fields to floats for frontend use.
 */
router.get("/users/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userData = user.toObject();
    userData.height = parseFloat(userData.height?.toString());
    userData.currentWeight = parseFloat(userData.currentWeight?.toString());
    userData.startWeight = parseFloat(userData.startWeight?.toString());
    userData.weightGoal = parseFloat(userData.weightGoal?.toString());
    userData.calorieGoal = parseFloat(userData.calorieGoal?.toString());

    res
      .status(200)
      .json({ success: true, message: "User found", data: userData });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch user",
        error: error.message,
      });
  }
});

/**
 * POST /users
 * Create a new user document with a provided UID.
 */
router.post("/users", async (req, res) => {
  try {
    const { user, uid } = req.body;
    const newUser = new UserModel(user);
    newUser._id = uid;
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create user",
        error: error.message,
      });
  }
});

/**
 * PATCH /users/:id
 * Update general user information.
 */
router.patch("/users/:id", async (req, res) => {
  try {
    const updateFields = req.body;

    const updatedUser = await UserModel.updateOne(
      { _id: req.params.id },
      updateFields
    );
    res
      .status(200)
      .json({ success: true, message: "User updated", data: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update user",
        error: error.message,
      });
  }
});

/**
 * PATCH /users/:id/weight
 * Update weightGoal, startWeight, currentWeight and append weightHistory entry.
 */
router.patch("/users/:id/weight", async (req, res) => {
  try {
    const { weightGoal, startWeight, currentWeight, weightLog } = req.body;
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (weightLog) {
      user.weightHistory.push(weightLog);
    }

    const updatedUser = await UserModel.updateOne(
      { _id: req.params.id },
      {
        weightGoal,
        startWeight,
        currentWeight,
        weightHistory: user.weightHistory,
      }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "User weight updated",
        data: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update weight",
        error: error.message,
      });
  }
});

/**
 * PATCH /users/:id/calorie-goal
 * Update the user's calorieGoal only.
 */
router.patch("/users/:id/calorie-goal", async (req, res) => {
  try {
    const { calorieGoal } = req.body;
    const updatedUser = await UserModel.updateOne(
      { _id: req.params.id },
      { calorieGoal }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Calorie goal updated",
        data: updatedUser,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update calorie goal",
        error: error.message,
      });
  }
});

export default router;

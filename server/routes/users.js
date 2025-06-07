import { Router } from "express";
import { UserModel } from "../models/User.js";

const router = Router();

/**
 * POST /getUserById
 * Fetch a user by ID, converting all Decimal128 fields to float values for frontend use
 */
router.post("/getUserById", async (req, res) => {
  try {
    const { id } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Convert Decimal128 fields to float (usable in frontend apps)
    const userData = user.toObject();
    userData.height = parseFloat(userData.height.toString());
    userData.currentWeight = parseFloat(userData.currentWeight.toString());
    userData.startWeight = parseFloat(userData.startWeight.toString());
    userData.weightGoal = parseFloat(userData.weightGoal.toString());
    userData.calorieGoal = parseFloat(userData.calorieGoal.toString());

    res.status(201).json({
      success: true,
      message: "User found",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

/**
 * POST /createUser
 * Create a new user document with the provided data and a specific UID
 */
router.post("/createUser", async (req, res) => {
  try {
    const { user, uid } = req.body;

    const newUser = new UserModel(user);
    newUser._id = uid; // set custom _id to match Firebase UID or other unique identifier
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

/**
 * POST /updateUser
 * Update general user information such as name, weight, PA, profile completion, etc.
 */
router.post("/updateUser", async (req, res) => {
  try {
    const { id, user } = req.body;

    const {
      name,
      gender,
      DOB,
      height,
      startWeight,
      currentWeight,
      weightHistory,
      weightGoal,
      calorieGoal,
      PA,
      profileComplete,
    } = user;

    const updatedUser = await UserModel.updateOne(
      { _id: id },
      {
        name,
        gender,
        DOB,
        height,
        startWeight,
        currentWeight,
        weightHistory,
        weightGoal,
        calorieGoal,
        PA,
        profileComplete,
      }
    );

    res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

/**
 * POST /updateWeight
 * Update the user's weightGoal, startWeight, and currentWeight.
 * Also adds a new entry to the weightHistory array if provided.
 */
router.post("/updateWeight", async (req, res) => {
  try {
    const { id, weightGoal, startWeight, currentWeight, weightLog } = req.body;

    const user = await UserModel.findById(id);
    if (weightLog) {
      user.weightHistory.push(weightLog); // append new log entry
    }

    const updatedUser = await UserModel.updateOne(
      { _id: id },
      {
        weightGoal,
        startWeight,
        currentWeight,
        weightHistory: user.weightHistory,
      }
    );

    res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

/**
 * POST /updateCalorieGoal
 * Update only the user's calorieGoal
 */
router.post("/updateCalorieGoal", async (req, res) => {
  try {
    const { id, calorieGoal } = req.body;

    const updatedUser = await UserModel.updateOne(
      { _id: id },
      {
        calorieGoal,
      }
    );

    res.status(201).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

export default router;

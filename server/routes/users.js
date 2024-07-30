import { Router } from "express";
import { UserModel } from "../models/User.js";

const router = Router();

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

    // Convert Decimal128 to usable decimal values
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

router.post("/createUser", async (req, res) => {
  try {
    const { user, uid } = req.body;
    const newUser = new UserModel(user);
    newUser._id = uid;
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
        name: name,
        gender: gender,
        DOB: DOB,
        height: height,
        startWeight: startWeight,
        currentWeight: currentWeight,
        weightHistory: weightHistory,
        weightGoal: weightGoal,
        calorieGoal: calorieGoal,
        PA: PA,
        profileComplete: profileComplete,
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

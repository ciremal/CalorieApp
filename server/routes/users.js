import { Router } from "express";
import { UserModel } from "../models/User.js";

const router = Router();

router.post("/getUserById", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id);

    res.status(201).json({
      success: true,
      message: "User found",
      data: user,
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
      weight,
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
        weight: weight,
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

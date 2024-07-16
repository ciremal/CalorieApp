import { Router } from "express";
import roundNumbers from "../helpers/roundNumbers.js";
import { UserModel } from "../models/User.js";

const router = Router();

router.post("/getUserById", async (req, res) => {
  try {
    const { id } = req.body;
    const user = await UserModel.findById(id);
    console.log(user);

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
    const { id, name, height, weight, weightGoal, calorieGoal, PA } = req.body;
    const updatedUser = await UserModel.updateOne(
      { _id: id },
      {
        name: name,
        height: height,
        weight: weight,
        weightGoal: weightGoal,
        calorieGoal: calorieGoal,
        PA: PA,
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

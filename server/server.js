import express from "express";
// import bodyParser from "body-parser";
// import { PORT, mongDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { MealModel } from "./models/Meals.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://ericlam42:cRoHGgaQmmxibIXP@calorieappcluster.hobpged.mongodb.net/CalorieApp"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.listen(5000, () => {
  console.log(`Listening on port ${5000}`);
});

app.get("/getMeals", async (req, res) => {
  MealModel.find({})
    .then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      res.json(err);
    });
});

app.post("/createMeal", async (req, res) => {
  const meal = req.body;
  const newMeal = new MealModel(meal);
  await newMeal.save();

  res.json(meal);
});

import express from "express";
// import bodyParser from "body-parser";
// import { PORT, mongDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

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

app.use(routes);

app.listen(5000, () => {
  console.log(`Listening on port ${5000}`);
});

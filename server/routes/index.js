import { Router } from "express";
import mealRoutes from "./meals.js";

const router = Router();

router.get("/", (req, res) => {
  res.send({ status: "Started" });
});

router.use("/meals", mealRoutes);

export default router;

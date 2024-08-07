import { Router } from "express";
import mealRoutes from "./meals.js";
import userRoutes from "./users.js";
import chartRoutes from "./charts.js";

const router = Router();

router.get("/", (req, res) => {
  res.send({ status: "Started" });
});

router.use("/meals", mealRoutes);
router.use("/users", userRoutes);
router.use("/charts", chartRoutes);

export default router;

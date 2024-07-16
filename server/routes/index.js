import { Router } from "express";
import mealRoutes from "./meals.js";
import userRoutes from "./users.js";

const router = Router();

router.get("/", (req, res) => {
  res.send({ status: "Started" });
});

router.use("/meals", mealRoutes);
router.use("/users", userRoutes);

export default router;

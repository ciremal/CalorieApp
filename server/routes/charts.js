import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import { formatDate } from "../helpers/formatDate.js";
import { startOfWeek, subWeeks, add } from "date-fns";

const router = Router();

/**
 * GET /stats/calories
 * Retrieves total daily calories for a given week ("This Week" or "Last Week") for a specific user.
 */
router.get("/stats/calories", async (req, res) => {
  try {
    const { period, userId } = req.query;
    let referenceDate;

    switch (period) {
      case "This Week":
        referenceDate = new Date();
        break;
      case "Last Week":
        referenceDate = subWeeks(new Date(), 1);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid period value" });
    }

    const start = startOfWeek(referenceDate);
    const dates = Array.from({ length: 7 }, (_, i) =>
      formatDate(add(start, { days: i }))
    );

    const meals = await MealModel.aggregate([
      { $match: { createdAt: { $in: dates }, user: userId } },
      {
        $group: {
          _id: "$createdAt",
          totalCals: { $sum: "$cals" },
        },
      },
      {
        $addFields: {
          totalCals: { $round: ["$totalCals", 2] },
        },
      },
    ]);

    const existingDates = new Set(meals.map((item) => item._id));
    const result = dates.map((date) => {
      const match = meals.find((item) => item._id === date);
      return {
        date,
        totalCals: match ? match.totalCals : 0,
      };
    });

    res.status(200).json({
      success: true,
      message: "Calorie stats retrieved",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch calorie stats",
      error: error.message,
    });
  }
});

/**
 * GET /stats/macros
 * Retrieves total daily macronutrients for the given week ("This Week" or "Last Week") and user.
 */
router.get("/stats/macros", async (req, res) => {
  try {
    const { period, userId } = req.query;
    let referenceDate;

    switch (period) {
      case "This Week":
        referenceDate = new Date();
        break;
      case "Last Week":
        referenceDate = subWeeks(new Date(), 1);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid period value" });
    }

    const start = startOfWeek(referenceDate);
    const dates = Array.from({ length: 7 }, (_, i) =>
      formatDate(add(start, { days: i }))
    );

    const meals = await MealModel.aggregate([
      { $match: { createdAt: { $in: dates }, user: userId } },
      {
        $group: {
          _id: "$createdAt",
          totalCarbs: { $sum: "$carbs" },
          totalFats: { $sum: "$fats" },
          totalProteins: { $sum: "$proteins" },
        },
      },
      {
        $addFields: {
          totalCarbs: { $round: ["$totalCarbs", 2] },
          totalFats: { $round: ["$totalFats", 2] },
          totalProteins: { $round: ["$totalProteins", 2] },
        },
      },
    ]);

    // Fill missing dates with 0 values
    const existingDates = meals.map((item) => item._id);
    const result = dates.map((date) => {
      if (!existingDates.includes(date)) {
        return {
          date: date,
          totalCarbs: 0,
          totalFats: 0,
          totalProteins: 0,
        };
      } else {
        const found = meals.find((item) => item._id === date);
        return {
          date: date,
          totalCarbs: found.totalCarbs,
          totalFats: found.totalFats,
          totalProteins: found.totalProteins,
        };
      }
    });

    res
      .status(200)
      .json({ success: true, message: "Macro stats retrieved", data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch macro stats",
      error: error.message,
    });
  }
});

export default router;

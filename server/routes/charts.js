import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import { formatDate } from "../helpers/formatDate.js";
import { startOfWeek, subWeeks, add } from "date-fns";

const router = Router();

/**
 * POST /getCalorieChartStats
 * Retrieves total daily calories for a given week ("This Week" or "Last Week") for a specific user
 */
router.post("/getCalorieChartStats", async (req, res) => {
  try {
    const { period, userId } = req.body;
    let currDate;

    // Determine the reference date based on selected period
    switch (period) {
      case "This Week":
        currDate = new Date(); // today's date
        break;
      case "Last Week":
        currDate = subWeeks(new Date(), 1); // date one week ago
        break;
      default:
        break;
    }

    // Get the start of the week (Sunday) and create an array of dates for the week
    const start = startOfWeek(currDate);
    const dates = [];

    for (let i = 0; i < 7; i++) {
      dates.push(formatDate(add(start, { days: i }))); // format each date
    }

    // Aggregate total calories grouped by date
    const meals = await MealModel.aggregate([
      { $match: { createdAt: { $in: dates }, user: userId } }, // filter by user and date
      {
        $group: {
          _id: "$createdAt", // group by creation date
          totalCals: {
            $sum: "$cals", // sum of calories
          },
        },
      },
      {
        $addFields: {
          totalCals: { $round: ["$totalCals", 2] }, // round to 2 decimals
        },
      },
    ]);

    // Fill in 0s for any missing days in the week
    const existingDates = meals.map((item) => item._id);
    const result = dates.map((date) => {
      if (!existingDates.includes(date)) {
        return {
          date: date,
          totalCals: 0,
        };
      } else {
        return {
          date: date,
          totalCals: meals.find((item) => item._id === date).totalCals,
        };
      }
    });

    // Send successful response with calorie data
    res.status(201).json({
      success: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    // Error handling
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

/**
 * POST /getMacroChartStats
 * Retrieves total daily macronutrients (carbs, fats, proteins) for the selected week and user
 */
router.post("/getMacroChartStats", async (req, res) => {
  try {
    const { period, userId } = req.body;
    let currDate;

    // Determine the base date from the selected period
    switch (period) {
      case "This Week":
        currDate = new Date();
        break;
      case "Last Week":
        currDate = subWeeks(new Date(), 1);
        break;
      default:
        break;
    }

    // Generate a week's worth of dates starting from Sunday
    const start = startOfWeek(currDate);
    const dates = [];

    for (let i = 0; i < 7; i++) {
      dates.push(formatDate(add(start, { days: i })));
    }

    // Aggregate macronutrients for each day
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

    // Send successful response with macro data
    res.status(201).json({
      success: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    // Error handling
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

export default router;

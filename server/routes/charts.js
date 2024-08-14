import { Router } from "express";
import { MealModel } from "../models/Meals.js";
import { formatDate } from "../helpers/formatDate.js";
import { startOfWeek, subWeeks, add } from "date-fns";

const router = Router();

router.post("/getCalorieChartStats", async (req, res) => {
  try {
    const { period, userId } = req.body;
    let currDate;

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

    const start = startOfWeek(currDate);
    const dates = [];

    for (let i = 0; i < 7; i++) {
      dates.push(formatDate(add(start, { days: i })));
    }

    const meals = await MealModel.aggregate([
      { $match: { createdAt: { $in: dates }, user: userId } },
      {
        $group: {
          _id: "$createdAt",
          totalCals: {
            $sum: "$cals",
          },
        },
      },
      {
        $addFields: {
          totalCals: { $round: ["$totalCals", 2] },
        },
      },
    ]);

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

    res.status(201).json({
      success: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

router.post("/getMacroChartStats", async (req, res) => {
  try {
    const { period, userId } = req.body;
    let currDate;

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

    const start = startOfWeek(currDate);
    const dates = [];

    for (let i = 0; i < 7; i++) {
      dates.push(formatDate(add(start, { days: i })));
    }

    const meals = await MealModel.aggregate([
      { $match: { createdAt: { $in: dates }, user: userId } },
      {
        $group: {
          _id: "$createdAt",
          totalCarbs: {
            $sum: "$carbs",
          },
          totalFats: {
            $sum: "$fats",
          },
          totalProteins: {
            $sum: "$proteins",
          },
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
        return {
          date: date,
          totalCarbs: meals.find((item) => item._id === date).totalCarbs,
          totalFats: meals.find((item) => item._id === date).totalFats,
          totalProteins: meals.find((item) => item._id === date).totalProteins,
        };
      }
    });

    res.status(201).json({
      success: true,
      message: "Success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});

export default router;

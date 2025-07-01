import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const backendIp = process.env.EXPO_PUBLIC_BACKEND_IP;

export const useGetMeals = () => {
  return useQuery(["getMeals"], async () => {
    try {
      const res = await axios.get(`http://${backendIp}:5000/meals`);
      return res.data.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  });
};

export const useGetMealsByDateAndUser = (date, user) => {
  return useQuery(["getMealsByDateAndUser", date, user], async () => {
    try {
      const res = await axios.get(
        `http://${backendIp}:5000/meals/by-date-user`,
        {
          params: { date, user },
        }
      );
      return res.data.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  });
};

export const useGetMealById = (id) => {
  return useQuery(["getMealById", id], async () => {
    try {
      const res = await axios.get(`http://${backendIp}:5000/meals/${id}`);
      return res.data.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  });
};

export const createMeal = async ({ title, user, createdAt }) => {
  try {
    const res = await axios.post(`http://${backendIp}:5000/meals`, {
      title,
      createdAt,
      user,
    });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteMeal = async (id) => {
  try {
    const res = await axios.delete(`http://${backendIp}:5000/meals/${id}`);
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteFoodItem = async ({ mealId, foodId }) => {
  try {
    const res = await axios.patch(
      `http://${backendIp}:5000/meals/${mealId}/food-items/${foodId}`
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateMealAddFoodItem = async ({
  id,
  foodItem,
  mainNutrients,
}) => {
  try {
    const res = await axios.patch(
      `http://${backendIp}:5000/meals/${id}/add-food-item`,
      {
        foodItem,
        mainNutrients,
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateFoodItem = async ({
  id,
  foodItemId,
  foodItem,
  mainNutrients,
  oldMainNutrients,
}) => {
  try {
    const res = await axios.patch(
      `http://${backendIp}:5000/meals/${id}/update-food-item/${foodItemId}`,
      {
        foodItem,
        mainNutrients,
        oldMainNutrients,
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

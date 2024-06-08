import axios from "axios";
import { useQuery } from "react-query";

const backendIp = process.env.EXPO_PUBLIC_BACKEND_IP;

export const useGetMeals = () => {
  return useQuery(["getMeals"], async () => {
    return await axios
      .get(`http://${backendIp}:5000/meals/getMeals`)
      .then((res) => res.data);
  });
};

export const useGetMealsByDate = (date) => {
  return useQuery(["getMealsByDate", date], async () => {
    return await axios
      .post(`http://${backendIp}:5000/meals/getMealsByDate`, { date })
      .then((res) => res.data);
  });
};

export const useGetMealById = (id) => {
  return useQuery(["getMealById", id], async () => {
    return await axios
      .post(`http://${backendIp}:5000/meals/getMealById`, { id })
      .then((res) => res.data);
  });
};

export const useCreateMeal = async ({ title, createdAt }) => {
  return axios
    .post(`http://${backendIp}:5000/meals/createMeal`, { title, createdAt })
    .then((res) => res.data);
};

export const useDeleteMeal = async (id) => {
  return axios
    .post(`http://${backendIp}:5000/meals/deleteMeal`, { id })
    .then((res) => res.data);
};

export const useDeleteFoodItem = async ({ mealId, foodId }) => {
  return axios
    .post(`http://${backendIp}:5000/meals/deleteMealFoodItem`, {
      mealId,
      foodId,
    })
    .then((res) => res.json);
};

export const useUpdateMealAddFoodItem = async ({
  id,
  foodItem,
  mainNutrients,
}) => {
  return axios
    .post(`http://${backendIp}:5000/meals/updateMealAddFoodItem`, {
      id,
      foodItem,
      mainNutrients,
    })
    .then((res) => res.json);
};

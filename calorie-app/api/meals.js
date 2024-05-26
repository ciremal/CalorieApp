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

export const useGetMealById = (id) => {
  return useQuery(["getMealById", id], async () => {
    return await axios
      .post(`http://${backendIp}:5000/meals/getMealById`, { id })
      .then((res) => res.data);
  });
};

export const useCreateMeal = async (title) => {
  return axios
    .post(`http://${backendIp}:5000/meals/createMeal`, { title })
    .then((res) => res.data);
};

export const useDeleteMeal = async (id) => {
  return axios
    .post(`http://${backendIp}:5000/meals/deleteMeal`, { id })
    .then((res) => res.data);
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

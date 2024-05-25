import axios from "axios";
import { useMutation, useQuery } from "react-query";

const backendIp = process.env.EXPO_PUBLIC_BACKEND_IP;

export const useGetMeals = () => {
  return useQuery(["getMeals"], async () => {
    return await axios
      .get(`http://${backendIp}:5000/meals/getMeals`)
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

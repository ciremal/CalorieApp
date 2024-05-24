import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const useGetMeals = () => {
  return useQuery(["getMeals"], async () => {
    return await axios
      .get("http://192.168.2.209:5000/meals/getMeals")
      .then((res) => res.data);
  });
};

export const useCreateMeal = async (title) => {
  return axios
    .post("http://192.168.2.209:5000/meals/createMeal", { title })
    .then((res) => res.data);
};

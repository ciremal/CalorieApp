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
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        throw err.response.data;
      });
  });
};

export const useGetMealById = (id) => {
  return useQuery(["getMealById", id], async () => {
    return await axios
      .post(`http://${backendIp}:5000/meals/getMealById`, { id })
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        throw err.response.data;
      });
  });
};

export const useCreateMeal = async ({ title, createdAt }) => {
  return axios
    .post(`http://${backendIp}:5000/meals/createMeal`, {
      title,
      createdAt,
    })
    .then((res) => {
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const useDeleteMeal = async (id) => {
  return axios
    .post(`http://${backendIp}:5000/meals/deleteMeal`, { id })
    .then((res) => {
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const useDeleteFoodItem = async ({ mealId, foodId }) => {
  return axios
    .post(`http://${backendIp}:5000/meals/deleteMealFoodItem`, {
      mealId,
      foodId,
    })
    .then((res) => {
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
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
    .then((res) => {
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

// BOILDERPLATE API Call GET
// export const name = () => {
//   return useQuery(["name"], async () => {
//     return await axios
//       .post(`http://${backendIp}:5000/meals/name`, {})
//       .then((res) => {
//         const { data } = res.data;
//         return data;
//       })
//       .catch((err) => {
//         throw err.response.data;
//       });
//   });
// };

// BOILERPLATE API Call POST
// export const name = async ({}) => {
//   return axios
//     .post(`http://${backendIp}:5000/meals/name`, {})
//     .then((res) => {
//       const { data } = res.data;
//       return data;
//     })
//     .catch((err) => {
//       throw err.response.data;
//     });
// };

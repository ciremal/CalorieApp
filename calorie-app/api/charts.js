import axios from "axios";
import { useQuery } from "react-query";

const backendIp = process.env.EXPO_PUBLIC_BACKEND_IP;

export const useGetCalorieChartStats = (period, userId) => {
  console.log(period);
  console.log(userId);
  return useQuery(["getCalorieChartStats", period, userId], async () => {
    return await axios
      .post(`http://${backendIp}:5000/charts/getCalorieChartStats`, {
        period,
        userId,
      })
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        throw err.response.data;
      });
  });
};

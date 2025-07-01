import axios from "axios";
import { useQuery } from "react-query";

const backendIp = process.env.EXPO_PUBLIC_BACKEND_IP;

export const useGetCalorieChartStats = (period, userId) => {
  return useQuery(["getCalorieChartStats", period, userId], async () => {
    return await axios
      .get(`http://${backendIp}:5000/stats/calories`, {
        params: { period, userId },
      })
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        throw err.response?.data || err;
      });
  });
};

export const useGetMacroChartStats = (period, userId) => {
  return useQuery(["getMacroChartStats", period, userId], async () => {
    try {
      const res = await axios.get(`http://${backendIp}:5000/stats/macros`, {
        params: { period, userId },
      });
      return res.data.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  });
};

import axios from "axios";
import { useQuery } from "react-query";

const backendIp = process.env.EXPO_PUBLIC_BACKEND_IP;

export const useGetUserById = (id) => {
  return useQuery(["getUserById", id], async () => {
    try {
      const res = await axios.get(`http://${backendIp}:5000/users/${id}`);
      return res.data.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  });
};

export const createUser = async ({ user, uid }) => {
  try {
    const res = await axios.post(`http://${backendIp}:5000/users`, {
      user,
      uid,
    });
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateUser = async ({ id, user }) => {
  try {
    const res = await axios.patch(`http://${backendIp}:5000/users/${id}`, user);
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateUserWeight = async ({
  id,
  currentWeight,
  startWeight,
  weightGoal,
  weightLog,
}) => {
  try {
    const res = await axios.patch(
      `http://${backendIp}:5000/users/${id}/weight`,
      {
        currentWeight,
        startWeight,
        weightGoal,
        weightLog,
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateCalorieGoal = async ({ id, calorieGoal }) => {
  try {
    const res = await axios.patch(
      `http://${backendIp}:5000/users/${id}/calorie-goal`,
      {
        calorieGoal,
      }
    );
    return res.data.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

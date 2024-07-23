import axios from "axios";
import { useQuery } from "react-query";

const backendIp = process.env.EXPO_PUBLIC_BACKEND_IP;

export const useGetUserById = (id) => {
  return useQuery(["getUserById", id], async () => {
    return await axios
      .post(`http://${backendIp}:5000/users/getUserById`, { id })
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        throw err.response.data;
      });
  });
};

export const useCreateUser = async ({ user, uid }) => {
  return axios
    .post(`http://${backendIp}:5000/users/createUser`, {
      user,
      uid,
    })
    .then((res) => {
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const useUpdateUser = async ({ id, user }) => {
  return axios
    .post(`http://${backendIp}:5000/users/updateUser`, {
      id,
      user,
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

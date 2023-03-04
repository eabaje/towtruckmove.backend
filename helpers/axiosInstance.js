import axios from "axios";
//import AsyncLocalStorage from '@createnextapp/async-local-storage'
//import envs from "../config/env";
import { API_URL } from "../constants";

let headers = {};
// if (localStorage.token) {
//   headers.Authorization = `Bearer ${localStorage.token}`;
// }
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    if (!error.message) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.message.status === 403) {
      // history.push(`/${LOGOUT}`);

      localStorage.removeItem("token");
      //  navigate(LOGOUT, { tokenExpired: true });
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);

export default axiosInstance;

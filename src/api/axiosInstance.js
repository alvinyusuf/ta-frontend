import axios from "axios";

let axiosInstance = null;

export const setAxiosInstance = (baseURL) => {
  axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  });
};

export const getAxiosInstance = () => axiosInstance;

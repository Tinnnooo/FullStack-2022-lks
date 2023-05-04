import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/"
});

axiosClient.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("TOKEN");
  config.params = {
    ...config.params,
    token: userToken,
  };
  return config;
});

const invalidToken = () => {
  localStorage.removeItem("TOKEN");
  window.location.reload();
}

export {
  axiosClient,
  invalidToken
};
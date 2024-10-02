import axios, { InternalAxiosRequestConfig } from "axios";
import configFile from "@config/config.json";

const http = axios.create({
  baseURL: configFile.apiEndpoint,
  params: {},
  withCredentials: true
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;

  return config;
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
};

export default httpService;

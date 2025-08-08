/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const createApiClient = () => {
  const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem("auth") || "{}").token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );

  const get = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => await api.get<T>(url, config);

  const post = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => await api.post<T>(url, data, config);

  const put = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => await api.put<T>(url, data, config);

  const del = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => await api.delete<T>(url, config);

  return { get, post, put, del };
};

export default createApiClient;

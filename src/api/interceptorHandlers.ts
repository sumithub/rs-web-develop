import { InternalAxiosRequestConfig } from "axios";

export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    if (!config.headers) {
      config.headers = {} as typeof config.headers;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export const responseInterceptorError = (error: any) => {
  const status = error?.response?.status;
  if (status === 401) {
    console.warn("Unauthorized. Redirecting to login...");
  } else if (status === 500) {
    console.error("Server error.");
  }
  return Promise.reject(error);
};

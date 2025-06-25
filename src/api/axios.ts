import { requestInterceptor, responseInterceptorError } from "./interceptorHandlers";

import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_RS_API_BASE_URL || "http://localhost:8080/api";

 export const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if backend uses cookies
});

// Request Interceptor – attach token if available
axiosInstance.interceptors.request.use(requestInterceptor);

// Response Interceptor – handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  responseInterceptorError
);
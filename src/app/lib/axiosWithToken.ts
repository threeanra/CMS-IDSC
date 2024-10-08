import axios from "axios";
import { getSession } from "next-auth/react";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Token cache
let cachedToken: string | null = null;

const fetchToken = async () => {
  if (!cachedToken) {
    const session = await getSession();
    if (session && session.user.token) {
      cachedToken = session.user.token; // Cache the token
    }
  }
  return cachedToken;
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await fetchToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosWithToken = async (
  url: string,
  method: string,
  body: object = {}
) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error in axiosWithToken:", error);
    throw error;
  }
};

export default axiosWithToken;

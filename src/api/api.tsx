// src/lib/api.ts
import { useAuthStore } from "../store/useAuthStore";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// API 응답 타입 정의
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Axios 인스턴스 생성
const api: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // 쿠키 기반 refresh를 쓸 경우 필요
});

// 요청 인터셉터: access token 부착
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers?.set?.("Authorization", `Bearer ${token}`);
  }
  return config;
});

// refresh 요청 함수
async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await axios.post(
      `${process.env.API_BASE_URL}/auth/refresh`,
      {},
      { withCredentials: true } // <- refreshToken이 쿠키인 경우 필요
    );

    return res.data?.accessToken ?? null;
  } catch {
    return null;
  }
}

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 응답 인터셉터: access token 만료 시 자동 재발급
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequest | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();
      if (newToken) {
        useAuthStore.getState().setAccessToken(newToken);

        if (originalRequest.headers?.set) {
          originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
        } else {
          originalRequest.headers = {
            ...(originalRequest.headers ?? {}),
            Authorization: `Bearer ${newToken}`,
          } as any;
        }

        return api(originalRequest);
      }

      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;

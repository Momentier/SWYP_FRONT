import { reissueToken } from "@/lib/api/auth";
import { useAuthStore } from "@/store/useAuthStore";
import { useLoadingStore } from "@/store/useLoadingStore";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { user } = useAuthStore.getState();
    if (user?.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // 🟢 요청에 따라 로딩 타입 설정
    const type = (config as any).loadingType ?? "fullscreen";
    useLoadingStore.getState().setLoading(true, type);
    return config;
  },
  (error) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    // 로딩 끝
    useLoadingStore.getState().setLoading(false);

    // MSA ApiResponse 래퍼 처리: { success: true, data: T } -> T
    if (
      response.data &&
      typeof response.data === "object" &&
      "success" in response.data &&
      "data" in response.data
    ) {
      response.data = response.data.data;
    }

    return response;
  },
  async (error) => {
    useLoadingStore.getState().setLoading(false);

    const originalRequest = error.config;

    // 🔍 만약 토큰 재발급 요청이면 인터셉터가 잡지 않도록 한다.
    if (originalRequest.url.includes("/api/v1/auth/refresh")) {
      console.warn("🛑 토큰 재발급 요청은 인터셉터에서 무시합니다.");
      return Promise.reject(error);
    }
    // 🔍 로그아웃 상태면 중단
    if (!useAuthStore.getState().isLoggedIn) {
      console.warn("🔒 로그아웃 상태입니다. 요청 중단");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      console.warn("🔄 401 발생, 토큰 재발급 시도 중...");
      const newAccessToken = await reissueToken();

      if (newAccessToken) {
        console.log("✅ 토큰 재발급 성공, 요청 재시도");

        // ✅ 이 시점에는 상태가 업데이트되었으므로, 다시 읽어와서 적용
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } else {
        console.error("❌ 토큰 재발급 실패, 로그아웃 처리");
        useAuthStore.getState().logout();
        window.location.href = "/main";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

declare module "axios" {
  export interface AxiosRequestConfig {
    loadingType?: "fullscreen" | "login" | "none" | "skeleton";
  }
}

/**
 * axios 에러에서 메시지를 안전하게 추출하는 헬퍼 함수
 */
export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
};

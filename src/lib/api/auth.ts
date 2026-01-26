import axiosInstance, { getErrorMessage } from "./axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export interface KakaoLoginResponse {
  accessToken: string;
  userName: string;
  expiresIn: number;
  hasSubmittedExperience: boolean;
}

/**
 * ✅ **카카오 로그인 API 요청**
 * @param code 인가 코드
 * @returns KakaoLoginResponse
 */
export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  try {
    const redirectUri = `${window.location.origin}/oauth/callback/kakao`;
    const response = await axiosInstance.post<{
      accessToken: string;
      refreshToken: string;
      nickname?: string;
    }>(
      `/api/v1/auth/oauth/login/kakao?code=${code}&redirectUri=${encodeURIComponent(redirectUri)}&requireAdditionalSignup=false`,
      {},
      { loadingType: "login" },
    );

    const accessToken = response.data.accessToken;

    // refreshToken 저장
    if (response.data.refreshToken) {
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }

    // 경험 제출 여부 확인
    let hasSubmittedExperience = false;
    try {
      const expResponse = await axiosInstance.get("/api/v1/users/experience", {
        headers: { Authorization: `Bearer ${accessToken}` },
        loadingType: "none",
      });
      hasSubmittedExperience = expResponse.data !== null;
    } catch {
      // 경험 조회 실패 시 false 유지
    }

    // MSA 응답 형식 변환
    return {
      accessToken,
      userName: response.data.nickname || "사용자",
      expiresIn: Date.now() + 3600 * 1000, // 현재 시간 + 1시간 (밀리초)
      hasSubmittedExperience,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error, "카카오 로그인 실패"));
  }
};

export interface UnlinkResponse {
  success: boolean;
  message: string;
}

/**
 * ✅ **회원 탈퇴 요청**
 * @returns UnlinkResponse
 */
export const unlinkKakaoAccount = async (): Promise<UnlinkResponse> => {
  try {
    await axiosInstance.delete("/api/v1/users/me");
    // 탈퇴 후 로컬 토큰 정리
    localStorage.removeItem("refreshToken");
    return { success: true, message: "계정이 성공적으로 탈퇴되었습니다" };
  } catch (error) {
    throw new Error(getErrorMessage(error, "회원 탈퇴에 실패했습니다."));
  }
};

export interface Itinerary {
  id: number;
  title: string;
  image_url: string[];
}

/**
 * ✅ **공개된 여행 코스 일부를 반환**
 * @param limit 가져올 항목 수
 * @returns Itinerary 리스트
 */
export const fetchItineraries = async (limit: number): Promise<Itinerary[]> => {
  try {
    const response = await axiosInstance.get<Itinerary[]>(
      `/api/v1/itineraries/list?limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "여행 코스 불러오기에 실패했습니다."));
  }
};

/**
 * ✅ **Refresh Token으로 Access Token 재발급**
 * @returns KakaoLoginResponse
 */
export const reissueToken = async (): Promise<KakaoLoginResponse | null> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      useAuthStore.getState().logout();
      return null;
    }

    const response = await axiosInstance.post<{
      accessToken: string;
      refreshToken: string;
      nickname?: string;
    }>("/api/v1/auth/refresh", { refreshToken });

    if (response.status === 200) {
      const { accessToken, nickname } = response.data;

      useAuthStore.getState().refresh({
        accessToken,
        expiresIn: Date.now() + 3600 * 1000, // 현재 시간 + 1시간 (밀리초)
      });

      // 새 refresh token 저장
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      // 경험 제출 여부 확인
      let hasSubmittedExperience = false;
      try {
        const expResponse = await axiosInstance.get(
          "/api/v1/users/experience",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            loadingType: "none",
          },
        );
        hasSubmittedExperience = expResponse.data !== null;
      } catch {
        // 경험 조회 실패 시 false 유지
      }

      console.log("🔄 토큰 재발급 성공");
      return {
        accessToken,
        userName: nickname || "사용자",
        expiresIn: Date.now() + 3600 * 1000, // 현재 시간 + 1시간 (밀리초)
        hasSubmittedExperience,
      };
    } else {
      console.error("❌ 토큰 재발급 실패");
      useAuthStore.getState().logout();
      return null;
    }
  } catch (error) {
    console.error("토큰 재발급 중 오류 발생:", error);
    useAuthStore.getState().logout();
    return null;
  }
};

import axiosInstance from "./axiosInstance";
import { useAuthStore } from "@/store/useAuthStore";

export interface KakaoLoginResponse {
  accessToken: string;
  userName: string;
  expiresIn: number;
  hasSubmittedExperience: boolean;
}

/**
 * 🍪 **쿠키에서 특정 쿠키 값을 가져오는 함수**
 */
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

/**
 * ✅ **카카오 로그인 API 요청**
 * @param code 인가 코드
 * @returns KakaoLoginResponse
 */
export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  try {
    const redirectUri =
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ||
      "http://localhost:3000/oauth/callback";
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
      expiresIn: 3600,
      hasSubmittedExperience,
    };
  } catch (error: any) {
    throw new Error(error.response?.data.message || "카카오 로그인 실패");
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
  } catch (error: any) {
    throw new Error(
      error.response?.data.message || "회원 탈퇴에 실패했습니다.",
    );
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
  } catch (error: any) {
    throw new Error(
      error.response?.data.message || "여행 코스 불러오기에 실패했습니다.",
    );
  }
};

/**
 * ✅ **관리자 토큰 정보 반환**
 * @returns AdminTokenResponse
 */
export const getAdminToken = async (): Promise<KakaoLoginResponse> => {
  try {
    // 테스트용 관리자 토큰 반환
    return {
      accessToken: "test-admin-token",
      userName: "관리자",
      expiresIn: 3600,
      hasSubmittedExperience: true,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data.message || "관리자 토큰 정보를 불러오지 못했습니다.",
    );
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
        expiresIn: 3600,
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
        expiresIn: 3600,
        hasSubmittedExperience,
      };
    } else {
      console.error("❌ 토큰 재발급 실패");
      useAuthStore.getState().logout();
      return null;
    }
  } catch (error: any) {
    console.error("토큰 재발급 중 오류 발생:", error);
    useAuthStore.getState().logout();
    return null;
  }
};

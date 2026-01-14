import axiosInstance, { getErrorMessage } from "./axiosInstance";

export interface ExperienceRequest {
  rating: number;
  feedback: string;
}

export interface ExperienceResponse {
  success: boolean;
  feedback: string;
  rating: number;
  createdAt: string;
}

/**
 * 사용자 경험 등록
 * @param content 사용자 작성한 경험 내용
 * @returns ExperienceResponse
 */
export const saveUserExperience = async (
  content: ExperienceRequest,
): Promise<ExperienceResponse> => {
  try {
    const response = await axiosInstance.post<ExperienceResponse>(
      "/api/v1/users/experience",
      {
        ...content,
      },
    );

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "경험 등록에 실패했습니다."));
  }
};

export interface Itinerary {
  id: number;
  title: string;
  image_url: string[];
}

/**
 * 마이페이지 - 사용자 여행 일정 조회
 * @returns Itinerary[]
 */
export const getUserItineraries = async (): Promise<Itinerary[]> => {
  try {
    interface MsaItineraryResponse {
      id: number;
      title: string;
      coverImage?: string;
    }
    const response = await axiosInstance.get<{
      content: MsaItineraryResponse[];
    }>("/api/v1/itineraries");
    // Page 응답에서 content 추출 후 형식 변환
    const content = response.data.content || response.data;
    const itineraries = Array.isArray(content) ? content : [];
    return itineraries.map((item) => ({
      id: item.id,
      title: item.title,
      image_url: item.coverImage ? [item.coverImage] : [],
    }));
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "여행 일정 목록을 불러오지 못했습니다."),
    );
  }
};

/**
 * 사용자 정보 조회
 * @param userId 사용자 ID
 * @returns UserDetail
 */

export interface UserDetail {
  id: number;
  username: string;
}

export const getUserItinerariesById = async (
  userId: number,
): Promise<UserDetail> => {
  try {
    const response = await axiosInstance.get<{ id: number; nickname?: string }>(
      `/api/v1/users/${userId}`,
    );
    return {
      id: response.data.id,
      username: response.data.nickname || "사용자",
    };
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "사용자 정보를 불러오지 못했습니다."),
    );
  }
};

export interface MyInfo {
  id: number;
  name: string;
  createdAt: string;
}

/**
 * 사용자 본인 정보 조회
 * @returns MyInfo
 */
export const getMyInfo = async (): Promise<MyInfo> => {
  try {
    const response = await axiosInstance.get<{
      id: number;
      nickname?: string;
      createdAt?: string;
    }>("/api/v1/users/me");
    return {
      id: response.data.id,
      name: response.data.nickname || "사용자",
      createdAt: response.data.createdAt || new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "사용자 정보를 불러오지 못했습니다."),
    );
  }
};

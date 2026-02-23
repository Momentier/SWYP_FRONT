import { http, HttpResponse } from "msw";

// Mock 데이터
const mockUser = {
  id: 1,
  nickname: "테스트유저",
  createdAt: "2025-01-01T00:00:00Z",
};

const mockItineraryDetail = {
  id: 1,
  title: "서울 감성 여행 2박3일",
  createdBy: 1,
  createdAt: Date.now(),
  isPublic: true,
  isSaved: false,
  dailyScheduleDtos: [
    {
      dayDate: 1,
      attractions: [
        {
          id: 101,
          type: "place" as const,
          name: "경복궁",
          address: "서울특별시 종로구 사직로 161",
          description: "조선시대 대표 궁궐",
          coverImage: "",
          businessTime: "09:00 - 18:00",
          rating: 4.5,
          latitude: 37.5796,
          longitude: 126.977,
        },
        {
          id: 102,
          type: "meal" as const,
          name: "광장시장",
          address: "서울특별시 종로구 창경궁로 88",
          description: "서울 대표 전통시장",
          coverImage: "",
          businessTime: "08:00 - 22:00",
          rating: 4.3,
          latitude: 37.57,
          longitude: 126.999,
        },
        {
          id: 103,
          type: "place" as const,
          name: "북촌한옥마을",
          address: "서울특별시 종로구 계동길 37",
          description: "전통 한옥이 밀집된 마을",
          coverImage: "",
          businessTime: "상시",
          rating: 4.2,
          latitude: 37.5826,
          longitude: 126.9849,
        },
      ],
    },
    {
      dayDate: 2,
      attractions: [
        {
          id: 201,
          type: "place" as const,
          name: "남산서울타워",
          address: "서울특별시 용산구 남산공원길 105",
          description: "서울의 랜드마크",
          coverImage: "",
          businessTime: "10:00 - 23:00",
          rating: 4.4,
          latitude: 37.5512,
          longitude: 126.9882,
        },
        {
          id: 202,
          type: "meal" as const,
          name: "이태원 맛집거리",
          address: "서울특별시 용산구 이태원로",
          description: "다양한 세계 음식 거리",
          coverImage: "",
          businessTime: "11:00 - 23:00",
          rating: 4.0,
          latitude: 37.5345,
          longitude: 126.9945,
        },
      ],
    },
    {
      dayDate: 3,
      attractions: [
        {
          id: 301,
          type: "place" as const,
          name: "홍대 거리",
          address: "서울특별시 마포구 와우산로",
          description: "젊음의 거리, 예술과 문화의 중심지",
          coverImage: "",
          businessTime: "상시",
          rating: 4.1,
          latitude: 37.5563,
          longitude: 126.9236,
        },
        {
          id: 302,
          type: "place" as const,
          name: "여의도 한강공원",
          address: "서울특별시 영등포구 여의동로 330",
          description: "한강변 대표 공원",
          coverImage: "",
          businessTime: "상시",
          rating: 4.6,
          latitude: 37.5284,
          longitude: 126.9326,
        },
      ],
    },
  ],
};

const mockRecommendDestinations = [
  {
    address: "서울특별시 종로구",
    imageUrl: "",
    latitude: 37.5796,
    longitude: 126.977,
    name: "경복궁 일대",
    theme: "역사문화",
  },
  {
    address: "서울특별시 마포구",
    imageUrl: "",
    latitude: 37.5563,
    longitude: 126.9236,
    name: "홍대·연남동",
    theme: "트렌디",
  },
  {
    address: "서울특별시 강남구",
    imageUrl: "",
    latitude: 37.5172,
    longitude: 127.0473,
    name: "강남·가로수길",
    theme: "쇼핑",
  },
];

const mockPublicItineraries = [
  { id: 1, title: "서울 감성 여행 2박3일", image_url: "" },
  { id: 2, title: "부산 해운대 힐링 여행", image_url: "" },
  { id: 3, title: "제주도 자연 탐방 3박4일", image_url: "" },
];

const mockUserItineraries = {
  content: [
    { id: 1, title: "서울 감성 여행 2박3일", coverImage: "" },
    { id: 2, title: "부산 해운대 힐링 여행", coverImage: "" },
  ],
};

// MSW API 응답 래퍼 (백엔드 MSA ApiResponse 형식)
function apiResponse<T>(data: T) {
  return HttpResponse.json({ success: true, data });
}

export const handlers = [
  // ===== Auth =====
  http.post("/api/v1/auth/oauth/login/kakao", () => {
    return apiResponse({
      accessToken: "mock-access-token-12345",
      refreshToken: "mock-refresh-token-67890",
      nickname: "테스트유저",
    });
  }),

  http.post("/api/v1/auth/refresh", () => {
    return apiResponse({
      accessToken: "mock-refreshed-access-token",
      refreshToken: "mock-refreshed-refresh-token",
      nickname: "테스트유저",
    });
  }),

  // ===== Users =====
  http.get("/api/v1/users/me", () => {
    return apiResponse(mockUser);
  }),

  http.get("/api/v1/users/experience", () => {
    return apiResponse({
      rating: 5,
      feedback: "정말 좋은 여행이었습니다!",
      createdAt: "2025-06-01T00:00:00Z",
    });
  }),

  http.post("/api/v1/users/experience", () => {
    return apiResponse({
      success: true,
      feedback: "감사합니다!",
      rating: 5,
      createdAt: new Date().toISOString(),
    });
  }),

  http.get("/api/v1/users/:userId", ({ params }) => {
    return apiResponse({
      id: Number(params.userId),
      nickname: "사용자" + params.userId,
    });
  }),

  http.delete("/api/v1/users/me", () => {
    return apiResponse({ message: "계정이 삭제되었습니다." });
  }),

  // ===== Itineraries =====
  http.get("/api/v1/itineraries/preview", () => {
    return apiResponse(mockRecommendDestinations);
  }),

  http.get("/api/v1/itineraries/recommend/text", () => {
    return apiResponse({
      feeling: "편안한",
      atmosphere: "고즈넉한",
      activities: "산책",
    });
  }),

  http.post("/api/v1/itineraries/create", () => {
    return apiResponse(mockItineraryDetail);
  }),

  http.get("/api/v1/itineraries/public", () => {
    return apiResponse(mockPublicItineraries);
  }),

  http.get("/api/v1/itineraries/lists/:id", ({ params }) => {
    return apiResponse([
      { ...mockItineraryDetail, id: Number(params.id) },
    ]);
  }),

  http.get("/api/v1/itineraries/:id", ({ params }) => {
    return apiResponse({ ...mockItineraryDetail, id: Number(params.id) });
  }),

  http.get("/api/v1/itineraries", () => {
    return apiResponse(mockUserItineraries);
  }),

  http.patch("/api/v1/itineraries", () => {
    return apiResponse({ itineraryId: 1 });
  }),

  http.delete("/api/v1/itineraries/:id", () => {
    return apiResponse(true);
  }),

  http.post("/api/v1/itineraries/change/attraction", () => {
    return apiResponse({
      id: 999,
      type: "place",
      name: "변경된 관광지",
      address: "서울특별시 강남구",
      description: "새로운 관광지입니다",
      coverImage: "",
      businessTime: "09:00 - 18:00",
      rating: 4.0,
      latitude: 37.5172,
      longitude: 127.0473,
    });
  }),

  // 일정 공개 리스트 (auth.ts의 fetchItineraries)
  http.get("/api/v1/itineraries/list", () => {
    return apiResponse([
      { id: 1, title: "서울 감성 여행", image_url: [""] },
      { id: 2, title: "부산 바다 여행", image_url: [""] },
    ]);
  }),

  // ===== Route =====
  http.get("/route/time", () => {
    return apiResponse({
      walkingDuration: 15,
      drivingDuration: 5,
      distance: "1200",
    });
  }),
];

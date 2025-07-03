import type { Meta, StoryObj } from "@storybook/react";
import ScheduleCard_confirmVer from "@/components/ScheduleCard_confirmVer";

const meta: Meta<typeof ScheduleCard_confirmVer> = {
  title: "Components/ScheduleCard_confirmVer",
  component: ScheduleCard_confirmVer,
  tags: ["autodocs"],
  argTypes: {
    dailySchedule: {
      control: "object",
      description: "일일 일정 데이터",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScheduleCard_confirmVer>;

const sampleDailySchedule = {
  dayDate: 1,
  attractions: [
    {
      id: 1,
      name: "경복궁",
      description: "조선왕조 제1의 법궁",
      address: "서울특별시 종로구 사직로 161",
      businessTime: "09:00 - 18:00",
      rating: 4.5,
      coverImage: "/default_img.png",
      travelWalkTime: "5분",
      travelCarTime: "10분",
      travelDistance: "1.2km",
      type: "place" as const,
      latitude: 37.579617,
      longitude: 126.977041,
    },
    {
      id: 2,
      name: "인사동",
      description: "전통 문화의 거리",
      address: "서울특별시 종로구 인사동길",
      businessTime: "10:00 - 22:00",
      rating: 4.3,
      coverImage: "/default_img.png",
      travelWalkTime: "15분",
      travelCarTime: "",
      travelDistance: "",
      type: "place" as const,
      latitude: 37.571400,
      longitude: 126.986330,
    },
    {
      id: 3,
      name: "명동교자",
      description: "예약 필수 / 한식 맛집",
      address: "서울특별시 중구 명동10길 29",
      businessTime: "10:30 - 21:30",
      rating: 4.2,
      coverImage: "/default_img.png",
      travelWalkTime: "",
      travelCarTime: "20분",
      travelDistance: "3.5km",
      type: "place" as const,
      latitude: 37.563656,
      longitude: 126.982041,
    },
  ],
};

export const Day1: Story = {
  args: {
    dailySchedule: sampleDailySchedule,
  },
};

export const Day2: Story = {
  args: {
    dailySchedule: {
      dayDate: 2,
      attractions: [
        {
          id: 4,
          name: "남산서울타워",
          description: "서울의 랜드마크 / 전망대",
          address: "서울특별시 용산구 남산공원길 105",
          businessTime: "10:00 - 23:00",
          rating: 4.7,
          coverImage: "/default_img.png",
          travelWalkTime: "10분",
          travelCarTime: "15분",
          travelDistance: "2.1km",
          type: "place",
          latitude: 0,
          longitude: 0
        },
        {
          id: 5,
          name: "이태원",
          description: "국제적인 분위기의 거리",
          address: "서울특별시 용산구 이태원로",
          businessTime: "24시간",
          rating: 4.1,
          coverImage: "/default_img.png",
          travelWalkTime: "20분",
          travelCarTime: "",
          travelDistance: "",
          type: "place",
          latitude: 0,
          longitude: 0
        },
      ],
    },
  },
};

export const SingleAttraction: Story = {
  args: {
    dailySchedule: {
      dayDate: 3,
      attractions: [
        {
          id: 6,
          name: "롯데월드타워",
          description: "세계 최고층 전망대",
          address: "서울특별시 송파구 올림픽로 300",
          businessTime: "09:30 - 22:00",
          rating: 4.6,
          coverImage: "/default_img.png",
          travelWalkTime: "",
          travelCarTime: "",
          travelDistance: "",
          type: "place",
          latitude: 0,
          longitude: 0
        },
      ],
    },
  },
};

export const ManyAttractions: Story = {
  args: {
    dailySchedule: {
      dayDate: 4,
      attractions: [
        {
          id: 7,
          name: "홍대입구",
          description: "젊음의 거리 / 클럽 문화",
          address: "서울특별시 마포구 홍익로",
          businessTime: "24시간",
          rating: 4.4,
          coverImage: "/default_img.png",
          travelWalkTime: "3분",
          travelCarTime: "",
          travelDistance: "",
          type: "place",
          latitude: 0,
          longitude: 0
        },
        {
          id: 8,
          name: "연남동",
          description: "힙한 카페와 맛집",
          address: "서울특별시 마포구 연남동",
          businessTime: "10:00 - 22:00",
          rating: 4.5,
          coverImage: "/default_img.png",
          travelWalkTime: "7분",
          travelCarTime: "",
          travelDistance: "",
          type: "place",
          latitude: 0,
          longitude: 0
        },
        {
          id: 9,
          name: "망원한강공원",
          description: "한강뷰 맛집과 피크닉",
          address: "서울특별시 마포구 망원동",
          businessTime: "24시간",
          rating: 4.6,
          coverImage: "/default_img.png",
          travelWalkTime: "10분",
          travelCarTime: "",
          travelDistance: "",
          type: "place",
          latitude: 0,
          longitude: 0
        },
        {
          id: 10,
          name: "합정역 맛집거리",
          description: "다양한 음식점과 카페",
          address: "서울특별시 마포구 합정동",
          businessTime: "11:00 - 24:00",
          rating: 4.3,
          coverImage: "/default_img.png",
          travelWalkTime: "",
          travelCarTime: "12분",
          travelDistance: "2.8km",
          type: "place",
          latitude: 0,
          longitude: 0
        },
        {
          id: 11,
          name: "상암월드컵공원",
          description: "넓은 공원과 산책로",
          address: "서울특별시 마포구 상암동",
          businessTime: "24시간",
          rating: 4.2,
          coverImage: "/default_img.png",
          travelWalkTime: "",
          travelCarTime: "25분",
          travelDistance: "5.2km",
          type: "place",
          latitude: 0,
          longitude: 0
        },
      ],
    },
  },
};

export const NoTravelInfo: Story = {
  args: {
    dailySchedule: {
      dayDate: 5,
      attractions: [
        {
          id: 12,
          name: "덕수궁",
          description: "근대 건축과 전통의 조화",
          address: "서울특별시 중구 세종대로 99",
          businessTime: "09:00 - 21:00",
          rating: 4.4,
          coverImage: "/default_img.png",
          travelWalkTime: "",
          travelCarTime: "",
          travelDistance: "",
          type: "place",
          latitude: 0,
          longitude: 0
        },
        {
          id: 13,
          name: "정동길",
          description: "로맨틱한 산책로",
          address: "서울특별시 중구 정동",
          businessTime: "24시간",
          rating: 4.1,
          coverImage: "/default_img.png",
          travelWalkTime: "",
          travelCarTime: "",
          travelDistance: "",
          type: "place",
          latitude: 0,
          longitude: 0
        },
      ],
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import DetailCard_confirmVer from "@/components/DetailCard_confirmVer";

const meta: Meta<typeof DetailCard_confirmVer> = {
  title: "Components/DetailCard_confirmVer",
  component: DetailCard_confirmVer,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "장소 이름",
    },
    subtitle: {
      control: "text",
      description: "장소 설명",
    },
    address: {
      control: "text",
      description: "주소",
    },
    hours: {
      control: "text",
      description: "운영 시간",
    },
    rating: {
      control: { type: "range", min: 0, max: 5, step: 0.1 },
      description: "평점",
    },
    imageUrl: {
      control: "text",
      description: "이미지 URL",
    },
    attractionData: {
      control: "object",
      description: "어트랙션 데이터",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DetailCard_confirmVer>;

const sampleAttractionData = {
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
};

export const Default: Story = {
  args: {
    title: "경복궁",
    subtitle: "조선왕조 제1의 법궁 / 역사 문화",
    address: "서울특별시 종로구 사직로 161",
    hours: "09:00 - 18:00",
    rating: 4.5,
    imageUrl: "/default_img.png",
    attractionData: sampleAttractionData,
  },
};

export const Restaurant: Story = {
  args: {
    title: "명동교자",
    subtitle: "예약 필수 / 한식 맛집",
    address: "서울특별시 중구 명동10길 29",
    hours: "10:30 - 21:30",
    rating: 4.2,
    imageUrl: "https://via.placeholder.com/280x160?text=Restaurant",
    attractionData: {
      ...sampleAttractionData,
      name: "명동교자",
      description: "예약 필수 / 한식 맛집",
    },
  },
};

export const TouristSpot: Story = {
  args: {
    title: "남산서울타워",
    subtitle: "서울의 랜드마크 / 전망대",
    address: "서울특별시 용산구 남산공원길 105",
    hours: "10:00 - 23:00",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/280x160?text=Seoul+Tower",
    attractionData: {
      ...sampleAttractionData,
      name: "남산서울타워",
      description: "서울의 랜드마크 / 전망대",
    },
  },
};

export const ShoppingMall: Story = {
  args: {
    title: "롯데월드타워 서울스카이",
    subtitle: "세계 최고층 전망대 / 쇼핑",
    address: "서울특별시 송파구 올림픽로 300",
    hours: "09:30 - 22:00",
    rating: 4.6,
    imageUrl: "https://via.placeholder.com/280x160?text=Lotte+Tower",
    attractionData: {
      ...sampleAttractionData,
      name: "롯데월드타워 서울스카이",
      description: "세계 최고층 전망대 / 쇼핑",
    },
  },
};

export const LongTitle: Story = {
  args: {
    title: "국립중앙박물관 어린이박물관 체험관",
    subtitle: "가족 친화적 박물관 / 교육 체험",
    address: "서울특별시 용산구 서빙고로 137",
    hours: "09:00 - 18:00 (월요일 휴관)",
    rating: 4.3,
    imageUrl: "https://via.placeholder.com/280x160?text=Museum",
    attractionData: {
      ...sampleAttractionData,
      name: "국립중앙박물관 어린이박물관 체험관",
      description: "가족 친화적 박물관 / 교육 체험",
    },
  },
};

export const NoImage: Story = {
  args: {
    title: "숨겨진 맛집",
    subtitle: "현지인 추천 / 로컬 맛집",
    address: "서울특별시 종로구 어딘가",
    hours: "11:00 - 20:00",
    rating: 4.8,
    imageUrl: "",
    attractionData: {
      ...sampleAttractionData,
      name: "숨겨진 맛집",
      description: "현지인 추천 / 로컬 맛집",
      coverImage: "",
    },
  },
};

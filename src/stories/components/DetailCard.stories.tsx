import type { Meta, StoryObj } from "@storybook/react";
import DetailCard from "@/components/DetailCard";
import { Attraction } from "@/lib/api/itinerary";
import { COMMON_IMAGES } from "@/utils/imagePath";

const meta: Meta<typeof DetailCard> = {
  title: "Components/DetailCard",
  component: DetailCard,
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
type Story = StoryObj<typeof DetailCard>;

const sampleAttractionData: Attraction = {
  id: 1,
  type: "place",
  name: "경복궁",
  description: "조선�조 제1의 법궁",
  address: "서울특별시 종로구 사직로 161",
  businessTime: "09:00 - 18:00",
  rating: 4.5,
  latitude: 37.5796,
  longitude: 126.977,
  coverImage: COMMON_IMAGES.DEFAULT_IMG,
  travelWalkTime: "5분",
  travelCarTime: "10분",
  travelDistance: "1.2km",
};

const sampleAttractionWithPrevious: Attraction = {
  ...sampleAttractionData,
  id: 2,
  name: "명동교자",
  description: "예약 필수 / 한식 맛집",
  address: "서울특별시 중구 명동10길 29",
  businessTime: "10:30 - 21:30",
  rating: 4.2,
  coverImage: COMMON_IMAGES.DEFAULT_IMG,
  previousData: sampleAttractionData,
};

const imageUrl = COMMON_IMAGES.DEFAULT_IMG;

export const Default: Story = {
  args: {
    title: "경복궁",
    subtitle: "조선왕조 제1의 법궁 / 역사 문화",
    address: "서울특별시 종로구 사직로 161",
    hours: "09:00 - 18:00",
    rating: 4.5,
    imageUrl,
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
    imageUrl: COMMON_IMAGES.DEFAULT_IMG,
    attractionData: {
      ...sampleAttractionData,
      id: 2,
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
    imageUrl: COMMON_IMAGES.DEFAULT_IMG,
    attractionData: {
      ...sampleAttractionData,
      id: 3,
      name: "남산서울타워",
      description: "서울의 랜드마크 / 전망대",
    },
  },
};

export const WithPreviousData: Story = {
  args: {
    title: "명동교자",
    subtitle: "예약 필수 / 한식 맛집",
    address: "서울특별시 중구 명동10길 29",
    hours: "10:30 - 21:30",
    rating: 4.2,
    imageUrl: COMMON_IMAGES.DEFAULT_IMG,
    attractionData: sampleAttractionWithPrevious,
  },
  parameters: {
    docs: {
      description: {
        story: "이전 데이터가 있는 경우 롤백 버튼이 표시됩니다.",
      },
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
    imageUrl: COMMON_IMAGES.DEFAULT_IMG,
    attractionData: {
      ...sampleAttractionData,
      id: 4,
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
      id: 5,
      name: "숨겨진 맛집",
      description: "현지인 추천 / 로컬 맛집",
      coverImage: "",
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import ScheduleCard from "@/components/ScheduleCard";
import { DailyScheduleDtos } from "@/lib/api/itinerary";
import { COMMON_IMAGES } from "@/utils/imagePath";

// 실제 여행 상세 페이지와 동일한 구조
const TravelDetailPageStorybook = ({
  userName = "김여행",
  isLoading = false,
  showSkeleton = false,
}: {
  userName?: string;
  isLoading?: boolean;
  showSkeleton?: boolean;
}) => {
  const sampleItinerary: DailyScheduleDtos[] = [
    {
      dayDate: 1,
      attractions: [
        {
          id: 1,
          type: "place",
          name: "경복궁",
          description: "조선왕조 제1의 법궁",
          address: "서울특별시 종로구 사직로 161",
          businessTime: "09:00 - 18:00",
          rating: 4.5,
          latitude: 37.5796,
          longitude: 126.977,
          coverImage: COMMON_IMAGES.DEFAULT_IMG,
          travelWalkTime: "5분",
          travelCarTime: "10분",
          travelDistance: "1.2km",
        },
        {
          id: 2,
          type: "meal",
          name: "인사동 맛집",
          description: "전통 한식 / 예약 필수",
          address: "서울특별시 종로구 인사동길",
          businessTime: "11:00 - 21:00",
          rating: 4.3,
          latitude: 37.5703,
          longitude: 126.985,
          coverImage: COMMON_IMAGES.DEFAULT_IMG,
          travelWalkTime: "15분",
          travelCarTime: "",
          travelDistance: "",
        },
        {
          id: 3,
          type: "place",
          name: "명동 쇼핑거리",
          description: "쇼핑과 먹거리의 천국",
          address: "서울특별시 중구 명동2가",
          businessTime: "10:00 - 22:00",
          rating: 4.1,
          latitude: 37.5636,
          longitude: 126.9834,
          coverImage: COMMON_IMAGES.DEFAULT_IMG,
          travelWalkTime: "",
          travelCarTime: "20분",
          travelDistance: "3.5km",
        },
      ],
    },
    {
      dayDate: 2,
      attractions: [
        {
          id: 4,
          type: "place",
          name: "북촌한옥마을",
          description: "전통 한옥의 아름다움",
          address: "서울특별시 종로구 계동길",
          businessTime: "24시간",
          rating: 4.4,
          latitude: 37.5797,
          longitude: 126.9831,
          coverImage: COMMON_IMAGES.DEFAULT_IMG,
          travelWalkTime: "10분",
          travelCarTime: "",
          travelDistance: "",
        },
        {
          id: 5,
          type: "meal",
          name: "삼청동 카페거리",
          description: "분위기 좋은 카페들",
          address: "서울특별시 종로구 삼청로",
          businessTime: "08:00 - 22:00",
          rating: 4.2,
          latitude: 37.5842,
          longitude: 126.9822,
          coverImage: COMMON_IMAGES.DEFAULT_IMG,
          travelWalkTime: "8분",
          travelCarTime: "",
          travelDistance: "",
        },
      ],
    },
    {
      dayDate: 3,
      attractions: [
        {
          id: 6,
          type: "place",
          name: "남산서울타워",
          description: "서울의 랜드마크",
          address: "서울특별시 용산구 남산공원길 105",
          businessTime: "10:00 - 23:00",
          rating: 4.6,
          latitude: 37.5512,
          longitude: 126.9881,
          coverImage: COMMON_IMAGES.DEFAULT_IMG,
          travelWalkTime: "",
          travelCarTime: "30분",
          travelDistance: "5.2km",
        },
      ],
    },
  ];

  const itinerary = {
    title: "서울 3일 여행",
    dailyScheduleDtos: sampleItinerary,
    isPublic: false,
  };

  const handleSaveItinerary = () => {
    console.log("일정 저장하기 클릭");
  };

  if (showSkeleton) {
    return (
      <div className="flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden">
        <div
          className="flex flex-col items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border
                      w-[980px] 
                      xl:w-[800px] 
                      lg:w-[700px] 
                      md:w-[600px] 
                      sm:w-full
                      max-w-[90vw]"
        >
          {/* 스켈레톤 헤더 */}
          <section className="flex flex-col w-full mb-5">
            <div className="w-[98px] h-[26px] animate-pulse bg-[#E8E8EA] mb-[8px]"></div>
            <div className="w-[541px] h-[38px] animate-pulse bg-[#E8E8EA] mb-[40px]"></div>
            <div className="w-[41px] h-[32px] animate-pulse bg-[#E8E8EA]"></div>
          </section>

          {/* 스켈레톤 카드들 */}
          <section className="w-full flex flex-col gap-5">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-full h-[50px] bg-[#E8E8EA] rounded-xl mb-2"></div>
                <div className="space-y-2">
                  <div className="w-full h-[120px] bg-[#E8E8EA] rounded-xl"></div>
                  <div className="w-full h-[120px] bg-[#E8E8EA] rounded-xl"></div>
                </div>
              </div>
            ))}
          </section>

          {/* 스켈레톤 버튼 */}
          <div className="w-full flex justify-end mt-5">
            <div className="mx-auto rounded-[25px] h-[48px] w-[180px] animate-pulse bg-[#C7C8C9]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden">
      <div
        className="flex flex-col items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border
                    w-[980px] 
                    xl:w-[800px] 
                    lg:w-[700px] 
                    md:w-[600px] 
                    sm:w-full
                    max-w-[90vw]"
      >
        <div id="pdf-target">
          {/* 해당페이지의 헤더 */}
          <section className="flex flex-col w-full mb-5">
            <Text textStyle="headline1" className="mb-[8px] text-gray-600">
              {itinerary?.title || "여행 일정"}
            </Text>
            <Text textStyle="title2" className="font-bold mb-[40px]">
              {userName}님을 위한 {itinerary?.title || "여행코스"}
            </Text>
            <Text textStyle="title3" className="font-bold">
              일정
            </Text>
          </section>

          {/* 세부일정의 카드 UI 영역 */}
          <section className="w-full flex flex-col gap-5">
            {itinerary
              ? itinerary.dailyScheduleDtos.map((schedule, index) => (
                  <ScheduleCard
                    key={`${index}-${JSON.stringify(schedule.attractions)}`}
                    dailySchedule={schedule}
                  />
                ))
              : null}
          </section>
        </div>

        {/* 저장 버튼 영역 */}
        <div className="w-full flex justify-end mt-5">
          <Button
            variant="gradation"
            className="text-white font-semibold text-[16px] leading-[24px] tracking-[0.091px] mx-auto"
            onClick={handleSaveItinerary}
          >
            일정 저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof TravelDetailPageStorybook> = {
  title: "Pages/TravelDetailPage",
  component: TravelDetailPageStorybook,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "여행 상세 페이지 컴포넌트입니다. 생성된 여행 일정을 상세히 보여주고 저장할 수 있습니다.",
      },
    },
  },
  argTypes: {
    userName: {
      control: "text",
      description: "사용자 이름",
    },
    isLoading: {
      control: "boolean",
      description: "로딩 상태",
    },
    showSkeleton: {
      control: "boolean",
      description: "스켈레톤 UI 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TravelDetailPageStorybook>;

export const Default: Story = {
  args: {
    userName: "김여행",
    isLoading: false,
    showSkeleton: false,
  },
};

export const LoadingSkeleton: Story = {
  args: {
    userName: "김여행",
    isLoading: true,
    showSkeleton: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "일정을 불러오는 중인 로딩 상태입니다. 스켈레톤 UI가 표시됩니다.",
      },
    },
  },
};

export const Seoul3Days: Story = {
  args: {
    userName: "이여행",
    isLoading: false,
    showSkeleton: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "서울 3일 여행 일정입니다. 경복궁, 인사동, 명동 등 주요 관광지들이 포함되어 있습니다.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    userName: "김여행",
    isLoading: false,
    showSkeleton: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "데스크톱 화면에서의 여행 상세 페이지입니다. 800px 폭의 컴팩트한 컨테이너에 일정이 표시됩니다.",
      },
    },
  },
};

export const Mobile: Story = {
  args: {
    userName: "김여행",
    isLoading: false,
    showSkeleton: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "모바일 화면에서의 여행 상세 페이지입니다. 반응형으로 레이아웃이 조정됩니다.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    userName: "김여행",
    isLoading: false,
    showSkeleton: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "태블릿 화면에서의 여행 상세 페이지입니다.",
      },
    },
  },
};

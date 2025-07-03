import type { Meta, StoryObj } from "@storybook/react";
import Text from "@/components/Text";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Image from "next/image";
import { COMMON_IMAGES } from "@/utils/imagePath";

// 실제 여행 추천 페이지와 동일한 구조
const TravelRecommendPageStorybook = ({
  userName = "김여행",
  requestCount = 0,
  maxRequests = 1,
  isButtonDisabled = false
}: {
  userName?: string;
  requestCount?: number;
  maxRequests?: number;
  isButtonDisabled?: boolean;
}) => {
  const travelData = [
    {
      id: 1,
      name: "제주도",
      theme: "자연과 힐링",
      address: "제주특별자치도",
      latitude: 33.4996,
      longitude: 126.5312,
      imageUrl: COMMON_IMAGES.DEFAULT_IMG,
    },
    {
      id: 2,
      name: "부산",
      theme: "바다와 도시",
      address: "부산광역시",
      latitude: 35.1796,
      longitude: 129.0756,
      imageUrl: COMMON_IMAGES.DEFAULT_IMG,
    },
    {
      id: 3,
      name: "경주",
      theme: "역사와 문화",
      address: "경상북도 경주시",
      latitude: 35.8562,
      longitude: 129.2247,
      imageUrl: COMMON_IMAGES.DEFAULT_IMG,
    },
  ];

  const handleCardClick = (data: any) => {
    console.log('카드 클릭:', data);
  };

  const handleOtherItinerary = () => {
    console.log('다른 여행지 추천 클릭');
  };

  return (
    <main className="flex flex-col items-center w-full mx-auto px-4 pt-[60px] pb-[60px] gap-[84px]
                     max-w-[1100px] 
                     lg:max-w-[900px] 
                     md:max-w-[700px] 
                     sm:max-w-[500px]">
      {/* 페이지 헤더 */}
      <section className="flex flex-col items-start self-stretch gap-3">
        <Text as="h2" textStyle="display2" className="font-bold">
          떠나고 싶은 여행지를 선택해주세요!
        </Text>
        <Text as="p" textStyle="heading2" className="text-gray-500 font-bold">
          {userName}님의 선호도에 맞춘 여행지입니다. 원하는 여행지를 선택하시고 새로운 일정을 짜드릴게요!
        </Text>
      </section>

      {/* 3개의 추천 여행지 */}
      <section className="flex flex-row gap-6 xl:flex-row lg:flex-row md:flex-col sm:flex-col w-full justify-center">
        {travelData.map((data) => (
          <Card
            key={data.address}
            region={data.name}
            distanceInfo={data.theme}
            imageUrl={data.imageUrl}
            size="large"
            className="w-full max-w-[300px] min-w-[250px] mx-auto"
            onClick={() => handleCardClick(data)}
          />
        ))}
      </section>

      {/* 하단 버튼 영역 */}
      <div className="flex flex-col items-center gap-3">
        <Button
          disabled={isButtonDisabled || requestCount >= maxRequests}
          variant="gradation"
          className="flex items-center justify-center w-[287px] h-[50px] px-5 gap-2"
          onClick={handleOtherItinerary}
        >
          <Image src={COMMON_IMAGES.REFRESH} alt="icon" width={24} height={24} />
          <Text
            as="span"
            className="text-white font-[600] text-[16px] leading-[26.1px] tracking-[-0.0002em] font-['Pretendard_JP']"
          >
            다른 여행지를 추천받고 싶어요
          </Text>
        </Button>

        <Text textStyle="caption1" className="text-gray-400">
          다른 추천은 1회만 가능해요!
        </Text>
      </div>
    </main>
  );
};

const meta: Meta<typeof TravelRecommendPageStorybook> = {
  title: "Pages/TravelRecommendPage",
  component: TravelRecommendPageStorybook,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "여행지 추천 페이지 컴포넌트입니다. 사용자의 선호도에 맞춘 3개의 여행지를 추천하고 선택할 수 있습니다.",
      },
    },
  },
  argTypes: {
    userName: {
      control: "text",
      description: "사용자 이름",
    },
    requestCount: {
      control: { type: "number", min: 0, max: 2 },
      description: "추천 요청 횟수",
    },
    maxRequests: {
      control: { type: "number", min: 1, max: 3 },
      description: "최대 추천 요청 횟수",
    },
    isButtonDisabled: {
      control: "boolean",
      description: "버튼 비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TravelRecommendPageStorybook>;

export const Default: Story = {
  args: {
    userName: "김여행",
    requestCount: 0,
    maxRequests: 1,
    isButtonDisabled: false,
  },
};

export const FirstRequest: Story = {
  args: {
    userName: "이여행",
    requestCount: 0,
    maxRequests: 1,
    isButtonDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "첫 번째 추천 요청 상태입니다. '다른 여행지 추천' 버튼이 활성화되어 있습니다.",
      },
    },
  },
};

export const SecondRequest: Story = {
  args: {
    userName: "박여행",
    requestCount: 1,
    maxRequests: 1,
    isButtonDisabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "두 번째 추천 요청 후 상태입니다. 더 이상 추천을 받을 수 없어 버튼이 비활성화됩니다.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    userName: "김여행",
    requestCount: 0,
    maxRequests: 1,
    isButtonDisabled: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "데스크톱 화면에서의 여행지 추천 페이지입니다. 3개의 카드가 가로로 배치됩니다.",
      },
    },
  },
};

export const Mobile: Story = {
  args: {
    userName: "김여행",
    requestCount: 0,
    maxRequests: 1,
    isButtonDisabled: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "모바일 화면에서의 여행지 추천 페이지입니다. 반응형으로 레이아웃이 조정됩니다.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    userName: "김여행",
    requestCount: 0,
    maxRequests: 1,
    isButtonDisabled: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "태블릿 화면에서의 여행지 추천 페이지입니다.",
      },
    },
  },
};

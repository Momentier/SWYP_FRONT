import type { Meta, StoryObj } from "@storybook/react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Image from "next/image";
import { useRef, useState } from "react";
import { COMMON_IMAGES } from "@/utils/imagePath";

// 실제 MyPage와 동일한 구조
const MyPageStorybook = ({
  userName = "김여행",
  hasItineraries = true,
  itineraryCount = 5,
  createdAt = "2024.11.15"
}: {
  userName?: string;
  hasItineraries?: boolean;
  itineraryCount?: number;
  createdAt?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 샘플 여행 일정 데이터
  const courseList = hasItineraries ? Array.from({ length: itineraryCount }, (_, index) => ({
    id: index + 1,
    title: `${["서울", "부산", "제주도", "경주", "강릉"][index % 5]} ${Math.floor(index / 5) + 2}박 ${Math.floor(index / 5) + 3}일 여행`,
    image_url: [COMMON_IMAGES.DEFAULT_IMG],
    createdAt: "2024.12.15",
    isPublic: index % 2 === 0,
  })) : [];

  const displayedCourses = isExpanded ? courseList : courseList.slice(0, 3);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleUnlink = () => {
    console.log('서비스 탈퇴하기 클릭');
  };

  const handleBack = () => {
    console.log('뒤로가기 클릭');
  };

  const handleCardClick = (id: number) => {
    console.log('카드 클릭:', id);
  };

  const handleCreateCourse = () => {
    console.log('지금 코스 만들러 가기 클릭');
  };

  return (
    <div className="w-full flex flex-col gap-[40px] mx-auto px-5 py-[60px] 
                    max-w-[1100px] 
                    lg:max-w-[900px] 
                    md:max-w-[700px] 
                    sm:max-w-[500px]
                    min-h[1180px]">
      <div className="flex items-center gap-2 ">
        <Image
          src={COMMON_IMAGES.CHEVRON_LEFT}
          alt="chip icon"
          width={20}
          height={20}
          onClick={handleBack}
          className="cursor-pointer"
        />
        <Text as="h1" textStyle="heading1" className="font-bold">
          마이페이지
        </Text>
      </div>

      <div className="flex items-center bg-white py-[20px] px-[28px] rounded-lg shadow-md gap-4">
        <Image
          src={COMMON_IMAGES.KAKAO_ROUND}
          alt="profile"
          width={52}
          height={52}
          className="rounded-full"
        />
        <div className="flex flex-col justify-center">
          <Text as="p" textStyle="headline1" className="font-semibold text-left text-[18px] text-[#404040] font-pretendard leading-[144.5%] tracking-[-0.004px]">
            {userName}
          </Text>
          <Text as="p" textStyle="label1" className="text-gray-500">
            카카오 계정 연결 {createdAt}
          </Text>
        </div>
      </div>

      <section className="space-y-4 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <Text textStyle="heading2" className="font-bold">
            저장한 추천 여행코스
          </Text>
        </div>

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        >
          {courseList.length > 0 ? (
            <>
              <div className="grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full">
                {displayedCourses.map((course) => (
                  <Card
                    className="w-full max-w-[280px] min-w-[200px]"
                    key={course.id}
                    size="small"
                    region={course.title}
                    distanceInfo="알 수 없음"
                    imageUrl={course.image_url[0]}
                    onClick={() => handleCardClick(course.id)}
                  />
                ))}
              </div>

              {courseList.length > 3 && (
                <div className="flex justify-center items-center mt-[16px] bg-[#F8F8F8] px-[20px] py-[12px] rounded-[12px]">
                  <button
                    onClick={handleToggle}
                    className="flex items-center gap-2 text-gray-600 text-sm font-medium"
                  >
                    <span>{isExpanded ? "접기" : "더보기"}</span>
                    <Image
                      src={COMMON_IMAGES.CHEVRON_DOWN}
                      alt="chevron"
                      className={`${isExpanded ? "rotate-180" : ""}`}
                      width={12}
                      height={12}
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-[160px] bg-[#F8F8F8] flex flex-col justify-center items-center rounded-[12px] mt-[16px] p-[20px]">
              <Text textStyle='body1' className="text-gray-500 mb-[8px] font-bold">
                아직 저장된 여행 코스가 없어요.
              </Text>
              <Text textStyle='label1' className="text-gray-400 mb-[16px] font-bold">
                나에게 꼭 맞는 여행지를 추천받고, 나만의 일정을 만들어보세요!
              </Text>
              <Button
                variant='gradation'
                className='text-white font-semibold text-[16px] leading-[24px] tracking-[0.091px] mx-auto'
                onClick={handleCreateCourse}
              >
                지금 코스 만들러 가기 →
              </Button>
            </div>
          )}
        </div>
      </section>

      <div className="min-h-[80px]"></div>

      <div className="w-full flex justify-start pt-10">
        <div className="flex items-center gap-2 cursor-pointer mb-5">
          <button
            className="text-sm text-gray-500 underline hover:text-gray-700"
            onClick={handleUnlink}
          >
            서비스 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MyPageStorybook> = {
  title: "Pages/MyPage",
  component: MyPageStorybook,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "마이페이지 컴포넌트입니다. 사용자 프로필과 저장된 여행 일정들을 보여줍니다.",
      },
    },
  },
  argTypes: {
    userName: {
      control: "text",
      description: "사용자 이름",
    },
    hasItineraries: {
      control: "boolean",
      description: "여행 일정 보유 여부",
    },
    itineraryCount: {
      control: { type: "number", min: 0, max: 10 },
      description: "여행 일정 개수",
    },
    createdAt: {
      control: "text",
      description: "계정 생성일",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyPageStorybook>;

export const Default: Story = {
  args: {
    userName: "김여행",
    hasItineraries: true,
    itineraryCount: 5,
    createdAt: "2024.11.15",
  },
};

export const EmptyState: Story = {
  args: {
    userName: "신규여행",
    hasItineraries: false,
    itineraryCount: 0,
    createdAt: "2024.12.01",
  },
  parameters: {
    docs: {
      description: {
        story: "저장된 여행 일정이 없는 상태입니다. 코스 만들기 버튼이 표시됩니다.",
      },
    },
  },
};

export const FewItineraries: Story = {
  args: {
    userName: "이여행",
    hasItineraries: true,
    itineraryCount: 2,
    createdAt: "2024.10.20",
  },
  parameters: {
    docs: {
      description: {
        story: "3개 미만의 여행 일정이 있는 상태입니다. 더보기 버튼이 표시되지 않습니다.",
      },
    },
  },
};

export const ManyItineraries: Story = {
  args: {
    userName: "박여행",
    hasItineraries: true,
    itineraryCount: 8,
    createdAt: "2024.09.05",
  },
  parameters: {
    docs: {
      description: {
        story: "많은 여행 일정이 있는 상태입니다. 더보기/접기 버튼으로 확장할 수 있습니다.",
      },
    },
  },
};

export const Desktop: Story = {
  args: {
    userName: "김여행",
    hasItineraries: true,
    itineraryCount: 5,
    createdAt: "2024.11.15",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "데스크톱 화면에서의 마이페이지입니다. 3열 그리드로 카드들이 배치됩니다.",
      },
    },
  },
};

export const Mobile: Story = {
  args: {
    userName: "김여행",
    hasItineraries: true,
    itineraryCount: 5,
    createdAt: "2024.11.15",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "모바일 화면에서의 마이페이지입니다. 반응형으로 레이아웃이 조정됩니다.",
      },
    },
  },
};

export const Tablet: Story = {
  args: {
    userName: "김여행",
    hasItineraries: true,
    itineraryCount: 5,
    createdAt: "2024.11.15",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "태블릿 화면에서의 마이페이지입니다.",
      },
    },
  },
};

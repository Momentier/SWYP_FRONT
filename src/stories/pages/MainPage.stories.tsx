import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Image from "next/image";

// 실제 메인 페이지 컴포넌트 구조를 그대로 사용하는 스토리북용 컴포넌트
const MainPageStorybook = ({ isLoggedIn = false, loading = false, error = null }: {
  isLoggedIn?: boolean;
  loading?: boolean;
  error?: string | null;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // 샘플 카드 데이터
  const sampleCards = [
    {
      id: 1,
      title: "제주도 3일 힐링 여행",
      image_url: "/default_img.png",
    },
    {
      id: 2,
      title: "부산 바다 여행",
      image_url: "/default_img.png",
    },
    {
      id: 3,
      title: "서울 문화 탐방",
      image_url: "/default_img.png",
    },
    {
      id: 4,
      title: "경주 역사 여행",
      image_url: "/default_img.png",
    },
    {
      id: 5,
      title: "강릉 커피 투어",
      image_url: "/default_img.png",
    },
  ];

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    const container = mainRef.current;
    if (!slider || !container) return;

    const frame = () => {
      const containerCenter = container.clientWidth / 2;
      const children = Array.from(slider.children) as HTMLElement[];

      const distances = children.map((child) => {
        const rect = child.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        return {
          el: child,
          distance: Math.abs(containerCenter - cardCenter),
        };
      });

      const sorted = distances.sort((a, b) => a.distance - b.distance);

      children.forEach((child) => {
        child.classList.remove("opacity-100");
        child.classList.add("opacity-50");
      });

      sorted.slice(0, 3).forEach(({ el }) => {
        el.classList.remove("opacity-50");
        el.classList.add("opacity-100");
      });

      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, []);

  return (
    <div ref={mainRef} className="w-full">
      <main className="mt-[188px] text-center">
        <Text as="h1" textStyle="display1" className="font-bold">
          어디로 떠날지 고민 중이라면, <br />
          모먼티어가 도와드릴게요
        </Text>
        <Text as="p" textStyle="heading2" className="mt-5 font-semibold">
          복잡한 일정 없이, 몇 가지 정보만 알려주시면 추천은 저희가 알아서 해드려요.
        </Text>
      </main>

      <section className="relative group mt-[80px]">
        {loading ? (
          <div className="text-center text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-red-500">에러 발생: {error}</div>
        ) : (
          <div
            ref={sliderRef}
            className="flex w-max gap-4 animate-marquee"
          >
            {sampleCards.map((card) => (
              <div
                key={card.id}
                className="transition-transform duration-300 hover:scale-105"
              >
                <Card
                size="small"
                region={card.title}
                distanceInfo="알 수 없음"
                onClick={() => console.log('카드 클릭:', card.title)}
                imageUrl={
                  card.image_url && isValidUrl(card.image_url)
                    ? card.image_url
                    : "/default_img.png"
                }
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 flex justify-center">
        {!isLoggedIn ? (
          <button
            className="flex px-5 py-[13px] bg-[#FFE812] rounded-full cursor-pointer"
            onClick={() => console.log('카카오 로그인 클릭')}
          >
            <Image src="/icons/kakao.png" alt="kakao icon" width={28} height={28} />
            <Text textStyle="headline1" className="ml-2 font-semibold">
              카카오로 시작하기
            </Text>
          </button>
        ) : (
          <Button onClick={() => console.log('시작하기 클릭')} variant="gradation">
            시작하기
          </Button>
        )}
      </section>
    </div>
  );
};

const meta: Meta<typeof MainPageStorybook> = {
  title: "Pages/MainPage",
  component: MainPageStorybook,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "메인 페이지 컴포넌트입니다. 헤더와 메인 컨텐츠를 포함하며, 여행지 추천 카드들과 시작하기 버튼이 있습니다.",
      },
    },
  },
  argTypes: {
    isLoggedIn: {
      control: "boolean",
      description: "로그인 상태",
    },
    loading: {
      control: "boolean",
      description: "로딩 상태",
    },
    error: {
      control: "text",
      description: "에러 메시지",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainPageStorybook>;

export const Default: Story = {
  args: {
    isLoggedIn: false,
    loading: false,
    error: null,
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    loading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    isLoggedIn: false,
    loading: true,
    error: null,
  },
};

export const Error: Story = {
  args: {
    isLoggedIn: false,
    loading: false,
    error: "여행지 데이터를 불러오는데 실패했습니다.",
  },
};

export const Desktop: Story = {
  args: {
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const Mobile: Story = {
  args: {
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import AppLayout from "@/components/layout/AppLayout";
import Text from "@/components/Text";

const meta: Meta<typeof AppLayout> = {
  title: "Layouts/AppLayout",
  component: AppLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "앱의 기본 레이아웃 컴포넌트입니다. 헤더와 메인 컨텐츠 영역을 포함합니다.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "레이아웃 내부에 렌더링될 컨텐츠",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-8">
        <Text textStyle="title1" className="mb-4">
          앱 레이아웃 컨텐츠
        </Text>
        <Text textStyle="body1">
          이곳에 페이지 컨텐츠가 표시됩니다.
        </Text>
      </div>
    ),
  },
};

export const WithLongContent: Story = {
  args: {
    children: (
      <div className="p-8 space-y-6">
        <Text textStyle="title1" className="mb-4">
          긴 컨텐츠가 있는 레이아웃
        </Text>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg">
            <Text textStyle="heading2" className="mb-2">
              섹션 {i + 1}
            </Text>
            <Text textStyle="body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
          </div>
        ))}
      </div>
    ),
  },
};

export const WithCards: Story = {
  args: {
    children: (
      <div className="p-8">
        <Text textStyle="title1" className="mb-6">
          카드 레이아웃
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-full h-40 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg mb-4"></div>
              <Text textStyle="heading2" className="mb-2">
                카드 {i + 1}
              </Text>
              <Text textStyle="body2" className="text-gray-600">
                카드 설명 텍스트입니다.
              </Text>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const TravelItinerary: Story = {
  args: {
    children: (
      <div className="p-8">
        <Text textStyle="title1" className="mb-6">
          여행 일정
        </Text>
        <div className="space-y-4">
          {[
            { day: "1일차", places: ["경복궁", "인사동", "명동"] },
            { day: "2일차", places: ["남산타워", "이태원", "한강공원"] },
            { day: "3일차", places: ["롯데타워", "강남", "홍대"] },
          ].map((schedule, index) => (
            <div key={index} className="bg-purple-50 p-6 rounded-xl">
              <Text textStyle="heading1" className="mb-4 font-bold">
                {schedule.day}
              </Text>
              <div className="space-y-2">
                {schedule.places.map((place, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {i + 1}
                    </div>
                    <Text textStyle="body1">{place}</Text>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    children: (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Text textStyle="title2">📋</Text>
          </div>
          <Text textStyle="heading1" className="mb-2">
            컨텐츠가 없습니다
          </Text>
          <Text textStyle="body1" className="text-gray-600">
            표시할 내용이 없습니다.
          </Text>
        </div>
      </div>
    ),
  },
};

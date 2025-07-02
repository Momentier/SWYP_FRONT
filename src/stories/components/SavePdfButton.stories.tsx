import type { Meta, StoryObj } from "@storybook/react";
import SavePdfButton from "@/components/SavePdfButton";

const meta: Meta<typeof SavePdfButton> = {
  title: "Components/SavePdfButton",
  component: SavePdfButton,
  tags: ["autodocs"],
  argTypes: {
    onClickButton: {
      action: "clicked",
      description: "PDF 저장 완료 후 실행될 콜백 함수",
    },
    fileName: {
      control: "text",
      description: "저장될 PDF 파일명 (확장자 제외)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SavePdfButton>;

// PDF 타겟이 될 더미 컨텐츠를 추가하는 데코레이터
const withPdfTarget = (Story: any) => (
  <div>
    <div 
      id="pdf-target" 
      className="w-[800px] h-[600px] bg-white p-8 border border-gray-200 mb-8"
    >
      <h1 className="text-2xl font-bold mb-4">여행 일정서</h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded">
          <h2 className="font-semibold">1일차</h2>
          <p>경복궁 → 인사동 → 명동</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h2 className="font-semibold">2일차</h2>
          <p>남산타워 → 이태원 → 한강공원</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h2 className="font-semibold">3일차</h2>
          <p>롯데타워 → 강남 → 홍대</p>
        </div>
      </div>
    </div>
    <Story />
  </div>
);

export const Default: Story = {
  args: {
    fileName: "my-document",
  },
  decorators: [withPdfTarget],
};

export const CustomFileName: Story = {
  args: {
    fileName: "seoul-travel-itinerary",
  },
  decorators: [withPdfTarget],
};

export const TravelItinerary: Story = {
  args: {
    fileName: "여행일정_2024_서울",
  },
  decorators: [withPdfTarget],
};

export const WithoutTarget: Story = {
  args: {
    fileName: "test-document",
  },
  parameters: {
    docs: {
      description: {
        story: "PDF 타겟 요소가 없는 경우 - 실제로는 작동하지 않습니다.",
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => (
    <div>
      <div 
        id="pdf-target" 
        className="w-[600px] h-[400px] bg-gradient-to-br from-blue-50 to-purple-50 p-6 border rounded-lg mb-8"
      >
        <h1 className="text-3xl font-bold text-purple-800 mb-6">🗾 제주도 여행 계획</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg mb-2">📍 1일차</h2>
            <ul className="space-y-1 text-sm">
              <li>✈️ 제주공항 도착</li>
              <li>🏨 숙소 체크인</li>
              <li>🌅 성산일출봉</li>
              <li>🍽️ 흑돼지 맛집</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg mb-2">📍 2일차</h2>
            <ul className="space-y-1 text-sm">
              <li>🌺 한라산 등반</li>
              <li>☕ 카페거리 투어</li>
              <li>🌊 해수욕장</li>
              <li>🍊 감귤체험</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-100 rounded">
          <p className="text-sm text-yellow-800">💡 팁: 렌트카 예약은 미리 하세요!</p>
        </div>
      </div>
      <SavePdfButton {...args} />
    </div>
  ),
  args: {
    fileName: "jeju-travel-plan",
  },
};

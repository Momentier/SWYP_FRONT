import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DefaultModal from "@/components/modals/DefaultModal";
import Button from "@/components/Button";
import Text from "@/components/Text";

const meta: Meta<typeof DefaultModal> = {
  title: "Components/Modals/DefaultModal",
  component: DefaultModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "모달 제목",
    },
    description: {
      control: "text",
      description: "모달 설명 (선택사항)",
    },
    onClose: {
      action: "closed",
      description: "모달 닫기 이벤트 핸들러",
    },
    children: {
      control: "text",
      description: "모달 내부 컨텐츠",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DefaultModal>;

// 모달 트리거를 위한 래퍼 컴포넌트
const DefaultModalWrapper = ({ children, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button variant="gradation" onClick={() => setIsOpen(true)}>
        기본 모달 열기
      </Button>
      {isOpen && (
        <DefaultModal {...args} onClose={() => setIsOpen(false)}>
          {children}
        </DefaultModal>
      )}
    </div>
  );
};

export const Basic: Story = {
  render: (args) => (
    <DefaultModalWrapper {...args}>
      <div className="text-center py-4">
        <Text textStyle="body1" className="text-gray-600">
          이것은 기본 모달의 내용 영역입니다.
        </Text>
      </div>
    </DefaultModalWrapper>
  ),
  args: {
    title: "기본 모달",
    description: "이것은 기본 모달입니다.",
  },
};

export const WithForm: Story = {
  render: (args) => (
    <DefaultModalWrapper {...args}>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">제목</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="여행 제목을 입력하세요"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">설명</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg h-20"
            placeholder="여행에 대한 설명을 입력하세요"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="default">취소</Button>
          <Button variant="gradation">저장</Button>
        </div>
      </form>
    </DefaultModalWrapper>
  ),
  args: {
    title: "여행 정보 입력",
    description: "새로운 여행 계획의 기본 정보를 입력해주세요.",
  },
};

export const WithFilters: Story = {
  render: (args) => (
    <DefaultModalWrapper {...args}>
      <div className="space-y-4">
        <div>
          <Text textStyle="label1" className="font-semibold mb-2 block">
            지역 선택
          </Text>
          <div className="grid grid-cols-2 gap-2">
            {["서울", "부산", "제주", "강릉", "전주", "경주"].map((city) => (
              <label key={city} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <Text textStyle="body2">{city}</Text>
              </label>
            ))}
          </div>
        </div>
        <div>
          <Text textStyle="label1" className="font-semibold mb-2 block">
            여행 타입
          </Text>
          <div className="space-y-1">
            {["휴양", "관광", "맛집투어", "문화체험", "액티비티"].map(
              (type) => (
                <label key={type} className="flex items-center">
                  <input type="radio" name="travelType" className="mr-2" />
                  <Text textStyle="body2">{type}</Text>
                </label>
              ),
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="gradation">필터 적용</Button>
        </div>
      </div>
    </DefaultModalWrapper>
  ),
  args: {
    title: "검색 필터",
    description: "원하는 조건을 선택해주세요.",
  },
};

export const WithoutDescription: Story = {
  render: (args) => (
    <DefaultModalWrapper {...args}>
      <div className="py-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Text textStyle="title2">📍</Text>
          </div>
          <Text textStyle="body1" className="text-gray-600">
            여행지를 선택해주세요
          </Text>
          <Button variant="gradation">지도에서 선택하기</Button>
        </div>
      </div>
    </DefaultModalWrapper>
  ),
  args: {
    title: "여행지 선택",
  },
};

export const WithTabs: Story = {
  render: (args) => (
    <DefaultModalWrapper {...args}>
      <div>
        <div className="flex border-b mb-4">
          <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-600">
            추천 여행지
          </button>
          <button className="px-4 py-2 text-gray-500">인기 여행지</button>
          <button className="px-4 py-2 text-gray-500">최근 여행지</button>
        </div>
        <div className="space-y-2">
          {[
            { name: "경복궁", desc: "조선 왕조의 정궁" },
            { name: "인사동", desc: "전통 문화의 거리" },
            { name: "명동", desc: "쇼핑과 맛집의 중심지" },
            { name: "남산타워", desc: "서울의 랜드마크" },
          ].map((place, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div>
                <Text textStyle="body1" className="font-semibold">
                  {place.name}
                </Text>
                <Text textStyle="body2" className="text-gray-600">
                  {place.desc}
                </Text>
              </div>
              <Button variant="default">선택</Button>
            </div>
          ))}
        </div>
      </div>
    </DefaultModalWrapper>
  ),
  args: {
    title: "여행지 추가",
    description: "일정에 추가할 여행지를 선택해주세요.",
  },
};

export const AlwaysOpen: Story = {
  render: (args) => (
    <div className="p-8">
      <DefaultModal {...args} onClose={() => console.log("모달 닫기 시도")}>
        <div className="text-center py-4">
          <Text textStyle="body1" className="text-gray-600">
            스토리북에서 확인하기 위한 기본 모달입니다.
          </Text>
        </div>
      </DefaultModal>
    </div>
  ),
  args: {
    title: "항상 열린 기본 모달",
    description: "스토리북에서 디자인을 확인하기 위한 모달입니다.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "스토리북에서 모달 디자인을 확인하기 위해 항상 열린 상태로 표시됩니다.",
      },
    },
  },
};

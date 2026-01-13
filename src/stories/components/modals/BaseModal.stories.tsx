import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import BaseModal from "@/components/modals/BaseModal";
import Button from "@/components/Button";
import Text from "@/components/Text";

const meta: Meta<typeof BaseModal> = {
  title: "Components/Modals/BaseModal",
  component: BaseModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    children: {
      control: "text",
      description: "모달 내부 컨텐츠",
    },
    onClose: {
      action: "closed",
      description: "모달 닫기 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseModal>;

// 모달 트리거를 위한 래퍼 컴포넌트
const ModalWrapper = ({ children, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button variant="gradation" onClick={() => setIsOpen(true)}>
        모달 열기
      </Button>
      {isOpen && (
        <BaseModal {...args} onClose={() => setIsOpen(false)}>
          {children}
        </BaseModal>
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <Text textStyle="heading1" className="font-semibold text-center mb-4">
        기본 모달
      </Text>
      <Text textStyle="body1" className="text-center text-gray-600">
        이것은 기본 모달입니다. ESC 키를 누르거나 배경을 클릭하여 닫을 수
        있습니다.
      </Text>
    </ModalWrapper>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <Text textStyle="heading1" className="font-semibold text-center mb-6">
        사용자 정보 입력
      </Text>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="default">취소</Button>
          <Button variant="gradation">저장</Button>
        </div>
      </div>
    </ModalWrapper>
  ),
};

export const WithList: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <Text textStyle="heading1" className="font-semibold text-center mb-6">
        여행지 목록
      </Text>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {[
          "서울특별시",
          "부산광역시",
          "대구광역시",
          "인천광역시",
          "광주광역시",
          "대전광역시",
          "울산광역시",
          "경기도",
          "강원도",
          "충청북도",
          "충청남도",
          "전라북도",
          "전라남도",
          "경상북도",
          "경상남도",
          "제주특별자치도",
        ].map((city, index) => (
          <div
            key={index}
            className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            {city}
          </div>
        ))}
      </div>
    </ModalWrapper>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <ModalWrapper {...args}>
      <Text textStyle="heading1" className="font-semibold text-center mb-6">
        이용약관
      </Text>
      <div className="max-h-80 overflow-y-auto text-sm text-gray-600 space-y-4">
        <p>
          제1조 (목적) 이 약관은 회사가 제공하는 여행 일정 생성 서비스의 이용과
          관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로
          합니다.
        </p>
        <p>
          제2조 (정의) 이 약관에서 사용하는 용어의 정의는 다음과 같습니다. 1.
          "서비스"라 함은 회사가 제공하는 AI 기반 여행 일정 생성 서비스를
          말합니다. 2. "이용자"라 함은 서비스에 접속하여 이 약관에 따라 서비스를
          이용하는 자를 말합니다.
        </p>
        <p>
          제3조 (약관의 효력 및 변경) 이 약관은 서비스를 이용하고자 하는 모든
          이용자에 대하여 그 효력을 발생합니다. 회사는 필요한 경우 이 약관을
          변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지됩니다.
        </p>
        <p>
          제4조 (서비스의 제공) 회사는 이용자에게 다음과 같은 서비스를
          제공합니다. 1. AI 기반 맞춤형 여행 일정 생성 2. 여행지 정보 제공 3.
          일정 저장 및 공유 기능 4. 기타 회사가 정하는 서비스
        </p>
        <p>
          제5조 (이용자의 의무) 이용자는 다음 행위를 하여서는 안 됩니다. 1.
          타인의 정보 도용 2. 허위 정보 입력 3. 서비스 운영 방해 4. 기타 관련
          법령에 위배되는 행위
        </p>
      </div>
      <div className="flex justify-center mt-6">
        <Button variant="gradation">동의</Button>
      </div>
    </ModalWrapper>
  ),
};

export const AlwaysOpen: Story = {
  render: (args) => (
    <div className="p-8">
      <BaseModal {...args} onClose={() => console.log("모달 닫기 시도")}>
        <Text textStyle="heading1" className="font-semibold text-center mb-4">
          항상 열린 모달
        </Text>
        <Text textStyle="body1" className="text-center text-gray-600">
          이 모달은 스토리북에서 항상 열려있는 상태로 표시됩니다.
        </Text>
      </BaseModal>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "스토리북에서 모달의 디자인을 확인하기 위해 항상 열린 상태로 표시됩니다.",
      },
    },
  },
};

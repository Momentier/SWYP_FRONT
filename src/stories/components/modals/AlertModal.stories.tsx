import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import AlertModal from "@/components/modals/AlertModal";
import Button from "@/components/Button";
import Text from "@/components/Text";

const meta: Meta<typeof AlertModal> = {
  title: "Components/Modals/AlertModal",
  component: AlertModal,
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
    buttonText: {
      control: "text",
      description: "확인 버튼 텍스트",
    },
    onClose: {
      action: "closed",
      description: "모달 닫기 이벤트 핸들러",
    },
    children: {
      control: "text",
      description: "추가 컨텐츠 (선택사항)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

// 모달 트리거를 위한 래퍼 컴포넌트
const AlertModalWrapper = ({ children, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button variant="gradation" onClick={() => setIsOpen(true)}>
        알림 모달 열기
      </Button>
      {isOpen && (
        <AlertModal {...args} onClose={() => setIsOpen(false)}>
          {children}
        </AlertModal>
      )}
    </div>
  );
};

export const Success: Story = {
  render: (args) => (
    <AlertModalWrapper {...args} />
  ),
  args: {
    title: "저장 완료",
    description: "여행 일정이 성공적으로 저장되었습니다.",
    buttonText: "확인",
  },
};

export const Error: Story = {
  render: (args) => (
    <AlertModalWrapper {...args} />
  ),
  args: {
    title: "오류 발생",
    description: "네트워크 연결을 확인하고 다시 시도해주세요.",
    buttonText: "확인",
  },
};

export const Warning: Story = {
  render: (args) => (
    <AlertModalWrapper {...args} />
  ),
  args: {
    title: "주의사항",
    description: "이 작업은 되돌릴 수 없습니다.\n정말로 계속하시겠습니까?",
    buttonText: "알겠습니다",
  },
};

export const WithoutDescription: Story = {
  render: (args) => (
    <AlertModalWrapper {...args} />
  ),
  args: {
    title: "알림",
    buttonText: "확인",
  },
};

export const LongTitle: Story = {
  render: (args) => (
    <AlertModalWrapper {...args} />
  ),
  args: {
    title: "여행 일정 생성이 완료되었습니다",
    description: "AI가 분석한 맞춤형 여행 일정을 확인해보세요. 마음에 들지 않는 부분이 있다면 언제든지 수정하실 수 있습니다.",
    buttonText: "일정 확인하기",
  },
};

export const WithCustomContent: Story = {
  render: (args) => (
    <AlertModalWrapper {...args}>
      <div className="bg-blue-50 p-4 rounded-lg">
        <Text textStyle="body2" className="text-blue-800">
          💡 <strong>팁:</strong> 생성된 일정은 마이페이지에서 언제든지 확인하고 수정할 수 있습니다.
        </Text>
      </div>
    </AlertModalWrapper>
  ),
  args: {
    title: "일정 생성 완료",
    description: "맞춤형 여행 일정이 준비되었습니다.",
    buttonText: "확인",
  },
};

export const LoginRequired: Story = {
  render: (args) => (
    <AlertModalWrapper {...args} />
  ),
  args: {
    title: "로그인 필요",
    description: "이 기능을 사용하려면 로그인이 필요합니다.",
    buttonText: "로그인하기",
  },
};

export const AlwaysOpen: Story = {
  render: (args) => (
    <div className="p-8">
      <AlertModal {...args} onClose={() => console.log("모달 닫기 시도")}>
        {args.children}
      </AlertModal>
    </div>
  ),
  args: {
    title: "항상 열린 알림 모달",
    description: "스토리북에서 확인하기 위한 모달입니다.",
    buttonText: "확인",
  },
  parameters: {
    docs: {
      description: {
        story: "스토리북에서 모달 디자인을 확인하기 위해 항상 열린 상태로 표시됩니다.",
      },
    },
  },
};

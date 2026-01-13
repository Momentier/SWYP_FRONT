import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import Button from "@/components/Button";
import Text from "@/components/Text";

const meta: Meta<typeof ConfirmModal> = {
  title: "Components/Modals/ConfirmModal",
  component: ConfirmModal,
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
    cancelText: {
      control: "text",
      description: "취소 버튼 텍스트",
    },
    confirmText: {
      control: "text",
      description: "확인 버튼 텍스트",
    },
    onCancel: {
      action: "cancelled",
      description: "취소 이벤트 핸들러",
    },
    onConfirm: {
      action: "confirmed",
      description: "확인 이벤트 핸들러",
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
type Story = StoryObj<typeof ConfirmModal>;

// 모달 트리거를 위한 래퍼 컴포넌트
const ConfirmModalWrapper = ({ children, ...args }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8">
      <Button variant="gradation" onClick={() => setIsOpen(true)}>
        확인 모달 열기
      </Button>
      {isOpen && (
        <ConfirmModal
          {...args}
          onCancel={() => setIsOpen(false)}
          onConfirm={() => {
            args.onConfirm?.();
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        >
          {children}
        </ConfirmModal>
      )}
    </div>
  );
};

export const DeleteConfirm: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "일정 삭제",
    description:
      "정말로 이 여행 일정을 삭제하시겠습니까?\n삭제된 일정은 복구할 수 없습니다.",
    cancelText: "취소",
    confirmText: "삭제",
  },
};

export const SaveConfirm: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "일정 저장",
    description: "현재 작성된 여행 일정을 저장하시겠습니까?",
    cancelText: "취소",
    confirmText: "저장",
  },
};

export const LogoutConfirm: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "로그아웃",
    description: "정말로 로그아웃하시겠습니까?",
    cancelText: "취소",
    confirmText: "로그아웃",
  },
};

export const WithoutDescription: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "확인이 필요합니다",
    cancelText: "아니오",
    confirmText: "예",
  },
};

export const CustomButtonText: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "여행 계획 변경",
    description: "새로운 여행지를 추가하면 기존 일정이 변경될 수 있습니다.",
    cancelText: "돌아가기",
    confirmText: "계속 진행",
  },
};

export const LongDescription: Story = {
  render: (args) => <ConfirmModalWrapper {...args} />,
  args: {
    title: "개인정보 수집 동의",
    description:
      "서비스 개선을 위해 여행 성향과 관련된 정보를 수집합니다.\n수집된 정보는 개인정보 처리방침에 따라 안전하게 보관되며,\n언제든지 철회하실 수 있습니다.\n\n동의하시겠습니까?",
    cancelText: "거부",
    confirmText: "동의",
  },
};

export const WithCustomContent: Story = {
  render: (args) => (
    <ConfirmModalWrapper {...args}>
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <Text textStyle="body2" className="text-yellow-800">
          ⚠️ <strong>주의:</strong> 이 작업은 되돌릴 수 없습니다. 신중하게
          선택해주세요.
        </Text>
      </div>
    </ConfirmModalWrapper>
  ),
  args: {
    title: "위험한 작업",
    description: "이 작업을 수행하면 모든 데이터가 삭제됩니다.",
    cancelText: "취소",
    confirmText: "삭제",
  },
};

export const PaymentConfirm: Story = {
  render: (args) => (
    <ConfirmModalWrapper {...args}>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <Text textStyle="body2" className="text-gray-600">
            프리미엄 플랜
          </Text>
          <Text textStyle="body1" className="font-semibold">
            ₩9,900
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <Text textStyle="body2" className="text-gray-600">
            결제 방법
          </Text>
          <Text textStyle="body2">신용카드 (****-1234)</Text>
        </div>
      </div>
    </ConfirmModalWrapper>
  ),
  args: {
    title: "결제 확인",
    description: "프리미엄 플랜을 구매하시겠습니까?",
    cancelText: "취소",
    confirmText: "결제하기",
  },
};

export const AlwaysOpen: Story = {
  render: (args) => (
    <div className="p-8">
      <ConfirmModal
        {...args}
        onCancel={() => console.log("취소됨")}
        onConfirm={() => console.log("확인됨")}
        onClose={() => console.log("모달 닫기 시도")}
      >
        {args.children}
      </ConfirmModal>
    </div>
  ),
  args: {
    title: "항상 열린 확인 모달",
    description: "스토리북에서 확인하기 위한 모달입니다.",
    cancelText: "취소",
    confirmText: "확인",
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

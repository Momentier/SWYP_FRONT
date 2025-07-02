import type { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import ToastContainer from "@/components/ToastContainer";
import Button from "@/components/Button";
import { useToastStore } from "@/store/useToastStore";

const meta: Meta<typeof ToastContainer> = {
  title: "Components/ToastContainer",
  component: ToastContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

// 토스트를 보여주기 위한 래퍼 컴포넌트
const ToastDemo = ({ toasts }: { toasts: Array<{type: 'success' | 'error', message: string}> }) => {
  const { addToast, clearToasts } = useToastStore();

  useEffect(() => {
    clearToasts();
    toasts.forEach((toast, index) => {
      setTimeout(() => {
        addToast(toast.message, toast.type);
      }, index * 500);
    });
  }, [toasts, addToast, clearToasts]);

  return <ToastContainer />;
};

// 인터랙티브 토스트 데모
const InteractiveToastDemo = () => {
  const { addToast, clearToasts } = useToastStore();

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">토스트 메시지 테스트</h2>
      <div className="space-x-4">
        <Button 
          variant="confirm"
          onClick={() => addToast("성공적으로 저장되었습니다!", "success")}
        >
          성공 토스트
        </Button>
        <Button 
          variant="default"
          onClick={() => addToast("오류가 발생했습니다. 다시 시도해주세요.", "error")}
        >
          에러 토스트
        </Button>
        <Button 
          variant="gradation"
          onClick={() => addToast("여행 일정이 생성되었습니다. 확인해보세요!", "success")}
        >
          긴 성공 메시지
        </Button>
        <Button 
          variant="hover"
          onClick={() => {
            addToast("첫 번째 메시지", "success");
            setTimeout(() => addToast("두 번째 메시지", "error"), 500);
            setTimeout(() => addToast("세 번째 메시지", "success"), 1000);
          }}
        >
          여러 토스트
        </Button>
        <Button 
          variant="press"
          onClick={clearToasts}
        >
          모두 지우기
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export const SuccessToast: Story = {
  render: () => (
    <ToastDemo toasts={[
      { type: "success", message: "성공적으로 저장되었습니다!" }
    ]} />
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <ToastDemo toasts={[
      { type: "error", message: "오류가 발생했습니다. 다시 시도해주세요." }
    ]} />
  ),
};

export const LongMessage: Story = {
  render: () => (
    <ToastDemo toasts={[
      { type: "success", message: "여행 일정이 성공적으로 생성되었습니다! 마이페이지에서 확인하실 수 있습니다." }
    ]} />
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <ToastDemo toasts={[
      { type: "success", message: "첫 번째 성공 메시지" },
      { type: "error", message: "두 번째 에러 메시지" },
      { type: "success", message: "세 번째 성공 메시지" }
    ]} />
  ),
};

export const CommonMessages: Story = {
  render: () => (
    <ToastDemo toasts={[
      { type: "success", message: "일정이 저장되었습니다." },
      { type: "success", message: "PDF 다운로드가 완료되었습니다." },
      { type: "error", message: "네트워크 연결을 확인해주세요." },
      { type: "error", message: "로그인이 필요한 서비스입니다." }
    ]} />
  ),
};

export const Interactive: Story = {
  render: () => <InteractiveToastDemo />,
  parameters: {
    docs: {
      description: {
        story: "버튼을 클릭하여 다양한 토스트 메시지를 테스트해볼 수 있습니다.",
      },
    },
  },
};

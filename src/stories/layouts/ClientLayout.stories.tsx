import type { Meta, StoryObj } from "@storybook/react";
import ClientLayout from "@/components/layout/ClientLayout";
import Text from "@/components/Text";
import Button from "@/components/Button";

const meta: Meta<typeof ClientLayout> = {
  title: "Layouts/ClientLayout",
  component: ClientLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "클라이언트 사이드 레이아웃 컴포넌트입니다. QueryProvider, ModalProvider 등을 포함합니다.",
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
type Story = StoryObj<typeof ClientLayout>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-8">
        <Text textStyle="title1" className="mb-4">
          클라이언트 레이아웃
        </Text>
        <Text textStyle="body1" className="mb-6">
          이 레이아웃은 React Query, 모달 프로바이더 등을 제공합니다.
        </Text>
        <div className="space-y-4">
          <Button variant="gradation">테스트 버튼</Button>
          <div className="bg-blue-50 p-4 rounded-lg">
            <Text textStyle="body2">
              이 레이아웃에는 ToastContainer도 포함되어 있습니다.
            </Text>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithProviders: Story = {
  args: {
    children: (
      <div className="p-8 space-y-6">
        <Text textStyle="title1" className="mb-4">
          프로바이더 테스트
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <Text textStyle="heading2" className="mb-2 text-green-800">
              ✅ React Query Provider
            </Text>
            <Text textStyle="body2" className="text-green-700">
              서버 상태 관리를 위한 프로바이더가 활성화되어 있습니다.
            </Text>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <Text textStyle="heading2" className="mb-2 text-purple-800">
              ✅ Modal Provider
            </Text>
            <Text textStyle="body2" className="text-purple-700">
              모달 관리를 위한 프로바이더가 활성화되어 있습니다.
            </Text>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <Text textStyle="heading2" className="mb-2 text-orange-800">
              ✅ Layout Selector
            </Text>
            <Text textStyle="body2" className="text-orange-700">
              레이아웃 선택기가 포함되어 있습니다.
            </Text>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <Text textStyle="heading2" className="mb-2 text-blue-800">
              ✅ Toast Container
            </Text>
            <Text textStyle="body2" className="text-blue-700">
              토스트 알림 시스템이 포함되어 있습니다.
            </Text>
          </div>
        </div>
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    children: (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Text textStyle="title2" className="mb-4">
            🏗️ 레이아웃 준비 완료
          </Text>
          <Text textStyle="body1" className="text-gray-600">
            모든 프로바이더가 설정되었습니다.
          </Text>
        </div>
      </div>
    ),
  },
};

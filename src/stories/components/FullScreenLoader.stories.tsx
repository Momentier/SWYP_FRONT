import type { Meta, StoryObj } from "@storybook/react";
import FullScreenLoader from "@/components/FullScreenLoader";

const meta: Meta<typeof FullScreenLoader> = {
  title: "Components/FullScreenLoader",
  component: FullScreenLoader,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "메인 제목 텍스트",
    },
    subTitle: {
      control: "text",
      description: "부제목 텍스트",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FullScreenLoader>;

export const Default: Story = {
  args: {
    title: "모먼티어가 맞춤 여행지를 열심히 고르고 있어요!",
    subTitle: "잠시만 기다려주세요",
  },
};

export const CustomMessage: Story = {
  args: {
    title: "여행 일정을 생성하고 있습니다",
    subTitle: "곧 완성됩니다",
  },
};

export const ShortMessage: Story = {
  args: {
    title: "로딩 중...",
    subTitle: "잠시만요",
  },
};

export const LongMessage: Story = {
  args: {
    title:
      "AI가 여러분의 취향에 맞는 최적의 여행 코스를 분석하고 추천하고 있습니다",
    subTitle:
      "개인화된 여행 계획을 만들기 위해 열심히 작업 중이니 조금만 기다려주세요",
  },
};

export const SavingItinerary: Story = {
  args: {
    title: "여행 일정을 저장하고 있습니다",
    subTitle: "데이터를 안전하게 보관 중입니다",
  },
};

export const ProcessingData: Story = {
  args: {
    title: "입력하신 정보를 분석하고 있습니다",
    subTitle: "최적의 결과를 위해 처리 중입니다",
  },
};

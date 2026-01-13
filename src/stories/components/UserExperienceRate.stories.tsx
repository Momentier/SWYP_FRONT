import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import UserExperienceRate from "@/components/UserExperienceRate";

const meta: Meta<typeof UserExperienceRate> = {
  title: "Components/UserExperienceRate",
  component: UserExperienceRate,
  tags: ["autodocs"],
  argTypes: {
    initRate: {
      control: { type: "range", min: 0, max: 5, step: 1 },
      description: "초기 평점 (0-5)",
    },
    initFeedback: {
      control: "text",
      description: "초기 피드백 텍스트",
    },
    onChangeRate: {
      action: "rate changed",
      description: "평점 변경 이벤트 핸들러",
    },
    onChangeFeedback: {
      action: "feedback changed",
      description: "피드백 변경 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserExperienceRate>;

// 제어된 컴포넌트를 위한 래퍼
const UserExperienceRateWrapper = (args: any) => {
  const [rate, setRate] = useState(args.initRate || 0);
  const [feedback, setFeedback] = useState(args.initFeedback || "");

  return (
    <UserExperienceRate
      {...args}
      initRate={rate}
      initFeedback={feedback}
      onChangeRate={(value) => {
        setRate(value);
        args.onChangeRate?.(value);
      }}
      onChangeFeedback={(value) => {
        setFeedback(value);
        args.onChangeFeedback?.(value);
      }}
    />
  );
};

export const Default: Story = {
  render: UserExperienceRateWrapper,
  args: {
    initRate: 0,
    initFeedback: "",
  },
};

export const WithInitialRate: Story = {
  render: UserExperienceRateWrapper,
  args: {
    initRate: 4,
    initFeedback: "",
  },
};

export const WithInitialFeedback: Story = {
  render: UserExperienceRateWrapper,
  args: {
    initRate: 5,
    initFeedback:
      "정말 만족스러운 여행이었습니다! 추천해주신 여행지들이 모두 좋았어요.",
  },
};

export const LowRating: Story = {
  render: UserExperienceRateWrapper,
  args: {
    initRate: 2,
    initFeedback: "몇 가지 아쉬운 점이 있었지만, 전반적으로는 괜찮았습니다.",
  },
};

export const HighRating: Story = {
  render: UserExperienceRateWrapper,
  args: {
    initRate: 5,
    initFeedback:
      "완벽한 여행이었습니다! 모든 일정이 완벽하게 짜여져 있어서 정말 편리했어요. 특히 맛집 추천이 너무 좋았습니다.",
  },
};

export const EmptyState: Story = {
  render: UserExperienceRateWrapper,
  args: {
    initRate: 0,
    initFeedback: "",
  },
};

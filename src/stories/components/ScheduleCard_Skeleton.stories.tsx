import type { Meta, StoryObj } from "@storybook/react";
import ScheduleCard_Skeleton from "@/components/ScheduleCard_Skeleton";

const meta: Meta<typeof ScheduleCard_Skeleton> = {
  title: "Components/ScheduleCard_Skeleton",
  component: ScheduleCard_Skeleton,
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "range", min: 1, max: 10, step: 1 },
      description: "스켈레톤 카드 개수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScheduleCard_Skeleton>;

export const SingleCard: Story = {
  args: {
    count: 1,
  },
};

export const ThreeCards: Story = {
  args: {
    count: 3,
  },
};

export const FiveCards: Story = {
  args: {
    count: 5,
  },
};

export const ManyCards: Story = {
  args: {
    count: 8,
  },
};

export const LoadingState: Story = {
  args: {
    count: 4,
  },
  parameters: {
    docs: {
      description: {
        story: "일정을 불러오는 동안 표시되는 로딩 상태입니다.",
      },
    },
  },
};

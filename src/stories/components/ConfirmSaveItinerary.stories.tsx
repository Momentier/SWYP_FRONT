import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ConfirmSaveItinerary from "@/components/ConfirmSaveItinerary";

const meta: Meta<typeof ConfirmSaveItinerary> = {
  title: "Components/ConfirmSaveItinerary",
  component: ConfirmSaveItinerary,
  tags: ["autodocs"],
  argTypes: {
    initValue: {
      control: "boolean",
      description: "초기 체크 상태",
    },
    onChange: {
      action: "changed",
      description: "체크 상태 변경 이벤트 핸들러",
    },
    title: {
      control: "text",
      description: "제목 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmSaveItinerary>;

// 제어된 컴포넌트를 위한 래퍼
const ConfirmSaveItineraryWrapper = (args: any) => {
  const [checked, setChecked] = useState(args.initValue || false);

  return (
    <ConfirmSaveItinerary
      {...args}
      initValue={checked}
      onChange={(value) => {
        setChecked(value);
        args.onChange?.(value);
      }}
    />
  );
};

export const Default: Story = {
  render: ConfirmSaveItineraryWrapper,
  args: {
    title: "이 일정을 저장하시겠습니까?",
    initValue: false,
  },
};

export const PreChecked: Story = {
  render: ConfirmSaveItineraryWrapper,
  args: {
    title: "이 일정을 저장하시겠습니까?",
    initValue: true,
  },
};

export const LongTitle: Story = {
  render: ConfirmSaveItineraryWrapper,
  args: {
    title:
      "여행 일정이 완성되었습니다! 이 멋진 여행 계획을 저장하고 다른 사용자들과 공유하시겠습니까? 저장된 일정은 마이페이지에서 언제든지 확인하실 수 있습니다.",
    initValue: false,
  },
};

export const ShortTitle: Story = {
  render: ConfirmSaveItineraryWrapper,
  args: {
    title: "저장",
    initValue: false,
  },
};

export const SaveConfirmation: Story = {
  render: ConfirmSaveItineraryWrapper,
  args: {
    title: "작성하신 여행 일정을 저장하고 공유하시겠습니까?",
    initValue: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TextField from "@/components/TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    value: {
      control: "text",
      description: "입력값",
    },
    onChange: {
      action: "changed",
      description: "값 변경 이벤트 핸들러",
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined"],
      description: "텍스트필드 스타일 변형",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

// 제어된 컴포넌트를 위한 래퍼
const TextFieldWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  return <TextField {...args} value={value} onChange={setValue} />;
};

export const Outlined: Story = {
  render: TextFieldWrapper,
  args: {
    placeholder: "여행 스타일을 자유롭게 입력해주세요",
    variant: "outlined",
  },
};

export const Filled: Story = {
  render: TextFieldWrapper,
  args: {
    placeholder: "여행 스타일을 자유롭게 입력해주세요",
    variant: "filled",
  },
};

export const WithValue: Story = {
  render: TextFieldWrapper,
  args: {
    placeholder: "여행 스타일을 자유롭게 입력해주세요",
    value: "맛집 탐방과 역사적인 장소를 둘러보고 싶어요. 여유롭게 걸으면서 현지 문화를 체험하고 싶습니다.",
    variant: "outlined",
  },
};

export const Disabled: Story = {
  render: TextFieldWrapper,
  args: {
    placeholder: "비활성화된 텍스트필드",
    variant: "outlined",
    disabled: true,
  },
};

export const LongPlaceholder: Story = {
  render: TextFieldWrapper,
  args: {
    placeholder: "편했던 점, 아쉬웠던 점을 자유롭게 적어주세요. 여러분의 의견은 서비스 개선에 큰 도움이 됩니다.",
    variant: "filled",
  },
};

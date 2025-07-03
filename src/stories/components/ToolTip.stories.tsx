import type { Meta, StoryObj } from "@storybook/react";
import ToolTip from "@/components/ToolTip";
import Button from "@/components/Button";
import { COMMON_IMAGES } from "@/utils/imagePath";

const meta: Meta<typeof ToolTip> = {
  title: "Components/ToolTip",
  component: ToolTip,
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "툴팁에 표시될 텍스트",
    },
    direction: {
      control: { type: "select" },
      options: ["top", "bottom"],
      description: "툴팁 표시 방향",
    },
    children: {
      control: "text",
      description: "툴팁이 적용될 요소",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolTip>;

export const Bottom: Story = {
  args: {
    text: "이것은 하단 툴팁입니다",
    direction: "bottom",
    children: <Button variant="default">하단 툴팁 버튼</Button>,
  },
};

export const Top: Story = {
  args: {
    text: "이것은 상단 툴팁입니다",
    direction: "top",
    children: <Button variant="default">상단 툴팁 버튼</Button>,
  },
};

export const LongText: Story = {
  args: {
    text: "이것은 매우 긴 텍스트를 가진 툴팁입니다. 여러 단어가 포함되어 있어 툴팁의 너비가 더 넓어집니다.",
    direction: "bottom",
    children: <Button variant="gradation">긴 텍스트 툴팁</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    text: "도움말 툴팁",
    direction: "top",
    children: (
      <button className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
        ?
      </button>
    ),
  },
};

export const WithImage: Story = {
  args: {
    text: "이미지에 마우스를 올려보세요",
    direction: "bottom",
    children: (
      <img
        src={COMMON_IMAGES.DEFAULT_IMG}
        alt="예시 이미지"
        className="rounded-lg cursor-pointer"
      />
    ),
  },
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center p-8">
      <ToolTip text="첫 번째 툴팁" direction="top">
        <Button variant="default">버튼 1</Button>
      </ToolTip>
      <ToolTip text="두 번째 툴팁" direction="bottom">
        <Button variant="confirm">버튼 2</Button>
      </ToolTip>
      <ToolTip text="세 번째 툴팁" direction="top">
        <Button variant="gradation">버튼 3</Button>
      </ToolTip>
    </div>
  ),
};

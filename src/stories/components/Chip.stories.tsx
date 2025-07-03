import type { Meta, StoryObj } from "@storybook/react";
import Chip from "@/components/Chip";
import { COMMON_IMAGES } from "@/utils/imagePath";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "칩 내부 텍스트",
    },
    imageSrc: {
      control: "text",
      description: "칩 이미지 URL (선택사항)",
    },
    selected: {
      control: "boolean",
      description: "선택 상태 여부",
    },
    onClick: {
      action: "clicked",
      description: "클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: "기본 칩",
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    children: "선택된 칩",
    selected: true,
  },
};

export const WithImage: Story = {
  args: {
    children: "이미지 칩",
    imageSrc: COMMON_IMAGES.LOCATION,
    selected: false,
  },
};

export const WithImageSelected: Story = {
  args: {
    children: "선택된 이미지 칩",
    imageSrc: COMMON_IMAGES.LOCATION,
    selected: true,
  },
};

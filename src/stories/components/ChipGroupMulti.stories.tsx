import type { Meta, StoryObj } from "@storybook/react";
import ChipGroupMulti from "@/components/ChipGroupMulti";

const meta: Meta<typeof ChipGroupMulti> = {
  title: "Components/ChipGroupMulti",
  component: ChipGroupMulti,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "칩 아이템 배열",
    },
    values: {
      control: "object",
      description: "선택된 값들 배열",
    },
    onChange: {
      action: "changed",
      description: "값 변경 이벤트 핸들러",
    },
    className: {
      control: "text",
      description: "커스텀 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChipGroupMulti>;

const sampleItems = [
  { label: "여행지1", imageSrc: "/icons/Location.svg" },
  { label: "여행지2" },
  { label: "여행지3", imageSrc: "/icons/Star.svg" },
  { label: "여행지4" },
  { label: "여행지5" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithPreselectedValues: Story = {
  args: {
    items: sampleItems,
    values: ["여행지1", "여행지3"],
  },
};

export const CustomLayout: Story = {
  args: {
    items: sampleItems,
    className: "grid grid-cols-2 gap-4",
  },
};

export const SimpleTextOnly: Story = {
  args: {
    items: [
      { label: "카페" },
      { label: "레스토랑" },
      { label: "관광지" },
      { label: "쇼핑몰" },
    ],
  },
};

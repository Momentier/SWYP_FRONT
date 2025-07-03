import type { Meta, StoryObj } from "@storybook/react";
import ChipGroupSingle from "@/components/ChipGroupSingle";
import { COMMON_IMAGES } from "@/utils/imagePath";

const meta: Meta<typeof ChipGroupSingle> = {
  title: "Components/ChipGroupSingle",
  component: ChipGroupSingle,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "칩 아이템 배열",
    },
    value: {
      control: "text",
      description: "선택된 값",
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
type Story = StoryObj<typeof ChipGroupSingle>;

const sampleItems = [
  { label: "혼자", value: "solo", imageSrc: COMMON_IMAGES.ALONE },
  { label: "커플", value: "couple", imageSrc: COMMON_IMAGES.COUPLE },
  { label: "가족", value: "family", imageSrc: COMMON_IMAGES.FAMILY },
  { label: "친구", value: "friends", imageSrc: COMMON_IMAGES.FRIEND },
  { label: "단체", value: "group" },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithPreselectedValue: Story = {
  args: {
    items: sampleItems,
    value: "couple",
  },
};

export const CustomLayout: Story = {
  args: {
    items: sampleItems,
    className: "grid grid-cols-3 gap-3",
  },
};

export const PeriodSelection: Story = {
  args: {
    items: [
      { label: "당일치기", value: "day" },
      { label: "1박 2일", value: "1night" },
      { label: "2박 3일", value: "2nights" },
      { label: "3박 4일", value: "3nights" },
      { label: "4박 이상", value: "4nights+" },
    ],
  },
};

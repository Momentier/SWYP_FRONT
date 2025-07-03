import type { Meta, StoryObj } from "@storybook/react";
import Card from "@/components/Card";
import { COMMON_IMAGES } from "@/utils/imagePath";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["large", "medium", "small"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const imageUrl = COMMON_IMAGES.DEFAULT_IMG;

export const Large: Story = {
  args: {
    imageUrl,
    region: "경상북도 경주시",
    distanceInfo: "내 위치로부터 3시간 소요",
    size: "large",
  },
};

export const Medium: Story = {
  args: {
    imageUrl,
    region: "전라남도 여수시",
    distanceInfo: "4시간 소요",
    size: "medium",
  },
};

export const Small: Story = {
  args: {
    imageUrl,
    region: "서울특별시",
    distanceInfo: "30분 소요",
    size: "small",
  },
};

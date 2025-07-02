import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "@/components/Page";

const meta: Meta<typeof Page> = {
  title: "Pages/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Page>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  parameters: {
    docs: {
      description: {
        story: "로그인된 사용자의 페이지 상태입니다.",
      },
    },
  },
};
import type { Meta, StoryObj } from "@storybook/react";
import Text from "@/components/Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["span", "div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "em"],
      description: "HTML 태그 타입",
    },
    textStyle: {
      control: { type: "select" },
      options: [
        "display1", "display2", "title1", "title2", "title3",
        "heading1", "heading2", "headline1", "headline2",
        "body1", "body1Reading", "body2", "body2Reading",
        "label1", "label1Reading", "label2", "caption1", "caption2"
      ],
      description: "텍스트 스타일",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
    children: {
      control: "text",
      description: "텍스트 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Display1: Story = {
  args: {
    textStyle: "display1",
    children: "Display 1 - 대형 디스플레이 텍스트",
  },
};

export const Display2: Story = {
  args: {
    textStyle: "display2",
    children: "Display 2 - 디스플레이 텍스트",
  },
};

export const Title1: Story = {
  args: {
    textStyle: "title1",
    children: "Title 1 - 메인 제목",
  },
};

export const Title2: Story = {
  args: {
    textStyle: "title2",
    children: "Title 2 - 서브 제목",
  },
};

export const Heading1: Story = {
  args: {
    textStyle: "heading1",
    children: "Heading 1 - 섹션 헤딩",
  },
};

export const Body1: Story = {
  args: {
    textStyle: "body1",
    children: "Body 1 - 본문 텍스트입니다. 일반적인 내용을 표시할 때 사용합니다.",
  },
};

export const Label1: Story = {
  args: {
    textStyle: "label1",
    children: "Label 1 - 라벨 텍스트",
  },
};

export const Caption1: Story = {
  args: {
    textStyle: "caption1",
    children: "Caption 1 - 캡션 텍스트",
  },
};

export const WithCustomTag: Story = {
  args: {
    as: "h2",
    textStyle: "title1",
    children: "H2 태그로 렌더링된 제목",
    className: "text-blue-600",
  },
};

export const AllTextStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Text textStyle="display1">Display 1</Text>
      <Text textStyle="display2">Display 2</Text>
      <Text textStyle="title1">Title 1</Text>
      <Text textStyle="title2">Title 2</Text>
      <Text textStyle="title3">Title 3</Text>
      <Text textStyle="heading1">Heading 1</Text>
      <Text textStyle="heading2">Heading 2</Text>
      <Text textStyle="headline1">Headline 1</Text>
      <Text textStyle="headline2">Headline 2</Text>
      <Text textStyle="body1">Body 1</Text>
      <Text textStyle="body1Reading">Body 1 Reading</Text>
      <Text textStyle="body2">Body 2</Text>
      <Text textStyle="body2Reading">Body 2 Reading</Text>
      <Text textStyle="label1">Label 1</Text>
      <Text textStyle="label1Reading">Label 1 Reading</Text>
      <Text textStyle="label2">Label 2</Text>
      <Text textStyle="caption1">Caption 1</Text>
      <Text textStyle="caption2">Caption 2</Text>
    </div>
  ),
};

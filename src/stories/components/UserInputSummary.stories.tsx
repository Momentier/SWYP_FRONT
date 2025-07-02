import type { Meta, StoryObj } from "@storybook/react";
import UserInputSummary from "@/components/UserInputSummary";

const meta: Meta<typeof UserInputSummary> = {
  title: "Components/UserInputSummary",
  component: UserInputSummary,
  tags: ["autodocs"],
  argTypes: {
    companion: {
      control: "text",
      description: "여행 인원",
    },
    period: {
      control: "text",
      description: "여행 기간",
    },
    inputText: {
      control: "text",
      description: "여행 스타일 설명",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserInputSummary>;

export const Default: Story = {
  args: {
    companion: "커플",
    period: "2박 3일",
    inputText: "맛집 탐방과 역사적인 장소를 둘러보고 싶어요. 여유롭게 걸으면서 현지 문화를 체험하고 싶습니다.",
  },
};

export const FamilyTrip: Story = {
  args: {
    companion: "가족 (4명)",
    period: "3박 4일",
    inputText: "아이들과 함께 즐길 수 있는 테마파크와 체험활동 위주로 계획하고 싶어요. 안전하고 편리한 숙소를 선호합니다.",
  },
};

export const SoloTrip: Story = {
  args: {
    companion: "혼자",
    period: "당일치기",
    inputText: "혼자만의 시간을 즐기며 힐링할 수 있는 조용한 곳들을 방문하고 싶어요. 카페 투어와 독서하기 좋은 장소들을 찾고 있습니다.",
  },
};

export const GroupTrip: Story = {
  args: {
    companion: "친구들 (5명)",
    period: "1박 2일",
    inputText: "친구들과 함께 즐길 수 있는 액티비티가 많은 곳을 찾고 있어요. 사진 찍기 좋은 명소들과 맛있는 음식들을 경험하고 싶습니다.",
  },
};

export const LongTrip: Story = {
  args: {
    companion: "커플",
    period: "7박 8일",
    inputText: "여유롭게 현지 문화를 깊이 있게 체험하고 싶어요. 관광지보다는 현지인들이 실제로 가는 곳들을 방문하고, 전통 요리 클래스나 문화 체험 프로그램에 참여하고 싶습니다. 자연 경관이 아름다운 곳에서 며칠은 휴식을 취하며 느긋하게 지내고 싶어요.",
  },
};

export const SimpleInput: Story = {
  args: {
    companion: "연인",
    period: "1박 2일",
    inputText: "로맨틱한 여행",
  },
};

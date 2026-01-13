import type { Meta, StoryObj } from "@storybook/react";
import KakaoMap from "@/components/KakaoMap";
import Text from "@/components/Text";

// API 키가 없는 상황을 시뮬레이션하는 컴포넌트
const KakaoMapNoAPI = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Text textStyle="title2">🗺️</Text>
        </div>
        <Text textStyle="heading2" className="font-semibold mb-2 text-gray-700">
          지도를 불러올 수 없습니다
        </Text>
        <Text textStyle="body2" className="text-gray-500 mb-4">
          카카오맵 API 키가 설정되지 않았습니다.
        </Text>
        <Text textStyle="caption1" className="text-gray-400">
          관리자에게 문의해주세요.
        </Text>
      </div>
    </div>
  );
};

// 로딩 상태를 시뮬레이션하는 컴포넌트
const KakaoMapLoading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <Text textStyle="body2" className="text-gray-500">
          지도를 불러오는 중...
        </Text>
      </div>
    </div>
  );
};

// 지도 플레이스홀더 컴포넌트
const KakaoMapPlaceholder = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Text textStyle="title2" className="mb-4">
          🗺️ 카카오맵
        </Text>
        <Text textStyle="body1" className="text-gray-600 mb-2">
          실제 환경에서는 여기에 지도가 표시됩니다
        </Text>
        <Text textStyle="caption1" className="text-gray-500">
          여행 경로와 마커들이 표시됩니다
        </Text>
      </div>
    </div>
  );
};

const meta: Meta<typeof KakaoMap> = {
  title: "Components/KakaoMap",
  component: KakaoMap,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "카카오맵 컴포넌트입니다. API 키가 필요하며, 여행 일정 데이터가 있을 때 마커와 경로를 표시합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KakaoMap>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", height: "500px" }}>
      <KakaoMapPlaceholder />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "기본 카카오맵 컴포넌트입니다. 실제 API 키가 있을 때의 모습을 시뮬레이션합니다.",
      },
    },
  },
};

export const NoAPIKey: Story = {
  render: () => (
    <div style={{ width: "100%", height: "500px" }}>
      <KakaoMapNoAPI />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "API 키가 설정되지 않았을 때의 에러 상태입니다.",
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ width: "100%", height: "500px" }}>
      <KakaoMapLoading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "지도 라이브러리를 로딩 중인 상태입니다.",
      },
    },
  },
};

export const SmallSize: Story = {
  render: () => (
    <div style={{ width: "400px", height: "300px" }}>
      <KakaoMapPlaceholder />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "작은 크기의 지도입니다.",
      },
    },
  },
};

export const LargeSize: Story = {
  render: () => (
    <div style={{ width: "100%", height: "800px" }}>
      <KakaoMapPlaceholder />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "큰 크기의 지도입니다.",
      },
    },
  },
};

export const FullScreen: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <KakaoMapPlaceholder />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "전체 화면 크기의 지도입니다.",
      },
    },
  },
};

export const WithTravelRoute: Story = {
  render: () => (
    <div style={{ width: "100%", height: "500px" }}>
      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center relative">
        <div className="text-center">
          <Text textStyle="title2" className="mb-4">
            🗺️ 여행 경로 지도
          </Text>
          <Text textStyle="body1" className="text-gray-600 mb-2">
            3일간의 서울 여행 경로
          </Text>
        </div>

        {/* 가상 마커들 */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          1
        </div>
        <div className="absolute top-1/3 left-1/2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          2
        </div>
        <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          3
        </div>

        {/* 가상 경로 선 */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 25% 25% Q 50% 33% 67% 67%"
            stroke="#db4040"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
          />
        </svg>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "여행 경로와 마커가 표시된 지도의 예시입니다.",
      },
    },
  },
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ width: "100%", height: "500px" }}>
      <div className="w-full h-full flex items-center justify-center bg-red-50 rounded-lg border-2 border-red-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Text textStyle="title2">❌</Text>
          </div>
          <Text
            textStyle="heading2"
            className="font-semibold mb-2 text-red-700"
          >
            지도 로드 실패
          </Text>
          <Text textStyle="body2" className="text-red-600 mb-4">
            카카오맵 스크립트를 불러오는데 실패했습니다.
          </Text>
          <Text textStyle="caption1" className="text-red-500">
            네트워크 연결을 확인해주세요.
          </Text>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "스크립트 로딩 실패 등의 에러 상태입니다.",
      },
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import ChipGroupSingle from '@/components/ChipGroupSingle';
import Text from '@/components/Text';
import TextField from '@/components/TextField';
import UserInputSummary from "@/components/UserInputSummary";
import { COMPANIONS, DURATIONS } from '@/constants/UserInputConstants';

// 실제 UserInputPage 컴포넌트 구조를 그대로 사용하는 스토리북용 컴포넌트
const UserInputPageStorybook = ({ 
  isTextLoading = false,
  showModal = false 
}: {
  isTextLoading?: boolean;
  showModal?: boolean;
}) => {
  const [companion, setCompanion] = useState('');
  const [duration, setDuration] = useState('');
  const [feelingDescription, setFeelingDescription] = useState('');
  const [atmosphereDescription, setAtmosphereDescription] = useState('');
  const [activityDescription, setActivityDescription] = useState('');

  const isButtonDisabled = useMemo(() => {
    if (companion === '') return true;
    if (duration === '') return true;
    return false;
  }, [companion, duration]);

  const onClickNext = () => {
    console.log('다음 버튼 클릭');
  };

  const onClickAutoFillInput = async () => {
    console.log('AI 추천 버튼 클릭');
    // 샘플 데이터로 채우기
    setFeelingDescription('요즘 너무 지쳐있어서 새로운 기분 전환이 필요해요. 일상에서 벗어나 힐링하고 싶습니다.');
    setAtmosphereDescription('자연 속 조용한 곳에서 여유롭게 시간을 보내고 싶어요.');
    setActivityDescription('맛있는 음식도 먹고, 예쁜 카페에서 커피도 마시면서 푹 쉬고 싶어요.');
  };

  const companionText = COMPANIONS.find(item => item.value === companion)?.label || '';
  const durationText = DURATIONS.find(item => item.value === duration)?.label || '';

  return (
    <>
      <section className="max-w-[1100px] mx-auto px-[20px] mt-[60px]">
        {/* 페이지 설명 */}
        <Text as="h1" textStyle="display2" className="mb-3 font-bold">
          여행 준비, 간단하고 쉽게 시작하세요!
        </Text>
        <Text as="p" textStyle="body1" className="mb-10 text-[#858588]">
          모먼티어에게 몇 가지 정보를 알려주시면, 감정과 스타일에 딱 맞는 여행지를 추천해드릴게요.
        </Text>

        {/* 동행자 선택 */}
        <div className="mt-[60px]">
          <Text textStyle="title3" className="block mb-4 font-bold">
            누구와 함께 여행을 떠나시나요? <span className="text-[#9A77FF]">*</span>
          </Text>
          <ChipGroupSingle
            items={COMPANIONS}
            value={companion}
            onChange={setCompanion}
          />
        </div>

        {/* 여행 기간 선택 */}
        <div className="mt-[60px]">
          <Text textStyle="title3" className="block mb-4 font-bold">
            며칠 동안 떠나고 싶으신가요? <span className="text-[#9A77FF]">*</span>
          </Text>
          <ChipGroupSingle
            items={DURATIONS}
            value={duration}
            onChange={setDuration}
          />
        </div>

        {/* 여행 스타일 입력 */}
        <div className="mt-[60px]">
          <Text textStyle="title3" className="block mb-2 font-bold">
            여행을 떠나고 싶은 이유가 있나요?
          </Text>
          <div className="relative">
            <TextField
              disabled={isTextLoading}
              value={feelingDescription}
              onChange={setFeelingDescription}
              placeholder={!isTextLoading ? "요즘 너무 지쳐있어요, 새로운 기분 전환이 필요해요 등" : ""}
              variant="outlined"
            />
            {isTextLoading && (
              <div className="absolute left-4 top-7 -translate-y-1/2 text-sm text-gray-500 flex">
                {"문구를 생성중이에요 ...".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block animate-bounce-char"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-[28px]">
          <Text textStyle="title3" className="block mb-2 font-bold">
            어떤 분위기의 여행지를 원하시나요?
          </Text>
          <div className="relative">
            <TextField
              disabled={isTextLoading}
              value={atmosphereDescription}
              onChange={setAtmosphereDescription}
              placeholder={!isTextLoading ? "자연 속 조용한 곳, 북적이는 도시 분위기 등" : ""}
              variant="outlined"
            />
            {isTextLoading && (
              <div className="absolute left-4 top-7 -translate-y-1/2 text-sm text-gray-500 flex">
                {"문구를 생성중이에요 ...".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block animate-bounce-char"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-[28px]">
          <Text textStyle="title3" className="block mb-2 font-bold">
            이번 여행에서 꼭 해보고 싶은 게 있다면요?
          </Text>
          <div className="relative">
            <TextField
              disabled={isTextLoading}
              value={activityDescription}
              onChange={setActivityDescription}
              placeholder={!isTextLoading ? "푹 쉬기, 신나는 액티비티, 다양한 맛집 투어 등" : ""}
              variant="outlined"
            />
            {isTextLoading && (
              <div className="absolute left-4 top-7 -translate-y-1/2 text-sm text-gray-500 flex">
                {"문구를 생성중이에요 ...".split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block animate-bounce-char"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-2">
          <button
            className='flex items-center px-4 py-2 text-[#858588] border border-[#E8E8EA] rounded-[20px] bg-[#F8F8F8] hover:bg-[#9A77FF1A] hover:border-[#9A77FF1A] active:text-[#9A77FF] active:ring-2 active:ring-[#9A77FF] ring-offset-0'
            onClick={onClickAutoFillInput}
            disabled={isTextLoading}
          >
            <img src='./icons/AI.svg' alt='추천을위한 별모양 아이콘' />
            <Text as='p' className='ml-2 font-normal'>잘 모르겠어요. 추천해주세요!</Text>
          </button>
        </div>

        {/* 버튼 */}
        <div className="my-[60px]">
          <button
            disabled={isButtonDisabled}
            className={`
            relative overflow-hidden bg-[linear-gradient(125.9deg,_#9A77FF_23.39%,_#214BFF_104.52%)]
            hover:text-white transition-colors
            before:absolute before:inset-0 before:z-0
            before:opacity-0 hover:before:opacity-100
            before:bg-[linear-gradient(125.9deg,_#9A77FF_23.39%,_#4D6FFF_104.52%)]
            before:transition-opacity
            after:absolute after:inset-0 after:z-0
            after:bg-black after:opacity-0 hover:after:opacity-20
            after:transition-opacity
              w-[186px] text-[18px] px-5 py-3 rounded-[25px] font-semibold text-white 
              ${isButtonDisabled ? 'bg-[#D9D9D9] cursor-not-allowed' : 'bg-[#9A77FF] hover:bg-[#7C49FF]'}`}
            onClick={onClickNext}
          >
            <Text textStyle='body1' className='relative z-10 flex justify-between'>
              다음
              <img src="./icons/Arrow Right White.svg" alt="오른쪽을 가리키는 화살표" />
            </Text>
          </button>
        </div>
      </section>

      {/* 모달 시뮬레이션 */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
          <div className="bg-white rounded-2xl p-6 w-[460px] shadow-lg">
            <div className="flex justify-end mb-[24px]">
              <button onClick={() => console.log('모달 닫기')} aria-label="Close">
                <img src="/icons/Close.svg" alt="닫기" />
              </button>
            </div>
            <Text as='h2' textStyle='heading1' className='font-semibold text-center'>
              이 정보로 여행지를 추천해드릴게요
            </Text>
            <Text as='p' textStyle='body1' className='whitespace-pre-line text-center text-[#858588] mt-3'>
              맞는지 한 번 더 확인해주세요!
            </Text>
            <div className="mt-4">
              <div className="p-5 bg-[#F8F8F8] rounded-xl space-y-3">
                <div>
                  <Text textStyle="label1" className="mr-[12px] font-semibold">
                    여행 인원
                  </Text>
                  <Text textStyle="label1" className="text-[#9A77FF] font-medium">{companionText}</Text>
                </div>
                <div>
                  <Text textStyle="label1" className="mr-[12px] font-semibold">
                    여행 기간
                  </Text>
                  <Text textStyle="label1" className="text-[#9A77FF] font-medium">{durationText}</Text>
                </div>
                <Text textStyle="label1" className="mb-2 font-semibold inline-block">
                  여행 스타일
                </Text>
                <Text textStyle="label1" className="bg-white rounded-[12px] px-4 py-3 text-[#404040] break-words block">{feelingDescription}</Text>
              </div>
            </div>
            <div className="flex justify-between mt-9">
              <button className="w-[50%] mr-2.5 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                다시 입력하기
              </button>
              <button className="w-[50%] px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:opacity-90">
                계속 추천받기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const meta: Meta<typeof UserInputPageStorybook> = {
  title: "Pages/UserInputPage",
  component: UserInputPageStorybook,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "사용자 입력 페이지 컴포넌트입니다. 여행 정보를 입력받는 페이지로, 동행자, 여행기간, 여행스타일을 선택할 수 있습니다.",
      },
    },
  },
  argTypes: {
    isTextLoading: {
      control: "boolean",
      description: "AI 텍스트 생성 로딩 상태",
    },
    showModal: {
      control: "boolean", 
      description: "확인 모달 표시 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserInputPageStorybook>;

export const Default: Story = {
  args: {
    isTextLoading: false,
    showModal: false,
  },
};

export const FilledForm: Story = {
  args: {
    isTextLoading: false,
    showModal: false,
  },
  play: async ({ canvasElement }) => {
    // 폼이 채워진 상태를 시뮬레이션
    const companionButtons = canvasElement.querySelectorAll('button');
    // 첫 번째 동행자 선택 (혼자)
    if (companionButtons[0]) companionButtons[0].click();
  },
};

export const LoadingAIRecommendation: Story = {
  args: {
    isTextLoading: true,
    showModal: false,
  },
};

export const WithModal: Story = {
  args: {
    isTextLoading: false,
    showModal: true,
  },
};

export const Desktop: Story = {
  args: {
    isTextLoading: false,
    showModal: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const Mobile: Story = {
  args: {
    isTextLoading: false,
    showModal: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

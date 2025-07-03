import type { Meta, StoryObj } from "@storybook/react";
import { Attraction } from "@/lib/api/itinerary";
import Text from "@/components/Text";
import DetailCard from "@/components/DetailCard";
import { COMMON_IMAGES } from "@/utils/imagePath";

// Storybook용 간단한 ScheduleCard 컴포넌트 (framer-motion 없이)
const SimpleScheduleCard = ({ dailySchedule }: { dailySchedule: any }) => {
  return (
    <div className="flex flex-col gap-2 w-[880px]">
      <div className="w-[880px] h-[50px] flex items-center justify-between p-[12px_24px] bg-[#F3EEFF] text-black rounded-xl">
        <Text textStyle="headline1" className="font-bold">
          {dailySchedule.dayDate}일 차
        </Text>
        <img src={COMMON_IMAGES.CHEVRON_DOWN} alt="expand" className="w-[28px] h-[28px]" />
      </div>

      <div className="flex flex-col gap-2">
        {dailySchedule.attractions.map((place: any, index: number) => (
          <div key={place.id} className="relative flex flex-col gap-2">
            <DetailCard
              title={place.name}
              subtitle={place.description}
              address={place.address}
              hours={place.businessTime}
              rating={place.rating}
              imageUrl={place.coverImage}
              attractionData={place}
            />

            {index < dailySchedule.attractions.length - 1 && (
              <div className="flex items-center w-full pl-[60px] pr-[60px] py-[4px] gap-2">
                <div 
                  className="w-[2px] h-[40px] bg-repeat-y bg-center"
                  style={{ backgroundImage: `url('${COMMON_IMAGES.DOT_LINE}')` }}
                />
                {place.travelWalkTime && (
                  <div className="flex items-center gap-2">
                    <img src={COMMON_IMAGES.WALK} alt="walk icon" className="w-5 h-5" />
                    <span className="text-gray-700">{place.travelWalkTime}</span>
                  </div>
                )}

                {place.travelWalkTime && place.travelCarTime && (
                  <div className="w-5 h-5 bg-contain bg-no-repeat" style={{ backgroundImage: `url('${COMMON_IMAGES.DOT}')` }} />
                )}

                {place.travelCarTime && (
                  <div className="flex items-center gap-2">
                    <img src={COMMON_IMAGES.CAR} alt="car icon" className="w-5 h-5" />
                    <span className="text-gray-700">{place.travelCarTime}</span>
                  </div>
                )}

                {place.travelCarTime && place.travelDistance && (
                  <div className="w-5 h-5 bg-contain bg-no-repeat" style={{ backgroundImage: `url('${COMMON_IMAGES.DOT}')` }} />
                )}

                {place.travelDistance && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">{place.travelDistance}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof SimpleScheduleCard> = {
    title: "Components/ScheduleCard",
    component: SimpleScheduleCard,
    tags: ["autodocs"],
    argTypes: {
        dailySchedule: {
            control: "object",
            description: "일일 일정 데이터 (Storybook용 간단 버전)",
        },
    },
    parameters: {
        docs: {
            description: {
                component: "일정 카드 컴포넌트입니다. Storybook에서는 framer-motion 없이 표시됩니다.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof SimpleScheduleCard>;

/**
 * ✅ Attraction 타입에 맞춘 데이터 생성
 */
const attractionsData: Attraction[] = [
    {
        id: 1,
        type: "meal",
        name: "강릉짬뽕순두부 동화가든 본점",
        address: "강원 강릉시 강동면 순두부길 77번길 15 동화가든",
        description: "두부요리 / 예약필수",
        coverImage: COMMON_IMAGES.DEFAULT_IMG,
        businessTime: "매일 07:00 ~ 19:30",
        rating: 4.68,
        latitude: 37.751853,
        longitude: 128.896651,
        travelWalkTime: "10분",
        travelCarTime: "5분",
        travelDistance: "1.2km",
    },
    {
        id: 2,
        type: "place",
        name: "오죽헌",
        address: "강원 강릉시 율곡로3139번길 24 오죽헌",
        description: "입장료 있음 / 운영시간 1시간 전 입장 마감",
        coverImage: COMMON_IMAGES.DEFAULT_IMG,
        businessTime: "09:00 ~ 18:00",
        rating: 4.68,
        latitude: 37.763283,
        longitude: 128.896995,
        travelWalkTime: "15분",
        travelCarTime: "5분",
        travelDistance: "1.2km",
    },
    {
        id: 3,
        type: "place",
        name: "경포해변",
        address: "강원 강릉시 강문동 산1",
        description: "강릉시에 있는 동해안 최대의 해변",
        coverImage: COMMON_IMAGES.DEFAULT_IMG,
        businessTime: "00:00 ~ 24:00 상시이용 가능",
        rating: 4.41,
        latitude: 37.803517,
        longitude: 128.924605,
        travelWalkTime: "20분",
        travelCarTime: "10분",
        travelDistance: "3.5km",
    },
];

const seoulAttractionsData: Attraction[] = [
    {
        id: 4,
        type: "place",
        name: "경복궁",
        address: "서울특별시 종로구 사직로 161",
        description: "조선왕조 제1의 법궁",
        coverImage: COMMON_IMAGES.DEFAULT_IMG,
        businessTime: "09:00 ~ 18:00",
        rating: 4.5,
        latitude: 37.5796,
        longitude: 126.9770,
        travelWalkTime: "5분",
        travelCarTime: "10분",
        travelDistance: "1.2km",
    },
    {
        id: 5,
        type: "place",
        name: "인사동",
        address: "서울특별시 종로구 인사동길",
        description: "전통 문화의 거리",
        coverImage: COMMON_IMAGES.DEFAULT_IMG,
        businessTime: "10:00 ~ 22:00",
        rating: 4.3,
        latitude: 37.5703,
        longitude: 126.9850,
        travelWalkTime: "15분",
        travelCarTime: "",
        travelDistance: "",
    },
    {
        id: 6,
        type: "meal",
        name: "명동교자",
        address: "서울특별시 중구 명동10길 29",
        description: "예약 필수 / 한식 맛집",
        coverImage: COMMON_IMAGES.DEFAULT_IMG,
        businessTime: "10:30 ~ 21:30",
        rating: 4.2,
        latitude: 37.5636,
        longitude: 126.9834,
        travelWalkTime: "",
        travelCarTime: "20분",
        travelDistance: "3.5km",
    },
];

export const GangneungDay3: Story = {
    args: {
        dailySchedule: {
            dayDate: 3,
            attractions: attractionsData,
        },
    },
};

export const SeoulDay1: Story = {
    args: {
        dailySchedule: {
            dayDate: 1,
            attractions: seoulAttractionsData,
        },
    },
};

export const EmptySchedule: Story = {
    args: {
        dailySchedule: {
            dayDate: 2,
            attractions: [],
        },
    },
};

export const SinglePlace: Story = {
    args: {
        dailySchedule: {
            dayDate: 1,
            attractions: [attractionsData[0]],
        },
    },
};

export const ManyPlaces: Story = {
    args: {
        dailySchedule: {
            dayDate: 4,
            attractions: [
                ...attractionsData,
                {
                    id: 7,
                    type: "place",
                    name: "강릉중앙시장",
                    address: "강원 강릉시 금성로 21",
                    description: "전통시장 / 먹거리 골목",
                    coverImage: COMMON_IMAGES.DEFAULT_IMG,
                    businessTime: "09:00 ~ 20:00",
                    rating: 4.1,
                    latitude: 37.7519,
                    longitude: 128.8761,
                    travelWalkTime: "8분",
                    travelCarTime: "",
                    travelDistance: "",
                },
                {
                    id: 8,
                    type: "meal",
                    name: "초당순두부마을",
                    address: "강원 강릉시 초당동",
                    description: "순두부 맛집 거리",
                    coverImage: COMMON_IMAGES.DEFAULT_IMG,
                    businessTime: "08:00 ~ 21:00",
                    rating: 4.4,
                    latitude: 37.7856,
                    longitude: 128.9062,
                    travelWalkTime: "",
                    travelCarTime: "15분",
                    travelDistance: "4.2km",
                },
            ],
        },
    },
};

"use client";

import React, { useEffect, useState } from "react";
import Text from "@/components/Text";
import { getItineraryDetail } from "@/lib/api/itinerary";
import { useParams } from "next/navigation";
import { usePublicTravelDetailStore } from "@/store/useRecommendTravelStore";
import DayScheduleCard_confirmVer from "@/components/ScheduleCard_confirmVer";
import AlertBox from "@/components/modals/tooltip";

const TravelSchedulePage: React.FC = () => {
    const { id: itineraryId } = useParams();
    const { itinerary, setItinerary, clearItinerary } = usePublicTravelDetailStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!itineraryId) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const data = await getItineraryDetail(Number(itineraryId));
                if (data) {
                    setItinerary(data);
                }
            } catch {
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => clearItinerary();
    }, [itineraryId, setItinerary, clearItinerary]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                ⏳ 로딩 중...
            </div>
        );
    }

    if (!itinerary) {
        return (
            <div className="flex items-center justify-center h-full">
                🚫 여행 일정 정보를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-60px)] max-w-[100vw] overflow-hidden">
            <div className="flex flex-col w-[980px] items-start py-[60px] px-[40px] gap-5 overflow-y-auto box-border">
                <section className="flex flex-col w-full mb-5 gap-[40px]">
                    <AlertBox
                        message="보기 전용 페이지 입니다."
                        description="이 페이지는 일정 확인만 가능하며, 맞춤형 여행일정 생성 및 편집은 카카오 로그인 후에 이용 가능합니다."
                    />
                    <div className="flex flex-col">
                        <Text textStyle="headline1" className="mb-[8px] text-gray-600 font-semibold">
                            {itinerary?.title || "여행 일정"}
                        </Text>
                        <Text textStyle="title2" className="font-bold">{`휴식이 필요한 유정님을 위한 ${itinerary?.title || "여행코스"}`}</Text>
                    </div>
                    <Text textStyle="title3" className="font-bold">일정</Text>
                </section>


                <section className="w-full flex flex-col gap-5">
                    {itinerary?.dailyScheduleDtos.map((schedule, index) => (
                        <DayScheduleCard_confirmVer
                            key={`${index}-${JSON.stringify(schedule.attractions)}`}
                            dailySchedule={schedule}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};

export default TravelSchedulePage;

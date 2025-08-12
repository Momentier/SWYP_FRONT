"use client";

import React, { useState, useRef, useCallback } from "react";
import DetailCard from "./DetailCard";
import Text from "./Text";
import { Reorder } from "framer-motion";
import { Attraction, DailyScheduleDtos } from "@/lib/api/itinerary";
import { useRecommendTravelDetailStore } from "@/store/useRecommendTravelStore";
import { debounce } from "lodash";
import { COMMON_IMAGES } from "@/utils/imagePath";

type DayScheduleCardProps = {
    dailySchedule: DailyScheduleDtos;
};

const DayScheduleCard: React.FC<DayScheduleCardProps> = ({ dailySchedule }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const contentRef = useRef<HTMLDivElement>(null);
    const updateItinerary = useRecommendTravelDetailStore((state) => state.updateItinerary);

    // 이미지 URL 도움 변수들
    const dotLineImageUrl = COMMON_IMAGES.DOT_LINE;
    const dotImageUrl = COMMON_IMAGES.DOT;

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    /**
     * ✅ 순서 변경 시 Store에 직접 반영
     */
    const handleReorder = useCallback(
        debounce((newOrder: Attraction[]) => {
            updateItinerary([
                {
                    ...dailySchedule,
                    attractions: newOrder,
                },
            ]);
        }, 300),
        [dailySchedule]
    );

    return (
        <div className="flex flex-col gap-2 w-[880px]">
            <div className="w-[880px] h-[50px] flex items-center justify-between p-[12px_24px] bg-[#F3EEFF] text-black rounded-xl">
                <Text textStyle="headline1" className="font-bold">
                    {dailySchedule.dayDate}일 차
                </Text>
                <button
                    onClick={handleExpandClick}
                    className="w-[28px] h-[28px] transition"
                >
                    {isExpanded ? (
                        <img src={COMMON_IMAGES.CHEVRON_DOWN} alt="expand" className="w-full h-full" />
                    ) : (
                        <img src={COMMON_IMAGES.CHEVRON_RIGHT} alt="collapse" className="w-full h-full" />
                    )}
                </button>
            </div>

            <div
                ref={contentRef}
                style={{
                    height: isExpanded ? `${contentRef.current?.scrollHeight}px` : "0px",
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                }}
            >
                <Reorder.Group
                    axis="y"
                    values={dailySchedule.attractions}
                    onReorder={handleReorder}
                    className="flex flex-col gap-2"
                >
                    {dailySchedule.attractions.map((place, index) => (
                        <Reorder.Item key={place.id} value={place}>
                            <div className="relative flex flex-col gap-2">
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
                                            style={{ backgroundImage: `url(${dotLineImageUrl})` }} 
                                        />
                                        {place.travelWalkTime && (
                                            <div className="flex items-center gap-2">
                                                <img src={COMMON_IMAGES.WALK} alt="walk icon" className="w-5 h-5" />
                                                <span className="text-gray-700">{place.travelWalkTime}</span>
                                            </div>
                                        )}

                                        {place.travelWalkTime && place.travelCarTime && (
                                            <div 
                                                className="w-5 h-5 bg-contain bg-no-repeat" 
                                                style={{ backgroundImage: `url(${dotImageUrl})` }} 
                                            />
                                        )}

                                        {place.travelCarTime && (
                                            <div className="flex items-center gap-2">
                                                <img src={COMMON_IMAGES.CAR} alt="car icon" className="w-5 h-5" />
                                                <span className="text-gray-700">{place.travelCarTime}</span>
                                            </div>
                                        )}

                                        {place.travelCarTime && place.travelDistance && (
                                            <div 
                                                className="w-5 h-5 bg-contain bg-no-repeat" 
                                                style={{ backgroundImage: `url(${dotImageUrl})` }} 
                                            />
                                        )}

                                        {place.travelDistance && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-700">{place.travelDistance}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
};

export default DayScheduleCard;

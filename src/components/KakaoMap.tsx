"use client";
import React, { useEffect, useState } from "react";
import { useRecommendTravelDetailStore, usePublicTravelDetailStore } from "@/store/useRecommendTravelStore";
import { usePathname } from "next/navigation";
import Text from "./Text";

declare global {
    interface Window {
        kakao: any;
    }
}

const KakaoMap: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

    // ✅ 현재 경로 확인
    const pathname = usePathname();
    const isDetailPage = pathname === "/travel/detail";
    const isDetailIdPage = pathname?.startsWith("/travel/detail/");

    // ✅ 상태 분리
    const itinerary = isDetailPage
        ? useRecommendTravelDetailStore((state) => state.itinerary)
        : usePublicTravelDetailStore((state) => state.itinerary);

    const colorCycle = [
        "#9A77FF",
        "#7779FF",
        "#77ABFF",
        "#C477FF",
        "#E477FF",
        "#4B0082",
        "#8B00FF",
    ];

    // API 키 검증 및 에러 처리
    useEffect(() => {
        if (!KAKAO_API_KEY) {
            setError("카카오맵 API 키가 설정되지 않았습니다.");
            return;
        }

        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false&libraries=services,clusterer,drawing`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    setIsLoaded(true);
                });
            } else {
                setError("카카오맵 라이브러리를 불러올 수 없습니다.");
            }
        };

        script.onerror = () => {
            setError("카카오맵 스크립트를 불러오는데 실패했습니다.");
        };

        return () => {
            // 컴포넌트 언마운트 시 스크립트 제거
            const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, [KAKAO_API_KEY]);

    // 에러 상태 렌더링
    if (error) {
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
                        {error}
                    </Text>
                    <Text textStyle="caption1" className="text-gray-400">
                        관리자에게 문의해주세요.
                    </Text>
                </div>
            </div>
        );
    }

    // 로딩 상태 렌더링
    if (!isLoaded) {
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
    }

    useEffect(() => {
        if (isLoaded) {
            const kakao = (window as any).kakao;
            const container = document.getElementById("map");
            if (!container) {
                return;
            }

            let initialLat = 37.5665;
            let initialLng = 126.9780;

            if (itinerary?.dailyScheduleDtos?.length) {
                for (const day of itinerary.dailyScheduleDtos) {
                    if (day.attractions.length > 0) {
                        const firstAttraction = day.attractions[0];
                        if (firstAttraction.latitude && firstAttraction.longitude) {
                            initialLat = firstAttraction.latitude;
                            initialLng = firstAttraction.longitude;
                        }
                        break;
                    }
                }
            }

            const options = {
                center: new kakao.maps.LatLng(initialLat, initialLng),
                level: 3,
            };

            const map = new kakao.maps.Map(container, options);
            const linePath: any[] = [];
            let markerIndex = 1;

            if (itinerary?.dailyScheduleDtos) {
                itinerary.dailyScheduleDtos.forEach((day, dayIndex) => {
                    day.attractions.forEach((attraction) => {
                        if (attraction.latitude && attraction.longitude) {
                            const markerPosition = new kakao.maps.LatLng(
                                attraction.latitude,
                                attraction.longitude
                            );

                            linePath.push(markerPosition);

                            const color = colorCycle[dayIndex % colorCycle.length];

                            const overlayContent = `
                                <div style="
                                    width: 30px;
                                    height: 30px;
                                    background-color: ${color};
                                    border-radius: 50%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    color: white;
                                    font-weight: bold;
                                    border: 2px solid white;
                                    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
                                ">
                                    ${markerIndex}
                                </div>`;

                            const overlay = new kakao.maps.CustomOverlay({
                                content: overlayContent,
                                position: markerPosition,
                                yAnchor: 1.1,
                            });

                            overlay.setMap(map);
                            markerIndex++;

                            kakao.maps.event.addListener(overlay, "click", () => {
                                alert(`${attraction.name} - ${attraction.address}`);
                            });
                        }
                    });
                });

                const polyline = new kakao.maps.Polyline({
                    path: linePath,
                    strokeWeight: 3,
                    strokeColor: "#db4040",
                    strokeOpacity: 0.8,
                    strokeStyle: "solid",
                });

                polyline.setMap(map);
            }
        }
    }, [isLoaded, itinerary]);

    return (
        <div
            id="map"
            style={{
                width: "100%",
                height: "100%",
            }}
        />
    );
};

export default KakaoMap;

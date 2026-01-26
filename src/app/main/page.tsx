"use client";

import Card from "@/components/Card";
import Text from "@/components/Text";
import { useLogin } from "@/hooks/useLogin";
import { useEffect, useRef, useState, useCallback } from "react";
import { getPublicItineraries, PublicItinerary } from "@/lib/api/itinerary";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import Button from "@/components/Button";
import { COMMON_IMAGES } from "@/utils/imagePath";

export default function Main() {
  const [cards, setCards] = useState<PublicItinerary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mainRef = useRef<HTMLDivElement>(null);
  const { openPopupAndHandleLogin } = useLogin();
  const { isLoggedIn } = useAuthStore();

  const router = useRouter();
  const visibleCards = 3;

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true);
      try {
        const data = await getPublicItineraries(9);
        setCards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev >= cards.length - visibleCards ? 0 : prev + 1
    );
  }, [cards.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? cards.length - visibleCards : prev - 1
    );
  };

  // 자동 슬라이드
  useEffect(() => {
    if (cards.length === 0) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [cards.length, nextSlide]);

  return (
    <div ref={mainRef} className="w-full">
      <main className="mt-[188px] text-center">
        <Text as="h1" textStyle="display1" className="font-bold">
          어디로 떠날지 고민 중이라면, <br />
          모먼티어가 도와드릴게요
        </Text>
        <Text as="p" textStyle="heading2" className="mt-5 font-semibold">
          복잡한 일정 없이, 몇 가지 정보만 알려주시면 추천은 저희가 알아서
          해드려요.
        </Text>
      </main>

      <section className="relative mt-[80px] lg:px-16">
        {loading ? (
          <div className="text-center text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-red-500">에러 발생: {error}</div>
        ) : (
          <div className="relative max-w-[1100px] mx-auto">
            {/* 좌측 화살표 */}
            <button
              onClick={prevSlide}
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* 카드 슬라이더 */}
            <div className="flex justify-center gap-6">
              {cards.slice(currentIndex, currentIndex + visibleCards).map((card) => (
                <div
                  key={card.id}
                  className="flex-shrink-0 transition-all duration-500 ease-in-out"
                >
                  <Card
                    size="small"
                    region={card.title}
                    distanceInfo="알 수 없음"
                    onClick={() => router.push("/travel/detail/" + card.id)}
                    imageUrl={
                      card.image_url && isValidUrl(card.image_url)
                        ? card.image_url
                        : "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=5dc87836-b647-45ef-ae17-e3247f91b8b4"
                    }
                  />
                </div>
              ))}
            </div>

            {/* 우측 화살표 */}
            <button
              onClick={nextSlide}
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* 인디케이터 */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(cards.length - visibleCards + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index ? "bg-purple-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="mt-12 flex justify-center">
        {!isLoggedIn ? (
          <button
            className="flex px-5 py-[13px] bg-[#FFE812] rounded-full cursor-pointer"
            onClick={() => openPopupAndHandleLogin()}
          >
            <Image
              src={COMMON_IMAGES.KAKAO_ICON}
              alt="kakao icon"
              width={28}
              height={28}
            />
            <Text textStyle="headline1" className="ml-2 font-semibold">
              카카오로 시작하기
            </Text>
          </button>
        ) : (
          <Button
            onClick={() => router.push("/userinputs")}
            variant="gradation"
          >
            시작하기
          </Button>
        )}
      </section>
    </div>
  );
}

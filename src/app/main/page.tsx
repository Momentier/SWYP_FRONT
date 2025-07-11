'use client';

import Card from "@/components/Card"
import Text from "@/components/Text"
import { useLogin } from "@/hooks/useLogin";
import { useEffect, useRef, useState } from "react";
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

  const sliderRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const { openPopupAndHandleLogin } = useLogin();
  const { isLoggedIn } = useAuthStore();

  const router = useRouter();
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    const fetchItineraries = async () => {
      setLoading(true);
      try {
        const data = await getPublicItineraries(15);
        setCards(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = mainRef.current;
    if (!slider || !container) return;

    const frame = () => {
      const containerCenter = container.clientWidth / 2;
      const children = Array.from(slider.children) as HTMLElement[];

      const distances = children.map((child) => {
        const rect = child.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        return {
          el: child,
          distance: Math.abs(containerCenter - cardCenter),
        };
      });

      const sorted = distances.sort((a, b) => a.distance - b.distance);

      children.forEach((child) => {
        child.classList.remove("opacity-100");
        child.classList.add("opacity-50");
      });

      sorted.slice(0, 3).forEach(({ el }) => {
        el.classList.remove("opacity-50");
        el.classList.add("opacity-100");
      });

      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, []);

  return (
    <div ref={mainRef} className="w-full">
      <main className="mt-[188px] text-center">
        <Text as="h1" textStyle="display1" className="font-bold">
          어디로 떠날지 고민 중이라면, <br />
          모먼티어가 도와드릴게요
        </Text>
        <Text as="p" textStyle="heading2" className="mt-5 font-semibold">
          복잡한 일정 없이, 몇 가지 정보만 알려주시면 추천은 저희가 알아서 해드려요.
        </Text>
      </main>

      <section className="relative group mt-[80px]">
        {loading ? (
          <div className="text-center text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-red-500">에러 발생: {error}</div>
        ) : (
          <div
            ref={sliderRef}
            className="flex w-max gap-4 animate-marquee"
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="transition-transform duration-300 hover:scale-105"
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
        )}
      </section>

      <section className="mt-8 flex justify-center">
        {
          !isLoggedIn ?
            (<button
              className="flex px-5 py-[13px] bg-[#FFE812] rounded-full cursor-pointer"
              onClick={() => openPopupAndHandleLogin()
              }
            >
              <Image src={COMMON_IMAGES.KAKAO_ICON} alt="kakao icon" width={28} height={28} />
              <Text textStyle="headline1" className="ml-2 font-semibold">
                카카오로 시작하기
              </Text>
            </button>)
            :
            <Button onClick={() => router.push("/userinputs")} variant="gradation">
              시작하기
            </Button>
        }
      </section>
    </div>
  );
}

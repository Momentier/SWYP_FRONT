"use client";

import Header from "@/components/Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import React from "react";

// Leaflet은 window 객체에 의존하므로 SSR 비활성화
const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">지도를 불러오는 중...</p>
      </div>
    </div>
  ),
});

interface MapLayoutProps {
  children: React.ReactNode;
}

export default function MapLayout({ children }: MapLayoutProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex h-screen">
      <aside className="relative w-[980px] border-r border-gray-200">
        <div className="fixed w-[980px] top-0 z-10 bg-white shadow-md">
          <Header
            user={user}
            onClickLogo={() => router.push("/")}
            onClickProfile={() => router.push("/mypage")}
          />
        </div>
        <main className="pt-[60px]">
          {children || (
            <div className="p-4 text-red-500">No Content Found</div>
          )}
        </main>
      </aside>

      <section className="flex-grow h-full">
        <LeafletMap />
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState, ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const isMockingEnabled =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled";

interface MswProviderProps {
  children: ReactNode;
}

export default function MswProvider({ children }: MswProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const enableMocking = async () => {
      if (typeof window !== "undefined" && isMockingEnabled) {
        const { worker } = await import("./browser");
        await worker.start({
          onUnhandledRequest: "bypass",
          serviceWorker: {
            url: "/mockServiceWorker.js",
          },
        });

        // MSW 모드에서는 자동 로그인 상태로 설정
        const { isLoggedIn, login } = useAuthStore.getState();
        if (!isLoggedIn) {
          login({
            userName: "테스트유저",
            accessToken: "mock-access-token-12345",
            expiresIn: Date.now() + 24 * 60 * 60 * 1000, // 24시간
            hasSubmittedExperience: true,
          });
          localStorage.setItem("refreshToken", "mock-refresh-token-67890");
        }

        console.log("[MSW] Mock 서버가 활성화되었습니다. (자동 로그인 완료)");
      }
      setIsReady(true);
    };

    enableMocking();
  }, []);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}

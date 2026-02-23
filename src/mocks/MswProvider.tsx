"use client";

import { useEffect, useState, ReactNode } from "react";

interface MswProviderProps {
  children: ReactNode;
}

export default function MswProvider({ children }: MswProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const enableMocking = async () => {
      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        const { worker } = await import("./browser");
        await worker.start({
          onUnhandledRequest: "bypass",
          serviceWorker: {
            url: "/mockServiceWorker.js",
          },
        });
        console.log("[MSW] Mock 서버가 활성화되었습니다.");
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

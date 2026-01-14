"use client";

import { useEffect } from "react";
import { kakaoLogin } from "@/lib/api/auth";

export default function KakaoRedirectPage() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      kakaoLogin(code)
        .then(({ accessToken, userName }) => {
          window.opener?.postMessage(
            {
              type: "KAKAO_LOGIN_SUCCESS",
              payload: {
                accessToken,
                userName,
              },
            },
            "*",
          );
          window.close();
        })
        .catch((err: Error) => {
          window.opener?.postMessage(
            {
              type: "KAKAO_LOGIN_FAILURE",
              error: err.message,
            },
            "*",
          );
          window.close();
        });
    }
  }, []);

  return <div className="text-center mt-20">카카오 로그인 처리 중...</div>;
}

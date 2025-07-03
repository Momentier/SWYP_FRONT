import type { Preview } from "@storybook/react";
import { ModalProvider } from '../src/providers/ModalProvider';
import "@fontsource/pretendard";
import "../src/app/globals.css";
import React from "react";

// GitHub Pages Storybook 환경 감지
const isGitHubPagesStorybook = typeof window !== 'undefined' &&
  (window.location.hostname.includes('github.io') || window.location.pathname.includes('/SWYP_FRONT/'));

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        xs: {
          name: "XS (375–767)",
          styles: {
            width: "375px",
            height: "800px",
          },
        },
        sm: {
          name: "SM (768–991)",
          styles: {
            width: "768px",
            height: "800px",
          },
        },
        md: {
          name: "MD (992–1199)",
          styles: {
            width: "992px",
            height: "800px",
          },
        },
        lg: {
          name: "LG (1200–1599)",
          styles: {
            width: "1200px",
            height: "800px",
          },
        },
        xl: {
          name: "XL (1600+)",
          styles: {
            width: "1600px",
            height: "800px",
          },
        },
      },
    },
  },
  decorators: [
    (Story) => {
      // GitHub Pages에서 이미지 모킹
      React.useEffect(() => {
        if (window.location.hostname.includes('github.io')) {
          // 네트워크 요청 차단
          const originalFetch = window.fetch;
          window.fetch = function (url, options) {
            if (typeof url === 'string' && (url.includes('/icons/') || url.includes('/default_img.png')) && !url.includes('/SWYP_FRONT/')) {
              const newUrl = url.replace(/^\//, '/SWYP_FRONT/');
              console.log(`Mocked fetch: ${url} -> ${newUrl}`);
              return originalFetch(newUrl, options);
            }
            return originalFetch(url, options);
          };

          // XMLHttpRequest도 차단
          const OriginalXHR = window.XMLHttpRequest;
          window.XMLHttpRequest = function () {
            const xhr = new OriginalXHR();
            const originalOpen = xhr.open;
            xhr.open = function (method, url, ...args) {
              if (typeof url === 'string' && (url.includes('/icons/') || url.includes('/default_img.png')) && !url.includes('/SWYP_FRONT/')) {
                const newUrl = url.replace(/^\//, '/SWYP_FRONT/');
                console.log(`Mocked XHR: ${url} -> ${newUrl}`);
                return originalOpen.call(this, method, newUrl, ...args);
              }
              return originalOpen.call(this, method, url, ...args);
            };
            return xhr;
          } as any;

          // 정리 함수
          return () => {
            window.fetch = originalFetch;
            window.XMLHttpRequest = OriginalXHR;
          };
        }
      }, []);

      return (
        <ModalProvider>
          <Story />
        </ModalProvider>
      )
    }
  ]
};

export default preview;

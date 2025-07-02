import type { Preview } from "@storybook/react";
import { ModalProvider } from '../src/providers/ModalProvider';
import "@fontsource/pretendard";
import "../src/app/globals.css";
import React from "react";

// GitHub Pages Storybook 환경 감지
const isGitHubPagesStorybook = typeof window !== 'undefined' && 
  window.location.hostname.includes('github.io');

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
      // 이미지 경로 자동 수정 (GitHub Pages Storybook용)
      React.useEffect(() => {
        if (isGitHubPagesStorybook) {
          const fixImagePaths = () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
              const src = img.getAttribute('src');
              if (src && src.startsWith('/') && !src.startsWith('/SWYP_FRONT/')) {
                // /default_img.png -> /SWYP_FRONT/default_img.png
                // /icons/... -> /SWYP_FRONT/icons/...
                img.src = `/SWYP_FRONT${src}`;
              }
            });
          };

          // 초기 실행
          fixImagePaths();

          // DOM 변경 감지해서 새로 추가된 이미지도 처리
          const observer = new MutationObserver(fixImagePaths);
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });

          // 컴포넌트 언마운트시 observer 정리
          return () => observer.disconnect();
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

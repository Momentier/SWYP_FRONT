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
      // 이미지 경로 자동 수정
      React.useEffect(() => {
        const fixImagePaths = () => {
          const images = document.querySelectorAll('img');
          images.forEach(img => {
            const src = img.getAttribute('src');
            // GitHub Pages에서만 수정 (호스트명 체크)
            if (src && src.startsWith('/') && !src.startsWith('/SWYP_FRONT/') && 
                window.location.hostname.includes('github.io')) {
              
              const newSrc = `/SWYP_FRONT${src}`;
              
              // 기존 이미지 요소를 새로 만들어서 교체
              const newImg = document.createElement('img');
              
              // 모든 속성 복사
              Array.from(img.attributes).forEach(attr => {
                if (attr.name === 'src') {
                  newImg.setAttribute('src', newSrc);
                } else {
                  newImg.setAttribute(attr.name, attr.value);
                }
              });
              
              // 스타일 복사
              newImg.className = img.className;
              newImg.style.cssText = img.style.cssText;
              
              // 부모 요소에서 교체
              if (img.parentNode) {
                img.parentNode.replaceChild(newImg, img);
              }
              
              console.log(`Replaced image: ${src} -> ${newSrc}`);
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

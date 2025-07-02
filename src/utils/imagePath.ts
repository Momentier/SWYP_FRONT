/**
 * GitHub Pages나 다른 서브패스 환경에서 이미지 경로를 올바르게 처리하는 유틸 함수
 */

// 빌드 타임에 결정되는 환경변수들
const isGithubPages = process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true';
const isStorybookExport = process.env.STORYBOOK === 'true';
const isStorybookGithubPages = process.env.STORYBOOK_GITHUB_PAGES === 'true';

// 런타임에 환경 감지 (빌드 타임이 실패할 경우를 대비)
const detectStorybookRuntime = () => {
  if (typeof window !== 'undefined') {
    return window.location.pathname.includes('/SWYP_FRONT/');
  }
  return false;
};

// basePath 설정
const getBasePath = () => {
  // 빌드 타임 환경변수 체크
  if (isGithubPages || isStorybookExport || isStorybookGithubPages) {
    return '/SWYP_FRONT';
  }
  
  // 런타임 감지 (폴백)
  if (detectStorybookRuntime()) {
    return '/SWYP_FRONT';
  }
  
  return '';
};

const basePath = getBasePath();

/**
 * 이미지 경로를 환경에 맞게 변환합니다
 * @param imagePath - 이미지 경로 (예: '/default_img.png', '/icons/star.svg')
 * @returns 환경에 맞는 이미지 경로
 */
export function getImagePath(imagePath: string): string {
  // 이미 외부 URL인 경우 그대로 반환
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // 절대 경로가 아닌 경우 그대로 반환
  if (!imagePath.startsWith('/')) {
    return imagePath;
  }

  // GitHub Pages나 Storybook GitHub Pages에서는 basePath를 추가
  if (basePath) {
    return `${basePath}${imagePath}`;
  }

  // 로컬 개발환경에서는 그대로 반환
  return imagePath;
}

/**
 * Next.js Image 컴포넌트용 src 속성을 처리합니다
 */
export function getNextImageSrc(imagePath: string): string {
  return getImagePath(imagePath);
}

/**
 * 배경 이미지 URL을 처리합니다
 */
export function getBackgroundImageUrl(imagePath: string): string {
  const processedPath = getImagePath(imagePath);
  return `url(${processedPath})`;
}

/**
 * 현재 환경 정보를 반환합니다 (디버깅용)
 */
export function getEnvironmentInfo() {
  return {
    isGithubPages,
    isStorybookExport,
    isStorybookGithubPages,
    detectStorybookRuntime: detectStorybookRuntime(),
    basePath,
    currentUrl: typeof window !== 'undefined' ? window.location.href : 'N/A',
    nodeEnv: process.env.NODE_ENV,
  };
}

/**
 * 강제로 이미지 경로를 수정합니다 (비상시용)
 */
export function forceImagePath(imagePath: string): string {
  if (typeof window !== 'undefined' && window.location.pathname.includes('/SWYP_FRONT/')) {
    return imagePath.startsWith('/') ? `/SWYP_FRONT${imagePath}` : imagePath;
  }
  return imagePath;
}

// 자주 사용되는 이미지들을 미리 정의
export const COMMON_IMAGES = {
  DEFAULT_IMG: '/default_img.png',
  KAKAO_ICON: '/icons/kakao.png',
  KAKAO_ROUND: '/icons/kakao_round.png',
  REFRESH: '/icons/Refresh.svg',
  STAR: '/icons/Star.svg',
  LOCATION: '/icons/Location.svg',
  CLOCK: '/icons/Clock.svg',
  CHEVRON_LEFT: '/icons/Chevron Left Bold.svg',
  CHEVRON_DOWN: '/icons/Chevron Down.svg',
} as const;

// 처리된 이미지 경로들
export const PROCESSED_IMAGES = Object.fromEntries(
  Object.entries(COMMON_IMAGES).map(([key, path]) => [key, getImagePath(path)])
) as Record<keyof typeof COMMON_IMAGES, string>;

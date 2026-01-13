/**
 * GitHub Pages나 다른 서브패스 환경에서 이미지 경로를 올바르게 처리하는 유틸 함수
 */

// 빌드 타임에 결정되는 환경변수들
const isGithubPages =
  process.env.NODE_ENV === "production" && process.env.GITHUB_PAGES === "true";
const isStorybookExport = process.env.STORYBOOK === "true";
const isStorybookGithubPages = process.env.STORYBOOK_GITHUB_PAGES === "true";

// 런타임에 환경 감지 (빌드 타임이 실패할 경우를 대비)
const detectStorybookRuntime = () => {
  if (typeof window !== "undefined") {
    return window.location.pathname.includes("/SWYP_FRONT/");
  }
  return false;
};

// basePath 설정
const getBasePath = () => {
  // 빌드 타임 환경변수 체크
  if (isGithubPages || isStorybookGithubPages) {
    return "/SWYP_FRONT";
  }

  // 런타임 감지 (폴백)
  if (detectStorybookRuntime()) {
    return "/SWYP_FRONT";
  }

  return "";
};

const basePath = getBasePath();

/**
 * 이미지 경로를 환경에 맞게 변환합니다
 * @param imagePath - 이미지 경로 (예: '/default_img.png', '/icons/star.svg')
 * @returns 환경에 맞는 이미지 경로
 */
export function getImagePath(imagePath: string): string {
  // 이미 외부 URL인 경우 그대로 반환
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // 절대 경로가 아닌 경우 그대로 반환
  if (!imagePath.startsWith("/")) {
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
    currentUrl: typeof window !== "undefined" ? window.location.href : "N/A",
    nodeEnv: process.env.NODE_ENV,
  };
}

/**
 * 강제로 이미지 경로를 수정합니다 (비상시용)
 */
export function forceImagePath(imagePath: string): string {
  if (
    typeof window !== "undefined" &&
    window.location.pathname.includes("/SWYP_FRONT/")
  ) {
    return imagePath.startsWith("/") ? `/SWYP_FRONT${imagePath}` : imagePath;
  }
  return imagePath;
}

// 기본 이미지 경로들 (절대경로)
const RAW_IMAGES = {
  DEFAULT_IMG: "/default_img.png",
  KAKAO_ICON: "/icons/kakao.png",
  KAKAO_ROUND: "/icons/kakao_round.png",
  REFRESH: "/icons/Refresh.svg",
  STAR: "/icons/Star.svg",
  LOCATION: "/icons/Location.svg",
  CLOCK: "/icons/Clock.svg",
  CHEVRON_LEFT: "/icons/Chevron Left Bold.svg",
  CHEVRON_DOWN: "/icons/Chevron Down.svg",
  CHEVRON_RIGHT: "/icons/Chevron Right.svg",
  DOT_LINE: "/icons/DotLine.svg",
  DOT: "/icons/Dot.svg",
  WALK: "/icons/Walk.svg",
  CAR: "/icons/Car.svg",
  AI: "/icons/AI.svg",
  ARROW_RIGHT_WHITE: "/icons/Arrow Right White.svg",
  CLOSE: "/icons/Close.svg",
  ALONE: "/icons/Alone.png",
  COUPLE: "/icons/Couple.png",
  FAMILY: "/icons/Family.png",
  FRIEND: "/icons/Friend.png",
  AVATAR: "/icons/Avatar.svg",
  MAIN_LOGO: "/icons/MainLogo.webp",
  LINK: "/icons/Link.svg",
  HANDLE_DESKTOP: "/icons/Handle Desktop.svg",
  RE_REQUEST: "/icons/Re_Request.svg",
  RESET: "/icons/Reset.svg",
  PDF_DOWNLOAD: "/icons/Pdf Download.svg",
  STAR_FILLED: "/icons/Star_Filled.svg",
  STAR_NORMAL: "/icons/Star_Normal.svg",
  CHECK_UNCHECKED: "/icons/Check_Unchecked.svg",
  CHECK_CHECKED: "/icons/Check_Checked.svg",
  SUCCESS: "/icons/Success.svg",
  FAIL: "/icons/Fail.svg",
  ARROW: "/icons/Arrow.svg",
  URL: "/icons/URL.svg",
  SHARE: "/icons/Share.svg",
  INFO: "/icons/Inform.svg",
} as const;

// 자동으로 환경에 맞는 경로 처리가 된 이미지들
export const COMMON_IMAGES = Object.fromEntries(
  Object.entries(RAW_IMAGES).map(([key, path]) => [key, getImagePath(path)]),
) as Record<keyof typeof RAW_IMAGES, string>;

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"], // storybook에서 public 폴더를 사용하기 위해 추가

  webpackFinal: async (config) => {
    // framer-motion과 관련된 모듈 해결 문제 수정
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@emotion/is-prop-valid': require.resolve('@emotion/is-prop-valid'),
        '@emotion/styled': require.resolve('@emotion/styled'),
      };
    }
    return config;
  },
};

export default config;

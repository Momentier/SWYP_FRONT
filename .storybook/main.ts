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
  
  staticDirs: ["../public"],

  webpackFinal: async (config) => {
    // GitHub Pages를 위한 환경변수 명시적 정의
    const webpack = require('webpack');
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.STORYBOOK_GITHUB_PAGES': JSON.stringify(process.env.STORYBOOK_GITHUB_PAGES || 'false'),
        'process.env.GITHUB_PAGES': JSON.stringify(process.env.GITHUB_PAGES || 'false'),
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      })
    );
    
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
const isStorybookExport = process.env.STORYBOOK === "true";
const isGithubPages = process.env.NODE_ENV === "production" && process.env.GITHUB_PAGES === "true";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true, // 308 Permanent Redirect
      },
    ];
  },
  basePath: isGithubPages ? "/SWYP_FRONT" : "",
  assetPrefix: isStorybookExport ? "/SWYP_FRONT/" : (isGithubPages ? "/SWYP_FRONT/" : ""),
  images: {
    unoptimized: isStorybookExport || isGithubPages,
  },
  output: isStorybookExport ? "export" : "standalone",
  trailingSlash: isGithubPages,
};

export default nextConfig;

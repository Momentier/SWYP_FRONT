const isStorybookExport = process.env.STORYBOOK === "true";
const isGithubPages = process.env.NODE_ENV === "production" && process.env.GITHUB_PAGES === "true";

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://223.130.163.203:30000";

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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
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
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

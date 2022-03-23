const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ["."],
  },
  images: {
    imageSizes: [128, 256],
  },
  pageExtensions: ["page.tsx", "page.ts"],
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
      test: /\.graphql$/,
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

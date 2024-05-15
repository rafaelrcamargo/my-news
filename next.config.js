const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    typedRoutes: true,
    nextScriptWorkers: true,
    scrollRestoration: true,
    webpackBuildWorker: true,
  },
});

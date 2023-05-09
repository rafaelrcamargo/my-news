/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*"
      }
    ]
  },
  experimental: {
    optimizeCss: true,
    typedRoutes: true,
    serverActions: true,
    nextScriptWorkers: true,
    scrollRestoration: true,
    webpackBuildWorker: true
  }
})

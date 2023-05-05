/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,
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
}

module.exports = nextConfig

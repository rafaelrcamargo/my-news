/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
			},
		],
	},
	experimental: {
		appDir: true,
		optimizeCss: true,
		typedRoutes: true,
		nextScriptWorkers: true,
		scrollRestoration: true,
		webpackBuildWorker: true,
		// serverActions: true, // The *RSC* callbacks
		// workerThreads: true, // This was crashing the build >:(
	},
};

module.exports = nextConfig;

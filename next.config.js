/** @type {import('next').NextConfig} */
const nextConfig = {
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
		typedRoutes: true,
	},
};

module.exports = nextConfig;

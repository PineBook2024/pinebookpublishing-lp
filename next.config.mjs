import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      "imperiumdesigners.com",
      "videos.ctfassets.net",
      "localhost",
       "pinebookbackend.pinedigitalhub.com",
      
    ],

    // ✅ IMPORTANT for Laravel backend images
   remotePatterns: [
  {
    protocol: "https",
    hostname: "pinebookbackend.pinedigitalhub.com",
    pathname: "/storage/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "8000",
    pathname: "/storage/**",
  },
],
  },
};

export default withBundleAnalyzer(nextConfig);
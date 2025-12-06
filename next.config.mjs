/** @type {import('next').NextConfig} */
import bundleAnalyzer from "@next/bundle-analyzer";


// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['imperiumdesigners.com', 'https://videos.ctfassets.net/0g2c0d4v74kt/7JddRckDmiDTFoj2zkuibz/19a06bc6173d8b205ead99ba8b0a0307/'],
//   },
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'imperiumdesigners.com',
      'videos.ctfassets.net'
    ],
  },
};

export default withBundleAnalyzer(nextConfig);

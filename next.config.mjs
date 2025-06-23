// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: false,
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://rs-backend-ieyn.onrender.com/api/:path*"
      }
    ];
  }
};

export default nextConfig;

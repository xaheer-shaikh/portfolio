import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false, // Keep image optimization enabled
    // domains: ["aarab.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aarab.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
  },

  compress: true,

  experimental: {
    optimizeCss: true,
  },

  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/docs/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Type",
            value: "application/pdf",
          },
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/email",
        destination: "mailto:aarab.nishchal@gmail.com",
        permanent: true,
      },
      {
        source: "/directresume",
        destination: "/docs/Zaheer_Alil_Shaikh_Resume.pdf",
        permanent: true,
      },
      {
        source: "/direct-resume",
        destination: "/docs/Zaheer_Alil_Shaikh_Resume.pdf",
        permanent: true,
      },
      {
        source: "/github",
        destination: "www.github.com/aarabii",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

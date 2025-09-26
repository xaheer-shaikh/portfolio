import "./globals.css";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Toaster } from "sonner";

import { inter, mono, nasalization, quentine } from "./fonts";

import { keywords } from "@/constant";
import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
  generateOrganizationStructuredData,
} from "@/lib/structured-data";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  applicationName: "Zaheer Ali Shaikh",
  title: "Zaheer Ali Shaikh",
  description:
    "Zaheer Ali Shaikh is a student developer passionate about building modern web apps with Next.js, React, and open-source tools. Explore his projects, experiments, and developer portfolio.",
  authors: [
    {
      name: "Zaheer Ali Shaikh",
      url: "https://aarab.vercel.app",
    },
  ],
  creator: "Zaheer Ali Shaikh",
  referrer: "origin-when-cross-origin",
  keywords: keywords,
  metadataBase: new URL("https://aarab.vercel.app"),

  // SEO Enhancements
  alternates: {
    canonical: "https://aarab.vercel.app",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }, // fallback
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",

  openGraph: {
    title: "Zaheer Ali Shaikh",
    description:
      "Explore Zaheer Ali Shaikh's portfolio featuring projects in React, Next.js, AI, and developer tools. Discover a world of creative web applications and open-source experiments.",
    url: "https://aarab.vercel.app",
    siteName: "Zaheer Ali Shaikh",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Zaheer Ali Shaikh Portfolio Thumbnail",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Zaheer Ali Shaikh",
    description:
      "Check out Zaheer Ali Shaikh's personal portfolio and dev projects using Next.js, React, Tailwind, and modern web tech.",
    images: ["/images/thumbnail.png"],
    creator: "@xaheer_shaikh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personStructuredData = generatePersonStructuredData();
  const websiteStructuredData = generateWebsiteStructuredData();
  const organizationStructuredData = generateOrganizationStructuredData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${mono.variable} ${nasalization.variable} ${quentine.variable} font-sans`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster position="bottom-right" richColors closeButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { resumeKeywords } from "@/constant";
import { generateResumeStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Resume - Zaheer Ali Shaikh",
  description:
    "View and download Zaheer Ali Shaikh's professional resume. Student developer with expertise in React, Next.js, and full-stack development.",
  keywords: resumeKeywords,
  openGraph: {
    title: "Resume - Zaheer Ali Shaikh",
    description:
      "View and download Zaheer Ali Shaikh's professional resume featuring his experience and skills as a student developer.",
    url: "https://aarab.vercel.app/resume",
    siteName: "Zaheer Ali Shaikh",
    images: [
      {
        url: "/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Zaheer Ali Shaikh Resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume - Zaheer Ali Shaikh",
    description:
      "View Zaheer Ali Shaikh's professional resume and experience as a student developer.",
    images: ["/images/thumbnail.png"],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resumeStructuredData = generateResumeStructuredData();

  return (
    <>
      {/* Preload the PDF for better performance */}
      <link
        rel="preload"
        href="/docs/Zaheer_Alil_Shaikh_Resume.pdf"
        as="document"
        type="application/pdf"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeStructuredData),
        }}
      />
      {children}
    </>
  );
}
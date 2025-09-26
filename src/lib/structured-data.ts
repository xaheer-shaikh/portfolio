import { selfData } from "@/constant";

export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: selfData.name,
    givenName: selfData.first_name,
    familyName: selfData.last_name,
    jobTitle: selfData.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: selfData.workFor,
    },
    email: selfData.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: selfData.current_location.city,
      addressRegion: selfData.current_location.state,
      addressCountry: selfData.current_location.country,
    },
    sameAs: [
      `https://github.com/${selfData.socials_username.github}`,
      `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
      `https://twitter.com/${selfData.socials_username.twitter}`,
      `https://instagram.com/${selfData.socials_username.instagram}`,
    ],
    url: "https://aarab.vercel.app",
    description: selfData.bio,
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${selfData.name} - Portfolio`,
    url: "https://aarab.vercel.app",
    description:
      `${selfData.name}'s portfolio featuring projects in React, Next.js, and modern web development`,
    author: {
      "@type": "Person",
      name: selfData.name,
    },
    publisher: {
      "@type": "Person",
      name: selfData.name,
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      name: selfData.name,
    },
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: selfData.name,
    url: "https://aarab.vercel.app",
    logo: "https://aarab.vercel.app/images/logo.png",
    description: selfData.bio,
    founder: {
      "@type": "Person",
      name: selfData.name,
    },
    sameAs: [
      `https://github.com/${selfData.socials_username.github}`,
      `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
      `https://twitter.com/${selfData.socials_username.twitter}`,
      `https://instagram.com/${selfData.socials_username.instagram}`,
    ],
  };
}

export function generateResumeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: `${selfData.name} Resume`,
    description:
      `Professional resume of ${selfData.name} - Student Developer specializing in Full-Stack Web Development`,
    url: "https://aarab.vercel.app/resume",
    author: {
      "@type": "Person",
      name: selfData.name,
      email: selfData.email,
      jobTitle: selfData.jobTitle,
      worksFor: {
        "@type": "Organization",
        name: selfData.workFor,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: selfData.current_location.city,
        addressRegion: selfData.current_location.state,
        addressCountry: selfData.current_location.country,
      },
      sameAs: [
        `https://github.com/${selfData.socials_username.github}`,
        `https://linkedin.com/in/${selfData.socials_username.linkedin}`,
      ],
    },
    dateModified: new Date().toISOString(),
    fileFormat: "application/pdf",
    contentUrl: "https://aarab.vercel.app/docs/MyResume.pdf",
    downloadUrl: "https://aarab.vercel.app/docs/MyResume.pdf",
    keywords: [
      "Software Developer",
      "Full Stack Developer",
      "React Developer",
      "Next.js Developer",
      "JavaScript Developer",
      "TypeScript Developer",
      "Student Developer",
      "Computer Science",
      "University of Mumbai",
      "MSBTE Mumbai",
      "B.E. Computer Science Engineering",
      "Diploma in Computer Engineering",
      "Data Structures & Algorithms",
      "DBMS",
      "Software Development",
      "Computer Networks",
      "Thane",
      "India",
    ],
  };
}
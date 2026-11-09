import type { Metadata } from "next";

export const siteConfig = {
  name: "Chibgatullah Minhaz",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://chibgatullahminhaz.dev",
  role: "Freelance Full-Stack & Mobile Developer",
  location: "Chittagong, Bangladesh",
  email: "chminhaz.info@gmail.com",
  title: "Chibgatullah Minhaz — Full-Stack & Mobile Developer",
  description:
    "Freelance full-stack & mobile developer based in Chittagong, Bangladesh. I build fast, scalable web apps with the MERN/PERN stack, cross-platform mobile apps with React Native, and practical AI integrations. Open to new projects.",
  keywords: [
    "Chibgatullah Minhaz",
    "freelance full stack developer",
    "freelance web developer Bangladesh",
    "MERN stack developer",
    "PERN stack developer",
    "Next.js developer",
    "React developer",
    "React Native developer",
    "mobile app developer",
    "Node.js developer",
    "TypeScript developer",
    "AI integration developer",
    "web developer Chittagong",
    "hire full stack developer",
  ],
  social: {
    github: "https://github.com/ChibgatullahMinhaz",
    linkedin: "https://www.linkedin.com/in/chibgatullahminhaz",
  },
} as const;

const ogBase = {
  type: "website",
  locale: "en_US",
  siteName: siteConfig.name,
} as const;

/**
 * Builds per-route metadata. `openGraph`/`twitter` are shallowly replaced when a
 * segment defines them, so every route must re-declare the full nested objects.
 */
export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    keywords: [...new Set([siteConfig.name, ...keywords])],
    alternates: { canonical: path },
    openGraph: {
      ...ogBase,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** JSON-LD must not contain raw `<` (XSS), per the Next.js JSON-LD guide. */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const personId = `${siteConfig.url}/#person`;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chittagong",
      addressCountry: "BD",
    },
    knowsAbout: [
      "Full-Stack Web Development",
      "React",
      "Next.js",
      "Node.js",
      "React Native",
      "MERN Stack",
      "PERN Stack",
      "TypeScript",
      "AI Integration",
      "Firebase",
      "Docker",
    ],
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

export function professionalServiceJsonLd() {
  return {
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: `${siteConfig.name} — ${siteConfig.role}`,
    url: siteConfig.url,
    description: siteConfig.description,
    founder: { "@id": personId },
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chittagong",
      addressCountry: "BD",
    },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
  };
}

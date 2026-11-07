import type { Metadata } from 'next';

const siteUrl = 'https://vb-profile.netlify.app';
const title = 'Vladyslav Bondarchuk | Frontend Engineer';
const description =
  'Frontend Engineer with 4+ years of experience specializing in React, Next.js, and TypeScript. Building modern web applications across FinTech, InsurTech, and EdTech.';
const image = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: 'Vladyslav Bondarchuk - Frontend Engineer. React, Next.js, TypeScript. Dark cyberpunk portfolio preview.',
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s | Vladyslav Bondarchuk' },
  description,
  alternates: { canonical: `${siteUrl}/` },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/`,
    siteName: 'VB | Vladyslav Bondarchuk',
    type: 'website',
    locale: 'en_US',
    images: [{ ...image, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: image.url, alt: image.alt }],
  },
};

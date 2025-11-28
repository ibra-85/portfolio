import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import NextTopLoader from "nextjs-toploader";
import { SkipToContent } from "@/components/SkipToContent";
import { siteConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Évite le FOIT (Flash of Invisible Text)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Évite le FOIT (Flash of Invisible Text)
});

const siteUrl = siteConfig.url;

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: "#141414",
};

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Ibraguim — Développeur Web",
        template: "%s | Ibraguim",
    },
    description: "Portfolio de Ibraguim, développeur web spécialisé en React, Next.js, TypeScript et Laravel. Création de sites web modernes et applications performantes.",
    keywords: [
        "Développeur web",
        "Portfolio",
        "React",
        "Next.js",
        "TypeScript",
        "Laravel",
        "Développeur frontend",
        "Développeur fullstack",
        "Web developer",
        "France",
        "Vendée",
    ],
    authors: [{ name: "Ibraguim", url: siteUrl }],
    creator: "Ibraguim",
    publisher: "Ibraguim",
    alternates: { canonical: "/" },
    openGraph: {
            type: "website",
            url: "/",
            title: "Ibraguim — Développeur Web",
            description: "Portfolio de Ibraguim, développeur web spécialisé en React, Next.js, TypeScript et Laravel. Découvrez mes projets et réalisations.",
            images: [
                {
                    url: "/logo.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Portfolio de Ibraguim - Développeur Web",
                },
            ],
    },
    twitter: {
            card: "summary_large_image",
            title: "Ibraguim — Développeur Web",
            description: "Portfolio de Ibraguim, développeur web spécialisé en React, Next.js, TypeScript et Laravel.",
            images: ["/logo.jpg"],
        },
    icons: {
        icon: "/favicon.ico",
        apple: "/logo.jpg",
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Resource hints pour améliorer les performances */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.w3.org" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <link rel="dns-prefetch" href="https://assets.vercel.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <SkipToContent />
          <NextTopLoader
            color="#ffffff"
            height={2}
            showSpinner={false}
            easing="ease"
            speed={200}
          />
          <StructuredData type="person" />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

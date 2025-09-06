import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
        ? "https://ibraguim.fr"
        : "http://localhost:3000");

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Ibraguim — Développeur Web",
        template: "%s | Ibraguim",
    },
    description: "Portfolio de Ibraguim, développeur web.",
    keywords: ["Développeur web", "Portfolio"],
    authors: [{ name: "Ibraguim", url: siteUrl }],
    creator: "Ibraguim",
    publisher: "Ibraguim",
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        url: "/",
        title: "Ibraguim — Développeur Web",
        description: "Projets et réalisations.",
        images: [
            {
                url: "/opengraph-image.jpg",
                width: 1200,
                height: 630,
                alt: "Aperçu du portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ibraguim — Développeur Web",
        description: "Projets et réalisations.",
        images: ["/twitter-image.jpg"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
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
      <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

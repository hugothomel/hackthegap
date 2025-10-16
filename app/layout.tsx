import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Hack the Gap | Product Hackathon - November 14-16, 2025",
  description: "Start solving challenges that matter. November 14-16, 2025 at 42 Paris.",
  keywords: ["hackathon", "product development", "AI tools", "42 Paris", "product builders", "innovation"],
  authors: [{ name: "Hack the Gap" }],
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  openGraph: {
    title: "Hack the Gap | Product Hackathon",
    images: [
      {
        url: "https://i.imgur.com/t4uS7mB.png",
        width: 1200,
        height: 630,
        alt: "Hack the Gap | Product Hackathon",
      },
    ],
    description: "Start solving challenges that matter. November 14-16, 2025 at 42 Paris.",
    type: "website",
    siteName: "Hack the Gap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hack the Gap | Product Hackathon",
    description: "Start solving challenges that matter. November 14-16, 2025 at 42 Paris.",
    images: [
      {
        url: "https://i.imgur.com/t4uS7mB.png",
        width: 1200,
        height: 630,
        alt: "Hack the Gap | Product Hackathon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

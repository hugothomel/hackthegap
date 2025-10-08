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
  title: "Hack the Gap | Product Hackathon - November 15-16, 2025",
  description: "Stop building tools looking for problems. Start building impactful products. Where expert challenges meet product craft. November 15-16, 2025 at 42 Paris.",
  keywords: ["hackathon", "product development", "AI tools", "42 Paris", "product builders", "innovation"],
  authors: [{ name: "Hack the Gap" }],
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  openGraph: {
    title: "Hack the Gap | Product Hackathon",
    description: "Start solving challenges that matter. November 15-16, 2025 at 42 Paris.",
    type: "website",
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

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/layouts/Navbar";
import Footer from "@/components/Reusable/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://chipsetsrmrmp.vercel.app"),
  title: {
    default: "CHIPSET | SRM University Ramapuram",
    template: "%s | CHIPSET SRM University Ramapuram"
  },
  description: "Official website of CHIPSET, the technical club of SRM University Ramapuram. Get updates, events, recruitment, and more.",
  keywords: [
    "chipset",
    "SRM University Ramapuram",
    "technical club",
    "SRM Ramapuram",
    "engineering",
    "events",
    "srm",
    "coding",
    "technology"
  ],
  openGraph: {
    title: "CHIPSET | SRM University Ramapuram",
    description: "Official website of CHIPSET, the technical club of SRM University Ramapuram. Get updates, events, recruitment, and more.",
    url: "https://chipsetsrm.vercel.app/",
    siteName: "CHIPSET SRM University Ramapuram",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "CHIPSET Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  alternates: {
    canonical: "https://chipsetsrm.vercel.app/"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scrollbar-none overflow-y-scroll">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />

        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-90LSQWVPVQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-90LSQWVPVQ');
          `}
        </Script>
      </body>
    </html>
  );
}
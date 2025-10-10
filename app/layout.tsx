import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/layouts/Navbar";
import Footer from "@/components/Reusable/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CHIPSET | SRM University Ramapuram",
  description: "CHIPSET is a technical club at SRM University Ramapuram focused on fostering technology, innovation and technical skills among students.",
  keywords: ["CHIPSET", "SRM University", "Ramapuram", "Technical Club", "Technology", "Coding", "Events"],
  authors: [{ name: "CHIPSET Team" }],
  creator: "CHIPSET Team",
  publisher: "CHIPSET",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/logo/chipset_logo.png", type: "image/png" }
    ],
    apple: [
      { url: "/assets/logo/chipset_logo.png" }
    ]
  },
  openGraph: {
    title: "CHIPSET | SRM University Ramapuram",
    description: "Join CHIPSET - The premier technical club at SRM University Ramapuram",
    url: "https://chipsetsrm.vercel.app",
    siteName: "CHIPSET",
    images: [
      {
        url: "/assets/logo/chipset_logo.png",
        width: 1200,
        height: 630,
        alt: "CHIPSET Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://chipsetsrm.vercel.app",
  },
  metadataBase: new URL("https://chipsetsrm.vercel.app"),
};

export default function RootLayout({children,}:
Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html lang="en" className="scrollbar-none overflow-y-scroll">
      <body className={`${inter.className}`}>
        <Navbar/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}

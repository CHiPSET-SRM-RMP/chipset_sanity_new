import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/layouts/Navbar";
import Footer from "@/components/Reusable/Footer";

const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";
import Script from "next/script";
export const metadata: Metadata = {
  title: "CHIPSET",
  description: "CHIPSET | SRM UNIVERSITY RAMAPURAM",
  
};

export default function RootLayout({children,}:
Readonly<{children: React.ReactNode;}>) 
{
  return (
    <>
    <Head>
      <title>CHIPSET</title>
      <meta name="CHIPSET | SRM UNIVERSITY RAMAPURAM" />
      <link rel="icon" href="/favicon.ico" />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-90LSQWVPVQ"></Script>
      <Script id="google-analytics">
        {
          `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-90LSQWVPVQ');`
        }
      </Script>
    </Head>
    <html lang="en" className="scrollbar-none overflow-y-scroll">
      <body className={`${inter.className}`}>
        <Navbar/>
          {children}
        <Footer/>
      </body>
    </html>
    </>
  );
}

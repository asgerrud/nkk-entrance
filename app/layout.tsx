import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NKK Entrance System",
  description: "Web app for issuing guest tickets for Nørrebro Klatreklub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen p-8 m-0 overflow-hidden box-border`}
      >
        {children}
      </body>
    </html>
  );
}

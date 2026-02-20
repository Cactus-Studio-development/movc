import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SileoProvider } from "@/components/sileo-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Osisg PLAYGROUND | Cartelera",
  description: "Cartelera de películas responsive en desarrollo",
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
        <SileoProvider />
      </body>
    </html>
  );
}

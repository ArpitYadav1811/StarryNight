import type { Metadata } from "next";
import { Dancing_Script, Special_Elite } from "next/font/google";
import "./globals.css";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentine's Day - Studio Ghibli Style",
  description: "A beautiful Valentine's Day website inspired by Studio Ghibli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable} ${specialElite.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

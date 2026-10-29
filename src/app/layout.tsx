import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CyberMatrix3D } from "@/components/CyberMatrix3D";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Gaming – Premium Gaming Platform",
  description:
    "Discover, play, and download premium games. Your all-in-one gaming destination with hundreds of browser and PC titles.",
  keywords: ["gaming", "platform", "games", "play", "download", "browser games"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col relative bg-nexus-bg text-nexus-text">
        <CyberMatrix3D />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}


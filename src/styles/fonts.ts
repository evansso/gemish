import { Geist_Mono, Inter_Tight, Urbanist } from "next/font/google";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  preload: true,
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
});

export { urbanist, interTight, geistMono };

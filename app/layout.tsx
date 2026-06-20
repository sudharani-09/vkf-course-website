import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vaibhav Kulkarni Films — Every Wedding Deserves Cinema",
  description:
    "Learn professional wedding film editing, color grading, and cinematic storytelling from Vaibhav Kulkarni. Hands-on mentorship in Pune. Limited to 10 students per batch.",
  keywords: ["wedding filmmaking course", "color grading Pune", "wedding video editing", "Vaibhav Kulkarni Films"],
  openGraph: {
    title: "Vaibhav Kulkarni Films — Every Wedding Deserves Cinema",
    description: "Premium wedding filmmaking mentorship. 10 seats. Pune.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}

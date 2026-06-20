import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./admin-globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Admin — Vaibhav Kulkarni Films",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="admin-body">{children}</body>
    </html>
  );
}

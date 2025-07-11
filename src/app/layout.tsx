import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track and manage your issues efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-montserrat">
        <Navbar />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}

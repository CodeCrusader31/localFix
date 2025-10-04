

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppContextProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LocalFix",
  description:
    "A platform to connect local service providers with customers in need of their services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <AppContextProvider>
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:font-bold focus:rounded-md focus:z-50"
          >
            Skip to content
          </a>

          {/* ✅ Role-based Navbar (Guest / Needer / Provider) */}
          <Navbar />

          {/* ✅ Push page content below navbar */}
          <main id="main-content" className="pt-16 min-h-screen">
            {children}
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}

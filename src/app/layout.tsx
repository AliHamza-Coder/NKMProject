import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ScrollToTop from "@/components/scroll-to-top";
import WhatsAppButton from "@/components/whatsapp-button";
import AuthProvider from "@/components/auth-provider";
import { ShopProvider } from "@/context/ShopContext";
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NKM - Your Fabric Store",
  description: "Discover high-quality fabrics for your next project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ShopProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
            <WhatsAppButton />
            <Toaster position="top-right" />
          </AuthProvider>
        </ShopProvider>
      </body>
    </html>
  );
}

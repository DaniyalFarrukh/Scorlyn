import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageTransition } from "@/components/PageTransition";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scorlyn — Smart LED Scoreboards for Padel",
  description: "Smart LED scoreboards for padel courts with automatic scoring, wireless control, bright outdoor displays and connected software.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-brand-bg)] text-white no-scrollbar">
        <CartProvider>
          <CartDrawer />
          <SmoothScroll>
            <PageTransition>{children}</PageTransition>
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}

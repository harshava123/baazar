import type { Metadata } from "next";
import { Roboto, Staatliches } from "next/font/google";
import Layout from "@/components/layout/Layout";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const staatliches = Staatliches({
  variable: "--font-staatliches",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bazar Story - Every Product Tells a Story",
  description: "Discover unique products with stories from city bazars around the world. Fashion, jewelry, beauty, and more.",
  keywords: ["bazar", "story", "products", "fashion", "jewelry", "beauty", "city bazars"],
  authors: [{ name: "Bazar Story" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${staatliches.variable} font-roboto antialiased`}
      >
        <CartProvider>
          <Layout>
            {children}
          </Layout>
        </CartProvider>
      </body>
    </html>
  );
}

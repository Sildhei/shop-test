import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "./globals.scss";
import { CartProvider } from "./context";
import CartDrawer from "./components/CartDrawer/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop Test",
  description: "Test by Josefina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div>
            <Navbar />
            <CartDrawer />
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

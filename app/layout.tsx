import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "./globals.scss";
import { CartProvider } from "./context";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import { Toaster } from "sonner";

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
          <Toaster
            toastOptions={{
              style: { border: "1px solid #20b04b" },
            }}
          />
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

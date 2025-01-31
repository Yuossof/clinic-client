import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

        className={`${inter.className} antialiased`}
      >
        <div className="w-full flex justify-center">
          <div className="container">
            <div className="translate-y-[35px]">
              <Header />
            </div>
            <main>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

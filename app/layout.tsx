import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "../styles/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../styles/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MANGO",
  description: "prueba técnica mango",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-screen-xl`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

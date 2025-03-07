import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SwitchContextProvider } from "@/context/SwitchContext";
import NavBar from "@/components/NavBar"; // Adjust the import path as needed

const geistSans = localFont({
  src: "./fonts/Geist-Regular.woff",
  variable: "--font-geist-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "AMP Manager Toolkit",
  description: "AMP Manager Toolkit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SwitchContextProvider>
        <body className={`${geistSans.variable} antialiased`}>
          <NavBar />
          {/* Add a wrapper div with consistent top padding for all pages */}
          <main className="pt-16">{children}</main>
        </body>
      </SwitchContextProvider>
    </html>
  );
}

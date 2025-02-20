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
  title: "WDB Template",
  description: "A template for WDB projects!",
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
          {/* Optional: Wrap children with a div to add top padding so content isn't hidden behind the navbar */}
          <div className="pt-18">{children}</div>
        </body>
      </SwitchContextProvider>
    </html>
  );
}

import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SwitchContextProvider } from "@/context/SwitchContext";
import NavBar from "@/components/NavBar"; // Adjust the import path as needed
import { cn } from "@/lib/utils";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
        )}
      >
        <SwitchContextProvider>
          <NavBar />
          {/* Add a wrapper div with consistent top padding for all pages */}
          <main className="pt-16">{children}</main>
        </SwitchContextProvider>
      </body>
    </html>
  );
}

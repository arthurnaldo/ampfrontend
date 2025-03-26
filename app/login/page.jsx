"use client";
import { SessionProvider } from "next-auth/react";
import GoogleOneTap from "@/components/GoogleOneTap";

export default function LoginPage() {
  return (
    <div className="container mx-auto mt-8 flex h-[calc(100vh-8rem)] gap-8">
      <p className="contact-description">Login page</p>
      <SessionProvider>
        <GoogleOneTap />
      </SessionProvider>
    </div>
  );
}

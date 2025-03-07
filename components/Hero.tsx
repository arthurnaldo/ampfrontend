"use client";

import HeroButton from "./HeroButton";

export default function Hero() {
  return (
    <header className="h-screen">
      <div
        className="h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('./assets/bg.jpg')",
        }}
      >
        <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="text-center">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl text-center">
                <span className="font-semibold uppercase tracking-widest text-gray-200">
                  New feature
                </span>
                <h2 className="mb-6 mt-8 text-4xl font-bold text-gray-100 lg:text-5xl">
                  UC Berkeley AMP Manager Toolkit
                </h2>
                <p className="mx-auto mb-10 max-w-3xl text-lg text-gray-300">
                  Empowered by AI Chatbot
                </p>
                <div className="mb-4 flex justify-center gap-4">
                  <HeroButton href="/chat">Chat</HeroButton>
                  <HeroButton href="https://drive.google.com/drive/folders/1CbtIwLPqFw6TG2nQ2t1Cc-tpd0qgpqlv">
                    Orientation
                  </HeroButton>
                  <HeroButton href="/resources">Resources</HeroButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

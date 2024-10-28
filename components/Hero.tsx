"use client";

export default function Hero() {
  return (
    <header>
      <div
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/bg.jpg')",
        }}
      >
        <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 py-12">
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
                <a
                  className="mb-4 inline-block w-full rounded-lg border-2 border-transparent bg-gray-200 px-4 py-2 text-sm font-bold uppercase text-gray-800 transition duration-200 hover:bg-gray-100 md:mr-6 md:w-auto"
                  href="#"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

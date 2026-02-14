import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valentines",
  description: "Valentine's Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-hidden">

        {/* 🎥 Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-20 blur-[1.5px] scale-105 opacity-0 animate-fadeIn"

  

          
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>

        {/* 🌸 Pink Romantic Overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-400/30 via-rose-300/20 to-black/50 backdrop-blur-[2px]" />
        {/* 🌙 Cinematic Vignette */}
        <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,black_80%)] opacity-60" />

        {children}

      </body>
    </html>
  );
}

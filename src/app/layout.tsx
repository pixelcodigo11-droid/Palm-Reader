import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palm Reader | Spiritual Intelligence & Future Prediction",
  description: "All-in-one AI-powered Spiritual Intelligence & Future Prediction Platform. Discover your future, read your palm, and get personalized horoscopes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="animated-bg">
          {/* Simple star effect placeholder */}
          <div className="star" style={{ top: '10%', left: '20%', width: '2px', height: '2px', animationDuration: '3s' }}></div>
          <div className="star" style={{ top: '30%', left: '80%', width: '3px', height: '3px', animationDuration: '4s' }}></div>
          <div className="star" style={{ top: '60%', left: '40%', width: '1px', height: '1px', animationDuration: '2s' }}></div>
          <div className="star" style={{ top: '80%', left: '10%', width: '2px', height: '2px', animationDuration: '5s' }}></div>
          <div className="star" style={{ top: '40%', left: '90%', width: '2px', height: '2px', animationDuration: '3.5s' }}></div>
        </div>
        <nav className="fixed w-full z-50 glass-panel p-4 flex justify-between items-center rounded-none border-t-0 border-l-0 border-r-0">
          <div className="text-2xl font-bold glow-text">Palm Reader</div>
          <div className="space-x-6 hidden md:block">
             <Link href="/" className="hover:text-primary transition">Home</Link>
             <Link href="/palm-scanner" className="hover:text-primary transition">Scanner</Link>
             <Link href="/horoscope" className="hover:text-primary transition">Horoscope</Link>
             <Link href="/compatibility" className="hover:text-primary transition">Compatibility</Link>
             <Link href="/dashboard" className="hover:text-primary transition">Dashboard</Link>
          </div>
          <button className="bg-primary hover:bg-secondary transition px-4 py-2 rounded-full font-semibold">
            Sign In
          </button>
        </nav>
        <main className="pt-24 min-h-screen">
          {children}
        </main>
        <footer className="glass-panel mt-20 p-8 text-center rounded-none border-b-0 border-l-0 border-r-0">
           <p className="text-gray-400">© 2024 Palm Reader AI. All rights reserved.</p>
           <div className="mt-4 space-x-4">
             <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
             <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
           </div>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Outfit, Orbitron } from "next/font/google";
import { PortfolioProvider } from "@/context/PortfolioContext";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orbitfolio | Interactive 3D Portfolio Universe SaaS",
  description: "Create an interactive 3D digital universe where every milestone in your career is represented as a star. Share your cinematic 3D resume with recruiters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${orbitron.variable} min-h-full bg-black text-white`}
    >
      <body className="min-h-full bg-black text-white antialiased">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}

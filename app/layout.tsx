import type { Metadata } from "next";
import { Outfit, Orbitron } from "next/font/google";
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
  title: "Orbitfolio | Interactive 3D Portfolio Universe",
  description: "Step into Orbitfolio, an immersive 3D digital universe where career milestones are represented as glowing stars in a cinematic, cosmic space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${orbitron.variable} h-full overflow-hidden select-none bg-black text-white`}
    >
      <body className="h-full w-full overflow-hidden bg-black antialiased">
        {children}
      </body>
    </html>
  );
}

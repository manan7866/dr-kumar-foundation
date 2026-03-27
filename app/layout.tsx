import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Ghulam Mohammad Kumar Foundation | Cultural Research & Spiritual Legacy",
  description: "Preserving spiritual legacy through structured knowledge. The life, teachings, and enduring vision of Dr. Ghulam Mohammad Kumar presented through research, documentation, and institutional stewardship.",
  keywords: ["spiritual legacy", "cultural foundation", "research institute", "Dr. Ghulam Mohammad Kumar", "Sufi studies", "ethical conduct", "inner discipline"],
  icons: "/dkf_logo_21.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

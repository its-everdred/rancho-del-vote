import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ranked Choice Delegation | Ranked Delegation for DAOs",
  description: "A standard for ranked delegated voting in DAOs that allows token holders to create ordered delegation lists, improving voter participation and reducing vote wastage.",
  keywords: ["DAO", "governance", "delegation", "voting", "blockchain", "Ethereum", "ERC20", "OpenZeppelin"],
  authors: [{ name: "everdred", url: "https://github.com/its-everdred" }],
  creator: "everdred",
  publisher: "Ranked Choice Delegation",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rankeddelegation.com",
    title: "Ranked Choice Delegation | Ranked Delegation for DAOs",
    description: "A standard for ranked delegated voting in DAOs that allows token holders to create ordered delegation lists, improving voter participation and reducing vote wastage.",
    siteName: "Ranked Choice Delegation",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "Ranked Choice Delegation Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranked Choice Delegation | Ranked Delegation for DAOs",
    description: "A standard for ranked delegated voting in DAOs that allows token holders to create ordered delegation lists, improving voter participation and reducing vote wastage.",
    images: ["/logo-512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

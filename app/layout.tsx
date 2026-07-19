import type { Metadata } from "next";
import { DM_Sans, Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["italic"], weight: ["400"] });

const title = "Jai K & Associates — Chartered Accountants";
const description = "Chartered Accountants for tax, audit, compliance and financial advisory services in Chennai, Tamil Nadu.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jaikassociates.in"),
  title,
  description,
  icons: { icon: "/favicon.svg?v=jk" },
  openGraph: { title, description, type: "website", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${dmSans.variable} ${manrope.variable} ${newsreader.variable}`}>{children}</body></html>;
}

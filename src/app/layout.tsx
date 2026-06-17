import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config/site-config";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { WhatsAppFloatButton } from "@/components/whatsapp/whatsapp-float-button";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brand.url),
  title: {
    default: siteConfig.seo.title,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.brand.name }],
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.brand.name,
    locale: siteConfig.seo.locale,
    type: "website",
    url: siteConfig.brand.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/logo-mark@96.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-bg text-fg antialiased">
        <SmoothScroll />
        {children}
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}

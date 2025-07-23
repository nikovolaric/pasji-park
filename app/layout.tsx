import type { Metadata } from "next";
import { Barlow, Zilla_Slab } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | Pasji park Rogaška Slatina",
    default: "Dobrodošli | Pasji park Rogaška Slatina",
  },
  description: "The fastest way to build apps with Next.js and Supabase",
};

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-zilla",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      suppressHydrationWarning
      className={`${barlow.variable} ${zilla.variable} bg-background`}
    >
      <body
        className={`${barlow.className} mx-4 max-w-[1440px] md:mx-8 lg:mx-20 xl:mx-auto xl:px-20`}
      >
        {children}
      </body>
    </html>
  );
}

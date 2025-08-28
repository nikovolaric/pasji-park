import type { Metadata } from "next";
import { Barlow, IBM_Plex_Sans, Zilla_Slab } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/NavMenu";
import { createClient } from "@/lib/supabase/server";

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

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
});

const zilla = Zilla_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-zilla",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  return (
    <html
      lang="sl"
      suppressHydrationWarning
      className={`${barlow.variable} ${zilla.variable} ${ibm.variable} bg-neutral-gray`}
    >
      <body
        className={`${barlow.className} mx-4 mt-9 max-w-[1440px] md:mx-8 lg:mx-20 lg:mt-14 xl:mx-auto xl:px-20`}
      >
        <NavMenu data={data} />
        {children}
      </body>
    </html>
  );
}

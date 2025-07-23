import { Hero } from "@/components/hero";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="flex w-full flex-1 flex-col items-center gap-20">
        <nav className="border-b-foreground/10 flex h-16 w-full justify-center border-b">
          <div className="flex w-full max-w-5xl items-center justify-between p-3 px-5 text-sm">
            <div className="flex items-center gap-5 font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
            </div>
          </div>
        </nav>
        <div className="flex max-w-5xl flex-1 flex-col gap-20 p-5">
          <Hero />
          <main className="flex flex-1 flex-col gap-6 px-4">
            <h2 className="mb-4 text-xl font-medium">Next steps</h2>
          </main>
        </div>
      </div>
    </main>
  );
}

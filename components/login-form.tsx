"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import LinkBtn from "./LinkBtn";
import Button from "./Button";
import ArrowRight from "./icons/ArrowRight";
import { refreshHomepage } from "@/lib/userActions";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      await refreshHomepage();
      router.push("/skupnost");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-14">
      <LinkBtn href="/" variant="terciary" className="self-start">
        Nazaj na domačo stran
      </LinkBtn>
      <div className="grid gap-10 md:mx-auto md:w-2/3 lg:w-full lg:grid-cols-2 lg:gap-5">
        <div className="bg-secondary/25 flex flex-col items-start gap-12 rounded-3xl px-7 py-12 shadow-[1px_1px_4px_rgba(0,0,0,0.25)] xl:py-16">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={153}
            height={50}
            className="h-auto w-38 self-center"
          />
          <p className="font-ibm text-primary text-2xl font-semibold xl:mx-auto xl:w-2/3">
            Prijavi se
          </p>
          <form
            className="flex w-full flex-col gap-8 lg:gap-10 xl:mx-auto xl:w-2/3"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Elektronski naslov*</label>
              <input
                placeholder="Vnesite elektronski naslov"
                className="w-full rounded-3xl border border-black bg-white px-4 py-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Geslo*</label>
              <input
                placeholder="Vnesite geslo"
                type="password"
                className="w-full rounded-3xl border border-black bg-white px-4 py-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <LinkBtn
              variant="text"
              href="/auth/pozabljeno-geslo"
              className="self-end"
            >
              Pozabil/a sem geslo.
            </LinkBtn>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
              <LinkBtn
                variant="alert"
                href="/auth/ustvari-profil"
                className="order-2 text-center lg:order-1 lg:text-left"
              >
                Še niste registrirani?
              </LinkBtn>
              <Button
                variant="primary"
                className="group flex w-full items-center gap-4 pt-1.5 pr-1.5 pb-1.5 lg:order-2 lg:w-fit"
                disabled={isLoading}
              >
                <span className="mx-auto">Prijavi se</span>
                <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
                  <ArrowRight />
                </span>
              </Button>
            </div>
            {error && <p className="text-alert font-medium">{error}</p>}
          </form>
        </div>
        <Image
          src="/signup.jpg"
          alt="Placholder slika"
          height={950}
          width={1730}
          className="h-full min-h-135 w-full rounded-3xl object-cover opacity-65"
        />
      </div>
    </div>
  );
}

"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";
import LinkBtn from "./LinkBtn";
import Image from "next/image";
import Button from "./Button";
import ArrowRight from "./icons/ArrowRight";

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Gesla se ne ujemata");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError(
        "Za uporabo platforme se je potrebno strinjati s pogoji uporabe",
      );
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/zakljuci-profil`,
        },
      });

      if (error) throw error;

      router.push("/auth/sign-up-success");
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
            Registriraj se
          </p>
          <form
            className="flex w-full flex-col gap-8 lg:gap-10 xl:mx-auto xl:w-2/3"
            onSubmit={handleSignUp}
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
              <label className="font-medium">Nastavite geslo za prijavo*</label>
              <input
                placeholder="Vnesite geslo"
                type="password"
                className="w-full rounded-3xl border border-black bg-white px-4 py-2"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Potrdite geslo za prijavo*</label>
              <input
                placeholder="Ponovno vnesite geslo"
                type="password"
                className="w-full rounded-3xl border border-black bg-white px-4 py-2"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <div className="items-cetner flex gap-4">
              <span
                className={`border-primary flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border ${agreeToTerms ? "bg-primary" : "bg-white"}`}
                onClick={() =>
                  setAgreeToTerms((agree) => (!agree ? true : false))
                }
              >
                <Check height={24} className="text-white" />
              </span>
              <div className="flex items-center">
                <label>
                  Prebral/a sem in strinjam se s{" "}
                  <Link href="/pogoji-poslovanja" className="underline">
                    Splošnimi pogoji uporabe
                  </Link>{" "}
                  spletne aplikacije E-kosmatinec.
                </label>
              </div>
            </div>
            <Button
              variant="primary"
              className="group flex items-center gap-4 self-end pt-1.5 pr-1.5 pb-1.5"
              disabled={isLoading}
            >
              Registriraj se
              <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
                <ArrowRight />
              </span>
            </Button>
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

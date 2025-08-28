"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Button from "./Button";
import ArrowRight from "./icons/ArrowRight";
import Image from "next/image";
import LinkBtn from "./LinkBtn";
import { useRouter } from "next/navigation";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/spremeni-geslo`,
      });
      if (error) throw error;
      setSuccess(true);

      setTimeout(function () {
        router.push("/");
      }, 1000);
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
            Pozabljeno geslo
          </p>
          <p className="xl:mx-auto xl:w-2/3">
            Vnesite elektronski naslov za ponastavitev gesla.
          </p>
          <form
            className="flex w-full flex-col gap-8 lg:gap-10 xl:mx-auto xl:w-2/3"
            onSubmit={handleForgotPassword}
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Elektronski naslov*</label>
              <input
                placeholder="Vnesite elektronski naslov"
                className="w-full rounded-3xl border border-black bg-white px-4 py-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              variant="primary"
              className="group flex items-center gap-4 self-end pt-1.5 pr-1.5 pb-1.5"
              disabled={isLoading}
            >
              Pošlji mail za spremembo gesla
              <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
                <ArrowRight />
              </span>
            </Button>
            {error && <p className="text-alert font-medium">{error}</p>}
            {success && (
              <p className="text-alert font-medium">
                Na elektronski naslov boste prejeli nadaljna navodila za
                spremembo gesla.
              </p>
            )}
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

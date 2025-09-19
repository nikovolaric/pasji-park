import { createClient } from "@/lib/supabase/client";
import { X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import LinkBtn from "./LinkBtn";
import { refreshHomepage } from "@/lib/userActions";
import { useRouter } from "next/navigation";
import Button from "./Button";

function MobileNav({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(function () {
    async function getUser() {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (error || !data) return;

      setIsSignedIn(true);
    }

    getUser();
  }, []);

  async function logout() {
    try {
      setIsLoading(true);

      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      await refreshHomepage();
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border-secondary fixed top-0 left-0 z-[999] mx-4 my-4 flex h-[calc(100dvh-32px)] w-[calc(100dvw-32px)] flex-col items-center gap-14 rounded-3xl border bg-white px-10 py-14 text-center md:mx-8 md:w-[calc(100dvw-64px)]">
      <X className="h-6" onClick={() => setIsOpen(false)} />
      <Link href="/storitve-in-trgovine">Storitve in trgovine</Link>
      <Link href="/mali-oglasi">Mali oglasi</Link>
      <Link href="/izobrazevalne-vsebine">Izobraževalne vsebine</Link>
      <Link href="/skupnost">Skupnost</Link>
      {!isSignedIn ? (
        <LinkBtn variant="secondary" href="/auth/login">
          Prijavi se v profil
        </LinkBtn>
      ) : (
        <Button variant="secondary" onClick={logout} disabled={isLoading}>
          Odjavi se iz aplikacije
        </Button>
      )}
    </div>
  );
}

export default MobileNav;

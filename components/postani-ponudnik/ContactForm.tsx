"use client";

import { useState } from "react";
import { H3 } from "../Text";
import Link from "next/link";
import Button from "../Button";
import ArrowRight from "../icons/ArrowRight";
import { sendNewProviderMailAction } from "@/lib/mailActions";

function ContactForm() {
  const [isAgree, setIsAgree] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function handleAction(formData: FormData) {
    try {
      setErr("");
      setMsg("");
      if (!isAgree) {
        throw new Error(
          "Če želite poslati sporočilo se morate strinjati s splošnimi pogoji.",
        );
      }

      const res = await sendNewProviderMailAction(formData);

      if (!res) {
        throw new Error("Nekaj je šlo narobe. Prosimo poiskusite kasneje.");
      }

      setMsg(
        "Uspešno ste poslali sporočilo. V najkrajšem možnem času vam bomo odgovorili.",
      );
    } catch (error) {
      setErr((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-x-5">
      <div className="flex flex-col gap-6 lg:gap-8">
        <H3>
          Kontaktirajte nas in se brezplačno promovirajte na naši platformi!
        </H3>
        <p className="text-black lg:text-lg">
          Z izpolnitvijo kontaktnega obrazca, boste kontaktirali skrbnika
          spletne platforme Pasji park, ki vas bo v čim krajšem času kontaktiral
          in po dogovoru, za vas ustvaril profil ponudnika.
        </p>
      </div>
      <form className="flex flex-col gap-3 lg:gap-4" action={handleAction}>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-5">
          <input
            className="w-full rounded-3xl border border-black bg-white px-4 py-2"
            name="name"
            placeholder="Ime ponudnika oz. trgovine*:"
            required
            autoComplete="off"
          />
          <input
            className="w-full rounded-3xl border border-black bg-white px-4 py-2"
            name="contact_person"
            placeholder="Ime in priimek kontaktne osebe*:"
            required
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-5">
          <input
            className="w-full rounded-3xl border border-black bg-white px-4 py-2"
            name="email"
            placeholder="Elektronski naslov*:"
            required
            autoComplete="off"
          />
          <input
            className="w-full rounded-3xl border border-black bg-white px-4 py-2"
            name="phone"
            placeholder="Telefonska številka:"
            autoComplete="off"
          />
        </div>
        <textarea
          className="min-h-60 w-full rounded-3xl border border-black bg-white px-4 py-2"
          name="message"
          placeholder="Kratek opis storitev, lokacija*:"
          required
          autoComplete="off"
        />
        <div className="flex gap-3">
          <div
            className={`flex h-6 w-6 flex-none cursor-pointer items-center justify-center rounded-md border border-black p-0.5`}
            onClick={() => setIsAgree((isAgree) => !isAgree)}
          >
            <span
              className={isAgree ? "bg-primary h-full w-full rounded-md" : ""}
            />
          </div>
          <p>
            Z izpolnitvijo kontaktnega obrazca se strinjam s{" "}
            <Link href={"/pogoji-poslovanja"} className="underline">
              Splošnimi pogoji poslovanja.
            </Link>
          </p>
        </div>
        {err && <p className="text-alert font-medium">{err} </p>}
        {msg && <p className="text-primary font-medium">{msg}</p>}
        <Button
          variant="primary"
          className="group flex items-center self-end sm:gap-4 sm:pt-1.5 sm:pr-1.5 sm:pb-1.5"
        >
          Pošlji sporočilo
          <span className="tranistion-[rotate] hidden h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0 sm:flex">
            <ArrowRight />
          </span>
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;

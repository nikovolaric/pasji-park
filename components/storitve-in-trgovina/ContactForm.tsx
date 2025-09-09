"use client";

import { useState } from "react";
import { H3 } from "../Text";
import Link from "next/link";
import Button from "../Button";
import ArrowRight from "../icons/ArrowRight";
import { sendEnquiryToProvider } from "@/lib/mailActions";

function ContactForm({ name, email }: { name: string; email: string }) {
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

      formData.append("provider_mail", email);

      const res = await sendEnquiryToProvider(formData);

      if (!res) {
        throw new Error("Nekaj je šlo narobe. Prosimo poiskusite kasneje.");
      }

      setMsg(
        "Uspešno ste poslali sporočilo. Ponudnik vas bo kontaktiral v najkrašem monžem času.",
      );
    } catch (error) {
      setErr((error as Error).message);
    }
  }

  return (
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-x-5">
      <div className="flex flex-col gap-6 lg:gap-8">
        <H3>Kontaktirajte ponudnika {name}</H3>
        <p className="text-black lg:text-lg">
          Z izpolnitvijo kontaktnega obrazca, boste direktno kontaktirali
          želenega ponudnika. Ta vam bo na vaše povpraševanje odgovoril v
          najkrajšem možnem času.
        </p>
      </div>
      <form className="flex flex-col gap-3 lg:gap-4" action={handleAction}>
        <input
          className="w-full rounded-3xl border border-black bg-white px-4 py-2"
          name="name"
          placeholder="Ime in priimek*:"
          required
          autoComplete="off"
        />
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
          placeholder="Napišite sporočilo za ponudnika*:"
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
            <Link href={"/politika-zasebnosti"} className="underline">
              Splošnimi pogoji.
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

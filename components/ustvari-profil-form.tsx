"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import LinkBtn from "./LinkBtn";
import Image from "next/image";
import Button from "./Button";
import ArrowRight from "./icons/ArrowRight";
import { randomInt } from "crypto";

function CreateProfileForm({ user }: { user?: User }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [petName, setPetName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const supabase = createClient();

      if (user && file) {
        const { data } = await supabase.storage
          .from("pasji-park-users")
          .upload(`users/${name}-${randomInt(1, 999)}`, file);

        const { error } = await supabase.from("profiles").insert([
          {
            name,
            pet_name: petName,
            city,
            description,
            owner,
            visible,
            email: user.email,
            user_id: user.id,
            agreeToTerms: true,
            dog_breed: dogBreed,
            img: data?.path,
          },
        ]);

        if (error) throw error;

        router.push("/");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

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
            Zaključi svoj profil
          </p>
          <form
            onSubmit={handleCreateProfile}
            className="flex w-full flex-col gap-8 xl:mx-auto xl:w-2/3"
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Ime</label>
              <input
                type="text"
                placeholder="Ime"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-3xl border border-black bg-white px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Kraj</label>
              <input
                type="text"
                placeholder="Kraj"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-3xl border border-black bg-white px-4 py-2"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-medium">Kratek opis</label>
              <textarea
                className="min-h-50 w-full rounded-3xl border border-black bg-white px-4 py-2"
                placeholder="Kratek opis"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="items-cetner flex gap-4">
              <span
                className={`border-primary flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border ${owner ? "bg-primary" : "bg-white"}`}
                onClick={() => setOwner((owner) => (!owner ? true : false))}
              >
                <Check height={24} className="text-white" />
              </span>
              <div className="flex items-center">
                <label>Sem lastnik psa.</label>
              </div>
            </div>
            {owner && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="font-medium">Ime vašega ljubljenčka</label>
                  <input
                    className="w-full rounded-3xl border border-black bg-white px-4 py-2"
                    type="text"
                    placeholder="Ime vašega ljubljenčka"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-medium">Pasna vašega ljubljenča</label>
                  <input
                    className="w-full rounded-3xl border border-black bg-white px-4 py-2"
                    type="text"
                    placeholder="Pasma vašega ljubljenčka"
                    required
                    value={dogBreed}
                    onChange={(e) => setDogBreed(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className="items-cetner flex gap-4">
              <span
                className={`border-primary flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border ${visible ? "bg-primary" : "bg-white"}`}
                onClick={() =>
                  setVisible((visible) => (!visible ? true : false))
                }
              >
                <Check height={24} className="text-white" />
              </span>
              <div className="flex items-center">
                <label>
                  Želim da se moj profil prikaže na strani Skupnost.
                </label>
              </div>
            </div>
            <input
              type="file"
              id="img"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              hidden
            />
            <label
              htmlFor="img"
              className="border-primary text-primary hover:bg-secondary cursor-pointer self-start rounded-full border px-6 py-2 font-medium transition-all duration-300 hover:shadow-[inset_1px_1px_10px_rgba(0,0,0,0.25)]"
            >
              {file ? file.name : "Naloži profilno fotografijo"}
            </label>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              variant="primary"
              className="group flex items-center gap-4 self-end pt-1.5 pr-1.5 pb-1.5"
              disabled={isLoading}
            >
              Zaključi profil
              <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
                <ArrowRight />
              </span>
            </Button>
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

export default CreateProfileForm;

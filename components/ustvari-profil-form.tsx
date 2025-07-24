"use client";

import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

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
          .upload(`users/${name}-${file.name}`, file);

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

        router.push("/admin");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="border-accent border">
        <CardHeader>
          <CardTitle className="text-2xl">Zaključi profil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProfile}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Ime</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ime"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="city">Kraj</Label>
                </div>
                <Input
                  id="city"
                  type="text"
                  placeholder="Kraj"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="description">Kratek opis</Label>
                </div>
                <textarea
                  className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-32 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="description"
                  placeholder="Kratek opis"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="items-cetner flex gap-4">
                <span
                  className={`border-primary flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border ${owner ? "bg-accent" : "bg-white"}`}
                  onClick={() => setOwner((owner) => (!owner ? true : false))}
                >
                  <Check height={24} className="text-white" />
                </span>
                <div className="flex items-center">
                  <Label>Sem lastnik psa.</Label>
                </div>
              </div>
              {owner && (
                <>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="petName">Ime vašega ljubljenčka</Label>
                    </div>
                    <Input
                      id="petName"
                      type="text"
                      placeholder="Ime vašega ljubljenčka"
                      required
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="dogBreed">Pasna vašega ljubljenča</Label>
                    </div>
                    <Input
                      id="dogBreed"
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
                  className={`border-primary flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border ${visible ? "bg-accent" : "bg-white"}`}
                  onClick={() =>
                    setVisible((visible) => (!visible ? true : false))
                  }
                >
                  <Check height={24} className="text-white" />
                </span>
                <div className="flex items-center">
                  <Label>
                    Želim da se moj profil prikaže na strani poveži se.
                  </Label>
                </div>
              </div>
              <input
                type="file"
                id="img"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                hidden
              />
              <label
                htmlFor="img"
                className="bg-accent2 hover:bg-accent2/80 font-mediuim w-fit cursor-pointer rounded-full px-4 py-1 text-white transition-colors duration-300"
              >
                {file ? file.name : "Naloži profilno fotografijo"}
              </label>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/80 w-full cursor-pointer transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Ustvarjam profil" : "Zaključi profil"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateProfileForm;

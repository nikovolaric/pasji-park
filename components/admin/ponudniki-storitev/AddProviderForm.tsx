"use client";

import { createProvider } from "@/lib/actions";
import { ChevronDown, Save, XIcon } from "lucide-react";
import Image from "next/image";
import { useActionState, useState } from "react";

const categories = ["Veterina", "Pasji salon"];

function AddProviderForm() {
  const [state, formAction,isPending] = useActionState(createProvider, {
    success: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [category, setCategory] = useState<string[]>([]);

  function handleCategory(cat: string) {
    if (category.includes(cat)) {
      setCategory(category.filter((el) => el !== cat));
    } else {
      setCategory([...category, cat]);
    }
    setIsOpenCategories(false);
  }

  return (
    <form className="flex flex-col gap-16" action={formAction}>
      <button
        className="bg-accent hover:bg-accent/80 flex cursor-pointer items-center gap-3 self-end rounded-lg px-6 py-1.5 font-semibold shadow-xs transition-colors duration-200 disabled:cursor-pointer disabled:opacity-20"
        disabled={isPending}
      >
        {isPending ? (
          "..."
        ) : (
          <>
            <Save height={20} />
            Shrani profil
          </>
        )}
      </button>
      {state.error && (
        <p className="self-end font-medium text-red-500">{state.error}</p>
      )}
      <div className="grid grid-cols-[1fr_2fr] gap-x-5">
        <div className="flex flex-col items-center gap-4">
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="slika"
              height={400}
              width={400}
              className="h-auto w-full object-cover"
            />
          ) : (
            <div className="h-100 w-full bg-white opacity-50" />
          )}
          <input
            type="file"
            hidden
            id="coverImg"
            name="coverImg"
            onChange={(e) => setFile(e.target.files![0])}
          />
          <div className="flex items-center gap-2">
            <label
              htmlFor="coverImg"
              className="bg-accent2 hover:bg-accent2/80 cursor-pointer rounded-lg px-6 py-1.5 font-medium text-white shadow-xs transition-colors duration-200"
            >
              {file ? file.name : "Dodaj naslovno fotografijo"}
            </label>
            {file && (
              <XIcon
                height={20}
                className="cursor-pointer text-red-500"
                onClick={() => setFile(null)}
              />
            )}
          </div>
          <input
            type="file"
            multiple
            hidden
            id="imgs"
            name="imgs"
            onChange={(e) => setFiles(e.target.files)}
          />
          {files?.length && files.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {Array.from(files).map((img, i) => (
                <div key={(i + 1) * 100} className="flex flex-col items-center">
                  <Image
                    src={URL.createObjectURL(img)}
                    alt="slika"
                    height={100}
                    width={100}
                    className="h-auto w-full object-cover"
                  />
                  <XIcon
                    className="cursor-pointer text-red-500"
                    onClick={() => {
                      const updatedFiles = Array.from(files).filter(
                        (f) => f.name !== img.name,
                      );

                      const dataTransfer = new DataTransfer();
                      updatedFiles.forEach((file) =>
                        dataTransfer.items.add(file),
                      );

                      if (files.length > 1) {
                        setFiles(dataTransfer.files);
                      } else {
                        setFiles(null);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <label
              htmlFor="imgs"
              className="bg-accent2 hover:bg-accent2/80 cursor-pointer rounded-lg px-6 py-1.5 font-medium text-white shadow-xs transition-colors duration-200"
            >
              {files?.length && files.length > 0
                ? "Zamenjaj ostale fotografije"
                : "Dodaj ostale fotografije"}
            </label>
            {files && (
              <XIcon
                height={20}
                className="cursor-pointer text-red-500"
                onClick={() => setFiles(null)}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Ime ponudnika</label>
            <input
              name="name"
              placeholder="Vnesi ime ponudnika"
              className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Lokacija ponudnika</label>
            <input
              name="location"
              placeholder="Vnesi lokacijo ponudnika"
              className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Elektonski naslov</label>
            <input
              name="email"
              placeholder="Vnesi lokacijo ponudnika"
              className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Telefonska številka</label>
            <input
              name="phone"
              placeholder="Vnesi lokacijo ponudnika"
              className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
              autoComplete="off"
            />
          </div>
          <div className="relative col-span-2 flex flex-col gap-2">
            <label className="font-semibold">Kategorija storitev</label>
            <input name="category" defaultValue={category.join(", ")} hidden />
            <input
              placeholder="Izberi kategorijo storitev"
              className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
              autoComplete="off"
              disabled
              value={category.join(", ")}
            />
            <ChevronDown
              width={20}
              className={`absolute right-8 bottom-2 cursor-pointer ${isOpenCategories ? "rotate-180" : ""}`}
              onClick={() => setIsOpenCategories((el) => !el)}
            />
            {isOpenCategories && (
              <div className="absolute top-full left-0 flex w-full flex-col gap-3 rounded-lg border border-black/20 bg-white px-6 py-4 shadow-xs">
                {categories.map((cat, i) => (
                  <p key={i} className="flex items-center gap-4">
                    <span
                      className={`h-6 w-6 cursor-pointer rounded-lg border border-black/50 ${category.includes(cat) ? "bg-accent" : ""}`}
                      onClick={() => handleCategory(cat)}
                    ></span>
                    {cat}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              placeholder="Opis ponudnika"
              className="h-32 rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Delovni čas</p>
            <div className="flex flex-col gap-1 rounded-xl border border-black/20 bg-white px-4 py-2">
              <div className="flex items-center gap-1">
                <label>Ponedeljek:</label>
                <input name="monday" className="outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label>Torek:</label>
                <input name="tuesday" className="outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label>Sreda:</label>
                <input name="wednesday" className="outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label>Četrtek:</label>
                <input name="thursday" className="outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label>Petek:</label>
                <input name="friday" className="outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label>Sobota:</label>
                <input name="saturday" className="outline-none" />
              </div>
              <div className="flex items-center gap-1">
                <label>Nedelja:</label>
                <input name="sunday" className="outline-none" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Povezava do spletne strani</label>
            <input
              name="website"
              placeholder="Vnesi povezavo do spletne strani"
              className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddProviderForm;

"use client";

import Button from "@/components/Button";
import ArrowRight from "@/components/icons/ArrowRight";
import { deleteOneImage, updateAd } from "@/lib/adsActions";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = ["Psi", "Hrana za pse", "Oprema za pse"];

function EditAdForm({
  ad,
}: {
  ad: {
    id: number;
    created_at: string;
    author: string;
    title: string;
    description: string;
    email: string;
    price: string;
    category: string[];
    coverImg: string;
    imgs: string[];
  };
}) {
  const {
    id,
    created_at,
    author,
    title,
    description,
    email,
    price,
    category: savedCategory,
    coverImg,
    imgs,
  } = ad;

  const [category, setCategory] = useState<string[]>(savedCategory);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [file, setFile] = useState("");
  const [files, setFiles] = useState<string[]>([]);

  function handleCategory(cat: string) {
    if (category.includes(cat)) {
      setCategory(category.filter((el) => el !== cat));
    } else {
      setCategory([...category, cat]);
    }
    setIsOpenCategories(false);
  }

  async function handleAction(formData: FormData) {
    await updateAd(formData, id, imgs);
  }

  return (
    <form
      className="flex flex-col gap-10 xl:mx-auto xl:w-5/6 xl:gap-14"
      action={handleAction}
    >
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-1">
          <label className="font-medium">Avtor oglasa:</label>
          <input defaultValue={author} hidden name="author" />
          <p>{author}</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-medium">Datum objave:</p>
          <p>
            {new Date(created_at).toLocaleDateString("sl-SI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Naslov oglasa</label>
        <input
          className="w-full rounded-3xl border border-black bg-white px-4 py-2"
          name="title"
          placeholder="Na kratko zapišite, kaj prodajate ali podarjate, osnovne lastnosti..."
          autoComplete="off"
          defaultValue={title}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium">Opis</label>
        <textarea
          className="min-h-62 w-full rounded-3xl border border-black bg-white px-4 py-2"
          name="description"
          placeholder="Podrobneje opišite opremo ali izdelek, ki ga prodajate, dodajte morebitno telefonsko številko za kontakt,..."
          defaultValue={description}
        />
      </div>
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-0">
        <div className="flex flex-col gap-2 md:w-3/8 md:shrink-0">
          <label className="font-medium">Cena</label>
          <input
            className="w-full rounded-3xl border border-black bg-white px-4 py-2"
            name="price"
            placeholder="Vnesite ceno v € ali ‘Po dogovoru’"
            autoComplete="off"
            defaultValue={price}
          />
        </div>{" "}
        <div className="flex flex-col gap-2 md:w-3/8 md:shrink-0">
          <label className="font-medium">Elektronski naslov</label>
          <input
            className="w-full rounded-3xl border border-black bg-white px-4 py-2"
            name="email"
            defaultValue={email}
            placeholder="Vnesite kontakni eletronski naslov"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="relative col-span-2 flex flex-col gap-2">
        <label className="font-semibold">Kategorija opreme ali izdelka</label>
        <input name="category" defaultValue={category.join(", ")} hidden />
        <input
          placeholder="Označite lahko več kategorij izdelka ali opreme"
          className="w-full rounded-3xl border border-black bg-white px-4 py-2"
          autoComplete="off"
          disabled
          value={category.join(", ")}
        />
        <span className="bg-secondary absolute right-2 bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
          <ChevronDown
            width={20}
            className={`${isOpenCategories ? "rotate-180" : ""}`}
            onClick={() => setIsOpenCategories((el) => !el)}
          />
        </span>
        {isOpenCategories && (
          <div className="absolute top-full left-0 z-50 flex w-full flex-col gap-3 rounded-lg border border-black/20 bg-white px-6 py-4 shadow-xs">
            {categories.map((cat, i) => (
              <p key={i} className="flex items-center gap-4">
                <span
                  className={`h-6 w-6 cursor-pointer rounded-lg border border-black/50 ${category.includes(cat) ? "bg-primary" : ""}`}
                  onClick={() => handleCategory(cat)}
                ></span>
                {cat}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <p className="font-medium">Naslovna fotografija</p>
        <p>
          Za nalaganje fotografije opreme ali izdelka, kliknite gumb “Naloži
          naslovno fotografijo” in izberite želeno naslovno fotografijo iz vaše
          naprave. Naložite lahko 1 naslovno fotografijo, ki bo prikazana na
          seznamu aktualnih oglasov, na zavihku “Mali oglasi”.
        </p>
        <div>
          <input
            type="file"
            id="coverImg"
            hidden
            accept="image/*"
            name="coverImg"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const maxSize = 2 * 1024 * 1024;

                if (file.size > maxSize) {
                  alert("Datoteka je prevelika! Največ 2MB.");
                  e.target.value = "";
                  return;
                }

                setFile(file.name);
              }
            }}
          />
          {file || coverImg ? (
            coverImg ? (
              <div className="flex items-center gap-10">
                <p className="font-medium">{coverImg}</p>
                <button
                  className="text-primary cursor-pointer font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteOneImage(coverImg);
                  }}
                >
                  Odstrani datoteko
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-10">
                <p className="font-medium">{file}</p>
                <button
                  className="text-primary cursor-pointer font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    setFile("");
                  }}
                >
                  Odstrani datoteko
                </button>
              </div>
            )
          ) : (
            <label
              htmlFor="coverImg"
              className="bg-secondary text-primary hover:bg-primary cursor-pointer self-start rounded-full px-6 py-2 font-medium shadow-[1px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:text-white hover:shadow-[inset_1px_1px_10px_rgba(0,0,0,0.25)]"
            >
              Naloži naslovno fotografijo
            </label>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <p className="font-medium">Ostale fotografije</p>
        <p>
          Za nalaganje fotografij opreme ali izdelka, kliknite gumb “Naloži
          ostale fotografije” in izberite želene fotografije iz vaše naprave.
          Naložite lahko do 5 fotografij.
        </p>
        {(imgs?.length ?? 0) > 0 && (
          <div className="flex flex-col gap-4">
            {imgs.map((el) => (
              <div key={el} className="flex items-center gap-10">
                <p className="font-medium">{el}</p>
                <button
                  className="text-primary cursor-pointer font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteOneImage(el);
                  }}
                >
                  Odstrani datoteko
                </button>
              </div>
            ))}
          </div>
        )}
        <div>
          <input
            type="file"
            id="imgs"
            name="imgs"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                const uploadedFiles = Array.from(e.target.files);

                if (uploadedFiles.length > 5) {
                  alert("Lahko naložiš največ 5 fotografij!");
                  e.target.value = "";
                  return;
                }

                const maxSize = 2 * 1024 * 1024;
                for (const file of uploadedFiles) {
                  if (file.size > maxSize) {
                    alert(`Datoteka ${file.name} je prevelika (max 2MB).`);
                    e.target.value = "";
                    return;
                  }
                }

                setFiles(uploadedFiles.map((f) => f.name));
              }
            }}
          />
          {files.length > 0 ? (
            <div className="flex flex-col gap-4">
              {files.map((el) => (
                <div key={el} className="flex items-center gap-10">
                  <p className="font-medium">{el}</p>
                  <button
                    className="text-primary cursor-pointer font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      setFiles(files.filter((f) => f !== el));
                    }}
                  >
                    Odstrani datoteko
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <label
              htmlFor="imgs"
              className="bg-secondary text-primary hover:bg-primary cursor-pointer self-start rounded-full px-6 py-2 font-medium shadow-[1px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:text-white hover:shadow-[inset_1px_1px_10px_rgba(0,0,0,0.25)]"
            >
              Naloži ostale fotografije
            </label>
          )}
        </div>
      </div>
      <Button
        variant="primary"
        className="flex items-center gap-4 self-end pt-1.5 pr-1.5 pb-1.5"
      >
        Uredi oglas
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <ArrowRight />
        </span>
      </Button>
    </form>
  );
}

export default EditAdForm;

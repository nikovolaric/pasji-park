"use client";

import { useRouter } from "next/navigation";
import Search from "../icons/Search";
import { ChevronDown, XCircle } from "lucide-react";
import Location from "../icons/Location";
import { useEffect, useState } from "react";
import FilterIcon from "@/components/icons/Filter";

const categories = ["Veterina", "Pasji salon", "Pasji hotel", "Trgovina"];
const cities = [
  "Rogaška Slatina",
  "Šmarje pri Jelšah",
  "Podčetrtek",
  "Rogatec",
  "Kozje",
  "Bistrica ob Sotli",
];

function Filter() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  useEffect(
    function () {
      const params = new URLSearchParams();

      if (name) params.append("name", name);
      if (city) params.append("city", city);
      if (category) params.append("category", category);

      router.replace(`/storitve-in-trgovine?${params.toString()}`, {
        scroll: false,
      });
    },
    [name, city, category],
  );

  function handleChange(str: string) {
    setName(str);
  }

  return (
    <div className="grid gap-5 lg:mx-auto lg:w-2/3 xl:w-full xl:grid-cols-[2fr_1fr_1fr]">
      <div className="flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2">
        <Search />
        <input
          className="grow outline-none"
          placeholder="Išči med ponudniki"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="relative flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2">
        <Location />
        <p className="flex h-3 grow items-center gap-2">
          {city || "Izberi lokacijo"}
          {city && (
            <XCircle
              className="cursor-pointer stroke-1"
              onClick={() => setCity("")}
            />
          )}
        </p>
        <button
          className="text-primary hover:shadow[inset_1px_1px_10px_rgba(0,0,0,0.25)] bg-secondary hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-medium shadow-[1px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:text-white"
          onClick={() => setIsOpenCity((isOpen) => !isOpen)}
        >
          <ChevronDown
            className={`${isOpenCity ? "rotate-180" : ""} transition-all duration-150`}
          />
        </button>
        {isOpenCity && (
          <div className="border-secondary absolute top-full left-0 z-50 flex w-full flex-col items-start gap-4 rounded-3xl border bg-white p-5">
            {cities.map((el) => (
              <button
                key={el}
                onClick={() => {
                  setIsOpenCity(false);
                  setCity(el);
                }}
                className="cursor-pointer"
              >
                {el}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2">
        <FilterIcon />
        <p className="flex h-3 grow items-center gap-2">
          {category || "Izberi kategorijo"}
          {category && (
            <XCircle
              className="cursor-pointer stroke-1"
              onClick={() => setCategory("")}
            />
          )}
        </p>
        <button
          className="text-primary hover:shadow[inset_1px_1px_10px_rgba(0,0,0,0.25)] bg-secondary hover:bg-primary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-medium shadow-[1px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:text-white"
          onClick={() => setIsOpenCategory((isOpen) => !isOpen)}
        >
          <ChevronDown
            className={`${isOpenCategory ? "rotate-180" : ""} transition-all duration-150`}
          />
        </button>
        {isOpenCategory && (
          <div className="border-secondary absolute top-full left-0 z-50 flex w-full flex-col items-start gap-4 rounded-3xl border bg-white p-5">
            {categories.map((el) => (
              <button
                key={el}
                onClick={() => {
                  setIsOpenCategory(false);
                  setCategory(el);
                }}
                className="cursor-pointer"
              >
                {el}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;

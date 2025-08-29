"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function Gallery({
  coverImg,
  imgs,
}: {
  coverImg: string;
  imgs: string[] | null;
}) {
  const [curImg, setCurImg] = useState("");

  return (
    <div className="relative flex w-full flex-col gap-4">
      <Image
        src={coverImg}
        alt="Slika oglasa"
        height={410}
        width={630}
        className="h-66 w-full cursor-pointer rounded-3xl object-cover lg:h-102"
        onClick={() => setCurImg(coverImg)}
      />
      <div className="grid grid-cols-3 gap-x-4">
        {imgs &&
          imgs
            .slice(0, 2)
            .map((img) => (
              <Image
                key={img}
                src={img}
                alt="Slika oglasa"
                width={200}
                height={150}
                className="h-25 w-full cursor-pointer rounded-3xl object-cover lg:h-38"
                onClick={() => setCurImg(img)}
              />
            ))}
      </div>
      {curImg && (
        <div className="fixed top-0 left-0 z-40 flex h-dvh w-dvw flex-col gap-6 bg-black/50">
          <Image
            src={curImg}
            alt="Izbrana slika"
            className="mx-4 mt-20 h-auto max-h-[65dvh] w-auto object-cover md:mx-8 lg:mx-20 xl:mx-auto xl:mt-25 xl:max-w-[1280px]"
            height={1440}
            width={900}
          />
          <div className="mx-4 grid grid-cols-3 gap-x-4 gap-y-4 md:mx-8 md:grid-cols-6 lg:mx-20 xl:mx-auto xl:max-w-[1280px]">
            {(imgs ? [coverImg, ...imgs] : [coverImg]).map((el) => (
              <Image
                key={el}
                src={el}
                alt="Ostale slike"
                height={110}
                width={110}
                className="h-25 w-full cursor-pointer object-cover"
                onClick={() => setCurImg(el)}
              />
            ))}
          </div>
          <X
            className="absolute top-6 right-10 h-6 cursor-pointer text-white"
            onClick={() => setCurImg("")}
          />
        </div>
      )}
    </div>
  );
}

export default Gallery;

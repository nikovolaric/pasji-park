"use state";

import Image from "next/image";

function Gallery({
  coverImg,
  imgs,
}: {
  coverImg: string;
  imgs?: string[] | null;
}) {
  return (
    <>
      <Image
        src={coverImg}
        alt={coverImg}
        width={630}
        height={410}
        className="h-56 w-full rounded-3xl object-cover lg:h-102"
      />
      {!imgs ? (
        <div className="h-25 lg:h-35" />
      ) : (
        <div className="grid grid-cols-3 gap-x-5">
          {imgs.slice(0, 2).map((el) => (
            <Image
              src={el}
              alt={el}
              height={142}
              width={197}
              className="h-25 w-full rounded-3xl object-cover lg:h-25"
              key={el}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Gallery;

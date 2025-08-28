import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import LinkBtn from "./LinkBtn";
import { H1, H2 } from "./Text";
import ArrowRight from "./icons/ArrowRight";

function PageHero({
  children,
  img,
  title,
  href,
  btn,
}: {
  children: ReactNode;
  img: StaticImageData;
  title: string;
  href: string;
  btn: string;
}) {
  return (
    <div className="relative mt-14 max-h-104 min-h-75 px-6 pt-4 pb-10 lg:mt-20 lg:px-8 lg:pt-6 lg:pb-39">
      <Image
        src={img}
        alt="Slika ozadja"
        fill
        sizes="100vw"
        className="rounded-3xl object-cover opacity-50"
      />
      <div className="relative flex flex-col items-center gap-4 text-center lg:gap-12">
        <LinkBtn
          href={href}
          variant="primary"
          className="group mb-8 flex items-center gap-4 self-start pt-1.5 pr-1.5 pb-1.5 lg:mb-9"
        >
          {btn}
          <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
            <ArrowRight />
          </span>
        </LinkBtn>
        <H1>{title}</H1>
        <H2>{children}</H2>
      </div>
    </div>
  );
}

export default PageHero;

import { getProviderImage, getProviderImages } from "@/lib/providerActions";
import Building from "../icons/Building";
import Location from "../icons/Location";
import Message from "../icons/Message";
import Phone from "../icons/Phone";
import Timer from "../icons/Timer";
import { H3 } from "../Text";
import Gallery from "./Gallery";
import LinkBtn from "../LinkBtn";
import ArrowRight from "../icons/ArrowRight";

async function ProviderInfo({
  provider,
}: {
  provider: {
    name: string;
    location: string;
    category: string[];
    description: string;
    email: string;
    phone: string;
    website: string;
    coverImg: string;
    imgs: string[] | null;
    openingTime: Record<string, string>;
  };
}) {
  const {
    name,
    location,
    category,
    description,
    email,
    phone,
    website,
    coverImg,
    imgs,
    openingTime,
  } = provider;

  const coverImgUrl = await getProviderImage(coverImg);
  const imgUrls = await getProviderImages(imgs);

  return (
    <div className="grid gap-8 md:mx-auto md:w-2/3 lg:w-full lg:grid-cols-2 lg:gap-x-5 lg:gap-y-11">
      <H3>{name}</H3>
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="flex flex-col gap-4 rounded-3xl bg-white px-3 py-6 lg:flex-row lg:gap-6 lg:p-6">
          <div className="bg-secondary/35 flex h-10 w-10 flex-none items-center justify-center rounded-full">
            <Building />
          </div>
          <p className="whitespace-pre-line">{description}</p>
        </div>
        <div className="flex flex-col gap-8 rounded-3xl bg-white px-3 py-6 lg:gap-10 lg:p-6">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="bg-secondary/35 flex h-10 w-10 flex-none items-center justify-center rounded-full">
              <Location />
            </div>
            <p className="whitespace-pre-line">{location}</p>
          </div>
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:gap-x-5">
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="bg-secondary/35 flex h-10 w-10 flex-none items-center justify-center rounded-full">
                <Message />
              </div>
              <p className="whitespace-pre-line">{email}</p>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
              <div className="bg-secondary/35 flex h-10 w-10 flex-none items-center justify-center rounded-full">
                <Phone />
              </div>
              <p className="whitespace-pre-line">{phone}</p>
            </div>
          </div>
          <div className="flex gap-4 lg:gap-6">
            <div className="bg-secondary/35 flex h-10 w-10 flex-none items-center justify-center rounded-full">
              <Timer />
            </div>
            <ul className="flex w-2/3 flex-col gap-3 lg:w-1/2">
              <li className="flex justify-between">
                Ponedeljek <span>{openingTime.monday || "Zaprto"}</span>
              </li>
              <li className="flex justify-between">
                Torek <span>{openingTime.tuesday || "Zaprto"}</span>
              </li>
              <li className="flex justify-between">
                Sreda <span>{openingTime.wednesday || "Zaprto"}</span>
              </li>
              <li className="flex justify-between">
                Četrtek <span>{openingTime.thursday || "Zaprto"}</span>
              </li>
              <li className="flex justify-between">
                Petek <span>{openingTime.friday || "Zaprto"}</span>
              </li>
              <li className="flex justify-between">
                Sobota <span>{openingTime.saturday || "Zaprto"}</span>
              </li>
              <li className="flex justify-between">
                Nedelja <span>{openingTime.sunday || "Zaprto"}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col gap-5">
        <Gallery coverImg={coverImgUrl!} imgs={imgUrls} />
        <div className="absolute top-2 left-2 z-20">
          {category.map((el) => (
            <p
              key={el}
              className="bg-neutral-gray rounded-full px-4 py-2 font-light text-black shadow-[1px_1px_4px_rgba(0,0,0,0.25)]"
            >
              {el}
            </p>
          ))}
        </div>
      </div>
      <LinkBtn
        href={`${website.startsWith("https://") ? website : `https://${website}`}`}
        variant="secondary"
        className="group flex w-full items-center gap-4 pt-1.5 pr-1.5 pb-1.5 lg:col-start-2 lg:row-start-1 lg:w-fit lg:justify-self-end"
        target="_blank"
      >
        <span className="mx-auto">Obišči spletno stran</span>
        <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center self-end rounded-full bg-white duration-200 group-hover:rotate-0">
          <ArrowRight />
        </span>
      </LinkBtn>
    </div>
  );
}

export default ProviderInfo;

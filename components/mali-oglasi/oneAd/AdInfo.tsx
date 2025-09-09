import { getAdImage, getAdImags } from "@/lib/adsActions";
import Gallery from "./Gallery";
import Piggy from "@/components/icons/Piggy";
import Paw from "@/components/icons/Paw";
import Location from "@/components/icons/Location";
import Message from "@/components/icons/Message";

async function AdInfo({
  ad,
}: {
  ad: {
    author: string;
    created_at: string;
    coverImg: string;
    imgs: string[];
    price: string;
    description: string;
    city: string;
    email: string;
    title: string;
    category: string[];
  };
}) {
  const {
    title,
    author,
    city,
    coverImg,
    created_at,
    imgs,
    price,
    description,
    email,
    category,
  } = ad;

  const coverImgUrl = await getAdImage(coverImg);
  const imgsUrls = await getAdImags(imgs);

  function formatPrice() {
    const cleaned = price.replace(/[^\d,.-]/g, "").replace(",", ".");

    const num = parseFloat(cleaned);

    return isNaN(num)
      ? "Cena po dogovoru"
      : new Intl.NumberFormat("sl-SI", {
          style: "currency",
          currency: "EUR",
        }).format(num);
  }

  return (
    <div className="mb-40 flex flex-col gap-8">
      <h1 className="text-primary font-ibm text-2xl font-bold">{title}</h1>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <p>
          <span className="font-medium">Avtor oglasa: </span>
          {author}
        </p>
        <p>
          <span className="font-medium">Datum objave: </span>
          {new Date(created_at).toLocaleDateString("sl-SI", {
            day: "2-digit",
            year: "numeric",
            month: "2-digit",
            timeZone: "Europe/Ljubljana",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-x-5">
        <Gallery coverImg={coverImgUrl!} imgs={imgsUrls!} category={category} />
        <div className="flex flex-col gap-4 lg:gap-6">
          <div className="flex items-center gap-4 rounded-3xl bg-white p-4 lg:gap-6 lg:p-6">
            <span className="bg-secondary/35 flex h-10 w-10 items-center justify-center rounded-full">
              <Piggy />
            </span>
            <p className="font-semibold lg:text-lg">{formatPrice()}</p>
          </div>
          <div className="flex gap-4 rounded-3xl bg-white p-4 lg:gap-6 lg:p-6">
            <span className="bg-secondary/35 flex h-10 w-10 items-center justify-center rounded-full">
              <Paw />
            </span>
            <p className="whitespace-pre-line">{description}</p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white p-4 lg:gap-6 lg:p-6">
            <span className="bg-secondary/35 flex h-10 w-10 items-center justify-center rounded-full">
              <Location />
            </span>
            <p>{city}</p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white p-4 lg:gap-6 lg:p-6">
            <span className="bg-secondary/35 flex h-10 w-10 items-center justify-center rounded-full">
              <Message />
            </span>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdInfo;

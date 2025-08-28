import Image from "next/image";
import img from "@/public/bgdot.jpg";
import FAQCard from "./FAQCard";

const data = [
  {
    q: "01 Ali platformo lahko uporabljam brez registracije?",
    a: "Da, osnovne vsebine so dostopne neregistriranim uporabnikom. Za dodajanje oglasov in povezovanje z drugimi lastniki psov, je potrebna registracija.",
  },
  {
    q: "02 Ali je uporaba platforme e-kosmatinec brezplačna?",
    a: "Da, uporaba platforme je popolnoma brezplačna tako za končne uporabnike kot tudi za ponudnike.",
  },
  {
    q: "03 Kako poteka povezovanje s trgovinami in ponudniki storitev za kosmatince?",
    a: "Vsak naveden ponudnik ima objavljeno telefonsko številko in e-poštni kontakt. Prav tako jih je mogoče kontaktirati preko objavljenega obrazca.",
  },
  {
    q: "04 Kako se povežem z ostalimi lastniki psov?",
    a: "Registrirani uporabniki si ustvarijo profil s čemer pridobijo dostop do seznama ostalih uporabnikov. Na vsakem profilu je naveden kontakt za komunikacijo.",
  },
  {
    q: "05 Kdo stoji za platformo e-kosmatinec?",
    a: "Upravitelj platforme je MPI Vrelec d.o.o.",
  },
];

function FAQ() {
  return (
    <div className="relative mt-10 ml-[calc(-50vw+50%)] h-fit min-h-154 w-dvw rounded-4xl py-10 lg:ml-0 lg:w-full lg:pt-25 lg:pb-14">
      <Image
        src={img}
        alt="Slika ozadja"
        fill
        sizes="100dvw"
        className="object-cover"
      />
      <div className="relative mx-4 md:mx-8 lg:mx-auto">
        <h3 className="text-primary font-ibm mb-14 text-center text-2xl font-bold lg:mb-16 lg:text-[32px]">
          Odgovori na vaša najpogostejša vprašanja
        </h3>
        <div className="flex flex-col gap-6 lg:mx-auto lg:w-3/4 lg:gap-8 xl:w-2/3">
          {data.map((el) => (
            <FAQCard key={el.q} q={el.q} a={el.a} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;

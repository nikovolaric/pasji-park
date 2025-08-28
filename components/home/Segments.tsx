import Image from "next/image";
import LinkBtn from "../LinkBtn";

const data = [
  {
    title: "Trgovine in ponudniki storitev za pse",
    text: (
      <>
        Obsotelje in Kozjansko ponujata ogromno ponudnikov, ki bodo vašemu psu
        omogočili še kakovostnejše življenje. <br />
        <br />
        Na naši platformi se lahko povežete s trgovinami s pripomočki, hrano in
        vsem potrebnim za veselo pasje življenje, prav tako pa lahko
        kontaktirate ponudnike različnih storitev - vse od pasjih salonov do
        veterinarskih klinik.
      </>
    ),
    btn: "Oglejte si več o ponudnikih",
    img: "/vethome.jpg",
    href: "/storitve-in-trgovine",
  },
  {
    title: "Mali oglasi",
    text: (
      <>
        Ste že kdaj razmišljali kam s pripomočki, ki jih je vaš ljubljenček že
        prerastel ali pa jih imate enostavno preveč in bi želeli nekaj podariti
        ali prodati drugim? <br />
        <br />
        Na naši platformi lahko enostavno objavite oglas in se povežete s
        tistimi, pri katerih boo vaše rabljene stvari dobile novo življenje.
      </>
    ),
    btn: "Išči po malih oglasih",
    img: "/toyshome.jpg",
    href: "/mali-oglasi",
  },
  {
    title: "Povezovanje z drugimi psmi in lastniki",
    text: (
      <>
        Naša skupnost omogoča, da se spoznate z drugimi lastniki psov v svoji
        bližini – za skupne sprehode, izmenjavo izkušenj ali preprosto pasje
        klepete. <br />
        <br />
        Enostavno ustvarite profil, kjer delite informacije o sebi in svojem
        kužku, ter se povežete z drugimi s podobnimi interesi. Verjamemo, da je
        vsak pogovor lahko začetek novega prijateljstva – pasjega ali
        človeškega.
      </>
    ),
    btn: "Začni se povezovati",
    img: "/parkhome.jpg",
    href: "/skupnost",
  },
  {
    title: "Izobraževalne vsebine",
    text: (
      <>
        Biti odgovoren pasji skrbnik pomeni tudi stalno učenje, zato bomo za vas
        skrbno pripravljali članke, video vsebine, nasvete strokovnjakov in
        praktične vodiče – vse na enem mestu. <br />
        <br />
        Odkrijte, kako bolje razumeti pasje vedenje, kaj potrebuje vaš kuža v
        različnih življenjskih obdobjih, in kako zanj izbrati najboljše. Vsebine
        so kratke, jasne in uporabne – za začetnike in izkušene pasjeljubce.
      </>
    ),
    btn: "Preberi nove vsebine",
    img: "/learnhome.jpg",
    href: "/izobrazevalne-vsebine",
  },
];

function Segments() {
  return (
    <>
      {data.map((el, i) => (
        <div
          key={(i + 1) * 100}
          className="flex flex-col gap-8 md:mx-auto md:w-2/3 lg:grid lg:w-full lg:grid-cols-2 lg:items-center lg:gap-x-5 xl:grid-cols-[5fr_2fr_5fr]"
        >
          <Image
            src={el.img}
            alt={el.title}
            height={410}
            width={630}
            className={`h-auto min-h-56 w-full rounded-3xl object-cover shadow-[2px_2px_10px_rgba(0,0,0,0.25)] xl:min-h-90 ${i % 2 === 0 ? "" : "lg:order-2 xl:order-3 xl:col-start-3"}`}
          />
          <div
            className={`flex flex-col gap-8 lg:gap-10 ${i % 2 === 0 ? "xl:col-start-3" : "lg:order-1"}`}
          >
            <h2 className="font-ibm text-primary text-xl font-bold lg:text-2xl">
              {el.title}
            </h2>
            <p className="text-black">{el.text}</p>
            <LinkBtn variant="secondary" href={el.href} className="self-end">
              Oglejte si več o ponudnikih
            </LinkBtn>
          </div>
        </div>
      ))}
    </>
  );
}

export default Segments;

import Image from "next/image";
import LinkBtn from "../LinkBtn";
import ArrowRight from "../icons/ArrowRight";

const data = [
  {
    title:
      "Kako deluje spletna aplikacija e-kosmatinec in zakaj se je potrebno registrirati?",
    text: (
      <>
        Platforma deluje kot središče za vse ljubitelje psov – omogoča pregled
        lokalnih ponudnikov storitev in trgovin, dostop do izobraževalnih
        vsebin, objavo oglasov z rabljeno opremo ter povezovanje z drugimi
        lastniki psov v tvoji bližini. Gostje si lahko osnovne vsebine ogledate
        brez registracije, a z ustvarjenim profilom se odklenejo vse možnosti –
        od aktivnega sodelovanja v skupnosti do dodajanja oglasov. <br />
        <br />
        Uporaba je preprosta: ustvarite profil, raziščete vsebino, poiščete
        storitve ali izdelke, objavite oglas ali poiščete druge pasje lastnike.
      </>
    ),
    btn: "Registriraj se",
    img: "/howhome.jpg",
    href: "/auth/ustvari-profil",
  },
  {
    title: "Soustvarjajte ponudbo na e-kosmatincu!",
    text: (
      <>
        Ste del lokalne ponudbe za pse – veterinar, pasji frizer, pasji hotel,
        trgovina z opremo ali druga storitev, namenjena pasjim prijateljem?
        Pridružite se platformi in brezplačno predstavite svojo dejavnost vsem
        uporabnikom iz regije! <br />
        <br />
        Če prihajate iz Kozjanskega ali Obsotelja, vas z veseljem vključimo v
        seznam ponudnikov. Preprosto nas kontaktirajte preko obrazca, kjer nam
        sporočite osnovne podatke, mi pa vam nato pošljemo vse potrebne
        informacije za vključitev.
        <br />
        <br />
        Skupaj zgradimo podporno skupnost za vse pasjeljubce!
      </>
    ),
    btn: "Postani ponudnik",
    img: "/collabhome.jpg",
    href: "/postani-ponudnik",
  },
];

function AboutApp() {
  return (
    <>
      {data.map((el, i) => (
        <div
          key={(i + 2) * 100}
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
            <LinkBtn
              variant="primary"
              href={el.href}
              className="group flex items-center gap-4 self-end pt-1.5 pr-1.5 pb-1.5"
            >
              {el.btn}
              <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
                <ArrowRight />
              </span>
            </LinkBtn>
          </div>
        </div>
      ))}
    </>
  );
}

export default AboutApp;

import Community from "../icons/Community";
import Recycle from "../icons/Recycle";
import Search from "../icons/Search";
import Users from "../icons/Users";

const data = [
  {
    icon: <Search />,
    title: "Vse na enem mestu",
    text: "Veterinar, oprema, znanje in pasji prijatelji – pri nas najdeš vse, kar tvoj kuža potrebuje.",
  },
  {
    icon: <Recycle />,
    title: "Ponovno uporabljena oprema",
    text: "Ohrani svet bolj pasje prijazen – kupuj, prodajaj ali podari rabljeno opremo odgovorno.",
  },
  {
    icon: <Users />,
    title: "Skupnost, ki razume",
    text: "Poveži se z drugimi skrbniki psov. Deli izkušnje, nasvete in skupne sprehode.",
  },
  {
    icon: <Community />,
    title: "Podpora lokalnim ponudnikom",
    text: "Z izbiro storitev iz svoje okolice pomagaš ohranjati lokalno ponudbo in spodbujaš manjše ponudnike.",
  },
];

function WhyUs() {
  return (
    <div>
      <h1 className="text-primary font-ibm mb-14 text-center text-2xl font-bold lg:mb-16 lg:text-[32px]">
        Zakaj uporabljati spletno aplikacijo e-kosmatinec?
      </h1>
      <div className="flex flex-col gap-8 sm:mx-auto sm:w-2/3 md:grid md:w-full md:grid-cols-2 md:gap-x-5 md:gap-y-6 lg:w-3/4 xl:w-full xl:grid-cols-4">
        {data.map((el, i) => (
          <div
            key={(i + 1) * 1000}
            className="mx-auto flex w-9/10 flex-col gap-6 rounded-3xl bg-white px-6 py-8 text-center shadow-[1px_1px_4px_rgba(0,0,0,0.25)] md:w-full"
          >
            <span className="bg-secondary flex h-12 w-12 items-center justify-center self-center rounded-full">
              {el.icon}
            </span>
            <p className="font-ibm text-primary font-semibold">{el.title}</p>
            <p>{el.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyUs;

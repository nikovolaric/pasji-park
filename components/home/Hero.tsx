import img from "@/public/bgdot.jpg";
import Image from "next/image";
import LinkBtn from "../LinkBtn";
import ArrowRight from "../icons/ArrowRight";

function Hero() {
  return (
    <div className="relative mt-10 ml-[calc(-50vw+50%)] h-fit min-h-154 w-dvw rounded-4xl py-10 lg:ml-0 lg:w-full lg:pt-25 lg:pb-14">
      <Image
        src={img}
        alt="Slika ozadja"
        fill
        sizes="100dvw"
        className="object-cover"
      />
      <div className="relative mx-4 flex flex-col gap-12 md:mx-8 lg:mx-auto lg:grid lg:grid-cols-[7fr_5fr] lg:gap-x-10">
        <div className="flex flex-col gap-8 lg:gap-10 xl:w-9/10">
          <h1 className="text-primary font-ibm text-[28px] font-bold lg:text-[40px]">
            Dobrodošli na platformi, ki povezuje pse, njihove lastnike in
            ponudnike storitev.
          </h1>
          <p className="text-lg lg:text-xl">
            Pridružite se nam in se povežite z drugimi lastniki kosmatincev,
            kontaktirajte lokalne ponudnike storitev, raziskujte male oglase ter
            se izobražujte o svojemu kosmatincu.
          </p>
          <div className="flex items-center gap-2 lg:gap-8">
            <LinkBtn
              href="/auth/ustvari-profil"
              variant="primary"
              className="group flex items-center sm:gap-4 sm:pt-1.5 sm:pr-1.5 sm:pb-1.5"
            >
              Ustvari profil
              <span className="tranistion-[rotate] hidden h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0 sm:flex">
                <ArrowRight />
              </span>
            </LinkBtn>
            <LinkBtn href="/auth/login" variant="terciary" className="group">
              Prijavi se v svoj profil
            </LinkBtn>
          </div>
        </div>
        <Image
          src="/hero.jpg"
          alt="Slika psa z lastnikom"
          width={500}
          height={500}
          className="h-120 w-full rounded-3xl object-cover shadow-[2px_2px_10px_rgba(0,0,0,0.25)] md:mx-auto md:w-3/4 lg:w-full xl:mx-0 xl:w-9/10"
        />
      </div>
    </div>
  );
}

export default Hero;

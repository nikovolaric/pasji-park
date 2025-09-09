import PageHero from "@/components/PageHero";
import { Metadata } from "next";
import img from "@/public/postani.jpg";
import ContactForm from "@/components/postani-ponudnik/ContactForm";

export const metadata: Metadata = {
  title: "Postani ponudnik",
};

function Page() {
  return (
    <>
      <PageHero
        title="Ste ponudnik storitev ali pasja trgovina v Obsotelju in Kozjanskem?"
        img={img}
      >
        Za pridružitev platformi, izpolnite kontaktni obrazec, mi pa vas bomo
        kontaktirali v najkrajšem času.
      </PageHero>
      <div className="relative mt-14 mb-35 flex flex-col gap-10 lg:mt-20 lg:mb-40 lg:gap-14">
        <ContactForm />
      </div>
    </>
  );
}

export default Page;

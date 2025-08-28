import AboutApp from "@/components/home/AboutApp";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Segments from "@/components/home/Segments";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Segments />
        <WhyUs />
        <AboutApp />
        <FAQ />
      </main>
    </>
  );
}

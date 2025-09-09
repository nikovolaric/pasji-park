import { H1 } from "@/components/Text";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Piškotki",
};

function Page() {
  return (
    <div className="mt-14 mb-35 lg:mt-30 lg:mb-40">
      <H1>Politika zasebnosti</H1>
      <div className="mt-10">
        <p>
          Datum začetka veljavnosti: 15. september 2025
          <br />
          Zadnja posodobitev: 15. september 2025
          <br />
          <br />
          <strong>Kaj so piškotki?</strong>
          <br />
          <br />
          Ta politika piškotkov pojasnjuje, kaj so piškotki, kako jih
          uporabljamo, vrste piškotkov, ki jih uporabljamo (npr. informacije, ki
          jih zbiramo s piškotki, in kako jih uporabljamo), ter kako upravljati
          nastavitve piškotkov.
          <br />
          Piškotki so majhne besedilne datoteke, ki se uporabljajo za
          shranjevanje majhnih količin informacij. Shranijo se na vaši napravi,
          ko se spletna stran naloži v vaš brskalnik. Ti piškotki nam pomagajo,
          da spletna stran pravilno deluje, da je bolj varna, ponuja boljšo
          uporabniško izkušnjo in omogoča razumevanje delovanja spletne strani
          ter analizo, kaj deluje in kje so potrebne izboljšave.
          <br />
          <br />
          <strong>Kako uporabljamo piškotke?</strong>
          <br />
          <br />
          Kot večina spletnih storitev naša spletna stran uporablja piškotke
          prve in tretje strani za različne namene. Piškotki prve strani so
          večinoma nujni za pravilno delovanje spletne strani in ne zbirajo
          vaših osebno prepoznavnih podatkov.
          <br />
          Piškotki tretjih strani, ki jih uporabljamo na naši spletni strani, so
          namenjeni predvsem razumevanju delovanja spletne strani, analizi vaše
          interakcije z našo spletno stranjo, zagotavljanju varnosti naših
          storitev, prikazovanju oglasov, ki so relevantni za vas, ter
          zagotavljanju izboljšane uporabniške izkušnje, ki pospeši vaše
          prihodnje interakcije z našo spletno stranjo.
          <br />
          <br />
          <strong>Vrste piškotkov, ki jih uporabljamo</strong>
          <br />
          ---to še manjka
          <br />
          <br />
          <strong>Upravljanje nastavitev piškotkov</strong>
          <br />
          <br />
          Nastavitve piškotkov lahko kadar koli spremenite s klikom na zgornji
          gumb. Tako lahko ponovno odprete pasico za soglasje in spremenite
          svoje nastavitve ali takoj umaknete soglasje.
          <br />
          Poleg tega različni brskalniki ponujajo različne metode za blokiranje
          in brisanje piškotkov, ki jih uporabljajo spletne strani. Spodaj so
          navedene povezave do dokumentov za podporo, ki pojasnjujejo, kako
          upravljati in brisati piškotke v najbolj priljubljenih spletnih
          brskalnikih:
          <br />
          <br />
          Chrome: https://support.google.com/accounts/answer/32050
          <br />
          Safari: https://support.apple.com/en-in/guide/safari/sfri11471/mac
          <br />
          Firefox:
          https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox?redirectslug=delete-cookies-remove-info-websites-stored&amp;redirectlocale=en-US
          <br />
          Internet Explorer:
          https://support.microsoft.com/en-us/topic/how-to-delete-cookie-files-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc
          <br />
          Če uporabljate drug spletni brskalnik, obiščite uradne dokumente za
          podporo vašega brskalnika.
        </p>
      </div>
    </div>
  );
}

export default Page;

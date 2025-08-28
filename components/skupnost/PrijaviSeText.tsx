import Alert from "../icons/Alert";
import ArrowRight from "../icons/ArrowRight";
import LinkBtn from "../LinkBtn";

function PrijaviSeText() {
  return (
    <div className="border-terciary flex w-full flex-col justify-between gap-6 rounded-3xl border bg-white px-3 py-2 lg:flex-row lg:items-center lg:rounded-full">
      <p className="flex gap-4">
        <Alert className="shrink-0" /> Za povezovanje z ostalimi pasjeljubci, se
        je potrebno prijaviti v svoj profil.
      </p>
      <LinkBtn
        variant="primary"
        className="group flex items-center gap-4 self-end pt-1.5 pr-1.5 pb-1.5"
        href="/auth/login"
      >
        Nadaljuj na prijavo
        <span className="tranistion-[rotate] flex h-8 w-8 -rotate-45 items-center justify-center rounded-full bg-white duration-200 group-hover:rotate-0">
          <ArrowRight />
        </span>
      </LinkBtn>
    </div>
  );
}

export default PrijaviSeText;

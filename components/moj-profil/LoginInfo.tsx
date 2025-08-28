import LinkBtn from "../LinkBtn";

function LoginInfo({ email }: { email?: string }) {
  return (
    <div className="flex flex-col gap-10">
      <p className="text-primary font-ibm text-xl font-semibold">
        Podatki za prijavo v profil
      </p>
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <input
          disabled
          className="w-full shrink-0 rounded-3xl border border-black bg-white px-4 py-2 hover:cursor-not-allowed md:w-75"
          defaultValue={email}
        />
        <LinkBtn
          variant="secondary"
          href="/auth/spremeni-geslo"
          className="flex items-center justify-center"
        >
          Sprememba gesla
        </LinkBtn>
      </div>
    </div>
  );
}

export default LoginInfo;

import { createClient } from "@/lib/supabase/server";

async function AppInfo() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("profiles").select("*");
  const { data: providerData, error: providerError } = await supabase
    .from("ponudniki")
    .select("*");

  return (
    <div className="grid grid-cols-4 gap-x-5">
      <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-xs">
        <p className="text-primary/50 text-sm font-medium">
          Število registriranih uporabnikov
        </p>
        <p className="text-3xl font-semibold">{error ? "-" : data.length}</p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-xs">
        <p className="text-primary/50 text-sm font-medium">
          Število uporabnikov z aktivnim profilom{" "}
        </p>
        <p className="text-3xl font-semibold">
          {data?.filter((p) => p.visible).length}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-xs">
        <p className="text-primary/50 text-sm font-medium">
          Število registriranih ponudnikov{" "}
        </p>
        <p className="text-3xl font-semibold">
          {providerError ? "-" : providerData.length}
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-xs">
        <p className="text-primary/50 text-sm font-medium">Aktualni oglasi </p>
        <p className="text-3xl font-semibold">2</p>
      </div>
    </div>
  );
}

export default AppInfo;

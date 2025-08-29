import Profiles from "./Profiles";

function UserProfiles({ city, id }: { city: string; id: string }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-ibm text-xl font-semibold lg:text-2xl">
        Povežite se še z drugimi uporabniki iz kraja {city}.
      </h1>
      <Profiles city={city} id={id} />
    </div>
  );
}

export default UserProfiles;

import { getAllProfiles, getUserImage } from "@/lib/userActions";
import Image from "next/image";
import { H4 } from "../Text";
import Link from "next/link";

async function Profiles() {
  const data = await getAllProfiles();

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:gap-y-16 xl:grid-cols-4">
      {data?.map((el) => (
        <ProfileCard key={el.user_id} profile={el} />
      ))}
    </div>
  );
}

async function ProfileCard({
  profile,
}: {
  profile: {
    user_id: string;
    name: string;
    pet_name: string;
    city: string;
    img: string | null;
  };
}) {
  const { user_id, name, pet_name, city, img } = profile;

  const imgUrl = await getUserImage(img);

  return (
    <Link
      href={`/skupnost/${user_id}`}
      className="from-secondary/65 to-secondary/30 tranistion-shadow flex flex-col gap-4 rounded-3xl bg-gradient-to-t px-3 py-4 shadow-[1px_1px_10px_rgba(0,0,0,0.25)] duration-200 hover:shadow-[2px_2px_10px_rgba(0,0,0,0.25)]"
    >
      <Image
        src={img ? imgUrl! : "/placeholder.jpg"}
        alt={name}
        width={280}
        height={260}
        className="h-35 w-full rounded-3xl object-cover md:h-50 lg:h-65"
      />
      <H4 className="truncate text-center">
        {name} {pet_name ? `in ${pet_name}` : ""}
      </H4>
      <p className="text-center text-sm lg:text-base">{city}</p>
    </Link>
  );
}

export default Profiles;

import { getUserImage } from "@/lib/userActions";
import Image from "next/image";
import Location from "../icons/Location";
import Paw from "../icons/Paw";
import Message from "../icons/Message";

async function UserInfo({
  user,
}: {
  user: {
    img: string;
    name: string;
    pet_name: string;
    description: string;
    city: string;
    dog_breed: string;
  };
}) {
  const imgUrl = await getUserImage(user.img);

  return (
    <div className="flex flex-col gap-10 md:mx-auto md:w-2/3 lg:grid lg:w-full lg:grid-cols-[5fr_7fr] lg:gap-x-5">
      <Image
        src={imgUrl ? imgUrl : "/placeholder.jpg"}
        alt="Slika profila"
        height={415}
        width={400}
        className="h-auto min-h-90 w-full rounded-3xl object-cover lg:min-h-100 xl:w-4/5"
      />
      <div className="flex flex-col gap-6 text-black lg:gap-12">
        <h1 className="font-ibm text-xl font-semibold lg:text-2xl">
          {user.name}
          {user.pet_name ? ` in ${user.pet_name}` : ""}
        </h1>
        <p className="whitespace-pre-line lg:order-5">{user.description}</p>
        <p className="flex items-center gap-5">
          <span className="bg-secondary/35 flex h-10 w-10 items-center justify-center rounded-full">
            <Location />
          </span>
          {user.city}
        </p>
        {user.dog_breed && (
          <p className="flex items-center gap-5">
            <span className="bg-secondary/35 flex h-10 w-10 items-center justify-center rounded-full">
              <Paw />
            </span>
            {user.dog_breed}
          </p>
        )}
        <p className="flex items-center gap-5">
          <span className="bg-secondary/35 flex h-10 w-10 items-center justify-center rounded-full">
            <Message />
          </span>
          {user.city}
        </p>
      </div>
    </div>
  );
}

export default UserInfo;

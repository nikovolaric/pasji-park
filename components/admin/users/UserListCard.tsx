import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";

function UserListCard({
  user,
  i,
}: {
  user: {
    user_id: string;
    name: string;
    city: string;
    email: string;
    dog_breed?: string;
    owner: boolean;
    visible: boolean;
    created_at: string;
  };
  i: number;
}) {
  return (
    <Link
      href={`/admin/uporabniki/${user.user_id}`}
      className={`grid grid-cols-[2fr_3fr_2fr_2fr_2fr_2fr] items-center justify-items-center px-3 py-6 ${i % 2 === 1 ? "bg-accent/20" : ""}`}
    >
      <div className="flex items-center gap-3 justify-self-start">
        <UserCircle2Icon className="w-10 flex-none text-black/50" />
        <p className="font-medium">{user.name}</p>
      </div>
      <p className="justify-self-start text-black/50">{user.email}</p>
      <p className="justify-self-start text-black/50">{user.city}</p>
      <p className="text-black/50">{user.dog_breed ? user.dog_breed : "/"}</p>
      <p className="text-black/50">{user.visible ? "DA" : "NE"}</p>
      <p className="text-black/50">
        {new Date(user.created_at).toLocaleDateString("sl-SI", {
          day: "2-digit",
          year: "2-digit",
          month: "2-digit",
        })}
      </p>
    </Link>
  );
}

export default UserListCard;

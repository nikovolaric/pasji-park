"use client";

import { ChevronLeftIcon, ChevronRightIcon, Search } from "lucide-react";
import UserListCard from "./UserListCard";
import { useState } from "react";
import { useRouter } from "next/navigation";

function UserList({
  users,
}: {
  users: {
    user_id: string;
    name: string;
    city: string;
    email: string;
    dog_breed?: string;
    owner: boolean;
    visible: boolean;
    created_at: string;
  }[];
}) {
  const router = useRouter();

  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-col gap-5 rounded-xl bg-white p-8">
      <div className="drop-shadow-input border-gray/75 flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <Search height={16} className="stroke-3" />
        <input
          placeholder="Išči po uporabnikih"
          className="w-full outline-none"
          onChange={(e) => router.replace(`?name=${e.target.value}`)}
        />
      </div>
      <NameBar />
      <div>
        {users.map(
          (
            user: {
              user_id: string;
              name: string;
              city: string;
              email: string;
              dog_breed?: string;
              owner: boolean;
              visible: boolean;
              created_at: string;
            },
            i: number,
          ) => (
            <UserListCard key={user.user_id} user={user} i={i} />
          ),
        )}
      </div>
      <div className="flex items-center justify-between">
        {page === 1 ? (
          <div />
        ) : (
          <button
            className="flex cursor-pointer items-center gap-4 rounded-xl border border-black px-4 py-2 font-semibold"
            onClick={() => {
              setPage((page) => page - 1);
              router.replace(`?page=${page - 1}`);
            }}
          >
            <ChevronLeftIcon height={16} className="stroke-3" /> Prejšna stran
          </button>
        )}
        {users.length === 30 && (
          <button
            className="bg-accent hover:bg-accent/80 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-400"
            onClick={() => {
              setPage((page) => page + 1);
              router.replace(`?page=${page + 1}`);
            }}
          >
            Naslednja stran{" "}
            <ChevronRightIcon height={16} className="stroke-3" />
          </button>
        )}
      </div>
    </div>
  );
}

function NameBar() {
  return (
    <div className="bg-accent grid grid-cols-[2fr_3fr_2fr_2fr_2fr_2fr] items-center justify-items-center rounded-xl p-3 font-semibold">
      <p className="justify-self-start text-black/75">Ime in priimek</p>
      <p className="justify-self-start text-black/75">Elektronski naslov</p>
      <p className="justify-self-start text-black/75">Kraj bivanja</p>
      <p className="text-black/75">Pasja pasma</p>
      <p className="text-black/75">Aktiven profil</p>
      <p className="text-black/75">Datum registracije</p>
    </div>
  );
}

export default UserList;

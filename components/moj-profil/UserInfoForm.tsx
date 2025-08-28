"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Button from "../Button";
import { updateMe, updateProfilePhoto } from "@/lib/userActions";
import Image from "next/image";

function UserInfoForm({
  me,
  imgUrl,
}: {
  me: {
    name: string;
    city: string;
    pet_name: string;
    description: string;
    visible: boolean;
    dog_breed: string;
    user_id: string;
  };
  imgUrl?: string;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [visible, setVisible] = useState(me.visible);

  async function handleAction(formData: FormData) {
    const res = await updateMe({ formData, visible, user_id: me.user_id });

    if (res) {
      setIsEdit(false);
    }
  }

  async function handleProfilePhoto(e: ChangeEvent<HTMLInputElement>) {
    const img = e.target.files?.[0];
    if (img) {
      await updateProfilePhoto({ img, user_id: me.user_id });
    }
  }

  return (
    <>
      <form
        className="flex w-full flex-col gap-8 lg:order-2 lg:grid lg:grid-cols-2 lg:gap-x-5"
        action={handleAction}
      >
        <div className="flex flex-col gap-1.5">
          <label className="font-medium">Moje ime</label>
          <input
            type="text"
            placeholder="Ime"
            required
            defaultValue={me.name}
            disabled={!isEdit}
            className="w-full rounded-3xl border border-black bg-white px-4 py-2 disabled:cursor-not-allowed"
            name="name"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-1.5 lg:col-start-1">
          <label className="font-medium">Kraj</label>
          <input
            type="text"
            placeholder="Kraj"
            required
            defaultValue={me.city}
            disabled={!isEdit}
            className="w-full rounded-3xl border border-black bg-white px-4 py-2 disabled:cursor-not-allowed"
            name="city"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-1.5 lg:col-start-2 lg:row-start-1">
          <label className="font-medium">Ime psa</label>
          <input
            type="text"
            placeholder="Ime psa"
            required
            defaultValue={me.pet_name || "/"}
            disabled={!isEdit}
            className="w-full rounded-3xl border border-black bg-white px-4 py-2 disabled:cursor-not-allowed"
            name="pet_name"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-medium">Pasja pasma</label>
          <input
            type="text"
            placeholder="Ime"
            required
            defaultValue={me.dog_breed || "/"}
            disabled={!isEdit}
            className="w-full rounded-3xl border border-black bg-white px-4 py-2 disabled:cursor-not-allowed"
            name="dog_breed"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <label className="font-medium">Kratek opis</label>
          <textarea
            placeholder="Opis"
            required
            defaultValue={me.description}
            disabled={!isEdit}
            className="min-h-50 w-full rounded-3xl border border-black bg-white px-4 py-2 disabled:cursor-not-allowed"
            name="description"
            autoComplete="off"
          />
        </div>
        <div className="items-cetner flex gap-4 lg:col-span-2">
          <span
            className={`border-primary flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border ${visible ? "bg-primary" : "bg-white"}`}
            onClick={() => {
              if (isEdit) {
                setVisible((v) => !v);
              }
            }}
          >
            <Check height={24} className="text-white" />
          </span>
          <div className="flex items-center">
            <label>
              Želim, da je moj profil prikazan na zavihku{" "}
              <Link href="/skupnost" className="underline">
                Skupnost.
              </Link>
            </label>
          </div>
        </div>
        {isEdit ? (
          <Button
            variant="primary"
            className="col-span-2 self-end lg:justify-self-end"
          >
            Shrani
          </Button>
        ) : (
          <Button
            variant="primary"
            className="col-span-2 self-end lg:justify-self-end"
            onClick={(e) => {
              e.preventDefault();
              setIsEdit(true);
            }}
          >
            Uredi
          </Button>
        )}
      </form>
      <div className="flex flex-col gap-2 lg:order-1">
        <Image
          src={imgUrl ? imgUrl : "/placeholder.jpg"}
          alt="profilna slika"
          height={500}
          width={420}
          className="min-h-85 w-full rounded-3xl object-cover lg:h-full lg:max-h-125"
        />
        <input
          id="img"
          type="file"
          accept="image/*"
          hidden
          onChange={handleProfilePhoto}
        />
        <label
          htmlFor="img"
          className="bg-primary hover:bg-terciary flex cursor-pointer items-center justify-center rounded-full px-6 py-2 font-medium text-white shadow-[1px_1px_10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:shadow-[inset_1px_1px_10px_rgba(0,0,0,0.25)]"
        >
          Naloži sliko profila
        </label>
      </div>
    </>
  );
}

export default UserInfoForm;

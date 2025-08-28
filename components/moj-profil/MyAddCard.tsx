"use client";

import { PencilIcon, RefreshCcw } from "lucide-react";
import Trash from "../icons/Trash";
import Link from "next/link";
import { deleteAd } from "@/lib/adsActions";
import { useState } from "react";

function MyAddCard({
  ad,
}: {
  ad: { title: string; created_at: string; id: number };
}) {
  const { title, created_at, id } = ad;

  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteAd(id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-4 shadow-[1px_1px_10px_rgba(0,0,0,0.25)] md:flex-row md:items-center md:justify-between">
      <p className="self-end md:order-2 md:self-auto">
        {new Date(created_at).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
      <p className="font-medium md:order-1">{title}</p>
      <div className="flex items-center gap-2 self-end md:order-3 md:self-auto">
        <Link
          href={`/moj-profil/${id}`}
          className="bg-primary flex h-10 w-10 items-center justify-center rounded-full"
        >
          <PencilIcon className="h-5 text-white" />
        </Link>
        <span
          className="bg-secondary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          onClick={handleDelete}
        >
          {isLoading ? <RefreshCcw className="h-5 animate-spin" /> : <Trash />}
        </span>
      </div>
    </div>
  );
}

export default MyAddCard;

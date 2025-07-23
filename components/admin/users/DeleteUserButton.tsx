"use client";

import { deleteUser } from "@/lib/actions";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DeleteUserButton({ id, img }: { id: string; img?: string }) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteUser() {
    const supabase = createClient();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("user_id", id);

      if (error) throw error;

      if (img) {
        await supabase.storage.from("pasji-park-users").remove([img]);
      }

      const data = await deleteUser(id);
      if (data instanceof Error) throw data;

      router.push("/admin/uporabniki");
    } catch (error) {
      console.log(error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button
        className="bg-accent2 hover:bg-accent2/80 flex cursor-pointer items-center gap-2 rounded-lg px-6 py-1.5 text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={isLoading}
        onClick={handleDeleteUser}
      >
        <Trash2 height={20} />
        Izbriši profil
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default DeleteUserButton;

"use client";

import { deleteProvider } from "@/lib/providerActions";
import { Trash2 } from "lucide-react";
import { useState } from "react";

function DeleteProviderButton({ slug }: { slug: string }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteUser() {
    setIsLoading(true);
    setError("");
    try {
      const data = await deleteProvider({ slug });
      if (data instanceof Error) throw data;
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
        Izbriši ponudnika
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default DeleteProviderButton;

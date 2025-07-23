"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button
      className="bg-accent text-secondary hover:bg-accent/80 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-200"
      onClick={logout}
    >
      <LogOutIcon height={24} />
    </button>
  );
}

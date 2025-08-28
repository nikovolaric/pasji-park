import Header from "@/components/admin/Header";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import "./admin.css";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", data.user?.id)
    .single();

  if (!profileData) {
    redirect("/ustvari-profil");
  }

  if (profileData.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="mt-13 mb-40 flex min-h-screen flex-col gap-20">
      <Header />
      {children}
    </main>
  );
}

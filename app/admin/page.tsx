import type { Metadata } from "next";

import WelcomeBack from "@/components/admin/WelcomeBack";
import AppInfo from "@/components/admin/AppInfo";
import PageMenu from "@/components/admin/PageMenu";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function ProtectedPage() {
  return (
    <div className="flex flex-col gap-20">
      <WelcomeBack />
      <AppInfo />
      <PageMenu />
    </div>
  );
}

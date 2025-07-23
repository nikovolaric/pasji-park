import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Registriracija uspešna",
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Hvala za registracijo!</CardTitle>
              <CardDescription>
                Preverite elektronski predal za potrditveno kodo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Uspešno ste se registrirali. Na elektronski naslov ste prejeli
                potrditveno kodo, ki jo je potrebno potrditi pred začetkom
                uporabe platforme.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

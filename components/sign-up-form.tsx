"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check } from "lucide-react";

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Gesla se ne ujemata");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError(
        "Za uporabo platforme se je potrebno strinjati s pogoji uporabe",
      );
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/ustvari-profil`,
        },
      });

      if (error) throw error;

      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"flex flex-col gap-6"}>
      <Card className="border-accent border">
        <CardHeader>
          <CardTitle className="text-2xl">Registriraj se</CardTitle>
          <CardDescription>Ustvari nov račun</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Elektronski naslov</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Elektronski naslov"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Geslo</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="************"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Potrdite geslo</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  placeholder="************"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <div className="items-cetner flex gap-4">
                <span
                  className={`border-primary flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border ${agreeToTerms ? "bg-accent" : "bg-white"}`}
                  onClick={() =>
                    setAgreeToTerms((agree) => (!agree ? true : false))
                  }
                >
                  <Check height={24} className="text-white" />
                </span>
                <div className="flex items-center">
                  <Label>Strinjam se s pogoji uporabe platforme.</Label>
                </div>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/80 w-full cursor-pointer transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Ste se že registrirali?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

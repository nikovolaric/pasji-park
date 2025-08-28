"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getAllProfiles() {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("visible", true);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserImage(img: string | null) {
  try {
    if (!img) {
      return;
    }

    const { data, error } = await supabase.storage
      .from("pasji-park-users")
      .createSignedUrl(img, 600);

    if (error) {
      throw error;
    }

    return data.signedUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function updateMe({
  formData,
  visible,
  user_id,
}: {
  formData: FormData;
  visible: boolean;
  user_id: string;
}) {
  try {
    const newData = { ...Object.fromEntries(formData), visible };

    const { error } = await supabase
      .from("profiles")
      .update(newData)
      .eq("user_id", user_id);

    if (error) throw error;

    revalidatePath("/moj-profil");
    revalidatePath("/admin");
    revalidatePath("/skupnost");
    return true;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfilePhoto({
  img,
  user_id,
}: {
  img: File;
  user_id: string;
}) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("img")
      .eq("user_id", user_id)
      .single();

    if (error) throw error;

    const { error: uploadError } = await supabase.storage
      .from("pasji-park-users")
      .update(data.img, img);

    if (uploadError) throw uploadError;

    revalidatePath("/moj-profil");
    revalidatePath("/admin");
    revalidatePath("/skupnost");
    // return true;
  } catch (error) {
    console.log(error);
  }
}

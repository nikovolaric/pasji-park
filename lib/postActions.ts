"use server";

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getAllPosts() {
  try {
    const { data, error } = await supabase.from("posts").select();

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}



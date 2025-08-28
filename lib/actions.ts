"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function deleteUser(userId: string) {
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        apiKey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(
        `Failed to delete user: ${errorBody.message || res.statusText}`,
      );
    }

    revalidatePath("/");
  } catch (error) {
    return error as Error;
  }
}

export async function deleteCoverImg({
  slug,
  img,
  table,
  bucket,
}: {
  slug: string;
  img: string;
  table: string;
  bucket: string;
}) {
  await supabase.storage.from(bucket).remove([img]);

  await supabase.from(table).update({ coverImg: null }).eq("slug", slug);

  revalidatePath(`/admin/ponudniki-storitev/${slug}`);
}

export async function deleteImg({
  slug,
  img,
  imgs,
  table,
  bucket,
}: {
  slug: string;
  img: string;
  imgs: string[];
  table: string;
  bucket: string;
}) {
  await supabase.storage.from(bucket).remove([img]);

  await supabase
    .from(table)
    .update({ imgs: imgs.filter((el: string) => el !== img) })
    .eq("slug", slug);

  revalidatePath(`/admin/ponudniki-storitev/${slug}`);
}

export async function addPost({
  title,
  html,
  category,
  coverImg,
  imgs,
  summary,
}: {
  title: string;
  html: string;
  coverImg: File | null;
  imgs: FileList | null;
  category: string;
  summary: string;
}) {
  try {
    const data: {
      title: string;
      html: string;
      coverImg?: string;
      imgs?: string[];
      category: string;
      summary: string;
      slug: string;
    } = {
      title,
      html,
      category,
      summary,
      slug: slugify(title, { lower: true, trim: true }),
    };

    const { data: coverImgData, error: coverImgError } = await supabase.storage
      .from("blog-posts")
      .upload(`${data.slug}-coverImg`, coverImg!);

    if (coverImgError) throw coverImgError;

    data.coverImg = coverImgData.path;

    if (imgs && imgs.length > 0) {
      const imgsArray = Array.from(imgs);

      data.imgs = imgsArray.map((img) => img.name);

      const imgsPaths = await Promise.all(
        imgsArray.map(async (img) => {
          const { data: imgData, error } = await supabase.storage
            .from("blog-posts")
            .upload(`${img.name}`, img);

          if (error) throw error;

          return imgData.path;
        }),
      );

      data.imgs = imgsPaths;
    }

    const { error } = await supabase.from("posts").insert(data);

    if (error) throw error;

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/admin/izobrazevalne-vsebine");
    }
    console.log(error);
  }
}

export async function editPost({
  title,
  html,
  category,
  coverImg,
  imgs,
  summary,
  slug,
}: {
  title: string;
  html: string;
  coverImg: File | null;
  imgs: FileList | null;
  category: string;
  summary: string;
  slug: string;
}) {
  try {
    const { data: curData, error: curDataError } = await supabase
      .from("posts")
      .select()
      .eq("slug", slug)
      .single();

    if (curDataError) throw curDataError;

    const data: {
      title: string;
      html: string;
      coverImg?: string;
      imgs?: string[];
      category: string;
      summary: string;
      slug: string;
    } = {
      title,
      html,
      category,
      summary,
      slug: slugify(title, { lower: true, trim: true }),
    };

    if (coverImg) {
      const { data: coverImgData, error: coverImgError } =
        await supabase.storage
          .from("blog-posts")
          .upload(`${data.slug}-coverImg`, coverImg!);

      if (coverImgError) throw coverImgError;

      data.coverImg = coverImgData.path;
    }

    if (imgs && imgs.length > 0) {
      const imgsArray = Array.from(imgs);

      data.imgs = imgsArray.map((img) => img.name);

      const imgsPaths = await Promise.all(
        imgsArray.map(async (img) => {
          const { data: imgData, error } = await supabase.storage
            .from("blog-posts")
            .upload(`${img.name}`, img);

          if (error) throw error;

          return imgData.path;
        }),
      );

      data.imgs = [...curData.imgs, ...imgsPaths];
    }

    const { error } = await supabase
      .from("posts")
      .update(data)
      .eq("slug", slug);

    if (error) throw error;

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/admin/izobrazevalne-vsebine");
    }
    console.log(error);
  }
}

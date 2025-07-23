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

export async function createProvider(
  prevState: { success: boolean; error?: string },
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const coverImgFile = formData.get("coverImg") as File;
    const imgsFiles = formData.getAll("imgs") as File[];
    const name = formData.get("name") as string;

    interface ProviderData {
      name: string;
      location: string;
      email: string;
      phone: string;
      category: string[];
      description: string;
      openingTime: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
      };
      website: string;
      slug: string;
      coverImg?: string;
      imgs?: (string | undefined)[];
    }

    const data = {
      name,
      location: formData.get("location") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category: formData.getAll("category") as string[],
      description: formData.get("description") as string,
      openingTime: {
        monday: formData.get("monday") as string,
        tuesday: formData.get("tuesday") as string,
        wednesday: formData.get("wednesday") as string,
        thursday: formData.get("thursday") as string,
        friday: formData.get("friday") as string,
        saturday: formData.get("saturday") as string,
        sunday: formData.get("sunday") as string,
      },
      website: formData.get("website") as string,
      slug: slugify(name),
    } as ProviderData;

    if (coverImgFile && coverImgFile instanceof File && coverImgFile.size > 0) {
      const { data: coverImgData, error: coverError } = await supabase.storage
        .from("pasji-park-users")
        .upload(`providers/${coverImgFile.name}`, coverImgFile);

      if (coverError) throw coverError;

      data.coverImg = coverImgData?.path;
    }

    const imgs = await Promise.all(
      imgsFiles.map(async (img) => {
        if (img && img instanceof File && img.size > 0) {
          const { data: imgData, error: imgErr } = await supabase.storage
            .from("pasji-park-users")
            .upload(`providers/${img.name}`, img);

          if (imgErr) throw imgErr;

          return imgData?.path;
        }
      }),
    );

    if (imgs.length > 0 && imgs.some((img) => img !== undefined)) {
      data.imgs = imgs;
    }

    const { error } = await supabase.from("ponudniki").insert(data);

    if (error) throw error;

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/admin/ponudniki-storitev");
    }
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateProvider(
  prevState: { success: boolean; error?: string },
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const coverImgFile = formData.get("coverImg") as File;
    const imgsFiles = formData.getAll("imgs") as File[];
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    const { data: imgsData } = await supabase
      .from("ponudniki")
      .select("imgs")
      .eq("slug", slug)
      .single();

    interface ProviderData {
      name: string;
      location: string;
      email: string;
      phone: string;
      category: string[];
      description: string;
      openingTime: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
      };
      website: string;
      slug: string;
      coverImg?: string;
      imgs?: (string | undefined)[];
    }

    const data = {
      name,
      location: formData.get("location") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category: formData.getAll("category") as string[],
      description: formData.get("description") as string,
      openingTime: {
        monday: formData.get("monday") as string,
        tuesday: formData.get("tuesday") as string,
        wednesday: formData.get("wednesday") as string,
        thursday: formData.get("thursday") as string,
        friday: formData.get("friday") as string,
        saturday: formData.get("saturday") as string,
        sunday: formData.get("sunday") as string,
      },
      website: formData.get("website") as string,
      slug,
    } as ProviderData;

    if (coverImgFile && coverImgFile instanceof File && coverImgFile.size > 0) {
      const { data: coverImgData, error: coverError } = await supabase.storage
        .from("pasji-park-users")
        .upload(`providers/${coverImgFile.name}`, coverImgFile);

      if (coverError) throw coverError;

      data.coverImg = coverImgData?.path;
    }

    const imgs = await Promise.all(
      imgsFiles.map(async (img) => {
        if (img && img instanceof File && img.size > 0) {
          const { data: imgData, error: imgErr } = await supabase.storage
            .from("pasji-park-users")
            .upload(`providers/${img.name}`, img);

          if (imgErr) throw imgErr;

          return imgData?.path;
        }
      }),
    );

    if (imgs.length > 0 && imgs.some((img) => img !== undefined)) {
      if (imgsData) {
        data.imgs = [...imgsData.imgs, ...imgs];
      } else {
        data.imgs = imgs;
      }
    }

    const { error } = await supabase
      .from("ponudniki")
      .update(data)
      .eq("slug", slug);

    if (error) throw error;

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/admin/ponudniki-storitev");
    }
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteProvider({ slug }: { slug: string }) {
  try {
    const { data, error } = await supabase
      .from("ponudniki")
      .delete()
      .eq("slug", slug)
      .select()
      .single();

    if (error) throw error;

    const imgsArray = [data.coverImg];

    if (data.imgs) {
      imgsArray.push(...data.imgs);
    }

    console.log(imgsArray);

    await supabase.storage
      .from("pasji-park-users")
      .remove([data.coverImg, ...data.imgs]);

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/admin/ponudniki-storitev");
    }
    console.log(error);
    return { success: false, error: (error as Error).message };
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
      slug,
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

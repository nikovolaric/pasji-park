"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
      city: string;
    }

    const data = {
      name,
      location: formData.get("location") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category: (formData.get("category") as string).split(", "),
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
      slug: slugify(name, { lower: true, trim: true }),
      city: formData.get("city") as string,
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
      city: string;
    }

    const data = {
      name,
      location: formData.get("location") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      category: (formData.get("category") as string).split(", "),
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
      slug: slugify(name, { lower: true, trim: true }),
      city: formData.get("city") as string,
    } as ProviderData;

    console.log(data, Object.fromEntries(formData));

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

export async function getAllProviders({
  filters,
}: {
  filters: { name?: string; city?: string; category?: string };
}) {
  try {
    const query = supabase.from("ponudniki").select();

    if (filters.name) {
      query.ilike("name", `%${filters.name}%`);
    }

    if (filters.city) {
      query.eq("city", filters.city);
    }

    if (filters.category) {
      query.contains("category", [filters.category]);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProviderImage(img: string) {
  try {
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

export async function getProviderImages(imgs: string[] | null) {
  try {
    if (imgs === null) {
      return null;
    }

    const imgUrls = Promise.all(
      imgs.map(async (img) => {
        const { data, error } = await supabase.storage
          .from("pasji-park-users")
          .createSignedUrl(img, 600);
        if (error) {
          throw error;
        }

        return data.signedUrl;
      }),
    );

    return imgUrls;
  } catch (error) {
    console.log(error);
  }
}

export async function getOneProvider({ slug }: { slug: string }) {
  try {
    const { data, error } = await supabase
      .from("ponudniki")
      .select()
      .eq("slug", slug)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

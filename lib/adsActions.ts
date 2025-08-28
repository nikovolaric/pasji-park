"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getMyAds({ id }: { id: string }) {
  try {
    const { data, error } = await supabase
      .from("ads")
      .select()
      .eq("author_id", id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAds({
  filters,
}: {
  filters: { title?: string; city?: string; category?: string };
}) {
  try {
    const query = supabase.from("ads").select();

    if (filters.title) {
      query.ilike("title", `%${filters.title}%`);
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

export async function createAd(
  formData: FormData,
  author_id: string,
  city: string,
) {
  try {
    type Data = {
      author: string;
      title: string;
      description: string;
      email: string;
      price: string;
      category: string[];
      author_id: string;
      coverImg?: string;
      imgs?: string[];
      city: string;
    };

    const category = (formData.get("category") as string).split(", ");
    const coverImg = formData.get("coverImg") as File;
    const imgs = formData.getAll("imgs") as File[];

    const data: Data = {
      author: formData.get("author") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      email: formData.get("email") as string,
      price: formData.get("price") as string,
      category,
      author_id,
      city,
    };

    if (coverImg.name !== "undefined") {
      const { data: coverImgData, error: coverImgError } =
        await supabase.storage
          .from("ads")
          .upload(`${data.title}-${coverImg.name}`, coverImg);

      if (coverImgError) {
        throw coverImgError;
      }

      if (coverImgData) {
        data.coverImg = coverImgData.path;
      }
    }

    if (imgs[0].name !== "undefined") {
      data.imgs = [];

      for (const img of imgs) {
        const { data: imgData, error: imgError } = await supabase.storage
          .from("ads")
          .upload(`${data.title}-${img.name}`, img);

        if (imgError) {
          throw imgError;
        }

        if (imgData) {
          data.imgs = [...data.imgs, imgData.path];
        }
      }
    }

    const { error } = await supabase.from("ads").insert(data);

    if (error) {
      throw error;
    }

    revalidatePath("/admin");
    revalidatePath("/moj-profil");
    revalidatePath("/mali-oglasi");
    redirect("/moj-profil");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") redirect("/moj-profil");
    console.log(error);
  }
}

export async function updateAd(
  formData: FormData,
  id: number,
  curImgs: string[],
) {
  try {
    type Data = {
      author: string;
      title: string;
      description: string;
      email: string;
      price: string;
      category: string[];
      coverImg?: string;
      imgs: string[];
    };

    const category = (formData.get("category") as string).split(", ");
    const coverImg = formData.get("coverImg") as File;
    const imgs = formData.getAll("imgs") as File[];

    const data: Data = {
      author: formData.get("author") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      email: formData.get("email") as string,
      price: formData.get("price") as string,
      category,
      imgs: curImgs,
    };

    if (coverImg.name !== "undefined") {
      const { data: coverImgData, error: coverImgError } =
        await supabase.storage
          .from("ads")
          .upload(`${data.title}-${coverImg.name}`, coverImg);

      if (coverImgError) {
        throw coverImgError;
      }

      if (coverImgData) {
        data.coverImg = coverImgData.path;
      }
    }

    if (imgs[0].name !== "undefined") {
      for (const img of imgs) {
        const { data: imgData, error: imgError } = await supabase.storage
          .from("ads")
          .upload(`${data.title}-${img.name}`, img);

        if (imgError) {
          throw imgError;
        }

        if (imgData) {
          data.imgs = [...data.imgs, imgData.path];
        }
      }
    }

    const { error } = await supabase.from("ads").update(data).eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin");
    revalidatePath("/moj-profil");
    revalidatePath("/mali-oglasi");
    redirect("/moj-profil");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") redirect("/moj-profil");
    console.log(error);
  }
}

export async function deleteAd(id: number) {
  try {
    const { data, error } = await supabase
      .from("ads")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    if (data.coverImg) {
      await supabase.storage.from("ads").remove([data.coverImg]);
    }

    if (data.imgs.length > 0) {
      await supabase.storage.from("ads").remove(data.imgs);
    }

    revalidatePath("/admin");
    revalidatePath("/moj-profil");
    revalidatePath("/mali-oglasi");
  } catch (error) {
    console.log(error);
  }
}

export async function getOneAd({ id }: { id: string }) {
  try {
    const { data, error } = await supabase
      .from("ads")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") redirect("/moj-profil");
    console.log(error);
  }
}

export async function deleteOneImage(path: string) {
  try {
    const { error } = await supabase.storage.from("ads").remove([path]);

    if (error) throw error;

    revalidatePath("/moj-profil");
    revalidatePath("/admin");
    revalidatePath("/mali-oglasi");
  } catch (error) {
    console.log(error);
  }
}

export async function getAdImage(img: string) {
  try {
    const { data, error } = await supabase.storage
      .from("ads")
      .createSignedUrl(img, 600);

    if (error) throw error;

    return data.signedUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function getAdImags(imgs: string[]) {
  try {
    const { data, error } = await supabase.storage
      .from("ads")
      .createSignedUrls(imgs, 600);

    if (error) throw error;

    return data.map((img) => img.signedUrl);
  } catch (error) {
    console.log(error);
  }
}

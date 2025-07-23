"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import MenuBar from "./MenuBar";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import TipTapImage from "@tiptap/extension-image";
import { useState } from "react";
import { ChevronDown, XIcon } from "lucide-react";
import Image from "next/image";
import { deleteCoverImg, deleteImg, editPost } from "@/lib/actions";

const categories = ["Nasveti", "Novice"];

export default function EditBlogEditor({
  post,
}: {
  post: {
    title: string;
    coverImg: string;
    imgs: string[];
    html: string;
    category: string;
    summary: string;
    slug: string;
  };
}) {
  const { coverImg, imgs, html, slug } = post;

  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState<string[]>(post.category.split(", "));
  const [summary, setSummary] = useState(post.summary);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isOpenCategories, setIsOpenCategories] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyleKit,
      Youtube,
      TipTapImage,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: html,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-black/50 shadow-xs rounded-lg bg-white py-2 px-3 outline-none",
      },
    },
  });

  function handleCategory(cat: string) {
    if (category.includes(cat)) {
      setCategory(category.filter((el) => el !== cat));
    } else {
      setCategory([...category, cat]);
    }
  }

  async function handleSubmit() {
    if (editor) {
      const html = editor.getHTML();

      await editPost({
        title,
        html,
        category: category.join(", "),
        imgs: files,
        coverImg: file,
        summary,
        slug,
      });
    }
  }

  async function handleDeleteImg({
    slug,
    img,
    imgs,
  }: {
    slug: string;
    img: string;
    imgs: string[];
  }) {
    await deleteImg({
      slug,
      img,
      imgs,
      table: "posts",
      bucket: "blog-posts",
    });
  }

  if (!editor) {
    return <></>;
  }

  return (
    <>
      <EditorContext.Provider value={{ editor }}>
        <div className="editor flex flex-col gap-8">
          <div className="grid grid-cols-[2fr_1fr] gap-x-5 gap-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Naslov članka</label>
              <input
                name="title"
                placeholder="Vnesi naslov članka"
                className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={post.title}
              />
            </div>
            <div className="relative flex flex-col gap-2">
              <label className="font-semibold">Kategorija članka</label>
              <input
                name="category"
                defaultValue={category.join(", ")}
                hidden
              />
              <input
                placeholder="Izberi kategorijo storitev"
                className="rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
                autoComplete="off"
                disabled
                value={category.join(", ")}
              />
              <ChevronDown
                width={20}
                className={`absolute right-8 bottom-2 cursor-pointer ${isOpenCategories ? "rotate-180" : ""}`}
                onClick={() => setIsOpenCategories((el) => !el)}
              />
              {isOpenCategories && (
                <div className="absolute top-full left-0 flex w-full flex-col gap-3 rounded-lg border border-black/20 bg-white px-6 py-4 shadow-xs">
                  {categories.map((cat, i) => (
                    <p key={i} className="flex items-center gap-4">
                      <span
                        className={`h-6 w-6 cursor-pointer rounded-lg border border-black/50 ${category.includes(cat) ? "bg-accent" : ""}`}
                        onClick={() => handleCategory(cat)}
                      ></span>
                      {cat}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <div className="col-span-2 flex flex-col gap-2">
              <label className="font-semibold">Kratek povzetek</label>
              <textarea
                name="summary"
                placeholder="Kratek povzetek članka"
                className="h-32 rounded-xl border border-black/20 bg-white px-4 py-2 outline-none"
                onChange={(e) => setSummary(e.target.value)}
                defaultValue={post.summary}
              />
            </div>
          </div>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-center gap-4">
              {file || post.coverImg ? (
                <Image
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : `https://fgyuzrieoxfpneovebta.supabase.co/storage/v1/object/public/blog-posts/${coverImg}`
                  }
                  alt="slika"
                  height={1000}
                  width={1000}
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div className="h-100 w-full bg-white opacity-50" />
              )}
              <input
                type="file"
                hidden
                id="coverImg"
                name="coverImg"
                onChange={(e) => setFile(e.target.files![0])}
              />
              <div className="flex items-center gap-2">
                <label
                  htmlFor="coverImg"
                  className="bg-accent2 hover:bg-accent2/80 cursor-pointer rounded-lg px-6 py-1.5 font-medium text-white shadow-xs transition-colors duration-200"
                >
                  {file ? file.name : "Dodaj naslovno fotografijo"}
                </label>
                {(file || post.coverImg) && (
                  <XIcon
                    height={20}
                    className="cursor-pointer text-red-500"
                    onClick={async () => {
                      if (file) {
                        setFile(null);
                      }
                      if (coverImg) {
                        await deleteCoverImg({
                          slug,
                          img: coverImg,
                          table: "ponudniki",
                          bucket: "pasji-park-users",
                        });
                      }
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <input
                type="file"
                multiple
                hidden
                id="imgs"
                name="imgs"
                onChange={(e) => setFiles(e.target.files)}
              />

              {files?.length || imgs.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {(files ? [...files, ...imgs] : imgs).map((f, i) => (
                    <div className="relative h-full w-full" key={i}>
                      <Image
                        src={
                          f instanceof File
                            ? URL.createObjectURL(f)
                            : `https://fgyuzrieoxfpneovebta.supabase.co/storage/v1/object/public/blog-posts/${f}`
                        }
                        alt="slika"
                        height={400}
                        width={400}
                        className="h-auto w-full object-cover"
                      />
                      {!(f instanceof File) && (
                        <XIcon
                          height={16}
                          className="absolute top-2 right-8 cursor-pointer text-red-500"
                          onClick={() =>
                            handleDeleteImg({ slug, img: f, imgs })
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-100 w-full bg-white opacity-50" />
              )}
              <div className="flex items-center gap-2">
                <label
                  htmlFor="imgs"
                  className="bg-accent2 hover:bg-accent2/80 cursor-pointer rounded-lg px-6 py-1.5 font-medium text-white shadow-xs transition-colors duration-200"
                >
                  {files?.length && files.length > 0
                    ? "Zamenjaj ostale fotografije"
                    : "Dodaj ostale fotografije"}
                </label>
                {files && (
                  <XIcon
                    height={20}
                    className="cursor-pointer text-red-500"
                    onClick={() => setFiles(null)}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            className="bg-accent hover:bg-accent/80 font-tmedium cursor-pointer self-end rounded-lg px-4 py-1 text-white transition-colors duration-200"
            onClick={handleSubmit}
          >
            Shrani
          </button>
        </div>
      </EditorContext.Provider>
    </>
  );
}

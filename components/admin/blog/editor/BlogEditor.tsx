"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import MenuBar from "./MenuBar";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import TipTapImage from "@tiptap/extension-image";
import { useState } from "react";
import { ChevronDown, Save, XIcon } from "lucide-react";
import Image from "next/image";
import { addPost } from "@/lib/actions";

const categories = ["Novice", "Veterinarski nasveti", "Učni nasveti"];

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsOpenCategories(false);
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);

      if (editor) {
        const html = editor.getHTML();

        await addPost({
          title,
          html,
          category: category.join(", "),
          imgs: files,
          coverImg: file,
          summary,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
              />
            </div>
          </div>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col items-center gap-4">
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
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
                {file && (
                  <XIcon
                    height={20}
                    className="cursor-pointer text-red-500"
                    onClick={() => setFile(null)}
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

              {files?.length ? (
                <div className="grid grid-cols-2 gap-3">
                  {[...files].map((f, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <Image
                        src={URL.createObjectURL(f)}
                        alt="slika"
                        height={400}
                        width={400}
                        className="h-auto w-full object-cover"
                      />
                      <XIcon
                        className="cursor-pointer text-red-500"
                        onClick={() => {
                          const updatedFiles = Array.from(files).filter(
                            (img) => f.name !== img.name,
                          );

                          const dataTransfer = new DataTransfer();
                          updatedFiles.forEach((file) =>
                            dataTransfer.items.add(file),
                          );

                          if (files.length > 1) {
                            setFiles(dataTransfer.files);
                          } else {
                            setFiles(null);
                          }
                        }}
                      />
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
            className="bg-accent hover:bg-accent/80 flex cursor-pointer items-center gap-2 self-end rounded-lg px-4 py-1 font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-20"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              "..."
            ) : (
              <>
                <Save height={20} />
                Shrani
              </>
            )}
          </button>
        </div>
      </EditorContext.Provider>
    </>
  );
}

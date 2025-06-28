"use client";

import "cropperjs/dist/cropper.css";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect, useState } from "react";

import Image from "@tiptap/extension-image";
// Update the import path below if your ImageCropperModal is not in src/components
import ImageCropperModal from "../../components/ImageCropperModal";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

export default function EditorPage() {
  const [mounted, setMounted] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [pendingImageInsert, setPendingImageInsert] = useState(false);

  const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: "",
        renderHTML: attributes => {
          return {
            style: attributes.style || "",
          };
        },
      },
    };
  },
});

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomImage,
    ],
    content: "<p>Hello world! Start typing...</p>",
    autofocus: true,
    editable: true,
    injectCSS: true,
    immediatelyRender: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInsertImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageDataUrl(reader.result);
          setPendingImageInsert(true);
        }
      };
      reader.readAsDataURL(file);
    };
  };

  const handleCropped = (blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const isImageActive = editor?.isActive("image");

  if (isImageActive) {
    // Replace current image node
    editor?.chain().focus().updateAttributes("image", { src: url }).run();
  } else {
    // Insert new image
    editor?.chain().focus().setImage({ src: url }).run();
  }

  setImageDataUrl(null);
  setPendingImageInsert(false);
};

  if (!mounted || !editor) return null;

  const buttonClass = (isActive: boolean) =>
    `px-2 py-1 border rounded text-sm ${
      isActive ? "bg-blue-100 border-blue-500" : "bg-white border-gray-300"
    }`;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tiptap with Image Upload + Crop</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {/* Toolbar Buttons */}
        <button className={buttonClass(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button className={buttonClass(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button className={buttonClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button className={buttonClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button className={buttonClass(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</button>
        <button className={buttonClass(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button className={buttonClass(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button className={buttonClass(editor.isActive({ textAlign: "left" }))} onClick={() => editor.chain().focus().setTextAlign("left").run()}>Left</button>
        <button className={buttonClass(editor.isActive({ textAlign: "center" }))} onClick={() => editor.chain().focus().setTextAlign("center").run()}>Center</button>
        <button className={buttonClass(editor.isActive({ textAlign: "right" }))} onClick={() => editor.chain().focus().setTextAlign("right").run()}>Right</button>
        <button className={buttonClass(false)} onClick={() => editor.chain().focus().undo().run()}>Undo</button>
        <button className={buttonClass(false)} onClick={() => editor.chain().focus().redo().run()}>Redo</button>
        <button className={buttonClass(false)} onClick={handleInsertImage}>Insert Image</button>
      </div>

      <div className="border rounded p-4 min-h-[250px]">
        <EditorContent editor={editor} />
      </div>

      {pendingImageInsert && imageDataUrl && (
        <ImageCropperModal
          imageDataUrl={imageDataUrl}
          onCrop={handleCropped}
          onClose={() => {
            setPendingImageInsert(false);
            setImageDataUrl(null);
          }}
        />
      )}
      
      {editor && editor.isActive("image") && (
  <div className="flex gap-2 mb-2">
    <button
      className="border px-2 py-1 text-sm rounded"
      onClick={() => {
        const imgNode = editor.state.selection.node;
        const src = imgNode?.attrs?.src;
        if (src) {
          setImageDataUrl(src);
          setPendingImageInsert(true);
        }
      }}
    >
      Re-Crop Image
    </button>
    <button
      className="border px-2 py-1 text-sm rounded"
      onClick={() => {
        editor.chain().focus().updateAttributes("image", {
          style: "float: left; margin: 0 10px 10px 0;",
        }).run();
      }}
    >
      Align Left
    </button>
    <button
      className="border px-2 py-1 text-sm rounded"
      onClick={() => {
        editor.chain().focus().updateAttributes("image", {
          style: "display: block; margin: 0 auto;",
        }).run();
      }}
    >
      Align Center
    </button>
    <button
      className="border px-2 py-1 text-sm rounded"
      onClick={() => {
        editor.chain().focus().updateAttributes("image", {
          style: "float: right; margin: 0 0 10px 10px;",
        }).run();
      }}
    >
      Align Right
    </button>
  </div>
)}
    </div>
  );
}

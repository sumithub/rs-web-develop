import { Node, mergeAttributes } from "@tiptap/core";

import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizableImageComponent from "./ResizableImageComponent";

export const ResizableImage = Node.create({
  name: "resizableImage",
  group: "block",
  draggable: true,
  selectable: true,
  atom: true,
  //inline: true,

 addAttributes() {
  return {
    src: { default: null },
    width: { default: "auto" },
    height: { default: "auto" },
    alignment: {
      default: "center",
      rendered: false,
    },
    id: { default: null },
  };
},
  parseHTML() {
  return [
    {
      tag: "img[data-type='resizable-image']",
      getAttrs: (dom: any) => ({
        src: dom.getAttribute("src"),
        width: dom.getAttribute("width"),
        height: dom.getAttribute("height"),
        alignment: dom.style?.margin?.includes("auto auto") ? "center" : "left",
        id: dom.getAttribute("data-id"),
      }),
    },
  ];
},

  renderHTML({ HTMLAttributes }) {
  return [
    "img",
    mergeAttributes(HTMLAttributes, {
      "data-type": "resizable-image",
      src: HTMLAttributes.src,
      width: HTMLAttributes.width,
      height: HTMLAttributes.height,
      "data-id": HTMLAttributes.id,
      style: `display: block; margin: ${
        HTMLAttributes.alignment === "left"
          ? "0 auto 0 0"
          : HTMLAttributes.alignment === "right"
          ? "0 0 0 auto"
          : "0 auto"
      };`,
    }),
  ];
},

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
  
});

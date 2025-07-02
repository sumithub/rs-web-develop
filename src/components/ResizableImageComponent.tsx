import React, { useRef, useState } from "react";

import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";

export default function ResizableImageComponent({ node, updateAttributes }: NodeViewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const startResize = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeHandle(handle);
    setStartX(e.clientX);
    setStartWidth(imgRef.current?.offsetWidth || 0);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing || !resizeHandle) return;

      let deltaX = moveEvent.clientX - startX;
      let newWidth = startWidth + deltaX;
      if (newWidth < 50) newWidth = 50; // Minimum width

      updateAttributes({ width: `${newWidth}px` });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      setResizeHandle(null);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const alignment = node.attrs.alignment || "center";

  const getJustify = () => {
    if (alignment === "left") return "flex-start";
    if (alignment === "right") return "flex-end";
    return "center";
  };

  // Unique key forces re-render when id changes
  const uniqueKey = node.attrs.id || node.attrs.src;

  return (
    <NodeViewWrapper
      key={uniqueKey}
      draggable="true"
      data-drag-handle
      style={{
        display: "flex",
        justifyContent: getJustify(),
        margin: "12px 0",
        border: '1px solid red', // Optional: for debugging
      }}
    >
      <div
        style={{
          position: "relative",
          width: node.attrs.width || "300px",
        }}
      >
        <img
          ref={imgRef}
          src={node.attrs.src}
          alt=""
          style={{
            width: "100%",
            display: "block",
            maxWidth: "100%",
            borderRadius: "6px",
          }}
        />
        {/* Resize Handles */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((handle) => {
          const style: React.CSSProperties = {
            position: "absolute",
            width: 12,
            height: 12,
            background: "#666",
            borderRadius: "2px",
            cursor: "nwse-resize",
          };
          switch (handle) {
            case "top-left":
              style.left = 0;
              style.top = 0;
              break;
            case "top-right":
              style.right = 0;
              style.top = 0;
              break;
            case "bottom-left":
              style.left = 0;
              style.bottom = 0;
              break;
            case "bottom-right":
              style.right = 0;
              style.bottom = 0;
              break;
          }
          return (
            <div
              key={handle}
              onMouseDown={(e) => startResize(e, handle)}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 12,
                height: 12,
                background: "#666",
                borderRadius: "2px",
                cursor: "nwse-resize",
                zIndex: 20
              }}
            />
          );
        })}

        {/* Crop Button */}
        <button
          onClick={() => {
            window.dispatchEvent(
              new CustomEvent("open-image-cropper", {
                detail: {
                  src: node.attrs.src,
                  onCrop: (newSrc: string) => {
                    updateAttributes({ src: newSrc });
                  },
                },
              })
            );
          }}
          style={{
            position: "absolute",
            top: 4,
            right: 40,
            padding: "2px 6px",
            fontSize: 10,
            background: "white",
            border: "1px solid #ccc",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          Crop
        </button>
      </div>
    </NodeViewWrapper>
  );
}
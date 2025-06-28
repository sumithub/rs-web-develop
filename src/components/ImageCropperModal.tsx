// components/ImageCropperModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";

import Cropper from "cropperjs";

type Props = {
  imageDataUrl: string;
  onCrop: (blob: Blob) => void;
  onClose: () => void;
};

export default function ImageCropperModal({ imageDataUrl, onCrop, onClose }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    if (imgRef.current) {
      cropperRef.current = new Cropper(imgRef.current, {
        aspectRatio: NaN,
        viewMode: 1,
      });
    }

    return () => {
      cropperRef.current?.destroy();
    };
  }, []);

  const handleCrop = () => {
    cropperRef.current?.getCroppedCanvas().toBlob((blob) => {
      if (blob) onCrop(blob);
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow max-w-2xl w-full">
        <img ref={imgRef} src={imageDataUrl} alt="To crop" className="max-w-full max-h-[400px]" />
        <div className="mt-4 flex justify-end gap-2">
          <button className="bg-gray-200 px-4 py-1 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleCrop}>Crop & Insert</button>
        </div>
      </div>
    </div>
  );
}

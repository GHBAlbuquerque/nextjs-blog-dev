"use client";

import { ImageUpIcon } from "lucide-react";
import Button from "../Button";
import { useRef } from "react";

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload() {
    if(!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button type="button" variant="default"
        onClick={handleImageUpload}>
        <ImageUpIcon />
        Upload Image
      </Button>

      <input
        ref={fileInputRef}
        className="hidden" // let mny input be hidden and click through button 
        name="file"
        type="file"
        accept="image/*"
      />
    </div>
  );
}

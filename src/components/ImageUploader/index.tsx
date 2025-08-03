"use client";

import { ImageUpIcon } from "lucide-react";
import Button from "../Button";
import { useRef } from "react";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/post/constants";
import { toast } from "react-toastify";

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChooseImage() {
    if(!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleChange(){
    if(!fileInputRef.current) return;
    const fileInput = fileInputRef.current;
    const file = fileInput.files?.[0]; // it is possible yo upload multiple files, but in this case we have only one

    if(!file) return;

    if(file.size > IMAGE_UPLOAD_MAX_SIZE) {
        toast.error(`Image size must be less than ${IMAGE_UPLOAD_MAX_SIZE / 1000}kb`)

    fileInput.value = "";
    return;
    }

    const formData = new FormData(); // if image size is ok, append it to the form so it can be sent
    formData.append("file", file);

    //TODO file upload
    console.log(formData.get('file'))

    fileInput.value = "";
  }



  return (
    <div className="flex flex-col items-start gap-2">
      <Button type="button" variant="default"
        onClick={handleChooseImage}>
        <ImageUpIcon />
        Upload Image
      </Button>

      <input
        ref={fileInputRef}
        className="hidden" // let mny input be hidden and click through button 
        name="file"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}

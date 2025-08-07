"use client";

import { ImageUpIcon } from "lucide-react";
import Button from "../Button";
import { useRef, useState, useTransition } from "react";
import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/post/constants";
import { toast } from "react-toastify";
import { uploadImageAction } from "@/actions/posts/upload-image-action";

export default function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startUpload] = useTransition();
  const [imgUrl, setImgUrl] = useState("");

  function handleChooseImage() {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  function handleChange() {
    toast.dismiss();

    if (!fileInputRef.current) return;
    const fileInput = fileInputRef.current;
    const file = fileInput.files?.[0]; // it is possible yo upload multiple files, but in this case we have only one

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      toast.error(
        `Image size must be less than ${IMAGE_UPLOAD_MAX_SIZE / 1000}kb`
      );

      fileInput.value = "";
      return;
    }

    const formData = new FormData(); // if image size is ok, append it to the form so it can be sent
    formData.append("file", file);

    startUpload(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        toast.error(result.error);
        fileInput.value = "";
        return;
      }

      setImgUrl(result.url);
      toast.success("Imagem enviada");
    });

    fileInput.value = "";
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button type="button" variant="default" onClick={handleChooseImage} disabled={isUploading}>
        <ImageUpIcon />
        Upload Image
      </Button>

      {!!imgUrl && (
        <div>
          <p>
            <b>URL: </b>
            {imgUrl}
          </p>

          {/* eslint-disable-next-line */}
          <img src={imgUrl} />
        </div>
      )}

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

"use server";

import { mkdir, writeFile } from "fs/promises";
import { extname, resolve } from "path";

const imgServerUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || '';
const imgUploadDir = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_DIR || '';
const imgUploadMaxSize = Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 0;

// any function inside this file will be a server action, exposed to the client
// beware of helper functions because they might be exposed

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<UploadImageActionResult> {
  //TODO: check user login before executing

  const makeResult = ({ url = "", error = "" }): UploadImageActionResult => ({
    url,
    error,
  });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: "Invalid data." });
  }

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return makeResult({ error: "Invalid file." });
  }

  if (file.size > imgUploadMaxSize) {
    return makeResult({ error: "File is too large." });
  }

  console.log(file.type);
  if (!file.type.startsWith("image/")) {
    return makeResult({ error: "Invalid image." });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}_${file.name}_${imageExtension}`;

  const uploadFullPath = resolve(process.cwd(), "public", imgUploadDir);
  await mkdir(uploadFullPath, { recursive: true });

  // JS from the window -> bytes -> Node -> save
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const url = `${imgServerUrl}/${uniqueImageName}`;

  return makeResult({ url: url });
}

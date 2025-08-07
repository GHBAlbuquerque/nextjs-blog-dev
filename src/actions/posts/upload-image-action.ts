"use server";

import { IMAGE_UPLOAD_MAX_SIZE } from "@/lib/post/constants";

// any function inside this file will be a server action, exposed to the client
// beware of helper functions because they might be exposed

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData
): Promise<UploadImageActionResult> {
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

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({ error: "File is too large." });
  }

  if (file.type.startsWith("image/")) {
    return makeResult({ error: "Invalid image." });
  }

  return makeResult({ url: "URL" });
}

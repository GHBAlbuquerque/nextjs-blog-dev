"use server";

import { postRepository } from "@/repositories/post";
import simulateWait from "@/utils/simulate-wait";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  //TODO: check user login before deleting

  if (!id || typeof id !== "string") {
    return {
      error: "Invalid id",
    };
  }

  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: [e.message],
      };
    }

    return {
      errors: ["Unknown error"],
    };
  }

  revalidateTag("posts"); //defined on the queries file for posts,  revalidate the cache tag to remove the deleted one
  revalidateTag(`post-${post.slug}`); //defined on the queries file for posts

  await simulateWait();
  return {
    error: "",
  };
}

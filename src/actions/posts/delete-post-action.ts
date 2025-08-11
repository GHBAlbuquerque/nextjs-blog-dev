"use server";

import { verifyLoginSession } from "@/lib/login/manage-login";
import { postRepository } from "@/repositories/post";
import { revalidateTag } from "next/cache";

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return {
      error: "Please login again",
    };
  }

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

  return {
    error: "",
  };
}

"use server";

import {
  makePartialPublicPost,
  makePublicPostFromDb,
  PublicPost,
} from "@/dto/post/dto";
import { PostUpdateSchema } from "@/lib/post/validations";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";
import { postRepository } from "@/repositories/post";

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData
): Promise<UpdatePostActionState> {
  // update a UpdatePostActionState with params from formData

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Invalid data."],
    };
  }

  const id = formData.get("id")?.toString() || "";

  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["Invalid data."],
    };
  }

  const formDataEntries = formData.entries(); // generate key-value objects from formData
  const formDataObj = Object.fromEntries(formDataEntries);
  const zodValidatedObj = PostUpdateSchema.safeParse(formDataObj);

  if (!zodValidatedObj.success) {
    const errors = getZodErrorMessages(zodValidatedObj.error.format());
    return {
      errors: errors,
      formState: makePartialPublicPost(formDataObj), // fields in the form have the same keys as PublicPost
    };
  }

  const validPostData = zodValidatedObj.data;
  const newPost = {
    ...validPostData,
    updatedAt: new Date().toISOString(),
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataObj),
      errors: ["Unknown error"],
    };
  }

  revalidateTag("posts"); //defined on the queries file for posts, revalidate the cache tag to include the new one
  revalidateTag(`post-${post.slug}`); //defined on the queries file for posts, revalidate the cache tag to include the new one

  return {
    formState: makePublicPostFromDb(post),
    errors: [],
    success: true,
  };
}

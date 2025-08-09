"use server";

import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { PostCreateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/post/post-model";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { makeSlugFromText } from "@/utils/make-slug-from-text";
import { revalidateTag } from "next/cache";
import { v4 as uuidV4 } from "uuid";
import { redirect } from "next/navigation";
import { postRepository } from "@/repositories/post";

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData
): Promise<CreatePostActionState> {
  // create a CreatePostActionState with params from formData

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Invalid data."],
    };
  }

  const formDataEntries = formData.entries(); // generfate key-value objects from formData
  const formDataObj = Object.fromEntries(formDataEntries);
  const zodValidatedObj = PostCreateSchema.safeParse(formDataObj);

  console.log("formDataObj", formDataObj);

  if (!zodValidatedObj.success) {
    const errors = getZodErrorMessages(zodValidatedObj.error.format());
    return {
      errors: errors,
      formState: makePartialPublicPost(formDataObj), // fields in the form have the same keys as PublicPost
    };
  }

  const validPostData = zodValidatedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    id: uuidV4(),
    slug: makeSlugFromText(validPostData.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if(e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message]
      }
    }

    return {
      formState: newPost,
      errors: ["Unknown error"]
    }
  }


  revalidateTag("posts"); //defined on the queries file for posts, revalidate the cache tag to include the new one
  redirect(`/admin/posts/${newPost.id}`);
}

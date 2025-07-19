import { postRepository } from "@/repositories/post";
import { cache } from "react";

export const findPostByIdAdmin = cache(async (id: string) => {
  const post = await postRepository.findById(id).catch((e) => {
    console.error(e);
    return undefined;
  })
  return post;
});

export const findAllPostsAdmin = cache(async () => {
  return postRepository.findAll();
});


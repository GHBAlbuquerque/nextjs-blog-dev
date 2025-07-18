import { postRepository } from "@/repositories/post";
import { cache } from "react";

export const findAllPublicPostsCached = cache(
  async () => await postRepository.findAllPublic()
);

export const findPostByIdCached = cache(async (id: string) => {
  const post = await postRepository.findById(id).catch((e) => {
    console.error(e);
    return undefined;
  });

  return post;
});

export const findPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.findBySlugPublic(slug).catch((e) => {
    console.error(e);
    return undefined;
  });

  return post;
});

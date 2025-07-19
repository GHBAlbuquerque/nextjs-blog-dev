import { postRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const findAllPublicPostsCached = unstable_cache(cache(
  async () => {
    console.log("findAllPublicPostsCached");
    return await postRepository.findAllPublic()
  }
  
), ['posts'], {
  tags: ['posts'],
  revalidate: 15
});

export const findPostBySlugCached = (slug: string) => unstable_cache(cache(async (slug: string) => {
  const post = await postRepository.findBySlugPublic(slug).catch((e) => {
    console.error(e);
    return undefined;
  });

  return post;
}), ['posts'], {
  tags: [`posts-${slug}`],
  revalidate: 30
})(slug);


export const findPostByIdCached = cache(async (id: string) => {
  const post = await postRepository.findById(id).catch((e) => {
    console.error(e);
    return undefined;
  })
  return post;
});

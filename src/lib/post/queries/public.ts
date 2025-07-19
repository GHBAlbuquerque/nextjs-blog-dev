import { postRepository } from "@/repositories/post";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const findAllPublicPostsCached = unstable_cache(cache(
  async () => {
    return await postRepository.findAllPublic()
  }
  
), ['posts'], {
  tags: ['posts'],
  revalidate: 15
});

export const findPublicPostBySlugCached = (slug: string) => unstable_cache(cache(async (slug: string) => {
  const post = await postRepository.findBySlugPublic(slug).catch((e) => {
    console.error(e);
    return undefined;
  });

  return post;
}), ['posts'], {
  tags: [`posts-${slug}`],
  revalidate: 30
})(slug);


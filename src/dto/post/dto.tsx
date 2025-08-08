import { PostModel } from "@/models/post/post-model";

export type PublicPost = Omit<PostModel, "updatedAt">;

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    author: post.author,
    content: post.content,
    coverImageUrl: post.coverImageUrl,
    createdAt: post.createdAt,
    published: post.published,
  };
};

export const makePartialPublicPost = (
  post?: Partial<PostModel>
): PublicPost => {
  return {
    id: post?.id || "",
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    author: post?.author || "",
    content: post?.content || "",
    coverImageUrl: post?.coverImageUrl || "",
    createdAt: post?.createdAt || "",
    published: post?.published || false,
  };
};

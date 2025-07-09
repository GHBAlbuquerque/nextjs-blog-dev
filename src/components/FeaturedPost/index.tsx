import { postRepository } from "@/repositories/post";
import PostCoverImage from "../PostCoverImage";
import PostSummary from "../PostSummary";

type FeaturedpostProps = {
  id: string;
};

export default async function FeaturedPost({ id }: FeaturedpostProps) {
  const post = await postRepository.findById(id);

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 group">
      <PostCoverImage
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          width: 1024,
          height: 720,
          priority: true,
        }}
        linkProps={{ href: `/posts/${post.slug}` }}
      />
      <PostSummary
        postUrl={`/posts/${post.slug}`}
        postHeadingType={"h1"}
        post={post}
      />
    </section>
  );
}

import { findAllPublicPostsCached } from "@/lib/post/queries";
import PostCoverImage from "../PostCoverImage";
import PostSummary from "../PostSummary";

export default async function FeaturedPost() {
  const posts = await findAllPublicPostsCached();
  const post = posts[0];

  const postLink = `/posts/${post.slug}`;

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
        linkProps={{ href: postLink }}
      />
      <PostSummary
        postUrl={`/posts/${post.slug}`}
        postHeadingType={"h1"}
        post={post}
      />
    </section>
  );
}

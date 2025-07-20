import { findAllPublicPostsCached } from "@/lib/post/queries/public";
import PostCoverImage from "../PostCoverImage";
import PostSummary from "../PostSummary";
import DisplayErrorMessage from "../DisplayErrorMessage";

export default async function FeaturedPost() {
  const posts = await findAllPublicPostsCached();

  if(posts.length === 0) return <DisplayErrorMessage contentTitle='Ops! 😅' content='No posts yet.'/>

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

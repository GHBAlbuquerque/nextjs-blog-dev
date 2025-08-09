import PostCoverImage from "../PostCoverImage";
import clsx from "clsx";
import PostSummary from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries/public";

export default async function PostsList() {
  const posts = await findAllPublicPostsCached();
  return (
    <div className="grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.slice(1).map((post) => {
        return (
          <div
            className={clsx("flex", "flex-col", "gap-3", "group")}
            key={post.id}
          >
            <PostCoverImage
              imageProps={{
                src: post.coverImageUrl,
                alt: post.title,
                width: 700,
                height: 300,
              }}
              linkProps={{
                href: `/posts/${post.slug}`,
              }}
            />
            <PostSummary
              postUrl={`/posts/${post.slug}`}
              postHeadingType={"h2"}
              post={post}
            />
          </div>
        );
      })}
    </div>
  );
}

import { postRepository } from "@/repositories/post";
import PostCoverImage from "../PostCoverImage";
import clsx from "clsx";
import PostSummary from "../PostSummary";

export default async function PostsList() {
  const posts = await postRepository.findAll();
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => {
        if (index == 0) return;
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
                href: `/post/${post.slug}`,
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

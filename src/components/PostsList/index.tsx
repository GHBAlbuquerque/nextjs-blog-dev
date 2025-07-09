import { postRepository } from "@/repositories/post";
import PostCoverImage from "../PostCoverImage";
import PostHeading from "../PostHeading";
import clsx from "clsx";

export default async function PostsList() {
  const posts = await postRepository.findAll();
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => {
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
            <time
              className="text-slate-600 block text-sm/tight"
              dateTime={post.createdAt}
            >
              {post.createdAt}
            </time>
            <PostHeading url="#" as="h2">
              {post.title}
            </PostHeading>
            <p className="leading-normal text-left">{post.excerpt}</p>
          </div>
        );
      })}
    </div>
  );
}

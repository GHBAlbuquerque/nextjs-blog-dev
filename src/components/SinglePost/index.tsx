import { findPostBySlugCached } from "@/lib/post/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import PostHeading from "../PostHeading";
import { formatDatetime } from "@/utils/date-utils";
import { SafeMarkdown } from "../SafeMarkdown";

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);

  if (!post) notFound();

  return (
    <article className="mb-16">
      <header className="flex flex-col gap-4 mb-4">
        {" "}
        <Image
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          className="rounded-xl max-h-[600px] object-cover object-center"
        />
        <PostHeading url={`/posts/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} |{" "}
          <span className="text-slate-600  dark:text-slate-400 font-light">
            {formatDatetime(post.createdAt)}
          </span>
        </p>
      </header>
      <p className="mb-6 text-slate-500 dark:text-slate-400 italic">
        {post.excerpt}
      </p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}

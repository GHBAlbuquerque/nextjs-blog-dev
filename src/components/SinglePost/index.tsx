import { findPostBySlugCached } from "@/lib/post/queries";
import { notFound } from "next/navigation";

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold py-6">Dinâmica: {post.title}</h1>
    </div>
  );
}

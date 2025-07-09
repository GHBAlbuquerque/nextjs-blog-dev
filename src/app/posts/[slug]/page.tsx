import { findPostBySlugCached } from "@/lib/post/queries";
import { notFound } from "next/navigation";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  const post = await findPostBySlugCached(slug);

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-extrabold py-6">Dinâmica: {post.title}</h1>
    </div>
  );
}

import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

  return (
    <div className="py-8">
      {posts.map((post) => {
        return (
          <div
            key={post.id}
            className={clsx(
              "p-2",
              !post.published && "text-slate-600",
              "flex",
              "gap-2",
              "items-center",
              "justify-between"
            )}
          >
            <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>

            {!post.published && (
              <span className="pl-1 text-xs text-slate-700 italic">
                (Not published)
              </span>
            )}

            <button
              className={clsx(
                "text-red-400",
                "cursor-pointer",
                "[&_svg]:w-4",
                "[&_svg]:h-4",
                "hover:scale-130",
                "hover:text-red-600",
                "transition"
              )}

              aria-label={`Delete post: ${post.title}`}
              title={`Delete post: ${post.title}`}
            >
              <Trash2Icon />
            </button>
          </div>
        );
      })}
    </div>
  );
}

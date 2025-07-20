import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import clsx from "clsx";
import Link from "next/link";
import DeletePostButton from "../DeletePostButton";

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
            <form>
              <input type="hidden" name="id" defaultValue={post.id} />
              <DeletePostButton id={post.id} title={post.title}/>
            </form>
          </div>
        );
      })}
    </div>
  );
}

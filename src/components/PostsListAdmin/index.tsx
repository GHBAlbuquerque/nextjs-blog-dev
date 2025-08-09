import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import clsx from "clsx";
import Link from "next/link";
import DeletePostButton from "../DeletePostButton";
import DisplayErrorMessage from "../DisplayErrorMessage";

export default async function PostsListAdmin() {
  const posts = await findAllPostsAdmin();

    if(posts.length === 0) return <DisplayErrorMessage contentTitle='Ops! 😅' content={`No posts yet. Why don't you create one?`}/>

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

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}
    </div>
  );
}

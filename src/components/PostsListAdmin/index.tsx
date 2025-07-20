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

            <DeletePostButton id={post.id} title={post.title} />
          </div>
        );
      })}

      <div
        className={clsx(
          "fixed",
          "top-0",
          "bottom-0",
          "left-0",
          "right-0",
          "bg-slate-900/50",
          "backdrop-blur-xs",
          "flex",
          "items-center",
          "justify-center"
        )}
      >
        <div
          className={clsx(
            "bg-slate-100",
            "p-6",
            "rounded-lg",
            "max-w-2xl",
            "mx-6",
            "dark:text-slate-900",
            "flex",
            "flex-col",
            "gap-6",
            "shadow-lg",
            "shadow-black/30",
            "text-center"
          )}
        >
          <h3 className="text-xl font-extrabold">Title</h3>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut at
            soluta vel modi, quod enim ad sapiente tenetur temporibus error unde
            optio suscipit labore quaerat, delectus voluptatem qui id quae.
          </p>
          <div className={clsx("flex", "items-center", "justify-around")}>
            <button
              className={clsx(
                "bg-slate-300",
                "hover:bg-slate-400",
                "transition",
                "text-slate-950",
                "flex",
                "items-center",
                "justify-center",
                "py-2",
                "px-4",
                "rounded-lg",
                "cursor-pointer"
              )}
            >
              Cancel
            </button>
            <button className={clsx(
                "bg-blue-500",
                "hover:bg-blue-600",
                "transition",
                "text-slate-100",
                "flex",
                "items-center",
                "justify-center",
                "py-2",
                "px-4",
                "rounded-lg",
                "cursor-pointer"
              )}>Ok</button>
          </div>
        </div>
      </div>
    </div>
  );
}

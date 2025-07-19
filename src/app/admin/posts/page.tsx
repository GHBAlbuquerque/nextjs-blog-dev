import { findAllPostsAdmin } from "@/lib/post/queries/admin";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Post Admin"
}

export default async function AdminPostsPage(){
    const posts = await findAllPostsAdmin();

    return <div className="py-2 text-2xl">
        {
            posts.map(post => {
                return <p key={post.id}>{post.title}</p>
            })
        }
    </div>
}
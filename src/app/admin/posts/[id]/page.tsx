import ManagePostForm from "@/components/ManagePostForm";
import { makePublicPostFromDb } from "@/dto/post/dto";
import { findPostByIdAdmin } from "@/lib/post/queries/admin";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Edit Post",
}

type AdminPostsIdPageProps = {
    params: Promise<{
        id: string
    } >;
};

export default async function AdminPostsIdPage({ params } : AdminPostsIdPageProps){
    const {id} = await params;
    const post = await findPostByIdAdmin(id).catch();
    console.log(post);

    if(!post) notFound();

    const publicPost = makePublicPostFromDb(post);
    
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-xl font-extrabold">Edit Post</h1>
            <ManagePostForm publicPost={publicPost}/>
        </div>
    )
}
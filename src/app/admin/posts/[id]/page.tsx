export const dynamic = 'force-dynamic';

type AdminPostsIdPageProps = {
    params: Promise<{
        id: string
    } >;
};

export default async function AdminPostsIdPage({ params } : AdminPostsIdPageProps){
    const {id} = await params;
    
    return <div className="py-2 text-6xl">
        AdminPostsIdPage - {id}
    </div>
}
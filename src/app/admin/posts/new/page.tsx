import Button from "@/components/Button";
import { BanIcon, BugIcon, CheckIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminPostsNewPage(){
    return <div className="py-16 flex gap-4 flex-wrap items-center">
    <Button variant="default" size='lg'><CheckIcon/> Confirm</Button>
    <Button variant="ghost" size='md'><BanIcon/> Cancel</Button>
    <Button variant="danger" size='sm'><BugIcon/> Delete</Button>
    </div>
}
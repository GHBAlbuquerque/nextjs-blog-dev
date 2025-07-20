'use client';

import { deletePostAction } from "@/actions/posts/delete-post-action";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";

type DeletePostButtonProps = {
    id: string;
    title: string;
}

export default function DeletePostButton({id, title} : DeletePostButtonProps) {
   const [isPending, startTransition] = useTransition();
    
    async function handleClick(){
        startTransition(async () => {
            console.log(isPending)
            const result = await deletePostAction(id);
            alert("Result é " + result)
        })
  
    }

    return (
        <button
                className={clsx(
                  "text-red-400",
                  "cursor-pointer",
                  "[&_svg]:w-4",
                  "[&_svg]:h-4",
                  "hover:scale-130",
                  "hover:text-red-600",
                  "transition",
                  "disabled:text-slate-600",
                  "disabled:cursor-not-allowed"
                )}
                aria-label={`Delete post: ${title}`}
                title={`Delete post: ${title}`}
                onClick={handleClick}
                disabled={isPending}
              >
                <Trash2Icon />
              </button>
    )

}
'use client';

import { deletePostAction } from "@/actions/posts/delete-post-action";
import clsx from "clsx";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import Dialog from "../Dialog";
import { toast } from "react-toastify";

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm(){
     toast.dismiss();

      startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);
      
      if(result.error) {
        toast.error(`Error: ${result.error}`)
        return;
      }

      toast.success(`Successfully deleted post.`)
    });
  }

  return (<>
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

    {showDialog && 
      <Dialog isVisible={showDialog} 
      title={`Delete post?`} 
      content={`Are you sure you want to delete the post "${title}"?`}
      onConfirm={() => handleConfirm()}
      onCancel={() => setShowDialog(false)}
      disabled={isPending}
      />}
    </>
  );
}

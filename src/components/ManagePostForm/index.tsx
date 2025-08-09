"use client";

import { CheckIcon } from "lucide-react";
import Button from "../Button";
import { InputCheckbox } from "../InputCheckbox";
import { InputText } from "../InputText";
import MarkdownEditor from "../MarkdownEditor";
import { useActionState, useEffect, useState } from "react";
import ImageUploader from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/posts/create-post-action";
import { toast } from "react-toastify";
import { updatePostAction } from "@/actions/posts/update-post-action";
import { useRouter, useSearchParams } from "next/navigation";

type ManagePostFormUpdateProps = { // props for update with publicPost
  mode: "update";
  publicPost: PublicPost;
};

type ManagePostFormCreateProps = { // props for creation, no post
  mode: "create";
};

type ManagePostFormProps =
  | ManagePostFormUpdateProps
  | ManagePostFormCreateProps; // can be of any type of props

export default function ManagePostForm(props: ManagePostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const created = searchParams.get("created");
  const router = useRouter();
  
  let publicPost;
  if (mode === "update") {
    publicPost = props.publicPost; // I conditionally get the post from the props
  }

  const actionsMap = {
    update: updatePostAction,
    create: createPostAction,
  }

  const initialState = {
    formState: makePartialPublicPost(publicPost), // either I put the information retrieved from the db or the default values
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode], // calls this action when useActionState is called based on mode
    initialState // pass what i receive from the db or initial state (empty)
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(formState.content);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => {
        toast.error(error);
      });
    }
  }, [state.errors]);

  useEffect(() => {
     if(state.success) {
      toast.dismiss();
      toast.success(`Successfully updated post.`)
    }
  }, [state.success]);

    useEffect(() => {
     if(created === '1') {
      toast.dismiss();
      toast.success(`Successfully created post.`)
      
      // clean up URL to remove "created"param so message is not shown on refresh
      const url = new URL(window.location.href) //get current url
      url.searchParams.delete('created');
      router.replace(url.toString());
    }

  }, [created, router]);

  return (
    <form action={action} className="mb-6">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="Id automatically generated"
          type="text"
          defaultValue={formState.id}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug automatically generated"
          type="text"
          defaultValue={formState.slug}
          disabled={isPending}
          readOnly
        />

        <InputText
          labelText="Author"
          name="author"
          placeholder="Your name"
          type="text"
          defaultValue={formState.author}
          disabled={isPending}
        />

        <InputText
          labelText="Title"
          name="title"
          placeholder="Your post title"
          type="text"
          defaultValue={formState.title}
          disabled={isPending}
        />

        <InputText
          labelText="Excerpt"
          name="excerpt"
          placeholder="Post excerpt"
          type="text"
          defaultValue={formState.excerpt}
          disabled={isPending}
        />

        <MarkdownEditor
          labelText="Content"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={isPending}
        />

        <ImageUploader disabled={isPending}/>

        <InputText
          labelText="Image Url"
          name="coverImageUrl"
          placeholder="Image Url"
          type="text"
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />

        <InputCheckbox
          labelText="Publish?"
          name="published"
          type="checkbox"
          defaultChecked={formState.published}
          disabled={isPending}
        />
      </div>

      <div className="mt-6">
        <Button variant="default" size="md" type="submit" disabled={isPending}>
          <CheckIcon /> Submit
        </Button>
      </div>
    </form>
  );
}

"use client";

import { CheckIcon } from "lucide-react";
import Button from "../Button";
import { InputCheckbox } from "../InputCheckbox";
import { InputText } from "../InputText";
import MarkdownEditor from "../MarkdownEditor";
import { useActionState, useState } from "react";
import ImageUploader from "../ImageUploader";
import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { createPostAction } from "@/actions/posts/create-post-action";

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export default function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const initialState = {
    formState: makePartialPublicPost(publicPost), // either I put the information retrieved from the db or the default values
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    createPostAction, // calls this action when useActionState is called
    initialState // pass what i receive from the db or initial state (empty)
  );

  const {formState} = state;
  const [contentValue, setContentValue] = useState(formState.content);

  return (
    <form action={action} className="mb-6">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="Id automatically generated"
          type="text"
          defaultValue={formState.id}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug automatically generated"
          type="text"
          defaultValue={formState.slug}
          readOnly
        />

        <InputText
          labelText="Author"
          name="author"
          placeholder="Your name"
          type="text"
          defaultValue={formState.author}
        />

        <InputText
          labelText="Title"
          name="title"
          placeholder="Your post title"
          type="text"
          defaultValue={formState.title}
        />

        <InputText
          labelText="Excerpt"
          name="excerpt"
          placeholder="Post excerpt"
          type="text"
          defaultValue={formState.excerpt}
        />

        <MarkdownEditor
          labelText="Content"
          value={contentValue}
          setValue={setContentValue}
          textAreaName="content"
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText="Image Url"
          name="ImageUrl"
          placeholder="Image Url"
          type="text"
          defaultValue={formState.coverImageUrl}
        />

        <InputCheckbox
          labelText="Publish?"
          name="published"
          type="checkbox"
          defaultChecked={formState.published}
        />
      </div>

      <div className="mt-6">
        <Button variant="default" size="md" type="submit">
          <CheckIcon /> Submit
        </Button>
      </div>
    </form>
  );
}

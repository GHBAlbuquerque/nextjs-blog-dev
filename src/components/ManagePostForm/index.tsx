"use client";

import { CheckIcon } from "lucide-react";
import Button from "../Button";
import { InputCheckbox } from "../InputCheckbox";
import { InputText } from "../InputText";
import MarkdownEditor from "../MarkdownEditor";
import { useState } from "react";
import ImageUploader from "../ImageUploader";
import { PublicPost } from "@/dto/post/dto";

type ManagePostFormProps = {
  publicPost?: PublicPost;
}

export default function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  return (
    <form action="" className="mb-6">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="Id automatically generated"
          type="text"
          defaultValue={publicPost?.id || ''}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug automatically generated"
          type="text"
          defaultValue={publicPost?.slug|| ''}
          readOnly
        />

        <InputText
          labelText="Author"
          name="author"
          placeholder="Your name"
          type="text"
          defaultValue={publicPost?.author || ''}
        />

        <InputText
          labelText="Title"
          name="title"
          placeholder="Your post title"
          type="text"
          defaultValue={publicPost?.title}
        />

        <InputText
          labelText="Excerpt"
          name="excerpt"
          placeholder="Post excerpt"
          type="text"
          defaultValue={publicPost?.excerpt || ''}
        />

        <MarkdownEditor
          labelText="Content"
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText="Image Url"
          name="ImageUrl"
          placeholder="Image Url"
          type="text"
          defaultValue={publicPost?.coverImageUrl || ''}
        />

      <InputCheckbox
        labelText="Publish?"
        name="published"
        type="checkbox"
        defaultChecked={publicPost?.published || false}
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

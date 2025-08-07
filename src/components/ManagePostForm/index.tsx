"use client";

import { CheckIcon } from "lucide-react";
import Button from "../Button";
import { InputCheckbox } from "../InputCheckbox";
import { InputText } from "../InputText";
import MarkdownEditor from "../MarkdownEditor";
import { useState } from "react";
import ImageUploader from "../ImageUploader";

export default function ManagePostForm() {
  const [contentValue, setContentValue] = useState("");

  return (
    <form action="" className="mb-6">
      <div className="flex flex-col gap-6">
        <InputText
          labelText="ID"
          name="id"
          placeholder="Id automatically generated"
          type="text"
          defaultValue={""}
          readOnly
        />

        <InputText
          labelText="Slug"
          name="slug"
          placeholder="Slug automatically generated"
          type="text"
          defaultValue={""}
          readOnly
        />

        <InputText
          labelText="Author"
          name="author"
          placeholder="Your name"
          type="text"
          defaultValue={""}
        />

        <InputText
          labelText="Title"
          name="title"
          placeholder="Your post title"
          type="text"
          defaultValue={""}
        />

        <InputText
          labelText="Excerpt"
          name="excerpt"
          placeholder="Post excerpt"
          type="text"
          defaultValue={""}
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
          placeholder="imgUrl"
          type="text"
          defaultValue={""}
        />

      <InputCheckbox
        labelText="Publish?"
        name="published"
        type={"checkbox"}
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

'use client';

import { CheckIcon } from "lucide-react";
import Button from "../Button";
import { InputCheckbox } from "../InputCheckbox";
import { InputText } from "../InputText";
import MarkdownEditor from "../MarkdownEditor";
import { useState } from "react";

export default function ManagePostForm(){
    const [contentValue, setContentValue] = useState('Type something here...');

    return (
    <form action='' className="mb-6">
      <div className="flex flex-col gap-6">
        <InputText labelText="Post title" placeholder="Type here" />

        <InputText labelText="Post title" placeholder="Type here" />

        <InputText labelText="Post title" placeholder="Type here" />

        <InputCheckbox
          labelText="Post title"
          placeholder="Type here"
          type={"checkbox"}
        />

        <MarkdownEditor labelText="Post title" 
        value={contentValue}
        setValue={setContentValue}
        disabled={false}
        textAreaName={""} />
      </div>

      <div className="mt-6">
        <Button variant="default" size="md" type="submit">
          <CheckIcon /> Submit
        </Button>
      </div>
    </form>);
}
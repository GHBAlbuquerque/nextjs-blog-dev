'use-client';

import { CheckIcon } from "lucide-react";
import Button from "../Button";
import { InputCheckbox } from "../InputCheckbox";
import { InputText } from "../InputText";

export default function ManagePostForm(){
    return    <form action='' className="mb-6">
      <div className="flex flex-col gap-6">
        <InputText labelText="Post title" placeholder="Type here" />

        <InputText labelText="Post title" placeholder="Type here" />

        <InputText labelText="Post title" placeholder="Type here" />
        
        <InputCheckbox
          labelText="Post title"
          placeholder="Type here"
          type={"checkbox"}
        />

        <InputText labelText="Post title" placeholder="Type here" />
      </div>

      <div className="mt-6">
        <Button variant="default" size="md" type="submit">
          <CheckIcon /> Submit
        </Button>
      </div>
    </form>
}
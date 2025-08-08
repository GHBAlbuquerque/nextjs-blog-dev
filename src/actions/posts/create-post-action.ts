'use server';

import { PublicPost } from "@/dto/post/dto";

type CreatePostActionState = {
    formState: PublicPost;
    errors: string[];
};

export async function createPostAction(
    prevState: CreatePostActionState,
    formData: FormData 
): Promise<CreatePostActionState> {

    // create a CreatePostActionState with params from formData

    if (!(formData instanceof FormData)) {
        return {
            formState: prevState.formState,
            errors: ["Invalid data."],
        };
    }
    
    const formDataEntries = formData.entries(); // generfate key-value objects from formData
    const formDataObj = Object.fromEntries(formDataEntries);

    

    return {
        formState: prevState.formState,
        errors: []
    };
}
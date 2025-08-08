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

    console.log(prevState);
    console.log(formData);

    return {
        formState: prevState.formState,
        errors: []
    };
}
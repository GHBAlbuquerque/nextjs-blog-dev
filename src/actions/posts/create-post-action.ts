'use server';

import { makePartialPublicPost, PublicPost } from "@/dto/post/dto";
import { PostCreateSchema } from "@/lib/post/validations";
import { PostModel } from "@/models/post/post-model";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

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
    const zodValidatedObj = PostCreateSchema.safeParse(formDataObj);

    console.log("formDataObj", formDataObj);

    if(!zodValidatedObj.success) {
        const errors = getZodErrorMessages(zodValidatedObj.error.format());
        return {
            errors: errors,
            formState: makePartialPublicPost(formDataObj) // fields in the form have the same keys as PublicPost
        }
    }
    
    const validPostData = zodValidatedObj.data;
    const newPost : PostModel = {
        ...validPostData,
        id: 'id', 
        slug: 'slug',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    return {
        formState: newPost,
        errors: []
    };
}
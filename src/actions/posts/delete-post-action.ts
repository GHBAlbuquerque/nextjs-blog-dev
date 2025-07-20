'use server';

import { postRepository } from "@/repositories/post";
import simulateWait from "@/utils/simulate-wait";

export async function deletePostAction(id: string) {
    if(!id || typeof id !== 'string') {
        return {
            error: 'Invalid id',
        };
    }

    const post = await postRepository.findById(id).catch(() => undefined);

    if(!post) {
        return {
            error: 'Post not found',
        };
    }

    await postRepository.delete(id);

    await simulateWait();
    return {
        error: ''
    };
}
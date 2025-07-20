'use server';

import simulateWait from "@/utils/simulate-wait";

export async function deletePostAction(id: string) {
    await simulateWait();
    return id;
}
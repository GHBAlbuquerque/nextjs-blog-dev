'use server';

import simulateWait from "@/utils/simulate-wait"

type LoginActionState = {
    username: string;
    errors: string[];
}

export async function loginAction(state: LoginActionState, formData: FormData){
    await simulateWait();
    const username = formData.get['username'];
    const password = formData.get['password'];

    if(!username || !password) {
        return {
        username: '',
        errors: ["All fields must be completed"]
        }
    }

    return {
        username: '',
        errors: []
    }
}
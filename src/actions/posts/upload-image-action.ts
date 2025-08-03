'use server';
import { logColor } from "@/utils/log-color";

 // any function inside this file will be a server action, exposed to the client
// beware of helper functions because they might be exposed

export async function uploadImageAction(){
    logColor( 'uploadImageAction', Date.now() );

    return {
        user: 'John Doe'
    }
}
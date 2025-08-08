import { ZodFormattedError } from "zod/v3";

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
    return Object.values(error)
    .map(field => {
        if(Array.isArray(field)) {
            return field; // if empty array, return array
        }
        return field?._errors || []; // if field name, return _errors key inside
    })
    .flat()
    .filter(Boolean);
}
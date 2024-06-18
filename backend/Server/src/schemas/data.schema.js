import {z} from "zod";

export const dataSchema = z.object({
    username: z.string().min(7).max(20),
    email: z.string().email(),
    password: z.string().min(8),
});





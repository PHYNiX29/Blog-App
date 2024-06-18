import {z} from "zod";

export const userRegistrationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const userLoginSchema = z.object({
    username: z.string().min(7).max(20),
    password: z.string().min(8),
});



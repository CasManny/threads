import { z } from "zod";

export const threadValidation = z.object({
    thread: z.string().min(3, "Minimum of 3 characters"),
    accountId: z.string(),
});

export const commentValidation = z.object({
    thread: z.string().min(3, "Minimum of 3 characters")
})
